package kumite.presentation;

import js.Dom;

import kumite.stage.Stage;

class CanvasSlide extends Slide
{
	var color:Color;
	
	var canvas:CanvasGraphic;
	
	public function new()
	{
		super();
		
		color = new Color(0, 0, 0);
		
		canvas = new CanvasGraphic();
		canvas.usePow2Size = false;
		
		canvas.canvas.onclick = function(_) clickSignaler.dispatch(this);
	}
	
	override function prepare(root:HtmlDom)
	{
		super.prepare(root);
		canvas.canvas.style.position = "absolute";
		root.appendChild(cast canvas.canvas);
	}
	
	override function resize(stage:Stage)
	{
		super.resize(stage);
		canvas.width = stage.width;
		canvas.height = stage.height;
	}	
	
	override function removeFrom(root:HtmlDom)
	{
		super.removeFrom(root);
		root.removeChild(cast canvas.canvas);
	}	
}
