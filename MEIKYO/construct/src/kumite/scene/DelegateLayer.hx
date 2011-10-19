package kumite.scene;

class DelegateLayer extends Layer
{
	private var lifecycle : LayerLifecycle;
	
	public function new(lifecycle : LayerLifecycle)
	{
		super();
		
		this.lifecycle = lifecycle;
		this.layerId = lifecycle.layerId;
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
	
}
