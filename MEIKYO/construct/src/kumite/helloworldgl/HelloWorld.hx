package kumite.helloworldgl;

import kumite.layer.LayerTransition;
import kumite.layer.LayerTransitions;

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

	public var transitions : LayerTransitions;
	public var alphaTransition : LayerTransition;
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : WebGLBuffer;

	var viewMatrixUniform : GLUniformLocation;
	var worldMatrixUniform : GLUniformLocation;
	var projectionMatrixUniform : GLUniformLocation;
	
	var colorUniform : GLUniformLocation;
		
	public function new() {}
	
	@Sequence("boot", "start")
	public function start()
	{
		shaderProgram = GL.createProgram(Vertex, Fragment);

		vertexPositionAttribute = GL.getAttribLocation2("vertexPosition", 2, GL.FLOAT);
		vertexPositionAttribute.updateBuffer(new Float32Array([
			-1, -1,
			1, -1,
			-1, 1,
			1, 1,
		]));

		viewMatrixUniform = GL.getUniformLocation("viewMatrix");
		worldMatrixUniform = GL.getUniformLocation("worldMatrix");
		projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		colorUniform = GL.getUniformLocation("color");
	}
	
	@Message
	public function render(tick : Tick)
	{
		GL.useProgram(shaderProgram);
		GL.viewport(0, 0, stage.width, stage.height);
		
		GL.clearColor(0, 0, 0, 1);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);		
		
		GL.enable(GL.DEPTH_TEST);
		GL.enable(GL.BLEND);
		GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

		vertexPositionAttribute.vertexAttribPointer();

		worldMatrixUniform.setMatrix4(camera.matrix);
		projectionMatrixUniform.setMatrix4(projection.matrix);

		for(x in -10...10)
			drawRect(Map.linear(x, -10, 10, -3, 3), 0, 0, new Color(Map.linear(x, -10, 10, 0, 1), 0, 0, 0.5));
		
		for(y in -10...10)
			drawRect(0, Map.linear(y, -10, 10, -3, 3), 0, new Color(0, Map.linear(y, -10, 10, 0, 1), 0, 0.5));
			
		for(z in -10...10)
			drawRect(0, 0, Map.linear(z, -10, 10, -3, 3), new Color(0, 0, Map.linear(z, -10, 10, 0, 1), 0.5));
	}
	
	private function drawRect(x : Float, y : Float, z : Float, color)
	{
		var viewMatrix = new Matrix4();
		viewMatrix.appendScale(0.1, 0.1, 0.1);
		viewMatrix.appendTranslation(x, y, z);
		viewMatrix.appendRotation(time.ms / 10000, new Vec3(1, 1, 1).normalize());
		viewMatrixUniform.setMatrix4(viewMatrix);

		colorUniform.setRGBA(color);
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
	}
}

@GLSL("

	attribute vec2 vertexPosition;

	uniform mat4 viewMatrix;
	uniform mat4 worldMatrix;
	uniform mat4 projectionMatrix;

	varying vec4 vertex;

	void main(void)
	{
		gl_Position = projectionMatrix * worldMatrix * viewMatrix * vec4(vertexPosition, 0.0, 1.0);
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