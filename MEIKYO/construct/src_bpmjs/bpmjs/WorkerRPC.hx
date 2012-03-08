package bpmjs;

import reflect.ClassInfo;

class WorkerRPC
{
	public var receiver:Dynamic;
	public var sender:Dynamic;
	
	var lastMessage:Float;
	var command:WorkerCommand;
	var logs:Hash<String>;
	var receiverClassInfo:ClassInfo;
	
	public function new()
	{
	}
	
	public function init()
	{
		lastMessage = Date.now().getTime();
		command = null;
		logs = new Hash<String>();
		receiverClassInfo = ClassInfo.forInstance(receiver);
	}

	public function startDebugTimer()
	{
		var t = new haxe.Timer(1000);
		t.run = function()
		{
			var messages = ["Info:"];
			for(logKey in logs.keys())
			{
				messages.push(logKey + ": " + logs.get(logKey));
			}
			logs = new Hash();
			
			Log.info(messages.join("\n\t"));
		}
	}
	
	public function sendCommand(type:String, param:Dynamic)
	{
		sender.postMessage(new WorkerCommand(type));
		sender.postMessage(param);
	}
	
	public function processMessageEvent(event:WorkerMessageEvent)
	{
		var data:Dynamic = event.data;
		if (command == null)
		{
			command = haxe.Unserializer.run(data);
		}
		else
		{
			var method = receiverClassInfo.getMethod(command.type);
			
			if (method != null)
				method.call(receiver, [data]);
			else
				logs.set(command.type, Std.string(data));
				
			var now = Date.now().getTime();
			logs.set(command.type, Std.string(now - lastMessage));
			lastMessage = now;
			command = null;
		}		
	}
}
