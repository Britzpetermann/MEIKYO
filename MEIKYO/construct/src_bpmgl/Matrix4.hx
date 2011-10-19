/*
 * Indexs like n11 are given by standart matrix notation (row-major order)
 * The Buffer however implements GLSL standard (column-major order)
 * Best read/write order therfore is n11, n21, n31, n41, n21... due to contiguous reading and better caching
 */
class Matrix4
{
	private static var IDENTITY_BUFFER : Float32Array = createIdentityBuffer();
	private static var tempMatrix1 : Matrix4 = new Matrix4();
	private static var tempMatrix2 : Matrix4 = new Matrix4();
	private static function createIdentityBuffer()
	{
		var buffer = new Float32Array(16);
		buffer[0] = 1;
		buffer[1] = 0;
		buffer[2] = 0;
		buffer[3] = 0;
		buffer[4] = 0;
		buffer[5] = 1;
		buffer[6] = 0;
		buffer[7] = 0;
		buffer[8] = 0;
		buffer[9] = 0;
		buffer[10] = 1;
		buffer[11] = 0;
		buffer[12] = 0;
		buffer[13] = 0;
		buffer[14] = 0;
		buffer[15] = 1;
		return buffer;
	}
	
	public var buffer : Float32Array;
	
	public var n11(get11, set11) : Float;
	public var n12(get12, set12) : Float;
	public var n13(get13, set13) : Float;
	public var n14(get14, set14) : Float;
	
	public var n21(get21, set21) : Float;
	public var n22(get22, set22) : Float;
	public var n23(get23, set23) : Float;
	public var n24(get24, set24) : Float;

	public var n31(get31, set31) : Float;
	public var n32(get32, set32) : Float;
	public var n33(get33, set33) : Float;
	public var n34(get34, set34) : Float;

	public var n41(get41, set41) : Float;
	public var n42(get42, set42) : Float;
	public var n43(get43, set43) : Float;
	public var n44(get44, set44) : Float;

	public function new()
	{
		buffer = new Float32Array(IDENTITY_BUFFER);
	}

	public function setIdentity() {
		buffer.set(IDENTITY_BUFFER);
		return this;
	}

	public function set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44)
	{
		this.n11 = n11;
		this.n21 = n21;
		this.n31 = n31;
		this.n41 = n41;
		
		this.n12 = n12;
		this.n22 = n22;
		this.n32 = n32;
		this.n42 = n42;
		
		this.n13 = n13;
		this.n23 = n23;
		this.n33 = n33;
		this.n43 = n43;
		
		this.n14 = n14;
		this.n24 = n24;
		this.n34 = n34;
		this.n44 = n44;
		
		return this;
	}
	
	public function setFrom(from : Matrix4)
	{
		buffer.set(from.buffer);
		return this;
	}
		
	public function setTranslation(x, y, z)
	{
		set(
			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1
		);
		return this;
	}

	public function setScale(x, y, z)
	{
		set(
			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1
		);
		return this;
	}
	
	public function setRotationX(angle)
	{
		var c = Math.cos(angle), s = Math.sin(angle);
		set(
			1, 0,  0, 0,
			0, c, -s, 0,
			0, s,  c, 0,
			0, 0,  0, 1
		);
		return this;
	}
	
	public function setRotationY(angle)
	{
		var c = Math.cos(angle), s = Math.sin(angle);
		set(
 			 c, 0, s, 0,
			 0, 1, 0, 0,
			-s, 0, c, 0,
			 0, 0, 0, 1
		);
		return this;
	}
	
	public function setRotationZ(angle)
	{
		var c = Math.cos(angle), s = Math.sin(angle);
		set(
 			c, -s, 0, 0,
			s,  c, 0, 0,
			0,  0, 1, 0,
			0,  0, 0, 1
		);
		return this;
	}

	public function setRotation(angle, axis : Vec3)
	{
		//axis must be normalized!
		
		var c = Math.cos(angle),
		s = Math.sin(angle),
		t = 1 - c,
		x = axis.x, y = axis.y, z = axis.z,
		tx = t * x, ty = t * y;

		set(
		 	tx * x + c, tx * y - s * z, tx * z + s * y, 0,
			tx * y + s * z, ty * y + c, ty * z - s * x, 0,
			tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
			0, 0, 0, 1
		);
		return this;
	}

	public function setLookAt(eye : Vec3, at : Vec3, up : Vec3)
	{
		var eyex = eye.x,
			eyey = eye.y,
			eyez = eye.z,
			upx = up.x,
			upy = up.y,
			upz = up.z,
			atx = at.x,
			aty = at.y,
			atz = at.z;

		if (eyex == atx && eyey == aty && eyez == atz)
		{
			setIdentity();
		}

		var z0 = eyex - at.x;
		var z1 = eyey - at.y;
		var z2 = eyez - at.z;

		var len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
		z0 *= len;
		z1 *= len;
		z2 *= len;

		var x0 = upy * z2 - upz * z1;
		var x1 = upz * z0 - upx * z2;
		var x2 = upx * z1 - upy * z0;
		len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
		
		if (Math.isNaN(len))
		{
				x0 = 0;
				x1 = 0;
				x2 = 0;
		}
		else
		{
				len = 1 / len;
				x0 *= len;
				x1 *= len;
				x2 *= len;
		}

		var y0 = z1 * x2 - z2 * x1;
		var y1 = z2 * x0 - z0 * x2;
		var y2 = z0 * x1 - z1 * x0;

		len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
		
		if (Math.isNaN(len))
		{
				y0 = 0;
				y1 = 0;
				y2 = 0;
		} else {
				len = 1 / len;
				y0 *= len;
				y1 *= len;
				y2 *= len;
		}

		buffer[i11] = x0;
		buffer[i21] = y0;
		buffer[i31] = z0;
		buffer[i41] = 0;
		
		buffer[i12] = x1;
		buffer[i22] = y1;
		buffer[i23] = z1;
		buffer[i42] = 0;
		
		buffer[i13] = x2;
		buffer[i23] = y2;
		buffer[i33] = z2;
		buffer[i43] = 0;
		
		buffer[i14] = -(x0 * eyex + x1 * eyey + x2 * eyez);
		buffer[i24] = -(y0 * eyex + y1 * eyey + y2 * eyez);
		buffer[i34] = -(z0 * eyex + z1 * eyey + z2 * eyez);
		buffer[i44] = 1;
	}

	public function setOrtho(left : Float, right : Float, bottom : Float, top : Float, near : Float, far : Float)
	{
		var rl = (right - left);
		var tb = (top - bottom);
		var fn = (far - near);
		
		buffer[i11] = 2 / rl;
		buffer[i21] = 0;
		buffer[i31] = 0;
		buffer[i41] = 0;
		
		buffer[i12] = 0;
		buffer[i22] = 2 / tb;
		buffer[i32] = 0;
		buffer[i42] = 0;
		
		buffer[i13] = 0;
		buffer[i23] = 0;
		buffer[i33] = -2 / fn;
		buffer[i43] = 0;
		
		buffer[i14] = -(left + right) / rl;
		buffer[i24] = -(top + bottom) / tb;
		buffer[i34] = -(far + near) / fn;
		buffer[i44] = 1;
	}

	public function setPerspective(fovy : Float, aspect : Float, near : Float, far : Float)
	{
		var top = near * Math.tan(fovy * Math.PI / 360);
		var right = top * aspect;
		setFrustum(-right, right, -top, top, near, far);
	}

	public function setFrustum(left : Float, right : Float, bottom : Float, top : Float, near : Float, far : Float)
	{
		var rl = (right - left);
		var tb = (top - bottom);
		var fn = (far - near);
		
		buffer[i11] = (near * 2) / rl;
		buffer[i21] = 0;
		buffer[i31] = 0;
		buffer[i41] = 0;

		buffer[i12] = 0;
		buffer[i22] = (near * 2) / tb;
		buffer[i32] = 0;
		buffer[i42] = 0;

		buffer[i13] = (right + left) / rl;
		buffer[i23] = (top + bottom) / tb;
		buffer[i33] = -(far + near) / fn;
		buffer[i43] = -1;

		buffer[i14] = 0;
		buffer[i24] = 0;
		buffer[i34] = -(far * near * 2) / fn;
		buffer[i44] = 0;
	}
		
	public function append(a : Matrix4)
	{
		var b = this;
		
		var 
		a11 = a.n11, a21 = a.n21, a31 = a.n31, a41 = a.n41,
		a12 = a.n12, a22 = a.n22, a32 = a.n32, a42 = a.n42,
		a13 = a.n13, a23 = a.n23, a33 = a.n33, a43 = a.n43,
		a14 = a.n14, a24 = a.n24, a34 = a.n34, a44 = a.n44,

		b11 = b.n11, b21 = b.n21, b31 = b.n31, b41 = b.n41,
		b12 = b.n12, b22 = b.n22, b32 = b.n32, b42 = b.n42,
		b13 = b.n13, b23 = b.n23, b33 = b.n33, b43 = b.n43,
		b14 = b.n14, b24 = b.n24, b34 = b.n34, b44 = b.n44;

		n11 = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		n21 = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		n31 = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		n41 = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		
		n12 = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		n22 = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		n32 = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		n42 = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		
		n13 = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		n23 = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		n33 = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		n43 = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		
		n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
		n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
		n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
		n44 = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
	}
		
	public function appendAffine(a : Matrix4)
	{
		var 
		a11 = a.n11, a21 = a.n21, a31 = a.n31,
		a12 = a.n12, a22 = a.n22, a32 = a.n32,
		a13 = a.n13, a23 = a.n23, a33 = a.n33,

		b11 = n11, b21 = n21, b31 = n31,
		b12 = n12, b22 = n22, b32 = n32,
		b13 = n13, b23 = n23, b33 = n33,
		b14 = n14, b24 = n24, b34 = n34;

		n11 = a11 * b11 + a12 * b21 + a13 * b31;
		n21 = a21 * b11 + a22 * b21 + a23 * b31;
		n31 = a31 * b11 + a32 * b21 + a33 * b31;
		
		n12 = a11 * b12 + a12 * b22 + a13 * b32;
		n22 = a21 * b12 + a22 * b22 + a23 * b32;
		n32 = a31 * b12 + a32 * b22 + a33 * b32;
		
		n13 = a11 * b13 + a12 * b23 + a13 * b33;
		n23 = a21 * b13 + a22 * b23 + a23 * b33;
		n33 = a31 * b13 + a32 * b23 + a33 * b33;
		
		n14 = a11 * b14 + a12 * b24 + a13 * b34 + a.n14;
		n24 = a21 * b14 + a22 * b24 + a23 * b34 + a.n24;
		n34 = a31 * b14 + a32 * b24 + a33 * b34 + a.n34;
	}	

	public function appendTranslation(x : Float, y : Float, z : Float)
	{
		tempMatrix1.setTranslation(x, y, z);
		append(tempMatrix1);
	}

	public function appendTranslationAffine(x : Float, y : Float, z : Float)
	{
		tempMatrix1.setTranslation(x, y, z);
		appendAffine(tempMatrix1);
	}

	public function appendScale(x : Float, y : Float, z : Float)
	{
		tempMatrix1.setScale(x, y, z);
		append(tempMatrix1);
	}
	
	public function appendRotation(angle, axis : Vec3)
	{
		tempMatrix1.setRotation(angle, axis);
		append(tempMatrix1);
	}

	public function appendRotationZ(angle)
	{
		tempMatrix1.setRotationZ(angle);
		append(tempMatrix1);
	}

	public function appendScaleAffine(x : Float, y : Float, z : Float)
	{
		tempMatrix1.setScale(x, y, z);
		appendAffine(tempMatrix1);
	}
	
	public function appendRotationAffine(angle, axis : Vec3)
	{
		tempMatrix1.setRotation(angle, axis);
		appendAffine(tempMatrix1);
	}

	public function appendRotationZAffine(angle)
	{
		tempMatrix1.setRotationZ(angle);
		appendAffine(tempMatrix1);
	}

	public function toString()
	{
		var result = "[Matrix4: ";
		result += " | " + n11 + "," + n12 + "," + n13 + "," + n14;
		result += " | " + n21 + "," + n22 + "," + n23 + "," + n24;
		result += " | " + n31 + "," + n32 + "," + n33 + "," + n34;
		result += " | " + n41 + "," + n42 + "," + n43 + "," + n44;
		result += " | ]";

		return result;
	}
	
	private static inline var i11 : Int = 0 + 0;
	private static inline var i12 : Int = 0 + 4;
	private static inline var i13 : Int = 0 + 8;
	private static inline var i14 : Int = 0 + 12;
	
	private static inline var i21 : Int = 1 + 0;
	private static inline var i22 : Int = 1 + 4;
	private static inline var i23 : Int = 1 + 8;
	private static inline var i24 : Int = 1 + 12;
	
	private static inline var i31 : Int = 2 + 0;
	private static inline var i32 : Int = 2 + 4;
	private static inline var i33 : Int = 2 + 8;
	private static inline var i34 : Int = 2 + 12;
	
	private static inline var i41 : Int = 3 + 0;
	private static inline var i42 : Int = 3 + 4;
	private static inline var i43 : Int = 3 + 8;
	private static inline var i44 : Int = 3 + 12;
	
	inline function get11() {return buffer[i11];} inline function set11(v) {return buffer[i11]=v;}
	inline function get12() {return buffer[i12];} inline function set12(v) {return buffer[i12]=v;}
	inline function get13() {return buffer[i13];} inline function set13(v) {return buffer[i13]=v;}
	inline function get14() {return buffer[i14];} inline function set14(v) {return buffer[i14]=v;}
	
	inline function get21() {return buffer[i21];} inline function set21(v) {return buffer[i21]=v;}
	inline function get22() {return buffer[i22];} inline function set22(v) {return buffer[i22]=v;}
	inline function get23() {return buffer[i23];} inline function set23(v) {return buffer[i23]=v;}
	inline function get24() {return buffer[i24];} inline function set24(v) {return buffer[i24]=v;}
	
	inline function get31() {return buffer[i31];} inline function set31(v) {return buffer[i31]=v;}
	inline function get32() {return buffer[i32];} inline function set32(v) {return buffer[i32]=v;}
	inline function get33() {return buffer[i33];} inline function set33(v) {return buffer[i33]=v;}
	inline function get34() {return buffer[i34];} inline function set34(v) {return buffer[i34]=v;}
	
	inline function get41() {return buffer[i41];} inline function set41(v) {return buffer[i41]=v;}
	inline function get42() {return buffer[i42];} inline function set42(v) {return buffer[i42]=v;}
	inline function get43() {return buffer[i43];} inline function set43(v) {return buffer[i43]=v;}
	inline function get44() {return buffer[i44];} inline function set44(v) {return buffer[i44]=v;}
	
}
