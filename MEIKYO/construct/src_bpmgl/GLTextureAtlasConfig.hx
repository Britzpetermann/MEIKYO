class GLTextureAtlasConfig extends GLTextureConfig
{
	private static var instanceCount : Int = 0;
	
	public static function create(width : Int, height : Int, ?filter : Int = GL.NEAREST)
	{
		instanceCount++;
		var path = "atlas_" + instanceCount;
		
		var result = new GLTextureAtlasConfig();
		result.textureId = path;
		result.filter = filter;
		result.width = width;
		result.height = height;
		return result;
	}
	
	public var width : Int;
	public var height : Int;
	public var parts : Array<GLTextureAtlasPartConfig>;
	
	public function new()
	{
		super();
		parts = new Array();
	}
	
	public function add(part : GLTextureAtlasPartConfig)
	{
		parts.push(part);
	}
	
	override function toString()
	{
		return "[Atlas: " + parts.join(",") + " ]";
	}
}
