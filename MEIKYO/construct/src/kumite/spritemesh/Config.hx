package kumite.spritemesh;

import kumite.layer.ClearLayer;
import kumite.layer.FramebufferEnableLayer;
import kumite.layer.FramebufferDisableLayer;
import kumite.layer.TextureLayer;
import kumite.layer.TestFilter;
import kumite.layer.TestFilter2;
import kumite.layer.CrosshatchFilter;

import kumite.scene.DefaultScene;
import kumite.displaylist.DisplayListLayer;

import haxe.rtti.Infos;

//TODO trace offset
//TODO navi transition input stack
class Config implements Infos
{
	public static var TEST_ATLAS : GLTextureAtlasConfig = GLTextureAtlasConfig.create(4096, 2048, GL.LINEAR_MIPMAP_NEAREST);
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
		
	@Inject
	public var displayListLayer : DisplayListLayer;
		
	public var clearLayer : ClearLayer;
	
	public var colorLayer : kumite.layer.ColorLayer;
	
	public var layer1 : SpriteMeshLayer;
	public var layer2 : SpriteMeshLayer;
	public var layer3 : SpriteMeshLayer;
	
	public var scene1 : DefaultScene;
	public var scene2 : DefaultScene;
	public var scene3 : DefaultScene;
	public var scene4 : DefaultScene;
	public var scene5 : DefaultScene;
	
	public var framebufferEnableLayer1 : FramebufferEnableLayer;
	public var framebufferDisableLayer1 : FramebufferDisableLayer;
	public var clearLayer1 : ClearLayer;
	public var textureLayer1 : TextureLayer;
	public var testFilter : TestFilter;
	public var testFilter2 : TestFilter2;
	public var crosshatchFilter : CrosshatchFilter;
		
	
	public function new()
	{
		clearLayer = new ClearLayer();
		
		colorLayer = new kumite.layer.ColorLayer();
		colorLayer.color = new Color(0.0, 0.0, 0.0, 1);
		colorLayer.transitions.enableChild("alpha");
		
		layer1 = new SpriteMeshLayer();
		layer1.offset = 0;
		layer1.textureFrequenceParam = 0.0000031;
		layer1.textureAmpParam = 304;
		
		layer2 = new SpriteMeshLayer();
		layer2.offset = 1000 * 20;
		layer2.textureFrequenceParam = 0.00001; 
		layer2.textureAmpParam = 305; 
		
		layer3 = new SpriteMeshLayer();
		layer3.offset = 0;
		layer3.textureFrequenceParam = 0.0000031; 
		layer3.textureAmpParam = 304; 
		
		scene1 = new DefaultScene("S 1");
		scene2 = new DefaultScene("S 2");
		scene3 = new DefaultScene("S 3");
		scene4 = new DefaultScene("S 3 CROSS");
		scene5 = new DefaultScene("S 3 RG");
		
		framebufferEnableLayer1 = new FramebufferEnableLayer(2048, 1024);
		framebufferDisableLayer1 = new FramebufferDisableLayer();
		clearLayer1 = new ClearLayer();
		clearLayer1.color = new Color(0.5, 0.5, 0.5, 1.0);
		textureLayer1 = new TextureLayer();
		textureLayer1.scale = 1.0;
		textureLayer1.textureConfig = framebufferEnableLayer1.textureConfig;
		
		testFilter = new TestFilter();
		testFilter.textureConfig = framebufferEnableLayer1.textureConfig;
				
		testFilter2 = new TestFilter2();
		testFilter2.textureConfig = framebufferEnableLayer1.textureConfig;
				
		crosshatchFilter = new CrosshatchFilter();
		crosshatchFilter.textureConfig = framebufferEnableLayer1.textureConfig;
	}
	
	@Complete
	public function complete()
	{
		scene1.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene1.addLayerLifecycle(colorLayer);
		scene1.addLayerLifecycle(layer1);
		scene1.addLayerLifecycle(displayListLayer);
		
		scene2.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene2.addLayerLifecycle(colorLayer);
		scene2.addLayerLifecycle(layer2);
		scene2.addLayerLifecycle(displayListLayer);
		
		scene3.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene3.addLayerLifecycle(colorLayer);
		scene3.addLayerLifecycle(framebufferEnableLayer1);
		scene3.addLayerLifecycle(clearLayer1);
		scene3.addLayerLifecycle(layer3);
		scene3.addLayerLifecycle(framebufferDisableLayer1);
		scene3.addLayerLifecycle(textureLayer1);
		scene3.addLayerLifecycle(displayListLayer);
		
		scene4.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene4.addLayerLifecycle(colorLayer);
		scene4.addLayerLifecycle(framebufferEnableLayer1);
		scene4.addLayerLifecycle(clearLayer1);
		scene4.addLayerLifecycle(layer3);
		scene4.addLayerLifecycle(crosshatchFilter);
		scene4.addLayerLifecycle(framebufferDisableLayer1);
		scene4.addLayerLifecycle(textureLayer1);
		scene4.addLayerLifecycle(displayListLayer);
		
		scene5.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene5.addLayerLifecycle(colorLayer);
		scene5.addLayerLifecycle(framebufferEnableLayer1);
		scene5.addLayerLifecycle(clearLayer1);
		scene5.addLayerLifecycle(layer3);
		scene5.addLayerLifecycle(testFilter2);
		scene5.addLayerLifecycle(framebufferDisableLayer1);
		scene5.addLayerLifecycle(textureLayer1);
		scene5.addLayerLifecycle(displayListLayer);
	}
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		for(i in 1...190)
		{
			var s = "" + i;
			while (s.length < 4)
				s = "0" + s;
			GLTextureAtlasPartConfig.create(TEST_ATLAS, "data/image/karlo/image" + s + ".png");
		}
		group.add(new GLTextureAtlasLoadingTask(textureRegistry, TEST_ATLAS));
		
		return group;
	}	
}
