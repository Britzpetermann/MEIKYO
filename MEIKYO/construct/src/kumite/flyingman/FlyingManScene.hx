package kumite.flyingman;

import kumite.scene.SceneLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;
import kumite.displaylist.DisplayListLayer;

import haxe.rtti.Infos;

class FlyingManScene implements SceneLifecycle, implements Infos
{
	public static var SCENE_ID : String = "FLYING MAN";
	
	@Inject
	public var paperBackground : kumite.layer.TextureLayer;
	
	@Inject
	public var flyingManLayer : kumite.flyingman.FlyingManLayer;
	
	@Inject
	public var displayList : DisplayListLayer;
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	public function new();
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		group.add(new GLTextureLoadingTask(textureRegistry, Config.PAPER));
		
		return group;
	}
		
	public function sceneInit(scene : Scene)
	{
		scene.id = scene.name = SCENE_ID;
		scene.addLayer(new DelegateLayer(paperBackground));
		scene.addLayer(new DelegateLayer(flyingManLayer));
		scene.addLayer(new DelegateLayer(displayList));
	}

	public function initTransition(transitionContext : TransitionContext) : Void
	{
		paperBackground.alphaTransition.ease = ease.Quad.easeInOut;
		
		switch (transitionContext.direction)
		{
			case TransitionDirection.IN:
				paperBackground.transitions.enableChild("alpha");
			case TransitionDirection.OUT:
				paperBackground.transitions.enableChild("cut");
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
