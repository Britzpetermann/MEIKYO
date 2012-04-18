package kumite.webworker;

import bpmjs.WorkingInstance;

class WorkingInstanceImpl
{
	static function main()
	{
		new WorkingInstanceImpl();
	}
	
	public function new()
	{
		var instance = new WorkingInstance(this);
	}
	
	public function init()
	{
	}
	
	public function configure(a, b, c)
	{
		return [a * 2, b * 2, c * 2];
	}
	
	public function render(buffer:ArrayBuffer)
	{
	}
}
