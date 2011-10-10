package bpmjs.integration;

class Tests
{
	public static function addTo(runner : haxe.unit.TestRunner)
	{
		runner.add(new TestMessaging());
		runner.add(new TestMultipleConfigs());
	}
}
