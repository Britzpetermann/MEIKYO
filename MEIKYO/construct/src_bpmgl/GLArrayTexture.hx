class GLArrayTexture extends GLTexture
{
	public var array : Uint8Array;
	
	public inline function setPixel(x, y, r, g, b, a)
	{
		var index = y * width + x;
		array[index + 0] = r;
		array[index + 1] = g;
		array[index + 2] = b;
		array[index + 3] = a;
	}
}
