package kumite.layer.effect;

import UserAgentContext;

import kumite.blobs.Blobs;
import kumite.blobs.Blob;
import kumite.stage.Stage;
import kumite.time.Time;

import kumite.scene.LayerLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.RenderContext;

import haxe.rtti.Infos;

class EyeEffect implements LayerLifecycle, implements Infos
{
	@Inject
	public var blobs : Blobs;
	
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
	
	var moveSet : MoveSetVec2;
	
	public var state : State;
	public var STATE_IDLE : IdleState;
	
	var idleStateIndex : Int;
	public var STATE_IDLE_1 : IdleState1;
	public var STATE_IDLE_2 : IdleState2;
	public var STATE_IDLE_3 : IdleState3;
	
	public var STATE_TARGET : TargetState;
	
	public function new()
	{
		STATE_IDLE = new IdleState(this);
		
		idleStateIndex = 0;
		STATE_IDLE_1 = new IdleState1(this);
		STATE_IDLE_2 = new IdleState2(this);
		STATE_IDLE_3 = new IdleState3(this);
		
		STATE_TARGET = new TargetState(this);
		
		position = new Vec2(0, 0);
		mousePosition = new Vec2(0, 0);
		moveSet = new MoveSetVec2(new Vec2(0,0), new Vec2(0,0), new Vec2(0.0008, 0.0008));
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
		
		setState(STATE_IDLE);
		
		GLMouseRegistry.getInstance().mouseMoveSignaler.bind(updateMouse);
	}
	
	public function setState(state : State)
	{
		if (this.state != null)
		{
			this.state.exit();
		}
		
		this.state = state;
		state.enterMs = time.ms;
		state.ms = time.ms;
		state.enter();
	}
	
	public function setRandomIdleState()
	{
		var idleStates = [STATE_IDLE_1, STATE_IDLE_2, STATE_IDLE_3];
		setState(idleStates[idleStateIndex % idleStates.length]);
		idleStateIndex++;
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
		
		var blobs2 = new Array();
		blobs2 = blobs2.concat(blobs.blobs);
		blobs2.sort(sortfunction);
		
		state.blobs = blobs2;
		state.moveSet = moveSet;
		state.ms = time.ms;
		state.stage = stage;
		state.position = position;
		state.execute();
		
		/*
		if (blobs.blobs.length > 0)
		{
			
			var blob = blobs2[0];
			var s = (300000 / Math.pow(blob.z - 1000, 2));
			
			var v = new Vec2((position.x / stage.width * s - ((1 - blob.x) - 0.5) * 0.3), -position.y / stage.height * s - ((1 - blob.y) - 0.7) * 0.3);
			if (v.x < -0.2)
				v.x = -0.2;
			if (v.x > 0.2)
				v.x = 0.2;
			if (v.y < -0.2)
				v.y = -0.2;
			if (v.y > 0.2)
				v.y = 0.2;
				
			moveSet.to.x = v.x;
			moveSet.to.y = v.y;
		}
		else
		{
			if (Rand.bool(0.005))
			{
				moveSet.to.x = Rand.float(-0.2, 0.2);
				moveSet.to.y = Rand.float(-0.2, 0.2);
			}
		}
		 */

		moveSet.move();
		moveSet.move();
		directionUniform.setVec2(moveSet.current);
		
		vertexPositionAttribute.drawArrays(GL.TRIANGLE_STRIP);
	}
	
	function sortfunction(a : kumite.blobs.Blob, b : kumite.blobs.Blob) : Int
	{
		var sx = position.x / stage.width;
		
		var adx = Math.abs(a.x - 0.5 - sx);
		var bdx = Math.abs(b.x - 0.5 - sx);
		
		if (adx < bdx)
			return 1;
		else if (adx > bdx)
			return -1;
		else
			return 0;
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

private class State
{
	public var parent : EyeEffect;
	
	public var enterMs : Float;
	public var ms : Float;
	
	public var stage : Stage;
	public var position : Vec2;
	public var blobs : Array<kumite.blobs.Blob>;
	public var moveSet : MoveSetVec2;
	
	public function new(parent : EyeEffect)
	{
		this.parent = parent;
	}
	
	function getDist()
	{
		try
		{
			var a = blobs[0];
			var sx = position.x / stage.width;
			var adx = Math.abs((a.x - 0.5) - sx);
			return adx;
		}
		catch(e : Dynamic)
		{
			return 1;		
		}
	}
	
	public function enter()
	{
		
	}
	
	public function execute()
	{
		
	}
	
	public function exit()
	{
		
	}
}

private class IdleState extends State
{
	override function execute()
	{
		if (blobs.length > 0)
		{
			parent.setState(parent.STATE_TARGET);
		}
		else
		{
			if (Rand.bool(0.005))
			{
				moveSet.to.x = Rand.float(-0.2, 0.2);
				moveSet.to.y = Rand.float(-0.2, 0.2);
			}
			
			if (ms - enterMs > 10000)
				parent.setRandomIdleState();
		}
	}
}

private class IdleState1 extends State
{
	override function execute()
	{
		if (Rand.bool(0.3) && getDist() > 0.2)
		{
			moveSet.to.x = Math.sin(ms / 400 + position.x * 0.002) * 0.2;
			moveSet.to.y = Math.cos(ms / 400 + position.y * 0.002) * 0.2;
		}
		
		if (ms - enterMs > 1500)
			parent.setState(parent.STATE_IDLE);
	}
}

private class IdleState2 extends State
{
	override function execute()
	{
		if (Rand.bool(0.3) && getDist() > 0.2)
		{
			moveSet.to.y = Math.cos(ms / 100 + position.x * 0.003) * 0.5;
		}
		
		if (ms - enterMs > 1500)
			parent.setState(parent.STATE_IDLE);
	}
}

private class IdleState3 extends State
{
	override function execute()
	{
		if (Rand.bool(0.1) && getDist() > 0.2)
		{
			moveSet.to.x = Math.sin(ms / 600 + position.x * 0.002) * 0.2;
			moveSet.to.y = 0;
		}
		
		if (ms - enterMs > 2000)
			parent.setState(parent.STATE_IDLE);
	}
}

private class TargetState extends State
{
	override function execute()
	{
		if (blobs.length == 0)
		{
			parent.setState(parent.STATE_IDLE);
			return;	
		}
		
		var blob = blobs[0];
		for(b in blobs)
		{
			if (b.z > blob.z)
				blob = b;
		}
		
		var ex = position.x / stage.width;
		var ey = position.y / stage.height;
		
		var bx = (blob.x - 0.5) * 2.0;
		var by = (blob.y - 0.10) * 1.0;
		
		//var focusX = (blob.z) * 0.3;
		//var focusY = (blob.z) * 0.25;
		
		var focusX = (blob.z + 0.05) * 0.46;
		var focusY = (blob.z + 0.05) * 0.35;
		
		moveSet.to.x = (ex - bx) * focusX;
		moveSet.to.y = -(ey - by) * focusY;
		
		if (ms - enterMs > 20000)
			parent.setRandomIdleState();
	}
}