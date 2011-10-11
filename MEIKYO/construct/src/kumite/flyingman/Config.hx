package kumite.flyingman;

import haxe.rtti.Infos;

class Config implements Infos
{
	public static var PAPER : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/paper.jpg");
	public static var MAN1 : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/man1.png");
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	public var paperBackground : kumite.layer.TextureLayer;
	public var flyingManLayer : FlyingManLayer;
	public var flyingManScene : FlyingManScene;
	
	public function new()
	{
		paperBackground = new kumite.layer.TextureLayer();
		paperBackground.textureConfig = PAPER;
		paperBackground.layerId = "paperBackground";
		
		flyingManLayer = new FlyingManLayer();
		flyingManScene = new FlyingManScene();
	}
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		group.add(new GLTextureLoadingTask(textureRegistry, PAPER));
		group.add(new GLTextureLoadingTask(textureRegistry, MAN1));
		
		return group;
	}	
}
