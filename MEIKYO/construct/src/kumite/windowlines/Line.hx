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
	
	var source : Dynamic;
	var gain : Dynamic;
	var context : Dynamic;
	public function initSound(context : Dynamic)
	{
		this.context = context;
	}
	
	public function doPlay(blob : Blob)
	{
		/*
		var hertz = 440 * Math.pow(2, (pitch - 49 - blob.area * 100) / 12);
		
		source = context.createBufferSource();
		var toneBuffer = context.createBuffer(2, context.sampleRate * 0.25, context.sampleRate);
		var n = toneBuffer.length;
    	var channelL = toneBuffer.getChannelData(0);
    	var channelR = toneBuffer.getChannelData(1);
    	var sampleRate = toneBuffer.sampleRate;
		
		var attack = 50;
		var sustain = 2000;
	    for (i in 0...n)
		{
			var volume = 1.0;
			
			if (i < attack)
				volume = Map.linear(i, 0, attack, 0, 1);
				
			if (i > n - sustain)
				volume = Map.linear(i, n - sustain, n, 1, 0);
				
			var wave = (Math.sin(2 * i * Math.PI / context.sampleRate * hertz)) * volume * 0.05;
	        channelL[i] = wave;
	        channelR[i] = wave;
	    }		
		source.buffer = toneBuffer;
		source.connect(context.destination);
		source.looping = false;
		source.noteOn(0);
		 */
		
		//return new Note(Std.int(pitch - blob.area * 100));	
		return new Note(Std.int(pitch));	
	}
	
	public function tick()
	{
		if (Rand.bool(0.0005))
			defaultAngle = getDefaultAngle();
		
		if (comeup)
		{
			angle.move();
			//angle.velocity += (angle.target - angle.current) * 0.1;
			//angle.velocity *= 0.8;
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
//			return Rand.float(-0.2, 0.2) + cosMiddle * 0.2;
			return Rand.float(-0.2, 0.2) + cosMiddle * 0.1 - 0.1;
	}
}
