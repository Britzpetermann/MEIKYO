$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof kumite=='undefined') kumite = {}
if(!kumite.time) kumite.time = {}
kumite.time.Tick = function(p) {
}
kumite.time.Tick.__name__ = ["kumite","time","Tick"];
kumite.time.Tick.prototype.__class__ = kumite.time.Tick;
if(typeof haxe=='undefined') haxe = {}
if(!haxe.rtti) haxe.rtti = {}
haxe.rtti.Infos = function() { }
haxe.rtti.Infos.__name__ = ["haxe","rtti","Infos"];
haxe.rtti.Infos.prototype.__class__ = haxe.rtti.Infos;
if(!kumite.launch) kumite.launch = {}
kumite.launch.PreloadDisplay = function(p) {
}
kumite.launch.PreloadDisplay.__name__ = ["kumite","launch","PreloadDisplay"];
kumite.launch.PreloadDisplay.prototype.preloaderDiv = null;
kumite.launch.PreloadDisplay.prototype.complete = function() {
	this.preloaderDiv = js.Lib.document.createElement("div");
	this.preloaderDiv.className = "Preloader";
	js.Lib.document.body.appendChild(this.preloaderDiv);
}
kumite.launch.PreloadDisplay.prototype.bootMonitor = function(monitor) {
	var bar = "";
	var count = 10;
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		var from = i / count;
		var to = (i + 1) / count;
		var diff = Map.linear(monitor.getCurrent(),from,to,0,1.001);
		if(diff < 0) diff = 0;
		if(diff > 1) diff = 1;
		var chars = "▁▂▃▄▅▆▇";
		var chars1 = ".oO";
		var chars2 = "Oo.";
		var chars3 = "-=";
		var chars4 = ":. ";
		bar += chars4.charAt(Std["int"](diff * (chars4.length - 1)));
	}
	this.preloaderDiv.innerHTML = "" + bar;
}
kumite.launch.PreloadDisplay.prototype.bootStartComplete = function() {
	this.preloaderDiv.style.opacity = 0.8;
	GLTween.to(this.preloaderDiv.style,1000,{ opacity : 0});
	Timeout.execute(1000,$closure(this,"removePreloader"));
}
kumite.launch.PreloadDisplay.prototype.removePreloader = function() {
	js.Lib.document.body.removeChild(this.preloaderDiv);
}
kumite.launch.PreloadDisplay.prototype.__class__ = kumite.launch.PreloadDisplay;
kumite.launch.PreloadDisplay.__interfaces__ = [haxe.rtti.Infos];
if(typeof reflect=='undefined') reflect = {}
reflect.MetadataAware = function() { }
reflect.MetadataAware.__name__ = ["reflect","MetadataAware"];
reflect.MetadataAware.prototype.hasMetadata = null;
reflect.MetadataAware.prototype.__class__ = reflect.MetadataAware;
if(!haxe.exception) haxe.exception = {}
haxe.exception.Exception = function(message,innerException,numberOfStackTraceShifts) {
	if( message === $_ ) return;
	this.message = null == message?"Unknown exception":message;
	this.innerException = innerException;
	this.generateStackTrace(numberOfStackTraceShifts);
	this.stackTrace = this.stackTraceArray;
}
haxe.exception.Exception.__name__ = ["haxe","exception","Exception"];
haxe.exception.Exception.prototype.baseException = null;
haxe.exception.Exception.prototype.innerException = null;
haxe.exception.Exception.prototype.message = null;
haxe.exception.Exception.prototype.stackTrace = null;
haxe.exception.Exception.prototype.stackTraceArray = null;
haxe.exception.Exception.prototype.generateStackTrace = function(numberOfStackTraceShifts) {
	this.stackTraceArray = haxe.Stack.callStack().slice(numberOfStackTraceShifts + 1);
	var exceptionClass = Type.getClass(this);
	while(haxe.exception.Exception != exceptionClass) {
		this.stackTraceArray.shift();
		exceptionClass = Type.getSuperClass(exceptionClass);
	}
}
haxe.exception.Exception.prototype.getBaseException = function() {
	var result = this;
	while(null != result.innerException) result = result.innerException;
	return result;
}
haxe.exception.Exception.prototype.toString = function() {
	return this.message + haxe.Stack.toString(this.stackTraceArray);
}
haxe.exception.Exception.prototype.__class__ = haxe.exception.Exception;
haxe.exception.ArgumentNullException = function(argumentName,numberOfStackTraceShifts) {
	if( argumentName === $_ ) return;
	haxe.exception.Exception.call(this,"Argument " + argumentName + " must be non-null",null,numberOfStackTraceShifts);
}
haxe.exception.ArgumentNullException.__name__ = ["haxe","exception","ArgumentNullException"];
haxe.exception.ArgumentNullException.__super__ = haxe.exception.Exception;
for(var k in haxe.exception.Exception.prototype ) haxe.exception.ArgumentNullException.prototype[k] = haxe.exception.Exception.prototype[k];
haxe.exception.ArgumentNullException.prototype.__class__ = haxe.exception.ArgumentNullException;
if(typeof hsl=='undefined') hsl = {}
if(!hsl.haxe) hsl.haxe = {}
hsl.haxe.Bond = function(p) {
	if( p === $_ ) return;
	this.halted = false;
}
hsl.haxe.Bond.__name__ = ["hsl","haxe","Bond"];
hsl.haxe.Bond.prototype.halted = null;
hsl.haxe.Bond.prototype.willDestroyOnUse = null;
hsl.haxe.Bond.prototype.destroy = function() {
}
hsl.haxe.Bond.prototype.destroyOnUse = function() {
	this.willDestroyOnUse = true;
	return this;
}
hsl.haxe.Bond.prototype.halt = function() {
	this.halted = true;
}
hsl.haxe.Bond.prototype.resume = function() {
	this.halted = false;
}
hsl.haxe.Bond.prototype.__class__ = hsl.haxe.Bond;
Map = function() { }
Map.__name__ = ["Map"];
Map.linear = function(value,min0,max0,min1,max1) {
	var p0 = 1 / (max0 - min0) * (value - min0);
	return min1 + (max1 - min1) * p0;
}
Map.ease = function(value,min0,max0,min1,max1,easeFunction) {
	var p0 = 1 / (max0 - min0) * (value - min0);
	var t = p0;
	var b = min1;
	var c = max1;
	var d = 1;
	return easeFunction(t,b,c,d);
}
Map.prototype.__class__ = Map;
if(!kumite.stage) kumite.stage = {}
kumite.stage.StageResizeAction = function(p) {
}
kumite.stage.StageResizeAction.__name__ = ["kumite","stage","StageResizeAction"];
kumite.stage.StageResizeAction.prototype.messenger = null;
kumite.stage.StageResizeAction.prototype.stage = null;
kumite.stage.StageResizeAction.prototype.initPrepare = function() {
	this.updateSize();
}
kumite.stage.StageResizeAction.prototype.startComplete = function() {
	GLAnimationFrame.run($closure(this,"timerUpdate"));
	js.Lib.window.onresize = $closure(this,"onResize");
}
kumite.stage.StageResizeAction.prototype.timerUpdate = function() {
	if(this.stage.width != js.Lib.window.innerWidth || this.stage.height != js.Lib.window.innerHeight) this.onResize();
}
kumite.stage.StageResizeAction.prototype.onResize = function(event) {
	this.updateSize();
	this.sendResizeMessage();
}
kumite.stage.StageResizeAction.prototype.updateSize = function() {
	this.stage.width = Std["int"](js.Lib.window.innerWidth);
	this.stage.height = Std["int"](js.Lib.window.innerHeight);
}
kumite.stage.StageResizeAction.prototype.sendResizeMessage = function() {
	this.messenger.send(new kumite.stage.StageResizeMessage());
}
kumite.stage.StageResizeAction.prototype.__class__ = kumite.stage.StageResizeAction;
kumite.stage.StageResizeAction.__interfaces__ = [haxe.rtti.Infos];
if(typeof bpmjs=='undefined') bpmjs = {}
bpmjs.Context = function(p) {
	if( p === $_ ) return;
	this.objects = new Array();
	this.observers = new Array();
}
bpmjs.Context.__name__ = ["bpmjs","Context"];
bpmjs.Context.prototype.contextConfig = null;
bpmjs.Context.prototype.objects = null;
bpmjs.Context.prototype.observers = null;
bpmjs.Context.prototype.addObject = function(name,classInfo,object) {
	var contextObject = new bpmjs.ContextObject(name,classInfo,object);
	this.objects.push(contextObject);
	return contextObject;
}
bpmjs.Context.prototype.getObjectByName = function(name) {
	var _g = 0, _g1 = this.objects;
	while(_g < _g1.length) {
		var contextObject = _g1[_g];
		++_g;
		if(contextObject.name == name) return contextObject.object;
	}
	return null;
}
bpmjs.Context.prototype.getObjectByType = function(type) {
	var result = Lambda.filter(this.objects,this.getFilterByType(type));
	if(result.length == 1) return result.first().object; else if(result.length > 1) throw "Multiple objects of type: " + result.first().classInfo.name + " found"; else return null;
}
bpmjs.Context.prototype.getDynamicObjectsByType = function(type) {
	return Lambda.filter(this.objects,this.getFilterByType(type));
}
bpmjs.Context.prototype.addObserver = function(object,methodName,type) {
	{
		Log.posInfo = { fileName : "Context.hx", lineNumber : 54, className : "bpmjs.Context", methodName : "addObserver"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(object.classInfo.name,methodName,type.name,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	var observer = new bpmjs.Observer();
	observer.object = object;
	observer.methodName = methodName;
	observer.type = type;
	this.observers.push(observer);
}
bpmjs.Context.prototype.getFilterByType = function(type) {
	return function(contextObject) {
		return contextObject.type == type;
	};
}
bpmjs.Context.prototype.__class__ = bpmjs.Context;
bpmjs.ContextObject = function(name,classInfo,object) {
	if( name === $_ ) return;
	this.name = name;
	this.classInfo = classInfo;
	this.type = classInfo.type;
	this.object = object;
}
bpmjs.ContextObject.__name__ = ["bpmjs","ContextObject"];
bpmjs.ContextObject.prototype.name = null;
bpmjs.ContextObject.prototype.type = null;
bpmjs.ContextObject.prototype.object = null;
bpmjs.ContextObject.prototype.classInfo = null;
bpmjs.ContextObject.prototype.__class__ = bpmjs.ContextObject;
bpmjs.Observer = function(p) {
}
bpmjs.Observer.__name__ = ["bpmjs","Observer"];
bpmjs.Observer.prototype.object = null;
bpmjs.Observer.prototype.methodName = null;
bpmjs.Observer.prototype.type = null;
bpmjs.Observer.prototype.observe = function(objectToObserve) {
	if(Std["is"](objectToObserve.object,this.type.type)) Reflect.field(this.object.object,this.methodName).apply(this.object.object,[objectToObserve.object]);
}
bpmjs.Observer.prototype.__class__ = bpmjs.Observer;
List = function(p) {
	if( p === $_ ) return;
	this.length = 0;
}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x; else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.first = function() {
	return this.h == null?null:this.h[0];
}
List.prototype.last = function() {
	return this.q == null?null:this.q[0];
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.isEmpty = function() {
	return this.h == null;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1]; else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return this.h != null;
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}};
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{" == null?"null":"{";
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = ", " == null?"null":", ";
		s.add(Std.string(l[0]));
		l = l[1];
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
		s.add(l[0]);
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.__class__ = List;
bpmjs.Sequencer = function(p) {
}
bpmjs.Sequencer.__name__ = ["bpmjs","Sequencer"];
bpmjs.Sequencer.prototype.context = null;
bpmjs.Sequencer.prototype.start = function(name) {
	var sequence = new bpmjs.Sequence(name);
	sequence.objects = this.context.objects;
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
bpmjs.Sequencer.prototype.__class__ = bpmjs.Sequencer;
bpmjs.Sequencer.__interfaces__ = [haxe.rtti.Infos];
bpmjs.Task = function(p) {
	if( p === $_ ) return;
	this.startSignaler = new hsl.haxe.DirectSignaler(this);
	this.completeSignaler = new hsl.haxe.DirectSignaler(this);
	this.errorSignaler = new hsl.haxe.DirectSignaler(this);
	this.setMonitor(new bpmjs.ProgressMonitor());
}
bpmjs.Task.__name__ = ["bpmjs","Task"];
bpmjs.Task.prototype.startSignaler = null;
bpmjs.Task.prototype.completeSignaler = null;
bpmjs.Task.prototype.errorSignaler = null;
bpmjs.Task.prototype.monitor = null;
bpmjs.Task.prototype.start = function() {
	try {
		var t = this;
		this.startSignaler.dispatch(t,null,{ fileName : "Task.hx", lineNumber : 29, className : "bpmjs.Task", methodName : "start"});
		this.doStart();
	} catch( e ) {
		{
			Log.posInfo = { fileName : "Task.hx", lineNumber : 34, className : "bpmjs.Task", methodName : "start"};
			if(Log.filter(LogLevel.ERROR)) {
				Log.fetchInput("Error starting Task: ",e,null,null,null,null,null);
				console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
				Log.displayError(Log.createErrorMessage());
			}
		}
	}
}
bpmjs.Task.prototype.doStart = function() {
}
bpmjs.Task.prototype.complete = function() {
	this.getMonitor().setCurrent(1);
	var t = this;
	this.completeSignaler.dispatch(t,null,{ fileName : "Task.hx", lineNumber : 46, className : "bpmjs.Task", methodName : "complete"});
}
bpmjs.Task.prototype.error = function(result,error) {
	var taskError = new bpmjs.TaskError();
	taskError.task = result;
	taskError.error = error;
	this.errorSignaler.dispatch(taskError,null,{ fileName : "Task.hx", lineNumber : 54, className : "bpmjs.Task", methodName : "error"});
}
bpmjs.Task.prototype.getMonitor = function() {
	return this.monitor;
}
bpmjs.Task.prototype.setMonitor = function(monitor) {
	this.monitor = monitor;
	return monitor;
}
bpmjs.Task.prototype.__class__ = bpmjs.Task;
bpmjs.TaskGroup = function(p) {
	if( p === $_ ) return;
	bpmjs.Task.call(this);
	this.pendingTasks = new haxe.FastList();
	this.parallelTasksMax = 1;
	this.autoStart = false;
	this.tasks = new Array();
}
bpmjs.TaskGroup.__name__ = ["bpmjs","TaskGroup"];
bpmjs.TaskGroup.__super__ = bpmjs.Task;
for(var k in bpmjs.Task.prototype ) bpmjs.TaskGroup.prototype[k] = bpmjs.Task.prototype[k];
bpmjs.TaskGroup.prototype.tasks = null;
bpmjs.TaskGroup.prototype.autoStart = null;
bpmjs.TaskGroup.prototype.parallelTasksMax = null;
bpmjs.TaskGroup.prototype.pendingTasks = null;
bpmjs.TaskGroup.prototype.add = function(task) {
	this.tasks.push(task);
	if(this.autoStart) this.nextTask();
}
bpmjs.TaskGroup.prototype.doStart = function() {
	var _g = 0, _g1 = this.tasks;
	while(_g < _g1.length) {
		var task = _g1[_g];
		++_g;
		this.getMonitor().append(task.getMonitor(),1 / this.tasks.length);
	}
	this.nextTask();
}
bpmjs.TaskGroup.prototype.recomputeMonitor = function() {
	this.getMonitor().reset();
	var totalTasks = this.getTotalTaskCount();
	var $it0 = this.pendingTasks.iterator();
	while( $it0.hasNext() ) {
		var task = $it0.next();
		this.getMonitor().append(task.getMonitor(),1 / totalTasks);
	}
	var _g = 0, _g1 = this.tasks;
	while(_g < _g1.length) {
		var task = _g1[_g];
		++_g;
		this.getMonitor().append(task.getMonitor(),1 / totalTasks);
	}
}
bpmjs.TaskGroup.prototype.getTotalTaskCount = function() {
	return Lambda.count(this.pendingTasks) + Lambda.count(this.tasks);
}
bpmjs.TaskGroup.prototype.nextTask = function() {
	var pendingTaskCount = Lambda.count(this.pendingTasks);
	if(pendingTaskCount >= this.parallelTasksMax) return;
	if(this.tasks.length > 0) {
		var pendingTask = this.tasks.shift();
		this.pendingTasks.add(pendingTask);
		pendingTask.completeSignaler.bind($closure(this,"handleTaskComplete"));
		pendingTask.errorSignaler.bind($closure(this,"handleTaskError"));
		pendingTask.start();
	} else if(!this.autoStart) this.complete();
}
bpmjs.TaskGroup.prototype.handleTaskComplete = function(task) {
	this.pendingTasks.remove(task);
	this.nextTask();
}
bpmjs.TaskGroup.prototype.handleTaskError = function(taskError) {
	this.pendingTasks.remove(taskError.task);
	if(!this.autoStart) this.error(this,taskError.error); else {
		Log.posInfo = { fileName : "TaskGroup.hx", lineNumber : 99, className : "bpmjs.TaskGroup", methodName : "handleTaskError"};
		if(Log.filter(LogLevel.WARN)) {
			Log.fetchInput(taskError.error,null,null,null,null,null,null);
			console.warn(Log.createMessage());
		}
	}
}
bpmjs.TaskGroup.prototype.__class__ = bpmjs.TaskGroup;
bpmjs.Sequence = function(name) {
	if( name === $_ ) return;
	bpmjs.TaskGroup.call(this);
	this.getMonitor().name = name;
	this.name = name;
	this.timer = new haxe.Timer(100);
	this.completeSignaler.bind($closure(this,"handleComplete"));
	this.errorSignaler.bind($closure(this,"handleError"));
}
bpmjs.Sequence.__name__ = ["bpmjs","Sequence"];
bpmjs.Sequence.__super__ = bpmjs.TaskGroup;
for(var k in bpmjs.TaskGroup.prototype ) bpmjs.Sequence.prototype[k] = bpmjs.TaskGroup.prototype[k];
bpmjs.Sequence.prototype.name = null;
bpmjs.Sequence.prototype.objects = null;
bpmjs.Sequence.prototype.loadingTaskGroup = null;
bpmjs.Sequence.prototype.timer = null;
bpmjs.Sequence.prototype.addExecuteTask = function(phase) {
	this.add(new bpmjs.ExecutePhaseTask(this,phase));
}
bpmjs.Sequence.prototype.addLoadingTask = function() {
	this.loadingTaskGroup = new bpmjs.LoadingTaskGroup(this);
	this.loadingTaskGroup.getMonitor().weight = 1000;
	this.add(this.loadingTaskGroup);
}
bpmjs.Sequence.prototype.start = function() {
	this.timer.run = $closure(this,"handleProgress");
	bpmjs.TaskGroup.prototype.start.call(this);
}
bpmjs.Sequence.prototype.execute = function(phase) {
	var _g = 0, _g1 = this.objects;
	while(_g < _g1.length) {
		var contextObject = _g1[_g];
		++_g;
		var object = contextObject.object;
		var metaDatas = haxe.rtti.Meta.getFields(contextObject.type);
		var _g2 = 0, _g3 = Reflect.fields(metaDatas);
		while(_g2 < _g3.length) {
			var fieldName = _g3[_g2];
			++_g2;
			var meta = Reflect.field(metaDatas,fieldName);
			if(Reflect.hasField(meta,"Sequence")) {
				var localName = meta.Sequence[0];
				var localPhase = meta.Sequence[1];
				if(localPhase == phase) {
					{
						Log.posInfo = { fileName : "Sequencer.hx", lineNumber : 86, className : "bpmjs.Sequence", methodName : "execute"};
						if(Log.filter(LogLevel.INFO)) {
							Log.fetchInput("Phase '" + localPhase + "' " + Type.getClassName(contextObject.type) + "#" + fieldName,null,null,null,null,null,null);
							console.info(Log.createMessage());
						}
					}
					try {
						var result = Reflect.field(object,fieldName).apply(object,[]);
						if(Std["is"](result,bpmjs.SequencerTaskGroup)) {
							{
								Log.posInfo = { fileName : "Sequencer.hx", lineNumber : 92, className : "bpmjs.Sequence", methodName : "execute"};
								if(Log.filter(LogLevel.INFO)) {
									Log.fetchInput("Adding task '",reflect.ClassInfo.forInstance(result).name,null,null,null,null,null);
									console.info(Log.createMessage());
								}
							}
							this.loadingTaskGroup.add(result);
						}
					} catch( e ) {
						throw "Phase '" + localPhase + "' " + Type.getClassName(contextObject.type) + "#" + fieldName + " created an error:\n" + Std.string(e);
					}
				}
			}
		}
	}
}
bpmjs.Sequence.prototype.handleProgress = function() {
	var _g = 0, _g1 = this.objects;
	while(_g < _g1.length) {
		var contextObject = _g1[_g];
		++_g;
		var object = contextObject.object;
		var metaDatas = haxe.rtti.Meta.getFields(contextObject.type);
		var _g2 = 0, _g3 = Reflect.fields(metaDatas);
		while(_g2 < _g3.length) {
			var fieldName = _g3[_g2];
			++_g2;
			var meta = Reflect.field(metaDatas,fieldName);
			if(Reflect.hasField(meta,"Sequence")) {
				var localName = meta.Sequence[0];
				var localPhase = meta.Sequence[1];
				if(localPhase == "monitor") {
					var result = Reflect.field(object,fieldName).apply(object,[this.getMonitor()]);
				}
			}
		}
	}
}
bpmjs.Sequence.prototype.handleComplete = function(task) {
	this.handleProgress();
	this.timer.stop();
}
bpmjs.Sequence.prototype.handleError = function(error) {
	var _g = 0, _g1 = this.objects;
	while(_g < _g1.length) {
		var contextObject = _g1[_g];
		++_g;
		var object = contextObject.object;
		var metaDatas = haxe.rtti.Meta.getFields(contextObject.type);
		var _g2 = 0, _g3 = Reflect.fields(metaDatas);
		while(_g2 < _g3.length) {
			var fieldName = _g3[_g2];
			++_g2;
			var meta = Reflect.field(metaDatas,fieldName);
			if(Reflect.hasField(meta,"Sequence")) {
				var localName = meta.Sequence[0];
				var localPhase = meta.Sequence[1];
				if(localPhase == "error") {
					var result = Reflect.field(object,fieldName).apply(object,[error.error]);
				}
			}
		}
	}
	this.timer.stop();
}
bpmjs.Sequence.prototype.__class__ = bpmjs.Sequence;
bpmjs.ExecutePhaseTask = function(sequence,phase) {
	if( sequence === $_ ) return;
	bpmjs.Task.call(this);
	this.getMonitor().name = "execute: " + phase;
	this.sequence = sequence;
	this.phase = phase;
}
bpmjs.ExecutePhaseTask.__name__ = ["bpmjs","ExecutePhaseTask"];
bpmjs.ExecutePhaseTask.__super__ = bpmjs.Task;
for(var k in bpmjs.Task.prototype ) bpmjs.ExecutePhaseTask.prototype[k] = bpmjs.Task.prototype[k];
bpmjs.ExecutePhaseTask.prototype.sequence = null;
bpmjs.ExecutePhaseTask.prototype.phase = null;
bpmjs.ExecutePhaseTask.prototype.doStart = function() {
	try {
		this.sequence.execute(this.phase);
	} catch( e ) {
		this.error(this,Std.string(e));
		return;
	}
	this.complete();
}
bpmjs.ExecutePhaseTask.prototype.__class__ = bpmjs.ExecutePhaseTask;
bpmjs.LoadingTaskGroup = function(sequence) {
	if( sequence === $_ ) return;
	bpmjs.TaskGroup.call(this);
	this.getMonitor().name = "loading";
}
bpmjs.LoadingTaskGroup.__name__ = ["bpmjs","LoadingTaskGroup"];
bpmjs.LoadingTaskGroup.__super__ = bpmjs.TaskGroup;
for(var k in bpmjs.TaskGroup.prototype ) bpmjs.LoadingTaskGroup.prototype[k] = bpmjs.TaskGroup.prototype[k];
bpmjs.LoadingTaskGroup.prototype.__class__ = bpmjs.LoadingTaskGroup;
Color = function(r,g,b,a) {
	if( r === $_ ) return;
	if(a == null) a = 1.0;
	if(b == null) b = 1.0;
	if(g == null) g = 0.0;
	if(r == null) r = 1.0;
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}
Color.__name__ = ["Color"];
Color.prototype.r = null;
Color.prototype.g = null;
Color.prototype.b = null;
Color.prototype.a = null;
Color.prototype.fromHex = function(hex) {
	this.r = (hex >> 16 & 255) / 255;
	this.g = (hex >> 8 & 255) / 255;
	this.b = (hex & 255) / 255;
	this.a = 1.0;
	return this;
}
Color.prototype.scaleRGB = function(factor) {
	this.r *= factor;
	this.g *= factor;
	this.b *= factor;
}
Color.prototype.mixFrom = function(color1,color2,color1Mix) {
	if(color1Mix < 0) color1Mix = 0;
	if(color1Mix > 1) color1Mix = 1;
	var color2Mix = 1 - color1Mix;
	this.r = color1.r * color1Mix + color2.r * color2Mix;
	this.g = color1.g * color1Mix + color2.g * color2Mix;
	this.b = color1.b * color1Mix + color2.b * color2Mix;
}
Color.prototype.toContextRGB = function() {
	return "rgb(" + this.r * 255 + "," + this.g * 255 + "," + this.b * 255 + ")";
}
Color.prototype.toContextRGBA = function() {
	return "rgba(" + Std["int"](this.r * 255) + "," + Std["int"](this.g * 255) + "," + Std["int"](this.b * 255) + "," + this.a + ")";
}
Color.prototype.clone = function() {
	return new Color(this.r,this.g,this.b,this.a);
}
Color.prototype.toString = function() {
	return "Color: " + this.r + "," + this.g + "," + this.b + "," + this.a;
}
Color.prototype.__class__ = Color;
Color.__interfaces__ = [haxe.rtti.Infos];
kumite.time.Time = function(p) {
	if( p === $_ ) return;
	this.reset();
}
kumite.time.Time.__name__ = ["kumite","time","Time"];
kumite.time.Time.prototype.ms = null;
kumite.time.Time.prototype.frameMs = null;
kumite.time.Time.prototype.timeScale = null;
kumite.time.Time.prototype.frame = null;
kumite.time.Time.prototype.frameRate = null;
kumite.time.Time.prototype.lastTime = null;
kumite.time.Time.prototype.reset = function() {
	this.frameRate = 60;
	this.ms = 0;
	this.frameMs = Std["int"](1000 / 60);
	this.timeScale = 1;
	this.frame = 0;
	this.lastTime = Date.now().getTime();
}
kumite.time.Time.prototype.tick = function() {
	var time = Date.now().getTime();
	this.frame++;
	if(this.lastTime == -1) this.lastTime = time - 100;
	this.frameMs = time - this.lastTime;
	if(Math.isNaN(this.frameMs) || !Math.isFinite(this.frameMs)) this.frameMs = 100;
	this.timeScale += (this.frameMs / 1000 * 60 - this.timeScale) * 0.1;
	if(this.timeScale < 0.25) this.timeScale = 0.25;
	if(this.timeScale > 3) this.timeScale = 3;
	if(Math.isNaN(this.timeScale) || !Math.isFinite(this.timeScale)) this.timeScale = 100 / 1000 * 30;
	this.ms += this.frameMs;
	this.frameRate = 1000 / this.frameMs;
	this.lastTime = time;
}
kumite.time.Time.prototype.tickInPause = function() {
	var time = Date.now().getTime();
	if(this.lastTime == -1) this.lastTime = time - 100;
	this.frameMs = time - this.lastTime;
	if(Math.isNaN(this.frameMs) || !Math.isFinite(this.frameMs)) this.frameMs = 100;
	this.timeScale = this.frameMs / 1000 * 60;
	if(Math.isNaN(this.timeScale) || !Math.isFinite(this.timeScale)) this.timeScale = 100 / 1000 * 60;
	this.frameRate = 1000 / this.frameMs;
	this.lastTime = time;
}
kumite.time.Time.prototype.summand = function(value) {
	return value * this.timeScale;
}
kumite.time.Time.prototype.factor = function(value) {
	return Math.pow(value,this.timeScale);
}
kumite.time.Time.prototype.interpolateTo = function(from,to,f) {
	return from * (1 - f * this.timeScale) + to * (f * this.timeScale);
}
kumite.time.Time.prototype.interpolateVec3To = function(from,to,f) {
	from.x = this.interpolateTo(from.x,to.x,f);
	from.y = this.interpolateTo(from.y,to.y,f);
	from.z = this.interpolateTo(from.z,to.z,f);
}
kumite.time.Time.prototype.__class__ = kumite.time.Time;
bpmjs.ReflectUtil = function() { }
bpmjs.ReflectUtil.__name__ = ["bpmjs","ReflectUtil"];
bpmjs.ReflectUtil.callMethodWithMetadata = function(object,type,metadata,args) {
	var metadatas = haxe.rtti.Meta.getFields(type);
	var _g = 0, _g1 = Reflect.fields(metadatas);
	while(_g < _g1.length) {
		var fieldName = _g1[_g];
		++_g;
		var meta = Reflect.field(metadatas,fieldName);
		if(Reflect.hasField(meta,metadata)) return Reflect.field(object,fieldName).apply(object,[]);
	}
	return null;
}
bpmjs.ReflectUtil.getClassName = function(object) {
	return Type.getClassName(Type.getClass(object));
}
bpmjs.ReflectUtil.prototype.__class__ = bpmjs.ReflectUtil;
if(typeof ease=='undefined') ease = {}
ease.Quad = function() { }
ease.Quad.__name__ = ["ease","Quad"];
ease.Quad.easeIn = function(t,b,c,d) {
	return c * (t /= d) * t + b;
}
ease.Quad.easeOut = function(t,b,c,d) {
	return -c * (t /= d) * (t - 2) + b;
}
ease.Quad.easeInOut = function(t,b,c,d) {
	if((t /= d / 2) < 1) return c / 2 * t * t + b;
	return -c / 2 * (--t * (t - 2) - 1) + b;
}
ease.Quad.prototype.__class__ = ease.Quad;
reflect.Field = function(field,definedInClass,owner) {
	if( field === $_ ) return;
	this.field = field;
	this.definedInClass = definedInClass;
	this.owner = owner;
}
reflect.Field.__name__ = ["reflect","Field"];
reflect.Field.prototype.owner = null;
reflect.Field.prototype.name = null;
reflect.Field.prototype.type = null;
reflect.Field.prototype.clazz = null;
reflect.Field.prototype.field = null;
reflect.Field.prototype.definedInClass = null;
reflect.Field.prototype.hasMetadata = function(name) {
	var declaredType = reflect.ClassInfo.forName(this.definedInClass);
	var metadatas = haxe.rtti.Meta.getFields(declaredType.type);
	var _g = 0, _g1 = Reflect.fields(metadatas);
	while(_g < _g1.length) {
		var fieldName = _g1[_g];
		++_g;
		if(fieldName == this.field.name) {
			var meta = Reflect.field(metadatas,fieldName);
			if(Reflect.hasField(meta,name)) return true;
		}
	}
	return false;
}
reflect.Field.prototype.getOwner = function() {
	return this.owner;
}
reflect.Field.prototype.getName = function() {
	return this.field.name;
}
reflect.Field.prototype.getType = function() {
	return reflect.ClassInfo.forCType(this.field.type);
}
reflect.Field.prototype.getClass = function() {
	var type = reflect.ClassInfo.forCType(this.field.type);
	return type == null?null:type.type;
}
reflect.Field.prototype.__class__ = reflect.Field;
reflect.Field.__interfaces__ = [reflect.MetadataAware];
haxe.rtti.XmlParser = function(p) {
	if( p === $_ ) return;
	this.root = new Array();
}
haxe.rtti.XmlParser.__name__ = ["haxe","rtti","XmlParser"];
haxe.rtti.XmlParser.prototype.root = null;
haxe.rtti.XmlParser.prototype.curplatform = null;
haxe.rtti.XmlParser.prototype.sort = function(l) {
	if(l == null) l = this.root;
	l.sort(function(e1,e2) {
		var n1 = (function($this) {
			var $r;
			var $e = (e1);
			switch( $e[1] ) {
			case 0:
				var p = $e[2];
				$r = " " + p;
				break;
			default:
				$r = haxe.rtti.TypeApi.typeInfos(e1).path;
			}
			return $r;
		}(this));
		var n2 = (function($this) {
			var $r;
			var $e = (e2);
			switch( $e[1] ) {
			case 0:
				var p = $e[2];
				$r = " " + p;
				break;
			default:
				$r = haxe.rtti.TypeApi.typeInfos(e2).path;
			}
			return $r;
		}(this));
		if(n1 > n2) return 1;
		return -1;
	});
	var _g = 0;
	while(_g < l.length) {
		var x = l[_g];
		++_g;
		var $e = (x);
		switch( $e[1] ) {
		case 0:
			var l1 = $e[4];
			this.sort(l1);
			break;
		case 1:
			var c = $e[2];
			c.fields = this.sortFields(c.fields);
			c.statics = this.sortFields(c.statics);
			break;
		case 2:
			var e = $e[2];
			break;
		case 3:
			break;
		}
	}
}
haxe.rtti.XmlParser.prototype.sortFields = function(fl) {
	var a = Lambda.array(fl);
	a.sort(function(f1,f2) {
		var v1 = haxe.rtti.TypeApi.isVar(f1.type);
		var v2 = haxe.rtti.TypeApi.isVar(f2.type);
		if(v1 && !v2) return -1;
		if(v2 && !v1) return 1;
		if(f1.name == "new") return -1;
		if(f2.name == "new") return 1;
		if(f1.name > f2.name) return 1;
		return -1;
	});
	return Lambda.list(a);
}
haxe.rtti.XmlParser.prototype.process = function(x,platform) {
	this.curplatform = platform;
	this.xroot(new haxe.xml.Fast(x));
}
haxe.rtti.XmlParser.prototype.mergeRights = function(f1,f2) {
	if(f1.get == haxe.rtti.Rights.RInline && f1.set == haxe.rtti.Rights.RNo && f2.get == haxe.rtti.Rights.RNormal && f2.set == haxe.rtti.Rights.RMethod) {
		f1.get = haxe.rtti.Rights.RNormal;
		f1.set = haxe.rtti.Rights.RMethod;
		return true;
	}
	return false;
}
haxe.rtti.XmlParser.prototype.mergeFields = function(f,f2) {
	return haxe.rtti.TypeApi.fieldEq(f,f2) || f.name == f2.name && (this.mergeRights(f,f2) || this.mergeRights(f2,f)) && haxe.rtti.TypeApi.fieldEq(f,f2);
}
haxe.rtti.XmlParser.prototype.mergeClasses = function(c,c2) {
	if(c.isInterface != c2.isInterface) return false;
	if(this.curplatform != null) c.platforms.add(this.curplatform);
	if(c.isExtern != c2.isExtern) c.isExtern = false;
	var $it0 = c2.fields.iterator();
	while( $it0.hasNext() ) {
		var f2 = $it0.next();
		var found = null;
		var $it1 = c.fields.iterator();
		while( $it1.hasNext() ) {
			var f = $it1.next();
			if(this.mergeFields(f,f2)) {
				found = f;
				break;
			}
		}
		if(found == null) c.fields.add(f2); else if(this.curplatform != null) found.platforms.add(this.curplatform);
	}
	var $it2 = c2.statics.iterator();
	while( $it2.hasNext() ) {
		var f2 = $it2.next();
		var found = null;
		var $it3 = c.statics.iterator();
		while( $it3.hasNext() ) {
			var f = $it3.next();
			if(this.mergeFields(f,f2)) {
				found = f;
				break;
			}
		}
		if(found == null) c.statics.add(f2); else if(this.curplatform != null) found.platforms.add(this.curplatform);
	}
	return true;
}
haxe.rtti.XmlParser.prototype.mergeEnums = function(e,e2) {
	if(e.isExtern != e2.isExtern) return false;
	if(this.curplatform != null) e.platforms.add(this.curplatform);
	var $it0 = e2.constructors.iterator();
	while( $it0.hasNext() ) {
		var c2 = $it0.next();
		var found = null;
		var $it1 = e.constructors.iterator();
		while( $it1.hasNext() ) {
			var c = $it1.next();
			if(haxe.rtti.TypeApi.constructorEq(c,c2)) {
				found = c;
				break;
			}
		}
		if(found == null) return false;
		if(this.curplatform != null) found.platforms.add(this.curplatform);
	}
	return true;
}
haxe.rtti.XmlParser.prototype.mergeTypedefs = function(t,t2) {
	if(this.curplatform == null) return false;
	t.platforms.add(this.curplatform);
	t.types.set(this.curplatform,t2.type);
	return true;
}
haxe.rtti.XmlParser.prototype.merge = function(t) {
	var inf = haxe.rtti.TypeApi.typeInfos(t);
	var pack = inf.path.split(".");
	var cur = this.root;
	var curpack = new Array();
	pack.pop();
	var _g = 0;
	while(_g < pack.length) {
		var p = pack[_g];
		++_g;
		var found = false;
		var _g1 = 0;
		try {
			while(_g1 < cur.length) {
				var pk = cur[_g1];
				++_g1;
				var $e = (pk);
				switch( $e[1] ) {
				case 0:
					var subs = $e[4], pname = $e[2];
					if(pname == p) {
						found = true;
						cur = subs;
						throw "__break__";
					}
					break;
				default:
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		curpack.push(p);
		if(!found) {
			var pk = new Array();
			cur.push(haxe.rtti.TypeTree.TPackage(p,curpack.join("."),pk));
			cur = pk;
		}
	}
	var prev = null;
	var _g = 0;
	while(_g < cur.length) {
		var ct = cur[_g];
		++_g;
		var tinf;
		try {
			tinf = haxe.rtti.TypeApi.typeInfos(ct);
		} catch( e ) {
			continue;
		}
		if(tinf.path == inf.path) {
			var sameType = true;
			if(tinf.module == inf.module && tinf.doc == inf.doc && tinf.isPrivate == inf.isPrivate) {
				var $e = (ct);
				switch( $e[1] ) {
				case 1:
					var c = $e[2];
					var $e = (t);
					switch( $e[1] ) {
					case 1:
						var c2 = $e[2];
						if(this.mergeClasses(c,c2)) return;
						break;
					default:
						sameType = false;
					}
					break;
				case 2:
					var e = $e[2];
					var $e = (t);
					switch( $e[1] ) {
					case 2:
						var e2 = $e[2];
						if(this.mergeEnums(e,e2)) return;
						break;
					default:
						sameType = false;
					}
					break;
				case 3:
					var td = $e[2];
					var $e = (t);
					switch( $e[1] ) {
					case 3:
						var td2 = $e[2];
						if(this.mergeTypedefs(td,td2)) return;
						break;
					default:
					}
					break;
				case 0:
					sameType = false;
					break;
				}
			}
			var msg = tinf.module != inf.module?"module " + inf.module + " should be " + tinf.module:tinf.doc != inf.doc?"documentation is different":tinf.isPrivate != inf.isPrivate?"private flag is different":!sameType?"type kind is different":"could not merge definition";
			throw "Incompatibilities between " + tinf.path + " in " + tinf.platforms.join(",") + " and " + this.curplatform + " (" + msg + ")";
		}
	}
	cur.push(t);
}
haxe.rtti.XmlParser.prototype.mkPath = function(p) {
	return p;
}
haxe.rtti.XmlParser.prototype.mkTypeParams = function(p) {
	var pl = p.split(":");
	if(pl[0] == "") return new Array();
	return pl;
}
haxe.rtti.XmlParser.prototype.mkRights = function(r) {
	return (function($this) {
		var $r;
		switch(r) {
		case "null":
			$r = haxe.rtti.Rights.RNo;
			break;
		case "method":
			$r = haxe.rtti.Rights.RMethod;
			break;
		case "dynamic":
			$r = haxe.rtti.Rights.RDynamic;
			break;
		case "inline":
			$r = haxe.rtti.Rights.RInline;
			break;
		default:
			$r = haxe.rtti.Rights.RCall(r);
		}
		return $r;
	}(this));
}
haxe.rtti.XmlParser.prototype.xerror = function(c) {
	return (function($this) {
		var $r;
		throw "Invalid " + c.getName();
		return $r;
	}(this));
}
haxe.rtti.XmlParser.prototype.xroot = function(x) {
	var $it0 = x.x.elements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		this.merge(this.processElement(c));
	}
}
haxe.rtti.XmlParser.prototype.processElement = function(x) {
	var c = new haxe.xml.Fast(x);
	return (function($this) {
		var $r;
		switch(c.getName()) {
		case "class":
			$r = haxe.rtti.TypeTree.TClassdecl($this.xclass(c));
			break;
		case "enum":
			$r = haxe.rtti.TypeTree.TEnumdecl($this.xenum(c));
			break;
		case "typedef":
			$r = haxe.rtti.TypeTree.TTypedecl($this.xtypedef(c));
			break;
		default:
			$r = $this.xerror(c);
		}
		return $r;
	}(this));
}
haxe.rtti.XmlParser.prototype.xpath = function(x) {
	var path = this.mkPath(x.att.resolve("path"));
	var params = new List();
	var $it0 = x.getElements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		params.add(this.xtype(c));
	}
	return { path : path, params : params};
}
haxe.rtti.XmlParser.prototype.xclass = function(x) {
	var csuper = null;
	var doc = null;
	var tdynamic = null;
	var interfaces = new List();
	var fields = new List();
	var statics = new List();
	var $it0 = x.getElements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		switch(c.getName()) {
		case "haxe_doc":
			doc = c.getInnerData();
			break;
		case "extends":
			csuper = this.xpath(c);
			break;
		case "implements":
			interfaces.add(this.xpath(c));
			break;
		case "haxe_dynamic":
			tdynamic = this.xtype(new haxe.xml.Fast(c.x.firstElement()));
			break;
		default:
			if(c.x.exists("static")) statics.add(this.xclassfield(c)); else fields.add(this.xclassfield(c));
		}
	}
	return { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), isInterface : x.x.exists("interface"), params : this.mkTypeParams(x.att.resolve("params")), superClass : csuper, interfaces : interfaces, fields : fields, statics : statics, tdynamic : tdynamic, platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xclassfield = function(x) {
	var e = x.getElements();
	var t = this.xtype(e.next());
	var doc = null;
	while( e.hasNext() ) {
		var c = e.next();
		switch(c.getName()) {
		case "haxe_doc":
			doc = c.getInnerData();
			break;
		default:
			this.xerror(c);
		}
	}
	return { name : x.getName(), type : t, isPublic : x.x.exists("public"), isOverride : x.x.exists("override"), doc : doc, get : x.has.resolve("get")?this.mkRights(x.att.resolve("get")):haxe.rtti.Rights.RNormal, set : x.has.resolve("set")?this.mkRights(x.att.resolve("set")):haxe.rtti.Rights.RNormal, params : x.has.resolve("params")?this.mkTypeParams(x.att.resolve("params")):null, platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xenum = function(x) {
	var cl = new List();
	var doc = null;
	var $it0 = x.getElements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		if(c.getName() == "haxe_doc") doc = c.getInnerData(); else cl.add(this.xenumfield(c));
	}
	return { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), params : this.mkTypeParams(x.att.resolve("params")), constructors : cl, platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xenumfield = function(x) {
	var args = null;
	var xdoc = x.x.elementsNamed("haxe_doc").next();
	if(x.has.resolve("a")) {
		var names = x.att.resolve("a").split(":");
		var elts = x.getElements();
		args = new List();
		var _g = 0;
		while(_g < names.length) {
			var c = names[_g];
			++_g;
			var opt = false;
			if(c.charAt(0) == "?") {
				opt = true;
				c = c.substr(1);
			}
			args.add({ name : c, opt : opt, t : this.xtype(elts.next())});
		}
	}
	return { name : x.getName(), args : args, doc : xdoc == null?null:new haxe.xml.Fast(xdoc).getInnerData(), platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xtypedef = function(x) {
	var doc = null;
	var t = null;
	var $it0 = x.getElements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		if(c.getName() == "haxe_doc") doc = c.getInnerData(); else t = this.xtype(c);
	}
	var types = new Hash();
	if(this.curplatform != null) types.set(this.curplatform,t);
	return { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), params : this.mkTypeParams(x.att.resolve("params")), type : t, types : types, platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xtype = function(x) {
	return (function($this) {
		var $r;
		switch(x.getName()) {
		case "unknown":
			$r = haxe.rtti.CType.CUnknown;
			break;
		case "e":
			$r = haxe.rtti.CType.CEnum($this.mkPath(x.att.resolve("path")),$this.xtypeparams(x));
			break;
		case "c":
			$r = haxe.rtti.CType.CClass($this.mkPath(x.att.resolve("path")),$this.xtypeparams(x));
			break;
		case "t":
			$r = haxe.rtti.CType.CTypedef($this.mkPath(x.att.resolve("path")),$this.xtypeparams(x));
			break;
		case "f":
			$r = (function($this) {
				var $r;
				var args = new List();
				var aname = x.att.resolve("a").split(":");
				var eargs = aname.iterator();
				var $it0 = x.getElements();
				while( $it0.hasNext() ) {
					var e = $it0.next();
					var opt = false;
					var a = eargs.next();
					if(a == null) a = "";
					if(a.charAt(0) == "?") {
						opt = true;
						a = a.substr(1);
					}
					args.add({ name : a, opt : opt, t : $this.xtype(e)});
				}
				var ret = args.last();
				args.remove(ret);
				$r = haxe.rtti.CType.CFunction(args,ret.t);
				return $r;
			}($this));
			break;
		case "a":
			$r = (function($this) {
				var $r;
				var fields = new List();
				var $it1 = x.getElements();
				while( $it1.hasNext() ) {
					var f = $it1.next();
					fields.add({ name : f.getName(), t : $this.xtype(new haxe.xml.Fast(f.x.firstElement()))});
				}
				$r = haxe.rtti.CType.CAnonymous(fields);
				return $r;
			}($this));
			break;
		case "d":
			$r = (function($this) {
				var $r;
				var t = null;
				var tx = x.x.firstElement();
				if(tx != null) t = $this.xtype(new haxe.xml.Fast(tx));
				$r = haxe.rtti.CType.CDynamic(t);
				return $r;
			}($this));
			break;
		default:
			$r = $this.xerror(x);
		}
		return $r;
	}(this));
}
haxe.rtti.XmlParser.prototype.xtypeparams = function(x) {
	var p = new List();
	var $it0 = x.getElements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		p.add(this.xtype(c));
	}
	return p;
}
haxe.rtti.XmlParser.prototype.defplat = function() {
	var l = new List();
	if(this.curplatform != null) l.add(this.curplatform);
	return l;
}
haxe.rtti.XmlParser.prototype.__class__ = haxe.rtti.XmlParser;
bpmjs.ContextConfig = function(p) {
}
bpmjs.ContextConfig.__name__ = ["bpmjs","ContextConfig"];
bpmjs.ContextConfig.prototype.frontMessenger = null;
bpmjs.ContextConfig.prototype.__class__ = bpmjs.ContextConfig;
kumite.stage.StageResizeMessage = function(p) {
}
kumite.stage.StageResizeMessage.__name__ = ["kumite","stage","StageResizeMessage"];
kumite.stage.StageResizeMessage.prototype.__class__ = kumite.stage.StageResizeMessage;
hsl.haxe.Signaler = function() { }
hsl.haxe.Signaler.__name__ = ["hsl","haxe","Signaler"];
hsl.haxe.Signaler.prototype.isListenedTo = null;
hsl.haxe.Signaler.prototype.subject = null;
hsl.haxe.Signaler.prototype.addBubblingTarget = null;
hsl.haxe.Signaler.prototype.addNotificationTarget = null;
hsl.haxe.Signaler.prototype.bind = null;
hsl.haxe.Signaler.prototype.bindAdvanced = null;
hsl.haxe.Signaler.prototype.bindVoid = null;
hsl.haxe.Signaler.prototype.dispatch = null;
hsl.haxe.Signaler.prototype.getIsListenedTo = null;
hsl.haxe.Signaler.prototype.removeBubblingTarget = null;
hsl.haxe.Signaler.prototype.removeNotificationTarget = null;
hsl.haxe.Signaler.prototype.unbind = null;
hsl.haxe.Signaler.prototype.unbindAdvanced = null;
hsl.haxe.Signaler.prototype.unbindVoid = null;
hsl.haxe.Signaler.prototype.__class__ = hsl.haxe.Signaler;
kumite.stage.Config = function(p) {
	if( p === $_ ) return;
	this.stage = new kumite.stage.Stage();
	this.stageResizeAction = new kumite.stage.StageResizeAction();
}
kumite.stage.Config.__name__ = ["kumite","stage","Config"];
kumite.stage.Config.prototype.stage = null;
kumite.stage.Config.prototype.stageResizeAction = null;
kumite.stage.Config.prototype.__class__ = kumite.stage.Config;
kumite.stage.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.launch.Launcher = function(p) {
}
kumite.launch.Launcher.__name__ = ["kumite","launch","Launcher"];
kumite.launch.Launcher.prototype.sequencer = null;
kumite.launch.Launcher.prototype.handlePostComplete = function() {
	this.sequencer.start("boot");
}
kumite.launch.Launcher.prototype.showError = function(message) {
	{
		Log.posInfo = { fileName : "Launcher.hx", lineNumber : 26, className : "kumite.launch.Launcher", methodName : "showError"};
		if(Log.filter(LogLevel.ERROR)) {
			Log.fetchInput(message,null,null,null,null,null,null);
			console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
			Log.displayError(Log.createErrorMessage());
		}
	}
}
kumite.launch.Launcher.prototype.handleFinish = function() {
}
kumite.launch.Launcher.prototype.__class__ = kumite.launch.Launcher;
kumite.launch.Launcher.__interfaces__ = [haxe.rtti.Infos];
if(!kumite.presentation) kumite.presentation = {}
kumite.presentation.CanvasSlider = function(p) {
	if( p === $_ ) return;
	this.canvases = new Array();
	this.lastScrollTopEqualTime = -1;
	this.autoScroll = false;
}
kumite.presentation.CanvasSlider.__name__ = ["kumite","presentation","CanvasSlider"];
kumite.presentation.CanvasSlider.prototype.stage = null;
kumite.presentation.CanvasSlider.prototype.time = null;
kumite.presentation.CanvasSlider.prototype.autoScroll = null;
kumite.presentation.CanvasSlider.prototype.root = null;
kumite.presentation.CanvasSlider.prototype.speed = null;
kumite.presentation.CanvasSlider.prototype.scrollTop = null;
kumite.presentation.CanvasSlider.prototype.targetPosition = null;
kumite.presentation.CanvasSlider.prototype.lastScrollTop = null;
kumite.presentation.CanvasSlider.prototype.lastScrollTopEqualTime = null;
kumite.presentation.CanvasSlider.prototype.canvases = null;
kumite.presentation.CanvasSlider.prototype.start = function() {
	{
		Log.posInfo = { fileName : "CanvasSlider.hx", lineNumber : 41, className : "kumite.presentation.CanvasSlider", methodName : "start"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(null,null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	this.root = js.Lib.document.getElementById("root");
	this.lastScrollTop = this.root.scrollTop;
	var _g = 0;
	while(_g < 5) {
		var i = _g++;
		var canvas = new CanvasGraphic();
		canvas.usePow2Size = false;
		this.root.appendChild(canvas.canvas);
		this.canvases.push(canvas);
	}
	this.resize();
}
kumite.presentation.CanvasSlider.prototype.handleResize = function(message) {
	this.resize();
}
kumite.presentation.CanvasSlider.prototype.handleTick = function(tick) {
	if(!this.autoScroll) {
		if(this.root.scrollTop == this.lastScrollTop && this.lastScrollTopEqualTime == -1) this.lastScrollTopEqualTime = this.time.ms;
		if(this.root.scrollTop != this.lastScrollTop) this.lastScrollTopEqualTime = -1;
		this.lastScrollTop = this.root.scrollTop;
		this.scrollTop = this.lastScrollTop;
	}
	if(this.time.ms - this.lastScrollTopEqualTime > 100 && this.lastScrollTopEqualTime != -1) {
		if(!this.autoScroll) {
			this.speed = 0;
			this.scrollTop = this.root.scrollTop;
			this.targetPosition = Math.round(this.root.scrollTop / this.stage.height) * this.stage.height;
		}
		if(this.root.scrollTop != Math.round(this.scrollTop)) this.autoScroll = false; else {
			this.autoScroll = true;
			var newSpeed = (this.targetPosition - this.scrollTop) * 0.15;
			this.speed += (newSpeed - this.speed) * 0.15;
			if(newSpeed > 0 && this.speed > newSpeed) this.speed = newSpeed;
			if(newSpeed < 0 && this.speed < newSpeed) this.speed = newSpeed;
			this.scrollTop += this.speed;
			this.root.scrollTop = Math.round(this.scrollTop);
		}
	}
}
kumite.presentation.CanvasSlider.prototype.resize = function() {
	this.lastScrollTopEqualTime = -1;
	this.autoScroll = false;
	var _g = 0, _g1 = this.canvases;
	while(_g < _g1.length) {
		var canvas = _g1[_g];
		++_g;
		canvas.setWidth(this.stage.width);
		canvas.setHeight(this.stage.height);
		canvas.clear(new Color(Math.random(),Math.random(),Math.random()));
	}
}
kumite.presentation.CanvasSlider.prototype.__class__ = kumite.presentation.CanvasSlider;
kumite.presentation.CanvasSlider.__interfaces__ = [haxe.rtti.Infos];
Vec3 = function(x,y,z) {
	if( x === $_ ) return;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.z = z;
}
Vec3.__name__ = ["Vec3"];
Vec3.prototype.x = null;
Vec3.prototype.y = null;
Vec3.prototype.z = null;
Vec3.prototype.scale = function(factor) {
	this.x *= factor;
	this.y *= factor;
	this.z *= factor;
}
Vec3.prototype.multiply = function(x,y,z) {
	this.x *= x;
	this.y *= y;
	this.z *= z;
}
Vec3.prototype.subtract = function(x,y,z) {
	this.x -= x;
	this.y -= y;
	this.z -= z;
	return this;
}
Vec3.prototype.normalize = function() {
	var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	this.x /= length;
	this.y /= length;
	this.z /= length;
	return this;
}
Vec3.prototype.getLength = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}
Vec3.prototype.cross = function(vec) {
	var x = this.y * vec.z - this.z * vec.y;
	var y = this.z * vec.x - this.x * vec.z;
	var z = this.x * vec.y - this.y * vec.x;
	return new Vec3(x,y,z);
}
Vec3.prototype.dot = function(vec) {
	return this.x * vec.x + this.y * vec.y + this.z * vec.z;
}
Vec3.prototype.equals = function(vec) {
	return this.x == vec.x && this.y == vec.y && this.z == vec.z;
}
Vec3.prototype.transform = function(matrix) {
	var x1 = this.x, y1 = this.y, z1 = this.z;
	this.x = matrix.buffer[0] * x1 + matrix.buffer[4] * y1 + matrix.buffer[8] * z1 + matrix.buffer[12];
	this.y = matrix.buffer[1] * x1 + matrix.buffer[5] * y1 + matrix.buffer[9] * z1 + matrix.buffer[13];
	this.z = matrix.buffer[2] * x1 + matrix.buffer[6] * y1 + matrix.buffer[10] * z1 + matrix.buffer[14];
}
Vec3.prototype.setFrom = function(value,vec3) {
	if(value != null) {
		this.x = value;
		this.y = value;
		this.z = value;
	} else if(vec3 != null) {
		this.x = vec3.x;
		this.y = vec3.y;
		this.z = vec3.z;
	}
}
Vec3.prototype.clone = function() {
	return new Vec3(this.x,this.y,this.z);
}
Vec3.prototype.toString = function() {
	return "[Vec3 " + " x: " + this.x + " y: " + this.y + " z: " + this.z + "]";
}
Vec3.prototype.__class__ = Vec3;
LogFilter = function() { }
LogFilter.__name__ = ["LogFilter"];
LogFilter.prototype.enabled = null;
LogFilter.prototype.__class__ = LogFilter;
LogLevel = function(value) {
	if( value === $_ ) return;
	this.value = value;
}
LogLevel.__name__ = ["LogLevel"];
LogLevel.prototype.value = null;
LogLevel.prototype.isSmallerOrEqual = function(level) {
	return this.value <= level.value;
}
LogLevel.prototype.__class__ = LogLevel;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	var $it0 = arr.iterator();
	while( $it0.hasNext() ) {
		var t = $it0.next();
		if(t == field) return true;
	}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		for(var i in o) if( o.hasOwnProperty(i) ) a.push(i);
	} else {
		var t;
		try {
			t = o.__proto__;
		} catch( e ) {
			t = null;
		}
		if(t != null) o.__proto__ = null;
		for(var i in o) if( i != "__proto__" ) a.push(i);
		if(t != null) o.__proto__ = t;
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		var _g1 = 0, _g = arguments.length;
		while(_g1 < _g) {
			var i = _g1++;
			a.push(arguments[i]);
		}
		return f(a);
	};
}
Reflect.prototype.__class__ = Reflect;
bpmjs.FrontMessenger = function() { }
bpmjs.FrontMessenger.__name__ = ["bpmjs","FrontMessenger"];
bpmjs.FrontMessenger.prototype.addMessenger = null;
bpmjs.FrontMessenger.prototype.addReceiver = null;
bpmjs.FrontMessenger.prototype.__class__ = bpmjs.FrontMessenger;
bpmjs.DefaultFrontMessenger = function(p) {
	if( p === $_ ) return;
	this.receivers = new Array();
}
bpmjs.DefaultFrontMessenger.__name__ = ["bpmjs","DefaultFrontMessenger"];
bpmjs.DefaultFrontMessenger.prototype.receivers = null;
bpmjs.DefaultFrontMessenger.prototype.addMessenger = function(messenger) {
	{
		Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 21, className : "bpmjs.DefaultFrontMessenger", methodName : "addMessenger"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(Type.getClassName(Type.getClass(messenger)),null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	messenger.addReceiver(null,$closure(this,"handleMessage"));
}
bpmjs.DefaultFrontMessenger.prototype.addReceiver = function(receivingObject,methodName,type) {
	{
		Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 27, className : "bpmjs.DefaultFrontMessenger", methodName : "addReceiver"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(Type.getClassName(Type.getClass(receivingObject)) + "#" + methodName,Type.getClassName(type),null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	this.receivers.push(new bpmjs._FrontMessenger.Receiver(receivingObject,methodName,type));
}
bpmjs.DefaultFrontMessenger.prototype.handleMessage = function(message) {
	{
		Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 33, className : "bpmjs.DefaultFrontMessenger", methodName : "handleMessage"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(Type.getClassName(Type.getClass(message)),null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	var _g = 0, _g1 = this.receivers;
	while(_g < _g1.length) {
		var receiver = _g1[_g];
		++_g;
		if(Type.getClass(message) == receiver.type) {
			{
				Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 66, className : "bpmjs._FrontMessenger.Receiver", methodName : "execute"};
				if(Log.filter(LogLevel.INFO)) {
					Log.fetchInput(Type.getClassName(Type.getClass(receiver.receiver)) + "#" + receiver.methodName,null,null,null,null,null,null);
					console.info(Log.createMessage());
				}
			}
			receiver.method.apply(receiver.receiver,[message]);
		}
	}
}
bpmjs.DefaultFrontMessenger.prototype.__class__ = bpmjs.DefaultFrontMessenger;
bpmjs.DefaultFrontMessenger.__interfaces__ = [bpmjs.FrontMessenger];
if(!bpmjs._FrontMessenger) bpmjs._FrontMessenger = {}
bpmjs._FrontMessenger.Receiver = function(receiver,methodName,type) {
	if( receiver === $_ ) return;
	this.receiver = receiver;
	this.type = type;
	this.method = Reflect.field(receiver,methodName);
	this.methodName = methodName;
}
bpmjs._FrontMessenger.Receiver.__name__ = ["bpmjs","_FrontMessenger","Receiver"];
bpmjs._FrontMessenger.Receiver.prototype.receiver = null;
bpmjs._FrontMessenger.Receiver.prototype.method = null;
bpmjs._FrontMessenger.Receiver.prototype.methodName = null;
bpmjs._FrontMessenger.Receiver.prototype.type = null;
bpmjs._FrontMessenger.Receiver.prototype.matches = function(message) {
	return Type.getClass(message) == this.type;
}
bpmjs._FrontMessenger.Receiver.prototype.execute = function(message) {
	{
		Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 66, className : "bpmjs._FrontMessenger.Receiver", methodName : "execute"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(Type.getClassName(Type.getClass(this.receiver)) + "#" + this.methodName,null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	this.method.apply(this.receiver,[message]);
}
bpmjs._FrontMessenger.Receiver.prototype.__class__ = bpmjs._FrontMessenger.Receiver;
kumite.presentation.PresentationConfig = function(p) {
	if( p === $_ ) return;
	this.canvasSlider = new kumite.presentation.CanvasSlider();
}
kumite.presentation.PresentationConfig.__name__ = ["kumite","presentation","PresentationConfig"];
kumite.presentation.PresentationConfig.prototype.canvasSlider = null;
kumite.presentation.PresentationConfig.prototype.__class__ = kumite.presentation.PresentationConfig;
kumite.presentation.PresentationConfig.__interfaces__ = [haxe.rtti.Infos];
ERegFilter = function(level,r) {
	if( level === $_ ) return;
	this.level = level;
	this.r = r;
}
ERegFilter.__name__ = ["ERegFilter"];
ERegFilter.prototype.level = null;
ERegFilter.prototype.r = null;
ERegFilter.prototype.enabled = function(input,i,level) {
	var sender = i.className + "." + i.methodName;
	var matches = this.r.match(sender);
	if(!matches) return input;
	return matches && this.level.isSmallerOrEqual(level);
}
ERegFilter.prototype.__class__ = ERegFilter;
ERegFilter.__interfaces__ = [LogFilter];
haxe.StackItem = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.Stack = function() { }
haxe.Stack.__name__ = ["haxe","Stack"];
haxe.Stack.callStack = function() {
	return haxe.Stack.makeStack("$s");
}
haxe.Stack.exceptionStack = function() {
	return haxe.Stack.makeStack("$e");
}
haxe.Stack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b[b.b.length] = "\nCalled from " == null?"null":"\nCalled from ";
		haxe.Stack.itemToString(b,s);
	}
	return b.b.join("");
}
haxe.Stack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b[b.b.length] = "a C function" == null?"null":"a C function";
		break;
	case 1:
		var m = $e[2];
		b.b[b.b.length] = "module " == null?"null":"module ";
		b.b[b.b.length] = m == null?"null":m;
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b[b.b.length] = " (" == null?"null":" (";
		}
		b.b[b.b.length] = file == null?"null":file;
		b.b[b.b.length] = " line " == null?"null":" line ";
		b.b[b.b.length] = line == null?"null":line;
		if(s1 != null) b.b[b.b.length] = ")" == null?"null":")";
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b[b.b.length] = cname == null?"null":cname;
		b.b[b.b.length] = "." == null?"null":".";
		b.b[b.b.length] = meth == null?"null":meth;
		break;
	case 4:
		var n = $e[2];
		b.b[b.b.length] = "local function #" == null?"null":"local function #";
		b.b[b.b.length] = n == null?"null":n;
		break;
	}
}
haxe.Stack.makeStack = function(s) {
	var a = (function($this) {
		var $r;
		try {
			$r = eval(s);
		} catch( e ) {
			$r = [];
		}
		return $r;
	}(this));
	var m = new Array();
	var _g1 = 0, _g = a.length - (s == "$s"?2:0);
	while(_g1 < _g) {
		var i = _g1++;
		var d = a[i].split("::");
		m.unshift(haxe.StackItem.Method(d[0],d[1]));
	}
	return m;
}
haxe.Stack.prototype.__class__ = haxe.Stack;
haxe.FastCell = function(elt,next) {
	if( elt === $_ ) return;
	this.elt = elt;
	this.next = next;
}
haxe.FastCell.__name__ = ["haxe","FastCell"];
haxe.FastCell.prototype.elt = null;
haxe.FastCell.prototype.next = null;
haxe.FastCell.prototype.__class__ = haxe.FastCell;
haxe.FastList = function(p) {
}
haxe.FastList.__name__ = ["haxe","FastList"];
haxe.FastList.prototype.head = null;
haxe.FastList.prototype.add = function(item) {
	this.head = new haxe.FastCell(item,this.head);
}
haxe.FastList.prototype.first = function() {
	return this.head == null?null:this.head.elt;
}
haxe.FastList.prototype.pop = function() {
	var k = this.head;
	if(k == null) return null; else {
		this.head = k.next;
		return k.elt;
	}
}
haxe.FastList.prototype.isEmpty = function() {
	return this.head == null;
}
haxe.FastList.prototype.remove = function(v) {
	var prev = null;
	var l = this.head;
	while(l != null) {
		if(l.elt == v) {
			if(prev == null) this.head = l.next; else prev.next = l.next;
			break;
		}
		prev = l;
		l = l.next;
	}
	return l != null;
}
haxe.FastList.prototype.iterator = function() {
	var l = this.head;
	return { hasNext : function() {
		return l != null;
	}, next : function() {
		var k = l;
		l = k.next;
		return k.elt;
	}};
}
haxe.FastList.prototype.toString = function() {
	var a = new Array();
	var l = this.head;
	while(l != null) {
		a.push(l.elt);
		l = l.next;
	}
	return "{" + a.join(",") + "}";
}
haxe.FastList.prototype.__class__ = haxe.FastList;
IntIter = function(min,max) {
	if( min === $_ ) return;
	this.min = min;
	this.max = max;
}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
if(!haxe.xml) haxe.xml = {}
if(!haxe.xml._Fast) haxe.xml._Fast = {}
haxe.xml._Fast.NodeAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe.xml._Fast.NodeAccess.prototype.__x = null;
haxe.xml._Fast.NodeAccess.prototype.resolve = function(name) {
	var x = this.__x.elementsNamed(name).next();
	if(x == null) {
		var xname = this.__x.nodeType == Xml.Document?"Document":this.__x.getNodeName();
		throw xname + " is missing element " + name;
	}
	return new haxe.xml.Fast(x);
}
haxe.xml._Fast.NodeAccess.prototype.__class__ = haxe.xml._Fast.NodeAccess;
haxe.xml._Fast.AttribAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype.__x = null;
haxe.xml._Fast.AttribAccess.prototype.resolve = function(name) {
	if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
	var v = this.__x.get(name);
	if(v == null) throw this.__x.getNodeName() + " is missing attribute " + name;
	return v;
}
haxe.xml._Fast.AttribAccess.prototype.__class__ = haxe.xml._Fast.AttribAccess;
haxe.xml._Fast.HasAttribAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype.__x = null;
haxe.xml._Fast.HasAttribAccess.prototype.resolve = function(name) {
	if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
	return this.__x.exists(name);
}
haxe.xml._Fast.HasAttribAccess.prototype.__class__ = haxe.xml._Fast.HasAttribAccess;
haxe.xml._Fast.HasNodeAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype.__x = null;
haxe.xml._Fast.HasNodeAccess.prototype.resolve = function(name) {
	return this.__x.elementsNamed(name).hasNext();
}
haxe.xml._Fast.HasNodeAccess.prototype.__class__ = haxe.xml._Fast.HasNodeAccess;
haxe.xml._Fast.NodeListAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype.__x = null;
haxe.xml._Fast.NodeListAccess.prototype.resolve = function(name) {
	var l = new List();
	var $it0 = this.__x.elementsNamed(name);
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(new haxe.xml.Fast(x));
	}
	return l;
}
haxe.xml._Fast.NodeListAccess.prototype.__class__ = haxe.xml._Fast.NodeListAccess;
haxe.xml.Fast = function(x) {
	if( x === $_ ) return;
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + x.nodeType;
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
}
haxe.xml.Fast.__name__ = ["haxe","xml","Fast"];
haxe.xml.Fast.prototype.x = null;
haxe.xml.Fast.prototype.name = null;
haxe.xml.Fast.prototype.innerData = null;
haxe.xml.Fast.prototype.innerHTML = null;
haxe.xml.Fast.prototype.node = null;
haxe.xml.Fast.prototype.nodes = null;
haxe.xml.Fast.prototype.att = null;
haxe.xml.Fast.prototype.has = null;
haxe.xml.Fast.prototype.hasNode = null;
haxe.xml.Fast.prototype.elements = null;
haxe.xml.Fast.prototype.getName = function() {
	return this.x.nodeType == Xml.Document?"Document":this.x.getNodeName();
}
haxe.xml.Fast.prototype.getInnerData = function() {
	var it = this.x.iterator();
	if(!it.hasNext()) throw this.getName() + " does not have data";
	var v = it.next();
	if(it.hasNext()) throw this.getName() + " does not only have data";
	if(v.nodeType != Xml.PCData && v.nodeType != Xml.CData) throw this.getName() + " does not have data";
	return v.getNodeValue();
}
haxe.xml.Fast.prototype.getInnerHTML = function() {
	var s = new StringBuf();
	var $it0 = this.x.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		s.add(x.toString());
	}
	return s.b.join("");
}
haxe.xml.Fast.prototype.getElements = function() {
	var it = this.x.elements();
	return { hasNext : $closure(it,"hasNext"), next : function() {
		var x = it.next();
		if(x == null) return null;
		return new haxe.xml.Fast(x);
	}};
}
haxe.xml.Fast.prototype.__class__ = haxe.xml.Fast;
bpmjs.TaskError = function(p) {
}
bpmjs.TaskError.__name__ = ["bpmjs","TaskError"];
bpmjs.TaskError.prototype.task = null;
bpmjs.TaskError.prototype.error = null;
bpmjs.TaskError.prototype.__class__ = bpmjs.TaskError;
GLAnimationFrame = function() { }
GLAnimationFrame.__name__ = ["GLAnimationFrame"];
GLAnimationFrame.run = function(method,ms) {
	if(ms == null) ms = 0;
	var secureMethod = function() {
		try {
			method();
		} catch( e ) {
			{
				Log.posInfo = { fileName : "GLAnimationFrame.hx", lineNumber : 16, className : "GLAnimationFrame", methodName : "run"};
				if(Log.filter(LogLevel.ERROR)) {
					Log.fetchInput("Error executing GLAnimationFrame: " + e,null,null,null,null,null,null);
					console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
					Log.displayError(Log.createErrorMessage());
				}
			}
		}
	};
	if(ms == 0) {
		var window = js.Lib.window;
		var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
		if(requestAnimationFrame == null) {
			var requester = (function($this) {
				var $r;
				var requester = null;
				requester = function() {
					requestAnimationFrame(requester);
					secureMethod();
				};
				$r = requester;
				return $r;
			}(this));
			requestAnimationFrame(requester);
		} else {
			var timer = new haxe.Timer(Std["int"](1000 / 60));
			timer.run = secureMethod;
		}
	} else {
		var timer = new haxe.Timer(Std["int"](1000 / ms));
		timer.run = secureMethod;
	}
}
GLAnimationFrame.prototype.__class__ = GLAnimationFrame;
hsl.haxe.Signal = function(data,currentBond,currentTarget,origin) {
	if( data === $_ ) return;
	this.data = data;
	this.currentBond = currentBond;
	this.currentTarget = currentTarget;
	this.origin = origin;
	this.immediatePropagationStopped = false;
	this.propagationStopped = false;
}
hsl.haxe.Signal.__name__ = ["hsl","haxe","Signal"];
hsl.haxe.Signal.prototype.currentBond = null;
hsl.haxe.Signal.prototype.currentTarget = null;
hsl.haxe.Signal.prototype.data = null;
hsl.haxe.Signal.prototype.data1 = null;
hsl.haxe.Signal.prototype.immediatePropagationStopped = null;
hsl.haxe.Signal.prototype.origin = null;
hsl.haxe.Signal.prototype.propagationStopped = null;
hsl.haxe.Signal.prototype.getData = function() {
	return this.data;
}
hsl.haxe.Signal.prototype.stopImmediatePropagation = function() {
	this.immediatePropagationStopped = true;
}
hsl.haxe.Signal.prototype.stopPropagation = function() {
	this.propagationStopped = true;
}
hsl.haxe.Signal.prototype.__class__ = hsl.haxe.Signal;
ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
Type = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl;
	try {
		cl = eval(name);
	} catch( e ) {
		cl = null;
	}
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e;
	try {
		e = eval(name);
	} catch( err ) {
		e = null;
	}
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	if(args.length <= 3) return new cl(args[0],args[1],args[2]);
	if(args.length > 8) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
}
Type.createEmptyInstance = function(cl) {
	return new cl($_);
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.copy();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.prototype.__class__ = Type;
EReg = function(r,opt) {
	if( r === $_ ) return;
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	return this.r.m != null;
}
EReg.prototype.matched = function(n) {
	return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this));
}
EReg.prototype.matchedLeft = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
	return this.r.l;
}
EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	return this.r.r;
}
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "No string matched";
	return { pos : this.r.m.index, len : this.r.m[0].length};
}
EReg.prototype.split = function(s) {
	var d = "#__delim__#";
	return s.replace(this.r,d).split(d);
}
EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
}
EReg.prototype.customReplace = function(s,f) {
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.add(this.matchedLeft());
		buf.add(f(this));
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s == null?"null":s;
	return buf.b.join("");
}
EReg.prototype.__class__ = EReg;
Xml = function(p) {
}
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.parse = function(str) {
	var rules = [Xml.enode,Xml.epcdata,Xml.eend,Xml.ecdata,Xml.edoctype,Xml.ecomment,Xml.eprolog];
	var nrules = rules.length;
	var current = Xml.createDocument();
	var stack = new List();
	while(str.length > 0) {
		var i = 0;
		try {
			while(i < nrules) {
				var r = rules[i];
				if(r.match(str)) {
					switch(i) {
					case 0:
						var x = Xml.createElement(r.matched(1));
						current.addChild(x);
						str = r.matchedRight();
						while(Xml.eattribute.match(str)) {
							x.set(Xml.eattribute.matched(1),Xml.eattribute.matched(3));
							str = Xml.eattribute.matchedRight();
						}
						if(!Xml.eclose.match(str)) {
							i = nrules;
							throw "__break__";
						}
						if(Xml.eclose.matched(1) == ">") {
							stack.push(current);
							current = x;
						}
						str = Xml.eclose.matchedRight();
						break;
					case 1:
						var x = Xml.createPCData(r.matched(0));
						current.addChild(x);
						str = r.matchedRight();
						break;
					case 2:
						if(current._children != null && current._children.length == 0) {
							var e = Xml.createPCData("");
							current.addChild(e);
						}
						if(r.matched(1) != current._nodeName || stack.isEmpty()) {
							i = nrules;
							throw "__break__";
						}
						current = stack.pop();
						str = r.matchedRight();
						break;
					case 3:
						str = r.matchedRight();
						if(!Xml.ecdata_end.match(str)) throw "End of CDATA section not found";
						var x = Xml.createCData(Xml.ecdata_end.matchedLeft());
						current.addChild(x);
						str = Xml.ecdata_end.matchedRight();
						break;
					case 4:
						var pos = 0;
						var count = 0;
						var old = str;
						try {
							while(true) {
								if(!Xml.edoctype_elt.match(str)) throw "End of DOCTYPE section not found";
								var p = Xml.edoctype_elt.matchedPos();
								pos += p.pos + p.len;
								str = Xml.edoctype_elt.matchedRight();
								switch(Xml.edoctype_elt.matched(0)) {
								case "[":
									count++;
									break;
								case "]":
									count--;
									if(count < 0) throw "Invalid ] found in DOCTYPE declaration";
									break;
								default:
									if(count == 0) throw "__break__";
								}
							}
						} catch( e ) { if( e != "__break__" ) throw e; }
						var x = Xml.createDocType(old.substr(10,pos - 11));
						current.addChild(x);
						break;
					case 5:
						if(!Xml.ecomment_end.match(str)) throw "Unclosed Comment";
						var p = Xml.ecomment_end.matchedPos();
						var x = Xml.createComment(str.substr(4,p.pos + p.len - 7));
						current.addChild(x);
						str = Xml.ecomment_end.matchedRight();
						break;
					case 6:
						var prolog = r.matched(0);
						var x = Xml.createProlog(prolog.substr(2,prolog.length - 4));
						current.addChild(x);
						str = r.matchedRight();
						break;
					}
					throw "__break__";
				}
				i += 1;
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(i == nrules) {
			if(str.length > 10) throw "Xml parse error : Unexpected " + str.substr(0,10) + "..."; else throw "Xml parse error : Unexpected " + str;
		}
	}
	if(!stack.isEmpty()) throw "Xml parse error : Unclosed " + stack.last().getNodeName();
	return current;
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	return r;
}
Xml.createProlog = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype.nodeType = null;
Xml.prototype.nodeName = null;
Xml.prototype.nodeValue = null;
Xml.prototype.parent = null;
Xml.prototype._nodeName = null;
Xml.prototype._nodeValue = null;
Xml.prototype._attributes = null;
Xml.prototype._children = null;
Xml.prototype._parent = null;
Xml.prototype.getNodeName = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName;
}
Xml.prototype.setNodeName = function(n) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName = n;
}
Xml.prototype.getNodeValue = function() {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue;
}
Xml.prototype.setNodeValue = function(v) {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue = v;
}
Xml.prototype.getParent = function() {
	return this._parent;
}
Xml.prototype.get = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.get(att);
}
Xml.prototype.set = function(att,value) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.set(att,value);
}
Xml.prototype.remove = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.remove(att);
}
Xml.prototype.exists = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.exists(att);
}
Xml.prototype.attributes = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.keys();
}
Xml.prototype.iterator = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		return this.cur < this.x.length;
	}, next : function() {
		return this.x[this.cur++];
	}};
}
Xml.prototype.elements = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			if(this.x[k].nodeType == Xml.Element) break;
			k += 1;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k += 1;
			if(n.nodeType == Xml.Element) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}};
}
Xml.prototype.elementsNamed = function(name) {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			if(n.nodeType == Xml.Element && n._nodeName == name) break;
			k++;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k++;
			if(n.nodeType == Xml.Element && n._nodeName == name) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}};
}
Xml.prototype.firstChild = function() {
	if(this._children == null) throw "bad nodetype";
	return this._children[0];
}
Xml.prototype.firstElement = function() {
	if(this._children == null) throw "bad nodetype";
	var cur = 0;
	var l = this._children.length;
	while(cur < l) {
		var n = this._children[cur];
		if(n.nodeType == Xml.Element) return n;
		cur++;
	}
	return null;
}
Xml.prototype.addChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.push(x);
}
Xml.prototype.removeChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	var b = this._children.remove(x);
	if(b) x._parent = null;
	return b;
}
Xml.prototype.insertChild = function(x,pos) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.insert(pos,x);
}
Xml.prototype.toString = function() {
	if(this.nodeType == Xml.PCData) return this._nodeValue;
	if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
	if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
	if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
	if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
	var s = new StringBuf();
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "<" == null?"null":"<";
		s.add(this._nodeName);
		var $it0 = this._attributes.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			s.b[s.b.length] = " " == null?"null":" ";
			s.b[s.b.length] = k == null?"null":k;
			s.b[s.b.length] = "=\"" == null?"null":"=\"";
			s.add(this._attributes.get(k));
			s.b[s.b.length] = "\"" == null?"null":"\"";
		}
		if(this._children.length == 0) {
			s.b[s.b.length] = "/>" == null?"null":"/>";
			return s.b.join("");
		}
		s.b[s.b.length] = ">" == null?"null":">";
	}
	var $it1 = this.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		s.add(x.toString());
	}
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "</" == null?"null":"</";
		s.add(this._nodeName);
		s.b[s.b.length] = ">" == null?"null":">";
	}
	return s.b.join("");
}
Xml.prototype.__class__ = Xml;
if(typeof js=='undefined') js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg); else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	};
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	try	{ document;	} catch(e) { document = {};	}
	try { window; } catch(e) { window = {};	}
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
haxe.Timer = function(time_ms) {
	if( time_ms === $_ ) return;
	var arr = haxe_timers;
	this.id = arr.length;
	arr[this.id] = this;
	this.timerId = window.setInterval("haxe_timers[" + this.id + "].run();",time_ms);
}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.stop = function() {
	if(this.id == null) return;
	window.clearInterval(this.timerId);
	var arr = haxe_timers;
	arr[this.id] = null;
	if(this.id > 100 && this.id == arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && arr[p] == null) p--;
		arr = arr.slice(0,p + 1);
	}
	this.id = null;
}
haxe.Timer.prototype.run = function() {
}
haxe.Timer.prototype.__class__ = haxe.Timer;
kumite.stage.Stage = function(p) {
}
kumite.stage.Stage.__name__ = ["kumite","stage","Stage"];
kumite.stage.Stage.prototype.width = null;
kumite.stage.Stage.prototype.height = null;
kumite.stage.Stage.prototype.aspect = null;
kumite.stage.Stage.prototype.getAspect = function() {
	return this.width / this.height;
}
kumite.stage.Stage.prototype.__class__ = kumite.stage.Stage;
Hash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
Hash.__name__ = ["Hash"];
Hash.prototype.h = null;
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	} catch( e ) {
		for(var i in this.h) if( i == key ) return true;
		return false;
	}
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.keys = function() {
	var a = new Array();
	for(var i in this.h) a.push(i.substr(1));
	return a.iterator();
}
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}};
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{" == null?"null":"{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i == null?"null":i;
		s.b[s.b.length] = " => " == null?"null":" => ";
		s.add(Std.string(this.get(i)));
		if(it.hasNext()) s.b[s.b.length] = ", " == null?"null":", ";
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
reflect.ClassInfo = function(name,type) {
	if( name === $_ ) return;
	this.name = name;
	this.type = type;
	this.hasRtti = type.__rtti != null;
}
reflect.ClassInfo.__name__ = ["reflect","ClassInfo"];
reflect.ClassInfo.forInstance = function(instance) {
	if(instance == null) throw "Missing instance";
	var type = Type.getClass(instance);
	if(type == null) throw "Cannot resolve type for instance: " + instance;
	return reflect.ClassInfo.forClass(type);
}
reflect.ClassInfo.forClass = function(type) {
	if(type == null) throw "Missing type";
	var name = Type.getClassName(type);
	return reflect.ClassInfo.getClassInfo(name,type);
}
reflect.ClassInfo.forName = function(name) {
	if(name == null) throw "Missing name";
	var type = Type.resolveClass(name);
	if(type != null) return reflect.ClassInfo.getClassInfo(name,type);
	var enumm = Type.resolveEnum(name);
	if(enumm != null) return reflect.ClassInfo.getClassInfo(name,enumm);
	throw "Cannot resolve type or enum for name: " + name;
}
reflect.ClassInfo.forCType = function(t) {
	if(t == null) throw "Missing CType";
	var $e = (t);
	switch( $e[1] ) {
	case 4:
		var ret = $e[3], args = $e[2];
		return reflect.ClassInfo.forCType(ret);
	case 2:
		var params = $e[3], name = $e[2];
		return reflect.ClassInfo.forName(name);
	case 1:
		var params = $e[3], name = $e[2];
		return reflect.ClassInfo.forName(name);
	default:
	}
	throw "Could not resolve CType: " + t;
}
reflect.ClassInfo.getClassInfo = function(name,type) {
	var hash = reflect.ClassInfo.getHash(name,type);
	if(reflect.ClassInfo.cache.exists(hash)) return reflect.ClassInfo.cache.get(hash);
	var result = new reflect.ClassInfo(name,type);
	reflect.ClassInfo.cache.set(hash,result);
	return result;
}
reflect.ClassInfo.getHash = function(name,type) {
	var hash = name;
	var internalNames = type.__name__;
	if(internalNames != null) hash = internalNames.join(".");
	return hash;
}
reflect.ClassInfo.prototype.type = null;
reflect.ClassInfo.prototype.name = null;
reflect.ClassInfo.prototype.shortName = null;
reflect.ClassInfo.prototype.hasRtti = null;
reflect.ClassInfo.prototype.properties = null;
reflect.ClassInfo.prototype.methods = null;
reflect.ClassInfo.prototype.getProperty = function(name) {
	var _g = 0, _g1 = this.getProperties();
	while(_g < _g1.length) {
		var property = _g1[_g];
		++_g;
		if(property.field.name == name) return property;
	}
	return null;
}
reflect.ClassInfo.prototype.getMethod = function(name) {
	var _g = 0, _g1 = this.getMethods();
	while(_g < _g1.length) {
		var method = _g1[_g];
		++_g;
		if(method.field.name == name) return method;
	}
	return null;
}
reflect.ClassInfo.prototype.toString = function() {
	return "[ClassInfo for class: " + this.name + "]";
}
reflect.ClassInfo.prototype.getShortName = function() {
	return this.name.substr(this.name.lastIndexOf(".") + 1);
}
reflect.ClassInfo.prototype.getProperties = function() {
	if(this.properties != null) return this.properties;
	this.initFields();
	return this.properties;
}
reflect.ClassInfo.prototype.getMethods = function() {
	if(this.methods != null) return this.methods;
	this.initFields();
	return this.methods;
}
reflect.ClassInfo.prototype.initFields = function() {
	this.properties = new Array();
	this.methods = new Array();
	this.scanClass(this.type);
}
reflect.ClassInfo.prototype.scanClass = function(type) {
	if(type.__rtti == null) return;
	var infos = new haxe.rtti.XmlParser().processElement(Xml.parse(type.__rtti).firstElement());
	var classDef;
	var $e = (infos);
	switch( $e[1] ) {
	case 1:
		var c = $e[2];
		classDef = c;
		break;
	default:
		throw Type.getClassName(type) + " needs to be a class!";
	}
	this.scanFields(classDef);
	if(classDef.superClass != null) this.scanClass(Type.resolveClass(classDef.superClass.path));
}
reflect.ClassInfo.prototype.scanFields = function(classDef) {
	var $it0 = classDef.fields.iterator();
	while( $it0.hasNext() ) {
		var field = $it0.next();
		var $e = (field.type);
		switch( $e[1] ) {
		case 4:
			var ret = $e[3], args = $e[2];
			this.getMethods().push(new reflect.Method(field,args,ret,classDef.path,this));
			break;
		case 2:
			var params = $e[3], name = $e[2];
			this.getProperties().push(new reflect.Property(field,classDef.path,this));
			break;
		case 1:
			var params = $e[3], name = $e[2];
			this.getProperties().push(new reflect.Property(field,classDef.path,this));
			break;
		default:
			{
				Log.posInfo = { fileName : "ClassInfo.hx", lineNumber : 190, className : "reflect.ClassInfo", methodName : "scanFields"};
				if(Log.filter(LogLevel.WARN)) {
					Log.fetchInput("Unknown type:",Reflect.field(field,"type"),"in type:",Reflect.field(classDef,"path"),"found in:" + this.name,null,null);
					console.warn(Log.createMessage());
				}
			}
		}
	}
}
reflect.ClassInfo.prototype.__class__ = reflect.ClassInfo;
hsl.haxe.DirectSignaler = function(subject,rejectNullData) {
	if( subject === $_ ) return;
	if(null == subject) throw new haxe.exception.ArgumentNullException("subject",1);
	this.subject = subject;
	this.rejectNullData = rejectNullData;
	this.sentinel = new hsl.haxe._DirectSignaler.SentinelBond();
}
hsl.haxe.DirectSignaler.__name__ = ["hsl","haxe","DirectSignaler"];
hsl.haxe.DirectSignaler.prototype.bubblingTargets = null;
hsl.haxe.DirectSignaler.prototype.isListenedTo = null;
hsl.haxe.DirectSignaler.prototype.notificationTargets = null;
hsl.haxe.DirectSignaler.prototype.rejectNullData = null;
hsl.haxe.DirectSignaler.prototype.sentinel = null;
hsl.haxe.DirectSignaler.prototype.subject = null;
hsl.haxe.DirectSignaler.prototype.subjectClassNames = null;
hsl.haxe.DirectSignaler.prototype.addBubblingTarget = function(value) {
	if(null == this.bubblingTargets) this.bubblingTargets = new List();
	this.bubblingTargets.add(value);
}
hsl.haxe.DirectSignaler.prototype.addNotificationTarget = function(value) {
	if(null == this.notificationTargets) this.notificationTargets = new List();
	this.notificationTargets.add(value);
}
hsl.haxe.DirectSignaler.prototype.bind = function(listener) {
	if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
	return this.sentinel.add(new hsl.haxe._DirectSignaler.RegularBond(listener));
}
hsl.haxe.DirectSignaler.prototype.bindAdvanced = function(listener) {
	if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
	return this.sentinel.add(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
}
hsl.haxe.DirectSignaler.prototype.bindVoid = function(listener) {
	if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
	return this.sentinel.add(new hsl.haxe._DirectSignaler.NiladicBond(listener));
}
hsl.haxe.DirectSignaler.prototype.bubble = function(data,origin) {
	if(null != this.bubblingTargets) {
		var $it0 = this.bubblingTargets.iterator();
		while( $it0.hasNext() ) {
			var bubblingTarget = $it0.next();
			bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 109, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
		}
	}
	if(null != this.notificationTargets) {
		var $it1 = this.notificationTargets.iterator();
		while( $it1.hasNext() ) {
			var notificationTarget = $it1.next();
			notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 114, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
		}
	}
}
hsl.haxe.DirectSignaler.prototype.dispatch = function(data,origin,positionInformation) {
	if("dispatchNative" != positionInformation.methodName && "bubble" != positionInformation.methodName) this.verifyCaller(positionInformation);
	if(this.rejectNullData && null == data) throw new haxe.exception.Exception("Some data that was passed is null, but this signaler has been set to reject null data.",null,1);
	origin = null == origin?this.subject:origin;
	if(3 == this.sentinel.callListener(data,this.subject,origin,3)) {
		if(null != this.bubblingTargets) {
			var $it0 = this.bubblingTargets.iterator();
			while( $it0.hasNext() ) {
				var bubblingTarget = $it0.next();
				bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 109, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
			}
		}
		if(null != this.notificationTargets) {
			var $it1 = this.notificationTargets.iterator();
			while( $it1.hasNext() ) {
				var notificationTarget = $it1.next();
				notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 114, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
			}
		}
	}
}
hsl.haxe.DirectSignaler.prototype.getIsListenedTo = function() {
	return this.sentinel.getIsConnected();
}
hsl.haxe.DirectSignaler.prototype.getOrigin = function(origin) {
	return null == origin?this.subject:origin;
}
hsl.haxe.DirectSignaler.prototype.verifyCaller = function(positionInformation) {
	if(null == this.subjectClassNames) this.subjectClassNames = haxe.TypeTools.getClassNames(this.subject);
	var $it0 = this.subjectClassNames.iterator();
	while( $it0.hasNext() ) {
		var subjectClassName = $it0.next();
		if(subjectClassName == positionInformation.className) return;
	}
	throw new haxe.exception.Exception("This method may only be called by the subject of the signaler.",null,2);
}
hsl.haxe.DirectSignaler.prototype.removeBubblingTarget = function(value) {
	if(null != this.bubblingTargets) this.bubblingTargets.remove(value);
}
hsl.haxe.DirectSignaler.prototype.removeNotificationTarget = function(value) {
	if(null != this.notificationTargets) this.notificationTargets.remove(value);
}
hsl.haxe.DirectSignaler.prototype.unbind = function(listener) {
	this.sentinel.remove(new hsl.haxe._DirectSignaler.RegularBond(listener));
}
hsl.haxe.DirectSignaler.prototype.unbindAdvanced = function(listener) {
	this.sentinel.remove(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
}
hsl.haxe.DirectSignaler.prototype.unbindVoid = function(listener) {
	this.sentinel.remove(new hsl.haxe._DirectSignaler.NiladicBond(listener));
}
hsl.haxe.DirectSignaler.prototype.__class__ = hsl.haxe.DirectSignaler;
hsl.haxe.DirectSignaler.__interfaces__ = [hsl.haxe.Signaler];
if(!hsl.haxe._DirectSignaler) hsl.haxe._DirectSignaler = {}
hsl.haxe._DirectSignaler.LinkedBond = function(p) {
	if( p === $_ ) return;
	hsl.haxe.Bond.call(this);
	this.destroyed = false;
}
hsl.haxe._DirectSignaler.LinkedBond.__name__ = ["hsl","haxe","_DirectSignaler","LinkedBond"];
hsl.haxe._DirectSignaler.LinkedBond.__super__ = hsl.haxe.Bond;
for(var k in hsl.haxe.Bond.prototype ) hsl.haxe._DirectSignaler.LinkedBond.prototype[k] = hsl.haxe.Bond.prototype[k];
hsl.haxe._DirectSignaler.LinkedBond.prototype.destroyed = null;
hsl.haxe._DirectSignaler.LinkedBond.prototype.next = null;
hsl.haxe._DirectSignaler.LinkedBond.prototype.previous = null;
hsl.haxe._DirectSignaler.LinkedBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	return 0;
}
hsl.haxe._DirectSignaler.LinkedBond.prototype.determineEquals = function(value) {
	return false;
}
hsl.haxe._DirectSignaler.LinkedBond.prototype.destroy = function() {
	if(false == this.destroyed) {
		this.previous.next = this.next;
		this.next.previous = this.previous;
		this.destroyed = true;
	}
}
hsl.haxe._DirectSignaler.LinkedBond.prototype.unlink = function() {
	if(false == this.destroyed) {
		this.previous.next = this.next;
		this.next.previous = this.previous;
		this.destroyed = true;
	}
}
hsl.haxe._DirectSignaler.LinkedBond.prototype.__class__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.SentinelBond = function(p) {
	if( p === $_ ) return;
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.next = this.previous = this;
}
hsl.haxe._DirectSignaler.SentinelBond.__name__ = ["hsl","haxe","_DirectSignaler","SentinelBond"];
hsl.haxe._DirectSignaler.SentinelBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.SentinelBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.SentinelBond.prototype.isConnected = null;
hsl.haxe._DirectSignaler.SentinelBond.prototype.add = function(value) {
	value.next = this;
	value.previous = this.previous;
	return this.previous = this.previous.next = value;
}
hsl.haxe._DirectSignaler.SentinelBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	var node = this.next;
	while(node != this && 1 != propagationStatus) {
		propagationStatus = node.callListener(data,currentTarget,origin,propagationStatus);
		node = node.next;
	}
	return propagationStatus;
}
hsl.haxe._DirectSignaler.SentinelBond.prototype.getIsConnected = function() {
	return this.next != this;
}
hsl.haxe._DirectSignaler.SentinelBond.prototype.remove = function(value) {
	var node = this.next;
	while(node != this) {
		if(node.determineEquals(value)) {
			if(false == node.destroyed) {
				node.previous.next = node.next;
				node.next.previous = node.previous;
				node.destroyed = true;
			}
			break;
		}
		node = node.next;
	}
}
hsl.haxe._DirectSignaler.SentinelBond.prototype.__class__ = hsl.haxe._DirectSignaler.SentinelBond;
hsl.haxe._DirectSignaler.RegularBond = function(listener) {
	if( listener === $_ ) return;
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
}
hsl.haxe._DirectSignaler.RegularBond.__name__ = ["hsl","haxe","_DirectSignaler","RegularBond"];
hsl.haxe._DirectSignaler.RegularBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.RegularBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.RegularBond.prototype.listener = null;
hsl.haxe._DirectSignaler.RegularBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	if(false == this.halted) {
		this.listener(data);
		if(this.willDestroyOnUse) if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	return propagationStatus;
}
hsl.haxe._DirectSignaler.RegularBond.prototype.determineEquals = function(value) {
	return Std["is"](value,hsl.haxe._DirectSignaler.RegularBond) && Reflect.compareMethods(value.listener,this.listener);
}
hsl.haxe._DirectSignaler.RegularBond.prototype.__class__ = hsl.haxe._DirectSignaler.RegularBond;
hsl.haxe._DirectSignaler.NiladicBond = function(listener) {
	if( listener === $_ ) return;
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
}
hsl.haxe._DirectSignaler.NiladicBond.__name__ = ["hsl","haxe","_DirectSignaler","NiladicBond"];
hsl.haxe._DirectSignaler.NiladicBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.NiladicBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.NiladicBond.prototype.listener = null;
hsl.haxe._DirectSignaler.NiladicBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	if(false == this.halted) {
		this.listener();
		if(this.willDestroyOnUse) if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	return propagationStatus;
}
hsl.haxe._DirectSignaler.NiladicBond.prototype.determineEquals = function(value) {
	return Std["is"](value,hsl.haxe._DirectSignaler.NiladicBond) && Reflect.compareMethods(value.listener,this.listener);
}
hsl.haxe._DirectSignaler.NiladicBond.prototype.__class__ = hsl.haxe._DirectSignaler.NiladicBond;
hsl.haxe._DirectSignaler.AdvancedBond = function(listener) {
	if( listener === $_ ) return;
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
}
hsl.haxe._DirectSignaler.AdvancedBond.__name__ = ["hsl","haxe","_DirectSignaler","AdvancedBond"];
hsl.haxe._DirectSignaler.AdvancedBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.AdvancedBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.AdvancedBond.prototype.listener = null;
hsl.haxe._DirectSignaler.AdvancedBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	if(this.halted == false) {
		var signal = new hsl.haxe.Signal(data,this,currentTarget,origin);
		this.listener(signal);
		if(this.willDestroyOnUse) if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
		if(signal.immediatePropagationStopped) return 1; else if(signal.propagationStopped) return 2;
	}
	return propagationStatus;
}
hsl.haxe._DirectSignaler.AdvancedBond.prototype.determineEquals = function(value) {
	return Std["is"](value,hsl.haxe._DirectSignaler.AdvancedBond) && Reflect.compareMethods(value.listener,this.listener);
}
hsl.haxe._DirectSignaler.AdvancedBond.prototype.__class__ = hsl.haxe._DirectSignaler.AdvancedBond;
hsl.haxe._DirectSignaler.PropagationStatus = function() { }
hsl.haxe._DirectSignaler.PropagationStatus.__name__ = ["hsl","haxe","_DirectSignaler","PropagationStatus"];
hsl.haxe._DirectSignaler.PropagationStatus.prototype.__class__ = hsl.haxe._DirectSignaler.PropagationStatus;
bpmjs.SequencerTaskGroup = function(p) {
	if( p === $_ ) return;
	bpmjs.TaskGroup.call(this);
	this.getMonitor().name = "SequencerTaskGroup";
}
bpmjs.SequencerTaskGroup.__name__ = ["bpmjs","SequencerTaskGroup"];
bpmjs.SequencerTaskGroup.__super__ = bpmjs.TaskGroup;
for(var k in bpmjs.TaskGroup.prototype ) bpmjs.SequencerTaskGroup.prototype[k] = bpmjs.TaskGroup.prototype[k];
bpmjs.SequencerTaskGroup.prototype.__class__ = bpmjs.SequencerTaskGroup;
StringBuf = function(p) {
	if( p === $_ ) return;
	this.b = new Array();
}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x == null?"null":x;
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
kumite.time.Config = function(p) {
	if( p === $_ ) return;
	this.time = new kumite.time.Time();
	this.timeController = new kumite.time.TimeController();
}
kumite.time.Config.__name__ = ["kumite","time","Config"];
kumite.time.Config.prototype.time = null;
kumite.time.Config.prototype.timeController = null;
kumite.time.Config.prototype.__class__ = kumite.time.Config;
kumite.time.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.time.TimeController = function(p) {
}
kumite.time.TimeController.__name__ = ["kumite","time","TimeController"];
kumite.time.TimeController.prototype.time = null;
kumite.time.TimeController.prototype.messenger = null;
kumite.time.TimeController.prototype.startComplete = function() {
	this.time.reset();
	GLAnimationFrame.run($closure(this,"timerUpdate"));
}
kumite.time.TimeController.prototype.timerUpdate = function() {
	this.time.tick();
	this.messenger.send(new kumite.time.Tick());
}
kumite.time.TimeController.prototype.__class__ = kumite.time.TimeController;
kumite.time.TimeController.__interfaces__ = [haxe.rtti.Infos];
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = a.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = b.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
Lambda.prototype.__class__ = Lambda;
haxe.rtti.Meta = function() { }
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getType = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.obj == null?{ }:meta.obj;
}
haxe.rtti.Meta.getStatics = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.statics == null?{ }:meta.statics;
}
haxe.rtti.Meta.getFields = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.fields == null?{ }:meta.fields;
}
haxe.rtti.Meta.prototype.__class__ = haxe.rtti.Meta;
bpmjs.Messenger = function(p) {
	if( p === $_ ) return;
	this.receivers = new Array();
}
bpmjs.Messenger.__name__ = ["bpmjs","Messenger"];
bpmjs.Messenger.prototype.receivers = null;
bpmjs.Messenger.prototype.addReceiver = function(type,listener) {
	this.removeReceiver(type,listener);
	this.receivers.push(new bpmjs._Messenger.ReceiverForType(type,listener));
}
bpmjs.Messenger.prototype.removeReceiver = function(type,listener) {
	var _g = 0, _g1 = this.receivers;
	while(_g < _g1.length) {
		var receiver = _g1[_g];
		++_g;
		if(receiver.type == type && Reflect.compareMethods(listener,receiver.method)) {
			this.receivers.remove(receiver);
			return;
		}
	}
}
bpmjs.Messenger.prototype.send = function(message) {
	var _g = 0, _g1 = this.receivers;
	while(_g < _g1.length) {
		var receiver = _g1[_g];
		++_g;
		if(receiver.type == null || receiver.type == Type.getClass(message)) receiver.method(message);
	}
}
bpmjs.Messenger.prototype.toString = function() {
	return Type.getClassName(Type.getClass(this));
}
bpmjs.Messenger.prototype.__class__ = bpmjs.Messenger;
if(!bpmjs._Messenger) bpmjs._Messenger = {}
bpmjs._Messenger.ReceiverForType = function(type,method) {
	if( type === $_ ) return;
	this.type = type;
	this.method = method;
}
bpmjs._Messenger.ReceiverForType.__name__ = ["bpmjs","_Messenger","ReceiverForType"];
bpmjs._Messenger.ReceiverForType.prototype.type = null;
bpmjs._Messenger.ReceiverForType.prototype.method = null;
bpmjs._Messenger.ReceiverForType.prototype.__class__ = bpmjs._Messenger.ReceiverForType;
bpmjs.ContextBuilder = function(p) {
	if( p === $_ ) return;
	this.context = new bpmjs.Context();
}
bpmjs.ContextBuilder.__name__ = ["bpmjs","ContextBuilder"];
bpmjs.ContextBuilder.defaultContext = null;
bpmjs.ContextBuilder.build = function(configClass,contextConfig) {
	return bpmjs.ContextBuilder.buildAll([configClass],contextConfig);
}
bpmjs.ContextBuilder.buildAll = function(configClasses,contextConfig) {
	var builder = new bpmjs.ContextBuilder();
	bpmjs.ContextBuilder.defaultContext = builder.context;
	builder.contextConfig = contextConfig == null?bpmjs.ContextBuilder.createDefaultContextConfig():contextConfig;
	builder.buildInternal(configClasses);
	return bpmjs.ContextBuilder.defaultContext;
}
bpmjs.ContextBuilder.configure = function(object) {
	var builder = new bpmjs.ContextBuilder();
	if(bpmjs.ContextBuilder.defaultContext == null) throw builder.createError("Cannot configure Object as no context is available!");
	builder.contextConfig = bpmjs.ContextBuilder.defaultContext.contextConfig;
	builder.context = bpmjs.ContextBuilder.defaultContext;
	builder.configureInternal(object);
}
bpmjs.ContextBuilder.createDefaultContextConfig = function() {
	var defaultContextConfig = new bpmjs.ContextConfig();
	defaultContextConfig.frontMessenger = new bpmjs.DefaultFrontMessenger();
	return defaultContextConfig;
}
bpmjs.ContextBuilder.prototype.context = null;
bpmjs.ContextBuilder.prototype.contextConfig = null;
bpmjs.ContextBuilder.prototype.configureInternal = function(object) {
	var contextObject = this.context.addObject("configured",reflect.ClassInfo.forInstance(object),object);
	this.configureDynamicObjects([contextObject]);
}
bpmjs.ContextBuilder.prototype.buildInternal = function(configClasses) {
	this.context.contextConfig = this.contextConfig;
	Lambda.iter(configClasses,$closure(this,"createObjects"));
	this.configureDynamicObjects(this.context.objects);
}
bpmjs.ContextBuilder.prototype.createObjects = function(configClass) {
	var config = Type.createInstance(configClass,[]);
	var ci = reflect.ClassInfo.forClass(configClass);
	if(!ci.hasRtti) {
		var message = "Config class:" + ci.name + "has no rtti extension - use 'implement haxe.rtti.Infos'";
		throw message;
	}
	this.context.addObject("config",ci,config);
	var _g = 0, _g1 = ci.getProperties();
	while(_g < _g1.length) {
		var property = _g1[_g];
		++_g;
		try {
			if(property.hasMetadata("Inject")) continue;
			var instance = Reflect.field(config,property.field.name);
			if(instance == null) throw "Found property " + property.field.name + " in config " + ci.name + " but was null "; else {
				this.context.addObject(property.field.name,reflect.ClassInfo.forCType(property.field.type),instance);
				if(property.getClass() == Array) {
					var list = instance;
					var _g2 = 0;
					while(_g2 < list.length) {
						var listInstance = list[_g2];
						++_g2;
						this.context.addObject("dynamic",reflect.ClassInfo.forInstance(listInstance),listInstance);
					}
				}
			}
		} catch( e ) {
			{
				Log.posInfo = { fileName : "ContextBuilder.hx", lineNumber : 112, className : "bpmjs.ContextBuilder", methodName : "createObjects"};
				if(Log.filter(LogLevel.WARN)) {
					Log.fetchInput(e,null,null,null,null,null,null);
					console.warn(Log.createMessage());
				}
			}
		}
	}
}
bpmjs.ContextBuilder.prototype.configureDynamicObjects = function(objects) {
	Lambda.iter(objects,$closure(this,"wireContextObject"));
	Lambda.iter(objects,$closure(this,"findObservers"));
	Lambda.iter(objects,$closure(this,"registerMessengerByObjectType"));
	Lambda.iter(objects,$closure(this,"registerMessengers"));
	Lambda.iter(objects,$closure(this,"registerReceivers"));
	Lambda.iter(objects,$closure(this,"doObserve"));
	Lambda.iter(objects,$closure(this,"doCompleteCall"));
	Lambda.iter(objects,$closure(this,"doPostCompleteCall"));
}
bpmjs.ContextBuilder.prototype.wireContextObject = function(contextObject) {
	if(!contextObject.classInfo.hasRtti) {
		Log.posInfo = { fileName : "ContextBuilder.hx", lineNumber : 134, className : "bpmjs.ContextBuilder", methodName : "wireContextObject"};
		if(Log.filter(LogLevel.WARN)) {
			Log.fetchInput("No RTTI for: ",contextObject.name,contextObject.classInfo.name,null,null,null,null);
			console.warn(Log.createMessage());
		}
	}
	var _g = 0, _g1 = contextObject.classInfo.getProperties();
	while(_g < _g1.length) {
		var property = _g1[_g];
		++_g;
		if(property.hasMetadata("Inject")) {
			if(property.getClass() == bpmjs.Context) contextObject.object[property.field.name] = this.context; else {
				var objects = this.context.getDynamicObjectsByType(property.getClass());
				if(objects.length == 0) {
					Log.posInfo = { fileName : "ContextBuilder.hx", lineNumber : 148, className : "bpmjs.ContextBuilder", methodName : "wireContextObject"};
					if(Log.filter(LogLevel.WARN)) {
						Log.fetchInput("Found [Inject] at object " + Type.getClassName(contextObject.type) + "#" + property.field.name + " but could not find object to inject.",null,null,null,null,null,null);
						console.warn(Log.createMessage());
					}
				} else if(objects.length == 1) contextObject.object[property.field.name] = objects.first().object; else {
					var found = false;
					var $it0 = objects.iterator();
					while( $it0.hasNext() ) {
						var object = $it0.next();
						if(object.name == property.field.name) {
							contextObject.object[property.field.name] = object.object;
							found = true;
							break;
						}
					}
					if(!found && Reflect.field(contextObject.object,property.field.name) == null) {
						{
							Log.posInfo = { fileName : "ContextBuilder.hx", lineNumber : 169, className : "bpmjs.ContextBuilder", methodName : "wireContextObject"};
							if(Log.filter(LogLevel.INFO)) {
								Log.fetchInput("value: " + Reflect.field(contextObject.object,property.field.name),null,null,null,null,null,null);
								console.info(Log.createMessage());
							}
						}
						throw "Multiple selection for type: " + reflect.ClassInfo.forCType(property.field.type).name + " and no name match for: " + property.field.name + " in " + contextObject.classInfo.name;
					}
				}
			}
		}
	}
}
bpmjs.ContextBuilder.prototype.findObservers = function(contextObject) {
	var _g = 0, _g1 = contextObject.classInfo.getMethods();
	while(_g < _g1.length) {
		var method = _g1[_g];
		++_g;
		if(method.hasMetadata("Observe")) {
			if(method.getParameters().length == 1) this.context.addObserver(contextObject,method.field.name,reflect.ClassInfo.forCType(method.getParameters()[0].def.t)); else throw "Method to observe: " + contextObject.classInfo.name + "." + method.field.name + " needs exactly one parameter";
		}
	}
}
bpmjs.ContextBuilder.prototype.registerMessengerByObjectType = function(contextObject) {
	if(Std["is"](contextObject.object,bpmjs.Messenger)) this.contextConfig.frontMessenger.addMessenger(contextObject.object);
}
bpmjs.ContextBuilder.prototype.registerMessengers = function(contextObject) {
	var _g = 0, _g1 = contextObject.classInfo.getProperties();
	while(_g < _g1.length) {
		var property = _g1[_g];
		++_g;
		if(property.hasMetadata("Messenger")) {
			var messenger = new bpmjs.Messenger();
			contextObject.object[property.field.name] = messenger;
			this.contextConfig.frontMessenger.addMessenger(messenger);
		}
	}
}
bpmjs.ContextBuilder.prototype.registerReceivers = function(contextObject) {
	var _g = 0, _g1 = contextObject.classInfo.getMethods();
	while(_g < _g1.length) {
		var method = _g1[_g];
		++_g;
		if(method.hasMetadata("Message")) {
			if(method.getParameters().length == 1) this.contextConfig.frontMessenger.addReceiver(contextObject.object,method.field.name,reflect.ClassInfo.forCType(method.getParameters()[0].def.t).type); else throw "Message: " + contextObject.classInfo.name + "." + method.field.name + " needs exactly one parameter";
		}
	}
}
bpmjs.ContextBuilder.prototype.doObserve = function(contextObject) {
	var _g = 0, _g1 = this.context.observers;
	while(_g < _g1.length) {
		var observer = _g1[_g];
		++_g;
		observer.observe(contextObject);
	}
}
bpmjs.ContextBuilder.prototype.doCompleteCall = function(contextObject) {
	bpmjs.ReflectUtil.callMethodWithMetadata(contextObject.object,contextObject.type,"Complete",[]);
}
bpmjs.ContextBuilder.prototype.doPostCompleteCall = function(contextObject) {
	bpmjs.ReflectUtil.callMethodWithMetadata(contextObject.object,contextObject.type,"PostComplete",[]);
}
bpmjs.ContextBuilder.prototype.createError = function(message) {
	return "ContextBuilder ERROR: " + message;
}
bpmjs.ContextBuilder.prototype.__class__ = bpmjs.ContextBuilder;
Log = function() { }
Log.__name__ = ["Log"];
Log.posInfo = null;
Log.errorDiv = null;
Log["debugger"] = function() {
	debugger;
}
Log.profile = function(title) {
	console.profile(title);
}
Log.profileEnd = function() {
	console.profileEnd();
}
Log.init = function() {
	if(!window.console) console = { };
	console.log = console.log || function() {
	};
	console.info = console.info || function() {
	};
	console.warn = console.warn || function() {
	};
	console.error = console.error || function() {
	};
	haxe.Log.trace = Log.infoConsole;
}
Log.addFilter = function(filter) {
	Log.filters.push(filter);
}
Log.info = function(m0,m1,m2,m3,m4,m5,m6,i) {
	Log.posInfo = i;
	if(Log.filter(LogLevel.INFO)) {
		Log.fetchInput(m0,m1,m2,m3,m4,m5,m6);
		console.info(Log.createMessage());
	}
}
Log.warn = function(m0,m1,m2,m3,m4,m5,m6,i) {
	Log.posInfo = i;
	if(Log.filter(LogLevel.WARN)) {
		Log.fetchInput(m0,m1,m2,m3,m4,m5,m6);
		console.warn(Log.createMessage());
	}
}
Log.error = function(m0,m1,m2,m3,m4,m5,m6,i) {
	Log.posInfo = i;
	if(Log.filter(LogLevel.ERROR)) {
		Log.fetchInput(m0,m1,m2,m3,m4,m5,m6);
		console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
		Log.displayError(Log.createErrorMessage());
	}
}
Log.infoEnabled = function(i) {
	Log.posInfo = i;
	return Log.filter(LogLevel.INFO);
}
Log.warnEnabled = function(i) {
	Log.posInfo = i;
	return Log.filter(LogLevel.WARN);
}
Log.errorEnabled = function(i) {
	Log.posInfo = i;
	return Log.filter(LogLevel.ERROR);
}
Log.groupCollapsed = function(m0,m1,m2,m3,m4,m5,m6,i) {
	if(Log.infoEnabled(i)) {
		Log.fetchInput(m0,m1,m2,m3,m4,m5,m6);
		console.groupCollapsed(Log.createMessage());
	}
}
Log.groupEnd = function(i) {
	if(Log.infoEnabled(i)) console.groupEnd();
}
Log.fetchInput = function(m0,m1,m2,m3,m4,m5,m6) {
	Log.args = new Array();
	if(m0 != null) Log.args.push(m0);
	if(m1 != null) Log.args.push(m1);
	if(m2 != null) Log.args.push(m2);
	if(m3 != null) Log.args.push(m3);
	if(m4 != null) Log.args.push(m4);
	if(m5 != null) Log.args.push(m5);
	if(m6 != null) Log.args.push(m6);
}
Log.createMessage = function() {
	if(Log.posInfo == null) return Log.args.join(" ");
	var from = Log.posInfo.className + "." + Log.posInfo.methodName;
	return "[" + from + "] " + Log.args.join(" ");
}
Log.createErrorMessage = function() {
	if(Log.posInfo == null) return Log.args.join(" ");
	var from = Log.posInfo.className + "." + Log.posInfo.methodName;
	return "[" + from + "]\n" + Log.args.join(" ");
}
Log.filter = function(level) {
	if(Log.posInfo == null) return true;
	var result = true;
	var _g = 0, _g1 = Log.filters;
	while(_g < _g1.length) {
		var filter = _g1[_g];
		++_g;
		result = filter.enabled(result,Log.posInfo,level);
	}
	return result;
}
Log.infoConsole = function(v,i) {
	Log.posInfo = i;
	Log.fetchInput(v);
	console.log("" + Log.createMessage() + " (trace)");
}
Log.displayError = function(message) {
	if($closure(js.Lib.document,"createElement") == null) return;
	if(Log.errorDiv == null) {
		Log.errorDiv = js.Lib.document.createElement("div");
		Log.errorDiv.className = "Error";
		js.Lib.document.body.appendChild(Log.errorDiv);
		Log.errorDiv.innerHTML = "<h1>Ups!</h1>I could not start!\nPlease use up-to-date hardware and an up-to-date browser for this experience.\n\n\nTechnical Details:\n";
	}
	if(!Lambda.has(Log.errors,message)) {
		Log.errors.push(message);
		Log.errorDiv.innerHTML += message + "\n";
	}
}
Log.prototype.errorFilter = function() {
}
Log.prototype.__class__ = Log;
bpmjs.ProgressMonitor = function(p) {
	if( p === $_ ) return;
	this.name = "";
	this.reset();
}
bpmjs.ProgressMonitor.__name__ = ["bpmjs","ProgressMonitor"];
bpmjs.ProgressMonitor.prototype.name = null;
bpmjs.ProgressMonitor.prototype.weight = null;
bpmjs.ProgressMonitor.prototype.current = null;
bpmjs.ProgressMonitor.prototype.children = null;
bpmjs.ProgressMonitor.prototype.reset = function() {
	this.children = new Array();
	this.setCurrent(0);
	this.weight = 1;
}
bpmjs.ProgressMonitor.prototype.append = function(monitor,total) {
	var monitorAndTotal = new bpmjs._ProgressMonitor.MonitorAndTotal();
	monitorAndTotal.total = total;
	monitorAndTotal.monitor = monitor;
	this.children.push(monitorAndTotal);
	return monitor;
}
bpmjs.ProgressMonitor.prototype.done = function() {
	this.setCurrent(1);
}
bpmjs.ProgressMonitor.prototype.getCurrent = function() {
	if(this.children.length == 0) return this.current; else {
		var totalWeight = 0.0;
		var _g = 0, _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			totalWeight += child.monitor.weight;
		}
		var childCurrent = 0.0;
		var _g = 0, _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			childCurrent += Map.linear(child.monitor.getCurrent(),0,1,0,child.monitor.weight / totalWeight);
		}
		return childCurrent;
	}
}
bpmjs.ProgressMonitor.prototype.setCurrent = function(value) {
	this.current = value;
	return value;
}
bpmjs.ProgressMonitor.prototype.__class__ = bpmjs.ProgressMonitor;
if(!bpmjs._ProgressMonitor) bpmjs._ProgressMonitor = {}
bpmjs._ProgressMonitor.MonitorAndTotal = function(p) {
}
bpmjs._ProgressMonitor.MonitorAndTotal.__name__ = ["bpmjs","_ProgressMonitor","MonitorAndTotal"];
bpmjs._ProgressMonitor.MonitorAndTotal.prototype.total = null;
bpmjs._ProgressMonitor.MonitorAndTotal.prototype.monitor = null;
bpmjs._ProgressMonitor.MonitorAndTotal.prototype.__class__ = bpmjs._ProgressMonitor.MonitorAndTotal;
reflect.Property = function(field,definedInClass,owner) {
	if( field === $_ ) return;
	reflect.Field.call(this,field,definedInClass,owner);
}
reflect.Property.__name__ = ["reflect","Property"];
reflect.Property.__super__ = reflect.Field;
for(var k in reflect.Field.prototype ) reflect.Property.prototype[k] = reflect.Field.prototype[k];
reflect.Property.prototype.getValue = function(instance) {
	return Reflect.field(instance,this.field.name);
}
reflect.Property.prototype.setValue = function(instance,value) {
	instance[this.field.name] = value;
}
reflect.Property.prototype.__class__ = reflect.Property;
GLTween = function(o,ms,params) {
	if( o === $_ ) return;
	this.o = o;
	this.ms = ms;
	this.params = params;
	this.isActive = true;
	this.properties = new Array();
	this.completeSignaler = new hsl.haxe.DirectSignaler(this);
}
GLTween.__name__ = ["GLTween"];
GLTween.to = function(o,ms,params) {
	var result = new GLTween(o,ms,params);
	GLTweenManager.getInstance().add(result);
	return result;
}
GLTween.prototype.isActive = null;
GLTween.prototype.startTime = null;
GLTween.prototype.o = null;
GLTween.prototype.ms = null;
GLTween.prototype.params = null;
GLTween.prototype.properties = null;
GLTween.prototype.easeFunction = null;
GLTween.prototype.completeSignaler = null;
GLTween.prototype.complete = function(method) {
	this.completeSignaler.bind(method);
	return this;
}
GLTween.prototype.init = function(time) {
	this.startTime = time;
	this.easeFunction = ease.Quad.easeInOut;
	var fields = Reflect.fields(this.params);
	var _g = 0;
	while(_g < fields.length) {
		var field = fields[_g];
		++_g;
		if(Reflect.hasField(this.o,field)) {
			var property = new Property();
			property.from = Std.parseFloat(Reflect.field(this.o,field));
			property.to = Std.parseFloat(Reflect.field(this.params,field));
			property.field = field;
			this.properties.push(property);
		} else {
			Log.posInfo = { fileName : "GLTween.hx", lineNumber : 56, className : "GLTween", methodName : "init"};
			if(Log.filter(LogLevel.WARN)) {
				Log.fetchInput("Unkown field: " + field,null,null,null,null,null,null);
				console.warn(Log.createMessage());
			}
		}
	}
}
GLTween.prototype.run = function(time) {
	var dt = time - this.startTime;
	if(dt > this.ms) {
		dt = this.ms;
		if(this.isActive) {
			this.completeSignaler.dispatch(this,null,{ fileName : "GLTween.hx", lineNumber : 69, className : "GLTween", methodName : "run"});
			this.isActive = false;
		}
	}
	var _g = 0, _g1 = this.properties;
	while(_g < _g1.length) {
		var property = _g1[_g];
		++_g;
		property.ease(this,dt);
	}
}
GLTween.prototype.__class__ = GLTween;
Property = function(p) {
}
Property.__name__ = ["Property"];
Property.prototype.from = null;
Property.prototype.to = null;
Property.prototype.field = null;
Property.prototype.ease = function(tween,dt) {
	var o = tween.o;
	var value = tween.easeFunction(dt,this.from,this.to - this.from,tween.ms);
	o[this.field] = value;
}
Property.prototype.__class__ = Property;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
Math2 = function() { }
Math2.__name__ = ["Math2"];
Math2.nextPowerOf2 = function(value) {
	var val = Std["int"](value);
	val--;
	val = val >> 1 | val;
	val = val >> 2 | val;
	val = val >> 4 | val;
	val = val >> 8 | val;
	val = val >> 16 | val;
	val++;
	return val;
}
Math2.signum = function(value) {
	if(value > 0) return 1; else if(value < 0) return -1;
	return 0;
}
Math2.sin1 = function(rad1) {
	return Math.sin(rad1 * Math.PI * 2) * 0.5 + 0.5;
}
Math2.prototype.__class__ = Math2;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
reflect.Method = function(field,args,ret,definedInClass,owner) {
	if( field === $_ ) return;
	reflect.Field.call(this,field,definedInClass,owner);
	this.args = args;
	this.ret = ret;
}
reflect.Method.__name__ = ["reflect","Method"];
reflect.Method.__super__ = reflect.Field;
for(var k in reflect.Field.prototype ) reflect.Method.prototype[k] = reflect.Field.prototype[k];
reflect.Method.prototype.parameters = null;
reflect.Method.prototype.args = null;
reflect.Method.prototype.ret = null;
reflect.Method.prototype.getParameters = function() {
	if(this.parameters != null) return this.parameters;
	this.parameters = new Array();
	var $it0 = this.args.iterator();
	while( $it0.hasNext() ) {
		var arg = $it0.next();
		var parameter = new reflect.Parameter(arg);
		this.parameters.push(parameter);
	}
	return this.parameters;
}
reflect.Method.prototype.call = function(instance,params) {
	Reflect.field(instance,this.field.name).apply(instance,params);
}
reflect.Method.prototype.__class__ = reflect.Method;
haxe.TypeTools = function() { }
haxe.TypeTools.__name__ = ["haxe","TypeTools"];
haxe.TypeTools.getClassNames = function(value) {
	var result = new List();
	var valueClass = Std["is"](value,Class)?value:Type.getClass(value);
	while(null != valueClass) {
		result.add(Type.getClassName(valueClass));
		valueClass = Type.getSuperClass(valueClass);
	}
	return result;
}
haxe.TypeTools.prototype.__class__ = haxe.TypeTools;
GLTweenManager = function(p) {
	if( p === $_ ) return;
	this.time = Date.now().getTime();
	this.tweens = new Array();
	GLAnimationFrame.run($closure(this,"tick"));
}
GLTweenManager.__name__ = ["GLTweenManager"];
GLTweenManager.instance = null;
GLTweenManager.getInstance = function() {
	if(GLTweenManager.instance == null) GLTweenManager.instance = new GLTweenManager();
	return GLTweenManager.instance;
}
GLTweenManager.prototype.tweens = null;
GLTweenManager.prototype.time = null;
GLTweenManager.prototype.add = function(tween) {
	tween.init(this.time);
	this.tweens.push(tween);
}
GLTweenManager.prototype.tick = function() {
	this.time = Date.now().getTime();
	var _g = 0, _g1 = this.tweens;
	while(_g < _g1.length) {
		var tween = _g1[_g];
		++_g;
		tween.run(this.time);
		if(!tween.isActive) this.tweens.remove(tween);
	}
}
GLTweenManager.prototype.__class__ = GLTweenManager;
CanvasGraphic = function(p) {
	if( p === $_ ) return;
	this.canvas = js.Lib.document.createElement("canvas");
	this.context = this.canvas.getContext("2d");
	this.usePow2Size = true;
	this.setWidth(0);
	this.setHeight(0);
}
CanvasGraphic.__name__ = ["CanvasGraphic"];
CanvasGraphic.prototype.width = null;
CanvasGraphic.prototype.height = null;
CanvasGraphic.prototype.fillStyle = null;
CanvasGraphic.prototype.font = null;
CanvasGraphic.prototype.isInvalid = null;
CanvasGraphic.prototype.canvas = null;
CanvasGraphic.prototype.context = null;
CanvasGraphic.prototype.usePow2Size = null;
CanvasGraphic.prototype.clear = function(color) {
	if(this.usePow2Size) {
		this.canvas.width = Math2.nextPowerOf2(this.width);
		this.canvas.height = Math2.nextPowerOf2(this.height);
	} else {
		this.canvas.width = Std["int"](this.width);
		this.canvas.height = Std["int"](this.height);
	}
	this.context.fillStyle = color == null?"rgba(0, 0, 0, 0)":color.toContextRGBA();
	this.context.fillRect(0,0,this.width,this.height);
	this.isInvalid = true;
}
CanvasGraphic.prototype.fillRect = function(x,y,width,height) {
	this.context.fillRect(x,y,width,height);
	this.isInvalid = true;
}
CanvasGraphic.prototype.fillText = function(text,x,y,maxWidth) {
	if(text == null) text = "null";
	this.context.fillText(text,x,y);
	this.isInvalid = true;
}
CanvasGraphic.prototype.drawImage = function(image,dx,dy,dw,dh) {
	this.context.drawImage(image,dx,dy,dw,dh);
}
CanvasGraphic.prototype.drawImage2 = function(image,dx,dy) {
	this.context.drawImage(image,dx,dy);
}
CanvasGraphic.prototype.setFont = function(value) {
	this.context.font = value;
	return value;
}
CanvasGraphic.prototype.setFillStyle = function(value) {
	if(Std["is"](value,Color)) this.context.fillStyle = ((function($this) {
		var $r;
		var $t = value;
		if(Std["is"]($t,Color)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this))).toContextRGBA();
	return value;
}
CanvasGraphic.prototype.setWidth = function(width) {
	if(this.width == width) return width;
	this.width = width;
	this.clear();
	return width;
}
CanvasGraphic.prototype.setHeight = function(height) {
	if(this.height == height) return height;
	this.height = height;
	this.clear();
	return height;
}
CanvasGraphic.prototype.__class__ = CanvasGraphic;
Main = function(canvas) {
	if( canvas === $_ ) return;
	try {
		var context = bpmjs.ContextBuilder.buildAll([kumite.launch.Config,kumite.stage.Config,kumite.time.Config,kumite.presentation.PresentationConfig]);
	} catch( e ) {
		{
			Log.posInfo = { fileName : "Main.hx", lineNumber : 65, className : "Main", methodName : "new"};
			if(Log.filter(LogLevel.ERROR)) {
				Log.fetchInput("Error building application!\n" + e,null,null,null,null,null,null);
				console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
				Log.displayError(Log.createErrorMessage());
			}
		}
	}
}
Main.__name__ = ["Main"];
Main.globalErrorHandler = function(msg,stack) {
	haxe.Log.trace("Uncaugt error: " + msg,{ fileName : "Main.hx", lineNumber : 5, className : "Main", methodName : "globalErrorHandler"});
	var _g = 0;
	while(_g < stack.length) {
		var line = stack[_g];
		++_g;
		haxe.Log.trace(line,{ fileName : "Main.hx", lineNumber : 7, className : "Main", methodName : "globalErrorHandler"});
	}
	return true;
}
Main.main = function() {
	Log.init();
	Log.addFilter(new ERegFilter(LogLevel.INFO,new EReg(".*","")));
	Log.addFilter(new ERegFilter(LogLevel.WARN,new EReg(".*FrontMessenger\\.handleMessage.*","")));
	Log.addFilter(new ERegFilter(LogLevel.WARN,new EReg(".*FrontMessenger\\.Receiver\\.execute.*","")));
	Log.addFilter(new ERegFilter(LogLevel.WARN,new EReg(".*initAllLayers.*","")));
	js.Lib.setErrorHandler(Main.globalErrorHandler);
}
Main.prototype.__class__ = Main;
reflect.Parameter = function(def) {
	if( def === $_ ) return;
	this.def = def;
}
reflect.Parameter.__name__ = ["reflect","Parameter"];
reflect.Parameter.prototype.type = null;
reflect.Parameter.prototype.def = null;
reflect.Parameter.prototype.getType = function() {
	return reflect.ClassInfo.forCType(this.def.t);
}
reflect.Parameter.prototype.__class__ = reflect.Parameter;
haxe.rtti.CType = { __ename__ : ["haxe","rtti","CType"], __constructs__ : ["CUnknown","CEnum","CClass","CTypedef","CFunction","CAnonymous","CDynamic"] }
haxe.rtti.CType.CUnknown = ["CUnknown",0];
haxe.rtti.CType.CUnknown.toString = $estr;
haxe.rtti.CType.CUnknown.__enum__ = haxe.rtti.CType;
haxe.rtti.CType.CEnum = function(name,params) { var $x = ["CEnum",1,name,params]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CClass = function(name,params) { var $x = ["CClass",2,name,params]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CTypedef = function(name,params) { var $x = ["CTypedef",3,name,params]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CFunction = function(args,ret) { var $x = ["CFunction",4,args,ret]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CAnonymous = function(fields) { var $x = ["CAnonymous",5,fields]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CDynamic = function(t) { var $x = ["CDynamic",6,t]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.Rights = { __ename__ : ["haxe","rtti","Rights"], __constructs__ : ["RNormal","RNo","RCall","RMethod","RDynamic","RInline"] }
haxe.rtti.Rights.RNormal = ["RNormal",0];
haxe.rtti.Rights.RNormal.toString = $estr;
haxe.rtti.Rights.RNormal.__enum__ = haxe.rtti.Rights;
haxe.rtti.Rights.RNo = ["RNo",1];
haxe.rtti.Rights.RNo.toString = $estr;
haxe.rtti.Rights.RNo.__enum__ = haxe.rtti.Rights;
haxe.rtti.Rights.RCall = function(m) { var $x = ["RCall",2,m]; $x.__enum__ = haxe.rtti.Rights; $x.toString = $estr; return $x; }
haxe.rtti.Rights.RMethod = ["RMethod",3];
haxe.rtti.Rights.RMethod.toString = $estr;
haxe.rtti.Rights.RMethod.__enum__ = haxe.rtti.Rights;
haxe.rtti.Rights.RDynamic = ["RDynamic",4];
haxe.rtti.Rights.RDynamic.toString = $estr;
haxe.rtti.Rights.RDynamic.__enum__ = haxe.rtti.Rights;
haxe.rtti.Rights.RInline = ["RInline",5];
haxe.rtti.Rights.RInline.toString = $estr;
haxe.rtti.Rights.RInline.__enum__ = haxe.rtti.Rights;
haxe.rtti.TypeTree = { __ename__ : ["haxe","rtti","TypeTree"], __constructs__ : ["TPackage","TClassdecl","TEnumdecl","TTypedecl"] }
haxe.rtti.TypeTree.TPackage = function(name,full,subs) { var $x = ["TPackage",0,name,full,subs]; $x.__enum__ = haxe.rtti.TypeTree; $x.toString = $estr; return $x; }
haxe.rtti.TypeTree.TClassdecl = function(c) { var $x = ["TClassdecl",1,c]; $x.__enum__ = haxe.rtti.TypeTree; $x.toString = $estr; return $x; }
haxe.rtti.TypeTree.TEnumdecl = function(e) { var $x = ["TEnumdecl",2,e]; $x.__enum__ = haxe.rtti.TypeTree; $x.toString = $estr; return $x; }
haxe.rtti.TypeTree.TTypedecl = function(t) { var $x = ["TTypedecl",3,t]; $x.__enum__ = haxe.rtti.TypeTree; $x.toString = $estr; return $x; }
haxe.rtti.TypeApi = function() { }
haxe.rtti.TypeApi.__name__ = ["haxe","rtti","TypeApi"];
haxe.rtti.TypeApi.typeInfos = function(t) {
	var inf;
	var $e = (t);
	switch( $e[1] ) {
	case 1:
		var c = $e[2];
		inf = c;
		break;
	case 2:
		var e = $e[2];
		inf = e;
		break;
	case 3:
		var t1 = $e[2];
		inf = t1;
		break;
	case 0:
		throw "Unexpected Package";
		break;
	}
	return inf;
}
haxe.rtti.TypeApi.isVar = function(t) {
	return (function($this) {
		var $r;
		switch( (t)[1] ) {
		case 4:
			$r = false;
			break;
		default:
			$r = true;
		}
		return $r;
	}(this));
}
haxe.rtti.TypeApi.leq = function(f,l1,l2) {
	var it = l2.iterator();
	var $it0 = l1.iterator();
	while( $it0.hasNext() ) {
		var e1 = $it0.next();
		if(!it.hasNext()) return false;
		var e2 = it.next();
		if(!f(e1,e2)) return false;
	}
	if(it.hasNext()) return false;
	return true;
}
haxe.rtti.TypeApi.rightsEq = function(r1,r2) {
	if(r1 == r2) return true;
	var $e = (r1);
	switch( $e[1] ) {
	case 2:
		var m1 = $e[2];
		var $e = (r2);
		switch( $e[1] ) {
		case 2:
			var m2 = $e[2];
			return m1 == m2;
		default:
		}
		break;
	default:
	}
	return false;
}
haxe.rtti.TypeApi.typeEq = function(t1,t2) {
	var $e = (t1);
	switch( $e[1] ) {
	case 0:
		return t2 == haxe.rtti.CType.CUnknown;
	case 1:
		var params = $e[3], name = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 1:
			var params2 = $e[3], name2 = $e[2];
			return name == name2 && haxe.rtti.TypeApi.leq(haxe.rtti.TypeApi.typeEq,params,params2);
		default:
		}
		break;
	case 2:
		var params = $e[3], name = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 2:
			var params2 = $e[3], name2 = $e[2];
			return name == name2 && haxe.rtti.TypeApi.leq(haxe.rtti.TypeApi.typeEq,params,params2);
		default:
		}
		break;
	case 3:
		var params = $e[3], name = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 3:
			var params2 = $e[3], name2 = $e[2];
			return name == name2 && haxe.rtti.TypeApi.leq(haxe.rtti.TypeApi.typeEq,params,params2);
		default:
		}
		break;
	case 4:
		var ret = $e[3], args = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 4:
			var ret2 = $e[3], args2 = $e[2];
			return haxe.rtti.TypeApi.leq(function(a,b) {
				return a.name == b.name && a.opt == b.opt && haxe.rtti.TypeApi.typeEq(a.t,b.t);
			},args,args2) && haxe.rtti.TypeApi.typeEq(ret,ret2);
		default:
		}
		break;
	case 5:
		var fields = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 5:
			var fields2 = $e[2];
			return haxe.rtti.TypeApi.leq(function(a,b) {
				return a.name == b.name && haxe.rtti.TypeApi.typeEq(a.t,b.t);
			},fields,fields2);
		default:
		}
		break;
	case 6:
		var t = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 6:
			var t21 = $e[2];
			if(t == null != (t21 == null)) return false;
			return t == null || haxe.rtti.TypeApi.typeEq(t,t21);
		default:
		}
		break;
	}
	return false;
}
haxe.rtti.TypeApi.fieldEq = function(f1,f2) {
	if(f1.name != f2.name) return false;
	if(!haxe.rtti.TypeApi.typeEq(f1.type,f2.type)) return false;
	if(f1.isPublic != f2.isPublic) return false;
	if(f1.doc != f2.doc) return false;
	if(!haxe.rtti.TypeApi.rightsEq(f1.get,f2.get)) return false;
	if(!haxe.rtti.TypeApi.rightsEq(f1.set,f2.set)) return false;
	if(f1.params == null != (f2.params == null)) return false;
	if(f1.params != null && f1.params.join(":") != f2.params.join(":")) return false;
	return true;
}
haxe.rtti.TypeApi.constructorEq = function(c1,c2) {
	if(c1.name != c2.name) return false;
	if(c1.doc != c2.doc) return false;
	if(c1.args == null != (c2.args == null)) return false;
	if(c1.args != null && !haxe.rtti.TypeApi.leq(function(a,b) {
		return a.name == b.name && a.opt == b.opt && haxe.rtti.TypeApi.typeEq(a.t,b.t);
	},c1.args,c2.args)) return false;
	return true;
}
haxe.rtti.TypeApi.prototype.__class__ = haxe.rtti.TypeApi;
Timeout = function() { }
Timeout.__name__ = ["Timeout"];
Timeout.execute = function(ms,method) {
	var timer = new haxe.Timer(ms);
	var run = function() {
		method();
		timer.stop();
	};
	timer.run = run;
}
Timeout.prototype.__class__ = Timeout;
Matrix4 = function(p) {
	if( p === $_ ) return;
	this.buffer = new Float32Array(Matrix4.IDENTITY_BUFFER);
}
Matrix4.__name__ = ["Matrix4"];
Matrix4.createIdentityBuffer = function() {
	var buffer = new Float32Array(16);
	buffer[0] = 1;
	buffer[1] = 0;
	buffer[2] = 0;
	buffer[3] = 0;
	buffer[4] = 0;
	buffer[5] = 1;
	buffer[6] = 0;
	buffer[7] = 0;
	buffer[8] = 0;
	buffer[9] = 0;
	buffer[10] = 1;
	buffer[11] = 0;
	buffer[12] = 0;
	buffer[13] = 0;
	buffer[14] = 0;
	buffer[15] = 1;
	return buffer;
}
Matrix4.prototype.buffer = null;
Matrix4.prototype.n11 = null;
Matrix4.prototype.n12 = null;
Matrix4.prototype.n13 = null;
Matrix4.prototype.n14 = null;
Matrix4.prototype.n21 = null;
Matrix4.prototype.n22 = null;
Matrix4.prototype.n23 = null;
Matrix4.prototype.n24 = null;
Matrix4.prototype.n31 = null;
Matrix4.prototype.n32 = null;
Matrix4.prototype.n33 = null;
Matrix4.prototype.n34 = null;
Matrix4.prototype.n41 = null;
Matrix4.prototype.n42 = null;
Matrix4.prototype.n43 = null;
Matrix4.prototype.n44 = null;
Matrix4.prototype.setIdentity = function() {
	this.buffer.set(Matrix4.IDENTITY_BUFFER);
	return this;
}
Matrix4.prototype.set = function(n11,n12,n13,n14,n21,n22,n23,n24,n31,n32,n33,n34,n41,n42,n43,n44) {
	this.buffer[0] = n11;
	this.buffer[1] = n21;
	this.buffer[2] = n31;
	this.buffer[3] = n41;
	this.buffer[4] = n12;
	this.buffer[5] = n22;
	this.buffer[6] = n32;
	this.buffer[7] = n42;
	this.buffer[8] = n13;
	this.buffer[9] = n23;
	this.buffer[10] = n33;
	this.buffer[11] = n43;
	this.buffer[12] = n14;
	this.buffer[13] = n24;
	this.buffer[14] = n34;
	this.buffer[15] = n44;
	return this;
}
Matrix4.prototype.setFrom = function(from) {
	this.buffer.set(from.buffer);
	return this;
}
Matrix4.prototype.setTranslation = function(x,y,z) {
	this.set(1,0,0,x,0,1,0,y,0,0,1,z,0,0,0,1);
	return this;
}
Matrix4.prototype.setScale = function(x,y,z) {
	this.set(x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1);
	return this;
}
Matrix4.prototype.setRotationX = function(angle) {
	var c = Math.cos(angle), s = Math.sin(angle);
	this.set(1,0,0,0,0,c,-s,0,0,s,c,0,0,0,0,1);
	return this;
}
Matrix4.prototype.setRotationY = function(angle) {
	var c = Math.cos(angle), s = Math.sin(angle);
	this.set(c,0,s,0,0,1,0,0,-s,0,c,0,0,0,0,1);
	return this;
}
Matrix4.prototype.setRotationZ = function(angle) {
	var c = Math.cos(angle), s = Math.sin(angle);
	this.set(c,-s,0,0,s,c,0,0,0,0,1,0,0,0,0,1);
	return this;
}
Matrix4.prototype.setRotation = function(angle,axis) {
	var c = Math.cos(angle), s = Math.sin(angle), t = 1 - c, x = axis.x, y = axis.y, z = axis.z, tx = t * x, ty = t * y;
	this.set(tx * x + c,tx * y - s * z,tx * z + s * y,0,tx * y + s * z,ty * y + c,ty * z - s * x,0,tx * z - s * y,ty * z + s * x,t * z * z + c,0,0,0,0,1);
	return this;
}
Matrix4.prototype.setLookAt = function(eye,at,up) {
	var eyex = eye.x, eyey = eye.y, eyez = eye.z, upx = up.x, upy = up.y, upz = up.z, atx = at.x, aty = at.y, atz = at.z;
	if(eyex == atx && eyey == aty && eyez == atz) this.setIdentity();
	var z0 = eyex - at.x;
	var z1 = eyey - at.y;
	var z2 = eyez - at.z;
	var len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
	z0 *= len;
	z1 *= len;
	z2 *= len;
	var x0 = upy * z2 - upz * z1;
	var x1 = upz * z0 - upx * z2;
	var x2 = upx * z1 - upy * z0;
	len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
	if(Math.isNaN(len)) {
		x0 = 0;
		x1 = 0;
		x2 = 0;
	} else {
		len = 1 / len;
		x0 *= len;
		x1 *= len;
		x2 *= len;
	}
	var y0 = z1 * x2 - z2 * x1;
	var y1 = z2 * x0 - z0 * x2;
	var y2 = z0 * x1 - z1 * x0;
	len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
	if(Math.isNaN(len)) {
		y0 = 0;
		y1 = 0;
		y2 = 0;
	} else {
		len = 1 / len;
		y0 *= len;
		y1 *= len;
		y2 *= len;
	}
	this.buffer[0] = x0;
	this.buffer[1] = y0;
	this.buffer[2] = z0;
	this.buffer[3] = 0;
	this.buffer[4] = x1;
	this.buffer[5] = y1;
	this.buffer[9] = z1;
	this.buffer[7] = 0;
	this.buffer[8] = x2;
	this.buffer[9] = y2;
	this.buffer[10] = z2;
	this.buffer[11] = 0;
	this.buffer[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
	this.buffer[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
	this.buffer[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
	this.buffer[15] = 1;
}
Matrix4.prototype.setOrtho = function(left,right,bottom,top,near,far) {
	var rl = right - left;
	var tb = top - bottom;
	var fn = far - near;
	this.buffer[0] = 2 / rl;
	this.buffer[1] = 0;
	this.buffer[2] = 0;
	this.buffer[3] = 0;
	this.buffer[4] = 0;
	this.buffer[5] = 2 / tb;
	this.buffer[6] = 0;
	this.buffer[7] = 0;
	this.buffer[8] = 0;
	this.buffer[9] = 0;
	this.buffer[10] = -2 / fn;
	this.buffer[11] = 0;
	this.buffer[12] = -(left + right) / rl;
	this.buffer[13] = -(top + bottom) / tb;
	this.buffer[14] = -(far + near) / fn;
	this.buffer[15] = 1;
}
Matrix4.prototype.setPerspective = function(fovy,aspect,near,far) {
	var top = near * Math.tan(fovy * Math.PI / 360);
	var right = top * aspect;
	this.setFrustum(-right,right,-top,top,near,far);
}
Matrix4.prototype.setFrustum = function(left,right,bottom,top,near,far) {
	var rl = right - left;
	var tb = top - bottom;
	var fn = far - near;
	this.buffer[0] = near * 2 / rl;
	this.buffer[1] = 0;
	this.buffer[2] = 0;
	this.buffer[3] = 0;
	this.buffer[4] = 0;
	this.buffer[5] = near * 2 / tb;
	this.buffer[6] = 0;
	this.buffer[7] = 0;
	this.buffer[8] = (right + left) / rl;
	this.buffer[9] = (top + bottom) / tb;
	this.buffer[10] = -(far + near) / fn;
	this.buffer[11] = -1;
	this.buffer[12] = 0;
	this.buffer[13] = 0;
	this.buffer[14] = -(far * near * 2) / fn;
	this.buffer[15] = 0;
}
Matrix4.prototype.append = function(a) {
	var b = this;
	var a11 = a.buffer[0], a21 = a.buffer[1], a31 = a.buffer[2], a41 = a.buffer[3], a12 = a.buffer[4], a22 = a.buffer[5], a32 = a.buffer[6], a42 = a.buffer[7], a13 = a.buffer[8], a23 = a.buffer[9], a33 = a.buffer[10], a43 = a.buffer[11], a14 = a.buffer[12], a24 = a.buffer[13], a34 = a.buffer[14], a44 = a.buffer[15], b11 = b.buffer[0], b21 = b.buffer[1], b31 = b.buffer[2], b41 = b.buffer[3], b12 = b.buffer[4], b22 = b.buffer[5], b32 = b.buffer[6], b42 = b.buffer[7], b13 = b.buffer[8], b23 = b.buffer[9], b33 = b.buffer[10], b43 = b.buffer[11], b14 = b.buffer[12], b24 = b.buffer[13], b34 = b.buffer[14], b44 = b.buffer[15];
	this.buffer[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
	this.buffer[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
	this.buffer[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
	this.buffer[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
	this.buffer[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
	this.buffer[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
	this.buffer[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
	this.buffer[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
	this.buffer[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
	this.buffer[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
	this.buffer[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
	this.buffer[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
	this.buffer[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
	this.buffer[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
	this.buffer[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
	this.buffer[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
}
Matrix4.prototype.appendAffine = function(a) {
	var a11 = a.buffer[0], a21 = a.buffer[1], a31 = a.buffer[2], a12 = a.buffer[4], a22 = a.buffer[5], a32 = a.buffer[6], a13 = a.buffer[8], a23 = a.buffer[9], a33 = a.buffer[10], b11 = this.buffer[0], b21 = this.buffer[1], b31 = this.buffer[2], b12 = this.buffer[4], b22 = this.buffer[5], b32 = this.buffer[6], b13 = this.buffer[8], b23 = this.buffer[9], b33 = this.buffer[10], b14 = this.buffer[12], b24 = this.buffer[13], b34 = this.buffer[14];
	this.buffer[0] = a11 * b11 + a12 * b21 + a13 * b31;
	this.buffer[1] = a21 * b11 + a22 * b21 + a23 * b31;
	this.buffer[2] = a31 * b11 + a32 * b21 + a33 * b31;
	this.buffer[4] = a11 * b12 + a12 * b22 + a13 * b32;
	this.buffer[5] = a21 * b12 + a22 * b22 + a23 * b32;
	this.buffer[6] = a31 * b12 + a32 * b22 + a33 * b32;
	this.buffer[8] = a11 * b13 + a12 * b23 + a13 * b33;
	this.buffer[9] = a21 * b13 + a22 * b23 + a23 * b33;
	this.buffer[10] = a31 * b13 + a32 * b23 + a33 * b33;
	this.buffer[12] = a11 * b14 + a12 * b24 + a13 * b34 + a.buffer[12];
	this.buffer[13] = a21 * b14 + a22 * b24 + a23 * b34 + a.buffer[13];
	this.buffer[14] = a31 * b14 + a32 * b24 + a33 * b34 + a.buffer[14];
}
Matrix4.prototype.appendTranslation = function(x,y,z) {
	Matrix4.tempMatrix1.setTranslation(x,y,z);
	this.append(Matrix4.tempMatrix1);
}
Matrix4.prototype.appendTranslationAffine = function(x,y,z) {
	Matrix4.tempMatrix1.setTranslation(x,y,z);
	this.appendAffine(Matrix4.tempMatrix1);
}
Matrix4.prototype.appendScale = function(x,y,z) {
	Matrix4.tempMatrix1.setScale(x,y,z);
	this.append(Matrix4.tempMatrix1);
}
Matrix4.prototype.appendRotation = function(angle,axis) {
	Matrix4.tempMatrix1.setRotation(angle,axis);
	this.append(Matrix4.tempMatrix1);
}
Matrix4.prototype.appendRotationZ = function(angle) {
	Matrix4.tempMatrix1.setRotationZ(angle);
	this.append(Matrix4.tempMatrix1);
}
Matrix4.prototype.appendScaleAffine = function(x,y,z) {
	Matrix4.tempMatrix1.setScale(x,y,z);
	this.appendAffine(Matrix4.tempMatrix1);
}
Matrix4.prototype.appendRotationAffine = function(angle,axis) {
	Matrix4.tempMatrix1.setRotation(angle,axis);
	this.appendAffine(Matrix4.tempMatrix1);
}
Matrix4.prototype.appendRotationZAffine = function(angle) {
	Matrix4.tempMatrix1.setRotationZ(angle);
	this.appendAffine(Matrix4.tempMatrix1);
}
Matrix4.prototype.toString = function() {
	var result = "[Matrix4: ";
	result += " | " + this.buffer[0] + "," + this.buffer[4] + "," + this.buffer[8] + "," + this.buffer[12];
	result += " | " + this.buffer[1] + "," + this.buffer[5] + "," + this.buffer[9] + "," + this.buffer[13];
	result += " | " + this.buffer[2] + "," + this.buffer[6] + "," + this.buffer[10] + "," + this.buffer[14];
	result += " | " + this.buffer[3] + "," + this.buffer[7] + "," + this.buffer[11] + "," + this.buffer[15];
	result += " | ]";
	return result;
}
Matrix4.prototype.get11 = function() {
	return this.buffer[0];
}
Matrix4.prototype.set11 = function(v) {
	return this.buffer[0] = v;
}
Matrix4.prototype.get12 = function() {
	return this.buffer[4];
}
Matrix4.prototype.set12 = function(v) {
	return this.buffer[4] = v;
}
Matrix4.prototype.get13 = function() {
	return this.buffer[8];
}
Matrix4.prototype.set13 = function(v) {
	return this.buffer[8] = v;
}
Matrix4.prototype.get14 = function() {
	return this.buffer[12];
}
Matrix4.prototype.set14 = function(v) {
	return this.buffer[12] = v;
}
Matrix4.prototype.get21 = function() {
	return this.buffer[1];
}
Matrix4.prototype.set21 = function(v) {
	return this.buffer[1] = v;
}
Matrix4.prototype.get22 = function() {
	return this.buffer[5];
}
Matrix4.prototype.set22 = function(v) {
	return this.buffer[5] = v;
}
Matrix4.prototype.get23 = function() {
	return this.buffer[9];
}
Matrix4.prototype.set23 = function(v) {
	return this.buffer[9] = v;
}
Matrix4.prototype.get24 = function() {
	return this.buffer[13];
}
Matrix4.prototype.set24 = function(v) {
	return this.buffer[13] = v;
}
Matrix4.prototype.get31 = function() {
	return this.buffer[2];
}
Matrix4.prototype.set31 = function(v) {
	return this.buffer[2] = v;
}
Matrix4.prototype.get32 = function() {
	return this.buffer[6];
}
Matrix4.prototype.set32 = function(v) {
	return this.buffer[6] = v;
}
Matrix4.prototype.get33 = function() {
	return this.buffer[10];
}
Matrix4.prototype.set33 = function(v) {
	return this.buffer[10] = v;
}
Matrix4.prototype.get34 = function() {
	return this.buffer[14];
}
Matrix4.prototype.set34 = function(v) {
	return this.buffer[14] = v;
}
Matrix4.prototype.get41 = function() {
	return this.buffer[3];
}
Matrix4.prototype.set41 = function(v) {
	return this.buffer[3] = v;
}
Matrix4.prototype.get42 = function() {
	return this.buffer[7];
}
Matrix4.prototype.set42 = function(v) {
	return this.buffer[7] = v;
}
Matrix4.prototype.get43 = function() {
	return this.buffer[11];
}
Matrix4.prototype.set43 = function(v) {
	return this.buffer[11] = v;
}
Matrix4.prototype.get44 = function() {
	return this.buffer[15];
}
Matrix4.prototype.set44 = function(v) {
	return this.buffer[15] = v;
}
Matrix4.prototype.__class__ = Matrix4;
kumite.launch.Config = function(p) {
	if( p === $_ ) return;
	this.launcher = new kumite.launch.Launcher();
	this.sequencer = new bpmjs.Sequencer();
	this.preloadDisplay = new kumite.launch.PreloadDisplay();
}
kumite.launch.Config.__name__ = ["kumite","launch","Config"];
kumite.launch.Config.prototype.sequencer = null;
kumite.launch.Config.prototype.launcher = null;
kumite.launch.Config.prototype.preloadDisplay = null;
kumite.launch.Config.prototype.__class__ = kumite.launch.Config;
kumite.launch.Config.__interfaces__ = [haxe.rtti.Infos];
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	Xml.Element = "element";
	Xml.PCData = "pcdata";
	Xml.CData = "cdata";
	Xml.Comment = "comment";
	Xml.DocType = "doctype";
	Xml.Prolog = "prolog";
	Xml.Document = "document";
}
if(typeof(haxe_timers) == "undefined") haxe_timers = [];
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
{
	var d = Date;
	d.now = function() {
		return new Date();
	};
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	};
	d.fromString = function(s) {
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		case 10:
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw "Invalid date format : " + s;
		}
	};
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	};
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
kumite.launch.PreloadDisplay.__meta__ = { fields : { complete : { Complete : null}, bootMonitor : { Sequence : ["boot","monitor"]}, bootStartComplete : { Sequence : ["boot","startComplete"]}}};
kumite.launch.PreloadDisplay.__rtti = "<class path=\"kumite.launch.PreloadDisplay\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<preloaderDiv><t path=\"js.HtmlDom\"/></preloaderDiv>\n\t<complete public=\"1\" set=\"method\" line=\"16\"><f a=\"\"><e path=\"Void\"/></f></complete>\n\t<bootMonitor public=\"1\" set=\"method\" line=\"24\"><f a=\"monitor\">\n\t<c path=\"bpmjs.ProgressMonitor\"/>\n\t<e path=\"Void\"/>\n</f></bootMonitor>\n\t<bootStartComplete public=\"1\" set=\"method\" line=\"46\"><f a=\"\"><e path=\"Void\"/></f></bootStartComplete>\n\t<removePreloader set=\"method\" line=\"53\"><f a=\"\"><e path=\"Void\"/></f></removePreloader>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.stage.StageResizeAction.__meta__ = { fields : { messenger : { Messenger : null}, stage : { Inject : null}, initPrepare : { Sequence : ["boot","initPrepare"]}, startComplete : { Sequence : ["boot","startComplete"]}}};
kumite.stage.StageResizeAction.__rtti = "<class path=\"kumite.stage.StageResizeAction\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<messenger public=\"1\"><c path=\"bpmjs.Messenger\"/></messenger>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<initPrepare public=\"1\" set=\"method\" line=\"21\"><f a=\"\"><e path=\"Void\"/></f></initPrepare>\n\t<startComplete public=\"1\" set=\"method\" line=\"27\"><f a=\"\"><e path=\"Void\"/></f></startComplete>\n\t<timerUpdate set=\"method\" line=\"33\"><f a=\"\"><e path=\"Void\"/></f></timerUpdate>\n\t<onResize set=\"method\" line=\"39\"><f a=\"?event\">\n\t<t path=\"js.Event\"/>\n\t<e path=\"Void\"/>\n</f></onResize>\n\t<updateSize set=\"method\" line=\"45\"><f a=\"\"><e path=\"Void\"/></f></updateSize>\n\t<sendResizeMessage set=\"method\" line=\"51\"><f a=\"\"><e path=\"Void\"/></f></sendResizeMessage>\n\t<new public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs.Sequencer.__meta__ = { fields : { context : { Inject : null}}};
bpmjs.Sequencer.__rtti = "<class path=\"bpmjs.Sequencer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<context public=\"1\"><c path=\"bpmjs.Context\"/></context>\n\t<start public=\"1\" set=\"method\" line=\"14\"><f a=\"name\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></start>\n\t<new public=\"1\" set=\"method\" line=\"12\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
Color.__rtti = "<class path=\"Color\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<r public=\"1\"><c path=\"Float\"/></r>\n\t<g public=\"1\"><c path=\"Float\"/></g>\n\t<b public=\"1\"><c path=\"Float\"/></b>\n\t<a public=\"1\"><c path=\"Float\"/></a>\n\t<fromHex public=\"1\" set=\"method\" line=\"18\"><f a=\"hex\">\n\t<c path=\"Int\"/>\n\t<c path=\"Color\"/>\n</f></fromHex>\n\t<scaleRGB public=\"1\" set=\"method\" line=\"28\"><f a=\"factor\">\n\t<c path=\"Float\"/>\n\t<e path=\"Void\"/>\n</f></scaleRGB>\n\t<mixFrom public=\"1\" set=\"method\" line=\"35\"><f a=\"color1:color2:color1Mix\">\n\t<c path=\"Color\"/>\n\t<c path=\"Color\"/>\n\t<c path=\"Float\"/>\n\t<e path=\"Void\"/>\n</f></mixFrom>\n\t<toContextRGB public=\"1\" set=\"method\" line=\"50\"><f a=\"\"><c path=\"String\"/></f></toContextRGB>\n\t<toContextRGBA public=\"1\" set=\"method\" line=\"55\"><f a=\"\"><c path=\"String\"/></f></toContextRGBA>\n\t<clone public=\"1\" set=\"method\" line=\"60\"><f a=\"\"><c path=\"Color\"/></f></clone>\n\t<toString public=\"1\" set=\"method\" line=\"65\"><f a=\"\"><c path=\"String\"/></f></toString>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"?r:?g:?b:?a\">\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<e path=\"Void\"/>\n</f></new>\n</class>";
kumite.time.Time.EXPECTED_FRAMERATE = 60;
kumite.stage.Config.__rtti = "<class path=\"kumite.stage.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<stageResizeAction public=\"1\"><c path=\"kumite.stage.StageResizeAction\"/></stageResizeAction>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.launch.Launcher.__meta__ = { fields : { sequencer : { Inject : null}, handlePostComplete : { PostComplete : null}, showError : { Sequence : ["boot","error"]}, handleFinish : { Sequence : ["boot","finish"]}}};
kumite.launch.Launcher.__rtti = "<class path=\"kumite.launch.Launcher\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<sequencer public=\"1\"><c path=\"bpmjs.Sequencer\"/></sequencer>\n\t<handlePostComplete public=\"1\" set=\"method\" line=\"17\"><f a=\"\"><e path=\"Void\"/></f></handlePostComplete>\n\t<showError public=\"1\" set=\"method\" line=\"24\"><f a=\"message\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></showError>\n\t<handleFinish public=\"1\" set=\"method\" line=\"30\"><f a=\"\"><e path=\"Void\"/></f></handleFinish>\n\t<new public=\"1\" set=\"method\" line=\"14\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.presentation.CanvasSlider.__meta__ = { fields : { stage : { Inject : null}, time : { Inject : null}, start : { Sequence : ["boot","start"]}, handleResize : { Message : null}, handleTick : { Message : null}}};
kumite.presentation.CanvasSlider.__rtti = "<class path=\"kumite.presentation.CanvasSlider\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage><c path=\"kumite.stage.Stage\"/></stage>\n\t<time><c path=\"kumite.time.Time\"/></time>\n\t<autoScroll><e path=\"Bool\"/></autoScroll>\n\t<root><t path=\"js.HtmlDom\"/></root>\n\t<speed><c path=\"Float\"/></speed>\n\t<scrollTop><c path=\"Float\"/></scrollTop>\n\t<targetPosition><c path=\"Int\"/></targetPosition>\n\t<lastScrollTop><c path=\"Int\"/></lastScrollTop>\n\t<lastScrollTopEqualTime><c path=\"Float\"/></lastScrollTopEqualTime>\n\t<canvases><c path=\"Array\"><c path=\"CanvasGraphic\"/></c></canvases>\n\t<start set=\"method\" line=\"39\"><f a=\"\"><e path=\"Void\"/></f></start>\n\t<handleResize set=\"method\" line=\"59\"><f a=\"message\">\n\t<c path=\"kumite.stage.StageResizeMessage\"/>\n\t<e path=\"Void\"/>\n</f></handleResize>\n\t<handleTick set=\"method\" line=\"65\"><f a=\"tick\">\n\t<c path=\"kumite.time.Tick\"/>\n\t<e path=\"Void\"/>\n</f></handleTick>\n\t<resize set=\"method\" line=\"107\"><f a=\"\"><e path=\"Void\"/></f></resize>\n\t<new public=\"1\" set=\"method\" line=\"31\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
LogLevel.INFO = new LogLevel(1);
LogLevel.WARN = new LogLevel(2);
LogLevel.ERROR = new LogLevel(3);
LogLevel.OFF = new LogLevel(4);
kumite.presentation.PresentationConfig.__rtti = "<class path=\"kumite.presentation.PresentationConfig\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<canvasSlider><c path=\"kumite.presentation.CanvasSlider\"/></canvasSlider>\n\t<new public=\"1\" set=\"method\" line=\"9\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
Xml.enode = new EReg("^<([a-zA-Z0-9:_-]+)","");
Xml.ecdata = new EReg("^<!\\[CDATA\\[","i");
Xml.edoctype = new EReg("^<!DOCTYPE ","i");
Xml.eend = new EReg("^</([a-zA-Z0-9:_-]+)>","");
Xml.epcdata = new EReg("^[^<]+","");
Xml.ecomment = new EReg("^<!--","");
Xml.eprolog = new EReg("^<\\?[^\\?]+\\?>","");
Xml.eattribute = new EReg("^\\s*([a-zA-Z0-9:_-]+)\\s*=\\s*([\"'])([^\\2]*?)\\2","");
Xml.eclose = new EReg("^[ \r\n\t]*(>|(/>))","");
Xml.ecdata_end = new EReg("\\]\\]>","");
Xml.edoctype_elt = new EReg("[\\[|\\]>]","");
Xml.ecomment_end = new EReg("-->","");
reflect.ClassInfo.cache = new Hash();
hsl.haxe._DirectSignaler.PropagationStatus.IMMEDIATELY_STOPPED = 1;
hsl.haxe._DirectSignaler.PropagationStatus.STOPPED = 2;
hsl.haxe._DirectSignaler.PropagationStatus.UNDISTURBED = 3;
kumite.time.Config.__rtti = "<class path=\"kumite.time.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<timeController public=\"1\"><c path=\"kumite.time.TimeController\"/></timeController>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.time.TimeController.__meta__ = { fields : { time : { Inject : null}, messenger : { Messenger : null}, startComplete : { Sequence : ["boot","startComplete"]}}};
kumite.time.TimeController.__rtti = "<class path=\"kumite.time.TimeController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<messenger public=\"1\"><c path=\"bpmjs.Messenger\"/></messenger>\n\t<startComplete public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></startComplete>\n\t<timerUpdate set=\"method\" line=\"24\"><f a=\"\"><e path=\"Void\"/></f></timerUpdate>\n\t<new public=\"1\" set=\"method\" line=\"15\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
Log.filters = new Array();
Log.args = new Array();
Log.errors = new Array();
Matrix4.IDENTITY_BUFFER = Matrix4.createIdentityBuffer();
Matrix4.tempMatrix1 = new Matrix4();
Matrix4.tempMatrix2 = new Matrix4();
Matrix4.i11 = 0;
Matrix4.i12 = 4;
Matrix4.i13 = 8;
Matrix4.i14 = 12;
Matrix4.i21 = 1;
Matrix4.i22 = 5;
Matrix4.i23 = 9;
Matrix4.i24 = 13;
Matrix4.i31 = 2;
Matrix4.i32 = 6;
Matrix4.i33 = 10;
Matrix4.i34 = 14;
Matrix4.i41 = 3;
Matrix4.i42 = 7;
Matrix4.i43 = 11;
Matrix4.i44 = 15;
kumite.launch.Config.__rtti = "<class path=\"kumite.launch.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<sequencer public=\"1\"><c path=\"bpmjs.Sequencer\"/></sequencer>\n\t<launcher public=\"1\"><c path=\"kumite.launch.Launcher\"/></launcher>\n\t<preloadDisplay public=\"1\"><c path=\"kumite.launch.PreloadDisplay\"/></preloadDisplay>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
js.Lib.onerror = null;
Main.main()