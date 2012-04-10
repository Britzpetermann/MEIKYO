package kumite.blobs;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var blobs : Blobs;
	public var blobReaderHTTP : BlobReaderHTTP;
	public var blobReaderWS : BlobReaderWS;
	public var blobReaderMouse : BlobReaderMouse;

	public function new()
	{
		blobs = new Blobs();
		//blobReaderHTTP = new BlobReaderHTTP();
		//blobReaderWS = new BlobReaderWS("ws://192.168.2.201:4446");
		blobReaderMouse = new BlobReaderMouse();
	}
}