package kumite.vjinterface;

import kumite.time.Tick;
import kumite.scene.Scene;
import kumite.scene.Scenes;
import kumite.scene.SceneEnter;
import kumite.scene.DelegateLayer;

import bpmjs.Messenger;

import haxe.rtti.Infos;
import kumite.scene.SceneChangeRequest;

import haxe.Timer;

class VJLayers implements Infos
{
	static var WIDTH : Int = 500;
	
	var layersContainer : GLDisplayObjectContainer;
	
	var stage : GLStage;
	
	var currentY : Int;
	
	public function new();
	
	@Sequence("boot", "startPrepare")	
	public function start()
	{
		stage = GLDisplayList.getDefault().stage;

		layersContainer = new GLDisplayObjectContainer();
		layersContainer.y = 10;
		stage.addChild(layersContainer);
	}
	
	@Message
	public function render(tick : Tick)
	{
		layersContainer.x = stage.stageWidth - WIDTH - 10;
	}
	
	@Message
	public function handleSceneEnter(event : SceneEnter)
	{
		layersContainer.removeAllChildren();
		
		var scene = event.currentScene;
		var sceneLabel = new GLLabel();
		sceneLabel.x = 0;
		sceneLabel.y = 0;
		sceneLabel.text = "SCENE: " + scene.scene.name;
		sceneLabel.width = WIDTH;
		sceneLabel.height = 20;
		layersContainer.addChild(sceneLabel);
		
		currentY = sceneLabel.height;
		for(layer in scene.scene.layers)
		{
			var layerLabel = new GLLabel();
			layerLabel.x = 0;
			layerLabel.y = currentY;
			
			layerLabel.text = layer.layerId;
			layerLabel.width = WIDTH;
			layerLabel.height = 20;
			layersContainer.addChild(layerLabel);
			currentY += 20;
			
			if (Std.is(layer, DelegateLayer))
			{
				addParams(cast layer);
			}
		}
	}
	
	function addParams(layer : DelegateLayer)
	{
		for (param in layer.params)
		{
			var paramLabel = new GLLabel();
			paramLabel.x = 0;
			paramLabel.y = currentY;
			paramLabel.text = "param " + param.name + " : " + param.property.type.name + " = " + param.property.getValue(param.object);
			paramLabel.width = WIDTH;
			paramLabel.height = 20;
			layersContainer.addChild(paramLabel);
			
			currentY += 20;			
		}
	}
}