package kumite.displaylist;

import kumite.stage.Stage;
import kumite.time.Tick;
import kumite.scene.RenderContext;
import kumite.scene.LayerLifecycle;
import kumite.scene.TransitionContext;

import bpmjs.Stats;

import haxe.rtti.Infos;

class DisplayListLayer implements Infos, implements LayerLifecycle
{
	public var transition : Float;
	
	private var renderer : GLDisplayListRenderer;
	
	public function new();

	public function init()
	{
		renderer = new GLDisplayListRenderer();
		renderer.init();
	}

	public function renderTransition(transitionContext : TransitionContext)
	{
		transition = transitionContext.transition;
		render(transitionContext);
	}
		
	public function render(renderContext : RenderContext)
	{
		Stats.measureFPS();
		
		GLDisplayList.getDefault().stage.alpha = transition;
		GLDisplayList.getDefault().setStageSize(renderContext.width, renderContext.height);
		GLDisplayList.getDefault().dispatchEnterFrame();
		renderer.render(renderContext.width, renderContext.height);		
	}
}
