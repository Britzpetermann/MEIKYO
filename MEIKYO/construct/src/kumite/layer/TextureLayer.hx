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

class TextureLayer implements LayerLifecycle, implements Infos
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
	@ParamMin(-10)
	@ParamMax(10)
	public var scale : Float;
	
	@Param
	public var position : Vec3;
	
	@Param
	public var textureConfig : GLTextureConfig;
	
	@Param
	public var blend : Bool;
	
	@Param
	public var flipY : Bool;
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : WebGLBuffer;

	var projectionMatrixUniform : GLUniformLocation;
	var worldViewMatrixUniform : GLUniformLocation;
	var textureUniform : GLUniformLocation;
	var alphaUniform : GLUniformLocation;
	var flipYUniform : GLUniformLocation;
		
	public function new()
	{
		blend = true;
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

		vertexPositionAttribute = GL.getAttribLocation2("vertexPosition", 2, GL.BYTE);
		vertexPositionAttribute.updateBuffer(new Int8Array([
			0,  0,
			1,  0,
			0,  1,
			1,  1,
		]));

		projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
		textureUniform = GL.getUniformLocation("texture");
		alphaUniform = GL.getUniformLocation("alpha");
		flipYUniform = GL.getUniformLocation("flipY");
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
		
		if (blend)
		{
			GL.enable(GL.BLEND);
			GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
		}
		else
		{
			GL.disable(GL.BLEND);
		}

		var projectionMatrix = new Matrix4();
		projectionMatrix.setOrtho(0, renderContext.width, renderContext.height, 0, 0, 1);
		projectionMatrixUniform.setMatrix4(projectionMatrix);
		
		vertexPositionAttribute.vertexAttribPointer();

		var texture = textureRegistry.get(textureConfig);

		var worldViewMatrix = new Matrix4();
		worldViewMatrix.appendScale(texture.width * scale, texture.height * scale, 1);
		worldViewMatrix.appendTranslation(position.x, position.y, position.z);
		worldViewMatrix.appendTranslation((renderContext.width - texture.width * scale) / 2, (renderContext.height - texture.height * scale) / 2, 0);
		worldViewMatrixUniform.setMatrix4(worldViewMatrix);
		
		textureUniform.setTexture(texture);
		alphaUniform.setFloat(alphaTransition.transition);
		flipYUniform.setFloat(flipY ? 1 : 0);
		
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
	}
}

@GLSL("

	attribute vec2 vertexPosition;

	uniform mat4 projectionMatrix;
	uniform mat4 worldViewMatrix;
	uniform float flipY;

	varying vec4 vertex;
	varying vec2 textureCoord;

	void main(void)
	{
		gl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);
		vertex = vec4(vertexPosition, 0.0, 1.0);

		if (flipY == 1.0)
		{
			textureCoord = vertexPosition.xy;
			textureCoord.y = 1.0 - textureCoord.y;
		} 
		else
		{
			textureCoord = vertexPosition.xy;
		}
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
		vec4 color = texture2D(texture, vec2(textureCoord.x, textureCoord.y));
		gl_FragColor = color * vec4(1.0, 1.0, 1.0, alpha);
	}

") private class Fragment {}
