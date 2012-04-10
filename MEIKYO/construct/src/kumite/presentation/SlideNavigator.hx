package kumite.presentation;

import haxe.rtti.Infos;
import haxe.Timer;

import js.Lib;
import js.Dom;

import kumite.stage.StageResizeMessage;
import kumite.stage.Stage;
import kumite.time.Tick;
import kumite.time.Time;

class SlideNavigator implements Infos
{
	@Inject
	var stage:Stage;
	
	@Inject
	var time:Time;
	
	@Inject
	var presentation:Presentation;
	
	var currentHash:String;
	var autoScroll:Bool;
	var root:HtmlDom;
	var speed:Float;
	var scrollTop:Float;
	var targetPosition:Int;
	var lastScrollTop:Int;
	var lastScrollTopEqualTime:Float;
	
	public function new()
	{
		lastScrollTopEqualTime = -1;
		autoScroll = false;
	}
	
	@Sequence("boot", "start")
	function start()
	{
		root = Lib.document.getElementById("root");
		lastScrollTop = root.scrollTop;
		
		var row = 0;
		for(slide in presentation.slides)
		{
				
			slide.row = row; 
			slide.prepare(root);
			row++;
		}
		
		resize();
	}
	
	@Sequence("boot", "start")
	function startComplete()
	{
		setMementoFromUrl();		
		
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
		var memento = getMemento();
		var newHash = haxe.Serializer.run(memento);
		
		if (currentHash != newHash)
		{
			currentHash = newHash;
			var uri = "#" + currentHash;
			Lib.window.location.replace(uri);
		}
		
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
				var index = Math.round(root.scrollTop / stage.height);
				presentation.currentSlideIndex = index;
				targetPosition = index * stage.height;
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
		
		targetCurrentSlide();
		
		for(slide in presentation.slides)
			slide.resize(stage);
	}
	
	function getMemento()
	{
		return presentation.getMemento();
	}
	
	function setMementoFromUrl()
	{
		try
		{
			var data = Lib.window.location.hash.substr(1);
			var memento = haxe.Unserializer.run(data);
			presentation.setMemento(memento);
			
			targetCurrentSlide();
		}
		catch (e:Dynamic)
		{
			Log.info("Cannot restore memento: " + e);		
		}
	}
	
	function targetCurrentSlide()
	{
		scrollTop = presentation.currentSlideIndex * stage.height;
		lastScrollTop = presentation.currentSlideIndex * stage.height; 
		root.scrollTop = presentation.currentSlideIndex * stage.height;
	}
}
