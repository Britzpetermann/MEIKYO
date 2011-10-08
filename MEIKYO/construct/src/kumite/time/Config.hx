package kumite.time;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var time : Time;
	public var timeController : TimeController;
	
	public function new()
	{
		time = new Time();
		timeController = new TimeController();
	}
}
