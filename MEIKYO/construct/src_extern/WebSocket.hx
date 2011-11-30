extern class WebSocket
{
	public function new(host : String) : Void;
	
	public var onopen : Dynamic->Void;
	public var onmessage : Dynamic->Void;
	public var onclose : Dynamic->Void;
	
	public var send : Dynamic->Void;
	
}
