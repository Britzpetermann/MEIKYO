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
	
	public var layerId : String;
	
	public var color : Color;
	public var direction : Int;
	
	var transition : Float;
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : WebGLBuffer;

	var projectionMatrixUniform : GLUniformLocation;
	var worldViewMatrixUniform : GLUniformLocation;
	var colorUniform : GLUniformLocation;
		
	public function new()
	{
		layerId = "TestBackgroundLayer";
		color = new Color(1, 1, 1, 0.2);
		transition = 1;
		direction = 1;
	}
	
	public function init()
	{
		shaderProgram = GL.createProgram(kumite.helloworldgl.shader.Vertex, kumite.helloworldgl.shader.Fragment);

		vertexPositionAttribute = GL.getAttribLocation2("vertexPosition", 2, GL.BYTE);
		vertexPositionAttribute.updateBuffer(new Int8Array([
			0,  0,
			1,  0,
			0,  1,
			1,  1,
		]));

		projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
		colorUniform = GL.getUniformLocation("color");
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
		transition = transitionContext.transition;
		render();
	}
		
	public function render()
	{
		GL.useProgram(shaderProgram);
		GL.viewport(0, 0, stage.width, stage.height);
		
		GL.disable(GL.DEPTH_TEST);
		GL.enable(GL.BLEND);
		GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

		var projectionMatrix = new Matrix4();
		projectionMatrix.ortho(0, stage.width, stage.height, 0, 0, 1);
		projectionMatrixUniform.setMatrix4(projectionMatrix);
		
		vertexPositionAttribute.vertexAttribPointer();

		var worldViewMatrix = new Matrix4();
		worldViewMatrix.appendScale(stage.width, stage.height, 1);
		worldViewMatrix.appendTranslation(direction * (1 - transition), 0, 0);
		worldViewMatrixUniform.setMatrix4(worldViewMatrix);
		
		var colorWithTransition = color.clone();
		//colorWithTransition.a *= transition;
		colorUniform.setRGBA(colorWithTransition);
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
	}
}