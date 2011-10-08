package kumite.canvas;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var canvasCase : CanvasCase;
	public var canvasController : CanvasController;
	
	public function new()
	{
		canvasCase = new CanvasCase();
		canvasController = new CanvasController();
	}
}
