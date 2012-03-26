package kumite.presentation;

import haxe.rtti.Infos;

import js.Dom;
import js.Lib;

import bpmjs.ContextBuilder;

import kumite.stage.Stage;
import kumite.time.Tick;
import kumite.time.Time;

class ContainerSlide extends Slide, implements Infos
{
	@Inject
	var stage:Stage;
	
	@Inject
	var time:Time;
	
	var slides:Array<Slide>;
	var color:Color;
	var canvas:CanvasGraphic;
	var slideIndex:Int;
	var visualSlideIndex:Motion;
	var container:HtmlDom;
	var slidingContainer:HtmlDom;
	
	public function new()
	{
		super();
		
		slides = new Array();
		slideIndex = 0;
		
		color = new Color(Math.random(), Math.random(), Math.random());
		
		canvas = new CanvasGraphic();
		canvas.usePow2Size = false;
		
		visualSlideIndex = new Motion();
		//visualSlideIndex.style = new MotionStyleLinear().setAcceleration(0.03);
		//visualSlideIndex.style = new MotionStyleEaseOut();
		//visualSlideIndex.style = new MotionStyleSpring();
		visualSlideIndex.style = new MotionStyleEaseInOut();
	}
	
	public function addSlide(slide:Slide)
	{
		slides.push(slide);
		return this;
	}
	
	@Sequence("boot", "init")
	public function init()
	{
		for(slide in slides)
			ContextBuilder.configure(slide);
	}
	
	override function prepare(root:HtmlDom)
	{
		super.prepare(root);
		
		container = Lib.document.createElement("div");
		root.appendChild(container);
		
		slidingContainer = Lib.document.createElement("div");
		slidingContainer.style.position = "absolute";
		container.appendChild(slidingContainer);

		var column = 0;
		for(slide in slides)
		{
			slide.column = column;
			slide.prepare(slidingContainer);
			slide.resize(stage);
			
			column++;
		}
		slides[slideIndex].clickSignaler.bind(gotoNextSlide);
	}
	
	override function resize(stage:Stage)
	{
		super.resize(stage);
		container.setAttribute("style", "top:" + row * stage.height + "px; position:absolute; overflow-x:hidden; height:" + stage.height + "px; width:" + stage.width + "px");
		
		if (visualSlideIndex.target != slideIndex)
		{
			visualSlideIndex.restart();
			visualSlideIndex.target = slideIndex;
		}
		
		for(slide in slides)
			slide.resize(stage);
	}
	
	@Message
	public function tick(tick:Tick)
	{
		visualSlideIndex.move(time);
		slidingContainer.style.left = -Math.round((visualSlideIndex.current) * stage.width) + "px";
	}
	
	override function getMemento()
	{
		return slideIndex;
	}
	
	override function setMemento(memento:Dynamic)
	{
		if (!Math.isNaN(memento))
		{
			visualSlideIndex.current = memento;
			changeSlide(memento);
		}
	}
	
	function gotoNextSlide(_)
	{
		changeSlide(slideIndex + 1);
	}
	
	function changeSlide(newIndex:Int)
	{
		slides[slideIndex].clickSignaler.unbind(gotoNextSlide);
		slideIndex = newIndex % slides.length;
		slides[slideIndex].clickSignaler.bind(gotoNextSlide);
		
		resize(stage);
	}
}