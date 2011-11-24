package reflect;
import haxe.rtti.CType;
import haxe.rtti.Infos;

class ClassInfoTest extends TestCase2
{
	public function testForClass()
	{
		var ci = ClassInfo.forClass(reflect.model.ClassA);
		assertEquals(reflect.model.ClassA, ci.type);
	}
	
	public function testForInstance()
	{
		var ci = ClassInfo.forInstance(new reflect.model.ClassA());
		assertEquals(reflect.model.ClassA, ci.type);
	}
	
	public function testForName()
	{
		var ci = ClassInfo.forName("reflect.model.ClassA");
		assertEquals(reflect.model.ClassA, ci.type);
	}
	
	public function testForCClassInt()
	{
		var type : CType = getCClassInt();
		var ci = ClassInfo.forCType(type);
		assertEquals(ClassInfo.forClass(Int), ci);
	}
	
	public function testNoRTTIModel()
	{
		var ci = ClassInfo.forClass(reflect.model.NoRtti);
		
		assertEquals(reflect.model.NoRtti, ci.type);
		assertEquals("reflect.model.NoRtti", ci.name);
		assertEquals(0, ci.properties.length);
		assertEquals(0, ci.methods.length);
		assertFalse(ci.hasRtti);
	}
	
	public function testType()
	{
		var ci = ClassInfo.forClass(reflect.model.ClassA);
		
		assertEquals(reflect.model.ClassA, ci.type);
		assertEquals("reflect.model.ClassA", ci.name);
		assertEquals("ClassA", ci.shortName);
		assertTrue(ci.hasRtti);
	}
	
	public function testProperties()
	{
		var ci = ClassInfo.forClass(reflect.model.ClassA);
		
		assertEquals(3, ci.properties.length);
		assertEquals("a", ci.getProperty("a").name);
		assertEquals(ci, ci.getProperty("a").owner);
		assertEquals(ClassInfo.forClass(Int), ci.getProperty("a").type);
		assertEquals(Int, ci.getProperty("a").clazz);
	}
	
	public function testEnum()
	{
		var ci = ClassInfo.forClass(reflect.model.ClassA);
		
		assertEquals("Bool", ci.getProperty("b").type.name);
	}
	
	public function testMethods()
	{
		var ci = ClassInfo.forClass(reflect.model.ClassA);
		
		assertEquals(4, ci.methods.length);
		assertEquals("f1", ci.getMethod("f1").name);
		assertEquals(ClassInfo.forClass(Float), ci.getMethod("f1").type);
		assertEquals(Float, ci.getMethod("f1").clazz);
		assertEquals(1, ci.getMethod("f1").parameters.length);
		assertEquals(ClassInfo.forClass(Int), ci.getMethod("f1").parameters[0].type);
	}
	
	private function getCClassInt() : CType
	{
		var infos = new haxe.rtti.XmlParser().processElement(Xml.parse(untyped CClassInt.__rtti).firstElement());
		var classDef : Classdef;
		switch(infos)
		{
			case TClassdecl(c): classDef = c;
			default:
				throw "error";
		}
		
		for(field in classDef.fields)
		{
			switch (field.type)
			{
				case CClass(name, params):
					return field.type;
				default:
					throw "error";
			}
			
		}
		
		throw "error";
	}
}

class CClassInt implements Infos
{
	public var int : Int;
}