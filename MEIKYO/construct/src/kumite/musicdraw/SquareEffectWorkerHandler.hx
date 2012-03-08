package kumite.musicdraw;

import haxe.rtti.Infos;

import reflect.Binding;

import bpmjs.WorkerRPC;

class SquareEffectWorkerHandler implements Infos
{
	@Inject
	public var textureRegistry:GLTextureRegistry;
	
	@Inject
	public var analyzer:MusicAnalyzer;
	
	@Inject
	public var stage:GLStage;
	
	public var texture:GLArrayTexture;

	var rasterX : Int;

	var workerRPC:WorkerRPC;
	
	public function new()
	{
		rasterX = 0;
	}
	
	public function createTexture()
	{
		texture = textureRegistry.createGLArrayTexture(512, 1024, GL.LINEAR);
		return texture;
	}
	
	public function start()
	{
		workerRPC = WorkerRPC.initForHandler(this, "bin/kumite.musicdraw.SquareEffectWorker.js");
		workerRPC.sendCommand("init", analyzer);
		
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
	}
	
	public function setResult(data:ArrayBuffer)
	{
		texture.array.set(new Uint8Array(data));
		textureRegistry.updateGLArrayTexture(texture);
		
		workerRPC.sendTransferableCommand("returnBuffer", data);
		workerRPC.sendCommand("setRasterX", rasterX);
		workerRPC.sendCommand("render");
	}
}
