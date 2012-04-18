package kumite.musicdraw;

class MusicAnalyzer
{
	public var bands:Array<Array<Float>>;
	public var levels:Array<Float>;
	
	public function new()
	{
		levels = new Array();
	}
	
	public function init()
	{
		for(band in bands)
		{
			var level = 0.0;
			for(note in band)
			{
				level += note;
			}
			
			level /= band.length;
			
			levels.push(level);
		}
	}
	
	public function getLevel(from:Float, to:Float):Float
	{
		var fromBand:Int = Std.int(from * bands.length);
		var toBand:Int = Std.int(to * bands.length);
		
		var level = 0.0;
		for(band in fromBand...toBand)
		{
			for(note in bands[band])
			{
				level += note;
			}
			
		}
		
		level /= bands[0].length * (toBand - fromBand);
		
		return level;
	}
	
	public function getLevel2(position:Float):Float
	{
		var positionFloor = Std.int(position * levels.length);
		
		return levels[positionFloor % levels.length];
	}
	
	public function getLevel3(position:Float):Float
	{
		var positionAll = position * levels.length;
		var positionFloor0 = Std.int(positionAll);
		var positionFloor1 = positionFloor0 + 1;
		
		var fraction = positionAll - positionFloor0;
		
		var l0 = levels[positionFloor0 % levels.length];
		var l1 = levels[positionFloor1 % levels.length];
		
		return l0 + (l1 - l0) * fraction;
	}
}
