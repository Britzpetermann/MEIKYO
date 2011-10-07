package app.controller;

import app.event.LauncherStart;
import bpmjs.Event;

import haxe.rtti.Infos;

@ManagedEvents("launcherStart")
class Launcher extends EventDispatcher, implements Infos
{
	@Inject
	public var sequencer : bpmjs.Sequencer;
	
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
