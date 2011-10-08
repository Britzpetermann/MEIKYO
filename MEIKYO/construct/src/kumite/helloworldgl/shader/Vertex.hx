package kumite.helloworldgl.shader;
@GLSL("

	attribute vec2 vertexPosition;

	uniform mat4 projectionMatrix;
	uniform mat4 worldViewMatrix;

	varying vec4 vertex;

	void main(void)
	{
		gl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);
		vertex = vec4(vertexPosition, 0.0, 1.0);
	}

") class Vertex {}