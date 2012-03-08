package kumite.musicdraw;

class SquareEffect
{
	public var analyzer:MusicAnalyzer;
	public var sendCommand:String->Dynamic->Void;
	public var sendTransferableCommand:String->Dynamic->Void;
	
	public var gltexture:GLArrayTexture;
	var startTime:Float;
	
	var rasterX:Int;
	
	public function new()
	{
		rasterX = 0;
		
		gltexture = new GLArrayTexture();
		gltexture.width = 512;
		gltexture.height = 1024;
		gltexture.array = new Uint8Array(gltexture.width * gltexture.height * 4);
	}
	
	public function init()
	{
		startTime = Date.now().getTime();
	}
	
	public function render()
	{
		var ms = Date.now().getTime() - startTime;

		for(x in 0...gltexture.width)
		{
			for(y in 0...gltexture.height)
			{
				var x2 = x - Math.sin(ms / 176000) * gltexture.width - gltexture.width / 2 + rasterX;
				var y2 = y - Math.sin(ms / 299000) * gltexture.height - gltexture.height / 2;
				gltexture.setPixel(x, y,
					Math2.sin1(x2 * x2 * y2 * y2 * 0.00000001 - ms / 5000) * 255,
					y,
					x,
					255);
			}
		}
		
		sendTransferableCommand("setResult", gltexture.array);
	}
}
