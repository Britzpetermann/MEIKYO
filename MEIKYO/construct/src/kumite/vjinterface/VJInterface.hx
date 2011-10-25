package kumite.vjinterface;

import kumite.time.Tick;
import kumite.scene.Scene;
import kumite.scene.Scenes;

import bpmjs.Messenger;

import haxe.rtti.Infos;
import kumite.scene.SceneChangeRequest;

import haxe.Timer;

class VJInterface implements Infos
{
	@Inject
	public var scenes : Scenes;
	
	@Messenger
	public var messenger : Messenger;
	
	var timer : Timer;
	
	var stage : GLStage;
	
	var sceneContainer : GLDisplayObjectContainer;
	
	public function new();
	
	@Sequence("boot", "startComplete")	
	public function start()
	{
		stage = GLDisplayList.getDefault().stage;
		stage.addChild(new GLStats());
		
		timer = new Timer(12000);
		//timer.run = navigateNext;

		addSceneButtons();
	}
	
	@Message
	public function render(tick : Tick)
	{
		sceneContainer.y = stage.stageHeight - 30 * 3;
	}
	
	function addSceneButtons()
	{
		sceneContainer = new GLDisplayObjectContainer();
		sceneContainer.x = 10;
		stage.addChild(sceneContainer);
		
		var currentX = 0;
		var currentY = 0;
		for (sceneAndLifecycle in scenes.all)
		{
			var sceneButton = new GLLabel();
			sceneButton.x = currentX;
			sceneButton.y = currentY;
			sceneButton.text = sceneAndLifecycle.scene.name;
			sceneButton.width = 100;
			sceneButton.height = 20;
			sceneButton.mouseDownSignaler.bind(createSceneRequest(sceneAndLifecycle.scene));
			sceneContainer.addChild(sceneButton);
			
			currentX += sceneButton.width + 10;
			if (currentX > 600)
			{
				currentX = 0;
				currentY += sceneButton.height + 10;
			}
		}
	}
	
	function createSceneRequest(scene : Scene)
	{
		var inst = this;
		return function(button : GLInteractiveObject)
		{
			inst.handleButtonClick(scene);
		}
	}
	
	function handleButtonClick(scene : Scene)
	{
		messenger.send(new SceneChangeRequest(scene.id));
	}
	
	function navigateNext()
	{
		Log.info();
		var newSceneId = scenes.getRandomScene().scene.id;
		messenger.send(new SceneChangeRequest(newSceneId));
	}
}