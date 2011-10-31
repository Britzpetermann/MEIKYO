package kumite.layer.effect;

import kumite.time.Time;

import kumite.scene.LayerLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.RenderContext;

import haxe.rtti.Infos;

class RoadOfRibbon2Effect implements LayerLifecycle, implements Infos
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
		//return cos(q.x) + cos(q.z) + (cos(q.y * 1.4) + cos(q.y * 20.0 + time * 10.0) * 0.02 + cos(q.x * 20.0 + time * 10.0) * 0.02) * 0.5;
		float v = cos(q.x) + cos(q.y) + cos(q.z);
		return cos(v + q.x) * 0.7 + (cos(q.x) + cos(q.y)) * 0.4;
	}
	
	//Object B (ribbon)
	float ob(vec3 q)
	{
		return length(max(abs(q-vec3(cos(q.z*1.5)*.3,-.5+cos(q.z)*.2,.0))-vec3(.125,.02,time+3.),vec3(.0)));
	}
	
	//Scene
	float o(vec3 q)
	{
		return min(oa(q), ob(q));
	}
	
	//Get Normal
	vec3 gn(vec3 q)
	{
		vec3 f = vec3(0.01, 0, 0);
		return normalize(vec3(o(q + f.xyy), o(q + f.yxy), o(q + f.yyx)));
	}
	
	//MainLoop
	void main(void)
	{
		//-1 ... 1
		vec2 p = 1.0 - 2.0 * gl_FragCoord.xy / resolution.xy;
		 
		//origin (eye point)
		vec3 origin = vec3(sin(time * 0.05) * 0.5 + 1.0 + time * 0.4, cos(time * 0.5) * 0.25 + 0.4 + time, time * 5.0);
		//vec3 origin = vec3(3.0, 3.0, -time * 5.0);

		vec3 direction = normalize(vec3(p.x * 0.3, p.y * 0.3, 1.0));

		vec3 q = origin;

		float d = 0.0;

		//First raymarching
		for(int i = 0; i < 80; i++)
		{
			d = o(q);
			q += d * direction;
		}

		//Shading

		vec4 objectColor;
		if(oa(q) > ob(q))
			objectColor = vec4(1.0, 0.0, 0.0, 1.0);
		else
			objectColor = vec4(0.0, 1.0, 0.0, 1.0);

		vec3 lightPos = origin + vec3(cos(time * 0.5) * 4.0, sin(time * 0.3) * 4.0, 40.0 + sin(time) * 4.0);
		vec3 lightDirection = normalize(lightPos - q);

		float ambient = 0.1;
		float diffuse1 = clamp(dot(gn(q), lightDirection) * 1.0, 0.0, 1.0) * 1.0;
		float diffuse2 = clamp(dot(gn(q), -lightDirection) * 1.0, 0.0, 1.0) * 1.0;

		float camDistance = clamp(length(q - origin) * 0.03, 0.0, 1.0);

		vec4 color = 
				objectColor * ambient
				+ objectColor * diffuse1
				+ vec4(1.0, 0.0, 0.0, 1.0) * diffuse2
				- vec4(0.0) * (1.0 - camDistance)
				+ vec4(0.0) * camDistance
				;
		
		gl_FragColor=vec4(color.xyz,1.0);
	}

") private class Fragment {}
