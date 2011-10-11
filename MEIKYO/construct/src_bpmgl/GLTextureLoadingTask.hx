class GLTextureLoadingTask extends bpmjs.ImageLoaderTask
{
	var textureRegistry : GLTextureRegistry;
	var imageRegistry : GLImageRegistry;
	var textureConfig : GLTextureConfig;
	
	public function new(textureRegistry : GLTextureRegistry, imageRegistry : GLImageRegistry, textureConfig : GLTextureConfig)
	{
		super();
		this.textureRegistry = textureRegistry;
		this.textureConfig = textureConfig;
		this.imageRegistry = imageRegistry;
	}
	
	override function doStart()
	{
		Log.info("Loading: ", textureConfig.path);
		location = textureConfig.path;
		super.doStart();
	}
	
	override function handleImageLoaded()
	{
		imageRegistry.register(textureConfig, image);
		
		var testPowerOfTwoWidth = Std.int(Math2.nextPowerOf2(image.width));
		var testPowerOfTwoHeight = Std.int(Math2.nextPowerOf2(image.height));
		if (testPowerOfTwoWidth != image.width || testPowerOfTwoHeight != image.height)
		{
			Log.warn("Image", textureConfig.path, "size must be a valid texture size! Resizing...");
			
			var canvasGraphic = new CanvasGraphic();
			canvasGraphic.width = testPowerOfTwoWidth;
			canvasGraphic.height = testPowerOfTwoHeight;
			canvasGraphic.fillStyle = new Color(0, 1, 1, 1);
			canvasGraphic.fillRect (40, 40, 400, 400);
			canvasGraphic.drawImage(image, 0, 0, canvasGraphic.width, canvasGraphic.height);
			
			textureRegistry.register(textureConfig, textureRegistry.createGLTextureFromCanvas(canvasGraphic.canvas));
		}
		else
		{
			textureRegistry.register(textureConfig, textureRegistry.createGLTextureFromImage(image, GL.NEAREST));
		}
		complete();
	}
}
