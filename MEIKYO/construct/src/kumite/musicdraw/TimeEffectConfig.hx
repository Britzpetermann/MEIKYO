package kumite.musicdraw;

import haxe.rtti.Infos;

import reflect.ClassInfo;
import reflect.Binding;

import kumite.displaylist.DisplayListLayer;
import kumite.scene.DefaultScene;
import kumite.layer.ClearLayer;
import kumite.layer.TextureLayer;

class TimeEffectConfig implements Infos
{
	public var scene : DefaultScene;
	public var layer : TextureLayer;
	public var effectWorkerHandler : EffectWorkerHandler;
	
	public function new()
	{
		effectWorkerHandler = new EffectWorkerHandler();
		effectWorkerHandler.effectClassName = "kumite.musicdraw.TimeEffect";
		effectWorkerHandler.params.addFloatParam("count", 5000, 100, 100000);
		effectWorkerHandler.params.addFloatParam("radius", 0.23, 0, 1);
		effectWorkerHandler.params.addFloatParam("levelRadius", 1.7, -10, 10);
		
		layer = new TextureLayer();
		
		scene = new DefaultScene("Time");
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