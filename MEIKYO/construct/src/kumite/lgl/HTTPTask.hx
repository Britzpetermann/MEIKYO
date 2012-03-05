package kumite.lgl;

import bpmjs.Task;
import bpmjs.TaskError;

class HTTPTask extends Task<HTTPTask>
{
	public var location:String;
	public var data:String;

	override function doStart()
	{
		var r = new haxe.Http(location);
		r.onError = onError;
		r.onData = onData;
		r.request(false);
	}

	function onError(errorData)
	{
		error(this, errorData);
	}

	function onData(data)
	{
		this.data = data;
		complete();
	}
}
