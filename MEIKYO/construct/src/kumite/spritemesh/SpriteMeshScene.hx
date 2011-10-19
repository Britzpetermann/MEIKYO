package kumite.spritemesh;

import kumite.time.Time;
import kumite.scene.SceneLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;
import kumite.displaylist.DisplayListLayer;

import haxe.rtti.Infos;

class SpriteMeshScene implements SceneLifecycle, implements Infos
{
	@Inject
	public var spritemesh2ColorLayer : kumite.layer.ColorLayer;
	
	public var layer : SpriteMeshLayer;
	
	@Inject
	public var displayList : DisplayListLayer;
	
	@Inject
	public var time : Time;
	
	var name : String;
	
	public function new(name : String)
	{
		this.name = name;
	}
	
	public function sceneInit(scene : Scene)
	{
		scene.id = scene.name = "S_" + name;
		scene.addLayer(new DelegateLayer(layer));
		scene.addLayer(new DelegateLayer(displayList));
	}

	public function initTransition(transitionContext : TransitionContext) : Void
	{
		spritemesh2ColorLayer.transitions.enableChild("alpha");
	}

	public function renderTransition(transitionContext : TransitionContext)
	{
		render();
	}
	
	public function render()
	{
		//GL.clearColor(0.18, 0.17, 0.2, 1.0);
		//GL.clearColor(0.1, 0.1, 0.1, 1.0);
		GL.clearColor(0.0, 0.0, 0.0, 1.0);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);		
	}
}