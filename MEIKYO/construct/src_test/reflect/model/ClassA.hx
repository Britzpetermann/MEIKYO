package reflect.model;
import haxe.rtti.Infos;

class ClassA extends ClassB, implements Infos
{
	@Test
	public var a : Int;
	
	public var b(default, default) : Int;
	
	public function f1(a : Int)
	{
	}
	
	private function f2()
	{
	}
}
