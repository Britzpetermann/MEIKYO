package kumite.testscene;

import haxe.rtti.Infos;

class Config implements Infos
{
	public static var TEST1 : GLTextureConfig = GLTextureConfig.create("data/image/along-the-line.png"); 
	public static var TEST2 : GLTextureConfig = GLTextureConfig.create("data/image/beware-of-the-dog.jpg"); 

	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	public var testClearLayer : kumite.layer.ClearLayer;
	
	public var colorLayer1 : kumite.layer.ColorLayer;
	public var colorLayer2 : kumite.layer.ColorLayer;
	public var colorLayer3 : kumite.layer.ColorLayer;
	public var colorLayer4 : kumite.layer.ColorLayer;
	
	public var textureLayer1 : kumite.layer.TextureLayer;
	public var textureLayer2 : kumite.layer.TextureLayer;
	
	public var testLayer1 : kumite.layer.TestLayer;
	public var testLayer2 : kumite.layer.TestLayer;
	public var testLayer3 : kumite.layer.TestLayer;
	
	public var testScene1 : TestScene1;
	public var testScene2 : TestScene2;
	public var testScene3 : TestScene3;
	public var testScene4 : TestScene4;
	
	public function new()
	{
		testClearLayer = new kumite.layer.ClearLayer();
		
		colorLayer1 = new kumite.layer.ColorLayer();
		colorLayer1.color = new Color(0.5, 0.5, 0.5, 1);
		
		colorLayer2 = new kumite.layer.ColorLayer();
		colorLayer2.color = new Color(0.7, 0.7, 0.7, 1);
		
		colorLayer3 = new kumite.layer.ColorLayer();
		colorLayer3.color = new Color(0.0, 0.0, 0.0, 1);
		
		colorLayer4 = new kumite.layer.ColorLayer();
		colorLayer4.color = new Color(0.0, 0.0, 0.0, 1);
		
		textureLayer1 = new kumite.layer.TextureLayer();
		textureLayer1.textureConfig = TEST1;
		textureLayer1.scale = 0.6;
		
		textureLayer2 = new kumite.layer.TextureLayer();
		textureLayer2.textureConfig = TEST2;
		textureLayer2.scale = 0.6;
		
		testLayer1 = new kumite.layer.TestLayer();
		testLayer1.color = new Color(1, 0, 0, 0.8);
		testLayer1.scale = 2;
		testLayer1.position = new Vec3(1, 0, 2);
		
		testLayer2 = new kumite.layer.TestLayer();
		testLayer2.color = new Color(0, 1, 0, 0.6);
		testLayer2.scale = 2;
		testLayer2.position = new Vec3(-1, 0, 1);
		
		testLayer3 = new kumite.layer.TestLayer();
		testLayer3.color = new Color(0, 0, 1, 0.4);
		testLayer3.scale = 2;
		testLayer3.position = new Vec3(-1, 0, 3);
		
		testScene1 = new TestScene1();
		testScene2 = new TestScene2();
		testScene3 = new TestScene3();
		testScene4 = new TestScene4();
	}
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		group.add(new GLTextureLoadingTask(textureRegistry, TEST1));
		group.add(new GLTextureLoadingTask(textureRegistry, TEST2));
		
		return group;
	}	
}
