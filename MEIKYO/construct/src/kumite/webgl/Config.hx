package kumite.webgl;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var glCase : GLCase;
	public var initAction : InitAction;
	
	public function new()
	{
		glCase = new GLCase();
		
		initAction = new InitAction();
		initAction.antialias = true;
	}

}
