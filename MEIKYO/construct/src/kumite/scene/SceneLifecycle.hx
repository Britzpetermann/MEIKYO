package kumite.scene;

interface SceneLifecycle
{
	public function sceneInit(scene : Scene) : Void;
	
	public function initTransition(transitionContext : TransitionContext) : Void;
	
	public function renderTransition(transitionContext : TransitionContext) : Void;
	
	public function render() : Void;
	
}
