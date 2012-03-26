import kumite.time.Time;

class Motion
{
	public var current:Float;
	public var target:Float;
	public var velocity:Float;
	
	public var t:Int;
	public var c0:Float;
	public var v0:Float;
	
	public var finished:Bool;
	public var style:MotionStyle;
	
	var prevFinished:Bool;

	public function new(current:Float = 0, target:Float = 0, velocity:Float = 0)
	{
		this.current = current;
		this.target = target;
		this.velocity = velocity;
		this.style = new MotionStyleLinear().setAcceleration(1);
		restart();
	}

	public function move(?time:Time):Void
	{
		//style.move(this, time);
		
		var currentOriginal = current; 	
		var velocityOriginal = velocity;
		
		var l0 = Math.floor(time.timeScale);
		var l1 = Math.ceil(time.timeScale);
		
		for(i in 0...l0) 	
			style.move(this, null);
			
		var v0 = velocity;
		var c0 = current;
		
		style.move(this, null);
			
		var v1 = velocity;
		var c1 = current;
		
		var part = time.timeScale - l0;
		
		velocity = v0 + (v1 - v0) * part;  
		current = c0 + (c1 - c0) * part;  

		finished = prevFinished;
		prevFinished = current == target && velocity == 0;

		/*		
		var args = new Array<Float>();
		args.push(t);
		args.push(current - c0);
		args.push(v0);
		args.push(target - c0);
		Log.info(args.join("\t"));
		*/
		t++;
	}
	
	public function restart()
	{
		v0 = velocity;
		c0 = current;
		t = 0;
	}
	
	public function toString()
	{
		return "[Motion: c:" + current + " t:" + target + " v:" + velocity + " f:" + finished +"]";
	}
}