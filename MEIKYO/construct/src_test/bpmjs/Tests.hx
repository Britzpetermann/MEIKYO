package bpmjs;

class Tests
{
	public static function addTo(runner : haxe.unit.TestRunner)
	{
		runner.add(new TestMessenger());
		runner.add(new TestGetObject());
		runner.add(new TestInject());
		runner.add(new TestInjectById());
		runner.add(new TestComplete());
		runner.add(new TestError());
		runner.add(new TestConfigure());
		runner.add(new TestDynamic());
		runner.add(new TestObserve());
		runner.add(new TestFrontMessenger());
		runner.add(new TestSequencer());
		
		bpmjs.integration.Tests.addTo(runner);
	}
}
