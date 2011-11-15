package kumite.eyes;

import kumite.spritemesh.SpriteMeshLayer;

import kumite.displaylist.DisplayListLayer;

import kumite.layer.ColorLayer;
import kumite.layer.ClearLayer;
import kumite.layer.TestLayer;
import kumite.layer.TextureLayer;
import kumite.layer.Texture3DLayer;
import kumite.layer.FramebufferEnableLayer;
import kumite.layer.FramebufferDisableLayer;

import kumite.layer.effect.EyeEffect;

import kumite.scene.LayerLifecycle;
import kumite.scene.DefaultScene;

import haxe.rtti.Infos;

class Config implements Infos
{
	public static var EYE : GLTextureConfig = GLTextureConfig.create("data/image/eyes/EyesBG.png", GL.LINEAR); 
	public static var SHADOW : GLTextureConfig = GLTextureConfig.create("data/image/eyes/EyesShadow.png", GL.LINEAR); 
	public static var REFLECTION : GLTextureConfig = GLTextureConfig.create("data/image/eyes/Reflection.png", GL.LINEAR); 
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Inject
	public var displayListLayer : DisplayListLayer;
	
	public var clearLayer : ClearLayer;
	
	public var eyeLayers : Array<TextureLayer>;
	public var shadowLayer : TextureLayer;
	public var reflectionLayer : TextureLayer;
	
	public var framebuffer1EnableLayer : FramebufferEnableLayer;
	public var framebuffer1DisableLayer : FramebufferDisableLayer;
	
	public var framebuffer2EnableLayer : FramebufferEnableLayer;
	public var framebuffer2DisableLayer : FramebufferDisableLayer;
	
	public var framebuffer2RenderLayers : Array<EyeMaskLayer>;
	
	public var eyeEffects : Array<EyeEffect>;
	public var eyeBlocks : Array<EyeBlock>;
	
	public var scene1 : DefaultScene;
	
	public function new()
	{
		clearLayer = new ClearLayer();
		clearLayer.color = new Color(0, 0, 0, 1);

		shadowLayer = new TextureLayer();
		shadowLayer.scale = 2.0;
		shadowLayer.textureConfig = SHADOW;
				
		reflectionLayer = new TextureLayer();
		reflectionLayer.scale = 2.0;
		reflectionLayer.textureConfig = REFLECTION;
				
		framebuffer1EnableLayer = new FramebufferEnableLayer(512, 512);
		framebuffer1DisableLayer = new FramebufferDisableLayer();
				
		framebuffer2EnableLayer = new FramebufferEnableLayer(512, 512);
		framebuffer2DisableLayer = new FramebufferDisableLayer();
		
		eyeLayers = new Array();
		framebuffer2RenderLayers = new Array();
		eyeEffects = new Array();
		
		eyeBlocks = new Array();
		createBlock(-437, 84, 0.445);
		createBlock(-743.5, -93.5, 0.355);
		createBlock(-697.1, 155, 0.192);
		createBlock(-813, -470, 0.195);
		createBlock(-785.5, 308.5, 0.13);
		createBlock(289, 64, 0.36);
		createBlock(111.5, -63.5, 0.195);
		createBlock(458, -203, 0.455);
		createBlock(709, -384, 0.137);
		createBlock(-50.5, 127, 0.195);
		createBlock(791, -15.8, 0.328);
		createBlock(-131, 257.5, 0.316);
		createBlock(-568, 255.3, 0.13);
		createBlock(-446, 390, 0.19);
		createBlock(216, 338.5, 0.193);
		createBlock(622, 283.5, 0.132);
		
		for(eyeBlock in eyeBlocks)
		{
			var eyeLayer = new TextureLayer();
			eyeLayer.scale = Rand.float(1.2, 3.0);
			eyeLayer.textureConfig = EYE;
			eyeLayers.push(eyeLayer);
			
			var framebuffer2RenderLayer = new EyeMaskLayer();
			framebuffer2RenderLayer.scale = eyeBlock.scale;
			framebuffer2RenderLayer.position.x = eyeBlock.position.x;
			framebuffer2RenderLayer.position.y = eyeBlock.position.y;
			framebuffer2RenderLayer.blend = false;
			framebuffer2RenderLayer.textureConfig = framebuffer2EnableLayer.textureConfig;
			framebuffer2RenderLayers.push(framebuffer2RenderLayer);
			
			var eyeEffect = new EyeEffect();
			eyeEffect.position.x = framebuffer2RenderLayer.position.x;
			eyeEffect.position.y = framebuffer2RenderLayer.position.y;
			eyeEffect.offset = Rand.float(0, 6);
			eyeEffect.textureConfig = framebuffer1EnableLayer.textureConfig;
			eyeEffects.push(eyeEffect);
		}
				
		scene1 = new DefaultScene("EYES");
	}
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		group.add(new GLTextureLoadingTask(textureRegistry, EYE));
		group.add(new GLTextureLoadingTask(textureRegistry, SHADOW));
		group.add(new GLTextureLoadingTask(textureRegistry, REFLECTION));
		
		return group;
	}
		
	@Complete
	public function complete()
	{
		scene1.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		
		for(i in 0...eyeBlocks.length)
		{
			scene1.addLayerLifecycle(framebuffer1EnableLayer);
			scene1.addLayerLifecycle(eyeLayers[i]);
			scene1.addLayerLifecycle(framebuffer1DisableLayer);
			
			scene1.addLayerLifecycle(framebuffer2EnableLayer);
			scene1.addLayerLifecycle(clearLayer);
			scene1.addLayerLifecycle(eyeEffects[i]);
			scene1.addLayerLifecycle(shadowLayer);
			scene1.addLayerLifecycle(reflectionLayer);		
			scene1.addLayerLifecycle(framebuffer2DisableLayer);
			scene1.addLayerLifecycle(framebuffer2RenderLayers[i]);
		}
		
		scene1.addLayerLifecycle(displayListLayer);
	}
	
	function createBlock(x, y, scale)
	{
		var eyeBlock = new EyeBlock();
		eyeBlock.position.x = x;
		eyeBlock.position.y = y;
		eyeBlock.scale = scale;
		
		eyeBlocks.push(eyeBlock);
	}
}

class EyeBlock
{
	public var position : Vec2;
	public var scale : Float;
	
	public function new()
	{
		position = new Vec2();
	}
}