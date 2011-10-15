package bpmjs;

class ImageLoaderTask extends Task<ImageLoaderTask>
{
	public var location : String;

	public var image : Image;
	
	public function new(?location : String)
	{
		super();
		this.location = location;
	}

	override function doStart()
	{
		Log.info("Loading: ", location);
		image = new Image();
		image.onload = handleImageLoaded;
		image.src = location;
	}

	function handleImageLoaded()
	{
		Log.info("Complete: ", location);
		complete();
	}
}
