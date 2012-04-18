package kumite.layer.effect;

import UserAgentContext;

import kumite.time.Time;

import kumite.scene.LayerLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.RenderContext;

import haxe.rtti.Infos;

class RippleFilter implements LayerLifecycle, implements Infos
{
	@Inject
	public var time : Time;
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Param
	public var textureConfig : GLTextureConfig;
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : WebGLBuffer;

	var resolutionUniform : GLUniformLocation;
	var timeUniform : GLUniformLocation;
	var amountUniform : GLUniformLocation;
	var textureUniform : GLUniformLocation;
			
	var amount : Float;
		
	public function new() {}
	
	public function init()
	{
		shaderProgram = GL.createProgram(Vertex, Fragment);

		vertexPositionAttribute = GL.getAttribLocation2("vertexPosition", 2, GL.BYTE);
		vertexPositionAttribute.updateBuffer(new Int8Array([
			-1,  -1,
			1,  -1,
			-1,  1,
			1,  1,
		]));

		resolutionUniform = GL.getUniformLocation("resolution");
		timeUniform = GL.getUniformLocation("time");
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
		timeUniform.setFloat(time.ms / 1000);
		resolutionUniform.setVec2(new Vec2(renderContext.width, renderContext.height));
		
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
	}
}

@GLSL("

	attribute vec2 vertexPosition;

	varying vec2 tc;

	void main(void)
	{
		gl_Position = vec4(vertexPosition.x, vertexPosition.y, 0.0, 1.0);
		tc = (vertexPosition.xy + 1.0) * 0.5;
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
	precision highp float;
	#endif
	
	varying vec2 tc;

	uniform vec2 resolution;
	uniform float time;
	uniform sampler2D texture;
	
	void main(void)
	{
		float r1 = 0.002;
	
		vec2 p = -1.0 + 2.0 * tc;
		float len = length(p);

		vec2 uv;

		uv.x = tc.x + sin(time + tc.y * 165.0) * r1 + cos(time * 2.0 + tc.y * 195.0 + tc.x * 75.0 + len * 15.0) * r1 + cos(len * 17.0 + time * 2.0 + tc.y * 99.0 + tc.x * 166.0) * r1;
		uv.y = tc.y + cos(time * 0.8 + tc.x * 170.0 + len * 10.0) * r1 + sin(time * 2.5 + tc.x * 75.0 + tc.y * 71.0) * r1 + sin(time * 2.5 + tc.x * 177.0 + tc.y * 58.0) * r1;

		vec4 pixel = texture2D(texture, uv);
		gl_FragColor = pixel;
	}

") private class Fragment {}
