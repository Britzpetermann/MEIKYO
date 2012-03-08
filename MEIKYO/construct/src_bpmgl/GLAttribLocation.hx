import WebGLRenderingContext;

class GLAttribLocation
{
	public var location : Float;
	public var size : GLint;
	public var type : GLenum;
	public var buffer : WebGLBuffer;
	public var currentLength : Float;

	public function new(){}

	public function updateBuffer(arrayBufferView : ArrayBufferView, ?type : GLenum = GL.STATIC_DRAW)
	{
		if (buffer != null)
			GL.deleteBuffer(buffer);

		currentLength = arrayBufferView.byteLength;
		buffer = GL.createArrayBuffer(arrayBufferView, type);
	}

	public function updateBuffer2(arrayBufferView : ArrayBufferView, ?type : GLenum = GL.STATIC_DRAW)
	{
		GL.bindBuffer(GL.ARRAY_BUFFER, buffer);
		GL.bufferData(GL.ARRAY_BUFFER, arrayBufferView, type);
	}

	public function updateBuffer3(arrayBufferView : ArrayBufferView)
	{
		GL.bindBuffer(GL.ARRAY_BUFFER, buffer);
		GL.bufferSubData(GL.ARRAY_BUFFER, 0, arrayBufferView);
	}

	public function vertexAttribPointer()
	{
		GL.bindBuffer(GL.ARRAY_BUFFER, buffer);
		GL.enableVertexAttribArray(location);
		GL.vertexAttribPointer(location, size, type, false, 0, 0);
	}

	public function drawArrays(mode : GLenum, ?first : GLint = 0, ?count : GLsizei = null)
	{
		if (count == null)
		{
			count = currentLength / size;
			if (type == GL.FLOAT)
				count /= 4;
		}
		GL.drawArrays(mode, first, count);
	}
}
