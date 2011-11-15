package kumite.scene;

import kumite.stage.Stage;

import kumite.time.Time;
import kumite.time.Tick;

import bpmjs.Messenger;

import haxe.rtti.Infos;

class SceneNavigator implements Infos
{
	@Messenger
	public var messenger : Messenger;
	
	@Inject
	public var scenes : Scenes;
	
	@Inject
	public var time : Time;
	
	@Inject
	public var stage : Stage;
	
	public var transitionContext : TransitionContext;
	public var renderContext : RenderContext;
	
	public var initState : InitState;
	public var idleState : IdleState;
	public var transitionState : TransitionState;
	
	public var currentScene : SceneAndLifecycle;
	public var lastScene : SceneAndLifecycle;
	
	private var state : State;
	
	public function new();
	
	@Complete
	public function init()
	{
		currentScene = new SceneAndLifecycle();
		currentScene.scene = new Scene();
		currentScene.scene.id = "";
		currentScene.scene.name = "";
		currentScene.lifecycle = new NullSceneLifecycle();
		
		transitionContext = new TransitionContext();
		renderContext = new RenderContext();
		
		initState = new InitState(this);
		idleState = new IdleState(this);
		transitionState = new TransitionState(this);
		
		setState(initState);
	}
	
	@Observe
	public function handleSceneLifecycleAdded(lifecycle : SceneLifecycle)
	{
		var scene = new Scene();
		
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
		
		initAllLayers();
		
		enterScene(scenes.getFirstScene());
	}
	
	@Message
	public function handleSceneChangeRequest(message : SceneChangeRequest)
	{
		enterScene(scenes.getSceneById(message.sceneId));
	}
	
	@Message
	public function render(tick : Tick)
	{
		state.render();		
	}
	
	public function renderTransition()
	{
		var mixer = new SceneMixer();
		var mixedScene = mixer.mix(lastScene.scene, currentScene.scene);
		
		transitionContext.resetViewport(stage.width, stage.height);
				
		lastScene.lifecycle.renderTransition(transitionContext.toIn());
		currentScene.lifecycle.renderTransition(transitionContext.toOut());
		
		for (layer in mixedScene.layers)
		{
			transitionContext.layerState = layer.state; 
			switch(layer.state)
			{
				case LayerState.IN:
					layer.renderTransition(transitionContext.toIn());
				case LayerState.OUT:
					layer.renderTransition(transitionContext.toOut());
				case LayerState.KEEP:
					layer.render(transitionContext);
			}
		}
	}
	
	public function initTransition()
	{
		lastScene.lifecycle.initTransition(transitionContext.toOut());
		currentScene.lifecycle.initTransition(transitionContext.toIn());
	}
	
	public function renderNormal()
	{
		renderContext.resetViewport(stage.width, stage.height);
		
		currentScene.lifecycle.render();
		for (layer in currentScene.scene.layers)
		{
			layer.render(renderContext);
		}
	}
	
	function enterScene(newScene)
	{
		if (state.allowsScreenChange && newScene != currentScene)
		{
			lastScene = currentScene;
			currentScene = newScene;
			messenger.send(new SceneEnter(lastScene, currentScene));
			setState(transitionState);
		}
	}

	public function setState(state : State)
	{
		this.state = state;
		state.enter();
	}
	
	function initAllLayers()
	{
		Log.info("Init all scenes and layers...");
		
		var layerIdToLifecycle : Hash<LayerLifecycle> = new Hash();
		
		var autoLayerIndex = 0;
		var autoSceneIndex = 0;
		for(scene in scenes.all)
		{
			if (scene.scene.id == null)
			{
				scene.scene.id = "AUTO_" + autoSceneIndex;
				autoSceneIndex++;
			}
			
			scene.lifecycle.sceneInit(scene.scene);

			if (scene.scene.name == null)
			{
				scene.scene.name = scene.scene.id;
			}
			
			for (layer in scene.scene.layers)
			{
				Log.info("Init layer:", layer.layerId);
				if (layer.layerId == null)
				{
					if (Std.is(layer, DelegateLayer))
					{
						var lifecycle = cast(layer, DelegateLayer).lifecycle;
						for(key in layerIdToLifecycle.keys())
						{
							if (layerIdToLifecycle.get(key) == lifecycle)
							{
								layer.layerId = key;
								Log.info("Reuse DelegateLayer:", layer.layerId);
								break;
							}
						}
					}
					
					if (layer.layerId == null)
					{
						layer.layerId = "layer_" + autoLayerIndex + ": " + layer;
						Log.info("auto add layer:", layer.layerId);
						autoLayerIndex++;
					}
				}
				
				if (Std.is(layer, DelegateLayer))
				{
					layerIdToLifecycle.set(layer.layerId, cast(layer, DelegateLayer).lifecycle);
				}
				
				layer.init();
			}			
		}
	}
}

class State
{
	public var allowsScreenChange : Bool;
	
	var transitionContext : TransitionContext;
	var navigator : SceneNavigator;
	var time : Time;
	
	public function new(navigator : SceneNavigator)
	{
		this.navigator = navigator;
		this.time = navigator.time;
		this.transitionContext = navigator.transitionContext;
		configure();
	}
	
	public function enter()
	{
		
	}
	
	public function render()
	{
		
	}
	
	function configure()
	{
		allowsScreenChange = false;
	}
}

class InitState extends State
{
	override function configure()
	{
		allowsScreenChange = true;
	}
}

class IdleState extends State
{
	override function configure()
	{
		allowsScreenChange = true;
	}
	
	override function render()
	{
		navigator.renderNormal();
	}	
}

class TransitionState extends State
{
	var enterTime : Float;
	var exitTime : Float;
	
	override function enter()
	{
		enterTime = time.ms;
		exitTime = time.ms + 10;
		
		transitionContext.transition = 0;
		transitionContext.outScene = navigator.lastScene;
		transitionContext.inScene = navigator.currentScene;
		navigator.initTransition();		
	}
		
	override function render()
	{
		transitionContext.transition = Map.linear(time.ms, enterTime, exitTime, 0, 1);
		if (transitionContext.transition >= 1)
		{
			transitionContext.transition = 1;
			navigator.setState(navigator.idleState);
		}
			
		navigator.renderTransition();
	}
}

class NullSceneLifecycle implements SceneLifecycle
{
	public function new();
	
	public function sceneInit(scene : Scene) : Void {}
	
	public function initTransition(transitionContext : TransitionContext) : Void {}
	
	public function renderTransition(transitionContext : TransitionContext) : Void {}
		
	public function render() : Void {}
	
}