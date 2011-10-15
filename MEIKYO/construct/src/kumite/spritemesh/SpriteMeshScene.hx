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
	public var paperBackground : kumite.layer.TextureLayer;
	
	@Inject
	public var spritemesh2ColorLayer : kumite.layer.ColorLayer;
	
	@Inject
	public var layer : SpriteMeshLayer;
	
	@Inject
	public var displayList : DisplayListLayer;
	
	public function new();
	
	public function sceneInit(scene : Scene)
	{
		scene.id = scene.name = "SPRITES";
		scene.addLayer(new DelegateLayer(paperBackground));
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
		GL.clearColor(1, 1, 1, 0);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT | GL.STENCIL_BUFFER_BIT);		
	}
}