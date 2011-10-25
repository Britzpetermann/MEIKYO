$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof reflect=='undefined') reflect = {}
reflect.MetadataAware = function() { }
reflect.MetadataAware.__name__ = ["reflect","MetadataAware"];
reflect.MetadataAware.prototype.hasMetadata = null;
reflect.MetadataAware.prototype.__class__ = reflect.MetadataAware;
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
Rand = function() { }
Rand.__name__ = ["Rand"];
Rand["float"] = function(from,to) {
	return from + Math.random() * (to - from);
}
Rand["int"] = function(from,to) {
	return Std["int"](from + Math.random() * (to - from));
}
Rand.prototype.__class__ = Rand;
if(typeof kumite=='undefined') kumite = {}
if(!kumite.scene) kumite.scene = {}
kumite.scene.LayerLifecycle = function() { }
kumite.scene.LayerLifecycle.__name__ = ["kumite","scene","LayerLifecycle"];
kumite.scene.LayerLifecycle.prototype.init = null;
kumite.scene.LayerLifecycle.prototype.render = null;
kumite.scene.LayerLifecycle.prototype.renderTransition = null;
kumite.scene.LayerLifecycle.prototype.__class__ = kumite.scene.LayerLifecycle;
kumite.scene.Layer = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.scene.Layer.__name__ = ["kumite","scene","Layer"];
kumite.scene.Layer.prototype.layerId = null;
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
kumite.scene.DelegateLayer = function(lifecycle,layerId) { if( lifecycle === $_ ) return; {
	kumite.scene.Layer.call(this);
	this.lifecycle = lifecycle;
	this.layerId = layerId;
}}
kumite.scene.DelegateLayer.__name__ = ["kumite","scene","DelegateLayer"];
kumite.scene.DelegateLayer.__super__ = kumite.scene.Layer;
for(var k in kumite.scene.Layer.prototype ) kumite.scene.DelegateLayer.prototype[k] = kumite.scene.Layer.prototype[k];
kumite.scene.DelegateLayer.prototype.lifecycle = null;
kumite.scene.DelegateLayer.prototype.init = function() {
	try {
		this.lifecycle.init();
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				{
					Log.posInfo = { fileName : "DelegateLayer.hx", lineNumber : 25, className : "kumite.scene.DelegateLayer", methodName : "init"};
					if(Log.filter(LogLevel.ERROR)) {
						Log.fetchInput("Error initializing layer:\n" + this.layerId,e,null,null,null,null,null);
						console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
						Log.displayError(Log.createErrorMessage());
					}
				}
			}
		}
	}
}
kumite.scene.DelegateLayer.prototype.render = function() {
	try {
		this.lifecycle.render();
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				{
					Log.posInfo = { fileName : "DelegateLayer.hx", lineNumber : 37, className : "kumite.scene.DelegateLayer", methodName : "render"};
					if(Log.filter(LogLevel.ERROR)) {
						Log.fetchInput("Error rendering layer:\n" + this.layerId,e,null,null,null,null,null);
						console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
						Log.displayError(Log.createErrorMessage());
					}
				}
			}
		}
	}
}
kumite.scene.DelegateLayer.prototype.renderTransition = function(transitionContext) {
	try {
		this.lifecycle.renderTransition(transitionContext);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				{
					Log.posInfo = { fileName : "DelegateLayer.hx", lineNumber : 49, className : "kumite.scene.DelegateLayer", methodName : "renderTransition"};
					if(Log.filter(LogLevel.ERROR)) {
						Log.fetchInput("Error rendering layer:\n" + this.layerId,e,null,null,null,null,null);
						console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
						Log.displayError(Log.createErrorMessage());
					}
				}
			}
		}
	}
}
kumite.scene.DelegateLayer.prototype.toString = function() {
	return "[DelegateLayer " + reflect.ClassInfo.forInstance(this.lifecycle).name + "]";
}
kumite.scene.DelegateLayer.prototype.__class__ = kumite.scene.DelegateLayer;
if(!kumite.flyingman) kumite.flyingman = {}
kumite.flyingman.Sprite = function(p) { if( p === $_ ) return; {
	this.position = new Vec3();
	this.rotationY = 0;
}}
kumite.flyingman.Sprite.__name__ = ["kumite","flyingman","Sprite"];
kumite.flyingman.Sprite.prototype.position = null;
kumite.flyingman.Sprite.prototype.rotationY = null;
kumite.flyingman.Sprite.prototype.texture = null;
kumite.flyingman.Sprite.prototype.__class__ = kumite.flyingman.Sprite;
GLDisplayObject = function(p) { if( p === $_ ) return; {
	if(GLDisplayObject.nextId == null) GLDisplayObject.nextId = 0;
	this.id = GLDisplayObject.nextId;
	GLDisplayObject.nextId++;
	GLDisplayList.getDefault().initDisplayObject(this);
	this.skipDraw = false;
	this.alpha = 1;
	this.matrix = new Matrix4();
	this.graphic = new CanvasGraphic();
	this.setX(0);
	this.setY(0);
	this.setWidth(256);
	this.setHeight(128);
	this.setScaleX(1);
	this.setScaleY(1);
	this.transformIsInvalid = true;
	this.graphic.setWidth(this.width);
	this.graphic.setHeight(this.height);
}}
GLDisplayObject.__name__ = ["GLDisplayObject"];
GLDisplayObject.nextId = null;
GLDisplayObject.prototype.id = null;
GLDisplayObject.prototype.stage = null;
GLDisplayObject.prototype.skipDraw = null;
GLDisplayObject.prototype.alpha = null;
GLDisplayObject.prototype.x = null;
GLDisplayObject.prototype.y = null;
GLDisplayObject.prototype.width = null;
GLDisplayObject.prototype.height = null;
GLDisplayObject.prototype.scaleX = null;
GLDisplayObject.prototype.scaleY = null;
GLDisplayObject.prototype.transformIsInvalid = null;
GLDisplayObject.prototype.graphicIsInvalid = null;
GLDisplayObject.prototype.matrix = null;
GLDisplayObject.prototype.enterFrameSignaler = null;
GLDisplayObject.prototype.graphic = null;
GLDisplayObject.prototype.validateTransform = function() {
	if(this.transformIsInvalid) {
		this.graphic.setWidth(this.width);
		this.graphic.setHeight(this.height);
		this.transformIsInvalid = false;
		this.matrix.setIdentity();
		this.matrix.appendTranslation(this.x,this.y,0);
		this.matrix.appendScale(this.scaleX,this.scaleY,1);
	}
}
GLDisplayObject.prototype.validateGraphics = function() {
	this.setGraphicIsInvalid(false);
}
GLDisplayObject.prototype.toString = function() {
	return "DisplayObject: " + this.id;
}
GLDisplayObject.prototype.setX = function(value) {
	if(this.x != value) {
		this.x = value;
		this.transformIsInvalid = true;
	}
	return value;
}
GLDisplayObject.prototype.setY = function(value) {
	if(this.y != value) {
		this.y = value;
		this.transformIsInvalid = true;
	}
	return value;
}
GLDisplayObject.prototype.setScaleX = function(value) {
	if(this.scaleX != value) {
		this.scaleX = value;
		this.transformIsInvalid = true;
	}
	return value;
}
GLDisplayObject.prototype.setScaleY = function(value) {
	if(this.scaleY != value) {
		this.scaleY = value;
		this.transformIsInvalid = true;
	}
	return value;
}
GLDisplayObject.prototype.setWidth = function(value) {
	if(this.width != value) {
		this.width = value;
		this.graphic.setWidth(this.width);
		this.transformIsInvalid = true;
	}
	return value;
}
GLDisplayObject.prototype.setHeight = function(value) {
	if(this.height != value) {
		this.height = value;
		this.graphic.setHeight(this.height);
		this.transformIsInvalid = true;
	}
	return value;
}
GLDisplayObject.prototype.getGraphicIsInvalid = function() {
	return this.graphic.isInvalid;
}
GLDisplayObject.prototype.setGraphicIsInvalid = function(value) {
	this.graphic.isInvalid = value;
	return value;
}
GLDisplayObject.prototype.__class__ = GLDisplayObject;
GLInteractiveObject = function(p) { if( p === $_ ) return; {
	this.hitarea = new GLHitarea();
	this.hitarea.position.x = 0;
	this.hitarea.position.y = 0;
	GLDisplayObject.call(this);
	GLDisplayList.getDefault().initInteractiveObject(this);
}}
GLInteractiveObject.__name__ = ["GLInteractiveObject"];
GLInteractiveObject.__super__ = GLDisplayObject;
for(var k in GLDisplayObject.prototype ) GLInteractiveObject.prototype[k] = GLDisplayObject.prototype[k];
GLInteractiveObject.prototype.hitarea = null;
GLInteractiveObject.prototype.mouseDownSignaler = null;
GLInteractiveObject.prototype.setWidth = function(value) {
	var result = GLDisplayObject.prototype.setWidth.call(this,value);
	this.hitarea.size.x = result;
	return result;
}
GLInteractiveObject.prototype.setHeight = function(value) {
	var result = GLDisplayObject.prototype.setHeight.call(this,value);
	this.hitarea.size.y = result;
	return result;
}
GLInteractiveObject.prototype.__class__ = GLInteractiveObject;
if(typeof haxe=='undefined') haxe = {}
if(!haxe.rtti) haxe.rtti = {}
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
	var from = Log.posInfo.className + "." + Log.posInfo.methodName;
	return "[" + from + "] " + Log.args.join(" ");
}
Log.createErrorMessage = function() {
	var from = Log.posInfo.className + "." + Log.posInfo.methodName;
	return "[" + from + "]\n" + Log.args.join(" ");
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
Log.displayError = function(message) {
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
	null;
}
Log.prototype.__class__ = Log;
haxe.rtti.Infos = function() { }
haxe.rtti.Infos.__name__ = ["haxe","rtti","Infos"];
haxe.rtti.Infos.prototype.__class__ = haxe.rtti.Infos;
if(!kumite.framebuffereffect) kumite.framebuffereffect = {}
kumite.framebuffereffect.Config = function(p) { if( p === $_ ) return; {
	this.fbClearLayer1 = new kumite.layer.ClearLayer();
	this.fbClearLayer1.clearColor = new Color(1,0,0,1);
	this.fbClearLayer2 = new kumite.layer.ClearLayer();
	this.fbClearLayer2.clearColor = new Color(0,1,0,1);
	this.fbLayer = new kumite.framebuffereffect.FBLayer();
	this.fbEnableLayer = new kumite.framebuffereffect.FBEnableLayer();
	this.fbDisableLayer = new kumite.framebuffereffect.FBDisableLayer();
	this.fbTextureLayer = new kumite.framebuffereffect.FBTextureLayer();
	this.fbTextureLayer.texture = this.fbEnableLayer.framebuffer;
	this.scene = new kumite.scene.DefaultScene("FB TEST");
}}
kumite.framebuffereffect.Config.__name__ = ["kumite","framebuffereffect","Config"];
kumite.framebuffereffect.Config.prototype.displayListLayer = null;
kumite.framebuffereffect.Config.prototype.fbClearLayer1 = null;
kumite.framebuffereffect.Config.prototype.fbClearLayer2 = null;
kumite.framebuffereffect.Config.prototype.fbLayer = null;
kumite.framebuffereffect.Config.prototype.fbEnableLayer = null;
kumite.framebuffereffect.Config.prototype.fbDisableLayer = null;
kumite.framebuffereffect.Config.prototype.fbTextureLayer = null;
kumite.framebuffereffect.Config.prototype.scene = null;
kumite.framebuffereffect.Config.prototype.complete = function() {
	this.scene.addLayerLifecycle(this.fbClearLayer1,kumite.layer.LayerId.CLEAR);
	this.scene.addLayerLifecycle(this.fbEnableLayer);
	this.scene.addLayerLifecycle(this.fbClearLayer2);
	this.scene.addLayerLifecycle(this.fbLayer);
	this.scene.addLayerLifecycle(this.fbDisableLayer);
	this.scene.addLayerLifecycle(this.fbTextureLayer);
	this.scene.addLayerLifecycle(this.displayListLayer);
}
kumite.framebuffereffect.Config.prototype.__class__ = kumite.framebuffereffect.Config;
kumite.framebuffereffect.Config.__interfaces__ = [haxe.rtti.Infos];
GLDisplayListRenderer = function(p) { if( p === $_ ) return; {
	this.textures = new IntHash();
}}
GLDisplayListRenderer.__name__ = ["GLDisplayListRenderer"];
GLDisplayListRenderer.prototype.shaderProgram = null;
GLDisplayListRenderer.prototype.vertexPositionAttribute = null;
GLDisplayListRenderer.prototype.vertexBuffer = null;
GLDisplayListRenderer.prototype.textureUniform = null;
GLDisplayListRenderer.prototype.projectionMatrixUniform = null;
GLDisplayListRenderer.prototype.objectMatrixUniform = null;
GLDisplayListRenderer.prototype.sizeUniform = null;
GLDisplayListRenderer.prototype.alphaUniform = null;
GLDisplayListRenderer.prototype.textures = null;
GLDisplayListRenderer.prototype.init = function() {
	var gl = GL.gl;
	this.shaderProgram = GL.createProgram(shader.DisplayObjectVertex,shader.DisplayObjectFragment);
	this.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram,"vertexPosition");
	this.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
	var vertices = [0,0,1,0,0,1,1,1];
	gl.bufferData(gl.ARRAY_BUFFER,new Int8Array(vertices),gl.STATIC_DRAW);
	this.textureUniform = GL.getUniformLocation("texture");
	this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
	this.objectMatrixUniform = GL.getUniformLocation("objectMatrix");
	this.sizeUniform = GL.getUniformLocation("size");
	this.alphaUniform = GL.getUniformLocation("alpha");
}
GLDisplayListRenderer.prototype.render = function(width,height) {
	var gl = GL.gl;
	GL.useProgram(this.shaderProgram);
	gl.viewport(0,0,width,height);
	gl.disable(gl.DEPTH_TEST);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
	gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
	GL.gl.enableVertexAttribArray(this.vertexPositionAttribute);
	gl.vertexAttribPointer(this.vertexPositionAttribute,2,gl.BYTE,false,0,0);
	var projectionMatrix = new Matrix4();
	projectionMatrix.setOrtho(0,width,height,0,0,1);
	gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,projectionMatrix.buffer);
	var stage = GLDisplayList.getDefault().stage;
	gl.activeTexture(gl.TEXTURE0);
	gl.uniform1i(this.textureUniform.location,0);
	this.renderRecursive(stage,new Matrix4(),stage.alpha);
	gl.disable(gl.BLEND);
}
GLDisplayListRenderer.prototype.renderRecursive = function(displayObjectContainer,parentMatrix,alpha) {
	var _g = 0, _g1 = displayObjectContainer.children;
	while(_g < _g1.length) {
		var displayObject = _g1[_g];
		++_g;
		var matrix = this.renderDisplayObject(displayObject,parentMatrix,alpha);
		if(Std["is"](displayObject,GLDisplayObjectContainer)) {
			alpha *= displayObject.alpha;
			this.renderRecursive(displayObject,matrix,alpha);
		}
	}
}
GLDisplayListRenderer.prototype.renderDisplayObject = function(displayObject,parentMatrix,alpha) {
	var gl = GL.gl;
	displayObject.validateTransform();
	var result = new Matrix4();
	result.append(parentMatrix);
	result.append(displayObject.matrix);
	if(displayObject.skipDraw) return result;
	var texture;
	if(!this.textures.exists(displayObject.id)) {
		texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D,texture);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
		this.textures.set(displayObject.id,texture);
	}
	else {
		texture = this.textures.get(displayObject.id);
		gl.bindTexture(gl.TEXTURE_2D,texture);
	}
	if(displayObject.getGraphicIsInvalid()) {
		displayObject.validateGraphics();
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,displayObject.graphic.canvas);
	}
	gl.uniformMatrix4fv(this.objectMatrixUniform.location,false,result.buffer);
	gl.uniform2f(this.sizeUniform.location,displayObject.graphic.canvas.width,displayObject.graphic.canvas.height);
	gl.uniform1f(this.alphaUniform.location,displayObject.alpha * alpha);
	gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
	return result;
}
GLDisplayListRenderer.prototype.__class__ = GLDisplayListRenderer;
if(typeof bpmjs=='undefined') bpmjs = {}
bpmjs.TaskError = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs.TaskError.__name__ = ["bpmjs","TaskError"];
bpmjs.TaskError.prototype.task = null;
bpmjs.TaskError.prototype.error = null;
bpmjs.TaskError.prototype.__class__ = bpmjs.TaskError;
Color = function(r,g,b,a) { if( r === $_ ) return; {
	if(a == null) a = 1.0;
	if(b == null) b = 1.0;
	if(g == null) g = 0.0;
	if(r == null) r = 1.0;
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}}
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
GLAttribLocation = function(p) { if( p === $_ ) return; {
	null;
}}
GLAttribLocation.__name__ = ["GLAttribLocation"];
GLAttribLocation.prototype.location = null;
GLAttribLocation.prototype.size = null;
GLAttribLocation.prototype.type = null;
GLAttribLocation.prototype.buffer = null;
GLAttribLocation.prototype.currentLength = null;
GLAttribLocation.prototype.updateBuffer = function(arrayBuffer,type) {
	if(type == null) type = 35044;
	if(this.buffer != null) GL.gl.deleteBuffer(this.buffer);
	this.currentLength = arrayBuffer.byteLength;
	this.buffer = GL.createArrayBuffer(arrayBuffer,type);
}
GLAttribLocation.prototype.updateBuffer2 = function(arrayBuffer,type) {
	if(type == null) type = 35044;
	GL.gl.bindBuffer(34962,this.buffer);
	GL.gl.bufferData(34962,arrayBuffer,type);
}
GLAttribLocation.prototype.updateBuffer3 = function(arrayBuffer) {
	GL.gl.bindBuffer(34962,this.buffer);
	GL.gl.bufferSubData(34962,0,arrayBuffer);
}
GLAttribLocation.prototype.vertexAttribPointer = function() {
	GL.gl.bindBuffer(34962,this.buffer);
	GL.gl.enableVertexAttribArray(this.location);
	GL.gl.vertexAttribPointer(this.location,this.size,this.type,false,0,0);
}
GLAttribLocation.prototype.drawArrays = function(mode,first,count) {
	if(first == null) first = 0;
	if(count == null) {
		count = this.currentLength / this.size;
		if(this.type == 5126) count /= 4;
	}
	GL.gl.drawArrays(mode,first,count);
}
GLAttribLocation.prototype.__class__ = GLAttribLocation;
kumite.scene.Config = function(p) { if( p === $_ ) return; {
	this.scenes = new kumite.scene.Scenes();
	this.sceneNavigator = new kumite.scene.SceneNavigator();
}}
kumite.scene.Config.__name__ = ["kumite","scene","Config"];
kumite.scene.Config.prototype.scenes = null;
kumite.scene.Config.prototype.sceneNavigator = null;
kumite.scene.Config.prototype.__class__ = kumite.scene.Config;
kumite.scene.Config.__interfaces__ = [haxe.rtti.Infos];
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
if(!kumite.canvas) kumite.canvas = {}
kumite.canvas.CanvasCase = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.canvas.CanvasCase.__name__ = ["kumite","canvas","CanvasCase"];
kumite.canvas.CanvasCase.prototype.itself = null;
kumite.canvas.CanvasCase.prototype.__class__ = kumite.canvas.CanvasCase;
if(!kumite.stage) kumite.stage = {}
kumite.stage.Config = function(p) { if( p === $_ ) return; {
	this.stage = new kumite.stage.Stage();
	this.stageResizeAction = new kumite.stage.StageResizeAction();
}}
kumite.stage.Config.__name__ = ["kumite","stage","Config"];
kumite.stage.Config.prototype.stage = null;
kumite.stage.Config.prototype.stageResizeAction = null;
kumite.stage.Config.prototype.__class__ = kumite.stage.Config;
kumite.stage.Config.__interfaces__ = [haxe.rtti.Infos];
Matrix4 = function(p) { if( p === $_ ) return; {
	this.buffer = new Float32Array(Matrix4.IDENTITY_BUFFER);
}}
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
	if(eyex == atx && eyey == aty && eyez == atz) {
		this.setIdentity();
	}
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
	}
	else {
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
	}
	else {
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
GLDisplayObjectContainer = function(p) { if( p === $_ ) return; {
	GLDisplayObject.call(this);
	this.children = new Array();
}}
GLDisplayObjectContainer.__name__ = ["GLDisplayObjectContainer"];
GLDisplayObjectContainer.__super__ = GLDisplayObject;
for(var k in GLDisplayObject.prototype ) GLDisplayObjectContainer.prototype[k] = GLDisplayObject.prototype[k];
GLDisplayObjectContainer.prototype.children = null;
GLDisplayObjectContainer.prototype.addChild = function(child) {
	this.children.push(child);
}
GLDisplayObjectContainer.prototype.removeChild = function(child) {
	this.children.remove(child);
}
GLDisplayObjectContainer.prototype.__class__ = GLDisplayObjectContainer;
GLStage = function(p) { if( p === $_ ) return; {
	GLDisplayObjectContainer.call(this);
}}
GLStage.__name__ = ["GLStage"];
GLStage.__super__ = GLDisplayObjectContainer;
for(var k in GLDisplayObjectContainer.prototype ) GLStage.prototype[k] = GLDisplayObjectContainer.prototype[k];
GLStage.prototype.stageWidth = null;
GLStage.prototype.stageHeight = null;
GLStage.prototype.__class__ = GLStage;
kumite.scene.SceneLifecycle = function() { }
kumite.scene.SceneLifecycle.__name__ = ["kumite","scene","SceneLifecycle"];
kumite.scene.SceneLifecycle.prototype.sceneInit = null;
kumite.scene.SceneLifecycle.prototype.initTransition = null;
kumite.scene.SceneLifecycle.prototype.renderTransition = null;
kumite.scene.SceneLifecycle.prototype.render = null;
kumite.scene.SceneLifecycle.prototype.__class__ = kumite.scene.SceneLifecycle;
if(!kumite.testscene) kumite.testscene = {}
kumite.testscene.TestScene4 = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.testscene.TestScene4.__name__ = ["kumite","testscene","TestScene4"];
kumite.testscene.TestScene4.prototype.testClearLayer = null;
kumite.testscene.TestScene4.prototype.testLayer2 = null;
kumite.testscene.TestScene4.prototype.testLayer3 = null;
kumite.testscene.TestScene4.prototype.textureLayer2 = null;
kumite.testscene.TestScene4.prototype.colorLayer4 = null;
kumite.testscene.TestScene4.prototype.displayList = null;
kumite.testscene.TestScene4.prototype.sceneInit = function(scene) {
	scene.id = scene.name = kumite.testscene.TestScene4.SCENE_ID;
	scene.addLayer(new kumite.scene.DelegateLayer(this.testClearLayer,kumite.layer.LayerId.CLEAR));
	scene.addLayer(new kumite.scene.DelegateLayer(this.colorLayer4));
	scene.addLayer(new kumite.scene.DelegateLayer(this.textureLayer2));
	scene.addLayer(new kumite.scene.DelegateLayer(this.testLayer2));
	scene.addLayer(new kumite.scene.DelegateLayer(this.testLayer3));
	scene.addLayer(new kumite.scene.DelegateLayer(this.displayList));
}
kumite.testscene.TestScene4.prototype.initTransition = function(transitionContext) {
	this.textureLayer2.alphaTransition.ease = $closure(ease.Quad,"easeInOut");
	this.colorLayer4.alphaTransition.ease = $closure(ease.Quad,"easeInOut");
	var $e = transitionContext.direction;
	switch( $e[1] ) {
	case 0:
	{
		this.colorLayer4.transitions.enableChild("alpha");
		this.textureLayer2.transitions.enableChild("alpha");
	}break;
	case 1:
	{
		this.colorLayer4.transitions.enableChild("cut");
		this.textureLayer2.transitions.enableChild("cut");
	}break;
	}
}
kumite.testscene.TestScene4.prototype.renderTransition = function(transitionContext) {
	null;
}
kumite.testscene.TestScene4.prototype.render = function() {
	null;
}
kumite.testscene.TestScene4.prototype.__class__ = kumite.testscene.TestScene4;
kumite.testscene.TestScene4.__interfaces__ = [haxe.rtti.Infos,kumite.scene.SceneLifecycle];
IntHash = function(p) { if( p === $_ ) return; {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
}}
IntHash.__name__ = ["IntHash"];
IntHash.prototype.h = null;
IntHash.prototype.set = function(key,value) {
	this.h[key] = value;
}
IntHash.prototype.get = function(key) {
	return this.h[key];
}
IntHash.prototype.exists = function(key) {
	return this.h[key] != null;
}
IntHash.prototype.remove = function(key) {
	if(this.h[key] == null) return false;
	delete(this.h[key]);
	return true;
}
IntHash.prototype.keys = function() {
	var a = new Array();
	
			for( x in this.h )
				a.push(x);
		;
	return a.iterator();
}
IntHash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref[i];
	}};
}
IntHash.prototype.toString = function() {
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
IntHash.prototype.__class__ = IntHash;
if(!kumite.layer) kumite.layer = {}
kumite.layer.TestLayer = function(p) { if( p === $_ ) return; {
	this.color = new Color(1,1,0,0.5);
	this.scale = 1;
	this.position = new Vec3(0,0,0);
	this.transitionAlpha = 1;
}}
kumite.layer.TestLayer.__name__ = ["kumite","layer","TestLayer"];
kumite.layer.TestLayer.prototype.stage = null;
kumite.layer.TestLayer.prototype.time = null;
kumite.layer.TestLayer.prototype.projection = null;
kumite.layer.TestLayer.prototype.camera = null;
kumite.layer.TestLayer.prototype.color = null;
kumite.layer.TestLayer.prototype.scale = null;
kumite.layer.TestLayer.prototype.position = null;
kumite.layer.TestLayer.prototype.transitionAlpha = null;
kumite.layer.TestLayer.prototype.shaderProgram = null;
kumite.layer.TestLayer.prototype.vertexPositionAttribute = null;
kumite.layer.TestLayer.prototype.vertexBuffer = null;
kumite.layer.TestLayer.prototype.projectionMatrixUniform = null;
kumite.layer.TestLayer.prototype.worldViewMatrixUniform = null;
kumite.layer.TestLayer.prototype.colorUniform = null;
kumite.layer.TestLayer.prototype.init = function() {
	this.shaderProgram = GL.createProgram(kumite.layer._TestLayer.Vertex,kumite.layer._TestLayer.Fragment);
	this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
	this.vertexPositionAttribute.updateBuffer(new Int8Array([-1,-1,1,-1,-1,1,1,1]));
	this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
	this.worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
	this.colorUniform = GL.getUniformLocation("color");
}
kumite.layer.TestLayer.prototype.renderTransition = function(transitionContext) {
	this.transitionAlpha = transitionContext.getTransition();
	this.render();
}
kumite.layer.TestLayer.prototype.render = function() {
	GL.useProgram(this.shaderProgram);
	GL.gl.viewport(0,0,this.stage.width,this.stage.height);
	GL.gl.disable(2929);
	GL.gl.enable(3042);
	GL.gl.blendFunc(770,771);
	GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,this.projection.matrix.buffer);
	this.vertexPositionAttribute.vertexAttribPointer();
	var worldViewMatrix = new Matrix4();
	worldViewMatrix.appendScale(this.scale,this.scale,this.scale);
	worldViewMatrix.appendTranslation(this.position.x,this.position.y,this.position.z);
	worldViewMatrix.appendRotation(this.time.ms / 4000,new Vec3(1,1,1).normalize());
	worldViewMatrix.append(this.camera.matrix);
	GL.gl.uniformMatrix4fv(this.worldViewMatrixUniform.location,false,worldViewMatrix.buffer);
	var colorWithTransition = this.color.clone();
	colorWithTransition.a *= this.transitionAlpha;
	GL.gl.uniform4f(this.colorUniform.location,colorWithTransition.r,colorWithTransition.g,colorWithTransition.b,colorWithTransition.a);
	this.vertexPositionAttribute.drawArrays(5);
}
kumite.layer.TestLayer.prototype.__class__ = kumite.layer.TestLayer;
kumite.layer.TestLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
if(!kumite.layer._TestLayer) kumite.layer._TestLayer = {}
kumite.layer._TestLayer.Vertex = function() { }
kumite.layer._TestLayer.Vertex.__name__ = ["kumite","layer","_TestLayer","Vertex"];
kumite.layer._TestLayer.Vertex.prototype.__class__ = kumite.layer._TestLayer.Vertex;
kumite.layer._TestLayer.Fragment = function() { }
kumite.layer._TestLayer.Fragment.__name__ = ["kumite","layer","_TestLayer","Fragment"];
kumite.layer._TestLayer.Fragment.prototype.__class__ = kumite.layer._TestLayer.Fragment;
kumite.testscene.TestScene3 = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.testscene.TestScene3.__name__ = ["kumite","testscene","TestScene3"];
kumite.testscene.TestScene3.prototype.testClearLayer = null;
kumite.testscene.TestScene3.prototype.testLayer1 = null;
kumite.testscene.TestScene3.prototype.testLayer3 = null;
kumite.testscene.TestScene3.prototype.textureLayer1 = null;
kumite.testscene.TestScene3.prototype.colorLayer3 = null;
kumite.testscene.TestScene3.prototype.displayList = null;
kumite.testscene.TestScene3.prototype.sceneInit = function(scene) {
	scene.id = scene.name = kumite.testscene.TestScene3.SCENE_ID;
	scene.addLayer(new kumite.scene.DelegateLayer(this.testClearLayer,kumite.layer.LayerId.CLEAR));
	scene.addLayer(new kumite.scene.DelegateLayer(this.colorLayer3));
	scene.addLayer(new kumite.scene.DelegateLayer(this.textureLayer1));
	scene.addLayer(new kumite.scene.DelegateLayer(this.testLayer1));
	scene.addLayer(new kumite.scene.DelegateLayer(this.testLayer3));
	scene.addLayer(new kumite.scene.DelegateLayer(this.displayList));
}
kumite.testscene.TestScene3.prototype.initTransition = function(transitionContext) {
	this.textureLayer1.alphaTransition.ease = $closure(ease.Quad,"easeInOut");
	this.colorLayer3.alphaTransition.ease = $closure(ease.Quad,"easeInOut");
	var $e = transitionContext.direction;
	switch( $e[1] ) {
	case 0:
	{
		this.colorLayer3.transitions.enableChild("alpha");
		this.textureLayer1.transitions.enableChild("alpha");
	}break;
	case 1:
	{
		this.colorLayer3.transitions.enableChild("cut");
		this.textureLayer1.transitions.enableChild("cut");
	}break;
	}
}
kumite.testscene.TestScene3.prototype.renderTransition = function(transitionContext) {
	null;
}
kumite.testscene.TestScene3.prototype.render = function() {
	null;
}
kumite.testscene.TestScene3.prototype.__class__ = kumite.testscene.TestScene3;
kumite.testscene.TestScene3.__interfaces__ = [haxe.rtti.Infos,kumite.scene.SceneLifecycle];
kumite.scene.LayerState = function(name) { if( name === $_ ) return; {
	this.name = name;
}}
kumite.scene.LayerState.__name__ = ["kumite","scene","LayerState"];
kumite.scene.LayerState.prototype.name = null;
kumite.scene.LayerState.prototype.__class__ = kumite.scene.LayerState;
if(!kumite.mouse) kumite.mouse = {}
kumite.mouse.MouseController = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.mouse.MouseController.__name__ = ["kumite","mouse","MouseController"];
kumite.mouse.MouseController.prototype.canvas = null;
kumite.mouse.MouseController.prototype.start = function() {
	GLMouseRegistry.getInstance().init(this.canvas.itself);
}
kumite.mouse.MouseController.prototype.__class__ = kumite.mouse.MouseController;
kumite.mouse.MouseController.__interfaces__ = [haxe.rtti.Infos];
kumite.testscene.TestScene2 = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.testscene.TestScene2.__name__ = ["kumite","testscene","TestScene2"];
kumite.testscene.TestScene2.prototype.testClearLayer = null;
kumite.testscene.TestScene2.prototype.testLayer1 = null;
kumite.testscene.TestScene2.prototype.testLayer2 = null;
kumite.testscene.TestScene2.prototype.colorLayer2 = null;
kumite.testscene.TestScene2.prototype.displayListLayer = null;
kumite.testscene.TestScene2.prototype.sceneInit = function(scene) {
	scene.id = scene.name = kumite.testscene.TestScene2.SCENE_ID;
	scene.addLayer(new kumite.scene.DelegateLayer(this.testClearLayer,kumite.layer.LayerId.CLEAR));
	scene.addLayer(new kumite.scene.DelegateLayer(this.colorLayer2));
	scene.addLayer(new kumite.scene.DelegateLayer(this.testLayer1));
	scene.addLayer(new kumite.scene.DelegateLayer(this.testLayer2));
	scene.addLayer(new kumite.scene.DelegateLayer(this.displayListLayer));
}
kumite.testscene.TestScene2.prototype.initTransition = function(transitionContext) {
	this.colorLayer2.moveTransition.ease = $closure(ease.Back,"easeInOut");
	this.colorLayer2.moveTransition.direction = 1;
	this.colorLayer2.transitions.enableChild("move");
	var $e = transitionContext.direction;
	switch( $e[1] ) {
	case 0:
	{
		switch(transitionContext.outScene.scene.id) {
		case kumite.testscene.TestScene1.SCENE_ID:case kumite.testscene.TestScene2.SCENE_ID:{
			null;
		}break;
		default:{
			this.colorLayer2.moveTransition.direction = -1;
		}break;
		}
	}break;
	case 1:
	{
		switch(transitionContext.inScene.scene.id) {
		case kumite.testscene.TestScene1.SCENE_ID:case kumite.testscene.TestScene2.SCENE_ID:{
			null;
		}break;
		default:{
			this.colorLayer2.transitions.enableChild("cut");
		}break;
		}
	}break;
	}
}
kumite.testscene.TestScene2.prototype.renderTransition = function(transitionContext) {
	null;
}
kumite.testscene.TestScene2.prototype.render = function() {
	null;
}
kumite.testscene.TestScene2.prototype.__class__ = kumite.testscene.TestScene2;
kumite.testscene.TestScene2.__interfaces__ = [haxe.rtti.Infos,kumite.scene.SceneLifecycle];
GLFrame = function(p) { if( p === $_ ) return; {
	null;
}}
GLFrame.__name__ = ["GLFrame"];
GLFrame.prototype.time = null;
GLFrame.prototype.timer = null;
GLFrame.prototype.frameTime = null;
GLFrame.prototype.__class__ = GLFrame;
GLCursorClient = function(p) { if( p === $_ ) return; {
	this.lastCursor = "";
}}
GLCursorClient.__name__ = ["GLCursorClient"];
GLCursorClient.prototype.lastCursor = null;
GLCursorClient.prototype.defaultCursor = function() {
	if(this.lastCursor != GLCursorClient.DEFAULT) {
		this.lastCursor = GLCursorClient.DEFAULT;
		GLMouseRegistry.getInstance().setCursor(this.lastCursor);
	}
}
GLCursorClient.prototype.handCursor = function(message) {
	if(this.lastCursor != GLCursorClient.HAND) {
		this.lastCursor = GLCursorClient.HAND;
		GLMouseRegistry.getInstance().setCursor(this.lastCursor);
		if(message != null) js.Lib.window.status = message;
	}
}
GLCursorClient.prototype.__class__ = GLCursorClient;
bpmjs.Task = function(p) { if( p === $_ ) return; {
	this.startSignaler = new hsl.haxe.DirectSignaler(this);
	this.completeSignaler = new hsl.haxe.DirectSignaler(this);
	this.errorSignaler = new hsl.haxe.DirectSignaler(this);
	this.setMonitor(new bpmjs.ProgressMonitor());
}}
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
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
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
	}
}
bpmjs.Task.prototype.doStart = function() {
	null;
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
bpmjs.ImageLoaderTask = function(location) { if( location === $_ ) return; {
	bpmjs.Task.call(this);
	this.location = location;
	this.getMonitor().name = location;
}}
bpmjs.ImageLoaderTask.__name__ = ["bpmjs","ImageLoaderTask"];
bpmjs.ImageLoaderTask.__super__ = bpmjs.Task;
for(var k in bpmjs.Task.prototype ) bpmjs.ImageLoaderTask.prototype[k] = bpmjs.Task.prototype[k];
bpmjs.ImageLoaderTask.prototype.location = null;
bpmjs.ImageLoaderTask.prototype.image = null;
bpmjs.ImageLoaderTask.prototype.timer = null;
bpmjs.ImageLoaderTask.prototype.doStart = function() {
	this.getMonitor().name = this.location;
	this.image = new Image();
	this.image.onload = $closure(this,"handleImageLoaded");
	this.image.src = this.location;
}
bpmjs.ImageLoaderTask.prototype.handleImageLoaded = function() {
	this.complete();
}
bpmjs.ImageLoaderTask.prototype.doComplete = function() {
	this.timer.stop();
	this.complete();
}
bpmjs.ImageLoaderTask.prototype.__class__ = bpmjs.ImageLoaderTask;
kumite.testscene.TestScene1 = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.testscene.TestScene1.__name__ = ["kumite","testscene","TestScene1"];
kumite.testscene.TestScene1.prototype.testClearLayer = null;
kumite.testscene.TestScene1.prototype.displayList = null;
kumite.testscene.TestScene1.prototype.colorLayer1 = null;
kumite.testscene.TestScene1.prototype.sceneInit = function(scene) {
	scene.id = scene.name = kumite.testscene.TestScene1.SCENE_ID;
	scene.addLayer(new kumite.scene.DelegateLayer(this.testClearLayer,kumite.layer.LayerId.CLEAR));
	scene.addLayer(new kumite.scene.DelegateLayer(this.colorLayer1));
	scene.addLayer(new kumite.scene.DelegateLayer(this.displayList));
}
kumite.testscene.TestScene1.prototype.initTransition = function(transitionContext) {
	this.colorLayer1.moveTransition.ease = $closure(ease.Back,"easeInOut");
	this.colorLayer1.moveTransition.direction = -1;
	this.colorLayer1.transitions.enableChild("move");
	var $e = transitionContext.direction;
	switch( $e[1] ) {
	case 0:
	{
		null;
	}break;
	case 1:
	{
		switch(transitionContext.inScene.scene.id) {
		case kumite.testscene.TestScene1.SCENE_ID:case kumite.testscene.TestScene2.SCENE_ID:{
			null;
		}break;
		default:{
			this.colorLayer1.transitions.enableChild("cut");
		}break;
		}
	}break;
	}
}
kumite.testscene.TestScene1.prototype.renderTransition = function(transitionContext) {
	null;
}
kumite.testscene.TestScene1.prototype.render = function() {
	null;
}
kumite.testscene.TestScene1.prototype.__class__ = kumite.testscene.TestScene1;
kumite.testscene.TestScene1.__interfaces__ = [haxe.rtti.Infos,kumite.scene.SceneLifecycle];
if(typeof hsl=='undefined') hsl = {}
if(!hsl.haxe) hsl.haxe = {}
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
hsl.haxe.DirectSignaler = function(subject,rejectNullData) { if( subject === $_ ) return; {
	if(null == subject) {
		throw new haxe.exception.ArgumentNullException("subject",1);
	}
	this.subject = subject;
	this.rejectNullData = rejectNullData;
	this.sentinel = new hsl.haxe._DirectSignaler.SentinelBond();
}}
hsl.haxe.DirectSignaler.__name__ = ["hsl","haxe","DirectSignaler"];
hsl.haxe.DirectSignaler.prototype.bubblingTargets = null;
hsl.haxe.DirectSignaler.prototype.isListenedTo = null;
hsl.haxe.DirectSignaler.prototype.notificationTargets = null;
hsl.haxe.DirectSignaler.prototype.rejectNullData = null;
hsl.haxe.DirectSignaler.prototype.sentinel = null;
hsl.haxe.DirectSignaler.prototype.subject = null;
hsl.haxe.DirectSignaler.prototype.subjectClassNames = null;
hsl.haxe.DirectSignaler.prototype.addBubblingTarget = function(value) {
	if(null == this.bubblingTargets) {
		this.bubblingTargets = new List();
	}
	this.bubblingTargets.add(value);
}
hsl.haxe.DirectSignaler.prototype.addNotificationTarget = function(value) {
	if(null == this.notificationTargets) {
		this.notificationTargets = new List();
	}
	this.notificationTargets.add(value);
}
hsl.haxe.DirectSignaler.prototype.bind = function(listener) {
	if(null == listener) {
		throw new haxe.exception.ArgumentNullException("listener",1);
	}
	return this.sentinel.add(new hsl.haxe._DirectSignaler.RegularBond(listener));
}
hsl.haxe.DirectSignaler.prototype.bindAdvanced = function(listener) {
	if(null == listener) {
		throw new haxe.exception.ArgumentNullException("listener",1);
	}
	return this.sentinel.add(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
}
hsl.haxe.DirectSignaler.prototype.bindVoid = function(listener) {
	if(null == listener) {
		throw new haxe.exception.ArgumentNullException("listener",1);
	}
	return this.sentinel.add(new hsl.haxe._DirectSignaler.NiladicBond(listener));
}
hsl.haxe.DirectSignaler.prototype.bubble = function(data,origin) {
	if(null != this.bubblingTargets) {
		{ var $it0 = this.bubblingTargets.iterator();
		while( $it0.hasNext() ) { var bubblingTarget = $it0.next();
		{
			bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 109, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
		}
		}}
	}
	if(null != this.notificationTargets) {
		{ var $it1 = this.notificationTargets.iterator();
		while( $it1.hasNext() ) { var notificationTarget = $it1.next();
		{
			notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 114, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
		}
		}}
	}
}
hsl.haxe.DirectSignaler.prototype.dispatch = function(data,origin,positionInformation) {
	if("dispatchNative" != positionInformation.methodName && "bubble" != positionInformation.methodName) {
		this.verifyCaller(positionInformation);
	}
	if(this.rejectNullData && null == data) {
		throw new haxe.exception.Exception("Some data that was passed is null, but this signaler has been set to reject null data.",null,1);
	}
	origin = null == origin?this.subject:origin;
	if(3 == this.sentinel.callListener(data,this.subject,origin,3)) {
		{
			if(null != this.bubblingTargets) {
				{ var $it0 = this.bubblingTargets.iterator();
				while( $it0.hasNext() ) { var bubblingTarget = $it0.next();
				{
					bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 109, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
				}
				}}
			}
			if(null != this.notificationTargets) {
				{ var $it1 = this.notificationTargets.iterator();
				while( $it1.hasNext() ) { var notificationTarget = $it1.next();
				{
					notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 114, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
				}
				}}
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
	if(null == this.subjectClassNames) {
		this.subjectClassNames = haxe.TypeTools.getClassNames(this.subject);
	}
	{ var $it0 = this.subjectClassNames.iterator();
	while( $it0.hasNext() ) { var subjectClassName = $it0.next();
	{
		if(subjectClassName == positionInformation.className) {
			return;
		}
	}
	}}
	throw new haxe.exception.Exception("This method may only be called by the subject of the signaler.",null,2);
}
hsl.haxe.DirectSignaler.prototype.removeBubblingTarget = function(value) {
	if(null != this.bubblingTargets) {
		this.bubblingTargets.remove(value);
	}
}
hsl.haxe.DirectSignaler.prototype.removeNotificationTarget = function(value) {
	if(null != this.notificationTargets) {
		this.notificationTargets.remove(value);
	}
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
hsl.haxe.Bond = function(p) { if( p === $_ ) return; {
	this.halted = false;
}}
hsl.haxe.Bond.__name__ = ["hsl","haxe","Bond"];
hsl.haxe.Bond.prototype.halted = null;
hsl.haxe.Bond.prototype.willDestroyOnUse = null;
hsl.haxe.Bond.prototype.destroy = function() {
	null;
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
if(!hsl.haxe._DirectSignaler) hsl.haxe._DirectSignaler = {}
hsl.haxe._DirectSignaler.LinkedBond = function(p) { if( p === $_ ) return; {
	hsl.haxe.Bond.call(this);
	this.destroyed = false;
}}
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
hsl.haxe._DirectSignaler.SentinelBond = function(p) { if( p === $_ ) return; {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.next = this.previous = this;
}}
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
hsl.haxe._DirectSignaler.RegularBond = function(listener) { if( listener === $_ ) return; {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
}}
hsl.haxe._DirectSignaler.RegularBond.__name__ = ["hsl","haxe","_DirectSignaler","RegularBond"];
hsl.haxe._DirectSignaler.RegularBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.RegularBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.RegularBond.prototype.listener = null;
hsl.haxe._DirectSignaler.RegularBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	if(false == this.halted) {
		this.listener(data);
		if(this.willDestroyOnUse) {
			if(false == this.destroyed) {
				this.previous.next = this.next;
				this.next.previous = this.previous;
				this.destroyed = true;
			}
		}
	}
	return propagationStatus;
}
hsl.haxe._DirectSignaler.RegularBond.prototype.determineEquals = function(value) {
	return Std["is"](value,hsl.haxe._DirectSignaler.RegularBond) && Reflect.compareMethods(value.listener,this.listener);
}
hsl.haxe._DirectSignaler.RegularBond.prototype.__class__ = hsl.haxe._DirectSignaler.RegularBond;
hsl.haxe._DirectSignaler.NiladicBond = function(listener) { if( listener === $_ ) return; {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
}}
hsl.haxe._DirectSignaler.NiladicBond.__name__ = ["hsl","haxe","_DirectSignaler","NiladicBond"];
hsl.haxe._DirectSignaler.NiladicBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.NiladicBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.NiladicBond.prototype.listener = null;
hsl.haxe._DirectSignaler.NiladicBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	if(false == this.halted) {
		this.listener();
		if(this.willDestroyOnUse) {
			if(false == this.destroyed) {
				this.previous.next = this.next;
				this.next.previous = this.previous;
				this.destroyed = true;
			}
		}
	}
	return propagationStatus;
}
hsl.haxe._DirectSignaler.NiladicBond.prototype.determineEquals = function(value) {
	return Std["is"](value,hsl.haxe._DirectSignaler.NiladicBond) && Reflect.compareMethods(value.listener,this.listener);
}
hsl.haxe._DirectSignaler.NiladicBond.prototype.__class__ = hsl.haxe._DirectSignaler.NiladicBond;
hsl.haxe._DirectSignaler.AdvancedBond = function(listener) { if( listener === $_ ) return; {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
}}
hsl.haxe._DirectSignaler.AdvancedBond.__name__ = ["hsl","haxe","_DirectSignaler","AdvancedBond"];
hsl.haxe._DirectSignaler.AdvancedBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.AdvancedBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.AdvancedBond.prototype.listener = null;
hsl.haxe._DirectSignaler.AdvancedBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	if(this.halted == false) {
		var signal = new hsl.haxe.Signal(data,this,currentTarget,origin);
		this.listener(signal);
		if(this.willDestroyOnUse) {
			if(false == this.destroyed) {
				this.previous.next = this.next;
				this.next.previous = this.previous;
				this.destroyed = true;
			}
		}
		if(signal.immediatePropagationStopped) {
			return 1;
		}
		else if(signal.propagationStopped) {
			return 2;
		}
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
Vec3 = function(x,y,z) { if( x === $_ ) return; {
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.z = z;
}}
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
Vec3.prototype.cross = function(vec) {
	var x = this.y * vec.z - this.z * vec.y;
	var y = this.z * vec.x - this.x * vec.z;
	var z = this.x * vec.y - this.y * vec.x;
	return new Vec3(x,y,z);
}
Vec3.prototype.dot = function(vec) {
	return this.x * vec.x + this.y * vec.y + this.z * vec.z;
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
	}
	else if(vec3 != null) {
		this.x = vec3.x;
		this.y = vec3.y;
		this.z = vec3.z;
	}
}
Vec3.prototype.clone = function() {
	return new Vec3(this.x,this.y,this.z);
}
Vec3.prototype.__class__ = Vec3;
if(!kumite.spritemesh) kumite.spritemesh = {}
kumite.spritemesh.SpriteMeshLayer = function(p) { if( p === $_ ) return; {
	this.offset = -20000 + Math.random() * 40000;
	this.spriteRenderIndexes = new Uint32Array(kumite.spritemesh.SpriteMeshLayer.max);
	this.cameraMatrix = new Matrix4();
	this.transitions = new kumite.layer.LayerTransitions();
	this.transitions.add(this.alphaTransition = new kumite.layer.LayerTransition("alpha"));
	this.transitions.enableChild("alpha");
	this.alphaTransition.ease = $closure(ease.Quad,"easeInOut");
	this.cameraMatrix2 = new Matrix4();
}}
kumite.spritemesh.SpriteMeshLayer.__name__ = ["kumite","spritemesh","SpriteMeshLayer"];
kumite.spritemesh.SpriteMeshLayer.prototype.stage = null;
kumite.spritemesh.SpriteMeshLayer.prototype.time = null;
kumite.spritemesh.SpriteMeshLayer.prototype.projection = null;
kumite.spritemesh.SpriteMeshLayer.prototype.textureRegistry = null;
kumite.spritemesh.SpriteMeshLayer.prototype.transitions = null;
kumite.spritemesh.SpriteMeshLayer.prototype.alphaTransition = null;
kumite.spritemesh.SpriteMeshLayer.prototype.offset = null;
kumite.spritemesh.SpriteMeshLayer.prototype.textureFrequenceParam = null;
kumite.spritemesh.SpriteMeshLayer.prototype.textureAmpParam = null;
kumite.spritemesh.SpriteMeshLayer.prototype.sprites = null;
kumite.spritemesh.SpriteMeshLayer.prototype.cameraMatrix = null;
kumite.spritemesh.SpriteMeshLayer.prototype.shaderProgram = null;
kumite.spritemesh.SpriteMeshLayer.prototype.vertexBuffer = null;
kumite.spritemesh.SpriteMeshLayer.prototype.vertexPositionAttribute = null;
kumite.spritemesh.SpriteMeshLayer.prototype.vertexUVBuffer = null;
kumite.spritemesh.SpriteMeshLayer.prototype.vertexUVAttribute = null;
kumite.spritemesh.SpriteMeshLayer.prototype.vertexNormalBuffer = null;
kumite.spritemesh.SpriteMeshLayer.prototype.vertexNormalAttribute = null;
kumite.spritemesh.SpriteMeshLayer.prototype.cubeVerticesIndexBuffer = null;
kumite.spritemesh.SpriteMeshLayer.prototype.projectionMatrixUniform = null;
kumite.spritemesh.SpriteMeshLayer.prototype.alphaUniform = null;
kumite.spritemesh.SpriteMeshLayer.prototype.textureUniform = null;
kumite.spritemesh.SpriteMeshLayer.prototype.spriteRenderIndexes = null;
kumite.spritemesh.SpriteMeshLayer.prototype.spriteRenderIndexesCount = null;
kumite.spritemesh.SpriteMeshLayer.prototype.cameraMatrix2 = null;
kumite.spritemesh.SpriteMeshLayer.prototype.init = function() {
	this.sprites = new Array();
	{
		var _g1 = 0, _g = kumite.spritemesh.SpriteMeshLayer.max;
		while(_g1 < _g) {
			var i = _g1++;
			var image = kumite.spritemesh.Config.TEST_ATLAS.parts[Std["int"]((Math.sin(i * this.textureFrequenceParam) + 1) * this.textureAmpParam) % kumite.spritemesh.Config.TEST_ATLAS.parts.length];
			var sprite = new kumite.spritemesh.Sprite();
			sprite.image = image;
			this.sprites.push(sprite);
		}
	}
	this.initGl();
}
kumite.spritemesh.SpriteMeshLayer.prototype.renderTransition = function(transitionContext) {
	this.transitions.setTransition(transitionContext.getTransition());
	this.render();
}
kumite.spritemesh.SpriteMeshLayer.prototype.timems = null;
kumite.spritemesh.SpriteMeshLayer.prototype.render = function() {
	this.timems = this.time.ms * 0.15 + this.offset;
	this.renderGLInit();
	this.updateModel();
	this.updateIndexes();
	this.sortIndexes();
	this.updateBuffer();
	this.renderGL();
}
kumite.spritemesh.SpriteMeshLayer.prototype.renderGLInit = function() {
	GL.useProgram(this.shaderProgram);
	GL.gl.viewport(0,0,this.stage.width,this.stage.height);
	GL.gl.disable(2929);
	GL.gl.enable(3042);
	GL.gl.blendFunc(770,771);
}
kumite.spritemesh.SpriteMeshLayer.prototype.updateModel = function() {
	this.cameraMatrix2.setRotation(Math.sin(this.timems / 10000) * 0.4 + this.timems / 24000,kumite.spritemesh.SpriteMeshLayer.axis);
	this.cameraMatrix2.appendAffine(this.cameraMatrix);
	var scaleAmplitudeTemp1 = (1 - this.alphaTransition.getTransition()) * 1.35;
	var scaleAmplitude = 0.2 + scaleAmplitudeTemp1 * scaleAmplitudeTemp1 * scaleAmplitudeTemp1;
	var objectAmplitude1 = 30;
	var objectAmplitude2 = objectAmplitude1 / 3;
	var objectAmplitude3 = objectAmplitude1 / 2;
	{
		var _g1 = 0, _g = kumite.spritemesh.SpriteMeshLayer.max;
		while(_g1 < _g) {
			var i = _g1++;
			var sprite = this.sprites[i];
			var m = sprite.matrix;
			var scale = (Math.sin(-this.timems / 2000 + i * 3.440) * scaleAmplitude + 0.7) * 1.1;
			m.setScale(scale,scale,scale);
			m.appendRotationZAffine(Math.sin(-this.timems / 10700 * 3.442 + i * 3.442) * 10);
			m.appendRotationAffine(-this.timems / 5000 + i * 3.440,kumite.spritemesh.SpriteMeshLayer.axis);
			var tx = Math.sin(this.timems / 10700 + i * 3.442) * objectAmplitude1 + Math.cos(this.timems / 7000 - i * 3.439) * objectAmplitude2;
			var ty = Math.cos(this.timems / 17800 + i * 3.443) * objectAmplitude1;
			var tz = Math.cos(this.timems / 18000 - i * 3.441) * objectAmplitude1 + Math.cos(this.timems / 8000 - i * 3.440) * objectAmplitude3;
			m.appendTranslationAffine(tx,ty,tz);
			m.appendAffine(this.cameraMatrix2);
			sprite.transform();
		}
	}
}
kumite.spritemesh.SpriteMeshLayer.prototype.updateIndexes = function() {
	this.spriteRenderIndexesCount = 0;
	{
		var _g1 = 0, _g = kumite.spritemesh.SpriteMeshLayer.max;
		while(_g1 < _g) {
			var i = _g1++;
			var sprite = this.sprites[i];
			var D4 = -sprite.vertexes[2];
			if(D4 > 0) {
				var D3 = D4 / 500;
				if(D3 > 1) {
					{
						Log.posInfo = { fileName : "SpriteMeshLayer.hx", lineNumber : 180, className : "kumite.spritemesh.SpriteMeshLayer", methodName : "updateIndexes"};
						if(Log.filter(LogLevel.WARN)) {
							Log.fetchInput(D3,null,null,null,null,null,null);
							console.warn(Log.createMessage());
						}
					}
					D3 = 1;
				}
				var D10 = D3 * 65535;
				var D11 = Math.floor(D10);
				var D2 = D11 << 16;
				var D = D2 + i;
				this.spriteRenderIndexes[this.spriteRenderIndexesCount] = D;
				this.spriteRenderIndexesCount++;
			}
		}
	}
}
kumite.spritemesh.SpriteMeshLayer.prototype.sortIndexes = function() {
	this.quicksort(0,this.spriteRenderIndexesCount - 1);
}
kumite.spritemesh.SpriteMeshLayer.prototype.quicksort = function(lo,hi) {
	var i = lo;
	var j = hi;
	var buf = this.spriteRenderIndexes;
	var p = buf[lo + hi >> 1];
	while(i <= j) {
		while(this.spriteRenderIndexes[i] > p) i++;
		while(this.spriteRenderIndexes[j] < p) j--;
		if(i <= j) {
			var t = buf[i];
			buf[i++] = buf[j];
			buf[j--] = t;
		}
	}
	if(lo < j) this.quicksort(lo,j);
	if(i < hi) this.quicksort(i,hi);
}
kumite.spritemesh.SpriteMeshLayer.prototype.updateBuffer = function() {
	var vi = 0;
	var ni = 0;
	var ti = 0;
	{
		var _g1 = 0, _g = this.spriteRenderIndexesCount;
		while(_g1 < _g) {
			var i = _g1++;
			var spriteIndex = this.spriteRenderIndexes[i] & 65535;
			var sprite = this.sprites[spriteIndex];
			this.vertexBuffer[vi++] = sprite.vertexes[0];
			this.vertexBuffer[vi++] = sprite.vertexes[1];
			this.vertexBuffer[vi++] = sprite.vertexes[2];
			this.vertexBuffer[vi++] = sprite.vertexes[3];
			this.vertexBuffer[vi++] = sprite.vertexes[4];
			this.vertexBuffer[vi++] = sprite.vertexes[5];
			this.vertexBuffer[vi++] = sprite.vertexes[6];
			this.vertexBuffer[vi++] = sprite.vertexes[7];
			this.vertexBuffer[vi++] = sprite.vertexes[8];
			this.vertexBuffer[vi++] = sprite.vertexes[9];
			this.vertexBuffer[vi++] = sprite.vertexes[10];
			this.vertexBuffer[vi++] = sprite.vertexes[11];
			this.vertexNormalBuffer[ni++] = sprite.normals[0];
			this.vertexNormalBuffer[ni++] = sprite.normals[1];
			this.vertexNormalBuffer[ni++] = sprite.normals[2];
			this.vertexNormalBuffer[ni++] = sprite.normals[0];
			this.vertexNormalBuffer[ni++] = sprite.normals[1];
			this.vertexNormalBuffer[ni++] = sprite.normals[2];
			this.vertexNormalBuffer[ni++] = sprite.normals[0];
			this.vertexNormalBuffer[ni++] = sprite.normals[1];
			this.vertexNormalBuffer[ni++] = sprite.normals[2];
			this.vertexNormalBuffer[ni++] = sprite.normals[0];
			this.vertexNormalBuffer[ni++] = sprite.normals[1];
			this.vertexNormalBuffer[ni++] = sprite.normals[2];
			this.vertexUVBuffer[ti++] = sprite.image.u0;
			this.vertexUVBuffer[ti++] = sprite.image.v1;
			this.vertexUVBuffer[ti++] = sprite.image.u1;
			this.vertexUVBuffer[ti++] = sprite.image.v1;
			this.vertexUVBuffer[ti++] = sprite.image.u0;
			this.vertexUVBuffer[ti++] = sprite.image.v0;
			this.vertexUVBuffer[ti++] = sprite.image.u1;
			this.vertexUVBuffer[ti++] = sprite.image.v0;
		}
	}
}
kumite.spritemesh.SpriteMeshLayer.prototype.renderGL = function() {
	this.vertexUVAttribute.updateBuffer3(this.vertexUVBuffer);
	this.vertexPositionAttribute.updateBuffer3(this.vertexBuffer);
	this.vertexNormalAttribute.updateBuffer3(this.vertexNormalBuffer);
	this.vertexNormalAttribute.vertexAttribPointer();
	this.vertexPositionAttribute.vertexAttribPointer();
	this.vertexUVAttribute.vertexAttribPointer();
	GL.gl.bindBuffer(34963,this.cubeVerticesIndexBuffer);
	GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,this.projection.matrix.buffer);
	GL.gl.uniform1f(this.alphaUniform.location,this.alphaTransition.getTransition());
	{
		GL.gl.activeTexture(33984);
		GL.gl.bindTexture(3553,this.textureRegistry.get(kumite.spritemesh.Config.TEST_ATLAS).texture);
		GL.gl.uniform1i(this.textureUniform.location,0);
	}
	GL.gl.drawElements(4,this.spriteRenderIndexesCount * 6,5123,0);
}
kumite.spritemesh.SpriteMeshLayer.prototype.initGl = function() {
	this.shaderProgram = GL.createProgram(kumite.spritemesh._SpriteMeshLayer.Vertex,kumite.spritemesh._SpriteMeshLayer.Fragment);
	this.vertexBuffer = new Float32Array(kumite.spritemesh.SpriteMeshLayer.max * 12);
	{
		var _g1 = 0, _g = kumite.spritemesh.SpriteMeshLayer.max;
		while(_g1 < _g) {
			var i = _g1++;
			var j = i * 12;
			this.vertexBuffer[j] = -1;
			this.vertexBuffer[1 + j] = -1;
			this.vertexBuffer[2 + j] = 0;
			this.vertexBuffer[3 + j] = 1;
			this.vertexBuffer[4 + j] = -1;
			this.vertexBuffer[5 + j] = 0;
			this.vertexBuffer[6 + j] = -1;
			this.vertexBuffer[7 + j] = 1;
			this.vertexBuffer[8 + j] = 0;
			this.vertexBuffer[9 + j] = 1;
			this.vertexBuffer[10 + j] = 1;
			this.vertexBuffer[11 + j] = 0;
		}
	}
	this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",3,5126);
	this.vertexPositionAttribute.updateBuffer(this.vertexBuffer,35040);
	this.vertexNormalBuffer = new Float32Array(kumite.spritemesh.SpriteMeshLayer.max * 12);
	{
		var _g1 = 0, _g = kumite.spritemesh.SpriteMeshLayer.max;
		while(_g1 < _g) {
			var i = _g1++;
			var j = i * 12;
			this.vertexNormalBuffer[j] = -1;
			this.vertexNormalBuffer[1 + j] = -1;
			this.vertexNormalBuffer[2 + j] = 0;
			this.vertexNormalBuffer[3 + j] = 1;
			this.vertexNormalBuffer[4 + j] = -1;
			this.vertexNormalBuffer[5 + j] = 0;
			this.vertexNormalBuffer[6 + j] = -1;
			this.vertexNormalBuffer[7 + j] = 1;
			this.vertexNormalBuffer[8 + j] = 0;
			this.vertexNormalBuffer[9 + j] = 1;
			this.vertexNormalBuffer[10 + j] = 1;
			this.vertexNormalBuffer[11 + j] = 0;
		}
	}
	this.vertexNormalAttribute = GL.getAttribLocation2("vertexNormal",3,5126);
	this.vertexNormalAttribute.updateBuffer(this.vertexNormalBuffer,35040);
	this.vertexUVBuffer = new Float32Array(kumite.spritemesh.SpriteMeshLayer.max * 8);
	{
		var _g1 = 0, _g = kumite.spritemesh.SpriteMeshLayer.max;
		while(_g1 < _g) {
			var i = _g1++;
			var image = kumite.spritemesh.Config.TEST_ATLAS.parts[i % kumite.spritemesh.Config.TEST_ATLAS.parts.length];
			var j = i * 8;
			this.vertexUVBuffer[j] = image.u0;
			this.vertexUVBuffer[1 + j] = image.v1;
			this.vertexUVBuffer[2 + j] = image.u1;
			this.vertexUVBuffer[3 + j] = image.v1;
			this.vertexUVBuffer[4 + j] = image.u0;
			this.vertexUVBuffer[5 + j] = image.v0;
			this.vertexUVBuffer[6 + j] = image.u1;
			this.vertexUVBuffer[7 + j] = image.v0;
		}
	}
	this.vertexUVAttribute = GL.getAttribLocation2("vertexUV",2,5126);
	this.vertexUVAttribute.updateBuffer(this.vertexUVBuffer,35040);
	this.cubeVerticesIndexBuffer = GL.gl.createBuffer();
	GL.gl.bindBuffer(34963,this.cubeVerticesIndexBuffer);
	var elementIndexes = new Uint16Array(6 * kumite.spritemesh.SpriteMeshLayer.max);
	{
		var _g1 = 0, _g = kumite.spritemesh.SpriteMeshLayer.max;
		while(_g1 < _g) {
			var i = _g1++;
			var j = i * 6;
			var k = i * 4;
			elementIndexes[j] = k;
			elementIndexes[1 + j] = 1 + k;
			elementIndexes[2 + j] = 2 + k;
			elementIndexes[3 + j] = 1 + k;
			elementIndexes[4 + j] = 3 + k;
			elementIndexes[5 + j] = 2 + k;
		}
	}
	GL.gl.bufferData(34963,elementIndexes,35044);
	this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
	this.alphaUniform = GL.getUniformLocation("alpha");
	this.textureUniform = GL.getUniformLocation("texture");
	this.cameraMatrix = new Matrix4();
	this.cameraMatrix.setLookAt(new Vec3(0,0,80),new Vec3(0,0,0),new Vec3(0,1,0));
}
kumite.spritemesh.SpriteMeshLayer.prototype.__class__ = kumite.spritemesh.SpriteMeshLayer;
kumite.spritemesh.SpriteMeshLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
if(!kumite.spritemesh._SpriteMeshLayer) kumite.spritemesh._SpriteMeshLayer = {}
kumite.spritemesh._SpriteMeshLayer.Vertex = function() { }
kumite.spritemesh._SpriteMeshLayer.Vertex.__name__ = ["kumite","spritemesh","_SpriteMeshLayer","Vertex"];
kumite.spritemesh._SpriteMeshLayer.Vertex.prototype.__class__ = kumite.spritemesh._SpriteMeshLayer.Vertex;
kumite.spritemesh._SpriteMeshLayer.Fragment = function() { }
kumite.spritemesh._SpriteMeshLayer.Fragment.__name__ = ["kumite","spritemesh","_SpriteMeshLayer","Fragment"];
kumite.spritemesh._SpriteMeshLayer.Fragment.prototype.__class__ = kumite.spritemesh._SpriteMeshLayer.Fragment;
GLFramebuffer = function(p) { if( p === $_ ) return; {
	null;
}}
GLFramebuffer.__name__ = ["GLFramebuffer"];
GLFramebuffer.prototype.framebuffer = null;
GLFramebuffer.prototype.texture = null;
GLFramebuffer.prototype.width = null;
GLFramebuffer.prototype.height = null;
GLFramebuffer.prototype.__class__ = GLFramebuffer;
hsl.haxe.Signal = function(data,currentBond,currentTarget,origin) { if( data === $_ ) return; {
	this.data = data;
	this.currentBond = currentBond;
	this.currentTarget = currentTarget;
	this.origin = origin;
	this.immediatePropagationStopped = false;
	this.propagationStopped = false;
}}
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
Vec2 = function(x,y) { if( x === $_ ) return; {
	this.x = x;
	this.y = y;
}}
Vec2.__name__ = ["Vec2"];
Vec2.prototype.x = null;
Vec2.prototype.y = null;
Vec2.prototype.set = function(x,y) {
	this.x = x;
	this.y = y;
}
Vec2.prototype.scale = function(factor) {
	this.x *= factor;
	this.y *= factor;
}
Vec2.prototype.multiply = function(x,y) {
	this.x *= x;
	this.y *= y;
}
Vec2.prototype.subtract = function(x,y) {
	this.x -= x;
	this.y -= y;
}
Vec2.prototype.normalize = function() {
	var invLength = 1 / Math.sqrt(this.x * this.x + this.y * this.y);
	this.x *= invLength;
	this.y *= invLength;
}
Vec2.prototype.transform = function(matrix) {
	var x1 = this.x, y1 = this.y, z1 = 0, w1 = 1;
	var mat = matrix.buffer;
	this.x = mat[0] * x1 + mat[4] * y1 + mat[8] * z1 + mat[12] * w1;
	this.y = mat[1] * x1 + mat[5] * y1 + mat[9] * z1 + mat[13] * w1;
}
Vec2.prototype.clone = function() {
	return new Vec2(this.x,this.y);
}
Vec2.prototype.__class__ = Vec2;
bpmjs.Sequencer = function(p) { if( p === $_ ) return; {
	null;
}}
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
	sequence.start();
}
bpmjs.Sequencer.prototype.__class__ = bpmjs.Sequencer;
bpmjs.Sequencer.__interfaces__ = [haxe.rtti.Infos];
bpmjs.TaskGroup = function(p) { if( p === $_ ) return; {
	bpmjs.Task.call(this);
	this.tasks = new Array();
}}
bpmjs.TaskGroup.__name__ = ["bpmjs","TaskGroup"];
bpmjs.TaskGroup.__super__ = bpmjs.Task;
for(var k in bpmjs.Task.prototype ) bpmjs.TaskGroup.prototype[k] = bpmjs.Task.prototype[k];
bpmjs.TaskGroup.prototype.tasks = null;
bpmjs.TaskGroup.prototype.add = function(task) {
	this.tasks.push(task);
}
bpmjs.TaskGroup.prototype.doStart = function() {
	{
		var _g = 0, _g1 = this.tasks;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			this.getMonitor().append(task.getMonitor(),1 / this.tasks.length);
		}
	}
	this.nextTask();
}
bpmjs.TaskGroup.prototype.nextTask = function() {
	if(this.tasks.length > 0) {
		var task = this.tasks.shift();
		task.completeSignaler.bind($closure(this,"handleTaskComplete"));
		task.errorSignaler.bind($closure(this,"handleTaskError"));
		task.start();
	}
	else {
		this.complete();
	}
}
bpmjs.TaskGroup.prototype.handleTaskComplete = function(task) {
	this.nextTask();
}
bpmjs.TaskGroup.prototype.handleTaskError = function(taskError) {
	this.error(this,taskError.error);
}
bpmjs.TaskGroup.prototype.__class__ = bpmjs.TaskGroup;
bpmjs.Sequence = function(name) { if( name === $_ ) return; {
	bpmjs.TaskGroup.call(this);
	this.getMonitor().name = name;
	this.name = name;
	this.timer = new haxe.Timer(100);
	this.completeSignaler.bind($closure(this,"handleComplete"));
	this.errorSignaler.bind($closure(this,"handleError"));
}}
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
							Log.posInfo = { fileName : "Sequencer.hx", lineNumber : 85, className : "bpmjs.Sequence", methodName : "execute"};
							if(Log.filter(LogLevel.INFO)) {
								Log.fetchInput("Phase '" + localPhase + "' " + Type.getClassName(contextObject.type) + "#" + fieldName,null,null,null,null,null,null);
								console.info(Log.createMessage());
							}
						}
						try {
							var result = Reflect.field(object,fieldName).apply(object,[]);
							if(Std["is"](result,bpmjs.SequencerTaskGroup)) {
								{
									Log.posInfo = { fileName : "Sequencer.hx", lineNumber : 91, className : "bpmjs.Sequence", methodName : "execute"};
									if(Log.filter(LogLevel.INFO)) {
										Log.fetchInput("Adding task '",reflect.ClassInfo.forInstance(result).name,null,null,null,null,null);
										console.info(Log.createMessage());
									}
								}
								this.loadingTaskGroup.add(result);
							}
						}
						catch( $e0 ) {
							{
								var e = $e0;
								{
									throw "Phase '" + localPhase + "' " + Type.getClassName(contextObject.type) + "#" + fieldName + " created an error:\n" + Std.string(e);
								}
							}
						}
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
		{
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
}
bpmjs.Sequence.prototype.handleComplete = function(task) {
	this.handleProgress();
	this.timer.stop();
}
bpmjs.Sequence.prototype.handleError = function(error) {
	{
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
						if(localPhase == "error") {
							var result = Reflect.field(object,fieldName).apply(object,[error.error]);
						}
					}
				}
			}
		}
	}
	this.timer.stop();
}
bpmjs.Sequence.prototype.__class__ = bpmjs.Sequence;
bpmjs.ExecutePhaseTask = function(sequence,phase) { if( sequence === $_ ) return; {
	bpmjs.Task.call(this);
	this.getMonitor().name = "execute: " + phase;
	this.sequence = sequence;
	this.phase = phase;
}}
bpmjs.ExecutePhaseTask.__name__ = ["bpmjs","ExecutePhaseTask"];
bpmjs.ExecutePhaseTask.__super__ = bpmjs.Task;
for(var k in bpmjs.Task.prototype ) bpmjs.ExecutePhaseTask.prototype[k] = bpmjs.Task.prototype[k];
bpmjs.ExecutePhaseTask.prototype.sequence = null;
bpmjs.ExecutePhaseTask.prototype.phase = null;
bpmjs.ExecutePhaseTask.prototype.doStart = function() {
	try {
		this.sequence.execute(this.phase);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				this.error(this,Std.string(e));
				return;
			}
		}
	}
	this.complete();
}
bpmjs.ExecutePhaseTask.prototype.__class__ = bpmjs.ExecutePhaseTask;
bpmjs.LoadingTaskGroup = function(sequence) { if( sequence === $_ ) return; {
	bpmjs.TaskGroup.call(this);
	this.getMonitor().name = "loading";
}}
bpmjs.LoadingTaskGroup.__name__ = ["bpmjs","LoadingTaskGroup"];
bpmjs.LoadingTaskGroup.__super__ = bpmjs.TaskGroup;
for(var k in bpmjs.TaskGroup.prototype ) bpmjs.LoadingTaskGroup.prototype[k] = bpmjs.TaskGroup.prototype[k];
bpmjs.LoadingTaskGroup.prototype.__class__ = bpmjs.LoadingTaskGroup;
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
	if(value > 0) return 1;
	else if(value < 0) return -1;
	return 0;
}
Math2.prototype.__class__ = Math2;
kumite.flyingman.FlyingManLayer = function(p) { if( p === $_ ) return; {
	this.cameraMatrix = new Matrix4();
	this.viewMatrix = new Matrix4();
	this.transitions = new kumite.layer.LayerTransitions();
	this.transitions.add(this.alphaTransition = new kumite.layer.LayerTransition("alpha"));
	this.transitions.enableChild("alpha");
	this.alphaTransition.ease = $closure(ease.Quad,"easeInOut");
}}
kumite.flyingman.FlyingManLayer.__name__ = ["kumite","flyingman","FlyingManLayer"];
kumite.flyingman.FlyingManLayer.prototype.stage = null;
kumite.flyingman.FlyingManLayer.prototype.time = null;
kumite.flyingman.FlyingManLayer.prototype.projection = null;
kumite.flyingman.FlyingManLayer.prototype.graph = null;
kumite.flyingman.FlyingManLayer.prototype.cameraId = null;
kumite.flyingman.FlyingManLayer.prototype.transitions = null;
kumite.flyingman.FlyingManLayer.prototype.alphaTransition = null;
kumite.flyingman.FlyingManLayer.prototype.cameraMatrix = null;
kumite.flyingman.FlyingManLayer.prototype.viewMatrix = null;
kumite.flyingman.FlyingManLayer.prototype.shaderProgram = null;
kumite.flyingman.FlyingManLayer.prototype.vertexPositionAttribute = null;
kumite.flyingman.FlyingManLayer.prototype.vertexBuffer = null;
kumite.flyingman.FlyingManLayer.prototype.projectionMatrixUniform = null;
kumite.flyingman.FlyingManLayer.prototype.worldMatrixUniform = null;
kumite.flyingman.FlyingManLayer.prototype.viewMatrixUniform = null;
kumite.flyingman.FlyingManLayer.prototype.textureUniform = null;
kumite.flyingman.FlyingManLayer.prototype.alphaUniform = null;
kumite.flyingman.FlyingManLayer.prototype.init = function() {
	this.shaderProgram = GL.createProgram(kumite.flyingman._FlyingManLayer.Vertex,kumite.flyingman._FlyingManLayer.Fragment);
	this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
	this.vertexPositionAttribute.updateBuffer(new Int8Array([-1,-1,1,-1,-1,1,1,1]));
	this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
	this.worldMatrixUniform = GL.getUniformLocation("worldMatrix");
	this.viewMatrixUniform = GL.getUniformLocation("viewMatrix");
	this.textureUniform = GL.getUniformLocation("texture");
	this.alphaUniform = GL.getUniformLocation("alpha");
}
kumite.flyingman.FlyingManLayer.prototype.renderTransition = function(transitionContext) {
	this.transitions.setTransition(transitionContext.getTransition());
	this.render();
}
kumite.flyingman.FlyingManLayer.prototype.render = function() {
	GL.useProgram(this.shaderProgram);
	GL.gl.viewport(0,0,this.stage.width,this.stage.height);
	GL.gl.enable(2929);
	GL.gl.enable(3042);
	GL.gl.blendFunc(770,771);
	this.vertexPositionAttribute.vertexAttribPointer();
	GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,this.projection.matrix.buffer);
	switch(this.cameraId) {
	case "flyingMan1":{
		this.cameraMatrix.setFrom(this.graph.butterflyCloseupCamera2.matrix);
	}break;
	case "flyingMan2":{
		this.cameraMatrix.setLookAt(new Vec3(0,100,100),new Vec3(0,0,20),new Vec3(0,1,0));
	}break;
	case "flyingMan3":{
		this.cameraMatrix.setFrom(this.graph.butterflyCloseupCamera.matrix);
	}break;
	case "flyingMan4":{
		this.cameraMatrix.setLookAt(new Vec3(0,5,5),new Vec3(0,0,20),new Vec3(0,1,0));
	}break;
	}
	GL.gl.uniformMatrix4fv(this.worldMatrixUniform.location,false,this.cameraMatrix.buffer);
	var lastTexture = null;
	{
		var _g = 0, _g1 = this.graph.sprites;
		while(_g < _g1.length) {
			var sprite = _g1[_g];
			++_g;
			this.viewMatrix.setIdentity();
			this.viewMatrix.appendRotation(sprite.rotationY,new Vec3(0,1,0));
			this.viewMatrix.appendTranslation(sprite.position.x,sprite.position.y,sprite.position.z);
			GL.gl.uniformMatrix4fv(this.viewMatrixUniform.location,false,this.viewMatrix.buffer);
			if(sprite.texture != lastTexture) {
				lastTexture = sprite.texture;
				{
					GL.gl.activeTexture(33984);
					GL.gl.bindTexture(3553,lastTexture.texture);
					GL.gl.uniform1i(this.textureUniform.location,0);
				}
			}
			GL.gl.uniform1f(this.alphaUniform.location,this.alphaTransition.getTransition());
			this.vertexPositionAttribute.drawArrays(5);
		}
	}
}
kumite.flyingman.FlyingManLayer.prototype.__class__ = kumite.flyingman.FlyingManLayer;
kumite.flyingman.FlyingManLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
if(!kumite.flyingman._FlyingManLayer) kumite.flyingman._FlyingManLayer = {}
kumite.flyingman._FlyingManLayer.Vertex = function() { }
kumite.flyingman._FlyingManLayer.Vertex.__name__ = ["kumite","flyingman","_FlyingManLayer","Vertex"];
kumite.flyingman._FlyingManLayer.Vertex.prototype.__class__ = kumite.flyingman._FlyingManLayer.Vertex;
kumite.flyingman._FlyingManLayer.Fragment = function() { }
kumite.flyingman._FlyingManLayer.Fragment.__name__ = ["kumite","flyingman","_FlyingManLayer","Fragment"];
kumite.flyingman._FlyingManLayer.Fragment.prototype.__class__ = kumite.flyingman._FlyingManLayer.Fragment;
LogLevel = function(value) { if( value === $_ ) return; {
	this.value = value;
}}
LogLevel.__name__ = ["LogLevel"];
LogLevel.prototype.value = null;
LogLevel.prototype.isSmallerOrEqual = function(level) {
	return this.value <= level.value;
}
LogLevel.prototype.__class__ = LogLevel;
GLTextureConfig = function(p) { if( p === $_ ) return; {
	null;
}}
GLTextureConfig.__name__ = ["GLTextureConfig"];
GLTextureConfig.create = function(location,filter) {
	if(filter == null) filter = 9728;
	var result = new GLTextureConfig();
	result.location = location;
	result.textureId = location;
	result.filter = filter;
	return result;
}
GLTextureConfig.prototype.location = null;
GLTextureConfig.prototype.textureId = null;
GLTextureConfig.prototype.filter = null;
GLTextureConfig.prototype.toString = function() {
	return "[GLTextureConfig: " + this.location + " ]";
}
GLTextureConfig.prototype.__class__ = GLTextureConfig;
GLTextureAtlasConfig = function(p) { if( p === $_ ) return; {
	GLTextureConfig.call(this);
	this.parts = new Array();
}}
GLTextureAtlasConfig.__name__ = ["GLTextureAtlasConfig"];
GLTextureAtlasConfig.__super__ = GLTextureConfig;
for(var k in GLTextureConfig.prototype ) GLTextureAtlasConfig.prototype[k] = GLTextureConfig.prototype[k];
GLTextureAtlasConfig.create = function(width,height,filter) {
	if(filter == null) filter = 9728;
	GLTextureAtlasConfig.instanceCount++;
	var path = "atlas_" + GLTextureAtlasConfig.instanceCount;
	var result = new GLTextureAtlasConfig();
	result.textureId = path;
	result.filter = filter;
	result.width = width;
	result.height = height;
	return result;
}
GLTextureAtlasConfig.prototype.width = null;
GLTextureAtlasConfig.prototype.height = null;
GLTextureAtlasConfig.prototype.parts = null;
GLTextureAtlasConfig.prototype.add = function(part) {
	this.parts.push(part);
}
GLTextureAtlasConfig.prototype.toString = function() {
	return "[Atlas: " + this.parts.join(",") + " ]";
}
GLTextureAtlasConfig.prototype.__class__ = GLTextureAtlasConfig;
kumite.canvas.Config = function(p) { if( p === $_ ) return; {
	this.canvasCase = new kumite.canvas.CanvasCase();
	this.canvasController = new kumite.canvas.CanvasController();
}}
kumite.canvas.Config.__name__ = ["kumite","canvas","Config"];
kumite.canvas.Config.prototype.canvasCase = null;
kumite.canvas.Config.prototype.canvasController = null;
kumite.canvas.Config.prototype.__class__ = kumite.canvas.Config;
kumite.canvas.Config.__interfaces__ = [haxe.rtti.Infos];
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
if(!bpmjs._Messenger) bpmjs._Messenger = {}
bpmjs._Messenger.ReceiverForType = function(type,method) { if( type === $_ ) return; {
	this.type = type;
	this.method = method;
}}
bpmjs._Messenger.ReceiverForType.__name__ = ["bpmjs","_Messenger","ReceiverForType"];
bpmjs._Messenger.ReceiverForType.prototype.type = null;
bpmjs._Messenger.ReceiverForType.prototype.method = null;
bpmjs._Messenger.ReceiverForType.prototype.__class__ = bpmjs._Messenger.ReceiverForType;
kumite.scene.TransitionContext = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.scene.TransitionContext.__name__ = ["kumite","scene","TransitionContext"];
kumite.scene.TransitionContext.prototype.transition = null;
kumite.scene.TransitionContext.prototype.layerState = null;
kumite.scene.TransitionContext.prototype.inScene = null;
kumite.scene.TransitionContext.prototype.outScene = null;
kumite.scene.TransitionContext.prototype.direction = null;
kumite.scene.TransitionContext.prototype.toIn = function() {
	this.direction = kumite.scene.TransitionDirection.IN;
	return this;
}
kumite.scene.TransitionContext.prototype.toOut = function() {
	this.direction = kumite.scene.TransitionDirection.OUT;
	return this;
}
kumite.scene.TransitionContext.prototype.getTransition = function() {
	var $e = this.direction;
	switch( $e[1] ) {
	case 0:
	{
		return this.transition;
	}break;
	case 1:
	{
		return 1 - this.transition;
	}break;
	}
}
kumite.scene.TransitionContext.prototype.setTransition = function(value) {
	this.direction = kumite.scene.TransitionDirection.IN;
	this.transition = value;
	return value;
}
kumite.scene.TransitionContext.prototype.__class__ = kumite.scene.TransitionContext;
if(!kumite.displaylist) kumite.displaylist = {}
kumite.displaylist.ConfigAsLayer = function(p) { if( p === $_ ) return; {
	this.displayListLayer = new kumite.displaylist.DisplayListLayer();
}}
kumite.displaylist.ConfigAsLayer.__name__ = ["kumite","displaylist","ConfigAsLayer"];
kumite.displaylist.ConfigAsLayer.prototype.displayListLayer = null;
kumite.displaylist.ConfigAsLayer.prototype.__class__ = kumite.displaylist.ConfigAsLayer;
kumite.displaylist.ConfigAsLayer.__interfaces__ = [haxe.rtti.Infos];
if(!kumite.time) kumite.time = {}
kumite.time.Config = function(p) { if( p === $_ ) return; {
	this.time = new kumite.time.Time();
	this.timeController = new kumite.time.TimeController();
}}
kumite.time.Config.__name__ = ["kumite","time","Config"];
kumite.time.Config.prototype.time = null;
kumite.time.Config.prototype.timeController = null;
kumite.time.Config.prototype.__class__ = kumite.time.Config;
kumite.time.Config.__interfaces__ = [haxe.rtti.Infos];
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
GLTextureRegistry = function(p) { if( p === $_ ) return; {
	this.images = new Hash();
}}
GLTextureRegistry.__name__ = ["GLTextureRegistry"];
GLTextureRegistry.prototype.images = null;
GLTextureRegistry.prototype.register = function(key,texture) {
	this.images.set(key.textureId,texture);
}
GLTextureRegistry.prototype.get = function(key) {
	if(!this.images.exists(key.textureId)) {
		throw "Cannot find Texture with key: " + key.textureId;
	}
	return this.images.get(key.textureId);
}
GLTextureRegistry.prototype.createGLTextureFromImage = function(image,filter) {
	var testPowerOfTwoWidth = Std["int"](Math2.nextPowerOf2(image.width));
	var testPowerOfTwoHeight = Std["int"](Math2.nextPowerOf2(image.height));
	if(testPowerOfTwoWidth != image.width || testPowerOfTwoHeight != image.height) throw "Image size must be a valid texture size!";
	var texture = GL.gl.createTexture();
	GL.gl.bindTexture(3553,texture);
	GL.gl.texImage2D(3553,0,6408,6408,5121,image);
	GL.gl.texParameteri(3553,10240,filter != null?filter:9728);
	GL.gl.texParameteri(3553,10241,filter != null?filter:9728);
	if(filter == 9984 || filter == 9986 || filter == 9985 || filter == 9987) {
		GL.gl.generateMipmap(3553);
	}
	var result = new GLTexture();
	result.width = image.width;
	result.height = image.height;
	result.texture = texture;
	return result;
}
GLTextureRegistry.prototype.createGLTextureFromCanvas = function(canvas,filter) {
	var testPowerOfTwoWidth = Std["int"](Math2.nextPowerOf2(canvas.width));
	var testPowerOfTwoHeight = Std["int"](Math2.nextPowerOf2(canvas.height));
	if(testPowerOfTwoWidth != canvas.width || testPowerOfTwoHeight != canvas.height) throw "Canvas size must be a valid texture size!";
	var texture = GL.gl.createTexture();
	GL.gl.bindTexture(3553,texture);
	GL.gl.texImage2D(3553,0,6408,6408,5121,canvas);
	GL.gl.texParameteri(3553,10240,filter != null?filter:9728);
	GL.gl.texParameteri(3553,10241,filter != null?filter:9728);
	if(filter == 9984 || filter == 9986 || filter == 9985 || filter == 9987) {
		GL.gl.generateMipmap(3553);
	}
	var result = new GLTexture();
	result.width = canvas.width;
	result.height = canvas.height;
	result.texture = texture;
	return result;
}
GLTextureRegistry.prototype.updateGLTextureFromCanvas = function(texture,canvas) {
	var testPowerOfTwoWidth = Std["int"](Math2.nextPowerOf2(canvas.width));
	var testPowerOfTwoHeight = Std["int"](Math2.nextPowerOf2(canvas.height));
	if(testPowerOfTwoWidth != canvas.width || testPowerOfTwoHeight != canvas.height) throw "Canvas size must be a valid texture size!";
	GL.gl.bindTexture(3553,texture.texture);
	GL.gl.texImage2D(3553,0,6408,6408,5121,canvas);
	texture.width = canvas.width;
	texture.height = canvas.height;
}
GLTextureRegistry.prototype.__class__ = GLTextureRegistry;
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
	this.context.addObject("config",ci,config);
	{
		var _g = 0, _g1 = ci.getProperties();
		while(_g < _g1.length) {
			var property = _g1[_g];
			++_g;
			if(property.hasMetadata("Inject")) continue;
			var instance = Reflect.field(config,property.field.name);
			if(instance == null) {
				{
					Log.posInfo = { fileName : "ContextBuilder.hx", lineNumber : 92, className : "bpmjs.ContextBuilder", methodName : "createObjects"};
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
	if(!contextObject.classInfo.hasRtti) {
		Log.posInfo = { fileName : "ContextBuilder.hx", lineNumber : 127, className : "bpmjs.ContextBuilder", methodName : "wireContextObject"};
		if(Log.filter(LogLevel.WARN)) {
			Log.fetchInput("No RTTI for: ",contextObject.name,contextObject.classInfo.name,null,null,null,null);
			console.warn(Log.createMessage());
		}
	}
	{
		var _g = 0, _g1 = contextObject.classInfo.getProperties();
		while(_g < _g1.length) {
			var property = _g1[_g];
			++_g;
			if(property.hasMetadata("Inject")) {
				if(property.getClass() == bpmjs.Context) {
					contextObject.object[property.field.name] = this.context;
				}
				else {
					var objects = this.context.getDynamicObjectsByType(property.getClass());
					if(objects.length == 0) {
						{
							Log.posInfo = { fileName : "ContextBuilder.hx", lineNumber : 141, className : "bpmjs.ContextBuilder", methodName : "wireContextObject"};
							if(Log.filter(LogLevel.WARN)) {
								Log.fetchInput("Found [Inject] at object " + Type.getClassName(contextObject.type) + "#" + property.field.name + " but could not find object to inject.",null,null,null,null,null,null);
								console.warn(Log.createMessage());
							}
						}
					}
					else if(objects.length == 1) {
						contextObject.object[property.field.name] = objects.first().object;
					}
					else {
						var found = false;
						{ var $it0 = objects.iterator();
						while( $it0.hasNext() ) { var object = $it0.next();
						{
							if(object.name == property.field.name) {
								contextObject.object[property.field.name] = object.object;
								found = true;
								break;
							}
						}
						}}
						if(!found) throw "Multiple selection for type: " + reflect.ClassInfo.forCType(property.field.type).name + " and no name match for: " + property.field.name;
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
GLDisplayList = function(p) { if( p === $_ ) return; {
	this.lastFrameTime = Date.now().getTime();
	this.startTime = this.lastFrameTime;
	this.enterFrameSignaler = new hsl.haxe.DirectSignaler(this);
	this.hitareaPicker = new GLHitareaPicker();
	GLMouseRegistry.getInstance().mouseDownSignaler.bind($closure(this,"handleMouseDown"));
	GLMouseRegistry.getInstance().mouseMoveSignaler.bind($closure(this,"handleMouseMove"));
	this.cursorClient = GLMouseRegistry.getInstance().createCursorClient();
}}
GLDisplayList.__name__ = ["GLDisplayList"];
GLDisplayList.instance = null;
GLDisplayList.getDefault = function() {
	if(GLDisplayList.instance == null) {
		GLDisplayList.instance = new GLDisplayList();
		GLDisplayList.instance.stage = new GLStage();
		GLDisplayList.instance.initDisplayObject(GLDisplayList.instance.stage);
	}
	return GLDisplayList.instance;
}
GLDisplayList.prototype.stage = null;
GLDisplayList.prototype.hitareaPicker = null;
GLDisplayList.prototype.lastFrameTime = null;
GLDisplayList.prototype.startTime = null;
GLDisplayList.prototype.cursorClient = null;
GLDisplayList.prototype.enterFrameSignaler = null;
GLDisplayList.prototype.initDisplayObject = function(displayObject) {
	displayObject.stage = this.stage;
	displayObject.enterFrameSignaler = this.enterFrameSignaler;
}
GLDisplayList.prototype.initInteractiveObject = function(interactiveObject) {
	interactiveObject.mouseDownSignaler = new hsl.haxe.DirectSignaler(this);
}
GLDisplayList.prototype.setStageSize = function(width,height) {
	this.stage.stageWidth = width;
	this.stage.stageHeight = height;
}
GLDisplayList.prototype.dispatchEnterFrame = function() {
	var time = Date.now().getTime();
	var frame = new GLFrame();
	frame.time = time;
	frame.timer = time - this.startTime;
	frame.frameTime = time - this.lastFrameTime;
	this.lastFrameTime = time;
	this.enterFrameSignaler.dispatch(frame,null,{ fileName : "GLDisplayList.hx", lineNumber : 69, className : "GLDisplayList", methodName : "dispatchEnterFrame"});
}
GLDisplayList.prototype.handleMouseDown = function(position) {
	var result = this.hitareaPicker.pick(this.stage,position);
	if(result != null) {
		result.mouseDownSignaler.dispatch(result,null,{ fileName : "GLDisplayList.hx", lineNumber : 77, className : "GLDisplayList", methodName : "handleMouseDown"});
	}
}
GLDisplayList.prototype.handleMouseMove = function(position) {
	var result = this.hitareaPicker.pick(this.stage,position);
	if(result != null) this.cursorClient.handCursor();
	else this.cursorClient.defaultCursor();
}
GLDisplayList.prototype.__class__ = GLDisplayList;
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
					if(to.layers[bIndex].layerId == from.layers[aIndex].layerId) return true;
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
GLAnimationFrame = function() { }
GLAnimationFrame.__name__ = ["GLAnimationFrame"];
GLAnimationFrame.run = function(method,ms) {
	if(ms == null) ms = 0;
	var secureMethod = function() {
		try {
			method();
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					{
						Log.posInfo = { fileName : "GLAnimationFrame.hx", lineNumber : 16, className : "GLAnimationFrame", methodName : "run"};
						if(Log.filter(LogLevel.ERROR)) {
							Log.fetchInput("Error executing GLAnimationFrame: " + e,null,null,null,null,null,null);
							console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
							Log.displayError(Log.createErrorMessage());
						}
					}
				}
			}
		}
	}
	if(ms == 0) {
		var window = js.Lib.window;
		var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
		if(requestAnimationFrame == null) {
			var requester = function() {
				requestAnimationFrame(requester);
				secureMethod();
			}
			requestAnimationFrame(requester);
		}
		else {
			var timer = new haxe.Timer(Std["int"](1000 / 60));
			timer.run = secureMethod;
		}
	}
	else {
		var timer = new haxe.Timer(Std["int"](1000 / ms));
		timer.run = secureMethod;
	}
}
GLAnimationFrame.prototype.__class__ = GLAnimationFrame;
if(!kumite.projection) kumite.projection = {}
kumite.projection.ProjectionController = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.projection.ProjectionController.__name__ = ["kumite","projection","ProjectionController"];
kumite.projection.ProjectionController.prototype.projection = null;
kumite.projection.ProjectionController.prototype.stage = null;
kumite.projection.ProjectionController.prototype.fov = null;
kumite.projection.ProjectionController.prototype.near = null;
kumite.projection.ProjectionController.prototype.far = null;
kumite.projection.ProjectionController.prototype.init = function() {
	this.projection.matrix = new Matrix4();
	this.updateProjectionSizeFromStage();
}
kumite.projection.ProjectionController.prototype.updateProjectionSizeFromStage = function(message) {
	this.projection.matrix.setPerspective(this.fov,this.stage.getAspect(),this.near,this.far);
}
kumite.projection.ProjectionController.prototype.__class__ = kumite.projection.ProjectionController;
kumite.projection.ProjectionController.__interfaces__ = [haxe.rtti.Infos];
kumite.scene.Scenes = function(p) { if( p === $_ ) return; {
	this.all = new Array();
}}
kumite.scene.Scenes.__name__ = ["kumite","scene","Scenes"];
kumite.scene.Scenes.prototype.all = null;
kumite.scene.Scenes.prototype.getFirstScene = function() {
	return this.all[0];
}
kumite.scene.Scenes.prototype.getRandomScene = function() {
	return this.all[Std["int"](Math.random() * this.all.length)];
}
kumite.scene.Scenes.prototype.getSceneById = function(id) {
	{
		var _g = 0, _g1 = this.all;
		while(_g < _g1.length) {
			var result = _g1[_g];
			++_g;
			if(result.scene.id == id) return result;
		}
	}
	throw "Cannot find scene: " + id;
}
kumite.scene.Scenes.prototype.__class__ = kumite.scene.Scenes;
kumite.flyingman.Component = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.flyingman.Component.__name__ = ["kumite","flyingman","Component"];
kumite.flyingman.Component.prototype.sprite = null;
kumite.flyingman.Component.prototype.time = null;
kumite.flyingman.Component.prototype.init = function() {
	null;
}
kumite.flyingman.Component.prototype.update = function() {
	null;
}
kumite.flyingman.Component.prototype.__class__ = kumite.flyingman.Component;
kumite.flyingman.ButterflyCloseupCamera2 = function(p) { if( p === $_ ) return; {
	kumite.flyingman.Component.call(this);
}}
kumite.flyingman.ButterflyCloseupCamera2.__name__ = ["kumite","flyingman","ButterflyCloseupCamera2"];
kumite.flyingman.ButterflyCloseupCamera2.__super__ = kumite.flyingman.Component;
for(var k in kumite.flyingman.Component.prototype ) kumite.flyingman.ButterflyCloseupCamera2.prototype[k] = kumite.flyingman.Component.prototype[k];
kumite.flyingman.ButterflyCloseupCamera2.prototype.butterfly = null;
kumite.flyingman.ButterflyCloseupCamera2.prototype.matrix = null;
kumite.flyingman.ButterflyCloseupCamera2.prototype.eye = null;
kumite.flyingman.ButterflyCloseupCamera2.prototype.newEye = null;
kumite.flyingman.ButterflyCloseupCamera2.prototype.lookAt = null;
kumite.flyingman.ButterflyCloseupCamera2.prototype.lookAtOffset = null;
kumite.flyingman.ButterflyCloseupCamera2.prototype.lastUpdate = null;
kumite.flyingman.ButterflyCloseupCamera2.prototype.init = function() {
	this.matrix = new Matrix4();
	this.lastUpdate = this.time.ms;
	this.lookAtOffset = new Vec2(0,0);
	this.newEye = new Vec3();
	this.newEye.setFrom(null,this.getNewEyePosition());
	this.eye = this.newEye.clone();
	this.lookAt = this.getLookAtTarget().clone();
}
kumite.flyingman.ButterflyCloseupCamera2.prototype.update = function() {
	if(this.time.ms - this.lastUpdate > 5000) {
		this.lastUpdate = this.time.ms;
		this.newEye.setFrom(null,this.getNewEyePosition());
	}
	this.time.interpolateVec3To(this.eye,this.newEye,0.01);
	this.time.interpolateVec3To(this.lookAt,this.getLookAtTarget(),0.05);
	this.matrix.setLookAt(this.eye,this.lookAt,new Vec3(0,1,0));
}
kumite.flyingman.ButterflyCloseupCamera2.prototype.getLookAtTarget = function() {
	var result = this.butterfly.position.clone();
	result.x += this.lookAtOffset.x;
	result.y -= 3;
	result.z += this.lookAtOffset.y;
	return result;
}
kumite.flyingman.ButterflyCloseupCamera2.prototype.getNewEyePosition = function() {
	var v = this.butterfly.velocity.clone();
	v.y = 0;
	var result = this.butterfly.position.clone();
	result.x += v.x;
	result.y = 0.2;
	result.z += v.z;
	this.lookAtOffset.x = -5 + Math.random() * 10;
	this.lookAtOffset.y = -5 + Math.random() * 10;
	return result;
}
kumite.flyingman.ButterflyCloseupCamera2.prototype.__class__ = kumite.flyingman.ButterflyCloseupCamera2;
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
kumite.scene.SceneNavigator = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.scene.SceneNavigator.__name__ = ["kumite","scene","SceneNavigator"];
kumite.scene.SceneNavigator.prototype.scenes = null;
kumite.scene.SceneNavigator.prototype.time = null;
kumite.scene.SceneNavigator.prototype.transitionContext = null;
kumite.scene.SceneNavigator.prototype.initState = null;
kumite.scene.SceneNavigator.prototype.idleState = null;
kumite.scene.SceneNavigator.prototype.transitionState = null;
kumite.scene.SceneNavigator.prototype.currentScene = null;
kumite.scene.SceneNavigator.prototype.lastScene = null;
kumite.scene.SceneNavigator.prototype.state = null;
kumite.scene.SceneNavigator.prototype.init = function() {
	this.currentScene = new kumite.scene.SceneAndLifecycle();
	this.currentScene.scene = new kumite.scene.Scene();
	this.currentScene.scene.id = "";
	this.currentScene.scene.name = "";
	this.currentScene.lifecycle = new kumite.scene.NullSceneLifecycle();
	this.transitionContext = new kumite.scene.TransitionContext();
	this.initState = new kumite.scene.InitState(this);
	this.idleState = new kumite.scene.IdleState(this);
	this.transitionState = new kumite.scene.TransitionState(this);
	this.setState(this.initState);
}
kumite.scene.SceneNavigator.prototype.handleSceneLifecycleAdded = function(lifecycle) {
	var scene = new kumite.scene.Scene();
	var sceneAndLifecycle = new kumite.scene.SceneAndLifecycle();
	sceneAndLifecycle.scene = scene;
	sceneAndLifecycle.lifecycle = lifecycle;
	this.scenes.all.push(sceneAndLifecycle);
}
kumite.scene.SceneNavigator.prototype.start = function() {
	if(this.scenes.all.length == 0) {
		{
			Log.posInfo = { fileName : "SceneNavigator.hx", lineNumber : 64, className : "kumite.scene.SceneNavigator", methodName : "start"};
			if(Log.filter(LogLevel.WARN)) {
				Log.fetchInput("No scenes were added!",null,null,null,null,null,null);
				console.warn(Log.createMessage());
			}
		}
		return;
	}
	this.initAllLayers();
	this.enterScene(this.scenes.getFirstScene());
}
kumite.scene.SceneNavigator.prototype.handleSceneChangeRequest = function(message) {
	this.enterScene(this.scenes.getSceneById(message.sceneId));
}
kumite.scene.SceneNavigator.prototype.render = function(tick) {
	this.state.render();
}
kumite.scene.SceneNavigator.prototype.renderTransition = function() {
	var mixer = new kumite.scene.SceneMixer();
	var mixedScene = mixer.mix(this.lastScene.scene,this.currentScene.scene);
	this.lastScene.lifecycle.renderTransition(this.transitionContext.toIn());
	this.currentScene.lifecycle.renderTransition(this.transitionContext.toOut());
	{
		var _g = 0, _g1 = mixedScene.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			this.transitionContext.layerState = layer.state;
			switch(layer.state) {
			case kumite.scene.LayerState.IN:{
				layer.renderTransition(this.transitionContext.toIn());
			}break;
			case kumite.scene.LayerState.OUT:{
				layer.renderTransition(this.transitionContext.toOut());
			}break;
			case kumite.scene.LayerState.KEEP:{
				layer.render();
			}break;
			}
		}
	}
}
kumite.scene.SceneNavigator.prototype.initTransition = function() {
	this.lastScene.lifecycle.initTransition(this.transitionContext.toOut());
	this.currentScene.lifecycle.initTransition(this.transitionContext.toIn());
}
kumite.scene.SceneNavigator.prototype.renderNormal = function() {
	this.currentScene.lifecycle.render();
	{
		var _g = 0, _g1 = this.currentScene.scene.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			layer.render();
		}
	}
}
kumite.scene.SceneNavigator.prototype.enterScene = function(newScene) {
	if(this.state.allowsScreenChange && newScene != this.currentScene) {
		this.lastScene = this.currentScene;
		this.currentScene = newScene;
		this.setState(this.transitionState);
	}
}
kumite.scene.SceneNavigator.prototype.setState = function(state) {
	this.state = state;
	state.enter();
}
kumite.scene.SceneNavigator.prototype.initAllLayers = function() {
	{
		Log.posInfo = { fileName : "SceneNavigator.hx", lineNumber : 141, className : "kumite.scene.SceneNavigator", methodName : "initAllLayers"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput("Init all scenes and layers...",null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	var layerIdToLifecycle = new Hash();
	var autoLayerIndex = 0;
	var autoSceneIndex = 0;
	{
		var _g = 0, _g1 = this.scenes.all;
		while(_g < _g1.length) {
			var scene = _g1[_g];
			++_g;
			if(scene.scene.id == null) {
				scene.scene.id = "AUTO_" + autoSceneIndex;
				autoSceneIndex++;
			}
			scene.lifecycle.sceneInit(scene.scene);
			if(scene.scene.name == null) {
				scene.scene.name = scene.scene.id;
			}
			{
				var _g2 = 0, _g3 = scene.scene.layers;
				while(_g2 < _g3.length) {
					var layer = _g3[_g2];
					++_g2;
					{
						Log.posInfo = { fileName : "SceneNavigator.hx", lineNumber : 164, className : "kumite.scene.SceneNavigator", methodName : "initAllLayers"};
						if(Log.filter(LogLevel.INFO)) {
							Log.fetchInput("Init layer:",layer.layerId,null,null,null,null,null);
							console.info(Log.createMessage());
						}
					}
					if(layer.layerId == null) {
						if(Std["is"](layer,kumite.scene.DelegateLayer)) {
							var lifecycle = ((function($this) {
								var $r;
								var $t = layer;
								if(Std["is"]($t,kumite.scene.DelegateLayer)) $t;
								else throw "Class cast error";
								$r = $t;
								return $r;
							}(this))).lifecycle;
							{ var $it0 = layerIdToLifecycle.keys();
							while( $it0.hasNext() ) { var key = $it0.next();
							{
								if(layerIdToLifecycle.get(key) == lifecycle) {
									layer.layerId = key;
									{
										Log.posInfo = { fileName : "SceneNavigator.hx", lineNumber : 175, className : "kumite.scene.SceneNavigator", methodName : "initAllLayers"};
										if(Log.filter(LogLevel.INFO)) {
											Log.fetchInput("Reuse DelegateLayer:",layer.layerId,null,null,null,null,null);
											console.info(Log.createMessage());
										}
									}
									break;
								}
							}
							}}
						}
						if(layer.layerId == null) {
							layer.layerId = "layer_" + autoLayerIndex + ": " + layer;
							{
								Log.posInfo = { fileName : "SceneNavigator.hx", lineNumber : 184, className : "kumite.scene.SceneNavigator", methodName : "initAllLayers"};
								if(Log.filter(LogLevel.INFO)) {
									Log.fetchInput("auto add layer:",layer.layerId,null,null,null,null,null);
									console.info(Log.createMessage());
								}
							}
							autoLayerIndex++;
						}
					}
					if(Std["is"](layer,kumite.scene.DelegateLayer)) {
						layerIdToLifecycle.set(layer.layerId,((function($this) {
							var $r;
							var $t = layer;
							if(Std["is"]($t,kumite.scene.DelegateLayer)) $t;
							else throw "Class cast error";
							$r = $t;
							return $r;
						}(this))).lifecycle);
					}
					layer.init();
				}
			}
		}
	}
}
kumite.scene.SceneNavigator.prototype.__class__ = kumite.scene.SceneNavigator;
kumite.scene.SceneNavigator.__interfaces__ = [haxe.rtti.Infos];
kumite.scene.State = function(navigator) { if( navigator === $_ ) return; {
	this.navigator = navigator;
	this.time = navigator.time;
	this.transitionContext = navigator.transitionContext;
	this.configure();
}}
kumite.scene.State.__name__ = ["kumite","scene","State"];
kumite.scene.State.prototype.allowsScreenChange = null;
kumite.scene.State.prototype.transitionContext = null;
kumite.scene.State.prototype.navigator = null;
kumite.scene.State.prototype.time = null;
kumite.scene.State.prototype.enter = function() {
	null;
}
kumite.scene.State.prototype.render = function() {
	null;
}
kumite.scene.State.prototype.configure = function() {
	this.allowsScreenChange = false;
}
kumite.scene.State.prototype.__class__ = kumite.scene.State;
kumite.scene.InitState = function(navigator) { if( navigator === $_ ) return; {
	kumite.scene.State.call(this,navigator);
}}
kumite.scene.InitState.__name__ = ["kumite","scene","InitState"];
kumite.scene.InitState.__super__ = kumite.scene.State;
for(var k in kumite.scene.State.prototype ) kumite.scene.InitState.prototype[k] = kumite.scene.State.prototype[k];
kumite.scene.InitState.prototype.configure = function() {
	this.allowsScreenChange = true;
}
kumite.scene.InitState.prototype.__class__ = kumite.scene.InitState;
kumite.scene.IdleState = function(navigator) { if( navigator === $_ ) return; {
	kumite.scene.State.call(this,navigator);
}}
kumite.scene.IdleState.__name__ = ["kumite","scene","IdleState"];
kumite.scene.IdleState.__super__ = kumite.scene.State;
for(var k in kumite.scene.State.prototype ) kumite.scene.IdleState.prototype[k] = kumite.scene.State.prototype[k];
kumite.scene.IdleState.prototype.configure = function() {
	this.allowsScreenChange = true;
}
kumite.scene.IdleState.prototype.render = function() {
	this.navigator.renderNormal();
}
kumite.scene.IdleState.prototype.__class__ = kumite.scene.IdleState;
kumite.scene.TransitionState = function(navigator) { if( navigator === $_ ) return; {
	kumite.scene.State.call(this,navigator);
}}
kumite.scene.TransitionState.__name__ = ["kumite","scene","TransitionState"];
kumite.scene.TransitionState.__super__ = kumite.scene.State;
for(var k in kumite.scene.State.prototype ) kumite.scene.TransitionState.prototype[k] = kumite.scene.State.prototype[k];
kumite.scene.TransitionState.prototype.enterTime = null;
kumite.scene.TransitionState.prototype.exitTime = null;
kumite.scene.TransitionState.prototype.enter = function() {
	this.enterTime = this.time.ms;
	this.exitTime = this.time.ms + 1000;
	this.transitionContext.setTransition(0);
	this.transitionContext.outScene = this.navigator.lastScene;
	this.transitionContext.inScene = this.navigator.currentScene;
	this.navigator.initTransition();
}
kumite.scene.TransitionState.prototype.render = function() {
	this.transitionContext.setTransition(Map.linear(this.time.ms,this.enterTime,this.exitTime,0,1));
	if(this.transitionContext.getTransition() >= 1) {
		this.transitionContext.setTransition(1);
		this.navigator.setState(this.navigator.idleState);
	}
	this.navigator.renderTransition();
}
kumite.scene.TransitionState.prototype.__class__ = kumite.scene.TransitionState;
kumite.scene.NullSceneLifecycle = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.scene.NullSceneLifecycle.__name__ = ["kumite","scene","NullSceneLifecycle"];
kumite.scene.NullSceneLifecycle.prototype.sceneInit = function(scene) {
	null;
}
kumite.scene.NullSceneLifecycle.prototype.initTransition = function(transitionContext) {
	null;
}
kumite.scene.NullSceneLifecycle.prototype.renderTransition = function(transitionContext) {
	null;
}
kumite.scene.NullSceneLifecycle.prototype.render = function() {
	null;
}
kumite.scene.NullSceneLifecycle.prototype.__class__ = kumite.scene.NullSceneLifecycle;
kumite.scene.NullSceneLifecycle.__interfaces__ = [kumite.scene.SceneLifecycle];
kumite.time.Tick = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.time.Tick.__name__ = ["kumite","time","Tick"];
kumite.time.Tick.prototype.__class__ = kumite.time.Tick;
kumite.flyingman.ButterflyLife = function(p) { if( p === $_ ) return; {
	kumite.flyingman.Component.call(this);
}}
kumite.flyingman.ButterflyLife.__name__ = ["kumite","flyingman","ButterflyLife"];
kumite.flyingman.ButterflyLife.__super__ = kumite.flyingman.Component;
for(var k in kumite.flyingman.Component.prototype ) kumite.flyingman.ButterflyLife.prototype[k] = kumite.flyingman.Component.prototype[k];
kumite.flyingman.ButterflyLife.prototype.position = null;
kumite.flyingman.ButterflyLife.prototype.velocity = null;
kumite.flyingman.ButterflyLife.prototype.rotationY = null;
kumite.flyingman.ButterflyLife.prototype.init = function() {
	this.position = this.getNewPosition().clone();
	this.velocity = new Vec3(0,0.1,0);
	this.rotationY = 0;
}
kumite.flyingman.ButterflyLife.prototype.update = function() {
	var newPosition = this.getNewPosition();
	this.velocity = newPosition.clone().subtract(this.position.x,this.position.y,this.position.z);
	this.position.setFrom(null,newPosition);
	this.sprite.rotationY += 0.1;
	this.sprite.position.setFrom(null,this.position);
}
kumite.flyingman.ButterflyLife.prototype.getNewPosition = function() {
	var result = new Vec3();
	result.x = Math.sin(this.time.ms / 10000) * 70 + Math.sin(this.time.ms / 5000) * 20;
	result.y = 5 + Math.sin(this.time.ms / 20000) * 5;
	result.z = Math.cos(this.time.ms / 9000) * 70 + Math.cos(this.time.ms / 4000) * 20;
	return result;
}
kumite.flyingman.ButterflyLife.prototype.__class__ = kumite.flyingman.ButterflyLife;
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
kumite.canvas.CanvasController = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.canvas.CanvasController.__name__ = ["kumite","canvas","CanvasController"];
kumite.canvas.CanvasController.prototype.canvas = null;
kumite.canvas.CanvasController.prototype.stage = null;
kumite.canvas.CanvasController.prototype.initPrepare = function() {
	this.canvas.itself = js.Lib.document.getElementById("content");
}
kumite.canvas.CanvasController.prototype.init = function() {
	this.updateCanvasSizeFromStage();
}
kumite.canvas.CanvasController.prototype.updateCanvasSizeFromStage = function(message) {
	this.canvas.itself.width = this.stage.width;
	this.canvas.itself.height = this.stage.height;
}
kumite.canvas.CanvasController.prototype.__class__ = kumite.canvas.CanvasController;
kumite.canvas.CanvasController.__interfaces__ = [haxe.rtti.Infos];
if(!kumite.launch) kumite.launch = {}
kumite.launch.Launcher = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.launch.Launcher.__name__ = ["kumite","launch","Launcher"];
kumite.launch.Launcher.prototype.sequencer = null;
kumite.launch.Launcher.prototype.handlePostComplete = function() {
	this.sequencer.start("boot");
}
kumite.launch.Launcher.prototype.showError = function(message) {
	Log.posInfo = { fileName : "Launcher.hx", lineNumber : 25, className : "kumite.launch.Launcher", methodName : "showError"};
	if(Log.filter(LogLevel.ERROR)) {
		Log.fetchInput(message,null,null,null,null,null,null);
		console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
		Log.displayError(Log.createErrorMessage());
	}
}
kumite.launch.Launcher.prototype.__class__ = kumite.launch.Launcher;
kumite.launch.Launcher.__interfaces__ = [haxe.rtti.Infos];
kumite.testscene.Config = function(p) { if( p === $_ ) return; {
	this.testClearLayer = new kumite.layer.ClearLayer();
	this.colorLayer1 = new kumite.layer.ColorLayer();
	this.colorLayer1.color = new Color(0.5,0.5,0.5,1);
	this.colorLayer2 = new kumite.layer.ColorLayer();
	this.colorLayer2.color = new Color(0.7,0.7,0.7,1);
	this.colorLayer3 = new kumite.layer.ColorLayer();
	this.colorLayer3.color = new Color(0.0,0.0,0.0,1);
	this.colorLayer4 = new kumite.layer.ColorLayer();
	this.colorLayer4.color = new Color(0.0,0.0,0.0,1);
	this.textureLayer1 = new kumite.layer.TextureLayer();
	this.textureLayer1.textureConfig = kumite.testscene.Config.TEST1;
	this.textureLayer1.scale = 0.6;
	this.textureLayer2 = new kumite.layer.TextureLayer();
	this.textureLayer2.textureConfig = kumite.testscene.Config.TEST2;
	this.textureLayer2.scale = 0.6;
	this.testLayer1 = new kumite.layer.TestLayer();
	this.testLayer1.color = new Color(1,0,0,0.8);
	this.testLayer1.scale = 2;
	this.testLayer1.position = new Vec3(1,0,2);
	this.testLayer2 = new kumite.layer.TestLayer();
	this.testLayer2.color = new Color(0,1,0,0.6);
	this.testLayer2.scale = 2;
	this.testLayer2.position = new Vec3(-1,0,1);
	this.testLayer3 = new kumite.layer.TestLayer();
	this.testLayer3.color = new Color(0,0,1,0.4);
	this.testLayer3.scale = 2;
	this.testLayer3.position = new Vec3(-1,0,3);
	this.testScene1 = new kumite.testscene.TestScene1();
	this.testScene2 = new kumite.testscene.TestScene2();
	this.testScene3 = new kumite.testscene.TestScene3();
	this.testScene4 = new kumite.testscene.TestScene4();
}}
kumite.testscene.Config.__name__ = ["kumite","testscene","Config"];
kumite.testscene.Config.prototype.textureRegistry = null;
kumite.testscene.Config.prototype.testClearLayer = null;
kumite.testscene.Config.prototype.colorLayer1 = null;
kumite.testscene.Config.prototype.colorLayer2 = null;
kumite.testscene.Config.prototype.colorLayer3 = null;
kumite.testscene.Config.prototype.colorLayer4 = null;
kumite.testscene.Config.prototype.textureLayer1 = null;
kumite.testscene.Config.prototype.textureLayer2 = null;
kumite.testscene.Config.prototype.testLayer1 = null;
kumite.testscene.Config.prototype.testLayer2 = null;
kumite.testscene.Config.prototype.testLayer3 = null;
kumite.testscene.Config.prototype.testScene1 = null;
kumite.testscene.Config.prototype.testScene2 = null;
kumite.testscene.Config.prototype.testScene3 = null;
kumite.testscene.Config.prototype.testScene4 = null;
kumite.testscene.Config.prototype.startPrepare = function() {
	var group = new bpmjs.SequencerTaskGroup();
	group.add(new GLTextureLoadingTask(this.textureRegistry,kumite.testscene.Config.TEST1));
	group.add(new GLTextureLoadingTask(this.textureRegistry,kumite.testscene.Config.TEST2));
	return group;
}
kumite.testscene.Config.prototype.__class__ = kumite.testscene.Config;
kumite.testscene.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.layer.LayerTransition = function(name) { if( name === $_ ) return; {
	this.name = name;
	this.enabled = true;
	this.setTransition(1);
	this.direction = 1;
}}
kumite.layer.LayerTransition.__name__ = ["kumite","layer","LayerTransition"];
kumite.layer.LayerTransition.prototype.name = null;
kumite.layer.LayerTransition.prototype.enabled = null;
kumite.layer.LayerTransition.prototype.ease = null;
kumite.layer.LayerTransition.prototype.direction = null;
kumite.layer.LayerTransition.prototype.transition = null;
kumite.layer.LayerTransition.prototype.enable = function(enabled) {
	if(!enabled) this.setTransition(1);
	this.enabled = enabled;
}
kumite.layer.LayerTransition.prototype.getTransition = function() {
	if(this.ease == null) return this.transition;
	else return Map.ease(this.transition,0,1,0,1,this.ease);
}
kumite.layer.LayerTransition.prototype.setTransition = function(value) {
	if(this.enabled) this.transition = value;
	return this.getTransition();
}
kumite.layer.LayerTransition.prototype.__class__ = kumite.layer.LayerTransition;
kumite.spritemesh.Sprite = function(p) { if( p === $_ ) return; {
	this.matrix = new Matrix4();
	this.vertexes = new Float32Array(12);
	this.normals = new Float32Array(3);
}}
kumite.spritemesh.Sprite.__name__ = ["kumite","spritemesh","Sprite"];
kumite.spritemesh.Sprite.prototype.matrix = null;
kumite.spritemesh.Sprite.prototype.image = null;
kumite.spritemesh.Sprite.prototype.vertexes = null;
kumite.spritemesh.Sprite.prototype.normals = null;
kumite.spritemesh.Sprite.prototype.getZ = function() {
	return this.vertexes[2];
}
kumite.spritemesh.Sprite.prototype.transform = function() {
	var n11 = this.matrix.buffer[0];
	var n21 = this.matrix.buffer[1];
	var n31 = this.matrix.buffer[2];
	var n12 = this.matrix.buffer[4];
	var n22 = this.matrix.buffer[5];
	var n32 = this.matrix.buffer[6];
	var n14 = this.matrix.buffer[12];
	var n24 = this.matrix.buffer[13];
	var n34 = this.matrix.buffer[14];
	this.vertexes[0] = -n11 - n12 + n14;
	this.vertexes[1] = -n21 - n22 + n24;
	this.vertexes[2] = -n31 - n32 + n34;
	this.vertexes[3] = n11 - n12 + n14;
	this.vertexes[4] = n21 - n22 + n24;
	this.vertexes[5] = n31 - n32 + n34;
	this.vertexes[6] = -n11 + n12 + n14;
	this.vertexes[7] = -n21 + n22 + n24;
	this.vertexes[8] = -n31 + n32 + n34;
	this.vertexes[9] = n11 + n12 + n14;
	this.vertexes[10] = n21 + n22 + n24;
	this.vertexes[11] = n31 + n32 + n34;
	var x1 = 0, y1 = 0, z1 = 1;
	this.normals[0] = this.matrix.buffer[0] * x1 + this.matrix.buffer[4] * y1 + this.matrix.buffer[8] * z1 + this.matrix.buffer[12];
	this.normals[1] = this.matrix.buffer[1] * x1 + this.matrix.buffer[5] * y1 + this.matrix.buffer[9] * z1 + this.matrix.buffer[13];
	this.normals[2] = this.matrix.buffer[2] * x1 + this.matrix.buffer[6] * y1 + this.matrix.buffer[10] * z1 + this.matrix.buffer[14];
}
kumite.spritemesh.Sprite.prototype.__class__ = kumite.spritemesh.Sprite;
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
kumite.scene.SceneChangeRequest = function(sceneId) { if( sceneId === $_ ) return; {
	this.sceneId = sceneId;
}}
kumite.scene.SceneChangeRequest.__name__ = ["kumite","scene","SceneChangeRequest"];
kumite.scene.SceneChangeRequest.prototype.sceneId = null;
kumite.scene.SceneChangeRequest.prototype.__class__ = kumite.scene.SceneChangeRequest;
GLTextureAtlasLoadingTask = function(textureRegistry,atlas) { if( textureRegistry === $_ ) return; {
	bpmjs.Task.call(this);
	this.getMonitor().name = "GLTextureAtlasLoadingTask";
	if(textureRegistry == null) throw "TextureRegistry was null!";
	if(atlas == null) throw "GLTextureAtlasConfig was null!";
	this.textureRegistry = textureRegistry;
	this.atlas = atlas;
}}
GLTextureAtlasLoadingTask.__name__ = ["GLTextureAtlasLoadingTask"];
GLTextureAtlasLoadingTask.__super__ = bpmjs.Task;
for(var k in bpmjs.Task.prototype ) GLTextureAtlasLoadingTask.prototype[k] = bpmjs.Task.prototype[k];
GLTextureAtlasLoadingTask.prototype.textureRegistry = null;
GLTextureAtlasLoadingTask.prototype.atlas = null;
GLTextureAtlasLoadingTask.prototype.partLoaderGroup = null;
GLTextureAtlasLoadingTask.prototype.graphics = null;
GLTextureAtlasLoadingTask.prototype.currentOffsetX = null;
GLTextureAtlasLoadingTask.prototype.currentOffsetY = null;
GLTextureAtlasLoadingTask.prototype.nextOffsetX = null;
GLTextureAtlasLoadingTask.prototype.nextOffsetY = null;
GLTextureAtlasLoadingTask.prototype.currentMaxY = null;
GLTextureAtlasLoadingTask.prototype.doStart = function() {
	this.graphics = new CanvasGraphic();
	this.graphics.setWidth(this.atlas.width);
	this.graphics.setHeight(this.atlas.height);
	this.currentOffsetX = 0;
	this.currentOffsetY = 0;
	this.nextOffsetX = 0;
	this.nextOffsetY = 0;
	this.currentMaxY = 0;
	this.partLoaderGroup = new bpmjs.TaskGroup();
	this.getMonitor().append(this.partLoaderGroup.getMonitor(),1);
	{
		var _g = 0, _g1 = this.atlas.parts;
		while(_g < _g1.length) {
			var part = _g1[_g];
			++_g;
			this.addPart(part);
		}
	}
	this.partLoaderGroup.completeSignaler.bind($closure(this,"handleComplete"));
	this.partLoaderGroup.errorSignaler.bind($closure(this,"handleError"));
	this.partLoaderGroup.start();
}
GLTextureAtlasLoadingTask.prototype.addPart = function(part) {
	var task = new bpmjs.ObjectProxyTask(part,new bpmjs.ImageLoaderTask(part.location));
	task.completeSignaler.bind($closure(this,"addImageToAtlas"));
	this.partLoaderGroup.add(task);
}
GLTextureAtlasLoadingTask.prototype.addImageToAtlas = function(task) {
	var image = task.child.image;
	var part = task.object;
	this.advancePosition(image);
	part.width = image.naturalWidth;
	part.height = image.naturalHeight;
	part.u0 = this.currentOffsetX / this.atlas.width;
	part.v0 = this.currentOffsetY / this.atlas.height;
	part.u1 = (this.currentOffsetX + part.width) / this.atlas.width;
	part.v1 = (this.currentOffsetY + part.height) / this.atlas.height;
	this.graphics.drawImage(image,this.currentOffsetX,this.currentOffsetY,image.naturalWidth,image.naturalHeight);
}
GLTextureAtlasLoadingTask.prototype.advancePosition = function(image) {
	this.currentOffsetX = this.nextOffsetX;
	this.currentOffsetY = this.nextOffsetY;
	if(this.currentOffsetX + image.naturalWidth > this.atlas.width) {
		this.currentOffsetX = 0;
		this.currentOffsetY = this.currentMaxY;
		this.nextOffsetX = this.currentOffsetX;
		this.nextOffsetY = this.currentOffsetY;
	}
	this.nextOffsetX += image.naturalWidth;
	if(this.currentOffsetY + image.naturalHeight > this.currentMaxY) {
		this.currentMaxY = this.currentOffsetY + image.naturalHeight;
		if(this.currentMaxY > this.atlas.height) {
			Log.posInfo = { fileName : "GLTextureAtlasLoadingTask.hx", lineNumber : 97, className : "GLTextureAtlasLoadingTask", methodName : "advancePosition"};
			if(Log.filter(LogLevel.ERROR)) {
				Log.fetchInput("Atlas",this.atlas.toString(),"is too small!",null,null,null,null);
				console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
				Log.displayError(Log.createErrorMessage());
			}
		}
	}
}
GLTextureAtlasLoadingTask.prototype.handleComplete = function(group) {
	this.textureRegistry.register(this.atlas,this.textureRegistry.createGLTextureFromCanvas(this.graphics.canvas,this.atlas.filter));
	this.complete();
}
GLTextureAtlasLoadingTask.prototype.handleError = function(taskError) {
	this.error(this,taskError.error);
}
GLTextureAtlasLoadingTask.prototype.__class__ = GLTextureAtlasLoadingTask;
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
kumite.layer.ClearLayer = function(p) { if( p === $_ ) return; {
	this.clearColor = new Color(0,0,0,1);
}}
kumite.layer.ClearLayer.__name__ = ["kumite","layer","ClearLayer"];
kumite.layer.ClearLayer.prototype.clearColor = null;
kumite.layer.ClearLayer.prototype.init = function() {
	null;
}
kumite.layer.ClearLayer.prototype.renderTransition = function(transitionContext) {
	this.render();
}
kumite.layer.ClearLayer.prototype.render = function() {
	GL.gl.clearColor(this.clearColor.r,this.clearColor.g,this.clearColor.b,this.clearColor.a);
	GL.gl.clear(17664);
}
kumite.layer.ClearLayer.prototype.__class__ = kumite.layer.ClearLayer;
kumite.layer.ClearLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
GLMouseRegistry = function(p) { if( p === $_ ) return; {
	null;
}}
GLMouseRegistry.__name__ = ["GLMouseRegistry"];
GLMouseRegistry.instance = null;
GLMouseRegistry.getInstance = function() {
	if(GLMouseRegistry.instance == null) GLMouseRegistry.instance = new GLMouseRegistry();
	return GLMouseRegistry.instance;
}
GLMouseRegistry.prototype.mouseDownSignaler = null;
GLMouseRegistry.prototype.mouseMoveSignaler = null;
GLMouseRegistry.prototype.canvas = null;
GLMouseRegistry.prototype.init = function(canvas) {
	this.canvas = canvas;
	this.mouseDownSignaler = new hsl.haxe.DirectSignaler(this);
	this.mouseMoveSignaler = new hsl.haxe.DirectSignaler(this);
	canvas.onmousedown = $closure(this,"onMouseDown");
	canvas.onmousemove = $closure(this,"onMouseMove");
}
GLMouseRegistry.prototype.setCursor = function(cursor) {
	this.canvas.style.cursor = cursor;
}
GLMouseRegistry.prototype.createCursorClient = function() {
	var client = new GLCursorClient();
	return client;
}
GLMouseRegistry.prototype.onMouseDown = function(e) {
	try {
		this.mouseDownSignaler.dispatch(new Vec2(e.layerX / this.canvas.clientWidth,e.layerY / this.canvas.clientHeight),null,{ fileName : "GLMouseRegistry.hx", lineNumber : 50, className : "GLMouseRegistry", methodName : "onMouseDown"});
	}
	catch( $e0 ) {
		{
			var e1 = $e0;
			{
				haxe.Log.trace(e1,{ fileName : "GLMouseRegistry.hx", lineNumber : 54, className : "GLMouseRegistry", methodName : "onMouseDown"});
			}
		}
	}
}
GLMouseRegistry.prototype.onMouseMove = function(e) {
	try {
		this.mouseMoveSignaler.dispatch(new Vec2(e.layerX / this.canvas.clientWidth,e.layerY / this.canvas.clientHeight),null,{ fileName : "GLMouseRegistry.hx", lineNumber : 62, className : "GLMouseRegistry", methodName : "onMouseMove"});
	}
	catch( $e0 ) {
		{
			var e1 = $e0;
			{
				haxe.Log.trace(e1,{ fileName : "GLMouseRegistry.hx", lineNumber : 66, className : "GLMouseRegistry", methodName : "onMouseMove"});
			}
		}
	}
}
GLMouseRegistry.prototype.__class__ = GLMouseRegistry;
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
Text = function(p) { if( p === $_ ) return; {
	Text.init();
}}
Text.__name__ = ["Text"];
Text.context = null;
Text.init = function() {
	if(Text.context == null) {
		var canvas = js.Lib.document.createElement("canvas");
		Text.context = canvas.getContext("2d");
	}
}
Text.prototype.text = null;
Text.prototype.font = null;
Text.prototype.width = null;
Text.prototype.getWidth = function() {
	Text.context.font = this.font;
	return Text.context.measureText(this.text).width;
}
Text.prototype.__class__ = Text;
CanvasGraphic = function(p) { if( p === $_ ) return; {
	this.canvas = js.Lib.document.createElement("canvas");
	this.context = this.canvas.getContext("2d");
	this.setWidth(0);
	this.setHeight(0);
}}
CanvasGraphic.__name__ = ["CanvasGraphic"];
CanvasGraphic.prototype.width = null;
CanvasGraphic.prototype.height = null;
CanvasGraphic.prototype.fillStyle = null;
CanvasGraphic.prototype.font = null;
CanvasGraphic.prototype.isInvalid = null;
CanvasGraphic.prototype.canvas = null;
CanvasGraphic.prototype.context = null;
CanvasGraphic.prototype.clear = function(color) {
	this.canvas.width = Math2.nextPowerOf2(this.width);
	this.canvas.height = Math2.nextPowerOf2(this.height);
	this.context.fillStyle = "rgba(0, 0, 255, 0)";
	this.context.fillRect(0,0,this.canvas.width,this.canvas.width);
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
CanvasGraphic.prototype.setFont = function(value) {
	this.context.font = value;
	return value;
}
CanvasGraphic.prototype.setFillStyle = function(value) {
	if(Std["is"](value,Color)) this.context.fillStyle = ((function($this) {
		var $r;
		var $t = value;
		if(Std["is"]($t,Color)) $t;
		else throw "Class cast error";
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
bpmjs.ProgressMonitor = function(p) { if( p === $_ ) return; {
	this.children = new Array();
	this.setCurrent(0);
	this.weight = 1;
	this.name = "";
}}
bpmjs.ProgressMonitor.__name__ = ["bpmjs","ProgressMonitor"];
bpmjs.ProgressMonitor.prototype.name = null;
bpmjs.ProgressMonitor.prototype.weight = null;
bpmjs.ProgressMonitor.prototype.current = null;
bpmjs.ProgressMonitor.prototype.children = null;
bpmjs.ProgressMonitor.prototype.append = function(monitor,total) {
	var monitorAndTotal = new bpmjs._ProgressMonitor.MonitorAndTotal();
	monitorAndTotal.total = total;
	monitorAndTotal.monitor = monitor;
	this.children.push(monitorAndTotal);
	return monitor;
}
bpmjs.ProgressMonitor.prototype.getCurrent = function() {
	if(this.children.length == 0) {
		return this.current;
	}
	else {
		var totalWeight = 0.0;
		{
			var _g = 0, _g1 = this.children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				totalWeight += child.monitor.weight;
			}
		}
		var childCurrent = 0.0;
		{
			var _g = 0, _g1 = this.children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				childCurrent += Map.linear(child.monitor.getCurrent(),0,1,0,child.monitor.weight / totalWeight);
			}
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
bpmjs._ProgressMonitor.MonitorAndTotal = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs._ProgressMonitor.MonitorAndTotal.__name__ = ["bpmjs","_ProgressMonitor","MonitorAndTotal"];
bpmjs._ProgressMonitor.MonitorAndTotal.prototype.total = null;
bpmjs._ProgressMonitor.MonitorAndTotal.prototype.monitor = null;
bpmjs._ProgressMonitor.MonitorAndTotal.prototype.__class__ = bpmjs._ProgressMonitor.MonitorAndTotal;
if(!kumite.textureregistry) kumite.textureregistry = {}
kumite.textureregistry.Config = function(p) { if( p === $_ ) return; {
	this.textureRegistry = new GLTextureRegistry();
}}
kumite.textureregistry.Config.__name__ = ["kumite","textureregistry","Config"];
kumite.textureregistry.Config.prototype.textureRegistry = null;
kumite.textureregistry.Config.prototype.__class__ = kumite.textureregistry.Config;
kumite.textureregistry.Config.__interfaces__ = [haxe.rtti.Infos];
if(!kumite.camera) kumite.camera = {}
kumite.camera.CameraMouseMover = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.camera.CameraMouseMover.__name__ = ["kumite","camera","CameraMouseMover"];
kumite.camera.CameraMouseMover.prototype.camera = null;
kumite.camera.CameraMouseMover.prototype.init = function() {
	this.camera.matrix = new Matrix4();
	this.updateCamera();
}
kumite.camera.CameraMouseMover.prototype.updateCamera = function() {
	this.camera.matrix.setIdentity();
	this.camera.matrix.setLookAt(new Vec3(0,0,10),new Vec3(0,0,0),new Vec3(0,1,0));
}
kumite.camera.CameraMouseMover.prototype.__class__ = kumite.camera.CameraMouseMover;
kumite.camera.CameraMouseMover.__interfaces__ = [haxe.rtti.Infos];
if(!kumite.webgl) kumite.webgl = {}
kumite.webgl.Config = function(p) { if( p === $_ ) return; {
	this.initAction = new kumite.webgl.InitAction();
	this.initAction.antialias = true;
}}
kumite.webgl.Config.__name__ = ["kumite","webgl","Config"];
kumite.webgl.Config.prototype.initAction = null;
kumite.webgl.Config.prototype.__class__ = kumite.webgl.Config;
kumite.webgl.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.time.TimeController = function(p) { if( p === $_ ) return; {
	null;
}}
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
GLTexture = function(p) { if( p === $_ ) return; {
	null;
}}
GLTexture.__name__ = ["GLTexture"];
GLTexture.prototype.width = null;
GLTexture.prototype.height = null;
GLTexture.prototype.texture = null;
GLTexture.prototype.__class__ = GLTexture;
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
kumite.launch.PreloadDisplay = function(p) { if( p === $_ ) return; {
	null;
}}
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
	{
		var _g = 0;
		while(_g < count) {
			var i = _g++;
			var from = i / count;
			var to = (i + 1) / count;
			var diff = Map.linear(monitor.getCurrent(),from,to,0,1);
			if(diff < 0) diff = 0;
			if(diff > 1) diff = 1;
			var chars = "▁▂▃▄▅▆▇";
			bar += chars.charAt(Std["int"](diff * (chars.length - 1)));
		}
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
kumite.layer.LayerId = function() { }
kumite.layer.LayerId.__name__ = ["kumite","layer","LayerId"];
kumite.layer.LayerId.prototype.__class__ = kumite.layer.LayerId;
Matrix3 = function(cloneFrom) { if( cloneFrom === $_ ) return; {
	this.buffer = new Float32Array(9);
	if(cloneFrom != null) {
		this.setFrom(cloneFrom);
	}
	else {
		this.identity();
	}
}}
Matrix3.__name__ = ["Matrix3"];
Matrix3.prototype.buffer = null;
Matrix3.prototype.identity = function() {
	this.buffer[0] = 1;
	this.buffer[1] = 0;
	this.buffer[2] = 0;
	this.buffer[3] = 0;
	this.buffer[4] = 1;
	this.buffer[5] = 0;
	this.buffer[6] = 0;
	this.buffer[7] = 0;
	this.buffer[8] = 1;
}
Matrix3.prototype.transpose = function() {
	var a01 = this.buffer[1], a02 = this.buffer[2];
	var a12 = this.buffer[5];
	this.buffer[1] = this.buffer[3];
	this.buffer[2] = this.buffer[6];
	this.buffer[3] = a01;
	this.buffer[5] = this.buffer[7];
	this.buffer[6] = a02;
	this.buffer[7] = a12;
}
Matrix3.prototype.setFrom = function(from) {
	this.buffer[0] = from.buffer[0];
	this.buffer[1] = from.buffer[1];
	this.buffer[2] = from.buffer[2];
	this.buffer[3] = from.buffer[3];
	this.buffer[4] = from.buffer[4];
	this.buffer[5] = from.buffer[5];
	this.buffer[6] = from.buffer[6];
	this.buffer[7] = from.buffer[7];
	this.buffer[8] = from.buffer[8];
	this.buffer[9] = from.buffer[9];
}
Matrix3.prototype.clone = function() {
	return new Matrix3(this);
}
Matrix3.prototype.toString = function() {
	var result = "Matrix3:";
	result += "\r\t" + this.buffer[0] + "," + this.buffer[1] + "," + this.buffer[2];
	result += "\r\t" + this.buffer[3] + "," + this.buffer[4] + "," + this.buffer[5];
	result += "\r\t" + this.buffer[6] + "," + this.buffer[7] + "," + this.buffer[8];
	return result;
}
Matrix3.prototype.__class__ = Matrix3;
kumite.framebuffereffect.FBLayer = function(p) { if( p === $_ ) return; {
	this.color = new Color(1,1,0,0.5);
	this.scale = 1;
	this.position = new Vec3(0,0,0);
}}
kumite.framebuffereffect.FBLayer.__name__ = ["kumite","framebuffereffect","FBLayer"];
kumite.framebuffereffect.FBLayer.prototype.stage = null;
kumite.framebuffereffect.FBLayer.prototype.time = null;
kumite.framebuffereffect.FBLayer.prototype.projection = null;
kumite.framebuffereffect.FBLayer.prototype.camera = null;
kumite.framebuffereffect.FBLayer.prototype.color = null;
kumite.framebuffereffect.FBLayer.prototype.scale = null;
kumite.framebuffereffect.FBLayer.prototype.position = null;
kumite.framebuffereffect.FBLayer.prototype.shaderProgram = null;
kumite.framebuffereffect.FBLayer.prototype.vertexPositionAttribute = null;
kumite.framebuffereffect.FBLayer.prototype.vertexBuffer = null;
kumite.framebuffereffect.FBLayer.prototype.projectionMatrixUniform = null;
kumite.framebuffereffect.FBLayer.prototype.worldViewMatrixUniform = null;
kumite.framebuffereffect.FBLayer.prototype.colorUniform = null;
kumite.framebuffereffect.FBLayer.prototype.init = function() {
	this.shaderProgram = GL.createProgram(kumite.framebuffereffect._FBLayer.Vertex,kumite.framebuffereffect._FBLayer.Fragment);
	this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
	this.vertexPositionAttribute.updateBuffer(new Int8Array([-1,-1,1,-1,-1,1,1,1]));
	this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
	this.worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
	this.colorUniform = GL.getUniformLocation("color");
}
kumite.framebuffereffect.FBLayer.prototype.renderTransition = function(transitionContext) {
	this.render();
}
kumite.framebuffereffect.FBLayer.prototype.render = function() {
	GL.useProgram(this.shaderProgram);
	GL.gl.viewport(0,0,this.stage.width,this.stage.height);
	GL.gl.disable(2929);
	GL.gl.enable(3042);
	GL.gl.blendFunc(770,771);
	GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,this.projection.matrix.buffer);
	this.vertexPositionAttribute.vertexAttribPointer();
	var worldViewMatrix = new Matrix4();
	worldViewMatrix.appendScale(this.scale,this.scale,this.scale);
	worldViewMatrix.appendTranslation(this.position.x,this.position.y,this.position.z);
	worldViewMatrix.appendRotation(this.time.ms / 4000,new Vec3(1,1,1).normalize());
	worldViewMatrix.append(this.camera.matrix);
	GL.gl.uniformMatrix4fv(this.worldViewMatrixUniform.location,false,worldViewMatrix.buffer);
	var colorWithTransition = this.color.clone();
	GL.gl.uniform4f(this.colorUniform.location,colorWithTransition.r,colorWithTransition.g,colorWithTransition.b,colorWithTransition.a);
	this.vertexPositionAttribute.drawArrays(5);
}
kumite.framebuffereffect.FBLayer.prototype.__class__ = kumite.framebuffereffect.FBLayer;
kumite.framebuffereffect.FBLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
if(!kumite.framebuffereffect._FBLayer) kumite.framebuffereffect._FBLayer = {}
kumite.framebuffereffect._FBLayer.Vertex = function() { }
kumite.framebuffereffect._FBLayer.Vertex.__name__ = ["kumite","framebuffereffect","_FBLayer","Vertex"];
kumite.framebuffereffect._FBLayer.Vertex.prototype.__class__ = kumite.framebuffereffect._FBLayer.Vertex;
kumite.framebuffereffect._FBLayer.Fragment = function() { }
kumite.framebuffereffect._FBLayer.Fragment.__name__ = ["kumite","framebuffereffect","_FBLayer","Fragment"];
kumite.framebuffereffect._FBLayer.Fragment.prototype.__class__ = kumite.framebuffereffect._FBLayer.Fragment;
kumite.projection.Projection = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.projection.Projection.__name__ = ["kumite","projection","Projection"];
kumite.projection.Projection.prototype.matrix = null;
kumite.projection.Projection.prototype.__class__ = kumite.projection.Projection;
kumite.layer.LayerTransitions = function(name) { if( name === $_ ) return; {
	if(name == null) name = "";
	this.children = new Array();
	kumite.layer.LayerTransition.call(this,name);
}}
kumite.layer.LayerTransitions.__name__ = ["kumite","layer","LayerTransitions"];
kumite.layer.LayerTransitions.__super__ = kumite.layer.LayerTransition;
for(var k in kumite.layer.LayerTransition.prototype ) kumite.layer.LayerTransitions.prototype[k] = kumite.layer.LayerTransition.prototype[k];
kumite.layer.LayerTransitions.prototype.children = null;
kumite.layer.LayerTransitions.prototype.add = function(child) {
	this.children.push(child);
}
kumite.layer.LayerTransitions.prototype.enableChild = function(name) {
	var _g = 0, _g1 = this.children;
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		child.enable(child.name == name);
	}
}
kumite.layer.LayerTransitions.prototype.setTransition = function(value) {
	{
		var _g = 0, _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.setTransition(value);
		}
	}
	return value;
}
kumite.layer.LayerTransitions.prototype.__class__ = kumite.layer.LayerTransitions;
kumite.webgl.InitAction = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.webgl.InitAction.__name__ = ["kumite","webgl","InitAction"];
kumite.webgl.InitAction.prototype.canvas = null;
kumite.webgl.InitAction.prototype.antialias = null;
kumite.webgl.InitAction.prototype.init = function() {
	GL.init(this.canvas.itself,this.antialias);
}
kumite.webgl.InitAction.prototype.__class__ = kumite.webgl.InitAction;
kumite.webgl.InitAction.__interfaces__ = [haxe.rtti.Infos];
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
kumite.stage.StageResizeMessage = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.stage.StageResizeMessage.__name__ = ["kumite","stage","StageResizeMessage"];
kumite.stage.StageResizeMessage.prototype.__class__ = kumite.stage.StageResizeMessage;
bpmjs.SequencerTaskGroup = function(p) { if( p === $_ ) return; {
	bpmjs.TaskGroup.call(this);
	this.getMonitor().name = "SequencerTaskGroup";
}}
bpmjs.SequencerTaskGroup.__name__ = ["bpmjs","SequencerTaskGroup"];
bpmjs.SequencerTaskGroup.__super__ = bpmjs.TaskGroup;
for(var k in bpmjs.TaskGroup.prototype ) bpmjs.SequencerTaskGroup.prototype[k] = bpmjs.TaskGroup.prototype[k];
bpmjs.SequencerTaskGroup.prototype.__class__ = bpmjs.SequencerTaskGroup;
Main = function(canvas) { if( canvas === $_ ) return; {
	try {
		var context = bpmjs.ContextBuilder.buildAll([kumite.launch.Config,kumite.textureregistry.Config,kumite.stage.Config,kumite.canvas.Config,kumite.webgl.Config,kumite.time.Config,kumite.projection.Config,kumite.camera.Config,kumite.mouse.Config,kumite.displaylist.ConfigAsLayer,kumite.vjinterface.Config,kumite.scene.Config,kumite.flyingman.Config,kumite.testscene.Config,kumite.spritemesh.Config,kumite.framebuffereffect.Config]);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				{
					Log.posInfo = { fileName : "Main.hx", lineNumber : 49, className : "Main", methodName : "new"};
					if(Log.filter(LogLevel.ERROR)) {
						Log.fetchInput("Error building application!\n" + e,null,null,null,null,null,null);
						console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
						Log.displayError(Log.createErrorMessage());
					}
				}
			}
		}
	}
	var i = 65537;
	{
		Log.posInfo = { fileName : "Main.hx", lineNumber : 53, className : "Main", methodName : "new"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(i,null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	i = i & 65535;
	{
		Log.posInfo = { fileName : "Main.hx", lineNumber : 55, className : "Main", methodName : "new"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(i,null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
}}
Main.__name__ = ["Main"];
Main.globalErrorHandler = function(msg,stack) {
	haxe.Log.trace("Uncaugt error: " + msg,{ fileName : "Main.hx", lineNumber : 5, className : "Main", methodName : "globalErrorHandler"});
	{
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			haxe.Log.trace(line,{ fileName : "Main.hx", lineNumber : 7, className : "Main", methodName : "globalErrorHandler"});
		}
	}
	return true;
}
Main.main = function() {
	Log.init();
	Log.addFilter(new ERegFilter(LogLevel.INFO,new EReg(".*","")));
	Log.addFilter(new ERegFilter(LogLevel.WARN,new EReg(".*FrontMessenger\\.handleMessage.*","")));
	Log.addFilter(new ERegFilter(LogLevel.WARN,new EReg(".*FrontMessenger\\.Receiver\\.execute.*","")));
	js.Lib.setErrorHandler($closure(Main,"globalErrorHandler"));
}
Main.prototype.__class__ = Main;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
kumite.spritemesh.Config = function(p) { if( p === $_ ) return; {
	this.clearLayer = new kumite.layer.ClearLayer();
	this.colorLayer = new kumite.layer.ColorLayer();
	this.colorLayer.color = new Color(0.0,0.0,0.0,1);
	this.colorLayer.transitions.enableChild("alpha");
	this.layer1 = new kumite.spritemesh.SpriteMeshLayer();
	this.layer1.offset = 0;
	this.layer1.textureFrequenceParam = 0.0000031;
	this.layer1.textureAmpParam = 304;
	this.layer2 = new kumite.spritemesh.SpriteMeshLayer();
	this.layer2.offset = 20000;
	this.layer2.textureFrequenceParam = 0.00001;
	this.layer2.textureAmpParam = 305;
	this.layer3 = new kumite.spritemesh.SpriteMeshLayer();
	this.layer3.offset = 30000;
	this.layer3.textureFrequenceParam = 0.00002;
	this.layer3.textureAmpParam = 39.4;
	this.scene1 = new kumite.scene.DefaultScene("SPRITES");
	this.scene2 = new kumite.scene.DefaultScene("SPRITES");
	this.scene3 = new kumite.scene.DefaultScene("SPRITES");
}}
kumite.spritemesh.Config.__name__ = ["kumite","spritemesh","Config"];
kumite.spritemesh.Config.prototype.textureRegistry = null;
kumite.spritemesh.Config.prototype.displayListLayer = null;
kumite.spritemesh.Config.prototype.clearLayer = null;
kumite.spritemesh.Config.prototype.colorLayer = null;
kumite.spritemesh.Config.prototype.layer1 = null;
kumite.spritemesh.Config.prototype.layer2 = null;
kumite.spritemesh.Config.prototype.layer3 = null;
kumite.spritemesh.Config.prototype.scene1 = null;
kumite.spritemesh.Config.prototype.scene2 = null;
kumite.spritemesh.Config.prototype.scene3 = null;
kumite.spritemesh.Config.prototype.complete = function() {
	this.scene1.addLayerLifecycle(this.clearLayer,kumite.layer.LayerId.CLEAR);
	this.scene1.addLayerLifecycle(this.colorLayer);
	this.scene1.addLayerLifecycle(this.layer1);
	this.scene1.addLayerLifecycle(this.displayListLayer);
	this.scene2.addLayerLifecycle(this.clearLayer,kumite.layer.LayerId.CLEAR);
	this.scene2.addLayerLifecycle(this.colorLayer);
	this.scene2.addLayerLifecycle(this.layer2);
	this.scene2.addLayerLifecycle(this.displayListLayer);
	this.scene3.addLayerLifecycle(this.clearLayer,kumite.layer.LayerId.CLEAR);
	this.scene3.addLayerLifecycle(this.colorLayer);
	this.scene3.addLayerLifecycle(this.layer3);
	this.scene3.addLayerLifecycle(this.displayListLayer);
}
kumite.spritemesh.Config.prototype.startPrepare = function() {
	var group = new bpmjs.SequencerTaskGroup();
	{
		var _g = 1;
		while(_g < 190) {
			var i = _g++;
			var s = "" + i;
			while(s.length < 4) s = "0" + s;
			GLTextureAtlasPartConfig.create(kumite.spritemesh.Config.TEST_ATLAS,"data/image/karlo/image" + s + ".png");
		}
	}
	group.add(new GLTextureAtlasLoadingTask(this.textureRegistry,kumite.spritemesh.Config.TEST_ATLAS));
	return group;
}
kumite.spritemesh.Config.prototype.__class__ = kumite.spritemesh.Config;
kumite.spritemesh.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.layer.ColorLayer = function(p) { if( p === $_ ) return; {
	this.color = new Color(1,1,1,0.2);
	this.transitions = new kumite.layer.LayerTransitions();
	this.transitions.add(this.cutTransition = new kumite.layer.LayerTransition("cut"));
	this.transitions.add(this.moveTransition = new kumite.layer.LayerTransition("move"));
	this.transitions.add(this.alphaTransition = new kumite.layer.LayerTransition("alpha"));
	this.transitions.enableChild("move");
}}
kumite.layer.ColorLayer.__name__ = ["kumite","layer","ColorLayer"];
kumite.layer.ColorLayer.prototype.stage = null;
kumite.layer.ColorLayer.prototype.time = null;
kumite.layer.ColorLayer.prototype.transitions = null;
kumite.layer.ColorLayer.prototype.cutTransition = null;
kumite.layer.ColorLayer.prototype.moveTransition = null;
kumite.layer.ColorLayer.prototype.alphaTransition = null;
kumite.layer.ColorLayer.prototype.color = null;
kumite.layer.ColorLayer.prototype.shaderProgram = null;
kumite.layer.ColorLayer.prototype.vertexPositionAttribute = null;
kumite.layer.ColorLayer.prototype.vertexBuffer = null;
kumite.layer.ColorLayer.prototype.projectionMatrixUniform = null;
kumite.layer.ColorLayer.prototype.worldViewMatrixUniform = null;
kumite.layer.ColorLayer.prototype.colorUniform = null;
kumite.layer.ColorLayer.prototype.init = function() {
	this.shaderProgram = GL.createProgram(kumite.layer._ColorLayer.Vertex,kumite.layer._ColorLayer.Fragment);
	this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
	this.vertexPositionAttribute.updateBuffer(new Int8Array([0,0,1,0,0,1,1,1]));
	this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
	this.worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
	this.colorUniform = GL.getUniformLocation("color");
}
kumite.layer.ColorLayer.prototype.renderTransition = function(transitionContext) {
	this.transitions.setTransition(transitionContext.getTransition());
	this.render();
}
kumite.layer.ColorLayer.prototype.render = function() {
	GL.useProgram(this.shaderProgram);
	GL.gl.viewport(0,0,this.stage.width,this.stage.height);
	GL.gl.disable(2929);
	GL.gl.enable(3042);
	GL.gl.blendFunc(770,771);
	var projectionMatrix = new Matrix4();
	projectionMatrix.setOrtho(0,this.stage.width,this.stage.height,0,0,1);
	GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,projectionMatrix.buffer);
	this.vertexPositionAttribute.vertexAttribPointer();
	var worldViewMatrix = new Matrix4();
	worldViewMatrix.appendTranslation(this.moveTransition.direction * (1 - this.moveTransition.getTransition()),0,0);
	worldViewMatrix.appendScale(this.stage.width,this.stage.height,1);
	GL.gl.uniformMatrix4fv(this.worldViewMatrixUniform.location,false,worldViewMatrix.buffer);
	var colorWithTransition = this.color.clone();
	colorWithTransition.a *= this.alphaTransition.getTransition();
	GL.gl.uniform4f(this.colorUniform.location,colorWithTransition.r,colorWithTransition.g,colorWithTransition.b,colorWithTransition.a);
	this.vertexPositionAttribute.drawArrays(5);
}
kumite.layer.ColorLayer.prototype.__class__ = kumite.layer.ColorLayer;
kumite.layer.ColorLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
if(!kumite.layer._ColorLayer) kumite.layer._ColorLayer = {}
kumite.layer._ColorLayer.Vertex = function() { }
kumite.layer._ColorLayer.Vertex.__name__ = ["kumite","layer","_ColorLayer","Vertex"];
kumite.layer._ColorLayer.Vertex.prototype.__class__ = kumite.layer._ColorLayer.Vertex;
kumite.layer._ColorLayer.Fragment = function() { }
kumite.layer._ColorLayer.Fragment.__name__ = ["kumite","layer","_ColorLayer","Fragment"];
kumite.layer._ColorLayer.Fragment.prototype.__class__ = kumite.layer._ColorLayer.Fragment;
GLUniformLocation = function(p) { if( p === $_ ) return; {
	null;
}}
GLUniformLocation.__name__ = ["GLUniformLocation"];
GLUniformLocation.prototype.location = null;
GLUniformLocation.prototype.uniform1f = function(v) {
	GL.gl.uniform1f(this.location,v);
}
GLUniformLocation.prototype.uniform1fv = function(v) {
	GL.gl.uniform1fv(this.location,v);
}
GLUniformLocation.prototype.uniform1i = function(v) {
	GL.gl.uniform1i(this.location,v);
}
GLUniformLocation.prototype.uniform1iv = function(v) {
	GL.gl.uniform1iv(this.location,v);
}
GLUniformLocation.prototype.uniform2f = function(x,y) {
	GL.gl.uniform2f(this.location,x,y);
}
GLUniformLocation.prototype.uniform2fv = function(v) {
	GL.gl.uniform2fv(this.location,v);
}
GLUniformLocation.prototype.uniform2i = function(x,y) {
	GL.gl.uniform2i(this.location,x,y);
}
GLUniformLocation.prototype.uniform2iv = function(v) {
	GL.gl.uniform2iv(this.location,v);
}
GLUniformLocation.prototype.uniform3f = function(x,y,z) {
	GL.gl.uniform3f(this.location,x,y,z);
}
GLUniformLocation.prototype.uniform3fv = function(v) {
	GL.gl.uniform3fv(this.location,v);
}
GLUniformLocation.prototype.uniform3i = function(x,y,z) {
	GL.gl.uniform3i(this.location,x,y,z);
}
GLUniformLocation.prototype.uniform3iv = function(v) {
	GL.gl.uniform3iv(this.location,v);
}
GLUniformLocation.prototype.uniform4f = function(x,y,z,w) {
	GL.gl.uniform4f(this.location,x,y,z,w);
}
GLUniformLocation.prototype.uniform4fv = function(v) {
	GL.gl.uniform4fv(this.location,v);
}
GLUniformLocation.prototype.uniform4i = function(x,y,z,w) {
	GL.gl.uniform4i(this.location,x,y,z,w);
}
GLUniformLocation.prototype.uniform4iv = function(v) {
	GL.gl.uniform4iv(this.location,v);
}
GLUniformLocation.prototype.uniformMatrix2fv = function(transpose,value) {
	if(transpose == null) transpose = false;
	GL.gl.uniformMatrix2fv(this.location,transpose,value);
}
GLUniformLocation.prototype.uniformMatrix3fv = function(transpose,value) {
	if(transpose == null) transpose = false;
	GL.gl.uniformMatrix3fv(this.location,transpose,value);
}
GLUniformLocation.prototype.uniformMatrix4fv = function(transpose,value) {
	if(transpose == null) transpose = false;
	GL.gl.uniformMatrix4fv(this.location,transpose,value);
}
GLUniformLocation.prototype.setFloat = function(v) {
	GL.gl.uniform1f(this.location,v);
}
GLUniformLocation.prototype.setMatrix3 = function(matrix) {
	GL.gl.uniformMatrix3fv(this.location,false,matrix.buffer);
}
GLUniformLocation.prototype.setMatrix4 = function(matrix) {
	GL.gl.uniformMatrix4fv(this.location,false,matrix.buffer);
}
GLUniformLocation.prototype.setVec3 = function(vec) {
	GL.gl.uniform3f(this.location,vec.x,vec.y,vec.z);
}
GLUniformLocation.prototype.setRGB = function(color) {
	GL.gl.uniform3f(this.location,color.r,color.g,color.b);
}
GLUniformLocation.prototype.setRGBA = function(color) {
	GL.gl.uniform4f(this.location,color.r,color.g,color.b,color.a);
}
GLUniformLocation.prototype.setTexture = function(texture,index) {
	if(index == null) index = 0;
	GL.gl.activeTexture(33984 + index);
	GL.gl.bindTexture(3553,texture.texture);
	GL.gl.uniform1i(this.location,index);
}
GLUniformLocation.prototype.__class__ = GLUniformLocation;
kumite.projection.Config = function(p) { if( p === $_ ) return; {
	this.projection = new kumite.projection.Projection();
	this.projectionController = new kumite.projection.ProjectionController();
	this.projectionController.fov = 40;
	this.projectionController.near = 0.1;
	this.projectionController.far = 500;
}}
kumite.projection.Config.__name__ = ["kumite","projection","Config"];
kumite.projection.Config.prototype.projection = null;
kumite.projection.Config.prototype.projectionController = null;
kumite.projection.Config.prototype.__class__ = kumite.projection.Config;
kumite.projection.Config.__interfaces__ = [haxe.rtti.Infos];
LogFilter = function() { }
LogFilter.__name__ = ["LogFilter"];
LogFilter.prototype.enabled = null;
LogFilter.prototype.__class__ = LogFilter;
kumite.camera.Camera = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.camera.Camera.__name__ = ["kumite","camera","Camera"];
kumite.camera.Camera.prototype.matrix = null;
kumite.camera.Camera.prototype.__class__ = kumite.camera.Camera;
if(!kumite.vjinterface) kumite.vjinterface = {}
kumite.vjinterface.VJInterface = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.vjinterface.VJInterface.__name__ = ["kumite","vjinterface","VJInterface"];
kumite.vjinterface.VJInterface.prototype.scenes = null;
kumite.vjinterface.VJInterface.prototype.messenger = null;
kumite.vjinterface.VJInterface.prototype.timer = null;
kumite.vjinterface.VJInterface.prototype.stage = null;
kumite.vjinterface.VJInterface.prototype.sceneContainer = null;
kumite.vjinterface.VJInterface.prototype.start = function() {
	this.stage = GLDisplayList.getDefault().stage;
	this.stage.addChild(new GLStats());
	this.timer = new haxe.Timer(12000);
	this.addSceneButtons();
}
kumite.vjinterface.VJInterface.prototype.render = function(tick) {
	this.sceneContainer.setY(this.stage.stageHeight - 30);
}
kumite.vjinterface.VJInterface.prototype.addSceneButtons = function() {
	this.sceneContainer = new GLDisplayObjectContainer();
	this.sceneContainer.setX(10);
	this.stage.addChild(this.sceneContainer);
	var currentX = 0;
	{
		var _g = 0, _g1 = this.scenes.all;
		while(_g < _g1.length) {
			var sceneAndLifecycle = _g1[_g];
			++_g;
			var sceneButton = new GLLabel();
			sceneButton.setX(currentX);
			sceneButton.setText(sceneAndLifecycle.scene.name);
			sceneButton.setWidth(100);
			sceneButton.setHeight(20);
			sceneButton.mouseDownSignaler.bind(this.createSceneRequest(sceneAndLifecycle.scene));
			this.sceneContainer.addChild(sceneButton);
			currentX += sceneButton.width + 10;
		}
	}
}
kumite.vjinterface.VJInterface.prototype.createSceneRequest = function(scene) {
	var inst = this;
	return function(button) {
		inst.handleButtonClick(scene);
	}
}
kumite.vjinterface.VJInterface.prototype.handleButtonClick = function(scene) {
	this.messenger.send(new kumite.scene.SceneChangeRequest(scene.id));
}
kumite.vjinterface.VJInterface.prototype.navigateNext = function() {
	{
		Log.posInfo = { fileName : "VJInterface.hx", lineNumber : 85, className : "kumite.vjinterface.VJInterface", methodName : "navigateNext"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(null,null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	var newSceneId = this.scenes.getRandomScene().scene.id;
	this.messenger.send(new kumite.scene.SceneChangeRequest(newSceneId));
}
kumite.vjinterface.VJInterface.prototype.__class__ = kumite.vjinterface.VJInterface;
kumite.vjinterface.VJInterface.__interfaces__ = [haxe.rtti.Infos];
GLTextureLoadingTask = function(textureRegistry,textureConfig) { if( textureRegistry === $_ ) return; {
	bpmjs.ImageLoaderTask.call(this);
	if(textureRegistry == null) throw "TextureRegistry was null!";
	this.textureRegistry = textureRegistry;
	this.textureConfig = textureConfig;
}}
GLTextureLoadingTask.__name__ = ["GLTextureLoadingTask"];
GLTextureLoadingTask.__super__ = bpmjs.ImageLoaderTask;
for(var k in bpmjs.ImageLoaderTask.prototype ) GLTextureLoadingTask.prototype[k] = bpmjs.ImageLoaderTask.prototype[k];
GLTextureLoadingTask.prototype.textureRegistry = null;
GLTextureLoadingTask.prototype.textureConfig = null;
GLTextureLoadingTask.prototype.doStart = function() {
	this.location = this.textureConfig.location;
	bpmjs.ImageLoaderTask.prototype.doStart.call(this);
}
GLTextureLoadingTask.prototype.handleImageLoaded = function() {
	var testPowerOfTwoWidth = Std["int"](Math2.nextPowerOf2(this.image.width));
	var testPowerOfTwoHeight = Std["int"](Math2.nextPowerOf2(this.image.height));
	if(testPowerOfTwoWidth != this.image.width || testPowerOfTwoHeight != this.image.height) {
		{
			Log.posInfo = { fileName : "GLTextureLoadingTask.hx", lineNumber : 29, className : "GLTextureLoadingTask", methodName : "handleImageLoaded"};
			if(Log.filter(LogLevel.WARN)) {
				Log.fetchInput("Image",this.textureConfig.location,"size must be a valid texture size! Resizing...",null,null,null,null);
				console.warn(Log.createMessage());
			}
		}
		var canvasGraphic = new CanvasGraphic();
		canvasGraphic.setWidth(Std["int"](testPowerOfTwoWidth / 2));
		canvasGraphic.setHeight(Std["int"](testPowerOfTwoHeight / 2));
		canvasGraphic.drawImage(this.image,0,0,canvasGraphic.width,canvasGraphic.height);
		this.textureRegistry.register(this.textureConfig,this.textureRegistry.createGLTextureFromCanvas(canvasGraphic.canvas));
	}
	else {
		this.textureRegistry.register(this.textureConfig,this.textureRegistry.createGLTextureFromImage(this.image,this.textureConfig.filter));
	}
	{
		Log.posInfo = { fileName : "GLTextureLoadingTask.hx", lineNumber : 42, className : "GLTextureLoadingTask", methodName : "handleImageLoaded"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput("Complete: ",this.textureConfig.location,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	this.complete();
}
GLTextureLoadingTask.prototype.__class__ = GLTextureLoadingTask;
GLHitarea = function(p) { if( p === $_ ) return; {
	this.position = new Vec2();
	this.size = new Vec2();
}}
GLHitarea.__name__ = ["GLHitarea"];
GLHitarea.prototype.position = null;
GLHitarea.prototype.size = null;
GLHitarea.prototype.isUnder = function(matrix,positionOnStage) {
	var tl = this.position.clone();
	tl.transform(matrix);
	var br = this.size.clone();
	br.transform(matrix);
	return tl.x <= positionOnStage.x && br.x >= positionOnStage.x && tl.y <= positionOnStage.y && br.y >= positionOnStage.y;
}
GLHitarea.prototype.__class__ = GLHitarea;
kumite.flyingman.ButterflyCloseupCamera = function(p) { if( p === $_ ) return; {
	kumite.flyingman.Component.call(this);
}}
kumite.flyingman.ButterflyCloseupCamera.__name__ = ["kumite","flyingman","ButterflyCloseupCamera"];
kumite.flyingman.ButterflyCloseupCamera.__super__ = kumite.flyingman.Component;
for(var k in kumite.flyingman.Component.prototype ) kumite.flyingman.ButterflyCloseupCamera.prototype[k] = kumite.flyingman.Component.prototype[k];
kumite.flyingman.ButterflyCloseupCamera.prototype.butterfly = null;
kumite.flyingman.ButterflyCloseupCamera.prototype.matrix = null;
kumite.flyingman.ButterflyCloseupCamera.prototype.eye = null;
kumite.flyingman.ButterflyCloseupCamera.prototype.lookAt = null;
kumite.flyingman.ButterflyCloseupCamera.prototype.init = function() {
	this.matrix = new Matrix4();
}
kumite.flyingman.ButterflyCloseupCamera.prototype.update = function() {
	var dist = 4;
	var v = this.butterfly.position.clone();
	v.normalize();
	var vNorm = this.butterfly.position.clone();
	vNorm.normalize();
	var newEye = this.butterfly.position.clone();
	newEye.x += vNorm.x * dist;
	newEye.y += vNorm.y * dist + 3;
	newEye.z += vNorm.z * dist;
	if(this.eye == null) {
		this.eye = new Vec3();
		this.eye.setFrom(null,newEye);
		this.lookAt = new Vec3();
		this.lookAt.setFrom(null,this.getLookAtTarget());
	}
	else {
		this.time.interpolateVec3To(this.eye,newEye,0.01);
		this.time.interpolateVec3To(this.lookAt,this.getLookAtTarget(),0.05);
	}
	this.matrix.setLookAt(this.eye,this.lookAt,new Vec3(0,1,0));
}
kumite.flyingman.ButterflyCloseupCamera.prototype.getLookAtTarget = function() {
	var result = this.butterfly.position.clone();
	result.x += Math.sin(this.time.ms / 4000) * 2;
	result.y += Math.cos(this.time.ms / 5000) + 1;
	result.z += Math.sin(this.time.ms / 6000) * 2;
	return result;
}
kumite.flyingman.ButterflyCloseupCamera.prototype.__class__ = kumite.flyingman.ButterflyCloseupCamera;
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
kumite.framebuffereffect.FBEnableLayer = function(p) { if( p === $_ ) return; {
	this.framebuffer = new GLFramebuffer();
}}
kumite.framebuffereffect.FBEnableLayer.__name__ = ["kumite","framebuffereffect","FBEnableLayer"];
kumite.framebuffereffect.FBEnableLayer.prototype.framebuffer = null;
kumite.framebuffereffect.FBEnableLayer.prototype.init = function() {
	this.framebuffer.width = 1024;
	this.framebuffer.height = 1024;
	this.framebuffer.framebuffer = GL.gl.createFramebuffer();
	GL.gl.bindFramebuffer(36160,this.framebuffer.framebuffer);
	this.framebuffer.texture = GL.gl.createTexture();
	GL.gl.bindTexture(3553,this.framebuffer.texture);
	GL.gl.texParameteri(3553,10240,9728);
	GL.gl.texParameteri(3553,10241,9728);
	GL.gl.texImage2D(3553,0,6408,this.framebuffer.width,this.framebuffer.height,0,6408,5121,null);
	GL.gl.framebufferTexture2D(36160,36064,3553,this.framebuffer.texture,0);
	GL.gl.bindTexture(3553,null);
	GL.gl.bindFramebuffer(36160,null);
}
kumite.framebuffereffect.FBEnableLayer.prototype.renderTransition = function(transitionContext) {
	this.render();
}
kumite.framebuffereffect.FBEnableLayer.prototype.render = function() {
	GL.gl.bindFramebuffer(36160,this.framebuffer.framebuffer);
}
kumite.framebuffereffect.FBEnableLayer.prototype.__class__ = kumite.framebuffereffect.FBEnableLayer;
kumite.framebuffereffect.FBEnableLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.displaylist.DisplayListLayer = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.displaylist.DisplayListLayer.__name__ = ["kumite","displaylist","DisplayListLayer"];
kumite.displaylist.DisplayListLayer.prototype.stage = null;
kumite.displaylist.DisplayListLayer.prototype.transition = null;
kumite.displaylist.DisplayListLayer.prototype.renderer = null;
kumite.displaylist.DisplayListLayer.prototype.init = function() {
	this.renderer = new GLDisplayListRenderer();
	this.renderer.init();
}
kumite.displaylist.DisplayListLayer.prototype.renderTransition = function(transitionContext) {
	this.transition = transitionContext.getTransition();
	this.render();
}
kumite.displaylist.DisplayListLayer.prototype.render = function() {
	bpmjs.Stats.measureFPS();
	GLDisplayList.getDefault().stage.alpha = this.transition;
	GLDisplayList.getDefault().setStageSize(this.stage.width,this.stage.height);
	GLDisplayList.getDefault().dispatchEnterFrame();
	this.renderer.render(this.stage.width,this.stage.height);
}
kumite.displaylist.DisplayListLayer.prototype.__class__ = kumite.displaylist.DisplayListLayer;
kumite.displaylist.DisplayListLayer.__interfaces__ = [kumite.scene.LayerLifecycle,haxe.rtti.Infos];
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
kumite.scene.TransitionDirection = { __ename__ : ["kumite","scene","TransitionDirection"], __constructs__ : ["IN","OUT"] }
kumite.scene.TransitionDirection.IN = ["IN",0];
kumite.scene.TransitionDirection.IN.toString = $estr;
kumite.scene.TransitionDirection.IN.__enum__ = kumite.scene.TransitionDirection;
kumite.scene.TransitionDirection.OUT = ["OUT",1];
kumite.scene.TransitionDirection.OUT.toString = $estr;
kumite.scene.TransitionDirection.OUT.__enum__ = kumite.scene.TransitionDirection;
kumite.stage.Stage = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.stage.Stage.__name__ = ["kumite","stage","Stage"];
kumite.stage.Stage.prototype.width = null;
kumite.stage.Stage.prototype.height = null;
kumite.stage.Stage.prototype.aspect = null;
kumite.stage.Stage.prototype.getAspect = function() {
	return this.width / this.height;
}
kumite.stage.Stage.prototype.__class__ = kumite.stage.Stage;
kumite.scene.SceneAndLifecycle = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.scene.SceneAndLifecycle.__name__ = ["kumite","scene","SceneAndLifecycle"];
kumite.scene.SceneAndLifecycle.prototype.scene = null;
kumite.scene.SceneAndLifecycle.prototype.lifecycle = null;
kumite.scene.SceneAndLifecycle.prototype.__class__ = kumite.scene.SceneAndLifecycle;
if(!haxe.exception) haxe.exception = {}
haxe.exception.Exception = function(message,innerException,numberOfStackTraceShifts) { if( message === $_ ) return; {
	this.message = null == message?"Unknown exception":message;
	this.innerException = innerException;
	this.generateStackTrace(numberOfStackTraceShifts);
	this.stackTrace = this.stackTraceArray;
}}
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
	while(null != result.innerException) {
		result = result.innerException;
	}
	return result;
}
haxe.exception.Exception.prototype.toString = function() {
	return this.message + haxe.Stack.toString(this.stackTraceArray);
}
haxe.exception.Exception.prototype.__class__ = haxe.exception.Exception;
haxe.Timer = function(time_ms) { if( time_ms === $_ ) return; {
	this.id = haxe.Timer.arr.length;
	haxe.Timer.arr[this.id] = this;
	this.timerId = window.setInterval("haxe.Timer.arr[" + this.id + "].run();",time_ms);
}}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	}
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
	haxe.Timer.arr[this.id] = null;
	if(this.id > 100 && this.id == haxe.Timer.arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && haxe.Timer.arr[p] == null) p--;
		haxe.Timer.arr = haxe.Timer.arr.slice(0,p + 1);
	}
	this.id = null;
}
haxe.Timer.prototype.run = function() {
	null;
}
haxe.Timer.prototype.__class__ = haxe.Timer;
bpmjs.ObjectProxyTask = function(object,child) { if( object === $_ ) return; {
	this.object = object;
	this.child = child;
	bpmjs.Task.call(this);
	child.completeSignaler.bind($closure(this,"handleComplete"));
	child.errorSignaler.bind($closure(this,"handleError"));
}}
bpmjs.ObjectProxyTask.__name__ = ["bpmjs","ObjectProxyTask"];
bpmjs.ObjectProxyTask.__super__ = bpmjs.Task;
for(var k in bpmjs.Task.prototype ) bpmjs.ObjectProxyTask.prototype[k] = bpmjs.Task.prototype[k];
bpmjs.ObjectProxyTask.prototype.object = null;
bpmjs.ObjectProxyTask.prototype.child = null;
bpmjs.ObjectProxyTask.prototype.start = function() {
	bpmjs.Task.prototype.start.call(this);
	this.child.start();
}
bpmjs.ObjectProxyTask.prototype.setMonitor = function(value) {
	this.child.setMonitor(value);
	return value;
}
bpmjs.ObjectProxyTask.prototype.getMonitor = function() {
	return this.child.getMonitor();
}
bpmjs.ObjectProxyTask.prototype.handleComplete = function(v) {
	this.complete();
}
bpmjs.ObjectProxyTask.prototype.handleError = function(v) {
	this.error(this,v.error);
}
bpmjs.ObjectProxyTask.prototype.__class__ = bpmjs.ObjectProxyTask;
kumite.flyingman.Config = function(p) { if( p === $_ ) return; {
	this.flyingManClearLayer = new kumite.layer.ClearLayer();
	this.paperBackground = new kumite.layer.TextureLayer();
	this.paperBackground.textureConfig = kumite.flyingman.Config.PAPER;
	this.flyingManGraph = new kumite.flyingman.FlyingManGraph();
	this.flyingManLayer1 = new kumite.flyingman.FlyingManLayer();
	this.flyingManLayer1.cameraId = "flyingMan1";
	this.flyingManScene1 = new kumite.flyingman.FlyingManScene("B CLOSEUP 2");
	this.flyingManScene1.flyingManLayer = this.flyingManLayer1;
	this.flyingManLayer2 = new kumite.flyingman.FlyingManLayer();
	this.flyingManLayer2.cameraId = "flyingMan2";
	this.flyingManScene2 = new kumite.flyingman.FlyingManScene("FLYING MAN 2");
	this.flyingManScene2.flyingManLayer = this.flyingManLayer2;
	this.flyingManLayer3 = new kumite.flyingman.FlyingManLayer();
	this.flyingManLayer3.cameraId = "flyingMan3";
	this.flyingManScene3 = new kumite.flyingman.FlyingManScene("B CLOSEUP");
	this.flyingManScene3.flyingManLayer = this.flyingManLayer3;
	this.flyingManLayer4 = new kumite.flyingman.FlyingManLayer();
	this.flyingManLayer4.cameraId = "flyingMan4";
	this.flyingManScene4 = new kumite.flyingman.FlyingManScene("FLYING MAN 4");
	this.flyingManScene4.flyingManLayer = this.flyingManLayer4;
}}
kumite.flyingman.Config.__name__ = ["kumite","flyingman","Config"];
kumite.flyingman.Config.prototype.textureRegistry = null;
kumite.flyingman.Config.prototype.flyingManClearLayer = null;
kumite.flyingman.Config.prototype.paperBackground = null;
kumite.flyingman.Config.prototype.flyingManGraph = null;
kumite.flyingman.Config.prototype.flyingManLayer3 = null;
kumite.flyingman.Config.prototype.flyingManScene3 = null;
kumite.flyingman.Config.prototype.flyingManLayer1 = null;
kumite.flyingman.Config.prototype.flyingManScene1 = null;
kumite.flyingman.Config.prototype.flyingManLayer2 = null;
kumite.flyingman.Config.prototype.flyingManScene2 = null;
kumite.flyingman.Config.prototype.flyingManLayer4 = null;
kumite.flyingman.Config.prototype.flyingManScene4 = null;
kumite.flyingman.Config.prototype.startPrepare = function() {
	var group = new bpmjs.SequencerTaskGroup();
	group.add(new GLTextureLoadingTask(this.textureRegistry,kumite.flyingman.Config.PAPER));
	return group;
}
kumite.flyingman.Config.prototype.__class__ = kumite.flyingman.Config;
kumite.flyingman.Config.__interfaces__ = [haxe.rtti.Infos];
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
if(typeof shader=='undefined') shader = {}
shader.DisplayObjectVertex = function() { }
shader.DisplayObjectVertex.__name__ = ["shader","DisplayObjectVertex"];
shader.DisplayObjectVertex.prototype.__class__ = shader.DisplayObjectVertex;
ease.Back = function() { }
ease.Back.__name__ = ["ease","Back"];
ease.Back.easeIn = function(t,b,c,d) {
	var s = 1.70158;
	return c * (t /= d) * t * ((s + 1) * t - s) + b;
}
ease.Back.easeOut = function(t,b,c,d) {
	var s = 1.70158;
	return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}
ease.Back.easeInOut = function(t,b,c,d) {
	var s = 1.70158;
	if((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
}
ease.Back.prototype.__class__ = ease.Back;
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
kumite.stage.StageResizeAction = function(p) { if( p === $_ ) return; {
	null;
}}
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
GL = function() { }
GL.__name__ = ["GL"];
GL.gl = null;
GL.currentProgramm = null;
GL.init = function(canvas,antialias) {
	var params = { antialias : antialias};
	GL.gl = canvas.getContext("webg",params);
	if(GL.gl == null) GL.gl = canvas.getContext("experimental-webgl",params);
	if(GL.gl == null) {
		throw "Could not initialise WebGL.";
	}
	return GL.gl;
}
GL.useProgram = function(shaderProgramm) {
	GL.currentProgramm = shaderProgramm;
	GL.gl.useProgram(GL.currentProgramm);
}
GL.createProgram = function(vertexSourceClass,fragmentSourceClass) {
	GL.currentProgramm = GL.gl.createProgram();
	var vs = GL.gl.createShader(GL.gl.VERTEX_SHADER);
	GL.gl.shaderSource(vs,GL.createGLSLFromClass(vertexSourceClass));
	GL.gl.compileShader(vs);
	if(!GL.gl.getShaderParameter(vs,GL.gl.COMPILE_STATUS)) throw GL.gl.getShaderInfoLog(vs);
	var fs = GL.gl.createShader(GL.gl.FRAGMENT_SHADER);
	GL.gl.shaderSource(fs,GL.createGLSLFromClass(fragmentSourceClass));
	GL.gl.compileShader(fs);
	if(!GL.gl.getShaderParameter(fs,GL.gl.COMPILE_STATUS)) throw GL.gl.getShaderInfoLog(fs);
	GL.gl.attachShader(GL.currentProgramm,vs);
	GL.gl.attachShader(GL.currentProgramm,fs);
	GL.gl.linkProgram(GL.currentProgramm);
	if(!GL.gl.getProgramParameter(GL.currentProgramm,GL.gl.LINK_STATUS)) throw "Could not link shader!";
	return GL.currentProgramm;
}
GL.createGLSLFromClass = function(shaderClass) {
	var metaDatas = haxe.rtti.Meta.getType(shaderClass);
	var glsl = Reflect.field(metaDatas,"GLSL");
	if(glsl.length != 1) throw "Missing GLSL metadata in shader class: " + shaderClass;
	return glsl[0];
}
GL.createArrayBuffer = function(array,type) {
	if(type == null) type = 35044;
	var vertexBuffer = GL.gl.createBuffer();
	GL.gl.bindBuffer(GL.gl.ARRAY_BUFFER,vertexBuffer);
	GL.gl.bufferData(GL.gl.ARRAY_BUFFER,array,type);
	return vertexBuffer;
}
GL.getUniformLocation = function(name) {
	var location = GL.gl.getUniformLocation(GL.currentProgramm,name);
	if(location == null) haxe.Log.trace("Could not find " + name + " in shader",{ fileName : "GL.hx", lineNumber : 458, className : "GL", methodName : "getUniformLocation"});
	var result = new GLUniformLocation();
	result.location = location;
	return result;
}
GL.getAttribLocation2 = function(name,size,type) {
	var location = GL.gl.getAttribLocation(GL.currentProgramm,name);
	if(location == null || location == -1) {
		Log.posInfo = { fileName : "GL.hx", lineNumber : 469, className : "GL", methodName : "getAttribLocation2"};
		if(Log.filter(LogLevel.WARN)) {
			Log.fetchInput("getAttribLocation " + name + " returned -1 or null",null,null,null,null,null,null);
			console.warn(Log.createMessage());
		}
	}
	var result = new GLAttribLocation();
	result.location = location;
	result.size = size;
	result.type = type;
	return result;
}
GL.activeTexture = function(texture) {
	GL.gl.activeTexture(texture);
}
GL.bindBuffer = function(target,buffer) {
	GL.gl.bindBuffer(target,buffer);
}
GL.bindFramebuffer = function(target,framebuffer) {
	GL.gl.bindFramebuffer(target,framebuffer);
}
GL.bindRenderbuffer = function(target,renderbuffer) {
	GL.gl.bindRenderbuffer(target,renderbuffer);
}
GL.bindTexture = function(target,texture) {
	GL.gl.bindTexture(target,texture);
}
GL.blendFunc = function(sfactor,dfactor) {
	GL.gl.blendFunc(sfactor,dfactor);
}
GL.bufferData = function(target,data,usage) {
	GL.gl.bufferData(target,data,usage);
}
GL.bufferSubData = function(target,offset,data) {
	GL.gl.bufferSubData(target,offset,data);
}
GL.clear = function(mask) {
	GL.gl.clear(mask);
}
GL.clearColor = function(red,green,blue,alpha) {
	GL.gl.clearColor(red,green,blue,alpha);
}
GL.clearDepth = function(depth) {
	GL.gl.clearDepth(depth);
}
GL.compileShader = function(shader) {
	GL.gl.compileShader(shader);
}
GL.createBuffer = function() {
	return GL.gl.createBuffer();
}
GL.createFramebuffer = function() {
	return GL.gl.createFramebuffer();
}
GL.createRenderbuffer = function() {
	return GL.gl.createRenderbuffer();
}
GL.createTexture = function() {
	return GL.gl.createTexture();
}
GL.createShader = function(type) {
	return GL.gl.createShader(type);
}
GL.deleteBuffer = function(buffer) {
	GL.gl.deleteBuffer(buffer);
}
GL.depthFunc = function(func) {
	GL.gl.depthFunc(func);
}
GL.disable = function(cap) {
	GL.gl.disable(cap);
}
GL.drawArrays = function(mode,first,count) {
	GL.gl.drawArrays(mode,first,count);
}
GL.drawElements = function(mode,count,type,offset) {
	GL.gl.drawElements(mode,count,type,offset);
}
GL.enable = function(cap) {
	GL.gl.enable(cap);
}
GL.enableVertexAttribArray = function(index) {
	GL.gl.enableVertexAttribArray(index);
}
GL.framebufferRenderbuffer = function(target,attachment,renderbuffertarget,renderbuffer) {
	GL.gl.framebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer);
}
GL.framebufferTexture2D = function(target,attachment,textarget,texture,level) {
	GL.gl.framebufferTexture2D(target,attachment,textarget,texture,level);
}
GL.generateMipmap = function(target) {
	GL.gl.generateMipmap(target);
}
GL.getAttribLocation = function(program,name) {
	return GL.gl.getAttribLocation(program,name);
}
GL.getShaderInfoLog = function(shader) {
	return GL.gl.getShaderInfoLog(shader);
}
GL.getShaderParameter = function(shader,pname) {
	GL.gl.getShaderParameter(shader,pname);
}
GL.getProgramParameter = function(program,pname) {
	GL.gl.getProgramParameter(program,pname);
}
GL.linkProgram = function(program) {
	GL.gl.linkProgram(program);
}
GL.renderbufferStorage = function(target,internalformat,width,height) {
	GL.gl.renderbufferStorage(target,internalformat,width,height);
}
GL.shaderSource = function(shader,source) {
	GL.gl.shaderSource(shader,source);
}
GL.texImage2DArrayBufferView = function(target,level,internalformat,width,height,border,format,type,pixels) {
	GL.gl.texImage2D(target,level,internalformat,width,height,border,format,type,pixels);
}
GL.texImage2DImageData = function(target,level,internalformat,format,type,pixels) {
	GL.gl.texImage2D(target,level,internalformat,format,type,pixels);
}
GL.texImage2DImage = function(target,level,internalformat,format,type,image) {
	GL.gl.texImage2D(target,level,internalformat,format,type,image);
}
GL.texImage2DCanvas = function(target,level,internalformat,format,type,canvas) {
	GL.gl.texImage2D(target,level,internalformat,format,type,canvas);
}
GL.texImage2DVideo = function(target,level,internalformat,format,type,video) {
	GL.gl.texImage2D(target,level,internalformat,format,type,video);
}
GL.texParameteri = function(target,pname,param) {
	GL.gl.texParameteri(target,pname,param);
}
GL.vertexAttribPointer = function(indx,size,type,normalized,stride,offset) {
	GL.gl.vertexAttribPointer(indx,size,type,normalized,stride,offset);
}
GL.viewport = function(x,y,width,height) {
	GL.gl.viewport(x,y,width,height);
}
GL.prototype.__class__ = GL;
GLStats = function(p) { if( p === $_ ) return; {
	GLDisplayObjectContainer.call(this);
	this.enterFrameSignaler.bind($closure(this,"handleEnterFrame"));
	this.label = new GLLabel();
	this.label.setX(10);
	this.label.setY(10);
	this.label.setWidth(100);
	this.label.setHeight(20);
	this.addChild(this.label);
}}
GLStats.__name__ = ["GLStats"];
GLStats.__super__ = GLDisplayObjectContainer;
for(var k in GLDisplayObjectContainer.prototype ) GLStats.prototype[k] = GLDisplayObjectContainer.prototype[k];
GLStats.prototype.label = null;
GLStats.prototype.lastDraw = null;
GLStats.prototype.handleEnterFrame = function(frame) {
	if(this.lastDraw < frame.time - 100) {
		this.lastDraw = frame.time;
		var line = 0;
		{
			var _g = 0, _g1 = bpmjs.Stats.getContents();
			while(_g < _g1.length) {
				var message = _g1[_g];
				++_g;
				this.label.setText(message);
				line++;
			}
		}
	}
}
GLStats.prototype.__class__ = GLStats;
kumite.framebuffereffect.FBTextureLayer = function(p) { if( p === $_ ) return; {
	this.scale = 1;
	this.transitions = new kumite.layer.LayerTransitions();
	this.transitions.add(this.cutTransition = new kumite.layer.LayerTransition("cut"));
	this.transitions.add(this.moveTransition = new kumite.layer.LayerTransition("move"));
	this.transitions.add(this.alphaTransition = new kumite.layer.LayerTransition("alpha"));
	this.transitions.enableChild("alpha");
}}
kumite.framebuffereffect.FBTextureLayer.__name__ = ["kumite","framebuffereffect","FBTextureLayer"];
kumite.framebuffereffect.FBTextureLayer.prototype.stage = null;
kumite.framebuffereffect.FBTextureLayer.prototype.time = null;
kumite.framebuffereffect.FBTextureLayer.prototype.transitions = null;
kumite.framebuffereffect.FBTextureLayer.prototype.cutTransition = null;
kumite.framebuffereffect.FBTextureLayer.prototype.moveTransition = null;
kumite.framebuffereffect.FBTextureLayer.prototype.alphaTransition = null;
kumite.framebuffereffect.FBTextureLayer.prototype.texture = null;
kumite.framebuffereffect.FBTextureLayer.prototype.scale = null;
kumite.framebuffereffect.FBTextureLayer.prototype.shaderProgram = null;
kumite.framebuffereffect.FBTextureLayer.prototype.vertexPositionAttribute = null;
kumite.framebuffereffect.FBTextureLayer.prototype.vertexBuffer = null;
kumite.framebuffereffect.FBTextureLayer.prototype.projectionMatrixUniform = null;
kumite.framebuffereffect.FBTextureLayer.prototype.worldViewMatrixUniform = null;
kumite.framebuffereffect.FBTextureLayer.prototype.textureUniform = null;
kumite.framebuffereffect.FBTextureLayer.prototype.alphaUniform = null;
kumite.framebuffereffect.FBTextureLayer.prototype.init = function() {
	this.shaderProgram = GL.createProgram(kumite.framebuffereffect._FBTextureLayer.Vertex,kumite.framebuffereffect._FBTextureLayer.Fragment);
	this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
	this.vertexPositionAttribute.updateBuffer(new Int8Array([0,0,1,0,0,1,1,1]));
	this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
	this.worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
	this.textureUniform = GL.getUniformLocation("texture");
	this.alphaUniform = GL.getUniformLocation("alpha");
}
kumite.framebuffereffect.FBTextureLayer.prototype.renderTransition = function(transitionContext) {
	this.transitions.setTransition(transitionContext.getTransition());
	this.render();
}
kumite.framebuffereffect.FBTextureLayer.prototype.render = function() {
	GL.useProgram(this.shaderProgram);
	GL.gl.viewport(0,0,this.stage.width,this.stage.height);
	GL.gl.disable(2929);
	GL.gl.enable(3042);
	GL.gl.blendFunc(770,771);
	var projectionMatrix = new Matrix4();
	projectionMatrix.setOrtho(0,this.stage.width,this.stage.height,0,0,1);
	GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,projectionMatrix.buffer);
	this.vertexPositionAttribute.vertexAttribPointer();
	var worldViewMatrix = new Matrix4();
	worldViewMatrix.appendScale(this.texture.width * this.scale,this.texture.height * this.scale,1);
	worldViewMatrix.appendTranslation((this.stage.width - this.texture.width * this.scale) / 2,(this.stage.height - this.texture.height * this.scale) / 2,0);
	GL.gl.uniformMatrix4fv(this.worldViewMatrixUniform.location,false,worldViewMatrix.buffer);
	GL.gl.activeTexture(33984);
	GL.gl.bindTexture(3553,this.texture.texture);
	GL.gl.uniform1i(this.textureUniform.location,0);
	GL.gl.uniform1f(this.alphaUniform.location,this.alphaTransition.getTransition());
	this.vertexPositionAttribute.drawArrays(5);
}
kumite.framebuffereffect.FBTextureLayer.prototype.__class__ = kumite.framebuffereffect.FBTextureLayer;
kumite.framebuffereffect.FBTextureLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
if(!kumite.framebuffereffect._FBTextureLayer) kumite.framebuffereffect._FBTextureLayer = {}
kumite.framebuffereffect._FBTextureLayer.Vertex = function() { }
kumite.framebuffereffect._FBTextureLayer.Vertex.__name__ = ["kumite","framebuffereffect","_FBTextureLayer","Vertex"];
kumite.framebuffereffect._FBTextureLayer.Vertex.prototype.__class__ = kumite.framebuffereffect._FBTextureLayer.Vertex;
kumite.framebuffereffect._FBTextureLayer.Fragment = function() { }
kumite.framebuffereffect._FBTextureLayer.Fragment.__name__ = ["kumite","framebuffereffect","_FBTextureLayer","Fragment"];
kumite.framebuffereffect._FBTextureLayer.Fragment.prototype.__class__ = kumite.framebuffereffect._FBTextureLayer.Fragment;
kumite.layer.TextureLayer = function(p) { if( p === $_ ) return; {
	this.scale = 1;
	this.transitions = new kumite.layer.LayerTransitions();
	this.transitions.add(this.cutTransition = new kumite.layer.LayerTransition("cut"));
	this.transitions.add(this.moveTransition = new kumite.layer.LayerTransition("move"));
	this.transitions.add(this.alphaTransition = new kumite.layer.LayerTransition("alpha"));
	this.transitions.enableChild("alpha");
}}
kumite.layer.TextureLayer.__name__ = ["kumite","layer","TextureLayer"];
kumite.layer.TextureLayer.prototype.stage = null;
kumite.layer.TextureLayer.prototype.time = null;
kumite.layer.TextureLayer.prototype.textureRegistry = null;
kumite.layer.TextureLayer.prototype.transitions = null;
kumite.layer.TextureLayer.prototype.cutTransition = null;
kumite.layer.TextureLayer.prototype.moveTransition = null;
kumite.layer.TextureLayer.prototype.alphaTransition = null;
kumite.layer.TextureLayer.prototype.scale = null;
kumite.layer.TextureLayer.prototype.textureConfig = null;
kumite.layer.TextureLayer.prototype.shaderProgram = null;
kumite.layer.TextureLayer.prototype.vertexPositionAttribute = null;
kumite.layer.TextureLayer.prototype.vertexBuffer = null;
kumite.layer.TextureLayer.prototype.projectionMatrixUniform = null;
kumite.layer.TextureLayer.prototype.worldViewMatrixUniform = null;
kumite.layer.TextureLayer.prototype.textureUniform = null;
kumite.layer.TextureLayer.prototype.alphaUniform = null;
kumite.layer.TextureLayer.prototype.init = function() {
	this.shaderProgram = GL.createProgram(kumite.layer._TextureLayer.Vertex,kumite.layer._TextureLayer.Fragment);
	this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
	this.vertexPositionAttribute.updateBuffer(new Int8Array([0,0,1,0,0,1,1,1]));
	this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
	this.worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
	this.textureUniform = GL.getUniformLocation("texture");
	this.alphaUniform = GL.getUniformLocation("alpha");
}
kumite.layer.TextureLayer.prototype.renderTransition = function(transitionContext) {
	this.transitions.setTransition(transitionContext.getTransition());
	this.render();
}
kumite.layer.TextureLayer.prototype.render = function() {
	GL.useProgram(this.shaderProgram);
	GL.gl.viewport(0,0,this.stage.width,this.stage.height);
	GL.gl.disable(2929);
	GL.gl.enable(3042);
	GL.gl.blendFunc(770,771);
	var projectionMatrix = new Matrix4();
	projectionMatrix.setOrtho(0,this.stage.width,this.stage.height,0,0,1);
	GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,projectionMatrix.buffer);
	this.vertexPositionAttribute.vertexAttribPointer();
	var texture = this.textureRegistry.get(this.textureConfig);
	var worldViewMatrix = new Matrix4();
	worldViewMatrix.appendScale(texture.width * this.scale,texture.height * this.scale,1);
	worldViewMatrix.appendTranslation((this.stage.width - texture.width * this.scale) / 2,(this.stage.height - texture.height * this.scale) / 2,0);
	GL.gl.uniformMatrix4fv(this.worldViewMatrixUniform.location,false,worldViewMatrix.buffer);
	{
		GL.gl.activeTexture(33984);
		GL.gl.bindTexture(3553,texture.texture);
		GL.gl.uniform1i(this.textureUniform.location,0);
	}
	GL.gl.uniform1f(this.alphaUniform.location,this.alphaTransition.getTransition());
	this.vertexPositionAttribute.drawArrays(5);
}
kumite.layer.TextureLayer.prototype.__class__ = kumite.layer.TextureLayer;
kumite.layer.TextureLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
if(!kumite.layer._TextureLayer) kumite.layer._TextureLayer = {}
kumite.layer._TextureLayer.Vertex = function() { }
kumite.layer._TextureLayer.Vertex.__name__ = ["kumite","layer","_TextureLayer","Vertex"];
kumite.layer._TextureLayer.Vertex.prototype.__class__ = kumite.layer._TextureLayer.Vertex;
kumite.layer._TextureLayer.Fragment = function() { }
kumite.layer._TextureLayer.Fragment.__name__ = ["kumite","layer","_TextureLayer","Fragment"];
kumite.layer._TextureLayer.Fragment.prototype.__class__ = kumite.layer._TextureLayer.Fragment;
GLHitareaPicker = function(p) { if( p === $_ ) return; {
	null;
}}
GLHitareaPicker.__name__ = ["GLHitareaPicker"];
GLHitareaPicker.prototype.stageMousePosition = null;
GLHitareaPicker.prototype.result = null;
GLHitareaPicker.prototype.pick = function(stage,mousePosition) {
	this.stageMousePosition = mousePosition.clone();
	this.stageMousePosition.multiply(stage.stageWidth,stage.stageHeight);
	this.result = null;
	this.pickRecursive(stage,new Matrix4());
	return this.result;
}
GLHitareaPicker.prototype.pickRecursive = function(displayObjectContainer,parentMatrix) {
	var _g = 0, _g1 = displayObjectContainer.children;
	while(_g < _g1.length) {
		var displayObject = _g1[_g];
		++_g;
		var matrix = this.pickDisplayObject(displayObject,parentMatrix);
		if(Std["is"](displayObject,GLInteractiveObject)) {
			var interactiveObject = (function($this) {
				var $r;
				var $t = displayObject;
				if(Std["is"]($t,GLInteractiveObject)) $t;
				else throw "Class cast error";
				$r = $t;
				return $r;
			}(this));
			if(interactiveObject.hitarea.isUnder(matrix,this.stageMousePosition)) this.result = interactiveObject;
		}
		if(Std["is"](displayObject,GLDisplayObjectContainer)) {
			this.pickRecursive(displayObject,matrix);
		}
	}
}
GLHitareaPicker.prototype.pickDisplayObject = function(displayObject,parentMatrix) {
	displayObject.validateTransform();
	var result = new Matrix4();
	result.append(parentMatrix);
	result.append(displayObject.matrix);
	return result;
}
GLHitareaPicker.prototype.__class__ = GLHitareaPicker;
shader.DisplayObjectFragment = function() { }
shader.DisplayObjectFragment.__name__ = ["shader","DisplayObjectFragment"];
shader.DisplayObjectFragment.prototype.__class__ = shader.DisplayObjectFragment;
kumite.scene.DefaultScene = function(name) { if( name === $_ ) return; {
	this.name = name;
	this.preconfiguredLifecycles = new Array();
}}
kumite.scene.DefaultScene.__name__ = ["kumite","scene","DefaultScene"];
kumite.scene.DefaultScene.prototype.name = null;
kumite.scene.DefaultScene.prototype.preconfiguredLifecycles = null;
kumite.scene.DefaultScene.prototype.addLayerLifecycle = function(lifecycle,layerId) {
	var lifecycleAndLayerId = new kumite.scene._DefaultScene.LifecycleAndLayerId();
	lifecycleAndLayerId.lifecycle = lifecycle;
	lifecycleAndLayerId.layerId = layerId;
	this.preconfiguredLifecycles.push(lifecycleAndLayerId);
}
kumite.scene.DefaultScene.prototype.sceneInit = function(scene) {
	scene.name = this.name;
	this.addPreconfiguredLifecycles(scene);
}
kumite.scene.DefaultScene.prototype.initTransition = function(transitionContext) {
	null;
}
kumite.scene.DefaultScene.prototype.renderTransition = function(transitionContext) {
	null;
}
kumite.scene.DefaultScene.prototype.render = function() {
	null;
}
kumite.scene.DefaultScene.prototype.addPreconfiguredLifecycles = function(scene) {
	var _g = 0, _g1 = this.preconfiguredLifecycles;
	while(_g < _g1.length) {
		var lifecycle = _g1[_g];
		++_g;
		scene.addLayer(new kumite.scene.DelegateLayer(lifecycle.lifecycle,lifecycle.layerId));
	}
}
kumite.scene.DefaultScene.prototype.__class__ = kumite.scene.DefaultScene;
kumite.scene.DefaultScene.__interfaces__ = [haxe.rtti.Infos,kumite.scene.SceneLifecycle];
if(!kumite.scene._DefaultScene) kumite.scene._DefaultScene = {}
kumite.scene._DefaultScene.LifecycleAndLayerId = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.scene._DefaultScene.LifecycleAndLayerId.__name__ = ["kumite","scene","_DefaultScene","LifecycleAndLayerId"];
kumite.scene._DefaultScene.LifecycleAndLayerId.prototype.lifecycle = null;
kumite.scene._DefaultScene.LifecycleAndLayerId.prototype.layerId = null;
kumite.scene._DefaultScene.LifecycleAndLayerId.prototype.__class__ = kumite.scene._DefaultScene.LifecycleAndLayerId;
kumite.camera.Config = function(p) { if( p === $_ ) return; {
	this.camera = new kumite.camera.Camera();
	this.cameraMouseMover = new kumite.camera.CameraMouseMover();
}}
kumite.camera.Config.__name__ = ["kumite","camera","Config"];
kumite.camera.Config.prototype.camera = null;
kumite.camera.Config.prototype.cameraMouseMover = null;
kumite.camera.Config.prototype.__class__ = kumite.camera.Config;
kumite.camera.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.vjinterface.Config = function(p) { if( p === $_ ) return; {
	this.vjinterface = new kumite.vjinterface.VJInterface();
}}
kumite.vjinterface.Config.__name__ = ["kumite","vjinterface","Config"];
kumite.vjinterface.Config.prototype.vjinterface = null;
kumite.vjinterface.Config.prototype.__class__ = kumite.vjinterface.Config;
kumite.vjinterface.Config.__interfaces__ = [haxe.rtti.Infos];
Timeout = function() { }
Timeout.__name__ = ["Timeout"];
Timeout.execute = function(ms,method) {
	var timer = new haxe.Timer(ms);
	var run = function() {
		method();
		timer.stop();
	}
	timer.run = run;
}
Timeout.prototype.__class__ = Timeout;
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
haxe.exception.ArgumentNullException = function(argumentName,numberOfStackTraceShifts) { if( argumentName === $_ ) return; {
	haxe.exception.Exception.call(this,"Argument " + argumentName + " must be non-null",null,numberOfStackTraceShifts);
}}
haxe.exception.ArgumentNullException.__name__ = ["haxe","exception","ArgumentNullException"];
haxe.exception.ArgumentNullException.__super__ = haxe.exception.Exception;
for(var k in haxe.exception.Exception.prototype ) haxe.exception.ArgumentNullException.prototype[k] = haxe.exception.Exception.prototype[k];
haxe.exception.ArgumentNullException.prototype.__class__ = haxe.exception.ArgumentNullException;
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
	var result = Lambda.filter(this.objects,this.getFilterByType(type));
	if(result.length == 1) return result.first().object;
	else if(result.length > 1) throw "Multiple objects of type: " + result.first().classInfo.name + " found";
	else return null;
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
	}
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
kumite.mouse.Config = function(p) { if( p === $_ ) return; {
	this.mouseController = new kumite.mouse.MouseController();
}}
kumite.mouse.Config.__name__ = ["kumite","mouse","Config"];
kumite.mouse.Config.prototype.mouseController = null;
kumite.mouse.Config.prototype.__class__ = kumite.mouse.Config;
kumite.mouse.Config.__interfaces__ = [haxe.rtti.Infos];
GLTweenManager = function(p) { if( p === $_ ) return; {
	this.time = Date.now().getTime();
	this.tweens = new Array();
	GLAnimationFrame.run($closure(this,"tick"));
}}
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
	{
		var _g = 0, _g1 = this.tweens;
		while(_g < _g1.length) {
			var tween = _g1[_g];
			++_g;
			tween.run(this.time);
			if(!tween.isActive) this.tweens.remove(tween);
		}
	}
}
GLTweenManager.prototype.__class__ = GLTweenManager;
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
			if(sceneLayer.layerId == layer.layerId) return true;
		}
	}
	return false;
}
kumite.scene.Scene.prototype.getLayerIndex = function(layer) {
	{
		var _g1 = 0, _g = this.layers.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.layers[i].layerId == layer.layerId) return i;
		}
	}
	return -1;
}
kumite.scene.Scene.prototype.__class__ = kumite.scene.Scene;
bpmjs.ContextConfig = function(p) { if( p === $_ ) return; {
	null;
}}
bpmjs.ContextConfig.__name__ = ["bpmjs","ContextConfig"];
bpmjs.ContextConfig.prototype.frontMessenger = null;
bpmjs.ContextConfig.prototype.__class__ = bpmjs.ContextConfig;
GLTween = function(o,ms,params) { if( o === $_ ) return; {
	this.o = o;
	this.ms = ms;
	this.params = params;
	this.isActive = true;
	this.properties = new Array();
	this.completeSignaler = new hsl.haxe.DirectSignaler(this);
}}
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
	this.easeFunction = $closure(ease.Quad,"easeInOut");
	var fields = Reflect.fields(this.params);
	{
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
			}
			else {
				{
					Log.posInfo = { fileName : "GLTween.hx", lineNumber : 56, className : "GLTween", methodName : "init"};
					if(Log.filter(LogLevel.WARN)) {
						Log.fetchInput("Unkown field: " + field,null,null,null,null,null,null);
						console.warn(Log.createMessage());
					}
				}
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
	{
		var _g = 0, _g1 = this.properties;
		while(_g < _g1.length) {
			var property = _g1[_g];
			++_g;
			property.ease(this,dt);
		}
	}
}
GLTween.prototype.__class__ = GLTween;
Property = function(p) { if( p === $_ ) return; {
	null;
}}
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
kumite.flyingman.FlyingManGraph = function(p) { if( p === $_ ) return; {
	this.firstUpdate = true;
	this.updatedThisFrame = false;
}}
kumite.flyingman.FlyingManGraph.__name__ = ["kumite","flyingman","FlyingManGraph"];
kumite.flyingman.FlyingManGraph.prototype.textureRegistry = null;
kumite.flyingman.FlyingManGraph.prototype.time = null;
kumite.flyingman.FlyingManGraph.prototype.sprites = null;
kumite.flyingman.FlyingManGraph.prototype.butterfly = null;
kumite.flyingman.FlyingManGraph.prototype.butterflyCloseupCamera = null;
kumite.flyingman.FlyingManGraph.prototype.butterflyCloseupCamera2 = null;
kumite.flyingman.FlyingManGraph.prototype.butterflyLife = null;
kumite.flyingman.FlyingManGraph.prototype.firstUpdate = null;
kumite.flyingman.FlyingManGraph.prototype.updatedThisFrame = null;
kumite.flyingman.FlyingManGraph.prototype.startPrepare = function() {
	var group = new bpmjs.SequencerTaskGroup();
	group.add(new GLTextureLoadingTask(this.textureRegistry,kumite.flyingman.FlyingManGraph.MAN1));
	group.add(new GLTextureLoadingTask(this.textureRegistry,kumite.flyingman.FlyingManGraph.MAN2));
	group.add(new GLTextureLoadingTask(this.textureRegistry,kumite.flyingman.FlyingManGraph.MAN3));
	group.add(new GLTextureLoadingTask(this.textureRegistry,kumite.flyingman.FlyingManGraph.FLOWER1));
	group.add(new GLTextureLoadingTask(this.textureRegistry,kumite.flyingman.FlyingManGraph.FLOWER2));
	group.add(new GLTextureLoadingTask(this.textureRegistry,kumite.flyingman.FlyingManGraph.BUTTERFLY));
	return group;
}
kumite.flyingman.FlyingManGraph.prototype.start = function() {
	this.sprites = new Array();
	{
		var _g = 0;
		while(_g < 1000) {
			var i = _g++;
			var sprite = new kumite.flyingman.Sprite();
			sprite.position.x = -100 + Math.random() * 200;
			sprite.position.y = 0;
			sprite.position.z = -100 + Math.random() * 200;
			sprite.texture = this.textureRegistry.get(kumite.flyingman.FlyingManGraph.MAN1);
			sprite.rotationY = -3 + Math.random() * 6;
			this.sprites.push(sprite);
		}
	}
	this.butterfly = new kumite.flyingman.Sprite();
	this.butterfly.position.x = 0;
	this.butterfly.position.y = 3;
	this.butterfly.position.z = 0;
	this.butterfly.texture = this.textureRegistry.get(kumite.flyingman.FlyingManGraph.BUTTERFLY);
	this.butterflyLife = new kumite.flyingman.ButterflyLife();
	this.butterflyLife.time = this.time;
	this.butterflyLife.sprite = this.butterfly;
	this.butterflyCloseupCamera = new kumite.flyingman.ButterflyCloseupCamera();
	this.butterflyCloseupCamera.butterfly = this.butterflyLife;
	this.butterflyCloseupCamera.sprite = this.butterfly;
	this.butterflyCloseupCamera.time = this.time;
	this.butterflyCloseupCamera2 = new kumite.flyingman.ButterflyCloseupCamera2();
	this.butterflyCloseupCamera2.butterfly = this.butterflyLife;
	this.butterflyCloseupCamera2.sprite = this.butterfly;
	this.butterflyCloseupCamera2.time = this.time;
	this.sprites.push(this.butterfly);
}
kumite.flyingman.FlyingManGraph.prototype.tick = function(tick) {
	this.updatedThisFrame = false;
}
kumite.flyingman.FlyingManGraph.prototype.update = function() {
	if(!this.updatedThisFrame) {
		this.updatedThisFrame = true;
		this.updateInternal();
	}
}
kumite.flyingman.FlyingManGraph.prototype.updateInternal = function() {
	if(this.firstUpdate) {
		this.butterflyLife.init();
		this.butterflyCloseupCamera.init();
		this.butterflyCloseupCamera2.init();
		this.firstUpdate = false;
	}
	this.butterflyLife.update();
	this.butterflyCloseupCamera.update();
	this.butterflyCloseupCamera2.update();
}
kumite.flyingman.FlyingManGraph.prototype.__class__ = kumite.flyingman.FlyingManGraph;
kumite.flyingman.FlyingManGraph.__interfaces__ = [haxe.rtti.Infos];
GLTextureAtlasPartConfig = function(p) { if( p === $_ ) return; {
	null;
}}
GLTextureAtlasPartConfig.__name__ = ["GLTextureAtlasPartConfig"];
GLTextureAtlasPartConfig.create = function(atlas,location) {
	var result = new GLTextureAtlasPartConfig();
	result.location = location;
	result.atlas = atlas;
	atlas.add(result);
	return result;
}
GLTextureAtlasPartConfig.prototype.location = null;
GLTextureAtlasPartConfig.prototype.atlas = null;
GLTextureAtlasPartConfig.prototype.width = null;
GLTextureAtlasPartConfig.prototype.height = null;
GLTextureAtlasPartConfig.prototype.u0 = null;
GLTextureAtlasPartConfig.prototype.v0 = null;
GLTextureAtlasPartConfig.prototype.u1 = null;
GLTextureAtlasPartConfig.prototype.v1 = null;
GLTextureAtlasPartConfig.prototype.toString = function() {
	return "[GLTextureAtlasPartConfig: " + this.location + " uv:" + this.u0 + ", " + this.v0 + ", " + this.u1 + ", " + this.v1 + ", size: " + this.width + ", " + this.height + " ]";
}
GLTextureAtlasPartConfig.prototype.__class__ = GLTextureAtlasPartConfig;
kumite.flyingman.FlyingManScene = function(sceneId) { if( sceneId === $_ ) return; {
	this.sceneId = sceneId;
}}
kumite.flyingman.FlyingManScene.__name__ = ["kumite","flyingman","FlyingManScene"];
kumite.flyingman.FlyingManScene.prototype.flyingManClearLayer = null;
kumite.flyingman.FlyingManScene.prototype.paperBackground = null;
kumite.flyingman.FlyingManScene.prototype.displayList = null;
kumite.flyingman.FlyingManScene.prototype.textureRegistry = null;
kumite.flyingman.FlyingManScene.prototype.graph = null;
kumite.flyingman.FlyingManScene.prototype.flyingManLayer = null;
kumite.flyingman.FlyingManScene.prototype.sceneId = null;
kumite.flyingman.FlyingManScene.prototype.sceneInit = function(scene) {
	scene.id = scene.name = this.sceneId;
	scene.addLayer(new kumite.scene.DelegateLayer(this.flyingManClearLayer,kumite.layer.LayerId.CLEAR));
	scene.addLayer(new kumite.scene.DelegateLayer(this.paperBackground));
	scene.addLayer(new kumite.scene.DelegateLayer(this.flyingManLayer));
	scene.addLayer(new kumite.scene.DelegateLayer(this.displayList));
}
kumite.flyingman.FlyingManScene.prototype.initTransition = function(transitionContext) {
	this.paperBackground.alphaTransition.ease = $closure(ease.Quad,"easeInOut");
	var $e = transitionContext.direction;
	switch( $e[1] ) {
	case 0:
	{
		this.paperBackground.transitions.enableChild("alpha");
	}break;
	case 1:
	{
		this.paperBackground.transitions.enableChild("cut");
	}break;
	}
}
kumite.flyingman.FlyingManScene.prototype.renderTransition = function(transitionContext) {
	this.render();
}
kumite.flyingman.FlyingManScene.prototype.render = function() {
	this.graph.update();
}
kumite.flyingman.FlyingManScene.prototype.__class__ = kumite.flyingman.FlyingManScene;
kumite.flyingman.FlyingManScene.__interfaces__ = [haxe.rtti.Infos,kumite.scene.SceneLifecycle];
bpmjs.Stats = function() { }
bpmjs.Stats.__name__ = ["bpmjs","Stats"];
bpmjs.Stats.initialized = null;
bpmjs.Stats.lastTime = null;
bpmjs.Stats.times = null;
bpmjs.Stats.finishedTimes = null;
bpmjs.Stats.messages = null;
bpmjs.Stats.init = function() {
	bpmjs.Stats.clear();
	bpmjs.Stats.initialized = true;
}
bpmjs.Stats.clear = function() {
	bpmjs.Stats.times = new Array();
	bpmjs.Stats.finishedTimes = new Array();
	bpmjs.Stats.messages = new Array();
}
bpmjs.Stats.measureFPS = function() {
	bpmjs.Stats.checkInit();
	var time = Date.now().getTime();
	bpmjs.Stats.fps = 1000 / (time - bpmjs.Stats.lastTime);
	bpmjs.Stats.lastTime = time;
}
bpmjs.Stats.checkStart = function(message) {
	bpmjs.Stats.checkInit();
	var time = Date.now().getTime();
	bpmjs.Stats.times.push({ start : time, stop : 0.0, message : message});
}
bpmjs.Stats.addMessage = function(message) {
	bpmjs.Stats.checkInit();
	bpmjs.Stats.messages.push(message);
}
bpmjs.Stats.checkStop = function() {
	bpmjs.Stats.checkInit();
	var timeAndMessage = bpmjs.Stats.times.pop();
	timeAndMessage.stop = Date.now().getTime();
	bpmjs.Stats.finishedTimes.push(timeAndMessage);
}
bpmjs.Stats.getContents = function() {
	var finalMessages = new Array();
	finalMessages.push("FPS: " + Math.round(bpmjs.Stats.fps));
	{
		var _g = 0, _g1 = bpmjs.Stats.finishedTimes;
		while(_g < _g1.length) {
			var timeAndMessage = _g1[_g];
			++_g;
			finalMessages.push(" > " + timeAndMessage.message + ": " + (timeAndMessage.stop - timeAndMessage.start) + " ms");
		}
	}
	{
		var _g = 0, _g1 = bpmjs.Stats.messages;
		while(_g < _g1.length) {
			var message = _g1[_g];
			++_g;
			finalMessages.push(message);
		}
	}
	return finalMessages;
}
bpmjs.Stats.checkInit = function() {
	if(!bpmjs.Stats.initialized) bpmjs.Stats.init();
}
bpmjs.Stats.prototype.__class__ = bpmjs.Stats;
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
kumite.launch.Config = function(p) { if( p === $_ ) return; {
	this.launcher = new kumite.launch.Launcher();
	this.sequencer = new bpmjs.Sequencer();
	this.preloadDisplay = new kumite.launch.PreloadDisplay();
}}
kumite.launch.Config.__name__ = ["kumite","launch","Config"];
kumite.launch.Config.prototype.sequencer = null;
kumite.launch.Config.prototype.launcher = null;
kumite.launch.Config.prototype.preloadDisplay = null;
kumite.launch.Config.prototype.__class__ = kumite.launch.Config;
kumite.launch.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.framebuffereffect.FBDisableLayer = function(p) { if( p === $_ ) return; {
	null;
}}
kumite.framebuffereffect.FBDisableLayer.__name__ = ["kumite","framebuffereffect","FBDisableLayer"];
kumite.framebuffereffect.FBDisableLayer.prototype.init = function() {
	null;
}
kumite.framebuffereffect.FBDisableLayer.prototype.renderTransition = function(transitionContext) {
	this.render();
}
kumite.framebuffereffect.FBDisableLayer.prototype.render = function() {
	GL.gl.bindFramebuffer(36160,null);
}
kumite.framebuffereffect.FBDisableLayer.prototype.__class__ = kumite.framebuffereffect.FBDisableLayer;
kumite.framebuffereffect.FBDisableLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
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
kumite.time.Time = function(p) { if( p === $_ ) return; {
	this.reset();
}}
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
GLLabel = function(p) { if( p === $_ ) return; {
	GLInteractiveObject.call(this);
}}
GLLabel.__name__ = ["GLLabel"];
GLLabel.__super__ = GLInteractiveObject;
for(var k in GLInteractiveObject.prototype ) GLLabel.prototype[k] = GLInteractiveObject.prototype[k];
GLLabel.prototype.text = null;
GLLabel.prototype.validateGraphics = function() {
	if(this.getGraphicIsInvalid()) {
		this.renderText();
		GLInteractiveObject.prototype.validateGraphics.call(this);
	}
}
GLLabel.prototype.renderText = function() {
	var textMetrics = new Text();
	textMetrics.text = this.text;
	textMetrics.font = "12px Arial";
	this.graphic.clear(new Color(0.3,0.3,0.3,0.8));
	this.graphic.setFillStyle(new Color(1,1,1,0.8));
	this.graphic.setFont(textMetrics.font);
	this.graphic.fillText(textMetrics.text,(this.width - textMetrics.getWidth()) / 2,14);
}
GLLabel.prototype.setText = function(text) {
	if(this.text != text) {
		this.setGraphicIsInvalid(true);
		this.text = text;
	}
	return text;
}
GLLabel.prototype.__class__ = GLLabel;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
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
	Xml.Element = "element";
	Xml.PCData = "pcdata";
	Xml.CData = "cdata";
	Xml.Comment = "comment";
	Xml.DocType = "doctype";
	Xml.Prolog = "prolog";
	Xml.Document = "document";
}
Log.filters = new Array();
Log.args = new Array();
Log.errors = new Array();
kumite.framebuffereffect.Config.__meta__ = { fields : { displayListLayer : { Inject : null}, complete : { Complete : null}}};
kumite.framebuffereffect.Config.__rtti = "<class path=\"kumite.framebuffereffect.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<displayListLayer public=\"1\"><c path=\"kumite.displaylist.DisplayListLayer\"/></displayListLayer>\n\t<fbClearLayer1 public=\"1\"><c path=\"kumite.layer.ClearLayer\"/></fbClearLayer1>\n\t<fbClearLayer2 public=\"1\"><c path=\"kumite.layer.ClearLayer\"/></fbClearLayer2>\n\t<fbLayer public=\"1\"><c path=\"kumite.framebuffereffect.FBLayer\"/></fbLayer>\n\t<fbEnableLayer public=\"1\"><c path=\"kumite.framebuffereffect.FBEnableLayer\"/></fbEnableLayer>\n\t<fbDisableLayer public=\"1\"><c path=\"kumite.framebuffereffect.FBDisableLayer\"/></fbDisableLayer>\n\t<fbTextureLayer public=\"1\"><c path=\"kumite.framebuffereffect.FBTextureLayer\"/></fbTextureLayer>\n\t<scene public=\"1\"><c path=\"kumite.scene.DefaultScene\"/></scene>\n\t<complete public=\"1\" set=\"method\" line=\"41\"><f a=\"\"><e path=\"Void\"/></f></complete>\n\t<new public=\"1\" set=\"method\" line=\"23\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.scene.Config.__rtti = "<class path=\"kumite.scene.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<scenes public=\"1\"><c path=\"kumite.scene.Scenes\"/></scenes>\n\t<sceneNavigator public=\"1\"><c path=\"kumite.scene.SceneNavigator\"/></sceneNavigator>\n\t<new public=\"1\" set=\"method\" line=\"9\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.stage.Config.__rtti = "<class path=\"kumite.stage.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<stageResizeAction public=\"1\"><c path=\"kumite.stage.StageResizeAction\"/></stageResizeAction>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
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
kumite.testscene.TestScene4.__meta__ = { fields : { testClearLayer : { Inject : null}, testLayer2 : { Inject : null}, testLayer3 : { Inject : null}, textureLayer2 : { Inject : null}, colorLayer4 : { Inject : null}, displayList : { Inject : null}}};
kumite.testscene.TestScene4.__rtti = "<class path=\"kumite.testscene.TestScene4\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.SceneLifecycle\"/>\n\t<SCENE_ID public=\"1\" line=\"13\" static=\"1\"><c path=\"String\"/></SCENE_ID>\n\t<testClearLayer public=\"1\"><c path=\"kumite.layer.ClearLayer\"/></testClearLayer>\n\t<testLayer2 public=\"1\"><c path=\"kumite.layer.TestLayer\"/></testLayer2>\n\t<testLayer3 public=\"1\"><c path=\"kumite.layer.TestLayer\"/></testLayer3>\n\t<textureLayer2 public=\"1\"><c path=\"kumite.layer.TextureLayer\"/></textureLayer2>\n\t<colorLayer4 public=\"1\"><c path=\"kumite.layer.ColorLayer\"/></colorLayer4>\n\t<displayList public=\"1\"><c path=\"kumite.displaylist.DisplayListLayer\"/></displayList>\n\t<sceneInit public=\"1\" set=\"method\" line=\"35\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></sceneInit>\n\t<initTransition public=\"1\" set=\"method\" line=\"46\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></initTransition>\n\t<renderTransition public=\"1\" set=\"method\" line=\"61\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"65\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"33\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.testscene.TestScene4.SCENE_ID = "GREEN-BLUE";
kumite.layer.TestLayer.__meta__ = { fields : { stage : { Inject : null}, time : { Inject : null}, projection : { Inject : null}, camera : { Inject : null}}};
kumite.layer.TestLayer.__rtti = "<class path=\"kumite.layer.TestLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<projection public=\"1\"><c path=\"kumite.projection.Projection\"/></projection>\n\t<camera public=\"1\"><c path=\"kumite.camera.Camera\"/></camera>\n\t<color public=\"1\"><c path=\"Color\"/></color>\n\t<scale public=\"1\"><c path=\"Float\"/></scale>\n\t<position public=\"1\"><c path=\"Vec3\"/></position>\n\t<transitionAlpha><c path=\"Float\"/></transitionAlpha>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<worldViewMatrixUniform><c path=\"GLUniformLocation\"/></worldViewMatrixUniform>\n\t<colorUniform><c path=\"GLUniformLocation\"/></colorUniform>\n\t<init public=\"1\" set=\"method\" line=\"49\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"66\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"72\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"41\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer._TestLayer.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 worldViewMatrix;\n\n\tvarying vec4 vertex;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);\n\t\tvertex = vec4(vertexPosition, 0.0, 1.0);\n\t}\n\n"]}};
kumite.layer._TestLayer.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform vec4 color;\n\n\tvoid main(void)\n\t{\n\t\tgl_FragColor = color;\n\t}\n\n"]}};
kumite.testscene.TestScene3.__meta__ = { fields : { testClearLayer : { Inject : null}, testLayer1 : { Inject : null}, testLayer3 : { Inject : null}, textureLayer1 : { Inject : null}, colorLayer3 : { Inject : null}, displayList : { Inject : null}}};
kumite.testscene.TestScene3.__rtti = "<class path=\"kumite.testscene.TestScene3\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.SceneLifecycle\"/>\n\t<SCENE_ID public=\"1\" line=\"13\" static=\"1\"><c path=\"String\"/></SCENE_ID>\n\t<testClearLayer public=\"1\"><c path=\"kumite.layer.ClearLayer\"/></testClearLayer>\n\t<testLayer1 public=\"1\"><c path=\"kumite.layer.TestLayer\"/></testLayer1>\n\t<testLayer3 public=\"1\"><c path=\"kumite.layer.TestLayer\"/></testLayer3>\n\t<textureLayer1 public=\"1\"><c path=\"kumite.layer.TextureLayer\"/></textureLayer1>\n\t<colorLayer3 public=\"1\"><c path=\"kumite.layer.ColorLayer\"/></colorLayer3>\n\t<displayList public=\"1\"><c path=\"kumite.displaylist.DisplayListLayer\"/></displayList>\n\t<sceneInit public=\"1\" set=\"method\" line=\"35\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></sceneInit>\n\t<initTransition public=\"1\" set=\"method\" line=\"46\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></initTransition>\n\t<renderTransition public=\"1\" set=\"method\" line=\"61\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"65\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"33\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.testscene.TestScene3.SCENE_ID = "RED-BLUE";
kumite.scene.LayerState.OUT = new kumite.scene.LayerState("OUT");
kumite.scene.LayerState.IN = new kumite.scene.LayerState("IN");
kumite.scene.LayerState.KEEP = new kumite.scene.LayerState("KEEP");
kumite.mouse.MouseController.__meta__ = { fields : { canvas : { Inject : null}, start : { Sequence : ["boot","init"]}}};
kumite.mouse.MouseController.__rtti = "<class path=\"kumite.mouse.MouseController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<canvas public=\"1\"><c path=\"kumite.canvas.CanvasCase\"/></canvas>\n\t<start public=\"1\" set=\"method\" line=\"15\"><f a=\"\"><e path=\"Void\"/></f></start>\n\t<new public=\"1\" set=\"method\" line=\"12\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.testscene.TestScene2.__meta__ = { fields : { testClearLayer : { Inject : null}, testLayer1 : { Inject : null}, testLayer2 : { Inject : null}, colorLayer2 : { Inject : null}, displayListLayer : { Inject : null}}};
kumite.testscene.TestScene2.__rtti = "<class path=\"kumite.testscene.TestScene2\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.SceneLifecycle\"/>\n\t<SCENE_ID public=\"1\" line=\"13\" static=\"1\"><c path=\"String\"/></SCENE_ID>\n\t<testClearLayer public=\"1\"><c path=\"kumite.layer.ClearLayer\"/></testClearLayer>\n\t<testLayer1 public=\"1\"><c path=\"kumite.layer.TestLayer\"/></testLayer1>\n\t<testLayer2 public=\"1\"><c path=\"kumite.layer.TestLayer\"/></testLayer2>\n\t<colorLayer2 public=\"1\"><c path=\"kumite.layer.ColorLayer\"/></colorLayer2>\n\t<displayListLayer public=\"1\"><c path=\"kumite.displaylist.DisplayListLayer\"/></displayListLayer>\n\t<sceneInit public=\"1\" set=\"method\" line=\"32\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></sceneInit>\n\t<initTransition public=\"1\" set=\"method\" line=\"42\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></initTransition>\n\t<renderTransition public=\"1\" set=\"method\" line=\"67\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"71\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"30\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.testscene.TestScene2.SCENE_ID = "RED-GREEN";
GLCursorClient.DEFAULT = "default";
GLCursorClient.HAND = "pointer";
kumite.testscene.TestScene1.__meta__ = { fields : { testClearLayer : { Inject : null}, displayList : { Inject : null}, colorLayer1 : { Inject : null}}};
kumite.testscene.TestScene1.__rtti = "<class path=\"kumite.testscene.TestScene1\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.SceneLifecycle\"/>\n\t<SCENE_ID public=\"1\" line=\"13\" static=\"1\"><c path=\"String\"/></SCENE_ID>\n\t<testClearLayer public=\"1\"><c path=\"kumite.layer.ClearLayer\"/></testClearLayer>\n\t<displayList public=\"1\"><c path=\"kumite.displaylist.DisplayListLayer\"/></displayList>\n\t<colorLayer1 public=\"1\"><c path=\"kumite.layer.ColorLayer\"/></colorLayer1>\n\t<sceneInit public=\"1\" set=\"method\" line=\"26\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></sceneInit>\n\t<initTransition public=\"1\" set=\"method\" line=\"34\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></initTransition>\n\t<renderTransition public=\"1\" set=\"method\" line=\"53\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"57\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"24\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.testscene.TestScene1.SCENE_ID = "EMPTY";
hsl.haxe._DirectSignaler.PropagationStatus.IMMEDIATELY_STOPPED = 1;
hsl.haxe._DirectSignaler.PropagationStatus.STOPPED = 2;
hsl.haxe._DirectSignaler.PropagationStatus.UNDISTURBED = 3;
kumite.spritemesh.SpriteMeshLayer.__meta__ = { fields : { stage : { Inject : null}, time : { Inject : null}, projection : { Inject : null}, textureRegistry : { Inject : null}, offset : { Param : null}, textureFrequenceParam : { Param : null}, textureAmpParam : { Param : null}}};
kumite.spritemesh.SpriteMeshLayer.__rtti = "<class path=\"kumite.spritemesh.SpriteMeshLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<max public=\"1\" line=\"17\" static=\"1\"><c path=\"Int\"/></max>\n\t<axis line=\"131\" static=\"1\"><c path=\"Vec3\"/></axis>\n\t<zAxis line=\"132\" static=\"1\"><c path=\"Vec3\"/></zAxis>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<projection public=\"1\"><c path=\"kumite.projection.Projection\"/></projection>\n\t<textureRegistry public=\"1\"><c path=\"GLTextureRegistry\"/></textureRegistry>\n\t<transitions public=\"1\"><c path=\"kumite.layer.LayerTransitions\"/></transitions>\n\t<alphaTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></alphaTransition>\n\t<offset public=\"1\"><c path=\"Float\"/></offset>\n\t<textureFrequenceParam public=\"1\"><c path=\"Float\"/></textureFrequenceParam>\n\t<textureAmpParam public=\"1\"><c path=\"Float\"/></textureAmpParam>\n\t<sprites><c path=\"Array\"><c path=\"kumite.spritemesh.Sprite\"/></c></sprites>\n\t<cameraMatrix><c path=\"Matrix4\"/></cameraMatrix>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexBuffer><c path=\"Float32Array\"/></vertexBuffer>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexUVBuffer><c path=\"Float32Array\"/></vertexUVBuffer>\n\t<vertexUVAttribute><c path=\"GLAttribLocation\"/></vertexUVAttribute>\n\t<vertexNormalBuffer><c path=\"Float32Array\"/></vertexNormalBuffer>\n\t<vertexNormalAttribute><c path=\"GLAttribLocation\"/></vertexNormalAttribute>\n\t<cubeVerticesIndexBuffer><c path=\"WebGLBuffer\"/></cubeVerticesIndexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<alphaUniform><c path=\"GLUniformLocation\"/></alphaUniform>\n\t<textureUniform><c path=\"GLUniformLocation\"/></textureUniform>\n\t<spriteRenderIndexes><c path=\"Uint32Array\"/></spriteRenderIndexes>\n\t<spriteRenderIndexesCount><c path=\"Int\"/></spriteRenderIndexesCount>\n\t<cameraMatrix2><c path=\"Matrix4\"/></cameraMatrix2>\n\t<init public=\"1\" set=\"method\" line=\"85\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"98\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<timems><c path=\"Float\"/></timems>\n\t<render public=\"1\" set=\"method\" line=\"106\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<renderGLInit set=\"method\" line=\"120\"><f a=\"\"><e path=\"Void\"/></f></renderGLInit>\n\t<updateModel set=\"method\" line=\"134\"><f a=\"\"><e path=\"Void\"/></f></updateModel>\n\t<updateIndexes set=\"method\" line=\"168\"><f a=\"\"><e path=\"Void\"/></f></updateIndexes>\n\t<sortIndexes set=\"method\" line=\"194\"><f a=\"\"><e path=\"Void\"/></f></sortIndexes>\n\t<quicksort set=\"method\" line=\"199\"><f a=\"lo:hi\">\n\t<c path=\"Int\"/>\n\t<c path=\"Int\"/>\n\t<e path=\"Void\"/>\n</f></quicksort>\n\t<updateBuffer set=\"method\" line=\"217\"><f a=\"\"><e path=\"Void\"/></f></updateBuffer>\n\t<renderGL set=\"method\" line=\"264\"><f a=\"\"><e path=\"Void\"/></f></renderGL>\n\t<initGl set=\"method\" line=\"286\"><f a=\"\"><e path=\"Void\"/></f></initGl>\n\t<new public=\"1\" set=\"method\" line=\"68\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.spritemesh.SpriteMeshLayer.max = 16000;
kumite.spritemesh.SpriteMeshLayer.axis = new Vec3(1,1,1).normalize();
kumite.spritemesh.SpriteMeshLayer.zAxis = new Vec3(0,0,1);
kumite.spritemesh._SpriteMeshLayer.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec3 vertexPosition;\n\tattribute vec3 vertexNormal;\n\tattribute vec2 vertexUV;\n\n\tuniform mat4 projectionMatrix;\n\n\tuniform float alpha;\n\n\tvarying vec2 uv;\n\tvarying vec3 vertex;\n\tvarying float light;\n\n\tvoid main(void)\n\t{\n\t\tuv = vertexUV;\n\t\tvertex = vertexPosition;\n\t\tgl_Position = projectionMatrix * vec4(vertexPosition - vec3(0.0, 0.0, (1.0 - alpha) * 7.0), 1.0);\n\n\t\tvec3 normalRot = normalize(vertexPosition - vertexNormal);\n\t\tvec3 lightDir = normalize(vertexPosition - vec3(0.0, 0.0, -30.0));\n\t\tfloat diffuse = clamp(dot(normalRot, lightDir) * -1.0, -1.0, 1.0);\n\t\tvec3 viewDir = normalize(vec3(0.0, 0.0, 0.0) - vertexPosition);\n\n\t\tvec3 h1 = normalize(lightDir + viewDir);\n\t\tfloat specular1 = clamp(pow(dot(normalRot, h1), 30.0), 0.0, 1.0);\n\n\t\tlight = clamp((0.5 + (diffuse * 1.3 + specular1 * 1.5)), 0.1, 100.0) * alpha * 0.8;\n\t}\n\n"]}};
kumite.spritemesh._SpriteMeshLayer.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform sampler2D texture;\n\tuniform float alpha;\n\n\tvarying vec2 uv;\n\tvarying vec3 vertex;\n\tvarying float light;\n\n\tvoid main(void)\n\t{\n\t\tvec4 color = texture2D(texture, uv);\n\t\tgl_FragColor = color * light;\n\t}\n\n\n"]}};
bpmjs.Sequencer.__meta__ = { fields : { context : { Inject : null}}};
bpmjs.Sequencer.__rtti = "<class path=\"bpmjs.Sequencer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<context public=\"1\"><c path=\"bpmjs.Context\"/></context>\n\t<start public=\"1\" set=\"method\" line=\"14\"><f a=\"name\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></start>\n\t<new public=\"1\" set=\"method\" line=\"12\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.flyingman.FlyingManLayer.__meta__ = { fields : { stage : { Inject : null}, time : { Inject : null}, projection : { Inject : null}, graph : { Inject : null}, cameraId : { Param : null}}};
kumite.flyingman.FlyingManLayer.__rtti = "<class path=\"kumite.flyingman.FlyingManLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<projection public=\"1\"><c path=\"kumite.projection.Projection\"/></projection>\n\t<graph public=\"1\"><c path=\"kumite.flyingman.FlyingManGraph\"/></graph>\n\t<cameraId public=\"1\"><c path=\"String\"/></cameraId>\n\t<transitions public=\"1\"><c path=\"kumite.layer.LayerTransitions\"/></transitions>\n\t<alphaTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></alphaTransition>\n\t<cameraMatrix><c path=\"Matrix4\"/></cameraMatrix>\n\t<viewMatrix><c path=\"Matrix4\"/></viewMatrix>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<worldMatrixUniform><c path=\"GLUniformLocation\"/></worldMatrixUniform>\n\t<viewMatrixUniform><c path=\"GLUniformLocation\"/></viewMatrixUniform>\n\t<textureUniform><c path=\"GLUniformLocation\"/></textureUniform>\n\t<alphaUniform><c path=\"GLUniformLocation\"/></alphaUniform>\n\t<init public=\"1\" set=\"method\" line=\"60\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"79\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"85\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"48\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.flyingman._FlyingManLayer.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 worldMatrix;\n\tuniform mat4 viewMatrix;\n\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * worldMatrix * viewMatrix * vec4(vertexPosition, 0.0, 1.0);\n\t\ttextureCoord = (vertexPosition.xy * vec2(1, -1) + 1.0) * 0.5;\n\t}\n\n"]}};
kumite.flyingman._FlyingManLayer.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform sampler2D texture;\n\tuniform float alpha;\n\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tvec4 color = texture2D(texture, textureCoord);\n\t\tgl_FragColor = color * vec4(1.0, 1.0, 1.0, alpha);\n\t}\n\n\n"]}};
LogLevel.INFO = new LogLevel(1);
LogLevel.WARN = new LogLevel(2);
LogLevel.ERROR = new LogLevel(3);
LogLevel.OFF = new LogLevel(4);
GLTextureAtlasConfig.instanceCount = 0;
kumite.canvas.Config.__rtti = "<class path=\"kumite.canvas.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<canvasCase public=\"1\"><c path=\"kumite.canvas.CanvasCase\"/></canvasCase>\n\t<canvasController public=\"1\"><c path=\"kumite.canvas.CanvasController\"/></canvasController>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.displaylist.ConfigAsLayer.__rtti = "<class path=\"kumite.displaylist.ConfigAsLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<displayListLayer public=\"1\"><c path=\"kumite.displaylist.DisplayListLayer\"/></displayListLayer>\n\t<new public=\"1\" set=\"method\" line=\"8\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.time.Config.__rtti = "<class path=\"kumite.time.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<timeController public=\"1\"><c path=\"kumite.time.TimeController\"/></timeController>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.projection.ProjectionController.__meta__ = { fields : { projection : { Inject : null}, stage : { Inject : null}, init : { Sequence : ["boot","init"]}, updateProjectionSizeFromStage : { Message : null}}};
kumite.projection.ProjectionController.__rtti = "<class path=\"kumite.projection.ProjectionController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<projection public=\"1\"><c path=\"kumite.projection.Projection\"/></projection>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<fov public=\"1\"><c path=\"Float\"/></fov>\n\t<near public=\"1\"><c path=\"Float\"/></near>\n\t<far public=\"1\"><c path=\"Float\"/></far>\n\t<init public=\"1\" set=\"method\" line=\"23\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<updateProjectionSizeFromStage public=\"1\" set=\"method\" line=\"30\"><f a=\"?message\">\n\t<c path=\"kumite.stage.StageResizeMessage\"/>\n\t<e path=\"Void\"/>\n</f></updateProjectionSizeFromStage>\n\t<new public=\"1\" set=\"method\" line=\"20\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.scene.SceneNavigator.__meta__ = { fields : { scenes : { Inject : null}, time : { Inject : null}, init : { Complete : null}, handleSceneLifecycleAdded : { Observe : null}, start : { Sequence : ["boot","start"]}, handleSceneChangeRequest : { Message : null}, render : { Message : null}}};
kumite.scene.SceneNavigator.__rtti = "<class path=\"kumite.scene.SceneNavigator\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<scenes public=\"1\"><c path=\"kumite.scene.Scenes\"/></scenes>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<transitionContext public=\"1\"><c path=\"kumite.scene.TransitionContext\"/></transitionContext>\n\t<initState public=\"1\"><c path=\"kumite.scene.InitState\"/></initState>\n\t<idleState public=\"1\"><c path=\"kumite.scene.IdleState\"/></idleState>\n\t<transitionState public=\"1\"><c path=\"kumite.scene.TransitionState\"/></transitionState>\n\t<currentScene public=\"1\"><c path=\"kumite.scene.SceneAndLifecycle\"/></currentScene>\n\t<lastScene public=\"1\"><c path=\"kumite.scene.SceneAndLifecycle\"/></lastScene>\n\t<state><c path=\"kumite.scene.State\"/></state>\n\t<init public=\"1\" set=\"method\" line=\"30\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<handleSceneLifecycleAdded public=\"1\" set=\"method\" line=\"48\"><f a=\"lifecycle\">\n\t<c path=\"kumite.scene.SceneLifecycle\"/>\n\t<e path=\"Void\"/>\n</f></handleSceneLifecycleAdded>\n\t<start public=\"1\" set=\"method\" line=\"60\"><f a=\"\"><e path=\"Void\"/></f></start>\n\t<handleSceneChangeRequest public=\"1\" set=\"method\" line=\"74\"><f a=\"message\">\n\t<c path=\"kumite.scene.SceneChangeRequest\"/>\n\t<e path=\"Void\"/>\n</f></handleSceneChangeRequest>\n\t<render public=\"1\" set=\"method\" line=\"80\"><f a=\"tick\">\n\t<c path=\"kumite.time.Tick\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<renderTransition public=\"1\" set=\"method\" line=\"85\"><f a=\"\"><e path=\"Void\"/></f></renderTransition>\n\t<initTransition public=\"1\" set=\"method\" line=\"108\"><f a=\"\"><e path=\"Void\"/></f></initTransition>\n\t<renderNormal public=\"1\" set=\"method\" line=\"114\"><f a=\"\"><e path=\"Void\"/></f></renderNormal>\n\t<enterScene set=\"method\" line=\"123\"><f a=\"newScene\">\n\t<c path=\"kumite.scene.SceneAndLifecycle\"/>\n\t<e path=\"Void\"/>\n</f></enterScene>\n\t<setState public=\"1\" set=\"method\" line=\"133\"><f a=\"state\">\n\t<c path=\"kumite.scene.State\"/>\n\t<e path=\"Void\"/>\n</f></setState>\n\t<initAllLayers set=\"method\" line=\"139\"><f a=\"\"><e path=\"Void\"/></f></initAllLayers>\n\t<new public=\"1\" set=\"method\" line=\"27\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
js.Lib.onerror = null;
kumite.canvas.CanvasController.__meta__ = { fields : { canvas : { Inject : null}, stage : { Inject : null}, initPrepare : { Sequence : ["boot","initPrepare"]}, init : { Sequence : ["boot","init"]}, updateCanvasSizeFromStage : { Message : null}}};
kumite.canvas.CanvasController.__rtti = "<class path=\"kumite.canvas.CanvasController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<canvas public=\"1\"><c path=\"kumite.canvas.CanvasCase\"/></canvas>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<initPrepare public=\"1\" set=\"method\" line=\"21\"><f a=\"\"><e path=\"Void\"/></f></initPrepare>\n\t<init public=\"1\" set=\"method\" line=\"27\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<updateCanvasSizeFromStage public=\"1\" set=\"method\" line=\"33\"><f a=\"?message\">\n\t<c path=\"kumite.stage.StageResizeMessage\"/>\n\t<e path=\"Void\"/>\n</f></updateCanvasSizeFromStage>\n\t<new public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.launch.Launcher.__meta__ = { fields : { sequencer : { Inject : null}, handlePostComplete : { PostComplete : null}, showError : { Sequence : ["boot","error"]}}};
kumite.launch.Launcher.__rtti = "<class path=\"kumite.launch.Launcher\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<sequencer public=\"1\"><c path=\"bpmjs.Sequencer\"/></sequencer>\n\t<handlePostComplete public=\"1\" set=\"method\" line=\"17\"><f a=\"\"><e path=\"Void\"/></f></handlePostComplete>\n\t<showError public=\"1\" set=\"method\" line=\"23\"><f a=\"message\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></showError>\n\t<new public=\"1\" set=\"method\" line=\"14\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.testscene.Config.__meta__ = { fields : { textureRegistry : { Inject : null}, startPrepare : { Sequence : ["boot","startPrepare"]}}};
kumite.testscene.Config.__rtti = "<class path=\"kumite.testscene.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<TEST1 public=\"1\" line=\"7\" static=\"1\"><c path=\"GLTextureConfig\"/></TEST1>\n\t<TEST2 public=\"1\" line=\"8\" static=\"1\"><c path=\"GLTextureConfig\"/></TEST2>\n\t<textureRegistry public=\"1\"><c path=\"GLTextureRegistry\"/></textureRegistry>\n\t<testClearLayer public=\"1\"><c path=\"kumite.layer.ClearLayer\"/></testClearLayer>\n\t<colorLayer1 public=\"1\"><c path=\"kumite.layer.ColorLayer\"/></colorLayer1>\n\t<colorLayer2 public=\"1\"><c path=\"kumite.layer.ColorLayer\"/></colorLayer2>\n\t<colorLayer3 public=\"1\"><c path=\"kumite.layer.ColorLayer\"/></colorLayer3>\n\t<colorLayer4 public=\"1\"><c path=\"kumite.layer.ColorLayer\"/></colorLayer4>\n\t<textureLayer1 public=\"1\"><c path=\"kumite.layer.TextureLayer\"/></textureLayer1>\n\t<textureLayer2 public=\"1\"><c path=\"kumite.layer.TextureLayer\"/></textureLayer2>\n\t<testLayer1 public=\"1\"><c path=\"kumite.layer.TestLayer\"/></testLayer1>\n\t<testLayer2 public=\"1\"><c path=\"kumite.layer.TestLayer\"/></testLayer2>\n\t<testLayer3 public=\"1\"><c path=\"kumite.layer.TestLayer\"/></testLayer3>\n\t<testScene1 public=\"1\"><c path=\"kumite.testscene.TestScene1\"/></testScene1>\n\t<testScene2 public=\"1\"><c path=\"kumite.testscene.TestScene2\"/></testScene2>\n\t<testScene3 public=\"1\"><c path=\"kumite.testscene.TestScene3\"/></testScene3>\n\t<testScene4 public=\"1\"><c path=\"kumite.testscene.TestScene4\"/></testScene4>\n\t<startPrepare public=\"1\" set=\"method\" line=\"78\"><f a=\"\"><c path=\"bpmjs.SequencerTaskGroup\"/></f></startPrepare>\n\t<new public=\"1\" set=\"method\" line=\"32\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.testscene.Config.TEST1 = GLTextureConfig.create("data/image/along-the-line.png");
kumite.testscene.Config.TEST2 = GLTextureConfig.create("data/image/beware-of-the-dog.jpg");
kumite.layer.ClearLayer.__meta__ = { fields : { clearColor : { Param : null}}};
kumite.layer.ClearLayer.__rtti = "<class path=\"kumite.layer.ClearLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<clearColor public=\"1\"><c path=\"Color\"/></clearColor>\n\t<init public=\"1\" set=\"method\" line=\"23\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"27\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"32\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.textureregistry.Config.__rtti = "<class path=\"kumite.textureregistry.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<textureRegistry public=\"1\"><c path=\"GLTextureRegistry\"/></textureRegistry>\n\t<new public=\"1\" set=\"method\" line=\"8\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.camera.CameraMouseMover.__meta__ = { fields : { camera : { Inject : null}, init : { Sequence : ["boot","init"]}}};
kumite.camera.CameraMouseMover.__rtti = "<class path=\"kumite.camera.CameraMouseMover\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<camera public=\"1\"><c path=\"kumite.camera.Camera\"/></camera>\n\t<init public=\"1\" set=\"method\" line=\"12\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<updateCamera set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></updateCamera>\n\t<new public=\"1\" set=\"method\" line=\"9\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.webgl.Config.__rtti = "<class path=\"kumite.webgl.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<initAction public=\"1\"><c path=\"kumite.webgl.InitAction\"/></initAction>\n\t<new public=\"1\" set=\"method\" line=\"8\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.time.TimeController.__meta__ = { fields : { time : { Inject : null}, messenger : { Messenger : null}, startComplete : { Sequence : ["boot","startComplete"]}}};
kumite.time.TimeController.__rtti = "<class path=\"kumite.time.TimeController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<messenger public=\"1\"><c path=\"bpmjs.Messenger\"/></messenger>\n\t<startComplete public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></startComplete>\n\t<timerUpdate set=\"method\" line=\"24\"><f a=\"\"><e path=\"Void\"/></f></timerUpdate>\n\t<new public=\"1\" set=\"method\" line=\"15\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
reflect.ClassInfo.cache = new Hash();
kumite.launch.PreloadDisplay.__meta__ = { fields : { complete : { Complete : null}, bootMonitor : { Sequence : ["boot","monitor"]}, bootStartComplete : { Sequence : ["boot","startComplete"]}}};
kumite.launch.PreloadDisplay.__rtti = "<class path=\"kumite.launch.PreloadDisplay\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<preloaderDiv><t path=\"js.HtmlDom\"/></preloaderDiv>\n\t<complete public=\"1\" set=\"method\" line=\"16\"><f a=\"\"><e path=\"Void\"/></f></complete>\n\t<bootMonitor public=\"1\" set=\"method\" line=\"24\"><f a=\"monitor\">\n\t<c path=\"bpmjs.ProgressMonitor\"/>\n\t<e path=\"Void\"/>\n</f></bootMonitor>\n\t<bootStartComplete public=\"1\" set=\"method\" line=\"42\"><f a=\"\"><e path=\"Void\"/></f></bootStartComplete>\n\t<removePreloader set=\"method\" line=\"49\"><f a=\"\"><e path=\"Void\"/></f></removePreloader>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer.LayerId.CLEAR = "CLEAR";
kumite.framebuffereffect.FBLayer.__meta__ = { fields : { stage : { Inject : null}, time : { Inject : null}, projection : { Inject : null}, camera : { Inject : null}}};
kumite.framebuffereffect.FBLayer.__rtti = "<class path=\"kumite.framebuffereffect.FBLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<projection public=\"1\"><c path=\"kumite.projection.Projection\"/></projection>\n\t<camera public=\"1\"><c path=\"kumite.camera.Camera\"/></camera>\n\t<color public=\"1\"><c path=\"Color\"/></color>\n\t<scale public=\"1\"><c path=\"Float\"/></scale>\n\t<position public=\"1\"><c path=\"Vec3\"/></position>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<worldViewMatrixUniform><c path=\"GLUniformLocation\"/></worldViewMatrixUniform>\n\t<colorUniform><c path=\"GLUniformLocation\"/></colorUniform>\n\t<init public=\"1\" set=\"method\" line=\"48\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"65\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"70\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"41\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.framebuffereffect._FBLayer.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 worldViewMatrix;\n\n\tvarying vec4 vertex;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);\n\t\tvertex = vec4(vertexPosition, 0.0, 1.0);\n\t}\n\n"]}};
kumite.framebuffereffect._FBLayer.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform vec4 color;\n\n\tvoid main(void)\n\t{\n\t\tgl_FragColor = color;\n\t}\n\n"]}};
kumite.webgl.InitAction.__meta__ = { fields : { canvas : { Inject : null}, init : { Sequence : ["boot","init"]}}};
kumite.webgl.InitAction.__rtti = "<class path=\"kumite.webgl.InitAction\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<canvas public=\"1\"><c path=\"kumite.canvas.CanvasCase\"/></canvas>\n\t<antialias public=\"1\"><e path=\"Bool\"/></antialias>\n\t<init public=\"1\" set=\"method\" line=\"16\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.spritemesh.Config.__meta__ = { fields : { textureRegistry : { Inject : null}, displayListLayer : { Inject : null}, complete : { Complete : null}, startPrepare : { Sequence : ["boot","startPrepare"]}}};
kumite.spritemesh.Config.__rtti = "<class path=\"kumite.spritemesh.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<TEST_ATLAS public=\"1\" line=\"13\" static=\"1\"><c path=\"GLTextureAtlasConfig\"/></TEST_ATLAS>\n\t<textureRegistry public=\"1\"><c path=\"GLTextureRegistry\"/></textureRegistry>\n\t<displayListLayer public=\"1\"><c path=\"kumite.displaylist.DisplayListLayer\"/></displayListLayer>\n\t<clearLayer public=\"1\"><c path=\"kumite.layer.ClearLayer\"/></clearLayer>\n\t<colorLayer public=\"1\"><c path=\"kumite.layer.ColorLayer\"/></colorLayer>\n\t<layer1 public=\"1\"><c path=\"kumite.spritemesh.SpriteMeshLayer\"/></layer1>\n\t<layer2 public=\"1\"><c path=\"kumite.spritemesh.SpriteMeshLayer\"/></layer2>\n\t<layer3 public=\"1\"><c path=\"kumite.spritemesh.SpriteMeshLayer\"/></layer3>\n\t<scene1 public=\"1\"><c path=\"kumite.scene.DefaultScene\"/></scene1>\n\t<scene2 public=\"1\"><c path=\"kumite.scene.DefaultScene\"/></scene2>\n\t<scene3 public=\"1\"><c path=\"kumite.scene.DefaultScene\"/></scene3>\n\t<complete public=\"1\" set=\"method\" line=\"62\"><f a=\"\"><e path=\"Void\"/></f></complete>\n\t<startPrepare public=\"1\" set=\"method\" line=\"81\"><f a=\"\"><c path=\"bpmjs.SequencerTaskGroup\"/></f></startPrepare>\n\t<new public=\"1\" set=\"method\" line=\"33\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.spritemesh.Config.TEST_ATLAS = GLTextureAtlasConfig.create(4096,2048,9985);
kumite.layer.ColorLayer.__meta__ = { fields : { stage : { Inject : null}, time : { Inject : null}}};
kumite.layer.ColorLayer.__rtti = "<class path=\"kumite.layer.ColorLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<transitions public=\"1\"><c path=\"kumite.layer.LayerTransitions\"/></transitions>\n\t<cutTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></cutTransition>\n\t<moveTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></moveTransition>\n\t<alphaTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></alphaTransition>\n\t<color public=\"1\"><c path=\"Color\"/></color>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<worldViewMatrixUniform><c path=\"GLUniformLocation\"/></worldViewMatrixUniform>\n\t<colorUniform><c path=\"GLUniformLocation\"/></colorUniform>\n\t<init public=\"1\" set=\"method\" line=\"46\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"63\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"69\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"36\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer._ColorLayer.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 worldViewMatrix;\n\n\tvarying vec4 vertex;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);\n\t\tvertex = vec4(vertexPosition, 0.0, 1.0);\n\t}\n\n"]}};
kumite.layer._ColorLayer.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform vec4 color;\n\n\tvoid main(void)\n\t{\n\t\tgl_FragColor = color;\n\t}\n\n"]}};
kumite.projection.Config.__rtti = "<class path=\"kumite.projection.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<projection public=\"1\"><c path=\"kumite.projection.Projection\"/></projection>\n\t<projectionController public=\"1\"><c path=\"kumite.projection.ProjectionController\"/></projectionController>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.vjinterface.VJInterface.__meta__ = { fields : { scenes : { Inject : null}, messenger : { Messenger : null}, start : { Sequence : ["boot","startComplete"]}, render : { Message : null}}};
kumite.vjinterface.VJInterface.__rtti = "<class path=\"kumite.vjinterface.VJInterface\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<scenes public=\"1\"><c path=\"kumite.scene.Scenes\"/></scenes>\n\t<messenger public=\"1\"><c path=\"bpmjs.Messenger\"/></messenger>\n\t<timer><c path=\"haxe.Timer\"/></timer>\n\t<stage><c path=\"GLStage\"/></stage>\n\t<sceneContainer><c path=\"GLDisplayObjectContainer\"/></sceneContainer>\n\t<start public=\"1\" set=\"method\" line=\"31\"><f a=\"\"><e path=\"Void\"/></f></start>\n\t<render public=\"1\" set=\"method\" line=\"43\"><f a=\"tick\">\n\t<c path=\"kumite.time.Tick\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<addSceneButtons set=\"method\" line=\"48\"><f a=\"\"><e path=\"Void\"/></f></addSceneButtons>\n\t<createSceneRequest set=\"method\" line=\"69\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<f a=\"button\">\n\t\t<c path=\"GLInteractiveObject\"/>\n\t\t<e path=\"Void\"/>\n\t</f>\n</f></createSceneRequest>\n\t<handleButtonClick set=\"method\" line=\"78\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></handleButtonClick>\n\t<navigateNext set=\"method\" line=\"83\"><f a=\"\"><e path=\"Void\"/></f></navigateNext>\n\t<new public=\"1\" set=\"method\" line=\"28\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.framebuffereffect.FBEnableLayer.__rtti = "<class path=\"kumite.framebuffereffect.FBEnableLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<framebuffer public=\"1\"><c path=\"GLFramebuffer\"/></framebuffer>\n\t<init public=\"1\" set=\"method\" line=\"24\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"44\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"49\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"19\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.displaylist.DisplayListLayer.__meta__ = { fields : { stage : { Inject : null}}};
kumite.displaylist.DisplayListLayer.__rtti = "<class path=\"kumite.displaylist.DisplayListLayer\" params=\"\">\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<transition public=\"1\"><c path=\"Float\"/></transition>\n\t<renderer><c path=\"GLDisplayListRenderer\"/></renderer>\n\t<init public=\"1\" set=\"method\" line=\"23\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"29\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"35\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"21\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
haxe.Timer.arr = new Array();
kumite.flyingman.Config.__meta__ = { fields : { textureRegistry : { Inject : null}, startPrepare : { Sequence : ["boot","startPrepare"]}}};
kumite.flyingman.Config.__rtti = "<class path=\"kumite.flyingman.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<PAPER public=\"1\" line=\"7\" static=\"1\"><c path=\"GLTextureConfig\"/></PAPER>\n\t<textureRegistry public=\"1\"><c path=\"GLTextureRegistry\"/></textureRegistry>\n\t<flyingManClearLayer public=\"1\"><c path=\"kumite.layer.ClearLayer\"/></flyingManClearLayer>\n\t<paperBackground public=\"1\"><c path=\"kumite.layer.TextureLayer\"/></paperBackground>\n\t<flyingManGraph public=\"1\"><c path=\"kumite.flyingman.FlyingManGraph\"/></flyingManGraph>\n\t<flyingManLayer3 public=\"1\"><c path=\"kumite.flyingman.FlyingManLayer\"/></flyingManLayer3>\n\t<flyingManScene3 public=\"1\"><c path=\"kumite.flyingman.FlyingManScene\"/></flyingManScene3>\n\t<flyingManLayer1 public=\"1\"><c path=\"kumite.flyingman.FlyingManLayer\"/></flyingManLayer1>\n\t<flyingManScene1 public=\"1\"><c path=\"kumite.flyingman.FlyingManScene\"/></flyingManScene1>\n\t<flyingManLayer2 public=\"1\"><c path=\"kumite.flyingman.FlyingManLayer\"/></flyingManLayer2>\n\t<flyingManScene2 public=\"1\"><c path=\"kumite.flyingman.FlyingManScene\"/></flyingManScene2>\n\t<flyingManLayer4 public=\"1\"><c path=\"kumite.flyingman.FlyingManLayer\"/></flyingManLayer4>\n\t<flyingManScene4 public=\"1\"><c path=\"kumite.flyingman.FlyingManScene\"/></flyingManScene4>\n\t<startPrepare public=\"1\" set=\"method\" line=\"61\"><f a=\"\"><c path=\"bpmjs.SequencerTaskGroup\"/></f></startPrepare>\n\t<new public=\"1\" set=\"method\" line=\"30\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.flyingman.Config.PAPER = GLTextureConfig.create("data/image/flyingman/paper.jpg");
shader.DisplayObjectVertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 objectMatrix;\n\tuniform vec2 size;\n\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * objectMatrix * (vec4(size, 1.0, 1.0) * vec4(vertexPosition, 0.0, 1.0));\n\t\ttextureCoord = vertexPosition.xy;\n\t}\n\n"]}};
kumite.stage.StageResizeAction.__meta__ = { fields : { messenger : { Messenger : null}, stage : { Inject : null}, initPrepare : { Sequence : ["boot","initPrepare"]}, startComplete : { Sequence : ["boot","startComplete"]}}};
kumite.stage.StageResizeAction.__rtti = "<class path=\"kumite.stage.StageResizeAction\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<messenger public=\"1\"><c path=\"bpmjs.Messenger\"/></messenger>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<initPrepare public=\"1\" set=\"method\" line=\"21\"><f a=\"\"><e path=\"Void\"/></f></initPrepare>\n\t<startComplete public=\"1\" set=\"method\" line=\"27\"><f a=\"\"><e path=\"Void\"/></f></startComplete>\n\t<timerUpdate set=\"method\" line=\"33\"><f a=\"\"><e path=\"Void\"/></f></timerUpdate>\n\t<onResize set=\"method\" line=\"39\"><f a=\"?event\">\n\t<t path=\"js.Event\"/>\n\t<e path=\"Void\"/>\n</f></onResize>\n\t<updateSize set=\"method\" line=\"45\"><f a=\"\"><e path=\"Void\"/></f></updateSize>\n\t<sendResizeMessage set=\"method\" line=\"51\"><f a=\"\"><e path=\"Void\"/></f></sendResizeMessage>\n\t<new public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
GL.DEPTH_BUFFER_BIT = 256;
GL.STENCIL_BUFFER_BIT = 1024;
GL.COLOR_BUFFER_BIT = 16384;
GL.POINTS = 0;
GL.LINES = 1;
GL.LINE_LOOP = 2;
GL.LINE_STRIP = 3;
GL.TRIANGLES = 4;
GL.TRIANGLE_STRIP = 5;
GL.TRIANGLE_FAN = 6;
GL.ZERO = 0;
GL.ONE = 1;
GL.SRC_COLOR = 768;
GL.ONE_MINUS_SRC_COLOR = 769;
GL.SRC_ALPHA = 770;
GL.ONE_MINUS_SRC_ALPHA = 771;
GL.DST_ALPHA = 772;
GL.ONE_MINUS_DST_ALPHA = 773;
GL.DST_COLOR = 774;
GL.ONE_MINUS_DST_COLOR = 775;
GL.SRC_ALPHA_SATURATE = 776;
GL.FUNC_ADD = 32774;
GL.BLEND_EQUATION = 32777;
GL.BLEND_EQUATION_RGB = 32777;
GL.BLEND_EQUATION_ALPHA = 34877;
GL.FUNC_SUBTRACT = 32778;
GL.FUNC_REVERSE_SUBTRACT = 32779;
GL.BLEND_DST_RGB = 32968;
GL.BLEND_SRC_RGB = 32969;
GL.BLEND_DST_ALPHA = 32970;
GL.BLEND_SRC_ALPHA = 32971;
GL.CONSTANT_COLOR = 32769;
GL.ONE_MINUS_CONSTANT_COLOR = 32770;
GL.CONSTANT_ALPHA = 32771;
GL.ONE_MINUS_CONSTANT_ALPHA = 32772;
GL.BLEND_COLOR = 32773;
GL.ARRAY_BUFFER = 34962;
GL.ELEMENT_ARRAY_BUFFER = 34963;
GL.ARRAY_BUFFER_BINDING = 34964;
GL.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
GL.STREAM_DRAW = 35040;
GL.STATIC_DRAW = 35044;
GL.DYNAMIC_DRAW = 35048;
GL.BUFFER_SIZE = 34660;
GL.BUFFER_USAGE = 34661;
GL.CURRENT_VERTEX_ATTRIB = 34342;
GL.FRONT = 1028;
GL.BACK = 1029;
GL.FRONT_AND_BACK = 1032;
GL.CULL_FACE = 2884;
GL.BLEND = 3042;
GL.DITHER = 3024;
GL.STENCIL_TEST = 2960;
GL.DEPTH_TEST = 2929;
GL.SCISSOR_TEST = 3089;
GL.POLYGON_OFFSET_FILL = 32823;
GL.SAMPLE_ALPHA_TO_COVERAGE = 32926;
GL.SAMPLE_COVERAGE = 32928;
GL.NO_ERROR = 0;
GL.INVALID_ENUM = 1280;
GL.INVALID_VALUE = 1281;
GL.INVALID_OPERATION = 1282;
GL.OUT_OF_MEMORY = 1285;
GL.CW = 2304;
GL.CCW = 2305;
GL.LINE_WIDTH = 2849;
GL.ALIASED_POINT_SIZE_RANGE = 33901;
GL.ALIASED_LINE_WIDTH_RANGE = 33902;
GL.CULL_FACE_MODE = 2885;
GL.FRONT_FACE = 2886;
GL.DEPTH_RANGE = 2928;
GL.DEPTH_WRITEMASK = 2930;
GL.DEPTH_CLEAR_VALUE = 2931;
GL.DEPTH_FUNC = 2932;
GL.STENCIL_CLEAR_VALUE = 2961;
GL.STENCIL_FUNC = 2962;
GL.STENCIL_FAIL = 2964;
GL.STENCIL_PASS_DEPTH_FAIL = 2965;
GL.STENCIL_PASS_DEPTH_PASS = 2966;
GL.STENCIL_REF = 2967;
GL.STENCIL_VALUE_MASK = 2963;
GL.STENCIL_WRITEMASK = 2968;
GL.STENCIL_BACK_FUNC = 34816;
GL.STENCIL_BACK_FAIL = 34817;
GL.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
GL.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
GL.STENCIL_BACK_REF = 36003;
GL.STENCIL_BACK_VALUE_MASK = 36004;
GL.STENCIL_BACK_WRITEMASK = 36005;
GL.VIEWPORT = 2978;
GL.SCISSOR_BOX = 3088;
GL.COLOR_CLEAR_VALUE = 3106;
GL.COLOR_WRITEMASK = 3107;
GL.UNPACK_ALIGNMENT = 3317;
GL.PACK_ALIGNMENT = 3333;
GL.MAX_TEXTURE_SIZE = 3379;
GL.MAX_VIEWPORT_DIMS = 3386;
GL.SUBPIXEL_BITS = 3408;
GL.RED_BITS = 3410;
GL.GREEN_BITS = 3411;
GL.BLUE_BITS = 3412;
GL.ALPHA_BITS = 3413;
GL.DEPTH_BITS = 3414;
GL.STENCIL_BITS = 3415;
GL.POLYGON_OFFSET_UNITS = 10752;
GL.POLYGON_OFFSET_FACTOR = 32824;
GL.TEXTURE_BINDING_2D = 32873;
GL.SAMPLE_BUFFERS = 32936;
GL.SAMPLES = 32937;
GL.SAMPLE_COVERAGE_VALUE = 32938;
GL.SAMPLE_COVERAGE_INVERT = 32939;
GL.NUM_COMPRESSED_TEXTURE_FORMATS = 34466;
GL.COMPRESSED_TEXTURE_FORMATS = 34467;
GL.DONT_CARE = 4352;
GL.FASTEST = 4353;
GL.NICEST = 4354;
GL.GENERATE_MIPMAP_HINT = 33170;
GL.BYTE = 5120;
GL.UNSIGNED_BYTE = 5121;
GL.SHORT = 5122;
GL.UNSIGNED_SHORT = 5123;
GL.INT = 5124;
GL.UNSIGNED_INT = 5125;
GL.FLOAT = 5126;
GL.DEPTH_COMPONENT = 6402;
GL.ALPHA = 6406;
GL.RGB = 6407;
GL.RGBA = 6408;
GL.LUMINANCE = 6409;
GL.LUMINANCE_ALPHA = 6410;
GL.UNSIGNED_SHORT_4_4_4_4 = 32819;
GL.UNSIGNED_SHORT_5_5_5_1 = 32820;
GL.UNSIGNED_SHORT_5_6_5 = 33635;
GL.FRAGMENT_SHADER = 35632;
GL.VERTEX_SHADER = 35633;
GL.MAX_VERTEX_ATTRIBS = 34921;
GL.MAX_VERTEX_UNIFORM_VECTORS = 36347;
GL.MAX_VARYING_VECTORS = 36348;
GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
GL.MAX_TEXTURE_IMAGE_UNITS = 34930;
GL.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
GL.SHADER_TYPE = 35663;
GL.DELETE_STATUS = 35712;
GL.LINK_STATUS = 35714;
GL.VALIDATE_STATUS = 35715;
GL.ATTACHED_SHADERS = 35717;
GL.ACTIVE_UNIFORMS = 35718;
GL.ACTIVE_UNIFORM_MAX_LENGTH = 35719;
GL.ACTIVE_ATTRIBUTES = 35721;
GL.ACTIVE_ATTRIBUTE_MAX_LENGTH = 35722;
GL.SHADING_LANGUAGE_VERSION = 35724;
GL.CURRENT_PROGRAM = 35725;
GL.NEVER = 512;
GL.LESS = 513;
GL.EQUAL = 514;
GL.LEQUAL = 515;
GL.GREATER = 516;
GL.NOTEQUAL = 517;
GL.GEQUAL = 518;
GL.ALWAYS = 519;
GL.KEEP = 7680;
GL.REPLACE = 7681;
GL.INCR = 7682;
GL.DECR = 7683;
GL.INVERT = 5386;
GL.INCR_WRAP = 34055;
GL.DECR_WRAP = 34056;
GL.VENDOR = 7936;
GL.RENDERER = 7937;
GL.VERSION = 7938;
GL.EXTENSIONS = 7939;
GL.NEAREST = 9728;
GL.LINEAR = 9729;
GL.NEAREST_MIPMAP_NEAREST = 9984;
GL.LINEAR_MIPMAP_NEAREST = 9985;
GL.NEAREST_MIPMAP_LINEAR = 9986;
GL.LINEAR_MIPMAP_LINEAR = 9987;
GL.TEXTURE_MAG_FILTER = 10240;
GL.TEXTURE_MIN_FILTER = 10241;
GL.TEXTURE_WRAP_S = 10242;
GL.TEXTURE_WRAP_T = 10243;
GL.TEXTURE_2D = 3553;
GL.TEXTURE = 5890;
GL.TEXTURE_CUBE_MAP = 34067;
GL.TEXTURE_BINDING_CUBE_MAP = 34068;
GL.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
GL.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
GL.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
GL.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
GL.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
GL.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
GL.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
GL.TEXTURE0 = 33984;
GL.TEXTURE1 = 33985;
GL.TEXTURE2 = 33986;
GL.TEXTURE3 = 33987;
GL.TEXTURE4 = 33988;
GL.TEXTURE5 = 33989;
GL.TEXTURE6 = 33990;
GL.TEXTURE7 = 33991;
GL.TEXTURE8 = 33992;
GL.TEXTURE9 = 33993;
GL.TEXTURE10 = 33994;
GL.TEXTURE11 = 33995;
GL.TEXTURE12 = 33996;
GL.TEXTURE13 = 33997;
GL.TEXTURE14 = 33998;
GL.TEXTURE15 = 33999;
GL.TEXTURE16 = 34000;
GL.TEXTURE17 = 34001;
GL.TEXTURE18 = 34002;
GL.TEXTURE19 = 34003;
GL.TEXTURE20 = 34004;
GL.TEXTURE21 = 34005;
GL.TEXTURE22 = 34006;
GL.TEXTURE23 = 34007;
GL.TEXTURE24 = 34008;
GL.TEXTURE25 = 34009;
GL.TEXTURE26 = 34010;
GL.TEXTURE27 = 34011;
GL.TEXTURE28 = 34012;
GL.TEXTURE29 = 34013;
GL.TEXTURE30 = 34014;
GL.TEXTURE31 = 34015;
GL.ACTIVE_TEXTURE = 34016;
GL.REPEAT = 10497;
GL.CLAMP_TO_EDGE = 33071;
GL.MIRRORED_REPEAT = 33648;
GL.FLOAT_VEC2 = 35664;
GL.FLOAT_VEC3 = 35665;
GL.FLOAT_VEC4 = 35666;
GL.INT_VEC2 = 35667;
GL.INT_VEC3 = 35668;
GL.INT_VEC4 = 35669;
GL.BOOL = 35670;
GL.BOOL_VEC2 = 35671;
GL.BOOL_VEC3 = 35672;
GL.BOOL_VEC4 = 35673;
GL.FLOAT_MAT2 = 35674;
GL.FLOAT_MAT3 = 35675;
GL.FLOAT_MAT4 = 35676;
GL.SAMPLER_2D = 35678;
GL.SAMPLER_CUBE = 35680;
GL.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
GL.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
GL.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
GL.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
GL.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
GL.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
GL.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
GL.IMPLEMENTATION_COLOR_READ_TYPE = 35738;
GL.IMPLEMENTATION_COLOR_READ_FORMAT = 35739;
GL.COMPILE_STATUS = 35713;
GL.INFO_LOG_LENGTH = 35716;
GL.SHADER_SOURCE_LENGTH = 35720;
GL.SHADER_COMPILER = 36346;
GL.LOW_FLOAT = 36336;
GL.MEDIUM_FLOAT = 36337;
GL.HIGH_FLOAT = 36338;
GL.LOW_INT = 36339;
GL.MEDIUM_INT = 36340;
GL.HIGH_INT = 36341;
GL.FRAMEBUFFER = 36160;
GL.RENDERBUFFER = 36161;
GL.RGBA4 = 32854;
GL.RGB5_A1 = 32855;
GL.RGB565 = 36194;
GL.DEPTH_COMPONENT16 = 33189;
GL.STENCIL_INDEX = 6401;
GL.STENCIL_INDEX8 = 36168;
GL.RENDERBUFFER_WIDTH = 36162;
GL.RENDERBUFFER_HEIGHT = 36163;
GL.RENDERBUFFER_INTERNAL_FORMAT = 36164;
GL.RENDERBUFFER_RED_SIZE = 36176;
GL.RENDERBUFFER_GREEN_SIZE = 36177;
GL.RENDERBUFFER_BLUE_SIZE = 36178;
GL.RENDERBUFFER_ALPHA_SIZE = 36179;
GL.RENDERBUFFER_DEPTH_SIZE = 36180;
GL.RENDERBUFFER_STENCIL_SIZE = 36181;
GL.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
GL.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
GL.COLOR_ATTACHMENT0 = 36064;
GL.DEPTH_ATTACHMENT = 36096;
GL.STENCIL_ATTACHMENT = 36128;
GL.NONE = 0;
GL.FRAMEBUFFER_COMPLETE = 36053;
GL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
GL.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
GL.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
GL.FRAMEBUFFER_UNSUPPORTED = 36061;
GL.FRAMEBUFFER_BINDING = 36006;
GL.RENDERBUFFER_BINDING = 36007;
GL.MAX_RENDERBUFFER_SIZE = 34024;
GL.INVALID_FRAMEBUFFER_OPERATION = 1286;
kumite.framebuffereffect.FBTextureLayer.__meta__ = { fields : { stage : { Inject : null}, time : { Inject : null}}};
kumite.framebuffereffect.FBTextureLayer.__rtti = "<class path=\"kumite.framebuffereffect.FBTextureLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<transitions public=\"1\"><c path=\"kumite.layer.LayerTransitions\"/></transitions>\n\t<cutTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></cutTransition>\n\t<moveTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></moveTransition>\n\t<alphaTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></alphaTransition>\n\t<texture public=\"1\"><c path=\"GLFramebuffer\"/></texture>\n\t<scale public=\"1\"><c path=\"Float\"/></scale>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<worldViewMatrixUniform><c path=\"GLUniformLocation\"/></worldViewMatrixUniform>\n\t<textureUniform><c path=\"GLUniformLocation\"/></textureUniform>\n\t<alphaUniform><c path=\"GLUniformLocation\"/></alphaUniform>\n\t<init public=\"1\" set=\"method\" line=\"52\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"70\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"76\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"42\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.framebuffereffect._FBTextureLayer.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 worldViewMatrix;\n\n\tvarying vec4 vertex;\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);\n\t\tvertex = vec4(vertexPosition, 0.0, 1.0);\n\t\ttextureCoord = vertexPosition.xy;\n\t}\n\n"]}};
kumite.framebuffereffect._FBTextureLayer.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform sampler2D texture;\n\tuniform float alpha;\n\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tvec4 color = texture2D(texture, textureCoord);\n\t\tgl_FragColor = color * vec4(1.0, 1.0, 1.0, alpha);\n\t}\n\n"]}};
kumite.layer.TextureLayer.__meta__ = { fields : { stage : { Inject : null}, time : { Inject : null}, textureRegistry : { Inject : null}}};
kumite.layer.TextureLayer.__rtti = "<class path=\"kumite.layer.TextureLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<textureRegistry public=\"1\"><c path=\"GLTextureRegistry\"/></textureRegistry>\n\t<transitions public=\"1\"><c path=\"kumite.layer.LayerTransitions\"/></transitions>\n\t<cutTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></cutTransition>\n\t<moveTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></moveTransition>\n\t<alphaTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></alphaTransition>\n\t<scale public=\"1\"><c path=\"Float\"/></scale>\n\t<textureConfig public=\"1\"><c path=\"GLTextureConfig\"/></textureConfig>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<worldViewMatrixUniform><c path=\"GLUniformLocation\"/></worldViewMatrixUniform>\n\t<textureUniform><c path=\"GLUniformLocation\"/></textureUniform>\n\t<alphaUniform><c path=\"GLUniformLocation\"/></alphaUniform>\n\t<init public=\"1\" set=\"method\" line=\"53\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"71\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"77\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"43\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer._TextureLayer.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 worldViewMatrix;\n\n\tvarying vec4 vertex;\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);\n\t\tvertex = vec4(vertexPosition, 0.0, 1.0);\n\t\ttextureCoord = vertexPosition.xy;\n\t}\n\n"]}};
kumite.layer._TextureLayer.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform sampler2D texture;\n\tuniform float alpha;\n\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tvec4 color = texture2D(texture, textureCoord);\n\t\tgl_FragColor = color * vec4(1.0, 1.0, 1.0, alpha);\n\t}\n\n"]}};
shader.DisplayObjectFragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform sampler2D texture;\n\tuniform float alpha;\n\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tvec4 color = texture2D(texture, textureCoord);\n\t\tgl_FragColor = color * vec4(1.0, 1.0, 1.0, alpha);\n\t}\n\n"]}};
kumite.scene.DefaultScene.__rtti = "<class path=\"kumite.scene.DefaultScene\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.SceneLifecycle\"/>\n\t<name public=\"1\"><c path=\"String\"/></name>\n\t<preconfiguredLifecycles><c path=\"Array\"><c path=\"kumite.scene._DefaultScene.LifecycleAndLayerId\"/></c></preconfiguredLifecycles>\n\t<addLayerLifecycle public=\"1\" set=\"method\" line=\"25\"><f a=\"lifecycle:?layerId\">\n\t<c path=\"kumite.scene.LayerLifecycle\"/>\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></addLayerLifecycle>\n\t<sceneInit public=\"1\" set=\"method\" line=\"33\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></sceneInit>\n\t<initTransition public=\"1\" set=\"method\" line=\"39\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></initTransition>\n\t<renderTransition public=\"1\" set=\"method\" line=\"43\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"47\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<addPreconfiguredLifecycles set=\"method\" line=\"51\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></addPreconfiguredLifecycles>\n\t<new public=\"1\" set=\"method\" line=\"19\"><f a=\"?name\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></new>\n</class>";
kumite.camera.Config.__rtti = "<class path=\"kumite.camera.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<camera public=\"1\"><c path=\"kumite.camera.Camera\"/></camera>\n\t<cameraMouseMover public=\"1\"><c path=\"kumite.camera.CameraMouseMover\"/></cameraMouseMover>\n\t<new public=\"1\" set=\"method\" line=\"9\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.vjinterface.Config.__rtti = "<class path=\"kumite.vjinterface.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<vjinterface public=\"1\"><c path=\"kumite.vjinterface.VJInterface\"/></vjinterface>\n\t<new public=\"1\" set=\"method\" line=\"8\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.mouse.Config.__rtti = "<class path=\"kumite.mouse.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<mouseController public=\"1\"><c path=\"kumite.mouse.MouseController\"/></mouseController>\n\t<new public=\"1\" set=\"method\" line=\"8\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.flyingman.FlyingManGraph.__meta__ = { fields : { textureRegistry : { Inject : null}, time : { Inject : null}, startPrepare : { Sequence : ["boot","startPrepare"]}, start : { Sequence : ["boot","start"]}, tick : { Message : null}}};
kumite.flyingman.FlyingManGraph.__rtti = "<class path=\"kumite.flyingman.FlyingManGraph\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<MAN1 public=\"1\" line=\"10\" static=\"1\"><c path=\"GLTextureConfig\"/></MAN1>\n\t<MAN2 public=\"1\" line=\"11\" static=\"1\"><c path=\"GLTextureConfig\"/></MAN2>\n\t<MAN3 public=\"1\" line=\"12\" static=\"1\"><c path=\"GLTextureConfig\"/></MAN3>\n\t<FLOWER1 public=\"1\" line=\"13\" static=\"1\"><c path=\"GLTextureConfig\"/></FLOWER1>\n\t<FLOWER2 public=\"1\" line=\"14\" static=\"1\"><c path=\"GLTextureConfig\"/></FLOWER2>\n\t<BUTTERFLY public=\"1\" line=\"15\" static=\"1\"><c path=\"GLTextureConfig\"/></BUTTERFLY>\n\t<textureRegistry public=\"1\"><c path=\"GLTextureRegistry\"/></textureRegistry>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<sprites public=\"1\"><c path=\"Array\"><c path=\"kumite.flyingman.Sprite\"/></c></sprites>\n\t<butterfly public=\"1\"><c path=\"kumite.flyingman.Sprite\"/></butterfly>\n\t<butterflyCloseupCamera public=\"1\"><c path=\"kumite.flyingman.ButterflyCloseupCamera\"/></butterflyCloseupCamera>\n\t<butterflyCloseupCamera2 public=\"1\"><c path=\"kumite.flyingman.ButterflyCloseupCamera2\"/></butterflyCloseupCamera2>\n\t<butterflyLife public=\"1\"><c path=\"kumite.flyingman.ButterflyLife\"/></butterflyLife>\n\t<firstUpdate><e path=\"Bool\"/></firstUpdate>\n\t<updatedThisFrame><e path=\"Bool\"/></updatedThisFrame>\n\t<startPrepare public=\"1\" set=\"method\" line=\"41\"><f a=\"\"><c path=\"bpmjs.SequencerTaskGroup\"/></f></startPrepare>\n\t<start public=\"1\" set=\"method\" line=\"56\"><f a=\"\"><e path=\"Void\"/></f></start>\n\t<tick public=\"1\" set=\"method\" line=\"95\"><f a=\"tick\">\n\t<c path=\"kumite.time.Tick\"/>\n\t<e path=\"Void\"/>\n</f></tick>\n\t<update public=\"1\" set=\"method\" line=\"100\"><f a=\"\"><e path=\"Void\"/></f></update>\n\t<updateInternal set=\"method\" line=\"109\"><f a=\"\"><e path=\"Void\"/></f></updateInternal>\n\t<new public=\"1\" set=\"method\" line=\"34\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.flyingman.FlyingManGraph.MAN1 = GLTextureConfig.create("data/image/flyingman/man1.png",9985);
kumite.flyingman.FlyingManGraph.MAN2 = GLTextureConfig.create("data/image/flyingman/man2.png",9985);
kumite.flyingman.FlyingManGraph.MAN3 = GLTextureConfig.create("data/image/flyingman/man3.png",9985);
kumite.flyingman.FlyingManGraph.FLOWER1 = GLTextureConfig.create("data/image/flyingman/flower1.png",9985);
kumite.flyingman.FlyingManGraph.FLOWER2 = GLTextureConfig.create("data/image/flyingman/flower2.png",9985);
kumite.flyingman.FlyingManGraph.BUTTERFLY = GLTextureConfig.create("data/image/flyingman/butterfly.png",9985);
kumite.flyingman.FlyingManScene.__meta__ = { fields : { flyingManClearLayer : { Inject : null}, paperBackground : { Inject : null}, displayList : { Inject : null}, textureRegistry : { Inject : null}, graph : { Inject : null}}};
kumite.flyingman.FlyingManScene.__rtti = "<class path=\"kumite.flyingman.FlyingManScene\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.SceneLifecycle\"/>\n\t<flyingManClearLayer public=\"1\"><c path=\"kumite.layer.ClearLayer\"/></flyingManClearLayer>\n\t<paperBackground public=\"1\"><c path=\"kumite.layer.TextureLayer\"/></paperBackground>\n\t<displayList public=\"1\"><c path=\"kumite.displaylist.DisplayListLayer\"/></displayList>\n\t<textureRegistry public=\"1\"><c path=\"GLTextureRegistry\"/></textureRegistry>\n\t<graph public=\"1\"><c path=\"kumite.flyingman.FlyingManGraph\"/></graph>\n\t<flyingManLayer public=\"1\"><c path=\"kumite.flyingman.FlyingManLayer\"/></flyingManLayer>\n\t<sceneId><c path=\"String\"/></sceneId>\n\t<sceneInit public=\"1\" set=\"method\" line=\"37\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></sceneInit>\n\t<initTransition public=\"1\" set=\"method\" line=\"46\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></initTransition>\n\t<renderTransition public=\"1\" set=\"method\" line=\"59\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"64\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"32\"><f a=\"sceneId\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></new>\n</class>";
bpmjs.Stats.fps = 0;
kumite.launch.Config.__rtti = "<class path=\"kumite.launch.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<sequencer public=\"1\"><c path=\"bpmjs.Sequencer\"/></sequencer>\n\t<launcher public=\"1\"><c path=\"kumite.launch.Launcher\"/></launcher>\n\t<preloadDisplay public=\"1\"><c path=\"kumite.launch.PreloadDisplay\"/></preloadDisplay>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.framebuffereffect.FBDisableLayer.__rtti = "<class path=\"kumite.framebuffereffect.FBDisableLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<init public=\"1\" set=\"method\" line=\"19\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"23\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"28\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"17\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
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
kumite.time.Time.EXPECTED_FRAMERATE = 60;
Main.main()