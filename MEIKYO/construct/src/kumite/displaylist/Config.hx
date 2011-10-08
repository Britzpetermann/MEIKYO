package kumite.displaylist;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var displayListController : DisplayListController;
	
	public function new()
	{
		displayListController = new DisplayListController();
	}
}
