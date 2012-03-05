package kumite.layer.effect;

import kumite.time.Time;

import kumite.scene.LayerLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.RenderContext;

import haxe.rtti.Infos;

class MetaTunnelEffect implements LayerLifecycle, implements Infos
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

	//'Metatunnel' by TX95 (2009)

	#ifdef GL_ES
	precision highp float;
	#endif
	
	uniform vec2 resolution;
	uniform float time;
	
	float h(vec3 q)
	{
	    float f=1.*distance(q,vec3(cos(time)+sin(time*.2),.3,2.+cos(time*.5)*.5));
	    f*=distance(q,vec3(-cos(time*.7),.3,2.+sin(time*.5)));
	    f*=distance(q,vec3(-sin(time*.2)*.5,sin(time),2.));
	    f*=cos(q.y)*cos(q.x)-.1-cos(q.z*7.+time*7.)*cos(q.x*3.)*cos(q.y*4.)*.1;
	    return 1.0 / length(q);
	    return f;
	}
	
	void main()
	{
	    vec2 p = 1.0 - 2.0 * gl_FragCoord.xy / resolution.xy;
	    vec3 o=vec3(p.x,p.y*1.25-0.3,0.);
	    vec3 d=vec3(p.x+cos(time)*0.3,p.y,1.)/64.;
	    vec4 c=vec4(0.);
	    float t=0.;
	    for(int i=0;i<75;i++)
	    {
	        if(h(o+d*t)<.4)
	        {
	            t-=5.;
	            for(int j=0;j<5;j++)
	            {
	                if(h(o+d*t)<.4)
	                   break;
	                t+=1.;
	            }
	            vec3 e=vec3(.01,.0,.0);
	            vec3 n=vec3(.0);
	            n.x=h(o+d*t)-h(vec3(o+d*t+e.xyy));
	            n.y=h(o+d*t)-h(vec3(o+d*t+e.yxy));
	            n.z=h(o+d*t)-h(vec3(o+d*t+e.yyx));
	            n=normalize(n);
	            c+=max(dot(vec3(.0,.0,-.5),n),.0)+max(dot(vec3(.0,-.5,.5),n),.0)*.5;
	            break;
	        }
	        t+=5.;
	    }
	    gl_FragColor=c+vec4(.1,.2,.5,1.)*(t*.025);
	}

") private class Fragment {}
