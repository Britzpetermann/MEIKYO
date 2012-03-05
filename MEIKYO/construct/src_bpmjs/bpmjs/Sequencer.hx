package bpmjs;

import bpmjs.Context;

import haxe.Timer;

class Sequencer implements haxe.rtti.Infos
{
	@Inject
	public var context : Context;
	
	public function new() {}
	
	public function start(name : String)
	{
		var sequence = new Sequence(name);
		sequence.objects = context.objects;
		
		sequence.addExecuteTask("initPrepare");
		sequence.addExecuteTask("init");
		sequence.addExecuteTask("initComplete");
		sequence.addExecuteTask("startPrepare");
		sequence.addLoadingTask();
		sequence.addExecuteTask("start");
		sequence.addExecuteTask("startComplete");
		sequence.addExecuteTask("finish");
		
		sequence.start();
	}
}

class Sequence extends bpmjs.TaskGroup
{
	public var name : String;
	
	public var objects : Array<ContextObject>;
	
	var loadingTaskGroup : LoadingTaskGroup;
	
	var timer : Timer;
	
	public function new(name : String)
	{
		super();
		monitor.name = name;
		this.name = name;
		timer = new Timer(100);
		completeSignaler.bind(handleComplete);
		errorSignaler.bind(handleError);
	}
	
	public function addExecuteTask(phase : String)
	{
		add(new ExecutePhaseTask(this, phase));
	}
	
	public function addLoadingTask()
	{
		loadingTaskGroup = new LoadingTaskGroup(this);
		loadingTaskGroup.monitor.weight = 1000;
		add(loadingTaskGroup);
	}
	
	override function start()
	{
		timer.run = handleProgress;
		super.start();
	}
	
	public function execute(phase : String)
	{
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
					if (localPhase == phase)
					{
						Log.info("Phase '" + localPhase + "' " + Type.getClassName(contextObject.type) +"#"+fieldName);
						try
						{
							var result = Reflect.callMethod(object, Reflect.field(object, fieldName), []);
							if (Std.is(result, SequencerTaskGroup))
							{
								Log.info("Adding task '", reflect.ClassInfo.forInstance(result).name);
								loadingTaskGroup.add(result);
							}
						}
						catch (e : Dynamic)
						{
							throw "Phase '" + localPhase + "' " + Type.getClassName(contextObject.type)   +"#" + fieldName + " created an error:\n" + Std.string(e);
						}
					}
				}
			}			
		}		
	}	
	
	function handleProgress()
	{
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
					if (localPhase == "monitor")
					{
						var result = Reflect.callMethod(object, Reflect.field(object, fieldName), [monitor]);
					}
				}
			}			
		}				
	}
	
	function handleComplete(task : bpmjs.TaskGroup)
	{
		handleProgress();
		timer.stop();
	}
	
	function handleError(error : bpmjs.TaskError<bpmjs.TaskGroup>)
	{
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
					if (localPhase == "error")
					{
						var result = Reflect.callMethod(object, Reflect.field(object, fieldName), [error.error]);
					}
				}
			}			
		}	
		timer.stop();
	}
}

class ExecutePhaseTask extends bpmjs.Task<ExecutePhaseTask>
{
	var sequence : Sequence;
	var phase : String;
	public function new(sequence : Sequence, phase : String)
	{
		super();
		monitor.name = "execute: " + phase;
		this.sequence = sequence;
		this.phase = phase;
	}
	
	override public function doStart()
	{
		try
		{
			sequence.execute(phase);
		}
		catch(e : Dynamic)
		{
			error(this, Std.string(e));
			return;
		}
		complete();
	}	
}

class LoadingTaskGroup extends bpmjs.TaskGroup
{
	public function new(sequence : Sequence)
	{
		super();
		monitor.name = "loading";
	}
}