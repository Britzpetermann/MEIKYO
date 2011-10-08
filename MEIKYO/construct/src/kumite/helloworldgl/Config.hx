package kumite.helloworldgl;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var helloWorld : HelloWorld;
	
	public function new()
	{
		helloWorld = new HelloWorld();
	}
}
