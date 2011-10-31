package kumite.layer.effect;

import kumite.time.Time;

import kumite.scene.LayerLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.RenderContext;

import haxe.rtti.Infos;

class RoadOfRibbonEffect implements LayerLifecycle, implements Infos
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

	//'To The Road Of Ribbon' by TX95 (2008)
	#ifdef GL_ES
	precision highp float;
	#endif
	
	uniform vec2 resolution;
	uniform float time;
	
	//Object A (tunnel)
	float oa(vec3 q)
	{
	 return cos(q.x)+cos(q.y*1.5)+cos(q.z)+cos(q.y*20.)*.05;
	}
	
	//Object B (ribbon)
	float ob(vec3 q)
	{
	 return length(max(abs(q-vec3(cos(q.z*1.5)*.3,-.5+cos(q.z)*.2,.0))-vec3(.125,.02,time+3.),vec3(.0)));
	}
	
	//Scene
	float o(vec3 q)
	{
	 return min(oa(q),ob(q));
	}
	
	//Get Normal
	vec3 gn(vec3 q)
	{
	 vec3 f=vec3(.01,0,0);
	 return normalize(vec3(o(q+f.xyy),o(q+f.yxy),o(q+f.yyx)));
	}
	
	//MainLoop
	void main(void)
	{
	 vec2 p = 1.0 - 2.0 * gl_FragCoord.xy / resolution.xy;
	 p.x *= resolution.x/resolution.y;
	 
	 vec4 c=vec4(1.0);
	 vec3 org=vec3(sin(time)*.5,cos(time*.5)*.25+.25,time),dir=normalize(vec3(p.x*1.6,p.y,1.0)),q=org,pp;
	 float d=.0;
	
	 //First raymarching
	 for(int i=0;i<64;i++)
	 {
	  d=o(q);
	  q+=d*dir;
	 }
	 pp=q;
	 float f=length(q-org)*0.02;
	
	 //Second raymarching (reflection)
	 dir=reflect(dir,gn(q));
	 q+=dir;
	 for(int i=0;i<64;i++)
	 {
	 d=o(q);
	 q+=d*dir;
	 }
	 c=max(dot(gn(q),vec3(.1,.1,.0)),.0)+vec4(.3,cos(time*.5)*.5+.5,sin(time*.5)*.5+.5,1.)*min(length(q-org)*.04,1.);
	
	 //Ribbon Color
	 if(oa(pp)>ob(pp))c=mix(c,vec4(cos(time*.3)*.5+.5,cos(time*.2)*.5+.5,sin(time*.3)*.5+.5,1.),.3);
	
	 //Final Color
	 vec4 fcolor = ((c+vec4(f))+(1.-min(pp.y+1.9,1.))*vec4(1.,.8,.7,1.))*min(time*.5,1.);
	 gl_FragColor=vec4(fcolor.xyz,1.0);
	}

") private class Fragment {}
