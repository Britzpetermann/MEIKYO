package kumite.webgl;

import kumite.canvas.CanvasCase;
import haxe.rtti.Infos;

class InitAction implements Infos
{
	@Inject
	public var canvas : CanvasCase;
	
	@Inject
	public var antialias : Bool;
	
	public function new() {}
	
	@Sequence("boot", "init")
	public function init()
	{
		GL.init(canvas.itself, antialias);
	}

}
