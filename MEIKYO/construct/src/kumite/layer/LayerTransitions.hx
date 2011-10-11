package kumite.layer;

class LayerTransitions extends LayerTransition
{
	var children : Array<LayerTransition>;
	
	public function new(?name : String = "")
	{
		children = new Array();
		super(name);
	}

	public function add(child : LayerTransition)
	{
		children.push(child);	
	}
	
	public function enableChild(name : String)
	{
		for (child in children)
		{
			child.enable(child.name == name);
		}
	}
	
	override function setTransition(value : Float ) : Float
	{
		for (child in children)
		{
			child.transition = value;
		}
		return value;
	}
}
