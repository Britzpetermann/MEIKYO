package bpmjs.integration;

import bpmjs.ContextBuilder;
import bpmjs.FrontMessenger;
import haxe.rtti.Infos;

class TestMessaging extends TestCase2
{
	public static var messageReceivedCount;

	public override function setup()
	{
		messageReceivedCount = 0;
	}

	public function testDefaultFrontController()
	{
		var context = ContextBuilder.build(Config);
		assertNotNull(context.contextConfig.frontMessenger);

		var frontControllerClass = Type.getClass(context.contextConfig.frontMessenger);
		assertEquals(DefaultFrontMessenger, frontControllerClass);
	}

	public function testCustomFrontController()
	{
		var customContextConfig = new ContextConfig();
		customContextConfig.frontMessenger = new MockFrontMessenger();

		var context = ContextBuilder.build(Config, customContextConfig);
		assertNotNull(context.contextConfig.frontMessenger);

		var frontControllerClass = Type.getClass(context.contextConfig.frontMessenger);
		assertEquals(MockFrontMessenger, frontControllerClass);
	}

	public function testMessengerAdded()
	{
		var mockFrontMessenger = new MockFrontMessenger();

		var customContextConfig = new ContextConfig();
		customContextConfig.frontMessenger = mockFrontMessenger;

		var context = ContextBuilder.build(Config, customContextConfig);

		assertEquals(1, mockFrontMessenger.addMessengerCount);
		assertEquals(context.getObjectByType(A), mockFrontMessenger.lastMessenger);
	}

	public function testReceiverAdded()
	{
		var mockFrontMessenger = new MockFrontMessenger();

		var customContextConfig = new ContextConfig();
		customContextConfig.frontMessenger = mockFrontMessenger;

		var context = ContextBuilder.build(Config, customContextConfig);

		assertEquals(1, mockFrontMessenger.addReceiverCount);
		assertEquals(context.getObjectByType(B), mockFrontMessenger.lastReceivingObject);
		assertEquals("handleStart", mockFrontMessenger.lastMethodName);
		assertEquals(Message, cast mockFrontMessenger.lastMessageClass);
	}

	public function testMessageReceived()
	{
		ContextBuilder.build(Config);
		assertEquals(1, messageReceivedCount);
	}
	
	public function testMessageReceivedWithMessenger()
	{
		ContextBuilder.build(ConfigWithMessenger);
		assertEquals(1, messageReceivedCount);
	}
}

private class MockFrontMessenger implements FrontMessenger
{
	public var addMessengerCount : Int;
	public var lastMessenger : Messenger;
	
	public var addReceiverCount : Int;
	public var lastReceivingObject : Dynamic;
	public var lastMethodName : String;
	public var lastMessageClass : Class<Dynamic>;

	public function new()
	{
		addMessengerCount = 0;
		addReceiverCount = 0;
	}

	public function addMessenger(messenger : Messenger) : Void
	{
		addMessengerCount++;

		lastMessenger = messenger;
	}

	public function addReceiver(receivingObject : Dynamic, methodName : String, messageClass : Class<Dynamic>) : Void
	{
		addReceiverCount++;

		lastReceivingObject = receivingObject;
		lastMethodName = methodName;
		lastMessageClass = messageClass;
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

private class ConfigWithMessenger implements haxe.rtti.Infos
{
	public var a : AWithMessenger;
	public var b : B;

	public function new()
	{
		a = new AWithMessenger();
		b = new B();
	}
}


private class A extends Messenger
{
	@Complete
	public function handleComplete()
	{
		send(new Message());
	}
}

private class AWithMessenger implements Infos
{
	@Messenger
	public var messenger : Messenger;
	
	public function new();
	
	@Complete
	public function handleComplete()
	{
		messenger.send(new Message());
	}
}

private class B implements Infos
{
	public function new()
	{

	}

	@Message
	public function handleStart(message : Message)
	{
		TestMessaging.messageReceivedCount++;
	}
}

class Message
{
	public function new();
}