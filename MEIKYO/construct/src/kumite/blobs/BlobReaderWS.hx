package kumite.blobs;

import kumite.time.Time;
import haxe.rtti.Infos;

class BlobReaderWS implements Infos
{
	public static var BLOB_ID : Int = 0;
	
	@Inject
	public var blobs : Blobs;
	
	@Inject
	public var time : Time;
	
	var host : String;
	var socket : WebSocket;
	var lastParse : Float;
	
	public function new(host : String)
	{
		this.host = host;
		lastParse = 0;
	}
	
	@Sequence("boot", "finish")
	public function start()
	{
		socket = new WebSocket(host);
		socket.onopen = handleOpen;
		socket.onmessage = handleMessage;
		socket.onclose = handleClose;		
	}
	
	function handleOpen(event)
	{
		Log.info("open");
	}
	
	function handleMessage(event)
	{
		onData(event.data);
	}
	
	function handleClose(event)
	{
		Log.warn("close");
		Timeout.execute(1000, start);
	}
	
	function onData(r)
	{
		//if (time.ms - lastParse > 50)
		{
			lastParse = time.ms;
			var xml = Xml.parse(r);
			
			var newBlobs = new Array<Blob>();
			
			try
			{
				for(p in xml.elements())
				{
					var fast = new haxe.xml.Fast(p);
		     		var blob = new Blob();
					blob.x = Std.parseFloat(fast.att.x);
					blob.y = Std.parseFloat(fast.att.y);
					blob.z = Clamp.float(Map.linear(Std.parseFloat(fast.att.z), 1700, 4000, 0, 1), 0, 1);
					blob.area = Std.parseFloat(fast.att.area);
					newBlobs.push(blob);
				}
			}
			catch(e : Dynamic)
			{
				
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
