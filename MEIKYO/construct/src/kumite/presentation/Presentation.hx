package kumite.presentation;

import haxe.rtti.Infos;

import bpmjs.ContextBuilder;

class Presentation implements Infos
{
	public var slides:Array<Slide>;
	
	public var currentSlideIndex : Int;
	
	public function new()
	{
		slides = new Array();
	}
	
	@Sequence("boot", "init")
	function complete()
	{
		for(slide in slides)
			ContextBuilder.configure(slide);
	}
	
	public function goNext()
	{
		slides[currentSlideIndex].goNext();
	}
	
	public function goPrev()
	{
		slides[currentSlideIndex].goPrev();
	}
	
	public function getMemento()
	{
		var memento = {i:currentSlideIndex, a:[]};
		for(i in 0...slides.length)
		{
			memento.a.push(slides[i].getMemento());
		}
		
		return memento;
	}
	
	public function setMemento(memento:{i:Int, a:Array<Dynamic>})
	{
		currentSlideIndex = memento.i;
		
		for(i in 0...slides.length)
		{
			slides[i].setMemento(memento.a[i]);
		}		
	}
}
