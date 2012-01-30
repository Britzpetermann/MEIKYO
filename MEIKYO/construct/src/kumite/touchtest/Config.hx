package kumite.touchtest;

import kumite.displaylist.DisplayListLayer;
import kumite.time.Tick;

import kumite.scene.LayerLifecycle;
import kumite.scene.DefaultScene;

import haxe.Timer;

import haxe.rtti.Infos;

class Config implements Infos
{
	public static var graphics : CanvasGraphic;
	public static var texture : GLTexture;
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Inject
	public var displayListLayer : DisplayListLayer;
	
	public var clearLayer : kumite.layer.ClearLayer;		
	public var textureLayer : kumite.layer.TextureLayer;
			
	public var scene : DefaultScene;
		
	public function new()
	{
		clearLayer = new kumite.layer.ClearLayer();
				
		textureLayer = new kumite.layer.TextureLayer();
		textureLayer.scale = 3.6;
		textureLayer.position.y = 150 * 1.5;
		
		scene = new DefaultScene("TOUCH");
	}
	
	@Complete
	public function complete()
	{
		scene.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene.addLayerLifecycle(textureLayer);
		scene.addLayerLifecycle(displayListLayer);
	}
		
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		graphics = new CanvasGraphic();
		graphics.width = 512;
		graphics.height = 256;
		
		graphics.clear(new Color(1, 0, 0));
		
		texture = textureRegistry.createGLTextureFromCanvas(graphics.canvas, GL.LINEAR);
		
		textureLayer.texture = texture;
		
		var timer = new Timer(100);
		timer.run = tick;
	}
	
	public function tick()
	{
		var image = new Image();
		
		var inst = this;
		function handleImageLoaded()
		{
			graphics.clear(new Color(0, 0, 0));
			graphics.drawImage2(image, 0, 0);
			inst.textureRegistry.updateGLTextureFromCanvas(texture, graphics.canvas);			
		}	
		
		image.onload = handleImageLoaded;
		image.src = "http://192.168.2.201/data/image.jpg";		
	}
	
}
