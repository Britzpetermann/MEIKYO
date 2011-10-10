package kumite.scene;

import kumite.time.Tick;

import haxe.rtti.Infos;

class SceneController implements Infos
{
	@Inject
	public var scenes : Scenes;
	
	private var currentScene : SceneAndLifecycle;
	
	public function new() {}
	
	@Observe
	public function handleSceneLifecycleAdded(lifecycle : SceneLifecycle)
	{
		var scene = new Scene();
		lifecycle.sceneInit(scene);
		
		var sceneAndLifecycle = new SceneAndLifecycle();
		sceneAndLifecycle.scene = scene;
		sceneAndLifecycle.lifecycle = lifecycle;
		
		scenes.all.push(sceneAndLifecycle);
	}
	
	@Sequence("boot", "start")	
	public function start()
	{
		currentScene = scenes.all[0];
		for (layer in currentScene.scene.layers)
		{
			layer.init();
		}
	}
	
	@Message
	public function render(tick : Tick)
	{
		for (layer in currentScene.scene.layers)
		{
			layer.render();
		}
	}	
}

