package kumite.musicdraw;

import haxe.Timer;

import bpmjs.WorkingInstance;

class RasterEffectWorker
{
	var effect:RasterEffect;
	
	static function main()
	{
		Log.init();
		new WorkingInstance(new RasterEffectWorker());
	}
	
	function new()
	{
		effect = new RasterEffect();
		effect.setProgress = function(progress:Float)
		{
			WorkingInstance.pipeMethod("setProgress", [progress]);
		}
	}
	
	function init(analyzer:Dynamic)
	{
		effect.analyzer = new MusicAnalyzer();
		effect.analyzer.bands = analyzer.bands;
		effect.init();
	}
	
	function config(params)
	{
		effect.paramLength = params.paramLength;
		effect.paramPosition = params.paramPosition;
		effect.texture.width = params.width;
		effect.texture.height = params.height;
	}
	
	function render(buffer:ArrayBuffer)
	{
		effect.texture.array = new Uint8Array(buffer);
		effect.render();
	}
}
