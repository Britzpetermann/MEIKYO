package bpmjs;

import reflect.ClassInfo;

class WorkerRPC
{
	public var receiver:Dynamic;
	public var postMessage:Dynamic;
	
	var isWorker:Bool;
	var command:WorkerCommand;
	var receiverClassInfo:ClassInfo;
	
	public static function initForHandler(receiver:Dynamic, workerUrl:String)
	{
		var worker = new Worker(workerUrl + "?cache=" + Date.now().getTime());
		var workerRPC = new WorkerRPC();
		workerRPC.isWorker = false;
		workerRPC.postMessage = worker.webkitPostMessage;
		workerRPC.receiver = receiver;
		workerRPC.init();
		worker.onmessage = function(e:MessageEvent)
		{
			workerRPC.processMessageEvent(e);
		}
		
		return workerRPC;
	}
	
	public static function initForWorker(receiver:Dynamic)
	{
		var workerRPC = new WorkerRPC();
		workerRPC.isWorker = true;
		workerRPC.receiver = receiver;
		workerRPC.init();
		
		untyped __js__("
			onmessage = function(event)
			{
				onmessage = function(event)
				{
					webkitPostMessage(receiver.returnBuffer(event.data));
				}
				receiver.init(event.data);
			}
		");

		untyped
		{
			console = {};
			
			console.info = function(message:Dynamic)
			{
				workerRPC.sendCommand("Log.info", message);
			};
			
			console.warn = function(message:Dynamic)
			{
				workerRPC.sendCommand("Log.warn", message);
			};
			
			console.error = function(message:Dynamic)
			{
				workerRPC.sendCommand("Log.error", message);
			};
		}
		
		return workerRPC; 
	}
	
	private function new()
	{
	}
	
	public function init()
	{
		command = null;
		receiverClassInfo = ClassInfo.forInstance(receiver);
	}

	public function sendCommand(type:String, ?param:Dynamic = null)
	{
		postMessage(type);
		postMessage(param);
	}
	
	public function sendTransferableCommand(type:String, param:ArrayBuffer)
	{
		postMessage(type);
		postMessage(param, [param]);
	}
	
	public function processMessageEvent(event:MessageEvent)
	{
		var data:Dynamic = event.data;
		
		if (command == null)
		{
			command = new WorkerCommand(data);
		}
		else
		{
			var method = Reflect.field(receiver, command.type);
			if (method != null)
			{
				Reflect.callMethod(receiver, method, [data]);
			}
			else
			{
				var staticMethod:Dynamic = null;
				try
				{
					staticMethod = js.Lib.eval(command.type);
					
					if (staticMethod == null)
						throw "";
						
					staticMethod(data);
				}
				catch (e:Dynamic)
				{
					Log.error("No method: " + command.type + " exists in object: " + receiver + " of class: " + receiverClassInfo.name);
				}
				
			}
			command = null;
		}	
	}
}
