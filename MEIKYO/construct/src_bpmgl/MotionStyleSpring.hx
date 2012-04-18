import kumite.time.Time;

class MotionStyleSpring implements MotionStyle
{
	public function new()
	{
		
	}
	
	public function move(motion:Motion, ?time:Time)
	{
		var diff = motion.target - motion.current;
		motion.velocity += diff * 0.05;
		motion.velocity *= 0.8;
		motion.current += motion.velocity;
	}
}
