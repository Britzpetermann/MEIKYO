package kumite.stage;

import js.Lib;
import js.Dom;

import bpmjs.Messenger;

import haxe.rtti.Infos;

class StageResizeAction implements Infos
{
	@Messenger
	public var messenger : Messenger;
	
	@Inject
	public var stage : Stage;
	
	public function new();
	
	@Sequence("boot", "initPrepare")
	public function initPrepare()
	{
		updateSize();
	}
	
	@Sequence("boot", "startComplete")
	public function startComplete()
	{
		GLAnimationFrame.run(timerUpdate);
		Lib.window.onresize = onResize;
	}

	function timerUpdate()
	{
		if (stage.width != Lib.window.innerWidth || stage.height != Lib.window.innerHeight)
			onResize();
	}

	function onResize(?event : Event)
	{
		updateSize();
		sendResizeMessage();
	}
	
	function updateSize()
	{
		stage.width = Std.int(Lib.window.innerWidth);
		stage.height = Std.int(Lib.window.innerHeight);
	}

	function sendResizeMessage()
	{
		messenger.send(new StageResizeMessage());
	}
}
