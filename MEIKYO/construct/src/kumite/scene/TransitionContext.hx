package kumite.scene;

class TransitionContext
{
	public var transition(getTransition, setTransition) : Float;
	public var layerState : LayerState;
	
	public var inScene : SceneAndLifecycle;
	public var outScene : SceneAndLifecycle;
	
	public var direction : TransitionDirection;
	
	public function new()
	{
	}
	
	public function toIn() : TransitionContext
	{
		direction = TransitionDirection.IN;
		return this;
	}
	
	public function toOut() : TransitionContext
	{
		direction = TransitionDirection.OUT;
		return this;
	}
	
	function getTransition() : Float
	{
		switch(direction)
		{
			case IN:
				return transition;
			case OUT:
				return 1 - transition;
		}
	}
	
	function setTransition(value : Float) : Float
	{
		direction = TransitionDirection.IN;
		transition = value;
		return value;
	}
}