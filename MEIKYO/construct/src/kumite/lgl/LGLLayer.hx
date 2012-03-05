package kumite.lgl;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.scene.TransitionContext;
import kumite.scene.LayerState;
import kumite.scene.RenderContext;

import kumite.layer.LayerTransitions;
import kumite.layer.LayerTransition;

import kumite.projection.Projection;
import kumite.camera.Camera;
import kumite.stage.Stage;
import kumite.time.Time;

import haxe.rtti.Infos;

class LGLLayer implements LayerLifecycle, implements Infos
{
	@Inject
	public var time : Time;

	@Inject
	public var stage : Stage;

	@Inject
	public var projection : Projection;

	@Inject
	public var camera : Camera;

	@Inject
	public var lgl : LGL;

	@Param
	public var scale : Float;

	@Param
	public var rotationX : Float;

	@Param
	public var rotationY : Float;

	@Param
	public var rotationZ : Float;

	@Param
	public var alpha : Float;

	public var viewMatrix : Matrix4;

	public var transitions : LayerTransitions;
	public var alphaTransition : LayerTransition;

	var shaderProgram : WebGLProgram;

	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : Float32Array;
	var targetBuffer : Float32Array;

	var projectionMatrixUniform : GLUniformLocation;
	var worldViewMatrixUniform : GLUniformLocation;
	var alphaUniform : GLUniformLocation;
	
	var label : GLLabel;

	public function new()
	{
		viewMatrix = new Matrix4();
		scale = 0.2;
		rotationX = 0;
		rotationY = 0;
		rotationZ = 0;
		alpha = 0.2;
		
		transitions = new LayerTransitions();
		transitions.add(alphaTransition = new LayerTransition("alpha"));
		transitions.enableChild("alpha");
	}

	public function init()
	{
		shaderProgram = GL.createProgram(Vertex, Fragment);

		projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
		alphaUniform = GL.getUniformLocation("alpha");

		vertexPositionAttribute = GL.getAttribLocation2("vertexPosition", 3, GL.FLOAT);

		vertexBuffer = new Float32Array(lgl.edges.length * 6);
		targetBuffer = new Float32Array(lgl.edges.length * 6);
		vertexPositionAttribute.updateBuffer(vertexBuffer);
		
		label = new GLLabel();
		label.x = 100;
		label.y = 200;
		label.width = 100;
		label.height = 20;
		label.text = "Huhu!";
		GLDisplayList.getDefault().stage.addChild(label);
	}

	public function updateModel(targetBuffer:Float32Array)
	{
		this.targetBuffer = targetBuffer; 
	}

	public function renderTransition(transitionContext : TransitionContext)
	{
		transitions.transition = transitionContext.transition;
		
		render(transitionContext);
	}

	public function render(renderContext : RenderContext)
	{
		rotationX += 0.001;
		rotationY += 0.0007;
		GL.useProgram(shaderProgram);
		GL.viewport(0, 0, renderContext.width, renderContext.height);

		GL.disable(GL.DEPTH_TEST);
		GL.enable(GL.BLEND);

		projectionMatrixUniform.setMatrix4(projection.matrix);
		alphaUniform.setFloat(alphaTransition.transition * alpha);

		viewMatrix.setIdentity();
		viewMatrix.appendScale(scale, scale, scale);
		viewMatrix.appendRotation(rotationX, new Vec3(1, 0, 0));
		viewMatrix.appendRotation(rotationY, new Vec3(0, 1, 0));
		viewMatrix.appendRotation(rotationZ, new Vec3(0, 0, 1));
		viewMatrix.append(camera.matrix);
		worldViewMatrixUniform.setMatrix4(viewMatrix);


		for(i in 0...lgl.edges.length * 6)
		{
			vertexBuffer[i] += (targetBuffer[i] - vertexBuffer[i]) * 0.1;
		}
		vertexPositionAttribute.updateBuffer3(vertexBuffer);

		vertexPositionAttribute.vertexAttribPointer();
		vertexPositionAttribute.drawArrays(GL.LINES);
	}

}

@GLSL("

	attribute vec3 vertexPosition;

	uniform mat4 projectionMatrix;
	uniform mat4 worldViewMatrix;

	void main(void)
	{
		gl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 1.0);
		gl_PointSize = 1.0;
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
