package kumite.testscene;

import kumite.scene.SceneLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;
import kumite.displaylist.DisplayListLayer;

import haxe.rtti.Infos;

class TestScene3 implements SceneLifecycle, implements Infos
{
	public static var SCENE_ID : String = "RED-BLUE";
	
	@Inject
	public var testClearLayer : kumite.layer.ClearLayer;
	
	@Inject
	public var testLayer1 : kumite.layer.TestLayer;
	
	@Inject
	public var testLayer3 : kumite.layer.TestLayer;
	
	@Inject
	public var textureLayer1 : kumite.layer.TextureLayer;
	
	@Inject
	public var colorLayer3 : kumite.layer.ColorLayer;
	
	@Inject
	public var displayList : DisplayListLayer;
	
	public function new();
	
	public function sceneInit(scene : Scene)
	{
		scene.id = scene.name = SCENE_ID;
		scene.addLayer(new DelegateLayer(testClearLayer, kumite.layer.LayerId.CLEAR));
		scene.addLayer(new DelegateLayer(colorLayer3));
		scene.addLayer(new DelegateLayer(textureLayer1));
		scene.addLayer(new DelegateLayer(testLayer1));
		scene.addLayer(new DelegateLayer(testLayer3));
		scene.addLayer(new DelegateLayer(displayList));
	}
	
	public function initTransition(transitionContext : TransitionContext) : Void
	{
		textureLayer1.alphaTransition.ease = ease.Quad.easeInOut;
		colorLayer3.alphaTransition.ease = ease.Quad.easeInOut;
		switch (transitionContext.direction)
		{
			case TransitionDirection.IN:
				colorLayer3.transitions.enableChild("alpha");
				textureLayer1.transitions.enableChild("alpha");
			case TransitionDirection.OUT:
				colorLayer3.transitions.enableChild("cut");
				textureLayer1.transitions.enableChild("cut");
		}
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
	}
		
	public function render()
	{
	}
}
