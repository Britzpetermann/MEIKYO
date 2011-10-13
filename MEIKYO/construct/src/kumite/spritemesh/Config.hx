package kumite.spritemesh;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var layer : SpriteMeshLayer;
	public var scene : SpriteMeshScene;
	public var spritemeshColorLayer : kumite.layer.ColorLayer;
	
	public function new()
	{
		spritemeshColorLayer = new kumite.layer.ColorLayer();
		spritemeshColorLayer.color = new Color(0.5, 0.5, 0.5, 1);
		spritemeshColorLayer.layerId = "spritemeshColorLayer";
		
		layer = new SpriteMeshLayer();
		scene = new SpriteMeshScene();
	}
}
