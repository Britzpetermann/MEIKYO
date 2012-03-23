package bpmjs;

import hsl.haxe.DirectSignaler;
import hsl.haxe.Signaler;
import hsl.haxe.Subject;

class Task<T>
{
	public var startSignaler : Signaler<T>;
	public var completeSignaler : Signaler<T>;
	public var errorSignaler : Signaler<TaskError<T>>;

	public var monitor(getMonitor, setMonitor) : ProgressMonitor;
	
	public var isComplete:Bool;
	
	public function new()
	{
		startSignaler = new DirectSignaler(this);
		completeSignaler = new DirectSignaler(this);
		errorSignaler = new DirectSignaler(this);
		
		monitor = new ProgressMonitor();
	}

	public function start()
	{
		try
		{
			var t : T = cast this;
			startSignaler.dispatch(t);
			doStart();
		}
		catch(e : Dynamic)
		{
			Log.error("Error starting Task: ", e);
		}
	}

	public function doStart()
	{
	}

	public function complete()
	{
		isComplete = true;
		monitor.current = 1; 
		var t : T = cast this;
		completeSignaler.dispatch(t);
	}

	public function error(result : T, error : String)
	{
		var taskError = new TaskError<T>();
		taskError.task = result;
		taskError.error = error;
		errorSignaler.dispatch(taskError);
	}
	
	function getMonitor()
	{
		return monitor;
	}
	
	function setMonitor(monitor)
	{
		this.monitor = monitor;
		return monitor;
	}
}
