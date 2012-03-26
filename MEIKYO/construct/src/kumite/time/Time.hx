package kumite.time;

class Time
{
	private static inline var EXPECTED_FRAMERATE : Int = 60;
	
	public var ms : Float;

	public var frameMs : Float;

	public var timeScale : Float;

	public var frame : Int;
	
	public var frameRate : Float;
	
	private var lastTime : Float;
	
	public function new()
	{
		reset();
	}
	
	public function reset()
	{
		frameRate = EXPECTED_FRAMERATE;
		ms = 0;
		frameMs = Std.int(1000 / EXPECTED_FRAMERATE);
		timeScale = 1;
		frame = 0;
		lastTime = Date.now().getTime();
	}

	public function tick()
	{
		var time : Float = Date.now().getTime();
		
		frame++;
		if (lastTime == -1)
			lastTime = time - 100;

		frameMs = time - lastTime;

		if (Math.isNaN(frameMs) || !Math.isFinite(frameMs))
			frameMs = 100;

		timeScale += ((frameMs / 1000 * EXPECTED_FRAMERATE) - timeScale) * 1;

		//if (timeScale < 0.25)
		//	timeScale = 0.25;

		//if (timeScale > 3)
		//	timeScale = 3;

		if (Math.isNaN(timeScale) || !Math.isFinite(timeScale))
			timeScale = 1;
			//timeScale = 100 / 1000 * 30;

		ms += frameMs;

		frameRate = 1000 / frameMs;
		
		lastTime = time;
	}

	public function tickInPause()
	{
		var time : Float = Date.now().getTime();
		
		if (lastTime == -1)
			lastTime = time - 100;

		frameMs = time - lastTime;

		if (Math.isNaN(frameMs) || !Math.isFinite(frameMs))
			frameMs = 100;

		timeScale = frameMs / 1000 * EXPECTED_FRAMERATE;

		if (Math.isNaN(timeScale) || !Math.isFinite(timeScale))
			timeScale = 100 / 1000 * EXPECTED_FRAMERATE;

		frameRate = 1000 / frameMs;

		lastTime = time;
	}

	public function summand(value : Float) : Float
	{
		return value * timeScale;
	}

	public function factor(value : Float) : Float
	{
		return Math.pow(value, timeScale);
	}

	public function interpolateTo(from : Float, to : Float, f : Float) : Float
	{
		return from * (1 - f * timeScale) + to * (f * timeScale);
	}
	
	public function interpolateVec3To(from : Vec3, to : Vec3, f : Float) : Void
	{
		from.x = interpolateTo(from.x, to.x, f);
		from.y = interpolateTo(from.y, to.y, f);
		from.z = interpolateTo(from.z, to.z, f);
	}
}
