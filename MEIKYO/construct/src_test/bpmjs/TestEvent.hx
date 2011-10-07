package bpmjs;

import haxe.unit.TestCase;

import bpmjs.Event;

class TestEvent extends TestCase
{
	private var completeCount : Int;
	private var complete2Count : Int;

	public override function setup() : Void
	{
		completeCount = 0;
		complete2Count = 0;
	}

	public function testSingleEvent()
	{
		var eventDispatcher = new EventDispatcher();
		eventDispatcher.addEventListener(Event, incrementCompleteCount);
		eventDispatcher.dispatchEvent(new Event());

		assertEquals(1, completeCount);
	}

	public function testDoubleAddListener()
	{
		var eventDispatcher = new EventDispatcher();
		eventDispatcher.addEventListener(Event, incrementCompleteCount);
		eventDispatcher.addEventListener(Event, incrementCompleteCount);
		eventDispatcher.dispatchEvent(new Event());

		assertEquals(1, completeCount);
	}

	public function testDoubleDispatch()
	{
		var eventDispatcher = new EventDispatcher();
		eventDispatcher.addEventListener(Event, incrementCompleteCount);
		eventDispatcher.dispatchEvent(new Event());
		eventDispatcher.dispatchEvent(new Event());

		assertEquals(2, completeCount);
	}

	public function testMyEvent()
	{
		var eventDispatcher = new EventDispatcher();
		eventDispatcher.addEventListener(MyEvent, incrementComplete2Count);
		eventDispatcher.dispatchEvent(new MyEvent());

		assertEquals(1, complete2Count);
	}

	private function incrementCompleteCount(event)
	{
		completeCount++;
	}

	private function incrementComplete2Count(event)
	{
		complete2Count++;
	}
}

private class MyEvent extends Event
{
}
