package kumite.scene;

import reflect.ClassInfo;

class DelegateLayer extends Layer
{
	public var lifecycle : LayerLifecycle;
	
	public function new(lifecycle : LayerLifecycle, ?layerId : String = null)
	{
		super();
		
		this.lifecycle = lifecycle;
		this.layerId = layerId;
	}
	
	override public function init()
	{
		try
		{
			lifecycle.init();
		}
		catch(e : Dynamic)
		{
			Log.error("Error initializing layer:\n" + layerId, e);	
		}
	}
	
	override public function render()
	{
		try
		{
			lifecycle.render();
		}
		catch(e : Dynamic)
		{
			Log.error("Error rendering layer:\n" + layerId, e);	
		}
	}
	
	override public function renderTransition(transitionContext : TransitionContext)
	{
		try
		{
			lifecycle.renderTransition(transitionContext);
		}
		catch(e : Dynamic)
		{
			Log.error("Error rendering layer:\n" + layerId, e);	
		}
	}
	
	public function toString()
	{
		return "[DelegateLayer " + ClassInfo.forInstance(lifecycle).name + "]";
	}
	
}
