package kumite.time;

import bpmjs.Messenger;

import haxe.rtti.Infos;

class TimeController implements Infos
{
	@Inject
	public var time : Time;
	
	@Messenger
	public var messenger : Messenger;
	
	public function new() {}
	
	@Sequence("boot", "startComplete")
	public function startComplete()
	{
		time.reset();
		GLAnimationFrame.run(timerUpdate);
	}
	
	private function timerUpdate()
	{
		time.tick();
		messenger.send(new Tick());
	}
}
