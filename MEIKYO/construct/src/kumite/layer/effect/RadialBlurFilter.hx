package kumite.layer.effect;

import kumite.time.Time;

import kumite.scene.LayerLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.RenderContext;

import haxe.rtti.Infos;

class RadialBlurFilter implements LayerLifecycle, implements Infos
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
	
	uniform vec2 resolution;
	uniform float time;
	uniform sampler2D texture;
	
	vec3 deform( in vec2 p )
	{
	    vec2 uv;
	
	    //vec2 q = vec2( sin(1.1*time+p.x) * 0.3,sin(1.2*time+p.y) * 0.3 );
	    vec2 q = vec2(0.0, 0.0);
	
	    float r = sqrt(dot(q,q));
	
		uv.x = sin(0.0+1.0*time) * 0.01 + p.x * sqrt(r*r+1.0) + 1.0;
		uv.y = sin(0.6+1.1*time) * 0.01 + p.y * sqrt(r*r+1.0) + 1.0;
		//uv.x = p.x * sqrt(r*r+1.0) + 1.0;
		//uv.y = p.y * sqrt(r*r+1.0) + 1.0;

	    return texture2D(texture, uv * 0.5).xyz;
	}
	
	void main(void)
	{
	    vec2 p = 1.0 - 2.0 * gl_FragCoord.xy / resolution.xy;
	    vec2 s = p;
	
	    vec3 total = vec3(0.0);
	    vec2 d = (vec2(0.0,0.0) - p) / 500.0;
	    float w = 1.0;
	    for( int i=0; i<20; i++ )
	    {
	        vec3 res = deform(s);
	        res = smoothstep(0.1,1.0,res*res*res);
	        total += w*res;
	        w *= 0.99;
	        s += d;
	    }
	    total /= 20.0;
	    gl_FragColor = vec4(total, 1.0);
	}
") private class Fragment {}
