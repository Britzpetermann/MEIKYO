package kumite.scene;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var scenes : Scenes;
	public var sceneNavigator : SceneNavigator;
	
	public function new()
	{
		scenes = new Scenes();
		sceneNavigator = new SceneNavigator();
	}
}
