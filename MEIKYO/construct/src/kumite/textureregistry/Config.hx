package kumite.textureregistry;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var textureRegistry : GLTextureRegistry;
	public var imageRegistry : GLImageRegistry;
	
	public function new()
	{
		textureRegistry = new GLTextureRegistry();
		imageRegistry = new GLImageRegistry();
	}
}
