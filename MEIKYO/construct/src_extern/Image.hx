import js.Dom;

extern class Image implements ImageData
{
	var onload : Void->Void;
	var src : String;

	var width : Int;
	var height : Int;

	var naturalWidth : Int;
	var naturalHeight : Int;

	var data:Uint8Array;
	
	var style:Style;	

	function new() : Void;
}
