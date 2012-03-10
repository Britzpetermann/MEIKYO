package kumite.scene;
import haxe.rtti.Infos;

class SceneConfig implements Infos
{
	public var scenes : Scenes;
	public var sceneNavigator : SceneNavigator;
	
	public function new()
	{
		scenes = new Scenes();
		sceneNavigator = new SceneNavigator();
		sceneNavigator.transitionTime = 500;
	}
}
