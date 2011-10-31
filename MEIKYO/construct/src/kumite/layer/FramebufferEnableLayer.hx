package kumite.layer;

import kumite.scene.LayerLifecycle;
import kumite.scene.RenderContext;
import kumite.scene.TransitionContext;

import haxe.rtti.Infos;

class FramebufferEnableLayer implements LayerLifecycle, implements Infos
{
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	public var framebuffer : GLFramebuffer;
	
	public var textureConfig : GLTextureConfig;
		
	public function new(width : Int, height : Int)
	{
		framebuffer = new GLFramebuffer();
		framebuffer.width = width;
		framebuffer.height = height;
		textureConfig = GLTextureConfig.createForFrameBuffer();
	}
	
	public function init()
	{
		framebuffer.framebuffer = GL.createFramebuffer();
		GL.bindFramebuffer(GL.FRAMEBUFFER, framebuffer.framebuffer);
		framebuffer.texture = GL.createTexture();
		
		textureRegistry.register(textureConfig, framebuffer);
		
		GL.bindTexture(GL.TEXTURE_2D, framebuffer.texture);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
		//GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.REPEAT);
    	//GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.REPEAT);
		GL.texImage2DArrayBufferView(GL.TEXTURE_2D, 0, GL.RGBA, framebuffer.width, framebuffer.height, 0, GL.RGBA, GL.UNSIGNED_BYTE, null);
		GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, framebuffer.texture, 0);

		GL.bindTexture(GL.TEXTURE_2D, null);
		GL.bindFramebuffer(GL.FRAMEBUFFER, null);		
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
		render(transitionContext);
	}
	
	public function render(renderContext : RenderContext)
	{
		renderContext.pushViewport(framebuffer.width, framebuffer.height);
		GL.bindFramebuffer(GL.FRAMEBUFFER, framebuffer.framebuffer);		
	}
}