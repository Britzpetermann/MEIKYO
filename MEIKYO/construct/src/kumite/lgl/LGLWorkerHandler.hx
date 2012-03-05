package kumite.lgl;
import haxe.rtti.Infos;

class LGLWorkerHandler implements Infos
{
	@Inject
	public var lgl : LGL;
	
	@Inject
	public var lglLayer : LGLLayer;
	
	public function new()
	{
	}
	
	public function start()
	{
		var resolver =
		{
			resolveClass:function (name : String) : Class<Dynamic>
			{
				switch(name)
				{
					case "Vec3":
						return Vec3;
					case "kumite.lgl.Vertex":
						return Vertex;
					case "kumite.lgl.Edge":
						return Edge;
					case "kumite.lgl.LGL":
						return LGL;
					default:
						Log.info(name);
						return untyped eval(name);	
				}
			},
			resolveEnum:function (name : String) : Enum<Dynamic>
			{
				return untyped eval(name);
			}
		}
		var worker = new Worker("bin/kumite.lgl.LGLWorker.js?cache=" + Date.now().getTime());
		var lastMessage = Date.now().getTime();
		var command:Command = null;
		var logs = new Hash<String>();
		worker.onmessage = function(e)
		{
			if (command == null)
			{
				command = haxe.Unserializer.run(e.data);
			}
			else
			{
				switch(command.type)
				{
					case "render":
						var now = Date.now().getTime();
						lastMessage = now;
						lglLayer.updateModel(cast e.data);
						logs.set(command.type, Std.string(now - lastMessage));
					default:
						logs.set(command.type, Std.string(e.data));
				}
				command = null;
			}
		};
		
		worker.postMessage(haxe.Serializer.run(lgl));
		
		var t = new haxe.Timer(1000);
		t.run = function()
		{
			var messages = ["Info:"];
			for(logKey in logs.keys())
			{
				messages.push(logKey + ": " + logs.get(logKey));
			}
			
			Log.info(messages.join("\n\t"));
		}
	}
}
