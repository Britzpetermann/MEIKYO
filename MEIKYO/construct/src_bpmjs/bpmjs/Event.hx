package bpmjs;

class Event
{
	public var target : EventDispatcher;
	
	public var type(getType, null) : Class<Dynamic>;

	public function new() {}
	
	private function getType()  : Class<Dynamic>
	{
		return Type.getClass(this);
	}
}
