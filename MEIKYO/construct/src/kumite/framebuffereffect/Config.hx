package kumite.framebuffereffect;

import kumite.layer.ClearLayer;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var fbClearLayer1 : ClearLayer;
	public var fbClearLayer2 : ClearLayer;
	public var fbLayer : FBLayer;
	public var fbEnableLayer : FBEnableLayer;
	public var fbDisableLayer : FBDisableLayer;
	public var fbTextureLayer : FBTextureLayer;
	
	public var fbScene : FBScene;
	
	public function new()
	{
		fbClearLayer1 = new ClearLayer();
		fbClearLayer1.clearColor = new Color(1, 0, 0, 1);
		fbClearLayer2 = new ClearLayer();
		fbClearLayer2.clearColor = new Color(0, 1, 0, 1);
		
		fbLayer = new FBLayer();
		fbEnableLayer = new FBEnableLayer();
		fbDisableLayer = new FBDisableLayer();
		fbTextureLayer = new FBTextureLayer();
		fbTextureLayer.texture = fbEnableLayer.framebuffer;
		fbScene = new FBScene();
	}
}
