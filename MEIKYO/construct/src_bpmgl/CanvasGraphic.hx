import js.Lib;

import bpmjs.ImageLoaderTask;

class CanvasGraphic
{
	public var width(default, setWidth) : Float;
	public var height(default, setHeight) : Float;
	
	public var aspect(getAspect, null) : Float;
	
	public var fillStyle(default, setFillStyle) : Dynamic;
	public var font(default, setFont) : String;
	
	public var isInvalid : Bool;
	
	public var canvas : Canvas;
	public var context : CanvasRenderingContext2D;
	
	public var usePow2Size:Bool;
	
	public function new()
	{
		canvas = cast Lib.document.createElement("canvas");
		context = canvas.getContext("2d");
		usePow2Size = true;
		width = 0;
		height = 0;
	}
	
	public function clear(?color : Color)
	{
		if (usePow2Size)
		{
			canvas.width = Math2.nextPowerOf2(width);
			canvas.height = Math2.nextPowerOf2(height);
		}
		else
		{
			canvas.width = Std.int(width);
			canvas.height = Std.int(height);
		}
		
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
	
	public function drawImage3(image : Image)
	{
		var imageAspect = image.width / image.height;
		
		var ix:Float;
		var iy:Float;
		var iw:Float;
		var ih:Float;
		
		if (aspect > imageAspect)
		{
			iw = width;
			ih = width / imageAspect;
			ix = 0;
			iy = -(ih - height) / 2;
			context.drawImage(image, ix, iy, iw, ih);
		}
		else
		{
			iw = height * imageAspect;
			ih = height;
			ix = -(iw - width) / 2;
			iy = 0;
			context.drawImage(image, ix, iy, iw, ih);
		}
		
		return {scale:iw / image.width, x:ix, y:iy};
	}
	
	function getAspect():Float
	{
		return width/height;
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
