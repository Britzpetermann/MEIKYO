package kumite.spritemesh;

import kumite.scene.SceneLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;
import kumite.displaylist.DisplayListLayer;

import haxe.rtti.Infos;

class SpriteMeshScene implements SceneLifecycle, implements Infos
{
	
	@Inject
	public var spritemeshColorLayer : kumite.layer.ColorLayer;
	
	@Inject
	public var layer : SpriteMeshLayer;
	
	@Inject
	public var displayList : DisplayListLayer;
	
	public function new();
	
	public function sceneInit(scene : Scene)
	{
		scene.id = scene.name = "SPRITE";
		scene.addLayer(new DelegateLayer(spritemeshColorLayer));
		scene.addLayer(new DelegateLayer(layer));
		scene.addLayer(new DelegateLayer(displayList));
	}

	public function initTransition(transitionContext : TransitionContext) : Void
	{
		spritemeshColorLayer.transitions.enableChild("alpha");
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