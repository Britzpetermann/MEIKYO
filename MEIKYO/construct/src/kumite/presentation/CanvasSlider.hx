package kumite.presentation;

import haxe.rtti.Infos;
import haxe.Timer;

import js.Lib;
import js.Dom;

import kumite.stage.StageResizeMessage;
import kumite.stage.Stage;
import kumite.time.Tick;
import kumite.time.Time;

class CanvasSlider implements Infos
{
	@Inject
	var stage:Stage;
	
	@Inject
	var time:Time;
	
	var autoScroll:Bool;
	var root:HtmlDom;
	var speed:Float;
	var scrollTop:Float;
	var targetPosition:Int;
	var lastScrollTop:Int;
	var lastScrollTopEqualTime:Float;
	var canvases:Array<CanvasGraphic>;
	
	public function new()
	{
		canvases = new Array();
		lastScrollTopEqualTime = -1;
		autoScroll = false;
	}
	
	@Sequence("boot", "start")
	function start()
	{
		Log.info();
		
		root = Lib.document.getElementById("root");
		lastScrollTop = root.scrollTop;
		
		for(i in 0...5)
		{
			var canvas = new CanvasGraphic();
			canvas.usePow2Size = false;
			root.appendChild(cast canvas.canvas);
			
			canvases.push(canvas);
		}
		
		resize();
	}
	
	@Message
	function handleResize(message:StageResizeMessage)
	{
		resize();
	}
	
	@Message
	function handleTick(tick:Tick)
	{
		if (!autoScroll)
		{
			if (root.scrollTop == lastScrollTop && lastScrollTopEqualTime == -1)
				lastScrollTopEqualTime = time.ms;
				
			if (root.scrollTop != lastScrollTop)
				lastScrollTopEqualTime = -1;
				
			lastScrollTop = root.scrollTop;
			scrollTop = lastScrollTop; 
		} 
			
		if (time.ms - lastScrollTopEqualTime > 100 && lastScrollTopEqualTime != -1)
		{
			if (!autoScroll)
			{
				speed = 0;
				scrollTop = root.scrollTop;
				targetPosition = Math.round(root.scrollTop / stage.height) * stage.height;
			}
			
			if (root.scrollTop != Math.round(scrollTop))
			{
				autoScroll = false;
			}
			else
			{
				autoScroll = true;
				var newSpeed = (targetPosition - scrollTop) * 0.15;
				speed += (newSpeed - speed) * 0.15;
				if (newSpeed > 0 && speed > newSpeed)
					speed = newSpeed;
				if (newSpeed < 0 && speed < newSpeed)
					speed = newSpeed;
				scrollTop += speed;
				root.scrollTop = Math.round(scrollTop);
			}
		}
	}
	
	function resize()
	{
		lastScrollTopEqualTime = -1;
		autoScroll = false;
		
		for (canvas in canvases)
		{
			canvas.width = stage.width;
			canvas.height = stage.height;
			canvas.clear(new Color(Math.random(), Math.random(), Math.random()));
		}
	}
}
