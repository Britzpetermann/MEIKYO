package kumite.musicdraw;

import haxe.rtti.Infos;

import bpmjs.TaskGroup;
import bpmjs.Messenger;

import kumite.time.Tick;

class MusicDrawConfig implements Infos
{
	@Inject
	public var stage : GLStage;

	@Messenger
	public var messenger : Messenger;

	public var analyzer : MusicAnalyzer;
	public var bandsReader:BandsReader;
		
	public var jpegTasks : TaskGroup;
	
	var saveButton:GLLabel;
	var saveProgressBar:GLProgressBar;
	
	public function new()
	{
		jpegTasks = new TaskGroup();
		jpegTasks.autoStart = true;
		jpegTasks.parallelTasksMax = 4;
		
		analyzer = new MusicAnalyzer();
		bandsReader = new BandsReader();
	}

	@Sequence("boot", "init")
	public function init()
	{
		var group = new bpmjs.SequencerTaskGroup();
//		group.add(bandsReader.read("data/bands/expo2000.json"));
		group.add(bandsReader.read("data/bands/wonderfulWord.json"));
//		group.add(bandsReader.read("data/bands/bands.json"));
		return group;
	}

	@Sequence("boot", "start")
	public function start()
	{
		saveButton = new GLLabel();
		saveButton.mouseEnabled = true;
		saveButton.text = "Save";
		saveButton.x = 10;
		saveButton.y = 40;
		saveButton.width = 200;
		saveButton.height = 20;
		saveButton.mouseDownSignaler.bind(function(_)
		{
			messenger.send(new SaveRequest(jpegTasks));
			jpegTasks.recomputeMonitor();
		});
		stage.addChild(saveButton);
		
		saveProgressBar = new GLProgressBar();
		saveProgressBar.x = 10;
		saveProgressBar.y = 40;
		saveProgressBar.width = 200;
		saveProgressBar.height = 20;
		stage.addChild(saveProgressBar);
	}
	
	@Message
	public function tick(tick:Tick)
	{
		if (jpegTasks.monitor.current == 1 || jpegTasks.monitor.current == 0)
		{
			saveProgressBar.progress = 0;
			saveButton.text = "Save";
		}
		else
		{
			saveProgressBar.progress = jpegTasks.monitor.current; 
			saveButton.text = "Save (Jobs: " + jpegTasks.getTotalTaskCount() + ")";
		}
	}
}