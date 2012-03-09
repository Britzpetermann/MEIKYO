package kumite.musicdraw;

import haxe.Timer;

import bpmjs.WorkingInstance;

class SquareEffectWorker
{
	var effect:SquareEffect;
	
	static function main()
	{
		new SquareEffectWorker();
	}
	
	public function new()
	{
		var instance = new WorkingInstance(this);
	}
	
	function init(analyzer:Dynamic)
	{
		effect = new SquareEffect();
		effect.analyzer = new MusicAnalyzer();
		effect.analyzer.bands = analyzer.bands;
		effect.init();
	}
	
	function render(buffer:ArrayBuffer)
	{
		effect.texture.array = new Uint8Array(buffer);
		effect.render();
	}
}
