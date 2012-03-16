package kumite.scene;

import hsl.haxe.DirectSignaler;
import hsl.haxe.Signaler;

import kumite.time.Time;
import kumite.layer.ClearLayer;
import kumite.scene.LayerLifecycle;
import kumite.scene.SceneLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;
import kumite.displaylist.DisplayListLayer;

import haxe.rtti.Infos;

class DefaultScene implements SceneLifecycle, implements Infos
{
	@Inject
	public var displayListLayer : DisplayListLayer;

	public var name : String;
	
	public var enterSignaler(default, null):Signaler<Void>;
	public var exitSignaler(default, null):Signaler<Void>;
	public var transitionOutSignaler(default, null):Signaler<Void>;
	
	var preconfiguredLifecycles : Array<LifecycleAndLayerId>;
	var defaultLayers:Bool;
	
	public function new(?name : String = null)
	{
		this.name = name;
		
		enterSignaler = new DirectSignaler(this);
		exitSignaler = new DirectSignaler(this);
		transitionOutSignaler = new DirectSignaler(this);
		
		preconfiguredLifecycles = new Array();
	}
	
	public function useDefaultLayers()
	{
		defaultLayers = true;
	}
	
	public function addLayerLifecycle(lifecycle : LayerLifecycle, ?layerId : String = null)
	{
		if (lifecycle == null)
			throw "Lifecycle for scene: " + name + " is null!";
			
		var lifecycleAndLayerId = new LifecycleAndLayerId();
		lifecycleAndLayerId.lifecycle = lifecycle;
		lifecycleAndLayerId.layerId = layerId;
		preconfiguredLifecycles.push(lifecycleAndLayerId);
	}
	
	public function sceneInit(scene : Scene)
	{
		scene.name = name;
		
		if (defaultLayers)
		{
			var clearLayer = new ClearLayer();
			clearLayer.color = new Color(0, 0, 0.0, 1);
			scene.addLayer(new DelegateLayer(clearLayer, kumite.layer.LayerId.CLEAR));
		}
		
		addPreconfiguredLifecycles(scene);
		
		if (defaultLayers)
			scene.addLayer(new DelegateLayer(displayListLayer));
	}

	public function initTransition(transitionContext : TransitionContext) : Void
	{
		if (transitionContext.direction == TransitionDirection.OUT)
			transitionOutSignaler.dispatch();
	}

	public function renderTransition(transitionContext : TransitionContext)
	{
	}
	
	public function render()
	{
 	}
	
	@Message
	function sceneEnter(sceneEnter:SceneEnter)
	{
		if (sceneEnter.currentScene.lifecycle == this)
			enterSignaler.dispatch();
	}
	
	@Message
	function sceneExit(sceneExit:SceneExit)
	{
		if (sceneExit.lastScene.lifecycle == this)
			exitSignaler.dispatch();
	}
	
	function addPreconfiguredLifecycles(scene : Scene)
	{
		for(lifecycle in preconfiguredLifecycles)
		{
			scene.addLayer(new DelegateLayer(lifecycle.lifecycle, lifecycle.layerId));
		}
	}
}

private class LifecycleAndLayerId
{
	public var lifecycle : LayerLifecycle;
	public var layerId : String;
	
	public function new()
	{
	}
}