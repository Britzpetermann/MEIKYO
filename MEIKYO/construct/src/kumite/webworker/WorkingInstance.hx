package kumite.webworker;

class WorkingInstance
{
	static function main()
	{
		var instance = new WorkingInstance();
		untyped __js__("onmessage = function(e){instance.onMessage(postMessage, e);}");
	}
	
	public function new()
	{
	}
	
	function onMessage(postMessage:Dynamic->Void, e:Dynamic)
	{
		var x = 1.5243;
				
		postMessage("data: " + e.data);

		var v : Vec2 = haxe.Unserializer.run(e.data);
		v.multiply(2, 2);
		
		var x = 0.0;
		for(i in 0...5000000)
		{
			x += Math.sin(i);
		}
		postMessage("!soso!" + x + " " + Std.string(v));
		
		for(i in 0...5000000)
		{
			x += Math.sin(i);
		}
		postMessage("!soso!" + x);
	}
}
