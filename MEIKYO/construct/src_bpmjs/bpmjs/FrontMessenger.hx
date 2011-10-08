package bpmjs;

interface FrontMessenger
{
	function addMessenger(messenger : Messenger) : Void;

	function addReceiver(receivingObject : Dynamic, methodName : String, type : Class<Dynamic>) : Void;
}

class DefaultFrontMessenger implements FrontMessenger
{
	var receivers : Array<Receiver>;

	public function new()
	{
		receivers = new Array();
	}

	public function addMessenger(messenger : Messenger)
	{
		Log.info(Type.getClassName(Type.getClass(messenger)));
		messenger.addReceiver(null, handleMessage);
	}

	public function addReceiver(receivingObject : Dynamic, methodName : String, type : Class<Dynamic>)
	{
		Log.info(Type.getClassName(Type.getClass(receivingObject)) + "#" + methodName, Type.getClassName(type));
		receivers.push(new Receiver(receivingObject, methodName, type));
	}

	function handleMessage(message : Dynamic)
	{
		Log.info(Type.getClassName(Type.getClass(message)));
		for(receiver in receivers)
		{
			if (receiver.matches(message))
			{
				receiver.execute(message);
			}
		}
	}
}

private class Receiver
{
	public var receiver : Dynamic;
	public var method : Dynamic;
	public var methodName : String;
	public var type : Class<Dynamic>;

	public function new(receiver : Dynamic, methodName : String, type : Class<Dynamic>)
	{
		this.receiver = receiver;
		this.type = type;
		this.method = Reflect.field(receiver, methodName);
		this.methodName = methodName;
	}

	inline public function matches(message : Dynamic)
	{
		return Type.getClass(message) == type;
	}

	inline public function execute(message : Dynamic)
	{
		Log.info(Type.getClassName(Type.getClass(receiver)) + "#" + methodName);
		Reflect.callMethod(receiver, method, [message]);
	}
}
