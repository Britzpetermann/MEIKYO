import haxe.unit.TestCase;
import haxe.PosInfos;

import bpmjs.TestMessenger;

import bpmjs.TestGetObject;
import bpmjs.TestInject;
import bpmjs.TestConfigure;
import bpmjs.TestComplete;
import bpmjs.TestDynamic;
import bpmjs.TestError;
import bpmjs.TestObserve;
import bpmjs.TestFrontMessenger;
import bpmjs.TestSequencer;
import bpmjs.integration.TestMessaging;
import bpmjs.integration.TestMultipleConfigs;
import kumite.scene.TestLayerOrder;

class TestRunner
{

	static function main()
	{
		Log.init();
		Log.addFilter(new ERegFilter(LogLevel.INFO, ~/.*/));
		
		var x = Log;
		Log.info();
		Log.warn(1, 2, x);
		Log.error(1, 2, 3);
		
		var runner = new TestRunner();
	}

	var runner : haxe.unit.TestRunner;

	public function new()
	{
		runner = new haxe.unit.TestRunner();
		
		reflect.Tests.addTo(runner);

		addBPMJSTests();
		addContextBuilderTests();
		addFrontMessengerTests();
		addIntegrationTests();
		addSequencerTests();
		addSceneTests();

		var startTime = Date.now().getTime();
		runner.run();
		trace("Time for testing... " + (Date.now().getTime() - startTime) + "ms");
	}

	function addBPMJSTests()
	{
		runner.add(new TestMessenger());
	}

	function addContextBuilderTests()
	{
		runner.add(new TestGetObject());
		runner.add(new TestInject());
		runner.add(new TestComplete());
		runner.add(new TestError());
		runner.add(new TestConfigure());
		runner.add(new TestDynamic());
		runner.add(new TestObserve());
	}

	function addFrontMessengerTests()
	{
		runner.add(new TestFrontMessenger());
	}

	function addIntegrationTests()
	{
		runner.add(new TestMessaging());
		runner.add(new TestMultipleConfigs());
	}
	
	function addSequencerTests()
	{
		runner.add(new TestSequencer());
	}
	
	function addSceneTests()
	{
		runner.add(new TestLayerOrder());
	}
}