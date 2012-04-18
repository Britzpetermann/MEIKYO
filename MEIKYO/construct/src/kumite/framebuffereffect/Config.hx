package kumite.framebuffereffect;

import UserAgentContext;

import kumite.spritemesh.SpriteMeshLayer;

import kumite.displaylist.DisplayListLayer;

import kumite.layer.effect.TestFilter;
import kumite.layer.effect.JuliaEffect;
import kumite.layer.effect.PlasmaEffect;
import kumite.layer.effect.CrosshatchFilter;
import kumite.layer.effect.RoadOfRibbonEffect;
import kumite.layer.effect.PostproFilter;
import kumite.layer.ColorLayer;
import kumite.layer.ClearLayer;
import kumite.layer.TestLayer;
import kumite.layer.Texture3DLayer;
import kumite.layer.Texture3DLayer2;
import kumite.layer.FramebufferEnableLayer;
import kumite.layer.FramebufferDisableLayer;

import kumite.scene.DefaultScene;

import haxe.rtti.Infos;
import kumite.layer.effect.E704Effect;

class Config implements Infos
{
	public static var TESTIMAGE_ATLAS : GLTextureAtlasConfig = GLTextureAtlasConfig.create(4096, 2048, GL.LINEAR_MIPMAP_NEAREST);
	public static var BBC = GLTextureAtlasPartConfig.create(TESTIMAGE_ATLAS, "data/image/bbc-hd-test-card.png");
		
	@Inject
	public var textureRegistry : GLTextureRegistry;
		
	@Inject
	public var displayListLayer : DisplayListLayer;
	
	public var colorLayer : ColorLayer;
	public var clearLayer : ClearLayer;
	
	
	public var framebufferEnableLayer1 : FramebufferEnableLayer;
	public var framebufferDisableLayer1 : FramebufferDisableLayer;
	public var juliaEffect : JuliaEffect;
	
	public var framebufferEnableLayer2 : FramebufferEnableLayer;
	public var framebufferDisableLayer2 : FramebufferDisableLayer;
	public var plasmaEffect : PlasmaEffect;
	
	public var framebufferEnableLayer3 : FramebufferEnableLayer;
	public var framebufferDisableLayer3 : FramebufferDisableLayer;
	public var colorLayer2 : ColorLayer;
	
	public var framebufferEnableLayer4 : FramebufferEnableLayer;
	public var framebufferDisableLayer4 : FramebufferDisableLayer;
	public var e704Effect : E704Effect;
	
	public var framebufferEnableLayer5 : FramebufferEnableLayer;
	public var framebufferDisableLayer5 : FramebufferDisableLayer;
	public var roadOfRibbonEffect : RoadOfRibbonEffect;
	
	public var postproFilter : PostproFilter;
	
	public var textureLayer1 : Texture3DLayer2;
	public var textureLayer2 : Texture3DLayer2;
	public var textureLayer3 : Texture3DLayer2;
	public var textureLayer4 : Texture3DLayer2;
	public var textureLayer5 : Texture3DLayer2;
	public var textureLayer6 : Texture3DLayer2;
	public var textureLayer7 : Texture3DLayer2;
	public var textureLayer8 : Texture3DLayer2;
	public var textureLayer9 : Texture3DLayer2;
	
	
	public var scene : DefaultScene;
	
	public function new()
	{
		clearLayer = new ClearLayer();
		
		colorLayer = new ColorLayer();
		colorLayer.transitions.enableChild("alpha");
		colorLayer.color = new Color(0, 0.0, 0.0, 1);
		
		framebufferEnableLayer1 = new FramebufferEnableLayer(512, 1024);
		framebufferDisableLayer1 = new FramebufferDisableLayer();
		juliaEffect = new JuliaEffect();
		
		framebufferEnableLayer2 = new FramebufferEnableLayer(256, 512);
		framebufferDisableLayer2 = new FramebufferDisableLayer();
		plasmaEffect = new PlasmaEffect();
		
		framebufferEnableLayer3 = new FramebufferEnableLayer(256, 256);
		framebufferDisableLayer3 = new FramebufferDisableLayer();
		colorLayer2 = new ColorLayer();
		colorLayer2.color = new Color(1, 0, 0, 1);
		
		framebufferEnableLayer4 = new FramebufferEnableLayer(1024, 1024);
		framebufferDisableLayer4 = new FramebufferDisableLayer();
		e704Effect = new E704Effect();
		
		framebufferEnableLayer5 = new FramebufferEnableLayer(256, 1024);
		framebufferDisableLayer5 = new FramebufferDisableLayer();
		roadOfRibbonEffect = new RoadOfRibbonEffect();
		
		postproFilter = new PostproFilter();
		postproFilter.textureConfig = framebufferEnableLayer1.textureConfig;
		
		//opposite wall
		textureLayer1 = new Texture3DLayer2();
		textureLayer1.textureConfig = framebufferEnableLayer1.textureConfig;
		textureLayer1.vertexes = new Float32Array([
			1330 - 18, 	40, 		-400,
			1630 - 20, 	40 - 10, 	0,
			1330,  		800, 		-400,
			1630,  		800 - 20, 	0,
		]);
		
		//left to mirror
		textureLayer2 = new Texture3DLayer2();
		textureLayer2.textureConfig = framebufferEnableLayer4.textureConfig;
		textureLayer2.vertexes = new Float32Array([
			625,  	0, 		0,
			1177,  	40, 		-450,
			633,  	1060, 	0,
			1180,  	1080, 	-450,
		]);
		textureLayer2.uvs = new Float32Array([
			0.01,  0.01,
			0.3,  0.01,
			0.01,  1,
			0.3,  1,
		]);
		
		//right to mirror
		textureLayer3 = new Texture3DLayer2();
		textureLayer3.textureConfig = framebufferEnableLayer4.textureConfig;
		var d = 290;
		textureLayer3.vertexes = new Float32Array([
			1650 - 10,  	50 + d, 		0,
			2020,  			50 + d - 10, 	-400,
			1650,  			1080 - 10, 	0,
			2020 + 10,  	1080, 		-400,
		]);
		textureLayer3.uvs = new Float32Array([
			0.7,  0.01,
			1,  0.01,
			0.7,  1,
			1,  1,
		]);
		
		textureLayer4 = new Texture3DLayer2();
		textureLayer4.textureConfig = framebufferEnableLayer2.textureConfig;
		textureLayer4.vertexes = new Float32Array([
			227,  	590, 		0,
			322,  	595, 		0,
			199,  	915, 		0,
			348,  	915, 		0,
		]);
		
		textureLayer5 = new Texture3DLayer2();
		textureLayer5.textureConfig = framebufferEnableLayer2.textureConfig;
		textureLayer5.vertexes = new Float32Array([
			64,  	538, 		0,
			152,  	545, 		0,
			37,  	835, 		0,
			174,  	845, 		0,
		]);
		
		textureLayer6 = new Texture3DLayer2();
		textureLayer6.textureConfig = framebufferEnableLayer3.textureConfig;
		textureLayer6.vertexes = new Float32Array([
			106,  	-10, 		0,
			111,  	-10, 		0,
			104,  	540, 	0,
			109,  	540, 	0,
		]);
		
		textureLayer7 = new Texture3DLayer2();
		textureLayer7.textureConfig = framebufferEnableLayer3.textureConfig;
		textureLayer7.vertexes = new Float32Array([
			106 + 168,  	-10, 		0,
			111 + 168,  	-10, 		0,
			104 + 168,  	590, 	0,
			109 + 168,  	590, 	0,
		]);
		
		//kitchen wall
		textureLayer8 = new Texture3DLayer2();
		textureLayer8.textureConfig = framebufferEnableLayer5.textureConfig;
		textureLayer8.vertexes = new Float32Array([
			350,  	108, 		0,
			510,  	100, 		190,
			350 + 5,  	1000, 		0,
			510 - 5 + 5,  	990, 		190,
		]);
		
		//door
		textureLayer9 = new Texture3DLayer2();
		textureLayer9.textureConfig = framebufferEnableLayer5.textureConfig;
		textureLayer9.vertexes = new Float32Array([
			502,  	130, 		0,
			590,  	100, 		50,
			504 + 5,  	1060, 		0,
			590 + 5,  	1050, 		50,
		]);
		
		
		scene = new DefaultScene("FB TEST");
	}
	
	@Complete
	public function complete()
	{
		scene.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene.addLayerLifecycle(colorLayer);
		
		scene.addLayerLifecycle(framebufferEnableLayer1);
		scene.addLayerLifecycle(juliaEffect);
		scene.addLayerLifecycle(postproFilter);
		scene.addLayerLifecycle(framebufferDisableLayer1);
		
		scene.addLayerLifecycle(framebufferEnableLayer2);
		scene.addLayerLifecycle(plasmaEffect);
		scene.addLayerLifecycle(framebufferDisableLayer2);
		
		scene.addLayerLifecycle(framebufferEnableLayer3);
		scene.addLayerLifecycle(colorLayer2);
		scene.addLayerLifecycle(framebufferDisableLayer3);
		
		scene.addLayerLifecycle(framebufferEnableLayer4);
		scene.addLayerLifecycle(e704Effect);
		scene.addLayerLifecycle(framebufferDisableLayer4);
		
		scene.addLayerLifecycle(framebufferEnableLayer5);
		scene.addLayerLifecycle(roadOfRibbonEffect);
		scene.addLayerLifecycle(framebufferDisableLayer5);
		
		scene.addLayerLifecycle(textureLayer1);
		scene.addLayerLifecycle(textureLayer2);
		scene.addLayerLifecycle(textureLayer3);
		scene.addLayerLifecycle(textureLayer4);
		scene.addLayerLifecycle(textureLayer5);
		scene.addLayerLifecycle(textureLayer6);
		scene.addLayerLifecycle(textureLayer7);
		scene.addLayerLifecycle(textureLayer8);
		scene.addLayerLifecycle(textureLayer9);
		
		scene.addLayerLifecycle(displayListLayer);
	}
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		group.add(new GLTextureAtlasLoadingTask(textureRegistry, TESTIMAGE_ATLAS));
		
		return group;
	}		
}
