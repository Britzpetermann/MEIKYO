package kumite.spritemesh2;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.layer.LayerTransition;
import kumite.layer.LayerTransitions;
import kumite.scene.TransitionContext;
import kumite.stage.Stage;
import kumite.time.Time;
import kumite.projection.Projection;
import kumite.camera.Camera;

import haxe.rtti.Infos;

class SpriteMeshLayer implements LayerLifecycle, implements Infos
{
	public static var max : Int = 12000;
	
	@Inject
	public var stage : Stage;
	
	@Inject
	public var time : Time;
	
	@Inject
	public var projection : Projection;
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	public var layerId : String;
	
	public var transitions : LayerTransitions;
	public var alphaTransition : LayerTransition;
	
	var sprites : Array<Sprite>;
	
	var cameraMatrix : Matrix4;
	
	var shaderProgram : WebGLProgram;

	var vertexBuffer : Float32Array;
	var vertexPositionAttribute : GLAttribLocation;
	
	var vertexUVBuffer : Float32Array;
	var vertexUVAttribute : GLAttribLocation;
	
	var cubeVerticesIndexBuffer : WebGLBuffer;	
	var projectionMatrixUniform : GLUniformLocation;
	var viewMatrixUniform : GLUniformLocation;
	var alphaUniform : GLUniformLocation;
	var textureUniform : GLUniformLocation;
		
	public function new()
	{
		layerId = "SpriteMeshLayer2";

		cameraMatrix = new Matrix4();

		transitions = new LayerTransitions();
		transitions.add(alphaTransition = new LayerTransition("alpha"));
		transitions.enableChild("alpha");
		
		alphaTransition.ease = ease.Quad.easeInOut;
		
		sprites = new Array();
		for (i in  0...max)
		{
			var sprite = new Sprite();
			sprites.push(sprite);
		}
	}
	
	public function init()
	{
		shaderProgram = GL.createProgram(Vertex, Fragment);

		vertexBuffer = new Float32Array(max * 12);
		for (i in 0...max)
		{
			var j = i * 12;
			vertexBuffer[0 + j] = -1;
			vertexBuffer[1 + j] = -1;
			vertexBuffer[2 + j] = 0;
			
			vertexBuffer[3 + j] = 1;
			vertexBuffer[4 + j] = -1;
			vertexBuffer[5 + j] = 0;
			
			vertexBuffer[6 + j] = -1;
			vertexBuffer[7 + j] = 1;
			vertexBuffer[8 + j] = 0;
			
			vertexBuffer[9 + j] = 1;
			vertexBuffer[10 + j] = 1;
			vertexBuffer[11 + j] = 0;
		}
		
		vertexPositionAttribute = GL.getAttribLocation2("vertexPosition", 3, GL.FLOAT);
		vertexPositionAttribute.updateBuffer(vertexBuffer);
		
		vertexUVBuffer = new Float32Array(max * 8);
		for (i in 0...max)
		{
			var image = Config.BIER;
			var j = i * 8;
			vertexUVBuffer[0 + j] = image.u0;
			vertexUVBuffer[1 + j] = image.v1;
			
			vertexUVBuffer[2 + j] = image.u1;
			vertexUVBuffer[3 + j] = image.v1;
			
			vertexUVBuffer[4 + j] = image.u0;
			vertexUVBuffer[5 + j] = image.v0;
			
			vertexUVBuffer[6 + j] = image.u1;
			vertexUVBuffer[7 + j] = image.v0;
		}
		
		vertexUVAttribute = GL.getAttribLocation2("vertexUV", 2, GL.FLOAT);
		vertexUVAttribute.updateBuffer(vertexUVBuffer);
		
		cubeVerticesIndexBuffer = GL.createBuffer();  
  		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer); 	
		
		var elementIndexes = new Uint16Array(6 * max);
		
		for(i in 0...max)
		{
			var j = i * 6;
			var k = i * 4;
			elementIndexes[0 + j] = 0 + k;
			elementIndexes[1 + j] = 1 + k;
			elementIndexes[2 + j] = 2 + k;
			elementIndexes[3 + j] = 1 + k;
			elementIndexes[4 + j] = 3 + k;
			elementIndexes[5 + j] = 2 + k;
		}
		GL.bufferData(GL.ELEMENT_ARRAY_BUFFER,  elementIndexes, GL.STATIC_DRAW);  

		projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		alphaUniform = GL.getUniformLocation("alpha");
		textureUniform = GL.getUniformLocation("texture");
		
		cameraMatrix = new Matrix4();
		cameraMatrix.setLookAt(new Vec3(0, 0, 70), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
		transitions.transition = transitionContext.transition;
		render();
	}
	
	function orderByZ(s1 : Sprite, s2 : Sprite) : Int {
		var z1 = s1.getZ();
		var z2 = s2.getZ();
		if (z1 < z2)
			return -1;
		else if (z1 > z2)
			return 1;
		else
			return 0;	
	}	
		
	public function render()
	{
		GL.useProgram(shaderProgram);
		GL.viewport(0, 0, stage.width, stage.height);
		
		GL.disable(GL.DEPTH_TEST);
		GL.enable(GL.BLEND);
		GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
		

		var axis = new Vec3(1, 1, 1).normalize();
		var d = 50;
		for (i in 0...max)
		{
			var sprite = sprites[i];
			
			var m = sprite.matrix;
			m.setScale(1.1, 1.1, 1.1);
			m.appendRotation(time.ms / 1000 + i * 5, axis);
			m.appendTranslation(Math.sin(time.ms / 10700 + i * 3.442) * d, Math.cos(time.ms / 17800 + i * 3.443) * d, Math.cos(time.ms / 18000 - i * 3.441) * d);
			m.appendRotation(time.ms / 5000, axis);
			m.append(cameraMatrix);
			
			sprite.transform();
		}
		
		untyped __js__("this.sprites.sort(this.orderByZ)");
		
		var j = 0;
		for (i in 0...max)
		{
			var sprite = sprites[i];
			vertexBuffer[j++] = sprite.floats[0];
			vertexBuffer[j++] = sprite.floats[1];
			vertexBuffer[j++] = sprite.floats[2];
			vertexBuffer[j++] = sprite.floats[3];
			vertexBuffer[j++] = sprite.floats[4];
			vertexBuffer[j++] = sprite.floats[5];
			vertexBuffer[j++] = sprite.floats[6];
			vertexBuffer[j++] = sprite.floats[7];
			vertexBuffer[j++] = sprite.floats[8];
			vertexBuffer[j++] = sprite.floats[9];
			vertexBuffer[j++] = sprite.floats[10];
			vertexBuffer[j++] = sprite.floats[11];
		}
		
		vertexPositionAttribute.updateBuffer2(vertexBuffer);
		
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);  
		vertexPositionAttribute.vertexAttribPointer();
		vertexUVAttribute.vertexAttribPointer();

		projectionMatrixUniform.setMatrix4(projection.matrix);
		alphaUniform.setFloat(alphaTransition.transition);
		
		textureUniform.setTexture(textureRegistry.get(Config.TEST_ATLAS));
		
		GL.drawElements(GL.TRIANGLES, max * 6, GL.UNSIGNED_SHORT, 0);
	}
}

@GLSL("

	attribute vec3 vertexPosition;
	attribute vec2 vertexUV;

	uniform mat4 projectionMatrix;

	varying vec2 uv;
	varying vec3 v;

	void main(void)
	{
		uv = vertexUV;
		v = vertexPosition;
		gl_Position = projectionMatrix * vec4(vertexPosition, 1.0);
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
		precision highp float;
	#endif

	uniform sampler2D texture;
	uniform float alpha;

	varying vec2 uv;
	varying vec3 v;

	void main(void)
	{
		vec4 color = texture2D(texture, uv);
		gl_FragColor = color * vec4(1.0, 1.0, 1.0, alpha) - vec4(1.0, 1.0, 1.0, 0.0) * (cos(v.z / 100.0) - 1.0);
	}


") private class Fragment {}