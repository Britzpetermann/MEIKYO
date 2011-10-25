package kumite.framebuffereffect;

import kumite.spritemesh.SpriteMeshLayer;

import kumite.displaylist.DisplayListLayer;

import kumite.layer.ColorLayer;
import kumite.layer.ClearLayer;
import kumite.layer.TestLayer;
import kumite.layer.Texture3DLayer;
import kumite.layer.FramebufferEnableLayer;
import kumite.layer.FramebufferDisableLayer;

import kumite.scene.DefaultScene;

import haxe.rtti.Infos;

class Config implements Infos
{
	@Inject
	public var displayListLayer : DisplayListLayer;
	
	public var colorLayer : ColorLayer;
	public var clearLayer : ClearLayer;
	public var clearLayer1 : ClearLayer;
	public var clearLayer2 : ClearLayer;
	public var testLayer : TestLayer;
	
	@Inject
	public var layer1 : SpriteMeshLayer;
	
	public var framebufferEnableLayer1 : FramebufferEnableLayer;
	public var framebufferDisableLayer1 : FramebufferDisableLayer;
	
	public var framebufferEnableLayer2 : FramebufferEnableLayer;
	public var framebufferDisableLayer2 : FramebufferDisableLayer;
	
	public var textureLayer1 : Texture3DLayer;
	public var textureLayer2 : Texture3DLayer;
	
	public var scene : DefaultScene;
	
	public function new()
	{
		colorLayer = new ColorLayer();
		colorLayer.transitions.enableChild("alpha");
		colorLayer.color = new Color(0, 0, 0, 1);
		
		clearLayer = new ClearLayer();
		
		clearLayer1 = new ClearLayer();
		clearLayer1.color = new Color(1, 1, 1, 0.15);
		
		clearLayer2 = new ClearLayer();
		clearLayer2.color = new Color(1, 1, 1, 0.15);
		
		testLayer = new TestLayer();
		testLayer.scale = 2;
		testLayer.transitions.enableChild("cut");
		testLayer.color = new Color(1, 0, 0, 1);
		
		framebufferEnableLayer1 = new FramebufferEnableLayer(1024, 512);
		framebufferDisableLayer1 = new FramebufferDisableLayer();
		
		framebufferEnableLayer2 = new FramebufferEnableLayer(1024, 1024);
		framebufferDisableLayer2 = new FramebufferDisableLayer();
		
		textureLayer1 = new Texture3DLayer();
		textureLayer1.position.z = 3;
		textureLayer1.scale = 0.7;
		textureLayer1.textureConfig = framebufferEnableLayer1.textureConfig;
		textureLayer1.position.x = -3;
		
		textureLayer2 = new Texture3DLayer();
		textureLayer2.scale = 0.25;
		textureLayer2.textureConfig = framebufferEnableLayer2.textureConfig;
		textureLayer2.position.x = 3;
		
		scene = new DefaultScene("FB TEST");
	}
	
	@Complete
	public function complete()
	{
		scene.addLayerLifecycle(clearLayer, kumite.layer.LayerId.CLEAR);
		scene.addLayerLifecycle(colorLayer);
		
		scene.addLayerLifecycle(framebufferEnableLayer1);
		scene.addLayerLifecycle(clearLayer1);
		scene.addLayerLifecycle(layer1);
		scene.addLayerLifecycle(framebufferDisableLayer1);
		
		scene.addLayerLifecycle(framebufferEnableLayer2);
		scene.addLayerLifecycle(clearLayer2);
		scene.addLayerLifecycle(testLayer);
		scene.addLayerLifecycle(framebufferDisableLayer2);
		
		scene.addLayerLifecycle(textureLayer1);
		scene.addLayerLifecycle(textureLayer2);
		scene.addLayerLifecycle(displayListLayer);
	}
}
