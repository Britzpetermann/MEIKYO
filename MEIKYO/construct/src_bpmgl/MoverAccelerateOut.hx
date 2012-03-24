class MoverAccelerateOut
{
	public var friction:Float;
	public var accelerationClamp:Float;
	public var minVelocity:Float;
	
	public function new(?friction:Float = 0.1, ?accelerationClamp:Float = 1, ?minVelocity:Float = 0.005)
	{
		this.friction = friction;
		this.accelerationClamp = accelerationClamp;
		this.minVelocity = minVelocity;
	}

	public function move(moveSet:Mover):Void
	{
		var d = moveSet.target - moveSet.current;
		var newVelocity = d * Math.pow(friction, 1 / moveSet.power);
		
		var acceleration = newVelocity - moveSet.velocity;
		
		if (Math2.signum(d) == Math2.signum(acceleration))		
			acceleration = Clamp.float(acceleration, -accelerationClamp * moveSet.power, accelerationClamp * moveSet.power);
		
		moveSet.velocity += acceleration;
		moveSet.current += moveSet.velocity;
		
		if (Math.abs(moveSet.velocity) < minVelocity)
			moveSet.current = moveSet.target;
	}
}