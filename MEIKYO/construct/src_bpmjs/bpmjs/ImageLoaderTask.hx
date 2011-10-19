package bpmjs;

import haxe.Timer;

class ImageLoaderTask extends Task<ImageLoaderTask>
{
	public var location : String;

	public var image : Image;
	
	var timer : Timer;
	
	
	public function new(?location : String)
	{
		super();
		this.location = location;
		monitor.name = location;
	}

	override function doStart()
	{
		//Log.info("Loading: ", location);
		monitor.name = location;
		image = new Image();
		image.onload = handleImageLoaded;
		image.src = location;
	}

	function handleImageLoaded()
	{
		//Log.info("Complete: ", location);
		//timer = new Timer(0);
		//timer.run = doComplete;
		complete();
	}
	
	function doComplete()
	{
		timer.stop();
		complete();
	}
}
