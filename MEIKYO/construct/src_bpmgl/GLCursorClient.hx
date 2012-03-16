class GLCursorClient
{
	static var DEFAULT : String = "default";
	static var HAND : String = "pointer";

	public var lastCursor : String;

	public function new()
	{
		lastCursor = "";
	}

	public function defaultCursor()
	{
		if (lastCursor != DEFAULT)
		{
			lastCursor = DEFAULT;
			GLMouseRegistry.getInstance().setCursor(lastCursor);
		}
	}

	public function handCursor()
	{
		if (lastCursor != HAND)
		{
			lastCursor = HAND;
			GLMouseRegistry.getInstance().setCursor(lastCursor);
		}
	}
}
