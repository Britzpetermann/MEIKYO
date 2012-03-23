package kumite.presentation;

import haxe.rtti.Infos;

import js.Dom;
import js.Lib;

import bpmjs.ContextBuilder;

import kumite.stage.Stage;

class ContainerSlide extends Slide, implements Infos
{
	@Inject
	var stage:Stage;
	
	var slides:Array<SlideAndDiv>;
	var color:Color;
	var canvas:CanvasGraphic;
	var slideIndex:Int;
	var container:HtmlDom;
	
	public function new()
	{
		super();
		
		slides = new Array();
		slideIndex = 0;
		
		color = new Color(Math.random(), Math.random(), Math.random());
		
		canvas = new CanvasGraphic();
		canvas.usePow2Size = false;
	}
	
	public function addSlide(slide:Slide)
	{
		var slideAndDiv = new SlideAndDiv();
		slideAndDiv.slide = slide;
		slides.push(slideAndDiv);
		return this;
	}
	
	@Sequence("boot", "init")
	public function init()
	{
		Log.info();
		for(slide in slides)
			ContextBuilder.configure(slide.slide);
	}
	
	override function prepare(root:HtmlDom)
	{
		super.prepare(root);
		container = Lib.document.createElement("div");
		root.appendChild(container);
		
		for(slideAndDiv in slides)
		{
			var slideContainer = Lib.document.createElement("div");
			slideContainer.style.width = stage.width + "px";
			slideContainer.style.height = stage.height + "px";
			slideContainer.style.position = "absolute";
			container.appendChild(slideContainer);
			
			slideAndDiv.div = slideContainer;
			
			slideAndDiv.slide.prepare(slideContainer);
			slideAndDiv.slide.resize(stage);
		}
		slides[slideIndex].slide.clickSignaler.bind(gotoNextSlide);
	}
	
	override function resize(stage:Stage)
	{
		super.resize(stage);
		container.setAttribute("style", "top:" + row * stage.height + "px; position:absolute; overflow-x:hidden; height:" + stage.height + "px; width:" + stage.width + "px");
		
		var index = 0;
		for(slideAndDiv in slides)
		{
			slideAndDiv.div.style.left = (index - slideIndex) * stage.width + "px";
			slideAndDiv.div.style.width = stage.width + "px";
			slideAndDiv.div.style.height = stage.height + "px";
			slideAndDiv.slide.resize(stage);
			index++;
		}		
	}
	
	override function getMemento()
	{
		return slideIndex;
	}
	
	override function setMemento(memento:Dynamic)
	{
		if (!Math.isNaN(memento))
			changeSlide(memento);
	}
	
	function gotoNextSlide(_)
	{
		changeSlide(slideIndex + 1);
	}
	
	function changeSlide(newIndex:Int)
	{
		slides[slideIndex].slide.clickSignaler.unbind(gotoNextSlide);
		slideIndex = newIndex % slides.length;
		slides[slideIndex].slide.clickSignaler.bind(gotoNextSlide);
		
		resize(stage);
	}
}

class SlideAndDiv
{
	public var slide:Slide;	
	public var div:HtmlDom;
	
	public function new()
	{
	}
}
