package kumite.lgl;

class LGLWorker
{
	static function main()
	{
		var instance = new LGLWorker();
		untyped __js__("onmessage = function(e){instance.start(postMessage, e);}");
	}
	
	public function new()
	{
	}
	
	function start(postMessage:Dynamic->Void, e:Dynamic)
	{
		var lgl:LGL = untyped haxe.Unserializer.run(e.data);
		
		var vertexBuffer = new Float32Array(lgl.edges.length * 6);
		
		function setMessage(type:String, message:Dynamic):Void
		{
			postMessage(haxe.Serializer.run(new Command(type)));	
			postMessage(message);
		}
		
		var lglLayout = new LGLLayout();
		lglLayout.lgl = lgl;
		lglLayout.setMessage = setMessage;
		lglLayout.start();
		
		while(true)
		{
			var start = Date.now().getTime();
			for(i in 0 ... 1)
				lglLayout.render();
			setMessage("Time", Date.now().getTime() - start);	
			postMessage(haxe.Serializer.run(new Command("render")));	
			postMessage(createMessage(vertexBuffer, lgl));
		}
	}
	
	function createMessage(vertexBuffer:Float32Array, lgl:LGL)
	{
		var index = 0;
		
		for(edge in lgl.edges)
		{
			var v1 = lgl.vertexes[edge.v1Index];
			var v2 = lgl.vertexes[edge.v2Index];
			
			vertexBuffer[index + 0] = v1.positionX;
			vertexBuffer[index + 1] = v1.positionY;
			vertexBuffer[index + 2] = v1.positionZ;
			vertexBuffer[index + 3] = v2.positionX;
			vertexBuffer[index + 4] = v2.positionY;
			vertexBuffer[index + 5] = v2.positionZ;
			
			index += 6;
		}

		return vertexBuffer;		
	}
}
