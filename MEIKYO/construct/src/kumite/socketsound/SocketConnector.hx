package kumite.socketsound;

import kumite.time.Time;
import haxe.rtti.Infos;

class SocketConnector implements Infos
{
	var host : String;
	var socket : WebSocket;
	
	public function new(host : String)
	{
		this.host = host;
	}
	
	@Sequence("boot", "finish")
	public function start()
	{
		socket = new WebSocket(host);
		socket.onopen = handleOpen;
		socket.onmessage = handleMessage;
		socket.onclose = handleClose;		
	}
	
	@Message
	function handleNote(note : Note)
	{
		//Log.info("Note: " + Std.string(note));
		socket.send(getNotePackage(note));
	}
	
	function getNotePackage(note : Note)
	{
		return note.note + ":" + note.velocity + ":" + note.duration + ";";
	}
	
	function handleOpen(event)
	{
		Log.info("open");
	}
	
	function handleMessage(event)
	{
	}
	
	function handleClose(event)
	{
		Log.warn("close");
		Timeout.execute(1000, start);
	}
}
