package bpmjs;

class TestProgressMonitor extends TestCase2
{
	var monitor : ProgressMonitor;
	
	public override function setup()
	{
		monitor = new ProgressMonitor();
	}

	public function testDefault()
	{
		assertEquals(0.0, monitor.current);
	}
	
	public function testPercent()
	{
		monitor.current = 0.5;
		assertEquals(0.5, monitor.current);
	}
	
	public function testChild()
	{
		var sub1 = monitor.append(new ProgressMonitor(), 1);
		sub1.current = 0.5;
		assertEquals(0.5, monitor.current);
	}
	
	public function test2ChildrenInit()
	{
		var sub1 = monitor.append(new ProgressMonitor(), 0.5);
		var sub2 = monitor.append(new ProgressMonitor(), 0.5);
		assertEquals(0.0, monitor.current);
	}
	
	public function test2ChildrenUpdate()
	{
		var sub1 = monitor.append(new ProgressMonitor(), 0.5);
		var sub2 = monitor.append(new ProgressMonitor(), 0.5);
		sub2.current = 0.5;
		assertEquals(0.25, monitor.current);
	}
	
	public function test2SubChildrenUpdate()
	{
		var sub1 = monitor.append(new ProgressMonitor(), 0.5);
		var sub2 = monitor.append(new ProgressMonitor(), 0.5);
		var sub11 = sub1.append(new ProgressMonitor(), 0.5);
		var sub12 = sub1.append(new ProgressMonitor(), 0.5);
		sub12.current = 0.5;
		assertEquals(0.125, monitor.current);
	}
	
	public function test2ChildrenWeight()
	{
		var sub1 = monitor.append(new ProgressMonitor(), 0.5);
		var sub2 = monitor.append(new ProgressMonitor(), 0.5);
		sub2.weight = 99;
		sub2.current = 0.5;
		assertEquals(0.495, monitor.current);
	}
	
}
