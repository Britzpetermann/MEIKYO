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
		Log.info("Loading: ", textureConfig.path);
		location = textureConfig.path;
		super.doStart();
	}
	
	override function handleImageLoaded()
	{
		textureRegistry.register(textureConfig, textureRegistry.createGLTextureFromImage(image, GL.NEAREST));
		complete();
	}
}
