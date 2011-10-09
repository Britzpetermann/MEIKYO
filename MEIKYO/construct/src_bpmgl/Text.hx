import js.Lib;

class Text
{
	private static var context : CanvasRenderingContext2D;
	
	public var text : String;
	public var font : String;
	
	public var width(getWidth, null) : Float;
	
	private static function init()
	{
		if (context == null)
		{
			var canvas = cast Lib.document.createElement("canvas");
			context = canvas.getContext("2d");
		}
	}
	
	public function new()
	{
		init();
	}
	
	function getWidth() : Float
	{
		context.font = font;
		return context.measureText(text).width;
	}
}
