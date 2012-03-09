package kumite.musicdraw;

import haxe.rtti.Infos;

import reflect.Binding;

import bpmjs.WorkerService;
import bpmjs.RoundtripSynchronizer;

class SquareEffectWorkerHandler implements Infos
{
	@Inject
	public var textureRegistry:GLTextureRegistry;
	
	@Inject
	public var analyzer:MusicAnalyzer;
	
	@Inject
	public var stage:GLStage;
	
	public var texture:GLArrayTexture;

	var workerService:WorkerService;
	var rasterX:Int;
	
	var label:GLLabel;
	var roundtripSynchronizer:RoundtripSynchronizer;

	public function new()
	{
		rasterX = 0;
		roundtripSynchronizer = new RoundtripSynchronizer();
		roundtripSynchronizer.targetMs = 1000 / 60;
	}
	
	public function createTexture()
	{
		texture = textureRegistry.createGLArrayTexture(512, 1024, GL.LINEAR);
		return texture;
	}
	
	public function start()
	{
		workerService = new WorkerService();
		workerService.debug = false;
		workerService.init("bin/kumite.musicdraw.SquareEffectWorker.js");
		
		workerService.call("init", [analyzer], loop);
		
		var binding = Binding.createForInstanceAndName(this, "rasterX");
		var sliderH = new GLSliderH();
		sliderH.min = -200;
		sliderH.max = 200;
		sliderH.value = binding.getValue();
		sliderH.x = 10;
		sliderH.y = 100;
		sliderH.width = 200;
		sliderH.bind(binding);
		stage.addChild(sliderH);
				
		label = new GLLabel();
		label.text = "Huhu";
		label.x = 10;
		label.y = 75;
		label.width = 200;
		label.height = 20;
		stage.addChild(label);		
	}
	
	function loop()
	{
		label.text = roundtripSynchronizer.getInfo();
		
		roundtripSynchronizer.workStart();
		workerService.callTransfer("render", texture.array.buffer, handleRender);
	}
	
	function handleRender(buffer:ArrayBuffer)
	{
		roundtripSynchronizer.workComplete();
		
		texture.array = new Uint8Array(buffer);
		textureRegistry.updateGLArrayTexture(texture);
		
		roundtripSynchronizer.delay(loop);
	}
}
