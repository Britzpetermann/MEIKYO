package kumite.layer.effect;

import kumite.scene.LayerLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.RenderContext;

import haxe.rtti.Infos;

class TestFilter implements LayerLifecycle, implements Infos
{
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Param
	public var textureConfig : GLTextureConfig;
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : WebGLBuffer;

	var textureUniform : GLUniformLocation;
	var amountUniform : GLUniformLocation;
			
	var amount : Float;
		
	public function new() {}
	
	public function init()
	{
		shaderProgram = GL.createProgram(Vertex, Fragment);

		vertexPositionAttribute = GL.getAttribLocation2("vertexPosition", 2, GL.BYTE);
		vertexPositionAttribute.updateBuffer(new Int8Array([
			0,  0,
			1,  0,
			0,  1,
			1,  1,
		]));

		textureUniform = GL.getUniformLocation("texture");
		
		amountUniform = GL.getUniformLocation("amount");
		amount = 1;
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
		amount = transitionContext.transition;
		render(transitionContext);
	}
		
	public function render(renderContext : RenderContext)
	{
		GL.useProgram(shaderProgram);
		GL.viewport(0, 0, renderContext.width, renderContext.height);
		
		GL.disable(GL.DEPTH_TEST);
		GL.disable(GL.BLEND);

		vertexPositionAttribute.vertexAttribPointer();

		var texture = textureRegistry.get(textureConfig);
		
		textureUniform.setTexture(texture);
		amountUniform.setFloat(amount);
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
	}
}

@GLSL("

	attribute vec2 vertexPosition;

	varying vec4 vertex;
	varying vec2 textureCoord;

	void main(void)
	{
		gl_Position = vec4((vertexPosition - 0.5) * 2.0, 0.0, 1.0);
		vertex = vec4(vertexPosition, 0.0, 1.0);
		textureCoord = vertexPosition.xy;
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
		precision highp float;
	#endif

	uniform sampler2D texture;
	uniform float amount;

	varying vec2 textureCoord;

	void main(void)
	{
		vec4 color = texture2D(texture, textureCoord);
		vec4 result = color * color.w + vec4(textureCoord.x, textureCoord.y, 0.0, 1.0);
		gl_FragColor = result * amount + color * (1.0 - amount);
	}

") private class Fragment {}
