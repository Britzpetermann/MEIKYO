class Clamp
{
	public static inline function float(value : Float, from : Float, to : Float) : Float
	{
		if (value < from)
			value = from;
		if (value > to)
			value = to;
		return value;
	}
	
	public static inline function int(value : Int, from : Int, to : Int) : Int
	{
		if (value < from)
			value = from;
		if (value > to)
			value = to;
		return value;
	}
}
