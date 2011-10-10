package kumite.displaylist;
import haxe.rtti.Infos;

class ConfigAsLayer implements Infos
{
	public var displayListLayer : DisplayListLayer;
	
	public function new()
	{
		displayListLayer = new DisplayListLayer();
	}
}
