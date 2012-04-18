package kumite.webworker;

import haxe.rtti.Infos;
import bpmjs.WorkerService;

import kumite.displaylist.DisplayListLayer;
import kumite.scene.DefaultScene;
import kumite.layer.ClearLayer;

class WebworkerConfig implements Infos
{
	@Inject
	public var displayListLayer : DisplayListLayer;

	public var scene : DefaultScene;
	public var clearLayer : ClearLayer;
	
	var workerService:WorkerService;
	var megs:Uint8Array;

	public function new()
	{
		clearLayer = new ClearLayer();
		clearLayer.color = new Color(0, 0, 0.0, 1);

		scene = new DefaultScene("Webworker");
		megs = new Uint8Array(1024 * 1024 * 100);
	}

	@Complete
	public function complete()
	{
		scene.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene.addLayerLifecycle(displayListLayer);
	}

	@Sequence("boot", "finish")
	public function finish()
	{
		Log.info("finish");
		
		workerService = new WorkerService();
		workerService.debug = true;
		workerService.init("bin/kumite.webworker.WorkingInstanceImpl.js");
		
		workerService.call("init", loop);
	}
	
	function loop()
	{
		workerService.call("configure", [1, 2, 3]);
		workerService.callTransfer("render", megs.buffer, handleRender);
	}
	
	function handleRender(buffer:ArrayBuffer)
	{
		megs = new Uint8Array(buffer);
		haxe.Timer.delay(loop, 1000);
	}
}