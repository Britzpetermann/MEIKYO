package kumite.flyingman;

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

class FlyingManLayer implements LayerLifecycle, implements Infos
{
	@Inject
	public var stage : Stage;
	
	@Inject
	public var time : Time;
	
	@Inject
	public var projection : Projection;
	
	@Inject
	public var graph : FlyingManGraph;
	
	@Param
	public var cameraId : String;
	
	public var transitions : LayerTransitions;
	public var alphaTransition : LayerTransition;
	
	var cameraMatrix : Matrix4;
	var viewMatrix : Matrix4;
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : WebGLBuffer;

	var projectionMatrixUniform : GLUniformLocation;
	var worldMatrixUniform : GLUniformLocation;
	var viewMatrixUniform : GLUniformLocation;
	var textureUniform : GLUniformLocation;
	var alphaUniform : GLUniformLocation;
		
	public function new()
	{
		cameraMatrix = new Matrix4();
		viewMatrix = new Matrix4();

		transitions = new LayerTransitions();
		transitions.add(alphaTransition = new LayerTransition("alpha"));
		transitions.enableChild("alpha");
		
		alphaTransition.ease = ease.Quad.easeInOut;
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
		worldMatrixUniform = GL.getUniformLocation("worldMatrix");
		viewMatrixUniform = GL.getUniformLocation("viewMatrix");
		textureUniform = GL.getUniformLocation("texture");
		alphaUniform = GL.getUniformLocation("alpha");
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
		
		vertexPositionAttribute.vertexAttribPointer();
		projectionMatrixUniform.setMatrix4(projection.matrix);
		
		switch (cameraId)
		{
			case "flyingMan1":
				cameraMatrix.setFrom(graph.butterflyCloseupCamera2.matrix);
			case "flyingMan2":
				cameraMatrix.setLookAt(new Vec3(0, 100, 100), new Vec3(0, 0, 20), new Vec3(0, 1, 0));
			case "flyingMan3":
				cameraMatrix.setFrom(graph.butterflyCloseupCamera.matrix);
			case "flyingMan4":
				cameraMatrix.setLookAt(new Vec3(0, 5, 5), new Vec3(0, 0, 20), new Vec3(0, 1, 0));
		}
		 
		worldMatrixUniform.setMatrix4(cameraMatrix);
		
		var lastTexture : GLTexture = null;
		for(sprite in graph.sprites)
		{	
			viewMatrix.setIdentity();
			viewMatrix.appendRotation(sprite.rotationY, new Vec3(0, 1, 0));
			viewMatrix.appendTranslation(sprite.position.x, sprite.position.y, sprite.position.z);
			viewMatrixUniform.setMatrix4(viewMatrix);
			
			if (sprite.texture != lastTexture)
			{
				lastTexture = sprite.texture;
				textureUniform.setTexture(lastTexture);
			}
			alphaUniform.setFloat(alphaTransition.transition);
			vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
		}
	}
}

@GLSL("

	attribute vec2 vertexPosition;

	uniform mat4 projectionMatrix;
	uniform mat4 worldMatrix;
	uniform mat4 viewMatrix;

	varying vec2 textureCoord;

	void main(void)
	{
		gl_Position = projectionMatrix * worldMatrix * viewMatrix * vec4(vertexPosition, 0.0, 1.0);
		textureCoord = (vertexPosition.xy * vec2(1, -1) + 1.0) * 0.5;
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
		precision highp float;
	#endif

	uniform sampler2D texture;
	uniform float alpha;

	varying vec2 textureCoord;

	void main(void)
	{
		vec4 color = texture2D(texture, textureCoord);
		gl_FragColor = color * vec4(1.0, 1.0, 1.0, alpha);
	}


") private class Fragment {}