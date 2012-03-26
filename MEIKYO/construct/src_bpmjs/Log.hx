import js.Lib;
import js.Dom;

class Log
{
	static var filters : Array<LogFilter> = new Array();
	static var posInfo : haxe.PosInfos;
	static var args : Array<Dynamic> = new Array();
	static var errors : Array<String> = new Array();
	static var errorDiv : HtmlDom;

	public static inline function debugger()
	{
		untyped __js__("debugger");
	}
		
	public static inline function profile(title : String)
	{
		untyped console.profile(title);
	}
		
	public static inline function profileEnd()
	{
		untyped console.profileEnd();
	}
		
	public static function init()
	{
		untyped
		{
			if (!window.console) console = {};
			console.log = console.log || function() {};
			console.info = console.info || function() {};
			console.warn = console.warn || function() {};
			console.error = console.error || function() {};
		}
		
		haxe.Log.trace = infoConsole;
	}

	public static function addFilter(filter : LogFilter)
	{
		filters.push(filter);
	}
	
	public static inline function info(?m0 : Dynamic, ?m1 : Dynamic, ?m2 : Dynamic, ?m3 : Dynamic, ?m4 : Dynamic, ?m5 : Dynamic, ?m6 : Dynamic, ?i : haxe.PosInfos)
	{
		posInfo = i;
		if (filter(LogLevel.INFO))
		{
			fetchInput(m0, m1, m2, m3, m4, m5, m6);
			untyped console.info(createMessage());
		}
	}
	
	public static inline function warn(?m0 : Dynamic, ?m1 : Dynamic, ?m2 : Dynamic, ?m3 : Dynamic, ?m4 : Dynamic, ?m5 : Dynamic, ?m6 : Dynamic, ?i : haxe.PosInfos)
	{
		posInfo = i;
		if (filter(LogLevel.WARN))
		{
			fetchInput(m0, m1, m2, m3, m4, m5, m6);
			untyped console.warn(createMessage());
		}
	}
	
	public static inline function error(?m0 : Dynamic, ?m1 : Dynamic, ?m2 : Dynamic, ?m3 : Dynamic, ?m4 : Dynamic, ?m5 : Dynamic, ?m6 : Dynamic, ?i : haxe.PosInfos)
	{
		posInfo = i;
		if (filter(LogLevel.ERROR))
		{
			fetchInput(m0, m1, m2, m3, m4, m5, m6);
			untyped console.error(createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
			displayError(createErrorMessage());
		}
	}
	
	public static function infoEnabled(i : haxe.PosInfos)
	{
		posInfo = i;
		return filter(LogLevel.INFO);
	}
	
	public static function warnEnabled(i : haxe.PosInfos)
	{
		posInfo = i;
		return filter(LogLevel.WARN);
	}
	
	public static function errorEnabled(i : haxe.PosInfos)
	{
		posInfo = i;
		return filter(LogLevel.ERROR);
	}
	
	public static inline function groupCollapsed(?m0 : Dynamic, ?m1 : Dynamic, ?m2 : Dynamic, ?m3 : Dynamic, ?m4 : Dynamic, ?m5 : Dynamic, ?m6 : Dynamic, ?i : haxe.PosInfos)
	{
		if (infoEnabled(i))
		{
			fetchInput(m0, m1, m2, m3, m4, m5, m6);		
			untyped console.groupCollapsed(createMessage());
		}
	}
	
	public static function groupEnd(?i : haxe.PosInfos)
	{
		if (infoEnabled(i))
			untyped console.groupEnd();
	}
	
	static function fetchInput(?m0 : Dynamic, ?m1 : Dynamic, ?m2 : Dynamic, ?m3 : Dynamic, ?m4 : Dynamic, ?m5 : Dynamic, ?m6 : Dynamic)
	{
		args = new Array();
		if (m0 != null)	args.push(m0);
		if (m1 != null) args.push(m1);
		if (m2 != null) args.push(m2);
		if (m3 != null) args.push(m3);
		if (m4 != null) args.push(m4);
		if (m5 != null) args.push(m5);
		if (m6 != null) args.push(m6);		
	}
	
	static function createMessage()
	{
//		if (posInfo == null)
			return args.join(" ");
			
		var from = posInfo.className + "." + posInfo.methodName;
		return "[" + from + "] " + args.join(" ");
	}
		
	static function createErrorMessage()
	{
		if (posInfo == null)
			return args.join(" ");
			
		var from = posInfo.className + "." + posInfo.methodName;
		return "[" + from + "]\n" + args.join(" ");
	}
		
	static function filter(level : LogLevel)
	{
		if (posInfo == null)
			return true;
			
		var result = true;
		
		for (filter in filters)
			result = filter.enabled(result, posInfo, level);
		
		return result;
	}
	
	static function infoConsole(v : Dynamic, ?i : haxe.PosInfos)
	{
		posInfo = i;
		fetchInput(v);
		untyped console.log("" + createMessage() + " (trace)");
	}
	
	static function displayError(message : String)
	{
		if (Lib.document.createElement == null)
			return;
			
		if (errorDiv == null)
		{
			errorDiv = Lib.document.createElement("div");
			errorDiv.className = "Error";
			Lib.document.body.appendChild(errorDiv);
			
			errorDiv.innerHTML = "<h1>Ups!</h1>I could not start!\nPlease use up-to-date hardware and an up-to-date browser for this experience.\n\n\nTechnical Details:\n";
		}
		
		if (!Lambda.has(errors, message))
		{
			errors.push(message);
			errorDiv.innerHTML += message + "\n";
		}
	}
	
	function errorFilter()
	{
		
	}
	
}