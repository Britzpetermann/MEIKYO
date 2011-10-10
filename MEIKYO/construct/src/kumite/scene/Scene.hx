package kumite.scene;

class Scene
{
	public var layers : Array<Layer>;
	
	public var id : String;
	
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
			if (sceneLayer.layerId == layer.layerId)
				return true;
		}
		
		return false;
	}
	
	public function getLayerIndex(layer : Layer)
	{
		for(i in 0...layers.length)
		{
			if (layers[i].layerId == layer.layerId)
				return i;
		}
		return -1;
	}
}
