package bpmgl;

class Tests
{
	public static function addTo(runner : haxe.unit.TestRunner)
	{
		//runner.add(new TestMatrix4Basics());
		//runner.add(new TestMatrix4Operations());
		//runner.add(new TestMatrix4Creations());
		runner.add(new TestMatrix4Append());
	}
}
