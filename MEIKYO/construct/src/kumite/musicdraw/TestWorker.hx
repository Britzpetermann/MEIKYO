package kumite.musicdraw;

import bpmjs.WorkerCommand;
import haxe.Timer;

class TestWorker
{
	var effect:SquareEffect;
	
	static function main()
	{
		var instance = new TestWorker();
		
		untyped __js__("onmessage = function(e){instance.start(webkitPostMessage, e);}");
		untyped __js__("proceed = function(e){instance.proceed(webkitPostMessage, e);}");
	}
	
	public function new()
	{
		effect = new SquareEffect();
	}
	
	function start(postMessage:Dynamic, e:Dynamic)
	{
		untyped __js__("onmessage = proceed");
		
		var result = new Uint8Array(10);
		
		function sendCommand(type:String, message:Dynamic):Void
		{
			postMessage(haxe.Serializer.run(new WorkerCommand(type)));	
			postMessage(message);
		}
		
		function sendTransferableCommand(type:String, message:ArrayBufferView):Void
		{
			postMessage(haxe.Serializer.run(new WorkerCommand(type)));
			postMessage(message.buffer, [message.buffer]);
		}
		
		effect.analyzer = haxe.Unserializer.run(e.data);
		effect.sendCommand = sendCommand;
		effect.sendTransferableCommand = sendTransferableCommand;
		effect.init();

		effect.render();
	}
	
	function proceed(postMessage:Dynamic, e:Dynamic)
	{
		effect.gltexture.array = new Uint8Array(e.data);
		effect.render();
		//untyped setTimeout(effect.render, 1000 / 60);
	}
		
}
