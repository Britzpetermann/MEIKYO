class Map
{
	public static function linear(value : Float, min0 : Float, max0 : Float, min1 : Float, max1 : Float) : Float
	{
		var p0 : Float = 1 / (max0 - min0) * (value - min0);
		return min1 + (max1 - min1) * p0;
	}
}
