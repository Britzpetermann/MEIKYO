package app.controller;

import app.event.StageResize;
import app.event.LauncherStart;

import js.Lib;
import js.Dom;

import bpmjs.Event;

import haxe.rtti.Infos;

@ManagedEvents("stageResize")
class StageResizeAction extends EventDispatcher, implements Infos
{
	public var windowWidth : Int;
	public var windowHeight : Int;
	
	@Complete
	public function handleComplete()
	{
		updateSize();
	}

	@MessageHandler
	public function handleLauncherStart(event : LauncherStart)
	{
		GLAnimationFrame.run(timerUpdate);
		Lib.window.onresize = onResize;
	}

	function timerUpdate()
	{
		if (windowWidth != Lib.window.innerWidth || windowHeight != Lib.window.innerHeight)
			onResize();
	}

	function onResize(?event : Event)
	{
		updateSize();
		fireUpdate();
	}

	function updateSize()
	{
		windowWidth = Std.int(Lib.window.innerWidth);
		windowHeight = Std.int(Lib.window.innerHeight);
	}

	private function fireUpdate()
	{
		dispatchEvent(new StageResize());
	}
}