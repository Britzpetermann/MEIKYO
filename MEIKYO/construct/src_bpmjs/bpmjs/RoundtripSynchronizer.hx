package bpmjs;

class RoundtripSynchronizer
{
	public var targetMs:Float;
	public var workMs:Float;
	public var roundtripMs:Float;
	
	var workStartTime:Float;
	var lastDelayTime:Int;
	
	public function new()
	{
		targetMs = 1000 / 60;
		lastDelayTime = 0;
	}
	
	public function workStart()
	{
		roundtripMs = Date.now().getTime() - workStartTime;
		workStartTime = Date.now().getTime();	
	}
	
	public function workComplete()
	{
		workMs = Date.now().getTime() - workStartTime;
	}
	
	public function delay(method:Dynamic)
	{
		var elapsedUntilWorkStart = Date.now().getTime() - workStartTime;
		
		lastDelayTime = Std.int(targetMs - elapsedUntilWorkStart - 1);
		if (lastDelayTime < 0)
			lastDelayTime = 0;
			
		if (lastDelayTime > 0)
			haxe.Timer.delay(method, lastDelayTime);
		else
			method();
	}
	
	public function getInfo()
	{
		return "WRD(ms): " + workMs + ", " + roundtripMs + ", " + lastDelayTime;
	}
}
