package kumite.stage;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var stage : Stage;
	public var stageResizeAction : StageResizeAction;

	public function new()
	{
		stage = new Stage();
		stageResizeAction = new StageResizeAction();
	}
}
