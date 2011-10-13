package kumite.flyingman;

import kumite.time.Time;

class ButterflyCloseupCamera extends Component
{
	public var butterfly : ButterflyLife;
	public var matrix : Matrix4;
	public var eye : Vec3;
	public var lookAt : Vec3;
	
	override function init()
	{
		matrix = new Matrix4();
	}
	
	override function update()
	{
		var dist = 4;
		var v = butterfly.position.clone();
		v.normalize();
		var vNorm = butterfly.position.clone();
		vNorm.normalize();
		var newEye = butterfly.position.clone();
		newEye.x += vNorm.x * dist; 
		newEye.y += vNorm.y * dist + 3; 
		newEye.z += vNorm.z * dist; 
		
		if (eye == null)
		{
			eye = new Vec3();
			eye.setFrom(newEye);
			
			lookAt = new Vec3();
			lookAt.setFrom(getLookAtTarget());
		}
		else
		{
			time.interpolateVec3To(eye, newEye, 0.01);
			time.interpolateVec3To(lookAt, getLookAtTarget(), 0.05);
		}
		matrix.setLookAt(eye, lookAt, new Vec3(0, 1, 0));
	}
	
	function getLookAtTarget()
	{
		var result = butterfly.position.clone();
		result.x += Math.sin(time.ms / 4000) * 2;
		result.y += Math.cos(time.ms / 5000) * 1 + 1;
		result.z += Math.sin(time.ms / 6000) * 2;
		return result;
	}
}
