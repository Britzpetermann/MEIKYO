package kumite.testscene;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var testLayer1 : TestLayer1;
	public var testScene1 : TestScene1;
	
	public function new()
	{
		testLayer1 = new TestLayer1();
		testScene1 = new TestScene1();
	}
}
