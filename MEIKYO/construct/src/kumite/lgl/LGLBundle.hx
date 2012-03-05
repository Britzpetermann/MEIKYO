package kumite.lgl;

import kumite.displaylist.DisplayListLayer;
import kumite.scene.DefaultScene;
import kumite.layer.ClearLayer;

import haxe.rtti.Infos;

@Context //TODO add this instance as child context
class LGLBundle implements Infos
{
	public var scene1 : DefaultScene;
	public var lglReader1 : LGLReader;
	public var lgl1 : LGL;
	public var lglWorkerHandler1 : LGLWorkerHandler;
	public var lglLayer1 : LGLLayer;
	
	@Inject
	public var clearLayer : ClearLayer;
	
	@Inject
	public var displayListLayer : DisplayListLayer;
	
	public function new()
	{
		lgl1 =  new LGL();
		
		lglLayer1 = new LGLLayer();
		lglLayer1.lgl = lgl1;
		lglLayer1.scale = 0.3;
		
		lglWorkerHandler1 = new LGLWorkerHandler();
		lglWorkerHandler1.lgl = lgl1;
		lglWorkerHandler1.lglLayer = lglLayer1;
		
		lglReader1 = new LGLReader();
		lglReader1.limit = 800;
		lglReader1.lgl = lgl1;
		
		scene1 = new DefaultScene("LGL1");

		//workaround for child context		
		bpmjs.ContextBuilder.configure(scene1);
		bpmjs.ContextBuilder.configure(lgl1);
		bpmjs.ContextBuilder.configure(lglLayer1);
		bpmjs.ContextBuilder.configure(lglWorkerHandler1);
		bpmjs.ContextBuilder.configure(lglReader1);
	}
	
	@Complete
	public function complete()
	{
		scene1.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene1.addLayerLifecycle(lglLayer1);
		scene1.addLayerLifecycle(displayListLayer);
	}	
}
