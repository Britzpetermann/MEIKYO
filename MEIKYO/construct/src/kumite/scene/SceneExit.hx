package kumite.scene;

class SceneExit
{
	public var lastScene : SceneAndLifecycle;
	public var currentScene : SceneAndLifecycle;
	
	public function new(lastScene : SceneAndLifecycle, currentScene : SceneAndLifecycle)
	{
		this.lastScene = lastScene;
		this.currentScene = currentScene;
	}
}
