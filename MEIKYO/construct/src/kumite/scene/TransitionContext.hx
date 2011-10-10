package kumite.scene;

class TransitionContext
{
	public var transition : Float;
	
	public function new()
	{
	}
	
	public function toOutTransition() : TransitionContext
	{
		var result = new TransitionContext();
		result.transition = 1 - transition;
		
		return result;
	}
}
