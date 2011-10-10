package kumite.scene;

interface SceneLifecycle
{
	public function sceneInit(scene : Scene) : Void;
	
	public function render() : Void;
	
	public function renderTransition(transitionContext : TransitionContext) : Void;
}
