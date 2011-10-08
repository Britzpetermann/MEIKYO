package kumite.webgl;

import kumite.canvas.CanvasCase;
import haxe.rtti.Infos;

class InitAction implements Infos
{
	@Inject
	public var canvas : CanvasCase;
	
	@Inject
	public var gl : GLCase;
	
	public var antialias : Bool;
	
	public function new() {}
	
	@Sequence("boot", "init")
	public function init()
	{
		var params = {antialias : antialias};

		gl.itself = canvas.itself.getContext("webgl", params);
		if (gl.itself == null)
			gl.itself = canvas.itself.getContext("experimental-webgl", params);

		if (gl.itself == null)
		{
			throw "Could not initialise WebGL.";
		}
	}

}
