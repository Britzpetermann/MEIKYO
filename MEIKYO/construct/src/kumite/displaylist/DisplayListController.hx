package kumite.displaylist;

import kumite.stage.Stage;
import kumite.time.Tick;

import bpmjs.Stats;

import haxe.rtti.Infos;

class DisplayListController implements Infos
{
	@Inject
	public var stage : Stage;
	
	private var renderer : GLDisplayListRenderer;
	
	public function new() {}

	@Sequence("boot", "start")	
	public function start()
	{
		renderer = new GLDisplayListRenderer();
		renderer.init();
		
		var root = GLDisplayList.getDefault().stage;
		root.addChild(new GLStats());
	}
	
	@Message
	public function render(tick : Tick)
	{
		Stats.measureFPS();
		
		GLDisplayList.getDefault().dispatchEnterFrame();
		renderer.render(stage.width, stage.height);		
	}
}
