package kumite.profiler;

import js.Lib;
import js.Dom;

import haxe.rtti.Infos;

import bpmjs.Context;
import reflect.ClassInfo;

import kumite.time.Tick;
import kumite.time.Time;

class ProfilerRenderer implements Infos
{
	@Inject
	var context:Context;
	
	@Inject
	var time:Time;
		
	var cg:CanvasGraphic;
	var root:HtmlDom;
		
	public function new()
	{
		
	}
	
	@Sequence("boot", "finish")
	public function init()
	{
		cg = new CanvasGraphic();
		cg.usePow2Size = false;
		cg.width = 100;
		cg.height = 20;
		cg.canvas.setAttribute("class", "profiler");
		root = Lib.document.getElementById("root");
		root.appendChild(cg.canvas);
		
		context.contextConfig.frontMessenger.addReceiver(this, "tick", Tick);
	}
	
	function tick(tick:Tick)
	{
		var text = "FPS:" + Math.round(time.frameRate) + " TS:" + Math.round(time.timeScale * 100) / 100;
		cg.clear(new Color(0, 0.2, 0));
		cg.fillStyle = new Color(1, 1, 1, 0.8);
		cg.font = "10px Courier";
		cg.fillText(text, 10, 13, 100);
	}	
}
