package kumite.testscene;

import kumite.scene.Scene;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var testBackgroundLayer1 : TestBackgroundLayer;
	public var testBackgroundLayer2 : TestBackgroundLayer;
	
	public var testLayer1 : TestLayer;
	public var testLayer2 : TestLayer;
	public var testLayer3 : TestLayer;
	
	public var testScene1 : TestScene1;
	public var testScene2 : TestScene2;
	public var testScene3 : TestScene3;
	public var testScene4 : TestScene4;
	
	public var testTextureLoader : TestTextureLoader;
	
	public function new()
	{
		testTextureLoader = new TestTextureLoader();
		
		testBackgroundLayer1 = new TestBackgroundLayer();
		testBackgroundLayer1.color = new Color(1, 1, 1, 0.2);
		testBackgroundLayer1.direction = -1;
		testBackgroundLayer1.layerId = "testBackgroundLayer1";
		
		testBackgroundLayer2 = new TestBackgroundLayer();
		testBackgroundLayer2.color = new Color(1, 0.5, 1, 0.2);
		testBackgroundLayer2.direction = 1;
		testBackgroundLayer2.layerId = "testBackgroundLayer2";
		
		testLayer1 = new TestLayer();
		testLayer1.layerId = "testLayer1";
		testLayer1.color = new Color(1, 0, 0, 0.8);
		testLayer1.scale = 2;
		testLayer1.position = new Vec3(1, 0, 2);
		
		testLayer2 = new TestLayer();
		testLayer2.layerId = "testLayer2";
		testLayer2.color = new Color(0, 1, 0, 0.6);
		testLayer2.scale = 2;
		testLayer2.position = new Vec3(-1, 0, 1);
		
		testLayer3 = new TestLayer();
		testLayer3.layerId = "testLayer3";
		testLayer3.color = new Color(0, 0, 1, 0.4);
		testLayer3.scale = 2;
		testLayer3.position = new Vec3(-1, 0, 3);
		
		testScene1 = new TestScene1();
		testScene2 = new TestScene2();
		testScene3 = new TestScene3();
		testScene4 = new TestScene4();
	}
}
