package kumite.vjinterface;

import kumite.time.Tick;
import kumite.scene.Scenes;

import haxe.rtti.Infos;

class VJInterface implements Infos
{
	@Inject
	public var scenes : Scenes;
	
	var stage : GLStage;
	var cutButton : GLLabel;
	var shortButton : GLLabel;
	var longButton : GLLabel;
	
	var sceneContainer : GLDisplayObjectContainer;
	
	public function new() {}
	
	@Sequence("boot", "start")	
	public function start()
	{
		stage = GLDisplayList.getDefault().stage;
		//stage.addChild(new GLStats());

		addTransitionButtons();
		addSceneButtons();
	}
	
	@Message
	public function render(tick : Tick)
	{
		cutButton.y = stage.stageHeight - 90;
		shortButton.y = stage.stageHeight - 60;
		longButton.y = stage.stageHeight - 30;
		
		sceneContainer.y = stage.stageHeight - 30;
	}
	
	function addTransitionButtons()
	{
		cutButton = new GLLabel();
		cutButton.x = 10;
		cutButton.text = "CUT";
		cutButton.width = 80;
		cutButton.height = 20;
		stage.addChild(cutButton);
		
		shortButton = new GLLabel();
		shortButton.x = 10;
		shortButton.text = "SHORT";
		shortButton.width = 80;
		shortButton.height = 20;
		stage.addChild(shortButton);
		
		longButton = new GLLabel();
		longButton.x = 10;
		longButton.text = "LONG";
		longButton.width = 80;
		longButton.height = 20;
		stage.addChild(longButton);		
	}
	
	function addSceneButtons()
	{
		sceneContainer = new GLDisplayObjectContainer();
		sceneContainer.x = 100;
		stage.addChild(sceneContainer);
		
		var currentX = 10;
		for (sceneAndLifecycle in scenes.all)
		{
			var sceneButton = new GLLabel();
			sceneButton.x = currentX;
			sceneButton.text = sceneAndLifecycle.scene.name;
			sceneButton.width = 80;
			sceneButton.height = 20;
			sceneContainer.addChild(sceneButton);
			
			currentX += sceneButton.width + 10;
		}
	}
}