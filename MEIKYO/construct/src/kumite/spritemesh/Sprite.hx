package kumite.spritemesh;

class Sprite
{
	public var matrix : Matrix4;
	
	public var vertexes : Float32Array;
	public var normals : Float32Array;
	
	public function new()
	{
		matrix = new Matrix4();
		
		vertexes = new Float32Array(12);
		normals = new Float32Array(3);
	}
	
	public inline function getZ()
	{
		return vertexes[2];
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
		
		vertexes[0] = -n11 - n12 + n14;
		vertexes[1] = -n21 - n22 + n24;
		vertexes[2] = -n31 - n32 + n34;
		
		vertexes[3] = n11 - n12 + n14;
		vertexes[4] = n21 - n22 + n24;
		vertexes[5] = n31 - n32 + n34;
		
		vertexes[6] = -n11 + n12 + n14;
		vertexes[7] = -n21 + n22 + n24;
		vertexes[8] = -n31 + n32 + n34;
		
		vertexes[9] = n11 + n12 + n14;
		vertexes[10] = n21 + n22 + n24;
		vertexes[11] = n31 + n32 + n34;
		
		var x1 = 0, y1 = 0, z1 = 1;

		normals[0] = matrix.n11 * x1 + matrix.n12 * y1 + matrix.n13 * z1 + matrix.n14;
		normals[1] = matrix.n21 * x1 + matrix.n22 * y1 + matrix.n23 * z1 + matrix.n24;
		normals[2] = matrix.n31 * x1 + matrix.n32 * y1 + matrix.n33 * z1 + matrix.n34;		
	}
	
}
