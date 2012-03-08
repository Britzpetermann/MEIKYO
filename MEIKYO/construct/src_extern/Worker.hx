extern class Worker 
{
	public var onmessage : Dynamic->Void;
	
	public function new(jsScriptLocation:String):Void;
	public function postMessage(message:Dynamic):Void; 
	public function webkitPostMessage(message:Dynamic, params:Array<Dynamic>):Void; 
}