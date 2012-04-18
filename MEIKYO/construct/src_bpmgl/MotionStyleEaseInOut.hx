import kumite.time.Time;

class MotionStyleEaseInOut implements MotionStyle
{
	public var acceleration:Float;
	public var smoothing:Float;
	
	public function new()
	{
		acceleration = 0.2;
		smoothing = 0.02;
	}
	
	public function setAcceleration(acceleration:Float):MotionStyleEaseInOut
	{
		this.acceleration = acceleration;
		return this;
	}
	
	public function setSmoothing(smoothing:Float):MotionStyleEaseInOut
	{
		this.smoothing = smoothing;
		return this;
	}
	
	public function move(motion:Motion, ?time:Time)
	{
		var diff = motion.target - motion.current;
		
		var newVelocity = diff * acceleration;
		motion.velocity += (newVelocity - motion.velocity) * smoothing;
		
		if (newVelocity > 0 && motion.velocity > newVelocity)
			motion.velocity = newVelocity;
			
		if (newVelocity < 0 && motion.velocity < newVelocity)
			motion.velocity = newVelocity;
		
		motion.current += motion.velocity;
	}
	
}
