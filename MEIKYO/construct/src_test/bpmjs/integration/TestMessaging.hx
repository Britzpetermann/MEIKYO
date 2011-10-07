package bpmjs.integration;

import TestRunner;

import bpmjs.Event;
import bpmjs.ContextBuilder;
import bpmjs.FrontController;

class TestMessaging extends SummerTestCase
{
	public static var messageReceivedCount;

	public override function setup()
	{
		messageReceivedCount = 0;
	}

	public function testDefaultFrontController()
	{
		var context = ContextBuilder.build(Config);
		assertNotNull(context.contextConfig.frontController);

		var frontControllerClass = Type.getClass(context.contextConfig.frontController);
		assertEquals(DefaultFrontController, frontControllerClass);
	}

	public function testCustomFrontController()
	{
		var customContextConfig = new ContextConfig();
		customContextConfig.frontController = new MockFrontController();

		var context = ContextBuilder.build(Config, customContextConfig);
		assertNotNull(context.contextConfig.frontController);

		var frontControllerClass = Type.getClass(context.contextConfig.frontController);
		assertEquals(MockFrontController, frontControllerClass);
	}

	public function testDispatcherAdded()
	{
		var mockFrontController = new MockFrontController();

		var customContextConfig = new ContextConfig();
		customContextConfig.frontController = mockFrontController;

		var context = ContextBuilder.build(Config, customContextConfig);

		assertEquals(1, mockFrontController.addDispatcherCount);
		assertEquals(context.getObjectByType(A), mockFrontController.lastDispatcher);
	}

	public function testReceiverAdded()
	{
		var mockFrontController = new MockFrontController();

		var customContextConfig = new ContextConfig();
		customContextConfig.frontController = mockFrontController;

		var context = ContextBuilder.build(Config, customContextConfig);

		assertEquals(1, mockFrontController.addReceiverCount);
		assertEquals(context.getObjectByType(B), mockFrontController.lastReceivingObject);
		assertEquals("handleStart", mockFrontController.lastMethodName);
		assertEquals(Event, cast mockFrontController.lastEventClass);
	}

	public function testMessageReceived()
	{
		ContextBuilder.build(Config);
		assertEquals(1, messageReceivedCount);
	}
}

private class MockFrontController implements FrontController
{
	public var addDispatcherCount : Int;
	public var lastDispatcher : EventDispatcher;
	
	public var addReceiverCount : Int;
	public var lastReceivingObject : Dynamic;
	public var lastMethodName : String;
	public var lastEventClass : Class<Dynamic>;

	public function new()
	{
		addDispatcherCount = 0;
		addReceiverCount = 0;
	}

	public function addDispatcher(dispatcher : EventDispatcher) : Void
	{
		addDispatcherCount++;

		lastDispatcher = dispatcher;
	}

	public function addReceiver(receivingObject : Dynamic, methodName : String, eventClass : Class<Dynamic>) : Void
	{
		addReceiverCount++;

		lastReceivingObject = receivingObject;
		lastMethodName = methodName;
		lastEventClass = eventClass;
	}
}

private class Config implements haxe.rtti.Infos
{
	public var a : A;
	public var b : B;

	public function new()
	{
		a = new A();
		b = new B();
	}
}

@ManagedEvents()
private class A extends EventDispatcher
{
	@Complete
	public function handleComplete()
	{
		dispatchEvent(new Event());
	}
}

private class B implements haxe.rtti.Infos
{
	public function new()
	{

	}

	@MessageHandler
	public function handleStart(event : Event)
	{
		TestMessaging.messageReceivedCount++;
	}
}
