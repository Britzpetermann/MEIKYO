package kumite.scene;

interface LayerLifecycle
{
	public function init() : Void;
	
	public function render(renderContext : RenderContext) : Void;
	
	public function renderTransition(transitionContext : TransitionContext) : Void;	
}
