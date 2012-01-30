package kumite.layer.effect;

import kumite.time.Time;

import kumite.scene.LayerLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.RenderContext;

import haxe.rtti.Infos;

class PlasmaEffect implements LayerLifecycle, implements Infos
{
	@Inject
	public var time : Time;
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : WebGLBuffer;

	var resolutionUniform : GLUniformLocation;
	var timeUniform : GLUniformLocation;
	var amountUniform : GLUniformLocation;
			
	var amount : Float;
		
	public function new();
	
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

		amountUniform.setFloat(amount);
		timeUniform.setFloat(time.ms / 1000);
		resolutionUniform.setVec2(new Vec2(renderContext.width, renderContext.height));
		
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
	
	void main(void)
	{
	   float x = gl_FragCoord.x;
	   float y = gl_FragCoord.y;
	   float mov0 = x+y+cos(sin(time)*2.)*100.+sin(x/100.)*1000.;
	   float mov1 = y / resolution.y / 0.2 + time;
	   float mov2 = x / resolution.x / 0.2;
	   float c1 = abs(sin(mov1+time)/2.+mov2/2.-mov1-mov2+time);
	   float c2 = abs(sin(c1+sin(mov0/1000.+time)+sin(y/40.+time)+sin((x+y)/100.)*3.));
	   float c3 = abs(sin(c2+cos(mov1+mov2+c2)+cos(mov2)+sin(x/1000.)));
	   gl_FragColor = vec4( 0,c2,c3,1.0);
	}

") private class Fragment {}
