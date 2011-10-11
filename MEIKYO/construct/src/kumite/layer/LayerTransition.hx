package kumite.layer;

class LayerTransition
{
	public var name : String;
	public var enabled : Bool;
	public var ease : Float->Float->Float->Float->Float;
	public var direction : Float;
	public var transition(getTransition, setTransition) : Float;
	
	public function new(name : String)
	{
		this.name = name;
		enabled = true;
		transition = 1;
		direction = 1;
	}
	
	public function enable(enabled : Bool)
	{
		if (!enabled)
			transition = 1;
		this.enabled = enabled;
	}
	
	function getTransition() : Float
	{
		if (ease == null)
			return transition;
		else
			return Map.ease(transition, 0, 1, 0, 1, ease);
	}
	
	function setTransition(value : Float) : Float
	{
		if (enabled)
			transition = value;
		return transition;
	}
}
