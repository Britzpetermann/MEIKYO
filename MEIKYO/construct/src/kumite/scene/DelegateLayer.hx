package kumite.scene;

class DelegateLayer extends Layer
{
	private var layerLifecycle : LayerLifecycle;
	
	public function new(layerLifecycle : LayerLifecycle)
	{
		super();
		id = Type.getClassName(Type.getClass(layerLifecycle));
		
		this.layerLifecycle = layerLifecycle;
	}
}
