package kumite.uicomponents;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var testComponents : TestComponents;
	
	public function new()
	{
		testComponents = new TestComponents();
	}
}
