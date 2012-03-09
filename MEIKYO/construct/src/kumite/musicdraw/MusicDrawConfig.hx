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

	@Inject
	public var stage : GLStage;

	public var analyzer : MusicAnalyzer;
	public var bandsReader:BandsReader;
	
	public var scene : DefaultScene;
	public var clearLayer : ClearLayer;
	
	public var squareLayer : TextureLayer;
	public var squareEffectWorkerHandler : SquareEffectWorkerHandler;
	
	public var rasterLayer : TextureLayer;
	public var rasterEffectWorkerHandler : RasterEffectWorkerHandler;
	
	public function new()
	{
		analyzer = new MusicAnalyzer();
		bandsReader = new BandsReader();
		
		clearLayer = new ClearLayer();
		clearLayer.color = new Color(0, 0, 0.0, 1);
		
		squareEffectWorkerHandler = new SquareEffectWorkerHandler();
		squareLayer = new TextureLayer();
		
		rasterEffectWorkerHandler = new RasterEffectWorkerHandler();
		rasterLayer = new TextureLayer();
		
		scene = new DefaultScene("MUSIC DRAW");
	}

	@Sequence("boot", "init")
	public function init()
	{
		scene.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene.addLayerLifecycle(squareLayer);
		scene.addLayerLifecycle(rasterLayer);
		scene.addLayerLifecycle(displayListLayer);
		
		squareLayer.texture = squareEffectWorkerHandler.createTexture();
		rasterLayer.texture = rasterEffectWorkerHandler.createTexture();
		
		var group = new bpmjs.SequencerTaskGroup();
		//group.add(bandsReader.read("data/bands/expo2000.json"));
		group.add(bandsReader.read("data/bands/wonderfulWord.json"));
		return group;
	}

	@Sequence("boot", "start")
	public function start()
	{
		//squareEffectWorkerHandler.start();
		rasterEffectWorkerHandler.start();
		
		var saveButton = new GLLabel();
		saveButton.mouseEnabled = true;
		saveButton.text = "Save";
		saveButton.x = 10;
		saveButton.y = 40;
		saveButton.width = 200;
		saveButton.height = 20;
		saveButton.mouseDownSignaler.bind(function(_)
		{
			rasterEffectWorkerHandler.openImage();
		});
		stage.addChild(saveButton);
	}
}