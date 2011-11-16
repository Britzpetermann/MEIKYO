class GLTextureConfig
{
	public static function CROP(width : Int, height : Int) : TextureManipulation
	{
		return new CropManipulation(width, height);
	}
	
	public static function create(location : String, ?filter : Int = GL.NEAREST, ?textureManipulation : TextureManipulation)
	{
		var result = new GLTextureConfig();
		result.location = location;
		result.textureId = location;
		result.filter = filter;
		result.textureManipulation = textureManipulation;
		return result;
	}
		
	public static var FRAMEBUFFER_ID : Int = 0;
	
	public static function createForFrameBuffer()
	{
		var result = new GLTextureConfig();
		result.location = "";
		result.textureId = "FRAMEBUFFER_" + FRAMEBUFFER_ID;
		result.filter = 0;
		
		FRAMEBUFFER_ID++;
		return result;
	}
		
	public var location : String;
	public var textureId : String;
	public var filter : Int;
	public var textureManipulation : TextureManipulation;
	
	public function new();
	
	public function toString()
	{
		return "[GLTextureConfig: " + location + " ]";
	}	
}

private class TextureManipulation
{
	public function create(image : Image) : Canvas
	{
		return null;	
	}
}

private class CropManipulation extends TextureManipulation
{
	var width : Int;
	var height : Int;
	
	public function new(width : Int, height : Int)
	{
		this.width = width;
		this.height = height;
	}
	
	override function create(image)
	{
		var canvasGraphic = new CanvasGraphic();
		canvasGraphic.width = width;
		canvasGraphic.height = height;
		canvasGraphic.drawImage2(image, 0, 0);
		
		return canvasGraphic.canvas;
	}
}