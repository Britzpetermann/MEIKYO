package kumite.canvas;

import kumite.stage.Stage;
import kumite.stage.StageResizeMessage;

import js.Lib;

import haxe.rtti.Infos;

class CanvasController implements Infos
{
	@Inject
	public var canvas : CanvasCase;
	
	@Inject
	public var stage : Stage;
	
	public function new();
	
	@Sequence("boot", "initPrepare")
	public function initPrepare()
	{
		canvas.itself = cast Lib.document.getElementById("content");
	}
	
	@Sequence("boot", "init")
	public function init()
	{
		updateCanvasSizeFromStage();
	}
	
	@Message
	public function updateCanvasSizeFromStage(?message : StageResizeMessage)
	{
		canvas.itself.width = stage.width;
		canvas.itself.height = stage.height;
	}
}
