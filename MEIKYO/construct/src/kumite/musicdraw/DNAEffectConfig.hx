package kumite.musicdraw;

import haxe.rtti.Infos;

import reflect.ClassInfo;
import reflect.Binding;

import kumite.displaylist.DisplayListLayer;
import kumite.scene.DefaultScene;
import kumite.layer.ClearLayer;
import kumite.layer.TextureLayer;

class DNAEffectConfig implements Infos
{
	public var scene : DefaultScene;
	public var layer : TextureLayer;
	public var effectWorkerHandler : EffectWorkerHandler;
	
	public function new()
	{
		effectWorkerHandler = new EffectWorkerHandler();
		effectWorkerHandler.effectClassName = "kumite.musicdraw.DNAEffect";
		effectWorkerHandler.params.addFloatParam("paramLength", 1, 0, 1);
		effectWorkerHandler.params.addFloatParam("paramPosition", 0, 0, 1);
		
		layer = new TextureLayer();
		
		scene = new DefaultScene("DNA");
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