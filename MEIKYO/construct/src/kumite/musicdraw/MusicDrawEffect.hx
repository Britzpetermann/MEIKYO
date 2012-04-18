package kumite.musicdraw;

interface MusicDrawEffect
{
	var setProgress:Float->Void;
	var analyzer:MusicAnalyzer;
	
	function init():Void;
	function setParams(params:Dynamic):Void;
	function render(buffer:ArrayBuffer):Void;
}
