import app.controller.StageResizeAction;
import app.controller.Launcher;

import haxe.rtti.Infos;
import bpmjs.Sequencer;

class Config implements Infos
{
	public var stageResizeAction : StageResizeAction;
	public var sequencer : Sequencer;
	public var launcher : Launcher;

	public function new()
	{
		controller();
		model();
		view();
	}

	function controller()
	{
		launcher = new Launcher();
		sequencer = new Sequencer();
		stageResizeAction = new StageResizeAction();
	}

	function model()
	{
	}

	function view()
	{
	}
}
