class GLTextureConfig
{
	public static function create(location : String, ?filter : Int = GL.NEAREST)
	{
		var result = new GLTextureConfig();
		result.location = location;
		result.textureId = location;
		result.filter = filter;
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
	
	public function new();
	
	public function toString()
	{
		return "[GLTextureConfig: " + location + " ]";
	}	
}
