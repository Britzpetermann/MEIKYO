package kumite.windowlines;

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
import kumite.layer.effect.JuliaEffect;

import kumite.layer.effect.PlasmaEffect;

import kumite.scene.LayerLifecycle;
import kumite.scene.DefaultScene;

import haxe.rtti.Infos;

class Config implements Infos
{
	public static var STRIPE_ATLAS : GLTextureAtlasConfig = GLTextureAtlasConfig.create(2048, 2048, GL.LINEAR);
	
	public static var INFO : GLTextureConfig = GLTextureConfig.create("data/image/stripes/Dance.png", GL.LINEAR);
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Inject
	public var displayListLayer : DisplayListLayer;
	
	public var scene1 : DefaultScene;
	public var clearLayer : ClearLayer;
	public var linesLayer : LinesLayer;
	
	public var linesEnableLayer : FramebufferEnableLayer;
	public var linesDisableLayer : FramebufferDisableLayer;
	public var linesRenderLayer : LinesTextureLayer;
	
	public var infoLayer : TextureLayer;
	public var plasmaEffect : PlasmaEffect;
	public var juliaEffect : JuliaEffect;
	
	public function new()
	{
		clearLayer = new ClearLayer();
		clearLayer.color = new Color(0, 0, 0.20, 1);
		
		linesEnableLayer = new FramebufferEnableLayer(2048 * 2, 1024 * 2);
		linesDisableLayer = new FramebufferDisableLayer();
		linesRenderLayer = new LinesTextureLayer();
		linesRenderLayer.blend = false;
		linesRenderLayer.scale = 0.69;
		linesRenderLayer.flipY = true;
		linesRenderLayer.textureConfig = linesEnableLayer.textureConfig;
		
		linesLayer = new LinesLayer();
		
		infoLayer = new TextureLayer();
		infoLayer.scale = 0.5;
		infoLayer.position.x = 1400;
		infoLayer.position.y = 670;
		infoLayer.textureConfig = INFO;
		
		plasmaEffect = new PlasmaEffect();
		juliaEffect = new JuliaEffect();
		
		scene1 = new DefaultScene("LINES");
	}
	
	@Complete
	public function complete()
	{
		scene1.addLayerLifecycle(linesEnableLayer);
		scene1.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		//scene1.addLayerLifecycle(infoLayer);
		//scene1.addLayerLifecycle(plasmaEffect);
		//scene1.addLayerLifecycle(juliaEffect);
		scene1.addLayerLifecycle(linesLayer);
		scene1.addLayerLifecycle(linesDisableLayer);
		scene1.addLayerLifecycle(linesRenderLayer);
		scene1.addLayerLifecycle(displayListLayer);
	}
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		for(i in 1...20)
		{
			GLTextureAtlasPartConfig.create(STRIPE_ATLAS, "data/image/stripes/Stripe" + i + ".png");
		}
		group.add(new GLTextureAtlasLoadingTask(textureRegistry, STRIPE_ATLAS));
		
		return group;
	}
	
	@Sequence("boot", "startPrepare")
	public function startPrepare2()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		group.add(new GLTextureLoadingTask(textureRegistry, INFO));
		
		return group;
	}	
}