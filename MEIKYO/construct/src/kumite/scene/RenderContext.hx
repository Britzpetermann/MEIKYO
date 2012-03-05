package kumite.scene;

class RenderContext
{
	public var width(getWidth, null) : Int; 
	public var height(getHeight, null) : Int;
	public var aspect(getAspect, null) : Float;
	
	var viewports : Array<Viewport>;
	
	public function new()
	{
		viewports = new Array();
	}
	
	public function resetViewport(width : Int, height : Int)
	{
		viewports = new Array();
		pushViewport(width, height);
	}
	
	public function pushViewport(width : Int, height : Int)
	{
		var viewport = new Viewport();
		viewport.width = width; 
		viewport.height = height;
		
		this.width = viewport.width; 
		this.height = viewport.height; 
		
		viewports.push(viewport);
	}
	
	public function popViewport()
	{
		var viewport = viewports.pop();
	}
	
	function getWidth() : Int
	{
		return viewports[viewports.length - 1].width;
	}
	
	function getHeight() : Int
	{
		return viewports[viewports.length - 1].height;
	}
	
	function getAspect() : Float
	{
		return width / height;
	}
}

private class Viewport
{
	public var width : Int;
	public var height : Int;
	public function new() {}
}