package kumite.musicdraw;

import haxe.rtti.Infos;

import reflect.ClassInfo;
import bpmjs.WorkerRPC;

import bpmjs.WorkerCommand;

class TestWorkerHandler implements Infos
{
	@Inject
	public var analyzer:MusicAnalyzer;
	
	public var config:MusicDrawConfig;
	public var texture:GLArrayTexture;
	public var textureRegistry:GLTextureRegistry;
	
	var worker:Worker;
	var workerRPC:WorkerRPC;
	
	public function new()
	{
	}
	
	public function start()
	{
		worker = new Worker("bin/kumite.musicdraw.TestWorker.js?cache=" + Date.now().getTime());
		workerRPC = new WorkerRPC();
		workerRPC.sender = worker;
		workerRPC.receiver = this;
		workerRPC.init();
		workerRPC.startDebugTimer();
		worker.onmessage = function(e:WorkerMessageEvent)
		{
			workerRPC.processMessageEvent(e);
		}
		worker.postMessage(haxe.Serializer.run(analyzer));
	}
	
	public function setResult(data:ArrayBuffer)
	{
		texture.array.set(new Uint8Array(data));
		texture.isDirty = true;
		
		worker.webkitPostMessage(data, [data]);
		//workerRPC.sendCommand("setRasterX", config.rasterX);
	}
}
