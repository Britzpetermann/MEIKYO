package reflect;

class Tests
{
	public static function addTo(runner : haxe.unit.TestRunner)
	{
		runner.add(new ClassInfoTest());
		runner.add(new MetadataTest());
		runner.add(new PropertyTest());
	}
}
