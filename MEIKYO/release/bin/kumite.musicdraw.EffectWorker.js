var $hxClasses = $hxClasses || {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var GLTexture = $hxClasses["GLTexture"] = function() {
};
GLTexture.__name__ = ["GLTexture"];
GLTexture.prototype = {
	texture: null
	,height: null
	,width: null
	,__class__: GLTexture
}
var GLArrayTexture = $hxClasses["GLArrayTexture"] = function() {
	GLTexture.call(this);
};
GLArrayTexture.__name__ = ["GLArrayTexture"];
GLArrayTexture.__super__ = GLTexture;
GLArrayTexture.prototype = $extend(GLTexture.prototype,{
	setPixel: function(x,y,r,g,b,a) {
		var index = (y * this.width + x) * 4;
		this.array[index] = r;
		this.array[index + 1] = g;
		this.array[index + 2] = b;
		this.array[index + 3] = a;
	}
	,array: null
	,__class__: GLArrayTexture
});
var HxOverrides = $hxClasses["HxOverrides"] = function() { }
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
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
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	next: function() {
		return this.min++;
	}
	,hasNext: function() {
		return this.min < this.max;
	}
	,max: null
	,min: null
	,__class__: IntIter
}
var RasterGraphic = $hxClasses["RasterGraphic"] = function() {
	this.noSmooth();
};
RasterGraphic.__name__ = ["RasterGraphic"];
RasterGraphic.prototype = {
	lineXiaolinWu: function(x1,y1,x2,y2) {
		var steep = (y2 - y1 < 0?-(y2 - y1):y2 - y1 > x2 - x1?-(x2 - x1):x2 - x1) <= 0?false:true;
		var swap;
		if(steep) {
			swap = x1;
			x1 = y1;
			y1 = swap;
			swap = x2;
			x2 = y2;
			y2 = swap;
		}
		if(x1 > x2) {
			swap = x1;
			x1 = x2;
			x2 = swap;
			swap = y1;
			y1 = y2;
			y2 = swap;
		}
		var dx = x2 - x1;
		var dy = y2 - y1;
		var gradient = dy / dx;
		var xend = x1;
		var yend = y1 + gradient * (xend - x1);
		var xgap = 1 - (x1 + 0.5) % 1;
		var xpx1 = xend;
		var ypx1 = yend | 0;
		var alpha;
		alpha = yend % 1 * xgap;
		var intery = yend + gradient;
		xend = x2;
		yend = y2 + gradient * (xend - x2);
		xgap = (x2 + 0.5) % 1;
		var xpx2 = xend;
		var ypx2 = yend | 0;
		alpha = (1 - yend % 1) * xgap;
		if(steep) this.drawAlphaPixel(ypx2,xpx2,alpha); else this.drawAlphaPixel(xpx2,ypx2,alpha);
		alpha = yend % 1 * xgap;
		if(steep) this.drawAlphaPixel(ypx2 + 1,xpx2,alpha); else this.drawAlphaPixel(xpx2,ypx2 + 1,alpha);
		var x = xpx1;
		while(x++ < xpx2) {
			alpha = 1 - intery % 1;
			if(steep) this.drawAlphaPixel(intery | 0,x,alpha); else this.drawAlphaPixel(x,intery | 0,alpha);
			alpha = intery % 1;
			if(steep) this.drawAlphaPixel((intery | 0) + 1,x,alpha); else this.drawAlphaPixel(x,(intery | 0) + 1,alpha);
			intery = intery + gradient;
		}
	}
	,lineBresenham: function(x0,y0,x1,y1) {
		var x = x0;
		var y = y0;
		var dx = x1 - x0;
		var dy = y1 - y0;
		var xinc = dx > 0?1:-1;
		var yinc = dy > 0?1:-1;
		dx = dx < 0?-dx:dx;
		dy = dy < 0?-dy:dy;
		this.setPixel(x,y);
		if(dx > dy) {
			var cumul = dx >> 1;
			var i = 1;
			while(i <= dx) {
				x += xinc;
				cumul += dy;
				if(cumul >= dx) {
					cumul -= dx;
					y += yinc;
				}
				this.setPixel(x,y);
				i++;
			}
		} else {
			var cumul = dy >> 1;
			var i = 1;
			while(i <= dy) {
				y += yinc;
				cumul += dx;
				if(cumul >= dy) {
					cumul -= dy;
					x += xinc;
				}
				this.setPixel(x,y);
				i++;
			}
		}
	}
	,fillRect: function(x,y,width,height) {
		var _g1 = x, _g = x + width;
		while(_g1 < _g) {
			var xi = _g1++;
			var _g3 = y, _g2 = y + height;
			while(_g3 < _g2) {
				var yi = _g3++;
				this.setPixel(xi,yi);
			}
		}
	}
	,clear: function() {
		var _g1 = 0, _g = this.raster.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.raster[i] = 0;
		}
	}
	,drawAlphaPixel: function(x,y,alpha) {
		var index = (y * this.rasterWidth + x) * 4;
		this.raster[index] = this.r;
		this.raster[index + 1] = this.g;
		this.raster[index + 2] = this.b;
		this.raster[index + 3] = this.a;
	}
	,setPixel: function(x,y) {
		var index = (y * this.rasterWidth + x) * 4;
		this.raster[index] = this.r;
		this.raster[index + 1] = this.g;
		this.raster[index + 2] = this.b;
		this.raster[index + 3] = this.a;
	}
	,setColor: function(r,g,b,a) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}
	,noSmooth: function() {
		this.line = $bind(this,this.lineBresenham);
	}
	,smooth: function() {
		this.line = $bind(this,this.lineXiaolinWu);
	}
	,line: null
	,a: null
	,b: null
	,g: null
	,r: null
	,rasterHeight: null
	,rasterWidth: null
	,raster: null
	,__class__: RasterGraphic
}
var Reflect = $hxClasses["Reflect"] = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
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
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
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
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && (v.__name__ || v.__ename__);
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
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
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
var Type = $hxClasses["Type"] = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
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
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
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
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
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
		if(v.__name__ || v.__ename__) return ValueType.TObject;
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
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
var bpmjs = bpmjs || {}
bpmjs.WorkingInstance = $hxClasses["bpmjs.WorkingInstance"] = function(receiver) {
	Reflect;
	this.initConsole();
	var instance = this;
	
			var transferMethod = null;

			onmessage = function(event)
			{
				bpmjs.WorkingInstance.postMessage = function(data)
				{
					postMessage(data)
				}
				
				if (transferMethod != null)
				{
					var buffer = event.data;
					var resultBuffer = Reflect.callMethod(receiver, transferMethod, [buffer]);
					if (resultBuffer == null)
						resultBuffer = buffer;
					transferMethod = null;
					
					if (resultBuffer.byteLength == 0)
						throw 'WorkingInstance: Buffer length is zero!';
						
					webkitPostMessage(resultBuffer, [resultBuffer]);
					
					if (resultBuffer.byteLength != 0)
						throw 'WorkingInstance: Buffer length is not zero!';
						
				}
				else
				{
					var methodName = event.data.method;
					
					if (methodName == '__prepareTransfer__')
					{
						var transferMethodName = event.data.args[0];
						transferMethod = Reflect.field(receiver, transferMethodName);
						if (transferMethod == null)
							throw 'WorkingInstance: Method ' + transferMethodName + ' is null!';
						webkitPostMessage({result:null});
					}
					else
					{
						var args = event.data.args;
						var method = Reflect.field(receiver, methodName);
						if (method == null)
							throw 'WorkingInstance: Method ' + methodName + ' is null!';
							
						var result = Reflect.callMethod(receiver, method, args);
						webkitPostMessage({result:result});
					}
				}
			}
		;
};
bpmjs.WorkingInstance.__name__ = ["bpmjs","WorkingInstance"];
bpmjs.WorkingInstance.postMessage = null;
bpmjs.WorkingInstance.pipeMethod = function(methodName,args) {
	bpmjs.WorkingInstance.postMessage({ type : "pipeMethod", method : methodName, args : args});
}
bpmjs.WorkingInstance.prototype = {
	initConsole: function() {
		console = { };
		console.info = function(message) {
			bpmjs.WorkingInstance.pipeMethod("Log.info",[message]);
		};
		console.warn = function(message) {
			bpmjs.WorkingInstance.pipeMethod("Log.warn",[message]);
		};
		console.error = function(message) {
			bpmjs.WorkingInstance.pipeMethod("Log.error",[message]);
		};
		console.log = function(message) {
			bpmjs.WorkingInstance.pipeMethod("Log.info",[message]);
		};
	}
	,__class__: bpmjs.WorkingInstance
}
var haxe = haxe || {}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Timer = $hxClasses["haxe.Timer"] = function(time_ms) {
	var me = this;
	this.id = window.setInterval(function() {
		me.run();
	},time_ms);
};
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
	return new Date().getTime() / 1000;
}
haxe.Timer.prototype = {
	run: function() {
	}
	,stop: function() {
		if(this.id == null) return;
		window.clearInterval(this.id);
		this.id = null;
	}
	,id: null
	,__class__: haxe.Timer
}
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
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
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
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
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
var kumite = kumite || {}
if(!kumite.musicdraw) kumite.musicdraw = {}
kumite.musicdraw.DNAEffect = $hxClasses["kumite.musicdraw.DNAEffect"] = function() {
	this.setProgress = function(_) {
	};
	this.texture = new GLArrayTexture();
};
kumite.musicdraw.DNAEffect.__name__ = ["kumite","musicdraw","DNAEffect"];
kumite.musicdraw.DNAEffect.prototype = {
	render: function(buffer) {
		this.texture.array = new Uint8Array(buffer);
		var height = this.texture.height;
		var width = height / 1.414 | 0;
		var bandsLength = this.analyzer.bands.length * this.paramLength;
		var bandsPosition = this.analyzer.bands.length * this.paramPosition;
		var offsetX = (this.texture.width - width) / 2 | 0;
		var offsetY = (this.texture.height - height) / 2 | 0;
		var bandIndexLength = bandsLength / height | 0;
		if(bandIndexLength < 1) bandIndexLength = 1;
		var noteCount = this.analyzer.bands[0].length;
		var _g = 0;
		while(_g < height) {
			var y = _g++;
			var bandIndexFrom = Math.floor(bandsLength / height * y + bandsPosition);
			if(y % 100 == 0) this.setProgress(y / height);
			var _g1 = 0;
			while(_g1 < width) {
				var x = _g1++;
				var noteIndex = Math.round(noteCount / width * x);
				var note = 0.0;
				var _g2 = 0;
				while(_g2 < bandIndexLength) {
					var bandIndex = _g2++;
					var band = this.analyzer.bands[(bandIndexFrom + bandIndex) % this.analyzer.bands.length];
					note += band[noteIndex];
				}
				note /= bandIndexLength;
				note *= 3;
				if(note > 1) note = 1;
				this.texture.setPixel(x + offsetX,y + offsetY,255 - note * note * 100 | 0,255 - note * note * 255 | 0,255 - note * 200 | 0,255);
			}
		}
	}
	,setParams: function(params) {
		this.paramLength = params.paramLength;
		this.paramPosition = params.paramPosition;
		this.texture.width = params.width;
		this.texture.height = params.height;
	}
	,init: function() {
	}
	,setProgress: null
	,paramPosition: null
	,paramLength: null
	,texture: null
	,analyzer: null
	,__class__: kumite.musicdraw.DNAEffect
}
kumite.musicdraw.EffectWorker = $hxClasses["kumite.musicdraw.EffectWorker"] = function() {
};
kumite.musicdraw.EffectWorker.__name__ = ["kumite","musicdraw","EffectWorker"];
kumite.musicdraw.EffectWorker.main = function() {
	kumite.musicdraw.RasterEffect;
	kumite.musicdraw.DNAEffect;
	kumite.musicdraw.TimeEffect;
	new bpmjs.WorkingInstance(new kumite.musicdraw.EffectWorker());
}
kumite.musicdraw.EffectWorker.prototype = {
	render: function(buffer) {
		this.effect.render(buffer);
	}
	,config: function(params) {
		this.effect.setParams(params);
	}
	,init: function(data) {
		var clazz = Type.resolveClass(data.effectClassName);
		this.effect = Type.createInstance(clazz,[]);
		this.effect.setProgress = function(progress) {
			bpmjs.WorkingInstance.pipeMethod("setProgress",[progress]);
		};
		this.effect.analyzer = new kumite.musicdraw.MusicAnalyzer();
		this.effect.analyzer.bands = data.analyzer.bands;
		this.effect.analyzer.init();
		this.effect.init();
	}
	,effect: null
	,__class__: kumite.musicdraw.EffectWorker
}
kumite.musicdraw.MusicAnalyzer = $hxClasses["kumite.musicdraw.MusicAnalyzer"] = function() {
	this.levels = new Array();
};
kumite.musicdraw.MusicAnalyzer.__name__ = ["kumite","musicdraw","MusicAnalyzer"];
kumite.musicdraw.MusicAnalyzer.prototype = {
	getLevel3: function(position) {
		var positionAll = position * this.levels.length;
		var positionFloor0 = positionAll | 0;
		var positionFloor1 = positionFloor0 + 1;
		var fraction = positionAll - positionFloor0;
		var l0 = this.levels[positionFloor0 % this.levels.length];
		var l1 = this.levels[positionFloor1 % this.levels.length];
		return l0 + (l1 - l0) * fraction;
	}
	,getLevel2: function(position) {
		var positionFloor = position * this.levels.length | 0;
		return this.levels[positionFloor % this.levels.length];
	}
	,getLevel: function(from,to) {
		var fromBand = from * this.bands.length | 0;
		var toBand = to * this.bands.length | 0;
		var level = 0.0;
		var _g = fromBand;
		while(_g < toBand) {
			var band = _g++;
			var _g1 = 0, _g2 = this.bands[band];
			while(_g1 < _g2.length) {
				var note = _g2[_g1];
				++_g1;
				level += note;
			}
		}
		level /= this.bands[0].length * (toBand - fromBand);
		return level;
	}
	,init: function() {
		var _g = 0, _g1 = this.bands;
		while(_g < _g1.length) {
			var band = _g1[_g];
			++_g;
			var level = 0.0;
			var _g2 = 0;
			while(_g2 < band.length) {
				var note = band[_g2];
				++_g2;
				level += note;
			}
			level /= band.length;
			this.levels.push(level);
		}
	}
	,levels: null
	,bands: null
	,__class__: kumite.musicdraw.MusicAnalyzer
}
kumite.musicdraw.MusicDrawEffect = $hxClasses["kumite.musicdraw.MusicDrawEffect"] = function() { }
kumite.musicdraw.MusicDrawEffect.__name__ = ["kumite","musicdraw","MusicDrawEffect"];
kumite.musicdraw.MusicDrawEffect.prototype = {
	render: null
	,setParams: null
	,init: null
	,analyzer: null
	,setProgress: null
	,__class__: kumite.musicdraw.MusicDrawEffect
}
kumite.musicdraw.RasterEffect = $hxClasses["kumite.musicdraw.RasterEffect"] = function() {
	this.setProgress = function(_) {
	};
	this.texture = new GLArrayTexture();
};
kumite.musicdraw.RasterEffect.__name__ = ["kumite","musicdraw","RasterEffect"];
kumite.musicdraw.RasterEffect.prototype = {
	render: function(buffer) {
		this.texture.array = new Uint8Array(buffer);
		var height = this.texture.height;
		var width = height / 1.414 | 0;
		var offsetX = (this.texture.width - width) / 2 | 0;
		var offsetY = (this.texture.height - height) / 2 | 0;
		var rx = this.params.rx | 0;
		var ry = this.params.ry | 0;
		var tileWidth = width / rx;
		var tileHeight = height / ry;
		var _g = 0;
		while(_g < ry) {
			var ty = _g++;
			var _g1 = 0;
			while(_g1 < rx) {
				var tx = _g1++;
				var x0 = tx * tileWidth | 0;
				var y0 = ty * tileHeight | 0;
				var songPositionFrom = (ty * rx + tx) / (rx * ry);
				var songPositionTo = songPositionFrom + 1 / (rx * ry);
				var level = this.analyzer.getLevel(songPositionFrom,songPositionTo);
				var r = level * this.params.scale * 255;
				if(r > 255) r = 255;
				var _g3 = x0, _g2 = (x0 + tileWidth | 0) + 1;
				while(_g3 < _g2) {
					var x = _g3++;
					var _g5 = y0, _g4 = (y0 + tileHeight | 0) + 1;
					while(_g5 < _g4) {
						var y = _g5++;
						this.texture.setPixel(x + offsetX,y + offsetY,r | 0,128,30,255);
					}
				}
			}
		}
	}
	,setParams: function(params) {
		this.params = params;
		this.texture.width = params.width;
		this.texture.height = params.height;
	}
	,init: function() {
	}
	,setProgress: null
	,params: null
	,texture: null
	,analyzer: null
	,__class__: kumite.musicdraw.RasterEffect
}
kumite.musicdraw.TimeEffect = $hxClasses["kumite.musicdraw.TimeEffect"] = function() {
	this.setProgress = function(_) {
	};
	this.texture = new GLArrayTexture();
	this.index = 0;
};
kumite.musicdraw.TimeEffect.__name__ = ["kumite","musicdraw","TimeEffect"];
kumite.musicdraw.TimeEffect.prototype = {
	render: function(buffer) {
		this.texture.array = new Uint8Array(buffer);
		var g = new RasterGraphic();
		g.smooth();
		g.rasterWidth = this.texture.width;
		g.rasterHeight = this.texture.height;
		g.raster = this.texture.array;
		g.clear();
		var height = this.texture.height;
		var width = height / 1.414 | 0;
		var offsetX = (this.texture.width - width) / 2 | 0;
		var offsetY = (this.texture.height - height) / 2 | 0;
		g.setColor(0,255,0,255);
		g.fillRect(0,0,10,10);
		g.fillRect(100,100,10,10);
		g.line(0,0,100,100);
		g.setColor(255,0,0,255);
		var originX = (width / 2 | 0) + offsetX;
		var originY = (height / 2 | 0) + offsetY;
		var count = this.params.count;
		var oldX = 0;
		var oldY = 0;
		var _g1 = 0, _g = count + 1;
		while(_g1 < _g) {
			var t = _g1++;
			var level = this.analyzer.getLevel3(t / count);
			var r = width * this.params.radius + level * width * this.params.levelRadius;
			var x = (Math.sin(t * Math.PI / (count / 2)) * r + width / 2 | 0) + offsetX;
			var y = (Math.cos(t * Math.PI / (count / 2)) * r + height / 2 | 0) + offsetY;
			if(t > 0) g.line(oldX,oldY,x,y);
			g.line(originX,originY,x,y);
			oldX = x;
			oldY = y;
		}
	}
	,setParams: function(params) {
		this.params = params;
		this.texture.width = params.width;
		this.texture.height = params.height;
	}
	,init: function() {
	}
	,index: null
	,setProgress: null
	,params: null
	,texture: null
	,analyzer: null
	,__class__: kumite.musicdraw.TimeEffect
}
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var Void = $hxClasses.Void = { __ename__ : ["Void"]};
kumite.musicdraw.EffectWorker.main();
