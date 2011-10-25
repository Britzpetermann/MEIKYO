package kumite.framebuffereffect;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.layer.LayerTransition;
import kumite.layer.LayerTransitions;
import kumite.scene.TransitionContext;
import kumite.stage.Stage;
import kumite.time.Time;
import kumite.projection.Projection;
import kumite.camera.Camera;

import haxe.rtti.Infos;

class FBDisableLayer implements LayerLifecycle, implements Infos
{
	public function new();
	
	public function init()
	{
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
		render();
	}
	
	public function render()
	{
		GL.bindFramebuffer(GL.FRAMEBUFFER, null);		
	}
}