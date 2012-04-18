class GLDisplayObjectContainer extends GLDisplayObject
{
	public var children : Array<GLDisplayObject>;

	public function new()
	{
		super();
		children = new Array();
	}

	public function addChild(child : GLDisplayObject)
	{
		child.parent = this;
		children.push(child);
	}

	public function removeChild(child : GLDisplayObject)
	{
		children.remove(child);
	}
	
	public function removeAllChildren()
	{
		children = new Array();
	}
}
