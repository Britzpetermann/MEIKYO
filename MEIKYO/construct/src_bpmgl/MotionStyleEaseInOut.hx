import kumite.time.Time;

class MotionStyleEaseInOut implements MotionStyle
{
	public function new()
	{
	}
	
	public function move(motion:Motion, ?time:Time)
	{
		var diff = motion.target - motion.current;
		
		var newVelocity = diff * 0.2;

		motion.velocity += (newVelocity - motion.velocity) * 0.02;
		
		if (newVelocity > 0 && motion.velocity > newVelocity)
			motion.velocity = newVelocity;
			
		if (newVelocity < 0 && motion.velocity < newVelocity)
			motion.velocity = newVelocity;
		
		motion.current += motion.velocity;
	}
}
