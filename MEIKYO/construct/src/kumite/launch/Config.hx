package kumite.launch;

import bpmjs.Sequencer;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var sequencer : Sequencer;
	public var launcher : Launcher;

	public function new()
	{
		launcher = new Launcher();
		sequencer = new Sequencer();
	}
}
