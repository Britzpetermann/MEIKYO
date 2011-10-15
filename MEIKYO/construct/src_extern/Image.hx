extern class Image implements ImageData
{
	var onload : Void->Void;
	var src : String;

	var width : Int;
	var height : Int;

	var naturalWidth : Int;
	var naturalHeight : Int;

	function new() : Void;
}
