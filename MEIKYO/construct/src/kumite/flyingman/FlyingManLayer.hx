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
	public static var MAN1 : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/man1.png");
	public static var MAN2 : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/man2.png");
	public static var MAN3 : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/man3.png");
	public static var FLOWER1 : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/flower1.png");
	public static var FLOWER2 : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/flower2.png");
	
	@Inject
	public var stage : Stage;
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Inject
	public var time : Time;
	
	@Inject
	public var projection : Projection;
	
	@Inject
	public var camera : Camera;
	
	public var layerId : String;
	
	public var transitions : LayerTransitions;
	public var alphaTransition : LayerTransition;
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : WebGLBuffer;

	var projectionMatrixUniform : GLUniformLocation;
	var worldViewMatrixUniform : GLUniformLocation;
	var textureUniform : GLUniformLocation;
	var alphaUniform : GLUniformLocation;
		
	public function new()
	{
		layerId = "FlyingManLayer";

		transitions = new LayerTransitions();
		transitions.add(alphaTransition = new LayerTransition("alpha"));
		transitions.enableChild("alpha");
		
		alphaTransition.ease = ease.Quad.easeInOut;
	}
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		group.add(new GLTextureLoadingTask(textureRegistry, MAN1));
		group.add(new GLTextureLoadingTask(textureRegistry, MAN2));
		group.add(new GLTextureLoadingTask(textureRegistry, MAN3));
		group.add(new GLTextureLoadingTask(textureRegistry, FLOWER1));
		group.add(new GLTextureLoadingTask(textureRegistry, FLOWER2));
		
		return group;
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
		
		GL.disable(GL.DEPTH_TEST);
		GL.enable(GL.BLEND);
		GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);

		projectionMatrixUniform.setMatrix4(projection.matrix);
		vertexPositionAttribute.vertexAttribPointer();
		
		for(k in 0...3)
		{
			var radius = Map.linear(k, 0, 3, 2 + Math.sin(time.ms / 500) * 0.5, 4 + Math.sin(time.ms / 1000) * 0.5);
			
			var n : Int = 10;
			var speed : Float = 2000;
			switch(k)
			{
				case 2:
					n = 30;
					speed = 2000;
					textureUniform.setTexture(textureRegistry.get(MAN1));
				case 1:
					n = 25;
					speed = 1500;
					textureUniform.setTexture(textureRegistry.get(MAN2));
				case 0:
					n = 20;
					speed = 1000;
					textureUniform.setTexture(textureRegistry.get(MAN3));
			}
				
			for(r in 0...n)
			{
				var rad = r * Math.PI / (n / 2);
				var worldViewMatrix = new Matrix4();
				worldViewMatrix.multiply(camera.matrix);
				worldViewMatrix.appendTranslation(0, -1, 10);
				worldViewMatrix.appendEulerRotation(Math.sin(time.ms / 2000) * 0.2, Math.sin(time.ms / speed) * 0.1, 0);
				worldViewMatrix.appendEulerRotation(0, 0, 0.2);
				worldViewMatrix.appendEulerRotation(-time.ms / speed, 0, 0);
				worldViewMatrix.appendTranslation(Math.sin(rad) * radius, 0, Math.cos(rad) * radius);
				worldViewMatrix.appendEulerRotation(-rad, 0, 0);
				worldViewMatrix.appendEulerRotation(0, Math.PI, 0);
				worldViewMatrix.appendScale(0.5, 0.5, 0.5);
				
				worldViewMatrixUniform.setMatrix4(worldViewMatrix);
				
				alphaUniform.setFloat(alphaTransition.transition * Map.linear(Math.cos(rad + time.ms / speed), 1, -1, 0.4, 1));
				
				vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
			}
		}
		
		for(i in 0...100)
		{
			var rad = i * 2;
			if (i % 2 == 0)
				textureUniform.setTexture(textureRegistry.get(FLOWER1));
			else
				textureUniform.setTexture(textureRegistry.get(FLOWER2));
				
			var worldViewMatrix = new Matrix4();
			worldViewMatrix.multiply(camera.matrix);
			worldViewMatrix.appendTranslation(0, -1, 10);
			worldViewMatrix.appendEulerRotation(Math.sin(time.ms / 2000) * 0.2, Math.sin(time.ms / 1000) * 0.1, 0);
			worldViewMatrix.appendEulerRotation(0, 0, 0.2);
			worldViewMatrix.appendTranslation(Math.sin(rad * 0.8) * 20, 0, Math.cos(rad) * 20 - 7);
			worldViewMatrix.appendEulerRotation(0, 0, 0);
			worldViewMatrix.appendEulerRotation(0, Math.PI, 0);
			worldViewMatrix.appendScale(0.9, 0.9, 0.9);
			
			worldViewMatrixUniform.setMatrix4(worldViewMatrix);
			
			alphaUniform.setFloat(alphaTransition.transition * Map.linear(Math.cos(rad), 1, -1, 0.2, 2));
				
			vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
		}
		
	}
}

@GLSL("

	attribute vec2 vertexPosition;

	uniform mat4 projectionMatrix;
	uniform mat4 worldViewMatrix;

	varying vec2 textureCoord;

	void main(void)
	{
		gl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);
		textureCoord = (vertexPosition.xy + 1.0) * 0.5;
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