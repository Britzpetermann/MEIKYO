class Math2
{
	public static function nextPowerOf2(value : Float) : Int
	{
		var val = Std.int(value); 
		val--;
		val = (val >> 1) | val;
		val = (val >> 2) | val;
		val = (val >> 4) | val;
		val = (val >> 8) | val;
		val = (val >> 16) | val;
		val++;
		return val;
	}
}
