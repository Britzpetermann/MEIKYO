package bpmjs;
import js.Lib;

class FrameTimer
{
	public static var profileStart : Void->Void;
	public static var profileEnd : Void->Void;
	
	@:keep
	private static var init : Dynamic =
	{
		var ms = 0.0;
//		ms = 1000 / 10;
//		ms = 1000 / 60;
		GLAnimationFrame.run(frameTimerLoop, ms);
	}
	
	private static function frameTimerLoop()
	{
		if (profileStart != null)
			profileStart();
		
		var time = Date.now().getTime();
		
		for(listener in listeners2)
		{
			if (listener.run != null)
			{
				if (time - listener.time > listener.maxIntervalMs)
				{
					listener.time = time;
					listener.run(listener);
				}
			}
		}
		
		for(listener in listeners)
		{
			if (listener.run != null)
			{
				if (time - listener.time > listener.maxIntervalMs)
				{
					listener.time = time;
					listener.run(listener);
				}
			}
		}
		
		if (profileEnd != null)
			profileEnd();
	}
	
	private static var listeners : Array<FrameTimer> = new Array();
	private static var listeners2 : Array<FrameTimer> = new Array();
	
	public var run : Dynamic;
	public var time : Float;
	public var maxIntervalMs : Float;
	
	public function new(?maxIntervalMs : Float = 0)
	{
		this.maxIntervalMs = maxIntervalMs;
	}
	
	public function start()
	{
		time = Date.now().getTime();
		stop();
		listeners.push(this);
	}
	
	public function start2()
	{
		time = Date.now().getTime();
		stop();
		listeners2.push(this);
		listeners.push(this);
	}
	
	public function stop()
	{
		listeners.remove(this);
		listeners2.remove(this);
	}
}
