package kumite.musicdraw;

import bpmjs.Task;
import bpmjs.TaskGroup;

class SaveRequest
{
	var taskGroup:TaskGroup;
	
	public function new(taskGroup:TaskGroup)
	{
		this.taskGroup = taskGroup;
	}
	
	public function add(task:Task<Dynamic>)
	{
		taskGroup.add(task);
	}
}
