package kumite.spritemesh;

class Sprite
{
	public var matrix : Matrix4;
	
	public var floats : Float32Array;
	
	public function new()
	{
		matrix = new Matrix4();
		
		floats = new Float32Array(12);
	}
	
	public inline function getZ()
	{
		return floats[2];
	}
	
	public inline function transform()
	{
		var n11 = matrix.n11;
		var n21 = matrix.n21;
		var n31 = matrix.n31;
		
		var n12 = matrix.n12;
		var n22 = matrix.n22;
		var n32 = matrix.n32;
		
		var n14 = matrix.n14;
		var n24 = matrix.n24;
		var n34 = matrix.n34;
		
		floats[0] = -n11 - n12 + n14;
		floats[1] = -n21 - n22 + n24;
		floats[2] = -n31 - n32 + n34;
		
		floats[3] = n11 - n12 + n14;
		floats[4] = n21 - n22 + n24;
		floats[5] = n31 - n32 + n34;
		
		floats[6] = -n11 + n12 + n14;
		floats[7] = -n21 + n22 + n24;
		floats[8] = -n31 + n32 + n34;
		
		floats[9] = n11 + n12 + n14;
		floats[10] = n21 + n22 + n24;
		floats[11] = n31 + n32 + n34;
	}
	
}
