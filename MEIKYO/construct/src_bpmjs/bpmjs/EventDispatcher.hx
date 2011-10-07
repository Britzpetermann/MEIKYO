package bpmjs;

class EventDispatcher
{
	private var listeners : Array<ListenerForType>;

	public function new()
	{
		listeners = new Array();
	}

	public function addEventListener(type : Class<Dynamic>, listener : Event->Void)
	{
		removeEventListener(type, listener);
		listeners.push(new ListenerForType(type, listener));
	}

	public function removeEventListener(type : Class<Dynamic>, listener : Event->Void)
	{
		for(listenerForType in listeners)
		{
			if (listenerForType.type == type && Reflect.compareMethods(listener, listenerForType.listener))
			{
				listeners.remove(listenerForType);
				return;
			}
		}
	}

	public function dispatchEvent(event : Event)
	{
		//trace("dispatchEvent: " + event + " at: " + this);
		event.target = this;
		for(listener in listeners)
		{
			if (listener.type == null || listener.type == event.type)
				listener.listener(event);
		}
	}

	public function toString() : String
	{
		return Type.getClassName(Type.getClass(this));
	}
}

private class ListenerForType
{
	public var type : Class<Dynamic>;
	public var listener : Event->Void;

	public function new(type, listener)
	{
		this.type = type;
		this.listener = listener;
	}
}