package kumite.layer;

import kumite.scene.LayerLifecycle;
import kumite.scene.RenderContext;
import kumite.scene.TransitionContext;

import haxe.rtti.Infos;

class FramebufferDisableLayer implements LayerLifecycle, implements Infos
{
	public function new() {}
	
	public function init() {}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
		render(transitionContext);
	}
	
	public function render(renderContext : RenderContext)
	{
		renderContext.popViewport();
		GL.bindFramebuffer(GL.FRAMEBUFFER, null);		
	}
}