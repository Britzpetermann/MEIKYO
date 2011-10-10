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
		if (scenes.all.length == 0)
		{
			Log.warn("No scenes were added!");
			return;
		}
		
		Log.info("Init all scenes and layers...");
		for(scene in scenes.all)
		{
			for (layer in scene.scene.layers)
			{
				layer.init();
			}			
		}
		
		currentScene = scenes.all[0];
		
	}
	
	@Message
	public function handleSceneChangeRequest(message : SceneChangeRequest)
	{
		currentScene = scenes.getSceneById(message.sceneId);
	}
	
	@Message
	public function render(tick : Tick)
	{
		if (currentScene == null)
			return;
		
		currentScene.lifecycle.render();
		for (layer in currentScene.scene.layers)
		{
			layer.render();
		}
	}	
}

