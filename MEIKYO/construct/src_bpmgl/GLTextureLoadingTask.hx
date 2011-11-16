class GLTextureLoadingTask extends bpmjs.ImageLoaderTask
{
	var textureRegistry : GLTextureRegistry;
	var textureConfig : GLTextureConfig;
	
	public function new(textureRegistry : GLTextureRegistry, textureConfig : GLTextureConfig)
	{
		super();
		
		if (textureRegistry == null)
			throw "TextureRegistry was null!";
			
		this.textureRegistry = textureRegistry;
		this.textureConfig = textureConfig;
	}
	
	override function doStart()
	{
		location = textureConfig.location;
		super.doStart();
	}
	
	override function handleImageLoaded()
	{
		if (textureConfig.textureManipulation != null)
		{
			textureRegistry.register(textureConfig, textureRegistry.createGLTextureFromCanvas(textureConfig.textureManipulation.create(image), textureConfig.filter));
		}
		else
		{
			var testPowerOfTwoWidth = Std.int(Math2.nextPowerOf2(image.width));
			var testPowerOfTwoHeight = Std.int(Math2.nextPowerOf2(image.height));
			if (testPowerOfTwoWidth != image.width || testPowerOfTwoHeight != image.height)
			{
				Log.warn("Image", textureConfig.location, "size must be a valid texture size! Resizing...");
				
				var canvasGraphic = new CanvasGraphic();
				canvasGraphic.width = Std.int(testPowerOfTwoWidth / 2);
				canvasGraphic.height = Std.int(testPowerOfTwoHeight / 2);
				canvasGraphic.drawImage(image, 0, 0, canvasGraphic.width, canvasGraphic.height);
				
				textureRegistry.register(textureConfig, textureRegistry.createGLTextureFromCanvas(canvasGraphic.canvas, textureConfig.filter));
			}
			else
			{
				textureRegistry.register(textureConfig, textureRegistry.createGLTextureFromImage(image, textureConfig.filter));
			}
		}
		Log.info("Complete: ", textureConfig.location);
		complete();
	}
}
