extern class Image implements ImageData
{
	var onload : Void->Void;
	var src : String;

	var width : Int;
	var height : Int;

	var naturalWidth : Int;
	var naturalHeight : Int;

	var data:Uint8Array;

	function new() : Void;
}
