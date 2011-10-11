package kumite.textureregistry;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var textureRegistry : GLTextureRegistry;

	public function new()
	{
		textureRegistry = new GLTextureRegistry();
	}
}
