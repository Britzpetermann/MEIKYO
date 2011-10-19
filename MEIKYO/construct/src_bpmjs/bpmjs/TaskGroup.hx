package bpmjs;

import reflect.ClassInfo;

class TaskGroup extends Task<TaskGroup>
{
	public var tasks : Array<Task<Dynamic>>;

	public function new()
	{
		super();
		tasks = new Array();
	}

	public function add(task : Task<Dynamic>)
	{
		tasks.push(task);
	}

	override public function doStart()
	{
		for(task in tasks)
		{
			//TODO if monitor is zero...			
			monitor.append(task.monitor, 1 / tasks.length);
		}
		
		nextTask();
	}

	function nextTask()
	{
		if (tasks.length > 0)
		{
			var task = tasks.shift();
			task.completeSignaler.bind(handleTaskComplete);
			task.start();
		}
		else
		{
			complete();
		}
	}

	function handleTaskComplete(task : Task<Dynamic>)
	{
		nextTask();
	}
}
