package kumite.vjinterface;

import kumite.stage.Stage;
import kumite.blobs.Blobs;
import kumite.time.Tick;

import bpmjs.Messenger;

import haxe.rtti.Infos;

import haxe.Timer;

class VJStats implements Infos
{
	@Inject
	var stage : Stage;
	
	@Inject
	var blobs : Blobs;
	
	var mouseLabel : GLLabel;
	var debugLabel : GLLabel;
	
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
		//stage.addChild(mouseLabel);
		
		debugLabel = new GLLabel();
		debugLabel.center = false;
		debugLabel.x = 100;
		debugLabel.y = 100;
		debugLabel.text = "DEBUG";
		debugLabel.width = 200;
		debugLabel.height = 200;
		
		//stage.addChild(debugLabel);
	}
	
	@Message
	function tick(tick : Tick)
	{
		var result = new Array<String>();
		for(i in 0...blobs.blobs.length)
		{
			result.push("" + Math.round(blobs.blobs[i].speed * 100000) / 100000);
		}
		debugLabel.text = result.join(", ");
	}
	
	function updateMouse(position : Vec2)
	{
		mouseLabel.x = (position.x) * stage.width - 30; 
		mouseLabel.y = (position.y) * stage.height - 25;
		var x = (position.x - 0.5) * stage.width;
		var y = (position.y - 0.5) * stage.height;
		mouseLabel.text = Std.int(x) + ", " + Std.int(y); 
	}
}