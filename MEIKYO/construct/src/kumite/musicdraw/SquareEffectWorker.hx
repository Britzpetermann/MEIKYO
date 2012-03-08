package kumite.musicdraw;

import haxe.Timer;

import bpmjs.WorkerCommand;
import bpmjs.WorkerRPC;

class SquareEffectWorker
{
	var workerRPC:WorkerRPC;
	var effect:SquareEffect;
	
	static function main()
	{
		var instance = new SquareEffectWorker();
	}
	
	public function new()
	{
		workerRPC = WorkerRPC.initForWorker(this);
	}
	
	function init(analyzer:Dynamic)
	{
		Log.info("init called:" + analyzer.bands.length);
		
		effect = new SquareEffect();
		effect.analyzer = new MusicAnalyzer();
		effect.analyzer.bands = analyzer.bands;
		effect.init();

		render();
	}
	
	function returnBuffer(buffer:ArrayBuffer)
	{
		effect.texture.array = new Uint8Array(buffer);
	}
	
	function setRasterX(rasterX:Int)
	{
		effect.rasterX = rasterX;
	}
	
	function render()
	{
		effect.render();
		workerRPC.sendTransferableCommand("setResult", effect.texture.array.buffer);
	}
}
