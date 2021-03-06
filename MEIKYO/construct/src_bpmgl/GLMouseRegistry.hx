import hsl.haxe.DirectSignaler;
import hsl.haxe.Signaler;

class GLMouseRegistry
{
	static var instance : GLMouseRegistry;
	public static function getInstance()
	{
		if (instance == null)
			instance = new GLMouseRegistry();

		return instance;
	}

	public var mouseDownSignaler(default, null):Signaler<Vec2>;
	public var mouseUpSignaler(default, null):Signaler<Vec2>;
	public var mouseMoveSignaler(default, null):Signaler<Vec2>;

	var canvas : Canvas;

	function new()
	{
		mouseDownSignaler = new DirectSignaler(this);
		mouseUpSignaler = new DirectSignaler(this);
		mouseMoveSignaler = new DirectSignaler(this);
	}

	public function init(canvas : Canvas)
	{
		this.canvas = canvas;

		canvas.onmouseup = onMouseUp;
		canvas.onmousedown = onMouseDown;
		canvas.onmousemove = onMouseMove;
	}

	public function setCursor(cursor : String)
	{
		canvas.style.cursor = cursor;
	}

	public function createCursorClient()
	{
		var client = new GLCursorClient();
		return client;
	}

	function onMouseDown (e : Dynamic)
	{
		try
		{
			mouseDownSignaler.dispatch(getMousePosition(e));
		}
		catch (e : Dynamic)
		{
			Log.warn(e);
		}
	}

	function onMouseUp (e : Dynamic)
	{
		try
		{
			mouseUpSignaler.dispatch(getMousePosition(e));
		}
		catch (e : Dynamic)
		{
			Log.warn(e);
		}
	}

	function onMouseMove (e : Dynamic)
	{
		try
		{
			mouseMoveSignaler.dispatch(getMousePosition(e));
		}
		catch (e : Dynamic)
		{
			Log.warn(e);
		}
	}
	
	function getMousePosition(e : Dynamic)
	{
		var mouseX = untyped (e.pageX);
		var mouseY = untyped (e.pageY);
		return new Vec2(mouseX / canvas.clientWidth, mouseY / canvas.clientHeight);	
	}
}
