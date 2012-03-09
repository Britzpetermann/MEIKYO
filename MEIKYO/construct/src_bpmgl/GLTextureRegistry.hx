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
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

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
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, filter != null ? filter : GL.NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, filter != null ? filter : GL.NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
		GL.texImage2DCanvas(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, canvas);

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
	public function createGLArrayTexture(width:Int, height:Int, ?filter : Int = null)
	{
		var testPowerOfTwoWidth = Std.int(Math2.nextPowerOf2(width));
		var testPowerOfTwoHeight = Std.int(Math2.nextPowerOf2(height));
		if (testPowerOfTwoWidth != width || testPowerOfTwoHeight != height)
			throw "Canvas size must be a valid texture size!";

		var array = new Uint8Array(width * height * 4);

		var texture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, texture);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, filter != null ? filter : GL.NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, filter != null ? filter : GL.NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
		GL.texImage2DArrayBufferView(GL.TEXTURE_2D, 0, GL.RGBA, width, height, 0, GL.RGBA, GL.UNSIGNED_BYTE, array);

		if (
			filter == GL.NEAREST_MIPMAP_NEAREST ||
			filter == GL.NEAREST_MIPMAP_LINEAR ||
			filter == GL.LINEAR_MIPMAP_NEAREST ||
			filter == GL.LINEAR_MIPMAP_LINEAR
			)
		{
			GL.generateMipmap(GL.TEXTURE_2D);
		}
		
		var result = new GLArrayTexture();
		result.width = width;
		result.height = height;
		result.texture = texture;
		result.array = array;

		return result;
	}

	public function updateGLArrayTexture(texture : GLArrayTexture, ?filter : Int = null)
	{
		GL.bindTexture(GL.TEXTURE_2D, texture.texture);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, filter != null ? filter : GL.NEAREST);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, filter != null ? filter : GL.NEAREST);
		
		GL.texImage2DArrayBufferView(GL.TEXTURE_2D, 0, GL.RGBA, texture.width, texture.height, 0, GL.RGBA, GL.UNSIGNED_BYTE, texture.array);
		
		if (
			filter == GL.NEAREST_MIPMAP_NEAREST ||
			filter == GL.NEAREST_MIPMAP_LINEAR ||
			filter == GL.LINEAR_MIPMAP_NEAREST ||
			filter == GL.LINEAR_MIPMAP_LINEAR
			)
		{
			GL.generateMipmap(GL.TEXTURE_2D);
		}
		
	}

}
