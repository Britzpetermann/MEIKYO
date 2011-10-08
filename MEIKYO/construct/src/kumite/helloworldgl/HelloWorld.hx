package kumite.helloworldgl;

import kumite.stage.Stage;
import kumite.camera.Camera;
import kumite.projection.Projection;
import kumite.time.Time;
import kumite.time.Tick;

import haxe.rtti.Infos;

class HelloWorld implements Infos
{
	@Inject
	public var stage : Stage;
	
	@Inject
	public var time : Time;
	
	@Inject
	public var projection : Projection;
	
	@Inject
	public var camera : Camera;
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : WebGLBuffer;

	var projectionMatrixUniform : GLUniformLocation;
	var worldViewMatrixUniform : GLUniformLocation;
	var colorUniform : GLUniformLocation;
		
	public function new() {}
	
	@Sequence("boot", "start")
	public function start()
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
	
	@Message
	public function render(tick : Tick)
	{
		GL.useProgram(shaderProgram);
		GL.viewport(0, 0, stage.width, stage.height);
		
		GL.enable(GL.DEPTH_TEST);

		projectionMatrixUniform.setMatrix4(projection.matrix);
		vertexPositionAttribute.vertexAttribPointer();

		for(y in -10...10)
			drawRect(0, Map.linear(y, -10, 10, -3, 3), 0, new Color(0, Map.linear(y, -10, 10, 0, 1), 0, 1));
			
		for(z in -10...10)
			drawRect(0, 0, Map.linear(z, -10, 10, -3, 3), new Color(0, 0, Map.linear(z, -10, 10, 0, 1), 1));
			
		for(x in -10...10)
			drawRect(Map.linear(x, -10, 10, -3, 3), 0, 0, new Color(Map.linear(x, -10, 10, 0, 1), 0, 0, 1));
			
	}
	
	private function drawRect(x, y, z, color)
	{
		var worldViewMatrix = new Matrix4(camera.matrix);
		worldViewMatrix.appendRotation(time.ms / 50000, new Vec3(1, -1, -1));
		worldViewMatrix.appendTranslation(x, y, z);
		worldViewMatrix.appendScale(0.1, 0.1, 0.1);
		worldViewMatrixUniform.setMatrix4(worldViewMatrix);
		colorUniform.setRGBA(color);
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
	}
}
