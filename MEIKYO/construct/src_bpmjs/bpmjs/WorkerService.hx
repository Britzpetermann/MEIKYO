package bpmjs;

class WorkerService
{
	public var debug:Bool;
	public var receiver:Dynamic;
	public var paused:Bool;
	
	var worker:Worker;
	var queue:Array<Call>;
	var pendingCall:Call;
	
	public function new()
	{
		debug = false;
		queue = new Array();
		pendingCall = null;
	}
	
	public function init(workerScript:String)
	{
		worker = new Worker(workerScript + "?cache=" + Date.now().getTime());
		worker.onmessage = onMessage;
	}
	
	public function pause()
	{
		paused = true;
	}
	
	public function resume()
	{
		paused = false;
		checkQueue();
	}
	
	public function terminate()
	{
		worker.terminate();
	}
	
	public function call(method:String, ?args:Array<Dynamic>, ?completeCallback:Dynamic)
	{
		if (args == null)
			args = [];
			
		if (completeCallback == null)
			completeCallback = function(){};
			
		addQueue(new Call(method, args, completeCallback));
	}
	
	public function callTransfer(method:String, ?buffer:ArrayBuffer, completeCallback:Dynamic)
	{
		if (buffer == null)
			buffer = new ArrayBuffer(0);
			
		addQueue(new Call("__prepareTransfer__", [method], function(){}));
		addQueue(new TransferCall(method, [buffer], completeCallback));
	}
	
	function addQueue(call:Call)
	{
		if (debug)
			Log.info(call);
		queue.push(call);
		checkQueue();
	}
	
	function checkQueue()
	{
		if (paused)
			return;
			
		if (debug)
			Log.info(queue.length);
		
		if (pendingCall == null && queue.length > 0)
		{
			var call = queue.shift();
			executeCall(call);
		}
	}
	
	function executeCall(call)
	{
		if (debug)
			Log.info(call);
		pendingCall = call;
		
		if (pendingCall.transfer)
			worker.webkitPostMessage(call.args[0], [call.args[0]]);
		else
			worker.webkitPostMessage({method:call.method, args:call.args});
	}
	
	function onMessage(event:MessageEvent)
	{
		if (debug)
			Log.info("Result: " + pendingCall + " -> " + Std.string(event.data));
			
		if (event.data.type == "pipeMethod")
		{
			handlePipedMethod(event);
		}
		else
		{
			if (pendingCall.transfer)
				pendingCall.completeCallback(event.data);
			else
				pendingCall.completeCallback(event.data.result);
				
			pendingCall = null;
			checkQueue();
		}
	}
	
	function handlePipedMethod(event:MessageEvent)
	{
		if (receiver != null)
		{
			try
			{
				var method = Reflect.field(receiver, event.data.method);
				method.apply(receiver, event.data.args);
				return;
			}
			catch(e:Dynamic)
			{
			}
		}
		
		try
		{
			var method = js.Lib.eval(event.data.method);
			method.apply(null, event.data.args);
		}
		catch(e:Dynamic)
		{
			Log.warn("Could not execute piped method without receiver: " + event.data.method);
		}
	}
}

class Call
{
	public var method:String;
	public var args:Array<Dynamic>;
	public var completeCallback:Dynamic;
	public var transfer:Bool;
	
	public function new(method:String, args:Array<Dynamic>, completeCallback:Dynamic)
	{
		this.method = method;
		this.args = args;
		this.completeCallback = completeCallback;
		transfer = false;
	}
	
	public function toString()
	{
		return "[Call: " + method + " transfer:" + transfer + "]";
	}
}

class TransferCall extends Call
{
	public function new(method:String, args:Array<Dynamic>, completeCallback:Dynamic)
	{
		super(method, args, completeCallback);
		transfer = true;
	}
}