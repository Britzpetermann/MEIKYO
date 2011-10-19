package bpmjs;

class SequencerTaskGroup extends bpmjs.TaskGroup
{
	public function new()
	{
		super();
		monitor.name = "SequencerTaskGroup";
	}
}
