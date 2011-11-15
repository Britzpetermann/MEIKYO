package kumite.vjinterface;

import kumite.stage.Stage;

import bpmjs.Messenger;

import haxe.rtti.Infos;

import haxe.Timer;

class VJStats implements Infos
{
	@Inject
	var stage : Stage;
	
	var mouseLabel : GLLabel;
	
	public function new();
	
	@Sequence("boot", "startComplete")	
	public function start()
	{
		var stage = GLDisplayList.getDefault().stage;
		stage.addChild(new GLStats());
		
		GLMouseRegistry.getInstance().mouseMoveSignaler.bind(updateMouse);
		
		mouseLabel = new GLLabel();
		mouseLabel.x = 0;
		mouseLabel.y = 0;
		mouseLabel.text = "1000x1000";
		mouseLabel.width = 60;
		mouseLabel.height = 20;
		stage.addChild(mouseLabel);
	}
	
	function updateMouse(position : Vec2)
	{
		mouseLabel.x = (position.x) * stage.width - 30; 
		mouseLabel.y = (position.y) * stage.height - 20;
		var x = (position.x - 0.5) * stage.width;
		var y = (position.y - 0.5) * stage.height;
		mouseLabel.text = Std.int(x) + ", " + Std.int(y); 
	}
}