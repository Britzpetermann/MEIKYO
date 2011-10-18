package kumite.spritemesh;

import haxe.rtti.Infos;

class Config implements Infos
{
	public static var TEST_ATLAS : GLTextureAtlasConfig = GLTextureAtlasConfig.create(4096, 2048, GL.LINEAR_MIPMAP_NEAREST);
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
		
	public var layer : SpriteMeshLayer;
	public var scene : SpriteMeshScene;
	public var  spritemesh2ColorLayer : kumite.layer.ColorLayer;
	
	public function new()
	{
		spritemesh2ColorLayer = new kumite.layer.ColorLayer();
		spritemesh2ColorLayer.color = new Color(1.0, 1.0, 1.0, 1);
		spritemesh2ColorLayer.layerId = "spritemesh2ColorLayer";
		
		layer = new SpriteMeshLayer();
		scene = new SpriteMeshScene();
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
