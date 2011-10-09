package kumite.vjinterface;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var vjinterface : VJInterface;
	
	public function new()
	{
		vjinterface = new VJInterface();
	}
}
