package kumite.mouse;

import kumite.canvas.CanvasCase;

import haxe.rtti.Infos;

class MouseController implements Infos
{
	@Inject
	public var canvas : CanvasCase;
	
	public function new();
	
	@Sequence("boot", "init")	
	public function start()
	{
		GLMouseRegistry.getInstance().init(canvas.itself);
	}	
}
