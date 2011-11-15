package kumite.layer.effect;

import kumite.stage.Stage;
import kumite.time.Time;

import kumite.scene.LayerLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.RenderContext;

import haxe.rtti.Infos;

class EyeEffect implements LayerLifecycle, implements Infos
{
	@Inject
	public var time : Time;
	
	@Inject
	public var stage : Stage;
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Param
	public var textureConfig : GLTextureConfig;
	
	@Param
	public var offset : Float;
	
	@Param
	public var position : Vec2;
	
	
	var shaderProgram : WebGLProgram;
	var vertexPositionAttribute : GLAttribLocation;
	var vertexBuffer : WebGLBuffer;

	var directionUniform : GLUniformLocation;
	var timeUniform : GLUniformLocation;
	var textureUniform : GLUniformLocation;
			
	var mousePosition : Vec2;
	
	public function new()
	{
		position = new Vec2(0, 0);
		mousePosition = new Vec2(0, 0);
	}
	
	public function init()
	{
		shaderProgram = GL.createProgram(Vertex, Fragment);

		vertexPositionAttribute = GL.getAttribLocation2("vertexPosition", 2, GL.BYTE);
		vertexPositionAttribute.updateBuffer(new Int8Array([
			-1,  -1,
			1,  -1,
			-1,  1,
			1,  1,
		]));

		directionUniform = GL.getUniformLocation("direction");
		timeUniform = GL.getUniformLocation("time");
		textureUniform = GL.getUniformLocation("texture");
		
		GLMouseRegistry.getInstance().mouseMoveSignaler.bind(updateMouse);
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
		GL.disable(GL.BLEND);

		vertexPositionAttribute.vertexAttribPointer();

		var texture = textureRegistry.get(textureConfig);
		textureUniform.setTexture(texture);

		timeUniform.setFloat(time.ms / 1000);
		directionUniform.setVec2(new Vec2((position.x - mousePosition.x) / 20000, (position.y - mousePosition.y) / 20000));
		
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
	}
	
	function updateMouse(position : Vec2)
	{
		mousePosition = position.clone();
		mousePosition.x -= 0.5;
		mousePosition.y -= 0.5;
		mousePosition.x *= 4.0;
		mousePosition.y *= 4.0;
		mousePosition.x *= stage.width;
		mousePosition.y *= stage.height;
		Log.info(Std.string(mousePosition));
	}
}

@GLSL("

	attribute vec2 vertexPosition;

	varying vec2 tc;

	void main(void)
	{
		gl_Position = vec4(vertexPosition.x, vertexPosition.y, 0.0, 1.0);
		tc = (vertexPosition.xy + 1.0) * 0.5;
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
	precision highp float;
	#endif
	
	varying vec2 tc;

	uniform vec2 direction;
	uniform float time;
	uniform sampler2D texture;
	
	void main(void)
	{
		float zoom = 4.0;
		vec2 p = (-1.0 + 2.0 * tc) * 0.5;
		float r = dot(p,p) * zoom;

		float f = pow((1.0 - sqrt(1.0 - r)) / r, 0.8);

		vec2 uv;
		uv.x = p.x * f + 0.5 + direction.x + sin(time * 14.0 + p.y * 10.0) * 0.0005;
		uv.y = p.y * f + 0.5 + direction.y + cos(time * 14.0 + p.x * 10.0) * 0.0005;

		vec4 pixel = texture2D(texture, uv);
		gl_FragColor = pixel;
	}

") private class Fragment {}
