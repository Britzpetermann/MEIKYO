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
		 lifecycle.init();
	}
	
	override public function render()
	{
		 lifecycle.render();
	}
}
