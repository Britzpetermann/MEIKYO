package reflect.model;
import haxe.rtti.Infos;

@Test
class ClassB implements Infos
{
	@Test
	public var c : Int;
	
	public function new()
	{
		c = 1;
	}
}
