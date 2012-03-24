class Motion
{
	public var current:Float;
	public var target:Float;
	public var velocity:Float;
	
	public var finished:Bool;
	public var style:MotionStyle;
	
	var prevFinished:Bool;

	public function new(current:Float = 0, target:Float = 0, velocity:Float = 0)
	{
		this.current = current;
		this.target = target;
		this.velocity = velocity;
		this.style = new MotionStyleLinear().setAcceleration(1);
	}

	public function move():Void
	{
		style.move(this);
		
		finished = prevFinished;
		prevFinished = current == target && velocity == 0;
	}
	
	public function toString()
	{
		return "[Motion: c:" + current + " t:" + target + " v:" + velocity + " f:" + finished +"]";
	}
}