package bpmjs;

class Messenger
{
	private var receivers : Array<ReceiverForType>;

	public function new()
	{
		receivers = new Array();
	}

	public function addReceiver(type : Class<Dynamic>, listener : Dynamic->Void)
	{
		removeReceiver(type, listener);
		receivers.push(new ReceiverForType(type, listener));
	}

	public function removeReceiver(type : Class<Dynamic>, listener : Dynamic->Void)
	{
		for(receiver in receivers)
		{
			if (receiver.type == type && Reflect.compareMethods(listener, receiver.method))
			{
				receivers.remove(receiver);
				return;
			}
		}
	}

	public function send(message : Dynamic)
	{
		for(receiver in receivers)
		{
			if (receiver.type == null || receiver.type == Type.getClass(message))
				receiver.method(message);
		}
	}

	public function toString() : String
	{
		return Type.getClassName(Type.getClass(this));
	}
}

private class ReceiverForType
{
	public var type : Class<Dynamic>;
	public var method : Dynamic->Void;

	public function new(type, method)
	{
		this.type = type;
		this.method = method;
	}
}