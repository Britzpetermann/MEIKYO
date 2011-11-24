package kumite.blobs;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var blobs : Blobs;
	public var blobReader : BlobReader;
	
	public function new()
	{
		blobs = new Blobs();
		//blobReader = new BlobReader();
	}
}