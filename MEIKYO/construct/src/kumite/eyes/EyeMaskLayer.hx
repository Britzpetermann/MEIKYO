package kumite.eyes;

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

class EyeMaskLayer implements LayerLifecycle, implements Infos
{
	@Inject
	public var time : Time;
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Param
	public var scale : Float;
	
	@Param
	public var position : Vec3;
	
	@Param
	public var textureConfig : GLTextureConfig;
	
	public var blend : Bool;
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : WebGLBuffer;

	var projectionMatrixUniform : GLUniformLocation;
	var worldViewMatrixUniform : GLUniformLocation;
	var textureUniform : GLUniformLocation;
	var colorcube0Uniform : GLUniformLocation;
	var colorcube1Uniform : GLUniformLocation;
	var shutUniform : GLUniformLocation;
	
	static var STATE_IDLE : String = "STATE_IDLE";
	static var STATE_OPENING : String = "STATE_OPENING";
	static var STATE_CLOSING : String = "STATE_CLOSING";
	
	static var OPENING_SPEED : Float = 0.2;
	static var CLOSING_SPEED : Float = 0.1;
	static var CLOSING_CHANCE : Float = 0.0001;
	
	var state : String;
	var shut : Float;
		
	public function new()
	{
		blend = true;
		scale = 1;
		position = new Vec3(0, 0, 0);
		state = STATE_IDLE;
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
		colorcube0Uniform = GL.getUniformLocation("colorcube0");
		colorcube1Uniform = GL.getUniformLocation("colorcube1");
		shutUniform = GL.getUniformLocation("shut");
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
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
		
		textureUniform.setTexture(texture, 0);
		
		iterate();
		
		shutUniform.setFloat(shut);
		
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
	}
	
	function iterate()
	{
		var len = Math.sqrt(position.x * position.x + position.y * position.y);
		
		switch (state)
		{
			case STATE_IDLE:
				shut = 0;
				if (Math.sin(time.ms / 1000 / 2 + len * 0.0002) > 0.999 || Rand.bool(CLOSING_CHANCE))
				{
					state = STATE_CLOSING;
				}
			case STATE_CLOSING:
				shut += OPENING_SPEED;
				if (shut > 0.8)
				{
					state = STATE_OPENING;
				}
			case STATE_OPENING:
				shut -= CLOSING_SPEED;
				if (shut < 0)
				{
					shut = 0;
					state = STATE_IDLE;
				}
		}
	}
}

@GLSL("

	attribute vec2 vertexPosition;

	uniform mat4 projectionMatrix;
	uniform mat4 worldViewMatrix;

	varying vec4 vertex;
	varying vec2 textureCoord;
	varying vec2 tc;

	void main(void)
	{
		gl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);
		vertex = vec4(vertexPosition, 0.0, 1.0);
		textureCoord = vertexPosition.xy;
		tc = vertexPosition;
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
		precision highp float;
	#endif

	uniform sampler2D texture;

	uniform float shut;

	varying vec2 tc;
	varying vec2 textureCoord;

	void main(void)
	{
		float zoom = 4.0;
		vec2 p = (-1.0 + 2.0 * tc) * 0.5;
		float r = dot(p,p) * zoom;

		float v = shut;

		float zoom2 = 4.0 - v * 3.0;

		vec2 pTop = -0.5 + vec2(tc.x, tc.y + v);
		float rTop = dot(pTop,pTop) * zoom2;

		vec2 pBottom = -0.5 + vec2(tc.x, tc.y - v);
		float rBottom = dot(pBottom,pBottom) * zoom2;

		if (rTop > 1.0)
			discard;

		if (rBottom > 1.0)
			discard;

		if (r > 1.0)
			discard;

		vec4 color = texture2D(texture, vec2(textureCoord.x, 1.0 - textureCoord.y));
		gl_FragColor = color;
	}

") private class Fragment {}
