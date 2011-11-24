package kumite.effects;

import kumite.spritemesh.SpriteMeshLayer;

import kumite.displaylist.DisplayListLayer;

import kumite.layer.ColorLayer;
import kumite.layer.ClearLayer;
import kumite.layer.TestLayer;
import kumite.layer.TextureLayer;
import kumite.layer.Texture3DLayer;
import kumite.layer.FramebufferEnableLayer;
import kumite.layer.FramebufferDisableLayer;

import kumite.layer.effect.TestFilter;
import kumite.layer.effect.PostproFilter;
import kumite.layer.effect.CrosshatchFilter;
import kumite.layer.effect.PlasmaEffect;
import kumite.layer.effect.JuliaEffect;
import kumite.layer.effect.MetaTunnelEffect;
import kumite.layer.effect.NautilusEffect;
import kumite.layer.effect.KinderpainterEffect;
import kumite.layer.effect.RoadOfRibbonEffect;
import kumite.layer.effect.RoadOfRibbon2Effect;
import kumite.layer.effect.E704Effect;
import kumite.layer.effect.RippleFilter;
import kumite.layer.effect.RadialBlurFilter;

import kumite.scene.LayerLifecycle;
import kumite.scene.DefaultScene;

import haxe.rtti.Infos;

class Config implements Infos
{
	public static var IMAGE_1 : GLTextureConfig = GLTextureConfig.create("data/image/along-the-line.png"); 
	public static var IMAGE_2 : GLTextureConfig = GLTextureConfig.create("data/image/just-for-the-record-II-glow.png"); 
	public static var IMAGE_3 : GLTextureConfig = GLTextureConfig.create("data/image/kriskras_2048*2048.jpg"); 
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Inject
	public var displayListLayer : DisplayListLayer;
	
	public var clearLayer : ClearLayer;
	
	public var greyColorLayer : ColorLayer;
	public var image1Layer : TextureLayer;
	public var image2Layer : TextureLayer;
	public var image3Layer : TextureLayer;
	
	public var framebufferClearLayer : ClearLayer;
	
	public var framebufferEnableLayer : FramebufferEnableLayer;
	public var framebufferDisableLayer : FramebufferDisableLayer;
	public var framebufferRenderLayer : TextureLayer;
	
	public var framebuffer2EnableLayer : FramebufferEnableLayer;
	public var framebuffer2DisableLayer : FramebufferDisableLayer;
	public var framebuffer2RenderLayer : TextureLayer;
	
	public var framebuffer3EnableLayer : FramebufferEnableLayer;
	public var framebuffer3DisableLayer : FramebufferDisableLayer;
	public var framebuffer3RenderLayer : TextureLayer;
	
	public var testFilter : TestFilter;
	public var postproFilter : PostproFilter;
	public var postpro2Filter : PostproFilter;
	public var crosshatchFilter : CrosshatchFilter;
	public var plasmaEffect : PlasmaEffect;
	public var juliaEffect : JuliaEffect;
	public var metaTunnelEffect : MetaTunnelEffect;
	public var nautilusEffect : NautilusEffect;
	public var kinderpainterEffect : KinderpainterEffect;
	public var roadOfRibbonEffect : RoadOfRibbonEffect;
	public var roadOfRibbon2Effect : RoadOfRibbon2Effect;
	public var e704Effect : E704Effect;
	public var rippleFilter : RippleFilter;
	public var radialBlurFilter : RadialBlurFilter;
	
	public var scene13 : DefaultScene;
	public var scene12 : DefaultScene;
	public var scene11 : DefaultScene;
	public var scene10 : DefaultScene;
	public var scene9 : DefaultScene;
	public var scene8 : DefaultScene;
	public var scene7 : DefaultScene;
	public var scene6 : DefaultScene;
	public var scene5 : DefaultScene;
	public var scene4 : DefaultScene;
	public var scene3 : DefaultScene;
	public var scene2 : DefaultScene;
	public var scene1 : DefaultScene;
	
	public function new()
	{
		clearLayer = new ClearLayer();
		framebufferClearLayer = new ClearLayer();
		
		greyColorLayer = new ColorLayer();
		greyColorLayer.transitions.enableChild("alpha");
		greyColorLayer.color = new Color(0.5, 0.5, 0.5, 1);
		
		image1Layer = new TextureLayer();
		image1Layer.textureConfig = IMAGE_1;
				
		image2Layer = new TextureLayer();
		image2Layer.textureConfig = IMAGE_2;
				
		image3Layer = new TextureLayer();
		image3Layer.textureConfig = IMAGE_3;
				
		framebufferEnableLayer = new FramebufferEnableLayer(512, 512);
		framebufferDisableLayer = new FramebufferDisableLayer();
		framebufferRenderLayer = new TextureLayer();
		framebufferRenderLayer.scale = 1.0;
		framebufferRenderLayer.textureConfig = framebufferEnableLayer.textureConfig;
				
		framebuffer2EnableLayer = new FramebufferEnableLayer(512, 512);
		framebuffer2DisableLayer = new FramebufferDisableLayer();
		framebuffer2RenderLayer = new TextureLayer();
		framebuffer2RenderLayer.scale = 1.0;
		framebuffer2RenderLayer.textureConfig = framebuffer2EnableLayer.textureConfig;
				
		framebuffer3EnableLayer = new FramebufferEnableLayer(512, 512);
		framebuffer3DisableLayer = new FramebufferDisableLayer();
		framebuffer3RenderLayer = new TextureLayer();
		framebuffer3RenderLayer.scale = 1.0;
		framebuffer3RenderLayer.textureConfig = framebuffer3EnableLayer.textureConfig;
				
		testFilter = new TestFilter();
		testFilter.textureConfig = framebufferEnableLayer.textureConfig;
				
		postproFilter = new PostproFilter();
		postproFilter.textureConfig = framebufferEnableLayer.textureConfig;
		
		postpro2Filter = new PostproFilter();
		postpro2Filter.textureConfig = framebuffer3EnableLayer.textureConfig;
		
		crosshatchFilter = new CrosshatchFilter();
		crosshatchFilter.textureConfig = framebufferEnableLayer.textureConfig;
		
		plasmaEffect = new PlasmaEffect();
		juliaEffect = new JuliaEffect();
		metaTunnelEffect = new MetaTunnelEffect();
		nautilusEffect = new NautilusEffect();
		kinderpainterEffect = new KinderpainterEffect();
		roadOfRibbonEffect = new RoadOfRibbonEffect();
		roadOfRibbon2Effect = new RoadOfRibbon2Effect();
		e704Effect = new E704Effect();
		
		rippleFilter = new RippleFilter();
		rippleFilter.textureConfig = framebufferEnableLayer.textureConfig;
		
		radialBlurFilter = new RadialBlurFilter();
		radialBlurFilter.textureConfig = framebuffer2EnableLayer.textureConfig;
		
		scene1 = new DefaultScene("TEST EFFECT");
		scene2 = new DefaultScene("POSTPRO");
		scene3 = new DefaultScene("CROSSHATCH");
		scene4 = new DefaultScene("PLASMA");
		scene5 = new DefaultScene("JULIA");
		scene6 = new DefaultScene("METATUNNEL");
		scene7 = new DefaultScene("NAUTILUS");
		scene8 = new DefaultScene("KINDERPAINTER");
		scene9 = new DefaultScene("ROAD OF RIBBON");
		scene10 = new DefaultScene("704");
		scene11 = new DefaultScene("ROAD OF RIBBON 2");
		scene12 = new DefaultScene("RIPPLE");
		scene13 = new DefaultScene("RIPPLE BLUR");
	}
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		group.add(new GLTextureLoadingTask(textureRegistry, IMAGE_1));
		group.add(new GLTextureLoadingTask(textureRegistry, IMAGE_2));
		group.add(new GLTextureLoadingTask(textureRegistry, IMAGE_3));
		
		return group;
	}
		
	@Complete
	public function complete()
	{
		addFilter(scene1, testFilter, image1Layer);
		addFilter(scene2, postproFilter, image1Layer);
		addFilter(scene3, crosshatchFilter, image2Layer);
		addEffect(scene4, plasmaEffect);
		addEffect(scene5, juliaEffect);
		addEffect(scene6, metaTunnelEffect);
		addEffect(scene7, nautilusEffect);
		addEffect(scene8, kinderpainterEffect);
		addEffect(scene9, roadOfRibbonEffect);
		addEffect(scene10, e704Effect);
		addEffect(scene11, roadOfRibbon2Effect);
		addFilter2(scene12, rippleFilter, image3Layer);
		addFilter3(scene13, rippleFilter, radialBlurFilter, image3Layer);
	}
	
	function addFilter(scene : DefaultScene, layer : LayerLifecycle, textureLayer : LayerLifecycle)
	{
		scene.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene.addLayerLifecycle(framebufferEnableLayer);
		scene.addLayerLifecycle(framebufferClearLayer);
		scene.addLayerLifecycle(greyColorLayer);
		scene.addLayerLifecycle(textureLayer);
		scene.addLayerLifecycle(layer);
		scene.addLayerLifecycle(framebufferDisableLayer);
		scene.addLayerLifecycle(framebufferRenderLayer);
		scene.addLayerLifecycle(displayListLayer);
	}
	
	function addFilter2(scene : DefaultScene, layer : LayerLifecycle, textureLayer : LayerLifecycle)
	{
		scene.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene.addLayerLifecycle(framebufferEnableLayer);
		scene.addLayerLifecycle(framebufferClearLayer);
		scene.addLayerLifecycle(greyColorLayer);
		scene.addLayerLifecycle(textureLayer);
		scene.addLayerLifecycle(framebufferDisableLayer);
		
		scene.addLayerLifecycle(framebuffer2EnableLayer);
		scene.addLayerLifecycle(layer);
		scene.addLayerLifecycle(framebuffer2DisableLayer);
		scene.addLayerLifecycle(framebuffer2RenderLayer);
		scene.addLayerLifecycle(displayListLayer);
	}
	
	function addFilter3(scene : DefaultScene, layer : LayerLifecycle, layer2 : LayerLifecycle, textureLayer : LayerLifecycle)
	{
		scene.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene.addLayerLifecycle(framebufferEnableLayer);
		scene.addLayerLifecycle(framebufferClearLayer);
		scene.addLayerLifecycle(greyColorLayer);
		scene.addLayerLifecycle(textureLayer);
		scene.addLayerLifecycle(framebufferDisableLayer);
		
		scene.addLayerLifecycle(framebuffer2EnableLayer);
		scene.addLayerLifecycle(layer);
		scene.addLayerLifecycle(framebuffer2DisableLayer);
		
		scene.addLayerLifecycle(framebuffer3EnableLayer);
		scene.addLayerLifecycle(layer2);
		scene.addLayerLifecycle(postpro2Filter);
		scene.addLayerLifecycle(framebuffer3DisableLayer);
		scene.addLayerLifecycle(framebuffer3RenderLayer);
		
		scene.addLayerLifecycle(displayListLayer);
	}
	
	function addEffect(scene : DefaultScene, layer : LayerLifecycle)
	{
		scene.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene.addLayerLifecycle(framebufferEnableLayer);
		scene.addLayerLifecycle(framebufferClearLayer);
		scene.addLayerLifecycle(layer);
		scene.addLayerLifecycle(framebufferDisableLayer);
		scene.addLayerLifecycle(framebufferRenderLayer);
		scene.addLayerLifecycle(displayListLayer);
	}
}
