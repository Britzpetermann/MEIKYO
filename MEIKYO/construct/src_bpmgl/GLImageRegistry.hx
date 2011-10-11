import js.Lib;

class GLImageRegistry
{
	public var images : Hash<Image>;

	public function new()
	{
		images = new Hash();
	}

	public function register(key : {textureId : String}, image : Image)
	{
		images.set(key.textureId, image);
	}

	public function get(key : {textureId : String})
	{
		return images.get(key.textureId);
	}
}
