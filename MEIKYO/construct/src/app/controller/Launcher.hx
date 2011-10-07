package app.controller;

import app.event.LauncherStart;
import bpmjs.Event;

import haxe.rtti.Infos;

@ManagedEvents("launcherStart")
class Launcher extends EventDispatcher, implements Infos
{
	@PostComplete
	public function handlePostComplete()
	{
		trace("post complete");
		try
		{
			dispatchEvent(new LauncherStart());
		}
		catch(e : Dynamic)
		{
			trace("Could not launch!\n\t" + e);
		}
	}
}
