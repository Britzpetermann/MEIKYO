package kumite.musicdraw;

import haxe.rtti.Infos;

import reflect.Binding;

import bpmjs.Task;
import bpmjs.WorkerService;
import bpmjs.RoundtripSynchronizer;

import kumite.jpegservice.JPEGService;

class RasterEffectWorkerHandler implements Infos
{
	@Inject
	public var stage:GLStage;
	
	@Inject
	public var jpegService:JPEGService;
	
	@Inject
	public var analyzer:MusicAnalyzer;
	
	@Inject
	public var textureRegistry:GLTextureRegistry;
	
	public var texture:GLArrayTexture;

	var workerService:WorkerService;
	var roundtripSynchronizer:RoundtripSynchronizer;
	
	var paramLength:Float;
	var paramPosition:Float;
	
	var width:Int;
	var height:Int;
	
	var label:GLLabel;

	public function new()
	{
		width = Std.int(Math.pow(2, 8));
		height = width;
		
		paramLength = 1;
		paramPosition = 0;
		
		roundtripSynchronizer = new RoundtripSynchronizer();
		roundtripSynchronizer.targetMs = 1000 / 10;
	}
	
	public function createTexture()
	{
		texture = textureRegistry.createGLArrayTexture(width, height, GL.LINEAR);
		return texture;
	}
	
	public function start()
	{
		workerService = new WorkerService();
		workerService.debug = false;
		workerService.receiver = this;
		workerService.init("bin/kumite.musicdraw.RasterEffectWorker.js");
		
		workerService.call("init", [analyzer], loop);
		
		label = new GLLabel();
		label.x = 10;
		label.y = 75 + 60;
		label.width = 200;
		label.height = 20;
		stage.addChild(label);
				
		slider("paramLength", 100 + 60);
		slider("paramPosition", 120 + 60);
	}
	
	public function openImage()
	{
		var task = new JPEGTask();
		task.width = Std.int(Math.pow(2, 13)); 
		task.height = task.width; 
		task.paramLength = paramLength; 
		task.paramPosition = paramPosition; 
		task.jpegService = jpegService; 
		task.analyzer = analyzer;
		
		return task; 
	}		
	
	function loop()
	{
		label.text = roundtripSynchronizer.getInfo();
		
		workerService.call("config", [
			{
				paramLength:paramLength,
				paramPosition:paramPosition,
				width:width,
				height:height
			}
		]);
		
		roundtripSynchronizer.workStart();
		workerService.callTransfer("render", texture.array.buffer, handleRender);
	}
	
	function handleRender(buffer:ArrayBuffer)
	{
		roundtripSynchronizer.workComplete();
		
		texture.array = new Uint8Array(buffer);
		textureRegistry.updateGLArrayTexture(texture, GL.LINEAR_MIPMAP_LINEAR);
		
		roundtripSynchronizer.delay(loop);
	}
	
	function slider(field, y)
	{
		var binding = Binding.createForInstanceAndName(this, field);
		var sliderH = new GLSliderH();
		sliderH.min = 0;
		sliderH.max = 1;
		sliderH.value = binding.getValue();
		sliderH.x = 10;
		sliderH.y = y;
		sliderH.width = 200;
		sliderH.bind(binding);
		stage.addChild(sliderH);
	}
	
	function setProgress(progress:Float)
	{
	}
}

class JPEGTask extends Task<JPEGTask>
{
	public var jpegService:JPEGService;
	public var analyzer:MusicAnalyzer;
	public var paramLength:Float;
	public var paramPosition:Float;
	public var width:Int;
	public var height:Int;
	
	override public function doStart()
	{
		var workerService = new WorkerService();
		workerService.debug = false;
		workerService.receiver = {
			setProgress : function(progress:Float)
			{
				Log.info(Math.round(progress * 100) + "%");
			}
		};
		workerService.init("bin/kumite.musicdraw.RasterEffectWorker.js");
		
		workerService.call("init", [analyzer]);		
		workerService.call("config", [
			{
				paramLength:paramLength,
				paramPosition:paramPosition,
				width:width,
				height:height
			}
		]);
		
		workerService.callTransfer("render", new ArrayBuffer(width * height * 4), function(jpegBuffer:ArrayBuffer)
		{
			jpegService.compressAndSave(jpegBuffer, width, height, "image_" + Date.now().getTime() + ".jpg", complete);
			workerService.terminate();
		});
	}		
	
}