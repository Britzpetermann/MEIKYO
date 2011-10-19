package kumite.launch;

import bpmjs.Sequencer;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var sequencer : Sequencer;
	public var launcher : Launcher;
	public var preloadDisplay : PreloadDisplay;

	public function new()
	{
		launcher = new Launcher();
		sequencer = new Sequencer();
		preloadDisplay = new PreloadDisplay();
	}
}
