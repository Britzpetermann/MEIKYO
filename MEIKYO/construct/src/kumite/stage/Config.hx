package kumite.stage;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var stageResizeAction : StageResizeAction;

	public function new()
	{
		stageResizeAction = new StageResizeAction();
	}
}
