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
		Log.addFilter(new ERegFilter(LogLevel.WARN, ~/.*initAllLayers.*/));
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
					kumite.blobs.Config,
					//kumite.helloworldgl.Config,
					kumite.displaylist.ConfigAsLayer,
					kumite.vjinterface.Config,
					//kumite.uicomponents.Config,
					kumite.scene.Config,
					//kumite.testscene.Config,
					//kumite.flyingman.Config,
					//kumite.framebuffereffect.Config,
					//kumite.spritemesh.Config,
					//kumite.effects.Config,
					//kumite.eyes.Config,
					kumite.windowlines.Config,
				]);
		}
		catch(e : Dynamic)
		{
			Log.error("Error building application!\n" + e);
		}
	}
}
