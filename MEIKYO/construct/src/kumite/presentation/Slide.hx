package kumite.presentation;

import js.Lib;
import js.Dom;

import hsl.haxe.Signaler;
import hsl.haxe.DirectSignaler;

import kumite.stage.Stage;

class Slide
{
	public var slidesFinishedNext:Signaler<Slide>;
	public var slidesFinishedPrev:Signaler<Slide>;
	public var isPrepared:Bool;
	public var row:Int;
	public var column:Int;
	
	public function new()
	{
		isPrepared = false;
		slidesFinishedNext = new DirectSignaler(this);
		slidesFinishedPrev = new DirectSignaler(this);
	}
	
	public function prepare(root:HtmlDom)
	{
		isPrepared = true;
	}
	
	public function resize(stage:Stage)
	{
		
	}
	
	public function removeFrom(root:HtmlDom)
	{
		isPrepared = false;
	}
	
	public function goNext()
	{
	}
	
	public function goPrev()
	{
	}
		
	public function getMemento()
	{
		return null;
	}
	
	public function setMemento(memento:Dynamic)
	{
	}
}
