package app.event;

import bpmjs.Event;

class LauncherStart extends Event
{
	public function new()
	{
		super("launcherStart");
	}
}
