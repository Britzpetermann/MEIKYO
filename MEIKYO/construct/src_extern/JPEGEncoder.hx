extern class JPEGEncoder
{
	function new(quality:Int):Void;
	
	function encode(imageData:ArrayBufferView, width:Int, height:Int, setProgress:Float->Void):ArrayBuffer;
	
	var setProgress:Float->Void;
}
