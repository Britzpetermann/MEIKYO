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
		trace("Time for testing... " + (Date.now().getTime() - startTime) + "ms");
	}
	
	function addTests(runner : haxe.unit.TestRunner)
	{
		reflect.Tests.addTo(runner);
		bpmjs.Tests.addTo(runner);
		runner.add(new kumite.scene.TestLayerOrder());
	}
}