package kumite.uicomponents;

import kumite.stage.Stage;
import kumite.blobs.Blobs;

import bpmjs.Messenger;

import haxe.rtti.Infos;

import haxe.Timer;

class TestComponents implements Infos
{
	@Inject
	var stage : Stage;
	
	var container : GLDisplayObjectContainer;
	
	public function new() {}
	
	@Sequence("boot", "startComplete")	
	public function start()
	{
		var stage = GLDisplayList.getDefault().stage;
		
		container = new GLDisplayObjectContainer();
		container.x = 100;
		container.y = 100;
		
		stage.addChild(container);
		
		testLabel();
		testSlider();
	}
	
	function testLabel()
	{
		var label = new GLLabel();
		label.x = 0;
		label.y = 0;
		label.text = "Label";
		label.width = 60;
		label.height = 20;
		container.addChild(label);
		
		var labelWithMouse = new GLLabel();
		labelWithMouse.mouseEnabled = true;
		labelWithMouse.x = 0;
		labelWithMouse.y = 30;
		labelWithMouse.text = "Label with mouse";
		labelWithMouse.width = 160;
		labelWithMouse.height = 20;
		container.addChild(labelWithMouse);
	}
	
	function testSlider()
	{
		var dragH = new GLDragH();
		dragH.x = 0;
		dragH.y = 60;
		dragH.width = 15;
		dragH.height = 15;
		container.addChild(dragH);
				
		var sliderH = new GLSliderH();
		sliderH.x = 0;
		sliderH.y = 90;
		container.addChild(sliderH);
				
		var sliderH = new GLSliderH();
		sliderH.max = 100;
		sliderH.min = 10;
		sliderH.x = 0;
		sliderH.y = 120;
		sliderH.width = 200;
		container.addChild(sliderH);		
	}
}