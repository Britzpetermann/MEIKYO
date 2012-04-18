package kumite.layer.effect;

import UserAgentContext;

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

	//'To The Road Of Ribbon' by TX95 (2008)

	#ifdef GL_ES
		precision highp float;
	#endif
	
	uniform vec2 resolution;
	uniform float time;
	
	//Object A (tunnel)
	float oa(vec3 q)
	{
		float v = cos(q.x) + cos(q.y) + cos(q.z);
		return (v - cos(q.x * 0.3) * 0.5) * 0.4 + 1.0 - v * v * 0.25 + cos(q.x * 0.2) * 0.2;
	}
	
	//Object B (ribbon)
	float ob(vec3 q)
	{
		float v = time;
		return time;
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
		vec4 resultColor = vec4(0.0);

		//-1 ... 1
		vec2 p = 1.0 - 2.0 * gl_FragCoord.xy / resolution.xy;
		 
		//origin (eye point)
		vec3 origin = vec3(sin(time * 0.05) * 1.0 + 1.0 + time * 0.3, cos(time * 0.5) * 1.0 + 0.1 + time * 0.01, time * 2.0);

		vec3 direction = normalize(vec3(sin(time * 0.1) + p.x * 0.3, cos(time * 0.1) + p.y * 0.3, 1.0));
		//vec3 direction = normalize(vec3(p.x * 0.3, p.y * 0.3, 1.0));

		vec3 q = origin;

		float d = 0.0;

		//First raymarching
		for(int i = 0; i < 40; i++)
		{
			d = o(q);
			q += d * direction;
		}

		vec3 q1 = q;

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
		
		resultColor += color * 0.6;

		//Second raymarching (reflection)
		direction=reflect(direction,gn(q));
		q = direction;
		for(int i = 0; i < 40; i++)
		{
			d = o(q);
			q += d * direction;
		}

		if(oa(q) > ob(q))
			objectColor = vec4(1.0, 0.0, 0.0, 1.0);
		else
			objectColor = vec4(0.0, 1.0, 0.0, 1.0);

		lightDirection = normalize(lightPos - q);

		ambient = 0.1;
		diffuse1 = clamp(dot(gn(q), lightDirection) * 1.0, 0.0, 1.0) * 1.0;
		diffuse2 = clamp(dot(gn(q), -lightDirection) * 1.0, 0.0, 1.0) * 1.0;

		camDistance = clamp(length(q - origin) * 0.03, 0.0, 1.0);

		color = 
				objectColor * ambient
				+ objectColor * diffuse1
				+ vec4(1.0, 0.0, 0.0, 1.0) * diffuse2
				- vec4(0.0) * (1.0 - camDistance)
				+ vec4(0.0) * camDistance
				;
		
		resultColor += color * 0.4;

		gl_FragColor=vec4(resultColor.xyz, 1.0);
	}

") private class Fragment {}
