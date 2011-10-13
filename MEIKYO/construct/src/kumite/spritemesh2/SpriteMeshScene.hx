package kumite.spritemesh2;

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
	
	@Inject
	public var layer : SpriteMeshLayer;
	
	@Inject
	public var displayList : DisplayListLayer;
	
	public function new();
	
	public function sceneInit(scene : Scene)
	{
		scene.id = scene.name = "SPRITE2";
		scene.addLayer(new DelegateLayer(spritemesh2ColorLayer));
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
		GL.clearColor(0, 0, 0, 1);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);		
	}
}