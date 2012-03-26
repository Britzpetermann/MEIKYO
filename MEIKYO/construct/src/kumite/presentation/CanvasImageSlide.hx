package kumite.presentation;

import haxe.rtti.Infos;

import js.Dom;
import js.Lib;

import kumite.stage.Stage;

import bpmjs.ImageLoaderTask;

class CanvasImageSlide extends CanvasSlide, implements Infos
{
	@Inject
	var stage:Stage;
	
	var hitareas:Array<HitareaAndDiv>;
	
	var imageTask:ImageLoaderTask;
	
	var location:String;
	
	public function new(location:String)
	{
		super();
		
		this.location = location;
		
		hitareas = new Array();
		imageTask = new ImageLoaderTask(location);
	}
	
	public function addHitArea(x:Float, y:Float, width:Float, height:Float, location:String)
	{
		var hitarea = new Hitarea();
		hitarea.x = x;
		hitarea.y = y;
		hitarea.width = width;
		hitarea.height = height;
		hitarea.location = location;
		
		var hitareaAndDiv = new HitareaAndDiv();
		hitareaAndDiv.hitarea = hitarea;
		hitareas.push(hitareaAndDiv);
		
		return this;
	}	
	
	@Sequence("boot", "init")
	public function loadImage()
	{
		imageTask.completeSignaler.bind(handleImageLoaded);
		return imageTask;
	}
	
	override function prepare(root:HtmlDom)
	{
		super.prepare(root);
		
		canvas.canvas.onclick = function(_)
		{
			clickSignaler.dispatch(this);
		}
		
		for(hitarea in hitareas)
		{
			var div = Lib.document.createElement("a");
			untyped div.href = hitarea.hitarea.location;
			div.style.position = "absolute";
			root.appendChild(div);
			
			hitarea.div = div;
		}
	}	
	
	override function resize(stage:Stage)
	{
		super.resize(stage);
		
		if (!imageTask.isComplete)
			return;
		
		var transform = canvas.drawImage3(imageTask.image);
		
		for(hitarea in hitareas)
		{
			var div = hitarea.div;
			var left = hitarea.hitarea.x * transform.scale + transform.x + column * stage.width;
			var top = hitarea.hitarea.y * transform.scale + transform.y;
			var width = hitarea.hitarea.width * transform.scale;
			var height = hitarea.hitarea.height * transform.scale;
			div.style.left = left + "px";
			div.style.top = top + "px";
			div.style.width = width + "px";
			div.style.height = height + "px";
			hitarea.div = div;
		}
	}
	
	function getTransform()
	{
		var image = imageTask.image;
		var imageAspect = image.naturalWidth / image.naturalHeight;
		
		var aspect = stage.width / stage.height;
		
		var ix:Float;
		var iy:Float;
		var iw:Float;
		var ih:Float;
		
		if (aspect > imageAspect)
		{
			iw = stage.width;
			ih = stage.width / imageAspect;
			ix = 0;
			iy = -(ih - stage.height) / 2;
		}
		else
		{
			iw = stage.height * imageAspect;
			ih = stage.height;
			ix = -(iw - stage.width) / 2;
			iy = 0;
		}
		
		return {scale:iw / image.naturalWidth, x:ix, y:iy};
	}
		
	function handleImageLoaded(_)
	{
		//var image:HtmlDom = untyped imageTask.image;
		//container.appendChild(image);
	}
	
	override function removeFrom(root:HtmlDom)
	{
		super.removeFrom(root);
		
		for(hitarea in hitareas)
		{
			var div = hitarea.div;
			root.removeChild(div);
		}		
	}
}

private class HitareaAndDiv
{
	public var hitarea:Hitarea;
	public var div:HtmlDom;
	
	public function new()
	{
	}
}