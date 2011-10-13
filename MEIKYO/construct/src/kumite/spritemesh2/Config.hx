package kumite.spritemesh2;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var layer : SpriteMeshLayer;
	public var scene : SpriteMeshScene;
	public var  spritemesh2ColorLayer : kumite.layer.ColorLayer;
	
	public function new()
	{
		spritemesh2ColorLayer = new kumite.layer.ColorLayer();
		spritemesh2ColorLayer.color = new Color(0.1, 0.2, 0.3, 1);
		spritemesh2ColorLayer.layerId = "spritemesh2ColorLayer";
		
		layer = new SpriteMeshLayer();
		scene = new SpriteMeshScene();
	}
}
