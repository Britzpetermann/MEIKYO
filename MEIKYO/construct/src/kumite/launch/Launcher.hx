package kumite.launch;

import haxe.rtti.Infos;

class Launcher implements Infos
{
	@Inject
	public var sequencer : bpmjs.Sequencer;
	
	public function new();
	
	@PostComplete
	public function handlePostComplete()
	{
		Log.info();
		sequencer.start("boot");
	}
	
	@Sequence("boot", "error")
	public function showError()
	{
		//Log.error(sequencer.error);
	}	
}
