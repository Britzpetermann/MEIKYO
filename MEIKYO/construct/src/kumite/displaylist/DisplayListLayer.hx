package kumite.displaylist;

import kumite.stage.Stage;
import kumite.time.Tick;
import kumite.scene.LayerLifecycle;

import bpmjs.Stats;

import haxe.rtti.Infos;

class DisplayListLayer implements Infos, implements LayerLifecycle
{
	@Inject
	public var stage : Stage;
	
	private var renderer : GLDisplayListRenderer;
	
	public function new() {}

	public function init()
	{
		renderer = new GLDisplayListRenderer();
		renderer.init();
	}
	
	public function render()
	{
		Stats.measureFPS();
		
		GLDisplayList.getDefault().setStageSize(stage.width, stage.height);
		GLDisplayList.getDefault().dispatchEnterFrame();
		renderer.render(stage.width, stage.height);		
	}
}
