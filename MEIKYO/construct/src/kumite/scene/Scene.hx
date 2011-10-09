package kumite.scene;

class Scene
{
	public var layers : Array<Layer>;
	
	public var name : String;
	
	public function new()
	{
		layers = new Array();
	}
	
	public function addLayer(layer : Layer)
	{
		layers.push(layer);
	}
	
	public function containsLayer(layer : Layer)
	{
		for (sceneLayer in layers)
		{
			if (sceneLayer.id == layer.id)
				return true;
		}
		
		return false;
	}
	
	public function getLayerIndex(layer : Layer)
	{
		for(i in 0...layers.length)
		{
			if (layers[i].id == layer.id)
				return i;
		}
		return -1;
	}
}
