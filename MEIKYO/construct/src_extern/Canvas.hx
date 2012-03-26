import js.Dom;
extern class Canvas
{
	var id : String;
	var title : String;
	var lang : String;
	var dir : String;
	var innerHTML : String;
	var className : String;
	var style : Style;
	var scrollTop : Int;
	var scrollLeft : Int;
	var scrollHeight(default,null) : Int;
	var scrollWidth(default,null) : Int;
	var clientHeight(default,null) : Int;
	var clientWidth(default,null) : Int;
	var offsetParent : HtmlDom;
	var offsetLeft : Int;
	var offsetTop : Int;
	var offsetWidth : Int;
	var offsetHeight : Int;
	var width:Int;
	var height:Int;
	var nodeName:String;
	var nodeType:Int;
	var nodeValue:String;
	var parentNode:HtmlDom;
	var childNodes:HtmlCollection<HtmlDom>;
	var firstChild:HtmlDom;
	var lastChild:HtmlDom;
	var nextSibling:HtmlDom;
	var previousSibling:HtmlDom;

	var onscroll : Event -> Void;
	var onblur : Event -> Void;
	var onclick : Event -> Void;
	var ondblclick : Event -> Void;
	var onfocus : Event -> Void;
	var onkeydown : Event -> Void;
	var onkeypress : Event -> Void;
	var onkeyup : Event -> Void;
	var onmousedown : Event -> Void;
	var onmousemove : Event -> Void;
	var onmouseout : Event -> Void;
	var onmouseover : Event -> Void;
	var onmouseup : Event -> Void;
	var onresize : Event -> Void;
	
	function getContext(context:String, ?config:Dynamic):Dynamic;
	function appendChild(child:HtmlDom):Void;
	function cloneNode(deep:Bool):HtmlDom;
	function hasChildNodes():Bool;
	function insertBefore(newChild:HtmlDom, refChild:HtmlDom):Void;
	function removeChild(child:HtmlDom):HtmlDom;
	function replaceChild(child:HtmlDom, oldChild:HtmlDom):Void;
	function getAttribute(attr:String):String;
	function setAttribute(attr:String, val:String):Void;
	function getElementsByTagName( tag : String ) : HtmlCollection<HtmlDom>;

	function blur() : Void;
	function click() : Void;
	function focus() : Void;
}
