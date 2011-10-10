package reflect;

class ClassInfoTest extends TestCase2
{
	public function testNoRTTIModel()
	{
		var ci = ClassInfo.forClass(reflect.model.NoRtti);
		
		assertEquals(reflect.model.NoRtti, ci.type);
		assertEquals("reflect.model.NoRtti", ci.name);
		assertEquals(0, ci.properties.length);
	}
	
	public function testBasicModel()
	{
		var ci = ClassInfo.forClass(reflect.model.ClassA);
		
		assertEquals(reflect.model.ClassA, ci.type);
		assertEquals("reflect.model.ClassA", ci.name);
		assertEquals(3, ci.properties.length);
		assertEquals("a", ci.getProperty("a").name);
		assertEquals(ci, ci.getProperty("a").owner);
		assertEquals(Int, ci.getProperty("a").type.type);
	}
}
