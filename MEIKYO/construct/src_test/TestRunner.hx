import haxe.unit.TestCase;
import haxe.PosInfos;

import bpmjs.TestMessenger;

import bpmjs.TestGetObject;
import bpmjs.TestInject;
import bpmjs.TestConfigure;
import bpmjs.TestComplete;
import bpmjs.TestDynamic;
import bpmjs.TestError;
import bpmjs.TestFrontMessenger;
import bpmjs.TestSequencer;
import bpmjs.integration.TestMessaging;
import bpmjs.integration.TestMultipleConfigs;
import kumite.scene.TestLayerOrder;

class TestRunner {

	static function main()
	{
		var runner = new TestRunner();
	}

	var runner : haxe.unit.TestRunner;

	public function new()
	{
		runner = new haxe.unit.TestRunner();

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

class SummerTestCase extends TestCase
{
	public function new()
	{
		super();
	}

	function assertNotNull( b:Dynamic, ?c : PosInfos ) : Void {
		currentTest.done = true;
		if (b == null){
			currentTest.success = false;
			currentTest.error   = "expected not null";
			currentTest.posInfos = c;
			throw currentTest;
		}
	}

	function fail( message:String, ?c : PosInfos ) : Void {
		currentTest.done = true;
		currentTest.success = false;
		currentTest.error   = message;
		currentTest.posInfos = c;
		throw currentTest;
	}

	function noFail() : Void {
		currentTest.done = true;
	}
}
