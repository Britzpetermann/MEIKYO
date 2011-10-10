package kumite.testscene;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var testLayer1 : TestLayer1;
	public var testLayer2 : TestLayer2;
	
	public var testScene1 : TestScene1;
	public var testScene2 : TestScene2;
	
	public function new()
	{
		testLayer1 = new TestLayer1();
		testLayer2 = new TestLayer2();
		
		testScene1 = new TestScene1();
		testScene2 = new TestScene2();
	}
}
