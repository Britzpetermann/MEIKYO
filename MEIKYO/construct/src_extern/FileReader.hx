extern class FileReader
{
	public var result : ArrayBuffer;
	
	public function new() : Void;
	
	public function addEventListener(type : String, callbackHandler:Void->Void) : Void;
	
	public function readAsArrayBuffer(blob : Blob) : Void;
}
