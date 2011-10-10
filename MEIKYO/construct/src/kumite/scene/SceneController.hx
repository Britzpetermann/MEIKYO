package kumite.scene;

import kumite.time.Time;
import kumite.time.Tick;

import haxe.rtti.Infos;

class SceneController implements Infos
{
	@Inject
	public var scenes : Scenes;
	
	@Inject
	public var time : Time;
	
	public var transitionContext : TransitionContext;
	
	public var initState : InitState;
	public var idleState : IdleState;
	public var transitionState : TransitionState;
	
	private var state : State;
	
	private var currentScene : SceneAndLifecycle;
	private var lastScene : SceneAndLifecycle;
	
	public function new() {}
	
	@Complete
	public function init()
	{
		currentScene = new SceneAndLifecycle();
		currentScene.scene = new Scene();
		currentScene.lifecycle = new NullSceneLifecycle();
		
		transitionContext = new TransitionContext();
		
		initState = new InitState(this);
		idleState = new IdleState(this);
		transitionState = new TransitionState(this);
		
		setState(initState);
	}
	
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
		
		var transitionContextOut = transitionContext.toOutTransition();
		
		lastScene.lifecycle.renderTransition(transitionContextOut);
		currentScene.lifecycle.renderTransition(transitionContext);
		
		for (layer in mixedScene.layers)
		{
			switch(layer.state)
			{
				case LayerState.IN:
					layer.renderTransition(transitionContext);
				case LayerState.OUT:
					layer.renderTransition(transitionContextOut);
				case LayerState.KEEP:
					layer.render();
			}
		}
	}
	
	public function renderNormal()
	{
		currentScene.lifecycle.render();
		for (layer in currentScene.scene.layers)
		{
			layer.render();
		}
	}
	
	function enterScene(newScene)
	{
		if (state.allowesScreenChange && newScene != currentScene)
		{
			lastScene = currentScene;
			currentScene = newScene;
			setState(transitionState);
		}
	}

	public function setState(state : State)
	{
		this.state = state;
		state.enter();
	}
}

class State
{
	public var allowesScreenChange : Bool;
	
	var sceneController : SceneController;
	var time : Time;
	
	public function new(sceneController : SceneController)
	{
		this.sceneController = sceneController;
		this.time = sceneController.time;
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
		allowesScreenChange = false;
	}
}

class InitState extends State
{
	override function configure()
	{
		allowesScreenChange = true;
	}
}

class IdleState extends State
{
	override function configure()
	{
		allowesScreenChange = true;
	}
	
	override function render()
	{
		sceneController.renderNormal();
	}	
}

class TransitionState extends State
{
	var enterTime : Float;
	var exitTime : Float;
	
	override function enter()
	{
		enterTime = time.ms;
		exitTime = time.ms + 500;
	}
		
	override function render()
	{
		sceneController.transitionContext.transition = Map.linear(time.ms, enterTime, exitTime, 0, 1);
		if (sceneController.transitionContext.transition >= 1)
		{
			sceneController.transitionContext.transition = 1;
			sceneController.setState(sceneController.idleState);
		}
			
		sceneController.renderTransition();
	}
}

class NullSceneLifecycle implements SceneLifecycle
{
	public function new() {}
	
	public function sceneInit(scene : Scene) : Void {}
	
	public function render() : Void {}
	
	public function renderTransition(transitionContext : TransitionContext) : Void {}	
}