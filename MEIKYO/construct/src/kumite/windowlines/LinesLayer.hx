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

import haxe.rtti.Infos;

class LinesLayer implements LayerLifecycle, implements Infos
{
	@Inject
	public var time : Time;
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Param
	public var scale : Float;
	
	@Param
	public var position : Vec3;
	
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
		
	public function new()
	{
		scale = 1;
		position = new Vec3(0, 0, 0);
		
		projectionMatrix = new Matrix4();
		
		cameraMatrix = new Matrix4();
		cameraMatrix.setIdentity();
		cameraMatrix.setLookAt(new Vec3(0, 0, 10), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
		
		mousePosition = new Vec2();
		
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
		
		GL.disable(GL.DEPTH_TEST);
		//GL.disable(GL.BLEND);
		GL.enable(GL.BLEND);
		GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

		projectionMatrix.setPerspective(40, renderContext.aspect, 0.1, 500);
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
		var count = 50;
		for(i in 0...count)
		{
			var line = new Line();
			line.texture = Config.STRIPE_ATLAS.parts[Rand.int(0, Config.STRIPE_ATLAS.parts.length)];
			var scale = 0.5;
			line.scale.x = scale;
			line.scale.y = scale / (line.texture.width / line.texture.height);
			line.position.x = Map.linear(i, 0, count, -5, 5) + Rand.float(0, 0.3);
			line.position.y = -Math.sin(i * 0.9) * 0.1 + Rand.float (-0.1, 0.1);
			lines.push(line);
		}		
	}
	
	function mouseMove(position : Vec2)
	{
		mousePosition = position.clone();
	}
	
	function updateLines()
	{
		var mouseX = Map.linear(mousePosition.x, 0, 1, -5, 5);
		if (Math.isNaN(mouseX))
			mouseX = 0;
			
		if (Math.abs(mouseX) > 4.5)
		{
			mouseX = 100;
		}
		
		for(line in lines)
		{
			var dx = line.position.x - mouseX;
			var dx2 = 1.7 - Math.abs(dx);
			
			if (dx2 < 0)
			{
				line.angle.acceleration = 0.004;
				dx2 = line.defaultAngle;
			}
			else
			{
				line.angle.acceleration = 0.01;
				dx2 += line.randomTarget;
			}
			
			line.angle.target = Math.abs(dx2) * 0.9;
			line.tick();
		}
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
		worldViewMatrix.appendScale(line.scale.x, line.scale.y, line.scale.z);
		worldViewMatrix.appendRotation(line.rotationZ, new Vec3(0, 0, 1));
		worldViewMatrix.appendRotation(Math.PI / 2, new Vec3(1, 0, 0));
		worldViewMatrix.appendRotation(line.angle.current + Math.sin(line.defaultAngle + line.position.x + time.ms / 400) * 0.02, new Vec3(1, 0, 0));
		worldViewMatrix.appendTranslation(0, -1, 0);
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

	void main(void)
	{
		gl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);
		uv = vertexUV;
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
		precision highp float;
	#endif

	uniform sampler2D texture;
	uniform vec3 color;
	varying vec2 uv;

	void main(void)
	{
		vec4 mask = texture2D(texture, uv);
		//gl_FragColor = vec4(color.rgb, 0.5) + mask;
		gl_FragColor = vec4(color.rgb, mask.a);
	}

") private class Fragment {}