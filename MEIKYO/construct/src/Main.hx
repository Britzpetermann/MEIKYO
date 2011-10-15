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
		Log.addFilter(new ERegFilter(LogLevel.WARN, ~/.*FrontMessenger\.handleMessage.*/));
		Log.addFilter(new ERegFilter(LogLevel.WARN, ~/.*FrontMessenger\.Receiver\.execute.*/));
		//Log.addFilter(new ERegFilter(LogLevel.INFO, ~/bpmjs\.DefaultFrontController\.handle.*/));
		
		js.Lib.setErrorHandler(globalErrorHandler);
	}

	function new(canvas : Canvas)
	{
		try
		{
			var context = bpmjs.ContextBuilder.buildAll([
					kumite.launch.Config,
					kumite.textureregistry.Config,
					kumite.stage.Config,
					kumite.canvas.Config,
					kumite.webgl.Config,
					kumite.time.Config,
					kumite.projection.Config,
					kumite.camera.Config,
					kumite.mouse.Config,
					//kumite.helloworldgl.Config,
					kumite.displaylist.ConfigAsLayer,
					kumite.vjinterface.Config,
					kumite.scene.Config,
					kumite.flyingman.Config,
					kumite.testscene.Config,
					kumite.spritemesh.Config,
				]);
		}
		catch(e : Dynamic)
		{
			Log.error("Error building application! \n" + e);
		}
	}

}
