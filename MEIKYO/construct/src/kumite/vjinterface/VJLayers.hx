package kumite.vjinterface;

import kumite.time.Tick;
import kumite.scene.Scene;
import kumite.scene.Scenes;
import kumite.scene.SceneEnter;
import kumite.scene.DelegateLayer;
import kumite.camera.Camera;

import bpmjs.Messenger;
import reflect.ClassInfo;
import reflect.Binding;

import haxe.rtti.Infos;
import kumite.scene.SceneChangeRequest;

import haxe.Timer;

class VJLayers implements Infos
{
	static var WIDTH : Float = 300;
	
	var bindings:Array<Binding>;

	var layersContainer : GLDisplayObjectContainer;
	var layerContainer : GLDisplayObjectContainer;

	var stage : GLStage;
	
	var currentLayer : DelegateLayer;

	public function new() {}

	@Sequence("boot", "startPrepare")
	public function start()
	{
		stage = GLDisplayList.getDefault().stage;

		layersContainer = new GLDisplayObjectContainer();
		layersContainer.y = 10;
		stage.addChild(layersContainer);

		layerContainer = new GLDisplayObjectContainer();
		stage.addChild(layerContainer);
	}

	@Message
	public function render(tick : Tick)
	{
		layersContainer.x = stage.stageWidth - WIDTH - 10;
		layerContainer.x = stage.stageWidth - WIDTH - 10;
		
		if (currentLayer != null)
		{
			updateBindings();
		}
	}

	@Message
	public function handleSceneEnter(event : SceneEnter)
	{
		removeInspectionPanel();
		layersContainer.removeAllChildren();

		var scene = event.currentScene;
		var currentY = 0;
		for(layer in scene.scene.layers)
		{
			if (Std.is(layer, DelegateLayer))
			{
				var delegateLayer = cast(layer, DelegateLayer);
				var layerLabel = new GLLabel();
				layerLabel.mouseEnabled = true;
				layerLabel.x = 0;
				layerLabel.y = currentY;
				layerLabel.text = ClassInfo.forInstance(delegateLayer.lifecycle).shortName;
				layerLabel.width = WIDTH;
				layerLabel.height = 20;
				layersContainer.addChild(layerLabel);
				currentY += 20;

				registerLifecycleButton(layerLabel, delegateLayer);
				if (delegateLayer.params.length > 0)
				{
					layerLabel.text = ">>> " + layerLabel.text + " <<<";
				}
			}
		}

		layerContainer.y = currentY + layersContainer.y + 10;
	}

	function registerLifecycleButton(button : GLInteractiveObject, layer : DelegateLayer)
	{
		button.mouseDownSignaler.bind(createLayerMouseDownHandler(layer));
	}

	function createLayerMouseDownHandler(layer)
	{
		var inst = this;
		return function(button : GLInteractiveObject)
		{
			inst.inspectLifecycle(layer);
		}
	}

	function inspectLifecycle(layer)
	{
		currentLayer = layer;
		removeInspectionPanel();
		createInspectionPanel(layer);
	}

	function removeInspectionPanel()
	{
		layerContainer.removeAllChildren();
	}

	function createInspectionPanel(layer : DelegateLayer)
	{
		bindings = new Array();
		
		var currentY = 0;
		for (param in layer.params)
		{
			if (param.property.type == ClassInfo.forClass(Float))
			{
				var paramLabel = new GLLabel();
				paramLabel.x = 0;
				paramLabel.y = currentY;
				paramLabel.text = param.name;
				paramLabel.width = 100;
				paramLabel.height = 20;
				layerContainer.addChild(paramLabel);

				var sliderH = new GLSliderH();
				sliderH.min = -1;
				sliderH.max = 1;
				sliderH.value = param.getBinding().getValue();
				sliderH.x = 103;
				sliderH.y = currentY;
				sliderH.width = WIDTH - sliderH.x;
				sliderH.bind(param.getBinding());
				layerContainer.addChild(sliderH);

				currentY += 25;
			}

			if (param.property.type == ClassInfo.forClass(Color))
			{
				var paramLabel = new GLLabel();
				paramLabel.x = 0;
				paramLabel.y = currentY;
				paramLabel.text = param.name;
				paramLabel.width = 100;
				paramLabel.height = 20;
				layerContainer.addChild(paramLabel);

				var colorClass = ClassInfo.forClass(Color);
				var color = param.property.getValue(param.object);
				var rBinding = new Binding(color, colorClass.getProperty("r"));
				var gBinding = new Binding(color, colorClass.getProperty("g"));
				var bBinding = new Binding(color, colorClass.getProperty("b"));
				var aBinding = new Binding(color, colorClass.getProperty("a"));
				bindings.push(rBinding);

				var sliderH = new GLSliderH();
				sliderH.min = 0;
				sliderH.max = 1;
				sliderH.value = Reflect.field(param.property.getValue(param.object), "r");
				sliderH.x = 103;
				sliderH.y = currentY;
				sliderH.width = WIDTH - sliderH.x;
				sliderH.bind(rBinding);
				layerContainer.addChild(sliderH);
				currentY += 25;

				var sliderH = new GLSliderH();
				sliderH.min = 0;
				sliderH.max = 1;
				sliderH.value = Reflect.field(param.property.getValue(param.object), "g");
				sliderH.x = 103;
				sliderH.y = currentY;
				sliderH.width = WIDTH - sliderH.x;
				sliderH.bind(gBinding);
				layerContainer.addChild(sliderH);
				currentY += 25;

				var sliderH = new GLSliderH();
				sliderH.min = 0;
				sliderH.max = 1;
				sliderH.value = Reflect.field(param.property.getValue(param.object), "b");
				sliderH.x = 103;
				sliderH.y = currentY;
				sliderH.width = WIDTH - sliderH.x;
				sliderH.bind(bBinding);
				layerContainer.addChild(sliderH);
				currentY += 25;

				var sliderH = new GLSliderH();
				sliderH.min = 0;
				sliderH.max = 1;
				sliderH.value = Reflect.field(param.property.getValue(param.object), "a");
				sliderH.x = 103;
				sliderH.y = currentY;
				sliderH.width = WIDTH - sliderH.x;
				sliderH.bind(aBinding);
				layerContainer.addChild(sliderH);
				currentY += 25;
			}
		}
	}
	
	function updateBindings()
	{
		for(binding in bindings)
		{
			binding.watch();
		}
	}
}