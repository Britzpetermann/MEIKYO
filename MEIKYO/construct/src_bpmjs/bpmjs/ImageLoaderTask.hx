package bpmjs;

class ImageLoaderTask extends Task<ImageLoaderTask>
{
	public var location : String;

	public var image : Image;

	override function doStart()
	{
		Log.info("Loading2: ", location);
		image = new Image();
		image.onload = handleImageLoaded;
		image.src = location;
	}

	function handleImageLoaded()
	{
		Log.info("Complete2: ", location);
		complete();
	}
}
