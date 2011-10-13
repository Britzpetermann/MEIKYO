package kumite.flyingman;

import kumite.scene.SceneLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;
import kumite.displaylist.DisplayListLayer;

import haxe.rtti.Infos;

class FlyingManScene implements SceneLifecycle, implements Infos
{
	@Inject
	public var paperBackground : kumite.layer.TextureLayer;
	
	@Inject
	public var displayList : DisplayListLayer;
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Inject
	public var graph : FlyingManGraph;
	
	public var flyingManLayer : FlyingManLayer;
	
	var sceneId : String;
	public function new(sceneId : String)
	{
		this.sceneId = sceneId;
	}
	
	public function sceneInit(scene : Scene)
	{
		scene.id = scene.name = sceneId;
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
		graph.update();
		GL.clearColor(0, 0, 0, 1);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);		
	}
}