package kumite.testscene;

import kumite.scene.SceneLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;
import kumite.displaylist.DisplayListLayer;

import haxe.rtti.Infos;

class TestScene1 implements SceneLifecycle, implements Infos
{
	@Inject
	public var displayList : DisplayListLayer;
	
	@Inject
	public var testBackgroundLayer : TestBackgroundLayer;
	
	public function new() {}
	
	public function sceneInit(scene : Scene)
	{
		scene.id = scene.name = "EMPTY";
		scene.addLayer(new DelegateLayer(testBackgroundLayer));
		scene.addLayer(new DelegateLayer(displayList));
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
