package bpmjs;

import haxe.unit.TestCase;

class TestMessenger extends TestCase
{
	private var completeCount : Int;

	public override function setup() : Void
	{
		completeCount = 0;
	}

	public function testSingleMessage()
	{
		var messenger = new Messenger();
		messenger.addReceiver(Message, incrementCompleteCount);
		messenger.send(new Message());

		assertEquals(1, completeCount);
	}

	public function testDoubleAddListener()
	{
		var messenger = new Messenger();
		messenger.addReceiver(Message, incrementCompleteCount);
		messenger.addReceiver(Message, incrementCompleteCount);
		messenger.send(new Message());

		assertEquals(1, completeCount);
	}

	public function testDoubleSend()
	{
		var messenger = new Messenger();
		messenger.addReceiver(Message, incrementCompleteCount);
		messenger.send(new Message());
		messenger.send(new Message());

		assertEquals(2, completeCount);
	}

	private function incrementCompleteCount(message)
	{
		completeCount++;
	}
}

private class Message
{
	public function new() {}
}