package kumite.mouse;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var mouseController : MouseController;
	
	public function new()
	{
		mouseController = new MouseController();
	}
}
