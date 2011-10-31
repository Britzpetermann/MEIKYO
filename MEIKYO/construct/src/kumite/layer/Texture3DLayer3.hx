package kumite.layer;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.scene.TransitionContext;
import kumite.scene.LayerState;
import kumite.scene.RenderContext;

import kumite.stage.Stage;
import kumite.time.Time;
import kumite.projection.Projection;
import kumite.camera.Camera;

import haxe.rtti.Infos;

class Texture3DLayer2 implements LayerLifecycle, implements Infos
{
	@Inject
	public var time : Time;
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	public var transitions : LayerTransitions;
	public var cutTransition : LayerTransition;
	public var moveTransition : LayerTransition;
	public var alphaTransition : LayerTransition;
	
	@Param
	public var scale : Float;
	
	@Param
	public var position : Vec3;
	
	@Param
	public var textureConfig : GLTextureConfig;
	
	var shaderProgram : WebGLProgram;
	
	var vertexPositionAttribute : GLAttribLocation;
	var vertexUVAttribute : GLAttribLocation;

	var projectionMatrixUniform : GLUniformLocation;
	var worldViewMatrixUniform : GLUniformLocation;
	var textureUniform : GLUniformLocation;
	var alphaUniform : GLUniformLocation;
		
	public function new()
	{
		scale = 1;
		position = new Vec3(0, 0, 0);
		transitions = new LayerTransitions();
		transitions.add(cutTransition = new LayerTransition("cut"));
		transitions.add(moveTransition = new LayerTransition("move"));
		transitions.add(alphaTransition = new LayerTransition("alpha"));
		transitions.enableChild("alpha");
	}
	
	public function init()
	{
		shaderProgram = GL.createProgram(Vertex, Fragment);

		vertexPositionAttribute = GL.getAttribLocation2("vertexPosition", 3, GL.FLOAT);
		
		vertexPositionAttribute.updateBuffer(new Float32Array([
			1350 - 18,  	40, 		-400,
			1630 - 20,  	40 - 10, 		0,
			1350,  	800, 	-400,
			1630,  	800 - 20, 	0,
		]));
		 
		/*
		vertexPositionAttribute.updateBuffer(new Float32Array([
			//tl
			285,  		446,		390,
			
			//tr
			672, 		462,		0,
			
			//bl
			260,  		1060,	390,
			
			//br
			633,  		1057,	0,
		]));
		 */

		vertexUVAttribute = GL.getAttribLocation2("vertexUV", 2, GL.FLOAT);
		vertexUVAttribute.updateBuffer(new Float32Array([
			0,  0,
			1,  0,
			0,  1,
			1,  1,
		]));

		projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
		textureUniform = GL.getUniformLocation("texture");
		alphaUniform = GL.getUniformLocation("alpha");
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

		var projectionMatrix = new Matrix4();
		projectionMatrix.setPerspective(21.3, renderContext.aspect, 0.1, 4000);
		projectionMatrixUniform.setMatrix4(projectionMatrix);
		

		var texture = textureRegistry.get(textureConfig);
		
		var camera = new Matrix4();
		camera.setLookAt(new Vec3(0, 0, 2900), new Vec3(0, -540, 0), new Vec3(0, 1, 0));

		var scale = 0.00674;
		var worldViewMatrix = new Matrix4();
		worldViewMatrix.appendTranslation(0, -530, 0);
		worldViewMatrix.append(camera);
		worldViewMatrix.appendTranslation(-1920 / 2, -1080 / 2, 0);
		worldViewMatrix.appendScale(1, -1, 1);
		worldViewMatrixUniform.setMatrix4(worldViewMatrix);
		
		textureUniform.setTexture(texture);
		alphaUniform.uniform1f(alphaTransition.transition);
		
		vertexPositionAttribute.vertexAttribPointer();
		vertexUVAttribute.vertexAttribPointer();
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
	}
}

@GLSL("

	attribute vec3 vertexPosition;
	attribute vec2 vertexUV;

	uniform mat4 projectionMatrix;
	uniform mat4 worldViewMatrix;

	varying vec2 textureCoord;
	varying vec2 uv;

	void main(void)
	{
		gl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 1.0);
		textureCoord = vertexUV;
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
