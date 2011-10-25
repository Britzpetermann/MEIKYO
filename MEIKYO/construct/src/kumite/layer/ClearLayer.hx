package kumite.layer;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.scene.TransitionContext;
import kumite.scene.RenderContext;
import kumite.stage.Stage;
import kumite.time.Time;
import kumite.projection.Projection;
import kumite.camera.Camera;

import haxe.rtti.Infos;

class ClearLayer implements LayerLifecycle, implements Infos
{
	@Param
	public var color : Color;
	
	public function new()
	{
		color = new Color(0, 0, 0, 0);
	}
	
	public function init()
	{
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
		render(transitionContext);
	}
		
	public function render(renderContext : RenderContext)
	{
		GL.clearColor(color.r, color.g, color.b, color.a);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT | GL.STENCIL_BUFFER_BIT);		
	}
}