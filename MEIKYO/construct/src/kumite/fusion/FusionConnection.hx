package kumite.fusion;
import hsl.haxe.DirectSignaler;
import hsl.haxe.Signaler;
import bpmjs.FrameTimer;

class FusionConnection
{
	public static var STATE_DISCONNECTED : String = "STATE_DISCONNECTED"; 
	public static var STATE_CONNECTING : String = "STATE_CONNECTING"; 
	public static var STATE_WAIT_CONFIG_ACCEPT : String = "STATE_WAIT_CONFIG_ACCEPT"; 
	public static var STATE_WAIT_GET : String = "STATE_WAIT_GET"; 
	public static var STATE_IDLE : String = "STATE_IDLE";
	public static var STATE_PRE_INIT : String = "STATE_PRE_INIT"; 
	 
	public static var host : String = "ws://192.168.1.22:12010";
	
	public var dataSignaler : Signaler<ArrayBuffer>;
	
	var config : Dynamic;
	
	var socket : WebSocket;

	var requestNewData : Bool = false; 	
	var state : String;
	
	var idleTimer : FrameTimer;
	var lastMessage : Float;
	
	public function new()
	{
		state = STATE_DISCONNECTED;
		dataSignaler = new DirectSignaler(this);
		
		idleTimer = new FrameTimer(1000);
		idleTimer.run = handleIdleTimer;
	}
	
	public function setConfig(config : FusionConfig)
	{
		this.config = config;
	}
	
	public function init()
	{
		disconnect();
		
		idleTimer.start();
		
		trace("init");
		lastMessage = Date.now().getTime();
		
		state = STATE_CONNECTING;
		
		socket = new WebSocket(host);
		socket.onopen = function(event : Dynamic)
		{
			Log.info("onOpen");
			state = STATE_WAIT_CONFIG_ACCEPT;
			socket.send(JSON.stringify({method:"setConfig", params:[JSON.stringify(config)]}));
		};
		
		socket.onerror = function(event : Dynamic)
		{
			Log.error("onError: ", event);
			reconnect();
		};
		
		socket.onclose = function(event : Dynamic)
		{
			Log.error("onclose: ", event);
			reconnect();
		};
		
		socket.onmessage = function(event : Dynamic)
		{
			lastMessage = Date.now().getTime();
			
			if (state == STATE_WAIT_GET)
			{
				var blob : Blob = event.data;
				var reader = new FileReader();
				reader.addEventListener("loadend", function()
				{
   					var result = reader.result;
					dataSignaler.dispatch(result);
				});
				reader.readAsArrayBuffer(blob);
			}
			
			state = STATE_IDLE;
			
			if (requestNewData)
			{
				sendDataRequest();
			}
		};		
	}
	
	public function get()
	{
		requestNewData = true;
		
		if (state == STATE_DISCONNECTED)
		{
			init();	
		}
		else if (state == STATE_IDLE)
		{
			sendDataRequest();
		}
	}
	
	function reconnect()
	{
		trace("reconnect: " + state);
		if (state == STATE_PRE_INIT)
			return;
			
		disconnect();
		
		state = STATE_PRE_INIT;
			
		Timeout.execute(1000, init);
	}
	
	function sendDataRequest()
	{
		requestNewData = false;
		
		state = STATE_WAIT_GET;
		socket.send(JSON.stringify({method:"get"}));
	}
	
	function handleIdleTimer()
	{
		if (state == STATE_DISCONNECTED)
			return;
		if (state == STATE_PRE_INIT)
			return;
		if (state == STATE_CONNECTING)
			return;

		var dt = Date.now().getTime() - lastMessage;		
//		trace("handleIdleTimer: " + dt + " disconnect...: " + requestNewData);
		if (dt > 10000 && requestNewData)
		{
			trace("handleIdleTimer: " + dt + " disconnect...");
			disconnect();
		}
	}
	
	function disconnect()
	{
		idleTimer.stop();
		state = STATE_DISCONNECTED;
		try
		{
			socket.close();
		}
		catch(e : Dynamic)
		{
		}
	}
}
