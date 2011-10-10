package reflect;

class PropertyTest extends TestCase2
{
	public function testGetValue()
	{
		var instanceA = new reflect.model.ClassA();
		var ci = ClassInfo.forInstance(instanceA);
		
		var a = ci.getProperty("a");
		assertNull(a.getValue(instanceA));
		
		var c = ci.getProperty("c");
		assertEquals(1, c.getValue(instanceA));
	}
	
	public function testSetValue()
	{
		var instanceA = new reflect.model.ClassA();
		var ci = ClassInfo.forInstance(instanceA);
		
		var newValue = 5;
		var a = ci.getProperty("a");
		a.setValue(instanceA, 5);
		assertEquals(newValue, a.getValue(instanceA));
	}
}
