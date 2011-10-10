package kumite.scene;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var scenes : Scenes;
	public var sceneController : SceneController;
	
	public function new()
	{
		scenes = new Scenes();
		sceneController = new SceneController();
	}
}
