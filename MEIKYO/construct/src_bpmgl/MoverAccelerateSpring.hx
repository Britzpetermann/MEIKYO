class MoverAccelerateSpring
{
	public var friction:Float;
	public var accelerationFactor:Float;
	public var accelerationClamp:Float;
	public var minVelocity:Float;
	
	public function new(?friction:Float = 0.97, ?accelerationFactor:Float = 0.01, ?accelerationClamp:Float = 1, ?minVelocity:Float = 0.01)
	{
		this.friction = friction;
		this.accelerationFactor = accelerationFactor;
		this.accelerationClamp = accelerationClamp;
		this.minVelocity = minVelocity;
	}

	public function move(moveSet:Mover):Void
	{
		var acceleration = (moveSet.target - moveSet.current) * accelerationFactor;
		acceleration = Clamp.float(acceleration, -accelerationClamp, accelerationClamp);
		 
		moveSet.velocity += acceleration;
		moveSet.velocity *= friction;
		moveSet.current += moveSet.velocity;
		
		if (Math.abs(moveSet.velocity) < minVelocity)
		{
			moveSet.velocity = 0;
			moveSet.current = moveSet.target;
		}
	}
}