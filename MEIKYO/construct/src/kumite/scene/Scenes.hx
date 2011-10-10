package kumite.scene;

class Scenes
{
	public var all : Array<SceneAndLifecycle>;
	
	public function new()
	{
		all = new Array();
	}
	
	public function getFirstScene() : SceneAndLifecycle
	{
		return all[0];
	}
	
	public function getSceneById(id : String) : SceneAndLifecycle
	{
		for (result in all)
			if (result.scene.id == id)
				return result;
		throw "Cannot find scene: " + id;
	}
}
