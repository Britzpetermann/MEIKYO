package kumite.stage;

class Stage
{
	public var width : Int;
	public var height : Int;
	
	public var aspect(getAspect, null) : Float;
	
	public function new();
	
	private function getAspect() : Float
	{
		return width / height;
	}
}