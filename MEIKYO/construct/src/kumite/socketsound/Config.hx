package kumite.socketsound;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var socketConnector : SocketConnector;
	
	public function new()
	{
		socketConnector = new SocketConnector("ws://192.168.2.201:4447");
		//socketConnector = new SocketConnector("ws://127.0.0.1:4447");
	}
}