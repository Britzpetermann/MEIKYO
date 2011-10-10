package reflect;

class MetadataTest extends TestCase2
{
	public function testProperty()
	{
		var ci = ClassInfo.forClass(reflect.model.ClassA);
		var a = ci.getProperty("a");
		var b = ci.getProperty("b");
		var c = ci.getProperty("c");
		assertTrue(a.hasMetadata("Test"));
		assertFalse(b.hasMetadata("Test"));
		assertTrue(c.hasMetadata("Test"));
	}
}
