package kumite.testscene;

import kumite.scene.SceneLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;
import kumite.displaylist.DisplayListLayer;

import haxe.rtti.Infos;

class TestScene2 implements SceneLifecycle, implements Infos
{
	public static var SCENE_ID : String = "RED-GREEN";
	
	@Inject
	public var testClearLayer : kumite.layer.ClearLayer;
	
	@Inject
	public var testLayer1 : kumite.layer.TestLayer;
	
	@Inject
	public var testLayer2 : kumite.layer.TestLayer;
	
	@Inject
	public var colorLayer2 : kumite.layer.ColorLayer;
	
	@Inject
	public var displayListLayer : DisplayListLayer;
	
	public function new();
	
	public function sceneInit(scene : Scene)
	{
		scene.id = scene.name = SCENE_ID;
		scene.addLayer(new DelegateLayer(testClearLayer, kumite.layer.LayerId.CLEAR));
		scene.addLayer(new DelegateLayer(colorLayer2));
		scene.addLayer(new DelegateLayer(testLayer1));
		scene.addLayer(new DelegateLayer(testLayer2));
		scene.addLayer(new DelegateLayer(displayListLayer));
	}

	public function initTransition(transitionContext : TransitionContext) : Void
	{
		colorLayer2.moveTransition.ease = ease.Back.easeInOut;
		colorLayer2.moveTransition.direction = 1;
		colorLayer2.transitions.enableChild("move");
		
		switch (transitionContext.direction)
		{
			case TransitionDirection.IN:
				switch(transitionContext.outScene.scene.id)
				{
					case TestScene1.SCENE_ID, TestScene2.SCENE_ID:
					default:
						colorLayer2.moveTransition.direction = -1;
				}
			case TransitionDirection.OUT:
				switch(transitionContext.inScene.scene.id)
				{
					case TestScene1.SCENE_ID, TestScene2.SCENE_ID:
					default:
						colorLayer2.transitions.enableChild("cut");
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
