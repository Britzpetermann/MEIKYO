class GLTextureConfig
{
	public static function create(path : String)
	{
		var result = new GLTextureConfig();
		result.path = path;
		result.textureId = path;
		return result;
	}
	
	public var path : String;
	public var textureId : String;
	
	public function new();
}
