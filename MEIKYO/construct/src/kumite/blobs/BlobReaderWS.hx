package kumite.blobs;

import kumite.time.Time;
import haxe.rtti.Infos;

class BlobReaderWS implements Infos
{
	@Inject
	public var blobs : Blobs;
	
	@Inject
	public var time : Time;
	
	var host : String;
	var socket : WebSocket;
	var lastParse : Float;
	
	public function new(host : String)
	{
		this.host = host;
		lastParse = 0;
	}
	
	@Sequence("boot", "finish")
	public function start()
	{
		socket = new WebSocket(host);
		socket.onopen = handleOpen;
		socket.onmessage = handleMessage;
		socket.onclose = handleClose;		
	}
	
	function handleOpen(event)
	{
		Log.info("open");
	}
	
	function handleMessage(event)
	{
		onData(event.data);
	}
	
	function handleClose(event)
	{
		Log.warn("close");
		Timeout.execute(1000, start);
	}
	
	function onData(r)
	{
		if (time.ms - lastParse > 50)
		{
			lastParse = time.ms;
			var xml = Xml.parse(r);
			
			blobs.blobs = new Array();
			
			try
			{
				for(p in xml.elements()) {
					var fast = new haxe.xml.Fast(p);
		     		var blob = new Blob();
					blob.x = Std.parseFloat(fast.att.x);
					blob.y = Std.parseFloat(fast.att.y);
					blob.z = Std.parseFloat(fast.att.z);
					blob.area = Std.parseFloat(fast.att.area);
					
					blobs.blobs.push(blob);
				}
			}
			catch(e : Dynamic)
			{
				
			}
		}
	}
}
