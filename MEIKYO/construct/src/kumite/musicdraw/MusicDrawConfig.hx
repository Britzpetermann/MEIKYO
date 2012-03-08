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
	public var time : Time;

	public var scene : DefaultScene;
	
	public var clearLayer : ClearLayer;
	public var image1Layer : TextureLayer;
	
	public var bandsReader:BandsReader;
	
	public var analyzer : MusicAnalyzer;
	public var worker : TestWorkerHandler;
	
	public var rasterX : Int;
	
	var gltexture : GLArrayTexture;

	public function new()
	{
		analyzer = new MusicAnalyzer();
		bandsReader = new BandsReader();
		worker = new TestWorkerHandler();
		
		clearLayer = new ClearLayer();
		clearLayer.color = new Color(0, 0, 0.0, 1);
		image1Layer = new TextureLayer();
		
		rasterX = 3;
		
		scene = new DefaultScene("MUSIC DRAW");
	}

	@Sequence("boot", "init")
	public function init()
	{
		scene.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene.addLayerLifecycle(image1Layer);
		scene.addLayerLifecycle(displayListLayer);
		
		gltexture = textureRegistry.createGLArrayTexture(512, 1024, GL.LINEAR);
		image1Layer.texture = gltexture;
		
		worker.config = this;
		worker.texture = gltexture;
		worker.textureRegistry = textureRegistry;
		
		var group = new bpmjs.SequencerTaskGroup();
		group.add(bandsReader.read("data/bands/expo2000.json"));
		return group;
	}

	@Sequence("boot", "start")
	public function start()
	{
		worker.start();
		
		var stage = GLDisplayList.getDefault().stage;
		
		var classInfo = ClassInfo.forInstance(this);
		var binding = new Binding(this, classInfo.getProperty("rasterX"));
		
		var sliderH = new GLSliderH();
		sliderH.min = 1;
		sliderH.max = 10;
		sliderH.value = binding.getValue();
		sliderH.x = 100;
		sliderH.y = 100;
		sliderH.width = 200;
		sliderH.bind(binding);
		stage.addChild(sliderH);		
	}
	
	@Message
	public function tick(tick:Tick)
	{
		Log.info(rasterX);
		if (gltexture.isDirty)
		{
			textureRegistry.updateGLArrayTexture(gltexture);
			gltexture.isDirty = false;
		}
	}
}