package kumite.windowlines;

import kumite.socketsound.Note;
import kumite.blobs.Blobs;
import kumite.blobs.Blob;

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
	public var comeup : Bool;
	public var enter : Bool;
	public var play : Bool;
	public var played : Float;
	public var cosMiddle : Float;
	public var blob : Blob;
	public var pitch : Int;
	
	/*
	public static var colors = [
			new Color().fromHex(0xfbf700),
			new Color().fromHex(0xb3eb5f),
			new Color().fromHex(0x1dc8bf),
			new Color().fromHex(0xd1d1d1),
			new Color().fromHex(0xf3cbf5),
			new Color().fromHex(0xe92e97),
			new Color().fromHex(0x00bbff),
			new Color().fromHex(0xffffff),
		];
		 */

	public static var colors = [
			new Color().fromHex(0xB4C8D2),
			new Color().fromHex(0xFFD0C7),
			new Color().fromHex(0xFFEAB3),
			new Color().fromHex(0x347AB5),
			new Color().fromHex(0x82b48c),
			new Color().fromHex(0xB4C8D2),
			new Color().fromHex(0xd8d8d8),
			new Color().fromHex(0xFF6D6D),
		];

	public function new()
	{
		cosMiddle = 0;
		comeup = false;
		color = Rand.list(colors);
		position = new Vec3(0, 0, 0);
		rotationZ = Rand.float(-0.03, 0.03);
		scale = new Vec3(1, 1, 1);
		angle = new MoveSet(0, 0, 0, 0.01);
		defaultAngle = getDefaultAngle();
		randomTarget = Rand.float(-0.8, 0.8);
	}
	
	public function tick()
	{
		if (Rand.bool(0.0005))
			defaultAngle = getDefaultAngle();
		
		if (comeup)
		{
			angle.move();
		}
		else
		{
			angle.velocity += (angle.target - angle.current) * 0.01;
			angle.velocity *= 0.92;
			angle.current += angle.velocity;
		}
	}
	
	public function getDefaultAngle()
	{
		if (Rand.bool(0.05))
			return Rand.float(-1.0, 1.0);
		else
			return Rand.float(-0.2, 0.2) + cosMiddle * 0.1 - 0.1;
	}
}
