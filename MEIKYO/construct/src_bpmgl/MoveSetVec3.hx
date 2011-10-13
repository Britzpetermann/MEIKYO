class MoveSetVec3
{
	public var current : Vec3;
	public var target : Vec3;
	public var acceleration : Vec3;

	public var moveSetX : MoveSet;
	public var moveSetY : MoveSet;
	public var moveSetZ : MoveSet;

	public function new(current : Vec3, target : Vec3, acceleration : Vec3)
	{
		this.current = current;
		this.target = target;
		this.acceleration = acceleration;
		moveSetX = new MoveSet(current.x, target.x, 0, acceleration.x);
		moveSetY = new MoveSet(current.y, target.y, 0, acceleration.y);
		moveSetZ = new MoveSet(current.z, target.z, 0, acceleration.z);
	}

	public function move(?factor : Float = 1)
	{
		moveSetX.target = target.x;
		moveSetX.acceleration = acceleration.x;
		moveSetX.move(factor);
		current.x = moveSetX.current;

		moveSetY.target = target.y;
		moveSetY.acceleration = acceleration.y;
		moveSetY.move(factor);
		current.y = moveSetY.current;

		moveSetZ.target = target.z;
		moveSetZ.acceleration = acceleration.z;
		moveSetZ.move(factor);
		current.z = moveSetZ.current;

	}
}
