package bpmjs;

class ProgressMonitor
{
	public var name : String;
	public var weight : Float;
	
	public var current(getCurrent, setCurrent) : Float;
	
	var children : Array<MonitorAndTotal>;
	
	public function new()
	{
		name = "";
		reset();
	}
	
	public function reset()
	{
		children = new Array();
		current = 0;
		weight = 1;
	}
	
	public function append(monitor : ProgressMonitor, total)
	{
		var monitorAndTotal = new MonitorAndTotal();
		monitorAndTotal.total = total;
		monitorAndTotal.monitor = monitor;
		
		children.push(monitorAndTotal);
		
		return monitor;
	}
	
	public function done()
	{
		current = 1;
	}
	
	function getCurrent()
	{
		if (children.length == 0)
		{
			return current;
		}
		else
		{
			var totalWeight = 0.0;
			for(child in children)
			{
				totalWeight += child.monitor.weight;
			}
			
			var childCurrent = 0.0;
			for(child in children)
			{
				childCurrent += Map.linear(child.monitor.current, 0, 1, 0, child.monitor.weight / totalWeight);
			}
			return childCurrent;
		}
	}
	
	function setCurrent(value)
	{
		this.current = value;
		return value;
	}
}

private class MonitorAndTotal
{
	public var total : Float;
	public var monitor : ProgressMonitor;
	
	public function new()
	{
		
	}
}
