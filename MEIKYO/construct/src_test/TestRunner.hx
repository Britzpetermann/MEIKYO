import haxe.unit.TestCase;
import haxe.PosInfos;

class TestRunner
{
	static function main()
	{
		Log.init();
		Log.addFilter(new ERegFilter(LogLevel.INFO, ~/.*/));
		var runner = new TestRunner();
	}

	public function new()
	{
		var runner = new haxe.unit.TestRunner();
		
		addTests(runner);
		
		var startTime = Date.now().getTime();
		runner.run();
		
		//runTimes(3000, runner);
		trace("Time for testing... " + (Date.now().getTime() - startTime) + "ms");
	}
	
	function addTests(runner : haxe.unit.TestRunner)
	{
		bpmgl.Tests.addTo(runner);
		reflect.Tests.addTo(runner);
		bpmjs.Tests.addTo(runner);
		runner.add(new kumite.scene.TestLayerOrder());
	}
	
	function runTimes(times : Int, runner : haxe.unit.TestRunner)
	{
		for (i in 0...times)
		{
			haxe.Log.clear();
			runner.run();
		}		
	}
}