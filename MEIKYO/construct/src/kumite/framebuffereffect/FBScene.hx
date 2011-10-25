package kumite.framebuffereffect;

import kumite.layer.ClearLayer;
import kumite.time.Time;
import kumite.scene.SceneLifecycle;
import kumite.scene.TransitionContext;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;
import kumite.displaylist.DisplayListLayer;

import haxe.rtti.Infos;

class FBScene implements SceneLifecycle, implements Infos
{
	@Inject
	public var fbLayer : FBLayer;
	
	@Inject
	public var fbEnableLayer : FBEnableLayer;
	
	@Inject
	public var fbDisableLayer : FBDisableLayer;
	
	@Inject
	public var fbTextureLayer : FBTextureLayer;
	
	@Inject
	public var displayList : DisplayListLayer;
	
	@Inject
	public var fbClearLayer1 : ClearLayer;
	
	@Inject
	public var fbClearLayer2 : ClearLayer;
	
	public function new();
	
	public function sceneInit(scene : Scene)
	{
		scene.id = scene.name = "FB";
		scene.addLayer(new DelegateLayer(fbClearLayer1, kumite.layer.LayerId.CLEAR));
		scene.addLayer(new DelegateLayer(fbEnableLayer));
		scene.addLayer(new DelegateLayer(fbClearLayer2));
		scene.addLayer(new DelegateLayer(fbLayer));
		scene.addLayer(new DelegateLayer(fbDisableLayer));
		scene.addLayer(new DelegateLayer(fbTextureLayer));
		scene.addLayer(new DelegateLayer(displayList));
	}

	public function initTransition(transitionContext : TransitionContext) : Void
	{
	}

	public function renderTransition(transitionContext : TransitionContext)
	{
	}
	
	public function render()
	{
 	}
}