package kumite.scene;

import kumite.scene.LayerLifecycle;
import kumite.time.Time;
import kumite.scene.SceneLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;
import kumite.displaylist.DisplayListLayer;

import haxe.rtti.Infos;

class DefaultScene implements SceneLifecycle, implements Infos
{
	public var name : String;
	
	var preconfiguredLifecycles : Array<LifecycleAndLayerId>;
	
	public function new(?name : String = null)
	{
		this.name = name;
		preconfiguredLifecycles = new Array();
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
		addPreconfiguredLifecycles(scene);
	}

	public function initTransition(transitionContext : TransitionContext) : Void
	{
	}

	public function renderTransition(transitionContext : TransitionContext)
	{
	}
	
	public function render()
	{
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
	
	public function new();	
}