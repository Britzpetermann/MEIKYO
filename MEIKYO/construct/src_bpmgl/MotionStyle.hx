import kumite.time.Time;

interface MotionStyle
{
	function move(motion:Motion, ?time:Time):Void;
}
