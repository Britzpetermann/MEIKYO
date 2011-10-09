package kumite.vjinterface;

import kumite.time.Tick;

import haxe.rtti.Infos;

class VJInterface implements Infos
{
	var stage : GLStage;
	var cutButton : GLLabel;
	var shortButton : GLLabel;
	var longButton : GLLabel;
	
	public function new() {}
	
	@Sequence("boot", "start")	
	public function start()
	{
		stage = GLDisplayList.getDefault().stage;
		stage.addChild(new GLStats());

		cutButton = new GLLabel();
		cutButton.x = 10;
		cutButton.text = "CUT";
		cutButton.width = 80;
		cutButton.height = 20;
		stage.addChild(cutButton);
		
		shortButton = new GLLabel();
		shortButton.x = 10;
		shortButton.text = "SHORT";
		shortButton.width = 80;
		shortButton.height = 20;
		stage.addChild(shortButton);
		
		longButton = new GLLabel();
		longButton.x = 10;
		longButton.text = "LONG";
		longButton.width = 80;
		longButton.height = 20;
		stage.addChild(longButton);
	}
	
	@Message
	public function render(tick : Tick)
	{
		cutButton.y = stage.stageHeight - 90;
		shortButton.y = stage.stageHeight - 60;
		longButton.y = stage.stageHeight - 30;
	}
}