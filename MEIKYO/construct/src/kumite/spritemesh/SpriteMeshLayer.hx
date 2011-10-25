package kumite.spritemesh;

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
	public static var max : Int = 16000;
	
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
	
	@Param
	public var offset : Float;
	
	@Param
	public var textureFrequenceParam : Float;
	
	@Param
	public var textureAmpParam : Float;
	
	var sprites : Array<Sprite>;
	
	var cameraMatrix : Matrix4;
	
	var shaderProgram : WebGLProgram;

	var vertexBuffer : Float32Array;
	var vertexPositionAttribute : GLAttribLocation;
	
	var vertexUVBuffer : Float32Array;
	var vertexUVAttribute : GLAttribLocation;
	
	var vertexNormalBuffer : Float32Array;
	var vertexNormalAttribute : GLAttribLocation;
	
	var cubeVerticesIndexBuffer : WebGLBuffer;	
	var projectionMatrixUniform : GLUniformLocation;
	var alphaUniform : GLUniformLocation;
	var textureUniform : GLUniformLocation;
	
	var spriteRenderIndexes : Uint32Array;
	var spriteRenderIndexesCount : Int;
	
	var cameraMatrix2 : Matrix4;
		
	public function new()
	{
		offset = Rand.float(-1000 * 20, 1000 * 20);
		layerId = "SpriteMeshLayer2" + offset;
		
		spriteRenderIndexes = new Uint32Array(max);

		cameraMatrix = new Matrix4();

		transitions = new LayerTransitions();
		transitions.add(alphaTransition = new LayerTransition("alpha"));
		transitions.enableChild("alpha");
		
		alphaTransition.ease = ease.Quad.easeInOut;
		
		cameraMatrix2 = new Matrix4();
	}
	
	public function init()
	{
		sprites = new Array();
		for (i in  0...max)
		{
			var image = Config.TEST_ATLAS.parts[Std.int((Math.sin(i * textureFrequenceParam) + 1) * textureAmpParam + 0) % Config.TEST_ATLAS.parts.length];
			var sprite = new Sprite();
			sprite.image = image;
			sprites.push(sprite);
		}
		initGl();
	}
	
	public function renderTransition(transitionContext : TransitionContext)
	{
		transitions.transition = transitionContext.transition;
		render();
	}
	
	var timems : Float;
	
	public function render()
	{
		timems = time.ms * 0.15 + offset;
		
		renderGLInit();

		updateModel();
		updateIndexes();
		sortIndexes();
		
		updateBuffer();
		renderGL();
	}
	
	function renderGLInit()
	{
		GL.useProgram(shaderProgram);
		GL.viewport(0, 0, stage.width, stage.height);
		
		GL.disable(GL.DEPTH_TEST);
		GL.enable(GL.BLEND);
		GL.blendFunc(GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA);
		//GL.blendFunc(GL.SRC_ALPHA, GL.ONE);
	}
	
	static var axis = new Vec3(1, 1, 1).normalize();
	static var zAxis = new Vec3(0,0,1);
	
	function updateModel()
	{
		cameraMatrix2.setRotation(Math.sin(timems / 10000) * 0.4 + timems / 24000, axis);
		cameraMatrix2.appendAffine(cameraMatrix);

		var scaleAmplitudeTemp1 = (1 - alphaTransition.transition) * 1.35;
		var scaleAmplitude = (0.2 + scaleAmplitudeTemp1 * scaleAmplitudeTemp1 * scaleAmplitudeTemp1);
		
		var objectAmplitude1 = 30;
		var objectAmplitude2 = objectAmplitude1 / 3;
		var objectAmplitude3 = objectAmplitude1 / 2;
		
		for (i in 0...max)
		{
			var sprite = sprites[i];
			var m = sprite.matrix;
			
			var scale = (Math.sin(-timems / 2000 + i * 3.440) * scaleAmplitude + 0.7) * 1.1;
			m.setScale(scale, scale, scale);
			m.appendRotationZAffine(Math.sin(-timems / 10700 * 3.442 + i * 3.442) * 10);
			m.appendRotationAffine(-timems / 5000 + i * 3.440, axis);
			
			var tx = Math.sin(timems / 10700 + i * 3.442) * objectAmplitude1 + Math.cos(timems / 7000 - i * 3.439) * objectAmplitude2;
			var ty = Math.cos(timems / 17800 + i * 3.443) * objectAmplitude1;
			var tz = Math.cos(timems / 18000 - i * 3.441) * objectAmplitude1 + Math.cos(timems / 8000 - i * 3.440) * objectAmplitude3;
			m.appendTranslationAffine(tx, ty, tz);
			
			m.appendAffine(cameraMatrix2);
			
			sprite.transform();
		}
				
	}
	
	function updateIndexes()
	{
		spriteRenderIndexesCount = 0;
		for(i in 0...max)
		{
			var sprite = sprites[i];
			var D4 = -sprite.getZ();
			if (D4 > 0)
			{
				var D3 = D4 / 500;
				if (D3 > 1)
				{
					Log.warn(D3);
					D3 = 1;
				}
					
				var D10 = D3 * 0xFFFF;
				var D11 = Math.floor(D10);
				var D2 = D11 << 16;
				var D = D2 + i; 
				spriteRenderIndexes[spriteRenderIndexesCount] = D;
				spriteRenderIndexesCount++;
			}
		}
	}
	
	function sortIndexes()
	{
		quicksort(0, spriteRenderIndexesCount - 1);
	}
	
 	function quicksort( lo : Int, hi : Int ) : Void {
        var i = lo;
        var j = hi;
        var buf = spriteRenderIndexes;
        var p = buf[(lo+hi)>>1];
        while( i <= j ) {
            while( spriteRenderIndexes[i] > p ) i++;
            while( spriteRenderIndexes[j] < p ) j--;
            if( i <= j ) {
                var t = buf[i];
                buf[i++] = buf[j];
                buf[j--] = t;
            }
        }
        if( lo < j ) quicksort( lo, j );
        if( i < hi ) quicksort( i, hi );
    }	
	
	function updateBuffer()
	{
		var vi = 0;
		var ni = 0;
		var ti = 0;
		for (i in 0...spriteRenderIndexesCount)
		{
			var spriteIndex : Int = spriteRenderIndexes[i] & 0xffff;
			var sprite = sprites[spriteIndex];
			
			vertexBuffer[vi++] = sprite.vertexes[0];
			vertexBuffer[vi++] = sprite.vertexes[1];
			vertexBuffer[vi++] = sprite.vertexes[2];
			vertexBuffer[vi++] = sprite.vertexes[3];
			vertexBuffer[vi++] = sprite.vertexes[4];
			vertexBuffer[vi++] = sprite.vertexes[5];
			vertexBuffer[vi++] = sprite.vertexes[6];
			vertexBuffer[vi++] = sprite.vertexes[7];
			vertexBuffer[vi++] = sprite.vertexes[8];
			vertexBuffer[vi++] = sprite.vertexes[9];
			vertexBuffer[vi++] = sprite.vertexes[10];
			vertexBuffer[vi++] = sprite.vertexes[11];
			
			vertexNormalBuffer[ni++] = sprite.normals[0];
			vertexNormalBuffer[ni++] = sprite.normals[1];
			vertexNormalBuffer[ni++] = sprite.normals[2];
			vertexNormalBuffer[ni++] = sprite.normals[0];
			vertexNormalBuffer[ni++] = sprite.normals[1];
			vertexNormalBuffer[ni++] = sprite.normals[2];
			vertexNormalBuffer[ni++] = sprite.normals[0];
			vertexNormalBuffer[ni++] = sprite.normals[1];
			vertexNormalBuffer[ni++] = sprite.normals[2];
			vertexNormalBuffer[ni++] = sprite.normals[0];
			vertexNormalBuffer[ni++] = sprite.normals[1];
			vertexNormalBuffer[ni++] = sprite.normals[2];
			
			vertexUVBuffer[ti++] = sprite.image.u0;
			vertexUVBuffer[ti++] = sprite.image.v1;
			vertexUVBuffer[ti++] = sprite.image.u1;
			vertexUVBuffer[ti++] = sprite.image.v1;
			vertexUVBuffer[ti++] = sprite.image.u0;
			vertexUVBuffer[ti++] = sprite.image.v0;
			vertexUVBuffer[ti++] = sprite.image.u1;
			vertexUVBuffer[ti++] = sprite.image.v0;
		}
	}
	
	function renderGL()
	{
		vertexUVAttribute.updateBuffer3(vertexUVBuffer);
		vertexPositionAttribute.updateBuffer3(vertexBuffer);
		vertexNormalAttribute.updateBuffer3(vertexNormalBuffer);
		
		vertexNormalAttribute.vertexAttribPointer();
		vertexPositionAttribute.vertexAttribPointer();
		vertexUVAttribute.vertexAttribPointer();

		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
		  
		projectionMatrixUniform.setMatrix4(projection.matrix);
		
		alphaUniform.setFloat(alphaTransition.transition);
		
		textureUniform.setTexture(textureRegistry.get(Config.TEST_ATLAS));
		
		GL.drawElements(GL.TRIANGLES, spriteRenderIndexesCount * 6, GL.UNSIGNED_SHORT, 0);
		//GL.drawElements(GL.TRIANGLES, 1 * 6, GL.UNSIGNED_SHORT, 0);
	}
	
	function initGl()
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
		vertexPositionAttribute.updateBuffer(vertexBuffer, GL.STREAM_DRAW);
		
		vertexNormalBuffer = new Float32Array(max * 12);
		for (i in 0...max)
		{
			var j = i * 12;
			vertexNormalBuffer[0 + j] = -1;
			vertexNormalBuffer[1 + j] = -1;
			vertexNormalBuffer[2 + j] = 0;
			
			vertexNormalBuffer[3 + j] = 1;
			vertexNormalBuffer[4 + j] = -1;
			vertexNormalBuffer[5 + j] = 0;
			
			vertexNormalBuffer[6 + j] = -1;
			vertexNormalBuffer[7 + j] = 1;
			vertexNormalBuffer[8 + j] = 0;
			
			vertexNormalBuffer[9 + j] = 1;
			vertexNormalBuffer[10 + j] = 1;
			vertexNormalBuffer[11 + j] = 0;
		}
		
		vertexNormalAttribute = GL.getAttribLocation2("vertexNormal", 3, GL.FLOAT);
		vertexNormalAttribute.updateBuffer(vertexNormalBuffer, GL.STREAM_DRAW);
		
		vertexUVBuffer = new Float32Array(max * 8);
		for (i in 0...max)
		{
			var image = Config.TEST_ATLAS.parts[i % Config.TEST_ATLAS.parts.length];
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
		vertexUVAttribute.updateBuffer(vertexUVBuffer, GL.STREAM_DRAW);
		
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
		cameraMatrix.setLookAt(new Vec3(0, 0, 80), new Vec3(0, 0, 0), new Vec3(0, 1, 0));		
	}
}

@GLSL("

	attribute vec3 vertexPosition;
	attribute vec3 vertexNormal;
	attribute vec2 vertexUV;

	uniform mat4 projectionMatrix;

	uniform float alpha;

	varying vec2 uv;
	varying vec3 vertex;
	varying float light;

	void main(void)
	{
		uv = vertexUV;
		vertex = vertexPosition;
		gl_Position = projectionMatrix * vec4(vertexPosition - vec3(0.0, 0.0, (1.0 - alpha) * 7.0), 1.0);

		vec3 normalRot = normalize(vertexPosition - vertexNormal);
		vec3 lightDir = normalize(vertexPosition - vec3(0.0, 0.0, -30.0));
		float diffuse = clamp(dot(normalRot, lightDir) * -1.0, -1.0, 1.0);
		vec3 viewDir = normalize(vec3(0.0, 0.0, 0.0) - vertexPosition);

		vec3 h1 = normalize(lightDir + viewDir);
		float specular1 = clamp(pow(dot(normalRot, h1), 30.0), 0.0, 1.0);

		light = clamp((0.5 + (diffuse * 1.3 + specular1 * 1.5)), 0.1, 100.0) * alpha * 0.8;
	}

") private class Vertex {}

@GLSL("

	#ifdef GL_ES
		precision highp float;
	#endif

	uniform sampler2D texture;
	uniform float alpha;

	varying vec2 uv;
	varying vec3 vertex;
	varying float light;

	void main(void)
	{
		vec4 color = texture2D(texture, uv);
		gl_FragColor = color * light;
	}


") private class Fragment {}