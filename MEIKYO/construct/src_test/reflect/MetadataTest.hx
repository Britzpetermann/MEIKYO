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
	
	public function testMethod()
	{
		var ci = ClassInfo.forClass(reflect.model.ClassA);
		
		var f1 = ci.getMethod("f1");
		assertTrue(f1.hasMetadata("Test"));
		
		var f2 = ci.getMethod("f2");
		assertFalse(f2.hasMetadata("Test"));
	}
}
