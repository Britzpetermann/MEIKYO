package kumite.musicdraw;

import haxe.rtti.Infos;

import reflect.ClassInfo;
import reflect.Binding;

import kumite.displaylist.DisplayListLayer;
import kumite.scene.DefaultScene;
import kumite.layer.ClearLayer;
import kumite.layer.TextureLayer;

class RasterEffectConfig implements Infos
{
	public var scene : DefaultScene;
	public var layer : TextureLayer;
	public var effectWorkerHandler : EffectWorkerHandler;
	
	public function new()
	{
		effectWorkerHandler = new EffectWorkerHandler();
		effectWorkerHandler.effectClassName = "kumite.musicdraw.RasterEffect";
		effectWorkerHandler.params.addFloatParam("rx", 7, 1, 20);
		effectWorkerHandler.params.addFloatParam("ry", 10, 1, 20);
		effectWorkerHandler.params.addFloatParam("scale", 7, 0, 10);
		
		layer = new TextureLayer();
		
		scene = new DefaultScene("RASTER");
		scene.useDefaultLayers();
		scene.enterSignaler.bind(effectWorkerHandler.enter);
		scene.transitionOutSignaler.bind(effectWorkerHandler.exit);
	}

	@Sequence("boot", "init")
	public function init()
	{
		scene.addLayerLifecycle(layer);
		layer.texture = effectWorkerHandler.createTexture();
	}
}