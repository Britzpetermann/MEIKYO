package kumite.windowlines;

class Line
{
	public var color : Color;
	public var position : Vec3;
	public var rotationZ : Float;
	public var randomTarget : Float;
	public var scale : Vec3;
	public var angle : MoveSet;
	public var defaultAngle : Float;
	public var texture : GLTextureAtlasPartConfig;
	
	public function new()
	{
		color = new Color();
		color.r = Rand.float(0, 1);
		color.g = Rand.float(0, 1);
		color.b = Rand.float(0, 1);
		position = new Vec3(0, 0, 0);
		rotationZ = Rand.float(-0.1, 0.1);
		scale = new Vec3(1, 1, 1);
		angle = new MoveSet(0, 0, 0, 0.01);
		defaultAngle = getDefaultAngle();
		randomTarget = Rand.float(-0.8, 0.8);
	}
	
	public function tick()
	{
		if (Rand.bool(0.0005))
		
			defaultAngle = getDefaultAngle();
		angle.move();
	}
	
	function getDefaultAngle()
	{
		if (Rand.bool(0.05))
			return Rand.float(-1.0, 1.0);
		else
			return Rand.float(-0.2, 0.2);
	}
}
