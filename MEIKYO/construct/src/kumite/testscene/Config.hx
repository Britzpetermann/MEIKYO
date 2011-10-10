package kumite.testscene;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var testLayer1 : TestLayer1;
	public var testLayer2 : TestLayer2;
	public var testLayer3 : TestLayer3;
	
	public var testScene1 : TestScene1;
	public var testScene2 : TestScene2;
	public var testScene3 : TestScene3;
	public var testScene4 : TestScene4;
	
	public function new()
	{
		testLayer1 = new TestLayer1();
		testLayer2 = new TestLayer2();
		testLayer3 = new TestLayer3();
		
		testScene1 = new TestScene1();
		testScene2 = new TestScene2();
		testScene3 = new TestScene3();
		testScene4 = new TestScene4();
	}
}
