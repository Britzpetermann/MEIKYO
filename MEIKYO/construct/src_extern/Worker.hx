extern class Worker 
{
	var onmessage : Dynamic->Void;
	
	function new(jsScriptLocation:String):Void;
	
	function postMessage(message:Dynamic):Void; 
	function webkitPostMessage(message:Dynamic, ?params:Array<Dynamic>):Void;
	
	function terminate():Void; 
}