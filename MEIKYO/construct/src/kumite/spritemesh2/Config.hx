package kumite.spritemesh2;

import haxe.rtti.Infos;

class Config implements Infos
{
	public static var TEST_ATLAS : GLTextureAtlasConfig = GLTextureAtlasConfig.create(1024, 1024);
	
	public static var MAN1 : GLTextureAtlasPartConfig = GLTextureAtlasPartConfig.create(TEST_ATLAS, "data/image/flyingman/man1.png");
	public static var MAN2 : GLTextureAtlasPartConfig = GLTextureAtlasPartConfig.create(TEST_ATLAS, "data/image/flyingman/man2.png");
	public static var MAN3 : GLTextureAtlasPartConfig = GLTextureAtlasPartConfig.create(TEST_ATLAS, "data/image/flyingman/man3.png");
	public static var FLOWER1 : GLTextureAtlasPartConfig = GLTextureAtlasPartConfig.create(TEST_ATLAS, "data/image/flyingman/flower1.png");
	public static var FLOWER2 : GLTextureAtlasPartConfig = GLTextureAtlasPartConfig.create(TEST_ATLAS, "data/image/flyingman/flower2.png");
	public static var BUTTERFLY : GLTextureAtlasPartConfig = GLTextureAtlasPartConfig.create(TEST_ATLAS, "data/image/flyingman/butterfly.png");
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
		
	public var layer : SpriteMeshLayer;
	public var scene : SpriteMeshScene;
	public var  spritemesh2ColorLayer : kumite.layer.ColorLayer;
	
	public function new()
	{
		spritemesh2ColorLayer = new kumite.layer.ColorLayer();
		spritemesh2ColorLayer.color = new Color(0.1, 0.2, 0.3, 1);
		spritemesh2ColorLayer.layerId = "spritemesh2ColorLayer";
		
		layer = new SpriteMeshLayer();
		scene = new SpriteMeshScene();
	}
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		group.add(new GLTextureAtlasLoadingTask(textureRegistry, TEST_ATLAS));
		
		return group;
	}	
}
