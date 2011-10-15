import js.Lib;

class GLTextureRegistry
{
	public var images : Hash<GLTexture>;

	public function new()
	{
		images = new Hash();
	}

	public function register(key : {textureId : String}, texture : GLTexture)
	{
		images.set(key.textureId, texture);
	}

	public function get(key : {textureId : String})
	{
		if (!images.exists(key.textureId))
		{
			throw "Cannot find Texture with key: " + key.textureId;
		}
		return images.get(key.textureId);
	}

	public function createGLTextureFromImage(image : Image, ?filter : Int = null)
	{
		var testPowerOfTwoWidth = Std.int(Math2.nextPowerOf2(image.width));
		var testPowerOfTwoHeight = Std.int(Math2.nextPowerOf2(image.height));
		if (testPowerOfTwoWidth != image.width || testPowerOfTwoHeight != image.height)
			throw "Image size must be a valid texture size!";
					
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

	public function createGLTextureFromCanvas(canvas : Canvas, ?filter : Int = null)
	{
		var testPowerOfTwoWidth = Std.int(Math2.nextPowerOf2(canvas.width));
		var testPowerOfTwoHeight = Std.int(Math2.nextPowerOf2(canvas.height));
		if (testPowerOfTwoWidth != canvas.width || testPowerOfTwoHeight != canvas.height)
			throw "Canvas size must be a valid texture size!";

		var texture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, texture);
		GL.texImage2DCanvas(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, canvas);
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
		result.width = canvas.width;
		result.height = canvas.height;
		result.texture = texture;

		return result;
	}

	public function updateGLTextureFromCanvas(texture : GLTexture, canvas : Canvas)
	{
		var testPowerOfTwoWidth = Std.int(Math2.nextPowerOf2(canvas.width));
		var testPowerOfTwoHeight = Std.int(Math2.nextPowerOf2(canvas.height));
		if (testPowerOfTwoWidth != canvas.width || testPowerOfTwoHeight != canvas.height)
			throw "Canvas size must be a valid texture size!";

		GL.bindTexture(GL.TEXTURE_2D, texture.texture);
		GL.texImage2DCanvas(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, canvas);

		texture.width = canvas.width;
		texture.height = canvas.height;
	}

}
