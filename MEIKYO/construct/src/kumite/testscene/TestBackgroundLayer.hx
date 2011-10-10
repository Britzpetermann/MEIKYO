package kumite.testscene;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.scene.TransitionContext;
import kumite.stage.Stage;
import kumite.time.Time;
import kumite.projection.Projection;
import kumite.camera.Camera;

import haxe.rtti.Infos;

class TestBackgroundLayer implements LayerLifecycle, implements Infos
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
		color = new Color(1, 1, 1, 0.2);
		scale = 7;
		position = new Vec3(0, 0, 0);
		transitionAlpha = 1;
	}
	
	public function init()
	{
		shaderProgram = GL.createProgram(kumite.helloworldgl.shader.Vertex, kumite.helloworldgl.shader.Fragment);

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

		var worldViewMatrix = new Matrix4(camera.matrix);
		worldViewMatrix.appendRotation(time.ms / 4000, new Vec3(1, 1, 1));
		worldViewMatrix.appendTranslation(position.x, position.y, position.z);
		worldViewMatrix.appendScale(scale, scale, scale);
		worldViewMatrixUniform.setMatrix4(worldViewMatrix);
		
		var colorWithTransition = color.clone();
		colorWithTransition.a *= transitionAlpha;
		colorUniform.setRGBA(colorWithTransition);
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
	}
}