package kumite.launch;

import js.Lib;
import js.Dom;
import bpmjs.ProgressMonitor;

import haxe.rtti.Infos;

class PreloadDisplay implements Infos
{
	var preloaderDiv : HtmlDom;
	
	public function new() {}
	
	@Complete
	public function complete()
	{
		preloaderDiv = Lib.document.createElement("div");
		preloaderDiv.className = "Preloader";
		Lib.document.body.appendChild(preloaderDiv);
	}
	
	@Sequence("boot", "monitor")
	public function bootMonitor(monitor : ProgressMonitor)
	{
		var bar = "";
		var count = 10;
		for(i in 0...count)
		{
			var from = i / count;
			var to = (i + 1) / count;
			var diff = Map.linear(monitor.current, from, to, 0, 1.001);
			if (diff < 0) diff = 0;
			if (diff > 1) diff = 1;
			var chars = ".oO";
			var chars = "Oo.";
			var chars = "-=";
			var chars = ":. ";
			var chars = "▁▂▃▄▅▆▇";
			bar += chars.charAt(Std.int(diff * (chars.length - 1)));
		}
		preloaderDiv.innerHTML = "" + bar;
	}
		
	@Sequence("boot", "startComplete")
	public function bootStartComplete()
	{
		var body = Lib.document.getElementById("root");
		//untyped body.style.opacity = 0.0;
		//untyped preloaderDiv.style.opacity = 0.8;
		//GLTween.to(preloaderDiv.style, 1000, {opacity : 0});
		//GLTween.to(body.style, 300, {opacity : 1});
		Timeout.execute(1000, removePreloader);
	}
	
	function removePreloader()
	{
		Lib.document.body.removeChild(preloaderDiv);
	}
}
