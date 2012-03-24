package kumite.profiler;

import haxe.rtti.Infos;

import bpmjs.Context;
import reflect.ClassInfo;

import kumite.time.Tick;

class ProfilerConfig implements Infos
{
	@Inject
	var context:Context;
	
	public function new()
	{
	}
	
	@Sequence("boot", "finish")
	public function init()
	{
		context.contextConfig.frontMessenger.addReceiver(this, "tick", Tick);
	}
	
	function tick(tick:Tick)
	{
		Log.info("tick");
	}
}
