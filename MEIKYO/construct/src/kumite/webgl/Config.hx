package kumite.webgl;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var initAction : InitAction;
	
	public function new()
	{
		initAction = new InitAction();
		initAction.antialias = true;
	}

}
