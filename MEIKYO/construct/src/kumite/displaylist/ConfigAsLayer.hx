package kumite.displaylist;
import haxe.rtti.Infos;

class ConfigAsLayer implements Infos
{
	public var displayListLayer : DisplayListLayer;
	public var stage : GLStage;
	
	public function new()
	{
		displayListLayer = new DisplayListLayer();
		stage = GLDisplayList.getDefault().stage;
	}
}
