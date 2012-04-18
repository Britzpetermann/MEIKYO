class MoverAccelerateInOut
{
	public var acceleration:Float;
	
	public function new(?acceleration:Float = 0.1)
	{
		this.acceleration = acceleration;
	}

	public function move(moveSet:Mover):Void
	{
		var dx:Float = moveSet.target - moveSet.current;
		if (dx == 0)
			return;
			
		var accelerationToTarget:Float = Math2.signum(dx) * (acceleration * moveSet.power);
		var accelerationWhenBreaking:Float = -accelerationToTarget;

		var timeUntilStopIfBreaking:Float = -((moveSet.velocity + accelerationWhenBreaking) / accelerationWhenBreaking);
		if (timeUntilStopIfBreaking < 0)
		{
			// moving in wrong direction => break
			if (Math.abs(dx) < Math.abs(accelerationWhenBreaking))
			{
				moveSet.velocity = dx;
			}
			else
			{
				moveSet.velocity -= accelerationWhenBreaking;
			}
		}
		else
		{
			var wayUntilStopIfBreaking:Float = 0.5 * timeUntilStopIfBreaking * accelerationWhenBreaking + 0.5 * timeUntilStopIfBreaking * timeUntilStopIfBreaking * accelerationWhenBreaking;
			var shouldBreak:Bool = Math.abs(wayUntilStopIfBreaking) > Math.abs(dx);
			if (shouldBreak)
			{
				// break
				if (timeUntilStopIfBreaking < 1)
				{
					// less than one frame until target is reached
					moveSet.velocity = 0;
					moveSet.current = moveSet.target;
				}
				else
				{
					// compute precise break acceleration to reach wayUntilStopIfBreaking = dx
					accelerationWhenBreaking = -moveSet.velocity / timeUntilStopIfBreaking;
					moveSet.velocity += accelerationWhenBreaking;
				}
			}
			else
			{
				// accelerate
				if (Math.abs(dx) < Math.abs(accelerationToTarget))
				{
					accelerationToTarget = dx;
				}
				moveSet.velocity += accelerationToTarget;
			}
		}

		var currentNew:Float = moveSet.current + moveSet.velocity;

		var dxNew:Float = moveSet.target - currentNew;
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