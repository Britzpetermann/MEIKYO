package kumite.layer;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.scene.TransitionContext;
import kumite.scene.RenderContext;
import kumite.stage.Stage;
import kumite.time.Time;
import kumite.projection.Projection;
import kumite.camera.Camera;

import haxe.rtti.Infos;

class TestLayer implements LayerLifecycle, implements Infos
{
	@Inject
	public var time : Time;
	
	@Inject
	public var camera : Camera;
	
	public var transitions : LayerTransitions;
	public var alphaTransition : LayerTransition;
	
	@Param
	public var color : Color;
	
	@Param(-100, 100, 0.1)
	public var scale : Float;
	
	@Param
	public var position : Vec3;
	
	var projectionMatrix : Matrix4;
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
		
		transitions = new LayerTransitions();
		transitions.add(alphaTransition = new LayerTransition("alpha"));
		transitions.add(new LayerTransition("cut"));
		transitions.enableChild("alpha");
		
		projectionMatrix = new Matrix4();	
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
		transitions.transition = transitionContext.transition;
		render(transitionContext);
	}
		
	public function render(renderContext : RenderContext)
	{
		GL.useProgram(shaderProgram);
		GL.viewport(0, 0, renderContext.width, renderContext.height);
		
		GL.disable(GL.DEPTH_TEST);
		GL.enable(GL.BLEND);
		GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

		projectionMatrix.setPerspective(40, renderContext.aspect, 0.1, 500);
		projectionMatrixUniform.setMatrix4(projectionMatrix);
		vertexPositionAttribute.vertexAttribPointer();

		var worldViewMatrix = new Matrix4();
		worldViewMatrix.appendScale(scale, scale, scale);
		worldViewMatrix.appendTranslation(position.x, position.y, position.z);
		worldViewMatrix.appendRotation(time.ms / 4000, new Vec3(1, 1, 1).normalize());
		worldViewMatrix.append(camera.matrix);
		worldViewMatrixUniform.setMatrix4(worldViewMatrix);
		
		var colorWithTransition = color.clone();
		colorWithTransition.a *= alphaTransition.transition;
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