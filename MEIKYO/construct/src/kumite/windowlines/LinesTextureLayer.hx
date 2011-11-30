package kumite.windowlines;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.scene.TransitionContext;
import kumite.scene.LayerState;
import kumite.scene.RenderContext;
import kumite.layer.LayerTransitions;
import kumite.layer.LayerTransition;

import kumite.stage.Stage;
import kumite.time.Time;
import kumite.projection.Projection;
import kumite.camera.Camera;

import haxe.rtti.Infos;

class LinesTextureLayer implements LayerLifecycle, implements Infos
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

		vertexPositionAttribute = GL.getAttribLocation2("vertexPosition", 2, GL.FLOAT);
		
		var vertexes = new Float32Array(12 * 3);
		
		addShape(vertexes, 0, 
			0.0, 	0.2,
			0.3, 	0.2,
			0.0, 	0.99,
			0.3, 	0.99
			);
		
		addShape(vertexes, 1, 
			0.31, 	0.2,
			0.6, 	0.2,
			0.31, 	0.99,
			0.6, 	0.99
			);
		
		addShape(vertexes, 2, 
			0.61, 	0.2,
			1.0, 	0.2,
			0.61, 	0.99,
			1.0, 	0.99
			);
		
		vertexPositionAttribute.updateBuffer(vertexes);

		projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
		textureUniform = GL.getUniformLocation("texture");
		alphaUniform = GL.getUniformLocation("alpha");
		flipYUniform = GL.getUniformLocation("flipY");
	}
	
	function addShape(vertexes : Float32Array, offset, x0, y0, x1, y1, x2, y2, x3, y3)
	{
		vertexes[offset * 12 + 0] = x0;
		vertexes[offset * 12 + 1] = y0;
		
		vertexes[offset * 12 + 2] = x1;
		vertexes[offset * 12 + 3] = y1;
		
		vertexes[offset * 12 + 4] = x2;
		vertexes[offset * 12 + 5] = y2;
		
		vertexes[offset * 12 + 6] = x2;
		vertexes[offset * 12 + 7] = y2;
		
		vertexes[offset * 12 + 8] = x1;
		vertexes[offset * 12 + 9] = y1;
		
		vertexes[offset * 12 + 10] = x3;
		vertexes[offset * 12 + 11] = y3;
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
		
		vertexPositionAttribute.drawArrays(GL.TRIANGLES);
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
