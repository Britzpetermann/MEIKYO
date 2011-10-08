package bpmjs;

import TestRunner;

import bpmjs.FrontMessenger;

class TestFrontMessenger extends SummerTestCase
{
	public static var receiveCount;

	public override function setup()
	{
		receiveCount = 0;
	}

	public function testWithMessage2()
	{
		var sendingObject = new CustomSendingObject();
		var receivingObject = new CustomReceivingObject();

		var frontMessenger = new DefaultFrontMessenger();
		frontMessenger.addMessenger(sendingObject);
		frontMessenger.addReceiver(receivingObject, "handleComplete", Message2);

		sendingObject.doSend();

		assertEquals(1, receiveCount);
	}

	public function testNoSendWithMessage2()
	{
		var sendingObject = new SendingObject();
		var receivingObject = new CustomReceivingObject();

		var frontMessenger = new DefaultFrontMessenger();
		frontMessenger.addMessenger(sendingObject);
		frontMessenger.addReceiver(receivingObject, "handleComplete", Message2);

		sendingObject.doSend();

		assertEquals(0, receiveCount);
	}
}

private class SendingObject extends Messenger
{
	public function new()
	{
		super();
	}

	public function doSend()
	{
		send(new Message1());
	}
}

private class CustomSendingObject extends Messenger
{
	public function new()
	{
		super();
	}

	public function doSend()
	{
		send(new Message2());
	}
}

private class CustomReceivingObject
{
	public function new()
	{

	}

	public function handleComplete(message : Message2)
	{
		TestFrontMessenger.receiveCount++;
	}
}

private class Message1
{
	public function new() {}
}

private class Message2
{
	public function new() {}
}
