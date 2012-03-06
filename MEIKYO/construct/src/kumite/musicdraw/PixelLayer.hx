package kumite.musicdraw;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.scene.TransitionContext;
import kumite.scene.LayerState;
import kumite.scene.RenderContext;

import kumite.layer.LayerTransitions;
import kumite.layer.LayerTransition;

import kumite.projection.Projection;
import kumite.camera.Camera;
import kumite.stage.Stage;
import kumite.time.Time;

import haxe.rtti.Infos;

class PixelLayer implements LayerLifecycle, implements Infos
{
	@Inject
	public var time : Time;

	@Inject
	public var stage : Stage;

	public var transitions : LayerTransitions;
	public var alphaTransition : LayerTransition;

	var shaderProgram : WebGLProgram;

	public function new()
	{
		transitions = new LayerTransitions();
		transitions.add(alphaTransition = new LayerTransition("alpha"));
		transitions.enableChild("alpha");
	}

	public function init()
	{
		shaderProgram = GL.createProgram(Vertex, Fragment);
	}

	public function renderTransition(transitionContext : TransitionContext)
	{
		transitions.transition = transitionContext.transition;
		render(transitionContext);
	}

	public function render(renderContext : RenderContext)
	{
		GL.useProgram(shaderProgram);
		GL.viewport(0, 0, renderContext.width, renderContext.height);

		GL.disable(GL.DEPTH_TEST);
		GL.enable(GL.BLEND);
	}
}

@GLSL("

	attribute vec3 vertexPosition;

	uniform mat4 projectionMatrix;
	uniform mat4 worldViewMatrix;

	void main(void)
	{
		gl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 1.0);
		gl_PointSize = 1.0;
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
		precision highp float;
	#endif

	uniform float alpha;

	void main(void)
	{
		gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
	}

") private class Fragment {}
