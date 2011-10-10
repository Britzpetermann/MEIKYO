class Rand
{
	public static inline function float(from : Float, to : Float) : Float
	{
		return from + Math.random() * (to - from);
	}

}
