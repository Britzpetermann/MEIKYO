package kumite.spritemesh2;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.layer.LayerTransition;
import kumite.layer.LayerTransitions;
import kumite.scene.TransitionContext;
import kumite.stage.Stage;
import kumite.time.Time;
import kumite.projection.Projection;
import kumite.camera.Camera;

import haxe.rtti.Infos;

class SpriteMeshLayer implements LayerLifecycle, implements Infos
{
	public static var max : Int = 15000;
	
	@Inject
	public var stage : Stage;
	
	@Inject
	public var time : Time;
	
	@Inject
	public var projection : Projection;
	
	public var layerId : String;
	
	var vertextBuffer : Float32Array;
	
	public var transitions : LayerTransitions;
	public var alphaTransition : LayerTransition;
	
	var cameraMatrix : Matrix4;
	
	var shaderProgram : WebGLProgram;

	var cubeVerticesIndexBuffer : WebGLBuffer;	
	var vertexPositionAttribute : GLAttribLocation;
	var projectionMatrixUniform : GLUniformLocation;
	var worldMatrixUniform : GLUniformLocation;
	var viewMatrixUniform : GLUniformLocation;
	var alphaUniform : GLUniformLocation;
		
	public function new()
	{
		layerId = "SpriteMeshLayer2";

		cameraMatrix = new Matrix4();

		transitions = new LayerTransitions();
		transitions.add(alphaTransition = new LayerTransition("alpha"));
		transitions.enableChild("alpha");
		
		alphaTransition.ease = ease.Quad.easeInOut;
	}
	
	public function init()
	{
		shaderProgram = GL.createProgram(Vertex, Fragment);

		vertextBuffer = new Float32Array(max * 12);
		for (i in 0...max)
		{
			var j = i * 12;
			vertextBuffer[0 + j] = -1;
			vertextBuffer[1 + j] = -1;
			vertextBuffer[2 + j] = 0;
			
			vertextBuffer[3 + j] = 1;
			vertextBuffer[4 + j] = -1;
			vertextBuffer[5 + j] = 0;
			
			vertextBuffer[6 + j] = -1;
			vertextBuffer[7 + j] = 1;
			vertextBuffer[8 + j] = 0;
			
			vertextBuffer[9 + j] = 1;
			vertextBuffer[10 + j] = 1;
			vertextBuffer[11 + j] = 0;
		}
		
		vertexPositionAttribute = GL.getAttribLocation2("vertexPosition", 3, GL.FLOAT);
		vertexPositionAttribute.updateBuffer(vertextBuffer);
		
		cubeVerticesIndexBuffer = GL.createBuffer();  
  		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer); 	
		
		var elementIndexes = new Uint16Array(6 * max);
		
		for(i in 0...max)
		{
			var j = i * 6;
			var k = i * 4;
			elementIndexes[0 + j] = 0 + k;
			elementIndexes[1 + j] = 1 + k;
			elementIndexes[2 + j] = 2 + k;
			elementIndexes[3 + j] = 1 + k;
			elementIndexes[4 + j] = 3 + k;
			elementIndexes[5 + j] = 2 + k;
		}
		GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,  elementIndexes, GL.STATIC_DRAW);  

		projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		worldMatrixUniform = GL.getUniformLocation("worldMatrix");
		alphaUniform = GL.getUniformLocation("alpha");
		
		cameraMatrix = new Matrix4();
		cameraMatrix.setLookAt(new Vec3(0, 0, 10), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
		transitions.transition = transitionContext.transition;
		render();
	}
		
	public function render()
	{
		GL.useProgram(shaderProgram);
		GL.viewport(0, 0, stage.width, stage.height);
		
		GL.enable(GL.DEPTH_TEST);
		GL.enable(GL.BLEND);
		GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
		
		var m = new Matrix4();


		var v = new Vec3();
		for (i in 0...max)
		{
			var j = i * 12;
			
			m.setIdentity();	
			m.appendScale(0.2, 0.2, 0.2);
			m.appendTranslation(Math.sin(time.ms / 1700 + i * 2) * 3, Math.cos(time.ms / 1800 + i /3) * 3, Math.cos(time.ms / 2000 - i) * 3);
			m.appendRotation(time.ms / 1000, new Vec3(1, 1, 1).normalize());
			
			v.x = -1;
			v.y = -1;
			v.z = 0;
			v.transform(m);
			vertextBuffer[0 + j] = v.x;
			vertextBuffer[1 + j] = v.y;
			vertextBuffer[2 + j] = v.z;
			
			v.x = 1;
			v.y = -1;
			v.z = 0;
			v.transform(m);
			vertextBuffer[3 + j] = v.x;
			vertextBuffer[4 + j] = v.y;
			vertextBuffer[5 + j] = v.z;
			
			v.x = -1;
			v.y = 1;
			v.z = 0;
			v.transform(m);
			vertextBuffer[6 + j] = v.x;
			vertextBuffer[7 + j] = v.y;
			vertextBuffer[8 + j] = v.z;
			
			v.x = 1;
			v.y = 1;
			v.z = 0;
			v.transform(m);
			vertextBuffer[9 + j] = v.x;
			vertextBuffer[10 + j] = v.y;
			vertextBuffer[11 + j] = v.z;
		}
		
		vertexPositionAttribute.updateBuffer2(vertextBuffer);
		
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);  
		vertexPositionAttribute.vertexAttribPointer();

		projectionMatrixUniform.setMatrix4(projection.matrix);
		worldMatrixUniform.setMatrix4(cameraMatrix);
		alphaUniform.setFloat(alphaTransition.transition);
		
		GL.drawElements(GL.TRIANGLES, max * 6, GL.UNSIGNED_SHORT, 0);
	}
}

@GLSL("

	attribute vec3 vertexPosition;

	uniform mat4 projectionMatrix;
	uniform mat4 worldMatrix;

	void main(void)
	{
		gl_Position = projectionMatrix * worldMatrix * vec4(vertexPosition, 1.0);
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
		precision highp float;
	#endif

	uniform float alpha;

	void main(void)
	{
		gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
	}


") private class Fragment {}