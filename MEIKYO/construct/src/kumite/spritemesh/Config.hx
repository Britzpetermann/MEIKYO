package kumite.spritemesh;

import kumite.scene.DefaultScene;
import kumite.layer.ClearLayer;
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
		layer3.offset = 1000 * 30;
		layer3.textureFrequenceParam = 0.00002; 
		layer3.textureAmpParam = 39.4; 
		
		scene1 = new DefaultScene("SPRITES");
		scene2 = new DefaultScene("SPRITES");
		scene3 = new DefaultScene("SPRITES");
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
		scene3.addLayerLifecycle(layer3);
		scene3.addLayerLifecycle(displayListLayer);
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
