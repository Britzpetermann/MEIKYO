package kumite.jpegservice;

import bpmjs.WorkingInstance;

class JPEGWorker
{
	var width:Int;
	var height:Int;
	
	static function main()
	{
		untyped importScripts("../lib/JPEGEncoder.js");
		new WorkingInstance(new JPEGWorker());
	}
	
	public function new()
	{
	}
	
	public function config(width:Int, height:Int)
	{
		this.width = width;
		this.height = height;
	}
	
	public function compress(imageBuffer:ArrayBuffer)
	{
		var encoder = new JPEGEncoder(100);
		return encoder.encode(new Uint8Array(imageBuffer), width, height, function(progress:Float)
		{
			WorkingInstance.pipeMethod("setProgress", [progress]);
		});
	}
}
