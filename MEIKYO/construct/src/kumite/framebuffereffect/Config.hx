package kumite.framebuffereffect;

import kumite.displaylist.DisplayListLayer;
import kumite.layer.ClearLayer;
import kumite.scene.DefaultScene;

import haxe.rtti.Infos;

class Config implements Infos
{
	@Inject
	public var displayListLayer : DisplayListLayer;
	
	public var fbClearLayer1 : ClearLayer;
	public var fbClearLayer2 : ClearLayer;
	public var fbLayer : FBLayer;
	public var fbEnableLayer : FBEnableLayer;
	public var fbDisableLayer : FBDisableLayer;
	public var fbTextureLayer : FBTextureLayer;
	
	public var scene : DefaultScene;
	
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
		
		scene = new DefaultScene("FB TEST");
	}
	
	@Complete
	public function complete()
	{
		scene.addLayerLifecycle(fbClearLayer1, kumite.layer.LayerId.CLEAR);
		scene.addLayerLifecycle(fbEnableLayer);
		scene.addLayerLifecycle(fbClearLayer2);
		scene.addLayerLifecycle(fbLayer);
		scene.addLayerLifecycle(fbDisableLayer);
		scene.addLayerLifecycle(fbTextureLayer);
		scene.addLayerLifecycle(displayListLayer);
	}
}
