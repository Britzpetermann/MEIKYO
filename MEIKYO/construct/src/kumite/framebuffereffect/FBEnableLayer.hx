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

class FBEnableLayer implements LayerLifecycle, implements Infos
{
	public var framebuffer : GLFramebuffer;
		
	public function new()
	{
		framebuffer = new GLFramebuffer();
	}
	
	public function init()
	{
		framebuffer.width = 1024;
		framebuffer.height = 1024;

		framebuffer.framebuffer = GL.createFramebuffer();
		GL.bindFramebuffer(GL.FRAMEBUFFER, framebuffer.framebuffer);

		framebuffer.texture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, framebuffer.texture);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);

		GL.texImage2DArrayBufferView(GL.TEXTURE_2D, 0, GL.RGBA, framebuffer.width, framebuffer.height, 0, GL.RGBA, GL.UNSIGNED_BYTE, null);
		GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, framebuffer.texture, 0);

		GL.bindTexture(GL.TEXTURE_2D, null);
		GL.bindFramebuffer(GL.FRAMEBUFFER, null);		
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
		render();
	}
	
	public function render()
	{
		GL.bindFramebuffer(GL.FRAMEBUFFER, framebuffer.framebuffer);		
	}
}