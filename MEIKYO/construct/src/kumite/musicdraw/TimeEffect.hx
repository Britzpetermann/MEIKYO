package kumite.musicdraw;

class TimeEffect
{
	public var analyzer:MusicAnalyzer;
	public var texture:GLArrayTexture;
	
	public var params:Dynamic;
	
	public var setProgress:Float->Void;
	
	var index:Float;
	
	public function new()
	{
		setProgress = function(_){};
		texture = new GLArrayTexture();
		
		index = 0;
	}
	
	public function init()
	{
	}
	
	public function setParams(params:Dynamic)
	{
		this.params = params;
		texture.width = params.width;
		texture.height = params.height;
	}
	
	public function render(buffer:ArrayBuffer)
	{
		texture.array = new Uint8Array(buffer);
		
		var g = new RasterGraphic();
		g.smooth();
		g.rasterWidth = texture.width;
		g.rasterHeight = texture.height;
		g.raster = texture.array;
		g.clear();
		
		var height = texture.height;
		var width = Std.int(height / 1.414);
		
		var offsetX = Std.int((texture.width - width) / 2);
		var offsetY = Std.int((texture.height - height) / 2);
		
		g.setColor(0, 255, 0, 255);
		g.fillRect(0, 0, 10, 10);
		
		g.fillRect(100, 100, 10, 10);
		g.line(0, 0, 100, 100);
		
		g.setColor(255, 0, 0, 255);

		var originX = Std.int(width / 2) + offsetX;
		var originY = Std.int(height / 2) + offsetY;
		
		var count:Int = params.count;
		var oldX = 0;
		var oldY = 0;
		for(t in 0...count + 1)
		{
			var level = analyzer.getLevel3(t / count);
			var r = width * params.radius + level * width * params.levelRadius;
			var x = Std.int(Math.sin(t * Math.PI / (count / 2)) * r + width / 2) + offsetX;
			var y = Std.int(Math.cos(t * Math.PI / (count / 2)) * r + height / 2) + offsetY;
			
			if (t > 0)
				g.line(oldX, oldY, x, y);
				
			g.line(originX, originY, x, y);
			oldX = x;
			oldY = y;
		}
	}
}
