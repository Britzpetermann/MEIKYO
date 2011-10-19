package bpmjs;

class ObjectProxyTask<T, T2 : Task<T2>> extends Task<ObjectProxyTask<T, T2>>
{
	public var object : T;
	public var child : T2;
	
	public function new (object : T, child : T2)
	{
		this.object = object;
		this.child = child;
		
		super();
		
		child.completeSignaler.bind(handleComplete);
		child.errorSignaler.bind(handleError);
	}
	
	override function start()
	{
		super.start();
		child.start();
	}
	
	override function setMonitor(value)
	{
		child.monitor = value;
		return value;
	}
	
	override function getMonitor()
	{
		return child.monitor;
	}
	
	function handleComplete(v : T2)
	{
		complete();
	}
	
	function handleError(v : TaskError<T2>)
	{
		error(this, v.error);
	}
}
