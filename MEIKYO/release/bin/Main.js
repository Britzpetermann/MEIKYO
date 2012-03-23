$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof kumite=='undefined') kumite = {}
if(!kumite.time) kumite.time = {}
kumite.time.Tick = function(p) {
	$s.push("kumite.time.Tick::new");
	var $spos = $s.length;
	$s.pop();
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
	$s.push("kumite.launch.PreloadDisplay::new");
	var $spos = $s.length;
	$s.pop();
}
kumite.launch.PreloadDisplay.__name__ = ["kumite","launch","PreloadDisplay"];
kumite.launch.PreloadDisplay.prototype.preloaderDiv = null;
kumite.launch.PreloadDisplay.prototype.complete = function() {
	$s.push("kumite.launch.PreloadDisplay::complete");
	var $spos = $s.length;
	this.preloaderDiv = js.Lib.document.createElement("div");
	this.preloaderDiv.className = "Preloader";
	js.Lib.document.body.appendChild(this.preloaderDiv);
	$s.pop();
}
kumite.launch.PreloadDisplay.prototype.bootMonitor = function(monitor) {
	$s.push("kumite.launch.PreloadDisplay::bootMonitor");
	var $spos = $s.length;
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
		var chars = ".oO";
		var chars1 = "Oo.";
		var chars2 = "-=";
		var chars3 = ":. ";
		var chars4 = "▁▂▃▄▅▆▇";
		bar += chars4.charAt(Std["int"](diff * (chars4.length - 1)));
	}
	this.preloaderDiv.innerHTML = "" + bar;
	$s.pop();
}
kumite.launch.PreloadDisplay.prototype.bootStartComplete = function() {
	$s.push("kumite.launch.PreloadDisplay::bootStartComplete");
	var $spos = $s.length;
	var body = js.Lib.document.getElementById("root");
	body.style.opacity = 0.0;
	this.preloaderDiv.style.opacity = 0.8;
	GLTween.to(this.preloaderDiv.style,1000,{ opacity : 0});
	GLTween.to(body.style,300,{ opacity : 1});
	Timeout.execute(1000,$closure(this,"removePreloader"));
	$s.pop();
}
kumite.launch.PreloadDisplay.prototype.removePreloader = function() {
	$s.push("kumite.launch.PreloadDisplay::removePreloader");
	var $spos = $s.length;
	js.Lib.document.body.removeChild(this.preloaderDiv);
	$s.pop();
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
	$s.push("haxe.exception.Exception::new");
	var $spos = $s.length;
	this.message = null == message?"Unknown exception":message;
	this.innerException = innerException;
	this.generateStackTrace(numberOfStackTraceShifts);
	this.stackTrace = this.stackTraceArray;
	$s.pop();
}
haxe.exception.Exception.__name__ = ["haxe","exception","Exception"];
haxe.exception.Exception.prototype.baseException = null;
haxe.exception.Exception.prototype.innerException = null;
haxe.exception.Exception.prototype.message = null;
haxe.exception.Exception.prototype.stackTrace = null;
haxe.exception.Exception.prototype.stackTraceArray = null;
haxe.exception.Exception.prototype.generateStackTrace = function(numberOfStackTraceShifts) {
	$s.push("haxe.exception.Exception::generateStackTrace");
	var $spos = $s.length;
	this.stackTraceArray = haxe.Stack.callStack().slice(numberOfStackTraceShifts + 1);
	var exceptionClass = Type.getClass(this);
	while(haxe.exception.Exception != exceptionClass) {
		this.stackTraceArray.shift();
		exceptionClass = Type.getSuperClass(exceptionClass);
	}
	$s.pop();
}
haxe.exception.Exception.prototype.getBaseException = function() {
	$s.push("haxe.exception.Exception::getBaseException");
	var $spos = $s.length;
	var result = this;
	while(null != result.innerException) result = result.innerException;
	$s.pop();
	return result;
	$s.pop();
}
haxe.exception.Exception.prototype.toString = function() {
	$s.push("haxe.exception.Exception::toString");
	var $spos = $s.length;
	var $tmp = this.message + haxe.Stack.toString(this.stackTraceArray);
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.exception.Exception.prototype.__class__ = haxe.exception.Exception;
haxe.exception.ArgumentNullException = function(argumentName,numberOfStackTraceShifts) {
	if( argumentName === $_ ) return;
	$s.push("haxe.exception.ArgumentNullException::new");
	var $spos = $s.length;
	haxe.exception.Exception.call(this,"Argument " + argumentName + " must be non-null",null,numberOfStackTraceShifts);
	$s.pop();
}
haxe.exception.ArgumentNullException.__name__ = ["haxe","exception","ArgumentNullException"];
haxe.exception.ArgumentNullException.__super__ = haxe.exception.Exception;
for(var k in haxe.exception.Exception.prototype ) haxe.exception.ArgumentNullException.prototype[k] = haxe.exception.Exception.prototype[k];
haxe.exception.ArgumentNullException.prototype.__class__ = haxe.exception.ArgumentNullException;
if(typeof hsl=='undefined') hsl = {}
if(!hsl.haxe) hsl.haxe = {}
hsl.haxe.Bond = function(p) {
	if( p === $_ ) return;
	$s.push("hsl.haxe.Bond::new");
	var $spos = $s.length;
	this.halted = false;
	$s.pop();
}
hsl.haxe.Bond.__name__ = ["hsl","haxe","Bond"];
hsl.haxe.Bond.prototype.halted = null;
hsl.haxe.Bond.prototype.willDestroyOnUse = null;
hsl.haxe.Bond.prototype.destroy = function() {
	$s.push("hsl.haxe.Bond::destroy");
	var $spos = $s.length;
	$s.pop();
}
hsl.haxe.Bond.prototype.destroyOnUse = function() {
	$s.push("hsl.haxe.Bond::destroyOnUse");
	var $spos = $s.length;
	this.willDestroyOnUse = true;
	$s.pop();
	return this;
	$s.pop();
}
hsl.haxe.Bond.prototype.halt = function() {
	$s.push("hsl.haxe.Bond::halt");
	var $spos = $s.length;
	this.halted = true;
	$s.pop();
}
hsl.haxe.Bond.prototype.resume = function() {
	$s.push("hsl.haxe.Bond::resume");
	var $spos = $s.length;
	this.halted = false;
	$s.pop();
}
hsl.haxe.Bond.prototype.toString = function() {
	$s.push("hsl.haxe.Bond::toString");
	var $spos = $s.length;
	$s.pop();
	return "[Bond]";
	$s.pop();
}
hsl.haxe.Bond.prototype.__class__ = hsl.haxe.Bond;
Map = function() { }
Map.__name__ = ["Map"];
Map.linear = function(value,min0,max0,min1,max1) {
	$s.push("Map::linear");
	var $spos = $s.length;
	var p0 = 1 / (max0 - min0) * (value - min0);
	var $tmp = min1 + (max1 - min1) * p0;
	$s.pop();
	return $tmp;
	$s.pop();
}
Map.ease = function(value,min0,max0,min1,max1,easeFunction) {
	$s.push("Map::ease");
	var $spos = $s.length;
	var p0 = 1 / (max0 - min0) * (value - min0);
	var t = p0;
	var b = min1;
	var c = max1;
	var d = 1;
	var $tmp = easeFunction(t,b,c,d);
	$s.pop();
	return $tmp;
	$s.pop();
}
Map.prototype.__class__ = Map;
if(!kumite.stage) kumite.stage = {}
kumite.stage.StageResizeAction = function(p) {
	$s.push("kumite.stage.StageResizeAction::new");
	var $spos = $s.length;
	$s.pop();
}
kumite.stage.StageResizeAction.__name__ = ["kumite","stage","StageResizeAction"];
kumite.stage.StageResizeAction.prototype.messenger = null;
kumite.stage.StageResizeAction.prototype.stage = null;
kumite.stage.StageResizeAction.prototype.initPrepare = function() {
	$s.push("kumite.stage.StageResizeAction::initPrepare");
	var $spos = $s.length;
	this.updateSize();
	$s.pop();
}
kumite.stage.StageResizeAction.prototype.startComplete = function() {
	$s.push("kumite.stage.StageResizeAction::startComplete");
	var $spos = $s.length;
	GLAnimationFrame.run($closure(this,"timerUpdate"));
	js.Lib.window.onresize = $closure(this,"onResize");
	$s.pop();
}
kumite.stage.StageResizeAction.prototype.timerUpdate = function() {
	$s.push("kumite.stage.StageResizeAction::timerUpdate");
	var $spos = $s.length;
	if(this.stage.width != js.Lib.window.innerWidth || this.stage.height != js.Lib.window.innerHeight) this.onResize();
	$s.pop();
}
kumite.stage.StageResizeAction.prototype.onResize = function(event) {
	$s.push("kumite.stage.StageResizeAction::onResize");
	var $spos = $s.length;
	this.updateSize();
	this.sendResizeMessage();
	$s.pop();
}
kumite.stage.StageResizeAction.prototype.updateSize = function() {
	$s.push("kumite.stage.StageResizeAction::updateSize");
	var $spos = $s.length;
	this.stage.width = Std["int"](js.Lib.window.innerWidth);
	this.stage.height = Std["int"](js.Lib.window.innerHeight);
	$s.pop();
}
kumite.stage.StageResizeAction.prototype.sendResizeMessage = function() {
	$s.push("kumite.stage.StageResizeAction::sendResizeMessage");
	var $spos = $s.length;
	this.messenger.send(new kumite.stage.StageResizeMessage());
	$s.pop();
}
kumite.stage.StageResizeAction.prototype.__class__ = kumite.stage.StageResizeAction;
kumite.stage.StageResizeAction.__interfaces__ = [haxe.rtti.Infos];
if(!kumite.presentation) kumite.presentation = {}
kumite.presentation.SlideNavigator = function(p) {
	if( p === $_ ) return;
	$s.push("kumite.presentation.SlideNavigator::new");
	var $spos = $s.length;
	this.lastScrollTopEqualTime = -1;
	this.autoScroll = false;
	$s.pop();
}
kumite.presentation.SlideNavigator.__name__ = ["kumite","presentation","SlideNavigator"];
kumite.presentation.SlideNavigator.prototype.stage = null;
kumite.presentation.SlideNavigator.prototype.time = null;
kumite.presentation.SlideNavigator.prototype.presentation = null;
kumite.presentation.SlideNavigator.prototype.currentHash = null;
kumite.presentation.SlideNavigator.prototype.autoScroll = null;
kumite.presentation.SlideNavigator.prototype.root = null;
kumite.presentation.SlideNavigator.prototype.speed = null;
kumite.presentation.SlideNavigator.prototype.scrollTop = null;
kumite.presentation.SlideNavigator.prototype.targetPosition = null;
kumite.presentation.SlideNavigator.prototype.lastScrollTop = null;
kumite.presentation.SlideNavigator.prototype.lastScrollTopEqualTime = null;
kumite.presentation.SlideNavigator.prototype.start = function() {
	$s.push("kumite.presentation.SlideNavigator::start");
	var $spos = $s.length;
	this.root = js.Lib.document.getElementById("root");
	this.lastScrollTop = this.root.scrollTop;
	var row = 0;
	var _g = 0, _g1 = this.presentation.slides;
	while(_g < _g1.length) {
		var slide = _g1[_g];
		++_g;
		slide.row = row;
		slide.prepare(this.root);
		row++;
	}
	this.resize();
	$s.pop();
}
kumite.presentation.SlideNavigator.prototype.startComplete = function() {
	$s.push("kumite.presentation.SlideNavigator::startComplete");
	var $spos = $s.length;
	this.setMementoFromUrl();
	this.resize();
	$s.pop();
}
kumite.presentation.SlideNavigator.prototype.handleResize = function(message) {
	$s.push("kumite.presentation.SlideNavigator::handleResize");
	var $spos = $s.length;
	this.resize();
	$s.pop();
}
kumite.presentation.SlideNavigator.prototype.handleTick = function(tick) {
	$s.push("kumite.presentation.SlideNavigator::handleTick");
	var $spos = $s.length;
	var memento = this.getMemento();
	var newHash = haxe.Serializer.run(memento);
	if(this.currentHash != newHash) {
		this.currentHash = newHash;
		var uri = "#" + this.currentHash;
		js.Lib.window.location.replace(uri);
	}
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
			var index = Math.round(this.root.scrollTop / this.stage.height);
			this.presentation.currentSlideIndex = index;
			this.targetPosition = index * this.stage.height;
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
	$s.pop();
}
kumite.presentation.SlideNavigator.prototype.resize = function() {
	$s.push("kumite.presentation.SlideNavigator::resize");
	var $spos = $s.length;
	this.lastScrollTopEqualTime = -1;
	this.autoScroll = false;
	this.targetCurrentSlide();
	var _g = 0, _g1 = this.presentation.slides;
	while(_g < _g1.length) {
		var slide = _g1[_g];
		++_g;
		slide.resize(this.stage);
	}
	$s.pop();
}
kumite.presentation.SlideNavigator.prototype.getMemento = function() {
	$s.push("kumite.presentation.SlideNavigator::getMemento");
	var $spos = $s.length;
	var $tmp = this.presentation.getMemento();
	$s.pop();
	return $tmp;
	$s.pop();
}
kumite.presentation.SlideNavigator.prototype.setMementoFromUrl = function() {
	$s.push("kumite.presentation.SlideNavigator::setMementoFromUrl");
	var $spos = $s.length;
	try {
		var data = js.Lib.window.location.hash.substr(1);
		var memento = haxe.Unserializer.run(data);
		this.presentation.setMemento(memento);
		this.targetCurrentSlide();
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		{
			Log.posInfo = { fileName : "SlideNavigator.hx", lineNumber : 154, className : "kumite.presentation.SlideNavigator", methodName : "setMementoFromUrl"};
			if(Log.filter(LogLevel.INFO)) {
				Log.fetchInput("Cannot restore memento: " + e,null,null,null,null,null,null);
				console.info(Log.createMessage());
			}
		}
	}
	$s.pop();
}
kumite.presentation.SlideNavigator.prototype.targetCurrentSlide = function() {
	$s.push("kumite.presentation.SlideNavigator::targetCurrentSlide");
	var $spos = $s.length;
	this.scrollTop = this.presentation.currentSlideIndex * this.stage.height;
	this.lastScrollTop = this.presentation.currentSlideIndex * this.stage.height;
	this.root.scrollTop = this.presentation.currentSlideIndex * this.stage.height;
	$s.pop();
}
kumite.presentation.SlideNavigator.prototype.__class__ = kumite.presentation.SlideNavigator;
kumite.presentation.SlideNavigator.__interfaces__ = [haxe.rtti.Infos];
if(typeof bpmjs=='undefined') bpmjs = {}
bpmjs.Context = function(p) {
	if( p === $_ ) return;
	$s.push("bpmjs.Context::new");
	var $spos = $s.length;
	this.objects = new Array();
	this.observers = new Array();
	$s.pop();
}
bpmjs.Context.__name__ = ["bpmjs","Context"];
bpmjs.Context.prototype.contextConfig = null;
bpmjs.Context.prototype.objects = null;
bpmjs.Context.prototype.observers = null;
bpmjs.Context.prototype.addObject = function(name,classInfo,object) {
	$s.push("bpmjs.Context::addObject");
	var $spos = $s.length;
	var contextObject = new bpmjs.ContextObject(name,classInfo,object);
	this.objects.push(contextObject);
	$s.pop();
	return contextObject;
	$s.pop();
}
bpmjs.Context.prototype.getObjectByName = function(name) {
	$s.push("bpmjs.Context::getObjectByName");
	var $spos = $s.length;
	var _g = 0, _g1 = this.objects;
	while(_g < _g1.length) {
		var contextObject = _g1[_g];
		++_g;
		if(contextObject.name == name) {
			var $tmp = contextObject.object;
			$s.pop();
			return $tmp;
		}
	}
	$s.pop();
	return null;
	$s.pop();
}
bpmjs.Context.prototype.getObjectByType = function(type) {
	$s.push("bpmjs.Context::getObjectByType");
	var $spos = $s.length;
	var result = Lambda.filter(this.objects,this.getFilterByType(type));
	if(result.length == 1) {
		var $tmp = result.first().object;
		$s.pop();
		return $tmp;
	} else if(result.length > 1) throw "Multiple objects of type: " + result.first().classInfo.name + " found"; else {
		$s.pop();
		return null;
	}
	$s.pop();
}
bpmjs.Context.prototype.getDynamicObjectsByType = function(type) {
	$s.push("bpmjs.Context::getDynamicObjectsByType");
	var $spos = $s.length;
	var $tmp = Lambda.filter(this.objects,this.getFilterByType(type));
	$s.pop();
	return $tmp;
	$s.pop();
}
bpmjs.Context.prototype.addObserver = function(object,methodName,type) {
	$s.push("bpmjs.Context::addObserver");
	var $spos = $s.length;
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
	$s.pop();
}
bpmjs.Context.prototype.getFilterByType = function(type) {
	$s.push("bpmjs.Context::getFilterByType");
	var $spos = $s.length;
	var $tmp = function(contextObject) {
		$s.push("bpmjs.Context::getFilterByType@65");
		var $spos = $s.length;
		var $tmp = contextObject.type == type;
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
bpmjs.Context.prototype.__class__ = bpmjs.Context;
bpmjs.ContextObject = function(name,classInfo,object) {
	if( name === $_ ) return;
	$s.push("bpmjs.ContextObject::new");
	var $spos = $s.length;
	this.name = name;
	this.classInfo = classInfo;
	this.type = classInfo.type;
	this.object = object;
	$s.pop();
}
bpmjs.ContextObject.__name__ = ["bpmjs","ContextObject"];
bpmjs.ContextObject.prototype.name = null;
bpmjs.ContextObject.prototype.type = null;
bpmjs.ContextObject.prototype.object = null;
bpmjs.ContextObject.prototype.classInfo = null;
bpmjs.ContextObject.prototype.__class__ = bpmjs.ContextObject;
bpmjs.Observer = function(p) {
	$s.push("bpmjs.Observer::new");
	var $spos = $s.length;
	$s.pop();
}
bpmjs.Observer.__name__ = ["bpmjs","Observer"];
bpmjs.Observer.prototype.object = null;
bpmjs.Observer.prototype.methodName = null;
bpmjs.Observer.prototype.type = null;
bpmjs.Observer.prototype.observe = function(objectToObserve) {
	$s.push("bpmjs.Observer::observe");
	var $spos = $s.length;
	if(Std["is"](objectToObserve.object,this.type.type)) Reflect.field(this.object.object,this.methodName).apply(this.object.object,[objectToObserve.object]);
	$s.pop();
}
bpmjs.Observer.prototype.__class__ = bpmjs.Observer;
List = function(p) {
	if( p === $_ ) return;
	$s.push("List::new");
	var $spos = $s.length;
	this.length = 0;
	$s.pop();
}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	$s.push("List::add");
	var $spos = $s.length;
	var x = [item];
	if(this.h == null) this.h = x; else this.q[1] = x;
	this.q = x;
	this.length++;
	$s.pop();
}
List.prototype.push = function(item) {
	$s.push("List::push");
	var $spos = $s.length;
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
	$s.pop();
}
List.prototype.first = function() {
	$s.push("List::first");
	var $spos = $s.length;
	var $tmp = this.h == null?null:this.h[0];
	$s.pop();
	return $tmp;
	$s.pop();
}
List.prototype.last = function() {
	$s.push("List::last");
	var $spos = $s.length;
	var $tmp = this.q == null?null:this.q[0];
	$s.pop();
	return $tmp;
	$s.pop();
}
List.prototype.pop = function() {
	$s.push("List::pop");
	var $spos = $s.length;
	if(this.h == null) {
		$s.pop();
		return null;
	}
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	$s.pop();
	return x;
	$s.pop();
}
List.prototype.isEmpty = function() {
	$s.push("List::isEmpty");
	var $spos = $s.length;
	var $tmp = this.h == null;
	$s.pop();
	return $tmp;
	$s.pop();
}
List.prototype.clear = function() {
	$s.push("List::clear");
	var $spos = $s.length;
	this.h = null;
	this.q = null;
	this.length = 0;
	$s.pop();
}
List.prototype.remove = function(v) {
	$s.push("List::remove");
	var $spos = $s.length;
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1]; else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			$s.pop();
			return true;
		}
		prev = l;
		l = l[1];
	}
	$s.pop();
	return false;
	$s.pop();
}
List.prototype.iterator = function() {
	$s.push("List::iterator");
	var $spos = $s.length;
	var $tmp = { h : this.h, hasNext : function() {
		$s.push("List::iterator@155");
		var $spos = $s.length;
		var $tmp = this.h != null;
		$s.pop();
		return $tmp;
		$s.pop();
	}, next : function() {
		$s.push("List::iterator@158");
		var $spos = $s.length;
		if(this.h == null) {
			$s.pop();
			return null;
		}
		var x = this.h[0];
		this.h = this.h[1];
		$s.pop();
		return x;
		$s.pop();
	}};
	$s.pop();
	return $tmp;
	$s.pop();
}
List.prototype.toString = function() {
	$s.push("List::toString");
	var $spos = $s.length;
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
	var $tmp = s.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
List.prototype.join = function(sep) {
	$s.push("List::join");
	var $spos = $s.length;
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
		s.add(l[0]);
		l = l[1];
	}
	var $tmp = s.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
List.prototype.filter = function(f) {
	$s.push("List::filter");
	var $spos = $s.length;
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	$s.pop();
	return l2;
	$s.pop();
}
List.prototype.map = function(f) {
	$s.push("List::map");
	var $spos = $s.length;
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	$s.pop();
	return b;
	$s.pop();
}
List.prototype.__class__ = List;
bpmjs.Sequencer = function(p) {
	$s.push("bpmjs.Sequencer::new");
	var $spos = $s.length;
	$s.pop();
}
bpmjs.Sequencer.__name__ = ["bpmjs","Sequencer"];
bpmjs.Sequencer.prototype.context = null;
bpmjs.Sequencer.prototype.start = function(name) {
	$s.push("bpmjs.Sequencer::start");
	var $spos = $s.length;
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
	$s.pop();
}
bpmjs.Sequencer.prototype.__class__ = bpmjs.Sequencer;
bpmjs.Sequencer.__interfaces__ = [haxe.rtti.Infos];
bpmjs.Task = function(p) {
	if( p === $_ ) return;
	$s.push("bpmjs.Task::new");
	var $spos = $s.length;
	this.startSignaler = new hsl.haxe.DirectSignaler(this);
	this.completeSignaler = new hsl.haxe.DirectSignaler(this);
	this.errorSignaler = new hsl.haxe.DirectSignaler(this);
	this.setMonitor(new bpmjs.ProgressMonitor());
	$s.pop();
}
bpmjs.Task.__name__ = ["bpmjs","Task"];
bpmjs.Task.prototype.startSignaler = null;
bpmjs.Task.prototype.completeSignaler = null;
bpmjs.Task.prototype.errorSignaler = null;
bpmjs.Task.prototype.monitor = null;
bpmjs.Task.prototype.isComplete = null;
bpmjs.Task.prototype.start = function() {
	$s.push("bpmjs.Task::start");
	var $spos = $s.length;
	try {
		var t = this;
		this.startSignaler.dispatch(t,null,{ fileName : "Task.hx", lineNumber : 31, className : "bpmjs.Task", methodName : "start"});
		this.doStart();
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		{
			Log.posInfo = { fileName : "Task.hx", lineNumber : 36, className : "bpmjs.Task", methodName : "start"};
			if(Log.filter(LogLevel.ERROR)) {
				Log.fetchInput("Error starting Task: ",e,null,null,null,null,null);
				console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
				Log.displayError(Log.createErrorMessage());
			}
		}
	}
	$s.pop();
}
bpmjs.Task.prototype.doStart = function() {
	$s.push("bpmjs.Task::doStart");
	var $spos = $s.length;
	$s.pop();
}
bpmjs.Task.prototype.complete = function() {
	$s.push("bpmjs.Task::complete");
	var $spos = $s.length;
	this.isComplete = true;
	this.getMonitor().setCurrent(1);
	var t = this;
	this.completeSignaler.dispatch(t,null,{ fileName : "Task.hx", lineNumber : 49, className : "bpmjs.Task", methodName : "complete"});
	$s.pop();
}
bpmjs.Task.prototype.error = function(result,error) {
	$s.push("bpmjs.Task::error");
	var $spos = $s.length;
	var taskError = new bpmjs.TaskError();
	taskError.task = result;
	taskError.error = error;
	this.errorSignaler.dispatch(taskError,null,{ fileName : "Task.hx", lineNumber : 57, className : "bpmjs.Task", methodName : "error"});
	$s.pop();
}
bpmjs.Task.prototype.getMonitor = function() {
	$s.push("bpmjs.Task::getMonitor");
	var $spos = $s.length;
	var $tmp = this.monitor;
	$s.pop();
	return $tmp;
	$s.pop();
}
bpmjs.Task.prototype.setMonitor = function(monitor) {
	$s.push("bpmjs.Task::setMonitor");
	var $spos = $s.length;
	this.monitor = monitor;
	$s.pop();
	return monitor;
	$s.pop();
}
bpmjs.Task.prototype.__class__ = bpmjs.Task;
bpmjs.TaskGroup = function(p) {
	if( p === $_ ) return;
	$s.push("bpmjs.TaskGroup::new");
	var $spos = $s.length;
	bpmjs.Task.call(this);
	this.pendingTasks = new haxe.FastList();
	this.parallelTasksMax = 1;
	this.autoStart = false;
	this.tasks = new Array();
	$s.pop();
}
bpmjs.TaskGroup.__name__ = ["bpmjs","TaskGroup"];
bpmjs.TaskGroup.__super__ = bpmjs.Task;
for(var k in bpmjs.Task.prototype ) bpmjs.TaskGroup.prototype[k] = bpmjs.Task.prototype[k];
bpmjs.TaskGroup.prototype.tasks = null;
bpmjs.TaskGroup.prototype.autoStart = null;
bpmjs.TaskGroup.prototype.parallelTasksMax = null;
bpmjs.TaskGroup.prototype.pendingTasks = null;
bpmjs.TaskGroup.prototype.add = function(task) {
	$s.push("bpmjs.TaskGroup::add");
	var $spos = $s.length;
	this.tasks.push(task);
	if(this.autoStart) this.nextTask();
	$s.pop();
}
bpmjs.TaskGroup.prototype.doStart = function() {
	$s.push("bpmjs.TaskGroup::doStart");
	var $spos = $s.length;
	var _g = 0, _g1 = this.tasks;
	while(_g < _g1.length) {
		var task = _g1[_g];
		++_g;
		this.getMonitor().append(task.getMonitor(),1 / this.tasks.length);
	}
	this.nextTask();
	$s.pop();
}
bpmjs.TaskGroup.prototype.recomputeMonitor = function() {
	$s.push("bpmjs.TaskGroup::recomputeMonitor");
	var $spos = $s.length;
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
	$s.pop();
}
bpmjs.TaskGroup.prototype.getTotalTaskCount = function() {
	$s.push("bpmjs.TaskGroup::getTotalTaskCount");
	var $spos = $s.length;
	var $tmp = Lambda.count(this.pendingTasks) + Lambda.count(this.tasks);
	$s.pop();
	return $tmp;
	$s.pop();
}
bpmjs.TaskGroup.prototype.nextTask = function() {
	$s.push("bpmjs.TaskGroup::nextTask");
	var $spos = $s.length;
	var pendingTaskCount = Lambda.count(this.pendingTasks);
	if(pendingTaskCount >= this.parallelTasksMax) {
		$s.pop();
		return;
	}
	if(this.tasks.length > 0) {
		var pendingTask = this.tasks.shift();
		this.pendingTasks.add(pendingTask);
		pendingTask.completeSignaler.bind($closure(this,"handleTaskComplete"));
		pendingTask.errorSignaler.bind($closure(this,"handleTaskError"));
		pendingTask.start();
	} else if(!this.autoStart) this.complete();
	$s.pop();
}
bpmjs.TaskGroup.prototype.handleTaskComplete = function(task) {
	$s.push("bpmjs.TaskGroup::handleTaskComplete");
	var $spos = $s.length;
	this.pendingTasks.remove(task);
	this.nextTask();
	$s.pop();
}
bpmjs.TaskGroup.prototype.handleTaskError = function(taskError) {
	$s.push("bpmjs.TaskGroup::handleTaskError");
	var $spos = $s.length;
	this.pendingTasks.remove(taskError.task);
	if(!this.autoStart) this.error(this,taskError.error); else {
		Log.posInfo = { fileName : "TaskGroup.hx", lineNumber : 99, className : "bpmjs.TaskGroup", methodName : "handleTaskError"};
		if(Log.filter(LogLevel.WARN)) {
			Log.fetchInput(taskError.error,null,null,null,null,null,null);
			console.warn(Log.createMessage());
		}
	}
	$s.pop();
}
bpmjs.TaskGroup.prototype.__class__ = bpmjs.TaskGroup;
bpmjs.Sequence = function(name) {
	if( name === $_ ) return;
	$s.push("bpmjs.Sequence::new");
	var $spos = $s.length;
	bpmjs.TaskGroup.call(this);
	this.getMonitor().name = name;
	this.name = name;
	this.timer = new haxe.Timer(100);
	this.completeSignaler.bind($closure(this,"handleComplete"));
	this.errorSignaler.bind($closure(this,"handleError"));
	$s.pop();
}
bpmjs.Sequence.__name__ = ["bpmjs","Sequence"];
bpmjs.Sequence.__super__ = bpmjs.TaskGroup;
for(var k in bpmjs.TaskGroup.prototype ) bpmjs.Sequence.prototype[k] = bpmjs.TaskGroup.prototype[k];
bpmjs.Sequence.prototype.name = null;
bpmjs.Sequence.prototype.objects = null;
bpmjs.Sequence.prototype.loadingTaskGroup = null;
bpmjs.Sequence.prototype.timer = null;
bpmjs.Sequence.prototype.addExecuteTask = function(phase) {
	$s.push("bpmjs.Sequence::addExecuteTask");
	var $spos = $s.length;
	this.add(new bpmjs.ExecutePhaseTask(this,phase));
	$s.pop();
}
bpmjs.Sequence.prototype.addLoadingTask = function() {
	$s.push("bpmjs.Sequence::addLoadingTask");
	var $spos = $s.length;
	this.loadingTaskGroup = new bpmjs.LoadingTaskGroup(this);
	this.loadingTaskGroup.getMonitor().weight = 1000;
	this.add(this.loadingTaskGroup);
	$s.pop();
}
bpmjs.Sequence.prototype.start = function() {
	$s.push("bpmjs.Sequence::start");
	var $spos = $s.length;
	this.timer.run = $closure(this,"handleProgress");
	bpmjs.TaskGroup.prototype.start.call(this);
	$s.pop();
}
bpmjs.Sequence.prototype.execute = function(phase) {
	$s.push("bpmjs.Sequence::execute");
	var $spos = $s.length;
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
						if(Std["is"](result,bpmjs.Task)) {
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
						$e = [];
						while($s.length >= $spos) $e.unshift($s.pop());
						$s.push($e[0]);
						throw "Phase '" + localPhase + "' " + Type.getClassName(contextObject.type) + "#" + fieldName + " created an error:\n" + Std.string(e);
					}
				}
			}
		}
	}
	$s.pop();
}
bpmjs.Sequence.prototype.handleProgress = function() {
	$s.push("bpmjs.Sequence::handleProgress");
	var $spos = $s.length;
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
	$s.pop();
}
bpmjs.Sequence.prototype.handleComplete = function(task) {
	$s.push("bpmjs.Sequence::handleComplete");
	var $spos = $s.length;
	this.handleProgress();
	this.timer.stop();
	$s.pop();
}
bpmjs.Sequence.prototype.handleError = function(error) {
	$s.push("bpmjs.Sequence::handleError");
	var $spos = $s.length;
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
	$s.pop();
}
bpmjs.Sequence.prototype.__class__ = bpmjs.Sequence;
bpmjs.ExecutePhaseTask = function(sequence,phase) {
	if( sequence === $_ ) return;
	$s.push("bpmjs.ExecutePhaseTask::new");
	var $spos = $s.length;
	bpmjs.Task.call(this);
	this.getMonitor().name = "execute: " + phase;
	this.sequence = sequence;
	this.phase = phase;
	$s.pop();
}
bpmjs.ExecutePhaseTask.__name__ = ["bpmjs","ExecutePhaseTask"];
bpmjs.ExecutePhaseTask.__super__ = bpmjs.Task;
for(var k in bpmjs.Task.prototype ) bpmjs.ExecutePhaseTask.prototype[k] = bpmjs.Task.prototype[k];
bpmjs.ExecutePhaseTask.prototype.sequence = null;
bpmjs.ExecutePhaseTask.prototype.phase = null;
bpmjs.ExecutePhaseTask.prototype.doStart = function() {
	$s.push("bpmjs.ExecutePhaseTask::doStart");
	var $spos = $s.length;
	try {
		this.sequence.execute(this.phase);
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		this.error(this,Std.string(e));
		$s.pop();
		return;
	}
	this.complete();
	$s.pop();
}
bpmjs.ExecutePhaseTask.prototype.__class__ = bpmjs.ExecutePhaseTask;
bpmjs.LoadingTaskGroup = function(sequence) {
	if( sequence === $_ ) return;
	$s.push("bpmjs.LoadingTaskGroup::new");
	var $spos = $s.length;
	bpmjs.TaskGroup.call(this);
	this.getMonitor().name = "loading";
	$s.pop();
}
bpmjs.LoadingTaskGroup.__name__ = ["bpmjs","LoadingTaskGroup"];
bpmjs.LoadingTaskGroup.__super__ = bpmjs.TaskGroup;
for(var k in bpmjs.TaskGroup.prototype ) bpmjs.LoadingTaskGroup.prototype[k] = bpmjs.TaskGroup.prototype[k];
bpmjs.LoadingTaskGroup.prototype.__class__ = bpmjs.LoadingTaskGroup;
Color = function(r,g,b,a) {
	if( r === $_ ) return;
	$s.push("Color::new");
	var $spos = $s.length;
	if(a == null) a = 1.0;
	if(b == null) b = 1.0;
	if(g == null) g = 0.0;
	if(r == null) r = 1.0;
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
	$s.pop();
}
Color.__name__ = ["Color"];
Color.prototype.r = null;
Color.prototype.g = null;
Color.prototype.b = null;
Color.prototype.a = null;
Color.prototype.fromHex = function(hex) {
	$s.push("Color::fromHex");
	var $spos = $s.length;
	this.r = (hex >> 16 & 255) / 255;
	this.g = (hex >> 8 & 255) / 255;
	this.b = (hex & 255) / 255;
	this.a = 1.0;
	$s.pop();
	return this;
	$s.pop();
}
Color.prototype.scaleRGB = function(factor) {
	$s.push("Color::scaleRGB");
	var $spos = $s.length;
	this.r *= factor;
	this.g *= factor;
	this.b *= factor;
	$s.pop();
}
Color.prototype.mixFrom = function(color1,color2,color1Mix) {
	$s.push("Color::mixFrom");
	var $spos = $s.length;
	if(color1Mix < 0) color1Mix = 0;
	if(color1Mix > 1) color1Mix = 1;
	var color2Mix = 1 - color1Mix;
	this.r = color1.r * color1Mix + color2.r * color2Mix;
	this.g = color1.g * color1Mix + color2.g * color2Mix;
	this.b = color1.b * color1Mix + color2.b * color2Mix;
	$s.pop();
}
Color.prototype.toContextRGB = function() {
	$s.push("Color::toContextRGB");
	var $spos = $s.length;
	var $tmp = "rgb(" + this.r * 255 + "," + this.g * 255 + "," + this.b * 255 + ")";
	$s.pop();
	return $tmp;
	$s.pop();
}
Color.prototype.toContextRGBA = function() {
	$s.push("Color::toContextRGBA");
	var $spos = $s.length;
	var $tmp = "rgba(" + Std["int"](this.r * 255) + "," + Std["int"](this.g * 255) + "," + Std["int"](this.b * 255) + "," + this.a + ")";
	$s.pop();
	return $tmp;
	$s.pop();
}
Color.prototype.clone = function() {
	$s.push("Color::clone");
	var $spos = $s.length;
	var $tmp = new Color(this.r,this.g,this.b,this.a);
	$s.pop();
	return $tmp;
	$s.pop();
}
Color.prototype.toString = function() {
	$s.push("Color::toString");
	var $spos = $s.length;
	var $tmp = "Color: " + this.r + "," + this.g + "," + this.b + "," + this.a;
	$s.pop();
	return $tmp;
	$s.pop();
}
Color.prototype.__class__ = Color;
Color.__interfaces__ = [haxe.rtti.Infos];
kumite.time.Time = function(p) {
	if( p === $_ ) return;
	$s.push("kumite.time.Time::new");
	var $spos = $s.length;
	this.reset();
	$s.pop();
}
kumite.time.Time.__name__ = ["kumite","time","Time"];
kumite.time.Time.prototype.ms = null;
kumite.time.Time.prototype.frameMs = null;
kumite.time.Time.prototype.timeScale = null;
kumite.time.Time.prototype.frame = null;
kumite.time.Time.prototype.frameRate = null;
kumite.time.Time.prototype.lastTime = null;
kumite.time.Time.prototype.reset = function() {
	$s.push("kumite.time.Time::reset");
	var $spos = $s.length;
	this.frameRate = 60;
	this.ms = 0;
	this.frameMs = Std["int"](1000 / 60);
	this.timeScale = 1;
	this.frame = 0;
	this.lastTime = Date.now().getTime();
	$s.pop();
}
kumite.time.Time.prototype.tick = function() {
	$s.push("kumite.time.Time::tick");
	var $spos = $s.length;
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
	$s.pop();
}
kumite.time.Time.prototype.tickInPause = function() {
	$s.push("kumite.time.Time::tickInPause");
	var $spos = $s.length;
	var time = Date.now().getTime();
	if(this.lastTime == -1) this.lastTime = time - 100;
	this.frameMs = time - this.lastTime;
	if(Math.isNaN(this.frameMs) || !Math.isFinite(this.frameMs)) this.frameMs = 100;
	this.timeScale = this.frameMs / 1000 * 60;
	if(Math.isNaN(this.timeScale) || !Math.isFinite(this.timeScale)) this.timeScale = 100 / 1000 * 60;
	this.frameRate = 1000 / this.frameMs;
	this.lastTime = time;
	$s.pop();
}
kumite.time.Time.prototype.summand = function(value) {
	$s.push("kumite.time.Time::summand");
	var $spos = $s.length;
	var $tmp = value * this.timeScale;
	$s.pop();
	return $tmp;
	$s.pop();
}
kumite.time.Time.prototype.factor = function(value) {
	$s.push("kumite.time.Time::factor");
	var $spos = $s.length;
	var $tmp = Math.pow(value,this.timeScale);
	$s.pop();
	return $tmp;
	$s.pop();
}
kumite.time.Time.prototype.interpolateTo = function(from,to,f) {
	$s.push("kumite.time.Time::interpolateTo");
	var $spos = $s.length;
	var $tmp = from * (1 - f * this.timeScale) + to * (f * this.timeScale);
	$s.pop();
	return $tmp;
	$s.pop();
}
kumite.time.Time.prototype.interpolateVec3To = function(from,to,f) {
	$s.push("kumite.time.Time::interpolateVec3To");
	var $spos = $s.length;
	from.x = this.interpolateTo(from.x,to.x,f);
	from.y = this.interpolateTo(from.y,to.y,f);
	from.z = this.interpolateTo(from.z,to.z,f);
	$s.pop();
}
kumite.time.Time.prototype.__class__ = kumite.time.Time;
bpmjs.ReflectUtil = function() { }
bpmjs.ReflectUtil.__name__ = ["bpmjs","ReflectUtil"];
bpmjs.ReflectUtil.callMethodWithMetadata = function(object,type,metadata,args) {
	$s.push("bpmjs.ReflectUtil::callMethodWithMetadata");
	var $spos = $s.length;
	var metadatas = haxe.rtti.Meta.getFields(type);
	var _g = 0, _g1 = Reflect.fields(metadatas);
	while(_g < _g1.length) {
		var fieldName = _g1[_g];
		++_g;
		var meta = Reflect.field(metadatas,fieldName);
		if(Reflect.hasField(meta,metadata)) {
			var $tmp = Reflect.field(object,fieldName).apply(object,[]);
			$s.pop();
			return $tmp;
		}
	}
	$s.pop();
	return null;
	$s.pop();
}
bpmjs.ReflectUtil.getClassName = function(object) {
	$s.push("bpmjs.ReflectUtil::getClassName");
	var $spos = $s.length;
	var $tmp = Type.getClassName(Type.getClass(object));
	$s.pop();
	return $tmp;
	$s.pop();
}
bpmjs.ReflectUtil.prototype.__class__ = bpmjs.ReflectUtil;
if(typeof ease=='undefined') ease = {}
ease.Quad = function() { }
ease.Quad.__name__ = ["ease","Quad"];
ease.Quad.easeIn = function(t,b,c,d) {
	$s.push("ease.Quad::easeIn");
	var $spos = $s.length;
	var $tmp = c * (t /= d) * t + b;
	$s.pop();
	return $tmp;
	$s.pop();
}
ease.Quad.easeOut = function(t,b,c,d) {
	$s.push("ease.Quad::easeOut");
	var $spos = $s.length;
	var $tmp = -c * (t /= d) * (t - 2) + b;
	$s.pop();
	return $tmp;
	$s.pop();
}
ease.Quad.easeInOut = function(t,b,c,d) {
	$s.push("ease.Quad::easeInOut");
	var $spos = $s.length;
	if((t /= d / 2) < 1) {
		var $tmp = c / 2 * t * t + b;
		$s.pop();
		return $tmp;
	}
	var $tmp = -c / 2 * (--t * (t - 2) - 1) + b;
	$s.pop();
	return $tmp;
	$s.pop();
}
ease.Quad.prototype.__class__ = ease.Quad;
haxe.Serializer = function(p) {
	if( p === $_ ) return;
	$s.push("haxe.Serializer::new");
	var $spos = $s.length;
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new Hash();
	this.scount = 0;
	$s.pop();
}
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	$s.push("haxe.Serializer::run");
	var $spos = $s.length;
	var s = new haxe.Serializer();
	s.serialize(v);
	var $tmp = s.toString();
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.Serializer.prototype.buf = null;
haxe.Serializer.prototype.cache = null;
haxe.Serializer.prototype.shash = null;
haxe.Serializer.prototype.scount = null;
haxe.Serializer.prototype.useCache = null;
haxe.Serializer.prototype.useEnumIndex = null;
haxe.Serializer.prototype.toString = function() {
	$s.push("haxe.Serializer::toString");
	var $spos = $s.length;
	var $tmp = this.buf.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.Serializer.prototype.serializeString = function(s) {
	$s.push("haxe.Serializer::serializeString");
	var $spos = $s.length;
	var x = this.shash.get(s);
	if(x != null) {
		this.buf.add("R");
		this.buf.add(x);
		$s.pop();
		return;
	}
	this.shash.set(s,this.scount++);
	this.buf.add("y");
	s = StringTools.urlEncode(s);
	this.buf.add(s.length);
	this.buf.add(":");
	this.buf.add(s);
	$s.pop();
}
haxe.Serializer.prototype.serializeRef = function(v) {
	$s.push("haxe.Serializer::serializeRef");
	var $spos = $s.length;
	var vt = typeof(v);
	var _g1 = 0, _g = this.cache.length;
	while(_g1 < _g) {
		var i = _g1++;
		var ci = this.cache[i];
		if(typeof(ci) == vt && ci == v) {
			this.buf.add("r");
			this.buf.add(i);
			$s.pop();
			return true;
		}
	}
	this.cache.push(v);
	$s.pop();
	return false;
	$s.pop();
}
haxe.Serializer.prototype.serializeFields = function(v) {
	$s.push("haxe.Serializer::serializeFields");
	var $spos = $s.length;
	var _g = 0, _g1 = Reflect.fields(v);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		this.serializeString(f);
		this.serialize(Reflect.field(v,f));
	}
	this.buf.add("g");
	$s.pop();
}
haxe.Serializer.prototype.serialize = function(v) {
	$s.push("haxe.Serializer::serialize");
	var $spos = $s.length;
	var $e = (Type["typeof"](v));
	switch( $e[1] ) {
	case 0:
		this.buf.add("n");
		break;
	case 1:
		if(v == 0) {
			this.buf.add("z");
			$s.pop();
			return;
		}
		this.buf.add("i");
		this.buf.add(v);
		break;
	case 2:
		if(Math.isNaN(v)) this.buf.add("k"); else if(!Math.isFinite(v)) this.buf.add(v < 0?"m":"p"); else {
			this.buf.add("d");
			this.buf.add(v);
		}
		break;
	case 3:
		this.buf.add(v?"t":"f");
		break;
	case 6:
		var c = $e[2];
		if(c == String) {
			this.serializeString(v);
			$s.pop();
			return;
		}
		if(this.useCache && this.serializeRef(v)) {
			$s.pop();
			return;
		}
		switch(c) {
		case Array:
			var ucount = 0;
			this.buf.add("a");
			var l = v["length"];
			var _g = 0;
			while(_g < l) {
				var i = _g++;
				if(v[i] == null) ucount++; else {
					if(ucount > 0) {
						if(ucount == 1) this.buf.add("n"); else {
							this.buf.add("u");
							this.buf.add(ucount);
						}
						ucount = 0;
					}
					this.serialize(v[i]);
				}
			}
			if(ucount > 0) {
				if(ucount == 1) this.buf.add("n"); else {
					this.buf.add("u");
					this.buf.add(ucount);
				}
			}
			this.buf.add("h");
			break;
		case List:
			this.buf.add("l");
			var v1 = v;
			var $it0 = v1.iterator();
			while( $it0.hasNext() ) {
				var i = $it0.next();
				this.serialize(i);
			}
			this.buf.add("h");
			break;
		case Date:
			var d = v;
			this.buf.add("v");
			this.buf.add(d.toString());
			break;
		case Hash:
			this.buf.add("b");
			var v1 = v;
			var $it1 = v1.keys();
			while( $it1.hasNext() ) {
				var k = $it1.next();
				this.serializeString(k);
				this.serialize(v1.get(k));
			}
			this.buf.add("h");
			break;
		case IntHash:
			this.buf.add("q");
			var v1 = v;
			var $it2 = v1.keys();
			while( $it2.hasNext() ) {
				var k = $it2.next();
				this.buf.add(":");
				this.buf.add(k);
				this.serialize(v1.get(k));
			}
			this.buf.add("h");
			break;
		case haxe.io.Bytes:
			var v1 = v;
			var i = 0;
			var max = v1.length - 2;
			var chars = "";
			var b64 = haxe.Serializer.BASE64;
			while(i < max) {
				var b1 = v1.b[i++];
				var b2 = v1.b[i++];
				var b3 = v1.b[i++];
				chars += b64.charAt(b1 >> 2) + b64.charAt((b1 << 4 | b2 >> 4) & 63) + b64.charAt((b2 << 2 | b3 >> 6) & 63) + b64.charAt(b3 & 63);
			}
			if(i == max) {
				var b1 = v1.b[i++];
				var b2 = v1.b[i++];
				chars += b64.charAt(b1 >> 2) + b64.charAt((b1 << 4 | b2 >> 4) & 63) + b64.charAt(b2 << 2 & 63);
			} else if(i == max + 1) {
				var b1 = v1.b[i++];
				chars += b64.charAt(b1 >> 2) + b64.charAt(b1 << 4 & 63);
			}
			this.buf.add("s");
			this.buf.add(chars.length);
			this.buf.add(":");
			this.buf.add(chars);
			break;
		default:
			this.cache.pop();
			if(v.hxSerialize != null) {
				this.buf.add("C");
				this.serializeString(Type.getClassName(c));
				this.cache.push(v);
				v.hxSerialize(this);
				this.buf.add("g");
			} else {
				this.buf.add("c");
				this.serializeString(Type.getClassName(c));
				this.cache.push(v);
				this.serializeFields(v);
			}
		}
		break;
	case 4:
		if(this.useCache && this.serializeRef(v)) {
			$s.pop();
			return;
		}
		this.buf.add("o");
		this.serializeFields(v);
		break;
	case 7:
		var e = $e[2];
		if(this.useCache && this.serializeRef(v)) {
			$s.pop();
			return;
		}
		this.cache.pop();
		this.buf.add(this.useEnumIndex?"j":"w");
		this.serializeString(Type.getEnumName(e));
		if(this.useEnumIndex) {
			this.buf.add(":");
			this.buf.add(v[1]);
		} else this.serializeString(v[0]);
		this.buf.add(":");
		var l = v["length"];
		this.buf.add(l - 2);
		var _g = 2;
		while(_g < l) {
			var i = _g++;
			this.serialize(v[i]);
		}
		this.cache.push(v);
		break;
	case 5:
		throw "Cannot serialize function";
		break;
	default:
		throw "Cannot serialize " + Std.string(v);
	}
	$s.pop();
}
haxe.Serializer.prototype.serializeException = function(e) {
	$s.push("haxe.Serializer::serializeException");
	var $spos = $s.length;
	this.buf.add("x");
	this.serialize(e);
	$s.pop();
}
haxe.Serializer.prototype.__class__ = haxe.Serializer;
reflect.Field = function(field,definedInClass,owner) {
	if( field === $_ ) return;
	$s.push("reflect.Field::new");
	var $spos = $s.length;
	this.field = field;
	this.definedInClass = definedInClass;
	this.owner = owner;
	$s.pop();
}
reflect.Field.__name__ = ["reflect","Field"];
reflect.Field.prototype.owner = null;
reflect.Field.prototype.name = null;
reflect.Field.prototype.type = null;
reflect.Field.prototype.clazz = null;
reflect.Field.prototype.field = null;
reflect.Field.prototype.definedInClass = null;
reflect.Field.prototype.hasMetadata = function(name) {
	$s.push("reflect.Field::hasMetadata");
	var $spos = $s.length;
	var declaredType = reflect.ClassInfo.forName(this.definedInClass);
	var metadatas = haxe.rtti.Meta.getFields(declaredType.type);
	var _g = 0, _g1 = Reflect.fields(metadatas);
	while(_g < _g1.length) {
		var fieldName = _g1[_g];
		++_g;
		if(fieldName == this.field.name) {
			var meta = Reflect.field(metadatas,fieldName);
			if(Reflect.hasField(meta,name)) {
				$s.pop();
				return true;
			}
		}
	}
	$s.pop();
	return false;
	$s.pop();
}
reflect.Field.prototype.getOwner = function() {
	$s.push("reflect.Field::getOwner");
	var $spos = $s.length;
	var $tmp = this.owner;
	$s.pop();
	return $tmp;
	$s.pop();
}
reflect.Field.prototype.getName = function() {
	$s.push("reflect.Field::getName");
	var $spos = $s.length;
	var $tmp = this.field.name;
	$s.pop();
	return $tmp;
	$s.pop();
}
reflect.Field.prototype.getType = function() {
	$s.push("reflect.Field::getType");
	var $spos = $s.length;
	var $tmp = reflect.ClassInfo.forCType(this.field.type);
	$s.pop();
	return $tmp;
	$s.pop();
}
reflect.Field.prototype.getClass = function() {
	$s.push("reflect.Field::getClass");
	var $spos = $s.length;
	var type = reflect.ClassInfo.forCType(this.field.type);
	var $tmp = type == null?null:type.type;
	$s.pop();
	return $tmp;
	$s.pop();
}
reflect.Field.prototype.__class__ = reflect.Field;
reflect.Field.__interfaces__ = [reflect.MetadataAware];
haxe.rtti.XmlParser = function(p) {
	if( p === $_ ) return;
	$s.push("haxe.rtti.XmlParser::new");
	var $spos = $s.length;
	this.root = new Array();
	$s.pop();
}
haxe.rtti.XmlParser.__name__ = ["haxe","rtti","XmlParser"];
haxe.rtti.XmlParser.prototype.root = null;
haxe.rtti.XmlParser.prototype.curplatform = null;
haxe.rtti.XmlParser.prototype.sort = function(l) {
	$s.push("haxe.rtti.XmlParser::sort");
	var $spos = $s.length;
	if(l == null) l = this.root;
	l.sort(function(e1,e2) {
		$s.push("haxe.rtti.XmlParser::sort@40");
		var $spos = $s.length;
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
		if(n1 > n2) {
			$s.pop();
			return 1;
		}
		$s.pop();
		return -1;
		$s.pop();
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
	$s.pop();
}
haxe.rtti.XmlParser.prototype.sortFields = function(fl) {
	$s.push("haxe.rtti.XmlParser::sortFields");
	var $spos = $s.length;
	var a = Lambda.array(fl);
	a.sort(function(f1,f2) {
		$s.push("haxe.rtti.XmlParser::sortFields@66");
		var $spos = $s.length;
		var v1 = haxe.rtti.TypeApi.isVar(f1.type);
		var v2 = haxe.rtti.TypeApi.isVar(f2.type);
		if(v1 && !v2) {
			$s.pop();
			return -1;
		}
		if(v2 && !v1) {
			$s.pop();
			return 1;
		}
		if(f1.name == "new") {
			$s.pop();
			return -1;
		}
		if(f2.name == "new") {
			$s.pop();
			return 1;
		}
		if(f1.name > f2.name) {
			$s.pop();
			return 1;
		}
		$s.pop();
		return -1;
		$s.pop();
	});
	var $tmp = Lambda.list(a);
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.process = function(x,platform) {
	$s.push("haxe.rtti.XmlParser::process");
	var $spos = $s.length;
	this.curplatform = platform;
	this.xroot(new haxe.xml.Fast(x));
	$s.pop();
}
haxe.rtti.XmlParser.prototype.mergeRights = function(f1,f2) {
	$s.push("haxe.rtti.XmlParser::mergeRights");
	var $spos = $s.length;
	if(f1.get == haxe.rtti.Rights.RInline && f1.set == haxe.rtti.Rights.RNo && f2.get == haxe.rtti.Rights.RNormal && f2.set == haxe.rtti.Rights.RMethod) {
		f1.get = haxe.rtti.Rights.RNormal;
		f1.set = haxe.rtti.Rights.RMethod;
		$s.pop();
		return true;
	}
	$s.pop();
	return false;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.mergeFields = function(f,f2) {
	$s.push("haxe.rtti.XmlParser::mergeFields");
	var $spos = $s.length;
	var $tmp = haxe.rtti.TypeApi.fieldEq(f,f2) || f.name == f2.name && (this.mergeRights(f,f2) || this.mergeRights(f2,f)) && haxe.rtti.TypeApi.fieldEq(f,f2);
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.mergeClasses = function(c,c2) {
	$s.push("haxe.rtti.XmlParser::mergeClasses");
	var $spos = $s.length;
	if(c.isInterface != c2.isInterface) {
		$s.pop();
		return false;
	}
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
	$s.pop();
	return true;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.mergeEnums = function(e,e2) {
	$s.push("haxe.rtti.XmlParser::mergeEnums");
	var $spos = $s.length;
	if(e.isExtern != e2.isExtern) {
		$s.pop();
		return false;
	}
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
		if(found == null) {
			$s.pop();
			return false;
		}
		if(this.curplatform != null) found.platforms.add(this.curplatform);
	}
	$s.pop();
	return true;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.mergeTypedefs = function(t,t2) {
	$s.push("haxe.rtti.XmlParser::mergeTypedefs");
	var $spos = $s.length;
	if(this.curplatform == null) {
		$s.pop();
		return false;
	}
	t.platforms.add(this.curplatform);
	t.types.set(this.curplatform,t2.type);
	$s.pop();
	return true;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.merge = function(t) {
	$s.push("haxe.rtti.XmlParser::merge");
	var $spos = $s.length;
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
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
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
						if(this.mergeClasses(c,c2)) {
							$s.pop();
							return;
						}
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
						if(this.mergeEnums(e,e2)) {
							$s.pop();
							return;
						}
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
						if(this.mergeTypedefs(td,td2)) {
							$s.pop();
							return;
						}
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
	$s.pop();
}
haxe.rtti.XmlParser.prototype.mkPath = function(p) {
	$s.push("haxe.rtti.XmlParser::mkPath");
	var $spos = $s.length;
	$s.pop();
	return p;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.mkTypeParams = function(p) {
	$s.push("haxe.rtti.XmlParser::mkTypeParams");
	var $spos = $s.length;
	var pl = p.split(":");
	if(pl[0] == "") {
		var $tmp = new Array();
		$s.pop();
		return $tmp;
	}
	$s.pop();
	return pl;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.mkRights = function(r) {
	$s.push("haxe.rtti.XmlParser::mkRights");
	var $spos = $s.length;
	var $tmp = (function($this) {
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
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xerror = function(c) {
	$s.push("haxe.rtti.XmlParser::xerror");
	var $spos = $s.length;
	var $tmp = (function($this) {
		var $r;
		throw "Invalid " + c.getName();
		return $r;
	}(this));
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xroot = function(x) {
	$s.push("haxe.rtti.XmlParser::xroot");
	var $spos = $s.length;
	var $it0 = x.x.elements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		this.merge(this.processElement(c));
	}
	$s.pop();
}
haxe.rtti.XmlParser.prototype.processElement = function(x) {
	$s.push("haxe.rtti.XmlParser::processElement");
	var $spos = $s.length;
	var c = new haxe.xml.Fast(x);
	var $tmp = (function($this) {
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
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xpath = function(x) {
	$s.push("haxe.rtti.XmlParser::xpath");
	var $spos = $s.length;
	var path = this.mkPath(x.att.resolve("path"));
	var params = new List();
	var $it0 = x.getElements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		params.add(this.xtype(c));
	}
	var $tmp = { path : path, params : params};
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xclass = function(x) {
	$s.push("haxe.rtti.XmlParser::xclass");
	var $spos = $s.length;
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
	var $tmp = { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), isInterface : x.x.exists("interface"), params : this.mkTypeParams(x.att.resolve("params")), superClass : csuper, interfaces : interfaces, fields : fields, statics : statics, tdynamic : tdynamic, platforms : this.defplat()};
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xclassfield = function(x) {
	$s.push("haxe.rtti.XmlParser::xclassfield");
	var $spos = $s.length;
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
	var $tmp = { name : x.getName(), type : t, isPublic : x.x.exists("public"), isOverride : x.x.exists("override"), doc : doc, get : x.has.resolve("get")?this.mkRights(x.att.resolve("get")):haxe.rtti.Rights.RNormal, set : x.has.resolve("set")?this.mkRights(x.att.resolve("set")):haxe.rtti.Rights.RNormal, params : x.has.resolve("params")?this.mkTypeParams(x.att.resolve("params")):null, platforms : this.defplat()};
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xenum = function(x) {
	$s.push("haxe.rtti.XmlParser::xenum");
	var $spos = $s.length;
	var cl = new List();
	var doc = null;
	var $it0 = x.getElements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		if(c.getName() == "haxe_doc") doc = c.getInnerData(); else cl.add(this.xenumfield(c));
	}
	var $tmp = { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), params : this.mkTypeParams(x.att.resolve("params")), constructors : cl, platforms : this.defplat()};
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xenumfield = function(x) {
	$s.push("haxe.rtti.XmlParser::xenumfield");
	var $spos = $s.length;
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
	var $tmp = { name : x.getName(), args : args, doc : xdoc == null?null:new haxe.xml.Fast(xdoc).getInnerData(), platforms : this.defplat()};
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xtypedef = function(x) {
	$s.push("haxe.rtti.XmlParser::xtypedef");
	var $spos = $s.length;
	var doc = null;
	var t = null;
	var $it0 = x.getElements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		if(c.getName() == "haxe_doc") doc = c.getInnerData(); else t = this.xtype(c);
	}
	var types = new Hash();
	if(this.curplatform != null) types.set(this.curplatform,t);
	var $tmp = { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), params : this.mkTypeParams(x.att.resolve("params")), type : t, types : types, platforms : this.defplat()};
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xtype = function(x) {
	$s.push("haxe.rtti.XmlParser::xtype");
	var $spos = $s.length;
	var $tmp = (function($this) {
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
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xtypeparams = function(x) {
	$s.push("haxe.rtti.XmlParser::xtypeparams");
	var $spos = $s.length;
	var p = new List();
	var $it0 = x.getElements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		p.add(this.xtype(c));
	}
	$s.pop();
	return p;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.defplat = function() {
	$s.push("haxe.rtti.XmlParser::defplat");
	var $spos = $s.length;
	var l = new List();
	if(this.curplatform != null) l.add(this.curplatform);
	$s.pop();
	return l;
	$s.pop();
}
haxe.rtti.XmlParser.prototype.__class__ = haxe.rtti.XmlParser;
bpmjs.ContextConfig = function(p) {
	$s.push("bpmjs.ContextConfig::new");
	var $spos = $s.length;
	$s.pop();
}
bpmjs.ContextConfig.__name__ = ["bpmjs","ContextConfig"];
bpmjs.ContextConfig.prototype.frontMessenger = null;
bpmjs.ContextConfig.prototype.__class__ = bpmjs.ContextConfig;
kumite.stage.StageResizeMessage = function(p) {
	$s.push("kumite.stage.StageResizeMessage::new");
	var $spos = $s.length;
	$s.pop();
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
	$s.push("kumite.stage.Config::new");
	var $spos = $s.length;
	this.stage = new kumite.stage.Stage();
	this.stageResizeAction = new kumite.stage.StageResizeAction();
	$s.pop();
}
kumite.stage.Config.__name__ = ["kumite","stage","Config"];
kumite.stage.Config.prototype.stage = null;
kumite.stage.Config.prototype.stageResizeAction = null;
kumite.stage.Config.prototype.__class__ = kumite.stage.Config;
kumite.stage.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.launch.Launcher = function(p) {
	$s.push("kumite.launch.Launcher::new");
	var $spos = $s.length;
	$s.pop();
}
kumite.launch.Launcher.__name__ = ["kumite","launch","Launcher"];
kumite.launch.Launcher.prototype.sequencer = null;
kumite.launch.Launcher.prototype.handlePostComplete = function() {
	$s.push("kumite.launch.Launcher::handlePostComplete");
	var $spos = $s.length;
	this.sequencer.start("boot");
	$s.pop();
}
kumite.launch.Launcher.prototype.showError = function(message) {
	$s.push("kumite.launch.Launcher::showError");
	var $spos = $s.length;
	{
		Log.posInfo = { fileName : "Launcher.hx", lineNumber : 26, className : "kumite.launch.Launcher", methodName : "showError"};
		if(Log.filter(LogLevel.ERROR)) {
			Log.fetchInput(message,null,null,null,null,null,null);
			console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
			Log.displayError(Log.createErrorMessage());
		}
	}
	$s.pop();
}
kumite.launch.Launcher.prototype.handleFinish = function() {
	$s.push("kumite.launch.Launcher::handleFinish");
	var $spos = $s.length;
	$s.pop();
}
kumite.launch.Launcher.prototype.__class__ = kumite.launch.Launcher;
kumite.launch.Launcher.__interfaces__ = [haxe.rtti.Infos];
kumite.presentation.Hitarea = function(p) {
	$s.push("kumite.presentation.Hitarea::new");
	var $spos = $s.length;
	$s.pop();
}
kumite.presentation.Hitarea.__name__ = ["kumite","presentation","Hitarea"];
kumite.presentation.Hitarea.prototype.x = null;
kumite.presentation.Hitarea.prototype.y = null;
kumite.presentation.Hitarea.prototype.width = null;
kumite.presentation.Hitarea.prototype.height = null;
kumite.presentation.Hitarea.prototype.location = null;
kumite.presentation.Hitarea.prototype.__class__ = kumite.presentation.Hitarea;
Vec3 = function(x,y,z) {
	if( x === $_ ) return;
	$s.push("Vec3::new");
	var $spos = $s.length;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.z = z;
	$s.pop();
}
Vec3.__name__ = ["Vec3"];
Vec3.prototype.x = null;
Vec3.prototype.y = null;
Vec3.prototype.z = null;
Vec3.prototype.scale = function(factor) {
	$s.push("Vec3::scale");
	var $spos = $s.length;
	this.x *= factor;
	this.y *= factor;
	this.z *= factor;
	$s.pop();
}
Vec3.prototype.multiply = function(x,y,z) {
	$s.push("Vec3::multiply");
	var $spos = $s.length;
	this.x *= x;
	this.y *= y;
	this.z *= z;
	$s.pop();
}
Vec3.prototype.subtract = function(x,y,z) {
	$s.push("Vec3::subtract");
	var $spos = $s.length;
	this.x -= x;
	this.y -= y;
	this.z -= z;
	$s.pop();
	return this;
	$s.pop();
}
Vec3.prototype.normalize = function() {
	$s.push("Vec3::normalize");
	var $spos = $s.length;
	var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	this.x /= length;
	this.y /= length;
	this.z /= length;
	$s.pop();
	return this;
	$s.pop();
}
Vec3.prototype.getLength = function() {
	$s.push("Vec3::getLength");
	var $spos = $s.length;
	var $tmp = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	$s.pop();
	return $tmp;
	$s.pop();
}
Vec3.prototype.cross = function(vec) {
	$s.push("Vec3::cross");
	var $spos = $s.length;
	var x = this.y * vec.z - this.z * vec.y;
	var y = this.z * vec.x - this.x * vec.z;
	var z = this.x * vec.y - this.y * vec.x;
	var $tmp = new Vec3(x,y,z);
	$s.pop();
	return $tmp;
	$s.pop();
}
Vec3.prototype.dot = function(vec) {
	$s.push("Vec3::dot");
	var $spos = $s.length;
	var $tmp = this.x * vec.x + this.y * vec.y + this.z * vec.z;
	$s.pop();
	return $tmp;
	$s.pop();
}
Vec3.prototype.equals = function(vec) {
	$s.push("Vec3::equals");
	var $spos = $s.length;
	var $tmp = this.x == vec.x && this.y == vec.y && this.z == vec.z;
	$s.pop();
	return $tmp;
	$s.pop();
}
Vec3.prototype.transform = function(matrix) {
	$s.push("Vec3::transform");
	var $spos = $s.length;
	var x1 = this.x, y1 = this.y, z1 = this.z;
	this.x = matrix.buffer[0] * x1 + matrix.buffer[4] * y1 + matrix.buffer[8] * z1 + matrix.buffer[12];
	this.y = matrix.buffer[1] * x1 + matrix.buffer[5] * y1 + matrix.buffer[9] * z1 + matrix.buffer[13];
	this.z = matrix.buffer[2] * x1 + matrix.buffer[6] * y1 + matrix.buffer[10] * z1 + matrix.buffer[14];
	$s.pop();
}
Vec3.prototype.setFrom = function(value,vec3) {
	$s.push("Vec3::setFrom");
	var $spos = $s.length;
	if(value != null) {
		this.x = value;
		this.y = value;
		this.z = value;
	} else if(vec3 != null) {
		this.x = vec3.x;
		this.y = vec3.y;
		this.z = vec3.z;
	}
	$s.pop();
}
Vec3.prototype.clone = function() {
	$s.push("Vec3::clone");
	var $spos = $s.length;
	var $tmp = new Vec3(this.x,this.y,this.z);
	$s.pop();
	return $tmp;
	$s.pop();
}
Vec3.prototype.toString = function() {
	$s.push("Vec3::toString");
	var $spos = $s.length;
	var $tmp = "[Vec3 " + " x: " + this.x + " y: " + this.y + " z: " + this.z + "]";
	$s.pop();
	return $tmp;
	$s.pop();
}
Vec3.prototype.__class__ = Vec3;
LogFilter = function() { }
LogFilter.__name__ = ["LogFilter"];
LogFilter.prototype.enabled = null;
LogFilter.prototype.__class__ = LogFilter;
LogLevel = function(value) {
	if( value === $_ ) return;
	$s.push("LogLevel::new");
	var $spos = $s.length;
	this.value = value;
	$s.pop();
}
LogLevel.__name__ = ["LogLevel"];
LogLevel.prototype.value = null;
LogLevel.prototype.isSmallerOrEqual = function(level) {
	$s.push("LogLevel::isSmallerOrEqual");
	var $spos = $s.length;
	var $tmp = this.value <= level.value;
	$s.pop();
	return $tmp;
	$s.pop();
}
LogLevel.prototype.__class__ = LogLevel;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	$s.push("Reflect::hasField");
	var $spos = $s.length;
	if(o.hasOwnProperty != null) {
		var $tmp = o.hasOwnProperty(field);
		$s.pop();
		return $tmp;
	}
	var arr = Reflect.fields(o);
	var $it0 = arr.iterator();
	while( $it0.hasNext() ) {
		var t = $it0.next();
		if(t == field) {
			$s.pop();
			return true;
		}
	}
	$s.pop();
	return false;
	$s.pop();
}
Reflect.field = function(o,field) {
	$s.push("Reflect::field");
	var $spos = $s.length;
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
	}
	$s.pop();
	return v;
	$s.pop();
}
Reflect.setField = function(o,field,value) {
	$s.push("Reflect::setField");
	var $spos = $s.length;
	o[field] = value;
	$s.pop();
}
Reflect.callMethod = function(o,func,args) {
	$s.push("Reflect::callMethod");
	var $spos = $s.length;
	var $tmp = func.apply(o,args);
	$s.pop();
	return $tmp;
	$s.pop();
}
Reflect.fields = function(o) {
	$s.push("Reflect::fields");
	var $spos = $s.length;
	if(o == null) {
		var $tmp = new Array();
		$s.pop();
		return $tmp;
	}
	var a = new Array();
	if(o.hasOwnProperty) {
		for(var i in o) if( o.hasOwnProperty(i) ) a.push(i);
	} else {
		var t;
		try {
			t = o.__proto__;
		} catch( e ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			t = null;
		}
		if(t != null) o.__proto__ = null;
		for(var i in o) if( i != "__proto__" ) a.push(i);
		if(t != null) o.__proto__ = t;
	}
	$s.pop();
	return a;
	$s.pop();
}
Reflect.isFunction = function(f) {
	$s.push("Reflect::isFunction");
	var $spos = $s.length;
	var $tmp = typeof(f) == "function" && f.__name__ == null;
	$s.pop();
	return $tmp;
	$s.pop();
}
Reflect.compare = function(a,b) {
	$s.push("Reflect::compare");
	var $spos = $s.length;
	var $tmp = a == b?0:a > b?1:-1;
	$s.pop();
	return $tmp;
	$s.pop();
}
Reflect.compareMethods = function(f1,f2) {
	$s.push("Reflect::compareMethods");
	var $spos = $s.length;
	if(f1 == f2) {
		$s.pop();
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		$s.pop();
		return false;
	}
	var $tmp = f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
	$s.pop();
	return $tmp;
	$s.pop();
}
Reflect.isObject = function(v) {
	$s.push("Reflect::isObject");
	var $spos = $s.length;
	if(v == null) {
		$s.pop();
		return false;
	}
	var t = typeof(v);
	var $tmp = t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
	$s.pop();
	return $tmp;
	$s.pop();
}
Reflect.deleteField = function(o,f) {
	$s.push("Reflect::deleteField");
	var $spos = $s.length;
	if(!Reflect.hasField(o,f)) {
		$s.pop();
		return false;
	}
	delete(o[f]);
	$s.pop();
	return true;
	$s.pop();
}
Reflect.copy = function(o) {
	$s.push("Reflect::copy");
	var $spos = $s.length;
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	$s.pop();
	return o2;
	$s.pop();
}
Reflect.makeVarArgs = function(f) {
	$s.push("Reflect::makeVarArgs");
	var $spos = $s.length;
	var $tmp = function() {
		$s.push("Reflect::makeVarArgs@108");
		var $spos = $s.length;
		var a = new Array();
		var _g1 = 0, _g = arguments.length;
		while(_g1 < _g) {
			var i = _g1++;
			a.push(arguments[i]);
		}
		var $tmp = f(a);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$s.pop();
	return $tmp;
	$s.pop();
}
Reflect.prototype.__class__ = Reflect;
bpmjs.FrontMessenger = function() { }
bpmjs.FrontMessenger.__name__ = ["bpmjs","FrontMessenger"];
bpmjs.FrontMessenger.prototype.addMessenger = null;
bpmjs.FrontMessenger.prototype.addReceiver = null;
bpmjs.FrontMessenger.prototype.__class__ = bpmjs.FrontMessenger;
bpmjs.DefaultFrontMessenger = function(p) {
	if( p === $_ ) return;
	$s.push("bpmjs.DefaultFrontMessenger::new");
	var $spos = $s.length;
	this.receivers = new Array();
	$s.pop();
}
bpmjs.DefaultFrontMessenger.__name__ = ["bpmjs","DefaultFrontMessenger"];
bpmjs.DefaultFrontMessenger.prototype.receivers = null;
bpmjs.DefaultFrontMessenger.prototype.addMessenger = function(messenger) {
	$s.push("bpmjs.DefaultFrontMessenger::addMessenger");
	var $spos = $s.length;
	{
		Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 21, className : "bpmjs.DefaultFrontMessenger", methodName : "addMessenger"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(Type.getClassName(Type.getClass(messenger)),null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	messenger.addReceiver(null,$closure(this,"handleMessage"));
	$s.pop();
}
bpmjs.DefaultFrontMessenger.prototype.addReceiver = function(receivingObject,methodName,type) {
	$s.push("bpmjs.DefaultFrontMessenger::addReceiver");
	var $spos = $s.length;
	{
		Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 27, className : "bpmjs.DefaultFrontMessenger", methodName : "addReceiver"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(Type.getClassName(Type.getClass(receivingObject)) + "#" + methodName,Type.getClassName(type),null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	this.receivers.push(new bpmjs._FrontMessenger.Receiver(receivingObject,methodName,type));
	$s.pop();
}
bpmjs.DefaultFrontMessenger.prototype.handleMessage = function(message) {
	$s.push("bpmjs.DefaultFrontMessenger::handleMessage");
	var $spos = $s.length;
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
	$s.pop();
}
bpmjs.DefaultFrontMessenger.prototype.__class__ = bpmjs.DefaultFrontMessenger;
bpmjs.DefaultFrontMessenger.__interfaces__ = [bpmjs.FrontMessenger];
if(!bpmjs._FrontMessenger) bpmjs._FrontMessenger = {}
bpmjs._FrontMessenger.Receiver = function(receiver,methodName,type) {
	if( receiver === $_ ) return;
	$s.push("bpmjs._FrontMessenger.Receiver::new");
	var $spos = $s.length;
	this.receiver = receiver;
	this.type = type;
	this.method = Reflect.field(receiver,methodName);
	this.methodName = methodName;
	$s.pop();
}
bpmjs._FrontMessenger.Receiver.__name__ = ["bpmjs","_FrontMessenger","Receiver"];
bpmjs._FrontMessenger.Receiver.prototype.receiver = null;
bpmjs._FrontMessenger.Receiver.prototype.method = null;
bpmjs._FrontMessenger.Receiver.prototype.methodName = null;
bpmjs._FrontMessenger.Receiver.prototype.type = null;
bpmjs._FrontMessenger.Receiver.prototype.matches = function(message) {
	$s.push("bpmjs._FrontMessenger.Receiver::matches");
	var $spos = $s.length;
	var $tmp = Type.getClass(message) == this.type;
	$s.pop();
	return $tmp;
	$s.pop();
}
bpmjs._FrontMessenger.Receiver.prototype.execute = function(message) {
	$s.push("bpmjs._FrontMessenger.Receiver::execute");
	var $spos = $s.length;
	{
		Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 66, className : "bpmjs._FrontMessenger.Receiver", methodName : "execute"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(Type.getClassName(Type.getClass(this.receiver)) + "#" + this.methodName,null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	this.method.apply(this.receiver,[message]);
	$s.pop();
}
bpmjs._FrontMessenger.Receiver.prototype.__class__ = bpmjs._FrontMessenger.Receiver;
kumite.presentation.PresentationConfig = function(p) {
	if( p === $_ ) return;
	$s.push("kumite.presentation.PresentationConfig::new");
	var $spos = $s.length;
	this.presentation = new kumite.presentation.Presentation();
	this.presentation.slides.push(new kumite.presentation.ContainerSlide().addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/1.Britzpetermann/1Britzpetermann.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/1.Britzpetermann/2Britzpetermann.jpg")));
	this.presentation.slides.push(new kumite.presentation.ContainerSlide().addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/2.Schau!/2.1.Schau.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/2.Schau!/2.2.Schau.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/2.Schau!/2.3.Schau.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/2.Schau!/2.4.Schau.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/2.Schau!/2.5.Schau.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/2.Schau!/2.6.Schau.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/2.Schau!/2.7.Schau.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/2.Schau!/2.8.Schau.jpg").addHitArea(450,350,770,190,"http://www.flickr.com/photos/britzpetermann").addHitArea(450,545,770,200,"http://vimeo.com/britzpetermann")));
	this.presentation.slides.push(new kumite.presentation.ContainerSlide().addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/3.Akemi/3.1.Akemi.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/3.Akemi/3.2.Akemi.jpg").addHitArea(680,655,300,100,"http://static.britzpetermann.com/experiments/akemi/")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/3.Akemi/3.3.AkemiHelsinki.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/3.Akemi/3.4.AkemiHelsinki.jpg")));
	this.presentation.slides.push(new kumite.presentation.ContainerSlide().addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/4.Karlo/4.1.Karlo.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/4.Karlo/4.2.Karlo.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/4.Karlo/4.3.Karlo.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/4.Karlo/4.4.Karlo.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/4.Karlo/4.5.Karlo.jpg")).addSlide(new kumite.presentation.ImageSlide("data/presentation/Screens/4.Karlo/4.6.Karlo.jpg")));
	this.presentation.slides.push(new kumite.presentation.ImageSlide("data/presentation/Screens/6.Fin.jpg"));
	this.slideNavigator = new kumite.presentation.SlideNavigator();
	$s.pop();
}
kumite.presentation.PresentationConfig.__name__ = ["kumite","presentation","PresentationConfig"];
kumite.presentation.PresentationConfig.prototype.presentation = null;
kumite.presentation.PresentationConfig.prototype.slideNavigator = null;
kumite.presentation.PresentationConfig.prototype.__class__ = kumite.presentation.PresentationConfig;
kumite.presentation.PresentationConfig.__interfaces__ = [haxe.rtti.Infos];
ERegFilter = function(level,r) {
	if( level === $_ ) return;
	$s.push("ERegFilter::new");
	var $spos = $s.length;
	this.level = level;
	this.r = r;
	$s.pop();
}
ERegFilter.__name__ = ["ERegFilter"];
ERegFilter.prototype.level = null;
ERegFilter.prototype.r = null;
ERegFilter.prototype.enabled = function(input,i,level) {
	$s.push("ERegFilter::enabled");
	var $spos = $s.length;
	var sender = i.className + "." + i.methodName;
	var matches = this.r.match(sender);
	if(!matches) {
		$s.pop();
		return input;
	}
	var $tmp = matches && this.level.isSmallerOrEqual(level);
	$s.pop();
	return $tmp;
	$s.pop();
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
	$s.push("haxe.Stack::callStack");
	var $spos = $s.length;
	var $tmp = haxe.Stack.makeStack("$s");
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.Stack.exceptionStack = function() {
	$s.push("haxe.Stack::exceptionStack");
	var $spos = $s.length;
	var $tmp = haxe.Stack.makeStack("$e");
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.Stack.toString = function(stack) {
	$s.push("haxe.Stack::toString");
	var $spos = $s.length;
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b[b.b.length] = "\nCalled from " == null?"null":"\nCalled from ";
		haxe.Stack.itemToString(b,s);
	}
	var $tmp = b.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.Stack.itemToString = function(b,s) {
	$s.push("haxe.Stack::itemToString");
	var $spos = $s.length;
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
	$s.pop();
}
haxe.Stack.makeStack = function(s) {
	$s.push("haxe.Stack::makeStack");
	var $spos = $s.length;
	var a = (function($this) {
		var $r;
		try {
			$r = eval(s);
		} catch( e ) {
			$r = (function($this) {
				var $r;
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				$r = [];
				return $r;
			}($this));
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
	$s.pop();
	return m;
	$s.pop();
}
haxe.Stack.prototype.__class__ = haxe.Stack;
haxe.FastCell = function(elt,next) {
	if( elt === $_ ) return;
	$s.push("haxe.FastCell::new");
	var $spos = $s.length;
	this.elt = elt;
	this.next = next;
	$s.pop();
}
haxe.FastCell.__name__ = ["haxe","FastCell"];
haxe.FastCell.prototype.elt = null;
haxe.FastCell.prototype.next = null;
haxe.FastCell.prototype.__class__ = haxe.FastCell;
haxe.FastList = function(p) {
	$s.push("haxe.FastList::new");
	var $spos = $s.length;
	$s.pop();
}
haxe.FastList.__name__ = ["haxe","FastList"];
haxe.FastList.prototype.head = null;
haxe.FastList.prototype.add = function(item) {
	$s.push("haxe.FastList::add");
	var $spos = $s.length;
	this.head = new haxe.FastCell(item,this.head);
	$s.pop();
}
haxe.FastList.prototype.first = function() {
	$s.push("haxe.FastList::first");
	var $spos = $s.length;
	var $tmp = this.head == null?null:this.head.elt;
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.FastList.prototype.pop = function() {
	$s.push("haxe.FastList::pop");
	var $spos = $s.length;
	var k = this.head;
	if(k == null) {
		$s.pop();
		return null;
	} else {
		this.head = k.next;
		var $tmp = k.elt;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.FastList.prototype.isEmpty = function() {
	$s.push("haxe.FastList::isEmpty");
	var $spos = $s.length;
	var $tmp = this.head == null;
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.FastList.prototype.remove = function(v) {
	$s.push("haxe.FastList::remove");
	var $spos = $s.length;
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
	var $tmp = l != null;
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.FastList.prototype.iterator = function() {
	$s.push("haxe.FastList::iterator");
	var $spos = $s.length;
	var l = this.head;
	var $tmp = { hasNext : function() {
		$s.push("haxe.FastList::iterator@126");
		var $spos = $s.length;
		var $tmp = l != null;
		$s.pop();
		return $tmp;
		$s.pop();
	}, next : function() {
		$s.push("haxe.FastList::iterator@129");
		var $spos = $s.length;
		var k = l;
		l = k.next;
		var $tmp = k.elt;
		$s.pop();
		return $tmp;
		$s.pop();
	}};
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.FastList.prototype.toString = function() {
	$s.push("haxe.FastList::toString");
	var $spos = $s.length;
	var a = new Array();
	var l = this.head;
	while(l != null) {
		a.push(l.elt);
		l = l.next;
	}
	var $tmp = "{" + a.join(",") + "}";
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.FastList.prototype.__class__ = haxe.FastList;
IntIter = function(min,max) {
	if( min === $_ ) return;
	$s.push("IntIter::new");
	var $spos = $s.length;
	this.min = min;
	this.max = max;
	$s.pop();
}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	$s.push("IntIter::hasNext");
	var $spos = $s.length;
	var $tmp = this.min < this.max;
	$s.pop();
	return $tmp;
	$s.pop();
}
IntIter.prototype.next = function() {
	$s.push("IntIter::next");
	var $spos = $s.length;
	var $tmp = this.min++;
	$s.pop();
	return $tmp;
	$s.pop();
}
IntIter.prototype.__class__ = IntIter;
if(!haxe.xml) haxe.xml = {}
if(!haxe.xml._Fast) haxe.xml._Fast = {}
haxe.xml._Fast.NodeAccess = function(x) {
	if( x === $_ ) return;
	$s.push("haxe.xml._Fast.NodeAccess::new");
	var $spos = $s.length;
	this.__x = x;
	$s.pop();
}
haxe.xml._Fast.NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe.xml._Fast.NodeAccess.prototype.__x = null;
haxe.xml._Fast.NodeAccess.prototype.resolve = function(name) {
	$s.push("haxe.xml._Fast.NodeAccess::resolve");
	var $spos = $s.length;
	var x = this.__x.elementsNamed(name).next();
	if(x == null) {
		var xname = this.__x.nodeType == Xml.Document?"Document":this.__x.getNodeName();
		throw xname + " is missing element " + name;
	}
	var $tmp = new haxe.xml.Fast(x);
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.xml._Fast.NodeAccess.prototype.__class__ = haxe.xml._Fast.NodeAccess;
haxe.xml._Fast.AttribAccess = function(x) {
	if( x === $_ ) return;
	$s.push("haxe.xml._Fast.AttribAccess::new");
	var $spos = $s.length;
	this.__x = x;
	$s.pop();
}
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype.__x = null;
haxe.xml._Fast.AttribAccess.prototype.resolve = function(name) {
	$s.push("haxe.xml._Fast.AttribAccess::resolve");
	var $spos = $s.length;
	if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
	var v = this.__x.get(name);
	if(v == null) throw this.__x.getNodeName() + " is missing attribute " + name;
	$s.pop();
	return v;
	$s.pop();
}
haxe.xml._Fast.AttribAccess.prototype.__class__ = haxe.xml._Fast.AttribAccess;
haxe.xml._Fast.HasAttribAccess = function(x) {
	if( x === $_ ) return;
	$s.push("haxe.xml._Fast.HasAttribAccess::new");
	var $spos = $s.length;
	this.__x = x;
	$s.pop();
}
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype.__x = null;
haxe.xml._Fast.HasAttribAccess.prototype.resolve = function(name) {
	$s.push("haxe.xml._Fast.HasAttribAccess::resolve");
	var $spos = $s.length;
	if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
	var $tmp = this.__x.exists(name);
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.xml._Fast.HasAttribAccess.prototype.__class__ = haxe.xml._Fast.HasAttribAccess;
haxe.xml._Fast.HasNodeAccess = function(x) {
	if( x === $_ ) return;
	$s.push("haxe.xml._Fast.HasNodeAccess::new");
	var $spos = $s.length;
	this.__x = x;
	$s.pop();
}
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype.__x = null;
haxe.xml._Fast.HasNodeAccess.prototype.resolve = function(name) {
	$s.push("haxe.xml._Fast.HasNodeAccess::resolve");
	var $spos = $s.length;
	var $tmp = this.__x.elementsNamed(name).hasNext();
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.xml._Fast.HasNodeAccess.prototype.__class__ = haxe.xml._Fast.HasNodeAccess;
haxe.xml._Fast.NodeListAccess = function(x) {
	if( x === $_ ) return;
	$s.push("haxe.xml._Fast.NodeListAccess::new");
	var $spos = $s.length;
	this.__x = x;
	$s.pop();
}
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype.__x = null;
haxe.xml._Fast.NodeListAccess.prototype.resolve = function(name) {
	$s.push("haxe.xml._Fast.NodeListAccess::resolve");
	var $spos = $s.length;
	var l = new List();
	var $it0 = this.__x.elementsNamed(name);
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(new haxe.xml.Fast(x));
	}
	$s.pop();
	return l;
	$s.pop();
}
haxe.xml._Fast.NodeListAccess.prototype.__class__ = haxe.xml._Fast.NodeListAccess;
haxe.xml.Fast = function(x) {
	if( x === $_ ) return;
	$s.push("haxe.xml.Fast::new");
	var $spos = $s.length;
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + x.nodeType;
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
	$s.pop();
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
	$s.push("haxe.xml.Fast::getName");
	var $spos = $s.length;
	var $tmp = this.x.nodeType == Xml.Document?"Document":this.x.getNodeName();
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.xml.Fast.prototype.getInnerData = function() {
	$s.push("haxe.xml.Fast::getInnerData");
	var $spos = $s.length;
	var it = this.x.iterator();
	if(!it.hasNext()) throw this.getName() + " does not have data";
	var v = it.next();
	if(it.hasNext()) throw this.getName() + " does not only have data";
	if(v.nodeType != Xml.PCData && v.nodeType != Xml.CData) throw this.getName() + " does not have data";
	var $tmp = v.getNodeValue();
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.xml.Fast.prototype.getInnerHTML = function() {
	$s.push("haxe.xml.Fast::getInnerHTML");
	var $spos = $s.length;
	var s = new StringBuf();
	var $it0 = this.x.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		s.add(x.toString());
	}
	var $tmp = s.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.xml.Fast.prototype.getElements = function() {
	$s.push("haxe.xml.Fast::getElements");
	var $spos = $s.length;
	var it = this.x.elements();
	var $tmp = { hasNext : $closure(it,"hasNext"), next : function() {
		$s.push("haxe.xml.Fast::getElements@163");
		var $spos = $s.length;
		var x = it.next();
		if(x == null) {
			$s.pop();
			return null;
		}
		var $tmp = new haxe.xml.Fast(x);
		$s.pop();
		return $tmp;
		$s.pop();
	}};
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.xml.Fast.prototype.__class__ = haxe.xml.Fast;
bpmjs.TaskError = function(p) {
	$s.push("bpmjs.TaskError::new");
	var $spos = $s.length;
	$s.pop();
}
bpmjs.TaskError.__name__ = ["bpmjs","TaskError"];
bpmjs.TaskError.prototype.task = null;
bpmjs.TaskError.prototype.error = null;
bpmjs.TaskError.prototype.__class__ = bpmjs.TaskError;
GLAnimationFrame = function() { }
GLAnimationFrame.__name__ = ["GLAnimationFrame"];
GLAnimationFrame.run = function(method,ms) {
	$s.push("GLAnimationFrame::run");
	var $spos = $s.length;
	if(ms == null) ms = 0;
	var secureMethod = function() {
		$s.push("GLAnimationFrame::run@8");
		var $spos = $s.length;
		try {
			method();
		} catch( e ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			{
				Log.posInfo = { fileName : "GLAnimationFrame.hx", lineNumber : 16, className : "GLAnimationFrame", methodName : "run"};
				if(Log.filter(LogLevel.ERROR)) {
					Log.fetchInput("Error executing GLAnimationFrame: " + e,null,null,null,null,null,null);
					console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
					Log.displayError(Log.createErrorMessage());
				}
			}
		}
		$s.pop();
	};
	if(ms == 0) {
		var window = js.Lib.window;
		var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
		if(requestAnimationFrame == null) {
			var requester = (function($this) {
				var $r;
				var requester = null;
				requester = function() {
					$s.push("GLAnimationFrame::run@30");
					var $spos = $s.length;
					requestAnimationFrame(requester);
					secureMethod();
					$s.pop();
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
	$s.pop();
}
GLAnimationFrame.prototype.__class__ = GLAnimationFrame;
hsl.haxe.Signal = function(data,currentBond,currentTarget,origin) {
	if( data === $_ ) return;
	$s.push("hsl.haxe.Signal::new");
	var $spos = $s.length;
	this.data = data;
	this.currentBond = currentBond;
	this.currentTarget = currentTarget;
	this.origin = origin;
	this.immediatePropagationStopped = false;
	this.propagationStopped = false;
	$s.pop();
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
	$s.push("hsl.haxe.Signal::getData");
	var $spos = $s.length;
	var $tmp = this.data;
	$s.pop();
	return $tmp;
	$s.pop();
}
hsl.haxe.Signal.prototype.stopImmediatePropagation = function() {
	$s.push("hsl.haxe.Signal::stopImmediatePropagation");
	var $spos = $s.length;
	this.immediatePropagationStopped = true;
	$s.pop();
}
hsl.haxe.Signal.prototype.stopPropagation = function() {
	$s.push("hsl.haxe.Signal::stopPropagation");
	var $spos = $s.length;
	this.propagationStopped = true;
	$s.pop();
}
hsl.haxe.Signal.prototype.toString = function() {
	$s.push("hsl.haxe.Signal::toString");
	var $spos = $s.length;
	var $tmp = "[GenericSignal data=" + this.data + "]";
	$s.pop();
	return $tmp;
	$s.pop();
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
	$s.push("Type::getClass");
	var $spos = $s.length;
	if(o == null) {
		$s.pop();
		return null;
	}
	if(o.__enum__ != null) {
		$s.pop();
		return null;
	}
	var $tmp = o.__class__;
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.getEnum = function(o) {
	$s.push("Type::getEnum");
	var $spos = $s.length;
	if(o == null) {
		$s.pop();
		return null;
	}
	var $tmp = o.__enum__;
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.getSuperClass = function(c) {
	$s.push("Type::getSuperClass");
	var $spos = $s.length;
	var $tmp = c.__super__;
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.getClassName = function(c) {
	$s.push("Type::getClassName");
	var $spos = $s.length;
	var a = c.__name__;
	var $tmp = a.join(".");
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.getEnumName = function(e) {
	$s.push("Type::getEnumName");
	var $spos = $s.length;
	var a = e.__ename__;
	var $tmp = a.join(".");
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.resolveClass = function(name) {
	$s.push("Type::resolveClass");
	var $spos = $s.length;
	var cl;
	try {
		cl = eval(name);
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		cl = null;
	}
	if(cl == null || cl.__name__ == null) {
		$s.pop();
		return null;
	}
	$s.pop();
	return cl;
	$s.pop();
}
Type.resolveEnum = function(name) {
	$s.push("Type::resolveEnum");
	var $spos = $s.length;
	var e;
	try {
		e = eval(name);
	} catch( err ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		e = null;
	}
	if(e == null || e.__ename__ == null) {
		$s.pop();
		return null;
	}
	$s.pop();
	return e;
	$s.pop();
}
Type.createInstance = function(cl,args) {
	$s.push("Type::createInstance");
	var $spos = $s.length;
	if(args.length <= 3) {
		var $tmp = new cl(args[0],args[1],args[2]);
		$s.pop();
		return $tmp;
	}
	if(args.length > 8) throw "Too many arguments";
	var $tmp = new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.createEmptyInstance = function(cl) {
	$s.push("Type::createEmptyInstance");
	var $spos = $s.length;
	var $tmp = new cl($_);
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.createEnum = function(e,constr,params) {
	$s.push("Type::createEnum");
	var $spos = $s.length;
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		var $tmp = f.apply(e,params);
		$s.pop();
		return $tmp;
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	$s.pop();
	return f;
	$s.pop();
}
Type.createEnumIndex = function(e,index,params) {
	$s.push("Type::createEnumIndex");
	var $spos = $s.length;
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	var $tmp = Type.createEnum(e,c,params);
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.getInstanceFields = function(c) {
	$s.push("Type::getInstanceFields");
	var $spos = $s.length;
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	$s.pop();
	return a;
	$s.pop();
}
Type.getClassFields = function(c) {
	$s.push("Type::getClassFields");
	var $spos = $s.length;
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__super__");
	a.remove("prototype");
	$s.pop();
	return a;
	$s.pop();
}
Type.getEnumConstructs = function(e) {
	$s.push("Type::getEnumConstructs");
	var $spos = $s.length;
	var a = e.__constructs__;
	var $tmp = a.copy();
	$s.pop();
	return $tmp;
	$s.pop();
}
Type["typeof"] = function(v) {
	$s.push("Type::typeof");
	var $spos = $s.length;
	switch(typeof(v)) {
	case "boolean":
		var $tmp = ValueType.TBool;
		$s.pop();
		return $tmp;
	case "string":
		var $tmp = ValueType.TClass(String);
		$s.pop();
		return $tmp;
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) {
			var $tmp = ValueType.TInt;
			$s.pop();
			return $tmp;
		}
		var $tmp = ValueType.TFloat;
		$s.pop();
		return $tmp;
	case "object":
		if(v == null) {
			var $tmp = ValueType.TNull;
			$s.pop();
			return $tmp;
		}
		var e = v.__enum__;
		if(e != null) {
			var $tmp = ValueType.TEnum(e);
			$s.pop();
			return $tmp;
		}
		var c = v.__class__;
		if(c != null) {
			var $tmp = ValueType.TClass(c);
			$s.pop();
			return $tmp;
		}
		var $tmp = ValueType.TObject;
		$s.pop();
		return $tmp;
	case "function":
		if(v.__name__ != null) {
			var $tmp = ValueType.TObject;
			$s.pop();
			return $tmp;
		}
		var $tmp = ValueType.TFunction;
		$s.pop();
		return $tmp;
	case "undefined":
		var $tmp = ValueType.TNull;
		$s.pop();
		return $tmp;
	default:
		var $tmp = ValueType.TUnknown;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Type.enumEq = function(a,b) {
	$s.push("Type::enumEq");
	var $spos = $s.length;
	if(a == b) {
		$s.pop();
		return true;
	}
	try {
		if(a[0] != b[0]) {
			$s.pop();
			return false;
		}
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) {
				$s.pop();
				return false;
			}
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) {
			$s.pop();
			return false;
		}
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		$s.pop();
		return false;
	}
	$s.pop();
	return true;
	$s.pop();
}
Type.enumConstructor = function(e) {
	$s.push("Type::enumConstructor");
	var $spos = $s.length;
	var $tmp = e[0];
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.enumParameters = function(e) {
	$s.push("Type::enumParameters");
	var $spos = $s.length;
	var $tmp = e.slice(2);
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.enumIndex = function(e) {
	$s.push("Type::enumIndex");
	var $spos = $s.length;
	var $tmp = e[1];
	$s.pop();
	return $tmp;
	$s.pop();
}
Type.prototype.__class__ = Type;
EReg = function(r,opt) {
	if( r === $_ ) return;
	$s.push("EReg::new");
	var $spos = $s.length;
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
	$s.pop();
}
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	$s.push("EReg::match");
	var $spos = $s.length;
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	var $tmp = this.r.m != null;
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.matched = function(n) {
	$s.push("EReg::matched");
	var $spos = $s.length;
	var $tmp = this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this));
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.matchedLeft = function() {
	$s.push("EReg::matchedLeft");
	var $spos = $s.length;
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) {
		var $tmp = this.r.s.substr(0,this.r.m.index);
		$s.pop();
		return $tmp;
	}
	var $tmp = this.r.l;
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.matchedRight = function() {
	$s.push("EReg::matchedRight");
	var $spos = $s.length;
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		var $tmp = this.r.s.substr(sz,this.r.s.length - sz);
		$s.pop();
		return $tmp;
	}
	var $tmp = this.r.r;
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.matchedPos = function() {
	$s.push("EReg::matchedPos");
	var $spos = $s.length;
	if(this.r.m == null) throw "No string matched";
	var $tmp = { pos : this.r.m.index, len : this.r.m[0].length};
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.split = function(s) {
	$s.push("EReg::split");
	var $spos = $s.length;
	var d = "#__delim__#";
	var $tmp = s.replace(this.r,d).split(d);
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.replace = function(s,by) {
	$s.push("EReg::replace");
	var $spos = $s.length;
	var $tmp = s.replace(this.r,by);
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.customReplace = function(s,f) {
	$s.push("EReg::customReplace");
	var $spos = $s.length;
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.add(this.matchedLeft());
		buf.add(f(this));
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s == null?"null":s;
	var $tmp = buf.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
EReg.prototype.__class__ = EReg;
Xml = function(p) {
	$s.push("Xml::new");
	var $spos = $s.length;
	$s.pop();
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
	$s.push("Xml::parse");
	var $spos = $s.length;
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
	$s.pop();
	return current;
	$s.pop();
}
Xml.createElement = function(name) {
	$s.push("Xml::createElement");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	$s.pop();
	return r;
	$s.pop();
}
Xml.createPCData = function(data) {
	$s.push("Xml::createPCData");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	$s.pop();
	return r;
	$s.pop();
}
Xml.createCData = function(data) {
	$s.push("Xml::createCData");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	$s.pop();
	return r;
	$s.pop();
}
Xml.createComment = function(data) {
	$s.push("Xml::createComment");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	$s.pop();
	return r;
	$s.pop();
}
Xml.createDocType = function(data) {
	$s.push("Xml::createDocType");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	$s.pop();
	return r;
	$s.pop();
}
Xml.createProlog = function(data) {
	$s.push("Xml::createProlog");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	$s.pop();
	return r;
	$s.pop();
}
Xml.createDocument = function() {
	$s.push("Xml::createDocument");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	$s.pop();
	return r;
	$s.pop();
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
	$s.push("Xml::getNodeName");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	var $tmp = this._nodeName;
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.setNodeName = function(n) {
	$s.push("Xml::setNodeName");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	var $tmp = this._nodeName = n;
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.getNodeValue = function() {
	$s.push("Xml::getNodeValue");
	var $spos = $s.length;
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	var $tmp = this._nodeValue;
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.setNodeValue = function(v) {
	$s.push("Xml::setNodeValue");
	var $spos = $s.length;
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	var $tmp = this._nodeValue = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.getParent = function() {
	$s.push("Xml::getParent");
	var $spos = $s.length;
	var $tmp = this._parent;
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.get = function(att) {
	$s.push("Xml::get");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	var $tmp = this._attributes.get(att);
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.set = function(att,value) {
	$s.push("Xml::set");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.set(att,value);
	$s.pop();
}
Xml.prototype.remove = function(att) {
	$s.push("Xml::remove");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.remove(att);
	$s.pop();
}
Xml.prototype.exists = function(att) {
	$s.push("Xml::exists");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	var $tmp = this._attributes.exists(att);
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.attributes = function() {
	$s.push("Xml::attributes");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	var $tmp = this._attributes.keys();
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.iterator = function() {
	$s.push("Xml::iterator");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	var $tmp = { cur : 0, x : this._children, hasNext : function() {
		$s.push("Xml::iterator@281");
		var $spos = $s.length;
		var $tmp = this.cur < this.x.length;
		$s.pop();
		return $tmp;
		$s.pop();
	}, next : function() {
		$s.push("Xml::iterator@284");
		var $spos = $s.length;
		var $tmp = this.x[this.cur++];
		$s.pop();
		return $tmp;
		$s.pop();
	}};
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.elements = function() {
	$s.push("Xml::elements");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	var $tmp = { cur : 0, x : this._children, hasNext : function() {
		$s.push("Xml::elements@295");
		var $spos = $s.length;
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			if(this.x[k].nodeType == Xml.Element) break;
			k += 1;
		}
		this.cur = k;
		var $tmp = k < l;
		$s.pop();
		return $tmp;
		$s.pop();
	}, next : function() {
		$s.push("Xml::elements@306");
		var $spos = $s.length;
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k += 1;
			if(n.nodeType == Xml.Element) {
				this.cur = k;
				$s.pop();
				return n;
			}
		}
		$s.pop();
		return null;
		$s.pop();
	}};
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.elementsNamed = function(name) {
	$s.push("Xml::elementsNamed");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	var $tmp = { cur : 0, x : this._children, hasNext : function() {
		$s.push("Xml::elementsNamed@327");
		var $spos = $s.length;
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			if(n.nodeType == Xml.Element && n._nodeName == name) break;
			k++;
		}
		this.cur = k;
		var $tmp = k < l;
		$s.pop();
		return $tmp;
		$s.pop();
	}, next : function() {
		$s.push("Xml::elementsNamed@339");
		var $spos = $s.length;
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k++;
			if(n.nodeType == Xml.Element && n._nodeName == name) {
				this.cur = k;
				$s.pop();
				return n;
			}
		}
		$s.pop();
		return null;
		$s.pop();
	}};
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.firstChild = function() {
	$s.push("Xml::firstChild");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	var $tmp = this._children[0];
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.firstElement = function() {
	$s.push("Xml::firstElement");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	var cur = 0;
	var l = this._children.length;
	while(cur < l) {
		var n = this._children[cur];
		if(n.nodeType == Xml.Element) {
			$s.pop();
			return n;
		}
		cur++;
	}
	$s.pop();
	return null;
	$s.pop();
}
Xml.prototype.addChild = function(x) {
	$s.push("Xml::addChild");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.push(x);
	$s.pop();
}
Xml.prototype.removeChild = function(x) {
	$s.push("Xml::removeChild");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	var b = this._children.remove(x);
	if(b) x._parent = null;
	$s.pop();
	return b;
	$s.pop();
}
Xml.prototype.insertChild = function(x,pos) {
	$s.push("Xml::insertChild");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.insert(pos,x);
	$s.pop();
}
Xml.prototype.toString = function() {
	$s.push("Xml::toString");
	var $spos = $s.length;
	if(this.nodeType == Xml.PCData) {
		var $tmp = this._nodeValue;
		$s.pop();
		return $tmp;
	}
	if(this.nodeType == Xml.CData) {
		var $tmp = "<![CDATA[" + this._nodeValue + "]]>";
		$s.pop();
		return $tmp;
	}
	if(this.nodeType == Xml.Comment) {
		var $tmp = "<!--" + this._nodeValue + "-->";
		$s.pop();
		return $tmp;
	}
	if(this.nodeType == Xml.DocType) {
		var $tmp = "<!DOCTYPE " + this._nodeValue + ">";
		$s.pop();
		return $tmp;
	}
	if(this.nodeType == Xml.Prolog) {
		var $tmp = "<?" + this._nodeValue + "?>";
		$s.pop();
		return $tmp;
	}
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
			var $tmp = s.b.join("");
			$s.pop();
			return $tmp;
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
	var $tmp = s.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
Xml.prototype.__class__ = Xml;
if(typeof js=='undefined') js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	$s.push("js.Boot::__unhtml");
	var $spos = $s.length;
	var $tmp = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	$s.pop();
	return $tmp;
	$s.pop();
}
js.Boot.__trace = function(v,i) {
	$s.push("js.Boot::__trace");
	var $spos = $s.length;
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg); else d.innerHTML += msg;
	$s.pop();
}
js.Boot.__clear_trace = function() {
	$s.push("js.Boot::__clear_trace");
	var $spos = $s.length;
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
	$s.pop();
}
js.Boot.__closure = function(o,f) {
	$s.push("js.Boot::__closure");
	var $spos = $s.length;
	var m = o[f];
	if(m == null) {
		$s.pop();
		return null;
	}
	var f1 = function() {
		$s.push("js.Boot::__closure@67");
		var $spos = $s.length;
		var $tmp = m.apply(o,arguments);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	f1.scope = o;
	f1.method = m;
	$s.pop();
	return f1;
	$s.pop();
}
js.Boot.__string_rec = function(o,s) {
	$s.push("js.Boot::__string_rec");
	var $spos = $s.length;
	if(o == null) {
		$s.pop();
		return "null";
	}
	if(s.length >= 5) {
		$s.pop();
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) {
					var $tmp = o[0];
					$s.pop();
					return $tmp;
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				var $tmp = str + ")";
				$s.pop();
				return $tmp;
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
			$s.pop();
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			$s.pop();
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				$s.pop();
				return s2;
			}
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
		$s.pop();
		return str;
	case "function":
		$s.pop();
		return "<function>";
	case "string":
		$s.pop();
		return o;
	default:
		var $tmp = String(o);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
js.Boot.__interfLoop = function(cc,cl) {
	$s.push("js.Boot::__interfLoop");
	var $spos = $s.length;
	if(cc == null) {
		$s.pop();
		return false;
	}
	if(cc == cl) {
		$s.pop();
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) {
				$s.pop();
				return true;
			}
		}
	}
	var $tmp = js.Boot.__interfLoop(cc.__super__,cl);
	$s.pop();
	return $tmp;
	$s.pop();
}
js.Boot.__instanceof = function(o,cl) {
	$s.push("js.Boot::__instanceof");
	var $spos = $s.length;
	try {
		if(o instanceof cl) {
			if(cl == Array) {
				var $tmp = o.__enum__ == null;
				$s.pop();
				return $tmp;
			}
			$s.pop();
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) {
			$s.pop();
			return true;
		}
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		if(cl == null) {
			$s.pop();
			return false;
		}
	}
	switch(cl) {
	case Int:
		var $tmp = Math.ceil(o%2147483648.0) === o;
		$s.pop();
		return $tmp;
	case Float:
		var $tmp = typeof(o) == "number";
		$s.pop();
		return $tmp;
	case Bool:
		var $tmp = o === true || o === false;
		$s.pop();
		return $tmp;
	case String:
		var $tmp = typeof(o) == "string";
		$s.pop();
		return $tmp;
	case Dynamic:
		$s.pop();
		return true;
	default:
		if(o == null) {
			$s.pop();
			return false;
		}
		var $tmp = o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
js.Boot.__init = function() {
	$s.push("js.Boot::__init");
	var $spos = $s.length;
	try	{ document;	} catch(e) { document = {};	}
	try { window; } catch(e) { window = {};	}
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		$s.push("js.Boot::__init@208");
		var $spos = $s.length;
		this.splice(i,0,x);
		$s.pop();
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		$s.push("js.Boot::__init@211");
		var $spos = $s.length;
		var idx = this.indexOf(obj);
		if(idx == -1) {
			$s.pop();
			return false;
		}
		this.splice(idx,1);
		$s.pop();
		return true;
		$s.pop();
	}:function(obj) {
		$s.push("js.Boot::__init@216");
		var $spos = $s.length;
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				$s.pop();
				return true;
			}
			i++;
		}
		$s.pop();
		return false;
		$s.pop();
	};
	Array.prototype.iterator = function() {
		$s.push("js.Boot::__init@228");
		var $spos = $s.length;
		var $tmp = { cur : 0, arr : this, hasNext : function() {
			$s.push("js.Boot::__init@228@232");
			var $spos = $s.length;
			var $tmp = this.cur < this.arr.length;
			$s.pop();
			return $tmp;
			$s.pop();
		}, next : function() {
			$s.push("js.Boot::__init@228@235");
			var $spos = $s.length;
			var $tmp = this.arr[this.cur++];
			$s.pop();
			return $tmp;
			$s.pop();
		}};
		$s.pop();
		return $tmp;
		$s.pop();
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		$s.push("js.Boot::__init@242");
		var $spos = $s.length;
		var x = this.cca(i);
		if(x != x) {
			$s.pop();
			return null;
		}
		$s.pop();
		return x;
		$s.pop();
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		$s.push("js.Boot::__init@249");
		var $spos = $s.length;
		if(pos != null && pos != 0 && len != null && len < 0) {
			$s.pop();
			return "";
		}
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		var $tmp = oldsub.apply(this,[pos,len]);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	$closure = js.Boot.__closure;
	$s.pop();
}
js.Boot.prototype.__class__ = js.Boot;
haxe.Timer = function(time_ms) {
	if( time_ms === $_ ) return;
	$s.push("haxe.Timer::new");
	var $spos = $s.length;
	var arr = haxe_timers;
	this.id = arr.length;
	arr[this.id] = this;
	this.timerId = window.setInterval("haxe_timers[" + this.id + "].run();",time_ms);
	$s.pop();
}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	$s.push("haxe.Timer::delay");
	var $spos = $s.length;
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		$s.push("haxe.Timer::delay@79");
		var $spos = $s.length;
		t.stop();
		f();
		$s.pop();
	};
	$s.pop();
	return t;
	$s.pop();
}
haxe.Timer.measure = function(f,pos) {
	$s.push("haxe.Timer::measure");
	var $spos = $s.length;
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	$s.pop();
	return r;
	$s.pop();
}
haxe.Timer.stamp = function() {
	$s.push("haxe.Timer::stamp");
	var $spos = $s.length;
	var $tmp = Date.now().getTime() / 1000;
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.stop = function() {
	$s.push("haxe.Timer::stop");
	var $spos = $s.length;
	if(this.id == null) {
		$s.pop();
		return;
	}
	window.clearInterval(this.timerId);
	var arr = haxe_timers;
	arr[this.id] = null;
	if(this.id > 100 && this.id == arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && arr[p] == null) p--;
		arr = arr.slice(0,p + 1);
	}
	this.id = null;
	$s.pop();
}
haxe.Timer.prototype.run = function() {
	$s.push("haxe.Timer::run");
	var $spos = $s.length;
	$s.pop();
}
haxe.Timer.prototype.__class__ = haxe.Timer;
IntHash = function(p) {
	if( p === $_ ) return;
	$s.push("IntHash::new");
	var $spos = $s.length;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	$s.pop();
}
IntHash.__name__ = ["IntHash"];
IntHash.prototype.h = null;
IntHash.prototype.set = function(key,value) {
	$s.push("IntHash::set");
	var $spos = $s.length;
	this.h[key] = value;
	$s.pop();
}
IntHash.prototype.get = function(key) {
	$s.push("IntHash::get");
	var $spos = $s.length;
	var $tmp = this.h[key];
	$s.pop();
	return $tmp;
	$s.pop();
}
IntHash.prototype.exists = function(key) {
	$s.push("IntHash::exists");
	var $spos = $s.length;
	var $tmp = this.h[key] != null;
	$s.pop();
	return $tmp;
	$s.pop();
}
IntHash.prototype.remove = function(key) {
	$s.push("IntHash::remove");
	var $spos = $s.length;
	if(this.h[key] == null) {
		$s.pop();
		return false;
	}
	delete(this.h[key]);
	$s.pop();
	return true;
	$s.pop();
}
IntHash.prototype.keys = function() {
	$s.push("IntHash::keys");
	var $spos = $s.length;
	var a = new Array();
	for( x in this.h ) a.push(x);
	var $tmp = a.iterator();
	$s.pop();
	return $tmp;
	$s.pop();
}
IntHash.prototype.iterator = function() {
	$s.push("IntHash::iterator");
	var $spos = $s.length;
	var $tmp = { ref : this.h, it : this.keys(), hasNext : function() {
		$s.push("IntHash::iterator@66");
		var $spos = $s.length;
		var $tmp = this.it.hasNext();
		$s.pop();
		return $tmp;
		$s.pop();
	}, next : function() {
		$s.push("IntHash::iterator@67");
		var $spos = $s.length;
		var i = this.it.next();
		var $tmp = this.ref[i];
		$s.pop();
		return $tmp;
		$s.pop();
	}};
	$s.pop();
	return $tmp;
	$s.pop();
}
IntHash.prototype.toString = function() {
	$s.push("IntHash::toString");
	var $spos = $s.length;
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
	var $tmp = s.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
IntHash.prototype.__class__ = IntHash;
kumite.stage.Stage = function(p) {
	$s.push("kumite.stage.Stage::new");
	var $spos = $s.length;
	$s.pop();
}
kumite.stage.Stage.__name__ = ["kumite","stage","Stage"];
kumite.stage.Stage.prototype.width = null;
kumite.stage.Stage.prototype.height = null;
kumite.stage.Stage.prototype.aspect = null;
kumite.stage.Stage.prototype.getAspect = function() {
	$s.push("kumite.stage.Stage::getAspect");
	var $spos = $s.length;
	var $tmp = this.width / this.height;
	$s.pop();
	return $tmp;
	$s.pop();
}
kumite.stage.Stage.prototype.__class__ = kumite.stage.Stage;
Hash = function(p) {
	if( p === $_ ) return;
	$s.push("Hash::new");
	var $spos = $s.length;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	$s.pop();
}
Hash.__name__ = ["Hash"];
Hash.prototype.h = null;
Hash.prototype.set = function(key,value) {
	$s.push("Hash::set");
	var $spos = $s.length;
	this.h["$" + key] = value;
	$s.pop();
}
Hash.prototype.get = function(key) {
	$s.push("Hash::get");
	var $spos = $s.length;
	var $tmp = this.h["$" + key];
	$s.pop();
	return $tmp;
	$s.pop();
}
Hash.prototype.exists = function(key) {
	$s.push("Hash::exists");
	var $spos = $s.length;
	try {
		key = "$" + key;
		var $tmp = this.hasOwnProperty.call(this.h,key);
		$s.pop();
		return $tmp;
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		for(var i in this.h) if( i == key ) return true;
		$s.pop();
		return false;
	}
	$s.pop();
}
Hash.prototype.remove = function(key) {
	$s.push("Hash::remove");
	var $spos = $s.length;
	if(!this.exists(key)) {
		$s.pop();
		return false;
	}
	delete(this.h["$" + key]);
	$s.pop();
	return true;
	$s.pop();
}
Hash.prototype.keys = function() {
	$s.push("Hash::keys");
	var $spos = $s.length;
	var a = new Array();
	for(var i in this.h) a.push(i.substr(1));
	var $tmp = a.iterator();
	$s.pop();
	return $tmp;
	$s.pop();
}
Hash.prototype.iterator = function() {
	$s.push("Hash::iterator");
	var $spos = $s.length;
	var $tmp = { ref : this.h, it : this.keys(), hasNext : function() {
		$s.push("Hash::iterator@75");
		var $spos = $s.length;
		var $tmp = this.it.hasNext();
		$s.pop();
		return $tmp;
		$s.pop();
	}, next : function() {
		$s.push("Hash::iterator@76");
		var $spos = $s.length;
		var i = this.it.next();
		var $tmp = this.ref["$" + i];
		$s.pop();
		return $tmp;
		$s.pop();
	}};
	$s.pop();
	return $tmp;
	$s.pop();
}
Hash.prototype.toString = function() {
	$s.push("Hash::toString");
	var $spos = $s.length;
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
	var $tmp = s.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
Hash.prototype.__class__ = Hash;
reflect.ClassInfo = function(name,type) {
	if( name === $_ ) return;
	$s.push("reflect.ClassInfo::new");
	var $spos = $s.length;
	this.name = name;
	this.type = type;
	this.hasRtti = type.__rtti != null;
	$s.pop();
}
reflect.ClassInfo.__name__ = ["reflect","ClassInfo"];
reflect.ClassInfo.forInstance = function(instance) {
	$s.push("reflect.ClassInfo::forInstance");
	var $spos = $s.length;
	if(instance == null) throw "Missing instance";
	var type = Type.getClass(instance);
	if(type == null) throw "Cannot resolve type for instance: " + instance;
	var $tmp = reflect.ClassInfo.forClass(type);
	$s.pop();
	return $tmp;
	$s.pop();
}
reflect.ClassInfo.forClass = function(type) {
	$s.push("reflect.ClassInfo::forClass");
	var $spos = $s.length;
	if(type == null) throw "Missing type";
	var name = Type.getClassName(type);
	var $tmp = reflect.ClassInfo.getClassInfo(name,type);
	$s.pop();
	return $tmp;
	$s.pop();
}
reflect.ClassInfo.forName = function(name) {
	$s.push("reflect.ClassInfo::forName");
	var $spos = $s.length;
	if(name == null) throw "Missing name";
	var type = Type.resolveClass(name);
	if(type != null) {
		var $tmp = reflect.ClassInfo.getClassInfo(name,type);
		$s.pop();
		return $tmp;
	}
	var enumm = Type.resolveEnum(name);
	if(enumm != null) {
		var $tmp = reflect.ClassInfo.getClassInfo(name,enumm);
		$s.pop();
		return $tmp;
	}
	throw "Cannot resolve type or enum for name: " + name;
	$s.pop();
}
reflect.ClassInfo.forCType = function(t) {
	$s.push("reflect.ClassInfo::forCType");
	var $spos = $s.length;
	if(t == null) throw "Missing CType";
	var $e = (t);
	switch( $e[1] ) {
	case 4:
		var ret = $e[3], args = $e[2];
		var $tmp = reflect.ClassInfo.forCType(ret);
		$s.pop();
		return $tmp;
	case 2:
		var params = $e[3], name = $e[2];
		var $tmp = reflect.ClassInfo.forName(name);
		$s.pop();
		return $tmp;
	case 1:
		var params = $e[3], name = $e[2];
		var $tmp = reflect.ClassInfo.forName(name);
		$s.pop();
		return $tmp;
	default:
	}
	throw "Could not resolve CType: " + t;
	$s.pop();
}
reflect.ClassInfo.getClassInfo = function(name,type) {
	$s.push("reflect.ClassInfo::getClassInfo");
	var $spos = $s.length;
	var hash = reflect.ClassInfo.getHash(name,type);
	if(reflect.ClassInfo.cache.exists(hash)) {
		var $tmp = reflect.ClassInfo.cache.get(hash);
		$s.pop();
		return $tmp;
	}
	var result = new reflect.ClassInfo(name,type);
	reflect.ClassInfo.cache.set(hash,result);
	$s.pop();
	return result;
	$s.pop();
}
reflect.ClassInfo.getHash = function(name,type) {
	$s.push("reflect.ClassInfo::getHash");
	var $spos = $s.length;
	var hash = name;
	var internalNames = type.__name__;
	if(internalNames != null) hash = internalNames.join(".");
	$s.pop();
	return hash;
	$s.pop();
}
reflect.ClassInfo.prototype.type = null;
reflect.ClassInfo.prototype.name = null;
reflect.ClassInfo.prototype.shortName = null;
reflect.ClassInfo.prototype.hasRtti = null;
reflect.ClassInfo.prototype.properties = null;
reflect.ClassInfo.prototype.methods = null;
reflect.ClassInfo.prototype.getProperty = function(name) {
	$s.push("reflect.ClassInfo::getProperty");
	var $spos = $s.length;
	var _g = 0, _g1 = this.getProperties();
	while(_g < _g1.length) {
		var property = _g1[_g];
		++_g;
		if(property.field.name == name) {
			$s.pop();
			return property;
		}
	}
	$s.pop();
	return null;
	$s.pop();
}
reflect.ClassInfo.prototype.getMethod = function(name) {
	$s.push("reflect.ClassInfo::getMethod");
	var $spos = $s.length;
	var _g = 0, _g1 = this.getMethods();
	while(_g < _g1.length) {
		var method = _g1[_g];
		++_g;
		if(method.field.name == name) {
			$s.pop();
			return method;
		}
	}
	$s.pop();
	return null;
	$s.pop();
}
reflect.ClassInfo.prototype.toString = function() {
	$s.push("reflect.ClassInfo::toString");
	var $spos = $s.length;
	var $tmp = "[ClassInfo for class: " + this.name + "]";
	$s.pop();
	return $tmp;
	$s.pop();
}
reflect.ClassInfo.prototype.getShortName = function() {
	$s.push("reflect.ClassInfo::getShortName");
	var $spos = $s.length;
	var $tmp = this.name.substr(this.name.lastIndexOf(".") + 1);
	$s.pop();
	return $tmp;
	$s.pop();
}
reflect.ClassInfo.prototype.getProperties = function() {
	$s.push("reflect.ClassInfo::getProperties");
	var $spos = $s.length;
	if(this.properties != null) {
		var $tmp = this.properties;
		$s.pop();
		return $tmp;
	}
	this.initFields();
	var $tmp = this.properties;
	$s.pop();
	return $tmp;
	$s.pop();
}
reflect.ClassInfo.prototype.getMethods = function() {
	$s.push("reflect.ClassInfo::getMethods");
	var $spos = $s.length;
	if(this.methods != null) {
		var $tmp = this.methods;
		$s.pop();
		return $tmp;
	}
	this.initFields();
	var $tmp = this.methods;
	$s.pop();
	return $tmp;
	$s.pop();
}
reflect.ClassInfo.prototype.initFields = function() {
	$s.push("reflect.ClassInfo::initFields");
	var $spos = $s.length;
	this.properties = new Array();
	this.methods = new Array();
	this.scanClass(this.type);
	$s.pop();
}
reflect.ClassInfo.prototype.scanClass = function(type) {
	$s.push("reflect.ClassInfo::scanClass");
	var $spos = $s.length;
	if(type.__rtti == null) {
		$s.pop();
		return;
	}
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
	$s.pop();
}
reflect.ClassInfo.prototype.scanFields = function(classDef) {
	$s.push("reflect.ClassInfo::scanFields");
	var $spos = $s.length;
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
	$s.pop();
}
reflect.ClassInfo.prototype.__class__ = reflect.ClassInfo;
hsl.haxe.DirectSignaler = function(subject,rejectNullData) {
	if( subject === $_ ) return;
	$s.push("hsl.haxe.DirectSignaler::new");
	var $spos = $s.length;
	if(null == subject) throw new haxe.exception.ArgumentNullException("subject",1);
	this.subject = subject;
	this.rejectNullData = rejectNullData;
	this.sentinel = new hsl.haxe._DirectSignaler.SentinelBond();
	$s.pop();
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
	$s.push("hsl.haxe.DirectSignaler::addBubblingTarget");
	var $spos = $s.length;
	if(null == this.bubblingTargets) this.bubblingTargets = new List();
	this.bubblingTargets.add(value);
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.addNotificationTarget = function(value) {
	$s.push("hsl.haxe.DirectSignaler::addNotificationTarget");
	var $spos = $s.length;
	if(null == this.notificationTargets) this.notificationTargets = new List();
	this.notificationTargets.add(value);
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.bind = function(listener) {
	$s.push("hsl.haxe.DirectSignaler::bind");
	var $spos = $s.length;
	if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
	var $tmp = this.sentinel.add(new hsl.haxe._DirectSignaler.RegularBond(listener));
	$s.pop();
	return $tmp;
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.bindAdvanced = function(listener) {
	$s.push("hsl.haxe.DirectSignaler::bindAdvanced");
	var $spos = $s.length;
	if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
	var $tmp = this.sentinel.add(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
	$s.pop();
	return $tmp;
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.bindVoid = function(listener) {
	$s.push("hsl.haxe.DirectSignaler::bindVoid");
	var $spos = $s.length;
	if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
	var $tmp = this.sentinel.add(new hsl.haxe._DirectSignaler.NiladicBond(listener));
	$s.pop();
	return $tmp;
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.bubble = function(data,origin) {
	$s.push("hsl.haxe.DirectSignaler::bubble");
	var $spos = $s.length;
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
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.dispatch = function(data,origin,positionInformation) {
	$s.push("hsl.haxe.DirectSignaler::dispatch");
	var $spos = $s.length;
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
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.getIsListenedTo = function() {
	$s.push("hsl.haxe.DirectSignaler::getIsListenedTo");
	var $spos = $s.length;
	var $tmp = this.sentinel.getIsConnected();
	$s.pop();
	return $tmp;
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.getOrigin = function(origin) {
	$s.push("hsl.haxe.DirectSignaler::getOrigin");
	var $spos = $s.length;
	var $tmp = null == origin?this.subject:origin;
	$s.pop();
	return $tmp;
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.verifyCaller = function(positionInformation) {
	$s.push("hsl.haxe.DirectSignaler::verifyCaller");
	var $spos = $s.length;
	if(null == this.subjectClassNames) this.subjectClassNames = haxe.TypeTools.getClassNames(this.subject);
	var $it0 = this.subjectClassNames.iterator();
	while( $it0.hasNext() ) {
		var subjectClassName = $it0.next();
		if(subjectClassName == positionInformation.className) {
			$s.pop();
			return;
		}
	}
	throw new haxe.exception.Exception("This method may only be called by the subject of the signaler.",null,2);
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.removeBubblingTarget = function(value) {
	$s.push("hsl.haxe.DirectSignaler::removeBubblingTarget");
	var $spos = $s.length;
	if(null != this.bubblingTargets) this.bubblingTargets.remove(value);
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.removeNotificationTarget = function(value) {
	$s.push("hsl.haxe.DirectSignaler::removeNotificationTarget");
	var $spos = $s.length;
	if(null != this.notificationTargets) this.notificationTargets.remove(value);
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.toString = function() {
	$s.push("hsl.haxe.DirectSignaler::toString");
	var $spos = $s.length;
	var $tmp = "[Signaler isListenedTo=" + this.getIsListenedTo() + "]";
	$s.pop();
	return $tmp;
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.unbind = function(listener) {
	$s.push("hsl.haxe.DirectSignaler::unbind");
	var $spos = $s.length;
	this.sentinel.remove(new hsl.haxe._DirectSignaler.RegularBond(listener));
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.unbindAdvanced = function(listener) {
	$s.push("hsl.haxe.DirectSignaler::unbindAdvanced");
	var $spos = $s.length;
	this.sentinel.remove(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.unbindVoid = function(listener) {
	$s.push("hsl.haxe.DirectSignaler::unbindVoid");
	var $spos = $s.length;
	this.sentinel.remove(new hsl.haxe._DirectSignaler.NiladicBond(listener));
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.__class__ = hsl.haxe.DirectSignaler;
hsl.haxe.DirectSignaler.__interfaces__ = [hsl.haxe.Signaler];
if(!hsl.haxe._DirectSignaler) hsl.haxe._DirectSignaler = {}
hsl.haxe._DirectSignaler.LinkedBond = function(p) {
	if( p === $_ ) return;
	$s.push("hsl.haxe._DirectSignaler.LinkedBond::new");
	var $spos = $s.length;
	hsl.haxe.Bond.call(this);
	this.destroyed = false;
	$s.pop();
}
hsl.haxe._DirectSignaler.LinkedBond.__name__ = ["hsl","haxe","_DirectSignaler","LinkedBond"];
hsl.haxe._DirectSignaler.LinkedBond.__super__ = hsl.haxe.Bond;
for(var k in hsl.haxe.Bond.prototype ) hsl.haxe._DirectSignaler.LinkedBond.prototype[k] = hsl.haxe.Bond.prototype[k];
hsl.haxe._DirectSignaler.LinkedBond.prototype.destroyed = null;
hsl.haxe._DirectSignaler.LinkedBond.prototype.next = null;
hsl.haxe._DirectSignaler.LinkedBond.prototype.previous = null;
hsl.haxe._DirectSignaler.LinkedBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	$s.push("hsl.haxe._DirectSignaler.LinkedBond::callListener");
	var $spos = $s.length;
	$s.pop();
	return 0;
	$s.pop();
}
hsl.haxe._DirectSignaler.LinkedBond.prototype.determineEquals = function(value) {
	$s.push("hsl.haxe._DirectSignaler.LinkedBond::determineEquals");
	var $spos = $s.length;
	$s.pop();
	return false;
	$s.pop();
}
hsl.haxe._DirectSignaler.LinkedBond.prototype.destroy = function() {
	$s.push("hsl.haxe._DirectSignaler.LinkedBond::destroy");
	var $spos = $s.length;
	if(false == this.destroyed) {
		this.previous.next = this.next;
		this.next.previous = this.previous;
		this.destroyed = true;
	}
	$s.pop();
}
hsl.haxe._DirectSignaler.LinkedBond.prototype.unlink = function() {
	$s.push("hsl.haxe._DirectSignaler.LinkedBond::unlink");
	var $spos = $s.length;
	if(false == this.destroyed) {
		this.previous.next = this.next;
		this.next.previous = this.previous;
		this.destroyed = true;
	}
	$s.pop();
}
hsl.haxe._DirectSignaler.LinkedBond.prototype.__class__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.SentinelBond = function(p) {
	if( p === $_ ) return;
	$s.push("hsl.haxe._DirectSignaler.SentinelBond::new");
	var $spos = $s.length;
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.next = this.previous = this;
	$s.pop();
}
hsl.haxe._DirectSignaler.SentinelBond.__name__ = ["hsl","haxe","_DirectSignaler","SentinelBond"];
hsl.haxe._DirectSignaler.SentinelBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.SentinelBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.SentinelBond.prototype.isConnected = null;
hsl.haxe._DirectSignaler.SentinelBond.prototype.add = function(value) {
	$s.push("hsl.haxe._DirectSignaler.SentinelBond::add");
	var $spos = $s.length;
	value.next = this;
	value.previous = this.previous;
	var $tmp = this.previous = this.previous.next = value;
	$s.pop();
	return $tmp;
	$s.pop();
}
hsl.haxe._DirectSignaler.SentinelBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	$s.push("hsl.haxe._DirectSignaler.SentinelBond::callListener");
	var $spos = $s.length;
	var node = this.next;
	while(node != this && 1 != propagationStatus) {
		propagationStatus = node.callListener(data,currentTarget,origin,propagationStatus);
		node = node.next;
	}
	$s.pop();
	return propagationStatus;
	$s.pop();
}
hsl.haxe._DirectSignaler.SentinelBond.prototype.getIsConnected = function() {
	$s.push("hsl.haxe._DirectSignaler.SentinelBond::getIsConnected");
	var $spos = $s.length;
	var $tmp = this.next != this;
	$s.pop();
	return $tmp;
	$s.pop();
}
hsl.haxe._DirectSignaler.SentinelBond.prototype.remove = function(value) {
	$s.push("hsl.haxe._DirectSignaler.SentinelBond::remove");
	var $spos = $s.length;
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
	$s.pop();
}
hsl.haxe._DirectSignaler.SentinelBond.prototype.__class__ = hsl.haxe._DirectSignaler.SentinelBond;
hsl.haxe._DirectSignaler.RegularBond = function(listener) {
	if( listener === $_ ) return;
	$s.push("hsl.haxe._DirectSignaler.RegularBond::new");
	var $spos = $s.length;
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
	$s.pop();
}
hsl.haxe._DirectSignaler.RegularBond.__name__ = ["hsl","haxe","_DirectSignaler","RegularBond"];
hsl.haxe._DirectSignaler.RegularBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.RegularBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.RegularBond.prototype.listener = null;
hsl.haxe._DirectSignaler.RegularBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	$s.push("hsl.haxe._DirectSignaler.RegularBond::callListener");
	var $spos = $s.length;
	if(false == this.halted) {
		this.listener(data);
		if(this.willDestroyOnUse) if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	$s.pop();
	return propagationStatus;
	$s.pop();
}
hsl.haxe._DirectSignaler.RegularBond.prototype.determineEquals = function(value) {
	$s.push("hsl.haxe._DirectSignaler.RegularBond::determineEquals");
	var $spos = $s.length;
	var $tmp = Std["is"](value,hsl.haxe._DirectSignaler.RegularBond) && Reflect.compareMethods(value.listener,this.listener);
	$s.pop();
	return $tmp;
	$s.pop();
}
hsl.haxe._DirectSignaler.RegularBond.prototype.__class__ = hsl.haxe._DirectSignaler.RegularBond;
hsl.haxe._DirectSignaler.NiladicBond = function(listener) {
	if( listener === $_ ) return;
	$s.push("hsl.haxe._DirectSignaler.NiladicBond::new");
	var $spos = $s.length;
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
	$s.pop();
}
hsl.haxe._DirectSignaler.NiladicBond.__name__ = ["hsl","haxe","_DirectSignaler","NiladicBond"];
hsl.haxe._DirectSignaler.NiladicBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.NiladicBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.NiladicBond.prototype.listener = null;
hsl.haxe._DirectSignaler.NiladicBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	$s.push("hsl.haxe._DirectSignaler.NiladicBond::callListener");
	var $spos = $s.length;
	if(false == this.halted) {
		this.listener();
		if(this.willDestroyOnUse) if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	$s.pop();
	return propagationStatus;
	$s.pop();
}
hsl.haxe._DirectSignaler.NiladicBond.prototype.determineEquals = function(value) {
	$s.push("hsl.haxe._DirectSignaler.NiladicBond::determineEquals");
	var $spos = $s.length;
	var $tmp = Std["is"](value,hsl.haxe._DirectSignaler.NiladicBond) && Reflect.compareMethods(value.listener,this.listener);
	$s.pop();
	return $tmp;
	$s.pop();
}
hsl.haxe._DirectSignaler.NiladicBond.prototype.__class__ = hsl.haxe._DirectSignaler.NiladicBond;
hsl.haxe._DirectSignaler.AdvancedBond = function(listener) {
	if( listener === $_ ) return;
	$s.push("hsl.haxe._DirectSignaler.AdvancedBond::new");
	var $spos = $s.length;
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
	$s.pop();
}
hsl.haxe._DirectSignaler.AdvancedBond.__name__ = ["hsl","haxe","_DirectSignaler","AdvancedBond"];
hsl.haxe._DirectSignaler.AdvancedBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.AdvancedBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.AdvancedBond.prototype.listener = null;
hsl.haxe._DirectSignaler.AdvancedBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	$s.push("hsl.haxe._DirectSignaler.AdvancedBond::callListener");
	var $spos = $s.length;
	if(this.halted == false) {
		var signal = new hsl.haxe.Signal(data,this,currentTarget,origin);
		this.listener(signal);
		if(this.willDestroyOnUse) if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
		if(signal.immediatePropagationStopped) {
			$s.pop();
			return 1;
		} else if(signal.propagationStopped) {
			$s.pop();
			return 2;
		}
	}
	$s.pop();
	return propagationStatus;
	$s.pop();
}
hsl.haxe._DirectSignaler.AdvancedBond.prototype.determineEquals = function(value) {
	$s.push("hsl.haxe._DirectSignaler.AdvancedBond::determineEquals");
	var $spos = $s.length;
	var $tmp = Std["is"](value,hsl.haxe._DirectSignaler.AdvancedBond) && Reflect.compareMethods(value.listener,this.listener);
	$s.pop();
	return $tmp;
	$s.pop();
}
hsl.haxe._DirectSignaler.AdvancedBond.prototype.__class__ = hsl.haxe._DirectSignaler.AdvancedBond;
hsl.haxe._DirectSignaler.PropagationStatus = function() { }
hsl.haxe._DirectSignaler.PropagationStatus.__name__ = ["hsl","haxe","_DirectSignaler","PropagationStatus"];
hsl.haxe._DirectSignaler.PropagationStatus.prototype.__class__ = hsl.haxe._DirectSignaler.PropagationStatus;
kumite.presentation.Slide = function(p) {
	if( p === $_ ) return;
	$s.push("kumite.presentation.Slide::new");
	var $spos = $s.length;
	this.isPrepared = false;
	this.clickSignaler = new hsl.haxe.DirectSignaler(this);
	$s.pop();
}
kumite.presentation.Slide.__name__ = ["kumite","presentation","Slide"];
kumite.presentation.Slide.prototype.clickSignaler = null;
kumite.presentation.Slide.prototype.isPrepared = null;
kumite.presentation.Slide.prototype.row = null;
kumite.presentation.Slide.prototype.prepare = function(root) {
	$s.push("kumite.presentation.Slide::prepare");
	var $spos = $s.length;
	this.isPrepared = true;
	$s.pop();
}
kumite.presentation.Slide.prototype.resize = function(stage) {
	$s.push("kumite.presentation.Slide::resize");
	var $spos = $s.length;
	$s.pop();
}
kumite.presentation.Slide.prototype.removeFrom = function(root) {
	$s.push("kumite.presentation.Slide::removeFrom");
	var $spos = $s.length;
	this.isPrepared = false;
	$s.pop();
}
kumite.presentation.Slide.prototype.getMemento = function() {
	$s.push("kumite.presentation.Slide::getMemento");
	var $spos = $s.length;
	$s.pop();
	return null;
	$s.pop();
}
kumite.presentation.Slide.prototype.setMemento = function(memento) {
	$s.push("kumite.presentation.Slide::setMemento");
	var $spos = $s.length;
	$s.pop();
}
kumite.presentation.Slide.prototype.__class__ = kumite.presentation.Slide;
kumite.presentation.ImageSlide = function(location) {
	if( location === $_ ) return;
	$s.push("kumite.presentation.ImageSlide::new");
	var $spos = $s.length;
	kumite.presentation.Slide.call(this);
	this.hitareas = new Array();
	this.imageTask = new bpmjs.ImageLoaderTask(location);
	$s.pop();
}
kumite.presentation.ImageSlide.__name__ = ["kumite","presentation","ImageSlide"];
kumite.presentation.ImageSlide.__super__ = kumite.presentation.Slide;
for(var k in kumite.presentation.Slide.prototype ) kumite.presentation.ImageSlide.prototype[k] = kumite.presentation.Slide.prototype[k];
kumite.presentation.ImageSlide.prototype.stage = null;
kumite.presentation.ImageSlide.prototype.hitareas = null;
kumite.presentation.ImageSlide.prototype.container = null;
kumite.presentation.ImageSlide.prototype.imageTask = null;
kumite.presentation.ImageSlide.prototype.addHitArea = function(x,y,width,height,location) {
	$s.push("kumite.presentation.ImageSlide::addHitArea");
	var $spos = $s.length;
	var hitarea = new kumite.presentation.Hitarea();
	hitarea.x = x;
	hitarea.y = y;
	hitarea.width = width;
	hitarea.height = height;
	hitarea.location = location;
	var hitareaAndDiv = new kumite.presentation.HitareaAndDiv();
	hitareaAndDiv.hitarea = hitarea;
	this.hitareas.push(hitareaAndDiv);
	$s.pop();
	return this;
	$s.pop();
}
kumite.presentation.ImageSlide.prototype.loadImage = function() {
	$s.push("kumite.presentation.ImageSlide::loadImage");
	var $spos = $s.length;
	this.container = js.Lib.document.createElement("div");
	this.imageTask.completeSignaler.bind($closure(this,"handleImageLoaded"));
	var $tmp = this.imageTask;
	$s.pop();
	return $tmp;
	$s.pop();
}
kumite.presentation.ImageSlide.prototype.prepare = function(root) {
	$s.push("kumite.presentation.ImageSlide::prepare");
	var $spos = $s.length;
	var me = this;
	kumite.presentation.Slide.prototype.prepare.call(this,root);
	this.container.setAttribute("style","overflow:hidden; position:absolute");
	this.container.onclick = function(_) {
		$s.push("kumite.presentation.ImageSlide::prepare@59");
		var $spos = $s.length;
		me.clickSignaler.dispatch(me,null,{ fileName : "ImageSlide.hx", lineNumber : 61, className : "kumite.presentation.ImageSlide", methodName : "prepare"});
		$s.pop();
	};
	root.appendChild(this.container);
	var _g = 0, _g1 = this.hitareas;
	while(_g < _g1.length) {
		var hitarea = _g1[_g];
		++_g;
		var div = js.Lib.document.createElement("a");
		div.href = hitarea.hitarea.location;
		div.style.position = "absolute";
		root.appendChild(div);
		hitarea.div = div;
	}
	$s.pop();
}
kumite.presentation.ImageSlide.prototype.resize = function(stage) {
	$s.push("kumite.presentation.ImageSlide::resize");
	var $spos = $s.length;
	kumite.presentation.Slide.prototype.resize.call(this,stage);
	this.container.style.top = this.row * stage.height + "px";
	this.container.style.width = stage.width + "px";
	this.container.style.height = stage.height + "px";
	if(!this.imageTask.isComplete) {
		$s.pop();
		return;
	}
	var transform = this.getTransform();
	this.imageTask.image.style.position = "absolute";
	this.imageTask.image.style.width = this.imageTask.image.naturalWidth * transform.scale + "px";
	this.imageTask.image.style.height = this.imageTask.image.naturalHeight * transform.scale + "px";
	this.imageTask.image.style.top = transform.y + "px";
	this.imageTask.image.style.left = transform.x + "px";
	var _g = 0, _g1 = this.hitareas;
	while(_g < _g1.length) {
		var hitarea = _g1[_g];
		++_g;
		var div = hitarea.div;
		var left = hitarea.hitarea.x * transform.scale + transform.x;
		var top = hitarea.hitarea.y * transform.scale + transform.y;
		var width = hitarea.hitarea.width * transform.scale;
		var height = hitarea.hitarea.height * transform.scale;
		div.style.left = left + "px";
		div.style.top = top + "px";
		div.style.width = width + "px";
		div.style.height = height + "px";
		hitarea.div = div;
	}
	$s.pop();
}
kumite.presentation.ImageSlide.prototype.getTransform = function() {
	$s.push("kumite.presentation.ImageSlide::getTransform");
	var $spos = $s.length;
	var image = this.imageTask.image;
	var imageAspect = image.naturalWidth / image.naturalHeight;
	var aspect = this.stage.width / this.stage.height;
	var ix;
	var iy;
	var iw;
	var ih;
	if(aspect > imageAspect) {
		iw = this.stage.width;
		ih = this.stage.width / imageAspect;
		ix = 0;
		iy = -(ih - this.stage.height) / 2;
	} else {
		iw = this.stage.height * imageAspect;
		ih = this.stage.height;
		ix = -(iw - this.stage.width) / 2;
		iy = 0;
	}
	var $tmp = { scale : iw / image.naturalWidth, x : ix, y : iy};
	$s.pop();
	return $tmp;
	$s.pop();
}
kumite.presentation.ImageSlide.prototype.handleImageLoaded = function(_) {
	$s.push("kumite.presentation.ImageSlide::handleImageLoaded");
	var $spos = $s.length;
	var image = this.imageTask.image;
	this.container.appendChild(image);
	$s.pop();
}
kumite.presentation.ImageSlide.prototype.removeFrom = function(root) {
	$s.push("kumite.presentation.ImageSlide::removeFrom");
	var $spos = $s.length;
	kumite.presentation.Slide.prototype.removeFrom.call(this,root);
	var _g = 0, _g1 = this.hitareas;
	while(_g < _g1.length) {
		var hitarea = _g1[_g];
		++_g;
		var div = hitarea.div;
		root.removeChild(div);
	}
	$s.pop();
}
kumite.presentation.ImageSlide.prototype.__class__ = kumite.presentation.ImageSlide;
kumite.presentation.ImageSlide.__interfaces__ = [haxe.rtti.Infos];
kumite.presentation.HitareaAndDiv = function(p) {
	$s.push("kumite.presentation.HitareaAndDiv::new");
	var $spos = $s.length;
	$s.pop();
}
kumite.presentation.HitareaAndDiv.__name__ = ["kumite","presentation","HitareaAndDiv"];
kumite.presentation.HitareaAndDiv.prototype.hitarea = null;
kumite.presentation.HitareaAndDiv.prototype.div = null;
kumite.presentation.HitareaAndDiv.prototype.__class__ = kumite.presentation.HitareaAndDiv;
StringBuf = function(p) {
	if( p === $_ ) return;
	$s.push("StringBuf::new");
	var $spos = $s.length;
	this.b = new Array();
	$s.pop();
}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	$s.push("StringBuf::add");
	var $spos = $s.length;
	this.b[this.b.length] = x == null?"null":x;
	$s.pop();
}
StringBuf.prototype.addSub = function(s,pos,len) {
	$s.push("StringBuf::addSub");
	var $spos = $s.length;
	this.b[this.b.length] = s.substr(pos,len);
	$s.pop();
}
StringBuf.prototype.addChar = function(c) {
	$s.push("StringBuf::addChar");
	var $spos = $s.length;
	this.b[this.b.length] = String.fromCharCode(c);
	$s.pop();
}
StringBuf.prototype.toString = function() {
	$s.push("StringBuf::toString");
	var $spos = $s.length;
	var $tmp = this.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
kumite.time.Config = function(p) {
	if( p === $_ ) return;
	$s.push("kumite.time.Config::new");
	var $spos = $s.length;
	this.time = new kumite.time.Time();
	this.timeController = new kumite.time.TimeController();
	$s.pop();
}
kumite.time.Config.__name__ = ["kumite","time","Config"];
kumite.time.Config.prototype.time = null;
kumite.time.Config.prototype.timeController = null;
kumite.time.Config.prototype.__class__ = kumite.time.Config;
kumite.time.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.time.TimeController = function(p) {
	$s.push("kumite.time.TimeController::new");
	var $spos = $s.length;
	$s.pop();
}
kumite.time.TimeController.__name__ = ["kumite","time","TimeController"];
kumite.time.TimeController.prototype.time = null;
kumite.time.TimeController.prototype.messenger = null;
kumite.time.TimeController.prototype.startComplete = function() {
	$s.push("kumite.time.TimeController::startComplete");
	var $spos = $s.length;
	this.time.reset();
	GLAnimationFrame.run($closure(this,"timerUpdate"));
	$s.pop();
}
kumite.time.TimeController.prototype.timerUpdate = function() {
	$s.push("kumite.time.TimeController::timerUpdate");
	var $spos = $s.length;
	this.time.tick();
	this.messenger.send(new kumite.time.Tick());
	$s.pop();
}
kumite.time.TimeController.prototype.__class__ = kumite.time.TimeController;
kumite.time.TimeController.__interfaces__ = [haxe.rtti.Infos];
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	$s.push("Lambda::array");
	var $spos = $s.length;
	var a = new Array();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	$s.pop();
	return a;
	$s.pop();
}
Lambda.list = function(it) {
	$s.push("Lambda::list");
	var $spos = $s.length;
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	$s.pop();
	return l;
	$s.pop();
}
Lambda.map = function(it,f) {
	$s.push("Lambda::map");
	var $spos = $s.length;
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	$s.pop();
	return l;
	$s.pop();
}
Lambda.mapi = function(it,f) {
	$s.push("Lambda::mapi");
	var $spos = $s.length;
	var l = new List();
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	$s.pop();
	return l;
	$s.pop();
}
Lambda.has = function(it,elt,cmp) {
	$s.push("Lambda::has");
	var $spos = $s.length;
	if(cmp == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) {
				$s.pop();
				return true;
			}
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) {
				$s.pop();
				return true;
			}
		}
	}
	$s.pop();
	return false;
	$s.pop();
}
Lambda.exists = function(it,f) {
	$s.push("Lambda::exists");
	var $spos = $s.length;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) {
			$s.pop();
			return true;
		}
	}
	$s.pop();
	return false;
	$s.pop();
}
Lambda.foreach = function(it,f) {
	$s.push("Lambda::foreach");
	var $spos = $s.length;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) {
			$s.pop();
			return false;
		}
	}
	$s.pop();
	return true;
	$s.pop();
}
Lambda.iter = function(it,f) {
	$s.push("Lambda::iter");
	var $spos = $s.length;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
	$s.pop();
}
Lambda.filter = function(it,f) {
	$s.push("Lambda::filter");
	var $spos = $s.length;
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	$s.pop();
	return l;
	$s.pop();
}
Lambda.fold = function(it,f,first) {
	$s.push("Lambda::fold");
	var $spos = $s.length;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	$s.pop();
	return first;
	$s.pop();
}
Lambda.count = function(it,pred) {
	$s.push("Lambda::count");
	var $spos = $s.length;
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
	$s.pop();
	return n;
	$s.pop();
}
Lambda.empty = function(it) {
	$s.push("Lambda::empty");
	var $spos = $s.length;
	var $tmp = !it.iterator().hasNext();
	$s.pop();
	return $tmp;
	$s.pop();
}
Lambda.indexOf = function(it,v) {
	$s.push("Lambda::indexOf");
	var $spos = $s.length;
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) {
			$s.pop();
			return i;
		}
		i++;
	}
	$s.pop();
	return -1;
	$s.pop();
}
Lambda.concat = function(a,b) {
	$s.push("Lambda::concat");
	var $spos = $s.length;
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
	$s.pop();
	return l;
	$s.pop();
}
Lambda.prototype.__class__ = Lambda;
kumite.presentation.ContainerSlide = function(p) {
	if( p === $_ ) return;
	$s.push("kumite.presentation.ContainerSlide::new");
	var $spos = $s.length;
	kumite.presentation.Slide.call(this);
	this.slides = new Array();
	this.slideIndex = 0;
	this.color = new Color(Math.random(),Math.random(),Math.random());
	this.canvas = new CanvasGraphic();
	this.canvas.usePow2Size = false;
	$s.pop();
}
kumite.presentation.ContainerSlide.__name__ = ["kumite","presentation","ContainerSlide"];
kumite.presentation.ContainerSlide.__super__ = kumite.presentation.Slide;
for(var k in kumite.presentation.Slide.prototype ) kumite.presentation.ContainerSlide.prototype[k] = kumite.presentation.Slide.prototype[k];
kumite.presentation.ContainerSlide.prototype.stage = null;
kumite.presentation.ContainerSlide.prototype.slides = null;
kumite.presentation.ContainerSlide.prototype.color = null;
kumite.presentation.ContainerSlide.prototype.canvas = null;
kumite.presentation.ContainerSlide.prototype.slideIndex = null;
kumite.presentation.ContainerSlide.prototype.container = null;
kumite.presentation.ContainerSlide.prototype.addSlide = function(slide) {
	$s.push("kumite.presentation.ContainerSlide::addSlide");
	var $spos = $s.length;
	var slideAndDiv = new kumite.presentation.SlideAndDiv();
	slideAndDiv.slide = slide;
	this.slides.push(slideAndDiv);
	$s.pop();
	return this;
	$s.pop();
}
kumite.presentation.ContainerSlide.prototype.init = function() {
	$s.push("kumite.presentation.ContainerSlide::init");
	var $spos = $s.length;
	{
		Log.posInfo = { fileName : "ContainerSlide.hx", lineNumber : 47, className : "kumite.presentation.ContainerSlide", methodName : "init"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(null,null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	var _g = 0, _g1 = this.slides;
	while(_g < _g1.length) {
		var slide = _g1[_g];
		++_g;
		bpmjs.ContextBuilder.configure(slide.slide);
	}
	$s.pop();
}
kumite.presentation.ContainerSlide.prototype.prepare = function(root) {
	$s.push("kumite.presentation.ContainerSlide::prepare");
	var $spos = $s.length;
	kumite.presentation.Slide.prototype.prepare.call(this,root);
	this.container = js.Lib.document.createElement("div");
	root.appendChild(this.container);
	var _g = 0, _g1 = this.slides;
	while(_g < _g1.length) {
		var slideAndDiv = _g1[_g];
		++_g;
		var slideContainer = js.Lib.document.createElement("div");
		slideContainer.style.width = this.stage.width + "px";
		slideContainer.style.height = this.stage.height + "px";
		slideContainer.style.position = "absolute";
		this.container.appendChild(slideContainer);
		slideAndDiv.div = slideContainer;
		slideAndDiv.slide.prepare(slideContainer);
		slideAndDiv.slide.resize(this.stage);
	}
	this.slides[this.slideIndex].slide.clickSignaler.bind($closure(this,"gotoNextSlide"));
	$s.pop();
}
kumite.presentation.ContainerSlide.prototype.resize = function(stage) {
	$s.push("kumite.presentation.ContainerSlide::resize");
	var $spos = $s.length;
	kumite.presentation.Slide.prototype.resize.call(this,stage);
	this.container.setAttribute("style","top:" + this.row * stage.height + "px; position:absolute; overflow-x:hidden; height:" + stage.height + "px; width:" + stage.width + "px");
	var index = 0;
	var _g = 0, _g1 = this.slides;
	while(_g < _g1.length) {
		var slideAndDiv = _g1[_g];
		++_g;
		slideAndDiv.div.style.left = (index - this.slideIndex) * stage.width + "px";
		slideAndDiv.div.style.width = stage.width + "px";
		slideAndDiv.div.style.height = stage.height + "px";
		slideAndDiv.slide.resize(stage);
		index++;
	}
	$s.pop();
}
kumite.presentation.ContainerSlide.prototype.getMemento = function() {
	$s.push("kumite.presentation.ContainerSlide::getMemento");
	var $spos = $s.length;
	var $tmp = this.slideIndex;
	$s.pop();
	return $tmp;
	$s.pop();
}
kumite.presentation.ContainerSlide.prototype.setMemento = function(memento) {
	$s.push("kumite.presentation.ContainerSlide::setMemento");
	var $spos = $s.length;
	if(!Math.isNaN(memento)) this.changeSlide(memento);
	$s.pop();
}
kumite.presentation.ContainerSlide.prototype.gotoNextSlide = function(_) {
	$s.push("kumite.presentation.ContainerSlide::gotoNextSlide");
	var $spos = $s.length;
	this.changeSlide(this.slideIndex + 1);
	$s.pop();
}
kumite.presentation.ContainerSlide.prototype.changeSlide = function(newIndex) {
	$s.push("kumite.presentation.ContainerSlide::changeSlide");
	var $spos = $s.length;
	this.slides[this.slideIndex].slide.clickSignaler.unbind($closure(this,"gotoNextSlide"));
	this.slideIndex = newIndex % this.slides.length;
	this.slides[this.slideIndex].slide.clickSignaler.bind($closure(this,"gotoNextSlide"));
	this.resize(this.stage);
	$s.pop();
}
kumite.presentation.ContainerSlide.prototype.__class__ = kumite.presentation.ContainerSlide;
kumite.presentation.ContainerSlide.__interfaces__ = [haxe.rtti.Infos];
kumite.presentation.SlideAndDiv = function(p) {
	$s.push("kumite.presentation.SlideAndDiv::new");
	var $spos = $s.length;
	$s.pop();
}
kumite.presentation.SlideAndDiv.__name__ = ["kumite","presentation","SlideAndDiv"];
kumite.presentation.SlideAndDiv.prototype.slide = null;
kumite.presentation.SlideAndDiv.prototype.div = null;
kumite.presentation.SlideAndDiv.prototype.__class__ = kumite.presentation.SlideAndDiv;
haxe.rtti.Meta = function() { }
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getType = function(t) {
	$s.push("haxe.rtti.Meta::getType");
	var $spos = $s.length;
	var meta = t.__meta__;
	var $tmp = meta == null || meta.obj == null?{ }:meta.obj;
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.Meta.getStatics = function(t) {
	$s.push("haxe.rtti.Meta::getStatics");
	var $spos = $s.length;
	var meta = t.__meta__;
	var $tmp = meta == null || meta.statics == null?{ }:meta.statics;
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.Meta.getFields = function(t) {
	$s.push("haxe.rtti.Meta::getFields");
	var $spos = $s.length;
	var meta = t.__meta__;
	var $tmp = meta == null || meta.fields == null?{ }:meta.fields;
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.Meta.prototype.__class__ = haxe.rtti.Meta;
bpmjs.Messenger = function(p) {
	if( p === $_ ) return;
	$s.push("bpmjs.Messenger::new");
	var $spos = $s.length;
	this.receivers = new Array();
	$s.pop();
}
bpmjs.Messenger.__name__ = ["bpmjs","Messenger"];
bpmjs.Messenger.prototype.receivers = null;
bpmjs.Messenger.prototype.addReceiver = function(type,listener) {
	$s.push("bpmjs.Messenger::addReceiver");
	var $spos = $s.length;
	this.removeReceiver(type,listener);
	this.receivers.push(new bpmjs._Messenger.ReceiverForType(type,listener));
	$s.pop();
}
bpmjs.Messenger.prototype.removeReceiver = function(type,listener) {
	$s.push("bpmjs.Messenger::removeReceiver");
	var $spos = $s.length;
	var _g = 0, _g1 = this.receivers;
	while(_g < _g1.length) {
		var receiver = _g1[_g];
		++_g;
		if(receiver.type == type && Reflect.compareMethods(listener,receiver.method)) {
			this.receivers.remove(receiver);
			$s.pop();
			return;
		}
	}
	$s.pop();
}
bpmjs.Messenger.prototype.send = function(message) {
	$s.push("bpmjs.Messenger::send");
	var $spos = $s.length;
	var _g = 0, _g1 = this.receivers;
	while(_g < _g1.length) {
		var receiver = _g1[_g];
		++_g;
		if(receiver.type == null || receiver.type == Type.getClass(message)) receiver.method(message);
	}
	$s.pop();
}
bpmjs.Messenger.prototype.toString = function() {
	$s.push("bpmjs.Messenger::toString");
	var $spos = $s.length;
	var $tmp = Type.getClassName(Type.getClass(this));
	$s.pop();
	return $tmp;
	$s.pop();
}
bpmjs.Messenger.prototype.__class__ = bpmjs.Messenger;
if(!bpmjs._Messenger) bpmjs._Messenger = {}
bpmjs._Messenger.ReceiverForType = function(type,method) {
	if( type === $_ ) return;
	$s.push("bpmjs._Messenger.ReceiverForType::new");
	var $spos = $s.length;
	this.type = type;
	this.method = method;
	$s.pop();
}
bpmjs._Messenger.ReceiverForType.__name__ = ["bpmjs","_Messenger","ReceiverForType"];
bpmjs._Messenger.ReceiverForType.prototype.type = null;
bpmjs._Messenger.ReceiverForType.prototype.method = null;
bpmjs._Messenger.ReceiverForType.prototype.__class__ = bpmjs._Messenger.ReceiverForType;
bpmjs.ContextBuilder = function(p) {
	if( p === $_ ) return;
	$s.push("bpmjs.ContextBuilder::new");
	var $spos = $s.length;
	this.context = new bpmjs.Context();
	$s.pop();
}
bpmjs.ContextBuilder.__name__ = ["bpmjs","ContextBuilder"];
bpmjs.ContextBuilder.defaultContext = null;
bpmjs.ContextBuilder.build = function(configClass,contextConfig) {
	$s.push("bpmjs.ContextBuilder::build");
	var $spos = $s.length;
	var $tmp = bpmjs.ContextBuilder.buildAll([configClass],contextConfig);
	$s.pop();
	return $tmp;
	$s.pop();
}
bpmjs.ContextBuilder.buildAll = function(configClasses,contextConfig) {
	$s.push("bpmjs.ContextBuilder::buildAll");
	var $spos = $s.length;
	var builder = new bpmjs.ContextBuilder();
	bpmjs.ContextBuilder.defaultContext = builder.context;
	builder.contextConfig = contextConfig == null?bpmjs.ContextBuilder.createDefaultContextConfig():contextConfig;
	builder.buildInternal(configClasses);
	var $tmp = bpmjs.ContextBuilder.defaultContext;
	$s.pop();
	return $tmp;
	$s.pop();
}
bpmjs.ContextBuilder.configure = function(object) {
	$s.push("bpmjs.ContextBuilder::configure");
	var $spos = $s.length;
	var builder = new bpmjs.ContextBuilder();
	if(bpmjs.ContextBuilder.defaultContext == null) throw builder.createError("Cannot configure Object as no context is available!");
	builder.contextConfig = bpmjs.ContextBuilder.defaultContext.contextConfig;
	builder.context = bpmjs.ContextBuilder.defaultContext;
	builder.configureInternal(object);
	$s.pop();
}
bpmjs.ContextBuilder.createDefaultContextConfig = function() {
	$s.push("bpmjs.ContextBuilder::createDefaultContextConfig");
	var $spos = $s.length;
	var defaultContextConfig = new bpmjs.ContextConfig();
	defaultContextConfig.frontMessenger = new bpmjs.DefaultFrontMessenger();
	$s.pop();
	return defaultContextConfig;
	$s.pop();
}
bpmjs.ContextBuilder.prototype.context = null;
bpmjs.ContextBuilder.prototype.contextConfig = null;
bpmjs.ContextBuilder.prototype.configureInternal = function(object) {
	$s.push("bpmjs.ContextBuilder::configureInternal");
	var $spos = $s.length;
	var contextObject = this.context.addObject("configured",reflect.ClassInfo.forInstance(object),object);
	this.configureDynamicObjects([contextObject]);
	$s.pop();
}
bpmjs.ContextBuilder.prototype.buildInternal = function(configClasses) {
	$s.push("bpmjs.ContextBuilder::buildInternal");
	var $spos = $s.length;
	this.context.contextConfig = this.contextConfig;
	Lambda.iter(configClasses,$closure(this,"createObjects"));
	this.configureDynamicObjects(this.context.objects);
	$s.pop();
}
bpmjs.ContextBuilder.prototype.createObjects = function(configClass) {
	$s.push("bpmjs.ContextBuilder::createObjects");
	var $spos = $s.length;
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
			$e = [];
			while($s.length >= $spos) $e.unshift($s.pop());
			$s.push($e[0]);
			{
				Log.posInfo = { fileName : "ContextBuilder.hx", lineNumber : 112, className : "bpmjs.ContextBuilder", methodName : "createObjects"};
				if(Log.filter(LogLevel.WARN)) {
					Log.fetchInput(e,null,null,null,null,null,null);
					console.warn(Log.createMessage());
				}
			}
		}
	}
	$s.pop();
}
bpmjs.ContextBuilder.prototype.configureDynamicObjects = function(objects) {
	$s.push("bpmjs.ContextBuilder::configureDynamicObjects");
	var $spos = $s.length;
	Lambda.iter(objects,$closure(this,"wireContextObject"));
	Lambda.iter(objects,$closure(this,"findObservers"));
	Lambda.iter(objects,$closure(this,"registerMessengerByObjectType"));
	Lambda.iter(objects,$closure(this,"registerMessengers"));
	Lambda.iter(objects,$closure(this,"registerReceivers"));
	Lambda.iter(objects,$closure(this,"doObserve"));
	Lambda.iter(objects,$closure(this,"doCompleteCall"));
	Lambda.iter(objects,$closure(this,"doPostCompleteCall"));
	$s.pop();
}
bpmjs.ContextBuilder.prototype.wireContextObject = function(contextObject) {
	$s.push("bpmjs.ContextBuilder::wireContextObject");
	var $spos = $s.length;
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
	$s.pop();
}
bpmjs.ContextBuilder.prototype.findObservers = function(contextObject) {
	$s.push("bpmjs.ContextBuilder::findObservers");
	var $spos = $s.length;
	var _g = 0, _g1 = contextObject.classInfo.getMethods();
	while(_g < _g1.length) {
		var method = _g1[_g];
		++_g;
		if(method.hasMetadata("Observe")) {
			if(method.getParameters().length == 1) this.context.addObserver(contextObject,method.field.name,reflect.ClassInfo.forCType(method.getParameters()[0].def.t)); else throw "Method to observe: " + contextObject.classInfo.name + "." + method.field.name + " needs exactly one parameter";
		}
	}
	$s.pop();
}
bpmjs.ContextBuilder.prototype.registerMessengerByObjectType = function(contextObject) {
	$s.push("bpmjs.ContextBuilder::registerMessengerByObjectType");
	var $spos = $s.length;
	if(Std["is"](contextObject.object,bpmjs.Messenger)) this.contextConfig.frontMessenger.addMessenger(contextObject.object);
	$s.pop();
}
bpmjs.ContextBuilder.prototype.registerMessengers = function(contextObject) {
	$s.push("bpmjs.ContextBuilder::registerMessengers");
	var $spos = $s.length;
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
	$s.pop();
}
bpmjs.ContextBuilder.prototype.registerReceivers = function(contextObject) {
	$s.push("bpmjs.ContextBuilder::registerReceivers");
	var $spos = $s.length;
	var _g = 0, _g1 = contextObject.classInfo.getMethods();
	while(_g < _g1.length) {
		var method = _g1[_g];
		++_g;
		if(method.hasMetadata("Message")) {
			if(method.getParameters().length == 1) this.contextConfig.frontMessenger.addReceiver(contextObject.object,method.field.name,reflect.ClassInfo.forCType(method.getParameters()[0].def.t).type); else throw "Message: " + contextObject.classInfo.name + "." + method.field.name + " needs exactly one parameter";
		}
	}
	$s.pop();
}
bpmjs.ContextBuilder.prototype.doObserve = function(contextObject) {
	$s.push("bpmjs.ContextBuilder::doObserve");
	var $spos = $s.length;
	var _g = 0, _g1 = this.context.observers;
	while(_g < _g1.length) {
		var observer = _g1[_g];
		++_g;
		observer.observe(contextObject);
	}
	$s.pop();
}
bpmjs.ContextBuilder.prototype.doCompleteCall = function(contextObject) {
	$s.push("bpmjs.ContextBuilder::doCompleteCall");
	var $spos = $s.length;
	bpmjs.ReflectUtil.callMethodWithMetadata(contextObject.object,contextObject.type,"Complete",[]);
	$s.pop();
}
bpmjs.ContextBuilder.prototype.doPostCompleteCall = function(contextObject) {
	$s.push("bpmjs.ContextBuilder::doPostCompleteCall");
	var $spos = $s.length;
	bpmjs.ReflectUtil.callMethodWithMetadata(contextObject.object,contextObject.type,"PostComplete",[]);
	$s.pop();
}
bpmjs.ContextBuilder.prototype.createError = function(message) {
	$s.push("bpmjs.ContextBuilder::createError");
	var $spos = $s.length;
	var $tmp = "ContextBuilder ERROR: " + message;
	$s.pop();
	return $tmp;
	$s.pop();
}
bpmjs.ContextBuilder.prototype.__class__ = bpmjs.ContextBuilder;
Log = function() { }
Log.__name__ = ["Log"];
Log.posInfo = null;
Log.errorDiv = null;
Log["debugger"] = function() {
	$s.push("Log::debugger");
	var $spos = $s.length;
	debugger;
	$s.pop();
}
Log.profile = function(title) {
	$s.push("Log::profile");
	var $spos = $s.length;
	console.profile(title);
	$s.pop();
}
Log.profileEnd = function() {
	$s.push("Log::profileEnd");
	var $spos = $s.length;
	console.profileEnd();
	$s.pop();
}
Log.init = function() {
	$s.push("Log::init");
	var $spos = $s.length;
	if(!window.console) console = { };
	console.log = console.log || function() {
		$s.push("Log::init@32");
		var $spos = $s.length;
		$s.pop();
	};
	console.info = console.info || function() {
		$s.push("Log::init@33");
		var $spos = $s.length;
		$s.pop();
	};
	console.warn = console.warn || function() {
		$s.push("Log::init@34");
		var $spos = $s.length;
		$s.pop();
	};
	console.error = console.error || function() {
		$s.push("Log::init@35");
		var $spos = $s.length;
		$s.pop();
	};
	haxe.Log.trace = Log.infoConsole;
	$s.pop();
}
Log.addFilter = function(filter) {
	$s.push("Log::addFilter");
	var $spos = $s.length;
	Log.filters.push(filter);
	$s.pop();
}
Log.info = function(m0,m1,m2,m3,m4,m5,m6,i) {
	$s.push("Log::info");
	var $spos = $s.length;
	Log.posInfo = i;
	if(Log.filter(LogLevel.INFO)) {
		Log.fetchInput(m0,m1,m2,m3,m4,m5,m6);
		console.info(Log.createMessage());
	}
	$s.pop();
}
Log.warn = function(m0,m1,m2,m3,m4,m5,m6,i) {
	$s.push("Log::warn");
	var $spos = $s.length;
	Log.posInfo = i;
	if(Log.filter(LogLevel.WARN)) {
		Log.fetchInput(m0,m1,m2,m3,m4,m5,m6);
		console.warn(Log.createMessage());
	}
	$s.pop();
}
Log.error = function(m0,m1,m2,m3,m4,m5,m6,i) {
	$s.push("Log::error");
	var $spos = $s.length;
	Log.posInfo = i;
	if(Log.filter(LogLevel.ERROR)) {
		Log.fetchInput(m0,m1,m2,m3,m4,m5,m6);
		console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
		Log.displayError(Log.createErrorMessage());
	}
	$s.pop();
}
Log.infoEnabled = function(i) {
	$s.push("Log::infoEnabled");
	var $spos = $s.length;
	Log.posInfo = i;
	var $tmp = Log.filter(LogLevel.INFO);
	$s.pop();
	return $tmp;
	$s.pop();
}
Log.warnEnabled = function(i) {
	$s.push("Log::warnEnabled");
	var $spos = $s.length;
	Log.posInfo = i;
	var $tmp = Log.filter(LogLevel.WARN);
	$s.pop();
	return $tmp;
	$s.pop();
}
Log.errorEnabled = function(i) {
	$s.push("Log::errorEnabled");
	var $spos = $s.length;
	Log.posInfo = i;
	var $tmp = Log.filter(LogLevel.ERROR);
	$s.pop();
	return $tmp;
	$s.pop();
}
Log.groupCollapsed = function(m0,m1,m2,m3,m4,m5,m6,i) {
	$s.push("Log::groupCollapsed");
	var $spos = $s.length;
	if(Log.infoEnabled(i)) {
		Log.fetchInput(m0,m1,m2,m3,m4,m5,m6);
		console.groupCollapsed(Log.createMessage());
	}
	$s.pop();
}
Log.groupEnd = function(i) {
	$s.push("Log::groupEnd");
	var $spos = $s.length;
	if(Log.infoEnabled(i)) console.groupEnd();
	$s.pop();
}
Log.fetchInput = function(m0,m1,m2,m3,m4,m5,m6) {
	$s.push("Log::fetchInput");
	var $spos = $s.length;
	Log.args = new Array();
	if(m0 != null) Log.args.push(m0);
	if(m1 != null) Log.args.push(m1);
	if(m2 != null) Log.args.push(m2);
	if(m3 != null) Log.args.push(m3);
	if(m4 != null) Log.args.push(m4);
	if(m5 != null) Log.args.push(m5);
	if(m6 != null) Log.args.push(m6);
	$s.pop();
}
Log.createMessage = function() {
	$s.push("Log::createMessage");
	var $spos = $s.length;
	if(Log.posInfo == null) {
		var $tmp = Log.args.join(" ");
		$s.pop();
		return $tmp;
	}
	var from = Log.posInfo.className + "." + Log.posInfo.methodName;
	var $tmp = "[" + from + "] " + Log.args.join(" ");
	$s.pop();
	return $tmp;
	$s.pop();
}
Log.createErrorMessage = function() {
	$s.push("Log::createErrorMessage");
	var $spos = $s.length;
	if(Log.posInfo == null) {
		var $tmp = Log.args.join(" ");
		$s.pop();
		return $tmp;
	}
	var from = Log.posInfo.className + "." + Log.posInfo.methodName;
	var $tmp = "[" + from + "]\n" + Log.args.join(" ");
	$s.pop();
	return $tmp;
	$s.pop();
}
Log.filter = function(level) {
	$s.push("Log::filter");
	var $spos = $s.length;
	if(Log.posInfo == null) {
		$s.pop();
		return true;
	}
	var result = true;
	var _g = 0, _g1 = Log.filters;
	while(_g < _g1.length) {
		var filter = _g1[_g];
		++_g;
		result = filter.enabled(result,Log.posInfo,level);
	}
	$s.pop();
	return result;
	$s.pop();
}
Log.infoConsole = function(v,i) {
	$s.push("Log::infoConsole");
	var $spos = $s.length;
	Log.posInfo = i;
	Log.fetchInput(v);
	console.log("" + Log.createMessage() + " (trace)");
	$s.pop();
}
Log.displayError = function(message) {
	$s.push("Log::displayError");
	var $spos = $s.length;
	if($closure(js.Lib.document,"createElement") == null) {
		$s.pop();
		return;
	}
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
	$s.pop();
}
Log.prototype.errorFilter = function() {
	$s.push("Log::errorFilter");
	var $spos = $s.length;
	$s.pop();
}
Log.prototype.__class__ = Log;
bpmjs.ProgressMonitor = function(p) {
	if( p === $_ ) return;
	$s.push("bpmjs.ProgressMonitor::new");
	var $spos = $s.length;
	this.name = "";
	this.reset();
	$s.pop();
}
bpmjs.ProgressMonitor.__name__ = ["bpmjs","ProgressMonitor"];
bpmjs.ProgressMonitor.prototype.name = null;
bpmjs.ProgressMonitor.prototype.weight = null;
bpmjs.ProgressMonitor.prototype.current = null;
bpmjs.ProgressMonitor.prototype.children = null;
bpmjs.ProgressMonitor.prototype.reset = function() {
	$s.push("bpmjs.ProgressMonitor::reset");
	var $spos = $s.length;
	this.children = new Array();
	this.setCurrent(0);
	this.weight = 1;
	$s.pop();
}
bpmjs.ProgressMonitor.prototype.append = function(monitor,total) {
	$s.push("bpmjs.ProgressMonitor::append");
	var $spos = $s.length;
	var monitorAndTotal = new bpmjs._ProgressMonitor.MonitorAndTotal();
	monitorAndTotal.total = total;
	monitorAndTotal.monitor = monitor;
	this.children.push(monitorAndTotal);
	$s.pop();
	return monitor;
	$s.pop();
}
bpmjs.ProgressMonitor.prototype.done = function() {
	$s.push("bpmjs.ProgressMonitor::done");
	var $spos = $s.length;
	this.setCurrent(1);
	$s.pop();
}
bpmjs.ProgressMonitor.prototype.getCurrent = function() {
	$s.push("bpmjs.ProgressMonitor::getCurrent");
	var $spos = $s.length;
	if(this.children.length == 0) {
		var $tmp = this.current;
		$s.pop();
		return $tmp;
	} else {
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
		$s.pop();
		return childCurrent;
	}
	$s.pop();
}
bpmjs.ProgressMonitor.prototype.setCurrent = function(value) {
	$s.push("bpmjs.ProgressMonitor::setCurrent");
	var $spos = $s.length;
	this.current = value;
	$s.pop();
	return value;
	$s.pop();
}
bpmjs.ProgressMonitor.prototype.__class__ = bpmjs.ProgressMonitor;
if(!bpmjs._ProgressMonitor) bpmjs._ProgressMonitor = {}
bpmjs._ProgressMonitor.MonitorAndTotal = function(p) {
	$s.push("bpmjs._ProgressMonitor.MonitorAndTotal::new");
	var $spos = $s.length;
	$s.pop();
}
bpmjs._ProgressMonitor.MonitorAndTotal.__name__ = ["bpmjs","_ProgressMonitor","MonitorAndTotal"];
bpmjs._ProgressMonitor.MonitorAndTotal.prototype.total = null;
bpmjs._ProgressMonitor.MonitorAndTotal.prototype.monitor = null;
bpmjs._ProgressMonitor.MonitorAndTotal.prototype.__class__ = bpmjs._ProgressMonitor.MonitorAndTotal;
reflect.Property = function(field,definedInClass,owner) {
	if( field === $_ ) return;
	$s.push("reflect.Property::new");
	var $spos = $s.length;
	reflect.Field.call(this,field,definedInClass,owner);
	$s.pop();
}
reflect.Property.__name__ = ["reflect","Property"];
reflect.Property.__super__ = reflect.Field;
for(var k in reflect.Field.prototype ) reflect.Property.prototype[k] = reflect.Field.prototype[k];
reflect.Property.prototype.getValue = function(instance) {
	$s.push("reflect.Property::getValue");
	var $spos = $s.length;
	var $tmp = Reflect.field(instance,this.field.name);
	$s.pop();
	return $tmp;
	$s.pop();
}
reflect.Property.prototype.setValue = function(instance,value) {
	$s.push("reflect.Property::setValue");
	var $spos = $s.length;
	instance[this.field.name] = value;
	$s.pop();
}
reflect.Property.prototype.__class__ = reflect.Property;
GLTween = function(o,ms,params) {
	if( o === $_ ) return;
	$s.push("GLTween::new");
	var $spos = $s.length;
	this.o = o;
	this.ms = ms;
	this.params = params;
	this.isActive = true;
	this.properties = new Array();
	this.completeSignaler = new hsl.haxe.DirectSignaler(this);
	$s.pop();
}
GLTween.__name__ = ["GLTween"];
GLTween.to = function(o,ms,params) {
	$s.push("GLTween::to");
	var $spos = $s.length;
	var result = new GLTween(o,ms,params);
	GLTweenManager.getInstance().add(result);
	$s.pop();
	return result;
	$s.pop();
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
	$s.push("GLTween::complete");
	var $spos = $s.length;
	this.completeSignaler.bind(method);
	$s.pop();
	return this;
	$s.pop();
}
GLTween.prototype.init = function(time) {
	$s.push("GLTween::init");
	var $spos = $s.length;
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
	$s.pop();
}
GLTween.prototype.run = function(time) {
	$s.push("GLTween::run");
	var $spos = $s.length;
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
	$s.pop();
}
GLTween.prototype.__class__ = GLTween;
Property = function(p) {
	$s.push("Property::new");
	var $spos = $s.length;
	$s.pop();
}
Property.__name__ = ["Property"];
Property.prototype.from = null;
Property.prototype.to = null;
Property.prototype.field = null;
Property.prototype.ease = function(tween,dt) {
	$s.push("Property::ease");
	var $spos = $s.length;
	var o = tween.o;
	var value = tween.easeFunction(dt,this.from,this.to - this.from,tween.ms);
	o[this.field] = value;
	$s.pop();
}
Property.prototype.__class__ = Property;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	$s.push("haxe.Log::trace");
	var $spos = $s.length;
	js.Boot.__trace(v,infos);
	$s.pop();
}
haxe.Log.clear = function() {
	$s.push("haxe.Log::clear");
	var $spos = $s.length;
	js.Boot.__clear_trace();
	$s.pop();
}
haxe.Log.prototype.__class__ = haxe.Log;
Math2 = function() { }
Math2.__name__ = ["Math2"];
Math2.nextPowerOf2 = function(value) {
	$s.push("Math2::nextPowerOf2");
	var $spos = $s.length;
	var val = Std["int"](value);
	val--;
	val = val >> 1 | val;
	val = val >> 2 | val;
	val = val >> 4 | val;
	val = val >> 8 | val;
	val = val >> 16 | val;
	val++;
	$s.pop();
	return val;
	$s.pop();
}
Math2.signum = function(value) {
	$s.push("Math2::signum");
	var $spos = $s.length;
	if(value > 0) {
		$s.pop();
		return 1;
	} else if(value < 0) {
		$s.pop();
		return -1;
	}
	$s.pop();
	return 0;
	$s.pop();
}
Math2.sin1 = function(rad1) {
	$s.push("Math2::sin1");
	var $spos = $s.length;
	var $tmp = Math.sin(rad1 * Math.PI * 2) * 0.5 + 0.5;
	$s.pop();
	return $tmp;
	$s.pop();
}
Math2.prototype.__class__ = Math2;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	$s.push("Std::is");
	var $spos = $s.length;
	var $tmp = js.Boot.__instanceof(v,t);
	$s.pop();
	return $tmp;
	$s.pop();
}
Std.string = function(s) {
	$s.push("Std::string");
	var $spos = $s.length;
	var $tmp = js.Boot.__string_rec(s,"");
	$s.pop();
	return $tmp;
	$s.pop();
}
Std["int"] = function(x) {
	$s.push("Std::int");
	var $spos = $s.length;
	if(x < 0) {
		var $tmp = Math.ceil(x);
		$s.pop();
		return $tmp;
	}
	var $tmp = Math.floor(x);
	$s.pop();
	return $tmp;
	$s.pop();
}
Std.parseInt = function(x) {
	$s.push("Std::parseInt");
	var $spos = $s.length;
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) {
		$s.pop();
		return null;
	}
	var $tmp = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Std.parseFloat = function(x) {
	$s.push("Std::parseFloat");
	var $spos = $s.length;
	var $tmp = parseFloat(x);
	$s.pop();
	return $tmp;
	$s.pop();
}
Std.random = function(x) {
	$s.push("Std::random");
	var $spos = $s.length;
	var $tmp = Math.floor(Math.random() * x);
	$s.pop();
	return $tmp;
	$s.pop();
}
Std.prototype.__class__ = Std;
reflect.Method = function(field,args,ret,definedInClass,owner) {
	if( field === $_ ) return;
	$s.push("reflect.Method::new");
	var $spos = $s.length;
	reflect.Field.call(this,field,definedInClass,owner);
	this.args = args;
	this.ret = ret;
	$s.pop();
}
reflect.Method.__name__ = ["reflect","Method"];
reflect.Method.__super__ = reflect.Field;
for(var k in reflect.Field.prototype ) reflect.Method.prototype[k] = reflect.Field.prototype[k];
reflect.Method.prototype.parameters = null;
reflect.Method.prototype.args = null;
reflect.Method.prototype.ret = null;
reflect.Method.prototype.getParameters = function() {
	$s.push("reflect.Method::getParameters");
	var $spos = $s.length;
	if(this.parameters != null) {
		var $tmp = this.parameters;
		$s.pop();
		return $tmp;
	}
	this.parameters = new Array();
	var $it0 = this.args.iterator();
	while( $it0.hasNext() ) {
		var arg = $it0.next();
		var parameter = new reflect.Parameter(arg);
		this.parameters.push(parameter);
	}
	var $tmp = this.parameters;
	$s.pop();
	return $tmp;
	$s.pop();
}
reflect.Method.prototype.call = function(instance,params) {
	$s.push("reflect.Method::call");
	var $spos = $s.length;
	Reflect.field(instance,this.field.name).apply(instance,params);
	$s.pop();
}
reflect.Method.prototype.__class__ = reflect.Method;
haxe.TypeTools = function() { }
haxe.TypeTools.__name__ = ["haxe","TypeTools"];
haxe.TypeTools.getClassNames = function(value) {
	$s.push("haxe.TypeTools::getClassNames");
	var $spos = $s.length;
	var result = new List();
	var valueClass = Std["is"](value,Class)?value:Type.getClass(value);
	while(null != valueClass) {
		result.add(Type.getClassName(valueClass));
		valueClass = Type.getSuperClass(valueClass);
	}
	$s.pop();
	return result;
	$s.pop();
}
haxe.TypeTools.prototype.__class__ = haxe.TypeTools;
GLTweenManager = function(p) {
	if( p === $_ ) return;
	$s.push("GLTweenManager::new");
	var $spos = $s.length;
	this.time = Date.now().getTime();
	this.tweens = new Array();
	GLAnimationFrame.run($closure(this,"tick"));
	$s.pop();
}
GLTweenManager.__name__ = ["GLTweenManager"];
GLTweenManager.instance = null;
GLTweenManager.getInstance = function() {
	$s.push("GLTweenManager::getInstance");
	var $spos = $s.length;
	if(GLTweenManager.instance == null) GLTweenManager.instance = new GLTweenManager();
	var $tmp = GLTweenManager.instance;
	$s.pop();
	return $tmp;
	$s.pop();
}
GLTweenManager.prototype.tweens = null;
GLTweenManager.prototype.time = null;
GLTweenManager.prototype.add = function(tween) {
	$s.push("GLTweenManager::add");
	var $spos = $s.length;
	tween.init(this.time);
	this.tweens.push(tween);
	$s.pop();
}
GLTweenManager.prototype.tick = function() {
	$s.push("GLTweenManager::tick");
	var $spos = $s.length;
	this.time = Date.now().getTime();
	var _g = 0, _g1 = this.tweens;
	while(_g < _g1.length) {
		var tween = _g1[_g];
		++_g;
		tween.run(this.time);
		if(!tween.isActive) this.tweens.remove(tween);
	}
	$s.pop();
}
GLTweenManager.prototype.__class__ = GLTweenManager;
CanvasGraphic = function(p) {
	if( p === $_ ) return;
	$s.push("CanvasGraphic::new");
	var $spos = $s.length;
	this.canvas = js.Lib.document.createElement("canvas");
	this.context = this.canvas.getContext("2d");
	this.usePow2Size = true;
	this.setWidth(0);
	this.setHeight(0);
	$s.pop();
}
CanvasGraphic.__name__ = ["CanvasGraphic"];
CanvasGraphic.prototype.width = null;
CanvasGraphic.prototype.height = null;
CanvasGraphic.prototype.aspect = null;
CanvasGraphic.prototype.fillStyle = null;
CanvasGraphic.prototype.font = null;
CanvasGraphic.prototype.isInvalid = null;
CanvasGraphic.prototype.canvas = null;
CanvasGraphic.prototype.context = null;
CanvasGraphic.prototype.usePow2Size = null;
CanvasGraphic.prototype.clear = function(color) {
	$s.push("CanvasGraphic::clear");
	var $spos = $s.length;
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
	$s.pop();
}
CanvasGraphic.prototype.fillRect = function(x,y,width,height) {
	$s.push("CanvasGraphic::fillRect");
	var $spos = $s.length;
	this.context.fillRect(x,y,width,height);
	this.isInvalid = true;
	$s.pop();
}
CanvasGraphic.prototype.fillText = function(text,x,y,maxWidth) {
	$s.push("CanvasGraphic::fillText");
	var $spos = $s.length;
	if(text == null) text = "null";
	this.context.fillText(text,x,y);
	this.isInvalid = true;
	$s.pop();
}
CanvasGraphic.prototype.drawImage = function(image,dx,dy,dw,dh) {
	$s.push("CanvasGraphic::drawImage");
	var $spos = $s.length;
	this.context.drawImage(image,dx,dy,dw,dh);
	$s.pop();
}
CanvasGraphic.prototype.drawImage2 = function(image,dx,dy) {
	$s.push("CanvasGraphic::drawImage2");
	var $spos = $s.length;
	this.context.drawImage(image,dx,dy);
	$s.pop();
}
CanvasGraphic.prototype.drawImage3 = function(image) {
	$s.push("CanvasGraphic::drawImage3");
	var $spos = $s.length;
	var imageAspect = image.width / image.height;
	var ix;
	var iy;
	var iw;
	var ih;
	if(this.getAspect() > imageAspect) {
		iw = this.width;
		ih = this.width / imageAspect;
		ix = 0;
		iy = -(ih - this.height) / 2;
		this.context.drawImage(image,ix,iy,iw,ih);
	} else {
		iw = this.height * imageAspect;
		ih = this.height;
		ix = -(iw - this.width) / 2;
		iy = 0;
		this.context.drawImage(image,ix,iy,iw,ih);
	}
	var $tmp = { scale : iw / image.width, x : ix, y : iy};
	$s.pop();
	return $tmp;
	$s.pop();
}
CanvasGraphic.prototype.getAspect = function() {
	$s.push("CanvasGraphic::getAspect");
	var $spos = $s.length;
	var $tmp = this.width / this.height;
	$s.pop();
	return $tmp;
	$s.pop();
}
CanvasGraphic.prototype.setFont = function(value) {
	$s.push("CanvasGraphic::setFont");
	var $spos = $s.length;
	this.context.font = value;
	$s.pop();
	return value;
	$s.pop();
}
CanvasGraphic.prototype.setFillStyle = function(value) {
	$s.push("CanvasGraphic::setFillStyle");
	var $spos = $s.length;
	if(Std["is"](value,Color)) this.context.fillStyle = ((function($this) {
		var $r;
		var $t = value;
		if(Std["is"]($t,Color)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this))).toContextRGBA();
	$s.pop();
	return value;
	$s.pop();
}
CanvasGraphic.prototype.setWidth = function(width) {
	$s.push("CanvasGraphic::setWidth");
	var $spos = $s.length;
	if(this.width == width) {
		$s.pop();
		return width;
	}
	this.width = width;
	this.clear();
	$s.pop();
	return width;
	$s.pop();
}
CanvasGraphic.prototype.setHeight = function(height) {
	$s.push("CanvasGraphic::setHeight");
	var $spos = $s.length;
	if(this.height == height) {
		$s.pop();
		return height;
	}
	this.height = height;
	this.clear();
	$s.pop();
	return height;
	$s.pop();
}
CanvasGraphic.prototype.__class__ = CanvasGraphic;
Main = function(canvas) {
	if( canvas === $_ ) return;
	$s.push("Main::new");
	var $spos = $s.length;
	try {
		var context = bpmjs.ContextBuilder.buildAll([kumite.launch.Config,kumite.stage.Config,kumite.time.Config,kumite.presentation.PresentationConfig]);
	} catch( e ) {
		$e = [];
		while($s.length >= $spos) $e.unshift($s.pop());
		$s.push($e[0]);
		{
			Log.posInfo = { fileName : "Main.hx", lineNumber : 65, className : "Main", methodName : "new"};
			if(Log.filter(LogLevel.ERROR)) {
				Log.fetchInput("Error building application!\n" + e,null,null,null,null,null,null);
				console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
				Log.displayError(Log.createErrorMessage());
			}
		}
	}
	$s.pop();
}
Main.__name__ = ["Main"];
Main.globalErrorHandler = function(msg,stack) {
	$s.push("Main::globalErrorHandler");
	var $spos = $s.length;
	haxe.Log.trace("Uncaugt error: " + msg,{ fileName : "Main.hx", lineNumber : 5, className : "Main", methodName : "globalErrorHandler"});
	var _g = 0;
	while(_g < stack.length) {
		var line = stack[_g];
		++_g;
		haxe.Log.trace(line,{ fileName : "Main.hx", lineNumber : 7, className : "Main", methodName : "globalErrorHandler"});
	}
	$s.pop();
	return true;
	$s.pop();
}
Main.main = function() {
	$s.push("Main::main");
	var $spos = $s.length;
	Log.init();
	Log.addFilter(new ERegFilter(LogLevel.INFO,new EReg(".*","")));
	Log.addFilter(new ERegFilter(LogLevel.WARN,new EReg(".*FrontMessenger\\.handleMessage.*","")));
	Log.addFilter(new ERegFilter(LogLevel.WARN,new EReg(".*FrontMessenger\\.Receiver\\.execute.*","")));
	Log.addFilter(new ERegFilter(LogLevel.WARN,new EReg(".*initAllLayers.*","")));
	$s.pop();
}
Main.prototype.__class__ = Main;
haxe.Unserializer = function(buf) {
	if( buf === $_ ) return;
	$s.push("haxe.Unserializer::new");
	var $spos = $s.length;
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
	$s.pop();
}
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	$s.push("haxe.Unserializer::initCodes");
	var $spos = $s.length;
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.cca(i)] = i;
	}
	$s.pop();
	return codes;
	$s.pop();
}
haxe.Unserializer.run = function(v) {
	$s.push("haxe.Unserializer::run");
	var $spos = $s.length;
	var $tmp = new haxe.Unserializer(v).unserialize();
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.Unserializer.prototype.buf = null;
haxe.Unserializer.prototype.pos = null;
haxe.Unserializer.prototype.length = null;
haxe.Unserializer.prototype.cache = null;
haxe.Unserializer.prototype.scache = null;
haxe.Unserializer.prototype.resolver = null;
haxe.Unserializer.prototype.setResolver = function(r) {
	$s.push("haxe.Unserializer::setResolver");
	var $spos = $s.length;
	if(r == null) this.resolver = { resolveClass : function(_) {
		$s.push("haxe.Unserializer::setResolver@84");
		var $spos = $s.length;
		$s.pop();
		return null;
		$s.pop();
	}, resolveEnum : function(_) {
		$s.push("haxe.Unserializer::setResolver@85");
		var $spos = $s.length;
		$s.pop();
		return null;
		$s.pop();
	}}; else this.resolver = r;
	$s.pop();
}
haxe.Unserializer.prototype.getResolver = function() {
	$s.push("haxe.Unserializer::getResolver");
	var $spos = $s.length;
	var $tmp = this.resolver;
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.Unserializer.prototype.get = function(p) {
	$s.push("haxe.Unserializer::get");
	var $spos = $s.length;
	var $tmp = this.buf.cca(p);
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.Unserializer.prototype.readDigits = function() {
	$s.push("haxe.Unserializer::readDigits");
	var $spos = $s.length;
	var k = 0;
	var s = false;
	var fpos = this.pos;
	while(true) {
		var c = this.buf.cca(this.pos);
		if(c != c) break;
		if(c == 45) {
			if(this.pos != fpos) break;
			s = true;
			this.pos++;
			continue;
		}
		if(c < 48 || c > 57) break;
		k = k * 10 + (c - 48);
		this.pos++;
	}
	if(s) k *= -1;
	$s.pop();
	return k;
	$s.pop();
}
haxe.Unserializer.prototype.unserializeObject = function(o) {
	$s.push("haxe.Unserializer::unserializeObject");
	var $spos = $s.length;
	while(true) {
		if(this.pos >= this.length) throw "Invalid object";
		if(this.buf.cca(this.pos) == 103) break;
		var k = this.unserialize();
		if(!Std["is"](k,String)) throw "Invalid object key";
		var v = this.unserialize();
		o[k] = v;
	}
	this.pos++;
	$s.pop();
}
haxe.Unserializer.prototype.unserializeEnum = function(edecl,tag) {
	$s.push("haxe.Unserializer::unserializeEnum");
	var $spos = $s.length;
	var constr = Reflect.field(edecl,tag);
	if(constr == null) throw "Unknown enum tag " + Type.getEnumName(edecl) + "." + tag;
	if(this.buf.cca(this.pos++) != 58) throw "Invalid enum format";
	var nargs = this.readDigits();
	if(nargs == 0) {
		this.cache.push(constr);
		$s.pop();
		return constr;
	}
	var args = new Array();
	while(nargs > 0) {
		args.push(this.unserialize());
		nargs -= 1;
	}
	var e = constr.apply(edecl,args);
	this.cache.push(e);
	$s.pop();
	return e;
	$s.pop();
}
haxe.Unserializer.prototype.unserialize = function() {
	$s.push("haxe.Unserializer::unserialize");
	var $spos = $s.length;
	switch(this.buf.cca(this.pos++)) {
	case 110:
		$s.pop();
		return null;
	case 116:
		$s.pop();
		return true;
	case 102:
		$s.pop();
		return false;
	case 122:
		$s.pop();
		return 0;
	case 105:
		var $tmp = this.readDigits();
		$s.pop();
		return $tmp;
	case 100:
		var p1 = this.pos;
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		var $tmp = Std.parseFloat(this.buf.substr(p1,this.pos - p1));
		$s.pop();
		return $tmp;
	case 121:
		var len = this.readDigits();
		if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
		var s = this.buf.substr(this.pos,len);
		this.pos += len;
		s = StringTools.urlDecode(s);
		this.scache.push(s);
		$s.pop();
		return s;
	case 107:
		var $tmp = Math.NaN;
		$s.pop();
		return $tmp;
	case 109:
		var $tmp = Math.NEGATIVE_INFINITY;
		$s.pop();
		return $tmp;
	case 112:
		var $tmp = Math.POSITIVE_INFINITY;
		$s.pop();
		return $tmp;
	case 97:
		var buf = this.buf;
		var a = new Array();
		this.cache.push(a);
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c == 104) {
				this.pos++;
				break;
			}
			if(c == 117) {
				this.pos++;
				var n = this.readDigits();
				a[a.length + n - 1] = null;
			} else a.push(this.unserialize());
		}
		$s.pop();
		return a;
	case 111:
		var o = { };
		this.cache.push(o);
		this.unserializeObject(o);
		$s.pop();
		return o;
	case 114:
		var n = this.readDigits();
		if(n < 0 || n >= this.cache.length) throw "Invalid reference";
		var $tmp = this.cache[n];
		$s.pop();
		return $tmp;
	case 82:
		var n = this.readDigits();
		if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
		var $tmp = this.scache[n];
		$s.pop();
		return $tmp;
	case 120:
		throw this.unserialize();
		break;
	case 99:
		var name = this.unserialize();
		var cl = this.resolver.resolveClass(name);
		if(cl == null) throw "Class not found " + name;
		var o = Type.createEmptyInstance(cl);
		this.cache.push(o);
		this.unserializeObject(o);
		$s.pop();
		return o;
	case 119:
		var name = this.unserialize();
		var edecl = this.resolver.resolveEnum(name);
		if(edecl == null) throw "Enum not found " + name;
		var $tmp = this.unserializeEnum(edecl,this.unserialize());
		$s.pop();
		return $tmp;
	case 106:
		var name = this.unserialize();
		var edecl = this.resolver.resolveEnum(name);
		if(edecl == null) throw "Enum not found " + name;
		this.pos++;
		var index = this.readDigits();
		var tag = Type.getEnumConstructs(edecl)[index];
		if(tag == null) throw "Unknown enum index " + name + "@" + index;
		var $tmp = this.unserializeEnum(edecl,tag);
		$s.pop();
		return $tmp;
	case 108:
		var l = new List();
		this.cache.push(l);
		var buf = this.buf;
		while(this.buf.cca(this.pos) != 104) l.add(this.unserialize());
		this.pos++;
		$s.pop();
		return l;
	case 98:
		var h = new Hash();
		this.cache.push(h);
		var buf = this.buf;
		while(this.buf.cca(this.pos) != 104) {
			var s = this.unserialize();
			h.set(s,this.unserialize());
		}
		this.pos++;
		$s.pop();
		return h;
	case 113:
		var h = new IntHash();
		this.cache.push(h);
		var buf = this.buf;
		var c = this.buf.cca(this.pos++);
		while(c == 58) {
			var i = this.readDigits();
			h.set(i,this.unserialize());
			c = this.buf.cca(this.pos++);
		}
		if(c != 104) throw "Invalid IntHash format";
		$s.pop();
		return h;
	case 118:
		var d = Date.fromString(this.buf.substr(this.pos,19));
		this.cache.push(d);
		this.pos += 19;
		$s.pop();
		return d;
	case 115:
		var len = this.readDigits();
		var buf = this.buf;
		if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
		var codes = haxe.Unserializer.CODES;
		if(codes == null) {
			codes = haxe.Unserializer.initCodes();
			haxe.Unserializer.CODES = codes;
		}
		var i = this.pos;
		var rest = len & 3;
		var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
		var max = i + (len - rest);
		var bytes = haxe.io.Bytes.alloc(size);
		var bpos = 0;
		while(i < max) {
			var c1 = codes[buf.cca(i++)];
			var c2 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
			var c3 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
			var c4 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c3 << 6 | c4) & 255;
		}
		if(rest >= 2) {
			var c1 = codes[buf.cca(i++)];
			var c2 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
			if(rest == 3) {
				var c3 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
			}
		}
		this.pos += len;
		this.cache.push(bytes);
		$s.pop();
		return bytes;
	case 67:
		var name = this.unserialize();
		var cl = this.resolver.resolveClass(name);
		if(cl == null) throw "Class not found " + name;
		var o = Type.createEmptyInstance(cl);
		this.cache.push(o);
		o.hxUnserialize(this);
		if(this.buf.cca(this.pos++) != 103) throw "Invalid custom data";
		$s.pop();
		return o;
	default:
	}
	this.pos--;
	throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	$s.pop();
}
haxe.Unserializer.prototype.__class__ = haxe.Unserializer;
kumite.presentation.Presentation = function(p) {
	if( p === $_ ) return;
	$s.push("kumite.presentation.Presentation::new");
	var $spos = $s.length;
	this.slides = new Array();
	$s.pop();
}
kumite.presentation.Presentation.__name__ = ["kumite","presentation","Presentation"];
kumite.presentation.Presentation.prototype.slides = null;
kumite.presentation.Presentation.prototype.currentSlideIndex = null;
kumite.presentation.Presentation.prototype.complete = function() {
	$s.push("kumite.presentation.Presentation::complete");
	var $spos = $s.length;
	var _g = 0, _g1 = this.slides;
	while(_g < _g1.length) {
		var slide = _g1[_g];
		++_g;
		bpmjs.ContextBuilder.configure(slide);
	}
	$s.pop();
}
kumite.presentation.Presentation.prototype.getMemento = function() {
	$s.push("kumite.presentation.Presentation::getMemento");
	var $spos = $s.length;
	var memento = { i : this.currentSlideIndex, a : []};
	var _g1 = 0, _g = this.slides.length;
	while(_g1 < _g) {
		var i = _g1++;
		memento.a.push(this.slides[i].getMemento());
	}
	$s.pop();
	return memento;
	$s.pop();
}
kumite.presentation.Presentation.prototype.setMemento = function(memento) {
	$s.push("kumite.presentation.Presentation::setMemento");
	var $spos = $s.length;
	this.currentSlideIndex = memento.i;
	var _g1 = 0, _g = this.slides.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.slides[i].setMemento(memento.a[i]);
	}
	$s.pop();
}
kumite.presentation.Presentation.prototype.__class__ = kumite.presentation.Presentation;
kumite.presentation.Presentation.__interfaces__ = [haxe.rtti.Infos];
reflect.Parameter = function(def) {
	if( def === $_ ) return;
	$s.push("reflect.Parameter::new");
	var $spos = $s.length;
	this.def = def;
	$s.pop();
}
reflect.Parameter.__name__ = ["reflect","Parameter"];
reflect.Parameter.prototype.type = null;
reflect.Parameter.prototype.def = null;
reflect.Parameter.prototype.getType = function() {
	$s.push("reflect.Parameter::getType");
	var $spos = $s.length;
	var $tmp = reflect.ClassInfo.forCType(this.def.t);
	$s.pop();
	return $tmp;
	$s.pop();
}
reflect.Parameter.prototype.__class__ = reflect.Parameter;
if(!haxe.io) haxe.io = {}
haxe.io.Error = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
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
	$s.push("haxe.rtti.TypeApi::typeInfos");
	var $spos = $s.length;
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
	$s.pop();
	return inf;
	$s.pop();
}
haxe.rtti.TypeApi.isVar = function(t) {
	$s.push("haxe.rtti.TypeApi::isVar");
	var $spos = $s.length;
	var $tmp = (function($this) {
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
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.rtti.TypeApi.leq = function(f,l1,l2) {
	$s.push("haxe.rtti.TypeApi::leq");
	var $spos = $s.length;
	var it = l2.iterator();
	var $it0 = l1.iterator();
	while( $it0.hasNext() ) {
		var e1 = $it0.next();
		if(!it.hasNext()) {
			$s.pop();
			return false;
		}
		var e2 = it.next();
		if(!f(e1,e2)) {
			$s.pop();
			return false;
		}
	}
	if(it.hasNext()) {
		$s.pop();
		return false;
	}
	$s.pop();
	return true;
	$s.pop();
}
haxe.rtti.TypeApi.rightsEq = function(r1,r2) {
	$s.push("haxe.rtti.TypeApi::rightsEq");
	var $spos = $s.length;
	if(r1 == r2) {
		$s.pop();
		return true;
	}
	var $e = (r1);
	switch( $e[1] ) {
	case 2:
		var m1 = $e[2];
		var $e = (r2);
		switch( $e[1] ) {
		case 2:
			var m2 = $e[2];
			var $tmp = m1 == m2;
			$s.pop();
			return $tmp;
		default:
		}
		break;
	default:
	}
	$s.pop();
	return false;
	$s.pop();
}
haxe.rtti.TypeApi.typeEq = function(t1,t2) {
	$s.push("haxe.rtti.TypeApi::typeEq");
	var $spos = $s.length;
	var $e = (t1);
	switch( $e[1] ) {
	case 0:
		var $tmp = t2 == haxe.rtti.CType.CUnknown;
		$s.pop();
		return $tmp;
	case 1:
		var params = $e[3], name = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 1:
			var params2 = $e[3], name2 = $e[2];
			var $tmp = name == name2 && haxe.rtti.TypeApi.leq(haxe.rtti.TypeApi.typeEq,params,params2);
			$s.pop();
			return $tmp;
		default:
		}
		break;
	case 2:
		var params = $e[3], name = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 2:
			var params2 = $e[3], name2 = $e[2];
			var $tmp = name == name2 && haxe.rtti.TypeApi.leq(haxe.rtti.TypeApi.typeEq,params,params2);
			$s.pop();
			return $tmp;
		default:
		}
		break;
	case 3:
		var params = $e[3], name = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 3:
			var params2 = $e[3], name2 = $e[2];
			var $tmp = name == name2 && haxe.rtti.TypeApi.leq(haxe.rtti.TypeApi.typeEq,params,params2);
			$s.pop();
			return $tmp;
		default:
		}
		break;
	case 4:
		var ret = $e[3], args = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 4:
			var ret2 = $e[3], args2 = $e[2];
			var $tmp = haxe.rtti.TypeApi.leq(function(a,b) {
				$s.push("haxe.rtti.TypeApi::typeEq@187");
				var $spos = $s.length;
				var $tmp = a.name == b.name && a.opt == b.opt && haxe.rtti.TypeApi.typeEq(a.t,b.t);
				$s.pop();
				return $tmp;
				$s.pop();
			},args,args2) && haxe.rtti.TypeApi.typeEq(ret,ret2);
			$s.pop();
			return $tmp;
		default:
		}
		break;
	case 5:
		var fields = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 5:
			var fields2 = $e[2];
			var $tmp = haxe.rtti.TypeApi.leq(function(a,b) {
				$s.push("haxe.rtti.TypeApi::typeEq@195");
				var $spos = $s.length;
				var $tmp = a.name == b.name && haxe.rtti.TypeApi.typeEq(a.t,b.t);
				$s.pop();
				return $tmp;
				$s.pop();
			},fields,fields2);
			$s.pop();
			return $tmp;
		default:
		}
		break;
	case 6:
		var t = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 6:
			var t21 = $e[2];
			if(t == null != (t21 == null)) {
				$s.pop();
				return false;
			}
			var $tmp = t == null || haxe.rtti.TypeApi.typeEq(t,t21);
			$s.pop();
			return $tmp;
		default:
		}
		break;
	}
	$s.pop();
	return false;
	$s.pop();
}
haxe.rtti.TypeApi.fieldEq = function(f1,f2) {
	$s.push("haxe.rtti.TypeApi::fieldEq");
	var $spos = $s.length;
	if(f1.name != f2.name) {
		$s.pop();
		return false;
	}
	if(!haxe.rtti.TypeApi.typeEq(f1.type,f2.type)) {
		$s.pop();
		return false;
	}
	if(f1.isPublic != f2.isPublic) {
		$s.pop();
		return false;
	}
	if(f1.doc != f2.doc) {
		$s.pop();
		return false;
	}
	if(!haxe.rtti.TypeApi.rightsEq(f1.get,f2.get)) {
		$s.pop();
		return false;
	}
	if(!haxe.rtti.TypeApi.rightsEq(f1.set,f2.set)) {
		$s.pop();
		return false;
	}
	if(f1.params == null != (f2.params == null)) {
		$s.pop();
		return false;
	}
	if(f1.params != null && f1.params.join(":") != f2.params.join(":")) {
		$s.pop();
		return false;
	}
	$s.pop();
	return true;
	$s.pop();
}
haxe.rtti.TypeApi.constructorEq = function(c1,c2) {
	$s.push("haxe.rtti.TypeApi::constructorEq");
	var $spos = $s.length;
	if(c1.name != c2.name) {
		$s.pop();
		return false;
	}
	if(c1.doc != c2.doc) {
		$s.pop();
		return false;
	}
	if(c1.args == null != (c2.args == null)) {
		$s.pop();
		return false;
	}
	if(c1.args != null && !haxe.rtti.TypeApi.leq(function(a,b) {
		$s.push("haxe.rtti.TypeApi::constructorEq@239");
		var $spos = $s.length;
		var $tmp = a.name == b.name && a.opt == b.opt && haxe.rtti.TypeApi.typeEq(a.t,b.t);
		$s.pop();
		return $tmp;
		$s.pop();
	},c1.args,c2.args)) {
		$s.pop();
		return false;
	}
	$s.pop();
	return true;
	$s.pop();
}
haxe.rtti.TypeApi.prototype.__class__ = haxe.rtti.TypeApi;
haxe.io.Bytes = function(length,b) {
	if( length === $_ ) return;
	$s.push("haxe.io.Bytes::new");
	var $spos = $s.length;
	this.length = length;
	this.b = b;
	$s.pop();
}
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	$s.push("haxe.io.Bytes::alloc");
	var $spos = $s.length;
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	var $tmp = new haxe.io.Bytes(length,a);
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.ofString = function(s) {
	$s.push("haxe.io.Bytes::ofString");
	var $spos = $s.length;
	var a = new Array();
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.cca(i);
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	var $tmp = new haxe.io.Bytes(a.length,a);
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.ofData = function(b) {
	$s.push("haxe.io.Bytes::ofData");
	var $spos = $s.length;
	var $tmp = new haxe.io.Bytes(b.length,b);
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.prototype.length = null;
haxe.io.Bytes.prototype.b = null;
haxe.io.Bytes.prototype.get = function(pos) {
	$s.push("haxe.io.Bytes::get");
	var $spos = $s.length;
	var $tmp = this.b[pos];
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.prototype.set = function(pos,v) {
	$s.push("haxe.io.Bytes::set");
	var $spos = $s.length;
	this.b[pos] = v & 255;
	$s.pop();
}
haxe.io.Bytes.prototype.blit = function(pos,src,srcpos,len) {
	$s.push("haxe.io.Bytes::blit");
	var $spos = $s.length;
	if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	if(b1 == b2 && pos > srcpos) {
		var i = len;
		while(i > 0) {
			i--;
			b1[i + pos] = b2[i + srcpos];
		}
		$s.pop();
		return;
	}
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		b1[i + pos] = b2[i + srcpos];
	}
	$s.pop();
}
haxe.io.Bytes.prototype.sub = function(pos,len) {
	$s.push("haxe.io.Bytes::sub");
	var $spos = $s.length;
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	var $tmp = new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.prototype.compare = function(other) {
	$s.push("haxe.io.Bytes::compare");
	var $spos = $s.length;
	var b1 = this.b;
	var b2 = other.b;
	var len = this.length < other.length?this.length:other.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		if(b1[i] != b2[i]) {
			var $tmp = b1[i] - b2[i];
			$s.pop();
			return $tmp;
		}
	}
	var $tmp = this.length - other.length;
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.prototype.readString = function(pos,len) {
	$s.push("haxe.io.Bytes::readString");
	var $spos = $s.length;
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	var s = "";
	var b = this.b;
	var fcc = String.fromCharCode;
	var i = pos;
	var max = pos + len;
	while(i < max) {
		var c = b[i++];
		if(c < 128) {
			if(c == 0) break;
			s += fcc(c);
		} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
			var c2 = b[i++];
			s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
		} else {
			var c2 = b[i++];
			var c3 = b[i++];
			s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
		}
	}
	$s.pop();
	return s;
	$s.pop();
}
haxe.io.Bytes.prototype.toString = function() {
	$s.push("haxe.io.Bytes::toString");
	var $spos = $s.length;
	var $tmp = this.readString(0,this.length);
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.prototype.toHex = function() {
	$s.push("haxe.io.Bytes::toHex");
	var $spos = $s.length;
	var s = new StringBuf();
	var chars = [];
	var str = "0123456789abcdef";
	var _g1 = 0, _g = str.length;
	while(_g1 < _g) {
		var i = _g1++;
		chars.push(str.charCodeAt(i));
	}
	var _g1 = 0, _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = this.b[i];
		s.b[s.b.length] = String.fromCharCode(chars[c >> 4]);
		s.b[s.b.length] = String.fromCharCode(chars[c & 15]);
	}
	var $tmp = s.b.join("");
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.prototype.getData = function() {
	$s.push("haxe.io.Bytes::getData");
	var $spos = $s.length;
	var $tmp = this.b;
	$s.pop();
	return $tmp;
	$s.pop();
}
haxe.io.Bytes.prototype.__class__ = haxe.io.Bytes;
Timeout = function() { }
Timeout.__name__ = ["Timeout"];
Timeout.execute = function(ms,method) {
	$s.push("Timeout::execute");
	var $spos = $s.length;
	var timer = new haxe.Timer(ms);
	var run = function() {
		$s.push("Timeout::execute@9");
		var $spos = $s.length;
		method();
		timer.stop();
		$s.pop();
	};
	timer.run = run;
	$s.pop();
}
Timeout.prototype.__class__ = Timeout;
bpmjs.ImageLoaderTask = function(location) {
	if( location === $_ ) return;
	$s.push("bpmjs.ImageLoaderTask::new");
	var $spos = $s.length;
	bpmjs.Task.call(this);
	this.location = location;
	this.getMonitor().name = location;
	$s.pop();
}
bpmjs.ImageLoaderTask.__name__ = ["bpmjs","ImageLoaderTask"];
bpmjs.ImageLoaderTask.__super__ = bpmjs.Task;
for(var k in bpmjs.Task.prototype ) bpmjs.ImageLoaderTask.prototype[k] = bpmjs.Task.prototype[k];
bpmjs.ImageLoaderTask.prototype.location = null;
bpmjs.ImageLoaderTask.prototype.image = null;
bpmjs.ImageLoaderTask.prototype.timer = null;
bpmjs.ImageLoaderTask.prototype.doStart = function() {
	$s.push("bpmjs.ImageLoaderTask::doStart");
	var $spos = $s.length;
	this.getMonitor().name = this.location;
	this.image = new Image();
	this.image.onload = $closure(this,"handleImageLoaded");
	this.image.src = this.location;
	$s.pop();
}
bpmjs.ImageLoaderTask.prototype.handleImageLoaded = function() {
	$s.push("bpmjs.ImageLoaderTask::handleImageLoaded");
	var $spos = $s.length;
	this.complete();
	$s.pop();
}
bpmjs.ImageLoaderTask.prototype.doComplete = function() {
	$s.push("bpmjs.ImageLoaderTask::doComplete");
	var $spos = $s.length;
	this.timer.stop();
	this.complete();
	$s.pop();
}
bpmjs.ImageLoaderTask.prototype.__class__ = bpmjs.ImageLoaderTask;
Matrix4 = function(p) {
	if( p === $_ ) return;
	$s.push("Matrix4::new");
	var $spos = $s.length;
	this.buffer = new Float32Array(Matrix4.IDENTITY_BUFFER);
	$s.pop();
}
Matrix4.__name__ = ["Matrix4"];
Matrix4.createIdentityBuffer = function() {
	$s.push("Matrix4::createIdentityBuffer");
	var $spos = $s.length;
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
	$s.pop();
	return buffer;
	$s.pop();
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
	$s.push("Matrix4::setIdentity");
	var $spos = $s.length;
	this.buffer.set(Matrix4.IDENTITY_BUFFER);
	$s.pop();
	return this;
	$s.pop();
}
Matrix4.prototype.set = function(n11,n12,n13,n14,n21,n22,n23,n24,n31,n32,n33,n34,n41,n42,n43,n44) {
	$s.push("Matrix4::set");
	var $spos = $s.length;
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
	$s.pop();
	return this;
	$s.pop();
}
Matrix4.prototype.setFrom = function(from) {
	$s.push("Matrix4::setFrom");
	var $spos = $s.length;
	this.buffer.set(from.buffer);
	$s.pop();
	return this;
	$s.pop();
}
Matrix4.prototype.setTranslation = function(x,y,z) {
	$s.push("Matrix4::setTranslation");
	var $spos = $s.length;
	this.set(1,0,0,x,0,1,0,y,0,0,1,z,0,0,0,1);
	$s.pop();
	return this;
	$s.pop();
}
Matrix4.prototype.setScale = function(x,y,z) {
	$s.push("Matrix4::setScale");
	var $spos = $s.length;
	this.set(x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1);
	$s.pop();
	return this;
	$s.pop();
}
Matrix4.prototype.setRotationX = function(angle) {
	$s.push("Matrix4::setRotationX");
	var $spos = $s.length;
	var c = Math.cos(angle), s = Math.sin(angle);
	this.set(1,0,0,0,0,c,-s,0,0,s,c,0,0,0,0,1);
	$s.pop();
	return this;
	$s.pop();
}
Matrix4.prototype.setRotationY = function(angle) {
	$s.push("Matrix4::setRotationY");
	var $spos = $s.length;
	var c = Math.cos(angle), s = Math.sin(angle);
	this.set(c,0,s,0,0,1,0,0,-s,0,c,0,0,0,0,1);
	$s.pop();
	return this;
	$s.pop();
}
Matrix4.prototype.setRotationZ = function(angle) {
	$s.push("Matrix4::setRotationZ");
	var $spos = $s.length;
	var c = Math.cos(angle), s = Math.sin(angle);
	this.set(c,-s,0,0,s,c,0,0,0,0,1,0,0,0,0,1);
	$s.pop();
	return this;
	$s.pop();
}
Matrix4.prototype.setRotation = function(angle,axis) {
	$s.push("Matrix4::setRotation");
	var $spos = $s.length;
	var c = Math.cos(angle), s = Math.sin(angle), t = 1 - c, x = axis.x, y = axis.y, z = axis.z, tx = t * x, ty = t * y;
	this.set(tx * x + c,tx * y - s * z,tx * z + s * y,0,tx * y + s * z,ty * y + c,ty * z - s * x,0,tx * z - s * y,ty * z + s * x,t * z * z + c,0,0,0,0,1);
	$s.pop();
	return this;
	$s.pop();
}
Matrix4.prototype.setLookAt = function(eye,at,up) {
	$s.push("Matrix4::setLookAt");
	var $spos = $s.length;
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
	$s.pop();
}
Matrix4.prototype.setOrtho = function(left,right,bottom,top,near,far) {
	$s.push("Matrix4::setOrtho");
	var $spos = $s.length;
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
	$s.pop();
}
Matrix4.prototype.setPerspective = function(fovy,aspect,near,far) {
	$s.push("Matrix4::setPerspective");
	var $spos = $s.length;
	var top = near * Math.tan(fovy * Math.PI / 360);
	var right = top * aspect;
	this.setFrustum(-right,right,-top,top,near,far);
	$s.pop();
}
Matrix4.prototype.setFrustum = function(left,right,bottom,top,near,far) {
	$s.push("Matrix4::setFrustum");
	var $spos = $s.length;
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
	$s.pop();
}
Matrix4.prototype.append = function(a) {
	$s.push("Matrix4::append");
	var $spos = $s.length;
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
	$s.pop();
}
Matrix4.prototype.appendAffine = function(a) {
	$s.push("Matrix4::appendAffine");
	var $spos = $s.length;
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
	$s.pop();
}
Matrix4.prototype.appendTranslation = function(x,y,z) {
	$s.push("Matrix4::appendTranslation");
	var $spos = $s.length;
	Matrix4.tempMatrix1.setTranslation(x,y,z);
	this.append(Matrix4.tempMatrix1);
	$s.pop();
}
Matrix4.prototype.appendTranslationAffine = function(x,y,z) {
	$s.push("Matrix4::appendTranslationAffine");
	var $spos = $s.length;
	Matrix4.tempMatrix1.setTranslation(x,y,z);
	this.appendAffine(Matrix4.tempMatrix1);
	$s.pop();
}
Matrix4.prototype.appendScale = function(x,y,z) {
	$s.push("Matrix4::appendScale");
	var $spos = $s.length;
	Matrix4.tempMatrix1.setScale(x,y,z);
	this.append(Matrix4.tempMatrix1);
	$s.pop();
}
Matrix4.prototype.appendRotation = function(angle,axis) {
	$s.push("Matrix4::appendRotation");
	var $spos = $s.length;
	Matrix4.tempMatrix1.setRotation(angle,axis);
	this.append(Matrix4.tempMatrix1);
	$s.pop();
}
Matrix4.prototype.appendRotationZ = function(angle) {
	$s.push("Matrix4::appendRotationZ");
	var $spos = $s.length;
	Matrix4.tempMatrix1.setRotationZ(angle);
	this.append(Matrix4.tempMatrix1);
	$s.pop();
}
Matrix4.prototype.appendScaleAffine = function(x,y,z) {
	$s.push("Matrix4::appendScaleAffine");
	var $spos = $s.length;
	Matrix4.tempMatrix1.setScale(x,y,z);
	this.appendAffine(Matrix4.tempMatrix1);
	$s.pop();
}
Matrix4.prototype.appendRotationAffine = function(angle,axis) {
	$s.push("Matrix4::appendRotationAffine");
	var $spos = $s.length;
	Matrix4.tempMatrix1.setRotation(angle,axis);
	this.appendAffine(Matrix4.tempMatrix1);
	$s.pop();
}
Matrix4.prototype.appendRotationZAffine = function(angle) {
	$s.push("Matrix4::appendRotationZAffine");
	var $spos = $s.length;
	Matrix4.tempMatrix1.setRotationZ(angle);
	this.appendAffine(Matrix4.tempMatrix1);
	$s.pop();
}
Matrix4.prototype.toString = function() {
	$s.push("Matrix4::toString");
	var $spos = $s.length;
	var result = "[Matrix4: ";
	result += " | " + this.buffer[0] + "," + this.buffer[4] + "," + this.buffer[8] + "," + this.buffer[12];
	result += " | " + this.buffer[1] + "," + this.buffer[5] + "," + this.buffer[9] + "," + this.buffer[13];
	result += " | " + this.buffer[2] + "," + this.buffer[6] + "," + this.buffer[10] + "," + this.buffer[14];
	result += " | " + this.buffer[3] + "," + this.buffer[7] + "," + this.buffer[11] + "," + this.buffer[15];
	result += " | ]";
	$s.pop();
	return result;
	$s.pop();
}
Matrix4.prototype.get11 = function() {
	$s.push("Matrix4::get11");
	var $spos = $s.length;
	var $tmp = this.buffer[0];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set11 = function(v) {
	$s.push("Matrix4::set11");
	var $spos = $s.length;
	var $tmp = this.buffer[0] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get12 = function() {
	$s.push("Matrix4::get12");
	var $spos = $s.length;
	var $tmp = this.buffer[4];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set12 = function(v) {
	$s.push("Matrix4::set12");
	var $spos = $s.length;
	var $tmp = this.buffer[4] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get13 = function() {
	$s.push("Matrix4::get13");
	var $spos = $s.length;
	var $tmp = this.buffer[8];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set13 = function(v) {
	$s.push("Matrix4::set13");
	var $spos = $s.length;
	var $tmp = this.buffer[8] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get14 = function() {
	$s.push("Matrix4::get14");
	var $spos = $s.length;
	var $tmp = this.buffer[12];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set14 = function(v) {
	$s.push("Matrix4::set14");
	var $spos = $s.length;
	var $tmp = this.buffer[12] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get21 = function() {
	$s.push("Matrix4::get21");
	var $spos = $s.length;
	var $tmp = this.buffer[1];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set21 = function(v) {
	$s.push("Matrix4::set21");
	var $spos = $s.length;
	var $tmp = this.buffer[1] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get22 = function() {
	$s.push("Matrix4::get22");
	var $spos = $s.length;
	var $tmp = this.buffer[5];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set22 = function(v) {
	$s.push("Matrix4::set22");
	var $spos = $s.length;
	var $tmp = this.buffer[5] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get23 = function() {
	$s.push("Matrix4::get23");
	var $spos = $s.length;
	var $tmp = this.buffer[9];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set23 = function(v) {
	$s.push("Matrix4::set23");
	var $spos = $s.length;
	var $tmp = this.buffer[9] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get24 = function() {
	$s.push("Matrix4::get24");
	var $spos = $s.length;
	var $tmp = this.buffer[13];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set24 = function(v) {
	$s.push("Matrix4::set24");
	var $spos = $s.length;
	var $tmp = this.buffer[13] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get31 = function() {
	$s.push("Matrix4::get31");
	var $spos = $s.length;
	var $tmp = this.buffer[2];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set31 = function(v) {
	$s.push("Matrix4::set31");
	var $spos = $s.length;
	var $tmp = this.buffer[2] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get32 = function() {
	$s.push("Matrix4::get32");
	var $spos = $s.length;
	var $tmp = this.buffer[6];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set32 = function(v) {
	$s.push("Matrix4::set32");
	var $spos = $s.length;
	var $tmp = this.buffer[6] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get33 = function() {
	$s.push("Matrix4::get33");
	var $spos = $s.length;
	var $tmp = this.buffer[10];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set33 = function(v) {
	$s.push("Matrix4::set33");
	var $spos = $s.length;
	var $tmp = this.buffer[10] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get34 = function() {
	$s.push("Matrix4::get34");
	var $spos = $s.length;
	var $tmp = this.buffer[14];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set34 = function(v) {
	$s.push("Matrix4::set34");
	var $spos = $s.length;
	var $tmp = this.buffer[14] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get41 = function() {
	$s.push("Matrix4::get41");
	var $spos = $s.length;
	var $tmp = this.buffer[3];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set41 = function(v) {
	$s.push("Matrix4::set41");
	var $spos = $s.length;
	var $tmp = this.buffer[3] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get42 = function() {
	$s.push("Matrix4::get42");
	var $spos = $s.length;
	var $tmp = this.buffer[7];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set42 = function(v) {
	$s.push("Matrix4::set42");
	var $spos = $s.length;
	var $tmp = this.buffer[7] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get43 = function() {
	$s.push("Matrix4::get43");
	var $spos = $s.length;
	var $tmp = this.buffer[11];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set43 = function(v) {
	$s.push("Matrix4::set43");
	var $spos = $s.length;
	var $tmp = this.buffer[11] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.get44 = function() {
	$s.push("Matrix4::get44");
	var $spos = $s.length;
	var $tmp = this.buffer[15];
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.set44 = function(v) {
	$s.push("Matrix4::set44");
	var $spos = $s.length;
	var $tmp = this.buffer[15] = v;
	$s.pop();
	return $tmp;
	$s.pop();
}
Matrix4.prototype.__class__ = Matrix4;
kumite.launch.Config = function(p) {
	if( p === $_ ) return;
	$s.push("kumite.launch.Config::new");
	var $spos = $s.length;
	this.launcher = new kumite.launch.Launcher();
	this.sequencer = new bpmjs.Sequencer();
	this.preloadDisplay = new kumite.launch.PreloadDisplay();
	$s.pop();
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
	$s.push("js.Lib::alert");
	var $spos = $s.length;
	alert(js.Boot.__string_rec(v,""));
	$s.pop();
}
js.Lib.eval = function(code) {
	$s.push("js.Lib::eval");
	var $spos = $s.length;
	var $tmp = eval(code);
	$s.pop();
	return $tmp;
	$s.pop();
}
js.Lib.setErrorHandler = function(f) {
	$s.push("js.Lib::setErrorHandler");
	var $spos = $s.length;
	js.Lib.onerror = f;
	$s.pop();
}
js.Lib.prototype.__class__ = js.Lib;
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	$s.push("StringTools::urlEncode");
	var $spos = $s.length;
	var $tmp = encodeURIComponent(s);
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.urlDecode = function(s) {
	$s.push("StringTools::urlDecode");
	var $spos = $s.length;
	var $tmp = decodeURIComponent(s.split("+").join(" "));
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.htmlEscape = function(s) {
	$s.push("StringTools::htmlEscape");
	var $spos = $s.length;
	var $tmp = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.htmlUnescape = function(s) {
	$s.push("StringTools::htmlUnescape");
	var $spos = $s.length;
	var $tmp = s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.startsWith = function(s,start) {
	$s.push("StringTools::startsWith");
	var $spos = $s.length;
	var $tmp = s.length >= start.length && s.substr(0,start.length) == start;
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.endsWith = function(s,end) {
	$s.push("StringTools::endsWith");
	var $spos = $s.length;
	var elen = end.length;
	var slen = s.length;
	var $tmp = slen >= elen && s.substr(slen - elen,elen) == end;
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.isSpace = function(s,pos) {
	$s.push("StringTools::isSpace");
	var $spos = $s.length;
	var c = s.charCodeAt(pos);
	var $tmp = c >= 9 && c <= 13 || c == 32;
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.ltrim = function(s) {
	$s.push("StringTools::ltrim");
	var $spos = $s.length;
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) {
		var $tmp = s.substr(r,l - r);
		$s.pop();
		return $tmp;
	} else {
		$s.pop();
		return s;
	}
	$s.pop();
}
StringTools.rtrim = function(s) {
	$s.push("StringTools::rtrim");
	var $spos = $s.length;
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) {
		var $tmp = s.substr(0,l - r);
		$s.pop();
		return $tmp;
	} else {
		$s.pop();
		return s;
	}
	$s.pop();
}
StringTools.trim = function(s) {
	$s.push("StringTools::trim");
	var $spos = $s.length;
	var $tmp = StringTools.ltrim(StringTools.rtrim(s));
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.rpad = function(s,c,l) {
	$s.push("StringTools::rpad");
	var $spos = $s.length;
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	$s.pop();
	return s;
	$s.pop();
}
StringTools.lpad = function(s,c,l) {
	$s.push("StringTools::lpad");
	var $spos = $s.length;
	var ns = "";
	var sl = s.length;
	if(sl >= l) {
		$s.pop();
		return s;
	}
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	var $tmp = ns + s;
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.replace = function(s,sub,by) {
	$s.push("StringTools::replace");
	var $spos = $s.length;
	var $tmp = s.split(sub).join(by);
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.hex = function(n,digits) {
	$s.push("StringTools::hex");
	var $spos = $s.length;
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	$s.pop();
	return s;
	$s.pop();
}
StringTools.fastCodeAt = function(s,index) {
	$s.push("StringTools::fastCodeAt");
	var $spos = $s.length;
	var $tmp = s.cca(index);
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.isEOF = function(c) {
	$s.push("StringTools::isEOF");
	var $spos = $s.length;
	var $tmp = c != c;
	$s.pop();
	return $tmp;
	$s.pop();
}
StringTools.prototype.__class__ = StringTools;
$_ = {}
js.Boot.__res = {}
$s = [];
$e = [];
js.Boot.__init();
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		$s.push("StringTools::isEOF");
		var $spos = $s.length;
		var $tmp = isFinite(i);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	Math.isNaN = function(i) {
		$s.push("StringTools::isEOF");
		var $spos = $s.length;
		var $tmp = isNaN(i);
		$s.pop();
		return $tmp;
		$s.pop();
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
		$s.push("StringTools::isEOF");
		var $spos = $s.length;
		var $tmp = new Date();
		$s.pop();
		return $tmp;
		$s.pop();
	};
	d.fromTime = function(t) {
		$s.push("StringTools::isEOF");
		var $spos = $s.length;
		var d1 = new Date();
		d1["setTime"](t);
		$s.pop();
		return d1;
		$s.pop();
	};
	d.fromString = function(s) {
		$s.push("StringTools::isEOF");
		var $spos = $s.length;
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			$s.pop();
			return d1;
		case 10:
			var k = s.split("-");
			var $tmp = new Date(k[0],k[1] - 1,k[2],0,0,0);
			$s.pop();
			return $tmp;
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			var $tmp = new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
			$s.pop();
			return $tmp;
		default:
			throw "Invalid date format : " + s;
		}
		$s.pop();
	};
	d.prototype["toString"] = function() {
		$s.push("StringTools::isEOF");
		var $spos = $s.length;
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		var $tmp = date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
		$s.pop();
		return $tmp;
		$s.pop();
	};
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var stack = $s.copy();
		var f = js.Lib.onerror;
		$s.splice(0,$s.length);
		if( f == null ) {
			var i = stack.length;
			var s = "";
			while( --i >= 0 )
				s += "Called from "+stack[i]+"\n";
			alert(msg+"\n\n"+s);
			return false;
		}
		return f(msg,stack);
	}
}
kumite.launch.PreloadDisplay.__meta__ = { fields : { complete : { Complete : null}, bootMonitor : { Sequence : ["boot","monitor"]}, bootStartComplete : { Sequence : ["boot","startComplete"]}}};
kumite.launch.PreloadDisplay.__rtti = "<class path=\"kumite.launch.PreloadDisplay\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<preloaderDiv><t path=\"js.HtmlDom\"/></preloaderDiv>\n\t<complete public=\"1\" set=\"method\" line=\"16\"><f a=\"\"><e path=\"Void\"/></f></complete>\n\t<bootMonitor public=\"1\" set=\"method\" line=\"24\"><f a=\"monitor\">\n\t<c path=\"bpmjs.ProgressMonitor\"/>\n\t<e path=\"Void\"/>\n</f></bootMonitor>\n\t<bootStartComplete public=\"1\" set=\"method\" line=\"46\"><f a=\"\"><e path=\"Void\"/></f></bootStartComplete>\n\t<removePreloader set=\"method\" line=\"56\"><f a=\"\"><e path=\"Void\"/></f></removePreloader>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.stage.StageResizeAction.__meta__ = { fields : { messenger : { Messenger : null}, stage : { Inject : null}, initPrepare : { Sequence : ["boot","initPrepare"]}, startComplete : { Sequence : ["boot","startComplete"]}}};
kumite.stage.StageResizeAction.__rtti = "<class path=\"kumite.stage.StageResizeAction\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<messenger public=\"1\"><c path=\"bpmjs.Messenger\"/></messenger>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<initPrepare public=\"1\" set=\"method\" line=\"21\"><f a=\"\"><e path=\"Void\"/></f></initPrepare>\n\t<startComplete public=\"1\" set=\"method\" line=\"27\"><f a=\"\"><e path=\"Void\"/></f></startComplete>\n\t<timerUpdate set=\"method\" line=\"33\"><f a=\"\"><e path=\"Void\"/></f></timerUpdate>\n\t<onResize set=\"method\" line=\"39\"><f a=\"?event\">\n\t<t path=\"js.Event\"/>\n\t<e path=\"Void\"/>\n</f></onResize>\n\t<updateSize set=\"method\" line=\"45\"><f a=\"\"><e path=\"Void\"/></f></updateSize>\n\t<sendResizeMessage set=\"method\" line=\"51\"><f a=\"\"><e path=\"Void\"/></f></sendResizeMessage>\n\t<new public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.presentation.SlideNavigator.__meta__ = { fields : { stage : { Inject : null}, time : { Inject : null}, presentation : { Inject : null}, start : { Sequence : ["boot","start"]}, startComplete : { Sequence : ["boot","start"]}, handleResize : { Message : null}, handleTick : { Message : null}}};
kumite.presentation.SlideNavigator.__rtti = "<class path=\"kumite.presentation.SlideNavigator\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage><c path=\"kumite.stage.Stage\"/></stage>\n\t<time><c path=\"kumite.time.Time\"/></time>\n\t<presentation><c path=\"kumite.presentation.Presentation\"/></presentation>\n\t<currentHash><c path=\"String\"/></currentHash>\n\t<autoScroll><e path=\"Bool\"/></autoScroll>\n\t<root><t path=\"js.HtmlDom\"/></root>\n\t<speed><c path=\"Float\"/></speed>\n\t<scrollTop><c path=\"Float\"/></scrollTop>\n\t<targetPosition><c path=\"Int\"/></targetPosition>\n\t<lastScrollTop><c path=\"Int\"/></lastScrollTop>\n\t<lastScrollTopEqualTime><c path=\"Float\"/></lastScrollTopEqualTime>\n\t<start set=\"method\" line=\"41\"><f a=\"\"><e path=\"Void\"/></f></start>\n\t<startComplete set=\"method\" line=\"58\"><f a=\"\"><e path=\"Void\"/></f></startComplete>\n\t<handleResize set=\"method\" line=\"66\"><f a=\"message\">\n\t<c path=\"kumite.stage.StageResizeMessage\"/>\n\t<e path=\"Void\"/>\n</f></handleResize>\n\t<handleTick set=\"method\" line=\"72\"><f a=\"tick\">\n\t<c path=\"kumite.time.Tick\"/>\n\t<e path=\"Void\"/>\n</f></handleTick>\n\t<resize set=\"method\" line=\"126\"><f a=\"\"><e path=\"Void\"/></f></resize>\n\t<getMemento set=\"method\" line=\"137\"><f a=\"\"><a>\n\t<i><c path=\"Int\"/></i>\n\t<a><c path=\"Array\"><c path=\"Int\"/></c></a>\n</a></f></getMemento>\n\t<setMementoFromUrl set=\"method\" line=\"142\"><f a=\"\"><e path=\"Void\"/></f></setMementoFromUrl>\n\t<targetCurrentSlide set=\"method\" line=\"158\"><f a=\"\"><e path=\"Void\"/></f></targetCurrentSlide>\n\t<new public=\"1\" set=\"method\" line=\"34\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs.Sequencer.__meta__ = { fields : { context : { Inject : null}}};
bpmjs.Sequencer.__rtti = "<class path=\"bpmjs.Sequencer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<context public=\"1\"><c path=\"bpmjs.Context\"/></context>\n\t<start public=\"1\" set=\"method\" line=\"14\"><f a=\"name\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></start>\n\t<new public=\"1\" set=\"method\" line=\"12\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
Color.__rtti = "<class path=\"Color\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<r public=\"1\"><c path=\"Float\"/></r>\n\t<g public=\"1\"><c path=\"Float\"/></g>\n\t<b public=\"1\"><c path=\"Float\"/></b>\n\t<a public=\"1\"><c path=\"Float\"/></a>\n\t<fromHex public=\"1\" set=\"method\" line=\"18\"><f a=\"hex\">\n\t<c path=\"Int\"/>\n\t<c path=\"Color\"/>\n</f></fromHex>\n\t<scaleRGB public=\"1\" set=\"method\" line=\"28\"><f a=\"factor\">\n\t<c path=\"Float\"/>\n\t<e path=\"Void\"/>\n</f></scaleRGB>\n\t<mixFrom public=\"1\" set=\"method\" line=\"35\"><f a=\"color1:color2:color1Mix\">\n\t<c path=\"Color\"/>\n\t<c path=\"Color\"/>\n\t<c path=\"Float\"/>\n\t<e path=\"Void\"/>\n</f></mixFrom>\n\t<toContextRGB public=\"1\" set=\"method\" line=\"50\"><f a=\"\"><c path=\"String\"/></f></toContextRGB>\n\t<toContextRGBA public=\"1\" set=\"method\" line=\"55\"><f a=\"\"><c path=\"String\"/></f></toContextRGBA>\n\t<clone public=\"1\" set=\"method\" line=\"60\"><f a=\"\"><c path=\"Color\"/></f></clone>\n\t<toString public=\"1\" set=\"method\" line=\"65\"><f a=\"\"><c path=\"String\"/></f></toString>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"?r:?g:?b:?a\">\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<e path=\"Void\"/>\n</f></new>\n</class>";
kumite.time.Time.EXPECTED_FRAMERATE = 60;
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
kumite.stage.Config.__rtti = "<class path=\"kumite.stage.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<stageResizeAction public=\"1\"><c path=\"kumite.stage.StageResizeAction\"/></stageResizeAction>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.launch.Launcher.__meta__ = { fields : { sequencer : { Inject : null}, handlePostComplete : { PostComplete : null}, showError : { Sequence : ["boot","error"]}, handleFinish : { Sequence : ["boot","finish"]}}};
kumite.launch.Launcher.__rtti = "<class path=\"kumite.launch.Launcher\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<sequencer public=\"1\"><c path=\"bpmjs.Sequencer\"/></sequencer>\n\t<handlePostComplete public=\"1\" set=\"method\" line=\"17\"><f a=\"\"><e path=\"Void\"/></f></handlePostComplete>\n\t<showError public=\"1\" set=\"method\" line=\"24\"><f a=\"message\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></showError>\n\t<handleFinish public=\"1\" set=\"method\" line=\"30\"><f a=\"\"><e path=\"Void\"/></f></handleFinish>\n\t<new public=\"1\" set=\"method\" line=\"14\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
LogLevel.INFO = new LogLevel(1);
LogLevel.WARN = new LogLevel(2);
LogLevel.ERROR = new LogLevel(3);
LogLevel.OFF = new LogLevel(4);
kumite.presentation.PresentationConfig.__rtti = "<class path=\"kumite.presentation.PresentationConfig\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<presentation><c path=\"kumite.presentation.Presentation\"/></presentation>\n\t<slideNavigator><c path=\"kumite.presentation.SlideNavigator\"/></slideNavigator>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
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
kumite.presentation.ImageSlide.__meta__ = { fields : { stage : { Inject : null}, loadImage : { Sequence : ["boot","init"]}}};
kumite.presentation.ImageSlide.__rtti = "<class path=\"kumite.presentation.ImageSlide\" params=\"\">\n\t<extends path=\"kumite.presentation.Slide\"/>\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage><c path=\"kumite.stage.Stage\"/></stage>\n\t<hitareas><c path=\"Array\"><c path=\"kumite.presentation.HitareaAndDiv\"/></c></hitareas>\n\t<container><t path=\"js.HtmlDom\"/></container>\n\t<imageTask><c path=\"bpmjs.ImageLoaderTask\"/></imageTask>\n\t<addHitArea public=\"1\" set=\"method\" line=\"30\"><f a=\"x:y:width:height:location\">\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"String\"/>\n\t<c path=\"kumite.presentation.ImageSlide\"/>\n</f></addHitArea>\n\t<loadImage public=\"1\" set=\"method\" line=\"47\"><f a=\"\"><c path=\"bpmjs.ImageLoaderTask\"/></f></loadImage>\n\t<prepare public=\"1\" set=\"method\" line=\"54\" override=\"1\"><f a=\"root\">\n\t<t path=\"js.HtmlDom\"/>\n\t<e path=\"Void\"/>\n</f></prepare>\n\t<resize public=\"1\" set=\"method\" line=\"76\" override=\"1\"><f a=\"stage\">\n\t<c path=\"kumite.stage.Stage\"/>\n\t<e path=\"Void\"/>\n</f></resize>\n\t<getTransform set=\"method\" line=\"110\"><f a=\"\"><a>\n\t<y><c path=\"Float\"/></y>\n\t<x><c path=\"Float\"/></x>\n\t<scale><c path=\"Float\"/></scale>\n</a></f></getTransform>\n\t<handleImageLoaded set=\"method\" line=\"140\"><f a=\"_\">\n\t<c path=\"bpmjs.ImageLoaderTask\"/>\n\t<e path=\"Void\"/>\n</f></handleImageLoaded>\n\t<removeFrom public=\"1\" set=\"method\" line=\"146\" override=\"1\"><f a=\"root\">\n\t<t path=\"js.HtmlDom\"/>\n\t<e path=\"Void\"/>\n</f></removeFrom>\n\t<new public=\"1\" set=\"method\" line=\"22\"><f a=\"location\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></new>\n</class>";
kumite.time.Config.__rtti = "<class path=\"kumite.time.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<timeController public=\"1\"><c path=\"kumite.time.TimeController\"/></timeController>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.time.TimeController.__meta__ = { fields : { time : { Inject : null}, messenger : { Messenger : null}, startComplete : { Sequence : ["boot","startComplete"]}}};
kumite.time.TimeController.__rtti = "<class path=\"kumite.time.TimeController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<messenger public=\"1\"><c path=\"bpmjs.Messenger\"/></messenger>\n\t<startComplete public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></startComplete>\n\t<timerUpdate set=\"method\" line=\"24\"><f a=\"\"><e path=\"Void\"/></f></timerUpdate>\n\t<new public=\"1\" set=\"method\" line=\"15\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.presentation.ContainerSlide.__meta__ = { fields : { stage : { Inject : null}, init : { Sequence : ["boot","init"]}}};
kumite.presentation.ContainerSlide.__rtti = "<class path=\"kumite.presentation.ContainerSlide\" params=\"\">\n\t<extends path=\"kumite.presentation.Slide\"/>\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage><c path=\"kumite.stage.Stage\"/></stage>\n\t<slides><c path=\"Array\"><c path=\"kumite.presentation.SlideAndDiv\"/></c></slides>\n\t<color><c path=\"Color\"/></color>\n\t<canvas><c path=\"CanvasGraphic\"/></canvas>\n\t<slideIndex><c path=\"Int\"/></slideIndex>\n\t<container><t path=\"js.HtmlDom\"/></container>\n\t<addSlide public=\"1\" set=\"method\" line=\"36\"><f a=\"slide\">\n\t<c path=\"kumite.presentation.Slide\"/>\n\t<c path=\"kumite.presentation.ContainerSlide\"/>\n</f></addSlide>\n\t<init public=\"1\" set=\"method\" line=\"45\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<prepare public=\"1\" set=\"method\" line=\"52\" override=\"1\"><f a=\"root\">\n\t<t path=\"js.HtmlDom\"/>\n\t<e path=\"Void\"/>\n</f></prepare>\n\t<resize public=\"1\" set=\"method\" line=\"74\" override=\"1\"><f a=\"stage\">\n\t<c path=\"kumite.stage.Stage\"/>\n\t<e path=\"Void\"/>\n</f></resize>\n\t<getMemento public=\"1\" set=\"method\" line=\"90\" override=\"1\"><f a=\"\"><c path=\"Int\"/></f></getMemento>\n\t<setMemento public=\"1\" set=\"method\" line=\"95\" override=\"1\"><f a=\"memento\">\n\t<d/>\n\t<e path=\"Void\"/>\n</f></setMemento>\n\t<gotoNextSlide set=\"method\" line=\"101\"><f a=\"_\">\n\t<c path=\"kumite.presentation.Slide\"/>\n\t<e path=\"Void\"/>\n</f></gotoNextSlide>\n\t<changeSlide set=\"method\" line=\"106\"><f a=\"newIndex\">\n\t<c path=\"Int\"/>\n\t<e path=\"Void\"/>\n</f></changeSlide>\n\t<new public=\"1\" set=\"method\" line=\"23\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
Log.filters = new Array();
Log.args = new Array();
Log.errors = new Array();
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
kumite.presentation.Presentation.__meta__ = { fields : { complete : { Sequence : ["boot","init"]}}};
kumite.presentation.Presentation.__rtti = "<class path=\"kumite.presentation.Presentation\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<slides public=\"1\"><c path=\"Array\"><c path=\"kumite.presentation.Slide\"/></c></slides>\n\t<currentSlideIndex public=\"1\"><c path=\"Int\"/></currentSlideIndex>\n\t<complete set=\"method\" line=\"19\"><f a=\"\"><e path=\"Void\"/></f></complete>\n\t<getMemento public=\"1\" set=\"method\" line=\"25\"><f a=\"\"><a>\n\t<i><c path=\"Int\"/></i>\n\t<a><c path=\"Array\"><c path=\"Int\"/></c></a>\n</a></f></getMemento>\n\t<setMemento public=\"1\" set=\"method\" line=\"36\"><f a=\"memento\">\n\t<a>\n\t\t<i><c path=\"Int\"/></i>\n\t\t<a><c path=\"Array\"><d/></c></a>\n\t</a>\n\t<e path=\"Void\"/>\n</f></setMemento>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
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