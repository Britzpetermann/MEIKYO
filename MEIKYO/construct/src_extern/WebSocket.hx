extern class WebSocket
{
	public var onopen : Dynamic->Void;
	public var onerror : Dynamic->Void;
	public var onmessage : Dynamic->Void;
	public var onclose : Dynamic->Void;
	
	public function new(host : String) : Void;
	public function send(data : Dynamic) : Void;
	public function close() : Void;
}
