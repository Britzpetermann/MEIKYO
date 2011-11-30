package kumite.windowlines;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.scene.TransitionContext;
import kumite.scene.LayerState;
import kumite.scene.RenderContext;

import kumite.stage.Stage;
import kumite.time.Time;
import kumite.projection.Projection;
import kumite.camera.Camera;

import kumite.socketsound.Note;

import kumite.blobs.Blobs;
import kumite.blobs.Blob;

import bpmjs.Messenger;

import haxe.rtti.Infos;

class LinesLayer implements LayerLifecycle, implements Infos
{
	@Messenger
	public var messenger : Messenger;
	
	@Inject
	public var blobs : Blobs;
	
	@Inject
	public var time : Time;
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	var lines : Array<Line>;
	var mousePosition : Vec2;
	
	var cameraMatrix : Matrix4;
	var projectionMatrix : Matrix4;
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;

	var vertexUVBuffer : Float32Array;
	var vertexUVAttribute : GLAttribLocation;
	
	var vertexBuffer : WebGLBuffer;

	var projectionMatrixUniform : GLUniformLocation;
	var worldViewMatrixUniform : GLUniformLocation;
	var colorUniform : GLUniformLocation;
	var textureUniform : GLUniformLocation;
	
	var context : Dynamic;
	var source : Dynamic;
	var toneBuffer : Dynamic;
		
	public function new()
	{
		projectionMatrix = new Matrix4();
		
		cameraMatrix = new Matrix4();
		cameraMatrix.setIdentity();
		cameraMatrix.setLookAt(new Vec3(0, 0, 10), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
		
		mousePosition = new Vec2();
	
 		context = untyped __js__("new webkitAudioContext()");
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

		vertexUVBuffer = new Float32Array([
			0,  0,
			1,  0,
			0,  1,
			1,  1,
		]);
		vertexUVAttribute = GL.getAttribLocation2("vertexUV", 2, GL.FLOAT);
		vertexUVAttribute.updateBuffer(vertexUVBuffer);

		projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
		colorUniform = GL.getUniformLocation("color");
		textureUniform = GL.getUniformLocation("texture");
		
		GLMouseRegistry.getInstance().mouseMoveSignaler.bind(mouseMove);
		setupLines();
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
		render(transitionContext);
	}
		
	public function render(renderContext : RenderContext)
	{
		GL.useProgram(shaderProgram);
		GL.viewport(0, 0, renderContext.width, renderContext.height);
		
		//GL.disable(GL.DEPTH_TEST);
		GL.enable(GL.DEPTH_TEST);
		GL.depthFunc(GL.LESS);
		GL.enable(GL.BLEND);
		GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

		projectionMatrix.setPerspective(40, renderContext.aspect, 0.1, 40);
		projectionMatrixUniform.setMatrix4(projectionMatrix);

		textureUniform.setTexture(textureRegistry.get(Config.STRIPE_ATLAS));
		vertexPositionAttribute.vertexAttribPointer();
		vertexUVAttribute.vertexAttribPointer();
		
		updateLines();

		for(line in lines)
		{
			drawLine(line);
		}
	}
	
	function setupLines()
	{
		lines = new Array();
		var count = 80;
		var t = 80.0;
		var xx = 0;
		for(i in 0...count)
		{
			
			if (i % 2 == 0)
	        {
	          //t += 2;
	        }
	        
	        if (i % 3 == 0)
	        {
	          //t -= 3;
	        }        
	        
	        if (i % 6 == 0)
	        {
	          //t -= 4;
	        }
	        
	        if (i % 12 == 0)
	        {
	          //t += 5;
	        }
			
	        if (i % 5 == 0)
	        {
	         // t-= 12;
	        }
			
			//t+= 0.5;
			t+= Math.sin(i * Math.PI / (count / 28)) * 5;
			t+= Math.sin(i * Math.PI / (count / 48)) * 3;
			//t+=0.5;
			//t+= xx / 3;
			
			xx += 1;
			if (xx == 5)
				xx = -5;
		
			var cosMiddle = Math.cos(i * Math.PI / (count / 2));
			
			var line = new Line();
			line.cosMiddle = cosMiddle;
			line.defaultAngle = line.getDefaultAngle(); 
			line.pitch = Std.int(t);
			line.texture = Config.STRIPE_ATLAS.parts[Rand.int(0, Config.STRIPE_ATLAS.parts.length)];
			
			var scale = 0.5 - cosMiddle * 0.2 - Rand.float(0, cosMiddle * 0.25);
			if (Rand.bool(0.3))
				scale += Rand.float(-0.3, 0.3);
			if (scale > 0.4)
				scale = 0.4; 
			if (scale < 0.1)
				scale = 0.1; 
			line.scale.x = scale;
			line.scale.y = scale / (line.texture.width / line.texture.height);
			line.position.x = Map.linear(i, 0, count, -5, 5) + Rand.float(0, 0.0);
			line.position.y = -Math.sin(i * 0.9) * 0.1 + Rand.float (-0.1, 0.1);
			line.initSound(context);
			lines.push(line);
			
	        if (i % 5 == 0)
	        {
	         // t+= 12;
	        }
			
		}		
	}
	
	function mouseMove(position : Vec2)
	{
		mousePosition = position.clone();
	}
	
	var lastPlayed : Line;
	function updateLines()
	{
		for(line in lines)
		{
			var dx = getNearestBlob(line.position);
			var dx2 = 1.2 - Math.abs(dx.dx);
			var znorm = 0.0;
			if (dx2 >= 0)
			{
				znorm = Map.linear(dx.blob.z - 1500, 0, 1500, 0, 1);
				dx2 = Map.linear(znorm, 0, 1, 1.3, 0.2) - Math.abs(dx.dx);
			}
			
			if (dx2 < 0)
			{
				line.comeup = false;
				line.angle.acceleration = 0.001;
				dx2 = line.defaultAngle;
				line.enter = false;
				line.blob = null;
			}
			else
			{
				line.comeup = true;
				line.angle.acceleration = 0.005 * (1 + znorm * 0.5);
				//dx2 += line.randomTarget;
				dx2 = (1.2 - Math.abs(dx.dx)) * (1 + znorm);
				line.blob = dx.blob;
			}
			
			line.angle.target = Math.abs(dx2) * 0.9;
			if (line.angle.target < line.defaultAngle)
			{
				line.angle.target = line.defaultAngle;
			}
			line.tick();
		}
		
		for (blob in blobs.blobs)
		{
			var index = Std.int(Map.linear(blob.x, 1, 0, 0, lines.length - 1));
			
			if (!Math.isNaN(index))
			{
				if (index < 0)
					index = 0;
				if (index > lines.length - 1)
					index = lines.length - 1;
					
				var line = lines[index];

				var repeat = Map.linear(blob.area, 0, 0.1, 2000, 200);
				if (repeat < 200)
					repeat = 200;
				if (repeat > 1500)
					repeat = 1500;
				if  (time.ms - line.played > repeat)
				{				
					if (lastPlayed != line)
					{
						lastPlayed = line;
						line.played = time.ms;
						var note = line.doPlay(blob);
						
							
						note.note -= 20;
						
						var depth = Std.int(Map.linear(blob.z - 1500, 0, 5000, -20, 300));
						note.note += depth;
						note.note -= 30;
						
						while (isNotHarmonic(note))
						{
							note.note += 1;
						}
						messenger.send(note);
					}
				}
			}
		}
	}
	
	function isNotHarmonic(note)
	{
		var octave  = Std.int(note.note / 12);
		var tone = note.note - octave * 12;
		
		//moll
		if (tone == 1 || tone == 3 || tone == 6 || tone == 8 || tone == 10)
			return true;
			
		//DH
		if (tone == 2 || tone == 11)
			return true;
			
		return false;
	}
	
	function getNearestBlob(position : Vec3)
	{
		var mouseX = 10.0;
		var rblob = null;
		for(blob in blobs.blobs)
		{
			var result = position.x - Map.linear(1 - blob.x, 0, 1, -5, 5);
			if (Math.abs(result) < Math.abs(mouseX))
			{
				mouseX = result;
				rblob = blob;
			}
		}
		
		return {dx : mouseX, blob : rblob};
	}
	
	function drawLine(line : Line)
	{
		var image = line.texture;
		vertexUVBuffer[0] = image.u0;
		vertexUVBuffer[1] = image.v0;
		vertexUVBuffer[2] = image.u1;
		vertexUVBuffer[3] = image.v0;
		vertexUVBuffer[4] = image.u0;
		vertexUVBuffer[5] = image.v1;
		vertexUVBuffer[6] = image.u1;
		vertexUVBuffer[7] = image.v1;
		vertexUVAttribute.updateBuffer3(vertexUVBuffer);
		
		var worldViewMatrix = new Matrix4();
		worldViewMatrix.appendScale(line.scale.x, line.scale.y * 1.5, line.scale.z);
		worldViewMatrix.appendRotation(line.rotationZ, new Vec3(0, 0, 1));
		worldViewMatrix.appendRotation(Math.PI / 2, new Vec3(1, 0, 0));
		worldViewMatrix.appendRotation(line.angle.current + Math.sin(line.defaultAngle + line.position.x + time.ms / 400) * 0.02, new Vec3(1, 0, 0));
		worldViewMatrix.appendTranslation(0, -1.4, 0);
		worldViewMatrix.appendTranslation(line.position.x, line.position.y, line.position.z + Math.sin(line.defaultAngle + line.position.x * 0.5 + time.ms / 800) * 0.2);
		worldViewMatrix.append(cameraMatrix);
		worldViewMatrixUniform.setMatrix4(worldViewMatrix);
		
		colorUniform.setRGB(line.color);
		
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
	}
}

@GLSL("

	attribute vec2 vertexPosition;
	attribute vec2 vertexUV;

	uniform mat4 projectionMatrix;
	uniform mat4 worldViewMatrix;

	varying vec2 uv;
	varying vec3 normal;
	varying vec3 vertex;

	void main(void)
	{
		vec4 p0 = worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);
		vec4 p1 = worldViewMatrix * vec4(vertexPosition + vec2(0.0, 1.0), 0.0, 1.0);
		gl_Position = projectionMatrix * p0;
		uv = vertexUV;
		normal = normalize(p0.xyz - p1.xyz);
		vertex = p0.xyz;
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
		precision highp float;
	#endif

	uniform sampler2D texture;
	uniform vec3 color;
	varying vec2 uv;
	varying vec3 normal;
	varying vec3 vertex;

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
		vec4 mask = texture2D(texture, uv);
		vec3 lightDir = normalize(vec3(0.0, 10.0, 0.0) - vertex);
		vec3 viewDir = normalize(-vertex);
		float diffuse = clamp(dot(normal, lightDir), 0.0, 1.0);

		vec3 h = normalize(lightDir + viewDir);
		float specular = clamp(pow(clamp(dot(normal, h), 0.0, 1.0), 10.0), 0.0, 1.0);

		vec3 hsl = RGBToHSL(color.rgb);
		hsl.z += specular * 0.1 + diffuse * 0.1;
		vec3 rgb = HSLToRGB(hsl);
		
		gl_FragColor = vec4(rgb.rgb, mask.a);
	}

") private class Fragment {}