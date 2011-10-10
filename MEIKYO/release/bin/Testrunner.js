$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof reflect=='undefined') reflect = {}
reflect.MetadataAware = function() { }
reflect.MetadataAware.__name__ = ["reflect","MetadataAware"];
reflect.MetadataAware.prototype.hasMetadata = null;
reflect.MetadataAware.prototype.__class__ = reflect.MetadataAware;
if(typeof haxe=='undefined') haxe = {}
haxe.Public = function() { }
haxe.Public.__name__ = ["haxe","Public"];
haxe.Public.prototype.__class__ = haxe.Public;
if(!haxe.unit) haxe.unit = {}
haxe.unit.TestCase = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.unit.TestCase.__name__ = ["haxe","unit","TestCase"];
haxe.unit.TestCase.prototype.currentTest = null;
haxe.unit.TestCase.prototype.setup = function() {
	null;
}
haxe.unit.TestCase.prototype.tearDown = function() {
	null;
}
haxe.unit.TestCase.prototype.print = function(v) {
	haxe.unit.TestRunner.print(v);
}
haxe.unit.TestCase.prototype.assertTrue = function(b,c) {
	this.currentTest.done = true;
	if(b == false) {
		this.currentTest.success = false;
		this.currentTest.error = "expected true but was false";
		this.currentTest.posInfos = c;
		throw this.currentTest;
	}
}
haxe.unit.TestCase.prototype.assertFalse = function(b,c) {
	this.currentTest.done = true;
	if(b == true) {
		this.currentTest.success = false;
		this.currentTest.error = "expected false but was true";
		this.currentTest.posInfos = c;
		throw this.currentTest;
	}
}
haxe.unit.TestCase.prototype.assertEquals = function(expected,actual,c) {
	this.currentTest.done = true;
	if(actual != expected) {
		this.currentTest.success = false;
		this.currentTest.error = "expected '" + expected + "' but was '" + actual + "'";
		this.currentTest.posInfos = c;
		throw this.currentTest;
	}
}
haxe.unit.TestCase.prototype.__class__ = haxe.unit.TestCase;
haxe.unit.TestCase.__interfaces__ = [haxe.Public];
TestCase2 = function(p) { if( p === $_ ) return; {
	haxe.unit.TestCase.call(this);
}}
TestCase2.__name__ = ["TestCase2"];
TestCase2.__super__ = haxe.unit.TestCase;
for(var k in haxe.unit.TestCase.prototype ) TestCase2.prototype[k] = haxe.unit.TestCase.prototype[k];
TestCase2.prototype.assertNotNull = function(b,c) {
	this.currentTest.done = true;
	if(b == null) {
		this.currentTest.success = false;
		this.currentTest.error = "expected not null";
		this.currentTest.posInfos = c;
		throw this.currentTest;
	}
}
TestCase2.prototype.assertNull = function(b,c) {
	this.currentTest.done = true;
	if(b != null) {
		this.currentTest.success = false;
		this.currentTest.error = "expected null";
		this.currentTest.posInfos = c;
		throw this.currentTest;
	}
}
TestCase2.prototype.fail = function(message,c) {
	this.currentTest.done = true;
	this.currentTest.success = false;
	this.currentTest.error = message;
	this.currentTest.posInfos = c;
	throw this.currentTest;
}
TestCase2.prototype.noFail = function() {
	this.currentTest.done = true;
}
TestCase2.prototype.__class__ = TestCase2;
if(typeof bpmjs=='undefined') bpmjs = {}
bpmjs.TestError = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
bpmjs.TestError.__name__ = ["bpmjs","TestError"];
bpmjs.TestError.__super__ = TestCase2;
for(var k in TestCase2.prototype ) bpmjs.TestError.prototype[k] = TestCase2.prototype[k];
bpmjs.TestError.prototype.testContextNotNull = function() {
	try {
		var context = bpmjs.ContextBuilder.build(bpmjs._TestError.TestConfigWithoutRTTI);
	}
	catch( $e0 ) {
		if( js.Boot.__instanceof($e0,String) ) {
			var error = $e0;
			{
				this.noFail();
				return;
			}
		} else throw($e0);
	}
	this.fail("Expected Error",{ fileName : "TestError.hx", lineNumber : 18, className : "bpmjs.TestError", methodName : "testContextNotNull"});
}
bpmjs.TestError.prototype.__class__ = bpmjs.TestError;
if(!bpmjs._TestError) bpmjs._TestError = {}
bpmjs._TestError.TestConfigWithoutRTTI = function() { }
bpmjs._TestError.TestConfigWithoutRTTI.__name__ = ["bpmjs","_TestError","TestConfigWithoutRTTI"];
bpmjs._TestError.TestConfigWithoutRTTI.prototype.__class__ = bpmjs._TestError.TestConfigWithoutRTTI;
if(!haxe.rtti) haxe.rtti = {}
haxe.rtti.Infos = function() { }
haxe.rtti.Infos.__name__ = ["haxe","rtti","Infos"];
haxe.rtti.Infos.prototype.__class__ = haxe.rtti.Infos;
if(!reflect.model) reflect.model = {}
reflect.model.ClassB = function(p) { if( p === $_ ) return; {
	this.c = 1;
}}
reflect.model.ClassB.__name__ = ["reflect","model","ClassB"];
reflect.model.ClassB.prototype.c = null;
reflect.model.ClassB.prototype.__class__ = reflect.model.ClassB;
reflect.model.ClassB.__interfaces__ = [haxe.rtti.Infos];
reflect.model.ClassA = function(p) { if( p === $_ ) return; {
	reflect.model.ClassB.call(this);
}}
reflect.model.ClassA.__name__ = ["reflect","model","ClassA"];
reflect.model.ClassA.__super__ = reflect.model.ClassB;
for(var k in reflect.model.ClassB.prototype ) reflect.model.ClassA.prototype[k] = reflect.model.ClassB.prototype[k];
reflect.model.ClassA.prototype.a = null;
reflect.model.ClassA.prototype.b = null;
reflect.model.ClassA.prototype.f1 = function(a) {
	return 1;
}
reflect.model.ClassA.prototype.f2 = function() {
	null;
}
reflect.model.ClassA.prototype.__class__ = reflect.model.ClassA;
reflect.model.ClassA.__interfaces__ = [haxe.rtti.Infos];
bpmjs.TestMessenger = function(p) { if( p === $_ ) return; {
	haxe.unit.TestCase.call(this);
}}
bpmjs.TestMessenger.__name__ = ["bpmjs","TestMessenger"];
bpmjs.TestMessenger.__super__ = haxe.unit.TestCase;
for(var k in haxe.unit.TestCase.prototype ) bpmjs.TestMessenger.prototype[k] = haxe.unit.TestCase.prototype[k];
bpmjs.TestMessenger.prototype.completeCount = null;
bpmjs.TestMessenger.prototype.setup = function() {
	this.completeCount = 0;
}
bpmjs.TestMessenger.prototype.testSingleMessage = function() {
	var messenger = new bpmjs.Messenger();
	messenger.addReceiver(bpmjs._TestMessenger.Message,$closure(this,"incrementCompleteCount"));
	messenger.send(new bpmjs._TestMessenger.Message());
	this.assertEquals(1,this.completeCount,{ fileName : "TestMessenger.hx", lineNumber : 20, className : "bpmjs.TestMessenger", methodName : "testSingleMessage"});
}
bpmjs.TestMessenger.prototype.testDoubleAddListener = function() {
	var messenger = new bpmjs.Messenger();
	messenger.addReceiver(bpmjs._TestMessenger.Message,$closure(this,"incrementCompleteCount"));
	messenger.addReceiver(bpmjs._TestMessenger.Message,$closure(this,"incrementCompleteCount"));
	messenger.send(new bpmjs._TestMessenger.Message());
	this.assertEquals(1,this.completeCount,{ fileName : "TestMessenger.hx", lineNumber : 30, className : "bpmjs.TestMessenger", methodName : "testDoubleAddListener"});
}
bpmjs.TestMessenger.prototype.testDoubleSend = function() {
	var messenger = new bpmjs.Messenger();
	messenger.addReceiver(bpmjs._TestMessenger.Message,$closure(this,"incrementCompleteCount"));
	messenger.send(new bpmjs._TestMessenger.Message());
	messenger.send(new bpmjs._TestMessenger.Message());
	this.assertEquals(2,this.completeCount,{ fileName : "TestMessenger.hx", lineNumber : 40, className : "bpmjs.TestMessenger", methodName : "testDoubleSend"});
}
bpmjs.TestMessenger.prototype.incrementCompleteCount = function(message) {
	this.completeCount++;
}
bpmjs.TestMessenger.prototype.__class__ = bpmjs.TestMessenger;
if(!bpmjs._TestMessenger) bpmjs._TestMessenger = {}
bpmjs._TestMessenger.Message = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestMessenger.Message.__name__ = ["bpmjs","_TestMessenger","Message"];
bpmjs._TestMessenger.Message.prototype.__class__ = bpmjs._TestMessenger.Message;
if(typeof kumite=='undefined') kumite = {}
if(!kumite.scene) kumite.scene = {}
kumite.scene.LayerLifecycle = function() { }
kumite.scene.LayerLifecycle.__name__ = ["kumite","scene","LayerLifecycle"];
kumite.scene.LayerLifecycle.prototype.init = null;
kumite.scene.LayerLifecycle.prototype.render = null;
kumite.scene.LayerLifecycle.prototype.renderTransition = null;
kumite.scene.LayerLifecycle.prototype.__class__ = kumite.scene.LayerLifecycle;
bpmjs.Context = function(p) { if( p === $_ ) return; {
	this.objects = new Array();
	this.observers = new Array();
}}
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
	{
		var _g = 0, _g1 = this.objects;
		while(_g < _g1.length) {
			var contextObject = _g1[_g];
			++_g;
			if(contextObject.name == name) return contextObject.object;
		}
	}
	return null;
}
bpmjs.Context.prototype.getObjectByType = function(type) {
	if(type == bpmjs.Context) return this;
	{
		var _g = 0, _g1 = this.objects;
		while(_g < _g1.length) {
			var contextObject = _g1[_g];
			++_g;
			if(contextObject.type == type) return contextObject.object;
		}
	}
	return null;
}
bpmjs.Context.prototype.addObserver = function(object,methodName,type) {
	{
		Log.posInfo = { fileName : "Context.hx", lineNumber : 50, className : "bpmjs.Context", methodName : "addObserver"};
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
bpmjs.Context.prototype.__class__ = bpmjs.Context;
bpmjs.ContextObject = function(name,classInfo,object) { if( name === $_ ) return; {
	this.name = name;
	this.classInfo = classInfo;
	this.type = classInfo.type;
	this.object = object;
}}
bpmjs.ContextObject.__name__ = ["bpmjs","ContextObject"];
bpmjs.ContextObject.prototype.name = null;
bpmjs.ContextObject.prototype.type = null;
bpmjs.ContextObject.prototype.object = null;
bpmjs.ContextObject.prototype.classInfo = null;
bpmjs.ContextObject.prototype.__class__ = bpmjs.ContextObject;
bpmjs.Observer = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs.Observer.__name__ = ["bpmjs","Observer"];
bpmjs.Observer.prototype.object = null;
bpmjs.Observer.prototype.methodName = null;
bpmjs.Observer.prototype.type = null;
bpmjs.Observer.prototype.observe = function(objectToObserve) {
	if(Std["is"](objectToObserve.object,this.type.type)) {
		Reflect.field(this.object.object,this.methodName).apply(this.object.object,[objectToObserve.object]);
	}
}
bpmjs.Observer.prototype.__class__ = bpmjs.Observer;
List = function(p) { if( p === $_ ) return; {
	this.length = 0;
}}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x;
	else this.q[1] = x;
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
			if(prev == null) this.h = l[1];
			else prev[1] = l[1];
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
	s.b[s.b.length] = "{";
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = ", ";
		s.b[s.b.length] = Std.string(l[0]);
		l = l[1];
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = sep;
		s.b[s.b.length] = l[0];
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
bpmjs.Sequencer = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs.Sequencer.__name__ = ["bpmjs","Sequencer"];
bpmjs.Sequencer.prototype.context = null;
bpmjs.Sequencer.prototype.start = function(name) {
	if(Log.infoEnabled({ fileName : "Sequencer.hx", lineNumber : 16, className : "bpmjs.Sequencer", methodName : "start"})) {
		Log.fetchInput("Sequence: " + name,null,null,null,null,null,null);
		console.groupCollapsed(Log.createMessage());
	}
	var sequence = new bpmjs.Sequence(name);
	sequence.objects = this.context.objects;
	sequence.execute("initPrepare");
	sequence.execute("init");
	sequence.execute("initComplete");
	sequence.execute("startPrepare");
	sequence.execute("start");
	sequence.execute("startComplete");
	Log.groupEnd({ fileName : "Sequencer.hx", lineNumber : 28, className : "bpmjs.Sequencer", methodName : "start"});
}
bpmjs.Sequencer.prototype.__class__ = bpmjs.Sequencer;
bpmjs.Sequencer.__interfaces__ = [haxe.rtti.Infos];
bpmjs.Sequence = function(name) { if( name === $_ ) return; {
	this.name = name;
}}
bpmjs.Sequence.__name__ = ["bpmjs","Sequence"];
bpmjs.Sequence.prototype.name = null;
bpmjs.Sequence.prototype.objects = null;
bpmjs.Sequence.prototype.execute = function(phase) {
	var _g = 0, _g1 = this.objects;
	while(_g < _g1.length) {
		var contextObject = _g1[_g];
		++_g;
		var object = contextObject.object;
		var metaDatas = haxe.rtti.Meta.getFields(contextObject.type);
		{
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
							Log.posInfo = { fileName : "Sequencer.hx", lineNumber : 59, className : "bpmjs.Sequence", methodName : "execute"};
							if(Log.filter(LogLevel.INFO)) {
								Log.fetchInput("Phase '" + localPhase + "' " + Type.getClassName(contextObject.type) + "#" + fieldName,null,null,null,null,null,null);
								console.info(Log.createMessage());
							}
						}
						Reflect.field(object,fieldName).apply(object,[]);
					}
				}
			}
		}
	}
}
bpmjs.Sequence.prototype.__class__ = bpmjs.Sequence;
bpmjs.ReflectUtil = function() { }
bpmjs.ReflectUtil.__name__ = ["bpmjs","ReflectUtil"];
bpmjs.ReflectUtil.callMethodWithMetadata = function(object,type,metadata,args) {
	var metadatas = haxe.rtti.Meta.getFields(type);
	{
		var _g = 0, _g1 = Reflect.fields(metadatas);
		while(_g < _g1.length) {
			var fieldName = _g1[_g];
			++_g;
			var meta = Reflect.field(metadatas,fieldName);
			if(Reflect.hasField(meta,metadata)) {
				return Reflect.field(object,fieldName).apply(object,[]);
			}
		}
	}
	return null;
}
bpmjs.ReflectUtil.getClassName = function(object) {
	return Type.getClassName(Type.getClass(object));
}
bpmjs.ReflectUtil.prototype.__class__ = bpmjs.ReflectUtil;
bpmjs.TestConfigure = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
bpmjs.TestConfigure.__name__ = ["bpmjs","TestConfigure"];
bpmjs.TestConfigure.__super__ = TestCase2;
for(var k in TestCase2.prototype ) bpmjs.TestConfigure.prototype[k] = TestCase2.prototype[k];
bpmjs.TestConfigure.prototype.testObject = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestConfigure.TestConfigWithA);
	bpmjs.ContextBuilder.configure(new bpmjs._TestConfigure.B());
	var b = context.getObjectByType(bpmjs._TestConfigure.B);
	this.assertNotNull(b,{ fileName : "TestConfigure.hx", lineNumber : 12, className : "bpmjs.TestConfigure", methodName : "testObject"});
}
bpmjs.TestConfigure.prototype.testInject = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestConfigure.TestConfigWithA);
	bpmjs.ContextBuilder.configure(new bpmjs._TestConfigure.B());
	var b = context.getObjectByType(bpmjs._TestConfigure.B);
	this.assertNotNull(b.a,{ fileName : "TestConfigure.hx", lineNumber : 22, className : "bpmjs.TestConfigure", methodName : "testInject"});
}
bpmjs.TestConfigure.prototype.__class__ = bpmjs.TestConfigure;
if(!bpmjs._TestConfigure) bpmjs._TestConfigure = {}
bpmjs._TestConfigure.TestConfigWithA = function(p) { if( p === $_ ) return; {
	this.a = new bpmjs._TestConfigure.A();
}}
bpmjs._TestConfigure.TestConfigWithA.__name__ = ["bpmjs","_TestConfigure","TestConfigWithA"];
bpmjs._TestConfigure.TestConfigWithA.prototype.a = null;
bpmjs._TestConfigure.TestConfigWithA.prototype.__class__ = bpmjs._TestConfigure.TestConfigWithA;
bpmjs._TestConfigure.TestConfigWithA.__interfaces__ = [haxe.rtti.Infos];
bpmjs._TestConfigure.A = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestConfigure.A.__name__ = ["bpmjs","_TestConfigure","A"];
bpmjs._TestConfigure.A.prototype.b = null;
bpmjs._TestConfigure.A.prototype.__class__ = bpmjs._TestConfigure.A;
bpmjs._TestConfigure.A.__interfaces__ = [haxe.rtti.Infos];
bpmjs._TestConfigure.B = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestConfigure.B.__name__ = ["bpmjs","_TestConfigure","B"];
bpmjs._TestConfigure.B.prototype.a = null;
bpmjs._TestConfigure.B.prototype.__class__ = bpmjs._TestConfigure.B;
bpmjs._TestConfigure.B.__interfaces__ = [haxe.rtti.Infos];
reflect.Field = function(field,definedInClass,owner) { if( field === $_ ) return; {
	this.field = field;
	this.definedInClass = definedInClass;
	this.owner = owner;
}}
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
	{
		var _g = 0, _g1 = Reflect.fields(metadatas);
		while(_g < _g1.length) {
			var fieldName = _g1[_g];
			++_g;
			if(fieldName == this.field.name) {
				var meta = Reflect.field(metadatas,fieldName);
				if(Reflect.hasField(meta,name)) return true;
			}
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
haxe.unit.TestStatus = function(p) { if( p === $_ ) return; {
	this.done = false;
	this.success = false;
}}
haxe.unit.TestStatus.__name__ = ["haxe","unit","TestStatus"];
haxe.unit.TestStatus.prototype.done = null;
haxe.unit.TestStatus.prototype.success = null;
haxe.unit.TestStatus.prototype.error = null;
haxe.unit.TestStatus.prototype.method = null;
haxe.unit.TestStatus.prototype.classname = null;
haxe.unit.TestStatus.prototype.posInfos = null;
haxe.unit.TestStatus.prototype.backtrace = null;
haxe.unit.TestStatus.prototype.__class__ = haxe.unit.TestStatus;
haxe.unit.TestRunner = function(p) { if( p === $_ ) return; {
	this.result = new haxe.unit.TestResult();
	this.cases = new List();
}}
haxe.unit.TestRunner.__name__ = ["haxe","unit","TestRunner"];
haxe.unit.TestRunner.print = function(v) {
	var msg = StringTools.htmlEscape(js.Boot.__string_rec(v,"")).split("\n").join("<br/>");
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("haxe:trace element not found");
	else d.innerHTML += msg;
}
haxe.unit.TestRunner.customTrace = function(v,p) {
	haxe.unit.TestRunner.print(p.fileName + ":" + p.lineNumber + ": " + Std.string(v) + "\n");
}
haxe.unit.TestRunner.prototype.result = null;
haxe.unit.TestRunner.prototype.cases = null;
haxe.unit.TestRunner.prototype.add = function(c) {
	this.cases.add(c);
}
haxe.unit.TestRunner.prototype.run = function() {
	this.result = new haxe.unit.TestResult();
	{ var $it0 = this.cases.iterator();
	while( $it0.hasNext() ) { var c = $it0.next();
	{
		this.runCase(c);
	}
	}}
	haxe.unit.TestRunner.print(this.result.toString());
	return this.result.success;
}
haxe.unit.TestRunner.prototype.runCase = function(t) {
	var old = $closure(haxe.Log,"trace");
	haxe.Log.trace = $closure(haxe.unit.TestRunner,"customTrace");
	var cl = Type.getClass(t);
	var fields = Type.getInstanceFields(cl);
	haxe.unit.TestRunner.print("Class: " + Type.getClassName(cl) + " ");
	{
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			var fname = f;
			var field = Reflect.field(t,f);
			if(StringTools.startsWith(fname,"test") && Reflect.isFunction(field)) {
				t.currentTest = new haxe.unit.TestStatus();
				t.currentTest.classname = Type.getClassName(cl);
				t.currentTest.method = fname;
				t.setup();
				try {
					field.apply(t,new Array());
					if(t.currentTest.done) {
						t.currentTest.success = true;
						haxe.unit.TestRunner.print(".");
					}
					else {
						t.currentTest.success = false;
						t.currentTest.error = "(warning) no assert";
						haxe.unit.TestRunner.print("W");
					}
				}
				catch( $e0 ) {
					if( js.Boot.__instanceof($e0,haxe.unit.TestStatus) ) {
						var e = $e0;
						{
							haxe.unit.TestRunner.print("F");
							t.currentTest.backtrace = haxe.Stack.toString(haxe.Stack.exceptionStack());
						}
					} else {
						var e = $e0;
						{
							haxe.unit.TestRunner.print("E");
							if(e.message != null) {
								t.currentTest.error = "exception thrown : " + e + " [" + e.message + "]";
							}
							else {
								t.currentTest.error = "exception thrown : " + e;
							}
							t.currentTest.backtrace = haxe.Stack.toString(haxe.Stack.exceptionStack());
						}
					}
				}
				this.result.add(t.currentTest);
				t.tearDown();
			}
		}
	}
	haxe.unit.TestRunner.print("\n");
	haxe.Log.trace = old;
}
haxe.unit.TestRunner.prototype.__class__ = haxe.unit.TestRunner;
haxe.rtti.XmlParser = function(p) { if( p === $_ ) return; {
	this.root = new Array();
}}
haxe.rtti.XmlParser.__name__ = ["haxe","rtti","XmlParser"];
haxe.rtti.XmlParser.prototype.root = null;
haxe.rtti.XmlParser.prototype.curplatform = null;
haxe.rtti.XmlParser.prototype.sort = function(l) {
	if(l == null) l = this.root;
	l.sort(function(e1,e2) {
		var n1 = (function($this) {
			var $r;
			var $e = e1;
			switch( $e[1] ) {
			case 0:
			var p = $e[2];
			{
				$r = " " + p;
			}break;
			default:{
				$r = haxe.rtti.TypeApi.typeInfos(e1).path;
			}break;
			}
			return $r;
		}(this));
		var n2 = (function($this) {
			var $r;
			var $e = e2;
			switch( $e[1] ) {
			case 0:
			var p = $e[2];
			{
				$r = " " + p;
			}break;
			default:{
				$r = haxe.rtti.TypeApi.typeInfos(e2).path;
			}break;
			}
			return $r;
		}(this));
		if(n1 > n2) return 1;
		return -1;
	});
	{
		var _g = 0;
		while(_g < l.length) {
			var x = l[_g];
			++_g;
			var $e = x;
			switch( $e[1] ) {
			case 0:
			var l1 = $e[4];
			{
				this.sort(l1);
			}break;
			case 1:
			var c = $e[2];
			{
				c.fields = this.sortFields(c.fields);
				c.statics = this.sortFields(c.statics);
			}break;
			case 2:
			var e = $e[2];
			{
				null;
			}break;
			case 3:
			{
				null;
			}break;
			}
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
	{ var $it0 = c2.fields.iterator();
	while( $it0.hasNext() ) { var f2 = $it0.next();
	{
		var found = null;
		{ var $it1 = c.fields.iterator();
		while( $it1.hasNext() ) { var f = $it1.next();
		if(this.mergeFields(f,f2)) {
			found = f;
			break;
		}
		}}
		if(found == null) c.fields.add(f2);
		else if(this.curplatform != null) found.platforms.add(this.curplatform);
	}
	}}
	{ var $it2 = c2.statics.iterator();
	while( $it2.hasNext() ) { var f2 = $it2.next();
	{
		var found = null;
		{ var $it3 = c.statics.iterator();
		while( $it3.hasNext() ) { var f = $it3.next();
		if(this.mergeFields(f,f2)) {
			found = f;
			break;
		}
		}}
		if(found == null) c.statics.add(f2);
		else if(this.curplatform != null) found.platforms.add(this.curplatform);
	}
	}}
	return true;
}
haxe.rtti.XmlParser.prototype.mergeEnums = function(e,e2) {
	if(e.isExtern != e2.isExtern) return false;
	if(this.curplatform != null) e.platforms.add(this.curplatform);
	{ var $it0 = e2.constructors.iterator();
	while( $it0.hasNext() ) { var c2 = $it0.next();
	{
		var found = null;
		{ var $it1 = e.constructors.iterator();
		while( $it1.hasNext() ) { var c = $it1.next();
		if(haxe.rtti.TypeApi.constructorEq(c,c2)) {
			found = c;
			break;
		}
		}}
		if(found == null) return false;
		if(this.curplatform != null) found.platforms.add(this.curplatform);
	}
	}}
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
	{
		var _g = 0;
		while(_g < pack.length) {
			var p = pack[_g];
			++_g;
			var found = false;
			{
				var _g1 = 0;
				try {
					while(_g1 < cur.length) {
						var pk = cur[_g1];
						++_g1;
						var $e = pk;
						switch( $e[1] ) {
						case 0:
						var subs = $e[4], pname = $e[2];
						{
							if(pname == p) {
								found = true;
								cur = subs;
								throw "__break__";
							}
						}break;
						default:{
							null;
						}break;
						}
					}
				} catch( e ) { if( e != "__break__" ) throw e; }
			}
			curpack.push(p);
			if(!found) {
				var pk = new Array();
				cur.push(haxe.rtti.TypeTree.TPackage(p,curpack.join("."),pk));
				cur = pk;
			}
		}
	}
	var prev = null;
	{
		var _g = 0;
		while(_g < cur.length) {
			var ct = cur[_g];
			++_g;
			var tinf;
			try {
				tinf = haxe.rtti.TypeApi.typeInfos(ct);
			}
			catch( $e0 ) {
				{
					var e = $e0;
					continue;
				}
			}
			if(tinf.path == inf.path) {
				if(tinf.module == inf.module && tinf.doc == inf.doc && tinf.isPrivate == inf.isPrivate) var $e = ct;
				switch( $e[1] ) {
				case 1:
				var c = $e[2];
				{
					var $e = t;
					switch( $e[1] ) {
					case 1:
					var c2 = $e[2];
					{
						if(this.mergeClasses(c,c2)) return;
					}break;
					default:{
						null;
					}break;
					}
				}break;
				case 2:
				var e = $e[2];
				{
					var $e = t;
					switch( $e[1] ) {
					case 2:
					var e2 = $e[2];
					{
						if(this.mergeEnums(e,e2)) return;
					}break;
					default:{
						null;
					}break;
					}
				}break;
				case 3:
				var td = $e[2];
				{
					var $e = t;
					switch( $e[1] ) {
					case 3:
					var td2 = $e[2];
					{
						if(this.mergeTypedefs(td,td2)) return;
					}break;
					default:{
						null;
					}break;
					}
				}break;
				case 0:
				{
					null;
				}break;
				}
				throw "Incompatibilities between " + tinf.path + " in " + tinf.platforms.join(",") + " and " + this.curplatform;
			}
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
		case "null":{
			$r = haxe.rtti.Rights.RNo;
		}break;
		case "method":{
			$r = haxe.rtti.Rights.RMethod;
		}break;
		case "dynamic":{
			$r = haxe.rtti.Rights.RDynamic;
		}break;
		case "inline":{
			$r = haxe.rtti.Rights.RInline;
		}break;
		default:{
			$r = haxe.rtti.Rights.RCall(r);
		}break;
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
	{ var $it0 = x.x.elements();
	while( $it0.hasNext() ) { var c = $it0.next();
	this.merge(this.processElement(c));
	}}
}
haxe.rtti.XmlParser.prototype.processElement = function(x) {
	var c = new haxe.xml.Fast(x);
	return (function($this) {
		var $r;
		switch(c.getName()) {
		case "class":{
			$r = haxe.rtti.TypeTree.TClassdecl($this.xclass(c));
		}break;
		case "enum":{
			$r = haxe.rtti.TypeTree.TEnumdecl($this.xenum(c));
		}break;
		case "typedef":{
			$r = haxe.rtti.TypeTree.TTypedecl($this.xtypedef(c));
		}break;
		default:{
			$r = $this.xerror(c);
		}break;
		}
		return $r;
	}(this));
}
haxe.rtti.XmlParser.prototype.xpath = function(x) {
	var path = this.mkPath(x.att.resolve("path"));
	var params = new List();
	{ var $it0 = x.getElements();
	while( $it0.hasNext() ) { var c = $it0.next();
	params.add(this.xtype(c));
	}}
	return { path : path, params : params};
}
haxe.rtti.XmlParser.prototype.xclass = function(x) {
	var csuper = null;
	var doc = null;
	var tdynamic = null;
	var interfaces = new List();
	var fields = new List();
	var statics = new List();
	{ var $it0 = x.getElements();
	while( $it0.hasNext() ) { var c = $it0.next();
	switch(c.getName()) {
	case "haxe_doc":{
		doc = c.getInnerData();
	}break;
	case "extends":{
		csuper = this.xpath(c);
	}break;
	case "implements":{
		interfaces.add(this.xpath(c));
	}break;
	case "haxe_dynamic":{
		tdynamic = this.xtype(new haxe.xml.Fast(c.x.firstElement()));
	}break;
	default:{
		if(c.x.exists("static")) statics.add(this.xclassfield(c));
		else fields.add(this.xclassfield(c));
	}break;
	}
	}}
	return { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), isInterface : x.x.exists("interface"), params : this.mkTypeParams(x.att.resolve("params")), superClass : csuper, interfaces : interfaces, fields : fields, statics : statics, tdynamic : tdynamic, platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xclassfield = function(x) {
	var e = x.getElements();
	var t = this.xtype(e.next());
	var doc = null;
	{ var $it0 = e;
	while( $it0.hasNext() ) { var c = $it0.next();
	switch(c.getName()) {
	case "haxe_doc":{
		doc = c.getInnerData();
	}break;
	default:{
		this.xerror(c);
	}break;
	}
	}}
	return { name : x.getName(), type : t, isPublic : x.x.exists("public"), isOverride : x.x.exists("override"), doc : doc, get : x.has.resolve("get")?this.mkRights(x.att.resolve("get")):haxe.rtti.Rights.RNormal, set : x.has.resolve("set")?this.mkRights(x.att.resolve("set")):haxe.rtti.Rights.RNormal, params : x.has.resolve("params")?this.mkTypeParams(x.att.resolve("params")):null, platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xenum = function(x) {
	var cl = new List();
	var doc = null;
	{ var $it0 = x.getElements();
	while( $it0.hasNext() ) { var c = $it0.next();
	if(c.getName() == "haxe_doc") doc = c.getInnerData();
	else cl.add(this.xenumfield(c));
	}}
	return { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), params : this.mkTypeParams(x.att.resolve("params")), constructors : cl, platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xenumfield = function(x) {
	var args = null;
	var xdoc = x.x.elementsNamed("haxe_doc").next();
	if(x.has.resolve("a")) {
		var names = x.att.resolve("a").split(":");
		var elts = x.getElements();
		args = new List();
		{
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
	}
	return { name : x.getName(), args : args, doc : xdoc == null?null:new haxe.xml.Fast(xdoc).getInnerData(), platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xtypedef = function(x) {
	var doc = null;
	var t = null;
	{ var $it0 = x.getElements();
	while( $it0.hasNext() ) { var c = $it0.next();
	if(c.getName() == "haxe_doc") doc = c.getInnerData();
	else t = this.xtype(c);
	}}
	var types = new Hash();
	if(this.curplatform != null) types.set(this.curplatform,t);
	return { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), params : this.mkTypeParams(x.att.resolve("params")), type : t, types : types, platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xtype = function(x) {
	return (function($this) {
		var $r;
		switch(x.getName()) {
		case "unknown":{
			$r = haxe.rtti.CType.CUnknown;
		}break;
		case "e":{
			$r = haxe.rtti.CType.CEnum($this.mkPath(x.att.resolve("path")),$this.xtypeparams(x));
		}break;
		case "c":{
			$r = haxe.rtti.CType.CClass($this.mkPath(x.att.resolve("path")),$this.xtypeparams(x));
		}break;
		case "t":{
			$r = haxe.rtti.CType.CTypedef($this.mkPath(x.att.resolve("path")),$this.xtypeparams(x));
		}break;
		case "f":{
			$r = (function($this) {
				var $r;
				var args = new List();
				var aname = x.att.resolve("a").split(":");
				var eargs = aname.iterator();
				{ var $it0 = x.getElements();
				while( $it0.hasNext() ) { var e = $it0.next();
				{
					var opt = false;
					var a = eargs.next();
					if(a == null) a = "";
					if(a.charAt(0) == "?") {
						opt = true;
						a = a.substr(1);
					}
					args.add({ name : a, opt : opt, t : $this.xtype(e)});
				}
				}}
				var ret = args.last();
				args.remove(ret);
				$r = haxe.rtti.CType.CFunction(args,ret.t);
				return $r;
			}($this));
		}break;
		case "a":{
			$r = (function($this) {
				var $r;
				var fields = new List();
				{ var $it1 = x.getElements();
				while( $it1.hasNext() ) { var f = $it1.next();
				fields.add({ name : f.getName(), t : $this.xtype(new haxe.xml.Fast(f.x.firstElement()))});
				}}
				$r = haxe.rtti.CType.CAnonymous(fields);
				return $r;
			}($this));
		}break;
		case "d":{
			$r = (function($this) {
				var $r;
				var t = null;
				var tx = x.x.firstElement();
				if(tx != null) t = $this.xtype(new haxe.xml.Fast(tx));
				$r = haxe.rtti.CType.CDynamic(t);
				return $r;
			}($this));
		}break;
		default:{
			$r = $this.xerror(x);
		}break;
		}
		return $r;
	}(this));
}
haxe.rtti.XmlParser.prototype.xtypeparams = function(x) {
	var p = new List();
	{ var $it0 = x.getElements();
	while( $it0.hasNext() ) { var c = $it0.next();
	p.add(this.xtype(c));
	}}
	return p;
}
haxe.rtti.XmlParser.prototype.defplat = function() {
	var l = new List();
	if(this.curplatform != null) l.add(this.curplatform);
	return l;
}
haxe.rtti.XmlParser.prototype.__class__ = haxe.rtti.XmlParser;
bpmjs.ContextConfig = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs.ContextConfig.__name__ = ["bpmjs","ContextConfig"];
bpmjs.ContextConfig.prototype.frontMessenger = null;
bpmjs.ContextConfig.prototype.__class__ = bpmjs.ContextConfig;
bpmjs.TestDynamic = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
bpmjs.TestDynamic.__name__ = ["bpmjs","TestDynamic"];
bpmjs.TestDynamic.__super__ = TestCase2;
for(var k in TestCase2.prototype ) bpmjs.TestDynamic.prototype[k] = TestCase2.prototype[k];
bpmjs.TestDynamic.prototype.testObjects = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestDynamic.TestConfigWithAAndDyanmicBs);
	this.assertEquals(3,bpmjs.TestDynamic.bCount,{ fileName : "TestDynamic.hx", lineNumber : 10, className : "bpmjs.TestDynamic", methodName : "testObjects"});
}
bpmjs.TestDynamic.prototype.testListInject = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestDynamic.TestConfigWithAAndDyanmicBs);
	var a = context.getObjectByType(bpmjs._TestDynamic.A);
	this.assertEquals(3,a.bList.length,{ fileName : "TestDynamic.hx", lineNumber : 18, className : "bpmjs.TestDynamic", methodName : "testListInject"});
}
bpmjs.TestDynamic.prototype.__class__ = bpmjs.TestDynamic;
if(!bpmjs._TestDynamic) bpmjs._TestDynamic = {}
bpmjs._TestDynamic.TestConfigWithAAndDyanmicBs = function(p) { if( p === $_ ) return; {
	this.a = new bpmjs._TestDynamic.A();
	this.bList = new Array();
	this.bList.push(new bpmjs._TestDynamic.B());
	this.bList.push(new bpmjs._TestDynamic.B());
	this.bList.push(new bpmjs._TestDynamic.B());
}}
bpmjs._TestDynamic.TestConfigWithAAndDyanmicBs.__name__ = ["bpmjs","_TestDynamic","TestConfigWithAAndDyanmicBs"];
bpmjs._TestDynamic.TestConfigWithAAndDyanmicBs.prototype.a = null;
bpmjs._TestDynamic.TestConfigWithAAndDyanmicBs.prototype.bList = null;
bpmjs._TestDynamic.TestConfigWithAAndDyanmicBs.prototype.__class__ = bpmjs._TestDynamic.TestConfigWithAAndDyanmicBs;
bpmjs._TestDynamic.TestConfigWithAAndDyanmicBs.__interfaces__ = [haxe.rtti.Infos];
bpmjs._TestDynamic.A = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestDynamic.A.__name__ = ["bpmjs","_TestDynamic","A"];
bpmjs._TestDynamic.A.prototype.bList = null;
bpmjs._TestDynamic.A.prototype.__class__ = bpmjs._TestDynamic.A;
bpmjs._TestDynamic.A.__interfaces__ = [haxe.rtti.Infos];
bpmjs._TestDynamic.B = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestDynamic.B.__name__ = ["bpmjs","_TestDynamic","B"];
bpmjs._TestDynamic.B.prototype.a = null;
bpmjs._TestDynamic.B.prototype.handleComplete = function() {
	if(this.a != null) bpmjs.TestDynamic.bCount++;
}
bpmjs._TestDynamic.B.prototype.__class__ = bpmjs._TestDynamic.B;
bpmjs._TestDynamic.B.__interfaces__ = [haxe.rtti.Infos];
bpmjs.TestGetObject = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
bpmjs.TestGetObject.__name__ = ["bpmjs","TestGetObject"];
bpmjs.TestGetObject.__super__ = TestCase2;
for(var k in TestCase2.prototype ) bpmjs.TestGetObject.prototype[k] = TestCase2.prototype[k];
bpmjs.TestGetObject.prototype.testGetObjectByName = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestGetObject.TestConfigWithA);
	var a = context.getObjectByName("a");
	this.assertNotNull(a,{ fileName : "TestGetObject.hx", lineNumber : 10, className : "bpmjs.TestGetObject", methodName : "testGetObjectByName"});
}
bpmjs.TestGetObject.prototype.testGetObjectByNameValidate = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestGetObject.TestConfigWithA);
	var a = context.getObjectByName("a");
	this.assertTrue(Std["is"](a,bpmjs._TestGetObject.A),{ fileName : "TestGetObject.hx", lineNumber : 17, className : "bpmjs.TestGetObject", methodName : "testGetObjectByNameValidate"});
	this.assertTrue(a.getValue(),{ fileName : "TestGetObject.hx", lineNumber : 18, className : "bpmjs.TestGetObject", methodName : "testGetObjectByNameValidate"});
}
bpmjs.TestGetObject.prototype.testGetObjectByType = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestGetObject.TestConfigWithA);
	var a = context.getObjectByType(bpmjs._TestGetObject.A);
	this.assertNotNull(a,{ fileName : "TestGetObject.hx", lineNumber : 25, className : "bpmjs.TestGetObject", methodName : "testGetObjectByType"});
}
bpmjs.TestGetObject.prototype.testGetObjectAAndBByName = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestGetObject.TestConfigWithAAndB);
	var a = context.getObjectByName("a");
	this.assertTrue(Std["is"](a,bpmjs._TestGetObject.A),{ fileName : "TestGetObject.hx", lineNumber : 33, className : "bpmjs.TestGetObject", methodName : "testGetObjectAAndBByName"});
	var b = context.getObjectByName("b");
	this.assertTrue(Std["is"](b,bpmjs._TestGetObject.B),{ fileName : "TestGetObject.hx", lineNumber : 36, className : "bpmjs.TestGetObject", methodName : "testGetObjectAAndBByName"});
}
bpmjs.TestGetObject.prototype.testGetObjectAAndBByType = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestGetObject.TestConfigWithAAndB);
	var a = context.getObjectByType(bpmjs._TestGetObject.A);
	this.assertTrue(Std["is"](a,bpmjs._TestGetObject.A),{ fileName : "TestGetObject.hx", lineNumber : 44, className : "bpmjs.TestGetObject", methodName : "testGetObjectAAndBByType"});
	var b = context.getObjectByType(bpmjs._TestGetObject.B);
	this.assertTrue(Std["is"](b,bpmjs._TestGetObject.B),{ fileName : "TestGetObject.hx", lineNumber : 47, className : "bpmjs.TestGetObject", methodName : "testGetObjectAAndBByType"});
}
bpmjs.TestGetObject.prototype.__class__ = bpmjs.TestGetObject;
if(!bpmjs._TestGetObject) bpmjs._TestGetObject = {}
bpmjs._TestGetObject.TestConfigWithA = function(p) { if( p === $_ ) return; {
	this.a = new bpmjs._TestGetObject.A();
}}
bpmjs._TestGetObject.TestConfigWithA.__name__ = ["bpmjs","_TestGetObject","TestConfigWithA"];
bpmjs._TestGetObject.TestConfigWithA.prototype.a = null;
bpmjs._TestGetObject.TestConfigWithA.prototype.__class__ = bpmjs._TestGetObject.TestConfigWithA;
bpmjs._TestGetObject.TestConfigWithA.__interfaces__ = [haxe.rtti.Infos];
bpmjs._TestGetObject.A = function(p) { if( p === $_ ) return; {
	this.value = true;
}}
bpmjs._TestGetObject.A.__name__ = ["bpmjs","_TestGetObject","A"];
bpmjs._TestGetObject.A.prototype.value = null;
bpmjs._TestGetObject.A.prototype.getValue = function() {
	return this.value;
}
bpmjs._TestGetObject.A.prototype.__class__ = bpmjs._TestGetObject.A;
bpmjs._TestGetObject.TestConfigWithAAndB = function(p) { if( p === $_ ) return; {
	this.a = new bpmjs._TestGetObject.A();
	this.b = new bpmjs._TestGetObject.B();
}}
bpmjs._TestGetObject.TestConfigWithAAndB.__name__ = ["bpmjs","_TestGetObject","TestConfigWithAAndB"];
bpmjs._TestGetObject.TestConfigWithAAndB.prototype.a = null;
bpmjs._TestGetObject.TestConfigWithAAndB.prototype.b = null;
bpmjs._TestGetObject.TestConfigWithAAndB.prototype.__class__ = bpmjs._TestGetObject.TestConfigWithAAndB;
bpmjs._TestGetObject.TestConfigWithAAndB.__interfaces__ = [haxe.rtti.Infos];
bpmjs._TestGetObject.B = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestGetObject.B.__name__ = ["bpmjs","_TestGetObject","B"];
bpmjs._TestGetObject.B.prototype.__class__ = bpmjs._TestGetObject.B;
LogFilter = function() { }
LogFilter.__name__ = ["LogFilter"];
LogFilter.prototype.enabled = null;
LogFilter.prototype.__class__ = LogFilter;
LogLevel = function(value) { if( value === $_ ) return; {
	this.value = value;
}}
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
	{ var $it0 = arr.iterator();
	while( $it0.hasNext() ) { var t = $it0.next();
	if(t == field) return true;
	}}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	}
	catch( $e0 ) {
		{
			var e = $e0;
			null;
		}
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
		
				for(var i in o)
					if( o.hasOwnProperty(i) )
						a.push(i);
			;
	}
	else {
		var t;
		try {
			t = o.__proto__;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					t = null;
				}
			}
		}
		if(t != null) o.__proto__ = null;
		
				for(var i in o)
					if( i != "__proto__" )
						a.push(i);
			;
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
	{
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		{
			var _g1 = 0, _g = arguments.length;
			while(_g1 < _g) {
				var i = _g1++;
				a.push(arguments[i]);
			}
		}
		return f(a);
	}
}
Reflect.prototype.__class__ = Reflect;
bpmjs.FrontMessenger = function() { }
bpmjs.FrontMessenger.__name__ = ["bpmjs","FrontMessenger"];
bpmjs.FrontMessenger.prototype.addMessenger = null;
bpmjs.FrontMessenger.prototype.addReceiver = null;
bpmjs.FrontMessenger.prototype.__class__ = bpmjs.FrontMessenger;
bpmjs.DefaultFrontMessenger = function(p) { if( p === $_ ) return; {
	this.receivers = new Array();
}}
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
	{
		var _g = 0, _g1 = this.receivers;
		while(_g < _g1.length) {
			var receiver = _g1[_g];
			++_g;
			if(Type.getClass(message) == receiver.type) {
				{
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
	}
}
bpmjs.DefaultFrontMessenger.prototype.__class__ = bpmjs.DefaultFrontMessenger;
bpmjs.DefaultFrontMessenger.__interfaces__ = [bpmjs.FrontMessenger];
if(!bpmjs._FrontMessenger) bpmjs._FrontMessenger = {}
bpmjs._FrontMessenger.Receiver = function(receiver,methodName,type) { if( receiver === $_ ) return; {
	this.receiver = receiver;
	this.type = type;
	this.method = Reflect.field(receiver,methodName);
	this.methodName = methodName;
}}
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
if(!bpmjs.integration) bpmjs.integration = {}
bpmjs.integration.TestMultipleConfigs = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
bpmjs.integration.TestMultipleConfigs.__name__ = ["bpmjs","integration","TestMultipleConfigs"];
bpmjs.integration.TestMultipleConfigs.__super__ = TestCase2;
for(var k in TestCase2.prototype ) bpmjs.integration.TestMultipleConfigs.prototype[k] = TestCase2.prototype[k];
bpmjs.integration.TestMultipleConfigs.prototype.testGetObject = function() {
	var context = bpmjs.ContextBuilder.buildAll([bpmjs.integration._TestMultipleConfigs.TestConfigWithA,bpmjs.integration._TestMultipleConfigs.TestConfigWithB]);
	var a = context.getObjectByName("a");
	this.assertNotNull(a,{ fileName : "TestMultipleConfigs.hx", lineNumber : 9, className : "bpmjs.integration.TestMultipleConfigs", methodName : "testGetObject"});
	var b = context.getObjectByName("b");
	this.assertNotNull(b,{ fileName : "TestMultipleConfigs.hx", lineNumber : 11, className : "bpmjs.integration.TestMultipleConfigs", methodName : "testGetObject"});
}
bpmjs.integration.TestMultipleConfigs.prototype.__class__ = bpmjs.integration.TestMultipleConfigs;
if(!bpmjs.integration._TestMultipleConfigs) bpmjs.integration._TestMultipleConfigs = {}
bpmjs.integration._TestMultipleConfigs.TestConfigWithA = function(p) { if( p === $_ ) return; {
	this.a = new bpmjs.integration._TestMultipleConfigs.A();
}}
bpmjs.integration._TestMultipleConfigs.TestConfigWithA.__name__ = ["bpmjs","integration","_TestMultipleConfigs","TestConfigWithA"];
bpmjs.integration._TestMultipleConfigs.TestConfigWithA.prototype.a = null;
bpmjs.integration._TestMultipleConfigs.TestConfigWithA.prototype.__class__ = bpmjs.integration._TestMultipleConfigs.TestConfigWithA;
bpmjs.integration._TestMultipleConfigs.TestConfigWithA.__interfaces__ = [haxe.rtti.Infos];
bpmjs.integration._TestMultipleConfigs.TestConfigWithB = function(p) { if( p === $_ ) return; {
	this.b = new bpmjs.integration._TestMultipleConfigs.B();
}}
bpmjs.integration._TestMultipleConfigs.TestConfigWithB.__name__ = ["bpmjs","integration","_TestMultipleConfigs","TestConfigWithB"];
bpmjs.integration._TestMultipleConfigs.TestConfigWithB.prototype.b = null;
bpmjs.integration._TestMultipleConfigs.TestConfigWithB.prototype.__class__ = bpmjs.integration._TestMultipleConfigs.TestConfigWithB;
bpmjs.integration._TestMultipleConfigs.TestConfigWithB.__interfaces__ = [haxe.rtti.Infos];
bpmjs.integration._TestMultipleConfigs.A = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs.integration._TestMultipleConfigs.A.__name__ = ["bpmjs","integration","_TestMultipleConfigs","A"];
bpmjs.integration._TestMultipleConfigs.A.prototype.__class__ = bpmjs.integration._TestMultipleConfigs.A;
bpmjs.integration._TestMultipleConfigs.A.__interfaces__ = [haxe.rtti.Infos];
bpmjs.integration._TestMultipleConfigs.B = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs.integration._TestMultipleConfigs.B.__name__ = ["bpmjs","integration","_TestMultipleConfigs","B"];
bpmjs.integration._TestMultipleConfigs.B.prototype.__class__ = bpmjs.integration._TestMultipleConfigs.B;
bpmjs.integration._TestMultipleConfigs.B.__interfaces__ = [haxe.rtti.Infos];
ERegFilter = function(level,r) { if( level === $_ ) return; {
	this.level = level;
	this.r = r;
}}
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
	{
		var _g = 0;
		while(_g < stack.length) {
			var s = stack[_g];
			++_g;
			b.b[b.b.length] = "\nCalled from ";
			haxe.Stack.itemToString(b,s);
		}
	}
	return b.b.join("");
}
haxe.Stack.itemToString = function(b,s) {
	var $e = s;
	switch( $e[1] ) {
	case 0:
	{
		b.b[b.b.length] = "a C function";
	}break;
	case 1:
	var m = $e[2];
	{
		b.b[b.b.length] = "module ";
		b.b[b.b.length] = m;
	}break;
	case 2:
	var line = $e[4], file = $e[3], s1 = $e[2];
	{
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b[b.b.length] = " (";
		}
		b.b[b.b.length] = file;
		b.b[b.b.length] = " line ";
		b.b[b.b.length] = line;
		if(s1 != null) b.b[b.b.length] = ")";
	}break;
	case 3:
	var meth = $e[3], cname = $e[2];
	{
		b.b[b.b.length] = cname;
		b.b[b.b.length] = ".";
		b.b[b.b.length] = meth;
	}break;
	case 4:
	var n = $e[2];
	{
		b.b[b.b.length] = "local function #";
		b.b[b.b.length] = n;
	}break;
	}
}
haxe.Stack.makeStack = function(s) {
	var a = (function($this) {
		var $r;
		try {
			$r = eval(s);
		}
		catch( $e0 ) {
			{
				var e = $e0;
				$r = [];
			}
		}
		return $r;
	}(this));
	var m = new Array();
	{
		var _g1 = 0, _g = a.length - (s == "$s"?2:0);
		while(_g1 < _g) {
			var i = _g1++;
			var d = a[i].split("::");
			m.unshift(haxe.StackItem.Method(d[0],d[1]));
		}
	}
	return m;
}
haxe.Stack.prototype.__class__ = haxe.Stack;
bpmjs.TestFrontMessenger = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
bpmjs.TestFrontMessenger.__name__ = ["bpmjs","TestFrontMessenger"];
bpmjs.TestFrontMessenger.__super__ = TestCase2;
for(var k in TestCase2.prototype ) bpmjs.TestFrontMessenger.prototype[k] = TestCase2.prototype[k];
bpmjs.TestFrontMessenger.receiveCount = null;
bpmjs.TestFrontMessenger.prototype.setup = function() {
	bpmjs.TestFrontMessenger.receiveCount = 0;
}
bpmjs.TestFrontMessenger.prototype.testWithMessage2 = function() {
	var sendingObject = new bpmjs._TestFrontMessenger.CustomSendingObject();
	var receivingObject = new bpmjs._TestFrontMessenger.CustomReceivingObject();
	var frontMessenger = new bpmjs.DefaultFrontMessenger();
	frontMessenger.addMessenger(sendingObject);
	frontMessenger.addReceiver(receivingObject,"handleComplete",bpmjs._TestFrontMessenger.Message2);
	sendingObject.doSend();
	this.assertEquals(1,bpmjs.TestFrontMessenger.receiveCount,{ fileName : "TestFrontMessenger.hx", lineNumber : 25, className : "bpmjs.TestFrontMessenger", methodName : "testWithMessage2"});
}
bpmjs.TestFrontMessenger.prototype.testNoSendWithMessage2 = function() {
	var sendingObject = new bpmjs._TestFrontMessenger.SendingObject();
	var receivingObject = new bpmjs._TestFrontMessenger.CustomReceivingObject();
	var frontMessenger = new bpmjs.DefaultFrontMessenger();
	frontMessenger.addMessenger(sendingObject);
	frontMessenger.addReceiver(receivingObject,"handleComplete",bpmjs._TestFrontMessenger.Message2);
	sendingObject.doSend();
	this.assertEquals(0,bpmjs.TestFrontMessenger.receiveCount,{ fileName : "TestFrontMessenger.hx", lineNumber : 39, className : "bpmjs.TestFrontMessenger", methodName : "testNoSendWithMessage2"});
}
bpmjs.TestFrontMessenger.prototype.__class__ = bpmjs.TestFrontMessenger;
bpmjs.Messenger = function(p) { if( p === $_ ) return; {
	this.receivers = new Array();
}}
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
if(!bpmjs._TestFrontMessenger) bpmjs._TestFrontMessenger = {}
bpmjs._TestFrontMessenger.SendingObject = function(p) { if( p === $_ ) return; {
	bpmjs.Messenger.call(this);
}}
bpmjs._TestFrontMessenger.SendingObject.__name__ = ["bpmjs","_TestFrontMessenger","SendingObject"];
bpmjs._TestFrontMessenger.SendingObject.__super__ = bpmjs.Messenger;
for(var k in bpmjs.Messenger.prototype ) bpmjs._TestFrontMessenger.SendingObject.prototype[k] = bpmjs.Messenger.prototype[k];
bpmjs._TestFrontMessenger.SendingObject.prototype.doSend = function() {
	this.send(new bpmjs._TestFrontMessenger.Message1());
}
bpmjs._TestFrontMessenger.SendingObject.prototype.__class__ = bpmjs._TestFrontMessenger.SendingObject;
bpmjs._TestFrontMessenger.CustomSendingObject = function(p) { if( p === $_ ) return; {
	bpmjs.Messenger.call(this);
}}
bpmjs._TestFrontMessenger.CustomSendingObject.__name__ = ["bpmjs","_TestFrontMessenger","CustomSendingObject"];
bpmjs._TestFrontMessenger.CustomSendingObject.__super__ = bpmjs.Messenger;
for(var k in bpmjs.Messenger.prototype ) bpmjs._TestFrontMessenger.CustomSendingObject.prototype[k] = bpmjs.Messenger.prototype[k];
bpmjs._TestFrontMessenger.CustomSendingObject.prototype.doSend = function() {
	this.send(new bpmjs._TestFrontMessenger.Message2());
}
bpmjs._TestFrontMessenger.CustomSendingObject.prototype.__class__ = bpmjs._TestFrontMessenger.CustomSendingObject;
bpmjs._TestFrontMessenger.CustomReceivingObject = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestFrontMessenger.CustomReceivingObject.__name__ = ["bpmjs","_TestFrontMessenger","CustomReceivingObject"];
bpmjs._TestFrontMessenger.CustomReceivingObject.prototype.handleComplete = function(message) {
	bpmjs.TestFrontMessenger.receiveCount++;
}
bpmjs._TestFrontMessenger.CustomReceivingObject.prototype.__class__ = bpmjs._TestFrontMessenger.CustomReceivingObject;
bpmjs._TestFrontMessenger.Message1 = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestFrontMessenger.Message1.__name__ = ["bpmjs","_TestFrontMessenger","Message1"];
bpmjs._TestFrontMessenger.Message1.prototype.__class__ = bpmjs._TestFrontMessenger.Message1;
bpmjs._TestFrontMessenger.Message2 = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestFrontMessenger.Message2.__name__ = ["bpmjs","_TestFrontMessenger","Message2"];
bpmjs._TestFrontMessenger.Message2.prototype.__class__ = bpmjs._TestFrontMessenger.Message2;
IntIter = function(min,max) { if( min === $_ ) return; {
	this.min = min;
	this.max = max;
}}
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
bpmjs.TestInject = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
bpmjs.TestInject.__name__ = ["bpmjs","TestInject"];
bpmjs.TestInject.__super__ = TestCase2;
for(var k in TestCase2.prototype ) bpmjs.TestInject.prototype[k] = TestCase2.prototype[k];
bpmjs.TestInject.prototype.testInject = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestInject.TestConfig);
	var a = context.getObjectByName("a");
	this.assertTrue(Std["is"](a.b,bpmjs._TestInject.B),{ fileName : "TestInject.hx", lineNumber : 10, className : "bpmjs.TestInject", methodName : "testInject"});
}
bpmjs.TestInject.prototype.testInjectContext = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestInject.TestConfig);
	var a = context.getObjectByName("a");
	this.assertEquals(context,a.context,{ fileName : "TestInject.hx", lineNumber : 18, className : "bpmjs.TestInject", methodName : "testInjectContext"});
}
bpmjs.TestInject.prototype.testCircularInject = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestInject.TestConfig);
	var a = context.getObjectByName("a");
	this.assertTrue(Std["is"](a.b,bpmjs._TestInject.B),{ fileName : "TestInject.hx", lineNumber : 26, className : "bpmjs.TestInject", methodName : "testCircularInject"});
	var b = context.getObjectByName("b");
	this.assertTrue(Std["is"](b.a,bpmjs._TestInject.A),{ fileName : "TestInject.hx", lineNumber : 29, className : "bpmjs.TestInject", methodName : "testCircularInject"});
}
bpmjs.TestInject.prototype.testSuperInject = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestInject.TestConfig);
	var c = context.getObjectByName("c");
	this.assertTrue(Std["is"](c.a,bpmjs._TestInject.A),{ fileName : "TestInject.hx", lineNumber : 37, className : "bpmjs.TestInject", methodName : "testSuperInject"});
}
bpmjs.TestInject.prototype.__class__ = bpmjs.TestInject;
if(!bpmjs._TestInject) bpmjs._TestInject = {}
bpmjs._TestInject.TestConfig = function(p) { if( p === $_ ) return; {
	this.a = new bpmjs._TestInject.A();
	this.b = new bpmjs._TestInject.B();
	this.c = new bpmjs._TestInject.C();
}}
bpmjs._TestInject.TestConfig.__name__ = ["bpmjs","_TestInject","TestConfig"];
bpmjs._TestInject.TestConfig.prototype.a = null;
bpmjs._TestInject.TestConfig.prototype.b = null;
bpmjs._TestInject.TestConfig.prototype.c = null;
bpmjs._TestInject.TestConfig.prototype.__class__ = bpmjs._TestInject.TestConfig;
bpmjs._TestInject.TestConfig.__interfaces__ = [haxe.rtti.Infos];
bpmjs._TestInject.A = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestInject.A.__name__ = ["bpmjs","_TestInject","A"];
bpmjs._TestInject.A.prototype.b = null;
bpmjs._TestInject.A.prototype.context = null;
bpmjs._TestInject.A.prototype.__class__ = bpmjs._TestInject.A;
bpmjs._TestInject.A.__interfaces__ = [haxe.rtti.Infos];
bpmjs._TestInject.B = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestInject.B.__name__ = ["bpmjs","_TestInject","B"];
bpmjs._TestInject.B.prototype.a = null;
bpmjs._TestInject.B.prototype.__class__ = bpmjs._TestInject.B;
bpmjs._TestInject.B.__interfaces__ = [haxe.rtti.Infos];
bpmjs._TestInject.C = function(p) { if( p === $_ ) return; {
	bpmjs._TestInject.B.call(this);
}}
bpmjs._TestInject.C.__name__ = ["bpmjs","_TestInject","C"];
bpmjs._TestInject.C.__super__ = bpmjs._TestInject.B;
for(var k in bpmjs._TestInject.B.prototype ) bpmjs._TestInject.C.prototype[k] = bpmjs._TestInject.B.prototype[k];
bpmjs._TestInject.C.prototype.__class__ = bpmjs._TestInject.C;
bpmjs._TestInject.C.__interfaces__ = [haxe.rtti.Infos];
if(!haxe.xml) haxe.xml = {}
if(!haxe.xml._Fast) haxe.xml._Fast = {}
haxe.xml._Fast.NodeAccess = function(x) { if( x === $_ ) return; {
	this.__x = x;
}}
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
haxe.xml._Fast.AttribAccess = function(x) { if( x === $_ ) return; {
	this.__x = x;
}}
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype.__x = null;
haxe.xml._Fast.AttribAccess.prototype.resolve = function(name) {
	if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
	var v = this.__x.get(name);
	if(v == null) throw this.__x.getNodeName() + " is missing attribute " + name;
	return v;
}
haxe.xml._Fast.AttribAccess.prototype.__class__ = haxe.xml._Fast.AttribAccess;
haxe.xml._Fast.HasAttribAccess = function(x) { if( x === $_ ) return; {
	this.__x = x;
}}
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype.__x = null;
haxe.xml._Fast.HasAttribAccess.prototype.resolve = function(name) {
	if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
	return this.__x.exists(name);
}
haxe.xml._Fast.HasAttribAccess.prototype.__class__ = haxe.xml._Fast.HasAttribAccess;
haxe.xml._Fast.HasNodeAccess = function(x) { if( x === $_ ) return; {
	this.__x = x;
}}
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype.__x = null;
haxe.xml._Fast.HasNodeAccess.prototype.resolve = function(name) {
	return this.__x.elementsNamed(name).hasNext();
}
haxe.xml._Fast.HasNodeAccess.prototype.__class__ = haxe.xml._Fast.HasNodeAccess;
haxe.xml._Fast.NodeListAccess = function(x) { if( x === $_ ) return; {
	this.__x = x;
}}
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype.__x = null;
haxe.xml._Fast.NodeListAccess.prototype.resolve = function(name) {
	var l = new List();
	{ var $it0 = this.__x.elementsNamed(name);
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(new haxe.xml.Fast(x));
	}}
	return l;
}
haxe.xml._Fast.NodeListAccess.prototype.__class__ = haxe.xml._Fast.NodeListAccess;
haxe.xml.Fast = function(x) { if( x === $_ ) return; {
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + x.nodeType;
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
}}
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
	{ var $it0 = this.x.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	s.b[s.b.length] = x.toString();
	}}
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
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				cl = null;
			}
		}
	}
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e;
	try {
		e = eval(name);
	}
	catch( $e0 ) {
		{
			var err = $e0;
			{
				e = null;
			}
		}
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
	var c = Type.getEnumConstructs(e)[index];
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
	return e.__constructs__;
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":{
		return ValueType.TBool;
	}break;
	case "string":{
		return ValueType.TClass(String);
	}break;
	case "number":{
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	}break;
	case "object":{
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	}break;
	case "function":{
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	}break;
	case "undefined":{
		return ValueType.TNull;
	}break;
	default:{
		return ValueType.TUnknown;
	}break;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		{
			var _g1 = 2, _g = a.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(!Type.enumEq(a[i],b[i])) return false;
			}
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				return false;
			}
		}
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
EReg = function(r,opt) { if( r === $_ ) return; {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}}
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
		buf.b[buf.b.length] = this.matchedLeft();
		buf.b[buf.b.length] = f(this);
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s;
	return buf.b.join("");
}
EReg.prototype.__class__ = EReg;
Xml = function(p) { if( p === $_ ) return; {
	null;
}}
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
					case 0:{
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
					}break;
					case 1:{
						var x = Xml.createPCData(r.matched(0));
						current.addChild(x);
						str = r.matchedRight();
					}break;
					case 2:{
						if(current._children != null && current._children.length == 0) {
							var e = Xml.createPCData("");
							current.addChild(e);
						}
						else null;
						if(r.matched(1) != current._nodeName || stack.isEmpty()) {
							i = nrules;
							throw "__break__";
						}
						else null;
						current = stack.pop();
						str = r.matchedRight();
					}break;
					case 3:{
						str = r.matchedRight();
						if(!Xml.ecdata_end.match(str)) throw "End of CDATA section not found";
						var x = Xml.createCData(Xml.ecdata_end.matchedLeft());
						current.addChild(x);
						str = Xml.ecdata_end.matchedRight();
					}break;
					case 4:{
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
								case "[":{
									count++;
								}break;
								case "]":{
									count--;
									if(count < 0) throw "Invalid ] found in DOCTYPE declaration";
								}break;
								default:{
									if(count == 0) throw "__break__";
								}break;
								}
							}
						} catch( e ) { if( e != "__break__" ) throw e; }
						var x = Xml.createDocType(old.substr(10,pos - 11));
						current.addChild(x);
					}break;
					case 5:{
						if(!Xml.ecomment_end.match(str)) throw "Unclosed Comment";
						var p = Xml.ecomment_end.matchedPos();
						var x = Xml.createComment(str.substr(4,p.pos + p.len - 7));
						current.addChild(x);
						str = Xml.ecomment_end.matchedRight();
					}break;
					case 6:{
						var prolog = r.matched(0);
						var x = Xml.createProlog(prolog.substr(2,prolog.length - 4));
						current.addChild(x);
						str = r.matchedRight();
					}break;
					}
					throw "__break__";
				}
				i += 1;
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(i == nrules) {
			if(str.length > 10) throw "Xml parse error : Unexpected " + str.substr(0,10) + "...";
			else throw "Xml parse error : Unexpected " + str;
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
		s.b[s.b.length] = "<";
		s.b[s.b.length] = this._nodeName;
		{ var $it0 = this._attributes.keys();
		while( $it0.hasNext() ) { var k = $it0.next();
		{
			s.b[s.b.length] = " ";
			s.b[s.b.length] = k;
			s.b[s.b.length] = "=\"";
			s.b[s.b.length] = this._attributes.get(k);
			s.b[s.b.length] = "\"";
		}
		}}
		if(this._children.length == 0) {
			s.b[s.b.length] = "/>";
			return s.b.join("");
		}
		s.b[s.b.length] = ">";
	}
	{ var $it1 = this.iterator();
	while( $it1.hasNext() ) { var x = $it1.next();
	s.b[s.b.length] = x.toString();
	}}
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "</";
		s.b[s.b.length] = this._nodeName;
		s.b[s.b.length] = ">";
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
	if(d == null) alert("No haxe:trace element defined\n" + msg);
	else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
	else null;
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	}
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
	case "object":{
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				{
					var _g1 = 2, _g = o.length;
					while(_g1 < _g) {
						var i = _g1++;
						if(i != 2) str += "," + js.Boot.__string_rec(o[i],s);
						else str += js.Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			{
				var _g = 0;
				while(_g < l) {
					var i1 = _g++;
					str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
				}
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					return "???";
				}
			}
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
		if(hasp && !o.hasOwnProperty(k)) continue;
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") continue;
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	}break;
	case "function":{
		return "<function>";
	}break;
	case "string":{
		return o;
	}break;
	default:{
		return String(o);
	}break;
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
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				if(cl == null) return false;
			}
		}
	}
	switch(cl) {
	case Int:{
		return Math.ceil(o%2147483648.0) === o;
	}break;
	case Float:{
		return typeof(o) == "number";
	}break;
	case Bool:{
		return o === true || o === false;
	}break;
	case String:{
		return typeof(o) == "string";
	}break;
	case Dynamic:{
		return true;
	}break;
	default:{
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}break;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	}
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
	}
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	}
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	}
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		}
		else if(len < 0) {
			len = this.length + len - pos;
		}
		return oldsub.apply(this,[pos,len]);
	}
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
bpmjs.TestObserve = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
bpmjs.TestObserve.__name__ = ["bpmjs","TestObserve"];
bpmjs.TestObserve.__super__ = TestCase2;
for(var k in TestCase2.prototype ) bpmjs.TestObserve.prototype[k] = TestCase2.prototype[k];
bpmjs.TestObserve.prototype.testObserve = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestObserve.TestConfigWithAAndB);
	var b = context.getObjectByName("b");
	this.assertEquals(1,b.observeCalledCount,{ fileName : "TestObserve.hx", lineNumber : 10, className : "bpmjs.TestObserve", methodName : "testObserve"});
}
bpmjs.TestObserve.prototype.__class__ = bpmjs.TestObserve;
if(!bpmjs._TestObserve) bpmjs._TestObserve = {}
bpmjs._TestObserve.TestConfigWithAAndB = function(p) { if( p === $_ ) return; {
	this.a = new bpmjs._TestObserve.A();
	this.b = new bpmjs._TestObserve.B();
}}
bpmjs._TestObserve.TestConfigWithAAndB.__name__ = ["bpmjs","_TestObserve","TestConfigWithAAndB"];
bpmjs._TestObserve.TestConfigWithAAndB.prototype.a = null;
bpmjs._TestObserve.TestConfigWithAAndB.prototype.b = null;
bpmjs._TestObserve.TestConfigWithAAndB.prototype.__class__ = bpmjs._TestObserve.TestConfigWithAAndB;
bpmjs._TestObserve.TestConfigWithAAndB.__interfaces__ = [haxe.rtti.Infos];
bpmjs._TestObserve.A = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestObserve.A.__name__ = ["bpmjs","_TestObserve","A"];
bpmjs._TestObserve.A.prototype.__class__ = bpmjs._TestObserve.A;
bpmjs._TestObserve.A.__interfaces__ = [haxe.rtti.Infos];
bpmjs._TestObserve.B = function(p) { if( p === $_ ) return; {
	this.observeCalledCount = 0;
}}
bpmjs._TestObserve.B.__name__ = ["bpmjs","_TestObserve","B"];
bpmjs._TestObserve.B.prototype.observeCalledCount = null;
bpmjs._TestObserve.B.prototype.observe = function(a) {
	this.observeCalledCount++;
}
bpmjs._TestObserve.B.prototype.__class__ = bpmjs._TestObserve.B;
bpmjs._TestObserve.B.__interfaces__ = [haxe.rtti.Infos];
bpmjs.integration.TestMessaging = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
bpmjs.integration.TestMessaging.__name__ = ["bpmjs","integration","TestMessaging"];
bpmjs.integration.TestMessaging.__super__ = TestCase2;
for(var k in TestCase2.prototype ) bpmjs.integration.TestMessaging.prototype[k] = TestCase2.prototype[k];
bpmjs.integration.TestMessaging.messageReceivedCount = null;
bpmjs.integration.TestMessaging.prototype.setup = function() {
	bpmjs.integration.TestMessaging.messageReceivedCount = 0;
}
bpmjs.integration.TestMessaging.prototype.testDefaultFrontController = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs.integration._TestMessaging.Config);
	this.assertNotNull(context.contextConfig.frontMessenger,{ fileName : "TestMessaging.hx", lineNumber : 19, className : "bpmjs.integration.TestMessaging", methodName : "testDefaultFrontController"});
	var frontControllerClass = Type.getClass(context.contextConfig.frontMessenger);
	this.assertEquals(bpmjs.DefaultFrontMessenger,frontControllerClass,{ fileName : "TestMessaging.hx", lineNumber : 22, className : "bpmjs.integration.TestMessaging", methodName : "testDefaultFrontController"});
}
bpmjs.integration.TestMessaging.prototype.testCustomFrontController = function() {
	var customContextConfig = new bpmjs.ContextConfig();
	customContextConfig.frontMessenger = new bpmjs.integration._TestMessaging.MockFrontMessenger();
	var context = bpmjs.ContextBuilder.build(bpmjs.integration._TestMessaging.Config,customContextConfig);
	this.assertNotNull(context.contextConfig.frontMessenger,{ fileName : "TestMessaging.hx", lineNumber : 31, className : "bpmjs.integration.TestMessaging", methodName : "testCustomFrontController"});
	var frontControllerClass = Type.getClass(context.contextConfig.frontMessenger);
	this.assertEquals(bpmjs.integration._TestMessaging.MockFrontMessenger,frontControllerClass,{ fileName : "TestMessaging.hx", lineNumber : 34, className : "bpmjs.integration.TestMessaging", methodName : "testCustomFrontController"});
}
bpmjs.integration.TestMessaging.prototype.testMessengerAdded = function() {
	var mockFrontMessenger = new bpmjs.integration._TestMessaging.MockFrontMessenger();
	var customContextConfig = new bpmjs.ContextConfig();
	customContextConfig.frontMessenger = mockFrontMessenger;
	var context = bpmjs.ContextBuilder.build(bpmjs.integration._TestMessaging.Config,customContextConfig);
	this.assertEquals(1,mockFrontMessenger.addMessengerCount,{ fileName : "TestMessaging.hx", lineNumber : 46, className : "bpmjs.integration.TestMessaging", methodName : "testMessengerAdded"});
	this.assertEquals(context.getObjectByType(bpmjs.integration._TestMessaging.A),mockFrontMessenger.lastMessenger,{ fileName : "TestMessaging.hx", lineNumber : 47, className : "bpmjs.integration.TestMessaging", methodName : "testMessengerAdded"});
}
bpmjs.integration.TestMessaging.prototype.testReceiverAdded = function() {
	var mockFrontMessenger = new bpmjs.integration._TestMessaging.MockFrontMessenger();
	var customContextConfig = new bpmjs.ContextConfig();
	customContextConfig.frontMessenger = mockFrontMessenger;
	var context = bpmjs.ContextBuilder.build(bpmjs.integration._TestMessaging.Config,customContextConfig);
	this.assertEquals(1,mockFrontMessenger.addReceiverCount,{ fileName : "TestMessaging.hx", lineNumber : 59, className : "bpmjs.integration.TestMessaging", methodName : "testReceiverAdded"});
	this.assertEquals(context.getObjectByType(bpmjs.integration._TestMessaging.B),mockFrontMessenger.lastReceivingObject,{ fileName : "TestMessaging.hx", lineNumber : 60, className : "bpmjs.integration.TestMessaging", methodName : "testReceiverAdded"});
	this.assertEquals("handleStart",mockFrontMessenger.lastMethodName,{ fileName : "TestMessaging.hx", lineNumber : 61, className : "bpmjs.integration.TestMessaging", methodName : "testReceiverAdded"});
	this.assertEquals(bpmjs.integration.Message,mockFrontMessenger.lastMessageClass,{ fileName : "TestMessaging.hx", lineNumber : 62, className : "bpmjs.integration.TestMessaging", methodName : "testReceiverAdded"});
}
bpmjs.integration.TestMessaging.prototype.testMessageReceived = function() {
	bpmjs.ContextBuilder.build(bpmjs.integration._TestMessaging.Config);
	this.assertEquals(1,bpmjs.integration.TestMessaging.messageReceivedCount,{ fileName : "TestMessaging.hx", lineNumber : 68, className : "bpmjs.integration.TestMessaging", methodName : "testMessageReceived"});
}
bpmjs.integration.TestMessaging.prototype.testMessageReceivedWithMessenger = function() {
	bpmjs.ContextBuilder.build(bpmjs.integration._TestMessaging.ConfigWithMessenger);
	this.assertEquals(1,bpmjs.integration.TestMessaging.messageReceivedCount,{ fileName : "TestMessaging.hx", lineNumber : 74, className : "bpmjs.integration.TestMessaging", methodName : "testMessageReceivedWithMessenger"});
}
bpmjs.integration.TestMessaging.prototype.__class__ = bpmjs.integration.TestMessaging;
if(!bpmjs.integration._TestMessaging) bpmjs.integration._TestMessaging = {}
bpmjs.integration._TestMessaging.MockFrontMessenger = function(p) { if( p === $_ ) return; {
	this.addMessengerCount = 0;
	this.addReceiverCount = 0;
}}
bpmjs.integration._TestMessaging.MockFrontMessenger.__name__ = ["bpmjs","integration","_TestMessaging","MockFrontMessenger"];
bpmjs.integration._TestMessaging.MockFrontMessenger.prototype.addMessengerCount = null;
bpmjs.integration._TestMessaging.MockFrontMessenger.prototype.lastMessenger = null;
bpmjs.integration._TestMessaging.MockFrontMessenger.prototype.addReceiverCount = null;
bpmjs.integration._TestMessaging.MockFrontMessenger.prototype.lastReceivingObject = null;
bpmjs.integration._TestMessaging.MockFrontMessenger.prototype.lastMethodName = null;
bpmjs.integration._TestMessaging.MockFrontMessenger.prototype.lastMessageClass = null;
bpmjs.integration._TestMessaging.MockFrontMessenger.prototype.addMessenger = function(messenger) {
	this.addMessengerCount++;
	this.lastMessenger = messenger;
}
bpmjs.integration._TestMessaging.MockFrontMessenger.prototype.addReceiver = function(receivingObject,methodName,messageClass) {
	this.addReceiverCount++;
	this.lastReceivingObject = receivingObject;
	this.lastMethodName = methodName;
	this.lastMessageClass = messageClass;
}
bpmjs.integration._TestMessaging.MockFrontMessenger.prototype.__class__ = bpmjs.integration._TestMessaging.MockFrontMessenger;
bpmjs.integration._TestMessaging.MockFrontMessenger.__interfaces__ = [bpmjs.FrontMessenger];
bpmjs.integration._TestMessaging.Config = function(p) { if( p === $_ ) return; {
	this.a = new bpmjs.integration._TestMessaging.A();
	this.b = new bpmjs.integration._TestMessaging.B();
}}
bpmjs.integration._TestMessaging.Config.__name__ = ["bpmjs","integration","_TestMessaging","Config"];
bpmjs.integration._TestMessaging.Config.prototype.a = null;
bpmjs.integration._TestMessaging.Config.prototype.b = null;
bpmjs.integration._TestMessaging.Config.prototype.__class__ = bpmjs.integration._TestMessaging.Config;
bpmjs.integration._TestMessaging.Config.__interfaces__ = [haxe.rtti.Infos];
bpmjs.integration._TestMessaging.ConfigWithMessenger = function(p) { if( p === $_ ) return; {
	this.a = new bpmjs.integration._TestMessaging.AWithMessenger();
	this.b = new bpmjs.integration._TestMessaging.B();
}}
bpmjs.integration._TestMessaging.ConfigWithMessenger.__name__ = ["bpmjs","integration","_TestMessaging","ConfigWithMessenger"];
bpmjs.integration._TestMessaging.ConfigWithMessenger.prototype.a = null;
bpmjs.integration._TestMessaging.ConfigWithMessenger.prototype.b = null;
bpmjs.integration._TestMessaging.ConfigWithMessenger.prototype.__class__ = bpmjs.integration._TestMessaging.ConfigWithMessenger;
bpmjs.integration._TestMessaging.ConfigWithMessenger.__interfaces__ = [haxe.rtti.Infos];
bpmjs.integration._TestMessaging.A = function(p) { if( p === $_ ) return; {
	bpmjs.Messenger.call(this);
}}
bpmjs.integration._TestMessaging.A.__name__ = ["bpmjs","integration","_TestMessaging","A"];
bpmjs.integration._TestMessaging.A.__super__ = bpmjs.Messenger;
for(var k in bpmjs.Messenger.prototype ) bpmjs.integration._TestMessaging.A.prototype[k] = bpmjs.Messenger.prototype[k];
bpmjs.integration._TestMessaging.A.prototype.handleComplete = function() {
	this.send(new bpmjs.integration.Message());
}
bpmjs.integration._TestMessaging.A.prototype.__class__ = bpmjs.integration._TestMessaging.A;
bpmjs.integration._TestMessaging.AWithMessenger = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs.integration._TestMessaging.AWithMessenger.__name__ = ["bpmjs","integration","_TestMessaging","AWithMessenger"];
bpmjs.integration._TestMessaging.AWithMessenger.prototype.messenger = null;
bpmjs.integration._TestMessaging.AWithMessenger.prototype.handleComplete = function() {
	this.messenger.send(new bpmjs.integration.Message());
}
bpmjs.integration._TestMessaging.AWithMessenger.prototype.__class__ = bpmjs.integration._TestMessaging.AWithMessenger;
bpmjs.integration._TestMessaging.AWithMessenger.__interfaces__ = [haxe.rtti.Infos];
bpmjs.integration._TestMessaging.B = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs.integration._TestMessaging.B.__name__ = ["bpmjs","integration","_TestMessaging","B"];
bpmjs.integration._TestMessaging.B.prototype.handleStart = function(message) {
	bpmjs.integration.TestMessaging.messageReceivedCount++;
}
bpmjs.integration._TestMessaging.B.prototype.__class__ = bpmjs.integration._TestMessaging.B;
bpmjs.integration._TestMessaging.B.__interfaces__ = [haxe.rtti.Infos];
bpmjs.integration.Message = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs.integration.Message.__name__ = ["bpmjs","integration","Message"];
bpmjs.integration.Message.prototype.__class__ = bpmjs.integration.Message;
Hash = function(p) { if( p === $_ ) return; {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
}}
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
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				
				for(var i in this.h)
					if( i == key ) return true;
			;
				return false;
			}
		}
	}
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.keys = function() {
	var a = new Array();
	
			for(var i in this.h)
				a.push(i.substr(1));
		;
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
	s.b[s.b.length] = "{";
	var it = this.keys();
	{ var $it0 = it;
	while( $it0.hasNext() ) { var i = $it0.next();
	{
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	}}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
reflect.ClassInfo = function(name,type) { if( name === $_ ) return; {
	this.name = name;
	this.type = type;
	this.hasRtti = type.__rtti != null;
}}
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
	if(type == null) throw "Cannot resolve type for name: " + name;
	return reflect.ClassInfo.getClassInfo(name,type);
}
reflect.ClassInfo.forCType = function(t) {
	if(t == null) throw "Missing CType";
	var $e = t;
	switch( $e[1] ) {
	case 4:
	var ret = $e[3], args = $e[2];
	{
		return reflect.ClassInfo.forCType(ret);
	}break;
	case 2:
	var params = $e[3], name = $e[2];
	{
		return reflect.ClassInfo.forName(name);
	}break;
	default:{
		null;
	}break;
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
reflect.ClassInfo.prototype.hasRtti = null;
reflect.ClassInfo.prototype.properties = null;
reflect.ClassInfo.prototype.methods = null;
reflect.ClassInfo.prototype.getProperty = function(name) {
	{
		var _g = 0, _g1 = this.getProperties();
		while(_g < _g1.length) {
			var property = _g1[_g];
			++_g;
			if(property.field.name == name) return property;
		}
	}
	return null;
}
reflect.ClassInfo.prototype.getMethod = function(name) {
	{
		var _g = 0, _g1 = this.getMethods();
		while(_g < _g1.length) {
			var method = _g1[_g];
			++_g;
			if(method.field.name == name) return method;
		}
	}
	return null;
}
reflect.ClassInfo.prototype.toString = function() {
	return "[ClassInfo for class: " + this.name + "]";
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
	var $e = infos;
	switch( $e[1] ) {
	case 1:
	var c = $e[2];
	{
		classDef = c;
	}break;
	default:{
		throw Type.getClassName(type) + " needs to be a class!";
	}break;
	}
	this.scanFields(classDef);
	if(classDef.superClass != null) {
		this.scanClass(Type.resolveClass(classDef.superClass.path));
	}
}
reflect.ClassInfo.prototype.scanFields = function(classDef) {
	{ var $it0 = classDef.fields.iterator();
	while( $it0.hasNext() ) { var field = $it0.next();
	{
		var $e = field.type;
		switch( $e[1] ) {
		case 4:
		var ret = $e[3], args = $e[2];
		{
			this.getMethods().push(new reflect.Method(field,args,ret,classDef.path,this));
		}break;
		case 2:
		var params = $e[3], name = $e[2];
		{
			this.getProperties().push(new reflect.Property(field,classDef.path,this));
		}break;
		case 1:
		var params = $e[3], name = $e[2];
		{
			this.getProperties().push(new reflect.Property(field,classDef.path,this));
		}break;
		default:{
			{
				Log.posInfo = { fileName : "ClassInfo.hx", lineNumber : 179, className : "reflect.ClassInfo", methodName : "scanFields"};
				if(Log.filter(LogLevel.WARN)) {
					Log.fetchInput("Unknown type:",Reflect.field(field,"type"),"in type:",Reflect.field(classDef,"path"),"found in:" + this.name,null,null);
					console.warn(Log.createMessage());
				}
			}
		}break;
		}
	}
	}}
}
reflect.ClassInfo.prototype.__class__ = reflect.ClassInfo;
kumite.scene.TransitionContext = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.scene.TransitionContext.__name__ = ["kumite","scene","TransitionContext"];
kumite.scene.TransitionContext.prototype.transition = null;
kumite.scene.TransitionContext.prototype.toOutTransition = function() {
	var result = new kumite.scene.TransitionContext();
	result.transition = 1 - this.transition;
	return result;
}
kumite.scene.TransitionContext.prototype.__class__ = kumite.scene.TransitionContext;
kumite.scene.TestLayerOrder = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
kumite.scene.TestLayerOrder.__name__ = ["kumite","scene","TestLayerOrder"];
kumite.scene.TestLayerOrder.__super__ = TestCase2;
for(var k in TestCase2.prototype ) kumite.scene.TestLayerOrder.prototype[k] = TestCase2.prototype[k];
kumite.scene.TestLayerOrder.prototype.testNoChange = function() {
	this.assertOrder("a","a","a");
}
kumite.scene.TestLayerOrder.prototype.testSingleChange = function() {
	this.assertOrder("a","b","ab");
}
kumite.scene.TestLayerOrder.prototype.testMultiChange = function() {
	this.assertOrder("ab","cd","abcd");
}
kumite.scene.TestLayerOrder.prototype.testInsert = function() {
	this.assertOrder("ab","ac","abc");
}
kumite.scene.TestLayerOrder.prototype.testSwap = function() {
	this.assertOrder("ab","ba","ba");
}
kumite.scene.TestLayerOrder.prototype.testForceNewOrder = function() {
	this.assertOrder("ab","ca","cab");
}
kumite.scene.TestLayerOrder.prototype.testComplex1 = function() {
	this.assertOrder("abc","0a1b","0a1bc");
}
kumite.scene.TestLayerOrder.prototype.testComplex2 = function() {
	this.assertOrder("abc","0a1","0abc1");
}
kumite.scene.TestLayerOrder.prototype.testComplex3 = function() {
	this.assertOrder("ab","0xa1e","0xab1e");
}
kumite.scene.TestLayerOrder.prototype.testComplex4 = function() {
	this.assertOrder("abce","afcdk","abfcedk");
}
kumite.scene.TestLayerOrder.prototype.assertOrder = function(fromIds,toIds,expectedIds) {
	var fromScene = this.createScene(fromIds);
	var toScene = this.createScene(toIds);
	var mixer = new kumite.scene.SceneMixer();
	var result = mixer.mix(fromScene,toScene);
	this.assertEquals(expectedIds,this.createIds(result),{ fileName : "TestLayerOrder.hx", lineNumber : 64, className : "kumite.scene.TestLayerOrder", methodName : "assertOrder"});
}
kumite.scene.TestLayerOrder.prototype.createScene = function(ids) {
	var scene = new kumite.scene.Scene();
	var idList = ids.split("");
	{
		var _g = 0;
		while(_g < idList.length) {
			var id = idList[_g];
			++_g;
			var layer = new kumite.scene.Layer();
			layer.id = id;
			scene.addLayer(layer);
		}
	}
	return scene;
}
kumite.scene.TestLayerOrder.prototype.createIds = function(scene) {
	var result = "";
	{
		var _g = 0, _g1 = scene.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			result += layer.id;
		}
	}
	return result;
}
kumite.scene.TestLayerOrder.prototype.__class__ = kumite.scene.TestLayerOrder;
bpmjs.TestSequencer = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
bpmjs.TestSequencer.__name__ = ["bpmjs","TestSequencer"];
bpmjs.TestSequencer.__super__ = TestCase2;
for(var k in TestCase2.prototype ) bpmjs.TestSequencer.prototype[k] = TestCase2.prototype[k];
bpmjs.TestSequencer.initPrepareCount = null;
bpmjs.TestSequencer.initCount = null;
bpmjs.TestSequencer.prototype.setup = function() {
	bpmjs.TestSequencer.initPrepareCount = 0;
	bpmjs.TestSequencer.initCount = 0;
}
bpmjs.TestSequencer.prototype.testInitPrepare = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestSequencer.TestConfig);
	this.assertEquals(1,bpmjs.TestSequencer.initPrepareCount,{ fileName : "TestSequencer.hx", lineNumber : 17, className : "bpmjs.TestSequencer", methodName : "testInitPrepare"});
}
bpmjs.TestSequencer.prototype.testInit = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestSequencer.TestConfig);
	this.assertEquals(1,bpmjs.TestSequencer.initCount,{ fileName : "TestSequencer.hx", lineNumber : 23, className : "bpmjs.TestSequencer", methodName : "testInit"});
}
bpmjs.TestSequencer.prototype.__class__ = bpmjs.TestSequencer;
if(!bpmjs._TestSequencer) bpmjs._TestSequencer = {}
bpmjs._TestSequencer.TestConfig = function(p) { if( p === $_ ) return; {
	this.launcher = new bpmjs._TestSequencer.Launcher();
	this.sequencer = new bpmjs.Sequencer();
	this.s1 = new bpmjs._TestSequencer.S1();
}}
bpmjs._TestSequencer.TestConfig.__name__ = ["bpmjs","_TestSequencer","TestConfig"];
bpmjs._TestSequencer.TestConfig.prototype.launcher = null;
bpmjs._TestSequencer.TestConfig.prototype.sequencer = null;
bpmjs._TestSequencer.TestConfig.prototype.s1 = null;
bpmjs._TestSequencer.TestConfig.prototype.__class__ = bpmjs._TestSequencer.TestConfig;
bpmjs._TestSequencer.TestConfig.__interfaces__ = [haxe.rtti.Infos];
bpmjs._TestSequencer.Launcher = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestSequencer.Launcher.__name__ = ["bpmjs","_TestSequencer","Launcher"];
bpmjs._TestSequencer.Launcher.prototype.sequencer = null;
bpmjs._TestSequencer.Launcher.prototype.handleContextPostComplete = function() {
	{
		Log.posInfo = { fileName : "TestSequencer.hx", lineNumber : 53, className : "bpmjs._TestSequencer.Launcher", methodName : "handleContextPostComplete"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(null,null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	this.sequencer.start("boot");
}
bpmjs._TestSequencer.Launcher.prototype.__class__ = bpmjs._TestSequencer.Launcher;
bpmjs._TestSequencer.Launcher.__interfaces__ = [haxe.rtti.Infos];
bpmjs._TestSequencer.S1 = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestSequencer.S1.__name__ = ["bpmjs","_TestSequencer","S1"];
bpmjs._TestSequencer.S1.prototype.initPrepare = function() {
	bpmjs.TestSequencer.initPrepareCount++;
}
bpmjs._TestSequencer.S1.prototype.init = function() {
	bpmjs.TestSequencer.initCount++;
}
bpmjs._TestSequencer.S1.prototype.__class__ = bpmjs._TestSequencer.S1;
bpmjs._TestSequencer.S1.__interfaces__ = [haxe.rtti.Infos];
StringBuf = function(p) { if( p === $_ ) return; {
	this.b = new Array();
}}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x;
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
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var i = $it0.next();
	a.push(i);
	}}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var i = $it0.next();
	l.add(i);
	}}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(f(x));
	}}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(f(i++,x));
	}}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		{ var $it0 = it.iterator();
		while( $it0.hasNext() ) { var x = $it0.next();
		if(x == elt) return true;
		}}
	}
	else {
		{ var $it1 = it.iterator();
		while( $it1.hasNext() ) { var x = $it1.next();
		if(cmp(x,elt)) return true;
		}}
	}
	return false;
}
Lambda.exists = function(it,f) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(f(x)) return true;
	}}
	return false;
}
Lambda.foreach = function(it,f) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(!f(x)) return false;
	}}
	return true;
}
Lambda.iter = function(it,f) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	f(x);
	}}
}
Lambda.filter = function(it,f) {
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(f(x)) l.add(x);
	}}
	return l;
}
Lambda.fold = function(it,f,first) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	first = f(x,first);
	}}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) { var $it0 = it.iterator();
	while( $it0.hasNext() ) { var _ = $it0.next();
	n++;
	}}
	else { var $it1 = it.iterator();
	while( $it1.hasNext() ) { var x = $it1.next();
	if(pred(x)) n++;
	}}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var v2 = $it0.next();
	{
		if(v == v2) return i;
		i++;
	}
	}}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	{ var $it0 = a.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(x);
	}}
	{ var $it1 = b.iterator();
	while( $it1.hasNext() ) { var x = $it1.next();
	l.add(x);
	}}
	return l;
}
Lambda.prototype.__class__ = Lambda;
haxe.rtti.Meta = function() { }
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getType = function(t) {
	var meta = t.__meta__;
	return meta == null?meta:meta.obj;
}
haxe.rtti.Meta.getStatics = function(t) {
	var meta = t.__meta__;
	return meta == null?meta:meta.statics;
}
haxe.rtti.Meta.getFields = function(t) {
	var meta = t.__meta__;
	return meta == null?meta:meta.fields;
}
haxe.rtti.Meta.prototype.__class__ = haxe.rtti.Meta;
if(!bpmjs._Messenger) bpmjs._Messenger = {}
bpmjs._Messenger.ReceiverForType = function(type,method) { if( type === $_ ) return; {
	this.type = type;
	this.method = method;
}}
bpmjs._Messenger.ReceiverForType.__name__ = ["bpmjs","_Messenger","ReceiverForType"];
bpmjs._Messenger.ReceiverForType.prototype.type = null;
bpmjs._Messenger.ReceiverForType.prototype.method = null;
bpmjs._Messenger.ReceiverForType.prototype.__class__ = bpmjs._Messenger.ReceiverForType;
bpmjs.ContextBuilder = function(p) { if( p === $_ ) return; {
	this.context = new bpmjs.Context();
}}
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
	{
		var _g = 0, _g1 = ci.getProperties();
		while(_g < _g1.length) {
			var property = _g1[_g];
			++_g;
			var instance = Reflect.field(config,property.field.name);
			if(instance == null) {
				{
					Log.posInfo = { fileName : "ContextBuilder.hx", lineNumber : 87, className : "bpmjs.ContextBuilder", methodName : "createObjects"};
					if(Log.filter(LogLevel.WARN)) {
						Log.fetchInput("Found property",property.field.name,"in config",ci.name,"but was null",null,null);
						console.warn(Log.createMessage());
					}
				}
			}
			else {
				this.context.addObject(property.field.name,reflect.ClassInfo.forCType(property.field.type),instance);
				if(property.getClass() == Array) {
					var list = instance;
					{
						var _g2 = 0;
						while(_g2 < list.length) {
							var listInstance = list[_g2];
							++_g2;
							this.context.addObject("dynamic",reflect.ClassInfo.forInstance(listInstance),listInstance);
						}
					}
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
	var _g = 0, _g1 = contextObject.classInfo.getProperties();
	while(_g < _g1.length) {
		var property = _g1[_g];
		++_g;
		if(property.hasMetadata("Inject")) {
			var wiredObject = this.context.getObjectByType(property.getClass());
			if(wiredObject == null) {
				Log.posInfo = { fileName : "ContextBuilder.hx", lineNumber : 125, className : "bpmjs.ContextBuilder", methodName : "wireContextObject"};
				if(Log.filter(LogLevel.WARN)) {
					Log.fetchInput("Found [Inject] at object " + Type.getClassName(contextObject.type) + "#" + property.field.name + " but could not find object to inject.",null,null,null,null,null,null);
					console.warn(Log.createMessage());
				}
			}
			else contextObject.object[property.field.name] = wiredObject;
		}
	}
}
bpmjs.ContextBuilder.prototype.findObservers = function(contextObject) {
	var _g = 0, _g1 = contextObject.classInfo.getMethods();
	while(_g < _g1.length) {
		var method = _g1[_g];
		++_g;
		if(method.hasMetadata("Observe")) {
			if(method.getParameters().length == 1) this.context.addObserver(contextObject,method.field.name,reflect.ClassInfo.forCType(method.getParameters()[0].def.t));
			else throw "Method to observe: " + contextObject.classInfo.name + "." + method.field.name + " needs exactly one parameter";
		}
	}
}
bpmjs.ContextBuilder.prototype.registerMessengerByObjectType = function(contextObject) {
	if(Std["is"](contextObject.object,bpmjs.Messenger)) {
		this.contextConfig.frontMessenger.addMessenger(contextObject.object);
	}
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
			if(method.getParameters().length == 1) this.contextConfig.frontMessenger.addReceiver(contextObject.object,method.field.name,reflect.ClassInfo.forCType(method.getParameters()[0].def.t).type);
			else throw "Message: " + contextObject.classInfo.name + "." + method.field.name + " needs exactly one parameter";
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
reflect.MetadataTest = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
reflect.MetadataTest.__name__ = ["reflect","MetadataTest"];
reflect.MetadataTest.__super__ = TestCase2;
for(var k in TestCase2.prototype ) reflect.MetadataTest.prototype[k] = TestCase2.prototype[k];
reflect.MetadataTest.prototype.testProperty = function() {
	var ci = reflect.ClassInfo.forClass(reflect.model.ClassA);
	var a = ci.getProperty("a");
	var b = ci.getProperty("b");
	var c = ci.getProperty("c");
	this.assertTrue(a.hasMetadata("Test"),{ fileName : "MetadataTest.hx", lineNumber : 11, className : "reflect.MetadataTest", methodName : "testProperty"});
	this.assertFalse(b.hasMetadata("Test"),{ fileName : "MetadataTest.hx", lineNumber : 12, className : "reflect.MetadataTest", methodName : "testProperty"});
	this.assertTrue(c.hasMetadata("Test"),{ fileName : "MetadataTest.hx", lineNumber : 13, className : "reflect.MetadataTest", methodName : "testProperty"});
}
reflect.MetadataTest.prototype.testMethod = function() {
	var ci = reflect.ClassInfo.forClass(reflect.model.ClassA);
	var f1 = ci.getMethod("f1");
	this.assertTrue(f1.hasMetadata("Test"),{ fileName : "MetadataTest.hx", lineNumber : 21, className : "reflect.MetadataTest", methodName : "testMethod"});
	var f2 = ci.getMethod("f2");
	this.assertFalse(f2.hasMetadata("Test"),{ fileName : "MetadataTest.hx", lineNumber : 24, className : "reflect.MetadataTest", methodName : "testMethod"});
}
reflect.MetadataTest.prototype.__class__ = reflect.MetadataTest;
Log = function() { }
Log.__name__ = ["Log"];
Log.posInfo = null;
Log["debugger"] = function() {
	debugger;
}
Log.init = function() {
	{
		if(!window.console) console = { };
		console.info = console.info || function() {
			null;
		}
		console.warn = console.warn || function() {
			null;
		}
		console.error = console.error || function() {
			null;
		}
	}
	haxe.Log.trace = $closure(Log,"infoConsole");
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
		console.error(Log.createMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
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
	var from = Log.posInfo.className + "." + Log.posInfo.methodName;
	return "[" + from + "] " + Log.args.join(" ");
}
Log.filter = function(level) {
	var result = true;
	{
		var _g = 0, _g1 = Log.filters;
		while(_g < _g1.length) {
			var filter = _g1[_g];
			++_g;
			result = filter.enabled(result,Log.posInfo,level);
		}
	}
	return result;
}
Log.infoConsole = function(v,i) {
	Log.posInfo = i;
	Log.fetchInput(v);
	console.log("" + Log.createMessage() + " (trace)");
}
Log.prototype.__class__ = Log;
reflect.Property = function(field,definedInClass,owner) { if( field === $_ ) return; {
	reflect.Field.call(this,field,definedInClass,owner);
}}
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
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
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
reflect.Method = function(field,args,ret,definedInClass,owner) { if( field === $_ ) return; {
	reflect.Field.call(this,field,definedInClass,owner);
	this.args = args;
	this.ret = ret;
}}
reflect.Method.__name__ = ["reflect","Method"];
reflect.Method.__super__ = reflect.Field;
for(var k in reflect.Field.prototype ) reflect.Method.prototype[k] = reflect.Field.prototype[k];
reflect.Method.prototype.parameters = null;
reflect.Method.prototype.args = null;
reflect.Method.prototype.ret = null;
reflect.Method.prototype.getParameters = function() {
	if(this.parameters != null) return this.parameters;
	this.parameters = new Array();
	{ var $it0 = this.args.iterator();
	while( $it0.hasNext() ) { var arg = $it0.next();
	{
		var parameter = new reflect.Parameter(arg);
		this.parameters.push(parameter);
	}
	}}
	return this.parameters;
}
reflect.Method.prototype.__class__ = reflect.Method;
bpmjs.TestComplete = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
bpmjs.TestComplete.__name__ = ["bpmjs","TestComplete"];
bpmjs.TestComplete.__super__ = TestCase2;
for(var k in TestCase2.prototype ) bpmjs.TestComplete.prototype[k] = TestCase2.prototype[k];
bpmjs.TestComplete.completeCount = null;
bpmjs.TestComplete.postCompleteCount = null;
bpmjs.TestComplete.prototype.setup = function() {
	bpmjs.TestComplete.completeCount = 0;
	bpmjs.TestComplete.postCompleteCount = 0;
}
bpmjs.TestComplete.prototype.testComplete = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestComplete.TestConfigWithA);
	this.assertEquals(1,bpmjs.TestComplete.completeCount,{ fileName : "TestComplete.hx", lineNumber : 17, className : "bpmjs.TestComplete", methodName : "testComplete"});
}
bpmjs.TestComplete.prototype.testPostComplete = function() {
	var context = bpmjs.ContextBuilder.build(bpmjs._TestComplete.TestConfigWithA);
	this.assertEquals(1,bpmjs.TestComplete.postCompleteCount,{ fileName : "TestComplete.hx", lineNumber : 23, className : "bpmjs.TestComplete", methodName : "testPostComplete"});
}
bpmjs.TestComplete.prototype.__class__ = bpmjs.TestComplete;
if(!bpmjs._TestComplete) bpmjs._TestComplete = {}
bpmjs._TestComplete.TestConfigWithA = function(p) { if( p === $_ ) return; {
	this.a = new bpmjs._TestComplete.A();
}}
bpmjs._TestComplete.TestConfigWithA.__name__ = ["bpmjs","_TestComplete","TestConfigWithA"];
bpmjs._TestComplete.TestConfigWithA.prototype.a = null;
bpmjs._TestComplete.TestConfigWithA.prototype.__class__ = bpmjs._TestComplete.TestConfigWithA;
bpmjs._TestComplete.TestConfigWithA.__interfaces__ = [haxe.rtti.Infos];
bpmjs._TestComplete.A = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._TestComplete.A.__name__ = ["bpmjs","_TestComplete","A"];
bpmjs._TestComplete.A.prototype.handleContextComplete = function() {
	bpmjs.TestComplete.completeCount++;
}
bpmjs._TestComplete.A.prototype.handleContextPostComplete = function() {
	bpmjs.TestComplete.postCompleteCount++;
}
bpmjs._TestComplete.A.prototype.__class__ = bpmjs._TestComplete.A;
bpmjs._TestComplete.A.__interfaces__ = [haxe.rtti.Infos];
kumite.scene.LayerState = function(name) { if( name === $_ ) return; {
	this.name = name;
}}
kumite.scene.LayerState.__name__ = ["kumite","scene","LayerState"];
kumite.scene.LayerState.prototype.name = null;
kumite.scene.LayerState.prototype.__class__ = kumite.scene.LayerState;
kumite.scene.Layer = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.scene.Layer.__name__ = ["kumite","scene","Layer"];
kumite.scene.Layer.prototype.id = null;
kumite.scene.Layer.prototype.state = null;
kumite.scene.Layer.prototype.init = function() {
	null;
}
kumite.scene.Layer.prototype.render = function() {
	null;
}
kumite.scene.Layer.prototype.renderTransition = function(transitionContext) {
	null;
}
kumite.scene.Layer.prototype.__class__ = kumite.scene.Layer;
kumite.scene.Layer.__interfaces__ = [kumite.scene.LayerLifecycle];
reflect.Parameter = function(def) { if( def === $_ ) return; {
	this.def = def;
}}
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
	var $e = t;
	switch( $e[1] ) {
	case 1:
	var c = $e[2];
	{
		inf = c;
	}break;
	case 2:
	var e = $e[2];
	{
		inf = e;
	}break;
	case 3:
	var t1 = $e[2];
	{
		inf = t1;
	}break;
	case 0:
	{
		throw "Unexpected Package";
	}break;
	}
	return inf;
}
haxe.rtti.TypeApi.isVar = function(t) {
	return (function($this) {
		var $r;
		var $e = t;
		switch( $e[1] ) {
		case 4:
		{
			$r = false;
		}break;
		default:{
			$r = true;
		}break;
		}
		return $r;
	}(this));
}
haxe.rtti.TypeApi.leq = function(f,l1,l2) {
	var it = l2.iterator();
	{ var $it0 = l1.iterator();
	while( $it0.hasNext() ) { var e1 = $it0.next();
	{
		if(!it.hasNext()) return false;
		var e2 = it.next();
		if(!f(e1,e2)) return false;
	}
	}}
	if(it.hasNext()) return false;
	return true;
}
haxe.rtti.TypeApi.rightsEq = function(r1,r2) {
	if(r1 == r2) return true;
	var $e = r1;
	switch( $e[1] ) {
	case 2:
	var m1 = $e[2];
	{
		var $e = r2;
		switch( $e[1] ) {
		case 2:
		var m2 = $e[2];
		{
			return m1 == m2;
		}break;
		default:{
			null;
		}break;
		}
	}break;
	default:{
		null;
	}break;
	}
	return false;
}
haxe.rtti.TypeApi.typeEq = function(t1,t2) {
	var $e = t1;
	switch( $e[1] ) {
	case 0:
	{
		return t2 == haxe.rtti.CType.CUnknown;
	}break;
	case 1:
	var params = $e[3], name = $e[2];
	{
		var $e = t2;
		switch( $e[1] ) {
		case 1:
		var params2 = $e[3], name2 = $e[2];
		{
			return name == name2 && haxe.rtti.TypeApi.leq($closure(haxe.rtti.TypeApi,"typeEq"),params,params2);
		}break;
		default:{
			null;
		}break;
		}
	}break;
	case 2:
	var params = $e[3], name = $e[2];
	{
		var $e = t2;
		switch( $e[1] ) {
		case 2:
		var params2 = $e[3], name2 = $e[2];
		{
			return name == name2 && haxe.rtti.TypeApi.leq($closure(haxe.rtti.TypeApi,"typeEq"),params,params2);
		}break;
		default:{
			null;
		}break;
		}
	}break;
	case 3:
	var params = $e[3], name = $e[2];
	{
		var $e = t2;
		switch( $e[1] ) {
		case 3:
		var params2 = $e[3], name2 = $e[2];
		{
			return name == name2 && haxe.rtti.TypeApi.leq($closure(haxe.rtti.TypeApi,"typeEq"),params,params2);
		}break;
		default:{
			null;
		}break;
		}
	}break;
	case 4:
	var ret = $e[3], args = $e[2];
	{
		var $e = t2;
		switch( $e[1] ) {
		case 4:
		var ret2 = $e[3], args2 = $e[2];
		{
			return haxe.rtti.TypeApi.leq(function(a,b) {
				return a.name == b.name && a.opt == b.opt && haxe.rtti.TypeApi.typeEq(a.t,b.t);
			},args,args2) && haxe.rtti.TypeApi.typeEq(ret,ret2);
		}break;
		default:{
			null;
		}break;
		}
	}break;
	case 5:
	var fields = $e[2];
	{
		var $e = t2;
		switch( $e[1] ) {
		case 5:
		var fields2 = $e[2];
		{
			return haxe.rtti.TypeApi.leq(function(a,b) {
				return a.name == b.name && haxe.rtti.TypeApi.typeEq(a.t,b.t);
			},fields,fields2);
		}break;
		default:{
			null;
		}break;
		}
	}break;
	case 6:
	var t = $e[2];
	{
		var $e = t2;
		switch( $e[1] ) {
		case 6:
		var t21 = $e[2];
		{
			if(t == null != (t21 == null)) return false;
			return t == null || haxe.rtti.TypeApi.typeEq(t,t21);
		}break;
		default:{
			null;
		}break;
		}
	}break;
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
reflect.PropertyTest = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
reflect.PropertyTest.__name__ = ["reflect","PropertyTest"];
reflect.PropertyTest.__super__ = TestCase2;
for(var k in TestCase2.prototype ) reflect.PropertyTest.prototype[k] = TestCase2.prototype[k];
reflect.PropertyTest.prototype.testGetValue = function() {
	var instanceA = new reflect.model.ClassA();
	var ci = reflect.ClassInfo.forInstance(instanceA);
	var a = ci.getProperty("a");
	this.assertNull(Reflect.field(instanceA,a.field.name),{ fileName : "PropertyTest.hx", lineNumber : 11, className : "reflect.PropertyTest", methodName : "testGetValue"});
	var c = ci.getProperty("c");
	this.assertEquals(1,Reflect.field(instanceA,c.field.name),{ fileName : "PropertyTest.hx", lineNumber : 14, className : "reflect.PropertyTest", methodName : "testGetValue"});
}
reflect.PropertyTest.prototype.testSetValue = function() {
	var instanceA = new reflect.model.ClassA();
	var ci = reflect.ClassInfo.forInstance(instanceA);
	var newValue = 5;
	var a = ci.getProperty("a");
	instanceA[a.field.name] = 5;
	this.assertEquals(newValue,Reflect.field(instanceA,a.field.name),{ fileName : "PropertyTest.hx", lineNumber : 25, className : "reflect.PropertyTest", methodName : "testSetValue"});
}
reflect.PropertyTest.prototype.__class__ = reflect.PropertyTest;
TestRunner = function(p) { if( p === $_ ) return; {
	this.runner = new haxe.unit.TestRunner();
	reflect.Tests.addTo(this.runner);
	this.addBPMJSTests();
	this.addContextBuilderTests();
	this.addFrontMessengerTests();
	this.addIntegrationTests();
	this.addSequencerTests();
	this.addSceneTests();
	var startTime = Date.now().getTime();
	this.runner.run();
	haxe.Log.trace("Time for testing... " + (Date.now().getTime() - startTime) + "ms",{ fileName : "TestRunner.hx", lineNumber : 47, className : "TestRunner", methodName : "new"});
}}
TestRunner.__name__ = ["TestRunner"];
TestRunner.main = function() {
	Log.init();
	Log.addFilter(new ERegFilter(LogLevel.INFO,new EReg(".*","")));
	var runner = new TestRunner();
}
TestRunner.prototype.runner = null;
TestRunner.prototype.addBPMJSTests = function() {
	this.runner.add(new bpmjs.TestMessenger());
}
TestRunner.prototype.addContextBuilderTests = function() {
	this.runner.add(new bpmjs.TestGetObject());
	this.runner.add(new bpmjs.TestInject());
	this.runner.add(new bpmjs.TestComplete());
	this.runner.add(new bpmjs.TestError());
	this.runner.add(new bpmjs.TestConfigure());
	this.runner.add(new bpmjs.TestDynamic());
	this.runner.add(new bpmjs.TestObserve());
}
TestRunner.prototype.addFrontMessengerTests = function() {
	this.runner.add(new bpmjs.TestFrontMessenger());
}
TestRunner.prototype.addIntegrationTests = function() {
	this.runner.add(new bpmjs.integration.TestMessaging());
	this.runner.add(new bpmjs.integration.TestMultipleConfigs());
}
TestRunner.prototype.addSequencerTests = function() {
	this.runner.add(new bpmjs.TestSequencer());
}
TestRunner.prototype.addSceneTests = function() {
	this.runner.add(new kumite.scene.TestLayerOrder());
}
TestRunner.prototype.__class__ = TestRunner;
haxe.unit.TestResult = function(p) { if( p === $_ ) return; {
	this.m_tests = new List();
	this.success = true;
}}
haxe.unit.TestResult.__name__ = ["haxe","unit","TestResult"];
haxe.unit.TestResult.prototype.m_tests = null;
haxe.unit.TestResult.prototype.success = null;
haxe.unit.TestResult.prototype.add = function(t) {
	this.m_tests.add(t);
	if(!t.success) this.success = false;
}
haxe.unit.TestResult.prototype.toString = function() {
	var buf = new StringBuf();
	var failures = 0;
	{ var $it0 = this.m_tests.iterator();
	while( $it0.hasNext() ) { var test = $it0.next();
	{
		if(test.success == false) {
			buf.b[buf.b.length] = "* ";
			buf.b[buf.b.length] = test.classname;
			buf.b[buf.b.length] = "::";
			buf.b[buf.b.length] = test.method;
			buf.b[buf.b.length] = "()";
			buf.b[buf.b.length] = "\n";
			buf.b[buf.b.length] = "ERR: ";
			if(test.posInfos != null) {
				buf.b[buf.b.length] = test.posInfos.fileName;
				buf.b[buf.b.length] = ":";
				buf.b[buf.b.length] = test.posInfos.lineNumber;
				buf.b[buf.b.length] = "(";
				buf.b[buf.b.length] = test.posInfos.className;
				buf.b[buf.b.length] = ".";
				buf.b[buf.b.length] = test.posInfos.methodName;
				buf.b[buf.b.length] = ") - ";
			}
			buf.b[buf.b.length] = test.error;
			buf.b[buf.b.length] = "\n";
			if(test.backtrace != null) {
				buf.b[buf.b.length] = test.backtrace;
				buf.b[buf.b.length] = "\n";
			}
			buf.b[buf.b.length] = "\n";
			failures++;
		}
	}
	}}
	buf.b[buf.b.length] = "\n";
	if(failures == 0) buf.b[buf.b.length] = "OK ";
	else buf.b[buf.b.length] = "FAILED ";
	buf.b[buf.b.length] = this.m_tests.length;
	buf.b[buf.b.length] = " tests, ";
	buf.b[buf.b.length] = failures;
	buf.b[buf.b.length] = " failed, ";
	buf.b[buf.b.length] = this.m_tests.length - failures;
	buf.b[buf.b.length] = " success";
	buf.b[buf.b.length] = "\n";
	return buf.b.join("");
}
haxe.unit.TestResult.prototype.__class__ = haxe.unit.TestResult;
reflect.ClassInfoTest = function(p) { if( p === $_ ) return; {
	TestCase2.call(this);
}}
reflect.ClassInfoTest.__name__ = ["reflect","ClassInfoTest"];
reflect.ClassInfoTest.__super__ = TestCase2;
for(var k in TestCase2.prototype ) reflect.ClassInfoTest.prototype[k] = TestCase2.prototype[k];
reflect.ClassInfoTest.prototype.testForClass = function() {
	var ci = reflect.ClassInfo.forClass(reflect.model.ClassA);
	this.assertEquals(reflect.model.ClassA,ci.type,{ fileName : "ClassInfoTest.hx", lineNumber : 10, className : "reflect.ClassInfoTest", methodName : "testForClass"});
}
reflect.ClassInfoTest.prototype.testForInstance = function() {
	var ci = reflect.ClassInfo.forInstance(new reflect.model.ClassA());
	this.assertEquals(reflect.model.ClassA,ci.type,{ fileName : "ClassInfoTest.hx", lineNumber : 16, className : "reflect.ClassInfoTest", methodName : "testForInstance"});
}
reflect.ClassInfoTest.prototype.testForName = function() {
	var ci = reflect.ClassInfo.forName("reflect.model.ClassA");
	this.assertEquals(reflect.model.ClassA,ci.type,{ fileName : "ClassInfoTest.hx", lineNumber : 22, className : "reflect.ClassInfoTest", methodName : "testForName"});
}
reflect.ClassInfoTest.prototype.testForCClassInt = function() {
	var type = this.getCClassInt();
	var ci = reflect.ClassInfo.forCType(type);
	this.assertEquals(reflect.ClassInfo.forClass(Int),ci,{ fileName : "ClassInfoTest.hx", lineNumber : 29, className : "reflect.ClassInfoTest", methodName : "testForCClassInt"});
}
reflect.ClassInfoTest.prototype.testNoRTTIModel = function() {
	var ci = reflect.ClassInfo.forClass(reflect.model.NoRtti);
	this.assertEquals(reflect.model.NoRtti,ci.type,{ fileName : "ClassInfoTest.hx", lineNumber : 36, className : "reflect.ClassInfoTest", methodName : "testNoRTTIModel"});
	this.assertEquals("reflect.model.NoRtti",ci.name,{ fileName : "ClassInfoTest.hx", lineNumber : 37, className : "reflect.ClassInfoTest", methodName : "testNoRTTIModel"});
	this.assertEquals(0,ci.getProperties().length,{ fileName : "ClassInfoTest.hx", lineNumber : 38, className : "reflect.ClassInfoTest", methodName : "testNoRTTIModel"});
	this.assertEquals(0,ci.getMethods().length,{ fileName : "ClassInfoTest.hx", lineNumber : 39, className : "reflect.ClassInfoTest", methodName : "testNoRTTIModel"});
	this.assertFalse(ci.hasRtti,{ fileName : "ClassInfoTest.hx", lineNumber : 40, className : "reflect.ClassInfoTest", methodName : "testNoRTTIModel"});
}
reflect.ClassInfoTest.prototype.testType = function() {
	var ci = reflect.ClassInfo.forClass(reflect.model.ClassA);
	this.assertEquals(reflect.model.ClassA,ci.type,{ fileName : "ClassInfoTest.hx", lineNumber : 47, className : "reflect.ClassInfoTest", methodName : "testType"});
	this.assertEquals("reflect.model.ClassA",ci.name,{ fileName : "ClassInfoTest.hx", lineNumber : 48, className : "reflect.ClassInfoTest", methodName : "testType"});
	this.assertTrue(ci.hasRtti,{ fileName : "ClassInfoTest.hx", lineNumber : 49, className : "reflect.ClassInfoTest", methodName : "testType"});
}
reflect.ClassInfoTest.prototype.testProperties = function() {
	var ci = reflect.ClassInfo.forClass(reflect.model.ClassA);
	this.assertEquals(3,ci.getProperties().length,{ fileName : "ClassInfoTest.hx", lineNumber : 56, className : "reflect.ClassInfoTest", methodName : "testProperties"});
	this.assertEquals("a",ci.getProperty("a").field.name,{ fileName : "ClassInfoTest.hx", lineNumber : 57, className : "reflect.ClassInfoTest", methodName : "testProperties"});
	this.assertEquals(ci,ci.getProperty("a").owner,{ fileName : "ClassInfoTest.hx", lineNumber : 58, className : "reflect.ClassInfoTest", methodName : "testProperties"});
	this.assertEquals(reflect.ClassInfo.forClass(Int),reflect.ClassInfo.forCType(ci.getProperty("a").field.type),{ fileName : "ClassInfoTest.hx", lineNumber : 59, className : "reflect.ClassInfoTest", methodName : "testProperties"});
	this.assertEquals(Int,ci.getProperty("a").getClass(),{ fileName : "ClassInfoTest.hx", lineNumber : 60, className : "reflect.ClassInfoTest", methodName : "testProperties"});
}
reflect.ClassInfoTest.prototype.testMethods = function() {
	var ci = reflect.ClassInfo.forClass(reflect.model.ClassA);
	this.assertEquals(4,ci.getMethods().length,{ fileName : "ClassInfoTest.hx", lineNumber : 67, className : "reflect.ClassInfoTest", methodName : "testMethods"});
	this.assertEquals("f1",ci.getMethod("f1").field.name,{ fileName : "ClassInfoTest.hx", lineNumber : 68, className : "reflect.ClassInfoTest", methodName : "testMethods"});
	this.assertEquals(reflect.ClassInfo.forClass(Float),reflect.ClassInfo.forCType(ci.getMethod("f1").field.type),{ fileName : "ClassInfoTest.hx", lineNumber : 69, className : "reflect.ClassInfoTest", methodName : "testMethods"});
	this.assertEquals(Float,ci.getMethod("f1").getClass(),{ fileName : "ClassInfoTest.hx", lineNumber : 70, className : "reflect.ClassInfoTest", methodName : "testMethods"});
	this.assertEquals(1,ci.getMethod("f1").getParameters().length,{ fileName : "ClassInfoTest.hx", lineNumber : 71, className : "reflect.ClassInfoTest", methodName : "testMethods"});
	this.assertEquals(reflect.ClassInfo.forClass(Int),reflect.ClassInfo.forCType(ci.getMethod("f1").getParameters()[0].def.t),{ fileName : "ClassInfoTest.hx", lineNumber : 72, className : "reflect.ClassInfoTest", methodName : "testMethods"});
}
reflect.ClassInfoTest.prototype.getCClassInt = function() {
	var infos = new haxe.rtti.XmlParser().processElement(Xml.parse(reflect.CClassInt.__rtti).firstElement());
	var classDef;
	var $e = infos;
	switch( $e[1] ) {
	case 1:
	var c = $e[2];
	{
		classDef = c;
	}break;
	default:{
		throw "error";
	}break;
	}
	{ var $it0 = classDef.fields.iterator();
	while( $it0.hasNext() ) { var field = $it0.next();
	{
		var $e = field.type;
		switch( $e[1] ) {
		case 2:
		var params = $e[3], name = $e[2];
		{
			return field.type;
		}break;
		default:{
			throw "error";
		}break;
		}
	}
	}}
	throw "error";
}
reflect.ClassInfoTest.prototype.__class__ = reflect.ClassInfoTest;
reflect.CClassInt = function() { }
reflect.CClassInt.__name__ = ["reflect","CClassInt"];
reflect.CClassInt.prototype["int"] = null;
reflect.CClassInt.prototype.__class__ = reflect.CClassInt;
reflect.CClassInt.__interfaces__ = [haxe.rtti.Infos];
kumite.scene.Scene = function(p) { if( p === $_ ) return; {
	this.layers = new Array();
}}
kumite.scene.Scene.__name__ = ["kumite","scene","Scene"];
kumite.scene.Scene.prototype.layers = null;
kumite.scene.Scene.prototype.id = null;
kumite.scene.Scene.prototype.name = null;
kumite.scene.Scene.prototype.addLayer = function(layer) {
	this.layers.push(layer);
}
kumite.scene.Scene.prototype.containsLayer = function(layer) {
	{
		var _g = 0, _g1 = this.layers;
		while(_g < _g1.length) {
			var sceneLayer = _g1[_g];
			++_g;
			if(sceneLayer.id == layer.id) return true;
		}
	}
	return false;
}
kumite.scene.Scene.prototype.getLayerIndex = function(layer) {
	{
		var _g1 = 0, _g = this.layers.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.layers[i].id == layer.id) return i;
		}
	}
	return -1;
}
kumite.scene.Scene.prototype.__class__ = kumite.scene.Scene;
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
reflect.Tests = function() { }
reflect.Tests.__name__ = ["reflect","Tests"];
reflect.Tests.addTo = function(runner) {
	runner.add(new reflect.ClassInfoTest());
	runner.add(new reflect.MetadataTest());
	runner.add(new reflect.PropertyTest());
}
reflect.Tests.prototype.__class__ = reflect.Tests;
reflect.model.NoRtti = function() { }
reflect.model.NoRtti.__name__ = ["reflect","model","NoRtti"];
reflect.model.NoRtti.prototype.__class__ = reflect.model.NoRtti;
kumite.scene.SceneMixer = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.scene.SceneMixer.__name__ = ["kumite","scene","SceneMixer"];
kumite.scene.SceneMixer.prototype.from = null;
kumite.scene.SceneMixer.prototype.to = null;
kumite.scene.SceneMixer.prototype.mix = function(from,to) {
	this.from = from;
	this.to = to;
	var result = new kumite.scene.Scene();
	{
		var _g = 0, _g1 = to.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			if(from.containsLayer(layer)) layer.state = kumite.scene.LayerState.KEEP;
			else layer.state = kumite.scene.LayerState.IN;
			result.addLayer(layer);
		}
	}
	{
		var _g = 0, _g1 = from.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			if(!result.containsLayer(layer)) {
				layer.state = kumite.scene.LayerState.OUT;
				result.addLayer(layer);
			}
		}
	}
	result.layers.sort($closure(this,"sorter"));
	return result;
}
kumite.scene.SceneMixer.prototype.sorter = function(a,b) {
	var from = this.from;
	var to = this.to;
	var result = function(value,i) {
		return value;
	}
	var aInFrom = from.containsLayer(a);
	var aInTo = to.containsLayer(a);
	var bInFrom = from.containsLayer(b);
	var bInTo = to.containsLayer(b);
	if(aInTo && bInTo) {
		var bOverA = to.getLayerIndex(b) > to.getLayerIndex(a);
		if(bOverA) return result(-1,{ fileName : "SceneMixer.hx", lineNumber : 62, className : "kumite.scene.SceneMixer", methodName : "sorter"});
		else return result(1,{ fileName : "SceneMixer.hx", lineNumber : 64, className : "kumite.scene.SceneMixer", methodName : "sorter"});
	}
	if(aInFrom && bInFrom) {
		var bOverA = from.getLayerIndex(b) > from.getLayerIndex(a);
		if(bOverA) return result(-1,{ fileName : "SceneMixer.hx", lineNumber : 71, className : "kumite.scene.SceneMixer", methodName : "sorter"});
		else return result(1,{ fileName : "SceneMixer.hx", lineNumber : 73, className : "kumite.scene.SceneMixer", methodName : "sorter"});
	}
	if(aInFrom && !aInTo && !bInFrom && bInTo) {
		var computeHasAPredecessorThatIsOverB = function() {
			var aIndex = from.getLayerIndex(a) - 1;
			while(aIndex >= 0) {
				var bIndex = to.getLayerIndex(b) + 1;
				while(bIndex < to.layers.length) {
					if(to.layers[bIndex].id == from.layers[aIndex].id) return true;
					bIndex++;
				}
				aIndex--;
			}
			return false;
		}
		var hasAPredecessorThatIsOverB = computeHasAPredecessorThatIsOverB();
		if(hasAPredecessorThatIsOverB) return result(1,{ fileName : "SceneMixer.hx", lineNumber : 98, className : "kumite.scene.SceneMixer", methodName : "sorter"});
		else return result(-1,{ fileName : "SceneMixer.hx", lineNumber : 100, className : "kumite.scene.SceneMixer", methodName : "sorter"});
	}
	if(aInTo && !aInFrom && !bInTo && bInFrom) return result(1,{ fileName : "SceneMixer.hx", lineNumber : 104, className : "kumite.scene.SceneMixer", methodName : "sorter"});
	return result(0,{ fileName : "SceneMixer.hx", lineNumber : 106, className : "kumite.scene.SceneMixer", methodName : "sorter"});
}
kumite.scene.SceneMixer.prototype.__class__ = kumite.scene.SceneMixer;
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) {
		r++;
	}
	if(r > 0) return s.substr(r,l - r);
	else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) {
		r++;
	}
	if(r > 0) {
		return s.substr(0,l - r);
	}
	else {
		return s;
	}
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) {
		if(l - sl < cl) {
			s += c.substr(0,l - sl);
			sl = l;
		}
		else {
			s += c;
			sl += cl;
		}
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) {
		if(l - sl < cl) {
			ns += c.substr(0,l - sl);
			sl = l;
		}
		else {
			ns += c;
			sl += cl;
		}
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype.__class__ = StringTools;
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
	}
	Math.isNaN = function(i) {
		return isNaN(i);
	}
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
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
{
	var d = Date;
	d.now = function() {
		return new Date();
	}
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	}
	d.fromString = function(s) {
		switch(s.length) {
		case 8:{
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		}break;
		case 10:{
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		}break;
		case 19:{
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		}break;
		default:{
			throw "Invalid date format : " + s;
		}break;
		}
	}
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	}
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
reflect.model.ClassB.__meta__ = { obj : { Test : null}, fields : { c : { Test : null}}};
reflect.model.ClassB.__rtti = "<class path=\"reflect.model.ClassB\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<c public=\"1\"><c path=\"Int\"/></c>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
reflect.model.ClassA.__meta__ = { fields : { a : { Test : null}, f1 : { Test : null}}};
reflect.model.ClassA.__rtti = "<class path=\"reflect.model.ClassA\" params=\"\">\n\t<extends path=\"reflect.model.ClassB\"/>\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<a public=\"1\"><c path=\"Int\"/></a>\n\t<b public=\"1\"><e path=\"Bool\"/></b>\n\t<f1 public=\"1\" set=\"method\" line=\"12\"><f a=\"a\">\n\t<c path=\"Int\"/>\n\t<c path=\"Float\"/>\n</f></f1>\n\t<f2 set=\"method\" line=\"17\"><f a=\"\"><e path=\"Void\"/></f></f2>\n\t<new public=\"1\" set=\"method\" line=\"4\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs.Sequencer.__meta__ = { fields : { context : { Inject : null}}};
bpmjs.Sequencer.__rtti = "<class path=\"bpmjs.Sequencer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<context public=\"1\"><c path=\"bpmjs.Context\"/></context>\n\t<start public=\"1\" set=\"method\" line=\"14\"><f a=\"name\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></start>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestConfigure.TestConfigWithA.__rtti = "<class path=\"bpmjs._TestConfigure.TestConfigWithA\" params=\"\" private=\"1\" module=\"bpmjs.TestConfigure\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<a public=\"1\"><c path=\"bpmjs._TestConfigure.A\"/></a>\n\t<new public=\"1\" set=\"method\" line=\"30\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestConfigure.A.__meta__ = { fields : { b : { Inject : null}}};
bpmjs._TestConfigure.A.__rtti = "<class path=\"bpmjs._TestConfigure.A\" params=\"\" private=\"1\" module=\"bpmjs.TestConfigure\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<b public=\"1\"><c path=\"bpmjs._TestConfigure.B\"/></b>\n\t<new public=\"1\" set=\"method\" line=\"42\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestConfigure.B.__meta__ = { fields : { a : { Inject : null}}};
bpmjs._TestConfigure.B.__rtti = "<class path=\"bpmjs._TestConfigure.B\" params=\"\" private=\"1\" module=\"bpmjs.TestConfigure\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<a public=\"1\"><c path=\"bpmjs._TestConfigure.A\"/></a>\n\t<new public=\"1\" set=\"method\" line=\"53\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs.TestDynamic.bCount = 0;
bpmjs._TestDynamic.TestConfigWithAAndDyanmicBs.__rtti = "<class path=\"bpmjs._TestDynamic.TestConfigWithAAndDyanmicBs\" params=\"\" private=\"1\" module=\"bpmjs.TestDynamic\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<a public=\"1\"><c path=\"bpmjs._TestDynamic.A\"/></a>\n\t<bList public=\"1\"><c path=\"Array\"><c path=\"bpmjs._TestDynamic.B\"/></c></bList>\n\t<new public=\"1\" set=\"method\" line=\"28\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestDynamic.A.__meta__ = { fields : { bList : { Inject : null}}};
bpmjs._TestDynamic.A.__rtti = "<class path=\"bpmjs._TestDynamic.A\" params=\"\" private=\"1\" module=\"bpmjs.TestDynamic\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<bList public=\"1\"><c path=\"Array\"><c path=\"bpmjs._TestDynamic.B\"/></c></bList>\n\t<new public=\"1\" set=\"method\" line=\"45\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestDynamic.B.__meta__ = { fields : { a : { Inject : null}, handleComplete : { Complete : null}}};
bpmjs._TestDynamic.B.__rtti = "<class path=\"bpmjs._TestDynamic.B\" params=\"\" private=\"1\" module=\"bpmjs.TestDynamic\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<a public=\"1\"><c path=\"bpmjs._TestDynamic.A\"/></a>\n\t<handleComplete public=\"1\" set=\"method\" line=\"61\"><f a=\"\"><e path=\"Void\"/></f></handleComplete>\n\t<new public=\"1\" set=\"method\" line=\"56\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestGetObject.TestConfigWithA.__rtti = "<class path=\"bpmjs._TestGetObject.TestConfigWithA\" params=\"\" private=\"1\" module=\"bpmjs.TestGetObject\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<a public=\"1\"><c path=\"bpmjs._TestGetObject.A\"/></a>\n\t<new public=\"1\" set=\"method\" line=\"55\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestGetObject.TestConfigWithAAndB.__rtti = "<class path=\"bpmjs._TestGetObject.TestConfigWithAAndB\" params=\"\" private=\"1\" module=\"bpmjs.TestGetObject\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<a public=\"1\"><c path=\"bpmjs._TestGetObject.A\"/></a>\n\t<b public=\"1\"><c path=\"bpmjs._TestGetObject.B\"/></b>\n\t<new public=\"1\" set=\"method\" line=\"82\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
LogLevel.INFO = new LogLevel(1);
LogLevel.WARN = new LogLevel(2);
LogLevel.ERROR = new LogLevel(3);
LogLevel.OFF = new LogLevel(4);
bpmjs.integration._TestMultipleConfigs.TestConfigWithA.__rtti = "<class path=\"bpmjs.integration._TestMultipleConfigs.TestConfigWithA\" params=\"\" private=\"1\" module=\"bpmjs.integration.TestMultipleConfigs\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<a public=\"1\"><c path=\"bpmjs.integration._TestMultipleConfigs.A\"/></a>\n\t<new public=\"1\" set=\"method\" line=\"19\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs.integration._TestMultipleConfigs.TestConfigWithB.__rtti = "<class path=\"bpmjs.integration._TestMultipleConfigs.TestConfigWithB\" params=\"\" private=\"1\" module=\"bpmjs.integration.TestMultipleConfigs\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<b public=\"1\"><c path=\"bpmjs.integration._TestMultipleConfigs.B\"/></b>\n\t<new public=\"1\" set=\"method\" line=\"29\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs.integration._TestMultipleConfigs.A.__rtti = "<class path=\"bpmjs.integration._TestMultipleConfigs.A\" params=\"\" private=\"1\" module=\"bpmjs.integration.TestMultipleConfigs\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<new public=\"1\" set=\"method\" line=\"37\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs.integration._TestMultipleConfigs.B.__rtti = "<class path=\"bpmjs.integration._TestMultipleConfigs.B\" params=\"\" private=\"1\" module=\"bpmjs.integration.TestMultipleConfigs\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<new public=\"1\" set=\"method\" line=\"44\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestInject.TestConfig.__rtti = "<class path=\"bpmjs._TestInject.TestConfig\" params=\"\" private=\"1\" module=\"bpmjs.TestInject\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<a public=\"1\"><c path=\"bpmjs._TestInject.A\"/></a>\n\t<b public=\"1\"><c path=\"bpmjs._TestInject.B\"/></b>\n\t<c public=\"1\"><c path=\"bpmjs._TestInject.C\"/></c>\n\t<new public=\"1\" set=\"method\" line=\"47\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestInject.A.__meta__ = { fields : { b : { Inject : null}, context : { Inject : null}}};
bpmjs._TestInject.A.__rtti = "<class path=\"bpmjs._TestInject.A\" params=\"\" private=\"1\" module=\"bpmjs.TestInject\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<b public=\"1\"><c path=\"bpmjs._TestInject.B\"/></b>\n\t<context public=\"1\"><c path=\"bpmjs.Context\"/></context>\n\t<new public=\"1\" set=\"method\" line=\"63\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestInject.B.__meta__ = { fields : { a : { Inject : null}}};
bpmjs._TestInject.B.__rtti = "<class path=\"bpmjs._TestInject.B\" params=\"\" private=\"1\" module=\"bpmjs.TestInject\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<a public=\"1\"><c path=\"bpmjs._TestInject.A\"/></a>\n\t<new public=\"1\" set=\"method\" line=\"74\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestInject.C.__rtti = "<class path=\"bpmjs._TestInject.C\" params=\"\" private=\"1\" module=\"bpmjs.TestInject\">\n\t<extends path=\"bpmjs._TestInject.B\"/>\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<new public=\"1\" set=\"method\" line=\"79\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
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
bpmjs._TestObserve.TestConfigWithAAndB.__rtti = "<class path=\"bpmjs._TestObserve.TestConfigWithAAndB\" params=\"\" private=\"1\" module=\"bpmjs.TestObserve\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<a public=\"1\"><c path=\"bpmjs._TestObserve.A\"/></a>\n\t<b public=\"1\"><c path=\"bpmjs._TestObserve.B\"/></b>\n\t<new public=\"1\" set=\"method\" line=\"19\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestObserve.A.__rtti = "<class path=\"bpmjs._TestObserve.A\" params=\"\" private=\"1\" module=\"bpmjs.TestObserve\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<new public=\"1\" set=\"method\" line=\"29\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestObserve.B.__meta__ = { fields : { observe : { Observe : null}}};
bpmjs._TestObserve.B.__rtti = "<class path=\"bpmjs._TestObserve.B\" params=\"\" private=\"1\" module=\"bpmjs.TestObserve\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<observeCalledCount public=\"1\"><c path=\"Int\"/></observeCalledCount>\n\t<observe public=\"1\" set=\"method\" line=\"44\"><f a=\"a\">\n\t<c path=\"bpmjs._TestObserve.A\"/>\n\t<e path=\"Void\"/>\n</f></observe>\n\t<new public=\"1\" set=\"method\" line=\"38\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs.integration._TestMessaging.Config.__rtti = "<class path=\"bpmjs.integration._TestMessaging.Config\" params=\"\" private=\"1\" module=\"bpmjs.integration.TestMessaging\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<a public=\"1\"><c path=\"bpmjs.integration._TestMessaging.A\"/></a>\n\t<b public=\"1\"><c path=\"bpmjs.integration._TestMessaging.B\"/></b>\n\t<new public=\"1\" set=\"method\" line=\"116\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs.integration._TestMessaging.ConfigWithMessenger.__rtti = "<class path=\"bpmjs.integration._TestMessaging.ConfigWithMessenger\" params=\"\" private=\"1\" module=\"bpmjs.integration.TestMessaging\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<a public=\"1\"><c path=\"bpmjs.integration._TestMessaging.AWithMessenger\"/></a>\n\t<b public=\"1\"><c path=\"bpmjs.integration._TestMessaging.B\"/></b>\n\t<new public=\"1\" set=\"method\" line=\"128\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs.integration._TestMessaging.A.__meta__ = { fields : { handleComplete : { Complete : null}}};
bpmjs.integration._TestMessaging.AWithMessenger.__meta__ = { fields : { messenger : { Messenger : null}, handleComplete : { Complete : null}}};
bpmjs.integration._TestMessaging.AWithMessenger.__rtti = "<class path=\"bpmjs.integration._TestMessaging.AWithMessenger\" params=\"\" private=\"1\" module=\"bpmjs.integration.TestMessaging\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<messenger public=\"1\"><c path=\"bpmjs.Messenger\"/></messenger>\n\t<handleComplete public=\"1\" set=\"method\" line=\"153\"><f a=\"\"><e path=\"Void\"/></f></handleComplete>\n\t<new public=\"1\" set=\"method\" line=\"150\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs.integration._TestMessaging.B.__meta__ = { fields : { handleStart : { Message : null}}};
bpmjs.integration._TestMessaging.B.__rtti = "<class path=\"bpmjs.integration._TestMessaging.B\" params=\"\" private=\"1\" module=\"bpmjs.integration.TestMessaging\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<handleStart public=\"1\" set=\"method\" line=\"167\"><f a=\"message\">\n\t<c path=\"bpmjs.integration.Message\"/>\n\t<e path=\"Void\"/>\n</f></handleStart>\n\t<new public=\"1\" set=\"method\" line=\"161\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
reflect.ClassInfo.cache = new Hash();
bpmjs._TestSequencer.TestConfig.__rtti = "<class path=\"bpmjs._TestSequencer.TestConfig\" params=\"\" private=\"1\" module=\"bpmjs.TestSequencer\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<launcher public=\"1\"><c path=\"bpmjs._TestSequencer.Launcher\"/></launcher>\n\t<sequencer public=\"1\"><c path=\"bpmjs.Sequencer\"/></sequencer>\n\t<s1 public=\"1\"><c path=\"bpmjs._TestSequencer.S1\"/></s1>\n\t<new public=\"1\" set=\"method\" line=\"33\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestSequencer.Launcher.__meta__ = { fields : { sequencer : { Inject : null}, handleContextPostComplete : { PostComplete : null}}};
bpmjs._TestSequencer.Launcher.__rtti = "<class path=\"bpmjs._TestSequencer.Launcher\" params=\"\" private=\"1\" module=\"bpmjs.TestSequencer\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<sequencer public=\"1\"><c path=\"bpmjs.Sequencer\"/></sequencer>\n\t<handleContextPostComplete public=\"1\" set=\"method\" line=\"51\"><f a=\"\"><e path=\"Void\"/></f></handleContextPostComplete>\n\t<new public=\"1\" set=\"method\" line=\"46\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestSequencer.S1.__meta__ = { fields : { initPrepare : { Sequence : ["boot","initPrepare"]}, init : { Sequence : ["boot","init"]}}};
bpmjs._TestSequencer.S1.__rtti = "<class path=\"bpmjs._TestSequencer.S1\" params=\"\" private=\"1\" module=\"bpmjs.TestSequencer\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<initPrepare public=\"1\" set=\"method\" line=\"65\"><f a=\"\"><e path=\"Void\"/></f></initPrepare>\n\t<init public=\"1\" set=\"method\" line=\"71\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<new public=\"1\" set=\"method\" line=\"60\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
Log.filters = new Array();
Log.args = new Array();
bpmjs._TestComplete.TestConfigWithA.__rtti = "<class path=\"bpmjs._TestComplete.TestConfigWithA\" params=\"\" private=\"1\" module=\"bpmjs.TestComplete\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<a public=\"1\"><c path=\"bpmjs._TestComplete.A\"/></a>\n\t<new public=\"1\" set=\"method\" line=\"31\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs._TestComplete.A.__meta__ = { fields : { handleContextComplete : { Complete : null}, handleContextPostComplete : { PostComplete : null}}};
bpmjs._TestComplete.A.__rtti = "<class path=\"bpmjs._TestComplete.A\" params=\"\" private=\"1\" module=\"bpmjs.TestComplete\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<handleContextComplete public=\"1\" set=\"method\" line=\"44\"><f a=\"\"><e path=\"Void\"/></f></handleContextComplete>\n\t<handleContextPostComplete public=\"1\" set=\"method\" line=\"50\"><f a=\"\"><e path=\"Void\"/></f></handleContextPostComplete>\n\t<new public=\"1\" set=\"method\" line=\"39\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.scene.LayerState.OUT = new kumite.scene.LayerState("OUT");
kumite.scene.LayerState.IN = new kumite.scene.LayerState("IN");
kumite.scene.LayerState.KEEP = new kumite.scene.LayerState("KEEP");
reflect.CClassInt.__rtti = "<class path=\"reflect.CClassInt\" params=\"\" module=\"reflect.ClassInfoTest\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<int public=\"1\"><c path=\"Int\"/></int>\n</class>";
js.Lib.onerror = null;
TestRunner.main()