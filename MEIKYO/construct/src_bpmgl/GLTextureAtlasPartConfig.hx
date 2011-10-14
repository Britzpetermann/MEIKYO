class GLTextureAtlasPartConfig
{
	public static function create(atlas : GLTextureAtlasConfig, location : String)
	{
		var result = new GLTextureAtlasPartConfig();
		result.location = location;
		result.atlas = atlas;
		atlas.add(result);
		return result;
	}
		
	public var location : String;
	public var atlas : GLTextureAtlasConfig;
	
	public var width : Int;
	public var height : Int;
	
	public var u0 : Float;
	public var v0 : Float;
	public var u1 : Float;
	public var v1 : Float;
	
	public function new();
	
	public function toString()
	{
		return "[GLTextureAtlasPartConfig: " + location + " uv:" + u0 + ", " + v0 + ", " + u1 + ", " + v1 + ", size: " + width + ", " + height + " ]";
	}	
	
}
