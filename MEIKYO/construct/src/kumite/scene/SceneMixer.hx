package kumite.scene;

class SceneMixer
{
	private var from : Scene;
	private var to : Scene;
	
	public function new();
	
	public function mix(from : Scene, to : Scene) : Scene
	{
		this.from = from;
		this.to = to;
		
		var result = new Scene();
		
		for(layer in to.layers)
		{
			if (from.containsLayer(layer))
				layer.state = LayerState.KEEP;
			else
				layer.state = LayerState.IN;
			result.addLayer(layer);
		}
		
		for(layer in from.layers)
		{
			if (!result.containsLayer(layer))
			{
				layer.state = LayerState.OUT;
				result.addLayer(layer);
			}
		}
		
		result.layers.sort(sorter);
		
		return result;
	}
	
	function sorter(a : Layer, b : Layer) : Int
	{
		//trace("compare: " + a.id + " " + b.id);
		var from = this.from;
		var to = this.to;
		
		function result(value : Int, ?i : haxe.PosInfos) : Int
		{
			//trace("result: " + value + " exit: " + i.lineNumber);
			return value;
		}
		
		var aInFrom = from.containsLayer(a);
		var aInTo = to.containsLayer(a);
		
		var bInFrom = from.containsLayer(b);
		var bInTo = to.containsLayer(b);
		
		if (aInTo && bInTo)
		{
			var bOverA = to.getLayerIndex(b) > to.getLayerIndex(a);
			if (bOverA)
				return result(-1);
			else
				return result(1);
		}
		
		if (aInFrom && bInFrom)
		{
			var bOverA = from.getLayerIndex(b) > from.getLayerIndex(a);
			if (bOverA)
				return result(-1);
			else
				return result(1);
		}
		
		if (aInFrom && !aInTo && !bInFrom && bInTo)
		{
			function computeHasAPredecessorThatIsOverB()
			{
				var aIndex = from.getLayerIndex(a) - 1;
				while(aIndex >= 0)
				{
					var bIndex = to.getLayerIndex(b) + 1;
					while(bIndex < to.layers.length)
					{
						if (to.layers[bIndex].layerId == from.layers[aIndex].layerId)
							return true;
						bIndex++;
					}
					aIndex--;
				}
				
				return false;
			}
			var hasAPredecessorThatIsOverB = computeHasAPredecessorThatIsOverB();
			
			if (hasAPredecessorThatIsOverB)
				return result(1);
			else
				return result(-1);
		}
			
		if (aInTo && !aInFrom && !bInTo && bInFrom)
			return result(1);
		
		return result(0);
	}
}
