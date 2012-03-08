package kumite.musicdraw;

import haxe.rtti.Infos;

import reflect.ClassInfo;
import reflect.Binding;

import kumite.displaylist.DisplayListLayer;
import kumite.scene.DefaultScene;
import kumite.layer.ClearLayer;
import kumite.layer.TextureLayer;
import kumite.time.Tick;
import kumite.time.Time;


class MusicDrawConfig implements Infos
{
	@Inject
	public var displayListLayer : DisplayListLayer;

	@Inject
	public var textureRegistry : GLTextureRegistry;

	public var analyzer : MusicAnalyzer;
	public var bandsReader:BandsReader;
	
	public var scene : DefaultScene;
	public var clearLayer : ClearLayer;
	
	public var image1Layer : TextureLayer;
	public var squareEffectWorkerHandler : SquareEffectWorkerHandler;
	
	public function new()
	{
		analyzer = new MusicAnalyzer();
		bandsReader = new BandsReader();
		
		squareEffectWorkerHandler = new SquareEffectWorkerHandler();
		
		clearLayer = new ClearLayer();
		clearLayer.color = new Color(0, 0, 0.0, 1);
		image1Layer = new TextureLayer();
		
		scene = new DefaultScene("MUSIC DRAW");
	}

	@Sequence("boot", "init")
	public function init()
	{
		scene.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene.addLayerLifecycle(image1Layer);
		scene.addLayerLifecycle(displayListLayer);
		
		image1Layer.texture = squareEffectWorkerHandler.createTexture();
		
		var group = new bpmjs.SequencerTaskGroup();
		group.add(bandsReader.read("data/bands/expo2000.json"));
		return group;
	}

	@Sequence("boot", "start")
	public function start()
	{
		squareEffectWorkerHandler.start();
	}
}