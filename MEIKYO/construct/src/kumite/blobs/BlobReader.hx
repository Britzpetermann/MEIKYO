package kumite.blobs;

import haxe.rtti.Infos;

class BlobReader implements Infos
{
	@Inject
	public var blobs : Blobs;
	
	public function new();
	
	@Sequence("boot", "finish")
	public function start()
	{
		readBlobs();		
	}
	
	function readBlobs()
	{
		var r = new haxe.Http("http://192.168.2.201/data/blobs.php");
	    r.onError = onError;
    	r.onData = onData;
    	r.request(false);
	}

	function onData(r)
	{
		var xml = Xml.parse(r);
		
		blobs.blobs = new Array();
		
		try
		{
			for(p in xml.elements()) {
				var fast = new haxe.xml.Fast(p);
	     		var blob = new Blob();
				blob.x = Std.parseFloat(fast.node.x.innerData);
				blob.y = Std.parseFloat(fast.node.y.innerData);
				blob.z = Std.parseFloat(fast.node.z.innerData);
				blob.area = Std.parseFloat(fast.node.area.innerData);
				
				blobs.blobs.push(blob);
			}
		}
		catch(e : Dynamic)
		{
			
		}
		
		readBlobs();
	}
	
	function onError(r)
	{
		readBlobs();
	}
}
