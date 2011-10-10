package kumite.scene;

class DelegateLayer extends Layer
{
	private var lifecycle : LayerLifecycle;
	
	public function new(lifecycle : LayerLifecycle)
	{
		super();
		
		id = Type.getClassName(Type.getClass(lifecycle));
		
		this.lifecycle = lifecycle;
	}
	
	override public function init()
	{
		try
		{
			lifecycle.init();
		}
		catch(e : Dynamic)
		{
			Log.error("Error initializing layer:", id, e);	
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
			Log.error("Error rendering layer:", id, e);	
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
			Log.error("Error rendering layer:", id, e);	
		}
	}
	
}
