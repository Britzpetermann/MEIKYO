package kumite.musicdraw;

import haxe.Timer;

import bpmjs.WorkingInstance;

class EffectWorker
{
	var effect:MusicDrawEffect;
	
	static function main()
	{
		RasterEffect;
		DNAEffect;
		TimeEffect;
		new WorkingInstance(new EffectWorker());
	}
	
	function new(){}
	
	function init(data:{effectClassName:String, analyzer:Dynamic})
	{
		var clazz = Type.resolveClass(data.effectClassName);
		
		effect = Type.createInstance(clazz, []);
		effect.setProgress = function(progress:Float)
		{
			WorkingInstance.pipeMethod("setProgress", [progress]);
		}
		effect.analyzer = new MusicAnalyzer();
		effect.analyzer.bands = data.analyzer.bands;
		effect.analyzer.init();
		effect.init();
	}
	
	function config(params)
	{
		effect.setParams(params);
	}
	
	function render(buffer:ArrayBuffer)
	{
		effect.render(buffer);
	}
}
