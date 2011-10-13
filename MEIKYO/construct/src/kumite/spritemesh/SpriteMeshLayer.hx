package kumite.spritemesh;

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
	public static var max : Int = 100;
	
	@Inject
	public var stage : Stage;
	
	@Inject
	public var time : Time;
	
	@Inject
	public var projection : Projection;
	
	public var layerId : String;
	
	public var transitions : LayerTransitions;
	public var alphaTransition : LayerTransition;
	
	var cameraMatrix : Matrix4;
	
	var shaderProgram : WebGLProgram;
	
	var vertexPositionAttribute : GLAttribLocation;
	
	var m0Buffer : Float32Array;
	var m0Attribute : GLAttribLocation;
	
	var m1Buffer : Float32Array;
	var m1Attribute : GLAttribLocation;
	
	var m2Buffer : Float32Array;
	var m2Attribute : GLAttribLocation;
	
	var m3Buffer : Float32Array;
	var m3Attribute : GLAttribLocation;

	var projectionMatrixUniform : GLUniformLocation;
	var worldMatrixUniform : GLUniformLocation;
	var viewMatrixUniform : GLUniformLocation;
	var alphaUniform : GLUniformLocation;
		
	public function new()
	{
		layerId = "SpriteMeshLayer";

		cameraMatrix = new Matrix4();

		transitions = new LayerTransitions();
		transitions.add(alphaTransition = new LayerTransition("alpha"));
		transitions.enableChild("alpha");
		
		alphaTransition.ease = ease.Quad.easeInOut;
	}
	
	public function init()
	{
		shaderProgram = GL.createProgram(Vertex, Fragment);

		var vertextBuffer = new Int8Array(max * 8);
		for (i in 0...max)
		{
			var j = i * 8;
			vertextBuffer[0 + j] = -1;
			vertextBuffer[1 + j] = -1;
			
			vertextBuffer[2 + j] = 1;
			vertextBuffer[3 + j] = -1;
			
			vertextBuffer[4 + j] = -1;
			vertextBuffer[5 + j] = 1;
			
			vertextBuffer[6 + j] = 1;
			vertextBuffer[7 + j] = 1;
		}
		vertexPositionAttribute = GL.getAttribLocation2("vertexPosition", 2, GL.BYTE);
		vertexPositionAttribute.updateBuffer(vertextBuffer);

		m0Buffer = new Float32Array(max * 16);
		m0Attribute = GL.getAttribLocation2("m0", 4, GL.FLOAT);
		m0Attribute.updateBuffer(m0Buffer);

		m1Buffer = new Float32Array(max * 16);
		m1Attribute = GL.getAttribLocation2("m1", 4, GL.FLOAT);
		m1Attribute.updateBuffer(m1Buffer);

		m2Buffer = new Float32Array(max * 16);
		m2Attribute = GL.getAttribLocation2("m2", 4, GL.FLOAT);
		m2Attribute.updateBuffer(m2Buffer);

		m3Buffer = new Float32Array(max * 16);
		m3Attribute = GL.getAttribLocation2("m3", 4, GL.FLOAT);
		m3Attribute.updateBuffer(m3Buffer);

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

		for(i in 0...max)
		{	
			m.setIdentity();	
			m.appendScale(0.2, 0.2, 0.2);
			m.appendTranslation(Math.sin(time.ms / 1700 + i * 2) * 3, Math.cos(time.ms / 1800 + i /3) * 3, Math.cos(time.ms / 2000 - i) * 3);
			m.appendRotation(time.ms / 1000, new Vec3(1, 1, 1).normalize());
			copyMatrixToBuffer(m, i);
		}
		
		m0Attribute.updateBuffer2(m0Buffer);		
		m1Attribute.updateBuffer2(m1Buffer);		
		m2Attribute.updateBuffer2(m2Buffer);		
		m3Attribute.updateBuffer2(m3Buffer);		
		
		vertexPositionAttribute.vertexAttribPointer();
		m0Attribute.vertexAttribPointer();
		m1Attribute.vertexAttribPointer();
		m2Attribute.vertexAttribPointer();
		m3Attribute.vertexAttribPointer();
		
		projectionMatrixUniform.setMatrix4(projection.matrix);
		
		worldMatrixUniform.setMatrix4(cameraMatrix);
		
		alphaUniform.setFloat(alphaTransition.transition);
		
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP, 0, 4 * max);		
	}
	
	
	function copyMatrixToBuffer(m : Matrix4, index : Int)
	{
		var i = index * 16;
		
		var n11 = m.n11;
		var n21 = m.n21;
		var n31 = m.n31;
		var n41 = m.n41;
		
		var n12 = m.n12;
		var n22 = m.n22;
		var n32 = m.n32;
		var n42 = m.n42;
		
		var n13 = m.n13;
		var n23 = m.n23;
		var n33 = m.n33;
		var n43 = m.n43;
		
		var n14 = m.n14;
		var n24 = m.n24;
		var n34 = m.n34;
		var n44 = m.n44;
		
		m0Buffer[0 + 0 + i] = n11;
		m0Buffer[1 + 0 + i] = n21;
		m0Buffer[2 + 0 + i] = n31;
		m0Buffer[3 + 0 + i] = n41;
		m0Buffer[0 + 4 + i] = n11;
		m0Buffer[1 + 4 + i] = n21;
		m0Buffer[2 + 4 + i] = n31;
		m0Buffer[3 + 4 + i] = n41;
		m0Buffer[0 + 8 + i] = n11;
		m0Buffer[1 + 8 + i] = n21;
		m0Buffer[2 + 8 + i] = n31;
		m0Buffer[3 + 8 + i] = n41;
		m0Buffer[0 + 12 + i] = n11;
		m0Buffer[1 + 12 + i] = n21;
		m0Buffer[2 + 12 + i] = n31;
		m0Buffer[3 + 12 + i] = n41;
		
		m1Buffer[0 + 0 + i] = n12;
		m1Buffer[1 + 0 + i] = n22;
		m1Buffer[2 + 0 + i] = n32;
		m1Buffer[3 + 0 + i] = n42;
		m1Buffer[0 + 4 + i] = n12;
		m1Buffer[1 + 4 + i] = n22;
		m1Buffer[2 + 4 + i] = n32;
		m1Buffer[3 + 4 + i] = n42;
		m1Buffer[0 + 8 + i] = n12;
		m1Buffer[1 + 8 + i] = n22;
		m1Buffer[2 + 8 + i] = n32;
		m1Buffer[3 + 8 + i] = n42;
		m1Buffer[0 + 12 + i] = n12;
		m1Buffer[1 + 12 + i] = n22;
		m1Buffer[2 + 12 + i] = n32;
		m1Buffer[3 + 12 + i] = n42;
		
		m2Buffer[0 + 0 + i] = n13;
		m2Buffer[1 + 0 + i] = n23;
		m2Buffer[2 + 0 + i] = n33;
		m2Buffer[3 + 0 + i] = n43;
		m2Buffer[0 + 4 + i] = n13;
		m2Buffer[1 + 4 + i] = n23;
		m2Buffer[2 + 4 + i] = n33;
		m2Buffer[3 + 4 + i] = n43;
		m2Buffer[0 + 8 + i] = n13;
		m2Buffer[1 + 8 + i] = n23;
		m2Buffer[2 + 8 + i] = n33;
		m2Buffer[3 + 8 + i] = n43;
		m2Buffer[0 + 12 + i] = n13;
		m2Buffer[1 + 12 + i] = n23;
		m2Buffer[2 + 12 + i] = n33;
		m2Buffer[3 + 12 + i] = n43;
				
		m3Buffer[0 + 0 + i] = n14;
		m3Buffer[1 + 0 + i] = n24;
		m3Buffer[2 + 0 + i] = n34;
		m3Buffer[3 + 0 + i] = n44;
		m3Buffer[0 + 4 + i] = n14;
		m3Buffer[1 + 4 + i] = n24;
		m3Buffer[2 + 4 + i] = n34;
		m3Buffer[3 + 4 + i] = n44;
		m3Buffer[0 + 8 + i] = n14;
		m3Buffer[1 + 8 + i] = n24;
		m3Buffer[2 + 8 + i] = n34;
		m3Buffer[3 + 8 + i] = n44;
		m3Buffer[0 + 12 + i] = n14;
		m3Buffer[1 + 12 + i] = n24;
		m3Buffer[2 + 12 + i] = n34;
		m3Buffer[3 + 12 + i] = n44;		
	}
}

@GLSL("

	attribute vec2 vertexPosition;
	attribute vec4 m0;
	attribute vec4 m1;
	attribute vec4 m2;
	attribute vec4 m3;

	uniform mat4 projectionMatrix;
	uniform mat4 worldMatrix;

	void main(void)
	{
		gl_Position = projectionMatrix * worldMatrix * mat4(m0, m1, m2, m3) * vec4(vertexPosition, 0.0, 1.0);
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
		precision highp float;
	#endif

	uniform float alpha;

	void main(void)
	{
		vec4 color = vec4(1.0, 0.0, 0.0, 1.0);
		gl_FragColor = color * vec4(1.0, 1.0, 1.0, alpha);
	}


") private class Fragment {}