package kumite.musicdraw;

class RasterEffect
{
	public var analyzer:MusicAnalyzer;
	public var texture:GLArrayTexture;
	
	public var params:Dynamic;
	
	public var setProgress:Float->Void;
	
	public function new()
	{
		setProgress = function(_){};
		texture = new GLArrayTexture();
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
		
		var height = texture.height;
		var width = Std.int(height / 1.414);
		
		var offsetX = Std.int((texture.width - width) / 2);
		var offsetY = Std.int((texture.height - height) / 2);
		
		var rx = Std.int(params.rx);
		var ry = Std.int(params.ry);

		var tileWidth = width / rx;
		var tileHeight = height / ry;
		
		for(ty in 0...ry)
		{
			for(tx in 0...rx)
			{
				var x0 = Std.int(tx * tileWidth);
				var y0 = Std.int(ty * tileHeight);
				
				var songPositionFrom = (ty * rx + tx) / (rx * ry);
				var songPositionTo = songPositionFrom + 1 / (rx * ry);
				
				var level = analyzer.getLevel(songPositionFrom, songPositionTo);
				var r = level * params.scale * 255;
				if (r > 255)
					r = 255;
				for(x in x0...Std.int(x0 + tileWidth) + 1)
				{
					for(y in y0...Std.int(y0 + tileHeight) + 1)
					{
						texture.setPixel(
							x + offsetX,
							y + offsetY,
							Std.int(r),
							128,
							30,
							255);
					}
				}
			}
		}
	}
}
