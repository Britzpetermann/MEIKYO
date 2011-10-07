package bpmjs;
import bpmjs.Event;

interface FrontController
{
	function addDispatcher(dispatcher : EventDispatcher, type : String) : Void;

	function addReceiver(receivingObject : Dynamic, methodName : String, eventClass : Class<Dynamic>) : Void;
}

class DefaultFrontController implements FrontController {

	var receivers : Array<Receiver>;

	public function new()
	{
		receivers = new Array();
	}

	public function addDispatcher(dispatcher : EventDispatcher, type : String)
	{
		Log.info(dispatcher, type);
		dispatcher.addEventListener(type, handleEvent);
	}

	public function addReceiver(receivingObject : Dynamic, methodName : String, eventClass : Class<Dynamic>)
	{
		Log.info(receivingObject + ":" + methodName, Type.getClassName(eventClass));
		receivers.push(new Receiver(receivingObject, methodName, eventClass));
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
	public var eventClass : Class<Dynamic>;

	public function new(receiver : Dynamic, methodName : String, eventClass : Class<Dynamic>)
	{
		this.receiver = receiver;
		this.eventClass = eventClass;
		this.method = Reflect.field(receiver, methodName);
		this.methodName = methodName;
	}

	inline public function matches(event : Event)
	{
		return Type.getClass(event) == eventClass;
	}

	inline public function execute(event : Event)
	{
		Log.info(receiver + ":" + methodName);
		Reflect.callMethod(receiver, method, [event]);
	}
}
