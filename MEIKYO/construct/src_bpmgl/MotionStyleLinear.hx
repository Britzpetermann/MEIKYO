import kumite.time.Time;

class MotionStyleLinear implements MotionStyle
{
	public var acceleration: Float;
	
	public function new()
	{
		
	}
	
	public function move(motion:Motion, ?time:Time)
	{
		var diff = motion.target - motion.current;
		
		var tAcceleration = time.summand(acceleration);
		
		if (Math.abs(diff) < tAcceleration)
		{
			motion.velocity = 0;
			motion.current = motion.target;
		}
		else
		{
			motion.velocity = Math2.signum(diff) * tAcceleration;
			motion.current += motion.velocity;
		}
	}
	
	public function setAcceleration(value:Float)
	{
		acceleration = value;
		return this;
	}
}
