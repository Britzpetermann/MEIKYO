package kumite.testscene;

import kumite.scene.SceneLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;
import kumite.displaylist.DisplayListLayer;

import haxe.rtti.Infos;

class TestScene4 implements SceneLifecycle, implements Infos
{
	public static var SCENE_ID : String = "GREEN-BLUE";
	
	@Inject
	public var testLayer2 : kumite.layer.TestLayer;
	
	@Inject
	public var testLayer3 : kumite.layer.TestLayer;
	
	@Inject
	public var textureLayer2 : kumite.layer.TextureLayer;
	
	@Inject
	public var colorLayer3 : kumite.layer.ColorLayer;
	
	@Inject
	public var displayList : DisplayListLayer;
	
	public function new();
	
	public function sceneInit(scene : Scene)
	{
		scene.id = scene.name = SCENE_ID;
		scene.addLayer(new DelegateLayer(colorLayer3));
		scene.addLayer(new DelegateLayer(textureLayer2));
		scene.addLayer(new DelegateLayer(testLayer2));
		scene.addLayer(new DelegateLayer(testLayer3));
		scene.addLayer(new DelegateLayer(displayList));
	}

	public function initTransition(transitionContext : TransitionContext) : Void
	{
		textureLayer2.alphaTransition.ease = ease.Quad.easeInOut;
		colorLayer3.alphaTransition.ease = ease.Quad.easeInOut;
		switch (transitionContext.direction)
		{
			case TransitionDirection.IN:
				colorLayer3.transitions.enableChild("alpha");
				textureLayer2.transitions.enableChild("alpha");
			case TransitionDirection.OUT:
				colorLayer3.transitions.enableChild("cut");
				textureLayer2.transitions.enableChild("cut");
		}
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
