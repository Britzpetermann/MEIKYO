package bpmjs;
import bpmjs.Event;

interface FrontController
{
	function addDispatcher(dispatcher : EventDispatcher) : Void;

	function addReceiver(receivingObject : Dynamic, methodName : String, type : Class<Dynamic>) : Void;
}

class DefaultFrontController implements FrontController {

	var receivers : Array<Receiver>;

	public function new()
	{
		receivers = new Array();
	}

	public function addDispatcher(dispatcher : EventDispatcher)
	{
		Log.info(dispatcher);
		dispatcher.addEventListener(null, handleEvent);
	}

	public function addReceiver(receivingObject : Dynamic, methodName : String, type : Class<Dynamic>)
	{
		Log.info(receivingObject + ":" + methodName, Type.getClassName(type));
		receivers.push(new Receiver(receivingObject, methodName, type));
	}

	function handleEvent(event : Event)
	{
		Log.info(event);
		for(receiver in receivers)
		{
			if (receiver.matches(event))
			{
				receiver.execute(event);
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

	inline public function matches(event : Event)
	{
		return Type.getClass(event) == type;
	}

	inline public function execute(event : Event)
	{
		Log.info(receiver + ":" + methodName);
		Reflect.callMethod(receiver, method, [event]);
	}
}
