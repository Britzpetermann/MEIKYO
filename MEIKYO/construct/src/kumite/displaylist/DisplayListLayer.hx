package kumite.displaylist;

import kumite.stage.Stage;
import kumite.time.Tick;
import kumite.scene.LayerLifecycle;
import kumite.scene.TransitionContext;

import bpmjs.Stats;

import haxe.rtti.Infos;

class DisplayListLayer implements Infos, implements LayerLifecycle
{
	@Inject
	public var stage : Stage;
	
	public var layerId : String;
	
	private var renderer : GLDisplayListRenderer;
	
	public function new();

	public function init()
	{
		layerId = "DisplayListLayer";
		renderer = new GLDisplayListRenderer();
		renderer.init();
	}

	public function renderTransition(transitionContext : TransitionContext)
	{
		render();
	}
		
	public function render()
	{
		Stats.measureFPS();
		
		GLDisplayList.getDefault().setStageSize(stage.width, stage.height);
		GLDisplayList.getDefault().dispatchEnterFrame();
		renderer.render(stage.width, stage.height);		
	}
}
