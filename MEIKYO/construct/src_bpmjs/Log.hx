class Log
{
	private static var filters : Array<LogFilter> = new Array<LogFilter>();
	
	public static function init()
	{
		untyped
		{
			if (!window.console) console = {};
			console.log = console.log || function() {};
			console.warn = console.warn || function() {};
			console.error = console.error || function() {};
			console.info = console.info || function() {};
		}
		
		haxe.Log.trace = infoConsole;
	}
	
	public static function addFilter(filter : LogFilter)
	{
		filters.push(filter);
	}
	
	public static function info(?m0 : Dynamic, ?m1 : Dynamic, ?m2 : Dynamic, ?m3 : Dynamic, ?m4 : Dynamic, ?m5 : Dynamic, ?m6 : Dynamic, ?i : haxe.PosInfos)
	{
		if (infoEnabled(i))
			untyped console.log(createMessage([m0, m1, m2, m3, m4, m5, m6], i));
	}
	
	public static function warn(?m0 : Dynamic, ?m1 : Dynamic, ?m2 : Dynamic, ?m3 : Dynamic, ?m4 : Dynamic, ?m5 : Dynamic, ?m6 : Dynamic, ?i : haxe.PosInfos)
	{
		if (warnEnabled(i))
			untyped console.warn(createMessage([m0, m1, m2, m3, m4, m5, m6], i));
	}
	
	public static function error(?m0 : Dynamic, ?m1 : Dynamic, ?m2 : Dynamic, ?m3 : Dynamic, ?m4 : Dynamic, ?m5 : Dynamic, ?m6 : Dynamic, ?i : haxe.PosInfos)
	{
		if (errorEnabled(i))
		{
			var exception = haxe.Stack.exceptionStack().join("\n");
			untyped console.error(createMessage([m0, m1, m2, m3, m4, m5, m6], i) + "\nStack:\n" + exception);
		}
	}
	
	public static function infoEnabled(i : haxe.PosInfos)
	{
		return filter(i, LogLevel.INFO);
	}
	
	public static function warnEnabled(i : haxe.PosInfos)
	{
		return filter(i, LogLevel.WARN);
	}
	
	public static function errorEnabled(i : haxe.PosInfos)
	{
		return filter(i, LogLevel.ERROR);
	}
	
	private static function filter(i : haxe.PosInfos, level : LogLevel)
	{
		var result = true;
		
		for (filter in filters)
		{
			result = filter.enabled(result, i, level);
		}
		
		return result;
	}
	
	private static function createMessage(messages : Array<Dynamic>, i : haxe.PosInfos)
	{
		var resultArray = [];
		for(message in messages)
		{
			resultArray.push(Std.string(message));
		}
		
		while(resultArray.length > 0 && resultArray[resultArray.length - 1] == "null")
		{
			resultArray.pop();
		}
		
		var from = i.className + "." + i.methodName;
		return "[" + from + "] " + resultArray.join(", ");
	}

	private static function infoConsole(v : Dynamic, ?i : haxe.PosInfos)
	{
		untyped console.log("" + createMessage([v], i) + " (trace)");
	}
	
}