package kumite.layer;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.scene.TransitionContext;
import kumite.stage.Stage;
import kumite.time.Time;
import kumite.projection.Projection;
import kumite.camera.Camera;

import haxe.rtti.Infos;

class TestLayer implements LayerLifecycle, implements Infos
{
	@Inject
	public var stage : Stage;
	
	@Inject
	public var time : Time;
	
	@Inject
	public var projection : Projection;
	
	@Inject
	public var camera : Camera;
	
	public var color : Color;
	public var scale : Float;
	public var position : Vec3;
	
	var transitionAlpha : Float;
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : WebGLBuffer;

	var projectionMatrixUniform : GLUniformLocation;
	var worldViewMatrixUniform : GLUniformLocation;
	var colorUniform : GLUniformLocation;
		
	public function new()
	{
		color = new Color(1, 1, 0, 0.5);
		scale = 1;
		position = new Vec3(0, 0, 0);
		transitionAlpha = 1;
	}
	
	public function init()
	{
		shaderProgram = GL.createProgram(Vertex, Fragment);

		vertexPositionAttribute = GL.getAttribLocation2("vertexPosition", 2, GL.BYTE);
		vertexPositionAttribute.updateBuffer(new Int8Array([
			-1, -1,
			1, -1,
			-1, 1,
			1, 1,
		]));

		projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
		colorUniform = GL.getUniformLocation("color");
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
		transitionAlpha = transitionContext.transition;
		render();
	}
		
	public function render()
	{
		GL.useProgram(shaderProgram);
		GL.viewport(0, 0, stage.width, stage.height);
		
		GL.disable(GL.DEPTH_TEST);
		GL.enable(GL.BLEND);
		GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

		projectionMatrixUniform.setMatrix4(projection.matrix);
		vertexPositionAttribute.vertexAttribPointer();

		var worldViewMatrix = new Matrix4();
		worldViewMatrix.appendScale(scale, scale, scale);
		worldViewMatrix.appendTranslation(position.x, position.y, position.z);
		worldViewMatrix.appendRotation(time.ms / 4000, new Vec3(1, 1, 1).normalize());
		worldViewMatrix.append(camera.matrix);
		worldViewMatrixUniform.setMatrix4(worldViewMatrix);
		
		var colorWithTransition = color.clone();
		colorWithTransition.a *= transitionAlpha;
		colorUniform.setRGBA(colorWithTransition);
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
	}
}

@GLSL("

	attribute vec2 vertexPosition;

	uniform mat4 projectionMatrix;
	uniform mat4 worldViewMatrix;

	varying vec4 vertex;

	void main(void)
	{
		gl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);
		vertex = vec4(vertexPosition, 0.0, 1.0);
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
		precision highp float;
	#endif

	uniform vec4 color;

	void main(void)
	{
		gl_FragColor = color;
	}

") private class Fragment {}