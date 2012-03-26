import kumite.time.Time;

class MotionStyleEaseOut implements MotionStyle
{
	public function new()
	{
		
	}
	
	//c = d - d*0.95^(1 + t)
	public function move(motion:Motion, ?time:Time)
	{
		var diff = motion.target - motion.current;
		motion.velocity = diff * 0.05;
		motion.current += motion.velocity;
	}
}
