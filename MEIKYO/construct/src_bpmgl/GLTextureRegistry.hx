import js.Lib;

class GLTextureRegistry
{
	public var images : Array<GLTexture>;

	public function new()
	{
		images = new Array();
	}

	public function register(name : Dynamic, texture : GLTexture)
	{
		images[name] = texture;
	}

	public function get(name : Dynamic)
	{
		return images[name];
	}

	public function createGLTextureFromImage(image : Image, ?filter : Int = null)
	{
		var texture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, texture);
		GL.texImage2DImage(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, image);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, filter != null ? filter : GL.NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, filter != null ? filter : GL.NEAREST);

		if (
			filter == GL.NEAREST_MIPMAP_NEAREST ||
			filter == GL.NEAREST_MIPMAP_LINEAR ||
			filter == GL.LINEAR_MIPMAP_NEAREST ||
			filter == GL.LINEAR_MIPMAP_LINEAR
			)
		{
			GL.generateMipmap(GL.TEXTURE_2D);
		}

		var result = new GLTexture();
		result.width = image.width;
		result.height = image.height;
		result.texture = texture;

		return result;
	}

	public function createGLTextureFromCanvas(canvas : Canvas)
	{
		var testPowerOfTwoWidth = Std.int(Math2.nextPowerOf2(canvas.width));
		var testPowerOfTwoHight = Std.int(Math2.nextPowerOf2(canvas.height));
		if (testPowerOfTwoWidth != canvas.width || testPowerOfTwoHight != canvas.height)
			throw "Canvas size must be a valid texture size!";

		var texture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, texture);
		GL.texImage2DCanvas(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, canvas);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.NEAREST);

		var result = new GLTexture();
		result.width = canvas.width;
		result.height = canvas.height;
		result.texture = texture;

		return result;
	}

	public function updateGLTextureFromCanvas(texture : GLTexture, canvas : Canvas)
	{
		var testPowerOfTwoWidth = Std.int(Math2.nextPowerOf2(canvas.width));
		var testPowerOfTwoHight = Std.int(Math2.nextPowerOf2(canvas.height));
		if (testPowerOfTwoWidth != canvas.width || testPowerOfTwoHight != canvas.height)
			throw "Canvas size must be a valid texture size!";

		GL.bindTexture(GL.TEXTURE_2D, texture.texture);
		GL.texImage2DCanvas(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, canvas);

		texture.width = canvas.width;
		texture.height = canvas.height;
	}

}
