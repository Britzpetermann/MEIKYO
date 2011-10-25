package kumite.testscene;

import kumite.scene.SceneLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;
import kumite.displaylist.DisplayListLayer;

import haxe.rtti.Infos;

class TestScene1 implements SceneLifecycle, implements Infos
{
	public static var SCENE_ID : String = "EMPTY";
	
	@Inject
	public var testClearLayer : kumite.layer.ClearLayer;
	
	@Inject
	public var displayList : DisplayListLayer;
	
	@Inject
	public var colorLayer1 : kumite.layer.ColorLayer;
	
	public function new();
	
	public function sceneInit(scene : Scene)
	{
		scene.id = scene.name = SCENE_ID;
		scene.addLayer(new DelegateLayer(testClearLayer, kumite.layer.LayerId.CLEAR));
		scene.addLayer(new DelegateLayer(colorLayer1));
		scene.addLayer(new DelegateLayer(displayList));
	}
	
	public function initTransition(transitionContext : TransitionContext) : Void
	{
		colorLayer1.moveTransition.ease = ease.Back.easeInOut;
		colorLayer1.moveTransition.direction = -1;
		colorLayer1.transitions.enableChild("move");
		
		switch (transitionContext.direction)
		{
			case TransitionDirection.IN:
			case TransitionDirection.OUT:
				switch(transitionContext.inScene.scene.id)
				{
					case TestScene1.SCENE_ID, TestScene2.SCENE_ID:
					default:
						colorLayer1.transitions.enableChild("cut");
				}
		}
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
	}
	
	public function render()
	{
	}
}
