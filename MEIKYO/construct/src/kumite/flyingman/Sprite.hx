package kumite.flyingman;

class Sprite
{
	public var position : Vec3;
	public var rotationY : Float;
	public var texture : GLTexture;
	
	public function new()
	{
		position = new Vec3();
		rotationY = 0;
	}
}
