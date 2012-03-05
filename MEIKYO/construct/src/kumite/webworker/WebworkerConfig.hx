package kumite.webworker;

import kumite.displaylist.DisplayListLayer;
import kumite.scene.DefaultScene;
import kumite.layer.ClearLayer;

import haxe.rtti.Infos;

class WebworkerConfig implements Infos
{
	@Inject
	public var displayListLayer : DisplayListLayer;

	public var scene : DefaultScene;
	public var clearLayer : ClearLayer;

	public function new()
	{
		clearLayer = new ClearLayer();
		clearLayer.color = new Color(0, 0, 0.0, 1);

		scene = new DefaultScene("Webworker");
	}

	@Complete
	public function complete()
	{
		scene.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene.addLayerLifecycle(displayListLayer);
	}

	@Sequence("boot", "start")
	public function start()
	{
		Log.info("start");
		
		var worker = new Worker("bin/kumite.webworker.WorkingInstance.js");
		worker.onmessage = function(e) {
			Log.info(e.data);
		};
		
		worker.postMessage(haxe.Serializer.run(new Vec2(1, 2)));		
	}
}