package kumite.flyingman;

import haxe.rtti.Infos;

class Config implements Infos
{
	public static var PAPER : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/paper.jpg");
	
	public var paperBackground : kumite.layer.TextureLayer;
	public var flyingManLayer : kumite.flyingman.FlyingManLayer;
	public var flyingManScene : FlyingManScene;
	
	public function new()
	{
		paperBackground = new kumite.layer.TextureLayer();
		paperBackground.textureConfig = PAPER;
		paperBackground.layerId = "paperBackground";
		
		flyingManLayer = new kumite.flyingman.FlyingManLayer();
		
		flyingManScene = new FlyingManScene();
	}
}
