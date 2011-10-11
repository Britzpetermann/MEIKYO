class GLTextureLoadingTask extends bpmjs.ImageLoaderTask
{
	var textureRegistry : GLTextureRegistry;
	var textureConfig : GLTextureConfig;
	
	public function new(textureRegistry : GLTextureRegistry, textureConfig : GLTextureConfig)
	{
		super();
		this.textureRegistry = textureRegistry;
		this.textureConfig = textureConfig;
	}
	
	override function doStart()
	{
		location = textureConfig.path;
		super.doStart();
	}
	
	override function handleImageLoaded()
	{
		var testPowerOfTwoWidth = Std.int(Math2.nextPowerOf2(image.width));
		var testPowerOfTwoHeight = Std.int(Math2.nextPowerOf2(image.height));
		if (testPowerOfTwoWidth != image.width || testPowerOfTwoHeight != image.height)
		{
			Log.warn("Image", textureConfig.path, "size must be a valid texture size! Resizing...");
			
			var canvasGraphic = new CanvasGraphic();
			canvasGraphic.width = Std.int(testPowerOfTwoWidth / 2);
			canvasGraphic.height = Std.int(testPowerOfTwoHeight / 2);
			canvasGraphic.drawImage(image, 0, 0, canvasGraphic.width, canvasGraphic.height);
			
			textureRegistry.register(textureConfig, textureRegistry.createGLTextureFromCanvas(canvasGraphic.canvas));
		}
		else
		{
			textureRegistry.register(textureConfig, textureRegistry.createGLTextureFromImage(image, GL.NEAREST));
		}
		Log.info("Complete: ", textureConfig.path);
		complete();
	}
}
