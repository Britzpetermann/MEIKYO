package kumite.testscene;

import kumite.scene.SceneLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;
import kumite.displaylist.DisplayListLayer;

import haxe.rtti.Infos;

class TestScene3 implements SceneLifecycle, implements Infos
{
	@Inject
	public var testLayer1 : TestLayer1;
	
	@Inject
	public var testLayer3 : TestLayer3;
	
	@Inject
	public var displayList : DisplayListLayer;
	
	public function new() {}
	
	public function sceneInit(scene : Scene)
	{
		scene.id = scene.name = "RED-BLUE";
		scene.addLayer(new DelegateLayer(testLayer1));
		scene.addLayer(new DelegateLayer(testLayer3));
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
