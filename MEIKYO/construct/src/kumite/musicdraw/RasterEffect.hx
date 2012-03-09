package kumite.musicdraw;

class RasterEffect
{
	public var analyzer:MusicAnalyzer;
	public var texture:GLArrayTexture;
	
	public var paramLength:Float;
	public var paramPosition:Float;
	
	public function new()
	{
		texture = new GLArrayTexture();
	}
	
	public function init()
	{
	}
	
	public function render()
	{
		var height = texture.height;
		var width = Std.int(height / 1.41428571428571);
		
		var bandsLength = analyzer.bands.length * paramLength;
		var bandsPosition = analyzer.bands.length * paramPosition;
		
		var offsetX = Std.int((texture.width - width) / 2);
		var offsetY = Std.int((texture.height - height) / 2);
		
		var bandIndexLength = Std.int(bandsLength / height);
		if (bandIndexLength < 1)
			bandIndexLength = 1;
			
		var noteCount = analyzer.bands[0].length;
		
		for(y in 0...height)
		{
			var bandIndexFrom = Math.floor(bandsLength / height * y + bandsPosition); 
			
			for(x in 0...width)
			{
				var noteIndex = Math.round(noteCount / width * x);
				var note = 0.0;
				
				for(bandIndex in 0 ... bandIndexLength)
				{ 
					var band = analyzer.bands[(bandIndexFrom + bandIndex) % analyzer.bands.length];
					note += band[noteIndex];
				}
				
				note /= bandIndexLength;
				
				note *= 3;
				
				if (note > 1)
					note = 1;
			
				texture.setPixel(
					x + offsetX,
					y + offsetY,
					255 - note * note * 100,
					255 - note * note * 255,
					255 - note * 200,
					255);
			}
		}
	}
}
