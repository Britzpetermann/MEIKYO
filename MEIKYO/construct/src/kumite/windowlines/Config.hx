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

import kumite.layer.effect.PlasmaEffect;

import kumite.scene.LayerLifecycle;
import kumite.scene.DefaultScene;

import haxe.rtti.Infos;

class Config implements Infos
{
	public static var STRIPE_ATLAS : GLTextureAtlasConfig = GLTextureAtlasConfig.create(2048, 2048, GL.LINEAR);
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Inject
	public var displayListLayer : DisplayListLayer;
	
	public var scene1 : DefaultScene;
	public var clearLayer : ClearLayer;
	public var linesLayer : LinesLayer;
	
	public var linesEnableLayer : FramebufferEnableLayer;
	public var linesDisableLayer : FramebufferDisableLayer;
	public var linesRenderLayer : TextureLayer;
	
	
	public function new()
	{
		clearLayer = new ClearLayer();
		clearLayer.color = new Color(0, 0, 0, 1);
		
		linesEnableLayer = new FramebufferEnableLayer(2048 * 2, 1024 * 2);
		linesDisableLayer = new FramebufferDisableLayer();
		linesRenderLayer = new TextureLayer();
		linesRenderLayer.blend = false;
		linesRenderLayer.scale = 0.5;
		linesRenderLayer.flipY = true;
		linesRenderLayer.textureConfig = linesEnableLayer.textureConfig;
		
		linesLayer = new LinesLayer();

		scene1 = new DefaultScene("LINES");
	}
	
	@Complete
	public function complete()
	{
		scene1.addLayerLifecycle(linesEnableLayer);
		scene1.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
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
}