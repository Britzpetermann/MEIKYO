class Map
{
	public static function linear(value : Float, min0 : Float, max0 : Float, min1 : Float, max1 : Float) : Float
	{
		var p0 : Float = 1 / (max0 - min0) * (value - min0);
		return min1 + (max1 - min1) * p0;
	}
	
	public static function ease(value : Float, min0 : Float, max0 : Float, min1 : Float, max1 : Float, easeFunction) : Float
	{
		var p0 : Float = 1 / (max0 - min0) * (value - min0);
		
		var t = p0;
		var b = min1;
		var c = max1;
		var d = 1;
		
		return easeFunction(t, b, c, d);		
	}
}
