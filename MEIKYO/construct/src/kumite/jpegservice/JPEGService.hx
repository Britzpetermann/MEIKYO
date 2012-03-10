package kumite.jpegservice;

import haxe.rtti.Infos;

import bpmjs.WorkerService;

class JPEGService implements Infos
{
	public function new()
	{
	}

	public function compressAndSave(buffer:ArrayBuffer, width:Int, height:Int, filename:String, complete:Void->Void)
	{
		var workerService = new WorkerService();
		workerService.receiver = {
			setProgress:function(progress:Float)
			{
				Log.info(filename + " " + Math.round(progress * 100) + "%");
			}
		}
		workerService.debug = false;
		workerService.init("bin/kumite.jpegservice.JPEGWorker.js");
		workerService.call("config", [width, height]);
		workerService.callTransfer("compress", buffer, function(jpegBuffer:ArrayBuffer)
		{
			var blobBuilder = new WebKitBlobBuilder();
			blobBuilder.append(jpegBuffer);
			untyped saveAs(blobBuilder.getBlob("example/binary"), filename);
			
			workerService.terminate();
			complete();
		});
	}
}
