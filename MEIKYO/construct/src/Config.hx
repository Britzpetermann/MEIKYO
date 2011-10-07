import app.controller.StageResizeAction;
import app.controller.Launcher;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var stageResizeAction : StageResizeAction;
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
		stageResizeAction = new StageResizeAction();
	}

	function model()
	{
	}

	function view()
	{
	}
}
