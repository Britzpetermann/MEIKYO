package kumite.vjinterface;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var vjinterface : VJInterface;
	public var vjstats : VJStats;
	public var vjlayers : VJLayers;
	
	public function new()
	{
		vjstats = new VJStats();
		//vjinterface = new VJInterface();
		//vjlayers = new VJLayers();
	}
	
}
