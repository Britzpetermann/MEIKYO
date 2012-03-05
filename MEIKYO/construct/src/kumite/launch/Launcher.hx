package kumite.launch;

import js.Lib;
import js.Dom;
import bpmjs.ProgressMonitor;

import haxe.rtti.Infos;

class Launcher implements Infos
{
	@Inject
	public var sequencer : bpmjs.Sequencer;
	
	public function new() {}
	
	@PostComplete
	public function handlePostComplete()
	{
		//Log.profile("Sequence");
		sequencer.start("boot");
	}
	
	@Sequence("boot", "error")
	public function showError(message : String)
	{
		Log.error(message);
	}
	
	@Sequence("boot", "finish")
	public function handleFinish()
	{
		//Log.profileEnd();
	}
}
