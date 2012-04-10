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
	
	var leftNav:HtmlDom;
	var leftNavMotion:Motion;
	var rightNav:HtmlDom;
	var rightNavMotion:Motion;
	
	var mouseX:Int;
	var mouseY:Int;
	
	public function new()
	{
		lastScrollTopEqualTime = -1;
		autoScroll = false;
		
		leftNavMotion = new Motion();
		leftNavMotion.style = new MotionStyleEaseInOut().setSmoothing(0.2);
		rightNavMotion = new Motion();
		rightNavMotion.style = new MotionStyleEaseInOut().setSmoothing(0.2);
	}
	
	@Sequence("boot", "start")
	function start()
	{
		root = Lib.document.getElementById("root");
		root.onmousemove = onMouseMove;
		root.onkeydown = onKeyDown;
		lastScrollTop = root.scrollTop;
		
		
		var row = 0;
		for(slide in presentation.slides)
		{
			slide.slidesFinishedNext.bind(slideRowFinishedNext);
			slide.slidesFinishedPrev.bind(slideRowFinishedPrev);
			slide.row = row; 
			slide.prepare(root);
			row++;
		}
		
		leftNav = Lib.document.createElement("div");
		root.appendChild(leftNav);
		
		var styles = [];
		styles.push("position:" + "fixed");
		styles.push("top:" + 0 + "px");
		styles.push("left:" + 0 + "px");
		styles.push("width:" + 160 + "px");
		styles.push("height:" + 460 + "px");
		styles.push("background-image: url(" + "data/presentation/Back.png" + ")");
		styles.push("background-repeat: no-repeat;");
		leftNav.setAttribute("style", styles.join(";"));
		
		leftNav.onclick = handleLeftClick;
		
		rightNav = Lib.document.createElement("div");
		root.appendChild(rightNav);
		
		var styles = [];
		styles.push("position:" + "fixed");
		styles.push("top:" + 0 + "px");
		styles.push("left:" + 0 + "px");
		styles.push("width:" + 160 + "px");
		styles.push("height:" + 460 + "px");
		styles.push("background-image: url(" + "data/presentation/Next.png" + ")");
		styles.push("background-repeat: no-repeat;");
		rightNav.setAttribute("style", styles.join(";"));
		rightNav.onclick = handleRightClick;
		
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
		leftNavMotion.target = mouseX < 150 && mouseX > 1 ? 1 : 0;
		leftNavMotion.move(time);
		rightNavMotion.target = mouseX > stage.width - 150 ? 1 : 0;
		rightNavMotion.move(time);
		
		untyped leftNav.style.opacity = leftNavMotion.current;
		leftNav.style.left = -leftNavMotion.current * 20 + 30 + "px";
		untyped rightNav.style.opacity = rightNavMotion.current;
		rightNav.style.left = (stage.width - 160 + rightNavMotion.current * 20 - 30) + "px";
		
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
			
		leftNav.style.top = (stage.height - 450) / 2 + "px";
		rightNav.style.top = (stage.height - 450) / 2 + "px";
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
	
	function slideRowFinishedNext(_)
	{
		if (presentation.currentSlideIndex < presentation.slides.length - 1)
		{
			presentation.currentSlideIndex++;
			targetPosition = (presentation.currentSlideIndex) * stage.height;
		}
	}
	
	function slideRowFinishedPrev(_)
	{
		if (presentation.currentSlideIndex > 0)
		{
			presentation.currentSlideIndex--;
			targetPosition = (presentation.currentSlideIndex) * stage.height;
		}
	}
	
	function onMouseMove(e:Dynamic)
	{
		mouseX = untyped (e.pageX);
		mouseY = untyped (e.pageY);
	}
	
	function onKeyDown(e:Dynamic)
	{
		if (e.keyIdentifier == "Left")
		{
			presentation.goPrev();	
		}
		else if (e.keyIdentifier == "Right")
		{
			presentation.goNext();
		}
	}
	
	function handleLeftClick(_)
	{
		presentation.goPrev();
	}
	
	function handleRightClick(_)
	{
		presentation.goNext();
	}
}
