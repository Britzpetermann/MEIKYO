import js.Lib;

import hsl.haxe.DirectSignaler;
import hsl.haxe.Signaler;

class GLDisplayObject
{
	private static var nextId : Int;

	public var id : Int;

	public var stage : GLStage;

	public var skipDraw : Bool;
	public var visible : Bool;

	public var alpha : Float;
	public var x(default, setX) : Float;
	public var y(default, setY) : Float;
	public var width(default, setWidth) : Float;
	public var height(default, setHeight) : Float;
	public var scaleX(default, setScaleX) : Float;
	public var scaleY(default, setScaleY) : Float;

	public var transformIsInvalid : Bool;
	public var graphicIsInvalid(getGraphicIsInvalid, setGraphicIsInvalid) : Bool;

	public var matrix : Matrix4;

	public var enterFrameSignaler : Signaler<GLFrame>;
	
	public var graphic : CanvasGraphic;
	
	public var parent: GLDisplayObjectContainer;

	public function new()
	{
		if (nextId == null)
			nextId = 0;
		id = nextId;
		nextId++;

		GLDisplayList.getDefault().initDisplayObject(this);

		skipDraw = false;
		visible = true;

		alpha = 1;

		matrix = new Matrix4();
		
		graphic = new CanvasGraphic();

		x = 0;
		y = 0;
		width = 256;
		height = 128;
		scaleX = 1;
		scaleY = 1;
		transformIsInvalid = true;
		
		graphic.width = width;
		graphic.height = height;
	}

	public function validateTransform()
	{
		if (transformIsInvalid)
		{
			graphic.width = width;
			graphic.height = height;
			
			transformIsInvalid = false;
			matrix.setIdentity();
			matrix.appendTranslation(x, y, 0);
			matrix.appendScale(scaleX, scaleY, 1);
		}
	}
	
	public function validateGraphics()
	{
		graphicIsInvalid = false;
	}

	public function toString()
	{
		return "DisplayObject: " + id;
	}

	function setX(?value : Float)
	{
		if (x != value)
		{
			x = value;
			transformIsInvalid = true;
		}
		return value;
	}

	function setY(?value : Float)
	{
		if (y != value)
		{
			y = value;
			transformIsInvalid = true;
		}
		return value;
	}

	function setScaleX(?value : Float)
	{
		if (scaleX != value)
		{
			scaleX = value;
			transformIsInvalid = true;
		}
		return value;
	}

	function setScaleY(?value : Float)
	{
		if (scaleY != value)
		{
			scaleY = value;
			transformIsInvalid = true;
		}
		return value;
	}

	function setWidth(?value)
	{
		if (width != value)
		{
			width = value;
			graphic.width = width;
			transformIsInvalid = true;
		}
		return value;
	}

	function setHeight(?value)
	{
		if (height != value)
		{
			height = value;
			graphic.height = height;
			transformIsInvalid = true;
		}
		return value;
	}
	
	function getGraphicIsInvalid() : Bool
	{
		return graphic.isInvalid;
	}

	function setGraphicIsInvalid(value : Bool)
	{
		graphic.isInvalid = value;
		return value;
	}
}
