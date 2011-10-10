package kumite.scene;

interface LayerLifecycle
{
	public var layerId : String;
	
	public function init() : Void;
	
	public function render() : Void;
	
	public function renderTransition(transitionContext : TransitionContext) : Void;	
}
