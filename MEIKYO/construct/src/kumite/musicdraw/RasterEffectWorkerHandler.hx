package kumite.musicdraw;

import haxe.rtti.Infos;

import reflect.Binding;

import bpmjs.WorkerService;
import bpmjs.RoundtripSynchronizer;

class RasterEffectWorkerHandler implements Infos
{
	@Inject
	public var textureRegistry:GLTextureRegistry;
	
	@Inject
	public var analyzer:MusicAnalyzer;
	
	@Inject
	public var stage:GLStage;
	
	public var texture:GLArrayTexture;

	var workerService:WorkerService;
	var roundtripSynchronizer:RoundtripSynchronizer;
	
	var paramLength:Float;
	var paramPosition:Float;
	
	var width:Int;
	var height:Int;
	
	var imageWidth:Int;
	var imageHeight:Int;
	
	var label:GLLabel;
	var openImageState:Int;

	public function new()
	{
		openImageState = 0;
		
		width = Std.int(Math.pow(2, 10));
		height = width;
		
		imageWidth = Std.int(Math.pow(2, 13));
		imageHeight = imageWidth;
		
		paramLength = 1;
		paramPosition = 0;
		
		roundtripSynchronizer = new RoundtripSynchronizer();
		roundtripSynchronizer.targetMs = 1000 / 60;
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
		workerService.init("bin/kumite.musicdraw.RasterEffectWorker.js");
		
		workerService.call("init", [analyzer], loop);
		
		label = new GLLabel();
		label.text = "Huhu";
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
		if (openImageState == 0)
			openImageState = 1;
	}		
	
	function loop()
	{
		label.text = roundtripSynchronizer.getInfo();
		
		workerService.call("config", [
			{
				paramLength:paramLength,
				paramPosition:paramPosition,
				width:openImageState == 1 ? imageWidth : width,
				height:openImageState == 1 ? imageHeight: height
			}
		]);
		
		if (openImageState == 1)
		{
			var tempArray = new Uint8Array(imageWidth * imageHeight * 4);
			Log.info("temp: " + tempArray.length + " width:" + imageWidth + " height:" + imageHeight);
			workerService.callTransfer("render", tempArray.buffer, handleRender);
			openImageState = 2;
		}
		else
		{
			roundtripSynchronizer.workStart();
			workerService.callTransfer("render", texture.array.buffer, handleRender);
		}
	}
	
	function handleRender(buffer:ArrayBuffer)
	{
		if (openImageState == 2)
		{
			var array = new Uint8Array(buffer);
			Log.info("newBuffer: " + array.length);
			
			openImageState = 0;

			var g = new CanvasGraphic();
			g.width = imageWidth;			
			g.height = imageHeight;
			g.clear(new Color(0.3, 0.3, 0.3, 0.8));
			
			var imageData = g.context.getImageData(0, 0, g.width, g.height);
			Log.info(buffer.byteLength + " " + imageData.data.length);
			
			
			for(i in 0...buffer.byteLength)
				imageData.data[i] = array[i];
			
			var encoder = new JPEGEncoder(100);
			var jpgdata = encoder.encode(imageData);
			
			untyped
			{
				var bb = new WebKitBlobBuilder();
				var buffer = new Uint8Array(jpgdata.length); // allocates 8 bytes
				
				for(i in 0...jpgdata.length)
				{
					buffer[i] = jpgdata[i];
				}
				
				bb.append(buffer.buffer);
				var blob = bb.getBlob("example/binary");
				saveAs(blob, "image_" + Date.now().getTime() + ".jpg");
			}
			
			texture.array = new Uint8Array(width * height * 4);
			loop();
		}
		else
		{		
			roundtripSynchronizer.workComplete();
			
			texture.array = new Uint8Array(buffer);
			textureRegistry.updateGLArrayTexture(texture, GL.LINEAR_MIPMAP_LINEAR);
			
			roundtripSynchronizer.delay(loop);
		}
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
}
