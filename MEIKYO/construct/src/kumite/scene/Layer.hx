package kumite.scene;

class Layer implements LayerLifecycle
{
	public var layerId : String;
	
	public var state : LayerState;
	
	public function new() {}
	
	public function init() {}
	
	public function render(renderContext : RenderContext) {}
	
	public function renderTransition(transitionContext : TransitionContext) {}
}
