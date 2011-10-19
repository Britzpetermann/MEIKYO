package kumite.launch;

import js.Lib;
import js.Dom;
import bpmjs.ProgressMonitor;

import haxe.rtti.Infos;

class Launcher implements Infos
{
	@Inject
	public var sequencer : bpmjs.Sequencer;
	
	public function new();
	
	@PostComplete
	public function handlePostComplete()
	{
		sequencer.start("boot");
	}
	
	@Sequence("boot", "error")
	public function showError(message : String)
	{
		Log.error(message);
	}
}
