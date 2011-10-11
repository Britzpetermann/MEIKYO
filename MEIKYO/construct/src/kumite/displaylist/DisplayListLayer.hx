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
	
	public var transition : Float;
	
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
		transition = transitionContext.transition;
		render();
	}
		
	public function render()
	{
		Stats.measureFPS();
		
		GLDisplayList.getDefault().stage.alpha = transition;
		GLDisplayList.getDefault().setStageSize(stage.width, stage.height);
		GLDisplayList.getDefault().dispatchEnterFrame();
		renderer.render(stage.width, stage.height);		
	}
}
