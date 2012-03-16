package bpmjs;

import haxe.FastList;
import reflect.ClassInfo;

using Lambda;

class TaskGroup extends Task<TaskGroup>
{
	public var tasks : Array<Task<Dynamic>>;
	public var autoStart : Bool;
	public var parallelTasksMax : Int;
	
	var pendingTasks : FastList<Task<Dynamic>>;

	public function new()
	{
		super();
		pendingTasks = new FastList<Task<Dynamic>>();
		parallelTasksMax = 1;
		autoStart = false;
		tasks = new Array();
	}

	public function add(task : Task<Dynamic>)
	{
		tasks.push(task);
		if (autoStart)
			nextTask();
	}

	override public function doStart()
	{
		for(task in tasks)
		{
			monitor.append(task.monitor, 1 / tasks.length);
		}
		
		nextTask();
	}
	
	public function recomputeMonitor()
	{
		monitor.reset();
		
		var totalTasks = getTotalTaskCount();
		for(task in pendingTasks)
		{
			monitor.append(task.monitor, 1 / totalTasks);
		}
		for(task in tasks)
		{
			monitor.append(task.monitor, 1 / totalTasks);
		}
	}
	
	public function getTotalTaskCount()
	{
		return pendingTasks.count() + tasks.count();
	}

	function nextTask()
	{
		var pendingTaskCount = pendingTasks.count();
		if (pendingTaskCount >= parallelTasksMax)
			return;
			
		if (tasks.length > 0)
		{
			var pendingTask = tasks.shift();
			pendingTasks.add(pendingTask);
			
			pendingTask.completeSignaler.bind(handleTaskComplete);
			pendingTask.errorSignaler.bind(handleTaskError);
			pendingTask.start();
			
		}
		else
		{
			if (!autoStart)
				complete();
		}
	}

	function handleTaskComplete(task : Task<Dynamic>)
	{
		pendingTasks.remove(task);
		
		nextTask();
	}
	
	function handleTaskError(taskError : TaskError<Dynamic>)
	{
		pendingTasks.remove(taskError.task);
		
		if (!autoStart)
			error(this, taskError.error);
		else
			Log.warn(taskError.error);
	}
}
