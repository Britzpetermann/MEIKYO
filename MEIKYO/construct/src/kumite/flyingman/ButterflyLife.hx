package kumite.flyingman;

import kumite.time.Time;

class ButterflyLife extends Component
{
	public var position : Vec3;
	public var velocity : Vec3;
	
	override function init()
	{
		position = getNewPosition().clone();
		velocity = new Vec3(0, 0.1, 0);
	}
	
	override function update()
	{
		var newPosition = getNewPosition();
		velocity = newPosition.clone().subtract(position.x, position.y, position.z);
		
		position.setFrom(newPosition);
		
		sprite.position.setFrom(position);
	}
	
	function getNewPosition()
	{
		var result = new Vec3(); 
		result.x = Math.sin(time.ms / 10000) * 70 + Math.sin(time.ms / 5000) * 20;
		result.y = 5 + Math.sin(time.ms / 20000) * 5;
		result.z = Math.cos(time.ms / 9000) * 70 + Math.cos(time.ms / 4000) * 20;
		return result;
	}
}
