package kumite.layer;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.scene.TransitionContext;
import kumite.stage.Stage;
import kumite.time.Time;
import kumite.projection.Projection;
import kumite.camera.Camera;

import haxe.rtti.Infos;

class ClearLayer implements LayerLifecycle, implements Infos
{
	@Param
	public var clearColor : Color;
	
	public function new()
	{
		clearColor = new Color(0, 0, 0, 1);
	}
	
	public function init()
	{
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
		render();
	}
		
	public function render()
	{
		GL.clearColor(clearColor.r, clearColor.g, clearColor.b, clearColor.a);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT | GL.STENCIL_BUFFER_BIT);		
	}
}