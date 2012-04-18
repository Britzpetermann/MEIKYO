import UserAgentContext;

import bpmjs.Task;
import bpmjs.TaskGroup;
import bpmjs.ObjectProxyTask;
import bpmjs.ImageLoaderTask;

class GLTextureAtlasLoadingTask extends bpmjs.Task<GLTextureAtlasLoadingTask>
{
	var textureRegistry : GLTextureRegistry;
	var atlas : GLTextureAtlasConfig;
	
	var partLoaderGroup : TaskGroup;
	var graphics : CanvasGraphic;		
	
	var currentOffsetX : Int;
	var currentOffsetY : Int;
	var nextOffsetX : Int;
	var nextOffsetY : Int;
	var currentMaxY : Int;
	
	public function new(textureRegistry : GLTextureRegistry, atlas : GLTextureAtlasConfig)
	{
		super();
		
		monitor.name = "GLTextureAtlasLoadingTask";
		
		if (textureRegistry == null)
			throw "TextureRegistry was null!";
			
		if (atlas == null)
			throw "GLTextureAtlasConfig was null!";
			
		this.textureRegistry = textureRegistry;
		this.atlas = atlas;
	}
	
	override function doStart()
	{
		graphics = new CanvasGraphic();
		graphics.width = atlas.width;		
		graphics.height = atlas.height;		
		
		currentOffsetX = 0;
		currentOffsetY = 0;
		nextOffsetX = 0;
		nextOffsetY = 0;
		currentMaxY = 0;
		
		partLoaderGroup = new TaskGroup();
		monitor.append(partLoaderGroup.monitor, 1);
		for(part in atlas.parts)
			addPart(part);
		partLoaderGroup.completeSignaler.bind(handleComplete);
		partLoaderGroup.errorSignaler.bind(handleError);
		partLoaderGroup.start();
	}
	
	function addPart(part : GLTextureAtlasPartConfig)
	{
		var task = new ObjectProxyTask<GLTextureAtlasPartConfig, ImageLoaderTask>(part, new ImageLoaderTask(part.location));
		task.completeSignaler.bind(addImageToAtlas);
		partLoaderGroup.add(task);
	}
	
	function addImageToAtlas(task : ObjectProxyTask<GLTextureAtlasPartConfig, ImageLoaderTask>)
	{
		var image = task.child.image;
		var part = task.object;
		advancePosition(image);
		part.width = image.naturalWidth;
		part.height = image.naturalHeight;
		part.u0 = currentOffsetX / atlas.width; 
		part.v0 = currentOffsetY / atlas.height; 
		part.u1 = (currentOffsetX + part.width) / atlas.width; 
		part.v1 = (currentOffsetY + part.height) / atlas.height; 
		//Log.info("Add image", task.child.location, "to atlas at:", currentOffsetX, currentOffsetY, part);
		graphics.drawImage(image, currentOffsetX, currentOffsetY, image.naturalWidth, image.naturalHeight);
	}
	
	function advancePosition(image : HTMLImageElement)
	{
		currentOffsetX = nextOffsetX;
		currentOffsetY = nextOffsetY;
		
		if (currentOffsetX + image.naturalWidth > atlas.width)
		{
			currentOffsetX = 0;
			currentOffsetY = currentMaxY;
			nextOffsetX = currentOffsetX;
			nextOffsetY = currentOffsetY;
		}
		nextOffsetX += image.naturalWidth;
		
		if (currentOffsetY + image.naturalHeight > currentMaxY)
		{
			currentMaxY = currentOffsetY + image.naturalHeight;
			if (currentMaxY > atlas.height)
				Log.error("Atlas", atlas.toString(), "is too small!");
		}
	}
	
	function handleComplete(group)
	{
		textureRegistry.register(atlas, textureRegistry.createGLTextureFromCanvas(graphics.canvas, atlas.filter));
		complete();
	}
	
	function handleError(taskError)
	{
		error(this, taskError.error);
	}
}
