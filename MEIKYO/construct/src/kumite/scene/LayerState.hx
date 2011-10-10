package kumite.scene;

class LayerState
{
	public static var OUT : LayerState = new LayerState("OUT");
	public static var IN : LayerState = new LayerState("IN");
	public static var KEEP : LayerState = new LayerState("KEEP");
	
	public var name(default, null) : String;
	
	private function new(name)
	{
		this.name = name;
	}
}
