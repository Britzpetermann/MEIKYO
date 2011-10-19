package bpmjs;

import bpmjs.Context;

import haxe.Timer;

class Sequencer implements haxe.rtti.Infos
{
	@Inject
	public var context : Context;
	
	public function new();
	
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
	}
	
	public function addExecuteTask(phase : String)
	{
		add(new ExecutePhaseTask(this, phase));
	}
	
	public function addLoadingTask()
	{
		loadingTaskGroup = new LoadingTaskGroup(this);
		loadingTaskGroup.monitor.weight = 100;
		add(loadingTaskGroup);
	}
	
	override function start()
	{
		timer.run = handleProgress;
		super.start();
	}
	
	function handleProgress()
	{
		Log.info(monitor.current);
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
						var result = Reflect.callMethod(object, Reflect.field(object, fieldName), []);
						if (Std.is(result, SequencerTaskGroup))
						{
							Log.info("Adding task '", reflect.ClassInfo.forInstance(result).name);
							loadingTaskGroup.add(result);
						}
					}
				}
			}			
		}		
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
		sequence.execute(phase);
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