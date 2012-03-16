package kumite.musicdraw;

import haxe.rtti.Infos;

import reflect.Binding;

import bpmjs.ProgressMonitor;
import bpmjs.Task;
import bpmjs.WorkerService;
import bpmjs.RoundtripSynchronizer;

import kumite.jpegservice.JPEGService;

class EffectWorkerHandler implements Infos
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
	
	public var effectClassName:String;
	
	public var params:Parameters;

	var workerService:WorkerService;
	var roundtripSynchronizer:RoundtripSynchronizer;
	
	var width:Int;
	var height:Int;
	
	var panel:GLDisplayObjectContainer;
	var label:GLLabel;

	public function new()
	{
		params = new Parameters(); 
		roundtripSynchronizer = new RoundtripSynchronizer();
		roundtripSynchronizer.targetMs = 1000 / 10;
		
		width = Std.int(Math.pow(2, 10));
		height = width;
	}
	
	public function createTexture()
	{
		texture = textureRegistry.createGLArrayTexture(width, height, GL.LINEAR);
		return texture;
	}
	
	public function enter(_)
	{
		if (workerService == null)
		{
			workerService = new WorkerService();
			workerService.debug = false;
			workerService.receiver = this;
			workerService.init("bin/kumite.musicdraw.EffectWorker.js");
			
			workerService.call("init", [{effectClassName:effectClassName, analyzer:analyzer}], loop);
			
			panel = new GLDisplayObjectContainer();
			stage.addChild(panel);
			
			label = new GLLabel();
			label.x = 10;
			label.y = 75 + 60;
			label.width = 200;
			label.height = 20;
			panel.addChild(label);
			
			for(i in 0...params.params.length)
			{
				var param = params.params[i];
				slider(cast param, 160 + i * 20);
			}
		}
		else
		{
			panel.visible = true;
			workerService.resume();
		}
	}
	
	public function exit(_)
	{
		panel.visible = false;
		workerService.pause();
	}
	
	@Message
	public function handleSaveRequest(request:SaveRequest)
	{
		if (workerService == null || workerService.paused)
			return;
		
		var task = new JPEGTask();
		task.effectClassName = effectClassName;
		task.width = Std.int(Math.pow(2, 13)); 
		task.height = task.width; 
		task.params = createParams(); 
		task.jpegService = jpegService; 
		task.analyzer = analyzer;
		
		request.add(task); 
	}		
	
	function loop()
	{
		label.text = roundtripSynchronizer.getInfo();
		workerService.call("config", [createParams()]);
		
		roundtripSynchronizer.workStart();
		workerService.callTransfer("render", texture.array.buffer, handleRender);
	}
	
	function createParams()
	{
		var vo = {width:width, height:height};
			
		for(i in 0...params.params.length)
		{
			var param = params.params[i];
			Reflect.setField(vo, param.name, param.value);
		}
		return vo;		
	}
	
	function handleRender(buffer:ArrayBuffer)
	{
		roundtripSynchronizer.workComplete();
		
		texture.array = new Uint8Array(buffer);
		textureRegistry.updateGLArrayTexture(texture, GL.LINEAR_MIPMAP_LINEAR);
		
		roundtripSynchronizer.delay(loop);
	}
	
	function slider(parameter:ParameterFloat, y)
	{
		var binding = Binding.createForInstanceAndName(parameter, "value");
		var sliderH = new GLSliderH();
		sliderH.min = parameter.min;
		sliderH.max = parameter.max;
		sliderH.value = binding.getValue();
		sliderH.x = 10;
		sliderH.y = y;
		sliderH.width = 200;
		sliderH.bind(binding);
		panel.addChild(sliderH);
	}
	
	function setProgress(progress:Float)
	{
	}
}

class JPEGTask extends Task<JPEGTask>
{
	public var effectClassName:String;
	public var jpegService:JPEGService;
	public var analyzer:MusicAnalyzer;
	public var params:Dynamic;
	public var width:Int;
	public var height:Int;
	
	override public function doStart()
	{
		var createMonitor = new ProgressMonitor();
		var compressMonitor = new ProgressMonitor();
		monitor.append(createMonitor, 1);
		monitor.append(compressMonitor, 1);
		
		var workerService = new WorkerService();
		workerService.debug = false;
		workerService.receiver = {
			setProgress : function(progress:Float)
			{
				createMonitor.current = progress;
			}
		};
		workerService.init("bin/kumite.musicdraw.EffectWorker.js");
		
		workerService.call("init", [{effectClassName:effectClassName, analyzer:analyzer}]);
		params.width = width;		
		params.height = height;		
		workerService.call("config", [params]);
		
		workerService.callTransfer("render", new ArrayBuffer(width * height * 4), function(jpegBuffer:ArrayBuffer)
		{
			createMonitor.done();
			jpegService.compressAndSave(jpegBuffer, width, height, "image_" + Date.now().getTime() + ".jpg", complete, compressMonitor);
			workerService.terminate();
		});
	}		
	
}