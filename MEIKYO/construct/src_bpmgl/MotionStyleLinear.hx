class MotionStyleLinear implements MotionStyle
{
	public var acceleration: Float;
	
	public function new()
	{
		
	}
	
	public function move(motion:Motion)
	{
		var diff = motion.target - motion.current;
		
		if (Math.abs(diff) < acceleration)
		{
			motion.velocity = 0;
			motion.current = motion.target;
		}
		else
		{
			motion.velocity = Math2.signum(diff) * acceleration;
			motion.current += motion.velocity;
		}
	}
	
	public function setAcceleration(value:Float)
	{
		acceleration = value;
		return this;
	}
}
