class Rand
{
	public static inline function float(from : Float, to : Float) : Float
	{
		return from + Math.random() * (to - from);
	}
	
	public static inline function int(from : Float, to : Float) : Int
	{
		return Std.int((from + Math.random() * (to - from)));
	}

	public static inline function bool(chance : Float) : Bool
	{
		return Math.random() < chance;
	}

}
