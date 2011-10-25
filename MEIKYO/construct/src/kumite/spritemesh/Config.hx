package kumite.spritemesh;

import haxe.rtti.Infos;

//TODO trace offset
//TODO navi transition input stack
class Config implements Infos
{
	public static var TEST_ATLAS : GLTextureAtlasConfig = GLTextureAtlasConfig.create(4096, 2048, GL.LINEAR_MIPMAP_NEAREST);
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
		
	public var layer1 : SpriteMeshLayer;
	public var layer2 : SpriteMeshLayer;
	public var layer3 : SpriteMeshLayer;
	
	public var scene1 : SpriteMeshScene;
	public var scene2 : SpriteMeshScene;
	public var scene3 : SpriteMeshScene;
	
	public var  spritemesh2ColorLayer : kumite.layer.ColorLayer;
	
	public function new()
	{
		spritemesh2ColorLayer = new kumite.layer.ColorLayer();
		spritemesh2ColorLayer.color = new Color(0.0, 0.0, 0.0, 1);
		
		layer1 = new SpriteMeshLayer();
		layer1.offset = 0;
		layer1.textureFrequenceParam = 0.0000031;
		layer1.textureAmpParam = 304;
		
		layer2 = new SpriteMeshLayer();
		layer2.offset = 1000 * 20;
		layer2.textureFrequenceParam = 0.00001; 
		layer2.textureAmpParam = 305; 
		
		layer3 = new SpriteMeshLayer();
		layer3.offset = 1000 * 30;
		layer3.textureFrequenceParam = 0.00002; 
		layer3.textureAmpParam = 39.4; 
		
		scene1 = new SpriteMeshScene("1");
		scene1.layer = layer1;
		
		scene2 = new SpriteMeshScene("2");
		scene2.layer = layer2;
		
		scene3 = new SpriteMeshScene("3");
		scene3.layer = layer3;
	}
	
	@Init
	public function init()
	{
		
	}
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		for(i in 1...190)
		{
			var s = "" + i;
			while (s.length < 4)
				s = "0" + s;
			GLTextureAtlasPartConfig.create(TEST_ATLAS, "data/image/karlo/image" + s + ".png");
		}
		group.add(new GLTextureAtlasLoadingTask(textureRegistry, TEST_ATLAS));
		
		return group;
	}	
}
