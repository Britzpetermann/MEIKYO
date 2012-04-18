package kumite.lgl;
import haxe.rtti.Infos;

import bpmjs.HTTPTask;

class LGLReader implements Infos
{
	@Inject
	public var lgl:LGL;
	public var limit:Int;

	var location:String;

	public function new()
	{
		limit = 1000;
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
		var builder = new LGLBuilder();
		builder.lgl = lgl;

		var data = task.data;
		var lines = data.split("\n");
		var count = 0;
		for(line in lines)
		{
			if (line.charAt(0) == "#")
			{
				var ip = line.substr(2);
				builder.addVertex(ip);
			}
			else
			{
				var elements = line.split(" ");
				if (elements.length != 2)
					Log.info("element length is: " + elements.length + " line:" + line)
				else
					builder.addChild(elements[0]);
			}

			count++;

			if (limit != -1)
			{
				if (count > limit)
					break;
			}
		}
		
		builder.precalculate();
	}
}
