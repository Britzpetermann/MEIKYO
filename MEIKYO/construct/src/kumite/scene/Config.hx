package kumite.scene;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var sceneController : SceneController;
	
	public function new()
	{
		sceneController = new SceneController();
	}
}
