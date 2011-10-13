class MoveSet
{
	public var current : Float;

	public var target : Float;

	public var velocity : Float;

	public var acceleration : Float;

	public var breaking : Bool;

	public function new(current : Float = 0, target : Float = 0, velocity : Float = 0, acceleration : Float = 0.5)
	{
		this.current = current;
		this.target = target;
		this.velocity = velocity;
		this.acceleration = acceleration;
	}

	public function move(timeScale : Float = 1) : Void
	{
		breaking = false;
		var moveSet : MoveSet = this;

		var dx : Float = moveSet.target - moveSet.current;
		if (dx == 0)
			return;

		var accelerationToTarget : Float = Math2.signum(dx) * acceleration;
		var accelerationWhenBreaking : Float = -accelerationToTarget;

		var timeUntilStopIfBreaking : Float = -(moveSet.velocity / accelerationWhenBreaking);

		if (timeUntilStopIfBreaking < 0)
		{
			// return
			moveSet.velocity -= accelerationWhenBreaking * timeScale;
		}
		else
		{
			var wayUntilStopIfBreaking : Float = (moveSet.velocity * timeUntilStopIfBreaking - 0.5 * accelerationWhenBreaking * timeUntilStopIfBreaking * timeUntilStopIfBreaking);
			var shouldBreak : Bool = Math.abs(wayUntilStopIfBreaking) > Math.abs(dx);

			if (shouldBreak)
			{
				breaking = true;
				if (timeUntilStopIfBreaking > 3)
					accelerationWhenBreaking = -(2 * (wayUntilStopIfBreaking - dx)) / (timeUntilStopIfBreaking * timeUntilStopIfBreaking);
				velocity += accelerationWhenBreaking * timeScale;
			}
			else
			{
				velocity += accelerationToTarget * timeScale;
			}
		}

		var currentNew : Float = current + moveSet.velocity * timeScale;

		var dxNew : Float = moveSet.target - currentNew;
		if (Math2.signum(dxNew) != Math2.signum(dx))
		{
			moveSet.velocity = 0;
			moveSet.current = moveSet.target;
		}
		else
		{
			moveSet.current = currentNew;
		}
	}
}