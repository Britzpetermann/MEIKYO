package reflect.model;
import haxe.rtti.Infos;

class ClassA extends ClassB, implements Infos
{
	@Test
	public var a : Int;
	
	public var b(default, default) : Bool;
	
	@Test
	public function f1(a : Int) : Float
	{
		return 1;
	}
	
	private function f2()
	{
	}
}
