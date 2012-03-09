package kumite.musicdraw;

class SquareEffect
{
	public var analyzer:MusicAnalyzer;
	public var texture:GLArrayTexture;
	public var rasterX:Int;
	
	var startTime:Float;
	
	public function new()
	{
		rasterX = 0;
		
		texture = new GLArrayTexture();
		texture.width = 512;
		texture.height = 1024;
	}
	
	public function init()
	{
		startTime = Date.now().getTime();
	}
	
	public function render()
	{
		var ms = Date.now().getTime() - startTime;
		
		for(x in 0...texture.width)
		{
			for(y in 0...texture.height)
			{
				var x2 = x - Math.sin(ms / 176000) * texture.width - texture.width / 2 + rasterX;
				var y2 = y - Math.sin(ms / 299000) * texture.height - texture.height / 2;
				texture.setPixel(x, y,
					Math2.sin1(x2 * x2 * y2 * y2 * 0.00000001 - ms / 5000) * 255,
					y,
					x,
					255);
			}
		}
	}
}
