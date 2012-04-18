(function () { "use strict";
var $_, $hxClasses = {}, $estr = function() { return js.Boot.__string_rec(this,''); }
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var CanvasGraphic = function() {
	this.canvas = js.Lib.document.createElement("canvas");
	this.context = this.canvas.getContext("2d");
	this.usePow2Size = true;
	this.setWidth(0);
	this.setHeight(0);
};
$hxClasses["CanvasGraphic"] = CanvasGraphic;
CanvasGraphic.__name__ = ["CanvasGraphic"];
CanvasGraphic.prototype = {
	width: null
	,height: null
	,aspect: null
	,fillStyle: null
	,font: null
	,isInvalid: null
	,canvas: null
	,context: null
	,usePow2Size: null
	,clear: function(color) {
		if(this.usePow2Size) {
			this.canvas.width = Math2.nextPowerOf2(this.width);
			this.canvas.height = Math2.nextPowerOf2(this.height);
		} else {
			this.canvas.width = this.width | 0;
			this.canvas.height = this.height | 0;
		}
		this.context.fillStyle = color == null?"rgba(0, 0, 0, 0)":color.toContextRGBA();
		this.context.fillRect(0,0,this.width,this.height);
		this.isInvalid = true;
	}
	,fillRect: function(x,y,width,height) {
		this.context.fillRect(x,y,width,height);
		this.isInvalid = true;
	}
	,fillText: function(text,x,y,maxWidth) {
		if(text == null) text = "null";
		this.context.fillText(text,x,y);
		this.isInvalid = true;
	}
	,drawImage: function(image,dx,dy,dw,dh) {
		this.context.drawImage(image,dx,dy,dw,dh);
	}
	,drawImage2: function(image,dx,dy) {
		this.context.drawImage(image,dx,dy);
	}
	,drawImage3: function(image) {
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
		return { scale : iw / image.width, x : ix, y : iy};
	}
	,getAspect: function() {
		return this.width / this.height;
	}
	,setFont: function(value) {
		this.context.font = value;
		return value;
	}
	,setFillStyle: function(value) {
		if(Std["is"](value,Color)) this.context.fillStyle = ((function($this) {
			var $r;
			var $t = value;
			if(Std["is"]($t,Color)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this))).toContextRGBA();
		return value;
	}
	,setWidth: function(width) {
		if(this.width == width) return width;
		this.width = width;
		this.clear();
		return width;
	}
	,setHeight: function(height) {
		if(this.height == height) return height;
		this.height = height;
		this.clear();
		return height;
	}
	,__class__: CanvasGraphic
	,__properties__: {set_font:"setFont",set_fillStyle:"setFillStyle",get_aspect:"getAspect",set_height:"setHeight",set_width:"setWidth"}
}
var haxe = {}
haxe.rtti = {}
haxe.rtti.Infos = function() { }
$hxClasses["haxe.rtti.Infos"] = haxe.rtti.Infos;
haxe.rtti.Infos.__name__ = ["haxe","rtti","Infos"];
haxe.rtti.Infos.prototype = {
	__class__: haxe.rtti.Infos
}
var Color = function(r,g,b,a) {
	if(a == null) a = 1.0;
	if(b == null) b = 1.0;
	if(g == null) g = 0.0;
	if(r == null) r = 1.0;
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
};
$hxClasses["Color"] = Color;
Color.__name__ = ["Color"];
Color.__interfaces__ = [haxe.rtti.Infos];
Color.prototype = {
	r: null
	,g: null
	,b: null
	,a: null
	,fromHex: function(hex) {
		this.r = (hex >> 16 & 255) / 255;
		this.g = (hex >> 8 & 255) / 255;
		this.b = (hex & 255) / 255;
		this.a = 1.0;
		return this;
	}
	,scaleRGB: function(factor) {
		this.r *= factor;
		this.g *= factor;
		this.b *= factor;
	}
	,mixFrom: function(color1,color2,color1Mix) {
		if(color1Mix < 0) color1Mix = 0;
		if(color1Mix > 1) color1Mix = 1;
		var color2Mix = 1 - color1Mix;
		this.r = color1.r * color1Mix + color2.r * color2Mix;
		this.g = color1.g * color1Mix + color2.g * color2Mix;
		this.b = color1.b * color1Mix + color2.b * color2Mix;
	}
	,toContextRGB: function() {
		return "rgb(" + this.r * 255 + "," + this.g * 255 + "," + this.b * 255 + ")";
	}
	,toContextRGBA: function() {
		return "rgba(" + (this.r * 255 | 0) + "," + (this.g * 255 | 0) + "," + (this.b * 255 | 0) + "," + this.a + ")";
	}
	,clone: function() {
		return new Color(this.r,this.g,this.b,this.a);
	}
	,toString: function() {
		return "Color: " + this.r + "," + this.g + "," + this.b + "," + this.a;
	}
	,__class__: Color
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw "No string matched";
		return this.r.s.substr(0,this.r.m.index);
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,customReplace: function(s,f) {
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
	,__class__: EReg
}
var LogFilter = function() { }
$hxClasses["LogFilter"] = LogFilter;
LogFilter.__name__ = ["LogFilter"];
LogFilter.prototype = {
	enabled: null
	,__class__: LogFilter
}
var ERegFilter = function(level,r) {
	this.level = level;
	this.r = r;
};
$hxClasses["ERegFilter"] = ERegFilter;
ERegFilter.__name__ = ["ERegFilter"];
ERegFilter.__interfaces__ = [LogFilter];
ERegFilter.prototype = {
	level: null
	,r: null
	,enabled: function(input,i,level) {
		var sender = i.className + "." + i.methodName;
		var matches = this.r.match(sender);
		if(!matches) return input;
		return matches && this.level.isSmallerOrEqual(level);
	}
	,__class__: ERegFilter
}
var GLAnimationFrame = function() { }
$hxClasses["GLAnimationFrame"] = GLAnimationFrame;
GLAnimationFrame.__name__ = ["GLAnimationFrame"];
GLAnimationFrame.run = function(method,fps) {
	if(fps == null) fps = 0;
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
	if(fps == 0) {
		var window = js.Lib.window;
		var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
		if(requestAnimationFrame != null) {
			var requester = (function($this) {
				var $r;
				var requester1 = null;
				requester1 = function() {
					requestAnimationFrame(requester1);
					secureMethod();
				};
				$r = requester1;
				return $r;
			}(this));
			requestAnimationFrame(requester);
		} else {
			var timer = new haxe.Timer(1000 / 60 | 0);
			timer.run = secureMethod;
		}
	} else {
		var timer = new haxe.Timer(1000 / fps | 0);
		timer.run = secureMethod;
	}
}
GLAnimationFrame.prototype = {
	__class__: GLAnimationFrame
}
var Hash = function() {
	this.h = { };
};
$hxClasses["Hash"] = Hash;
Hash.__name__ = ["Hash"];
Hash.prototype = {
	h: null
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return a.iterator();
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b[s.b.length] = "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b[s.b.length] = i == null?"null":i;
			s.b[s.b.length] = " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b[s.b.length] = ", ";
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,__class__: Hash
}
var IntHash = function() {
	this.h = { };
};
$hxClasses["IntHash"] = IntHash;
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return a.iterator();
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b[s.b.length] = "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b[s.b.length] = i == null?"null":i;
			s.b[s.b.length] = " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b[s.b.length] = ", ";
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,__class__: IntHash
}
var IntIter = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIter"] = IntIter;
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIter
}
var Lambda = function() { }
$hxClasses["Lambda"] = Lambda;
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
Lambda.prototype = {
	__class__: Lambda
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
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
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b[s.b.length] = "{";
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = ", ";
			s.add(Std.string(l[0]));
			l = l[1];
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,join: function(sep) {
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
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,__class__: List
}
var Log = function() { }
$hxClasses["Log"] = Log;
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
	return Log.args.join(" ");
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
	if(($_=js.Lib.document,$_.createElement.$bind($_)) == null) return;
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
Log.prototype = {
	errorFilter: function() {
	}
	,__class__: Log
}
var LogLevel = function(value) {
	this.value = value;
};
$hxClasses["LogLevel"] = LogLevel;
LogLevel.__name__ = ["LogLevel"];
LogLevel.prototype = {
	value: null
	,isSmallerOrEqual: function(level) {
		return this.value <= level.value;
	}
	,__class__: LogLevel
}
var Main = function(canvas) {
	try {
		var context = bpmjs.ContextBuilder.buildAll([kumite.launch.Config,kumite.stage.Config,kumite.time.Config,kumite.presentation.PresentationConfig]);
	} catch( e ) {
		{
			Log.posInfo = { fileName : "Main.hx", lineNumber : 66, className : "Main", methodName : "new"};
			if(Log.filter(LogLevel.ERROR)) {
				Log.fetchInput("Error building application!\n" + e,null,null,null,null,null,null);
				console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
				Log.displayError(Log.createErrorMessage());
			}
		}
	}
};
$hxClasses["Main"] = Main;
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
	new Main(null);
}
Main.prototype = {
	__class__: Main
}
var Map = function() { }
$hxClasses["Map"] = Map;
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
Map.prototype = {
	__class__: Map
}
var Math2 = function() { }
$hxClasses["Math2"] = Math2;
Math2.__name__ = ["Math2"];
Math2.nextPowerOf2 = function(value) {
	var val = value | 0;
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
Math2.prototype = {
	__class__: Math2
}
var Matrix4 = function() {
	this.buffer = new Float32Array(Matrix4.IDENTITY_BUFFER);
};
$hxClasses["Matrix4"] = Matrix4;
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
Matrix4.prototype = {
	buffer: null
	,n11: null
	,n12: null
	,n13: null
	,n14: null
	,n21: null
	,n22: null
	,n23: null
	,n24: null
	,n31: null
	,n32: null
	,n33: null
	,n34: null
	,n41: null
	,n42: null
	,n43: null
	,n44: null
	,setIdentity: function() {
		this.buffer.set(Matrix4.IDENTITY_BUFFER);
		return this;
	}
	,set: function(n11,n12,n13,n14,n21,n22,n23,n24,n31,n32,n33,n34,n41,n42,n43,n44) {
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
	,setFrom: function(from) {
		this.buffer.set(from.buffer);
		return this;
	}
	,setTranslation: function(x,y,z) {
		this.set(1,0,0,x,0,1,0,y,0,0,1,z,0,0,0,1);
		return this;
	}
	,setScale: function(x,y,z) {
		this.set(x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1);
		return this;
	}
	,setRotationX: function(angle) {
		var c = Math.cos(angle), s = Math.sin(angle);
		this.set(1,0,0,0,0,c,-s,0,0,s,c,0,0,0,0,1);
		return this;
	}
	,setRotationY: function(angle) {
		var c = Math.cos(angle), s = Math.sin(angle);
		this.set(c,0,s,0,0,1,0,0,-s,0,c,0,0,0,0,1);
		return this;
	}
	,setRotationZ: function(angle) {
		var c = Math.cos(angle), s = Math.sin(angle);
		this.set(c,-s,0,0,s,c,0,0,0,0,1,0,0,0,0,1);
		return this;
	}
	,setRotation: function(angle,axis) {
		var c = Math.cos(angle), s = Math.sin(angle), t = 1 - c, x = axis.x, y = axis.y, z = axis.z, tx = t * x, ty = t * y;
		this.set(tx * x + c,tx * y - s * z,tx * z + s * y,0,tx * y + s * z,ty * y + c,ty * z - s * x,0,tx * z - s * y,ty * z + s * x,t * z * z + c,0,0,0,0,1);
		return this;
	}
	,setLookAt: function(eye,at,up) {
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
	,setOrtho: function(left,right,bottom,top,near,far) {
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
	,setPerspective: function(fovy,aspect,near,far) {
		var top = near * Math.tan(fovy * Math.PI / 360);
		var right = top * aspect;
		this.setFrustum(-right,right,-top,top,near,far);
	}
	,setFrustum: function(left,right,bottom,top,near,far) {
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
	,append: function(a) {
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
	,appendAffine: function(a) {
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
	,appendTranslation: function(x,y,z) {
		Matrix4.tempMatrix1.setTranslation(x,y,z);
		this.append(Matrix4.tempMatrix1);
	}
	,appendTranslationAffine: function(x,y,z) {
		Matrix4.tempMatrix1.setTranslation(x,y,z);
		this.appendAffine(Matrix4.tempMatrix1);
	}
	,appendScale: function(x,y,z) {
		Matrix4.tempMatrix1.setScale(x,y,z);
		this.append(Matrix4.tempMatrix1);
	}
	,appendRotation: function(angle,axis) {
		Matrix4.tempMatrix1.setRotation(angle,axis);
		this.append(Matrix4.tempMatrix1);
	}
	,appendRotationZ: function(angle) {
		Matrix4.tempMatrix1.setRotationZ(angle);
		this.append(Matrix4.tempMatrix1);
	}
	,appendScaleAffine: function(x,y,z) {
		Matrix4.tempMatrix1.setScale(x,y,z);
		this.appendAffine(Matrix4.tempMatrix1);
	}
	,appendRotationAffine: function(angle,axis) {
		Matrix4.tempMatrix1.setRotation(angle,axis);
		this.appendAffine(Matrix4.tempMatrix1);
	}
	,appendRotationZAffine: function(angle) {
		Matrix4.tempMatrix1.setRotationZ(angle);
		this.appendAffine(Matrix4.tempMatrix1);
	}
	,toString: function() {
		var result = "[Matrix4: ";
		result += " | " + this.buffer[0] + "," + this.buffer[4] + "," + this.buffer[8] + "," + this.buffer[12];
		result += " | " + this.buffer[1] + "," + this.buffer[5] + "," + this.buffer[9] + "," + this.buffer[13];
		result += " | " + this.buffer[2] + "," + this.buffer[6] + "," + this.buffer[10] + "," + this.buffer[14];
		result += " | " + this.buffer[3] + "," + this.buffer[7] + "," + this.buffer[11] + "," + this.buffer[15];
		result += " | ]";
		return result;
	}
	,get11: function() {
		return this.buffer[0];
	}
	,set11: function(v) {
		return this.buffer[0] = v;
	}
	,get12: function() {
		return this.buffer[4];
	}
	,set12: function(v) {
		return this.buffer[4] = v;
	}
	,get13: function() {
		return this.buffer[8];
	}
	,set13: function(v) {
		return this.buffer[8] = v;
	}
	,get14: function() {
		return this.buffer[12];
	}
	,set14: function(v) {
		return this.buffer[12] = v;
	}
	,get21: function() {
		return this.buffer[1];
	}
	,set21: function(v) {
		return this.buffer[1] = v;
	}
	,get22: function() {
		return this.buffer[5];
	}
	,set22: function(v) {
		return this.buffer[5] = v;
	}
	,get23: function() {
		return this.buffer[9];
	}
	,set23: function(v) {
		return this.buffer[9] = v;
	}
	,get24: function() {
		return this.buffer[13];
	}
	,set24: function(v) {
		return this.buffer[13] = v;
	}
	,get31: function() {
		return this.buffer[2];
	}
	,set31: function(v) {
		return this.buffer[2] = v;
	}
	,get32: function() {
		return this.buffer[6];
	}
	,set32: function(v) {
		return this.buffer[6] = v;
	}
	,get33: function() {
		return this.buffer[10];
	}
	,set33: function(v) {
		return this.buffer[10] = v;
	}
	,get34: function() {
		return this.buffer[14];
	}
	,set34: function(v) {
		return this.buffer[14] = v;
	}
	,get41: function() {
		return this.buffer[3];
	}
	,set41: function(v) {
		return this.buffer[3] = v;
	}
	,get42: function() {
		return this.buffer[7];
	}
	,set42: function(v) {
		return this.buffer[7] = v;
	}
	,get43: function() {
		return this.buffer[11];
	}
	,set43: function(v) {
		return this.buffer[11] = v;
	}
	,get44: function() {
		return this.buffer[15];
	}
	,set44: function(v) {
		return this.buffer[15] = v;
	}
	,__class__: Matrix4
	,__properties__: {set_n44:"set44",get_n44:"get44",set_n43:"set43",get_n43:"get43",set_n42:"set42",get_n42:"get42",set_n41:"set41",get_n41:"get41",set_n34:"set34",get_n34:"get34",set_n33:"set33",get_n33:"get33",set_n32:"set32",get_n32:"get32",set_n31:"set31",get_n31:"get31",set_n24:"set24",get_n24:"get24",set_n23:"set23",get_n23:"get23",set_n22:"set22",get_n22:"get22",set_n21:"set21",get_n21:"get21",set_n14:"set14",get_n14:"get14",set_n13:"set13",get_n13:"get13",set_n12:"set12",get_n12:"get12",set_n11:"set11",get_n11:"get11"}
}
var Motion = function(current,target,velocity) {
	if(velocity == null) velocity = 0;
	if(target == null) target = 0;
	if(current == null) current = 0;
	this.current = current;
	this.target = target;
	this.velocity = velocity;
	this.style = new MotionStyleLinear().setAcceleration(1);
};
$hxClasses["Motion"] = Motion;
Motion.__name__ = ["Motion"];
Motion.prototype = {
	current: null
	,target: null
	,velocity: null
	,finished: null
	,style: null
	,prevFinished: null
	,move: function(time) {
		var currentOriginal = this.current;
		var velocityOriginal = this.velocity;
		var l0 = Math.floor(time.timeScale);
		var l1 = Math.ceil(time.timeScale);
		var _g = 0;
		while(_g < l0) {
			var i = _g++;
			this.style.move(this,null);
		}
		var v0 = this.velocity;
		var c0 = this.current;
		this.style.move(this,null);
		var v1 = this.velocity;
		var c1 = this.current;
		var part = time.timeScale - l0;
		this.velocity = v0 + (v1 - v0) * part;
		this.current = c0 + (c1 - c0) * part;
		this.finished = this.prevFinished;
		this.prevFinished = this.current == this.target && this.velocity == 0;
	}
	,toString: function() {
		return "[Motion: c:" + this.current + " t:" + this.target + " v:" + this.velocity + " f:" + this.finished + "]";
	}
	,__class__: Motion
}
var MotionStyle = function() { }
$hxClasses["MotionStyle"] = MotionStyle;
MotionStyle.__name__ = ["MotionStyle"];
MotionStyle.prototype = {
	move: null
	,__class__: MotionStyle
}
var MotionStyleEaseInOut = function() {
	this.acceleration = 0.2;
	this.smoothing = 0.02;
};
$hxClasses["MotionStyleEaseInOut"] = MotionStyleEaseInOut;
MotionStyleEaseInOut.__name__ = ["MotionStyleEaseInOut"];
MotionStyleEaseInOut.__interfaces__ = [MotionStyle];
MotionStyleEaseInOut.prototype = {
	acceleration: null
	,smoothing: null
	,setAcceleration: function(acceleration) {
		this.acceleration = acceleration;
		return this;
	}
	,setSmoothing: function(smoothing) {
		this.smoothing = smoothing;
		return this;
	}
	,move: function(motion,time) {
		var diff = motion.target - motion.current;
		var newVelocity = diff * this.acceleration;
		motion.velocity += (newVelocity - motion.velocity) * this.smoothing;
		if(newVelocity > 0 && motion.velocity > newVelocity) motion.velocity = newVelocity;
		if(newVelocity < 0 && motion.velocity < newVelocity) motion.velocity = newVelocity;
		motion.current += motion.velocity;
	}
	,__class__: MotionStyleEaseInOut
}
var MotionStyleLinear = function() {
};
$hxClasses["MotionStyleLinear"] = MotionStyleLinear;
MotionStyleLinear.__name__ = ["MotionStyleLinear"];
MotionStyleLinear.__interfaces__ = [MotionStyle];
MotionStyleLinear.prototype = {
	acceleration: null
	,move: function(motion,time) {
		var diff = motion.target - motion.current;
		var tAcceleration = time.summand(this.acceleration);
		if(Math.abs(diff) < tAcceleration) {
			motion.velocity = 0;
			motion.current = motion.target;
		} else {
			motion.velocity = Math2.signum(diff) * tAcceleration;
			motion.current += motion.velocity;
		}
	}
	,setAcceleration: function(value) {
		this.acceleration = value;
		return this;
	}
	,__class__: MotionStyleLinear
}
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
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
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
Reflect.prototype = {
	__class__: Reflect
}
var Std = function() { }
$hxClasses["Std"] = Std;
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
Std.prototype = {
	__class__: Std
}
var StringBuf = function() {
	this.b = new Array();
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b[this.b.length] = x == null?"null":x;
	}
	,addSub: function(s,pos,len) {
		this.b[this.b.length] = s.substr(pos,len);
	}
	,addChar: function(c) {
		this.b[this.b.length] = String.fromCharCode(c);
	}
	,toString: function() {
		return this.b.join("");
	}
	,b: null
	,__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
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
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
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
StringTools.prototype = {
	__class__: StringTools
}
var Timeout = function() { }
$hxClasses["Timeout"] = Timeout;
Timeout.__name__ = ["Timeout"];
Timeout.execute = function(ms,method) {
	var timer = new haxe.Timer(ms);
	var run = function() {
		method();
		timer.stop();
	};
	timer.run = run;
}
Timeout.prototype = {
	__class__: Timeout
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
var Type = function() { }
$hxClasses["Type"] = Type;
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
	var cl = $hxClasses[name];
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || e.__ename__ == null) return null;
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
	a.remove("__class__");
	a.remove("__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__properties__");
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
Type.prototype = {
	__class__: Type
}
var Vec3 = function(x,y,z) {
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["Vec3"] = Vec3;
Vec3.__name__ = ["Vec3"];
Vec3.prototype = {
	x: null
	,y: null
	,z: null
	,scale: function(factor) {
		this.x *= factor;
		this.y *= factor;
		this.z *= factor;
	}
	,multiply: function(x,y,z) {
		this.x *= x;
		this.y *= y;
		this.z *= z;
	}
	,subtract: function(x,y,z) {
		this.x -= x;
		this.y -= y;
		this.z -= z;
		return this;
	}
	,normalize: function() {
		var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		this.x /= length;
		this.y /= length;
		this.z /= length;
		return this;
	}
	,getLength: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,cross: function(vec) {
		var x = this.y * vec.z - this.z * vec.y;
		var y = this.z * vec.x - this.x * vec.z;
		var z = this.x * vec.y - this.y * vec.x;
		return new Vec3(x,y,z);
	}
	,dot: function(vec) {
		return this.x * vec.x + this.y * vec.y + this.z * vec.z;
	}
	,equals: function(vec) {
		return this.x == vec.x && this.y == vec.y && this.z == vec.z;
	}
	,transform: function(matrix) {
		var x1 = this.x, y1 = this.y, z1 = this.z;
		this.x = matrix.buffer[0] * x1 + matrix.buffer[4] * y1 + matrix.buffer[8] * z1 + matrix.buffer[12];
		this.y = matrix.buffer[1] * x1 + matrix.buffer[5] * y1 + matrix.buffer[9] * z1 + matrix.buffer[13];
		this.z = matrix.buffer[2] * x1 + matrix.buffer[6] * y1 + matrix.buffer[10] * z1 + matrix.buffer[14];
	}
	,setFrom: function(value,vec3) {
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
	,clone: function() {
		return new Vec3(this.x,this.y,this.z);
	}
	,toString: function() {
		return "[Vec3 " + " x: " + this.x + " y: " + this.y + " z: " + this.z + "]";
	}
	,__class__: Vec3
}
var Xml = function() {
};
$hxClasses["Xml"] = Xml;
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
Xml.prototype = {
	nodeType: null
	,nodeName: null
	,nodeValue: null
	,parent: null
	,_nodeName: null
	,_nodeValue: null
	,_attributes: null
	,_children: null
	,_parent: null
	,getNodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,setNodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,getNodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,setNodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,getParent: function() {
		return this._parent;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,remove: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.remove(att);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.keys();
	}
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,elements: function() {
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
	,elementsNamed: function(name) {
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
	,firstChild: function() {
		if(this._children == null) throw "bad nodetype";
		return this._children[0];
	}
	,firstElement: function() {
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
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) x._parent._children.remove(x);
		x._parent = this;
		this._children.push(x);
	}
	,removeChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		var b = this._children.remove(x);
		if(b) x._parent = null;
		return b;
	}
	,insertChild: function(x,pos) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) x._parent._children.remove(x);
		x._parent = this;
		this._children.insert(pos,x);
	}
	,toString: function() {
		if(this.nodeType == Xml.PCData) return this._nodeValue;
		if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
		if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
		if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
		if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
		var s = new StringBuf();
		if(this.nodeType == Xml.Element) {
			s.b[s.b.length] = "<";
			s.add(this._nodeName);
			var $it0 = this._attributes.keys();
			while( $it0.hasNext() ) {
				var k = $it0.next();
				s.b[s.b.length] = " ";
				s.b[s.b.length] = k == null?"null":k;
				s.b[s.b.length] = "=\"";
				s.add(this._attributes.get(k));
				s.b[s.b.length] = "\"";
			}
			if(this._children.length == 0) {
				s.b[s.b.length] = "/>";
				return s.b.join("");
			}
			s.b[s.b.length] = ">";
		}
		var $it1 = this.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			s.add(x.toString());
		}
		if(this.nodeType == Xml.Element) {
			s.b[s.b.length] = "</";
			s.add(this._nodeName);
			s.b[s.b.length] = ">";
		}
		return s.b.join("");
	}
	,__class__: Xml
	,__properties__: {get_parent:"getParent",set_nodeValue:"setNodeValue",get_nodeValue:"getNodeValue",set_nodeName:"setNodeName",get_nodeName:"getNodeName"}
}
var bpmjs = {}
bpmjs.Context = function() {
	this.objects = new Array();
	this.observers = new Array();
};
$hxClasses["bpmjs.Context"] = bpmjs.Context;
bpmjs.Context.__name__ = ["bpmjs","Context"];
bpmjs.Context.prototype = {
	contextConfig: null
	,objects: null
	,observers: null
	,addObject: function(name,classInfo,object) {
		var contextObject = new bpmjs.ContextObject(name,classInfo,object);
		this.objects.push(contextObject);
		return contextObject;
	}
	,getObjectByName: function(name) {
		var _g = 0, _g1 = this.objects;
		while(_g < _g1.length) {
			var contextObject = _g1[_g];
			++_g;
			if(contextObject.name == name) return contextObject.object;
		}
		return null;
	}
	,getObjectByType: function(type) {
		var result = Lambda.filter(this.objects,this.getFilterByType(type));
		if(result.length == 1) return result.first().object; else if(result.length > 1) throw "Multiple objects of type: " + result.first().classInfo.name + " found"; else return null;
	}
	,getDynamicObjectsByType: function(type) {
		return Lambda.filter(this.objects,this.getFilterByType(type));
	}
	,addObserver: function(object,methodName,type) {
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
	,getFilterByType: function(type) {
		return function(contextObject) {
			return contextObject.type == type;
		};
	}
	,__class__: bpmjs.Context
}
bpmjs.ContextObject = function(name,classInfo,object) {
	this.name = name;
	this.classInfo = classInfo;
	this.type = classInfo.type;
	this.object = object;
};
$hxClasses["bpmjs.ContextObject"] = bpmjs.ContextObject;
bpmjs.ContextObject.__name__ = ["bpmjs","ContextObject"];
bpmjs.ContextObject.prototype = {
	name: null
	,type: null
	,object: null
	,classInfo: null
	,__class__: bpmjs.ContextObject
}
bpmjs.Observer = function() {
};
$hxClasses["bpmjs.Observer"] = bpmjs.Observer;
bpmjs.Observer.__name__ = ["bpmjs","Observer"];
bpmjs.Observer.prototype = {
	object: null
	,methodName: null
	,type: null
	,observe: function(objectToObserve) {
		if(Std["is"](objectToObserve.object,this.type.type)) Reflect.field(this.object.object,this.methodName).apply(this.object.object,[objectToObserve.object]);
	}
	,__class__: bpmjs.Observer
}
bpmjs.ContextBuilder = function() {
	this.context = new bpmjs.Context();
};
$hxClasses["bpmjs.ContextBuilder"] = bpmjs.ContextBuilder;
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
bpmjs.ContextBuilder.prototype = {
	context: null
	,contextConfig: null
	,configureInternal: function(object) {
		var contextObject = this.context.addObject("configured",reflect.ClassInfo.forInstance(object),object);
		this.configureDynamicObjects([contextObject]);
	}
	,buildInternal: function(configClasses) {
		this.context.contextConfig = this.contextConfig;
		Lambda.iter(configClasses,this.createObjects.$bind(this));
		this.configureDynamicObjects(this.context.objects);
	}
	,createObjects: function(configClass) {
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
	,configureDynamicObjects: function(objects) {
		Lambda.iter(objects,this.wireContextObject.$bind(this));
		Lambda.iter(objects,this.findObservers.$bind(this));
		Lambda.iter(objects,this.registerMessengerByObjectType.$bind(this));
		Lambda.iter(objects,this.registerMessengers.$bind(this));
		Lambda.iter(objects,this.registerReceivers.$bind(this));
		Lambda.iter(objects,this.doObserve.$bind(this));
		Lambda.iter(objects,this.doCompleteCall.$bind(this));
		Lambda.iter(objects,this.doPostCompleteCall.$bind(this));
	}
	,wireContextObject: function(contextObject) {
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
	,findObservers: function(contextObject) {
		var _g = 0, _g1 = contextObject.classInfo.getMethods();
		while(_g < _g1.length) {
			var method = _g1[_g];
			++_g;
			if(method.hasMetadata("Observe")) {
				if(method.getParameters().length == 1) this.context.addObserver(contextObject,method.field.name,reflect.ClassInfo.forCType(method.getParameters()[0].def.t)); else throw "Method to observe: " + contextObject.classInfo.name + "." + method.field.name + " needs exactly one parameter";
			}
		}
	}
	,registerMessengerByObjectType: function(contextObject) {
		if(Std["is"](contextObject.object,bpmjs.Messenger)) this.contextConfig.frontMessenger.addMessenger(contextObject.object);
	}
	,registerMessengers: function(contextObject) {
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
	,registerReceivers: function(contextObject) {
		var _g = 0, _g1 = contextObject.classInfo.getMethods();
		while(_g < _g1.length) {
			var method = _g1[_g];
			++_g;
			if(method.hasMetadata("Message")) {
				if(method.getParameters().length == 1) this.contextConfig.frontMessenger.addReceiver(contextObject.object,method.field.name,reflect.ClassInfo.forCType(method.getParameters()[0].def.t).type); else throw "Message: " + contextObject.classInfo.name + "." + method.field.name + " needs exactly one parameter";
			}
		}
	}
	,doObserve: function(contextObject) {
		var _g = 0, _g1 = this.context.observers;
		while(_g < _g1.length) {
			var observer = _g1[_g];
			++_g;
			observer.observe(contextObject);
		}
	}
	,doCompleteCall: function(contextObject) {
		bpmjs.ReflectUtil.callMethodWithMetadata(contextObject.object,contextObject.type,"Complete",[]);
	}
	,doPostCompleteCall: function(contextObject) {
		bpmjs.ReflectUtil.callMethodWithMetadata(contextObject.object,contextObject.type,"PostComplete",[]);
	}
	,createError: function(message) {
		return "ContextBuilder ERROR: " + message;
	}
	,__class__: bpmjs.ContextBuilder
}
bpmjs.ContextConfig = function() {
};
$hxClasses["bpmjs.ContextConfig"] = bpmjs.ContextConfig;
bpmjs.ContextConfig.__name__ = ["bpmjs","ContextConfig"];
bpmjs.ContextConfig.prototype = {
	frontMessenger: null
	,__class__: bpmjs.ContextConfig
}
bpmjs.FrontMessenger = function() { }
$hxClasses["bpmjs.FrontMessenger"] = bpmjs.FrontMessenger;
bpmjs.FrontMessenger.__name__ = ["bpmjs","FrontMessenger"];
bpmjs.FrontMessenger.prototype = {
	addMessenger: null
	,addReceiver: null
	,__class__: bpmjs.FrontMessenger
}
bpmjs.DefaultFrontMessenger = function() {
	this.receivers = new Array();
};
$hxClasses["bpmjs.DefaultFrontMessenger"] = bpmjs.DefaultFrontMessenger;
bpmjs.DefaultFrontMessenger.__name__ = ["bpmjs","DefaultFrontMessenger"];
bpmjs.DefaultFrontMessenger.__interfaces__ = [bpmjs.FrontMessenger];
bpmjs.DefaultFrontMessenger.prototype = {
	receivers: null
	,addMessenger: function(messenger) {
		{
			Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 21, className : "bpmjs.DefaultFrontMessenger", methodName : "addMessenger"};
			if(Log.filter(LogLevel.INFO)) {
				Log.fetchInput(Type.getClassName(Type.getClass(messenger)),null,null,null,null,null,null);
				console.info(Log.createMessage());
			}
		}
		messenger.addReceiver(null,this.handleMessage.$bind(this));
	}
	,addReceiver: function(receivingObject,methodName,type) {
		{
			Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 27, className : "bpmjs.DefaultFrontMessenger", methodName : "addReceiver"};
			if(Log.filter(LogLevel.INFO)) {
				Log.fetchInput(Type.getClassName(Type.getClass(receivingObject)) + "#" + methodName,Type.getClassName(type),null,null,null,null,null);
				console.info(Log.createMessage());
			}
		}
		this.receivers.push(new bpmjs._FrontMessenger.Receiver(receivingObject,methodName,type));
	}
	,handleMessage: function(message) {
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
	,__class__: bpmjs.DefaultFrontMessenger
}
bpmjs._FrontMessenger = {}
bpmjs._FrontMessenger.Receiver = function(receiver,methodName,type) {
	this.receiver = receiver;
	this.type = type;
	this.method = Reflect.field(receiver,methodName);
	this.methodName = methodName;
};
$hxClasses["bpmjs._FrontMessenger.Receiver"] = bpmjs._FrontMessenger.Receiver;
bpmjs._FrontMessenger.Receiver.__name__ = ["bpmjs","_FrontMessenger","Receiver"];
bpmjs._FrontMessenger.Receiver.prototype = {
	receiver: null
	,method: null
	,methodName: null
	,type: null
	,matches: function(message) {
		return Type.getClass(message) == this.type;
	}
	,execute: function(message) {
		{
			Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 66, className : "bpmjs._FrontMessenger.Receiver", methodName : "execute"};
			if(Log.filter(LogLevel.INFO)) {
				Log.fetchInput(Type.getClassName(Type.getClass(this.receiver)) + "#" + this.methodName,null,null,null,null,null,null);
				console.info(Log.createMessage());
			}
		}
		this.method.apply(this.receiver,[message]);
	}
	,__class__: bpmjs._FrontMessenger.Receiver
}
bpmjs.Task = function() {
	this.startSignaler = new hsl.haxe.DirectSignaler(this);
	this.completeSignaler = new hsl.haxe.DirectSignaler(this);
	this.errorSignaler = new hsl.haxe.DirectSignaler(this);
	this.setMonitor(new bpmjs.ProgressMonitor());
};
$hxClasses["bpmjs.Task"] = bpmjs.Task;
bpmjs.Task.__name__ = ["bpmjs","Task"];
bpmjs.Task.prototype = {
	startSignaler: null
	,completeSignaler: null
	,errorSignaler: null
	,monitor: null
	,isComplete: null
	,start: function() {
		try {
			var t = this;
			this.startSignaler.dispatch(t,null,{ fileName : "Task.hx", lineNumber : 31, className : "bpmjs.Task", methodName : "start"});
			this.doStart();
		} catch( e ) {
			{
				Log.posInfo = { fileName : "Task.hx", lineNumber : 36, className : "bpmjs.Task", methodName : "start"};
				if(Log.filter(LogLevel.ERROR)) {
					Log.fetchInput("Error starting Task: ",e,null,null,null,null,null);
					console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
					Log.displayError(Log.createErrorMessage());
				}
			}
		}
	}
	,doStart: function() {
	}
	,complete: function() {
		this.isComplete = true;
		this.getMonitor().setCurrent(1);
		var t = this;
		this.completeSignaler.dispatch(t,null,{ fileName : "Task.hx", lineNumber : 49, className : "bpmjs.Task", methodName : "complete"});
	}
	,error: function(result,error) {
		var taskError = new bpmjs.TaskError();
		taskError.task = result;
		taskError.error = error;
		this.errorSignaler.dispatch(taskError,null,{ fileName : "Task.hx", lineNumber : 57, className : "bpmjs.Task", methodName : "error"});
	}
	,getMonitor: function() {
		return this.monitor;
	}
	,setMonitor: function(monitor) {
		this.monitor = monitor;
		return monitor;
	}
	,__class__: bpmjs.Task
	,__properties__: {set_monitor:"setMonitor",get_monitor:"getMonitor"}
}
bpmjs.ImageLoaderTask = function(location) {
	bpmjs.Task.call(this);
	this.location = location;
	this.getMonitor().name = location;
};
$hxClasses["bpmjs.ImageLoaderTask"] = bpmjs.ImageLoaderTask;
bpmjs.ImageLoaderTask.__name__ = ["bpmjs","ImageLoaderTask"];
bpmjs.ImageLoaderTask.__super__ = bpmjs.Task;
bpmjs.ImageLoaderTask.prototype = $extend(bpmjs.Task.prototype,{
	location: null
	,image: null
	,timer: null
	,doStart: function() {
		this.getMonitor().name = this.location;
		this.image = new Image();
		this.image.onload = this.handleImageLoaded.$bind(this);
		this.image.src = this.location;
	}
	,handleImageLoaded: function() {
		this.complete();
	}
	,doComplete: function() {
		this.timer.stop();
		this.complete();
	}
	,__class__: bpmjs.ImageLoaderTask
});
bpmjs.Messenger = function() {
	this.receivers = new Array();
};
$hxClasses["bpmjs.Messenger"] = bpmjs.Messenger;
bpmjs.Messenger.__name__ = ["bpmjs","Messenger"];
bpmjs.Messenger.prototype = {
	receivers: null
	,addReceiver: function(type,listener) {
		this.removeReceiver(type,listener);
		this.receivers.push(new bpmjs._Messenger.ReceiverForType(type,listener));
	}
	,removeReceiver: function(type,listener) {
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
	,send: function(message) {
		var _g = 0, _g1 = this.receivers;
		while(_g < _g1.length) {
			var receiver = _g1[_g];
			++_g;
			if(receiver.type == null || receiver.type == Type.getClass(message)) receiver.method(message);
		}
	}
	,toString: function() {
		return Type.getClassName(Type.getClass(this));
	}
	,__class__: bpmjs.Messenger
}
bpmjs._Messenger = {}
bpmjs._Messenger.ReceiverForType = function(type,method) {
	this.type = type;
	this.method = method;
};
$hxClasses["bpmjs._Messenger.ReceiverForType"] = bpmjs._Messenger.ReceiverForType;
bpmjs._Messenger.ReceiverForType.__name__ = ["bpmjs","_Messenger","ReceiverForType"];
bpmjs._Messenger.ReceiverForType.prototype = {
	type: null
	,method: null
	,__class__: bpmjs._Messenger.ReceiverForType
}
bpmjs.ProgressMonitor = function() {
	this.name = "";
	this.reset();
};
$hxClasses["bpmjs.ProgressMonitor"] = bpmjs.ProgressMonitor;
bpmjs.ProgressMonitor.__name__ = ["bpmjs","ProgressMonitor"];
bpmjs.ProgressMonitor.prototype = {
	name: null
	,weight: null
	,current: null
	,children: null
	,reset: function() {
		this.children = new Array();
		this.setCurrent(0);
		this.weight = 1;
	}
	,append: function(monitor,total) {
		var monitorAndTotal = new bpmjs._ProgressMonitor.MonitorAndTotal();
		monitorAndTotal.total = total;
		monitorAndTotal.monitor = monitor;
		this.children.push(monitorAndTotal);
		return monitor;
	}
	,done: function() {
		this.setCurrent(1);
	}
	,getCurrent: function() {
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
	,setCurrent: function(value) {
		this.current = value;
		return value;
	}
	,__class__: bpmjs.ProgressMonitor
	,__properties__: {set_current:"setCurrent",get_current:"getCurrent"}
}
bpmjs._ProgressMonitor = {}
bpmjs._ProgressMonitor.MonitorAndTotal = function() {
};
$hxClasses["bpmjs._ProgressMonitor.MonitorAndTotal"] = bpmjs._ProgressMonitor.MonitorAndTotal;
bpmjs._ProgressMonitor.MonitorAndTotal.__name__ = ["bpmjs","_ProgressMonitor","MonitorAndTotal"];
bpmjs._ProgressMonitor.MonitorAndTotal.prototype = {
	total: null
	,monitor: null
	,__class__: bpmjs._ProgressMonitor.MonitorAndTotal
}
bpmjs.ReflectUtil = function() { }
$hxClasses["bpmjs.ReflectUtil"] = bpmjs.ReflectUtil;
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
bpmjs.ReflectUtil.prototype = {
	__class__: bpmjs.ReflectUtil
}
bpmjs.Sequencer = function() {
};
$hxClasses["bpmjs.Sequencer"] = bpmjs.Sequencer;
bpmjs.Sequencer.__name__ = ["bpmjs","Sequencer"];
bpmjs.Sequencer.__interfaces__ = [haxe.rtti.Infos];
bpmjs.Sequencer.prototype = {
	context: null
	,start: function(name) {
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
	,__class__: bpmjs.Sequencer
}
bpmjs.TaskGroup = function() {
	bpmjs.Task.call(this);
	this.pendingTasks = new haxe.FastList();
	this.parallelTasksMax = 1;
	this.autoStart = false;
	this.tasks = new Array();
};
$hxClasses["bpmjs.TaskGroup"] = bpmjs.TaskGroup;
bpmjs.TaskGroup.__name__ = ["bpmjs","TaskGroup"];
bpmjs.TaskGroup.__super__ = bpmjs.Task;
bpmjs.TaskGroup.prototype = $extend(bpmjs.Task.prototype,{
	tasks: null
	,autoStart: null
	,parallelTasksMax: null
	,pendingTasks: null
	,add: function(task) {
		this.tasks.push(task);
		if(this.autoStart) this.nextTask();
	}
	,doStart: function() {
		var _g = 0, _g1 = this.tasks;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			this.getMonitor().append(task.getMonitor(),1 / this.tasks.length);
		}
		this.nextTask();
	}
	,recomputeMonitor: function() {
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
	,getTotalTaskCount: function() {
		return Lambda.count(this.pendingTasks) + Lambda.count(this.tasks);
	}
	,nextTask: function() {
		var pendingTaskCount = Lambda.count(this.pendingTasks);
		if(pendingTaskCount >= this.parallelTasksMax) return;
		if(this.tasks.length > 0) {
			var pendingTask = this.tasks.shift();
			this.pendingTasks.add(pendingTask);
			pendingTask.completeSignaler.bind(this.handleTaskComplete.$bind(this));
			pendingTask.errorSignaler.bind(this.handleTaskError.$bind(this));
			pendingTask.start();
		} else if(!this.autoStart) this.complete();
	}
	,handleTaskComplete: function(task) {
		this.pendingTasks.remove(task);
		this.nextTask();
	}
	,handleTaskError: function(taskError) {
		this.pendingTasks.remove(taskError.task);
		if(!this.autoStart) this.error(this,taskError.error); else {
			Log.posInfo = { fileName : "TaskGroup.hx", lineNumber : 99, className : "bpmjs.TaskGroup", methodName : "handleTaskError"};
			if(Log.filter(LogLevel.WARN)) {
				Log.fetchInput(taskError.error,null,null,null,null,null,null);
				console.warn(Log.createMessage());
			}
		}
	}
	,__class__: bpmjs.TaskGroup
});
bpmjs.Sequence = function(name) {
	bpmjs.TaskGroup.call(this);
	this.getMonitor().name = name;
	this.name = name;
	this.timer = new haxe.Timer(100);
	this.completeSignaler.bind(this.handleComplete.$bind(this));
	this.errorSignaler.bind(this.handleError.$bind(this));
};
$hxClasses["bpmjs.Sequence"] = bpmjs.Sequence;
bpmjs.Sequence.__name__ = ["bpmjs","Sequence"];
bpmjs.Sequence.__super__ = bpmjs.TaskGroup;
bpmjs.Sequence.prototype = $extend(bpmjs.TaskGroup.prototype,{
	name: null
	,objects: null
	,loadingTaskGroup: null
	,timer: null
	,addExecuteTask: function(phase) {
		this.add(new bpmjs.ExecutePhaseTask(this,phase));
	}
	,addLoadingTask: function() {
		this.loadingTaskGroup = new bpmjs.LoadingTaskGroup(this);
		this.loadingTaskGroup.getMonitor().weight = 1000;
		this.add(this.loadingTaskGroup);
	}
	,start: function() {
		this.timer.run = this.handleProgress.$bind(this);
		bpmjs.TaskGroup.prototype.start.call(this);
	}
	,execute: function(phase) {
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
							throw "Phase '" + localPhase + "' " + Type.getClassName(contextObject.type) + "#" + fieldName + " created an error:\n" + Std.string(e);
						}
					}
				}
			}
		}
	}
	,handleProgress: function() {
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
	,handleComplete: function(task) {
		this.handleProgress();
		this.timer.stop();
	}
	,handleError: function(error) {
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
	,__class__: bpmjs.Sequence
});
bpmjs.ExecutePhaseTask = function(sequence,phase) {
	bpmjs.Task.call(this);
	this.getMonitor().name = "execute: " + phase;
	this.sequence = sequence;
	this.phase = phase;
};
$hxClasses["bpmjs.ExecutePhaseTask"] = bpmjs.ExecutePhaseTask;
bpmjs.ExecutePhaseTask.__name__ = ["bpmjs","ExecutePhaseTask"];
bpmjs.ExecutePhaseTask.__super__ = bpmjs.Task;
bpmjs.ExecutePhaseTask.prototype = $extend(bpmjs.Task.prototype,{
	sequence: null
	,phase: null
	,doStart: function() {
		try {
			this.sequence.execute(this.phase);
		} catch( e ) {
			this.error(this,Std.string(e));
			return;
		}
		this.complete();
	}
	,__class__: bpmjs.ExecutePhaseTask
});
bpmjs.LoadingTaskGroup = function(sequence) {
	bpmjs.TaskGroup.call(this);
	this.getMonitor().name = "loading";
};
$hxClasses["bpmjs.LoadingTaskGroup"] = bpmjs.LoadingTaskGroup;
bpmjs.LoadingTaskGroup.__name__ = ["bpmjs","LoadingTaskGroup"];
bpmjs.LoadingTaskGroup.__super__ = bpmjs.TaskGroup;
bpmjs.LoadingTaskGroup.prototype = $extend(bpmjs.TaskGroup.prototype,{
	__class__: bpmjs.LoadingTaskGroup
});
bpmjs.TaskError = function() {
};
$hxClasses["bpmjs.TaskError"] = bpmjs.TaskError;
bpmjs.TaskError.__name__ = ["bpmjs","TaskError"];
bpmjs.TaskError.prototype = {
	task: null
	,error: null
	,__class__: bpmjs.TaskError
}
haxe.FastCell = function(elt,next) {
	this.elt = elt;
	this.next = next;
};
$hxClasses["haxe.FastCell"] = haxe.FastCell;
haxe.FastCell.__name__ = ["haxe","FastCell"];
haxe.FastCell.prototype = {
	elt: null
	,next: null
	,__class__: haxe.FastCell
}
haxe.FastList = function() {
};
$hxClasses["haxe.FastList"] = haxe.FastList;
haxe.FastList.__name__ = ["haxe","FastList"];
haxe.FastList.prototype = {
	head: null
	,add: function(item) {
		this.head = new haxe.FastCell(item,this.head);
	}
	,first: function() {
		return this.head == null?null:this.head.elt;
	}
	,pop: function() {
		var k = this.head;
		if(k == null) return null; else {
			this.head = k.next;
			return k.elt;
		}
	}
	,isEmpty: function() {
		return this.head == null;
	}
	,remove: function(v) {
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
	,iterator: function() {
		var l = this.head;
		return { hasNext : function() {
			return l != null;
		}, next : function() {
			var k = l;
			l = k.next;
			return k.elt;
		}};
	}
	,toString: function() {
		var a = new Array();
		var l = this.head;
		while(l != null) {
			a.push(l.elt);
			l = l.next;
		}
		return "{" + a.join(",") + "}";
	}
	,__class__: haxe.FastList
}
haxe.Log = function() { }
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype = {
	__class__: haxe.Log
}
haxe.Serializer = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new Hash();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe.Serializer;
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
}
haxe.Serializer.prototype = {
	buf: null
	,cache: null
	,shash: null
	,scount: null
	,useCache: null
	,useEnumIndex: null
	,toString: function() {
		return this.buf.b.join("");
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.add("R");
			this.buf.add(x);
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.add("y");
		s = StringTools.urlEncode(s);
		this.buf.add(s.length);
		this.buf.add(":");
		this.buf.add(s);
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.add("r");
				this.buf.add(i);
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.add("g");
	}
	,serialize: function(v) {
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 0:
			this.buf.add("n");
			break;
		case 1:
			if(v == 0) {
				this.buf.add("z");
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
				return;
			}
			if(this.useCache && this.serializeRef(v)) return;
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
			if(this.useCache && this.serializeRef(v)) return;
			this.buf.add("o");
			this.serializeFields(v);
			break;
		case 7:
			var e = $e[2];
			if(this.useCache && this.serializeRef(v)) return;
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
	}
	,serializeException: function(e) {
		this.buf.add("x");
		this.serialize(e);
	}
	,__class__: haxe.Serializer
}
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.Stack = function() { }
$hxClasses["haxe.Stack"] = haxe.Stack;
haxe.Stack.__name__ = ["haxe","Stack"];
haxe.Stack.callStack = function() {
	return [];
}
haxe.Stack.exceptionStack = function() {
	return [];
}
haxe.Stack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b[b.b.length] = "\nCalled from ";
		haxe.Stack.itemToString(b,s);
	}
	return b.b.join("");
}
haxe.Stack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b[b.b.length] = "a C function";
		break;
	case 1:
		var m = $e[2];
		b.b[b.b.length] = "module ";
		b.b[b.b.length] = m == null?"null":m;
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b[b.b.length] = " (";
		}
		b.b[b.b.length] = file == null?"null":file;
		b.b[b.b.length] = " line ";
		b.b[b.b.length] = line == null?"null":line;
		if(s1 != null) b.b[b.b.length] = ")";
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b[b.b.length] = cname == null?"null":cname;
		b.b[b.b.length] = ".";
		b.b[b.b.length] = meth == null?"null":meth;
		break;
	case 4:
		var n = $e[2];
		b.b[b.b.length] = "local function #";
		b.b[b.b.length] = n == null?"null":n;
		break;
	}
}
haxe.Stack.makeStack = function(s) {
	return null;
}
haxe.Stack.prototype = {
	__class__: haxe.Stack
}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = window.setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
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
haxe.Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) return;
		window.clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
}
haxe.TypeTools = function() { }
$hxClasses["haxe.TypeTools"] = haxe.TypeTools;
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
haxe.TypeTools.prototype = {
	__class__: haxe.TypeTools
}
haxe.Unserializer = function(buf) {
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
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.cca(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	buf: null
	,pos: null
	,length: null
	,cache: null
	,scache: null
	,resolver: null
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,getResolver: function() {
		return this.resolver;
	}
	,get: function(p) {
		return this.buf.cca(p);
	}
	,readDigits: function() {
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
		return k;
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.cca(this.pos) == 103) break;
			var k = this.unserialize();
			if(!Std["is"](k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.cca(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		switch(this.buf.cca(this.pos++)) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.cca(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(this.buf.substr(p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = this.buf.substr(this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
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
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
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
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.cca(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
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
			return h;
		case 118:
			var d = Date.fromString(this.buf.substr(this.pos,19));
			this.cache.push(d);
			this.pos += 19;
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
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.cca(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,__class__: haxe.Unserializer
}
haxe.exception = {}
haxe.exception.Exception = function(message,innerException,numberOfStackTraceShifts) {
	this.message = null == message?"Unknown exception":message;
	this.innerException = innerException;
	this.generateStackTrace(numberOfStackTraceShifts);
	this.stackTrace = this.stackTraceArray;
};
$hxClasses["haxe.exception.Exception"] = haxe.exception.Exception;
haxe.exception.Exception.__name__ = ["haxe","exception","Exception"];
haxe.exception.Exception.prototype = {
	baseException: null
	,innerException: null
	,message: null
	,stackTrace: null
	,stackTraceArray: null
	,generateStackTrace: function(numberOfStackTraceShifts) {
		this.stackTraceArray = haxe.Stack.callStack().slice(numberOfStackTraceShifts + 1);
		var exceptionClass = Type.getClass(this);
		while(haxe.exception.Exception != exceptionClass) {
			this.stackTraceArray.shift();
			exceptionClass = Type.getSuperClass(exceptionClass);
		}
	}
	,getBaseException: function() {
		var result = this;
		while(null != result.innerException) result = result.innerException;
		return result;
	}
	,toString: function() {
		return this.message + haxe.Stack.toString(this.stackTraceArray);
	}
	,__class__: haxe.exception.Exception
	,__properties__: {get_baseException:"getBaseException"}
}
haxe.exception.ArgumentNullException = function(argumentName,numberOfStackTraceShifts) {
	haxe.exception.Exception.call(this,"Argument " + argumentName + " must be non-null",null,numberOfStackTraceShifts);
};
$hxClasses["haxe.exception.ArgumentNullException"] = haxe.exception.ArgumentNullException;
haxe.exception.ArgumentNullException.__name__ = ["haxe","exception","ArgumentNullException"];
haxe.exception.ArgumentNullException.__super__ = haxe.exception.Exception;
haxe.exception.ArgumentNullException.prototype = $extend(haxe.exception.Exception.prototype,{
	__class__: haxe.exception.ArgumentNullException
});
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
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
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype = {
	length: null
	,b: null
	,get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		if(b1 == b2 && pos > srcpos) {
			var i = len;
			while(i > 0) {
				i--;
				b1[i + pos] = b2[i + srcpos];
			}
			return;
		}
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var len = this.length < other.length?this.length:other.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
		return this.length - other.length;
	}
	,readString: function(pos,len) {
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
		return s;
	}
	,toString: function() {
		return this.readString(0,this.length);
	}
	,toHex: function() {
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
		return s.b.join("");
	}
	,getData: function() {
		return this.b;
	}
	,__class__: haxe.io.Bytes
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
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
haxe.rtti.CType = $hxClasses["haxe.rtti.CType"] = { __ename__ : ["haxe","rtti","CType"], __constructs__ : ["CUnknown","CEnum","CClass","CTypedef","CFunction","CAnonymous","CDynamic"] }
haxe.rtti.CType.CUnknown = ["CUnknown",0];
haxe.rtti.CType.CUnknown.toString = $estr;
haxe.rtti.CType.CUnknown.__enum__ = haxe.rtti.CType;
haxe.rtti.CType.CEnum = function(name,params) { var $x = ["CEnum",1,name,params]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CClass = function(name,params) { var $x = ["CClass",2,name,params]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CTypedef = function(name,params) { var $x = ["CTypedef",3,name,params]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CFunction = function(args,ret) { var $x = ["CFunction",4,args,ret]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CAnonymous = function(fields) { var $x = ["CAnonymous",5,fields]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CDynamic = function(t) { var $x = ["CDynamic",6,t]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.Rights = $hxClasses["haxe.rtti.Rights"] = { __ename__ : ["haxe","rtti","Rights"], __constructs__ : ["RNormal","RNo","RCall","RMethod","RDynamic","RInline"] }
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
haxe.rtti.TypeTree = $hxClasses["haxe.rtti.TypeTree"] = { __ename__ : ["haxe","rtti","TypeTree"], __constructs__ : ["TPackage","TClassdecl","TEnumdecl","TTypedecl"] }
haxe.rtti.TypeTree.TPackage = function(name,full,subs) { var $x = ["TPackage",0,name,full,subs]; $x.__enum__ = haxe.rtti.TypeTree; $x.toString = $estr; return $x; }
haxe.rtti.TypeTree.TClassdecl = function(c) { var $x = ["TClassdecl",1,c]; $x.__enum__ = haxe.rtti.TypeTree; $x.toString = $estr; return $x; }
haxe.rtti.TypeTree.TEnumdecl = function(e) { var $x = ["TEnumdecl",2,e]; $x.__enum__ = haxe.rtti.TypeTree; $x.toString = $estr; return $x; }
haxe.rtti.TypeTree.TTypedecl = function(t) { var $x = ["TTypedecl",3,t]; $x.__enum__ = haxe.rtti.TypeTree; $x.toString = $estr; return $x; }
haxe.rtti.TypeApi = function() { }
$hxClasses["haxe.rtti.TypeApi"] = haxe.rtti.TypeApi;
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
haxe.rtti.TypeApi.prototype = {
	__class__: haxe.rtti.TypeApi
}
haxe.rtti.Meta = function() { }
$hxClasses["haxe.rtti.Meta"] = haxe.rtti.Meta;
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
haxe.rtti.Meta.prototype = {
	__class__: haxe.rtti.Meta
}
haxe.rtti.XmlParser = function() {
	this.root = new Array();
};
$hxClasses["haxe.rtti.XmlParser"] = haxe.rtti.XmlParser;
haxe.rtti.XmlParser.__name__ = ["haxe","rtti","XmlParser"];
haxe.rtti.XmlParser.prototype = {
	root: null
	,curplatform: null
	,sort: function(l) {
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
	,sortFields: function(fl) {
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
	,process: function(x,platform) {
		this.curplatform = platform;
		this.xroot(new haxe.xml.Fast(x));
	}
	,mergeRights: function(f1,f2) {
		if(f1.get == haxe.rtti.Rights.RInline && f1.set == haxe.rtti.Rights.RNo && f2.get == haxe.rtti.Rights.RNormal && f2.set == haxe.rtti.Rights.RMethod) {
			f1.get = haxe.rtti.Rights.RNormal;
			f1.set = haxe.rtti.Rights.RMethod;
			return true;
		}
		return false;
	}
	,mergeFields: function(f,f2) {
		return haxe.rtti.TypeApi.fieldEq(f,f2) || f.name == f2.name && (this.mergeRights(f,f2) || this.mergeRights(f2,f)) && haxe.rtti.TypeApi.fieldEq(f,f2);
	}
	,mergeClasses: function(c,c2) {
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
	,mergeEnums: function(e,e2) {
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
	,mergeTypedefs: function(t,t2) {
		if(this.curplatform == null) return false;
		t.platforms.add(this.curplatform);
		t.types.set(this.curplatform,t2.type);
		return true;
	}
	,merge: function(t) {
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
				if(tinf.doc == null != (inf.doc == null)) {
					if(inf.doc == null) inf.doc = tinf.doc; else tinf.doc = inf.doc;
				}
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
	,mkPath: function(p) {
		return p;
	}
	,mkTypeParams: function(p) {
		var pl = p.split(":");
		if(pl[0] == "") return new Array();
		return pl;
	}
	,mkRights: function(r) {
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
	,xerror: function(c) {
		return (function($this) {
			var $r;
			throw "Invalid " + c.getName();
			return $r;
		}(this));
	}
	,xroot: function(x) {
		var $it0 = x.x.elements();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			this.merge(this.processElement(c));
		}
	}
	,processElement: function(x) {
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
	,xpath: function(x) {
		var path = this.mkPath(x.att.resolve("path"));
		var params = new List();
		var $it0 = x.getElements();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			params.add(this.xtype(c));
		}
		return { path : path, params : params};
	}
	,xclass: function(x) {
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
	,xclassfield: function(x) {
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
	,xenum: function(x) {
		var cl = new List();
		var doc = null;
		var $it0 = x.getElements();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			if(c.getName() == "haxe_doc") doc = c.getInnerData(); else cl.add(this.xenumfield(c));
		}
		return { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), params : this.mkTypeParams(x.att.resolve("params")), constructors : cl, platforms : this.defplat()};
	}
	,xenumfield: function(x) {
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
	,xtypedef: function(x) {
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
	,xtype: function(x) {
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
	,xtypeparams: function(x) {
		var p = new List();
		var $it0 = x.getElements();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			p.add(this.xtype(c));
		}
		return p;
	}
	,defplat: function() {
		var l = new List();
		if(this.curplatform != null) l.add(this.curplatform);
		return l;
	}
	,__class__: haxe.rtti.XmlParser
}
haxe.xml = {}
haxe.xml._Fast = {}
haxe.xml._Fast.NodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeAccess"] = haxe.xml._Fast.NodeAccess;
haxe.xml._Fast.NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe.xml._Fast.NodeAccess.prototype = {
	__x: null
	,resolve: function(name) {
		var x = this.__x.elementsNamed(name).next();
		if(x == null) {
			var xname = this.__x.nodeType == Xml.Document?"Document":this.__x.getNodeName();
			throw xname + " is missing element " + name;
		}
		return new haxe.xml.Fast(x);
	}
	,__class__: haxe.xml._Fast.NodeAccess
}
haxe.xml._Fast.AttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.AttribAccess"] = haxe.xml._Fast.AttribAccess;
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype = {
	__x: null
	,resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
		var v = this.__x.get(name);
		if(v == null) throw this.__x.getNodeName() + " is missing attribute " + name;
		return v;
	}
	,__class__: haxe.xml._Fast.AttribAccess
}
haxe.xml._Fast.HasAttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasAttribAccess"] = haxe.xml._Fast.HasAttribAccess;
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype = {
	__x: null
	,resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
		return this.__x.exists(name);
	}
	,__class__: haxe.xml._Fast.HasAttribAccess
}
haxe.xml._Fast.HasNodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasNodeAccess"] = haxe.xml._Fast.HasNodeAccess;
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype = {
	__x: null
	,resolve: function(name) {
		return this.__x.elementsNamed(name).hasNext();
	}
	,__class__: haxe.xml._Fast.HasNodeAccess
}
haxe.xml._Fast.NodeListAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeListAccess"] = haxe.xml._Fast.NodeListAccess;
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype = {
	__x: null
	,resolve: function(name) {
		var l = new List();
		var $it0 = this.__x.elementsNamed(name);
		while( $it0.hasNext() ) {
			var x = $it0.next();
			l.add(new haxe.xml.Fast(x));
		}
		return l;
	}
	,__class__: haxe.xml._Fast.NodeListAccess
}
haxe.xml.Fast = function(x) {
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + x.nodeType;
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
};
$hxClasses["haxe.xml.Fast"] = haxe.xml.Fast;
haxe.xml.Fast.__name__ = ["haxe","xml","Fast"];
haxe.xml.Fast.prototype = {
	x: null
	,name: null
	,innerData: null
	,innerHTML: null
	,node: null
	,nodes: null
	,att: null
	,has: null
	,hasNode: null
	,elements: null
	,getName: function() {
		return this.x.nodeType == Xml.Document?"Document":this.x.getNodeName();
	}
	,getInnerData: function() {
		var it = this.x.iterator();
		if(!it.hasNext()) throw this.getName() + " does not have data";
		var v = it.next();
		var n = it.next();
		if(n != null) {
			if(v.nodeType == Xml.PCData && n.nodeType == Xml.CData && StringTools.trim(v.getNodeValue()) == "") {
				var n2 = it.next();
				if(n2 == null || n2.nodeType == Xml.PCData && StringTools.trim(n2.getNodeValue()) == "" && it.next() == null) return n.getNodeValue();
			}
			throw this.getName() + " does not only have data";
		}
		if(v.nodeType != Xml.PCData && v.nodeType != Xml.CData) throw this.getName() + " does not have data";
		return v.getNodeValue();
	}
	,getInnerHTML: function() {
		var s = new StringBuf();
		var $it0 = this.x.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			s.add(x.toString());
		}
		return s.b.join("");
	}
	,getElements: function() {
		var it = this.x.elements();
		return { hasNext : it.hasNext.$bind(it), next : function() {
			var x = it.next();
			if(x == null) return null;
			return new haxe.xml.Fast(x);
		}};
	}
	,__class__: haxe.xml.Fast
	,__properties__: {get_elements:"getElements",get_innerHTML:"getInnerHTML",get_innerData:"getInnerData",get_name:"getName"}
}
var hsl = {}
hsl.haxe = {}
hsl.haxe.Bond = function() {
	this.halted = false;
};
$hxClasses["hsl.haxe.Bond"] = hsl.haxe.Bond;
hsl.haxe.Bond.__name__ = ["hsl","haxe","Bond"];
hsl.haxe.Bond.prototype = {
	halted: null
	,willDestroyOnUse: null
	,destroy: function() {
	}
	,destroyOnUse: function() {
		this.willDestroyOnUse = true;
		return this;
	}
	,halt: function() {
		this.halted = true;
	}
	,resume: function() {
		this.halted = false;
	}
	,toString: function() {
		return "[Bond]";
	}
	,__class__: hsl.haxe.Bond
}
hsl.haxe.Signaler = function() { }
$hxClasses["hsl.haxe.Signaler"] = hsl.haxe.Signaler;
hsl.haxe.Signaler.__name__ = ["hsl","haxe","Signaler"];
hsl.haxe.Signaler.prototype = {
	isListenedTo: null
	,subject: null
	,addBubblingTarget: null
	,addNotificationTarget: null
	,bind: null
	,bindAdvanced: null
	,bindVoid: null
	,dispatch: null
	,getIsListenedTo: null
	,removeBubblingTarget: null
	,removeNotificationTarget: null
	,unbind: null
	,unbindAdvanced: null
	,unbindVoid: null
	,__class__: hsl.haxe.Signaler
	,__properties__: {get_isListenedTo:"getIsListenedTo"}
}
hsl.haxe.DirectSignaler = function(subject,rejectNullData) {
	if(null == subject) throw new haxe.exception.ArgumentNullException("subject",1);
	this.subject = subject;
	this.rejectNullData = rejectNullData;
	this.sentinel = new hsl.haxe._DirectSignaler.SentinelBond();
};
$hxClasses["hsl.haxe.DirectSignaler"] = hsl.haxe.DirectSignaler;
hsl.haxe.DirectSignaler.__name__ = ["hsl","haxe","DirectSignaler"];
hsl.haxe.DirectSignaler.__interfaces__ = [hsl.haxe.Signaler];
hsl.haxe.DirectSignaler.prototype = {
	bubblingTargets: null
	,isListenedTo: null
	,notificationTargets: null
	,rejectNullData: null
	,sentinel: null
	,subject: null
	,subjectClassNames: null
	,addBubblingTarget: function(value) {
		if(null == this.bubblingTargets) this.bubblingTargets = new List();
		this.bubblingTargets.add(value);
	}
	,addNotificationTarget: function(value) {
		if(null == this.notificationTargets) this.notificationTargets = new List();
		this.notificationTargets.add(value);
	}
	,bind: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.RegularBond(listener));
	}
	,bindAdvanced: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
	}
	,bindVoid: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.NiladicBond(listener));
	}
	,bubble: function(data,origin) {
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
	,dispatch: function(data,origin,positionInformation) {
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
	,getIsListenedTo: function() {
		return this.sentinel.getIsConnected();
	}
	,getOrigin: function(origin) {
		return null == origin?this.subject:origin;
	}
	,verifyCaller: function(positionInformation) {
		if(null == this.subjectClassNames) this.subjectClassNames = haxe.TypeTools.getClassNames(this.subject);
		var $it0 = this.subjectClassNames.iterator();
		while( $it0.hasNext() ) {
			var subjectClassName = $it0.next();
			if(subjectClassName == positionInformation.className) return;
		}
		throw new haxe.exception.Exception("This method may only be called by the subject of the signaler.",null,2);
	}
	,removeBubblingTarget: function(value) {
		if(null != this.bubblingTargets) this.bubblingTargets.remove(value);
	}
	,removeNotificationTarget: function(value) {
		if(null != this.notificationTargets) this.notificationTargets.remove(value);
	}
	,toString: function() {
		return "[Signaler isListenedTo=" + this.getIsListenedTo() + "]";
	}
	,unbind: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.RegularBond(listener));
	}
	,unbindAdvanced: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
	}
	,unbindVoid: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.NiladicBond(listener));
	}
	,__class__: hsl.haxe.DirectSignaler
	,__properties__: {get_isListenedTo:"getIsListenedTo"}
}
hsl.haxe._DirectSignaler = {}
hsl.haxe._DirectSignaler.LinkedBond = function() {
	hsl.haxe.Bond.call(this);
	this.destroyed = false;
};
$hxClasses["hsl.haxe._DirectSignaler.LinkedBond"] = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.LinkedBond.__name__ = ["hsl","haxe","_DirectSignaler","LinkedBond"];
hsl.haxe._DirectSignaler.LinkedBond.__super__ = hsl.haxe.Bond;
hsl.haxe._DirectSignaler.LinkedBond.prototype = $extend(hsl.haxe.Bond.prototype,{
	destroyed: null
	,next: null
	,previous: null
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		return 0;
	}
	,determineEquals: function(value) {
		return false;
	}
	,destroy: function() {
		if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	,unlink: function() {
		if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	,__class__: hsl.haxe._DirectSignaler.LinkedBond
});
hsl.haxe._DirectSignaler.SentinelBond = function() {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.next = this.previous = this;
};
$hxClasses["hsl.haxe._DirectSignaler.SentinelBond"] = hsl.haxe._DirectSignaler.SentinelBond;
hsl.haxe._DirectSignaler.SentinelBond.__name__ = ["hsl","haxe","_DirectSignaler","SentinelBond"];
hsl.haxe._DirectSignaler.SentinelBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.SentinelBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	isConnected: null
	,add: function(value) {
		value.next = this;
		value.previous = this.previous;
		return this.previous = this.previous.next = value;
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		var node = this.next;
		while(node != this && 1 != propagationStatus) {
			propagationStatus = node.callListener(data,currentTarget,origin,propagationStatus);
			node = node.next;
		}
		return propagationStatus;
	}
	,getIsConnected: function() {
		return this.next != this;
	}
	,remove: function(value) {
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
	,__class__: hsl.haxe._DirectSignaler.SentinelBond
	,__properties__: {get_isConnected:"getIsConnected"}
});
hsl.haxe._DirectSignaler.RegularBond = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
$hxClasses["hsl.haxe._DirectSignaler.RegularBond"] = hsl.haxe._DirectSignaler.RegularBond;
hsl.haxe._DirectSignaler.RegularBond.__name__ = ["hsl","haxe","_DirectSignaler","RegularBond"];
hsl.haxe._DirectSignaler.RegularBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.RegularBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	listener: null
	,callListener: function(data,currentTarget,origin,propagationStatus) {
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
	,determineEquals: function(value) {
		return Std["is"](value,hsl.haxe._DirectSignaler.RegularBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,__class__: hsl.haxe._DirectSignaler.RegularBond
});
hsl.haxe._DirectSignaler.NiladicBond = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
$hxClasses["hsl.haxe._DirectSignaler.NiladicBond"] = hsl.haxe._DirectSignaler.NiladicBond;
hsl.haxe._DirectSignaler.NiladicBond.__name__ = ["hsl","haxe","_DirectSignaler","NiladicBond"];
hsl.haxe._DirectSignaler.NiladicBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.NiladicBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	listener: null
	,callListener: function(data,currentTarget,origin,propagationStatus) {
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
	,determineEquals: function(value) {
		return Std["is"](value,hsl.haxe._DirectSignaler.NiladicBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,__class__: hsl.haxe._DirectSignaler.NiladicBond
});
hsl.haxe._DirectSignaler.AdvancedBond = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
$hxClasses["hsl.haxe._DirectSignaler.AdvancedBond"] = hsl.haxe._DirectSignaler.AdvancedBond;
hsl.haxe._DirectSignaler.AdvancedBond.__name__ = ["hsl","haxe","_DirectSignaler","AdvancedBond"];
hsl.haxe._DirectSignaler.AdvancedBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.AdvancedBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	listener: null
	,callListener: function(data,currentTarget,origin,propagationStatus) {
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
	,determineEquals: function(value) {
		return Std["is"](value,hsl.haxe._DirectSignaler.AdvancedBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,__class__: hsl.haxe._DirectSignaler.AdvancedBond
});
hsl.haxe._DirectSignaler.PropagationStatus = function() { }
$hxClasses["hsl.haxe._DirectSignaler.PropagationStatus"] = hsl.haxe._DirectSignaler.PropagationStatus;
hsl.haxe._DirectSignaler.PropagationStatus.__name__ = ["hsl","haxe","_DirectSignaler","PropagationStatus"];
hsl.haxe._DirectSignaler.PropagationStatus.prototype = {
	__class__: hsl.haxe._DirectSignaler.PropagationStatus
}
hsl.haxe.Signal = function(data,currentBond,currentTarget,origin) {
	this.data = data;
	this.currentBond = currentBond;
	this.currentTarget = currentTarget;
	this.origin = origin;
	this.immediatePropagationStopped = false;
	this.propagationStopped = false;
};
$hxClasses["hsl.haxe.Signal"] = hsl.haxe.Signal;
hsl.haxe.Signal.__name__ = ["hsl","haxe","Signal"];
hsl.haxe.Signal.prototype = {
	currentBond: null
	,currentTarget: null
	,data: null
	,data1: null
	,immediatePropagationStopped: null
	,origin: null
	,propagationStopped: null
	,getData: function() {
		return this.data;
	}
	,stopImmediatePropagation: function() {
		this.immediatePropagationStopped = true;
	}
	,stopPropagation: function() {
		this.propagationStopped = true;
	}
	,toString: function() {
		return "[GenericSignal data=" + this.data + "]";
	}
	,__class__: hsl.haxe.Signal
	,__properties__: {get_data1:"getData"}
}
var js = {}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
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
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
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
		if(x != x) return undefined;
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
	Function.prototype["$bind"] = function(o) {
		var f = function() {
			return f.method.apply(f.scope,arguments);
		};
		f.scope = o;
		f.method = this;
		return f;
	};
}
js.Boot.prototype = {
	__class__: js.Boot
}
js.Lib = function() { }
$hxClasses["js.Lib"] = js.Lib;
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib["eval"] = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype = {
	__class__: js.Lib
}
var kumite = {}
kumite.launch = {}
kumite.launch.Config = function() {
	this.launcher = new kumite.launch.Launcher();
	this.sequencer = new bpmjs.Sequencer();
	this.preloadDisplay = new kumite.launch.PreloadDisplay();
};
$hxClasses["kumite.launch.Config"] = kumite.launch.Config;
kumite.launch.Config.__name__ = ["kumite","launch","Config"];
kumite.launch.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.launch.Config.prototype = {
	sequencer: null
	,launcher: null
	,preloadDisplay: null
	,__class__: kumite.launch.Config
}
kumite.launch.Launcher = function() {
};
$hxClasses["kumite.launch.Launcher"] = kumite.launch.Launcher;
kumite.launch.Launcher.__name__ = ["kumite","launch","Launcher"];
kumite.launch.Launcher.__interfaces__ = [haxe.rtti.Infos];
kumite.launch.Launcher.prototype = {
	sequencer: null
	,handlePostComplete: function() {
		this.sequencer.start("boot");
	}
	,showError: function(message) {
		{
			Log.posInfo = { fileName : "Launcher.hx", lineNumber : 26, className : "kumite.launch.Launcher", methodName : "showError"};
			if(Log.filter(LogLevel.ERROR)) {
				Log.fetchInput(message,null,null,null,null,null,null);
				console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
				Log.displayError(Log.createErrorMessage());
			}
		}
	}
	,handleFinish: function() {
	}
	,__class__: kumite.launch.Launcher
}
kumite.launch.PreloadDisplay = function() {
};
$hxClasses["kumite.launch.PreloadDisplay"] = kumite.launch.PreloadDisplay;
kumite.launch.PreloadDisplay.__name__ = ["kumite","launch","PreloadDisplay"];
kumite.launch.PreloadDisplay.__interfaces__ = [haxe.rtti.Infos];
kumite.launch.PreloadDisplay.prototype = {
	preloaderDiv: null
	,complete: function() {
		this.preloaderDiv = js.Lib.document.createElement("div");
		this.preloaderDiv.className = "Preloader";
		js.Lib.document.body.appendChild(this.preloaderDiv);
	}
	,bootMonitor: function(monitor) {
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
			bar += chars4.charAt(diff * (chars4.length - 1) | 0);
		}
		this.preloaderDiv.innerHTML = "" + bar;
	}
	,bootStartComplete: function() {
		var body = js.Lib.document.getElementById("root");
		Timeout.execute(1000,this.removePreloader.$bind(this));
	}
	,removePreloader: function() {
		js.Lib.document.body.removeChild(this.preloaderDiv);
	}
	,__class__: kumite.launch.PreloadDisplay
}
kumite.presentation = {}
kumite.presentation.Slide = function() {
	this.isPrepared = false;
	this.slidesFinishedNext = new hsl.haxe.DirectSignaler(this);
	this.slidesFinishedPrev = new hsl.haxe.DirectSignaler(this);
};
$hxClasses["kumite.presentation.Slide"] = kumite.presentation.Slide;
kumite.presentation.Slide.__name__ = ["kumite","presentation","Slide"];
kumite.presentation.Slide.prototype = {
	slidesFinishedNext: null
	,slidesFinishedPrev: null
	,isPrepared: null
	,row: null
	,column: null
	,prepare: function(root) {
		this.isPrepared = true;
	}
	,resize: function(stage) {
	}
	,removeFrom: function(root) {
		this.isPrepared = false;
	}
	,goNext: function() {
	}
	,goPrev: function() {
	}
	,getMemento: function() {
		return null;
	}
	,setMemento: function(memento) {
	}
	,__class__: kumite.presentation.Slide
}
kumite.presentation.ContainerSlide = function() {
	kumite.presentation.Slide.call(this);
	this.slides = new Array();
	this.slideIndex = 0;
	this.color = new Color(Math.random(),Math.random(),Math.random());
	this.canvas = new CanvasGraphic();
	this.canvas.usePow2Size = false;
	this.visualSlideIndex = new Motion();
	this.visualSlideIndex.style = new MotionStyleEaseInOut();
};
$hxClasses["kumite.presentation.ContainerSlide"] = kumite.presentation.ContainerSlide;
kumite.presentation.ContainerSlide.__name__ = ["kumite","presentation","ContainerSlide"];
kumite.presentation.ContainerSlide.__interfaces__ = [haxe.rtti.Infos];
kumite.presentation.ContainerSlide.__super__ = kumite.presentation.Slide;
kumite.presentation.ContainerSlide.prototype = $extend(kumite.presentation.Slide.prototype,{
	stage: null
	,time: null
	,slides: null
	,color: null
	,canvas: null
	,slideIndex: null
	,visualSlideIndex: null
	,container: null
	,slidingContainer: null
	,addSlide: function(slide) {
		this.slides.push(slide);
		return this;
	}
	,init: function() {
		var _g = 0, _g1 = this.slides;
		while(_g < _g1.length) {
			var slide = _g1[_g];
			++_g;
			bpmjs.ContextBuilder.configure(slide);
		}
	}
	,prepare: function(root) {
		kumite.presentation.Slide.prototype.prepare.call(this,root);
		this.container = js.Lib.document.createElement("div");
		root.appendChild(this.container);
		this.slidingContainer = js.Lib.document.createElement("div");
		this.slidingContainer.style.position = "absolute";
		this.container.appendChild(this.slidingContainer);
		var column = 0;
		var _g = 0, _g1 = this.slides;
		while(_g < _g1.length) {
			var slide = _g1[_g];
			++_g;
			slide.column = column;
			slide.prepare(this.slidingContainer);
			slide.resize(this.stage);
			column++;
		}
	}
	,resize: function(stage) {
		kumite.presentation.Slide.prototype.resize.call(this,stage);
		this.container.setAttribute("style","top:" + this.row * stage.height + "px; position:absolute; overflow-x:hidden; height:" + stage.height + "px; width:" + stage.width + "px");
		if(this.visualSlideIndex.target != this.slideIndex) this.visualSlideIndex.target = this.slideIndex;
		var _g = 0, _g1 = this.slides;
		while(_g < _g1.length) {
			var slide = _g1[_g];
			++_g;
			slide.resize(stage);
		}
	}
	,tick: function(tick) {
		this.visualSlideIndex.move(this.time);
		this.slidingContainer.style.left = -Math.round(this.visualSlideIndex.current * this.stage.width) + "px";
	}
	,getMemento: function() {
		return this.slideIndex;
	}
	,setMemento: function(memento) {
		if(!Math.isNaN(memento)) {
			this.visualSlideIndex.current = memento;
			this.changeSlide(memento);
		}
	}
	,gotoNextSlide: function(_) {
		this.goNext();
	}
	,changeSlide: function(newIndex) {
		this.slideIndex = newIndex % this.slides.length;
		this.resize(this.stage);
	}
	,goNext: function() {
		if(this.slideIndex + 1 >= this.slides.length) this.slidesFinishedNext.dispatch(this,null,{ fileName : "ContainerSlide.hx", lineNumber : 131, className : "kumite.presentation.ContainerSlide", methodName : "goNext"}); else this.changeSlide(this.slideIndex + 1);
	}
	,goPrev: function() {
		if(this.slideIndex - 1 < 0) this.slidesFinishedPrev.dispatch(this,null,{ fileName : "ContainerSlide.hx", lineNumber : 139, className : "kumite.presentation.ContainerSlide", methodName : "goPrev"}); else this.changeSlide(this.slideIndex - 1);
	}
	,__class__: kumite.presentation.ContainerSlide
});
kumite.presentation.Hitarea = function() {
};
$hxClasses["kumite.presentation.Hitarea"] = kumite.presentation.Hitarea;
kumite.presentation.Hitarea.__name__ = ["kumite","presentation","Hitarea"];
kumite.presentation.Hitarea.prototype = {
	x: null
	,y: null
	,width: null
	,height: null
	,location: null
	,__class__: kumite.presentation.Hitarea
}
kumite.presentation.Presentation = function() {
	this.slides = new Array();
};
$hxClasses["kumite.presentation.Presentation"] = kumite.presentation.Presentation;
kumite.presentation.Presentation.__name__ = ["kumite","presentation","Presentation"];
kumite.presentation.Presentation.__interfaces__ = [haxe.rtti.Infos];
kumite.presentation.Presentation.prototype = {
	slides: null
	,currentSlideIndex: null
	,complete: function() {
		var _g = 0, _g1 = this.slides;
		while(_g < _g1.length) {
			var slide = _g1[_g];
			++_g;
			bpmjs.ContextBuilder.configure(slide);
		}
	}
	,goNext: function() {
		this.slides[this.currentSlideIndex].goNext();
	}
	,goPrev: function() {
		this.slides[this.currentSlideIndex].goPrev();
	}
	,getMemento: function() {
		var memento = { i : this.currentSlideIndex, a : []};
		var _g1 = 0, _g = this.slides.length;
		while(_g1 < _g) {
			var i = _g1++;
			memento.a.push(this.slides[i].getMemento());
		}
		return memento;
	}
	,setMemento: function(memento) {
		this.currentSlideIndex = memento.i;
		var _g1 = 0, _g = this.slides.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.slides[i].setMemento(memento.a[i]);
		}
	}
	,__class__: kumite.presentation.Presentation
}
kumite.presentation.PresentationConfig = function() {
	this.presentation = new kumite.presentation.Presentation();
	this.presentation.slides.push(new kumite.presentation.ContainerSlide().addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/1.Britzpetermann/1Britzpetermann.jpg")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/1.Britzpetermann/2BritzpetermannAlle.gif")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/1.Britzpetermann/5Britzpetermann.jpg")));
	this.presentation.slides.push(new kumite.presentation.ContainerSlide().addSlide(new kumite.presentation.SpriteSlide("data/presentation/IMG_4294.jpg")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/3.Akemi/3.5.AkemiPre.jpg").addHitArea(30,0,500,1100,"http://static.britzpetermann.com/presentation/content/preAkemi1/indexgl3.html").addHitArea(590,0,500,1100,"http://static.britzpetermann.com/presentation/content/preAkemi2/WobbleBars.html").addHitArea(1140,0,500,1100,"http://static.britzpetermann.com/presentation/content/preAkemi2/StrangeAttractor.html")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/3.Akemi/3.1.Akemi.jpg")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/3.Akemi/3.2.Akemi.jpg").addHitArea(680,655,300,100,"http://static.britzpetermann.com/experiments/akemi/")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/3.Akemi/3.6.WhatTheFuck.jpg")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/3.Akemi/3.3.AkemiHelsinki.jpg")));
	this.presentation.slides.push(new kumite.presentation.ContainerSlide().addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/2.Schau!/1.Schau.jpg")));
	this.presentation.slides.push(new kumite.presentation.ContainerSlide().addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/2.Schau!/2.Schau.jpg")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/2.Schau!/2.1.Schau.jpg")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/2.Schau!/2.2.Schau.jpg")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/2.Schau!/2.3.Schau.jpg").addHitArea(1000,500,250,150,"http://player.vimeo.com/video/33186969?autoplay=true")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/2.Schau!/2.4.Schau.jpg")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/2.Schau!/2.5.Schau.jpg")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/2.Schau!/2.3.Schau.jpg").addHitArea(1000,500,250,150,"http://player.vimeo.com/video/33730560?autoplay=true")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/2.Schau!/2.6.Schau.jpg")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/2.Schau!/2.7.Schau.jpg")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/2.Schau!/2.3.Schau.jpg").addHitArea(1000,500,250,150,"http://player.vimeo.com/video/34946802?autoplay=true")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/2.Schau!/RefSchau.jpg")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/2.Schau!/2.8.Schau.jpg").addHitArea(450,350,770,190,"http://www.flickr.com/photos/britzpetermann/sets/72157628678359221/").addHitArea(450,545,770,200,"http://vimeo.com/britzpetermann")));
	this.presentation.slides.push(new kumite.presentation.ContainerSlide().addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/5.OpenRound/Resume.png")).addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/5.OpenRound/Persil.jpg").addHitArea(900,650,300,150,"https://github.com/Persil").addHitArea(1250,650,300,150,"http://static.britzpetermann.com/presentation/content/persil/")));
	this.presentation.slides.push(new kumite.presentation.ContainerSlide().addSlide(new kumite.presentation.SpriteSlide("data/presentation/Screens/6.Fin.png").addHitArea(400,400,900,90,"http://britzpetermann.com/").addHitArea(400,500,900,90,"https://github.com/Britzpetermann").addHitArea(400,600,900,90,"http://britzpetermann.com/talk")));
	this.slideNavigator = new kumite.presentation.SlideNavigator();
};
$hxClasses["kumite.presentation.PresentationConfig"] = kumite.presentation.PresentationConfig;
kumite.presentation.PresentationConfig.__name__ = ["kumite","presentation","PresentationConfig"];
kumite.presentation.PresentationConfig.__interfaces__ = [haxe.rtti.Infos];
kumite.presentation.PresentationConfig.prototype = {
	presentation: null
	,slideNavigator: null
	,__class__: kumite.presentation.PresentationConfig
}
kumite.presentation.SlideNavigator = function() {
	this.lastScrollTopEqualTime = -1;
	this.autoScroll = false;
	this.leftNavMotion = new Motion();
	this.leftNavMotion.style = new MotionStyleEaseInOut().setSmoothing(0.2);
	this.rightNavMotion = new Motion();
	this.rightNavMotion.style = new MotionStyleEaseInOut().setSmoothing(0.2);
};
$hxClasses["kumite.presentation.SlideNavigator"] = kumite.presentation.SlideNavigator;
kumite.presentation.SlideNavigator.__name__ = ["kumite","presentation","SlideNavigator"];
kumite.presentation.SlideNavigator.__interfaces__ = [haxe.rtti.Infos];
kumite.presentation.SlideNavigator.prototype = {
	stage: null
	,time: null
	,presentation: null
	,currentHash: null
	,autoScroll: null
	,root: null
	,speed: null
	,scrollTop: null
	,targetPosition: null
	,lastScrollTop: null
	,lastScrollTopEqualTime: null
	,leftNav: null
	,leftNavMotion: null
	,rightNav: null
	,rightNavMotion: null
	,mouseX: null
	,mouseY: null
	,start: function() {
		this.root = js.Lib.document.getElementById("root");
		this.root.onmousemove = this.onMouseMove.$bind(this);
		this.root.onkeydown = this.onKeyDown.$bind(this);
		this.lastScrollTop = this.root.scrollTop;
		var row = 0;
		var _g = 0, _g1 = this.presentation.slides;
		while(_g < _g1.length) {
			var slide = _g1[_g];
			++_g;
			slide.slidesFinishedNext.bind(this.slideRowFinishedNext.$bind(this));
			slide.slidesFinishedPrev.bind(this.slideRowFinishedPrev.$bind(this));
			slide.row = row;
			slide.prepare(this.root);
			row++;
		}
		this.leftNav = js.Lib.document.createElement("div");
		this.root.appendChild(this.leftNav);
		var styles = [];
		styles.push("position:" + "fixed");
		styles.push("top:" + 0 + "px");
		styles.push("left:" + 0 + "px");
		styles.push("width:" + 160 + "px");
		styles.push("height:" + 460 + "px");
		styles.push("background-image: url(" + "data/presentation/Back.png" + ")");
		styles.push("background-repeat: no-repeat;");
		this.leftNav.setAttribute("style",styles.join(";"));
		this.leftNav.onclick = this.handleLeftClick.$bind(this);
		this.rightNav = js.Lib.document.createElement("div");
		this.root.appendChild(this.rightNav);
		var styles1 = [];
		styles1.push("position:" + "fixed");
		styles1.push("top:" + 0 + "px");
		styles1.push("left:" + 0 + "px");
		styles1.push("width:" + 160 + "px");
		styles1.push("height:" + 460 + "px");
		styles1.push("background-image: url(" + "data/presentation/Next.png" + ")");
		styles1.push("background-repeat: no-repeat;");
		this.rightNav.setAttribute("style",styles1.join(";"));
		this.rightNav.onclick = this.handleRightClick.$bind(this);
		this.resize();
	}
	,startComplete: function() {
		this.setMementoFromUrl();
		this.resize();
	}
	,handleResize: function(message) {
		this.resize();
	}
	,handleTick: function(tick) {
		this.leftNavMotion.target = this.mouseX < 150 && this.mouseX > 1?1:0;
		this.leftNavMotion.move(this.time);
		this.rightNavMotion.target = this.mouseX > this.stage.width - 150?1:0;
		this.rightNavMotion.move(this.time);
		this.leftNav.style.opacity = this.leftNavMotion.current;
		this.leftNav.style.left = -this.leftNavMotion.current * 20 + 30 + "px";
		this.rightNav.style.opacity = this.rightNavMotion.current;
		this.rightNav.style.left = this.stage.width - 160 + this.rightNavMotion.current * 20 - 30 + "px";
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
	}
	,resize: function() {
		this.lastScrollTopEqualTime = -1;
		this.autoScroll = false;
		this.targetCurrentSlide();
		var _g = 0, _g1 = this.presentation.slides;
		while(_g < _g1.length) {
			var slide = _g1[_g];
			++_g;
			slide.resize(this.stage);
		}
		this.leftNav.style.top = (this.stage.height - 450) / 2 + "px";
		this.rightNav.style.top = (this.stage.height - 450) / 2 + "px";
	}
	,getMemento: function() {
		return this.presentation.getMemento();
	}
	,setMementoFromUrl: function() {
		try {
			var data = js.Lib.window.location.hash.substr(1);
			var memento = haxe.Unserializer.run(data);
			this.presentation.setMemento(memento);
			this.targetCurrentSlide();
		} catch( e ) {
			{
				Log.posInfo = { fileName : "SlideNavigator.hx", lineNumber : 214, className : "kumite.presentation.SlideNavigator", methodName : "setMementoFromUrl"};
				if(Log.filter(LogLevel.INFO)) {
					Log.fetchInput("Cannot restore memento: " + e,null,null,null,null,null,null);
					console.info(Log.createMessage());
				}
			}
		}
	}
	,targetCurrentSlide: function() {
		this.scrollTop = this.presentation.currentSlideIndex * this.stage.height;
		this.lastScrollTop = this.presentation.currentSlideIndex * this.stage.height;
		this.root.scrollTop = this.presentation.currentSlideIndex * this.stage.height;
	}
	,slideRowFinishedNext: function(_) {
		if(this.presentation.currentSlideIndex < this.presentation.slides.length - 1) {
			this.presentation.currentSlideIndex++;
			this.targetPosition = this.presentation.currentSlideIndex * this.stage.height;
		}
	}
	,slideRowFinishedPrev: function(_) {
		if(this.presentation.currentSlideIndex > 0) {
			this.presentation.currentSlideIndex--;
			this.targetPosition = this.presentation.currentSlideIndex * this.stage.height;
		}
	}
	,onMouseMove: function(e) {
		this.mouseX = e.pageX;
		this.mouseY = e.pageY;
	}
	,onKeyDown: function(e) {
		if(e.keyIdentifier == "Left") this.presentation.goPrev(); else if(e.keyIdentifier == "Right") this.presentation.goNext();
	}
	,handleLeftClick: function(_) {
		this.presentation.goPrev();
	}
	,handleRightClick: function(_) {
		this.presentation.goNext();
	}
	,__class__: kumite.presentation.SlideNavigator
}
kumite.presentation.SpriteSlide = function(location) {
	kumite.presentation.Slide.call(this);
	this.location = location;
	this.hitareas = new Array();
	this.imageTask = new bpmjs.ImageLoaderTask(location);
};
$hxClasses["kumite.presentation.SpriteSlide"] = kumite.presentation.SpriteSlide;
kumite.presentation.SpriteSlide.__name__ = ["kumite","presentation","SpriteSlide"];
kumite.presentation.SpriteSlide.__interfaces__ = [haxe.rtti.Infos];
kumite.presentation.SpriteSlide.__super__ = kumite.presentation.Slide;
kumite.presentation.SpriteSlide.prototype = $extend(kumite.presentation.Slide.prototype,{
	stage: null
	,hitareas: null
	,container: null
	,imageTask: null
	,location: null
	,addHitArea: function(x,y,width,height,location) {
		var hitarea = new kumite.presentation.Hitarea();
		hitarea.x = x;
		hitarea.y = y;
		hitarea.width = width;
		hitarea.height = height;
		hitarea.location = location;
		var hitareaAndDiv = new kumite.presentation._SpriteSlide.HitareaAndDiv();
		hitareaAndDiv.hitarea = hitarea;
		this.hitareas.push(hitareaAndDiv);
		return this;
	}
	,loadImage: function() {
		this.container = js.Lib.document.createElement("div");
		this.imageTask.completeSignaler.bind(this.handleImageLoaded.$bind(this));
		return this.imageTask;
	}
	,prepare: function(root) {
		kumite.presentation.Slide.prototype.prepare.call(this,root);
		this.container.setAttribute("style","overflow:hidden; position:absolute");
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
	}
	,resize: function(stage) {
		kumite.presentation.Slide.prototype.resize.call(this,stage);
		if(!this.imageTask.isComplete) return;
		var transform = this.getTransform();
		var styles = [];
		styles.push("position:" + "absolute");
		styles.push("top:" + this.row * stage.height + "px");
		styles.push("left:" + this.column * stage.width + "px");
		styles.push("width:" + stage.width + "px");
		styles.push("height:" + stage.height + "px");
		styles.push("background-image: url(" + this.location + ")");
		styles.push("background-size: " + Math.round(transform.scale * (this.imageTask.image.naturalWidth / stage.width) * 100) + "%");
		styles.push("background-repeat: no-repeat;");
		styles.push("background-position: " + Math.round(transform.x) + "px " + Math.round(transform.y) + "px");
		this.container.setAttribute("style",styles.join(";"));
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
			var left = hitarea.hitarea.x * transform.scale + transform.x + this.column * stage.width;
			var top = hitarea.hitarea.y * transform.scale + transform.y;
			var width = hitarea.hitarea.width * transform.scale;
			var height = hitarea.hitarea.height * transform.scale;
			div.style.left = left + "px";
			div.style.top = top + "px";
			div.style.width = width + "px";
			div.style.height = height + "px";
			hitarea.div = div;
		}
	}
	,getTransform: function() {
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
		return { scale : iw / image.naturalWidth, x : ix, y : iy};
	}
	,handleImageLoaded: function(_) {
	}
	,removeFrom: function(root) {
		kumite.presentation.Slide.prototype.removeFrom.call(this,root);
		var _g = 0, _g1 = this.hitareas;
		while(_g < _g1.length) {
			var hitarea = _g1[_g];
			++_g;
			var div = hitarea.div;
			root.removeChild(div);
		}
	}
	,__class__: kumite.presentation.SpriteSlide
});
kumite.presentation._SpriteSlide = {}
kumite.presentation._SpriteSlide.HitareaAndDiv = function() {
};
$hxClasses["kumite.presentation._SpriteSlide.HitareaAndDiv"] = kumite.presentation._SpriteSlide.HitareaAndDiv;
kumite.presentation._SpriteSlide.HitareaAndDiv.__name__ = ["kumite","presentation","_SpriteSlide","HitareaAndDiv"];
kumite.presentation._SpriteSlide.HitareaAndDiv.prototype = {
	hitarea: null
	,div: null
	,__class__: kumite.presentation._SpriteSlide.HitareaAndDiv
}
kumite.stage = {}
kumite.stage.Config = function() {
	this.stage = new kumite.stage.Stage();
	this.stageResizeAction = new kumite.stage.StageResizeAction();
};
$hxClasses["kumite.stage.Config"] = kumite.stage.Config;
kumite.stage.Config.__name__ = ["kumite","stage","Config"];
kumite.stage.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.stage.Config.prototype = {
	stage: null
	,stageResizeAction: null
	,__class__: kumite.stage.Config
}
kumite.stage.Stage = function() {
};
$hxClasses["kumite.stage.Stage"] = kumite.stage.Stage;
kumite.stage.Stage.__name__ = ["kumite","stage","Stage"];
kumite.stage.Stage.prototype = {
	width: null
	,height: null
	,aspect: null
	,getAspect: function() {
		return this.width / this.height;
	}
	,__class__: kumite.stage.Stage
	,__properties__: {get_aspect:"getAspect"}
}
kumite.stage.StageResizeAction = function() {
};
$hxClasses["kumite.stage.StageResizeAction"] = kumite.stage.StageResizeAction;
kumite.stage.StageResizeAction.__name__ = ["kumite","stage","StageResizeAction"];
kumite.stage.StageResizeAction.__interfaces__ = [haxe.rtti.Infos];
kumite.stage.StageResizeAction.prototype = {
	messenger: null
	,stage: null
	,initPrepare: function() {
		this.updateSize();
	}
	,startComplete: function() {
		GLAnimationFrame.run(this.timerUpdate.$bind(this));
		js.Lib.window.onresize = this.onResize.$bind(this);
	}
	,timerUpdate: function() {
		if(this.stage.width != js.Lib.window.innerWidth || this.stage.height != js.Lib.window.innerHeight) this.onResize();
	}
	,onResize: function(event) {
		this.updateSize();
		this.sendResizeMessage();
	}
	,updateSize: function() {
		this.stage.width = js.Lib.window.innerWidth | 0;
		this.stage.height = js.Lib.window.innerHeight | 0;
	}
	,sendResizeMessage: function() {
		this.messenger.send(new kumite.stage.StageResizeMessage());
	}
	,__class__: kumite.stage.StageResizeAction
}
kumite.stage.StageResizeMessage = function() {
};
$hxClasses["kumite.stage.StageResizeMessage"] = kumite.stage.StageResizeMessage;
kumite.stage.StageResizeMessage.__name__ = ["kumite","stage","StageResizeMessage"];
kumite.stage.StageResizeMessage.prototype = {
	__class__: kumite.stage.StageResizeMessage
}
kumite.time = {}
kumite.time.Config = function() {
	this.time = new kumite.time.Time();
	this.timeController = new kumite.time.TimeController();
};
$hxClasses["kumite.time.Config"] = kumite.time.Config;
kumite.time.Config.__name__ = ["kumite","time","Config"];
kumite.time.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.time.Config.prototype = {
	time: null
	,timeController: null
	,__class__: kumite.time.Config
}
kumite.time.Tick = function() {
};
$hxClasses["kumite.time.Tick"] = kumite.time.Tick;
kumite.time.Tick.__name__ = ["kumite","time","Tick"];
kumite.time.Tick.prototype = {
	__class__: kumite.time.Tick
}
kumite.time.Time = function() {
	this.reset();
};
$hxClasses["kumite.time.Time"] = kumite.time.Time;
kumite.time.Time.__name__ = ["kumite","time","Time"];
kumite.time.Time.prototype = {
	ms: null
	,frameMs: null
	,timeScale: null
	,frame: null
	,frameRate: null
	,lastTime: null
	,reset: function() {
		this.frameRate = 60;
		this.ms = 0;
		this.frameMs = 1000 / 60 | 0;
		this.timeScale = 1;
		this.frame = 0;
		this.lastTime = Date.now().getTime();
	}
	,tick: function() {
		var time = Date.now().getTime();
		this.frame++;
		if(this.lastTime == -1) this.lastTime = time - 100;
		this.frameMs = time - this.lastTime;
		if(Math.isNaN(this.frameMs) || !Math.isFinite(this.frameMs)) this.frameMs = 100;
		this.timeScale += this.frameMs / 1000 * 60 - this.timeScale;
		if(Math.isNaN(this.timeScale) || !Math.isFinite(this.timeScale)) this.timeScale = 1;
		this.ms += this.frameMs;
		this.frameRate = 1000 / this.frameMs;
		this.lastTime = time;
	}
	,tickInPause: function() {
		var time = Date.now().getTime();
		if(this.lastTime == -1) this.lastTime = time - 100;
		this.frameMs = time - this.lastTime;
		if(Math.isNaN(this.frameMs) || !Math.isFinite(this.frameMs)) this.frameMs = 100;
		this.timeScale = this.frameMs / 1000 * 60;
		if(Math.isNaN(this.timeScale) || !Math.isFinite(this.timeScale)) this.timeScale = 6.;
		this.frameRate = 1000 / this.frameMs;
		this.lastTime = time;
	}
	,summand: function(value) {
		return value * this.timeScale;
	}
	,factor: function(value) {
		return Math.pow(value,this.timeScale);
	}
	,interpolateTo: function(from,to,f) {
		return from * (1 - f * this.timeScale) + to * (f * this.timeScale);
	}
	,interpolateVec3To: function(from,to,f) {
		from.x = this.interpolateTo(from.x,to.x,f);
		from.y = this.interpolateTo(from.y,to.y,f);
		from.z = this.interpolateTo(from.z,to.z,f);
	}
	,__class__: kumite.time.Time
}
kumite.time.TimeController = function() {
};
$hxClasses["kumite.time.TimeController"] = kumite.time.TimeController;
kumite.time.TimeController.__name__ = ["kumite","time","TimeController"];
kumite.time.TimeController.__interfaces__ = [haxe.rtti.Infos];
kumite.time.TimeController.prototype = {
	time: null
	,messenger: null
	,startComplete: function() {
		this.time.reset();
		GLAnimationFrame.run(this.timerUpdate.$bind(this));
	}
	,timerUpdate: function() {
		this.time.tick();
		this.messenger.send(new kumite.time.Tick());
	}
	,__class__: kumite.time.TimeController
}
var reflect = {}
reflect.ClassInfo = function(name,type) {
	this.name = name;
	this.type = type;
	this.hasRtti = type.__rtti != null;
};
$hxClasses["reflect.ClassInfo"] = reflect.ClassInfo;
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
reflect.ClassInfo.prototype = {
	type: null
	,name: null
	,shortName: null
	,hasRtti: null
	,properties: null
	,methods: null
	,getProperty: function(name) {
		var _g = 0, _g1 = this.getProperties();
		while(_g < _g1.length) {
			var property = _g1[_g];
			++_g;
			if(property.field.name == name) return property;
		}
		return null;
	}
	,getMethod: function(name) {
		var _g = 0, _g1 = this.getMethods();
		while(_g < _g1.length) {
			var method = _g1[_g];
			++_g;
			if(method.field.name == name) return method;
		}
		return null;
	}
	,toString: function() {
		return "[ClassInfo for class: " + this.name + "]";
	}
	,getShortName: function() {
		return this.name.substr(this.name.lastIndexOf(".") + 1);
	}
	,getProperties: function() {
		if(this.properties != null) return this.properties;
		this.initFields();
		return this.properties;
	}
	,getMethods: function() {
		if(this.methods != null) return this.methods;
		this.initFields();
		return this.methods;
	}
	,initFields: function() {
		this.properties = new Array();
		this.methods = new Array();
		this.scanClass(this.type);
	}
	,scanClass: function(type) {
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
	,scanFields: function(classDef) {
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
	,__class__: reflect.ClassInfo
	,__properties__: {get_methods:"getMethods",get_properties:"getProperties",get_shortName:"getShortName"}
}
reflect.MetadataAware = function() { }
$hxClasses["reflect.MetadataAware"] = reflect.MetadataAware;
reflect.MetadataAware.__name__ = ["reflect","MetadataAware"];
reflect.MetadataAware.prototype = {
	hasMetadata: null
	,__class__: reflect.MetadataAware
}
reflect.Field = function(field,definedInClass,owner) {
	this.field = field;
	this.definedInClass = definedInClass;
	this.owner = owner;
};
$hxClasses["reflect.Field"] = reflect.Field;
reflect.Field.__name__ = ["reflect","Field"];
reflect.Field.__interfaces__ = [reflect.MetadataAware];
reflect.Field.prototype = {
	owner: null
	,name: null
	,type: null
	,clazz: null
	,field: null
	,definedInClass: null
	,hasMetadata: function(name) {
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
	,getOwner: function() {
		return this.owner;
	}
	,getName: function() {
		return this.field.name;
	}
	,getType: function() {
		return reflect.ClassInfo.forCType(this.field.type);
	}
	,getClass: function() {
		var type = reflect.ClassInfo.forCType(this.field.type);
		return type == null?null:type.type;
	}
	,__class__: reflect.Field
	,__properties__: {get_clazz:"getClass",get_type:"getType",get_name:"getName",get_owner:"getOwner"}
}
reflect.Method = function(field,args,ret,definedInClass,owner) {
	reflect.Field.call(this,field,definedInClass,owner);
	this.args = args;
	this.ret = ret;
};
$hxClasses["reflect.Method"] = reflect.Method;
reflect.Method.__name__ = ["reflect","Method"];
reflect.Method.__super__ = reflect.Field;
reflect.Method.prototype = $extend(reflect.Field.prototype,{
	parameters: null
	,args: null
	,ret: null
	,getParameters: function() {
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
	,call: function(instance,params) {
		Reflect.field(instance,this.field.name).apply(instance,params);
	}
	,__class__: reflect.Method
	,__properties__: $extend(reflect.Field.prototype.__properties__,{get_parameters:"getParameters"})
});
reflect.Parameter = function(def) {
	this.def = def;
};
$hxClasses["reflect.Parameter"] = reflect.Parameter;
reflect.Parameter.__name__ = ["reflect","Parameter"];
reflect.Parameter.prototype = {
	type: null
	,def: null
	,getType: function() {
		return reflect.ClassInfo.forCType(this.def.t);
	}
	,__class__: reflect.Parameter
	,__properties__: {get_type:"getType"}
}
reflect.Property = function(field,definedInClass,owner) {
	reflect.Field.call(this,field,definedInClass,owner);
};
$hxClasses["reflect.Property"] = reflect.Property;
reflect.Property.__name__ = ["reflect","Property"];
reflect.Property.__super__ = reflect.Field;
reflect.Property.prototype = $extend(reflect.Field.prototype,{
	getValue: function(instance) {
		return Reflect.field(instance,this.field.name);
	}
	,setValue: function(instance,value) {
		instance[this.field.name] = value;
	}
	,__class__: reflect.Property
});
js.Boot.__res = {}
js.Boot.__init();
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
	d.prototype.__class__ = $hxClasses["Date"] = d;
	d.__name__ = ["Date"];
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	$hxClasses["Math"] = Math;
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	String.prototype.__class__ = $hxClasses["String"] = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = $hxClasses["Array"] = Array;
	Array.__name__ = ["Array"];
	var Int = $hxClasses["Int"] = { __name__ : ["Int"]};
	var Dynamic = $hxClasses["Dynamic"] = { __name__ : ["Dynamic"]};
	var Float = $hxClasses["Float"] = Number;
	Float.__name__ = ["Float"];
	var Bool = $hxClasses["Bool"] = Boolean;
	Bool.__ename__ = ["Bool"];
	var Class = $hxClasses["Class"] = { __name__ : ["Class"]};
	var Enum = { };
	var Void = $hxClasses["Void"] = { __ename__ : ["Void"]};
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
	if(typeof document != "undefined") js.Lib.document = document;
	if(typeof window != "undefined") {
		js.Lib.window = window;
		js.Lib.window.onerror = function(msg,url,line) {
			var f = js.Lib.onerror;
			if(f == null) return false;
			return f(msg,[url + ":" + line]);
		};
	}
}
Color.__rtti = "<class path=\"Color\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<r public=\"1\"><c path=\"Float\"/></r>\n\t<g public=\"1\"><c path=\"Float\"/></g>\n\t<b public=\"1\"><c path=\"Float\"/></b>\n\t<a public=\"1\"><c path=\"Float\"/></a>\n\t<fromHex public=\"1\" set=\"method\" line=\"18\"><f a=\"hex\">\n\t<c path=\"Int\"/>\n\t<c path=\"Color\"/>\n</f></fromHex>\n\t<scaleRGB public=\"1\" set=\"method\" line=\"28\"><f a=\"factor\">\n\t<c path=\"Float\"/>\n\t<e path=\"Void\"/>\n</f></scaleRGB>\n\t<mixFrom public=\"1\" set=\"method\" line=\"35\"><f a=\"color1:color2:color1Mix\">\n\t<c path=\"Color\"/>\n\t<c path=\"Color\"/>\n\t<c path=\"Float\"/>\n\t<e path=\"Void\"/>\n</f></mixFrom>\n\t<toContextRGB public=\"1\" set=\"method\" line=\"50\"><f a=\"\"><c path=\"String\"/></f></toContextRGB>\n\t<toContextRGBA public=\"1\" set=\"method\" line=\"55\"><f a=\"\"><c path=\"String\"/></f></toContextRGBA>\n\t<clone public=\"1\" set=\"method\" line=\"60\"><f a=\"\"><c path=\"Color\"/></f></clone>\n\t<toString public=\"1\" set=\"method\" line=\"65\"><f a=\"\"><c path=\"String\"/></f></toString>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"?r:?g:?b:?a\">\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<e path=\"Void\"/>\n</f></new>\n</class>";
Log.filters = new Array();
Log.args = new Array();
Log.errors = new Array();
LogLevel.INFO = new LogLevel(1);
LogLevel.WARN = new LogLevel(2);
LogLevel.ERROR = new LogLevel(3);
LogLevel.OFF = new LogLevel(4);
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
Xml.enode = new EReg("^<([a-zA-Z0-9:._-]+)","");
Xml.ecdata = new EReg("^<!\\[CDATA\\[","i");
Xml.edoctype = new EReg("^<!DOCTYPE ","i");
Xml.eend = new EReg("^</([a-zA-Z0-9:._-]+)>","");
Xml.epcdata = new EReg("^[^<]+","");
Xml.ecomment = new EReg("^<!--","");
Xml.eprolog = new EReg("^<\\?[^\\?]+\\?>","");
Xml.eattribute = new EReg("^\\s*([a-zA-Z0-9:_-]+)\\s*=\\s*([\"'])([^\\2]*?)\\2","");
Xml.eclose = new EReg("^[ \r\n\t]*(>|(/>))","");
Xml.ecdata_end = new EReg("\\]\\]>","");
Xml.edoctype_elt = new EReg("[\\[|\\]>]","");
Xml.ecomment_end = new EReg("-->","");
bpmjs.Sequencer.__meta__ = { fields : { context : { Inject : null}}};
bpmjs.Sequencer.__rtti = "<class path=\"bpmjs.Sequencer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<context public=\"1\"><c path=\"bpmjs.Context\"/></context>\n\t<start public=\"1\" set=\"method\" line=\"14\"><f a=\"name\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></start>\n\t<new public=\"1\" set=\"method\" line=\"12\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
hsl.haxe._DirectSignaler.PropagationStatus.IMMEDIATELY_STOPPED = 1;
hsl.haxe._DirectSignaler.PropagationStatus.STOPPED = 2;
hsl.haxe._DirectSignaler.PropagationStatus.UNDISTURBED = 3;
js.Lib.onerror = null;
kumite.launch.Config.__rtti = "<class path=\"kumite.launch.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<sequencer public=\"1\"><c path=\"bpmjs.Sequencer\"/></sequencer>\n\t<launcher public=\"1\"><c path=\"kumite.launch.Launcher\"/></launcher>\n\t<preloadDisplay public=\"1\"><c path=\"kumite.launch.PreloadDisplay\"/></preloadDisplay>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.launch.Launcher.__meta__ = { fields : { sequencer : { Inject : null}, handlePostComplete : { PostComplete : null}, showError : { Sequence : ["boot","error"]}, handleFinish : { Sequence : ["boot","finish"]}}};
kumite.launch.Launcher.__rtti = "<class path=\"kumite.launch.Launcher\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<sequencer public=\"1\"><c path=\"bpmjs.Sequencer\"/></sequencer>\n\t<handlePostComplete public=\"1\" set=\"method\" line=\"17\"><f a=\"\"><e path=\"Void\"/></f></handlePostComplete>\n\t<showError public=\"1\" set=\"method\" line=\"24\"><f a=\"message\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></showError>\n\t<handleFinish public=\"1\" set=\"method\" line=\"30\"><f a=\"\"><e path=\"Void\"/></f></handleFinish>\n\t<new public=\"1\" set=\"method\" line=\"14\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.launch.PreloadDisplay.__meta__ = { fields : { complete : { Complete : null}, bootMonitor : { Sequence : ["boot","monitor"]}, bootStartComplete : { Sequence : ["boot","startComplete"]}}};
kumite.launch.PreloadDisplay.__rtti = "<class path=\"kumite.launch.PreloadDisplay\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<preloaderDiv><t path=\"js.HtmlDom\"/></preloaderDiv>\n\t<complete public=\"1\" set=\"method\" line=\"16\"><f a=\"\"><e path=\"Void\"/></f></complete>\n\t<bootMonitor public=\"1\" set=\"method\" line=\"24\"><f a=\"monitor\">\n\t<c path=\"bpmjs.ProgressMonitor\"/>\n\t<e path=\"Void\"/>\n</f></bootMonitor>\n\t<bootStartComplete public=\"1\" set=\"method\" line=\"46\"><f a=\"\"><e path=\"Void\"/></f></bootStartComplete>\n\t<removePreloader set=\"method\" line=\"56\"><f a=\"\"><e path=\"Void\"/></f></removePreloader>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.presentation.ContainerSlide.__meta__ = { fields : { stage : { Inject : null}, time : { Inject : null}, init : { Sequence : ["boot","init"]}, tick : { Message : null}}};
kumite.presentation.ContainerSlide.__rtti = "<class path=\"kumite.presentation.ContainerSlide\" params=\"\">\n\t<extends path=\"kumite.presentation.Slide\"/>\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage><c path=\"kumite.stage.Stage\"/></stage>\n\t<time><c path=\"kumite.time.Time\"/></time>\n\t<slides><c path=\"Array\"><c path=\"kumite.presentation.Slide\"/></c></slides>\n\t<color><c path=\"Color\"/></color>\n\t<canvas><c path=\"CanvasGraphic\"/></canvas>\n\t<slideIndex><c path=\"Int\"/></slideIndex>\n\t<visualSlideIndex><c path=\"Motion\"/></visualSlideIndex>\n\t<container><t path=\"js.HtmlDom\"/></container>\n\t<slidingContainer><t path=\"js.HtmlDom\"/></slidingContainer>\n\t<addSlide public=\"1\" set=\"method\" line=\"49\"><f a=\"slide\">\n\t<c path=\"kumite.presentation.Slide\"/>\n\t<c path=\"kumite.presentation.ContainerSlide\"/>\n</f></addSlide>\n\t<init public=\"1\" set=\"method\" line=\"56\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<prepare public=\"1\" set=\"method\" line=\"62\" override=\"1\"><f a=\"root\">\n\t<t path=\"js.HtmlDom\"/>\n\t<e path=\"Void\"/>\n</f></prepare>\n\t<resize public=\"1\" set=\"method\" line=\"84\" override=\"1\"><f a=\"stage\">\n\t<c path=\"kumite.stage.Stage\"/>\n\t<e path=\"Void\"/>\n</f></resize>\n\t<tick public=\"1\" set=\"method\" line=\"97\"><f a=\"tick\">\n\t<c path=\"kumite.time.Tick\"/>\n\t<e path=\"Void\"/>\n</f></tick>\n\t<getMemento public=\"1\" set=\"method\" line=\"103\" override=\"1\"><f a=\"\"><c path=\"Int\"/></f></getMemento>\n\t<setMemento public=\"1\" set=\"method\" line=\"108\" override=\"1\"><f a=\"memento\">\n\t<d/>\n\t<e path=\"Void\"/>\n</f></setMemento>\n\t<gotoNextSlide set=\"method\" line=\"117\"><f a=\"_\">\n\t<unknown/>\n\t<e path=\"Void\"/>\n</f></gotoNextSlide>\n\t<changeSlide set=\"method\" line=\"122\"><f a=\"newIndex\">\n\t<c path=\"Int\"/>\n\t<e path=\"Void\"/>\n</f></changeSlide>\n\t<goNext public=\"1\" set=\"method\" line=\"128\" override=\"1\"><f a=\"\"><e path=\"Void\"/></f></goNext>\n\t<goPrev public=\"1\" set=\"method\" line=\"136\" override=\"1\"><f a=\"\"><e path=\"Void\"/></f></goPrev>\n\t<new public=\"1\" set=\"method\" line=\"30\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.presentation.Presentation.__meta__ = { fields : { complete : { Sequence : ["boot","init"]}}};
kumite.presentation.Presentation.__rtti = "<class path=\"kumite.presentation.Presentation\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<slides public=\"1\"><c path=\"Array\"><c path=\"kumite.presentation.Slide\"/></c></slides>\n\t<currentSlideIndex public=\"1\"><c path=\"Int\"/></currentSlideIndex>\n\t<complete set=\"method\" line=\"19\"><f a=\"\"><e path=\"Void\"/></f></complete>\n\t<goNext public=\"1\" set=\"method\" line=\"25\"><f a=\"\"><e path=\"Void\"/></f></goNext>\n\t<goPrev public=\"1\" set=\"method\" line=\"30\"><f a=\"\"><e path=\"Void\"/></f></goPrev>\n\t<getMemento public=\"1\" set=\"method\" line=\"35\"><f a=\"\"><a>\n\t<i><c path=\"Int\"/></i>\n\t<a><c path=\"Array\"><c path=\"Int\"/></c></a>\n</a></f></getMemento>\n\t<setMemento public=\"1\" set=\"method\" line=\"46\"><f a=\"memento\">\n\t<a>\n\t\t<i><c path=\"Int\"/></i>\n\t\t<a><c path=\"Array\"><d/></c></a>\n\t</a>\n\t<e path=\"Void\"/>\n</f></setMemento>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.presentation.PresentationConfig.__rtti = "<class path=\"kumite.presentation.PresentationConfig\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<presentation><c path=\"kumite.presentation.Presentation\"/></presentation>\n\t<slideNavigator><c path=\"kumite.presentation.SlideNavigator\"/></slideNavigator>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.presentation.SlideNavigator.__meta__ = { fields : { stage : { Inject : null}, time : { Inject : null}, presentation : { Inject : null}, start : { Sequence : ["boot","start"]}, startComplete : { Sequence : ["boot","start"]}, handleResize : { Message : null}, handleTick : { Message : null}}};
kumite.presentation.SlideNavigator.__rtti = "<class path=\"kumite.presentation.SlideNavigator\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage><c path=\"kumite.stage.Stage\"/></stage>\n\t<time><c path=\"kumite.time.Time\"/></time>\n\t<presentation><c path=\"kumite.presentation.Presentation\"/></presentation>\n\t<currentHash><c path=\"String\"/></currentHash>\n\t<autoScroll><e path=\"Bool\"/></autoScroll>\n\t<root><t path=\"js.HtmlDom\"/></root>\n\t<speed><c path=\"Float\"/></speed>\n\t<scrollTop><c path=\"Float\"/></scrollTop>\n\t<targetPosition><c path=\"Int\"/></targetPosition>\n\t<lastScrollTop><c path=\"Int\"/></lastScrollTop>\n\t<lastScrollTopEqualTime><c path=\"Float\"/></lastScrollTopEqualTime>\n\t<leftNav><t path=\"js.HtmlDom\"/></leftNav>\n\t<leftNavMotion><c path=\"Motion\"/></leftNavMotion>\n\t<rightNav><t path=\"js.HtmlDom\"/></rightNav>\n\t<rightNavMotion><c path=\"Motion\"/></rightNavMotion>\n\t<mouseX><c path=\"Int\"/></mouseX>\n\t<mouseY><c path=\"Int\"/></mouseY>\n\t<start set=\"method\" line=\"54\"><f a=\"\"><e path=\"Void\"/></f></start>\n\t<startComplete set=\"method\" line=\"105\"><f a=\"\"><e path=\"Void\"/></f></startComplete>\n\t<handleResize set=\"method\" line=\"113\"><f a=\"message\">\n\t<c path=\"kumite.stage.StageResizeMessage\"/>\n\t<e path=\"Void\"/>\n</f></handleResize>\n\t<handleTick set=\"method\" line=\"119\"><f a=\"tick\">\n\t<c path=\"kumite.time.Tick\"/>\n\t<e path=\"Void\"/>\n</f></handleTick>\n\t<resize set=\"method\" line=\"183\"><f a=\"\"><e path=\"Void\"/></f></resize>\n\t<getMemento set=\"method\" line=\"197\"><f a=\"\"><a>\n\t<i><c path=\"Int\"/></i>\n\t<a><c path=\"Array\"><c path=\"Int\"/></c></a>\n</a></f></getMemento>\n\t<setMementoFromUrl set=\"method\" line=\"202\"><f a=\"\"><e path=\"Void\"/></f></setMementoFromUrl>\n\t<targetCurrentSlide set=\"method\" line=\"218\"><f a=\"\"><e path=\"Void\"/></f></targetCurrentSlide>\n\t<slideRowFinishedNext set=\"method\" line=\"225\"><f a=\"_\">\n\t<c path=\"kumite.presentation.Slide\"/>\n\t<e path=\"Void\"/>\n</f></slideRowFinishedNext>\n\t<slideRowFinishedPrev set=\"method\" line=\"234\"><f a=\"_\">\n\t<c path=\"kumite.presentation.Slide\"/>\n\t<e path=\"Void\"/>\n</f></slideRowFinishedPrev>\n\t<onMouseMove set=\"method\" line=\"243\"><f a=\"e\">\n\t<d/>\n\t<e path=\"Void\"/>\n</f></onMouseMove>\n\t<onKeyDown set=\"method\" line=\"249\"><f a=\"e\">\n\t<d/>\n\t<e path=\"Void\"/>\n</f></onKeyDown>\n\t<handleLeftClick set=\"method\" line=\"261\"><f a=\"_\">\n\t<t path=\"js.Event\"/>\n\t<e path=\"Void\"/>\n</f></handleLeftClick>\n\t<handleRightClick set=\"method\" line=\"266\"><f a=\"_\">\n\t<t path=\"js.Event\"/>\n\t<e path=\"Void\"/>\n</f></handleRightClick>\n\t<new public=\"1\" set=\"method\" line=\"42\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.presentation.SpriteSlide.__meta__ = { fields : { stage : { Inject : null}, loadImage : { Sequence : ["boot","init"]}}};
kumite.presentation.SpriteSlide.__rtti = "<class path=\"kumite.presentation.SpriteSlide\" params=\"\">\n\t<extends path=\"kumite.presentation.Slide\"/>\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage><c path=\"kumite.stage.Stage\"/></stage>\n\t<hitareas><c path=\"Array\"><c path=\"kumite.presentation._SpriteSlide.HitareaAndDiv\"/></c></hitareas>\n\t<container><t path=\"js.HtmlDom\"/></container>\n\t<imageTask><c path=\"bpmjs.ImageLoaderTask\"/></imageTask>\n\t<location><c path=\"String\"/></location>\n\t<addHitArea public=\"1\" set=\"method\" line=\"34\"><f a=\"x:y:width:height:location\">\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"String\"/>\n\t<c path=\"kumite.presentation.SpriteSlide\"/>\n</f></addHitArea>\n\t<loadImage public=\"1\" set=\"method\" line=\"51\"><f a=\"\"><c path=\"bpmjs.ImageLoaderTask\"/></f></loadImage>\n\t<prepare public=\"1\" set=\"method\" line=\"58\" override=\"1\"><f a=\"root\">\n\t<t path=\"js.HtmlDom\"/>\n\t<e path=\"Void\"/>\n</f></prepare>\n\t<resize public=\"1\" set=\"method\" line=\"76\" override=\"1\"><f a=\"stage\">\n\t<c path=\"kumite.stage.Stage\"/>\n\t<e path=\"Void\"/>\n</f></resize>\n\t<getTransform set=\"method\" line=\"118\"><f a=\"\"><a>\n\t<y><c path=\"Float\"/></y>\n\t<x><c path=\"Float\"/></x>\n\t<scale><c path=\"Float\"/></scale>\n</a></f></getTransform>\n\t<handleImageLoaded set=\"method\" line=\"148\"><f a=\"_\">\n\t<c path=\"bpmjs.ImageLoaderTask\"/>\n\t<e path=\"Void\"/>\n</f></handleImageLoaded>\n\t<removeFrom public=\"1\" set=\"method\" line=\"154\" override=\"1\"><f a=\"root\">\n\t<t path=\"js.HtmlDom\"/>\n\t<e path=\"Void\"/>\n</f></removeFrom>\n\t<new public=\"1\" set=\"method\" line=\"24\"><f a=\"location\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></new>\n</class>";
kumite.stage.Config.__rtti = "<class path=\"kumite.stage.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<stageResizeAction public=\"1\"><c path=\"kumite.stage.StageResizeAction\"/></stageResizeAction>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.stage.StageResizeAction.__meta__ = { fields : { messenger : { Messenger : null}, stage : { Inject : null}, initPrepare : { Sequence : ["boot","initPrepare"]}, startComplete : { Sequence : ["boot","startComplete"]}}};
kumite.stage.StageResizeAction.__rtti = "<class path=\"kumite.stage.StageResizeAction\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<messenger public=\"1\"><c path=\"bpmjs.Messenger\"/></messenger>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<initPrepare public=\"1\" set=\"method\" line=\"21\"><f a=\"\"><e path=\"Void\"/></f></initPrepare>\n\t<startComplete public=\"1\" set=\"method\" line=\"27\"><f a=\"\"><e path=\"Void\"/></f></startComplete>\n\t<timerUpdate set=\"method\" line=\"33\"><f a=\"\"><e path=\"Void\"/></f></timerUpdate>\n\t<onResize set=\"method\" line=\"39\"><f a=\"?event\">\n\t<t path=\"js.Event\"/>\n\t<e path=\"Void\"/>\n</f></onResize>\n\t<updateSize set=\"method\" line=\"45\"><f a=\"\"><e path=\"Void\"/></f></updateSize>\n\t<sendResizeMessage set=\"method\" line=\"51\"><f a=\"\"><e path=\"Void\"/></f></sendResizeMessage>\n\t<new public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.time.Config.__rtti = "<class path=\"kumite.time.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<timeController public=\"1\"><c path=\"kumite.time.TimeController\"/></timeController>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.time.Time.EXPECTED_FRAMERATE = 60;
kumite.time.TimeController.__meta__ = { fields : { time : { Inject : null}, messenger : { Messenger : null}, startComplete : { Sequence : ["boot","startComplete"]}}};
kumite.time.TimeController.__rtti = "<class path=\"kumite.time.TimeController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<messenger public=\"1\"><c path=\"bpmjs.Messenger\"/></messenger>\n\t<startComplete public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></startComplete>\n\t<timerUpdate set=\"method\" line=\"24\"><f a=\"\"><e path=\"Void\"/></f></timerUpdate>\n\t<new public=\"1\" set=\"method\" line=\"15\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
reflect.ClassInfo.cache = new Hash();
Main.main();
})()
//@ sourceMappingURL=Main.js.map