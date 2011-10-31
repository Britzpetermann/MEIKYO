package kumite.layer.effect;

import kumite.time.Time;

import kumite.scene.LayerLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.RenderContext;

import haxe.rtti.Infos;

class NautilusEffect implements LayerLifecycle, implements Infos
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

	//'Nautilus' by Weyland Yutani (reworked by iq) (2010)
	#ifdef GL_ES
	precision highp float;
	#endif
	
	uniform float time;
	uniform vec2 resolution;
	uniform vec4 mouse;
	
	float e(vec3 c)
	{
	    c=cos(vec3(cos(c.r+time/6.0)*c.r-cos(c.g*3.0+time/5.0)*c.g, cos(time/4.0)*c.b/3.0*c.r-cos(time/7.0)*c.g, c.r+c.g+c.b+time));
	    return dot(c*c,vec3(1.0))-1.0;
	}
	
	void main(void)
	{
	    vec2 c=-1.0+2.0*gl_FragCoord.rg/resolution.xy;
	    vec3 o=vec3(c.r,c.g,0.0),g=vec3(c.r,c.g,1.0)/64.0,v=vec3(0.5);
	    float m = 0.4;
	//    float m = 1.0-1.5*mouse.x/resolution.x;
	
	    for(int r=0;r<100;r++)
	    {
	      float h=e(o)-m;
	      if(h<0.0)break;
	      o+=h*10.0*g;
	      v+=h*0.02;
	    }
	    // light (who needs a normal?)
	    v+=e(o+0.1)*vec3(0.4,0.7,1.0);
	
	    // ambient occlusion
	    float a=0.0;
	    for(int q=0;q<100;q++)
	    {
	       float l = e(o+0.5*vec3(cos(1.1*float(q)),cos(1.6*float(q)),cos(1.4*float(q))))-m;
	       a+=clamp(4.0*l,0.0,1.0);
	    }
	    v*=a/100.0;
	    gl_FragColor=vec4(v,1.0);
	}

") private class Fragment {}
