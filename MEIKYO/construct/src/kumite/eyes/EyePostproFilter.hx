package kumite.eyes;

import kumite.time.Time;

import kumite.scene.LayerLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.RenderContext;

import haxe.rtti.Infos;

class EyePostproFilter implements LayerLifecycle, implements Infos
{
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Inject
	public var time : Time;
	
	@Param
	public var textureConfig : GLTextureConfig;
	
	@Param
	public var eyePosition : Vec2;
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : WebGLBuffer;

	var textureUniform : GLUniformLocation;
	var resolutionUniform : GLUniformLocation;
	var timeUniform : GLUniformLocation;
	var amountUniform : GLUniformLocation;
			
	public function new()
	{
		eyePosition = new Vec2(0,0); 
	}
	
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

		textureUniform = GL.getUniformLocation("texture");
		resolutionUniform = GL.getUniformLocation("resolution");
		timeUniform = GL.getUniformLocation("time");
		amountUniform = GL.getUniformLocation("amount");
		
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
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
		timeUniform.setFloat(time.ms);
		resolutionUniform.setVec2(new Vec2(renderContext.width, renderContext.height));
		
		amountUniform.setFloat(1 - (Math.pow(Math.abs(Math.sin(-eyePosition.getLength() * 0.0002 + time.ms / 4000)), 10) * 8.0 - 7.0));
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
		
	}
}

@GLSL("

	attribute vec2 vertexPosition;

	void main(void)
	{
		gl_Position = vec4(vertexPosition.x, vertexPosition.y, 0.0, 1.0);
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
	precision highp float;
	#endif
	
	uniform vec2 resolution;
	uniform float time;
	uniform float amount;
	uniform sampler2D texture;
	
	void main(void)
	{
	    vec2 q = gl_FragCoord.xy / resolution;
		q.y = 1.0-q.y;
	    vec3 oricol = texture2D(texture, vec2(q.x,1.0 - q.y)).xyz;

		vec2 uv = q;

	    vec3 col;

		//aberation
		float cax = 10.0;
		float cay = -10.0;
	    col.r = texture2D(texture,vec2(uv.x+cax / resolution.x,-uv.y)).x;
	    col.g = texture2D(texture,vec2(uv.x+0.000,-uv.y)).y;
	    col.b = texture2D(texture,vec2(uv.x+cay / resolution.x,-uv.y)).z;
	
	    col = clamp(col*0.5+0.5*col*col*1.2,0.0,1.0);
	
		//vignette
	    col *= 0.3 + 0.7*16.0*uv.x*uv.y*(1.0-uv.x)*(1.0-uv.y);
	
		//color
	    col *= vec3(0.8,1.0,0.7);
	
		//v lines
	    col *= 1.0+0.3*sin(0.01*time+gl_FragCoord.y*2.5);
	
		//flicker
	    col *= 0.97+0.03*sin(0.11*time);
	
	    gl_FragColor = vec4(mix(col, oricol, clamp(amount, 0.0, 1.0)), 1.0);
	}

") private class Fragment {}
