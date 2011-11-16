package kumite.eyes;

import kumite.spritemesh.SpriteMeshLayer;

import kumite.displaylist.DisplayListLayer;

import kumite.layer.ColorLayer;
import kumite.layer.ClearLayer;
import kumite.layer.TestLayer;
import kumite.layer.TextureLayer;
import kumite.layer.TextureHSLLayer;
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
	
	public var eyeLayers : Array<TextureHSLLayer>;
	public var shadowLayer : TextureLayer;
	public var reflectionLayer : TextureLayer;
	
	public var framebuffer1EnableLayer : FramebufferEnableLayer;
	public var framebuffer1DisableLayer : FramebufferDisableLayer;
	
	public var framebufferPostproEnableLayer : FramebufferEnableLayer;
	public var framebufferPostproDisableLayer : FramebufferDisableLayer;
	public var postproFilters : Array<EyePostproFilter>;
	
	public var framebuffer2EnableLayer : FramebufferEnableLayer;
	public var framebuffer2DisableLayer : FramebufferDisableLayer;
	public var eyeMaskLayers : Array<EyeMaskLayer>;
	
	public var eyeEffects : Array<EyeEffect>;
	public var eyeBlocks : Array<EyeBlock>;
	
	public var scene1 : DefaultScene;
	
	public function new()
	{
		clearLayer = new ClearLayer();
		clearLayer.color = new Color(0, 0, 0, 1);

		shadowLayer = new TextureLayer();
		shadowLayer.scale = 2.05;
		shadowLayer.textureConfig = SHADOW;
				
		reflectionLayer = new TextureLayer();
		reflectionLayer.scale = 3.0;
		reflectionLayer.textureConfig = REFLECTION;
				
		framebuffer1EnableLayer = new FramebufferEnableLayer(512, 512);
		framebuffer1DisableLayer = new FramebufferDisableLayer();
		
		framebufferPostproEnableLayer = new FramebufferEnableLayer(512, 512);
		framebufferPostproDisableLayer = new FramebufferDisableLayer();
		
		framebuffer2EnableLayer = new FramebufferEnableLayer(512, 512);
		framebuffer2DisableLayer = new FramebufferDisableLayer();
		
		eyeLayers = new Array();
		eyeMaskLayers = new Array();
		eyeEffects = new Array();
		postproFilters = new Array();
		
		eyeBlocks = new Array();
		createBlock(-437, 84, 0.445);
		createBlock(289, 64, 0.36);
		createBlock(-813, -470, 0.195);
		createBlock(-743.5, -93.5, 0.355);
		createBlock(-697.1, 155, 0.192);
		createBlock(-785.5, 308.5, 0.13);
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
		/*
		 */
		
		var colors : Array<Vec3> = new Array();
		colors.push(new Vec3(0, 0, 0));
		colors.push(new Vec3(0,-10, 0));
		colors.push(new Vec3(0.2, 0, 0));
		colors.push(new Vec3(-0.2, 0, 0));
		colors.push(new Vec3(0.4, 0, 0));
		colors.push(new Vec3(-0.4, 0, 0));
		
		for(eyeBlock in eyeBlocks)
		{
			var postproFilter = new EyePostproFilter();
			postproFilter.eyePosition.x = eyeBlock.position.x;
			postproFilter.eyePosition.y = eyeBlock.position.y;
			postproFilter.textureConfig = framebuffer1EnableLayer.textureConfig;
			postproFilters.push(postproFilter);
			
			var eyeLayer = new TextureHSLLayer();
			eyeLayer.colors = colors;
			eyeLayer.eyePosition.x = eyeBlock.position.x;
			eyeLayer.eyePosition.y = eyeBlock.position.y;
			eyeLayer.mixChance = Rand.float(0.01, 0.001);
			eyeLayer.mixSpeed = Rand.float(0.05, 0.005);
			eyeLayer.scale = Rand.float(1.2, 1.5);
			eyeLayer.textureConfig = EYE;
			eyeLayers.push(eyeLayer);
			
			var eyeMaskLayer = new EyeMaskLayer();
			eyeMaskLayer.scale = eyeBlock.scale;
			eyeMaskLayer.position.x = eyeBlock.position.x;
			eyeMaskLayer.position.y = eyeBlock.position.y;
			eyeMaskLayer.blend = false;
			eyeMaskLayer.textureConfig = framebuffer2EnableLayer.textureConfig;
			eyeMaskLayers.push(eyeMaskLayer);
			
			var eyeEffect = new EyeEffect();
			eyeEffect.position.x = eyeMaskLayer.position.x;
			eyeEffect.position.y = eyeMaskLayer.position.y;
			eyeEffect.offset = Rand.float(0, 6);
			//eyeEffect.textureConfig = framebuffer1EnableLayer.textureConfig;
			eyeEffect.textureConfig = framebufferPostproEnableLayer.textureConfig;
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
			
			scene1.addLayerLifecycle(framebufferPostproEnableLayer);
			scene1.addLayerLifecycle(postproFilters[i]);
			scene1.addLayerLifecycle(framebufferPostproDisableLayer);
			
			scene1.addLayerLifecycle(framebuffer2EnableLayer);
			scene1.addLayerLifecycle(clearLayer);
			scene1.addLayerLifecycle(eyeEffects[i]);
			scene1.addLayerLifecycle(shadowLayer);
			scene1.addLayerLifecycle(reflectionLayer);		
			scene1.addLayerLifecycle(framebuffer2DisableLayer);
			
			scene1.addLayerLifecycle(eyeMaskLayers[i]);
		}
		
		scene1.addLayerLifecycle(displayListLayer);
	}
	
	function createBlock(x : Float, y : Float, scale)
	{
		var eyeBlock = new EyeBlock();
		eyeBlock.position.x = x * -1;
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
