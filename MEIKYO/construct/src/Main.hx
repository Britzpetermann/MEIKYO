class Main {

	static function globalErrorHandler(msg : String, stack : Array<String>)
	{
		trace("Uncaugt error?: " + msg);
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

		//js.Lib.setErrorHandler(globalErrorHandler);
	}

	function new(canvas : Canvas)
	{
		try
		{
			var context = bpmjs.ContextBuilder.buildAll([
					kumite.launch.Config,
					//kumite.textureregistry.Config,
					kumite.stage.Config,
					//kumite.canvas.Config,
					//kumite.webgl.Config,
					kumite.time.Config,
					kumite.profiler.ProfilerConfig,
					//kumite.projection.Config,
					//kumite.camera.Config,
					//kumite.mouse.Config,
					//kumite.jpegservice.JPEGServiceConfig,
					//kumite.blobs.Config,
					//kumite.socketsound.Config,
					//kumite.helloworldgl.Config,
					//kumite.displaylist.ConfigAsLayer,
					//kumite.vjinterface.Config,
					//kumite.uicomponents.Config,
					//kumite.scene.SceneConfig,
					//kumite.testscene.Config,
					//kumite.flyingman.Config,
					//kumite.framebuffereffect.Config,
					//kumite.spritemesh.Config,
					//kumite.effects.Config,
					//kumite.eyes.Config,
					//kumite.windowlines.Config,
					//kumite.touchtest.Config,
					//kumite.lgl.LGLConfig,
					//kumite.webworker.WebworkerConfig,
					//kumite.musicdraw.MusicDrawConfig,
					//kumite.musicdraw.TimeEffectConfig,
					//kumite.musicdraw.RasterEffectConfig,
					//kumite.musicdraw.DNAEffectConfig,
					kumite.presentation.PresentationConfig,
				]);
		}
		catch(e : Dynamic)
		{
			Log.error("Error building application!\n" + e);
		}
	}
}
