class GLTextureConfig
{
	public static function create(path : String)
	{
		var result = new GLTextureConfig();
		result.path = path;
		return result;
	}
	
	public var path : String;
	
	public function new();
}
