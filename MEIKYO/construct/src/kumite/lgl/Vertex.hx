package kumite.lgl;

class Vertex
{
	public var index:Int;
	public var weight:Float;
	public var energy:Float;
	
	public var positionX:Float;
	public var positionY:Float;
	public var positionZ:Float;
	
	public var forceX:Float;
	public var forceY:Float;
	public var forceZ:Float;
	
	public var velocityX:Float;
	public var velocityY:Float;
	public var velocityZ:Float;

	public function new()
	{
		positionX = 0;
		positionY = 0;
		positionZ = 0;
		
		forceX = 0;
		forceY = 0;
		forceZ = 0;
		
		velocityX = 0;
		velocityY = 0;
		velocityZ = 0;
		
		weight = 0;
		index = -1;
	}

	public function toString()
	{
		return "Vertex[" + index + "]";
	}
}
