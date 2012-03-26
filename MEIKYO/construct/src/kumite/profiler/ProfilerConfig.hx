package kumite.profiler;

import haxe.rtti.Infos;

class ProfilerConfig implements Infos
{
	var profilerRenderer:ProfilerRenderer;
	
	public function new()
	{
		profilerRenderer = new ProfilerRenderer();
	}
}
