typedef Vec3Components = {x : Float, y : Float, z : Float};

class Vec3
{
	public var x : Float;
	public var y : Float;
	public var z : Float;

	public function new(?x : Float = 0, ?y : Float = 0, ?z : Float = 0)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public function scale(factor : Float)
	{
		this.x *= factor;
		this.y *= factor;
		this.z *= factor;
	}

	public function multiply(x : Float, y : Float, z : Float)
	{
		this.x *= x;
		this.y *= y;
		this.z *= z;
	}

	public function subtract(x : Float, y : Float, z : Float)
	{
		this.x -= x;
		this.y -= y;
		this.z -= z;

		return this;
	}

	public function normalize()
	{
		var length = Math.sqrt(x * x + y * y + z * z);
		x /= length;
		y /= length;
		z /= length;
		
		return this;
	}

	public function cross(vec : Vec3)
	{
		var x = this.y * vec.z - this.z * vec.y;
		var y = this.z * vec.x - this.x * vec.z;
		var z = this.x * vec.y - this.y * vec.x;
		return new Vec3(x, y, z);
	}

	public function dot(vec : Vec3)
	{
		return x * vec.x + y * vec.y + z * vec.z;
	}

	public function transform(matrix : Matrix4)
	{
		var x1 = this.x, y1 = this.y, z1 = this.z;

		this.x = matrix.n11 * x1 + matrix.n12 * y1 + matrix.n13 * z1 + matrix.n14;
		this.y = matrix.n21 * x1 + matrix.n22 * y1 + matrix.n23 * z1 + matrix.n24;
		this.z = matrix.n31 * x1 + matrix.n32 * y1 + matrix.n33 * z1 + matrix.n34;
	}

	public function setFrom(?value : Float, ?vec3 : Vec3Components)
	{
		if (value != null)
		{
			x = value;
			y = value;
			z = value;
		}
		else if (vec3 != null)
		{
			x = vec3.x;
			y = vec3.y;
			z = vec3.z;
		}
	}

	public function clone() : Vec3
	{
		return new Vec3(x, y, z);
	}
}
