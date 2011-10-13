package kumite.flyingman;

import kumite.time.Time;

class ButterflyCloseupCamera2 extends Component
{
	public var butterfly : ButterflyLife;
	public var matrix : Matrix4;
	
	var eye : Vec3;
	var newEye : Vec3;
	var lookAt : Vec3;
	var lookAtOffset : Vec2;
	var lastUpdate : Float;
	
	override function init()
	{
		matrix = new Matrix4();
		
		lastUpdate = time.ms;
		
		lookAtOffset = new Vec2(0, 0);
		
		newEye = new Vec3();
		newEye.setFrom(getNewEyePosition());
		
		eye = newEye.clone();
		lookAt = getLookAtTarget().clone();
	}
	
	override function update()
	{
		
		if (time.ms - lastUpdate > 5000)
		{
			lastUpdate = time.ms;
			newEye.setFrom(getNewEyePosition());
		}
		
		time.interpolateVec3To(eye, newEye, 0.01);
		time.interpolateVec3To(lookAt, getLookAtTarget(), 0.05);
		
		matrix.setLookAt(eye, lookAt, new Vec3(0, 1, 0));
	}
	
	function getLookAtTarget()
	{
		var result = butterfly.position.clone();
		result.x += lookAtOffset.x;
		result.y -= 3;
		result.z += lookAtOffset.y;
		return result;
	}
	
	function getNewEyePosition()
	{
		var v = butterfly.velocity.clone();
		v.y = 0;
		
		var result = butterfly.position.clone();
		result.x += v.x;
		result.y = 0.2;
		result.z += v.z;
		
		lookAtOffset.x = Rand.float(-5, 5);
		lookAtOffset.y = Rand.float(-5, 5);
		return result;
	}
}
