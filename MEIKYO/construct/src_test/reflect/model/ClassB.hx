package reflect.model;
import haxe.rtti.Infos;

class ClassB implements Infos
{
	@Test
	public var c : Int;
	
	public function new()
	{
		c = 1;
	}
}
