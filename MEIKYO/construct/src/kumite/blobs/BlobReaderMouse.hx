package kumite.blobs;

import kumite.time.Tick;
import kumite.time.Time;
import haxe.rtti.Infos;

class BlobReaderMouse implements Infos
{
	@Inject
	public var blobs : Blobs;
	
	@Inject
	public var time : Time;
	
	var mouse : Vec2;
	
	public function new()
	{
		mouse = new Vec2();
	}
	
	@Sequence("boot", "finish")
	public function init()
	{
		GLMouseRegistry.getInstance().mouseMoveSignaler.bind(mouseMove);
	}
	
	@Message
	public function tick(tick : Tick)
	{
		blobs.blobs = new Array();
		
		var blob = new Blob();
		blob.blobId = 1;
		blob.x = mouse.x;
		blob.y = mouse.y;
		blob.z = 2500;
		blob.speed = 0.4;
		blob.area = 0.3;		
		blobs.blobs.push(blob);				
	}
	
	function mouseMove(position : Vec2)
	{
		mouse.x = 1 - position.x;
		mouse.y = position.y;
	}
}
