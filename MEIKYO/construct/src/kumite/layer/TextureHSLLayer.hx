package kumite.layer;

import UserAgentContext;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.scene.TransitionContext;
import kumite.scene.LayerState;
import kumite.scene.RenderContext;

import kumite.stage.Stage;
import kumite.time.Time;
import kumite.projection.Projection;
import kumite.camera.Camera;

import haxe.rtti.Infos;

class TextureHSLLayer implements LayerLifecycle, implements Infos
{
	@Inject
	public var time : Time;
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	public var transitions : LayerTransitions;
	public var cutTransition : LayerTransition;
	public var moveTransition : LayerTransition;
	public var alphaTransition : LayerTransition;
	
	@Param
	public var scale : Float;
	
	@Param
	public var mixSpeed : Float;
	
	@Param
	public var mixChance : Float;
	
	@Param
	public var position : Vec3;
	
	@Param
	public var eyePosition : Vec2;
	
	@Param
	public var textureConfig : GLTextureConfig;
	
	public var colors : Array<Vec3>;
	
	public var blend : Bool;
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : WebGLBuffer;

	var projectionMatrixUniform : GLUniformLocation;
	var worldViewMatrixUniform : GLUniformLocation;
	var textureUniform : GLUniformLocation;
	var alphaUniform : GLUniformLocation;
	var hsl0Uniform : GLUniformLocation;
	var hsl1Uniform : GLUniformLocation;
	var hslMixUniform : GLUniformLocation;
	
	var hsl0 : Vec3;
	var hsl1 : Vec3;
	var hslMix : Float;
	
	static var IDLE : String = "IDLE";
	static var MIX : String = "MIX";
	
	var state : String;
		
	public function new()
	{
		state = IDLE;
		blend = true;
		scale = 1;
		position = new Vec3(0, 0, 0);
		eyePosition = new Vec2(0, 0);
		transitions = new LayerTransitions();
		transitions.add(cutTransition = new LayerTransition("cut"));
		transitions.add(moveTransition = new LayerTransition("move"));
		transitions.add(alphaTransition = new LayerTransition("alpha"));
		transitions.enableChild("alpha");
	}
	
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

		projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
		textureUniform = GL.getUniformLocation("texture");
		alphaUniform = GL.getUniformLocation("alpha");
		hsl0Uniform = GL.getUniformLocation("hsl0");
		hsl1Uniform = GL.getUniformLocation("hsl1");
		hslMixUniform = GL.getUniformLocation("hslMix");
		
		hsl0 = colors[Rand.int(0, colors.length)];
		hsl1 = colors[Rand.int(0, colors.length)];
		hslMix = 1;
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
		transitions.transition = transitionContext.transition;
		render(transitionContext);
	}
		
	public function render(renderContext : RenderContext)
	{
		GL.useProgram(shaderProgram);
		GL.viewport(0, 0, renderContext.width, renderContext.height);
		
		GL.disable(GL.DEPTH_TEST);
		
		if (blend)
		{
			GL.enable(GL.BLEND);
			GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
		}
		else
		{
			GL.disable(GL.BLEND);
		}

		var projectionMatrix = new Matrix4();
		projectionMatrix.setOrtho(0, renderContext.width, renderContext.height, 0, 0, 1);
		projectionMatrixUniform.setMatrix4(projectionMatrix);
		
		vertexPositionAttribute.vertexAttribPointer();

		var texture = textureRegistry.get(textureConfig);

		var worldViewMatrix = new Matrix4();
		worldViewMatrix.appendScale(texture.width * scale, texture.height * scale, 1);
		worldViewMatrix.appendTranslation(position.x, position.y, position.z);
		worldViewMatrix.appendTranslation((renderContext.width - texture.width * scale) / 2, (renderContext.height - texture.height * scale) / 2, 0);
		worldViewMatrixUniform.setMatrix4(worldViewMatrix);
		
		textureUniform.setTexture(texture);
		alphaUniform.setFloat(alphaTransition.transition);
		
		switch(state)
		{
			case IDLE:
				if (Math.sin(-eyePosition.getLength() * 0.001 + time.ms / 1000) > 0.99)
				{
					hsl0 = hsl1;
					while(hsl0.equals(hsl1))
					{
						hsl1 = colors[Rand.int(0, colors.length)];
					}
					hslMix = 0;
					state = MIX;
				}
			case MIX:
				hslMix += mixSpeed;
				if (hslMix > 1.0)
				{
					hslMix = 1.0;
					state = IDLE;
				}
		}
		
		hsl0Uniform.setVec3(hsl0);
		hsl1Uniform.setVec3(hsl1);
		hslMixUniform.setFloat(hslMix);
		
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
	}
}

@GLSL("

	attribute vec2 vertexPosition;

	uniform mat4 projectionMatrix;
	uniform mat4 worldViewMatrix;

	varying vec4 vertex;
	varying vec2 textureCoord;

	void main(void)
	{
		gl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);
		vertex = vec4(vertexPosition, 0.0, 1.0);
		textureCoord = vertexPosition.xy;
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
		precision highp float;
	#endif

	uniform sampler2D texture;
	uniform float alpha;
	uniform vec3 hsl0;
	uniform vec3 hsl1;
	uniform float hslMix;

	varying vec2 textureCoord;

	vec3 RGBToHSL(vec3 color)
	{
		vec3 hsl; // init to 0 to avoid warnings ? (and reverse if + remove first part)
		
		float fmin = min(min(color.r, color.g), color.b);    //Min. value of RGB
		float fmax = max(max(color.r, color.g), color.b);    //Max. value of RGB
		float delta = fmax - fmin;             //Delta RGB value
	
		hsl.z = (fmax + fmin) / 2.0; // Luminance
	
		if (delta == 0.0)		//This is a gray, no chroma...
		{
			hsl.x = 0.0;	// Hue
			hsl.y = 0.0;	// Saturation
		}
		else                                    //Chromatic data...
		{
			if (hsl.z < 0.5)
				hsl.y = delta / (fmax + fmin); // Saturation
			else
				hsl.y = delta / (2.0 - fmax - fmin); // Saturation
			
			float deltaR = (((fmax - color.r) / 6.0) + (delta / 2.0)) / delta;
			float deltaG = (((fmax - color.g) / 6.0) + (delta / 2.0)) / delta;
			float deltaB = (((fmax - color.b) / 6.0) + (delta / 2.0)) / delta;
	
			if (color.r == fmax )
				hsl.x = deltaB - deltaG; // Hue
			else if (color.g == fmax)
				hsl.x = (1.0 / 3.0) + deltaR - deltaB; // Hue
			else if (color.b == fmax)
				hsl.x = (2.0 / 3.0) + deltaG - deltaR; // Hue
	
			if (hsl.x < 0.0)
				hsl.x += 1.0; // Hue
			else if (hsl.x > 1.0)
				hsl.x -= 1.0; // Hue
		}
	
		return hsl;
	}
	
	float HueToRGB(float f1, float f2, float hue)
	{
		if (hue < 0.0)
			hue += 1.0;
		else if (hue > 1.0)
			hue -= 1.0;
		float res;
		if ((6.0 * hue) < 1.0)
			res = f1 + (f2 - f1) * 6.0 * hue;
		else if ((2.0 * hue) < 1.0)
			res = f2;
		else if ((3.0 * hue) < 2.0)
			res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
		else
			res = f1;
		return res;
	}
	
	vec3 HSLToRGB(vec3 hsl)
	{
		vec3 rgb;
		
		if (hsl.y == 0.0)
			rgb = vec3(hsl.z); // Luminance
		else
		{
			float f2;
			
			if (hsl.z < 0.5)
				f2 = hsl.z * (1.0 + hsl.y);
			else
				f2 = (hsl.z + hsl.y) - (hsl.y * hsl.z);
				
			float f1 = 2.0 * hsl.z - f2;
			
			rgb.r = HueToRGB(f1, f2, hsl.x + (1.0/3.0));
			rgb.g = HueToRGB(f1, f2, hsl.x);
			rgb.b= HueToRGB(f1, f2, hsl.x - (1.0/3.0));
		}
		
		return rgb;
	}
	void main(void)
	{
		vec4 color = texture2D(texture, vec2(textureCoord.x, textureCoord.y));
		vec3 colorHSL = RGBToHSL(color.rgb);

		if (hslMix == 1.0)
		{
			vec3 colorHSL1 = colorHSL + hsl1;
			colorHSL1.g = clamp(colorHSL1.g, 0.0, 1.0);
			vec3 colorRGB1 = HSLToRGB(colorHSL1);

			gl_FragColor = vec4(colorRGB1, color.a) * vec4(1.0, 1.0, 1.0, alpha);
		}
		else if(hslMix == 0.0)
		{
			vec3 colorHSL0 = colorHSL + hsl0;
			colorHSL0.g = clamp(colorHSL0.g, 0.0, 1.0);
			vec3 colorRGB0 = HSLToRGB(colorHSL0);

			gl_FragColor = vec4(colorRGB0, color.a) * vec4(1.0, 1.0, 1.0, alpha);
		}
		else
		{
			vec3 colorHSL0 = colorHSL + hsl0;
			colorHSL0.g = clamp(colorHSL0.g, 0.0, 1.0);
			vec3 colorRGB0 = HSLToRGB(colorHSL0);
	
			vec3 colorHSL1 = colorHSL + hsl1;
			colorHSL1.g = clamp(colorHSL1.g, 0.0, 1.0);
			vec3 colorRGB1 = HSLToRGB(colorHSL1);
	
			vec3 colorRGB = mix(colorRGB0, colorRGB1, hslMix);
	
			gl_FragColor = vec4(colorRGB, color.a) * vec4(1.0, 1.0, 1.0, alpha);
		}
	}

") private class Fragment {}
