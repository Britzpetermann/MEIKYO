package kumite.presentation;

import haxe.rtti.Infos;

class PresentationConfig implements Infos
{
	var canvasSlider:CanvasSlider;
	
	public function new()
	{
		canvasSlider = new CanvasSlider();
	}
}
