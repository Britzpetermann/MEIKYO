package kumite.lgl;

import kumite.displaylist.DisplayListLayer;
import kumite.scene.DefaultScene;
import kumite.layer.ClearLayer;

import haxe.rtti.Infos;

class LGLConfig implements Infos
{
	@Inject
	public var displayListLayer : DisplayListLayer;

	public var clearLayer : ClearLayer;
	
	public var lglBundle : LGLBundle;
	
	public var scene2 : DefaultScene;
	public var lglReader2 : LGLReader;
	public var lglWorkerHandler2 : LGLWorkerHandler;
	public var lgl2 : LGL;
	public var lglLayer2 : LGLLayer;

	public function new()
	{
		clearLayer = new ClearLayer();
		clearLayer.color = new Color(0, 0, 0.0, 1);
		
		lglBundle = new LGLBundle();
		lglBundle.clearLayer = clearLayer;
		
		lgl2 =  new LGL();
		
		lglLayer2 = new LGLLayer();
		lglLayer2.lgl = lgl2;
		lglLayer2.scale = 0.25;

		
		lglWorkerHandler2 = new LGLWorkerHandler();
		lglWorkerHandler2.lgl = lgl2;
		lglWorkerHandler2.lglLayer = lglLayer2;

		lglReader2 = new LGLReader();
		lglReader2.limit = 10000;
		lglReader2.lgl = lgl2;
		

		scene2 = new DefaultScene("LGL2");
	}

	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();

		group.add(lglReader2.read("data/lgl/1105496683.lgl"));
		group.add(lglBundle.lglReader1.read("data/lgl/1105841711.lgl"));
		
		//group.add(lglReader.read("data/lgl/1105841711.lgl"));
		//group.add(lglReader.read("data/lgl/1069646562.lgl"));

		return group;
	}

	@Sequence("boot", "start")
	public function start()
	{
		lglBundle.lglWorkerHandler1.start();
		lglWorkerHandler2.start();
	}

	@Complete
	public function complete()
	{
		scene2.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene2.addLayerLifecycle(lglLayer2);
		scene2.addLayerLifecycle(displayListLayer);
	}

}