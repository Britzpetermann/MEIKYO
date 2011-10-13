class GLTextureConfig
{
	public static function create(path : String, ?filter : Int = GL.NEAREST)
	{
		var result = new GLTextureConfig();
		result.path = path;
		result.textureId = path;
		result.filter = filter;
		return result;
	}
	
	public var path : String;
	public var textureId : String;
	public var filter : Int;
	
	public function new();
}
