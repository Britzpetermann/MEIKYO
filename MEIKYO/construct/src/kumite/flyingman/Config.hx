package kumite.flyingman;

import haxe.rtti.Infos;

class Config implements Infos
{
	public static var PAPER : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/paper.jpg");
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	public var paperBackground : kumite.layer.TextureLayer;
	
	public var flyingManGraph : FlyingManGraph;
	
	public var flyingManLayer3 : FlyingManLayer;
	public var flyingManScene3 : FlyingManScene;
	
	public var flyingManLayer1 : FlyingManLayer;
	public var flyingManScene1 : FlyingManScene;
	
	public var flyingManLayer2 : FlyingManLayer;
	public var flyingManScene2 : FlyingManScene;
	
	public var flyingManLayer4 : FlyingManLayer;
	public var flyingManScene4 : FlyingManScene;
	
	public function new()
	{
		paperBackground = new kumite.layer.TextureLayer();
		paperBackground.textureConfig = PAPER;
		
		flyingManGraph = new FlyingManGraph();

		flyingManLayer1 = new FlyingManLayer();
		flyingManLayer1.cameraId = "flyingMan1";
		flyingManScene1 = new FlyingManScene("B CLOSEUP 2");
		flyingManScene1.flyingManLayer = flyingManLayer1;
		
		flyingManLayer2 = new FlyingManLayer();
		flyingManLayer2.cameraId = "flyingMan2";
		flyingManScene2 = new FlyingManScene("FLYING MAN 2");
		flyingManScene2.flyingManLayer = flyingManLayer2;
		
		flyingManLayer3 = new FlyingManLayer();
		flyingManLayer3.cameraId = "flyingMan3";
		flyingManScene3 = new FlyingManScene("B CLOSEUP");
		flyingManScene3.flyingManLayer = flyingManLayer3;
		
		flyingManLayer4 = new FlyingManLayer();
		flyingManLayer4.cameraId = "flyingMan4";
		flyingManScene4 = new FlyingManScene("FLYING MAN 4");
		flyingManScene4.flyingManLayer = flyingManLayer4;
	}
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		group.add(new GLTextureLoadingTask(textureRegistry, PAPER));
		
		return group;
	}	
}
