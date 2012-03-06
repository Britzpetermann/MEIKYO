package kumite.musicdraw;

import kumite.displaylist.DisplayListLayer;
import kumite.scene.DefaultScene;
import kumite.layer.ClearLayer;
import kumite.layer.TextureLayer;
import kumite.time.Tick;
import kumite.time.Time;

import haxe.rtti.Infos;

class MusicDrawConfig implements Infos
{
	public static var IMAGE_1 : GLTextureConfig = GLTextureConfig.create("data/image/along-the-line.png"); 
	
	@Inject
	public var displayListLayer : DisplayListLayer;

	@Inject
	public var textureRegistry : GLTextureRegistry;

	@Inject
	public var time : Time;

	public var scene : DefaultScene;
	
	public var clearLayer : ClearLayer;
	public var pixelLayer : PixelLayer;
	public var image1Layer : TextureLayer;
	
	var gltexture : GLArrayTexture;

	public function new()
	{
		clearLayer = new ClearLayer();
		clearLayer.color = new Color(0, 0, 0.0, 1);
		
		image1Layer = new TextureLayer();
		
		pixelLayer = new PixelLayer();
		
		scene = new DefaultScene("MUSIC DRAW");
	}

	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		//group.add(lglReader2.read("data/lgl/1105496683.lgl"));
		return group;
	}
	
	@Sequence("boot", "startPrepare")
	public function loadImages()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		group.add(new GLTextureLoadingTask(textureRegistry, IMAGE_1));
		
		return group;
	}	

	@Sequence("boot", "startPrepare")
	public function initTextures()
	{
		gltexture = textureRegistry.createGLArrayTexture(16, 16);

		image1Layer.texture = gltexture;
	}	

	@Message
	public function tick(tick:Tick)
	{
		var array = gltexture.array;
		
		for(x in 0...gltexture.width)
		for(y in 0...gltexture.height)
		{
			gltexture.setPixel(x, y, 255, Math.sin(time.ms / 1000) * 255 + 128, 255, 255);
			//array[0] = 255;
			//array[1] = Math.sin(time.ms / 1000) * 255 + 128;
			//array[2] = 255;
			//array[3] = 255;
		}
		
		textureRegistry.updateGLArrayTexture(gltexture);
	}

	@Complete
	public function complete()
	{
		scene.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene.addLayerLifecycle(pixelLayer);
		scene.addLayerLifecycle(image1Layer);
		scene.addLayerLifecycle(displayListLayer);
	}
}