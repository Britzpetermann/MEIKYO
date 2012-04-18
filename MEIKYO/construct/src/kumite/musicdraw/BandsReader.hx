package kumite.musicdraw;

import haxe.rtti.Infos;

import bpmjs.HTTPTask;

class BandsReader implements Infos
{
	@Inject
	public var analyzer:MusicAnalyzer;
	
	var location:String;

	public function new()
	{
	}
	
	public function read(location:String)
	{
		this.location = location;

		var task = new HTTPTask();
		task.completeSignaler.bind(handleHTTPComplete);
		task.location = location;

		return task;
	}

	function handleHTTPComplete(task:HTTPTask)
	{
		var data = hxjson2.JSON.decode(task.data);
		analyzer.bands = data.bands;
		Log.info("bands: " + analyzer.bands.length);
		Log.info("notes: " + analyzer.bands[0].length);
	}
}
