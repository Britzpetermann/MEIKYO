package bpmjs;

import bpmjs.Context;

class Sequencer implements haxe.rtti.Infos
{
	@Inject
	public var context : Context;
	
	public function new()
	{
	}
	
	public function start(name : String)
	{
		Log.info(name);
		
		var sequence = new Sequence(name);
		sequence.objects = context.objects;
		
		sequence.execute("initPrepare");
		sequence.execute("init");
		sequence.execute("initComplete");
		sequence.execute("startPrepare");
		sequence.execute("start");
		sequence.execute("startComplete");
	}
}

class Sequence
{
	public var name : String;
	
	public var objects : Array<ContextObject>;
	
	public function new(name : String)
	{
		this.name = name;
	}
	
	public function execute(phase : String)
	{
		Log.info("Execute sequence", name, phase);
		for (contextObject in objects)
		{
			var object = contextObject.object;
			var metaDatas = haxe.rtti.Meta.getFields(contextObject.type);
	
			for(fieldName in Reflect.fields(metaDatas))
			{
				var meta = Reflect.field(metaDatas, fieldName);
				if (Reflect.hasField(meta, "Sequence"))
				{
					var localName : String = meta.Sequence[0];
					var localPhase : String = meta.Sequence[1];
					Log.info("Found sequence", contextObject.name, localName, localPhase);
					if (localPhase == phase)
					{
						Log.info("Execute!");
						Reflect.callMethod(object, Reflect.field(object, fieldName), []);
					}
				}
			}			
		}		
	}
	
}