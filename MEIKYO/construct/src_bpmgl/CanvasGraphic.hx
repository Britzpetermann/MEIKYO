import js.Lib;

class CanvasGraphic
{
	public var width(default, setWidth) : Float;
	public var height(default, setHeight) : Float;
	
	public var fillStyle(default, setFillStyle) : Dynamic;
	public var font(default, setFont) : String;
	
	public var isInvalid : Bool;
	
	public var canvas : Canvas;
	public var context : CanvasRenderingContext2D;
	
	public function new()
	{
		canvas = cast Lib.document.createElement("canvas");
		context = canvas.getContext("2d");
		
		width = 0;
		height = 0;
	}
	
	public function clear(?color : Color)
	{
		canvas.width = Math2.nextPowerOf2(width);
		canvas.height = Math2.nextPowerOf2(height);
		
		context.fillStyle = "rgba(0, 0, 255, 0)";
		context.fillRect (0, 0, canvas.width, canvas.width);

		context.fillStyle = color == null ? "rgba(0, 0, 0, 0)" : color.toContextRGBA();
		context.fillRect (0, 0, width, height);

		isInvalid = true;
	}
	
	public function fillRect(x : Float, y : Float, width : Float, height : Float)
	{
		context.fillRect(x, y, width, height);
		isInvalid = true;
	}
	
	public function fillText(text : String, x : Float, y : Float, ?maxWidth : Float)
	{
		if (text == null)
			text = "null";
		context.fillText(text, x, y);
		isInvalid = true;
	}
	
	public function drawImage(image : Image, dx, dy, dw, dh)
	{
		context.drawImage(image, dx, dy, dw, dh);
	}

	public function drawImage2(image : Image, dx, dy)
	{
		context.drawImage(image, dx, dy);
	}

	function setFont(value : String)
	{
		context.font = value;
		return value;
	}

	function setFillStyle(value : Dynamic)
	{
		if (Std.is(value, Color))
			context.fillStyle = cast(value, Color).toContextRGBA();
		return value;
	}
	
	function setWidth(width)
	{
		if (this.width == width)
			return width;
			
		this.width = width;
		clear();
		return width;
	}
	
	function setHeight(height)
	{
		if (this.height == height)
			return height;
			
		this.height = height;
		clear();
		return height;
	}
}
