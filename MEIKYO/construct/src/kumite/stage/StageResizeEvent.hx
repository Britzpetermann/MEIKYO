package kumite.stage;

import bpmjs.Event;

class StageResizeEvent extends Event
{
	public function new()
	{
		super("stageResize");
	}
}
