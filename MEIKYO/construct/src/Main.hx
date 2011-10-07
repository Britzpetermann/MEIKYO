class Main {

	static function globalErrorHandler(msg : String, stack : Array<String>)
	{
		trace("Uncaugt error: " + msg);
		for(line in stack)
			trace(line);

		return true;
	}

	static function main()
	{
		Log.init();
		Log.addFilter(new ERegFilter(LogLevel.INFO, ~/.*/));
		//Log.addFilter(new ERegFilter(LogLevel.WARN, ~/bpmjs.*/));
		//Log.addFilter(new ERegFilter(LogLevel.INFO, ~/bpmjs\.DefaultFrontController\.handle.*/));
		
		js.Lib.setErrorHandler(globalErrorHandler);
	}

	function new(canvas : Canvas)
	{
		try
		{
			var context = bpmjs.ContextBuilder.build(Config);
		}
		catch(e : Dynamic)
		{
			Log.error("Error building application: ");
		}
	}

}
