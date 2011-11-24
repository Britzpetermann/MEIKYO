extern class Canvas
{
	public var width : Int;
	public var height : Int;

	public var clientWidth : Int;
	public var clientHeight : Int;

	public var style : Dynamic;

	public var onmousedown : Dynamic->Void;
	public var onmouseup : Dynamic->Void;
	public var onmousemove : Dynamic->Void;

	function getContext(context : String, ?config : Dynamic) : Dynamic;
}
