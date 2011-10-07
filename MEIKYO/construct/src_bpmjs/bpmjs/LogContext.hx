package bpmjs;

class LogContext {
 
 	public static function setRedirection()
	{
		haxe.Log.trace = myTrace;
    }

    private static function myTrace( v : Dynamic, ?i : haxe.PosInfos )
	{
		untyped {
			var msg = if( i != null ) i.fileName + ":" + i.lineNumber + ": " else "";
			msg += unhtml(Std.string(v)) + "<br/>";
			var d = document.getElementById("haxe:trace");
			if( d == null )
				alert("No haxe:trace element defined\n"+msg);
			else
				d.innerHTML += msg;
		}
	}
	
	private static function unhtml(s : String)
	{
		return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	}	
}
