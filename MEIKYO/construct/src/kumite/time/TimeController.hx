package kumite.time;
import haxe.rtti.Infos;

class TimeController implements Infos
{
	@Inject
	public var time : Time;
	
	public function new() {}
	
	@Sequence("boot", "startComplete")
	public function init()
	{
		time.reset();
		GLAnimationFrame.run(timerUpdate);		
	}
	
	private function timerUpdate()
	{
		time.tick();
	}
}
