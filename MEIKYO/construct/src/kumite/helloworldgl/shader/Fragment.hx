package kumite.helloworldgl.shader;
@GLSL("

	#ifdef GL_ES
		precision highp float;
	#endif

	uniform vec4 color;

	void main(void)
	{
		gl_FragColor = color;
	}

") class Fragment {}