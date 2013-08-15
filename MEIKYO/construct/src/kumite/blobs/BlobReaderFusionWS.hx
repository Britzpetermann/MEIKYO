package kumite.blobs;

import kumite.time.Time;
import bpmjs.FrameTimer;
import haxe.rtti.Infos;
import kumite.fusion.FusionConnection;
import kumite.fusion.FusionConfig;

class BlobReaderFusionWS implements Infos
{
	public static var BLOB_ID : Int = 0;
	
	@Inject
	public var blobs : Blobs;
	
	@Inject
	public var time : Time;
	
	var lastParse : Float;
	
	var config : FusionConfig;
	var fusion : FusionConnection;
	
	public function new()
	{
		FusionConnection.host = "ws://192.168.1.50:12010";
		lastParse = 0;
	}
	
	@Sequence("boot", "finish")
	public function start()
	{
		config = {
				name: "Eyes",
				clipping: [
					{type:"include", xMin:-2500, xMax:2500, yMin:-1000, yMax:200, zMin:200, zMax:1600},
				],
				blobs: {
					enabled : true,
					minPointsPerCell: 1,
					smoothing: 0.1,					
					width: 100,
					depth: 50
				}
			};
		fusion = new FusionConnection();
		fusion.dataSignaler.bind(handleFusionData);
		fusion.setConfig(config);
		fusion.init();
		
		var timer = new FrameTimer();
		timer.run = run;
		timer.start();
	}
	
	function run()
	{
		fusion.get();
	}
	
	function handleFusionData(data : ArrayBuffer)
	{
//		trace("data: " + data.byteLength);	

		var newBlobs = new Array<Blob>();
		
		var floats = new Float32Array(data);
		var blobCount = Std.int(floats.length / 3);
			
//		trace("blobs:");
		var clipping = config.clipping[0];
		for(i in 0...blobCount)
		{
			var blob = new Blob();
			blob.x = floats[i * 3 + 0] / (clipping.xMax - clipping.xMin);
			blob.y = floats[i * 3 + 1] / (clipping.yMax - clipping.yMin);
			blob.z = floats[i * 3 + 2] / (clipping.zMax - clipping.zMin);
			newBlobs.push(blob);
//			trace(blob.x + ", " + blob.y + ", " + blob.z);
		}
		
		mergeBlobs(newBlobs);		
	}
	
	function onData(r)
	{
		//if (time.ms - lastParse > 50)
		{
			lastParse = time.ms;
			var xml = Xml.parse(r);
			//trace(xml);
			//trace(xml.firstElement());
			var newBlobs = new Array<Blob>();
			
			try
			{
				for(p in xml.firstElement())
				{
					var fast = new haxe.xml.Fast(p);
		     		var blob = new Blob();
					blob.x = Std.parseFloat(fast.att.x);
					blob.y = Std.parseFloat(fast.att.y);
					blob.z = Std.parseFloat(fast.att.z);
					blob.area = Std.parseFloat(fast.att.area);
					newBlobs.push(blob);
				}
			}
			catch(e : Dynamic)
			{
				//trace(e);
			}
			
			mergeBlobs(newBlobs);
		}
	}
	
	function mergeBlobs(newBlobs : Array<Blob>)
	{
		var result : Array<Blob> = new Array();
		
		for(newBlob in newBlobs)
		{
			var equalOldBlob : Blob = null;
			
			for(oldBlob in blobs.blobs)
			{
				if (getDist(newBlob, oldBlob) < 0.3)
				{
					equalOldBlob = oldBlob;
					break; 
				}
			}
			
			if (equalOldBlob == null)
			{
				BLOB_ID++;
				newBlob.speed = 0;
				newBlob.blobId = BLOB_ID;
			}
			else
			{
				newBlob.blobId = equalOldBlob.blobId;
				var newSpeed = getDist(equalOldBlob, newBlob) * (1 / 0.01);
				newBlob.speed = equalOldBlob.speed;
				newBlob.speed += (newSpeed - newBlob.speed) * 0.2;
				newBlob.speed = Clamp.float(newBlob.speed, 0, 1);
				//newBlob.direction = Clamp.float(newBlob.speed, 0, 1);
				blobs.blobs.remove(equalOldBlob);
			}
			result.push(newBlob);
		}
		
		blobs.blobs = result;
	}
	
	function getDist(newBlob : Blob, oldBlob : Blob)
	{
		var dx = newBlob.x - oldBlob.x;
		var dy = newBlob.y - oldBlob.y;
		//var dz = newBlob.z - oldBlob.z;
		var dz = 0;
		var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
		
		return dist;
	}
}
