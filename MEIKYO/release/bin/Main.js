var $hxClasses = $hxClasses || {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var CanvasGraphic = $hxClasses["CanvasGraphic"] = function() {
	this.canvas = js.Lib.document.createElement("canvas");
	this.context = this.canvas.getContext("2d");
	this.setWidth(0);
	this.setHeight(0);
};
CanvasGraphic.__name__ = ["CanvasGraphic"];
CanvasGraphic.prototype = {
	setHeight: function(height) {
		if(this.height == height) return height;
		this.height = height;
		this.clear();
		return height;
	}
	,setWidth: function(width) {
		if(this.width == width) return width;
		this.width = width;
		this.clear();
		return width;
	}
	,setFillStyle: function(value) {
		if(js.Boot.__instanceof(value,Color)) this.context.fillStyle = (js.Boot.__cast(value , Color)).toContextRGBA();
		return value;
	}
	,setFont: function(value) {
		this.context.font = value;
		return value;
	}
	,drawImage2: function(image,dx,dy) {
		this.context.drawImage(image,dx,dy);
	}
	,drawImage: function(image,dx,dy,dw,dh) {
		this.context.drawImage(image,dx,dy,dw,dh);
	}
	,fillText: function(text,x,y,maxWidth) {
		if(text == null) text = "null";
		this.context.fillText(text,x,y);
		this.isInvalid = true;
	}
	,fillRect: function(x,y,width,height) {
		this.context.fillRect(x,y,width,height);
		this.isInvalid = true;
	}
	,clear: function(color) {
		this.canvas.width = Math2.nextPowerOf2(this.width);
		this.canvas.height = Math2.nextPowerOf2(this.height);
		this.context.fillStyle = "rgba(0, 0, 255, 0)";
		this.context.fillRect(0,0,this.canvas.width,this.canvas.width);
		this.context.fillStyle = color == null?"rgba(0, 0, 0, 0)":color.toContextRGBA();
		this.context.fillRect(0,0,this.width,this.height);
		this.isInvalid = true;
	}
	,context: null
	,canvas: null
	,isInvalid: null
	,font: null
	,fillStyle: null
	,height: null
	,width: null
	,__class__: CanvasGraphic
	,__properties__: {set_width:"setWidth",set_height:"setHeight",set_fillStyle:"setFillStyle",set_font:"setFont"}
}
var Clamp = $hxClasses["Clamp"] = function() { }
Clamp.__name__ = ["Clamp"];
Clamp["float"] = function(value,from,to) {
	if(value < from) value = from;
	if(value > to) value = to;
	return value;
}
Clamp["int"] = function(value,from,to) {
	if(value < from) value = from;
	if(value > to) value = to;
	return value;
}
var haxe = haxe || {}
if(!haxe.rtti) haxe.rtti = {}
haxe.rtti.Infos = $hxClasses["haxe.rtti.Infos"] = function() { }
haxe.rtti.Infos.__name__ = ["haxe","rtti","Infos"];
var Color = $hxClasses["Color"] = function(r,g,b,a) {
	if(a == null) a = 1.0;
	if(b == null) b = 1.0;
	if(g == null) g = 0.0;
	if(r == null) r = 1.0;
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
};
Color.__name__ = ["Color"];
Color.__interfaces__ = [haxe.rtti.Infos];
Color.prototype = {
	toString: function() {
		return "Color: " + this.r + "," + this.g + "," + this.b + "," + this.a;
	}
	,clone: function() {
		return new Color(this.r,this.g,this.b,this.a);
	}
	,toContextRGBA: function() {
		return "rgba(" + (this.r * 255 | 0) + "," + (this.g * 255 | 0) + "," + (this.b * 255 | 0) + "," + this.a + ")";
	}
	,toContextRGB: function() {
		return "rgb(" + this.r * 255 + "," + this.g * 255 + "," + this.b * 255 + ")";
	}
	,mixFrom: function(color1,color2,color1Mix) {
		if(color1Mix < 0) color1Mix = 0;
		if(color1Mix > 1) color1Mix = 1;
		var color2Mix = 1 - color1Mix;
		this.r = color1.r * color1Mix + color2.r * color2Mix;
		this.g = color1.g * color1Mix + color2.g * color2Mix;
		this.b = color1.b * color1Mix + color2.b * color2Mix;
	}
	,scaleRGB: function(factor) {
		this.r *= factor;
		this.g *= factor;
		this.b *= factor;
	}
	,fromHex: function(hex) {
		this.r = (hex >> 16 & 255) / 255;
		this.g = (hex >> 8 & 255) / 255;
		this.b = (hex & 255) / 255;
		this.a = 1.0;
		return this;
	}
	,a: null
	,b: null
	,g: null
	,r: null
	,__class__: Color
}
var EReg = $hxClasses["EReg"] = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	customReplace: function(s,f) {
		var buf = new StringBuf();
		while(true) {
			if(!this.match(s)) break;
			buf.b += Std.string(this.matchedLeft());
			buf.b += Std.string(f(this));
			s = this.matchedRight();
		}
		buf.b += Std.string(s);
		return buf.b;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw "No string matched";
		return this.r.s.substr(0,this.r.m.index);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,r: null
	,__class__: EReg
}
var LogFilter = $hxClasses["LogFilter"] = function() { }
LogFilter.__name__ = ["LogFilter"];
LogFilter.prototype = {
	enabled: null
	,__class__: LogFilter
}
var ERegFilter = $hxClasses["ERegFilter"] = function(level,r) {
	this.level = level;
	this.r = r;
};
ERegFilter.__name__ = ["ERegFilter"];
ERegFilter.__interfaces__ = [LogFilter];
ERegFilter.prototype = {
	enabled: function(input,i,level) {
		var sender = i.className + "." + i.methodName;
		var matches = this.r.match(sender);
		if(!matches) return input;
		return matches && this.level.isSmallerOrEqual(level);
	}
	,r: null
	,level: null
	,__class__: ERegFilter
}
var GL = $hxClasses["GL"] = function() { }
GL.__name__ = ["GL"];
GL.gl = null;
GL.currentProgramm = null;
GL.init = function(canvas,antialias) {
	var params = { antialias : antialias};
	GL.gl = canvas.getContext("webg",params);
	if(GL.gl == null) GL.gl = canvas.getContext("experimental-webgl",params);
	if(GL.gl == null) throw "Could not initialise WebGL.";
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
GL.createFragmentProgram = function(fragmentSourceClass) {
	GL.currentProgramm = GL.gl.createProgram();
	var fs = GL.gl.createShader(GL.gl.FRAGMENT_SHADER);
	GL.gl.shaderSource(fs,GL.createGLSLFromClass(fragmentSourceClass));
	GL.gl.compileShader(fs);
	if(!GL.gl.getShaderParameter(fs,GL.gl.COMPILE_STATUS)) throw GL.gl.getShaderInfoLog(fs);
	GL.gl.attachShader(GL.currentProgramm,fs);
	GL.gl.linkProgram(GL.currentProgramm);
	if(!GL.gl.getProgramParameter(GL.currentProgramm,GL.gl.LINK_STATUS)) throw "Could not link shader!";
	return GL.currentProgramm;
}
GL.createGLSLFromClass = function(shaderClass) {
	var metaDatas = haxe.rtti.Meta.getType(shaderClass);
	var glsl = Reflect.field(metaDatas,"GLSL");
	if(glsl.length != 1) throw "Missing GLSL metadata in shader class: " + Std.string(shaderClass);
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
	if(location == null) haxe.Log.trace("Could not find " + name + " in shader",{ fileName : "GL.hx", lineNumber : 478, className : "GL", methodName : "getUniformLocation"});
	var result = new GLUniformLocation();
	result.location = location;
	return result;
}
GL.getAttribLocation2 = function(name,size,type) {
	var location = GL.gl.getAttribLocation(GL.currentProgramm,name);
	if(location == null || location == -1) {
		Log.posInfo = { fileName : "GL.hx", lineNumber : 489, className : "GL", methodName : "getAttribLocation2"};
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
var GLAnimationFrame = $hxClasses["GLAnimationFrame"] = function() { }
GLAnimationFrame.__name__ = ["GLAnimationFrame"];
GLAnimationFrame.run = function(method,ms) {
	if(ms == null) ms = 0;
	var secureMethod = function() {
		try {
			method();
		} catch( e ) {
			Log.posInfo = { fileName : "GLAnimationFrame.hx", lineNumber : 16, className : "GLAnimationFrame", methodName : "run"};
			if(Log.filter(LogLevel.ERROR)) {
				Log.fetchInput("Error executing GLAnimationFrame: " + Std.string(e),null,null,null,null,null,null);
				console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
			}
		}
	};
	if(ms == 0) {
		var window = js.Lib.window;
		var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
		if(requestAnimationFrame == null) {
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
		var timer = new haxe.Timer(1000 / ms | 0);
		timer.run = secureMethod;
	}
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
var GLAttribLocation = $hxClasses["GLAttribLocation"] = function() {
};
GLAttribLocation.__name__ = ["GLAttribLocation"];
GLAttribLocation.prototype = {
	drawArrays: function(mode,first,count) {
		if(first == null) first = 0;
		if(count == null) {
			count = this.currentLength / this.size;
			if(this.type == 5126) count /= 4;
		}
		GL.gl.drawArrays(mode,first,count);
	}
	,vertexAttribPointer: function() {
		GL.gl.bindBuffer(34962,this.buffer);
		GL.gl.enableVertexAttribArray(this.location);
		GL.gl.vertexAttribPointer(this.location,this.size,this.type,false,0,0);
	}
	,updateBuffer3: function(arrayBufferView) {
		GL.gl.bindBuffer(34962,this.buffer);
		GL.gl.bufferSubData(34962,0,arrayBufferView);
	}
	,updateBuffer2: function(arrayBufferView,type) {
		if(type == null) type = 35044;
		GL.gl.bindBuffer(34962,this.buffer);
		GL.gl.bufferData(34962,arrayBufferView,type);
	}
	,updateBuffer: function(arrayBufferView,type) {
		if(type == null) type = 35044;
		if(this.buffer != null) GL.gl.deleteBuffer(this.buffer);
		this.currentLength = arrayBufferView.byteLength;
		this.buffer = GL.createArrayBuffer(arrayBufferView,type);
	}
	,currentLength: null
	,buffer: null
	,type: null
	,size: null
	,location: null
	,__class__: GLAttribLocation
}
var GLCursorClient = $hxClasses["GLCursorClient"] = function() {
	this.lastCursor = "";
};
GLCursorClient.__name__ = ["GLCursorClient"];
GLCursorClient.prototype = {
	handCursor: function() {
		if(this.lastCursor != GLCursorClient.HAND) {
			this.lastCursor = GLCursorClient.HAND;
			GLMouseRegistry.getInstance().setCursor(this.lastCursor);
		}
	}
	,defaultCursor: function() {
		if(this.lastCursor != GLCursorClient.DEFAULT) {
			this.lastCursor = GLCursorClient.DEFAULT;
			GLMouseRegistry.getInstance().setCursor(this.lastCursor);
		}
	}
	,lastCursor: null
	,__class__: GLCursorClient
}
var GLDisplayList = $hxClasses["GLDisplayList"] = function() {
	this.lastFrameTime = new Date().getTime();
	this.startTime = this.lastFrameTime;
	this.enterFrameSignaler = new hsl.haxe.DirectSignaler(this);
	this.hitareaPicker = new GLHitareaPicker();
	GLMouseRegistry.getInstance().mouseUpSignaler.bind($bind(this,this.handleMouseUp));
	GLMouseRegistry.getInstance().mouseDownSignaler.bind($bind(this,this.handleMouseDown));
	GLMouseRegistry.getInstance().mouseMoveSignaler.bind($bind(this,this.handleMouseMove));
	this.cursorClient = GLMouseRegistry.getInstance().createCursorClient();
};
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
GLDisplayList.prototype = {
	handleMouseMove: function(position) {
		var result = this.hitareaPicker.pick(this.stage,position);
		if(result != null && result.handCursor) this.cursorClient.handCursor(); else this.cursorClient.defaultCursor();
	}
	,handleMouseUp: function(position) {
		var result = this.hitareaPicker.pick(this.stage,position);
		if(result != null) result.mouseUpSignaler.dispatch(result,null,{ fileName : "GLDisplayList.hx", lineNumber : 88, className : "GLDisplayList", methodName : "handleMouseUp"});
	}
	,handleMouseDown: function(position) {
		var result = this.hitareaPicker.pick(this.stage,position);
		if(result != null) result.mouseDownSignaler.dispatch(result,null,{ fileName : "GLDisplayList.hx", lineNumber : 79, className : "GLDisplayList", methodName : "handleMouseDown"});
	}
	,dispatchEnterFrame: function() {
		var time = new Date().getTime();
		var frame = new GLFrame();
		frame.time = time;
		frame.timer = time - this.startTime;
		frame.frameTime = time - this.lastFrameTime;
		this.lastFrameTime = time;
		this.enterFrameSignaler.dispatch(frame,null,{ fileName : "GLDisplayList.hx", lineNumber : 71, className : "GLDisplayList", methodName : "dispatchEnterFrame"});
	}
	,setStageSize: function(width,height) {
		this.stage.stageWidth = width;
		this.stage.stageHeight = height;
	}
	,initInteractiveObject: function(interactiveObject) {
		interactiveObject.mouseUpSignaler = new hsl.haxe.DirectSignaler(this);
		interactiveObject.mouseDownSignaler = new hsl.haxe.DirectSignaler(this);
	}
	,initDisplayObject: function(displayObject) {
		displayObject.stage = this.stage;
		displayObject.enterFrameSignaler = this.enterFrameSignaler;
	}
	,enterFrameSignaler: null
	,cursorClient: null
	,startTime: null
	,lastFrameTime: null
	,hitareaPicker: null
	,stage: null
	,__class__: GLDisplayList
}
var GLDisplayListRenderer = $hxClasses["GLDisplayListRenderer"] = function() {
	this.textures = new IntHash();
};
GLDisplayListRenderer.__name__ = ["GLDisplayListRenderer"];
GLDisplayListRenderer.prototype = {
	renderDisplayObject: function(displayObject,parentMatrix,alpha) {
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
		} else {
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
	,renderRecursive: function(displayObjectContainer,parentMatrix,alpha) {
		var _g = 0, _g1 = displayObjectContainer.children;
		while(_g < _g1.length) {
			var displayObject = _g1[_g];
			++_g;
			if(!displayObject.visible) continue;
			var matrix = this.renderDisplayObject(displayObject,parentMatrix,alpha);
			if(js.Boot.__instanceof(displayObject,GLDisplayObjectContainer)) this.renderRecursive(displayObject,matrix,alpha * displayObject.alpha);
		}
	}
	,render: function(width,height) {
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
	,init: function() {
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
	,textures: null
	,alphaUniform: null
	,sizeUniform: null
	,objectMatrixUniform: null
	,projectionMatrixUniform: null
	,textureUniform: null
	,vertexBuffer: null
	,vertexPositionAttribute: null
	,shaderProgram: null
	,__class__: GLDisplayListRenderer
}
var GLDisplayObject = $hxClasses["GLDisplayObject"] = function() {
	if(GLDisplayObject.nextId == null) GLDisplayObject.nextId = 0;
	this.id = GLDisplayObject.nextId;
	GLDisplayObject.nextId++;
	GLDisplayList.getDefault().initDisplayObject(this);
	this.skipDraw = false;
	this.visible = true;
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
};
GLDisplayObject.__name__ = ["GLDisplayObject"];
GLDisplayObject.nextId = null;
GLDisplayObject.prototype = {
	setGraphicIsInvalid: function(value) {
		this.graphic.isInvalid = value;
		return value;
	}
	,getGraphicIsInvalid: function() {
		return this.graphic.isInvalid;
	}
	,setHeight: function(value) {
		if(this.height != value) {
			this.height = value;
			this.graphic.setHeight(this.height);
			this.transformIsInvalid = true;
		}
		return value;
	}
	,setWidth: function(value) {
		if(this.width != value) {
			this.width = value;
			this.graphic.setWidth(this.width);
			this.transformIsInvalid = true;
		}
		return value;
	}
	,setScaleY: function(value) {
		if(this.scaleY != value) {
			this.scaleY = value;
			this.transformIsInvalid = true;
		}
		return value;
	}
	,setScaleX: function(value) {
		if(this.scaleX != value) {
			this.scaleX = value;
			this.transformIsInvalid = true;
		}
		return value;
	}
	,setY: function(value) {
		if(this.y != value) {
			this.y = value;
			this.transformIsInvalid = true;
		}
		return value;
	}
	,setX: function(value) {
		if(this.x != value) {
			this.x = value;
			this.transformIsInvalid = true;
		}
		return value;
	}
	,toString: function() {
		return "DisplayObject: " + this.id;
	}
	,validateGraphics: function() {
		this.setGraphicIsInvalid(false);
	}
	,validateTransform: function() {
		if(this.transformIsInvalid) {
			this.graphic.setWidth(this.width);
			this.graphic.setHeight(this.height);
			this.transformIsInvalid = false;
			this.matrix.setIdentity();
			this.matrix.appendTranslation(this.x,this.y,0);
			this.matrix.appendScale(this.scaleX,this.scaleY,1);
		}
	}
	,parent: null
	,graphic: null
	,enterFrameSignaler: null
	,matrix: null
	,graphicIsInvalid: null
	,transformIsInvalid: null
	,scaleY: null
	,scaleX: null
	,height: null
	,width: null
	,y: null
	,x: null
	,alpha: null
	,visible: null
	,skipDraw: null
	,stage: null
	,id: null
	,__class__: GLDisplayObject
	,__properties__: {set_x:"setX",set_y:"setY",set_width:"setWidth",set_height:"setHeight",set_scaleX:"setScaleX",set_scaleY:"setScaleY",set_graphicIsInvalid:"setGraphicIsInvalid",get_graphicIsInvalid:"getGraphicIsInvalid"}
}
var GLDisplayObjectContainer = $hxClasses["GLDisplayObjectContainer"] = function() {
	GLDisplayObject.call(this);
	this.children = new Array();
};
GLDisplayObjectContainer.__name__ = ["GLDisplayObjectContainer"];
GLDisplayObjectContainer.__super__ = GLDisplayObject;
GLDisplayObjectContainer.prototype = $extend(GLDisplayObject.prototype,{
	removeAllChildren: function() {
		this.children = new Array();
	}
	,removeChild: function(child) {
		HxOverrides.remove(this.children,child);
	}
	,addChild: function(child) {
		child.parent = this;
		this.children.push(child);
	}
	,children: null
	,__class__: GLDisplayObjectContainer
});
var GLFrame = $hxClasses["GLFrame"] = function() {
};
GLFrame.__name__ = ["GLFrame"];
GLFrame.prototype = {
	frameTime: null
	,timer: null
	,time: null
	,__class__: GLFrame
}
var GLFramebuffer = $hxClasses["GLFramebuffer"] = function() {
	GLTexture.call(this);
};
GLFramebuffer.__name__ = ["GLFramebuffer"];
GLFramebuffer.__super__ = GLTexture;
GLFramebuffer.prototype = $extend(GLTexture.prototype,{
	framebuffer: null
	,__class__: GLFramebuffer
});
var GLHitarea = $hxClasses["GLHitarea"] = function() {
	this.position = new Vec2();
	this.size = new Vec2();
};
GLHitarea.__name__ = ["GLHitarea"];
GLHitarea.prototype = {
	isUnder: function(matrix,positionOnStage) {
		var tl = this.position.clone();
		tl.transform(matrix);
		var br = this.size.clone();
		br.transform(matrix);
		return tl.x <= positionOnStage.x && br.x >= positionOnStage.x && tl.y <= positionOnStage.y && br.y >= positionOnStage.y;
	}
	,size: null
	,position: null
	,__class__: GLHitarea
}
var GLHitareaPicker = $hxClasses["GLHitareaPicker"] = function() {
};
GLHitareaPicker.__name__ = ["GLHitareaPicker"];
GLHitareaPicker.prototype = {
	pickDisplayObject: function(displayObject,parentMatrix) {
		displayObject.validateTransform();
		var result = new Matrix4();
		result.append(parentMatrix);
		result.append(displayObject.matrix);
		return result;
	}
	,pickRecursive: function(displayObjectContainer,parentMatrix) {
		var _g = 0, _g1 = displayObjectContainer.children;
		while(_g < _g1.length) {
			var displayObject = _g1[_g];
			++_g;
			if(!displayObject.visible) continue;
			var matrix = this.pickDisplayObject(displayObject,parentMatrix);
			if(js.Boot.__instanceof(displayObject,GLInteractiveObject)) {
				var interactiveObject = js.Boot.__cast(displayObject , GLInteractiveObject);
				if(interactiveObject.mouseEnabled && interactiveObject.hitarea.isUnder(matrix,this.stageMousePosition)) this.result = interactiveObject;
			}
			if(js.Boot.__instanceof(displayObject,GLDisplayObjectContainer)) this.pickRecursive(displayObject,matrix);
		}
	}
	,pick: function(stage,mousePosition) {
		this.stageMousePosition = mousePosition.clone();
		this.stageMousePosition.multiply(stage.stageWidth,stage.stageHeight);
		this.result = null;
		this.pickRecursive(stage,new Matrix4());
		return this.result;
	}
	,result: null
	,stageMousePosition: null
	,__class__: GLHitareaPicker
}
var GLInteractiveObject = $hxClasses["GLInteractiveObject"] = function() {
	this.mouseEnabled = false;
	this.handCursor = true;
	this.hitarea = new GLHitarea();
	this.hitarea.position.x = 0;
	this.hitarea.position.y = 0;
	GLDisplayObject.call(this);
	GLDisplayList.getDefault().initInteractiveObject(this);
	GLMouseRegistry.getInstance().mouseMoveSignaler.bind($bind(this,this.handleMouseMove));
};
GLInteractiveObject.__name__ = ["GLInteractiveObject"];
GLInteractiveObject.__super__ = GLDisplayObject;
GLInteractiveObject.prototype = $extend(GLDisplayObject.prototype,{
	setHeight: function(value) {
		var result = GLDisplayObject.prototype.setHeight.call(this,value);
		this.hitarea.size.y = result;
		return result;
	}
	,setWidth: function(value) {
		var result = GLDisplayObject.prototype.setWidth.call(this,value);
		this.hitarea.size.x = result;
		return result;
	}
	,handleMouseMove: function(position) {
		this.mouseXGlobal = this.mouseX = position.x * this.stage.stageWidth;
		this.mouseYGlobal = this.mouseY = position.y * this.stage.stageHeight;
		this.mouseX -= this.x;
		this.mouseY -= this.y;
		var localParent = this.parent;
		while(localParent != null) {
			this.mouseX -= localParent.x;
			this.mouseY -= localParent.y;
			localParent = localParent.parent;
		}
	}
	,mouseYGlobal: null
	,mouseXGlobal: null
	,mouseY: null
	,mouseX: null
	,mouseUpSignaler: null
	,mouseDownSignaler: null
	,handCursor: null
	,mouseEnabled: null
	,hitarea: null
	,__class__: GLInteractiveObject
});
var GLMouseRegistry = $hxClasses["GLMouseRegistry"] = function() {
	this.mouseDownSignaler = new hsl.haxe.DirectSignaler(this);
	this.mouseUpSignaler = new hsl.haxe.DirectSignaler(this);
	this.mouseMoveSignaler = new hsl.haxe.DirectSignaler(this);
};
GLMouseRegistry.__name__ = ["GLMouseRegistry"];
GLMouseRegistry.instance = null;
GLMouseRegistry.getInstance = function() {
	if(GLMouseRegistry.instance == null) GLMouseRegistry.instance = new GLMouseRegistry();
	return GLMouseRegistry.instance;
}
GLMouseRegistry.prototype = {
	getMousePosition: function(e) {
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		return new Vec2(mouseX / this.canvas.clientWidth,mouseY / this.canvas.clientHeight);
	}
	,onMouseMove: function(e) {
		try {
			this.mouseMoveSignaler.dispatch(this.getMousePosition(e),null,{ fileName : "GLMouseRegistry.hx", lineNumber : 76, className : "GLMouseRegistry", methodName : "onMouseMove"});
		} catch( e1 ) {
			Log.posInfo = { fileName : "GLMouseRegistry.hx", lineNumber : 80, className : "GLMouseRegistry", methodName : "onMouseMove"};
			if(Log.filter(LogLevel.WARN)) {
				Log.fetchInput(e1,null,null,null,null,null,null);
				console.warn(Log.createMessage());
			}
		}
	}
	,onMouseUp: function(e) {
		try {
			this.mouseUpSignaler.dispatch(this.getMousePosition(e),null,{ fileName : "GLMouseRegistry.hx", lineNumber : 64, className : "GLMouseRegistry", methodName : "onMouseUp"});
		} catch( e1 ) {
			Log.posInfo = { fileName : "GLMouseRegistry.hx", lineNumber : 68, className : "GLMouseRegistry", methodName : "onMouseUp"};
			if(Log.filter(LogLevel.WARN)) {
				Log.fetchInput(e1,null,null,null,null,null,null);
				console.warn(Log.createMessage());
			}
		}
	}
	,onMouseDown: function(e) {
		try {
			this.mouseDownSignaler.dispatch(this.getMousePosition(e),null,{ fileName : "GLMouseRegistry.hx", lineNumber : 52, className : "GLMouseRegistry", methodName : "onMouseDown"});
		} catch( e1 ) {
			Log.posInfo = { fileName : "GLMouseRegistry.hx", lineNumber : 56, className : "GLMouseRegistry", methodName : "onMouseDown"};
			if(Log.filter(LogLevel.WARN)) {
				Log.fetchInput(e1,null,null,null,null,null,null);
				console.warn(Log.createMessage());
			}
		}
	}
	,createCursorClient: function() {
		var client = new GLCursorClient();
		return client;
	}
	,setCursor: function(cursor) {
		this.canvas.style.cursor = cursor;
	}
	,init: function(canvas) {
		this.canvas = canvas;
		canvas.onmouseup = $bind(this,this.onMouseUp);
		canvas.onmousedown = $bind(this,this.onMouseDown);
		canvas.onmousemove = $bind(this,this.onMouseMove);
	}
	,canvas: null
	,mouseMoveSignaler: null
	,mouseUpSignaler: null
	,mouseDownSignaler: null
	,__class__: GLMouseRegistry
}
var GLStage = $hxClasses["GLStage"] = function() {
	GLDisplayObjectContainer.call(this);
};
GLStage.__name__ = ["GLStage"];
GLStage.__super__ = GLDisplayObjectContainer;
GLStage.prototype = $extend(GLDisplayObjectContainer.prototype,{
	stageHeight: null
	,stageWidth: null
	,__class__: GLStage
});
var GLTextureConfig = $hxClasses["GLTextureConfig"] = function() {
};
GLTextureConfig.__name__ = ["GLTextureConfig"];
GLTextureConfig.CROP = function(width,height) {
	return new _GLTextureConfig.CropManipulation(width,height);
}
GLTextureConfig.create = function(location,filter,textureManipulation) {
	if(filter == null) filter = 9728;
	var result = new GLTextureConfig();
	result.location = location;
	result.textureId = location;
	result.filter = filter;
	result.textureManipulation = textureManipulation;
	return result;
}
GLTextureConfig.createForFrameBuffer = function() {
	var result = new GLTextureConfig();
	result.location = "";
	result.textureId = "FRAMEBUFFER_" + GLTextureConfig.FRAMEBUFFER_ID;
	result.filter = 0;
	GLTextureConfig.FRAMEBUFFER_ID++;
	return result;
}
GLTextureConfig.prototype = {
	toString: function() {
		return "[GLTextureConfig: " + this.location + " ]";
	}
	,textureManipulation: null
	,filter: null
	,textureId: null
	,location: null
	,__class__: GLTextureConfig
}
var GLTextureAtlasConfig = $hxClasses["GLTextureAtlasConfig"] = function() {
	GLTextureConfig.call(this);
	this.parts = new Array();
};
GLTextureAtlasConfig.__name__ = ["GLTextureAtlasConfig"];
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
GLTextureAtlasConfig.__super__ = GLTextureConfig;
GLTextureAtlasConfig.prototype = $extend(GLTextureConfig.prototype,{
	toString: function() {
		return "[Atlas: " + this.parts.join(",") + " ]";
	}
	,add: function(part) {
		this.parts.push(part);
	}
	,parts: null
	,height: null
	,width: null
	,__class__: GLTextureAtlasConfig
});
var bpmjs = bpmjs || {}
bpmjs.Task = $hxClasses["bpmjs.Task"] = function() {
	this.startSignaler = new hsl.haxe.DirectSignaler(this);
	this.completeSignaler = new hsl.haxe.DirectSignaler(this);
	this.errorSignaler = new hsl.haxe.DirectSignaler(this);
	this.setMonitor(new bpmjs.ProgressMonitor());
};
bpmjs.Task.__name__ = ["bpmjs","Task"];
bpmjs.Task.prototype = {
	setMonitor: function(monitor) {
		this.monitor = monitor;
		return monitor;
	}
	,getMonitor: function() {
		return this.monitor;
	}
	,error: function(result,error) {
		var taskError = new bpmjs.TaskError();
		taskError.task = result;
		taskError.error = error;
		this.errorSignaler.dispatch(taskError,null,{ fileName : "Task.hx", lineNumber : 54, className : "bpmjs.Task", methodName : "error"});
	}
	,complete: function() {
		this.getMonitor().setCurrent(1);
		var t = this;
		this.completeSignaler.dispatch(t,null,{ fileName : "Task.hx", lineNumber : 46, className : "bpmjs.Task", methodName : "complete"});
	}
	,doStart: function() {
	}
	,start: function() {
		try {
			var t = this;
			this.startSignaler.dispatch(t,null,{ fileName : "Task.hx", lineNumber : 29, className : "bpmjs.Task", methodName : "start"});
			this.doStart();
		} catch( e ) {
			Log.posInfo = { fileName : "Task.hx", lineNumber : 34, className : "bpmjs.Task", methodName : "start"};
			if(Log.filter(LogLevel.ERROR)) {
				Log.fetchInput("Error starting Task: ",e,null,null,null,null,null);
				console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
			}
		}
	}
	,monitor: null
	,errorSignaler: null
	,completeSignaler: null
	,startSignaler: null
	,__class__: bpmjs.Task
	,__properties__: {set_monitor:"setMonitor",get_monitor:"getMonitor"}
}
var GLTextureAtlasLoadingTask = $hxClasses["GLTextureAtlasLoadingTask"] = function(textureRegistry,atlas) {
	bpmjs.Task.call(this);
	this.getMonitor().name = "GLTextureAtlasLoadingTask";
	if(textureRegistry == null) throw "TextureRegistry was null!";
	if(atlas == null) throw "GLTextureAtlasConfig was null!";
	this.textureRegistry = textureRegistry;
	this.atlas = atlas;
};
GLTextureAtlasLoadingTask.__name__ = ["GLTextureAtlasLoadingTask"];
GLTextureAtlasLoadingTask.__super__ = bpmjs.Task;
GLTextureAtlasLoadingTask.prototype = $extend(bpmjs.Task.prototype,{
	handleError: function(taskError) {
		this.error(this,taskError.error);
	}
	,handleComplete: function(group) {
		this.textureRegistry.register(this.atlas,this.textureRegistry.createGLTextureFromCanvas(this.graphics.canvas,this.atlas.filter));
		this.complete();
	}
	,advancePosition: function(image) {
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
				}
			}
		}
	}
	,addImageToAtlas: function(task) {
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
	,addPart: function(part) {
		var task = new bpmjs.ObjectProxyTask(part,new bpmjs.ImageLoaderTask(part.location));
		task.completeSignaler.bind($bind(this,this.addImageToAtlas));
		this.partLoaderGroup.add(task);
	}
	,doStart: function() {
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
		var _g = 0, _g1 = this.atlas.parts;
		while(_g < _g1.length) {
			var part = _g1[_g];
			++_g;
			this.addPart(part);
		}
		this.partLoaderGroup.completeSignaler.bind($bind(this,this.handleComplete));
		this.partLoaderGroup.errorSignaler.bind($bind(this,this.handleError));
		this.partLoaderGroup.start();
	}
	,currentMaxY: null
	,nextOffsetY: null
	,nextOffsetX: null
	,currentOffsetY: null
	,currentOffsetX: null
	,graphics: null
	,partLoaderGroup: null
	,atlas: null
	,textureRegistry: null
	,__class__: GLTextureAtlasLoadingTask
});
var GLTextureAtlasPartConfig = $hxClasses["GLTextureAtlasPartConfig"] = function() {
};
GLTextureAtlasPartConfig.__name__ = ["GLTextureAtlasPartConfig"];
GLTextureAtlasPartConfig.create = function(atlas,location) {
	var result = new GLTextureAtlasPartConfig();
	result.location = location;
	result.atlas = atlas;
	atlas.add(result);
	return result;
}
GLTextureAtlasPartConfig.prototype = {
	toString: function() {
		return "[GLTextureAtlasPartConfig: " + this.location + " uv:" + this.u0 + ", " + this.v0 + ", " + this.u1 + ", " + this.v1 + ", size: " + this.width + ", " + this.height + " ]";
	}
	,v1: null
	,u1: null
	,v0: null
	,u0: null
	,height: null
	,width: null
	,atlas: null
	,location: null
	,__class__: GLTextureAtlasPartConfig
}
var _GLTextureConfig = _GLTextureConfig || {}
_GLTextureConfig.TextureManipulation = $hxClasses["_GLTextureConfig.TextureManipulation"] = function() { }
_GLTextureConfig.TextureManipulation.__name__ = ["_GLTextureConfig","TextureManipulation"];
_GLTextureConfig.TextureManipulation.prototype = {
	create: function(image) {
		return null;
	}
	,__class__: _GLTextureConfig.TextureManipulation
}
_GLTextureConfig.CropManipulation = $hxClasses["_GLTextureConfig.CropManipulation"] = function(width,height) {
	this.width = width;
	this.height = height;
};
_GLTextureConfig.CropManipulation.__name__ = ["_GLTextureConfig","CropManipulation"];
_GLTextureConfig.CropManipulation.__super__ = _GLTextureConfig.TextureManipulation;
_GLTextureConfig.CropManipulation.prototype = $extend(_GLTextureConfig.TextureManipulation.prototype,{
	create: function(image) {
		var canvasGraphic = new CanvasGraphic();
		canvasGraphic.setWidth(this.width);
		canvasGraphic.setHeight(this.height);
		canvasGraphic.drawImage2(image,0,0);
		return canvasGraphic.canvas;
	}
	,height: null
	,width: null
	,__class__: _GLTextureConfig.CropManipulation
});
bpmjs.ImageLoaderTask = $hxClasses["bpmjs.ImageLoaderTask"] = function(location) {
	bpmjs.Task.call(this);
	this.location = location;
	this.getMonitor().name = location;
};
bpmjs.ImageLoaderTask.__name__ = ["bpmjs","ImageLoaderTask"];
bpmjs.ImageLoaderTask.__super__ = bpmjs.Task;
bpmjs.ImageLoaderTask.prototype = $extend(bpmjs.Task.prototype,{
	doComplete: function() {
		this.timer.stop();
		this.complete();
	}
	,handleImageLoaded: function() {
		this.complete();
	}
	,doStart: function() {
		this.getMonitor().name = this.location;
		this.image = new Image();
		this.image.onload = $bind(this,this.handleImageLoaded);
		this.image.src = this.location;
	}
	,timer: null
	,image: null
	,location: null
	,__class__: bpmjs.ImageLoaderTask
});
var GLTextureLoadingTask = $hxClasses["GLTextureLoadingTask"] = function(textureRegistry,textureConfig) {
	bpmjs.ImageLoaderTask.call(this);
	if(textureRegistry == null) throw "TextureRegistry was null!";
	this.textureRegistry = textureRegistry;
	this.textureConfig = textureConfig;
};
GLTextureLoadingTask.__name__ = ["GLTextureLoadingTask"];
GLTextureLoadingTask.__super__ = bpmjs.ImageLoaderTask;
GLTextureLoadingTask.prototype = $extend(bpmjs.ImageLoaderTask.prototype,{
	handleImageLoaded: function() {
		if(this.textureConfig.textureManipulation != null) this.textureRegistry.register(this.textureConfig,this.textureRegistry.createGLTextureFromCanvas(this.textureConfig.textureManipulation.create(this.image),this.textureConfig.filter)); else {
			var testPowerOfTwoWidth = Math2.nextPowerOf2(this.image.width) | 0;
			var testPowerOfTwoHeight = Math2.nextPowerOf2(this.image.height) | 0;
			if(testPowerOfTwoWidth != this.image.width || testPowerOfTwoHeight != this.image.height) {
				Log.posInfo = { fileName : "GLTextureLoadingTask.hx", lineNumber : 35, className : "GLTextureLoadingTask", methodName : "handleImageLoaded"};
				if(Log.filter(LogLevel.WARN)) {
					Log.fetchInput("Image",this.textureConfig.location,"size must be a valid texture size! Resizing...",null,null,null,null);
					console.warn(Log.createMessage());
				}
				var canvasGraphic = new CanvasGraphic();
				canvasGraphic.setWidth(testPowerOfTwoWidth / 2 | 0);
				canvasGraphic.setHeight(testPowerOfTwoHeight / 2 | 0);
				canvasGraphic.drawImage(this.image,0,0,canvasGraphic.width,canvasGraphic.height);
				this.textureRegistry.register(this.textureConfig,this.textureRegistry.createGLTextureFromCanvas(canvasGraphic.canvas,this.textureConfig.filter));
			} else this.textureRegistry.register(this.textureConfig,this.textureRegistry.createGLTextureFromImage(this.image,this.textureConfig.filter));
		}
		Log.posInfo = { fileName : "GLTextureLoadingTask.hx", lineNumber : 49, className : "GLTextureLoadingTask", methodName : "handleImageLoaded"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput("Complete: ",this.textureConfig.location,null,null,null,null,null);
			console.info(Log.createMessage());
		}
		this.complete();
	}
	,doStart: function() {
		this.location = this.textureConfig.location;
		bpmjs.ImageLoaderTask.prototype.doStart.call(this);
	}
	,textureConfig: null
	,textureRegistry: null
	,__class__: GLTextureLoadingTask
});
var GLTextureRegistry = $hxClasses["GLTextureRegistry"] = function() {
	this.images = new Hash();
};
GLTextureRegistry.__name__ = ["GLTextureRegistry"];
GLTextureRegistry.prototype = {
	updateGLArrayTexture: function(texture,filter) {
		GL.gl.bindTexture(3553,texture.texture);
		GL.gl.texParameteri(3553,10240,filter != null?filter:9728);
		GL.gl.texParameteri(3553,10241,filter != null?filter:9728);
		GL.gl.texImage2D(3553,0,6408,texture.width,texture.height,0,6408,5121,texture.array);
		if(filter == 9984 || filter == 9986 || filter == 9985 || filter == 9987) GL.gl.generateMipmap(3553);
	}
	,createGLArrayTexture: function(width,height,filter) {
		var testPowerOfTwoWidth = Math2.nextPowerOf2(width) | 0;
		var testPowerOfTwoHeight = Math2.nextPowerOf2(height) | 0;
		if(testPowerOfTwoWidth != width || testPowerOfTwoHeight != height) throw "Canvas size must be a valid texture size!";
		var array = new Uint8Array(width * height * 4);
		var texture = GL.gl.createTexture();
		GL.gl.bindTexture(3553,texture);
		GL.gl.texParameteri(3553,10240,filter != null?filter:9728);
		GL.gl.texParameteri(3553,10241,filter != null?filter:9728);
		GL.gl.texParameteri(3553,10242,33071);
		GL.gl.texParameteri(3553,10243,33071);
		GL.gl.texImage2D(3553,0,6408,width,height,0,6408,5121,array);
		if(filter == 9984 || filter == 9986 || filter == 9985 || filter == 9987) GL.gl.generateMipmap(3553);
		var result = new GLArrayTexture();
		result.width = width;
		result.height = height;
		result.texture = texture;
		result.array = array;
		return result;
	}
	,updateGLTextureFromCanvas: function(texture,canvas) {
		var testPowerOfTwoWidth = Math2.nextPowerOf2(canvas.width) | 0;
		var testPowerOfTwoHeight = Math2.nextPowerOf2(canvas.height) | 0;
		if(testPowerOfTwoWidth != canvas.width || testPowerOfTwoHeight != canvas.height) throw "Canvas size must be a valid texture size!";
		GL.gl.bindTexture(3553,texture.texture);
		GL.gl.texImage2D(3553,0,6408,6408,5121,canvas);
		texture.width = canvas.width;
		texture.height = canvas.height;
	}
	,createGLTextureFromCanvas: function(canvas,filter) {
		var testPowerOfTwoWidth = Math2.nextPowerOf2(canvas.width) | 0;
		var testPowerOfTwoHeight = Math2.nextPowerOf2(canvas.height) | 0;
		if(testPowerOfTwoWidth != canvas.width || testPowerOfTwoHeight != canvas.height) throw "Canvas size must be a valid texture size!";
		var texture = GL.gl.createTexture();
		GL.gl.bindTexture(3553,texture);
		GL.gl.texParameteri(3553,10240,filter != null?filter:9728);
		GL.gl.texParameteri(3553,10241,filter != null?filter:9728);
		GL.gl.texParameteri(3553,10242,33071);
		GL.gl.texParameteri(3553,10243,33071);
		GL.gl.texImage2D(3553,0,6408,6408,5121,canvas);
		if(filter == 9984 || filter == 9986 || filter == 9985 || filter == 9987) GL.gl.generateMipmap(3553);
		var result = new GLTexture();
		result.width = canvas.width;
		result.height = canvas.height;
		result.texture = texture;
		return result;
	}
	,createGLTextureFromImage: function(image,filter) {
		var testPowerOfTwoWidth = Math2.nextPowerOf2(image.width) | 0;
		var testPowerOfTwoHeight = Math2.nextPowerOf2(image.height) | 0;
		if(testPowerOfTwoWidth != image.width || testPowerOfTwoHeight != image.height) throw "Image size must be a valid texture size!";
		var texture = GL.gl.createTexture();
		GL.gl.bindTexture(3553,texture);
		GL.gl.texImage2D(3553,0,6408,6408,5121,image);
		GL.gl.texParameteri(3553,10240,filter != null?filter:9728);
		GL.gl.texParameteri(3553,10241,filter != null?filter:9728);
		GL.gl.texParameteri(3553,10242,33071);
		GL.gl.texParameteri(3553,10243,33071);
		if(filter == 9984 || filter == 9986 || filter == 9985 || filter == 9987) GL.gl.generateMipmap(3553);
		var result = new GLTexture();
		result.width = image.width;
		result.height = image.height;
		result.texture = texture;
		return result;
	}
	,get: function(key) {
		if(!this.images.exists(key.textureId)) throw "Cannot find Texture with key: " + key.textureId;
		return this.images.get(key.textureId);
	}
	,register: function(key,texture) {
		this.images.set(key.textureId,texture);
	}
	,images: null
	,__class__: GLTextureRegistry
}
var GLTween = $hxClasses["GLTween"] = function(o,ms,params) {
	this.o = o;
	this.ms = ms;
	this.params = params;
	this.isActive = true;
	this.properties = new Array();
	this.completeSignaler = new hsl.haxe.DirectSignaler(this);
};
GLTween.__name__ = ["GLTween"];
GLTween.to = function(o,ms,params) {
	var result = new GLTween(o,ms,params);
	GLTweenManager.getInstance().add(result);
	return result;
}
GLTween.prototype = {
	run: function(time) {
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
	,init: function(time) {
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
	,complete: function(method) {
		this.completeSignaler.bind(method);
		return this;
	}
	,completeSignaler: null
	,easeFunction: null
	,properties: null
	,params: null
	,ms: null
	,o: null
	,startTime: null
	,isActive: null
	,__class__: GLTween
}
var Property = $hxClasses["Property"] = function() {
};
Property.__name__ = ["Property"];
Property.prototype = {
	ease: function(tween,dt) {
		var o = tween.o;
		var value = tween.easeFunction(dt,this.from,this.to - this.from,tween.ms);
		o[this.field] = value;
	}
	,field: null
	,to: null
	,from: null
	,__class__: Property
}
var GLTweenManager = $hxClasses["GLTweenManager"] = function() {
	this.time = new Date().getTime();
	this.tweens = new Array();
	GLAnimationFrame.run($bind(this,this.tick));
};
GLTweenManager.__name__ = ["GLTweenManager"];
GLTweenManager.instance = null;
GLTweenManager.getInstance = function() {
	if(GLTweenManager.instance == null) GLTweenManager.instance = new GLTweenManager();
	return GLTweenManager.instance;
}
GLTweenManager.prototype = {
	tick: function() {
		this.time = new Date().getTime();
		var _g = 0, _g1 = this.tweens;
		while(_g < _g1.length) {
			var tween = _g1[_g];
			++_g;
			tween.run(this.time);
			if(!tween.isActive) HxOverrides.remove(this.tweens,tween);
		}
	}
	,add: function(tween) {
		tween.init(this.time);
		this.tweens.push(tween);
	}
	,time: null
	,tweens: null
	,__class__: GLTweenManager
}
var GLUniformLocation = $hxClasses["GLUniformLocation"] = function() {
};
GLUniformLocation.__name__ = ["GLUniformLocation"];
GLUniformLocation.prototype = {
	setTexture: function(texture,index) {
		if(index == null) index = 0;
		GL.gl.activeTexture(33984 + index);
		GL.gl.bindTexture(3553,texture.texture);
		GL.gl.uniform1i(this.location,index);
	}
	,setRGBA: function(color) {
		GL.gl.uniform4f(this.location,color.r,color.g,color.b,color.a);
	}
	,setRGB: function(color) {
		GL.gl.uniform3f(this.location,color.r,color.g,color.b);
	}
	,setVec2: function(vec) {
		GL.gl.uniform2f(this.location,vec.x,vec.y);
	}
	,setVec3: function(vec) {
		GL.gl.uniform3f(this.location,vec.x,vec.y,vec.z);
	}
	,setMatrix4: function(matrix) {
		GL.gl.uniformMatrix4fv(this.location,false,matrix.buffer);
	}
	,setMatrix3: function(matrix) {
		GL.gl.uniformMatrix3fv(this.location,false,matrix.buffer);
	}
	,setFloat: function(v) {
		GL.gl.uniform1f(this.location,v);
	}
	,uniformMatrix4fv: function(transpose,value) {
		if(transpose == null) transpose = false;
		GL.gl.uniformMatrix4fv(this.location,transpose,value);
	}
	,uniformMatrix3fv: function(transpose,value) {
		if(transpose == null) transpose = false;
		GL.gl.uniformMatrix3fv(this.location,transpose,value);
	}
	,uniformMatrix2fv: function(transpose,value) {
		if(transpose == null) transpose = false;
		GL.gl.uniformMatrix2fv(this.location,transpose,value);
	}
	,uniform4iv: function(v) {
		GL.gl.uniform4iv(this.location,v);
	}
	,uniform4i: function(x,y,z,w) {
		GL.gl.uniform4i(this.location,x,y,z,w);
	}
	,uniform4fv: function(v) {
		GL.gl.uniform4fv(this.location,v);
	}
	,uniform4f: function(x,y,z,w) {
		GL.gl.uniform4f(this.location,x,y,z,w);
	}
	,uniform3iv: function(v) {
		GL.gl.uniform3iv(this.location,v);
	}
	,uniform3i: function(x,y,z) {
		GL.gl.uniform3i(this.location,x,y,z);
	}
	,uniform3fv: function(v) {
		GL.gl.uniform3fv(this.location,v);
	}
	,uniform3f: function(x,y,z) {
		GL.gl.uniform3f(this.location,x,y,z);
	}
	,uniform2iv: function(v) {
		GL.gl.uniform2iv(this.location,v);
	}
	,uniform2i: function(x,y) {
		GL.gl.uniform2i(this.location,x,y);
	}
	,uniform2fv: function(v) {
		GL.gl.uniform2fv(this.location,v);
	}
	,uniform2f: function(x,y) {
		GL.gl.uniform2f(this.location,x,y);
	}
	,uniform1iv: function(v) {
		GL.gl.uniform1iv(this.location,v);
	}
	,uniform1i: function(v) {
		GL.gl.uniform1i(this.location,v);
	}
	,uniform1fv: function(v) {
		GL.gl.uniform1fv(this.location,v);
	}
	,uniform1f: function(v) {
		GL.gl.uniform1f(this.location,v);
	}
	,location: null
	,__class__: GLUniformLocation
}
var Hash = $hxClasses["Hash"] = function() {
	this.h = { };
};
Hash.__name__ = ["Hash"];
Hash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += Std.string("{");
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += Std.string(" => ");
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += Std.string(", ");
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,h: null
	,__class__: Hash
}
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
var IntHash = $hxClasses["IntHash"] = function() {
	this.h = { };
};
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += Std.string("{");
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += Std.string(" => ");
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += Std.string(", ");
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,h: null
	,__class__: IntHash
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
var Lambda = $hxClasses["Lambda"] = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !$iterator(it)().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = $iterator(a)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = $iterator(b)();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
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
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b += Std.string(sep);
			s.b += Std.string(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b += Std.string("{");
		while(l != null) {
			if(first) first = false; else s.b += Std.string(", ");
			s.b += Std.string(Std.string(l[0]));
			l = l[1];
		}
		s.b += Std.string("}");
		return s.b;
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
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,length: null
	,q: null
	,h: null
	,__class__: List
}
var Log = $hxClasses["Log"] = function() { }
Log.__name__ = ["Log"];
Log.posInfo = null;
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
Log.prototype = {
	errorFilter: function() {
	}
	,__class__: Log
}
var LogLevel = $hxClasses["LogLevel"] = function(value) {
	this.value = value;
};
LogLevel.__name__ = ["LogLevel"];
LogLevel.prototype = {
	isSmallerOrEqual: function(level) {
		return this.value <= level.value;
	}
	,value: null
	,__class__: LogLevel
}
var Main = $hxClasses["Main"] = function(canvas) {
	try {
		var context = bpmjs.ContextBuilder.buildAll([kumite.launch.Config,kumite.textureregistry.Config,kumite.stage.Config,kumite.canvas.Config,kumite.webgl.Config,kumite.time.Config,kumite.projection.Config,kumite.camera.Config,kumite.mouse.Config,kumite.blobs.Config,kumite.displaylist.ConfigAsLayer,kumite.scene.SceneConfig,kumite.eyes.Config]);
	} catch( e ) {
		Log.posInfo = { fileName : "Main.hx", lineNumber : 64, className : "Main", methodName : "new"};
		if(Log.filter(LogLevel.ERROR)) {
			Log.fetchInput("Error building application!\n" + Std.string(e),null,null,null,null,null,null);
			console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
		}
	}
};
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
	js.Lib.onerror = Main.globalErrorHandler;
}
Main.prototype = {
	__class__: Main
}
var Map = $hxClasses["Map"] = function() { }
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
var Math2 = $hxClasses["Math2"] = function() { }
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
var Matrix3 = $hxClasses["Matrix3"] = function(cloneFrom) {
	this.buffer = new Float32Array(9);
	if(cloneFrom != null) this.setFrom(cloneFrom); else this.identity();
};
Matrix3.__name__ = ["Matrix3"];
Matrix3.prototype = {
	toString: function() {
		var result = "Matrix3:";
		result += "\r\t" + this.buffer[0] + "," + this.buffer[1] + "," + this.buffer[2];
		result += "\r\t" + this.buffer[3] + "," + this.buffer[4] + "," + this.buffer[5];
		result += "\r\t" + this.buffer[6] + "," + this.buffer[7] + "," + this.buffer[8];
		return result;
	}
	,clone: function() {
		return new Matrix3(this);
	}
	,setFrom: function(from) {
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
	,transpose: function() {
		var a01 = this.buffer[1], a02 = this.buffer[2];
		var a12 = this.buffer[5];
		this.buffer[1] = this.buffer[3];
		this.buffer[2] = this.buffer[6];
		this.buffer[3] = a01;
		this.buffer[5] = this.buffer[7];
		this.buffer[6] = a02;
		this.buffer[7] = a12;
	}
	,identity: function() {
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
	,buffer: null
	,__class__: Matrix3
}
var Matrix4 = $hxClasses["Matrix4"] = function() {
	this.buffer = new Float32Array(Matrix4.IDENTITY_BUFFER);
};
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
	set44: function(v) {
		return this.buffer[15] = v;
	}
	,get44: function() {
		return this.buffer[15];
	}
	,set43: function(v) {
		return this.buffer[11] = v;
	}
	,get43: function() {
		return this.buffer[11];
	}
	,set42: function(v) {
		return this.buffer[7] = v;
	}
	,get42: function() {
		return this.buffer[7];
	}
	,set41: function(v) {
		return this.buffer[3] = v;
	}
	,get41: function() {
		return this.buffer[3];
	}
	,set34: function(v) {
		return this.buffer[14] = v;
	}
	,get34: function() {
		return this.buffer[14];
	}
	,set33: function(v) {
		return this.buffer[10] = v;
	}
	,get33: function() {
		return this.buffer[10];
	}
	,set32: function(v) {
		return this.buffer[6] = v;
	}
	,get32: function() {
		return this.buffer[6];
	}
	,set31: function(v) {
		return this.buffer[2] = v;
	}
	,get31: function() {
		return this.buffer[2];
	}
	,set24: function(v) {
		return this.buffer[13] = v;
	}
	,get24: function() {
		return this.buffer[13];
	}
	,set23: function(v) {
		return this.buffer[9] = v;
	}
	,get23: function() {
		return this.buffer[9];
	}
	,set22: function(v) {
		return this.buffer[5] = v;
	}
	,get22: function() {
		return this.buffer[5];
	}
	,set21: function(v) {
		return this.buffer[1] = v;
	}
	,get21: function() {
		return this.buffer[1];
	}
	,set14: function(v) {
		return this.buffer[12] = v;
	}
	,get14: function() {
		return this.buffer[12];
	}
	,set13: function(v) {
		return this.buffer[8] = v;
	}
	,get13: function() {
		return this.buffer[8];
	}
	,set12: function(v) {
		return this.buffer[4] = v;
	}
	,get12: function() {
		return this.buffer[4];
	}
	,set11: function(v) {
		return this.buffer[0] = v;
	}
	,get11: function() {
		return this.buffer[0];
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
	,appendRotationZAffine: function(angle) {
		Matrix4.tempMatrix1.setRotationZ(angle);
		this.appendAffine(Matrix4.tempMatrix1);
	}
	,appendRotationAffine: function(angle,axis) {
		Matrix4.tempMatrix1.setRotation(angle,axis);
		this.appendAffine(Matrix4.tempMatrix1);
	}
	,appendScaleAffine: function(x,y,z) {
		Matrix4.tempMatrix1.setScale(x,y,z);
		this.appendAffine(Matrix4.tempMatrix1);
	}
	,appendRotationZ: function(angle) {
		Matrix4.tempMatrix1.setRotationZ(angle);
		this.append(Matrix4.tempMatrix1);
	}
	,appendRotation: function(angle,axis) {
		Matrix4.tempMatrix1.setRotation(angle,axis);
		this.append(Matrix4.tempMatrix1);
	}
	,appendScale: function(x,y,z) {
		Matrix4.tempMatrix1.setScale(x,y,z);
		this.append(Matrix4.tempMatrix1);
	}
	,appendTranslationAffine: function(x,y,z) {
		Matrix4.tempMatrix1.setTranslation(x,y,z);
		this.appendAffine(Matrix4.tempMatrix1);
	}
	,appendTranslation: function(x,y,z) {
		Matrix4.tempMatrix1.setTranslation(x,y,z);
		this.append(Matrix4.tempMatrix1);
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
	,setPerspective: function(fovy,aspect,near,far) {
		var top = near * Math.tan(fovy * Math.PI / 360);
		var right = top * aspect;
		this.setFrustum(-right,right,-top,top,near,far);
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
	,setRotation: function(angle,axis) {
		var c = Math.cos(angle), s = Math.sin(angle), t = 1 - c, x = axis.x, y = axis.y, z = axis.z, tx = t * x, ty = t * y;
		this.set(tx * x + c,tx * y - s * z,tx * z + s * y,0,tx * y + s * z,ty * y + c,ty * z - s * x,0,tx * z - s * y,ty * z + s * x,t * z * z + c,0,0,0,0,1);
		return this;
	}
	,setRotationZ: function(angle) {
		var c = Math.cos(angle), s = Math.sin(angle);
		this.set(c,-s,0,0,s,c,0,0,0,0,1,0,0,0,0,1);
		return this;
	}
	,setRotationY: function(angle) {
		var c = Math.cos(angle), s = Math.sin(angle);
		this.set(c,0,s,0,0,1,0,0,-s,0,c,0,0,0,0,1);
		return this;
	}
	,setRotationX: function(angle) {
		var c = Math.cos(angle), s = Math.sin(angle);
		this.set(1,0,0,0,0,c,-s,0,0,s,c,0,0,0,0,1);
		return this;
	}
	,setScale: function(x,y,z) {
		this.set(x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1);
		return this;
	}
	,setTranslation: function(x,y,z) {
		this.set(1,0,0,x,0,1,0,y,0,0,1,z,0,0,0,1);
		return this;
	}
	,setFrom: function(from) {
		this.buffer.set(from.buffer);
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
	,setIdentity: function() {
		this.buffer.set(Matrix4.IDENTITY_BUFFER);
		return this;
	}
	,n44: null
	,n43: null
	,n42: null
	,n41: null
	,n34: null
	,n33: null
	,n32: null
	,n31: null
	,n24: null
	,n23: null
	,n22: null
	,n21: null
	,n14: null
	,n13: null
	,n12: null
	,n11: null
	,buffer: null
	,__class__: Matrix4
	,__properties__: {set_n11:"set11",get_n11:"get11",set_n12:"set12",get_n12:"get12",set_n13:"set13",get_n13:"get13",set_n14:"set14",get_n14:"get14",set_n21:"set21",get_n21:"get21",set_n22:"set22",get_n22:"get22",set_n23:"set23",get_n23:"get23",set_n24:"set24",get_n24:"get24",set_n31:"set31",get_n31:"get31",set_n32:"set32",get_n32:"get32",set_n33:"set33",get_n33:"get33",set_n34:"set34",get_n34:"get34",set_n41:"set41",get_n41:"get41",set_n42:"set42",get_n42:"get42",set_n43:"set43",get_n43:"get43",set_n44:"set44",get_n44:"get44"}
}
var MoveSet = $hxClasses["MoveSet"] = function(current,target,velocity,acceleration) {
	if(acceleration == null) acceleration = 0.5;
	if(velocity == null) velocity = 0;
	if(target == null) target = 0;
	if(current == null) current = 0;
	this.current = current;
	this.target = target;
	this.velocity = velocity;
	this.acceleration = acceleration;
};
MoveSet.__name__ = ["MoveSet"];
MoveSet.prototype = {
	move: function(timeScale) {
		if(timeScale == null) timeScale = 1;
		this.breaking = false;
		var moveSet = this;
		var dx = moveSet.target - moveSet.current;
		if(dx == 0) return;
		var accelerationToTarget = Math2.signum(dx) * this.acceleration;
		var accelerationWhenBreaking = -accelerationToTarget;
		var timeUntilStopIfBreaking = -(moveSet.velocity / accelerationWhenBreaking);
		if(timeUntilStopIfBreaking < 0) moveSet.velocity -= accelerationWhenBreaking * timeScale; else {
			var wayUntilStopIfBreaking = moveSet.velocity * timeUntilStopIfBreaking - 0.5 * accelerationWhenBreaking * timeUntilStopIfBreaking * timeUntilStopIfBreaking;
			var shouldBreak = Math.abs(wayUntilStopIfBreaking) > Math.abs(dx);
			if(shouldBreak) {
				this.breaking = true;
				if(timeUntilStopIfBreaking > 3) accelerationWhenBreaking = -(2 * (wayUntilStopIfBreaking - dx)) / (timeUntilStopIfBreaking * timeUntilStopIfBreaking);
				this.velocity += accelerationWhenBreaking * timeScale;
			} else this.velocity += accelerationToTarget * timeScale;
		}
		var currentNew = this.current + moveSet.velocity * timeScale;
		var dxNew = moveSet.target - currentNew;
		if(Math2.signum(dxNew) != Math2.signum(dx)) {
			moveSet.velocity = 0;
			moveSet.current = moveSet.target;
		} else moveSet.current = currentNew;
	}
	,breaking: null
	,acceleration: null
	,velocity: null
	,target: null
	,current: null
	,__class__: MoveSet
}
var MoveSetVec2 = $hxClasses["MoveSetVec2"] = function(current,to,acceleration) {
	this.current = current;
	this.to = to;
	this.acceleration = acceleration;
	this.moveSetX = new MoveSet(current.x,to.x,acceleration.x);
	this.moveSetY = new MoveSet(current.y,to.y,acceleration.y);
};
MoveSetVec2.__name__ = ["MoveSetVec2"];
MoveSetVec2.prototype = {
	move: function(factor) {
		if(factor == null) factor = 1;
		this.moveSetX.target = this.to.x;
		this.moveSetX.acceleration = this.acceleration.x;
		this.moveSetX.move(factor);
		this.moveSetY.target = this.to.y;
		this.moveSetY.acceleration = this.acceleration.y;
		this.moveSetY.move(factor);
		this.current.x = this.moveSetX.current;
		this.current.y = this.moveSetY.current;
	}
	,moveSetY: null
	,moveSetX: null
	,acceleration: null
	,to: null
	,current: null
	,__class__: MoveSetVec2
}
var Rand = $hxClasses["Rand"] = function() { }
Rand.__name__ = ["Rand"];
Rand["float"] = function(from,to) {
	return from + Math.random() * (to - from);
}
Rand["int"] = function(from,to) {
	return from + Math.random() * (to - from) | 0;
}
Rand.bool = function(chance) {
	return Math.random() < chance;
}
Rand.list = function(list) {
	return list[Math.random() * list.length | 0];
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
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	toString: function() {
		return this.b;
	}
	,addSub: function(s,pos,len) {
		this.b += HxOverrides.substr(s,pos,len);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,b: null
	,__class__: StringBuf
}
var StringTools = $hxClasses["StringTools"] = function() { }
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
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += HxOverrides.substr(c,0,l - sl);
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
		ns += HxOverrides.substr(c,0,l - sl);
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
	return s.charCodeAt(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
var Timeout = $hxClasses["Timeout"] = function() { }
Timeout.__name__ = ["Timeout"];
Timeout.execute = function(ms,method) {
	var timer = new haxe.Timer(ms);
	var run = function() {
		method();
		timer.stop();
	};
	timer.run = run;
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
var Vec2 = $hxClasses["Vec2"] = function(x,y) {
	this.x = x;
	this.y = y;
};
Vec2.__name__ = ["Vec2"];
Vec2.prototype = {
	clone: function() {
		return new Vec2(this.x,this.y);
	}
	,transform: function(matrix) {
		var x1 = this.x, y1 = this.y, z1 = 0, w1 = 1;
		var mat = matrix.buffer;
		this.x = mat[0] * x1 + mat[4] * y1 + mat[8] * z1 + mat[12] * w1;
		this.y = mat[1] * x1 + mat[5] * y1 + mat[9] * z1 + mat[13] * w1;
	}
	,getLength: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,normalize: function() {
		var invLength = 1 / Math.sqrt(this.x * this.x + this.y * this.y);
		this.x *= invLength;
		this.y *= invLength;
	}
	,subtract: function(x,y) {
		this.x -= x;
		this.y -= y;
	}
	,multiply: function(x,y) {
		this.x *= x;
		this.y *= y;
	}
	,scale: function(factor) {
		this.x *= factor;
		this.y *= factor;
	}
	,set: function(x,y) {
		this.x = x;
		this.y = y;
	}
	,y: null
	,x: null
	,__class__: Vec2
}
var Vec3 = $hxClasses["Vec3"] = function(x,y,z) {
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
	this.z = z;
};
Vec3.__name__ = ["Vec3"];
Vec3.prototype = {
	toString: function() {
		return "[Vec3 " + " x: " + this.x + " y: " + this.y + " z: " + this.z + "]";
	}
	,clone: function() {
		return new Vec3(this.x,this.y,this.z);
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
	,transform: function(matrix) {
		var x1 = this.x, y1 = this.y, z1 = this.z;
		this.x = matrix.buffer[0] * x1 + matrix.buffer[4] * y1 + matrix.buffer[8] * z1 + matrix.buffer[12];
		this.y = matrix.buffer[1] * x1 + matrix.buffer[5] * y1 + matrix.buffer[9] * z1 + matrix.buffer[13];
		this.z = matrix.buffer[2] * x1 + matrix.buffer[6] * y1 + matrix.buffer[10] * z1 + matrix.buffer[14];
	}
	,equals: function(vec) {
		return this.x == vec.x && this.y == vec.y && this.z == vec.z;
	}
	,dot: function(vec) {
		return this.x * vec.x + this.y * vec.y + this.z * vec.z;
	}
	,cross: function(vec) {
		var x = this.y * vec.z - this.z * vec.y;
		var y = this.z * vec.x - this.x * vec.z;
		var z = this.x * vec.y - this.y * vec.x;
		return new Vec3(x,y,z);
	}
	,getLength: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	,normalize: function() {
		var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		this.x /= length;
		this.y /= length;
		this.z /= length;
		return this;
	}
	,subtract: function(x,y,z) {
		this.x -= x;
		this.y -= y;
		this.z -= z;
		return this;
	}
	,multiply: function(x,y,z) {
		this.x *= x;
		this.y *= y;
		this.z *= z;
	}
	,scale: function(factor) {
		this.x *= factor;
		this.y *= factor;
		this.z *= factor;
	}
	,z: null
	,y: null
	,x: null
	,__class__: Vec3
}
var Xml = $hxClasses["Xml"] = function() {
};
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
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
	toString: function() {
		if(this.nodeType == Xml.PCData) return this._nodeValue;
		if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
		if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
		if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
		if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
		var s = new StringBuf();
		if(this.nodeType == Xml.Element) {
			s.b += Std.string("<");
			s.b += Std.string(this._nodeName);
			var $it0 = this._attributes.keys();
			while( $it0.hasNext() ) {
				var k = $it0.next();
				s.b += Std.string(" ");
				s.b += Std.string(k);
				s.b += Std.string("=\"");
				s.b += Std.string(this._attributes.get(k));
				s.b += Std.string("\"");
			}
			if(this._children.length == 0) {
				s.b += Std.string("/>");
				return s.b;
			}
			s.b += Std.string(">");
		}
		var $it1 = this.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			s.b += Std.string(x.toString());
		}
		if(this.nodeType == Xml.Element) {
			s.b += Std.string("</");
			s.b += Std.string(this._nodeName);
			s.b += Std.string(">");
		}
		return s.b;
	}
	,insertChild: function(x,pos) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.splice(pos,0,x);
	}
	,removeChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		var b = HxOverrides.remove(this._children,x);
		if(b) x._parent = null;
		return b;
	}
	,addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
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
	,firstChild: function() {
		if(this._children == null) throw "bad nodetype";
		return this._children[0];
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
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.keys();
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,remove: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.remove(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,getParent: function() {
		return this._parent;
	}
	,setNodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,getNodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,setNodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,getNodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,_parent: null
	,_children: null
	,_attributes: null
	,_nodeValue: null
	,_nodeName: null
	,parent: null
	,nodeValue: null
	,nodeName: null
	,nodeType: null
	,__class__: Xml
	,__properties__: {set_nodeName:"setNodeName",get_nodeName:"getNodeName",set_nodeValue:"setNodeValue",get_nodeValue:"getNodeValue",get_parent:"getParent"}
}
bpmjs.Context = $hxClasses["bpmjs.Context"] = function() {
	this.objects = new Array();
	this.observers = new Array();
};
bpmjs.Context.__name__ = ["bpmjs","Context"];
bpmjs.Context.prototype = {
	getFilterByType: function(type) {
		return function(contextObject) {
			return contextObject.type == type;
		};
	}
	,addObserver: function(object,methodName,type) {
		Log.posInfo = { fileName : "Context.hx", lineNumber : 54, className : "bpmjs.Context", methodName : "addObserver"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(object.classInfo.name,methodName,type.name,null,null,null,null);
			console.info(Log.createMessage());
		}
		var observer = new bpmjs.Observer();
		observer.object = object;
		observer.methodName = methodName;
		observer.type = type;
		this.observers.push(observer);
	}
	,getDynamicObjectsByType: function(type) {
		return Lambda.filter(this.objects,this.getFilterByType(type));
	}
	,getObjectByType: function(type) {
		var result = Lambda.filter(this.objects,this.getFilterByType(type));
		if(result.length == 1) return result.first().object; else if(result.length > 1) throw "Multiple objects of type: " + result.first().classInfo.name + " found"; else return null;
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
	,addObject: function(name,classInfo,object) {
		var contextObject = new bpmjs.ContextObject(name,classInfo,object);
		this.objects.push(contextObject);
		return contextObject;
	}
	,observers: null
	,objects: null
	,contextConfig: null
	,__class__: bpmjs.Context
}
bpmjs.ContextObject = $hxClasses["bpmjs.ContextObject"] = function(name,classInfo,object) {
	this.name = name;
	this.classInfo = classInfo;
	this.type = classInfo.type;
	this.object = object;
};
bpmjs.ContextObject.__name__ = ["bpmjs","ContextObject"];
bpmjs.ContextObject.prototype = {
	classInfo: null
	,object: null
	,type: null
	,name: null
	,__class__: bpmjs.ContextObject
}
bpmjs.Observer = $hxClasses["bpmjs.Observer"] = function() {
};
bpmjs.Observer.__name__ = ["bpmjs","Observer"];
bpmjs.Observer.prototype = {
	observe: function(objectToObserve) {
		if(js.Boot.__instanceof(objectToObserve.object,this.type.type)) Reflect.field(this.object.object,this.methodName).apply(this.object.object,[objectToObserve.object]);
	}
	,type: null
	,methodName: null
	,object: null
	,__class__: bpmjs.Observer
}
bpmjs.ContextBuilder = $hxClasses["bpmjs.ContextBuilder"] = function() {
	this.context = new bpmjs.Context();
};
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
	createError: function(message) {
		return "ContextBuilder ERROR: " + message;
	}
	,doPostCompleteCall: function(contextObject) {
		bpmjs.ReflectUtil.callMethodWithMetadata(contextObject.object,contextObject.type,"PostComplete",[]);
	}
	,doCompleteCall: function(contextObject) {
		bpmjs.ReflectUtil.callMethodWithMetadata(contextObject.object,contextObject.type,"Complete",[]);
	}
	,doObserve: function(contextObject) {
		var _g = 0, _g1 = this.context.observers;
		while(_g < _g1.length) {
			var observer = _g1[_g];
			++_g;
			observer.observe(contextObject);
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
	,registerMessengerByObjectType: function(contextObject) {
		if(js.Boot.__instanceof(contextObject.object,bpmjs.Messenger)) this.contextConfig.frontMessenger.addMessenger(contextObject.object);
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
							Log.posInfo = { fileName : "ContextBuilder.hx", lineNumber : 169, className : "bpmjs.ContextBuilder", methodName : "wireContextObject"};
							if(Log.filter(LogLevel.INFO)) {
								Log.fetchInput("value: " + Std.string(Reflect.field(contextObject.object,property.field.name)),null,null,null,null,null,null);
								console.info(Log.createMessage());
							}
							throw "Multiple selection for type: " + reflect.ClassInfo.forCType(property.field.type).name + " and no name match for: " + property.field.name + " in " + contextObject.classInfo.name;
						}
					}
				}
			}
		}
	}
	,configureDynamicObjects: function(objects) {
		Lambda.iter(objects,$bind(this,this.wireContextObject));
		Lambda.iter(objects,$bind(this,this.findObservers));
		Lambda.iter(objects,$bind(this,this.registerMessengerByObjectType));
		Lambda.iter(objects,$bind(this,this.registerMessengers));
		Lambda.iter(objects,$bind(this,this.registerReceivers));
		Lambda.iter(objects,$bind(this,this.doObserve));
		Lambda.iter(objects,$bind(this,this.doCompleteCall));
		Lambda.iter(objects,$bind(this,this.doPostCompleteCall));
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
				Log.posInfo = { fileName : "ContextBuilder.hx", lineNumber : 112, className : "bpmjs.ContextBuilder", methodName : "createObjects"};
				if(Log.filter(LogLevel.WARN)) {
					Log.fetchInput(e,null,null,null,null,null,null);
					console.warn(Log.createMessage());
				}
			}
		}
	}
	,buildInternal: function(configClasses) {
		this.context.contextConfig = this.contextConfig;
		Lambda.iter(configClasses,$bind(this,this.createObjects));
		this.configureDynamicObjects(this.context.objects);
	}
	,configureInternal: function(object) {
		var contextObject = this.context.addObject("configured",reflect.ClassInfo.forInstance(object),object);
		this.configureDynamicObjects([contextObject]);
	}
	,contextConfig: null
	,context: null
	,__class__: bpmjs.ContextBuilder
}
bpmjs.ContextConfig = $hxClasses["bpmjs.ContextConfig"] = function() {
};
bpmjs.ContextConfig.__name__ = ["bpmjs","ContextConfig"];
bpmjs.ContextConfig.prototype = {
	frontMessenger: null
	,__class__: bpmjs.ContextConfig
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
haxe.Stack = $hxClasses["haxe.Stack"] = function() { }
haxe.Stack.__name__ = ["haxe","Stack"];
haxe.Stack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.Stack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
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
		b.b += Std.string("\nCalled from ");
		haxe.Stack.itemToString(b,s);
	}
	return b.b;
}
haxe.Stack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b += Std.string("a C function");
		break;
	case 1:
		var m = $e[2];
		b.b += Std.string("module ");
		b.b += Std.string(m);
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b += Std.string(" (");
		}
		b.b += Std.string(file);
		b.b += Std.string(" line ");
		b.b += Std.string(line);
		if(s1 != null) b.b += Std.string(")");
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b += Std.string(cname);
		b.b += Std.string(".");
		b.b += Std.string(meth);
		break;
	case 4:
		var n = $e[2];
		b.b += Std.string("local function #");
		b.b += Std.string(n);
		break;
	}
}
haxe.Stack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.document = null;
js.Lib.window = null;
js.Lib.debug = function() {
	debugger;
}
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
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
bpmjs.FrameTimer = $hxClasses["bpmjs.FrameTimer"] = function(maxIntervalMs) {
	if(maxIntervalMs == null) maxIntervalMs = 0;
	this.maxIntervalMs = maxIntervalMs;
};
bpmjs.FrameTimer.__name__ = ["bpmjs","FrameTimer"];
bpmjs.FrameTimer.profileStart = null;
bpmjs.FrameTimer.profileEnd = null;
bpmjs.FrameTimer.frameTimerLoop = function() {
	if(bpmjs.FrameTimer.profileStart != null) bpmjs.FrameTimer.profileStart();
	var time = new Date().getTime();
	var _g = 0, _g1 = bpmjs.FrameTimer.listeners2;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		if(listener.run != null) {
			if(time - listener.time > listener.maxIntervalMs) {
				listener.time = time;
				listener.run(listener);
			}
		}
	}
	var _g = 0, _g1 = bpmjs.FrameTimer.listeners;
	while(_g < _g1.length) {
		var listener = _g1[_g];
		++_g;
		if(listener.run != null) {
			if(time - listener.time > listener.maxIntervalMs) {
				listener.time = time;
				listener.run(listener);
			}
		}
	}
	if(bpmjs.FrameTimer.profileEnd != null) bpmjs.FrameTimer.profileEnd();
}
bpmjs.FrameTimer.prototype = {
	stop: function() {
		HxOverrides.remove(bpmjs.FrameTimer.listeners,this);
		HxOverrides.remove(bpmjs.FrameTimer.listeners2,this);
	}
	,start2: function() {
		this.time = new Date().getTime();
		this.stop();
		bpmjs.FrameTimer.listeners2.push(this);
		bpmjs.FrameTimer.listeners.push(this);
	}
	,start: function() {
		this.time = new Date().getTime();
		this.stop();
		bpmjs.FrameTimer.listeners.push(this);
	}
	,maxIntervalMs: null
	,time: null
	,run: null
	,__class__: bpmjs.FrameTimer
}
bpmjs.FrontMessenger = $hxClasses["bpmjs.FrontMessenger"] = function() { }
bpmjs.FrontMessenger.__name__ = ["bpmjs","FrontMessenger"];
bpmjs.FrontMessenger.prototype = {
	addReceiver: null
	,addMessenger: null
	,__class__: bpmjs.FrontMessenger
}
bpmjs.DefaultFrontMessenger = $hxClasses["bpmjs.DefaultFrontMessenger"] = function() {
	this.receivers = new Array();
};
bpmjs.DefaultFrontMessenger.__name__ = ["bpmjs","DefaultFrontMessenger"];
bpmjs.DefaultFrontMessenger.__interfaces__ = [bpmjs.FrontMessenger];
bpmjs.DefaultFrontMessenger.prototype = {
	handleMessage: function(message) {
		Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 33, className : "bpmjs.DefaultFrontMessenger", methodName : "handleMessage"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(Type.getClassName(Type.getClass(message)),null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
		var _g = 0, _g1 = this.receivers;
		while(_g < _g1.length) {
			var receiver = _g1[_g];
			++_g;
			if(Type.getClass(message) == receiver.type) {
				Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 66, className : "bpmjs._FrontMessenger.Receiver", methodName : "execute"};
				if(Log.filter(LogLevel.INFO)) {
					Log.fetchInput(Type.getClassName(Type.getClass(receiver.receiver)) + "#" + receiver.methodName,null,null,null,null,null,null);
					console.info(Log.createMessage());
				}
				receiver.method.apply(receiver.receiver,[message]);
			}
		}
	}
	,addReceiver: function(receivingObject,methodName,type) {
		Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 27, className : "bpmjs.DefaultFrontMessenger", methodName : "addReceiver"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(Type.getClassName(Type.getClass(receivingObject)) + "#" + methodName,Type.getClassName(type),null,null,null,null,null);
			console.info(Log.createMessage());
		}
		this.receivers.push(new bpmjs._FrontMessenger.Receiver(receivingObject,methodName,type));
	}
	,addMessenger: function(messenger) {
		Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 21, className : "bpmjs.DefaultFrontMessenger", methodName : "addMessenger"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(Type.getClassName(Type.getClass(messenger)),null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
		messenger.addReceiver(null,$bind(this,this.handleMessage));
	}
	,receivers: null
	,__class__: bpmjs.DefaultFrontMessenger
}
if(!bpmjs._FrontMessenger) bpmjs._FrontMessenger = {}
bpmjs._FrontMessenger.Receiver = $hxClasses["bpmjs._FrontMessenger.Receiver"] = function(receiver,methodName,type) {
	this.receiver = receiver;
	this.type = type;
	this.method = Reflect.field(receiver,methodName);
	this.methodName = methodName;
};
bpmjs._FrontMessenger.Receiver.__name__ = ["bpmjs","_FrontMessenger","Receiver"];
bpmjs._FrontMessenger.Receiver.prototype = {
	execute: function(message) {
		Log.posInfo = { fileName : "FrontMessenger.hx", lineNumber : 66, className : "bpmjs._FrontMessenger.Receiver", methodName : "execute"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(Type.getClassName(Type.getClass(this.receiver)) + "#" + this.methodName,null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
		this.method.apply(this.receiver,[message]);
	}
	,matches: function(message) {
		return Type.getClass(message) == this.type;
	}
	,type: null
	,methodName: null
	,method: null
	,receiver: null
	,__class__: bpmjs._FrontMessenger.Receiver
}
bpmjs.Messenger = $hxClasses["bpmjs.Messenger"] = function() {
	this.receivers = new Array();
};
bpmjs.Messenger.__name__ = ["bpmjs","Messenger"];
bpmjs.Messenger.prototype = {
	toString: function() {
		return Type.getClassName(Type.getClass(this));
	}
	,send: function(message) {
		var _g = 0, _g1 = this.receivers;
		while(_g < _g1.length) {
			var receiver = _g1[_g];
			++_g;
			if(receiver.type == null || receiver.type == Type.getClass(message)) receiver.method(message);
		}
	}
	,removeReceiver: function(type,listener) {
		var _g = 0, _g1 = this.receivers;
		while(_g < _g1.length) {
			var receiver = _g1[_g];
			++_g;
			if(receiver.type == type && Reflect.compareMethods(listener,receiver.method)) {
				HxOverrides.remove(this.receivers,receiver);
				return;
			}
		}
	}
	,addReceiver: function(type,listener) {
		this.removeReceiver(type,listener);
		this.receivers.push(new bpmjs._Messenger.ReceiverForType(type,listener));
	}
	,receivers: null
	,__class__: bpmjs.Messenger
}
if(!bpmjs._Messenger) bpmjs._Messenger = {}
bpmjs._Messenger.ReceiverForType = $hxClasses["bpmjs._Messenger.ReceiverForType"] = function(type,method) {
	this.type = type;
	this.method = method;
};
bpmjs._Messenger.ReceiverForType.__name__ = ["bpmjs","_Messenger","ReceiverForType"];
bpmjs._Messenger.ReceiverForType.prototype = {
	method: null
	,type: null
	,__class__: bpmjs._Messenger.ReceiverForType
}
bpmjs.ObjectProxyTask = $hxClasses["bpmjs.ObjectProxyTask"] = function(object,child) {
	this.object = object;
	this.child = child;
	bpmjs.Task.call(this);
	child.completeSignaler.bind($bind(this,this.handleComplete));
	child.errorSignaler.bind($bind(this,this.handleError));
};
bpmjs.ObjectProxyTask.__name__ = ["bpmjs","ObjectProxyTask"];
bpmjs.ObjectProxyTask.__super__ = bpmjs.Task;
bpmjs.ObjectProxyTask.prototype = $extend(bpmjs.Task.prototype,{
	handleError: function(v) {
		this.error(this,v.error);
	}
	,handleComplete: function(v) {
		this.complete();
	}
	,getMonitor: function() {
		return this.child.getMonitor();
	}
	,setMonitor: function(value) {
		this.child.setMonitor(value);
		return value;
	}
	,start: function() {
		bpmjs.Task.prototype.start.call(this);
		this.child.start();
	}
	,child: null
	,object: null
	,__class__: bpmjs.ObjectProxyTask
});
bpmjs.ProgressMonitor = $hxClasses["bpmjs.ProgressMonitor"] = function() {
	this.name = "";
	this.reset();
};
bpmjs.ProgressMonitor.__name__ = ["bpmjs","ProgressMonitor"];
bpmjs.ProgressMonitor.prototype = {
	setCurrent: function(value) {
		this.current = value;
		return value;
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
	,done: function() {
		this.setCurrent(1);
	}
	,append: function(monitor,total) {
		var monitorAndTotal = new bpmjs._ProgressMonitor.MonitorAndTotal();
		monitorAndTotal.total = total;
		monitorAndTotal.monitor = monitor;
		this.children.push(monitorAndTotal);
		return monitor;
	}
	,reset: function() {
		this.children = new Array();
		this.setCurrent(0);
		this.weight = 1;
	}
	,children: null
	,current: null
	,weight: null
	,name: null
	,__class__: bpmjs.ProgressMonitor
	,__properties__: {set_current:"setCurrent",get_current:"getCurrent"}
}
if(!bpmjs._ProgressMonitor) bpmjs._ProgressMonitor = {}
bpmjs._ProgressMonitor.MonitorAndTotal = $hxClasses["bpmjs._ProgressMonitor.MonitorAndTotal"] = function() {
};
bpmjs._ProgressMonitor.MonitorAndTotal.__name__ = ["bpmjs","_ProgressMonitor","MonitorAndTotal"];
bpmjs._ProgressMonitor.MonitorAndTotal.prototype = {
	monitor: null
	,total: null
	,__class__: bpmjs._ProgressMonitor.MonitorAndTotal
}
bpmjs.ReflectUtil = $hxClasses["bpmjs.ReflectUtil"] = function() { }
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
bpmjs.Sequencer = $hxClasses["bpmjs.Sequencer"] = function() {
};
bpmjs.Sequencer.__name__ = ["bpmjs","Sequencer"];
bpmjs.Sequencer.__interfaces__ = [haxe.rtti.Infos];
bpmjs.Sequencer.prototype = {
	start: function(name) {
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
	,context: null
	,__class__: bpmjs.Sequencer
}
bpmjs.TaskGroup = $hxClasses["bpmjs.TaskGroup"] = function() {
	bpmjs.Task.call(this);
	this.pendingTasks = new haxe.FastList();
	this.parallelTasksMax = 1;
	this.autoStart = false;
	this.tasks = new Array();
};
bpmjs.TaskGroup.__name__ = ["bpmjs","TaskGroup"];
bpmjs.TaskGroup.__super__ = bpmjs.Task;
bpmjs.TaskGroup.prototype = $extend(bpmjs.Task.prototype,{
	handleTaskError: function(taskError) {
		this.pendingTasks.remove(taskError.task);
		if(!this.autoStart) this.error(this,taskError.error); else {
			Log.posInfo = { fileName : "TaskGroup.hx", lineNumber : 99, className : "bpmjs.TaskGroup", methodName : "handleTaskError"};
			if(Log.filter(LogLevel.WARN)) {
				Log.fetchInput(taskError.error,null,null,null,null,null,null);
				console.warn(Log.createMessage());
			}
		}
	}
	,handleTaskComplete: function(task) {
		this.pendingTasks.remove(task);
		this.nextTask();
	}
	,nextTask: function() {
		var pendingTaskCount = Lambda.count(this.pendingTasks);
		if(pendingTaskCount >= this.parallelTasksMax) return;
		if(this.tasks.length > 0) {
			var pendingTask = this.tasks.shift();
			this.pendingTasks.add(pendingTask);
			pendingTask.completeSignaler.bind($bind(this,this.handleTaskComplete));
			pendingTask.errorSignaler.bind($bind(this,this.handleTaskError));
			pendingTask.start();
		} else if(!this.autoStart) this.complete();
	}
	,getTotalTaskCount: function() {
		return Lambda.count(this.pendingTasks) + Lambda.count(this.tasks);
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
	,doStart: function() {
		var _g = 0, _g1 = this.tasks;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			this.getMonitor().append(task.getMonitor(),1 / this.tasks.length);
		}
		this.nextTask();
	}
	,add: function(task) {
		this.tasks.push(task);
		if(this.autoStart) this.nextTask();
	}
	,pendingTasks: null
	,parallelTasksMax: null
	,autoStart: null
	,tasks: null
	,__class__: bpmjs.TaskGroup
});
bpmjs.Sequence = $hxClasses["bpmjs.Sequence"] = function(name) {
	bpmjs.TaskGroup.call(this);
	this.getMonitor().name = name;
	this.name = name;
	this.timer = new haxe.Timer(100);
	this.completeSignaler.bind($bind(this,this.handleComplete));
	this.errorSignaler.bind($bind(this,this.handleError));
};
bpmjs.Sequence.__name__ = ["bpmjs","Sequence"];
bpmjs.Sequence.__super__ = bpmjs.TaskGroup;
bpmjs.Sequence.prototype = $extend(bpmjs.TaskGroup.prototype,{
	handleError: function(error) {
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
	,handleComplete: function(task) {
		this.handleProgress();
		this.timer.stop();
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
						Log.posInfo = { fileName : "Sequencer.hx", lineNumber : 86, className : "bpmjs.Sequence", methodName : "execute"};
						if(Log.filter(LogLevel.INFO)) {
							Log.fetchInput("Phase '" + localPhase + "' " + Type.getClassName(contextObject.type) + "#" + fieldName,null,null,null,null,null,null);
							console.info(Log.createMessage());
						}
						try {
							var result = Reflect.field(object,fieldName).apply(object,[]);
							if(js.Boot.__instanceof(result,bpmjs.SequencerTaskGroup)) {
								Log.posInfo = { fileName : "Sequencer.hx", lineNumber : 92, className : "bpmjs.Sequence", methodName : "execute"};
								if(Log.filter(LogLevel.INFO)) {
									Log.fetchInput("Adding task '",reflect.ClassInfo.forInstance(result).name,null,null,null,null,null);
									console.info(Log.createMessage());
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
	,start: function() {
		this.timer.run = $bind(this,this.handleProgress);
		bpmjs.TaskGroup.prototype.start.call(this);
	}
	,addLoadingTask: function() {
		this.loadingTaskGroup = new bpmjs.LoadingTaskGroup(this);
		this.loadingTaskGroup.getMonitor().weight = 1000;
		this.add(this.loadingTaskGroup);
	}
	,addExecuteTask: function(phase) {
		this.add(new bpmjs.ExecutePhaseTask(this,phase));
	}
	,timer: null
	,loadingTaskGroup: null
	,objects: null
	,name: null
	,__class__: bpmjs.Sequence
});
bpmjs.ExecutePhaseTask = $hxClasses["bpmjs.ExecutePhaseTask"] = function(sequence,phase) {
	bpmjs.Task.call(this);
	this.getMonitor().name = "execute: " + phase;
	this.sequence = sequence;
	this.phase = phase;
};
bpmjs.ExecutePhaseTask.__name__ = ["bpmjs","ExecutePhaseTask"];
bpmjs.ExecutePhaseTask.__super__ = bpmjs.Task;
bpmjs.ExecutePhaseTask.prototype = $extend(bpmjs.Task.prototype,{
	doStart: function() {
		try {
			this.sequence.execute(this.phase);
		} catch( e ) {
			this.error(this,Std.string(e));
			return;
		}
		this.complete();
	}
	,phase: null
	,sequence: null
	,__class__: bpmjs.ExecutePhaseTask
});
bpmjs.LoadingTaskGroup = $hxClasses["bpmjs.LoadingTaskGroup"] = function(sequence) {
	bpmjs.TaskGroup.call(this);
	this.getMonitor().name = "loading";
};
bpmjs.LoadingTaskGroup.__name__ = ["bpmjs","LoadingTaskGroup"];
bpmjs.LoadingTaskGroup.__super__ = bpmjs.TaskGroup;
bpmjs.LoadingTaskGroup.prototype = $extend(bpmjs.TaskGroup.prototype,{
	__class__: bpmjs.LoadingTaskGroup
});
bpmjs.SequencerTaskGroup = $hxClasses["bpmjs.SequencerTaskGroup"] = function() {
	bpmjs.TaskGroup.call(this);
	this.getMonitor().name = "SequencerTaskGroup";
};
bpmjs.SequencerTaskGroup.__name__ = ["bpmjs","SequencerTaskGroup"];
bpmjs.SequencerTaskGroup.__super__ = bpmjs.TaskGroup;
bpmjs.SequencerTaskGroup.prototype = $extend(bpmjs.TaskGroup.prototype,{
	__class__: bpmjs.SequencerTaskGroup
});
bpmjs.Stats = $hxClasses["bpmjs.Stats"] = function() { }
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
	var time = new Date().getTime();
	bpmjs.Stats.fps = 1000 / (time - bpmjs.Stats.lastTime);
	bpmjs.Stats.lastTime = time;
}
bpmjs.Stats.checkStart = function(message) {
	bpmjs.Stats.checkInit();
	var time = new Date().getTime();
	bpmjs.Stats.times.push({ start : time, stop : 0.0, message : message});
}
bpmjs.Stats.addMessage = function(message) {
	bpmjs.Stats.checkInit();
	bpmjs.Stats.messages.push(message);
}
bpmjs.Stats.checkStop = function() {
	bpmjs.Stats.checkInit();
	var timeAndMessage = bpmjs.Stats.times.pop();
	timeAndMessage.stop = new Date().getTime();
	bpmjs.Stats.finishedTimes.push(timeAndMessage);
}
bpmjs.Stats.getContents = function() {
	var finalMessages = new Array();
	finalMessages.push("FPS: " + Math.round(bpmjs.Stats.fps));
	var _g = 0, _g1 = bpmjs.Stats.finishedTimes;
	while(_g < _g1.length) {
		var timeAndMessage = _g1[_g];
		++_g;
		finalMessages.push(" > " + timeAndMessage.message + ": " + (timeAndMessage.stop - timeAndMessage.start) + " ms");
	}
	var _g = 0, _g1 = bpmjs.Stats.messages;
	while(_g < _g1.length) {
		var message = _g1[_g];
		++_g;
		finalMessages.push(message);
	}
	return finalMessages;
}
bpmjs.Stats.checkInit = function() {
	if(!bpmjs.Stats.initialized) bpmjs.Stats.init();
}
bpmjs.TaskError = $hxClasses["bpmjs.TaskError"] = function() {
};
bpmjs.TaskError.__name__ = ["bpmjs","TaskError"];
bpmjs.TaskError.prototype = {
	error: null
	,task: null
	,__class__: bpmjs.TaskError
}
var ease = ease || {}
ease.Quad = $hxClasses["ease.Quad"] = function() { }
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
haxe.FastCell = $hxClasses["haxe.FastCell"] = function(elt,next) {
	this.elt = elt;
	this.next = next;
};
haxe.FastCell.__name__ = ["haxe","FastCell"];
haxe.FastCell.prototype = {
	next: null
	,elt: null
	,__class__: haxe.FastCell
}
haxe.FastList = $hxClasses["haxe.FastList"] = function() {
};
haxe.FastList.__name__ = ["haxe","FastList"];
haxe.FastList.prototype = {
	toString: function() {
		var a = new Array();
		var l = this.head;
		while(l != null) {
			a.push(l.elt);
			l = l.next;
		}
		return "{" + a.join(",") + "}";
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
	,isEmpty: function() {
		return this.head == null;
	}
	,pop: function() {
		var k = this.head;
		if(k == null) return null; else {
			this.head = k.next;
			return k.elt;
		}
	}
	,first: function() {
		return this.head == null?null:this.head.elt;
	}
	,add: function(item) {
		this.head = new haxe.FastCell(item,this.head);
	}
	,head: null
	,__class__: haxe.FastList
}
haxe.Http = $hxClasses["haxe.Http"] = function(url) {
	this.url = url;
	this.headers = new Hash();
	this.params = new Hash();
	this.async = true;
};
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.requestUrl = function(url) {
	var h = new haxe.Http(url);
	h.async = false;
	var r = null;
	h.onData = function(d) {
		r = d;
	};
	h.onError = function(e) {
		throw e;
	};
	h.request(false);
	return r;
}
haxe.Http.prototype = {
	onStatus: function(status) {
	}
	,onError: function(msg) {
	}
	,onData: function(data) {
	}
	,request: function(post) {
		var me = this;
		var r = new js.XMLHttpRequest();
		var onreadystatechange = function() {
			if(r.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = r.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) me.onData(r.responseText); else switch(s) {
			case null: case undefined:
				me.onError("Failed to connect or resolve host");
				break;
			case 12029:
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.onError("Unknown host");
				break;
			default:
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var $it0 = this.params.keys();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				if(uri == null) uri = ""; else uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(this.params.get(p));
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		if(this.headers.get("Content-Type") == null && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var $it1 = this.headers.keys();
		while( $it1.hasNext() ) {
			var h = $it1.next();
			r.setRequestHeader(h,this.headers.get(h));
		}
		r.send(uri);
		if(!this.async) onreadystatechange();
	}
	,setPostData: function(data) {
		this.postData = data;
	}
	,setParameter: function(param,value) {
		this.params.set(param,value);
	}
	,setHeader: function(header,value) {
		this.headers.set(header,value);
	}
	,params: null
	,headers: null
	,postData: null
	,async: null
	,url: null
	,__class__: haxe.Http
}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.TypeTools = $hxClasses["haxe.TypeTools"] = function() { }
haxe.TypeTools.__name__ = ["haxe","TypeTools"];
haxe.TypeTools.getClassNames = function(value) {
	var result = new List();
	var valueClass = js.Boot.__instanceof(value,Class)?value:Type.getClass(value);
	while(null != valueClass) {
		result.add(Type.getClassName(valueClass));
		valueClass = Type.getSuperClass(valueClass);
	}
	return result;
}
if(!haxe.exception) haxe.exception = {}
haxe.exception.Exception = $hxClasses["haxe.exception.Exception"] = function(message,innerException,numberOfStackTraceShifts) {
	this.message = null == message?"Unknown exception":message;
	this.innerException = innerException;
	this.generateStackTrace(numberOfStackTraceShifts);
	this.stackTrace = this.stackTraceArray;
};
haxe.exception.Exception.__name__ = ["haxe","exception","Exception"];
haxe.exception.Exception.prototype = {
	toString: function() {
		return this.message + haxe.Stack.toString(this.stackTraceArray);
	}
	,getBaseException: function() {
		var result = this;
		while(null != result.innerException) result = result.innerException;
		return result;
	}
	,generateStackTrace: function(numberOfStackTraceShifts) {
		this.stackTraceArray = haxe.Stack.callStack().slice(numberOfStackTraceShifts + 1);
		var exceptionClass = Type.getClass(this);
		while(haxe.exception.Exception != exceptionClass) {
			this.stackTraceArray.shift();
			exceptionClass = Type.getSuperClass(exceptionClass);
		}
	}
	,stackTraceArray: null
	,stackTrace: null
	,message: null
	,innerException: null
	,baseException: null
	,__class__: haxe.exception.Exception
	,__properties__: {get_baseException:"getBaseException"}
}
haxe.exception.ArgumentNullException = $hxClasses["haxe.exception.ArgumentNullException"] = function(argumentName,numberOfStackTraceShifts) {
	haxe.exception.Exception.call(this,"Argument " + argumentName + " must be non-null",null,numberOfStackTraceShifts);
};
haxe.exception.ArgumentNullException.__name__ = ["haxe","exception","ArgumentNullException"];
haxe.exception.ArgumentNullException.__super__ = haxe.exception.Exception;
haxe.exception.ArgumentNullException.prototype = $extend(haxe.exception.Exception.prototype,{
	__class__: haxe.exception.ArgumentNullException
});
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
haxe.rtti.TypeApi = $hxClasses["haxe.rtti.TypeApi"] = function() { }
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
haxe.rtti.Meta = $hxClasses["haxe.rtti.Meta"] = function() { }
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
haxe.rtti.XmlParser = $hxClasses["haxe.rtti.XmlParser"] = function() {
	this.root = new Array();
};
haxe.rtti.XmlParser.__name__ = ["haxe","rtti","XmlParser"];
haxe.rtti.XmlParser.prototype = {
	defplat: function() {
		var l = new List();
		if(this.curplatform != null) l.add(this.curplatform);
		return l;
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
					var eargs = HxOverrides.iter(aname);
					var $it0 = x.getElements();
					while( $it0.hasNext() ) {
						var e = $it0.next();
						var opt = false;
						var a = eargs.next();
						if(a == null) a = "";
						if(a.charAt(0) == "?") {
							opt = true;
							a = HxOverrides.substr(a,1,null);
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
	,xtypedef: function(x) {
		var doc = null;
		var t = null;
		var $it0 = x.getElements();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			if(c.getName() == "haxe_doc") doc = c.getInnerData(); else if(c.getName() == "meta") {
			} else t = this.xtype(c);
		}
		var types = new Hash();
		if(this.curplatform != null) types.set(this.curplatform,t);
		return { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), params : this.mkTypeParams(x.att.resolve("params")), type : t, types : types, platforms : this.defplat()};
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
					c = HxOverrides.substr(c,1,null);
				}
				args.add({ name : c, opt : opt, t : this.xtype(elts.next())});
			}
		}
		return { name : x.getName(), args : args, doc : xdoc == null?null:new haxe.xml.Fast(xdoc).getInnerData(), platforms : this.defplat()};
	}
	,xenum: function(x) {
		var cl = new List();
		var doc = null;
		var $it0 = x.getElements();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			if(c.getName() == "haxe_doc") doc = c.getInnerData(); else if(c.getName() == "meta") {
			} else cl.add(this.xenumfield(c));
		}
		return { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), params : this.mkTypeParams(x.att.resolve("params")), constructors : cl, platforms : this.defplat()};
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
			case "meta":
				break;
			default:
				this.xerror(c);
			}
		}
		return { name : x.getName(), type : t, isPublic : x.x.exists("public"), isOverride : x.x.exists("override"), doc : doc, get : x.has.resolve("get")?this.mkRights(x.att.resolve("get")):haxe.rtti.Rights.RNormal, set : x.has.resolve("set")?this.mkRights(x.att.resolve("set")):haxe.rtti.Rights.RNormal, params : x.has.resolve("params")?this.mkTypeParams(x.att.resolve("params")):null, platforms : this.defplat()};
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
			case "meta":
				break;
			default:
				if(c.x.exists("static")) statics.add(this.xclassfield(c)); else fields.add(this.xclassfield(c));
			}
		}
		return { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), isInterface : x.x.exists("interface"), params : this.mkTypeParams(x.att.resolve("params")), superClass : csuper, interfaces : interfaces, fields : fields, statics : statics, tdynamic : tdynamic, platforms : this.defplat()};
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
	,xroot: function(x) {
		var $it0 = x.x.elements();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			this.merge(this.processElement(c));
		}
	}
	,xerror: function(c) {
		return (function($this) {
			var $r;
			throw "Invalid " + c.getName();
			return $r;
		}(this));
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
	,mkTypeParams: function(p) {
		var pl = p.split(":");
		if(pl[0] == "") return new Array();
		return pl;
	}
	,mkPath: function(p) {
		return p;
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
	,mergeTypedefs: function(t,t2) {
		if(this.curplatform == null) return false;
		t.platforms.add(this.curplatform);
		t.types.set(this.curplatform,t2.type);
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
			if(found == null) {
				this.newField(c,f2);
				c.fields.add(f2);
			} else if(this.curplatform != null) found.platforms.add(this.curplatform);
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
			if(found == null) {
				this.newField(c,f2);
				c.statics.add(f2);
			} else if(this.curplatform != null) found.platforms.add(this.curplatform);
		}
		return true;
	}
	,newField: function(c,f) {
	}
	,mergeFields: function(f,f2) {
		return haxe.rtti.TypeApi.fieldEq(f,f2) || f.name == f2.name && (this.mergeRights(f,f2) || this.mergeRights(f2,f)) && this.mergeDoc(f,f2) && haxe.rtti.TypeApi.fieldEq(f,f2);
	}
	,mergeDoc: function(f1,f2) {
		if(f1.doc == null) f2.doc = f2.doc; else if(f2.doc == null) f2.doc = f1.doc;
		return true;
	}
	,mergeRights: function(f1,f2) {
		if(f1.get == haxe.rtti.Rights.RInline && f1.set == haxe.rtti.Rights.RNo && f2.get == haxe.rtti.Rights.RNormal && f2.set == haxe.rtti.Rights.RMethod) {
			f1.get = haxe.rtti.Rights.RNormal;
			f1.set = haxe.rtti.Rights.RMethod;
			return true;
		}
		return false;
	}
	,process: function(x,platform) {
		this.curplatform = platform;
		this.xroot(new haxe.xml.Fast(x));
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
	,curplatform: null
	,root: null
	,__class__: haxe.rtti.XmlParser
}
if(!haxe.xml) haxe.xml = {}
if(!haxe.xml._Fast) haxe.xml._Fast = {}
haxe.xml._Fast.NodeAccess = $hxClasses["haxe.xml._Fast.NodeAccess"] = function(x) {
	this.__x = x;
};
haxe.xml._Fast.NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe.xml._Fast.NodeAccess.prototype = {
	resolve: function(name) {
		var x = this.__x.elementsNamed(name).next();
		if(x == null) {
			var xname = this.__x.nodeType == Xml.Document?"Document":this.__x.getNodeName();
			throw xname + " is missing element " + name;
		}
		return new haxe.xml.Fast(x);
	}
	,__x: null
	,__class__: haxe.xml._Fast.NodeAccess
}
haxe.xml._Fast.AttribAccess = $hxClasses["haxe.xml._Fast.AttribAccess"] = function(x) {
	this.__x = x;
};
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype = {
	resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
		var v = this.__x.get(name);
		if(v == null) throw this.__x.getNodeName() + " is missing attribute " + name;
		return v;
	}
	,__x: null
	,__class__: haxe.xml._Fast.AttribAccess
}
haxe.xml._Fast.HasAttribAccess = $hxClasses["haxe.xml._Fast.HasAttribAccess"] = function(x) {
	this.__x = x;
};
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype = {
	resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
		return this.__x.exists(name);
	}
	,__x: null
	,__class__: haxe.xml._Fast.HasAttribAccess
}
haxe.xml._Fast.HasNodeAccess = $hxClasses["haxe.xml._Fast.HasNodeAccess"] = function(x) {
	this.__x = x;
};
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype = {
	resolve: function(name) {
		return this.__x.elementsNamed(name).hasNext();
	}
	,__x: null
	,__class__: haxe.xml._Fast.HasNodeAccess
}
haxe.xml._Fast.NodeListAccess = $hxClasses["haxe.xml._Fast.NodeListAccess"] = function(x) {
	this.__x = x;
};
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype = {
	resolve: function(name) {
		var l = new List();
		var $it0 = this.__x.elementsNamed(name);
		while( $it0.hasNext() ) {
			var x = $it0.next();
			l.add(new haxe.xml.Fast(x));
		}
		return l;
	}
	,__x: null
	,__class__: haxe.xml._Fast.NodeListAccess
}
haxe.xml.Fast = $hxClasses["haxe.xml.Fast"] = function(x) {
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + Std.string(x.nodeType);
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
};
haxe.xml.Fast.__name__ = ["haxe","xml","Fast"];
haxe.xml.Fast.prototype = {
	getElements: function() {
		var it = this.x.elements();
		return { hasNext : $bind(it,it.hasNext), next : function() {
			var x = it.next();
			if(x == null) return null;
			return new haxe.xml.Fast(x);
		}};
	}
	,getInnerHTML: function() {
		var s = new StringBuf();
		var $it0 = this.x.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			s.b += Std.string(x.toString());
		}
		return s.b;
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
	,getName: function() {
		return this.x.nodeType == Xml.Document?"Document":this.x.getNodeName();
	}
	,elements: null
	,hasNode: null
	,has: null
	,att: null
	,nodes: null
	,node: null
	,innerHTML: null
	,innerData: null
	,name: null
	,x: null
	,__class__: haxe.xml.Fast
	,__properties__: {get_name:"getName",get_innerData:"getInnerData",get_innerHTML:"getInnerHTML",get_elements:"getElements"}
}
haxe.xml.Parser = $hxClasses["haxe.xml.Parser"] = function() { }
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
}
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == str.charCodeAt(start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.getNodeName()) throw "Expected </" + parent.getNodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProlog(str1));
				state = 1;
			}
			break;
		}
		c = str.charCodeAt(++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
}
haxe.xml.Parser.isValidChar = function(c) {
	return c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45;
}
var hsl = hsl || {}
if(!hsl.haxe) hsl.haxe = {}
hsl.haxe.Bond = $hxClasses["hsl.haxe.Bond"] = function() {
	this.halted = false;
};
hsl.haxe.Bond.__name__ = ["hsl","haxe","Bond"];
hsl.haxe.Bond.prototype = {
	resume: function() {
		this.halted = false;
	}
	,halt: function() {
		this.halted = true;
	}
	,destroyOnUse: function() {
		this.willDestroyOnUse = true;
		return this;
	}
	,destroy: function() {
	}
	,willDestroyOnUse: null
	,halted: null
	,__class__: hsl.haxe.Bond
}
hsl.haxe.Signaler = $hxClasses["hsl.haxe.Signaler"] = function() { }
hsl.haxe.Signaler.__name__ = ["hsl","haxe","Signaler"];
hsl.haxe.Signaler.prototype = {
	unbindVoid: null
	,unbindAdvanced: null
	,unbind: null
	,removeNotificationTarget: null
	,removeBubblingTarget: null
	,getIsListenedTo: null
	,dispatch: null
	,bindVoid: null
	,bindAdvanced: null
	,bind: null
	,addNotificationTarget: null
	,addBubblingTarget: null
	,subject: null
	,isListenedTo: null
	,__class__: hsl.haxe.Signaler
	,__properties__: {get_isListenedTo:"getIsListenedTo"}
}
hsl.haxe.DirectSignaler = $hxClasses["hsl.haxe.DirectSignaler"] = function(subject,rejectNullData) {
	if(null == subject) throw new haxe.exception.ArgumentNullException("subject",1);
	this.subject = subject;
	this.rejectNullData = rejectNullData;
	this.sentinel = new hsl.haxe._DirectSignaler.SentinelBond();
};
hsl.haxe.DirectSignaler.__name__ = ["hsl","haxe","DirectSignaler"];
hsl.haxe.DirectSignaler.__interfaces__ = [hsl.haxe.Signaler];
hsl.haxe.DirectSignaler.prototype = {
	unbindVoid: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.NiladicBond(listener));
	}
	,unbindAdvanced: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
	}
	,unbind: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.RegularBond(listener));
	}
	,removeNotificationTarget: function(value) {
		if(null != this.notificationTargets) this.notificationTargets.remove(value);
	}
	,removeBubblingTarget: function(value) {
		if(null != this.bubblingTargets) this.bubblingTargets.remove(value);
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
	,getOrigin: function(origin) {
		return null == origin?this.subject:origin;
	}
	,getIsListenedTo: function() {
		return this.sentinel.getIsConnected();
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
	,bindVoid: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.NiladicBond(listener));
	}
	,bindAdvanced: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
	}
	,bind: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.RegularBond(listener));
	}
	,addNotificationTarget: function(value) {
		if(null == this.notificationTargets) this.notificationTargets = new List();
		this.notificationTargets.add(value);
	}
	,addBubblingTarget: function(value) {
		if(null == this.bubblingTargets) this.bubblingTargets = new List();
		this.bubblingTargets.add(value);
	}
	,subjectClassNames: null
	,subject: null
	,sentinel: null
	,rejectNullData: null
	,notificationTargets: null
	,isListenedTo: null
	,bubblingTargets: null
	,__class__: hsl.haxe.DirectSignaler
	,__properties__: {get_isListenedTo:"getIsListenedTo"}
}
if(!hsl.haxe._DirectSignaler) hsl.haxe._DirectSignaler = {}
hsl.haxe._DirectSignaler.LinkedBond = $hxClasses["hsl.haxe._DirectSignaler.LinkedBond"] = function() {
	hsl.haxe.Bond.call(this);
	this.destroyed = false;
};
hsl.haxe._DirectSignaler.LinkedBond.__name__ = ["hsl","haxe","_DirectSignaler","LinkedBond"];
hsl.haxe._DirectSignaler.LinkedBond.__super__ = hsl.haxe.Bond;
hsl.haxe._DirectSignaler.LinkedBond.prototype = $extend(hsl.haxe.Bond.prototype,{
	unlink: function() {
		if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	,destroy: function() {
		if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	,determineEquals: function(value) {
		return false;
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		return 0;
	}
	,previous: null
	,next: null
	,destroyed: null
	,__class__: hsl.haxe._DirectSignaler.LinkedBond
});
hsl.haxe._DirectSignaler.SentinelBond = $hxClasses["hsl.haxe._DirectSignaler.SentinelBond"] = function() {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.next = this.previous = this;
};
hsl.haxe._DirectSignaler.SentinelBond.__name__ = ["hsl","haxe","_DirectSignaler","SentinelBond"];
hsl.haxe._DirectSignaler.SentinelBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.SentinelBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	remove: function(value) {
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
	,getIsConnected: function() {
		return this.next != this;
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		var node = this.next;
		while(node != this && 1 != propagationStatus) {
			propagationStatus = node.callListener(data,currentTarget,origin,propagationStatus);
			node = node.next;
		}
		return propagationStatus;
	}
	,add: function(value) {
		value.next = this;
		value.previous = this.previous;
		return this.previous = this.previous.next = value;
	}
	,isConnected: null
	,__class__: hsl.haxe._DirectSignaler.SentinelBond
	,__properties__: {get_isConnected:"getIsConnected"}
});
hsl.haxe._DirectSignaler.RegularBond = $hxClasses["hsl.haxe._DirectSignaler.RegularBond"] = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.RegularBond.__name__ = ["hsl","haxe","_DirectSignaler","RegularBond"];
hsl.haxe._DirectSignaler.RegularBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.RegularBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.RegularBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
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
	,listener: null
	,__class__: hsl.haxe._DirectSignaler.RegularBond
});
hsl.haxe._DirectSignaler.NiladicBond = $hxClasses["hsl.haxe._DirectSignaler.NiladicBond"] = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.NiladicBond.__name__ = ["hsl","haxe","_DirectSignaler","NiladicBond"];
hsl.haxe._DirectSignaler.NiladicBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.NiladicBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.NiladicBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
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
	,listener: null
	,__class__: hsl.haxe._DirectSignaler.NiladicBond
});
hsl.haxe._DirectSignaler.AdvancedBond = $hxClasses["hsl.haxe._DirectSignaler.AdvancedBond"] = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.AdvancedBond.__name__ = ["hsl","haxe","_DirectSignaler","AdvancedBond"];
hsl.haxe._DirectSignaler.AdvancedBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.AdvancedBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.AdvancedBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
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
			if(signal.immediatePropagationStopped) return 1; else if(signal.propagationStopped) return 2;
		}
		return propagationStatus;
	}
	,listener: null
	,__class__: hsl.haxe._DirectSignaler.AdvancedBond
});
hsl.haxe._DirectSignaler.PropagationStatus = $hxClasses["hsl.haxe._DirectSignaler.PropagationStatus"] = function() { }
hsl.haxe._DirectSignaler.PropagationStatus.__name__ = ["hsl","haxe","_DirectSignaler","PropagationStatus"];
hsl.haxe.Signal = $hxClasses["hsl.haxe.Signal"] = function(data,currentBond,currentTarget,origin) {
	this.data = data;
	this.currentBond = currentBond;
	this.currentTarget = currentTarget;
	this.origin = origin;
	this.immediatePropagationStopped = false;
	this.propagationStopped = false;
};
hsl.haxe.Signal.__name__ = ["hsl","haxe","Signal"];
hsl.haxe.Signal.prototype = {
	stopPropagation: function() {
		this.propagationStopped = true;
	}
	,stopImmediatePropagation: function() {
		this.immediatePropagationStopped = true;
	}
	,getData: function() {
		return this.data;
	}
	,propagationStopped: null
	,origin: null
	,immediatePropagationStopped: null
	,data1: null
	,data: null
	,currentTarget: null
	,currentBond: null
	,__class__: hsl.haxe.Signal
	,__properties__: {get_data1:"getData"}
}
var kumite = kumite || {}
if(!kumite.blobs) kumite.blobs = {}
kumite.blobs.Blob = $hxClasses["kumite.blobs.Blob"] = function() {
};
kumite.blobs.Blob.__name__ = ["kumite","blobs","Blob"];
kumite.blobs.Blob.prototype = {
	speed: null
	,area: null
	,z: null
	,y: null
	,x: null
	,blobId: null
	,__class__: kumite.blobs.Blob
}
kumite.blobs.BlobReaderFusionWS = $hxClasses["kumite.blobs.BlobReaderFusionWS"] = function() {
	kumite.fusion.FusionConnection.host = "ws://192.168.1.50:12010";
	this.lastParse = 0;
};
kumite.blobs.BlobReaderFusionWS.__name__ = ["kumite","blobs","BlobReaderFusionWS"];
kumite.blobs.BlobReaderFusionWS.__interfaces__ = [haxe.rtti.Infos];
kumite.blobs.BlobReaderFusionWS.prototype = {
	getDist: function(newBlob,oldBlob) {
		var dx = newBlob.x - oldBlob.x;
		var dy = newBlob.y - oldBlob.y;
		var dz = 0;
		var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
		return dist;
	}
	,mergeBlobs: function(newBlobs) {
		var result = new Array();
		var _g = 0;
		while(_g < newBlobs.length) {
			var newBlob = newBlobs[_g];
			++_g;
			var equalOldBlob = null;
			var _g1 = 0, _g2 = this.blobs.blobs;
			while(_g1 < _g2.length) {
				var oldBlob = _g2[_g1];
				++_g1;
				if(this.getDist(newBlob,oldBlob) < 0.3) {
					equalOldBlob = oldBlob;
					break;
				}
			}
			if(equalOldBlob == null) {
				kumite.blobs.BlobReaderFusionWS.BLOB_ID++;
				newBlob.speed = 0;
				newBlob.blobId = kumite.blobs.BlobReaderFusionWS.BLOB_ID;
			} else {
				newBlob.blobId = equalOldBlob.blobId;
				var newSpeed = this.getDist(equalOldBlob,newBlob) * 100.;
				newBlob.speed = equalOldBlob.speed;
				newBlob.speed += (newSpeed - newBlob.speed) * 0.2;
				newBlob.speed = Clamp["float"](newBlob.speed,0,1);
				HxOverrides.remove(this.blobs.blobs,equalOldBlob);
			}
			result.push(newBlob);
		}
		this.blobs.blobs = result;
	}
	,onData: function(r) {
		this.lastParse = this.time.ms;
		var xml = Xml.parse(r);
		var newBlobs = new Array();
		try {
			var $it0 = xml.firstElement().iterator();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				var fast = new haxe.xml.Fast(p);
				var blob = new kumite.blobs.Blob();
				blob.x = Std.parseFloat(fast.att.resolve("x"));
				blob.y = Std.parseFloat(fast.att.resolve("y"));
				blob.z = Std.parseFloat(fast.att.resolve("z"));
				blob.area = Std.parseFloat(fast.att.resolve("area"));
				newBlobs.push(blob);
			}
		} catch( e ) {
		}
		this.mergeBlobs(newBlobs);
	}
	,handleFusionData: function(data) {
		var newBlobs = new Array();
		var floats = new Float32Array(data);
		var blobCount = floats.length / 3 | 0;
		var clipping = this.config.clipping[0];
		var _g = 0;
		while(_g < blobCount) {
			var i = _g++;
			var blob = new kumite.blobs.Blob();
			blob.x = floats[i * 3] / (clipping.xMax - clipping.xMin);
			blob.y = floats[i * 3 + 1] / (clipping.yMax - clipping.yMin);
			blob.z = floats[i * 3 + 2] / (clipping.zMax - clipping.zMin);
			newBlobs.push(blob);
		}
		this.mergeBlobs(newBlobs);
	}
	,run: function() {
		this.fusion.get();
	}
	,start: function() {
		this.config = { name : "Eyes", clipping : [{ type : "include", xMin : -2500, xMax : 2500, yMin : -1000, yMax : 200, zMin : 200, zMax : 1600}], blobs : { enabled : true, minPointsPerCell : 1, smoothing : 0.1, width : 100, depth : 50}};
		this.fusion = new kumite.fusion.FusionConnection();
		this.fusion.dataSignaler.bind($bind(this,this.handleFusionData));
		this.fusion.setConfig(this.config);
		this.fusion.init();
		var timer = new bpmjs.FrameTimer();
		timer.run = $bind(this,this.run);
		timer.start();
	}
	,fusion: null
	,config: null
	,lastParse: null
	,time: null
	,blobs: null
	,__class__: kumite.blobs.BlobReaderFusionWS
}
kumite.blobs.BlobReaderHTTP = $hxClasses["kumite.blobs.BlobReaderHTTP"] = function() {
};
kumite.blobs.BlobReaderHTTP.__name__ = ["kumite","blobs","BlobReaderHTTP"];
kumite.blobs.BlobReaderHTTP.__interfaces__ = [haxe.rtti.Infos];
kumite.blobs.BlobReaderHTTP.prototype = {
	onError: function(r) {
		this.readBlobs();
	}
	,onData: function(r) {
		var xml = Xml.parse(r);
		this.blobs.blobs = new Array();
		try {
			var $it0 = xml.elements();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				var fast = new haxe.xml.Fast(p);
				var blob = new kumite.blobs.Blob();
				blob.x = Std.parseFloat(fast.node.resolve("x").getInnerData());
				blob.y = Std.parseFloat(fast.node.resolve("y").getInnerData());
				blob.z = Std.parseFloat(fast.node.resolve("z").getInnerData());
				blob.area = Std.parseFloat(fast.node.resolve("area").getInnerData());
				this.blobs.blobs.push(blob);
			}
		} catch( e ) {
		}
		this.readBlobs();
	}
	,readBlobs: function() {
		var r = new haxe.Http("http://192.168.2.201/data/blobs.php");
		r.onError = $bind(this,this.onError);
		r.onData = $bind(this,this.onData);
		r.request(false);
	}
	,start: function() {
		this.readBlobs();
	}
	,blobs: null
	,__class__: kumite.blobs.BlobReaderHTTP
}
kumite.blobs.BlobReaderMouse = $hxClasses["kumite.blobs.BlobReaderMouse"] = function() {
	this.mouse = new Vec2();
};
kumite.blobs.BlobReaderMouse.__name__ = ["kumite","blobs","BlobReaderMouse"];
kumite.blobs.BlobReaderMouse.__interfaces__ = [haxe.rtti.Infos];
kumite.blobs.BlobReaderMouse.prototype = {
	mouseMove: function(position) {
		this.mouse.x = 1 - position.x;
		this.mouse.y = position.y;
	}
	,tick: function(tick) {
		this.blobs.blobs = new Array();
		var blob = new kumite.blobs.Blob();
		blob.x = this.mouse.x;
		blob.y = 0;
		blob.z = 2500;
		blob.speed = 0.4;
		blob.area = 0.3;
		this.blobs.blobs.push(blob);
	}
	,init: function() {
		GLMouseRegistry.getInstance().mouseMoveSignaler.bind($bind(this,this.mouseMove));
	}
	,mouse: null
	,time: null
	,blobs: null
	,__class__: kumite.blobs.BlobReaderMouse
}
kumite.blobs.BlobReaderWS = $hxClasses["kumite.blobs.BlobReaderWS"] = function(host) {
	this.host = host;
	this.lastParse = 0;
};
kumite.blobs.BlobReaderWS.__name__ = ["kumite","blobs","BlobReaderWS"];
kumite.blobs.BlobReaderWS.__interfaces__ = [haxe.rtti.Infos];
kumite.blobs.BlobReaderWS.prototype = {
	getDist: function(newBlob,oldBlob) {
		var dx = newBlob.x - oldBlob.x;
		var dy = newBlob.y - oldBlob.y;
		var dz = 0;
		var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
		return dist;
	}
	,mergeBlobs: function(newBlobs) {
		var result = new Array();
		var _g = 0;
		while(_g < newBlobs.length) {
			var newBlob = newBlobs[_g];
			++_g;
			var equalOldBlob = null;
			var _g1 = 0, _g2 = this.blobs.blobs;
			while(_g1 < _g2.length) {
				var oldBlob = _g2[_g1];
				++_g1;
				if(this.getDist(newBlob,oldBlob) < 0.3) {
					equalOldBlob = oldBlob;
					break;
				}
			}
			if(equalOldBlob == null) {
				kumite.blobs.BlobReaderWS.BLOB_ID++;
				newBlob.speed = 0;
				newBlob.blobId = kumite.blobs.BlobReaderWS.BLOB_ID;
			} else {
				newBlob.blobId = equalOldBlob.blobId;
				var newSpeed = this.getDist(equalOldBlob,newBlob) * 100.;
				newBlob.speed = equalOldBlob.speed;
				newBlob.speed += (newSpeed - newBlob.speed) * 0.2;
				newBlob.speed = Clamp["float"](newBlob.speed,0,1);
				HxOverrides.remove(this.blobs.blobs,equalOldBlob);
			}
			result.push(newBlob);
		}
		this.blobs.blobs = result;
	}
	,onData: function(r) {
		this.lastParse = this.time.ms;
		var xml = Xml.parse(r);
		var newBlobs = new Array();
		try {
			var $it0 = xml.firstElement().iterator();
			while( $it0.hasNext() ) {
				var p = $it0.next();
				var fast = new haxe.xml.Fast(p);
				var blob = new kumite.blobs.Blob();
				blob.x = Std.parseFloat(fast.att.resolve("x"));
				blob.y = Std.parseFloat(fast.att.resolve("y"));
				blob.z = Std.parseFloat(fast.att.resolve("z"));
				blob.area = Std.parseFloat(fast.att.resolve("area"));
				newBlobs.push(blob);
			}
		} catch( e ) {
		}
		this.mergeBlobs(newBlobs);
	}
	,handleClose: function(event) {
		Log.posInfo = { fileName : "BlobReaderWS.hx", lineNumber : 47, className : "kumite.blobs.BlobReaderWS", methodName : "handleClose"};
		if(Log.filter(LogLevel.WARN)) {
			Log.fetchInput("close",null,null,null,null,null,null);
			console.warn(Log.createMessage());
		}
		Timeout.execute(1000,$bind(this,this.start));
	}
	,handleMessage: function(event) {
		this.onData(event.data);
	}
	,handleOpen: function(event) {
		Log.posInfo = { fileName : "BlobReaderWS.hx", lineNumber : 37, className : "kumite.blobs.BlobReaderWS", methodName : "handleOpen"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput("open",null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	,start: function() {
		this.socket = new WebSocket(this.host);
		this.socket.onopen = $bind(this,this.handleOpen);
		this.socket.onmessage = $bind(this,this.handleMessage);
		this.socket.onclose = $bind(this,this.handleClose);
	}
	,lastParse: null
	,socket: null
	,host: null
	,time: null
	,blobs: null
	,__class__: kumite.blobs.BlobReaderWS
}
kumite.blobs.Blobs = $hxClasses["kumite.blobs.Blobs"] = function() {
	this.blobs = new Array();
};
kumite.blobs.Blobs.__name__ = ["kumite","blobs","Blobs"];
kumite.blobs.Blobs.prototype = {
	blobs: null
	,__class__: kumite.blobs.Blobs
}
kumite.blobs.Config = $hxClasses["kumite.blobs.Config"] = function() {
	this.blobs = new kumite.blobs.Blobs();
	this.blobReaderFusion = new kumite.blobs.BlobReaderFusionWS();
};
kumite.blobs.Config.__name__ = ["kumite","blobs","Config"];
kumite.blobs.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.blobs.Config.prototype = {
	blobReaderFusion: null
	,blobReaderMouse: null
	,blobReaderWS: null
	,blobReaderHTTP: null
	,blobs: null
	,__class__: kumite.blobs.Config
}
if(!kumite.camera) kumite.camera = {}
kumite.camera.Camera = $hxClasses["kumite.camera.Camera"] = function() {
};
kumite.camera.Camera.__name__ = ["kumite","camera","Camera"];
kumite.camera.Camera.prototype = {
	matrix: null
	,__class__: kumite.camera.Camera
}
kumite.camera.CameraMouseMover = $hxClasses["kumite.camera.CameraMouseMover"] = function() {
};
kumite.camera.CameraMouseMover.__name__ = ["kumite","camera","CameraMouseMover"];
kumite.camera.CameraMouseMover.__interfaces__ = [haxe.rtti.Infos];
kumite.camera.CameraMouseMover.prototype = {
	updateCamera: function() {
		this.camera.matrix.setIdentity();
		this.camera.matrix.setLookAt(new Vec3(0,0,10),new Vec3(0,0,0),new Vec3(0,1,0));
	}
	,init: function() {
		this.camera.matrix = new Matrix4();
		this.updateCamera();
	}
	,camera: null
	,__class__: kumite.camera.CameraMouseMover
}
kumite.camera.Config = $hxClasses["kumite.camera.Config"] = function() {
	this.camera = new kumite.camera.Camera();
	this.cameraMouseMover = new kumite.camera.CameraMouseMover();
};
kumite.camera.Config.__name__ = ["kumite","camera","Config"];
kumite.camera.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.camera.Config.prototype = {
	cameraMouseMover: null
	,camera: null
	,__class__: kumite.camera.Config
}
if(!kumite.canvas) kumite.canvas = {}
kumite.canvas.CanvasCase = $hxClasses["kumite.canvas.CanvasCase"] = function() {
};
kumite.canvas.CanvasCase.__name__ = ["kumite","canvas","CanvasCase"];
kumite.canvas.CanvasCase.prototype = {
	itself: null
	,__class__: kumite.canvas.CanvasCase
}
kumite.canvas.CanvasController = $hxClasses["kumite.canvas.CanvasController"] = function() {
};
kumite.canvas.CanvasController.__name__ = ["kumite","canvas","CanvasController"];
kumite.canvas.CanvasController.__interfaces__ = [haxe.rtti.Infos];
kumite.canvas.CanvasController.prototype = {
	updateCanvasSizeFromStage: function(message) {
		this.canvas.itself.width = this.stage.width;
		this.canvas.itself.height = this.stage.height;
	}
	,init: function() {
		this.updateCanvasSizeFromStage();
	}
	,initPrepare: function() {
		this.canvas.itself = js.Lib.document.getElementById("content");
	}
	,stage: null
	,canvas: null
	,__class__: kumite.canvas.CanvasController
}
kumite.canvas.Config = $hxClasses["kumite.canvas.Config"] = function() {
	this.canvasCase = new kumite.canvas.CanvasCase();
	this.canvasController = new kumite.canvas.CanvasController();
};
kumite.canvas.Config.__name__ = ["kumite","canvas","Config"];
kumite.canvas.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.canvas.Config.prototype = {
	canvasController: null
	,canvasCase: null
	,__class__: kumite.canvas.Config
}
if(!kumite.displaylist) kumite.displaylist = {}
kumite.displaylist.ConfigAsLayer = $hxClasses["kumite.displaylist.ConfigAsLayer"] = function() {
	this.displayListLayer = new kumite.displaylist.DisplayListLayer();
	this.stage = GLDisplayList.getDefault().stage;
};
kumite.displaylist.ConfigAsLayer.__name__ = ["kumite","displaylist","ConfigAsLayer"];
kumite.displaylist.ConfigAsLayer.__interfaces__ = [haxe.rtti.Infos];
kumite.displaylist.ConfigAsLayer.prototype = {
	stage: null
	,displayListLayer: null
	,__class__: kumite.displaylist.ConfigAsLayer
}
if(!kumite.scene) kumite.scene = {}
kumite.scene.LayerLifecycle = $hxClasses["kumite.scene.LayerLifecycle"] = function() { }
kumite.scene.LayerLifecycle.__name__ = ["kumite","scene","LayerLifecycle"];
kumite.scene.LayerLifecycle.prototype = {
	renderTransition: null
	,render: null
	,init: null
	,__class__: kumite.scene.LayerLifecycle
}
kumite.displaylist.DisplayListLayer = $hxClasses["kumite.displaylist.DisplayListLayer"] = function() {
};
kumite.displaylist.DisplayListLayer.__name__ = ["kumite","displaylist","DisplayListLayer"];
kumite.displaylist.DisplayListLayer.__interfaces__ = [kumite.scene.LayerLifecycle,haxe.rtti.Infos];
kumite.displaylist.DisplayListLayer.prototype = {
	render: function(renderContext) {
		bpmjs.Stats.measureFPS();
		GLDisplayList.getDefault().stage.alpha = this.transition;
		GLDisplayList.getDefault().setStageSize(renderContext.getWidth(),renderContext.getHeight());
		GLDisplayList.getDefault().dispatchEnterFrame();
		this.renderer.render(renderContext.getWidth(),renderContext.getHeight());
	}
	,renderTransition: function(transitionContext) {
		this.transition = transitionContext.getTransition();
		this.render(transitionContext);
	}
	,init: function() {
		this.renderer = new GLDisplayListRenderer();
		this.renderer.init();
	}
	,renderer: null
	,transition: null
	,__class__: kumite.displaylist.DisplayListLayer
}
if(!kumite.eyes) kumite.eyes = {}
kumite.eyes.Config = $hxClasses["kumite.eyes.Config"] = function() {
	this.clearLayer = new kumite.layer.ClearLayer();
	this.clearLayer.color = new Color(0,0,0,1);
	this.shadowLayer = new kumite.layer.TextureLayer();
	this.shadowLayer.scale = 1.025;
	this.shadowLayer.textureConfig = kumite.eyes.Config.SHADOW;
	this.reflectionLayer = new kumite.layer.TextureLayer();
	this.reflectionLayer.scale = 1.5;
	this.reflectionLayer.textureConfig = kumite.eyes.Config.REFLECTION;
	this.framebuffer1EnableLayer = new kumite.layer.FramebufferEnableLayer(512,512);
	this.framebuffer1DisableLayer = new kumite.layer.FramebufferDisableLayer();
	this.framebufferPostproEnableLayer = new kumite.layer.FramebufferEnableLayer(512,512);
	this.framebufferPostproDisableLayer = new kumite.layer.FramebufferDisableLayer();
	this.framebuffer2EnableLayer = new kumite.layer.FramebufferEnableLayer(256,256);
	this.framebuffer2DisableLayer = new kumite.layer.FramebufferDisableLayer();
	this.eyeLayers = new Array();
	this.eyeMaskLayers = new Array();
	this.eyeEffects = new Array();
	this.postproFilters = new Array();
	this.eyeBlocks = new Array();
	this.createBlock(477,-103,0.24);
	this.createBlock(325,-162,0.098);
	this.createBlock(356,30,0.16);
	this.createBlock(860,-50,0.16);
	this.createBlock(885.5,235,0.207);
	this.createBlock(673,12,0.28);
	this.createBlock(801,115,0.098);
	this.createBlock(-20,-75,0.28);
	this.createBlock(98.5,-151.5,0.099);
	this.createBlock(-77,92.5,0.21);
	this.createBlock(-13,207,0.099);
	this.createBlock(-782,93.5,0.24);
	this.createBlock(-386.5,-187,0.207);
	this.createBlock(-491,-23,0.278);
	this.createBlock(-355,-50.5,0.098);
	this.createBlock(-644.5,-95.5,0.159);
	this.createBlock(-907.5,-60.5,0.159);
	this.createBlock(-384,77,0.159);
	this.createBlock(-73,-225,0.21);
	var colors = new Array();
	colors.push(new Vec3(0,0,0));
	colors.push(new Vec3(0,-10,0));
	colors.push(new Vec3(-21 / 360,0,0));
	colors.push(new Vec3(21 / 360,0,0));
	colors.push(new Vec3(42 / 360,0,0));
	colors.push(new Vec3(64 / 360,0,0));
	colors.push(new Vec3(87 / 360,0,0));
	colors.push(new Vec3(125 / 360,0,0));
	var _g = 0, _g1 = this.eyeBlocks;
	while(_g < _g1.length) {
		var eyeBlock = _g1[_g];
		++_g;
		var postproFilter = new kumite.eyes.EyePostproFilter();
		postproFilter.eyePosition.x = eyeBlock.position.x;
		postproFilter.eyePosition.y = eyeBlock.position.y;
		postproFilter.textureConfig = this.framebuffer1EnableLayer.textureConfig;
		this.postproFilters.push(postproFilter);
		var eyeLayer = new kumite.layer.TextureHSLLayer();
		eyeLayer.colors = colors;
		eyeLayer.eyePosition.x = eyeBlock.position.x;
		eyeLayer.eyePosition.y = eyeBlock.position.y;
		eyeLayer.mixChance = 0.01 + Math.random() * (0.001 - 0.01);
		eyeLayer.mixSpeed = 0.05 + Math.random() * (0.005 - 0.05);
		eyeLayer.scale = 1.2 + Math.random() * (1.5 - 1.2);
		eyeLayer.textureConfig = kumite.eyes.Config.EYE;
		this.eyeLayers.push(eyeLayer);
		var eyeMaskLayer = new kumite.eyes.EyeMaskLayer();
		eyeMaskLayer.scale = eyeBlock.scale * 2;
		eyeMaskLayer.position.x = eyeBlock.position.x;
		eyeMaskLayer.position.y = eyeBlock.position.y;
		eyeMaskLayer.blend = false;
		eyeMaskLayer.textureConfig = this.framebuffer2EnableLayer.textureConfig;
		this.eyeMaskLayers.push(eyeMaskLayer);
		var eyeEffect = new kumite.layer.effect.EyeEffect();
		eyeEffect.position.x = eyeMaskLayer.position.x;
		eyeEffect.position.y = eyeMaskLayer.position.y;
		eyeEffect.offset = Math.random() * 6;
		eyeEffect.textureConfig = this.framebuffer1EnableLayer.textureConfig;
		this.eyeEffects.push(eyeEffect);
	}
	this.scene1 = new kumite.scene.DefaultScene("EYES");
	this.eyesDisplay = new kumite.eyes.EyesDisplay();
};
kumite.eyes.Config.__name__ = ["kumite","eyes","Config"];
kumite.eyes.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.eyes.Config.prototype = {
	createBlock: function(x,y,scale) {
		var eyeBlock = new kumite.eyes.EyeBlock();
		eyeBlock.position.x = x + 1;
		eyeBlock.position.y = y - 8;
		eyeBlock.scale = scale;
		this.eyeBlocks.push(eyeBlock);
	}
	,complete: function() {
		this.scene1.addLayerLifecycle(this.clearLayer,kumite.layer.LayerId.CLEAR);
		var _g1 = 0, _g = this.eyeBlocks.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.scene1.addLayerLifecycle(this.framebuffer1EnableLayer);
			this.scene1.addLayerLifecycle(this.eyeLayers[i]);
			this.scene1.addLayerLifecycle(this.framebuffer1DisableLayer);
			this.scene1.addLayerLifecycle(this.framebuffer2EnableLayer);
			this.scene1.addLayerLifecycle(this.clearLayer);
			this.scene1.addLayerLifecycle(this.eyeEffects[i]);
			this.scene1.addLayerLifecycle(this.shadowLayer);
			this.scene1.addLayerLifecycle(this.reflectionLayer);
			this.scene1.addLayerLifecycle(this.framebuffer2DisableLayer);
			this.scene1.addLayerLifecycle(this.eyeMaskLayers[i]);
		}
		this.scene1.addLayerLifecycle(this.displayListLayer);
	}
	,startPrepare: function() {
		var group = new bpmjs.SequencerTaskGroup();
		group.add(new GLTextureLoadingTask(this.textureRegistry,kumite.eyes.Config.EYE));
		group.add(new GLTextureLoadingTask(this.textureRegistry,kumite.eyes.Config.SHADOW));
		group.add(new GLTextureLoadingTask(this.textureRegistry,kumite.eyes.Config.REFLECTION));
		return group;
	}
	,eyesDisplay: null
	,scene1: null
	,eyeBlocks: null
	,eyeEffects: null
	,eyeMaskLayers: null
	,framebuffer2DisableLayer: null
	,framebuffer2EnableLayer: null
	,postproFilters: null
	,framebufferPostproDisableLayer: null
	,framebufferPostproEnableLayer: null
	,framebuffer1DisableLayer: null
	,framebuffer1EnableLayer: null
	,reflectionLayer: null
	,shadowLayer: null
	,eyeLayers: null
	,clearLayer: null
	,displayListLayer: null
	,textureRegistry: null
	,__class__: kumite.eyes.Config
}
kumite.eyes.EyeBlock = $hxClasses["kumite.eyes.EyeBlock"] = function() {
	this.position = new Vec2();
};
kumite.eyes.EyeBlock.__name__ = ["kumite","eyes","EyeBlock"];
kumite.eyes.EyeBlock.prototype = {
	scale: null
	,position: null
	,__class__: kumite.eyes.EyeBlock
}
kumite.eyes.EyeMaskLayer = $hxClasses["kumite.eyes.EyeMaskLayer"] = function() {
	this.blend = true;
	this.scale = 1;
	this.position = new Vec3(0,0,0);
	this.state = kumite.eyes.EyeMaskLayer.STATE_IDLE;
};
kumite.eyes.EyeMaskLayer.__name__ = ["kumite","eyes","EyeMaskLayer"];
kumite.eyes.EyeMaskLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.eyes.EyeMaskLayer.prototype = {
	iterate: function() {
		var len = Math.sqrt(this.position.x * this.position.x + this.position.y * this.position.y);
		switch(this.state) {
		case kumite.eyes.EyeMaskLayer.STATE_IDLE:
			this.shut = 0;
			if(Math.sin(this.time.ms / 1000 / 2 + len * 0.0002) > 0.999 || Math.random() < kumite.eyes.EyeMaskLayer.CLOSING_CHANCE) this.state = kumite.eyes.EyeMaskLayer.STATE_CLOSING;
			break;
		case kumite.eyes.EyeMaskLayer.STATE_CLOSING:
			this.shut += kumite.eyes.EyeMaskLayer.OPENING_SPEED;
			if(this.shut > 0.8) this.state = kumite.eyes.EyeMaskLayer.STATE_OPENING;
			break;
		case kumite.eyes.EyeMaskLayer.STATE_OPENING:
			this.shut -= kumite.eyes.EyeMaskLayer.CLOSING_SPEED;
			if(this.shut < 0) {
				this.shut = 0;
				this.state = kumite.eyes.EyeMaskLayer.STATE_IDLE;
			}
			break;
		}
	}
	,render: function(renderContext) {
		GL.useProgram(this.shaderProgram);
		GL.gl.viewport(0,0,renderContext.getWidth(),renderContext.getHeight());
		GL.gl.disable(2929);
		if(this.blend) {
			GL.gl.enable(3042);
			GL.gl.blendFunc(770,771);
		} else GL.gl.disable(3042);
		var projectionMatrix = new Matrix4();
		projectionMatrix.setOrtho(0,renderContext.getWidth(),renderContext.getHeight(),0,0,1);
		GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,projectionMatrix.buffer);
		this.vertexPositionAttribute.vertexAttribPointer();
		var texture = this.textureRegistry.get(this.textureConfig);
		var worldViewMatrix = new Matrix4();
		worldViewMatrix.appendScale(texture.width * this.scale,texture.height * this.scale,1);
		worldViewMatrix.appendTranslation(this.position.x,this.position.y,this.position.z);
		worldViewMatrix.appendTranslation((renderContext.getWidth() - texture.width * this.scale) / 2,(renderContext.getHeight() - texture.height * this.scale) / 2,0);
		GL.gl.uniformMatrix4fv(this.worldViewMatrixUniform.location,false,worldViewMatrix.buffer);
		GL.gl.activeTexture(33984);
		GL.gl.bindTexture(3553,texture.texture);
		GL.gl.uniform1i(this.textureUniform.location,0);
		this.iterate();
		GL.gl.uniform1f(this.shutUniform.location,this.shut);
		this.vertexPositionAttribute.drawArrays(5);
	}
	,renderTransition: function(transitionContext) {
		this.render(transitionContext);
	}
	,init: function() {
		this.shaderProgram = GL.createProgram(kumite.eyes._EyeMaskLayer.Vertex,kumite.eyes._EyeMaskLayer.Fragment);
		this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
		this.vertexPositionAttribute.updateBuffer(new Int8Array([0,0,1,0,0,1,1,1]));
		this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		this.worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
		this.textureUniform = GL.getUniformLocation("texture");
		this.colorcube0Uniform = GL.getUniformLocation("colorcube0");
		this.colorcube1Uniform = GL.getUniformLocation("colorcube1");
		this.shutUniform = GL.getUniformLocation("shut");
	}
	,shut: null
	,state: null
	,shutUniform: null
	,colorcube1Uniform: null
	,colorcube0Uniform: null
	,textureUniform: null
	,worldViewMatrixUniform: null
	,projectionMatrixUniform: null
	,vertexBuffer: null
	,vertexPositionAttribute: null
	,shaderProgram: null
	,blend: null
	,textureConfig: null
	,position: null
	,scale: null
	,textureRegistry: null
	,time: null
	,__class__: kumite.eyes.EyeMaskLayer
}
if(!kumite.eyes._EyeMaskLayer) kumite.eyes._EyeMaskLayer = {}
kumite.eyes._EyeMaskLayer.Vertex = $hxClasses["kumite.eyes._EyeMaskLayer.Vertex"] = function() { }
kumite.eyes._EyeMaskLayer.Vertex.__name__ = ["kumite","eyes","_EyeMaskLayer","Vertex"];
kumite.eyes._EyeMaskLayer.Fragment = $hxClasses["kumite.eyes._EyeMaskLayer.Fragment"] = function() { }
kumite.eyes._EyeMaskLayer.Fragment.__name__ = ["kumite","eyes","_EyeMaskLayer","Fragment"];
kumite.eyes.EyePostproFilter = $hxClasses["kumite.eyes.EyePostproFilter"] = function() {
	this.eyePosition = new Vec2(0,0);
};
kumite.eyes.EyePostproFilter.__name__ = ["kumite","eyes","EyePostproFilter"];
kumite.eyes.EyePostproFilter.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.eyes.EyePostproFilter.prototype = {
	render: function(renderContext) {
		GL.useProgram(this.shaderProgram);
		GL.gl.viewport(0,0,renderContext.getWidth(),renderContext.getHeight());
		GL.gl.disable(2929);
		GL.gl.disable(3042);
		this.vertexPositionAttribute.vertexAttribPointer();
		var texture = this.textureRegistry.get(this.textureConfig);
		GL.gl.activeTexture(33984);
		GL.gl.bindTexture(3553,texture.texture);
		GL.gl.uniform1i(this.textureUniform.location,0);
		GL.gl.uniform1f(this.timeUniform.location,this.time.ms);
		this.resolutionUniform.setVec2(new Vec2(renderContext.getWidth(),renderContext.getHeight()));
		GL.gl.uniform1f(this.amountUniform.location,1 - (Math.pow(Math.abs(Math.sin(-this.eyePosition.getLength() * 0.0002 + this.time.ms / 4000)),20) * 8.0 - 7.0));
		this.vertexPositionAttribute.drawArrays(5);
	}
	,renderTransition: function(transitionContext) {
		this.render(transitionContext);
	}
	,init: function() {
		this.shaderProgram = GL.createProgram(kumite.eyes._EyePostproFilter.Vertex,kumite.eyes._EyePostproFilter.Fragment);
		this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
		this.vertexPositionAttribute.updateBuffer(new Int8Array([-1,-1,1,-1,-1,1,1,1]));
		this.textureUniform = GL.getUniformLocation("texture");
		this.resolutionUniform = GL.getUniformLocation("resolution");
		this.timeUniform = GL.getUniformLocation("time");
		this.amountUniform = GL.getUniformLocation("amount");
	}
	,amountUniform: null
	,timeUniform: null
	,resolutionUniform: null
	,textureUniform: null
	,vertexBuffer: null
	,vertexPositionAttribute: null
	,shaderProgram: null
	,eyePosition: null
	,textureConfig: null
	,time: null
	,textureRegistry: null
	,__class__: kumite.eyes.EyePostproFilter
}
if(!kumite.eyes._EyePostproFilter) kumite.eyes._EyePostproFilter = {}
kumite.eyes._EyePostproFilter.Vertex = $hxClasses["kumite.eyes._EyePostproFilter.Vertex"] = function() { }
kumite.eyes._EyePostproFilter.Vertex.__name__ = ["kumite","eyes","_EyePostproFilter","Vertex"];
kumite.eyes._EyePostproFilter.Fragment = $hxClasses["kumite.eyes._EyePostproFilter.Fragment"] = function() { }
kumite.eyes._EyePostproFilter.Fragment.__name__ = ["kumite","eyes","_EyePostproFilter","Fragment"];
kumite.eyes.EyesDisplay = $hxClasses["kumite.eyes.EyesDisplay"] = function() {
};
kumite.eyes.EyesDisplay.__name__ = ["kumite","eyes","EyesDisplay"];
kumite.eyes.EyesDisplay.__interfaces__ = [haxe.rtti.Infos];
kumite.eyes.EyesDisplay.prototype = {
	start: function() {
		var stage = GLDisplayList.getDefault().stage;
		var blend1 = new GLDisplayObject();
		blend1.setX(1785);
		blend1.setY(885);
		blend1.setWidth(500);
		blend1.setHeight(12);
		blend1.graphic.clear(new Color(1,1,1,0.8));
		stage.addChild(blend1);
		var blend11 = new GLDisplayObject();
		blend11.setX(1843);
		blend11.setY(825);
		blend11.setWidth(10);
		blend11.setHeight(50);
		blend11.graphic.clear(new Color(1,1,1,0.8));
		stage.addChild(blend11);
		var blend2 = new GLDisplayObject();
		blend2.setX(935);
		blend2.setY(877);
		blend2.setWidth(25);
		blend2.setHeight(50);
		blend2.graphic.clear(new Color(1,1,1,0.8));
		stage.addChild(blend2);
	}
	,__class__: kumite.eyes.EyesDisplay
}
if(!kumite.fusion) kumite.fusion = {}
kumite.fusion.FusionConnection = $hxClasses["kumite.fusion.FusionConnection"] = function() {
	this.requestNewData = false;
	this.state = kumite.fusion.FusionConnection.STATE_DISCONNECTED;
	this.dataSignaler = new hsl.haxe.DirectSignaler(this);
	this.idleTimer = new bpmjs.FrameTimer(1000);
	this.idleTimer.run = $bind(this,this.handleIdleTimer);
};
kumite.fusion.FusionConnection.__name__ = ["kumite","fusion","FusionConnection"];
kumite.fusion.FusionConnection.prototype = {
	disconnect: function() {
		this.idleTimer.stop();
		this.state = kumite.fusion.FusionConnection.STATE_DISCONNECTED;
		try {
			this.socket.close();
		} catch( e ) {
		}
	}
	,handleIdleTimer: function() {
		if(this.state == kumite.fusion.FusionConnection.STATE_DISCONNECTED) return;
		if(this.state == kumite.fusion.FusionConnection.STATE_PRE_INIT) return;
		if(this.state == kumite.fusion.FusionConnection.STATE_CONNECTING) return;
		var dt = new Date().getTime() - this.lastMessage;
		if(dt > 10000 && this.requestNewData) {
			haxe.Log.trace("handleIdleTimer: " + dt + " disconnect...",{ fileName : "FusionConnection.hx", lineNumber : 147, className : "kumite.fusion.FusionConnection", methodName : "handleIdleTimer"});
			this.disconnect();
		}
	}
	,sendDataRequest: function() {
		this.requestNewData = false;
		this.state = kumite.fusion.FusionConnection.STATE_WAIT_GET;
		this.socket.send(JSON.stringify({ method : "get"}));
	}
	,reconnect: function() {
		haxe.Log.trace("reconnect: " + this.state,{ fileName : "FusionConnection.hx", lineNumber : 115, className : "kumite.fusion.FusionConnection", methodName : "reconnect"});
		if(this.state == kumite.fusion.FusionConnection.STATE_PRE_INIT) return;
		this.disconnect();
		this.state = kumite.fusion.FusionConnection.STATE_PRE_INIT;
		Timeout.execute(1000,$bind(this,this.init));
	}
	,get: function() {
		this.requestNewData = true;
		if(this.state == kumite.fusion.FusionConnection.STATE_DISCONNECTED) this.init(); else if(this.state == kumite.fusion.FusionConnection.STATE_IDLE) this.sendDataRequest();
	}
	,init: function() {
		var _g = this;
		this.disconnect();
		this.idleTimer.start();
		haxe.Log.trace("init",{ fileName : "FusionConnection.hx", lineNumber : 49, className : "kumite.fusion.FusionConnection", methodName : "init"});
		this.lastMessage = new Date().getTime();
		this.state = kumite.fusion.FusionConnection.STATE_CONNECTING;
		this.socket = new WebSocket(kumite.fusion.FusionConnection.host);
		this.socket.onopen = function(event) {
			Log.posInfo = { fileName : "FusionConnection.hx", lineNumber : 57, className : "kumite.fusion.FusionConnection", methodName : "init"};
			if(Log.filter(LogLevel.INFO)) {
				Log.fetchInput("onOpen",null,null,null,null,null,null);
				console.info(Log.createMessage());
			}
			_g.state = kumite.fusion.FusionConnection.STATE_WAIT_CONFIG_ACCEPT;
			_g.socket.send(JSON.stringify({ method : "setConfig", params : [JSON.stringify(_g.config)]}));
		};
		this.socket.onerror = function(event) {
			Log.posInfo = { fileName : "FusionConnection.hx", lineNumber : 64, className : "kumite.fusion.FusionConnection", methodName : "init"};
			if(Log.filter(LogLevel.ERROR)) {
				Log.fetchInput("onError: ",event,null,null,null,null,null);
				console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
			}
			_g.reconnect();
		};
		this.socket.onclose = function(event) {
			Log.posInfo = { fileName : "FusionConnection.hx", lineNumber : 70, className : "kumite.fusion.FusionConnection", methodName : "init"};
			if(Log.filter(LogLevel.ERROR)) {
				Log.fetchInput("onclose: ",event,null,null,null,null,null);
				console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
			}
			_g.reconnect();
		};
		this.socket.onmessage = function(event) {
			_g.lastMessage = new Date().getTime();
			if(_g.state == kumite.fusion.FusionConnection.STATE_WAIT_GET) {
				var blob = event.data;
				var reader = new FileReader();
				reader.addEventListener("loadend",function() {
					var result = reader.result;
					_g.dataSignaler.dispatch(result,null,{ fileName : "FusionConnection.hx", lineNumber : 85, className : "kumite.fusion.FusionConnection", methodName : "init"});
				});
				reader.readAsArrayBuffer(blob);
			}
			_g.state = kumite.fusion.FusionConnection.STATE_IDLE;
			if(_g.requestNewData) _g.sendDataRequest();
		};
	}
	,setConfig: function(config) {
		this.config = config;
	}
	,lastMessage: null
	,idleTimer: null
	,state: null
	,requestNewData: null
	,socket: null
	,config: null
	,dataSignaler: null
	,__class__: kumite.fusion.FusionConnection
}
if(!kumite.launch) kumite.launch = {}
kumite.launch.Config = $hxClasses["kumite.launch.Config"] = function() {
	this.launcher = new kumite.launch.Launcher();
	this.sequencer = new bpmjs.Sequencer();
	this.preloadDisplay = new kumite.launch.PreloadDisplay();
};
kumite.launch.Config.__name__ = ["kumite","launch","Config"];
kumite.launch.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.launch.Config.prototype = {
	preloadDisplay: null
	,launcher: null
	,sequencer: null
	,__class__: kumite.launch.Config
}
kumite.launch.Launcher = $hxClasses["kumite.launch.Launcher"] = function() {
};
kumite.launch.Launcher.__name__ = ["kumite","launch","Launcher"];
kumite.launch.Launcher.__interfaces__ = [haxe.rtti.Infos];
kumite.launch.Launcher.prototype = {
	handleFinish: function() {
	}
	,showError: function(message) {
		Log.posInfo = { fileName : "Launcher.hx", lineNumber : 26, className : "kumite.launch.Launcher", methodName : "showError"};
		if(Log.filter(LogLevel.ERROR)) {
			Log.fetchInput(message,null,null,null,null,null,null);
			console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
		}
	}
	,handlePostComplete: function() {
		this.sequencer.start("boot");
	}
	,sequencer: null
	,__class__: kumite.launch.Launcher
}
kumite.launch.PreloadDisplay = $hxClasses["kumite.launch.PreloadDisplay"] = function() {
};
kumite.launch.PreloadDisplay.__name__ = ["kumite","launch","PreloadDisplay"];
kumite.launch.PreloadDisplay.__interfaces__ = [haxe.rtti.Infos];
kumite.launch.PreloadDisplay.prototype = {
	removePreloader: function() {
		js.Lib.document.body.removeChild(this.preloaderDiv);
	}
	,bootStartComplete: function() {
		this.preloaderDiv.style.opacity = 0.8;
		GLTween.to(this.preloaderDiv.style,1000,{ opacity : 0});
		Timeout.execute(1000,$bind(this,this.removePreloader));
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
			var chars = "▁▂▃▄▅▆▇";
			var chars1 = ".oO";
			var chars2 = "Oo.";
			var chars3 = "-=";
			var chars4 = ":. ";
			bar += chars4.charAt(diff * (chars4.length - 1) | 0);
		}
		this.preloaderDiv.innerHTML = "" + bar;
	}
	,complete: function() {
		this.preloaderDiv = js.Lib.document.createElement("div");
		this.preloaderDiv.className = "Preloader";
		js.Lib.document.body.appendChild(this.preloaderDiv);
	}
	,preloaderDiv: null
	,__class__: kumite.launch.PreloadDisplay
}
if(!kumite.layer) kumite.layer = {}
kumite.layer.ClearLayer = $hxClasses["kumite.layer.ClearLayer"] = function() {
	this.color = new Color(0,0,0,0);
};
kumite.layer.ClearLayer.__name__ = ["kumite","layer","ClearLayer"];
kumite.layer.ClearLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.layer.ClearLayer.prototype = {
	render: function(renderContext) {
		GL.gl.clearColor(this.color.r,this.color.g,this.color.b,this.color.a);
		GL.gl.clear(17664);
	}
	,renderTransition: function(transitionContext) {
		this.render(transitionContext);
	}
	,init: function() {
	}
	,color: null
	,__class__: kumite.layer.ClearLayer
}
kumite.layer.ColorLayer = $hxClasses["kumite.layer.ColorLayer"] = function() {
	this.color = new Color(1,1,1,0.2);
	this.transitions = new kumite.layer.LayerTransitions();
	this.transitions.add(this.cutTransition = new kumite.layer.LayerTransition("cut"));
	this.transitions.add(this.moveTransition = new kumite.layer.LayerTransition("move"));
	this.transitions.add(this.alphaTransition = new kumite.layer.LayerTransition("alpha"));
	this.transitions.enableChild("move");
};
kumite.layer.ColorLayer.__name__ = ["kumite","layer","ColorLayer"];
kumite.layer.ColorLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.layer.ColorLayer.prototype = {
	render: function(renderContext) {
		GL.useProgram(this.shaderProgram);
		GL.gl.viewport(0,0,renderContext.getWidth(),renderContext.getHeight());
		GL.gl.disable(2929);
		GL.gl.enable(3042);
		GL.gl.blendFunc(770,771);
		var projectionMatrix = new Matrix4();
		projectionMatrix.setOrtho(0,renderContext.getWidth(),renderContext.getHeight(),0,0,1);
		GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,projectionMatrix.buffer);
		this.vertexPositionAttribute.vertexAttribPointer();
		var worldViewMatrix = new Matrix4();
		worldViewMatrix.appendTranslation(this.moveTransition.direction * (1 - this.moveTransition.getTransition()),0,0);
		worldViewMatrix.appendScale(renderContext.getWidth(),renderContext.getHeight(),1);
		GL.gl.uniformMatrix4fv(this.worldViewMatrixUniform.location,false,worldViewMatrix.buffer);
		var colorWithTransition = this.color.clone();
		colorWithTransition.a *= this.alphaTransition.getTransition();
		GL.gl.uniform4f(this.colorUniform.location,colorWithTransition.r,colorWithTransition.g,colorWithTransition.b,colorWithTransition.a);
		this.vertexPositionAttribute.drawArrays(5);
	}
	,renderTransition: function(transitionContext) {
		this.transitions.setTransition(transitionContext.getTransition());
		this.render(transitionContext);
	}
	,init: function() {
		this.shaderProgram = GL.createProgram(kumite.layer._ColorLayer.Vertex,kumite.layer._ColorLayer.Fragment);
		this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
		this.vertexPositionAttribute.updateBuffer(new Int8Array([0,0,1,0,0,1,1,1]));
		this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		this.worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
		this.colorUniform = GL.getUniformLocation("color");
	}
	,colorUniform: null
	,worldViewMatrixUniform: null
	,projectionMatrixUniform: null
	,vertexBuffer: null
	,vertexPositionAttribute: null
	,shaderProgram: null
	,color: null
	,alphaTransition: null
	,moveTransition: null
	,cutTransition: null
	,transitions: null
	,time: null
	,__class__: kumite.layer.ColorLayer
}
if(!kumite.layer._ColorLayer) kumite.layer._ColorLayer = {}
kumite.layer._ColorLayer.Vertex = $hxClasses["kumite.layer._ColorLayer.Vertex"] = function() { }
kumite.layer._ColorLayer.Vertex.__name__ = ["kumite","layer","_ColorLayer","Vertex"];
kumite.layer._ColorLayer.Fragment = $hxClasses["kumite.layer._ColorLayer.Fragment"] = function() { }
kumite.layer._ColorLayer.Fragment.__name__ = ["kumite","layer","_ColorLayer","Fragment"];
kumite.layer.FramebufferDisableLayer = $hxClasses["kumite.layer.FramebufferDisableLayer"] = function() {
};
kumite.layer.FramebufferDisableLayer.__name__ = ["kumite","layer","FramebufferDisableLayer"];
kumite.layer.FramebufferDisableLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.layer.FramebufferDisableLayer.prototype = {
	render: function(renderContext) {
		renderContext.popViewport();
		GL.gl.bindFramebuffer(36160,null);
	}
	,renderTransition: function(transitionContext) {
		this.render(transitionContext);
	}
	,init: function() {
	}
	,__class__: kumite.layer.FramebufferDisableLayer
}
kumite.layer.FramebufferEnableLayer = $hxClasses["kumite.layer.FramebufferEnableLayer"] = function(width,height) {
	this.framebuffer = new GLFramebuffer();
	this.framebuffer.width = width;
	this.framebuffer.height = height;
	this.textureConfig = GLTextureConfig.createForFrameBuffer();
};
kumite.layer.FramebufferEnableLayer.__name__ = ["kumite","layer","FramebufferEnableLayer"];
kumite.layer.FramebufferEnableLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.layer.FramebufferEnableLayer.prototype = {
	render: function(renderContext) {
		renderContext.pushViewport(this.framebuffer.width,this.framebuffer.height);
		GL.gl.bindFramebuffer(36160,this.framebuffer.framebuffer);
	}
	,renderTransition: function(transitionContext) {
		this.render(transitionContext);
	}
	,init: function() {
		this.framebuffer.framebuffer = GL.gl.createFramebuffer();
		GL.gl.bindFramebuffer(36160,this.framebuffer.framebuffer);
		this.framebuffer.texture = GL.gl.createTexture();
		this.textureRegistry.register(this.textureConfig,this.framebuffer);
		GL.gl.bindTexture(3553,this.framebuffer.texture);
		GL.gl.texParameteri(3553,10240,9729);
		GL.gl.texParameteri(3553,10241,9729);
		GL.gl.texParameteri(3553,10242,10497);
		GL.gl.texParameteri(3553,10243,10497);
		GL.gl.texImage2D(3553,0,6408,this.framebuffer.width,this.framebuffer.height,0,6408,5121,null);
		GL.gl.framebufferTexture2D(36160,36064,3553,this.framebuffer.texture,0);
		GL.gl.bindTexture(3553,null);
		GL.gl.bindFramebuffer(36160,null);
	}
	,textureConfig: null
	,framebuffer: null
	,textureRegistry: null
	,__class__: kumite.layer.FramebufferEnableLayer
}
kumite.layer.LayerId = $hxClasses["kumite.layer.LayerId"] = function() { }
kumite.layer.LayerId.__name__ = ["kumite","layer","LayerId"];
kumite.layer.LayerTransition = $hxClasses["kumite.layer.LayerTransition"] = function(name) {
	this.name = name;
	this.enabled = true;
	this.setTransition(1);
	this.direction = 1;
};
kumite.layer.LayerTransition.__name__ = ["kumite","layer","LayerTransition"];
kumite.layer.LayerTransition.prototype = {
	setTransition: function(value) {
		if(this.enabled) this.transition = value;
		return this.getTransition();
	}
	,getTransition: function() {
		if(this.ease == null) return this.transition; else return Map.ease(this.transition,0,1,0,1,this.ease);
	}
	,enable: function(enabled) {
		if(!enabled) this.setTransition(1);
		this.enabled = enabled;
	}
	,transition: null
	,direction: null
	,ease: null
	,enabled: null
	,name: null
	,__class__: kumite.layer.LayerTransition
	,__properties__: {set_transition:"setTransition",get_transition:"getTransition"}
}
kumite.layer.LayerTransitions = $hxClasses["kumite.layer.LayerTransitions"] = function(name) {
	if(name == null) name = "";
	this.children = new Array();
	kumite.layer.LayerTransition.call(this,name);
};
kumite.layer.LayerTransitions.__name__ = ["kumite","layer","LayerTransitions"];
kumite.layer.LayerTransitions.__super__ = kumite.layer.LayerTransition;
kumite.layer.LayerTransitions.prototype = $extend(kumite.layer.LayerTransition.prototype,{
	setTransition: function(value) {
		var _g = 0, _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.setTransition(value);
		}
		return value;
	}
	,enableChild: function(name) {
		var _g = 0, _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.enable(child.name == name);
		}
	}
	,add: function(child) {
		this.children.push(child);
	}
	,children: null
	,__class__: kumite.layer.LayerTransitions
});
kumite.layer.TestLayer = $hxClasses["kumite.layer.TestLayer"] = function() {
	this.color = new Color(1,1,0,0.5);
	this.scale = 1;
	this.position = new Vec3(0,0,0);
	this.transitions = new kumite.layer.LayerTransitions();
	this.transitions.add(this.alphaTransition = new kumite.layer.LayerTransition("alpha"));
	this.transitions.add(new kumite.layer.LayerTransition("cut"));
	this.transitions.enableChild("alpha");
	this.projectionMatrix = new Matrix4();
};
kumite.layer.TestLayer.__name__ = ["kumite","layer","TestLayer"];
kumite.layer.TestLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.layer.TestLayer.prototype = {
	render: function(renderContext) {
		GL.useProgram(this.shaderProgram);
		GL.gl.viewport(0,0,renderContext.getWidth(),renderContext.getHeight());
		GL.gl.disable(2929);
		GL.gl.enable(3042);
		GL.gl.blendFunc(770,771);
		this.projectionMatrix.setPerspective(40,renderContext.getAspect(),0.1,500);
		GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,this.projectionMatrix.buffer);
		this.vertexPositionAttribute.vertexAttribPointer();
		var worldViewMatrix = new Matrix4();
		worldViewMatrix.appendScale(this.scale,this.scale,this.scale);
		worldViewMatrix.appendTranslation(this.position.x,this.position.y,this.position.z);
		worldViewMatrix.appendRotation(this.time.ms / 4000,new Vec3(1,1,1).normalize());
		worldViewMatrix.append(this.camera.matrix);
		GL.gl.uniformMatrix4fv(this.worldViewMatrixUniform.location,false,worldViewMatrix.buffer);
		var colorWithTransition = this.color.clone();
		colorWithTransition.a *= this.alphaTransition.getTransition();
		GL.gl.uniform4f(this.colorUniform.location,colorWithTransition.r,colorWithTransition.g,colorWithTransition.b,colorWithTransition.a);
		this.vertexPositionAttribute.drawArrays(5);
	}
	,renderTransition: function(transitionContext) {
		this.transitions.setTransition(transitionContext.getTransition());
		this.render(transitionContext);
	}
	,init: function() {
		this.shaderProgram = GL.createProgram(kumite.layer._TestLayer.Vertex,kumite.layer._TestLayer.Fragment);
		this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
		this.vertexPositionAttribute.updateBuffer(new Int8Array([-1,-1,1,-1,-1,1,1,1]));
		this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		this.worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
		this.colorUniform = GL.getUniformLocation("color");
	}
	,colorUniform: null
	,worldViewMatrixUniform: null
	,projectionMatrixUniform: null
	,vertexBuffer: null
	,vertexPositionAttribute: null
	,shaderProgram: null
	,projectionMatrix: null
	,position: null
	,scale: null
	,color: null
	,alphaTransition: null
	,transitions: null
	,camera: null
	,time: null
	,__class__: kumite.layer.TestLayer
}
if(!kumite.layer._TestLayer) kumite.layer._TestLayer = {}
kumite.layer._TestLayer.Vertex = $hxClasses["kumite.layer._TestLayer.Vertex"] = function() { }
kumite.layer._TestLayer.Vertex.__name__ = ["kumite","layer","_TestLayer","Vertex"];
kumite.layer._TestLayer.Fragment = $hxClasses["kumite.layer._TestLayer.Fragment"] = function() { }
kumite.layer._TestLayer.Fragment.__name__ = ["kumite","layer","_TestLayer","Fragment"];
kumite.layer.Texture3DLayer = $hxClasses["kumite.layer.Texture3DLayer"] = function() {
	this.scale = 1;
	this.position = new Vec3(0,0,0);
	this.transitions = new kumite.layer.LayerTransitions();
	this.transitions.add(this.cutTransition = new kumite.layer.LayerTransition("cut"));
	this.transitions.add(this.moveTransition = new kumite.layer.LayerTransition("move"));
	this.transitions.add(this.alphaTransition = new kumite.layer.LayerTransition("alpha"));
	this.transitions.enableChild("alpha");
};
kumite.layer.Texture3DLayer.__name__ = ["kumite","layer","Texture3DLayer"];
kumite.layer.Texture3DLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.layer.Texture3DLayer.prototype = {
	render: function(renderContext) {
		GL.useProgram(this.shaderProgram);
		GL.gl.viewport(0,0,renderContext.getWidth(),renderContext.getHeight());
		GL.gl.disable(2929);
		GL.gl.enable(3042);
		GL.gl.blendFunc(770,771);
		var projectionMatrix = new Matrix4();
		projectionMatrix.setPerspective(40,renderContext.getAspect(),0.1,500);
		GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,projectionMatrix.buffer);
		this.vertexPositionAttribute.vertexAttribPointer();
		var texture = this.textureRegistry.get(this.textureConfig);
		var worldViewMatrix = new Matrix4();
		worldViewMatrix.appendTranslation(-0.5,-0.5,0);
		worldViewMatrix.appendScale(texture.width * this.scale * 0.01,texture.height * this.scale * 0.01,1);
		GL.gl.uniformMatrix4fv(this.worldViewMatrixUniform.location,false,worldViewMatrix.buffer);
		GL.gl.activeTexture(33984);
		GL.gl.bindTexture(3553,texture.texture);
		GL.gl.uniform1i(this.textureUniform.location,0);
		GL.gl.uniform1f(this.alphaUniform.location,this.alphaTransition.getTransition());
		this.vertexPositionAttribute.drawArrays(5);
	}
	,renderTransition: function(transitionContext) {
		this.transitions.setTransition(transitionContext.getTransition());
		this.render(transitionContext);
	}
	,init: function() {
		this.shaderProgram = GL.createProgram(kumite.layer._Texture3DLayer.Vertex,kumite.layer._Texture3DLayer.Fragment);
		this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
		this.vertexPositionAttribute.updateBuffer(new Int8Array([0,0,1,0,0,1,1,1]));
		this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		this.worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
		this.textureUniform = GL.getUniformLocation("texture");
		this.alphaUniform = GL.getUniformLocation("alpha");
	}
	,alphaUniform: null
	,textureUniform: null
	,worldViewMatrixUniform: null
	,projectionMatrixUniform: null
	,vertexBuffer: null
	,vertexPositionAttribute: null
	,shaderProgram: null
	,textureConfig: null
	,position: null
	,scale: null
	,alphaTransition: null
	,moveTransition: null
	,cutTransition: null
	,transitions: null
	,textureRegistry: null
	,time: null
	,__class__: kumite.layer.Texture3DLayer
}
if(!kumite.layer._Texture3DLayer) kumite.layer._Texture3DLayer = {}
kumite.layer._Texture3DLayer.Vertex = $hxClasses["kumite.layer._Texture3DLayer.Vertex"] = function() { }
kumite.layer._Texture3DLayer.Vertex.__name__ = ["kumite","layer","_Texture3DLayer","Vertex"];
kumite.layer._Texture3DLayer.Fragment = $hxClasses["kumite.layer._Texture3DLayer.Fragment"] = function() { }
kumite.layer._Texture3DLayer.Fragment.__name__ = ["kumite","layer","_Texture3DLayer","Fragment"];
kumite.layer.TextureHSLLayer = $hxClasses["kumite.layer.TextureHSLLayer"] = function() {
	this.state = kumite.layer.TextureHSLLayer.IDLE;
	this.blend = true;
	this.scale = 1;
	this.position = new Vec3(0,0,0);
	this.eyePosition = new Vec2(0,0);
	this.transitions = new kumite.layer.LayerTransitions();
	this.transitions.add(this.cutTransition = new kumite.layer.LayerTransition("cut"));
	this.transitions.add(this.moveTransition = new kumite.layer.LayerTransition("move"));
	this.transitions.add(this.alphaTransition = new kumite.layer.LayerTransition("alpha"));
	this.transitions.enableChild("alpha");
};
kumite.layer.TextureHSLLayer.__name__ = ["kumite","layer","TextureHSLLayer"];
kumite.layer.TextureHSLLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.layer.TextureHSLLayer.prototype = {
	render: function(renderContext) {
		GL.useProgram(this.shaderProgram);
		GL.gl.viewport(0,0,renderContext.getWidth(),renderContext.getHeight());
		GL.gl.disable(2929);
		if(this.blend) {
			GL.gl.enable(3042);
			GL.gl.blendFunc(770,771);
		} else GL.gl.disable(3042);
		var projectionMatrix = new Matrix4();
		projectionMatrix.setOrtho(0,renderContext.getWidth(),renderContext.getHeight(),0,0,1);
		GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,projectionMatrix.buffer);
		this.vertexPositionAttribute.vertexAttribPointer();
		var texture = this.textureRegistry.get(this.textureConfig);
		var worldViewMatrix = new Matrix4();
		worldViewMatrix.appendScale(texture.width * this.scale,texture.height * this.scale,1);
		worldViewMatrix.appendTranslation(this.position.x,this.position.y,this.position.z);
		worldViewMatrix.appendTranslation((renderContext.getWidth() - texture.width * this.scale) / 2,(renderContext.getHeight() - texture.height * this.scale) / 2,0);
		GL.gl.uniformMatrix4fv(this.worldViewMatrixUniform.location,false,worldViewMatrix.buffer);
		GL.gl.activeTexture(33984);
		GL.gl.bindTexture(3553,texture.texture);
		GL.gl.uniform1i(this.textureUniform.location,0);
		GL.gl.uniform1f(this.alphaUniform.location,this.alphaTransition.getTransition());
		switch(this.state) {
		case kumite.layer.TextureHSLLayer.IDLE:
			if(Math.sin(-this.eyePosition.getLength() * 0.001 + this.time.ms / 1000) > 0.99) {
				this.hsl0 = this.hsl1;
				while(this.hsl0.equals(this.hsl1)) this.hsl1 = this.colors[Math.random() * this.colors.length | 0];
				this.hslMix = 0;
				this.state = kumite.layer.TextureHSLLayer.MIX;
			}
			break;
		case kumite.layer.TextureHSLLayer.MIX:
			this.hslMix += this.mixSpeed;
			if(this.hslMix > 1.0) {
				this.hslMix = 1.0;
				this.state = kumite.layer.TextureHSLLayer.IDLE;
			}
			break;
		}
		this.hsl0Uniform.setVec3(this.hsl0);
		this.hsl1Uniform.setVec3(this.hsl1);
		GL.gl.uniform1f(this.hslMixUniform.location,this.hslMix);
		this.vertexPositionAttribute.drawArrays(5);
	}
	,renderTransition: function(transitionContext) {
		this.transitions.setTransition(transitionContext.getTransition());
		this.render(transitionContext);
	}
	,init: function() {
		this.shaderProgram = GL.createProgram(kumite.layer._TextureHSLLayer.Vertex,kumite.layer._TextureHSLLayer.Fragment);
		this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
		this.vertexPositionAttribute.updateBuffer(new Int8Array([0,0,1,0,0,1,1,1]));
		this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		this.worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
		this.textureUniform = GL.getUniformLocation("texture");
		this.alphaUniform = GL.getUniformLocation("alpha");
		this.hsl0Uniform = GL.getUniformLocation("hsl0");
		this.hsl1Uniform = GL.getUniformLocation("hsl1");
		this.hslMixUniform = GL.getUniformLocation("hslMix");
		this.hsl0 = this.colors[Math.random() * this.colors.length | 0];
		this.hsl1 = this.colors[Math.random() * this.colors.length | 0];
		this.hslMix = 1;
	}
	,state: null
	,hslMix: null
	,hsl1: null
	,hsl0: null
	,hslMixUniform: null
	,hsl1Uniform: null
	,hsl0Uniform: null
	,alphaUniform: null
	,textureUniform: null
	,worldViewMatrixUniform: null
	,projectionMatrixUniform: null
	,vertexBuffer: null
	,vertexPositionAttribute: null
	,shaderProgram: null
	,blend: null
	,colors: null
	,textureConfig: null
	,eyePosition: null
	,position: null
	,mixChance: null
	,mixSpeed: null
	,scale: null
	,alphaTransition: null
	,moveTransition: null
	,cutTransition: null
	,transitions: null
	,textureRegistry: null
	,time: null
	,__class__: kumite.layer.TextureHSLLayer
}
if(!kumite.layer._TextureHSLLayer) kumite.layer._TextureHSLLayer = {}
kumite.layer._TextureHSLLayer.Vertex = $hxClasses["kumite.layer._TextureHSLLayer.Vertex"] = function() { }
kumite.layer._TextureHSLLayer.Vertex.__name__ = ["kumite","layer","_TextureHSLLayer","Vertex"];
kumite.layer._TextureHSLLayer.Fragment = $hxClasses["kumite.layer._TextureHSLLayer.Fragment"] = function() { }
kumite.layer._TextureHSLLayer.Fragment.__name__ = ["kumite","layer","_TextureHSLLayer","Fragment"];
kumite.layer.TextureLayer = $hxClasses["kumite.layer.TextureLayer"] = function() {
	this.blend = true;
	this.scale = 1;
	this.position = new Vec3(0,0,0);
	this.transitions = new kumite.layer.LayerTransitions();
	this.transitions.add(this.cutTransition = new kumite.layer.LayerTransition("cut"));
	this.transitions.add(this.moveTransition = new kumite.layer.LayerTransition("move"));
	this.transitions.add(this.alphaTransition = new kumite.layer.LayerTransition("alpha"));
	this.transitions.enableChild("alpha");
};
kumite.layer.TextureLayer.__name__ = ["kumite","layer","TextureLayer"];
kumite.layer.TextureLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.layer.TextureLayer.prototype = {
	render: function(renderContext) {
		GL.useProgram(this.shaderProgram);
		GL.gl.viewport(0,0,renderContext.getWidth(),renderContext.getHeight());
		GL.gl.disable(2929);
		if(this.blend) {
			GL.gl.enable(3042);
			GL.gl.blendFunc(770,771);
		} else GL.gl.disable(3042);
		var projectionMatrix = new Matrix4();
		projectionMatrix.setOrtho(0,renderContext.getWidth(),renderContext.getHeight(),0,0,1);
		GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,projectionMatrix.buffer);
		this.vertexPositionAttribute.vertexAttribPointer();
		if(this.texture == null) this.texture = this.textureRegistry.get(this.textureConfig);
		var worldViewMatrix = new Matrix4();
		worldViewMatrix.appendScale(this.texture.width * this.scale,this.texture.height * this.scale,1);
		worldViewMatrix.appendTranslation(this.position.x,this.position.y,this.position.z);
		worldViewMatrix.appendTranslation((renderContext.getWidth() - this.texture.width * this.scale) / 2,(renderContext.getHeight() - this.texture.height * this.scale) / 2,0);
		GL.gl.uniformMatrix4fv(this.worldViewMatrixUniform.location,false,worldViewMatrix.buffer);
		GL.gl.activeTexture(33984);
		GL.gl.bindTexture(3553,this.texture.texture);
		GL.gl.uniform1i(this.textureUniform.location,0);
		GL.gl.uniform1f(this.alphaUniform.location,this.alphaTransition.getTransition());
		GL.gl.uniform1f(this.flipYUniform.location,this.flipY?1:0);
		this.vertexPositionAttribute.drawArrays(5);
	}
	,renderTransition: function(transitionContext) {
		this.transitions.setTransition(transitionContext.getTransition());
		this.render(transitionContext);
	}
	,init: function() {
		this.shaderProgram = GL.createProgram(kumite.layer._TextureLayer.Vertex,kumite.layer._TextureLayer.Fragment);
		this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
		this.vertexPositionAttribute.updateBuffer(new Int8Array([0,0,1,0,0,1,1,1]));
		this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		this.worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
		this.textureUniform = GL.getUniformLocation("texture");
		this.alphaUniform = GL.getUniformLocation("alpha");
		this.flipYUniform = GL.getUniformLocation("flipY");
	}
	,flipYUniform: null
	,alphaUniform: null
	,textureUniform: null
	,worldViewMatrixUniform: null
	,projectionMatrixUniform: null
	,vertexBuffer: null
	,vertexPositionAttribute: null
	,shaderProgram: null
	,flipY: null
	,blend: null
	,texture: null
	,textureConfig: null
	,position: null
	,scale: null
	,alphaTransition: null
	,moveTransition: null
	,cutTransition: null
	,transitions: null
	,textureRegistry: null
	,time: null
	,__class__: kumite.layer.TextureLayer
}
if(!kumite.layer._TextureLayer) kumite.layer._TextureLayer = {}
kumite.layer._TextureLayer.Vertex = $hxClasses["kumite.layer._TextureLayer.Vertex"] = function() { }
kumite.layer._TextureLayer.Vertex.__name__ = ["kumite","layer","_TextureLayer","Vertex"];
kumite.layer._TextureLayer.Fragment = $hxClasses["kumite.layer._TextureLayer.Fragment"] = function() { }
kumite.layer._TextureLayer.Fragment.__name__ = ["kumite","layer","_TextureLayer","Fragment"];
if(!kumite.layer.effect) kumite.layer.effect = {}
kumite.layer.effect.CrosshatchFilter = $hxClasses["kumite.layer.effect.CrosshatchFilter"] = function() {
};
kumite.layer.effect.CrosshatchFilter.__name__ = ["kumite","layer","effect","CrosshatchFilter"];
kumite.layer.effect.CrosshatchFilter.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.layer.effect.CrosshatchFilter.prototype = {
	render: function(renderContext) {
		GL.useProgram(this.shaderProgram);
		GL.gl.viewport(0,0,renderContext.getWidth(),renderContext.getHeight());
		GL.gl.disable(2929);
		GL.gl.disable(3042);
		this.vertexPositionAttribute.vertexAttribPointer();
		var texture = this.textureRegistry.get(this.textureConfig);
		GL.gl.activeTexture(33984);
		GL.gl.bindTexture(3553,texture.texture);
		GL.gl.uniform1i(this.textureUniform.location,0);
		GL.gl.uniform1f(this.amountUniform.location,this.amount);
		this.vertexPositionAttribute.drawArrays(5);
	}
	,renderTransition: function(transitionContext) {
		this.amount = transitionContext.getTransition();
		this.render(transitionContext);
	}
	,init: function() {
		this.shaderProgram = GL.createProgram(kumite.layer.effect._CrosshatchFilter.Vertex,kumite.layer.effect._CrosshatchFilter.Fragment);
		this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
		this.vertexPositionAttribute.updateBuffer(new Int8Array([0,0,1,0,0,1,1,1]));
		this.textureUniform = GL.getUniformLocation("texture");
		this.amountUniform = GL.getUniformLocation("amount");
		this.amount = 1;
	}
	,amount: null
	,amountUniform: null
	,textureUniform: null
	,vertexBuffer: null
	,vertexPositionAttribute: null
	,shaderProgram: null
	,textureConfig: null
	,textureRegistry: null
	,__class__: kumite.layer.effect.CrosshatchFilter
}
if(!kumite.layer.effect._CrosshatchFilter) kumite.layer.effect._CrosshatchFilter = {}
kumite.layer.effect._CrosshatchFilter.Vertex = $hxClasses["kumite.layer.effect._CrosshatchFilter.Vertex"] = function() { }
kumite.layer.effect._CrosshatchFilter.Vertex.__name__ = ["kumite","layer","effect","_CrosshatchFilter","Vertex"];
kumite.layer.effect._CrosshatchFilter.Fragment = $hxClasses["kumite.layer.effect._CrosshatchFilter.Fragment"] = function() { }
kumite.layer.effect._CrosshatchFilter.Fragment.__name__ = ["kumite","layer","effect","_CrosshatchFilter","Fragment"];
kumite.layer.effect.EyeEffect = $hxClasses["kumite.layer.effect.EyeEffect"] = function() {
	this.STATE_IDLE = new kumite.layer.effect._EyeEffect.IdleState(this);
	this.idleStateIndex = 0;
	this.STATE_IDLE_1 = new kumite.layer.effect._EyeEffect.IdleState1(this);
	this.STATE_IDLE_2 = new kumite.layer.effect._EyeEffect.IdleState2(this);
	this.STATE_IDLE_3 = new kumite.layer.effect._EyeEffect.IdleState3(this);
	this.STATE_TARGET = new kumite.layer.effect._EyeEffect.TargetState(this);
	this.position = new Vec2(0,0);
	this.mousePosition = new Vec2(0,0);
	this.moveSet = new MoveSetVec2(new Vec2(0,0),new Vec2(0,0),new Vec2(0.0008,0.0008));
};
kumite.layer.effect.EyeEffect.__name__ = ["kumite","layer","effect","EyeEffect"];
kumite.layer.effect.EyeEffect.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.layer.effect.EyeEffect.prototype = {
	updateMouse: function(position) {
		this.mousePosition = position.clone();
		this.mousePosition.x -= 0.5;
		this.mousePosition.y -= 0.5;
		this.mousePosition.x *= 4.0;
		this.mousePosition.y *= 4.0;
		this.mousePosition.x *= this.stage.width;
		this.mousePosition.y *= this.stage.height;
	}
	,sortfunction: function(a,b) {
		var sx = this.position.x / this.stage.width;
		var adx = Math.abs(a.x - sx);
		var bdx = Math.abs(b.x - sx);
		if(adx < bdx) return -1; else if(adx > bdx) return 1; else return 0;
	}
	,render: function(renderContext) {
		GL.useProgram(this.shaderProgram);
		GL.gl.viewport(0,0,renderContext.getWidth(),renderContext.getHeight());
		GL.gl.disable(2929);
		GL.gl.disable(3042);
		this.vertexPositionAttribute.vertexAttribPointer();
		var texture = this.textureRegistry.get(this.textureConfig);
		GL.gl.activeTexture(33984);
		GL.gl.bindTexture(3553,texture.texture);
		GL.gl.uniform1i(this.textureUniform.location,0);
		GL.gl.uniform1f(this.timeUniform.location,this.time.ms / 1000);
		var blobs2 = new Array();
		blobs2 = blobs2.concat(this.blobs.blobs);
		blobs2.sort($bind(this,this.sortfunction));
		this.state.blobs = blobs2;
		this.state.moveSet = this.moveSet;
		this.state.ms = this.time.ms;
		this.state.stage = this.stage;
		this.state.position = this.position;
		this.state.execute();
		this.moveSet.move();
		this.directionUniform.setVec2(this.moveSet.current);
		this.vertexPositionAttribute.drawArrays(5);
	}
	,renderTransition: function(transitionContext) {
		this.render(transitionContext);
	}
	,setRandomIdleState: function() {
		var idleStates = [this.STATE_IDLE_1,this.STATE_IDLE_2,this.STATE_IDLE_3];
		this.setState(idleStates[this.idleStateIndex % idleStates.length]);
		this.idleStateIndex++;
	}
	,setState: function(state) {
		if(this.state != null) this.state.exit();
		this.state = state;
		state.enterMs = this.time.ms;
		state.ms = this.time.ms;
		state.enter();
	}
	,init: function() {
		this.shaderProgram = GL.createProgram(kumite.layer.effect._EyeEffect.Vertex,kumite.layer.effect._EyeEffect.Fragment);
		this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
		this.vertexPositionAttribute.updateBuffer(new Int8Array([-1,-1,1,-1,-1,1,1,1]));
		this.directionUniform = GL.getUniformLocation("direction");
		this.timeUniform = GL.getUniformLocation("time");
		this.textureUniform = GL.getUniformLocation("texture");
		this.setState(this.STATE_IDLE);
		GLMouseRegistry.getInstance().mouseMoveSignaler.bind($bind(this,this.updateMouse));
	}
	,STATE_TARGET: null
	,STATE_IDLE_3: null
	,STATE_IDLE_2: null
	,STATE_IDLE_1: null
	,idleStateIndex: null
	,STATE_IDLE: null
	,state: null
	,moveSet: null
	,mousePosition: null
	,textureUniform: null
	,timeUniform: null
	,directionUniform: null
	,vertexBuffer: null
	,vertexPositionAttribute: null
	,shaderProgram: null
	,position: null
	,offset: null
	,textureConfig: null
	,textureRegistry: null
	,stage: null
	,time: null
	,blobs: null
	,__class__: kumite.layer.effect.EyeEffect
}
if(!kumite.layer.effect._EyeEffect) kumite.layer.effect._EyeEffect = {}
kumite.layer.effect._EyeEffect.Vertex = $hxClasses["kumite.layer.effect._EyeEffect.Vertex"] = function() { }
kumite.layer.effect._EyeEffect.Vertex.__name__ = ["kumite","layer","effect","_EyeEffect","Vertex"];
kumite.layer.effect._EyeEffect.Fragment = $hxClasses["kumite.layer.effect._EyeEffect.Fragment"] = function() { }
kumite.layer.effect._EyeEffect.Fragment.__name__ = ["kumite","layer","effect","_EyeEffect","Fragment"];
kumite.layer.effect._EyeEffect.State = $hxClasses["kumite.layer.effect._EyeEffect.State"] = function(parent) {
	this.parent = parent;
};
kumite.layer.effect._EyeEffect.State.__name__ = ["kumite","layer","effect","_EyeEffect","State"];
kumite.layer.effect._EyeEffect.State.prototype = {
	exit: function() {
	}
	,execute: function() {
	}
	,enter: function() {
	}
	,getDist: function() {
		try {
			var a = this.blobs[0];
			var sx = this.position.x / this.stage.width;
			var adx = Math.abs(a.x - 0.5 - sx);
			return adx;
		} catch( e ) {
			return 1;
		}
	}
	,moveSet: null
	,blobs: null
	,position: null
	,stage: null
	,ms: null
	,enterMs: null
	,parent: null
	,__class__: kumite.layer.effect._EyeEffect.State
}
kumite.layer.effect._EyeEffect.IdleState = $hxClasses["kumite.layer.effect._EyeEffect.IdleState"] = function(parent) {
	kumite.layer.effect._EyeEffect.State.call(this,parent);
};
kumite.layer.effect._EyeEffect.IdleState.__name__ = ["kumite","layer","effect","_EyeEffect","IdleState"];
kumite.layer.effect._EyeEffect.IdleState.__super__ = kumite.layer.effect._EyeEffect.State;
kumite.layer.effect._EyeEffect.IdleState.prototype = $extend(kumite.layer.effect._EyeEffect.State.prototype,{
	execute: function() {
		if(this.blobs.length > 0) this.parent.setState(this.parent.STATE_TARGET); else {
			if(Math.random() < 0.005) {
				this.moveSet.to.x = -0.2 + Math.random() * 0.4;
				this.moveSet.to.y = -0.2 + Math.random() * 0.4;
			}
			if(this.ms - this.enterMs > 10000) this.parent.setRandomIdleState();
		}
	}
	,__class__: kumite.layer.effect._EyeEffect.IdleState
});
kumite.layer.effect._EyeEffect.IdleState1 = $hxClasses["kumite.layer.effect._EyeEffect.IdleState1"] = function(parent) {
	kumite.layer.effect._EyeEffect.State.call(this,parent);
};
kumite.layer.effect._EyeEffect.IdleState1.__name__ = ["kumite","layer","effect","_EyeEffect","IdleState1"];
kumite.layer.effect._EyeEffect.IdleState1.__super__ = kumite.layer.effect._EyeEffect.State;
kumite.layer.effect._EyeEffect.IdleState1.prototype = $extend(kumite.layer.effect._EyeEffect.State.prototype,{
	execute: function() {
		if(Math.random() < 0.3 && this.getDist() > 0.2) {
			this.moveSet.to.x = Math.sin(this.ms / 400 + this.position.x * 0.002) * 0.2;
			this.moveSet.to.y = Math.cos(this.ms / 400 + this.position.y * 0.002) * 0.2;
		}
		if(this.ms - this.enterMs > 1500) this.parent.setState(this.parent.STATE_IDLE);
		if(this.blobs.length > 0) this.parent.setState(this.parent.STATE_TARGET);
	}
	,__class__: kumite.layer.effect._EyeEffect.IdleState1
});
kumite.layer.effect._EyeEffect.IdleState2 = $hxClasses["kumite.layer.effect._EyeEffect.IdleState2"] = function(parent) {
	kumite.layer.effect._EyeEffect.State.call(this,parent);
};
kumite.layer.effect._EyeEffect.IdleState2.__name__ = ["kumite","layer","effect","_EyeEffect","IdleState2"];
kumite.layer.effect._EyeEffect.IdleState2.__super__ = kumite.layer.effect._EyeEffect.State;
kumite.layer.effect._EyeEffect.IdleState2.prototype = $extend(kumite.layer.effect._EyeEffect.State.prototype,{
	execute: function() {
		if(Math.random() < 0.3 && this.getDist() > 0.2) this.moveSet.to.y = Math.cos(this.ms / 100 + this.position.x * 0.003) * 0.3;
		if(this.ms - this.enterMs > 1500) this.parent.setState(this.parent.STATE_IDLE);
		if(this.blobs.length > 0) this.parent.setState(this.parent.STATE_TARGET);
	}
	,__class__: kumite.layer.effect._EyeEffect.IdleState2
});
kumite.layer.effect._EyeEffect.IdleState3 = $hxClasses["kumite.layer.effect._EyeEffect.IdleState3"] = function(parent) {
	kumite.layer.effect._EyeEffect.State.call(this,parent);
};
kumite.layer.effect._EyeEffect.IdleState3.__name__ = ["kumite","layer","effect","_EyeEffect","IdleState3"];
kumite.layer.effect._EyeEffect.IdleState3.__super__ = kumite.layer.effect._EyeEffect.State;
kumite.layer.effect._EyeEffect.IdleState3.prototype = $extend(kumite.layer.effect._EyeEffect.State.prototype,{
	execute: function() {
		if(Math.random() < 0.1 && this.getDist() > 0.2) {
			this.moveSet.to.x = Math.sin(this.ms / 600 + this.position.x * 0.002) * 0.2;
			this.moveSet.to.y = 0;
		}
		if(this.ms - this.enterMs > 2000) this.parent.setState(this.parent.STATE_IDLE);
		if(this.blobs.length > 0) this.parent.setState(this.parent.STATE_TARGET);
	}
	,__class__: kumite.layer.effect._EyeEffect.IdleState3
});
kumite.layer.effect._EyeEffect.TargetState = $hxClasses["kumite.layer.effect._EyeEffect.TargetState"] = function(parent) {
	kumite.layer.effect._EyeEffect.State.call(this,parent);
};
kumite.layer.effect._EyeEffect.TargetState.__name__ = ["kumite","layer","effect","_EyeEffect","TargetState"];
kumite.layer.effect._EyeEffect.TargetState.__super__ = kumite.layer.effect._EyeEffect.State;
kumite.layer.effect._EyeEffect.TargetState.prototype = $extend(kumite.layer.effect._EyeEffect.State.prototype,{
	execute: function() {
		if(this.blobs.length == 0) {
			this.parent.setState(this.parent.STATE_IDLE);
			return;
		}
		var blob = this.blobs[0];
		var ex = this.position.x / this.stage.width;
		var ey = this.position.y / this.stage.height;
		var bx = blob.x * 2.0;
		var by = (-blob.y - 0.1) * 2.0;
		var focusX = (1 - blob.z) * 0.4;
		var focusY = (1 - blob.z) * 0.2;
		var newX = (ex - bx) * focusX;
		var newY = -(ey - by) * focusY;
		this.moveSet.to.x += (newX - this.moveSet.to.x) * 0.3;
		this.moveSet.to.y += (newY - this.moveSet.to.y) * 0.3;
		if(this.ms - this.enterMs > 20000) this.parent.setRandomIdleState();
	}
	,__class__: kumite.layer.effect._EyeEffect.TargetState
});
kumite.layer.effect.PlasmaEffect = $hxClasses["kumite.layer.effect.PlasmaEffect"] = function() {
};
kumite.layer.effect.PlasmaEffect.__name__ = ["kumite","layer","effect","PlasmaEffect"];
kumite.layer.effect.PlasmaEffect.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.layer.effect.PlasmaEffect.prototype = {
	render: function(renderContext) {
		GL.useProgram(this.shaderProgram);
		GL.gl.viewport(0,0,renderContext.getWidth(),renderContext.getHeight());
		GL.gl.disable(2929);
		GL.gl.disable(3042);
		this.vertexPositionAttribute.vertexAttribPointer();
		GL.gl.uniform1f(this.amountUniform.location,this.amount);
		GL.gl.uniform1f(this.timeUniform.location,this.time.ms / 1000);
		this.resolutionUniform.setVec2(new Vec2(renderContext.getWidth(),renderContext.getHeight()));
		this.vertexPositionAttribute.drawArrays(5);
	}
	,renderTransition: function(transitionContext) {
		this.amount = transitionContext.getTransition();
		this.render(transitionContext);
	}
	,init: function() {
		this.shaderProgram = GL.createProgram(kumite.layer.effect._PlasmaEffect.Vertex,kumite.layer.effect._PlasmaEffect.Fragment);
		this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
		this.vertexPositionAttribute.updateBuffer(new Int8Array([-1,-1,1,-1,-1,1,1,1]));
		this.resolutionUniform = GL.getUniformLocation("resolution");
		this.timeUniform = GL.getUniformLocation("time");
		this.amountUniform = GL.getUniformLocation("amount");
		this.amount = 1;
	}
	,amount: null
	,amountUniform: null
	,timeUniform: null
	,resolutionUniform: null
	,vertexBuffer: null
	,vertexPositionAttribute: null
	,shaderProgram: null
	,time: null
	,__class__: kumite.layer.effect.PlasmaEffect
}
if(!kumite.layer.effect._PlasmaEffect) kumite.layer.effect._PlasmaEffect = {}
kumite.layer.effect._PlasmaEffect.Vertex = $hxClasses["kumite.layer.effect._PlasmaEffect.Vertex"] = function() { }
kumite.layer.effect._PlasmaEffect.Vertex.__name__ = ["kumite","layer","effect","_PlasmaEffect","Vertex"];
kumite.layer.effect._PlasmaEffect.Fragment = $hxClasses["kumite.layer.effect._PlasmaEffect.Fragment"] = function() { }
kumite.layer.effect._PlasmaEffect.Fragment.__name__ = ["kumite","layer","effect","_PlasmaEffect","Fragment"];
kumite.layer.effect.PostproFilter = $hxClasses["kumite.layer.effect.PostproFilter"] = function() {
};
kumite.layer.effect.PostproFilter.__name__ = ["kumite","layer","effect","PostproFilter"];
kumite.layer.effect.PostproFilter.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.layer.effect.PostproFilter.prototype = {
	render: function(renderContext) {
		GL.useProgram(this.shaderProgram);
		GL.gl.viewport(0,0,renderContext.getWidth(),renderContext.getHeight());
		GL.gl.disable(2929);
		GL.gl.disable(3042);
		this.vertexPositionAttribute.vertexAttribPointer();
		var texture = this.textureRegistry.get(this.textureConfig);
		GL.gl.activeTexture(33984);
		GL.gl.bindTexture(3553,texture.texture);
		GL.gl.uniform1i(this.textureUniform.location,0);
		GL.gl.uniform1f(this.timeUniform.location,this.time.ms);
		this.resolutionUniform.setVec2(new Vec2(renderContext.getWidth(),renderContext.getHeight()));
		this.vertexPositionAttribute.drawArrays(5);
	}
	,renderTransition: function(transitionContext) {
		this.render(transitionContext);
	}
	,init: function() {
		this.shaderProgram = GL.createProgram(kumite.layer.effect._PostproFilter.Vertex,kumite.layer.effect._PostproFilter.Fragment);
		this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
		this.vertexPositionAttribute.updateBuffer(new Int8Array([-1,-1,1,-1,-1,1,1,1]));
		this.textureUniform = GL.getUniformLocation("texture");
		this.resolutionUniform = GL.getUniformLocation("resolution");
		this.timeUniform = GL.getUniformLocation("time");
	}
	,timeUniform: null
	,resolutionUniform: null
	,textureUniform: null
	,vertexBuffer: null
	,vertexPositionAttribute: null
	,shaderProgram: null
	,textureConfig: null
	,time: null
	,textureRegistry: null
	,__class__: kumite.layer.effect.PostproFilter
}
if(!kumite.layer.effect._PostproFilter) kumite.layer.effect._PostproFilter = {}
kumite.layer.effect._PostproFilter.Vertex = $hxClasses["kumite.layer.effect._PostproFilter.Vertex"] = function() { }
kumite.layer.effect._PostproFilter.Vertex.__name__ = ["kumite","layer","effect","_PostproFilter","Vertex"];
kumite.layer.effect._PostproFilter.Fragment = $hxClasses["kumite.layer.effect._PostproFilter.Fragment"] = function() { }
kumite.layer.effect._PostproFilter.Fragment.__name__ = ["kumite","layer","effect","_PostproFilter","Fragment"];
kumite.layer.effect.TestFilter = $hxClasses["kumite.layer.effect.TestFilter"] = function() {
};
kumite.layer.effect.TestFilter.__name__ = ["kumite","layer","effect","TestFilter"];
kumite.layer.effect.TestFilter.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.layer.effect.TestFilter.prototype = {
	render: function(renderContext) {
		GL.useProgram(this.shaderProgram);
		GL.gl.viewport(0,0,renderContext.getWidth(),renderContext.getHeight());
		GL.gl.disable(2929);
		GL.gl.disable(3042);
		this.vertexPositionAttribute.vertexAttribPointer();
		var texture = this.textureRegistry.get(this.textureConfig);
		GL.gl.activeTexture(33984);
		GL.gl.bindTexture(3553,texture.texture);
		GL.gl.uniform1i(this.textureUniform.location,0);
		GL.gl.uniform1f(this.amountUniform.location,this.amount);
		this.vertexPositionAttribute.drawArrays(5);
	}
	,renderTransition: function(transitionContext) {
		this.amount = transitionContext.getTransition();
		this.render(transitionContext);
	}
	,init: function() {
		this.shaderProgram = GL.createProgram(kumite.layer.effect._TestFilter.Vertex,kumite.layer.effect._TestFilter.Fragment);
		this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
		this.vertexPositionAttribute.updateBuffer(new Int8Array([0,0,1,0,0,1,1,1]));
		this.textureUniform = GL.getUniformLocation("texture");
		this.amountUniform = GL.getUniformLocation("amount");
		this.amount = 1;
	}
	,amount: null
	,amountUniform: null
	,textureUniform: null
	,vertexBuffer: null
	,vertexPositionAttribute: null
	,shaderProgram: null
	,textureConfig: null
	,textureRegistry: null
	,__class__: kumite.layer.effect.TestFilter
}
if(!kumite.layer.effect._TestFilter) kumite.layer.effect._TestFilter = {}
kumite.layer.effect._TestFilter.Vertex = $hxClasses["kumite.layer.effect._TestFilter.Vertex"] = function() { }
kumite.layer.effect._TestFilter.Vertex.__name__ = ["kumite","layer","effect","_TestFilter","Vertex"];
kumite.layer.effect._TestFilter.Fragment = $hxClasses["kumite.layer.effect._TestFilter.Fragment"] = function() { }
kumite.layer.effect._TestFilter.Fragment.__name__ = ["kumite","layer","effect","_TestFilter","Fragment"];
if(!kumite.mouse) kumite.mouse = {}
kumite.mouse.Config = $hxClasses["kumite.mouse.Config"] = function() {
	this.mouseController = new kumite.mouse.MouseController();
};
kumite.mouse.Config.__name__ = ["kumite","mouse","Config"];
kumite.mouse.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.mouse.Config.prototype = {
	mouseController: null
	,__class__: kumite.mouse.Config
}
kumite.mouse.MouseController = $hxClasses["kumite.mouse.MouseController"] = function() {
};
kumite.mouse.MouseController.__name__ = ["kumite","mouse","MouseController"];
kumite.mouse.MouseController.__interfaces__ = [haxe.rtti.Infos];
kumite.mouse.MouseController.prototype = {
	start: function() {
		GLMouseRegistry.getInstance().init(this.canvas.itself);
	}
	,canvas: null
	,__class__: kumite.mouse.MouseController
}
if(!kumite.projection) kumite.projection = {}
kumite.projection.Config = $hxClasses["kumite.projection.Config"] = function() {
	this.projection = new kumite.projection.Projection();
	this.projectionController = new kumite.projection.ProjectionController();
	this.projectionController.fov = 40;
	this.projectionController.near = 0.1;
	this.projectionController.far = 500;
};
kumite.projection.Config.__name__ = ["kumite","projection","Config"];
kumite.projection.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.projection.Config.prototype = {
	projectionController: null
	,projection: null
	,__class__: kumite.projection.Config
}
kumite.projection.Projection = $hxClasses["kumite.projection.Projection"] = function() {
};
kumite.projection.Projection.__name__ = ["kumite","projection","Projection"];
kumite.projection.Projection.prototype = {
	matrix: null
	,__class__: kumite.projection.Projection
}
kumite.projection.ProjectionController = $hxClasses["kumite.projection.ProjectionController"] = function() {
};
kumite.projection.ProjectionController.__name__ = ["kumite","projection","ProjectionController"];
kumite.projection.ProjectionController.__interfaces__ = [haxe.rtti.Infos];
kumite.projection.ProjectionController.prototype = {
	updateProjectionSizeFromStage: function(message) {
		this.projection.matrix.setPerspective(this.fov,this.stage.getAspect(),this.near,this.far);
	}
	,init: function() {
		this.projection.matrix = new Matrix4();
		this.updateProjectionSizeFromStage();
	}
	,far: null
	,near: null
	,fov: null
	,stage: null
	,projection: null
	,__class__: kumite.projection.ProjectionController
}
kumite.scene.SceneLifecycle = $hxClasses["kumite.scene.SceneLifecycle"] = function() { }
kumite.scene.SceneLifecycle.__name__ = ["kumite","scene","SceneLifecycle"];
kumite.scene.SceneLifecycle.prototype = {
	render: null
	,renderTransition: null
	,initTransition: null
	,sceneInit: null
	,__class__: kumite.scene.SceneLifecycle
}
kumite.scene.DefaultScene = $hxClasses["kumite.scene.DefaultScene"] = function(name) {
	this.name = name;
	this.enterSignaler = new hsl.haxe.DirectSignaler(this);
	this.exitSignaler = new hsl.haxe.DirectSignaler(this);
	this.transitionOutSignaler = new hsl.haxe.DirectSignaler(this);
	this.preconfiguredLifecycles = new Array();
};
kumite.scene.DefaultScene.__name__ = ["kumite","scene","DefaultScene"];
kumite.scene.DefaultScene.__interfaces__ = [haxe.rtti.Infos,kumite.scene.SceneLifecycle];
kumite.scene.DefaultScene.prototype = {
	addPreconfiguredLifecycles: function(scene) {
		var _g = 0, _g1 = this.preconfiguredLifecycles;
		while(_g < _g1.length) {
			var lifecycle = _g1[_g];
			++_g;
			scene.addLayer(new kumite.scene.DelegateLayer(lifecycle.lifecycle,lifecycle.layerId));
		}
	}
	,sceneExit: function(sceneExit) {
		if(sceneExit.lastScene.lifecycle == this) this.exitSignaler.dispatch(null,null,{ fileName : "DefaultScene.hx", lineNumber : 100, className : "kumite.scene.DefaultScene", methodName : "sceneExit"});
	}
	,sceneEnter: function(sceneEnter) {
		if(sceneEnter.currentScene.lifecycle == this) this.enterSignaler.dispatch(null,null,{ fileName : "DefaultScene.hx", lineNumber : 93, className : "kumite.scene.DefaultScene", methodName : "sceneEnter"});
	}
	,render: function() {
	}
	,renderTransition: function(transitionContext) {
	}
	,initTransition: function(transitionContext) {
		if(transitionContext.direction == kumite.scene.TransitionDirection.OUT) this.transitionOutSignaler.dispatch(null,null,{ fileName : "DefaultScene.hx", lineNumber : 78, className : "kumite.scene.DefaultScene", methodName : "initTransition"});
	}
	,sceneInit: function(scene) {
		scene.name = this.name;
		if(this.defaultLayers) {
			var clearLayer = new kumite.layer.ClearLayer();
			clearLayer.color = new Color(0,0,0.0,1);
			scene.addLayer(new kumite.scene.DelegateLayer(clearLayer,kumite.layer.LayerId.CLEAR));
		}
		this.addPreconfiguredLifecycles(scene);
		if(this.defaultLayers) scene.addLayer(new kumite.scene.DelegateLayer(this.displayListLayer));
	}
	,addLayerLifecycle: function(lifecycle,layerId) {
		if(lifecycle == null) throw "Lifecycle for scene: " + this.name + " is null!";
		var lifecycleAndLayerId = new kumite.scene._DefaultScene.LifecycleAndLayerId();
		lifecycleAndLayerId.lifecycle = lifecycle;
		lifecycleAndLayerId.layerId = layerId;
		this.preconfiguredLifecycles.push(lifecycleAndLayerId);
	}
	,useDefaultLayers: function() {
		this.defaultLayers = true;
	}
	,defaultLayers: null
	,preconfiguredLifecycles: null
	,transitionOutSignaler: null
	,exitSignaler: null
	,enterSignaler: null
	,name: null
	,displayListLayer: null
	,__class__: kumite.scene.DefaultScene
}
if(!kumite.scene._DefaultScene) kumite.scene._DefaultScene = {}
kumite.scene._DefaultScene.LifecycleAndLayerId = $hxClasses["kumite.scene._DefaultScene.LifecycleAndLayerId"] = function() {
};
kumite.scene._DefaultScene.LifecycleAndLayerId.__name__ = ["kumite","scene","_DefaultScene","LifecycleAndLayerId"];
kumite.scene._DefaultScene.LifecycleAndLayerId.prototype = {
	layerId: null
	,lifecycle: null
	,__class__: kumite.scene._DefaultScene.LifecycleAndLayerId
}
kumite.scene.Layer = $hxClasses["kumite.scene.Layer"] = function() {
};
kumite.scene.Layer.__name__ = ["kumite","scene","Layer"];
kumite.scene.Layer.__interfaces__ = [kumite.scene.LayerLifecycle];
kumite.scene.Layer.prototype = {
	renderTransition: function(transitionContext) {
	}
	,render: function(renderContext) {
	}
	,init: function() {
	}
	,state: null
	,layerId: null
	,__class__: kumite.scene.Layer
}
kumite.scene.DelegateLayer = $hxClasses["kumite.scene.DelegateLayer"] = function(lifecycle,layerId) {
	kumite.scene.Layer.call(this);
	this.lifecycle = lifecycle;
	this.layerId = layerId;
	this.createParams();
};
kumite.scene.DelegateLayer.__name__ = ["kumite","scene","DelegateLayer"];
kumite.scene.DelegateLayer.__super__ = kumite.scene.Layer;
kumite.scene.DelegateLayer.prototype = $extend(kumite.scene.Layer.prototype,{
	createParams: function() {
		this.params = new Array();
		var ci = reflect.ClassInfo.forInstance(this.lifecycle);
		var _g = 0, _g1 = ci.getProperties();
		while(_g < _g1.length) {
			var property = _g1[_g];
			++_g;
			if(property.hasMetadata("Param")) {
				var param = new kumite.scene.LayerParam();
				param.property = property;
				param.object = this.lifecycle;
				this.params.push(param);
			}
		}
	}
	,toString: function() {
		return "[DelegateLayer " + reflect.ClassInfo.forInstance(this.lifecycle).name + "]";
	}
	,renderTransition: function(transitionContext) {
		try {
			this.lifecycle.renderTransition(transitionContext);
		} catch( e ) {
			Log.posInfo = { fileName : "DelegateLayer.hx", lineNumber : 52, className : "kumite.scene.DelegateLayer", methodName : "renderTransition"};
			if(Log.filter(LogLevel.ERROR)) {
				Log.fetchInput("Error rendering layer:\n" + this.layerId,e,null,null,null,null,null);
				console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
			}
		}
	}
	,render: function(renderContext) {
		try {
			this.lifecycle.render(renderContext);
		} catch( e ) {
			Log.posInfo = { fileName : "DelegateLayer.hx", lineNumber : 40, className : "kumite.scene.DelegateLayer", methodName : "render"};
			if(Log.filter(LogLevel.ERROR)) {
				Log.fetchInput("Error rendering layer:\n" + this.layerId,e,null,null,null,null,null);
				console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
			}
		}
	}
	,init: function() {
		try {
			this.lifecycle.init();
		} catch( e ) {
			Log.posInfo = { fileName : "DelegateLayer.hx", lineNumber : 28, className : "kumite.scene.DelegateLayer", methodName : "init"};
			if(Log.filter(LogLevel.ERROR)) {
				Log.fetchInput("Error initializing layer:\n" + this.layerId,e,null,null,null,null,null);
				console.error(Log.createErrorMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
			}
		}
	}
	,params: null
	,lifecycle: null
	,__class__: kumite.scene.DelegateLayer
});
kumite.scene.LayerParam = $hxClasses["kumite.scene.LayerParam"] = function() {
	this.name = "";
};
kumite.scene.LayerParam.__name__ = ["kumite","scene","LayerParam"];
kumite.scene.LayerParam.prototype = {
	getBinding: function() {
		return new reflect.Binding(this.object,this.getName());
	}
	,getName: function() {
		return this.property.field.name;
	}
	,object: null
	,property: null
	,name: null
	,__class__: kumite.scene.LayerParam
	,__properties__: {get_name:"getName"}
}
kumite.scene.LayerState = $hxClasses["kumite.scene.LayerState"] = function(name) {
	this.name = name;
};
kumite.scene.LayerState.__name__ = ["kumite","scene","LayerState"];
kumite.scene.LayerState.prototype = {
	name: null
	,__class__: kumite.scene.LayerState
}
kumite.scene.RenderContext = $hxClasses["kumite.scene.RenderContext"] = function() {
	this.viewports = new Array();
};
kumite.scene.RenderContext.__name__ = ["kumite","scene","RenderContext"];
kumite.scene.RenderContext.prototype = {
	getAspect: function() {
		return this.getWidth() / this.getHeight();
	}
	,getHeight: function() {
		return this.viewports[this.viewports.length - 1].height;
	}
	,getWidth: function() {
		return this.viewports[this.viewports.length - 1].width;
	}
	,popViewport: function() {
		var viewport = this.viewports.pop();
	}
	,pushViewport: function(width,height) {
		var viewport = new kumite.scene._RenderContext.Viewport();
		viewport.width = width;
		viewport.height = height;
		this.width = viewport.width;
		this.height = viewport.height;
		this.viewports.push(viewport);
	}
	,resetViewport: function(width,height) {
		this.viewports = new Array();
		this.pushViewport(width,height);
	}
	,viewports: null
	,aspect: null
	,height: null
	,width: null
	,__class__: kumite.scene.RenderContext
	,__properties__: {get_width:"getWidth",get_height:"getHeight",get_aspect:"getAspect"}
}
if(!kumite.scene._RenderContext) kumite.scene._RenderContext = {}
kumite.scene._RenderContext.Viewport = $hxClasses["kumite.scene._RenderContext.Viewport"] = function() {
};
kumite.scene._RenderContext.Viewport.__name__ = ["kumite","scene","_RenderContext","Viewport"];
kumite.scene._RenderContext.Viewport.prototype = {
	height: null
	,width: null
	,__class__: kumite.scene._RenderContext.Viewport
}
kumite.scene.Scene = $hxClasses["kumite.scene.Scene"] = function() {
	this.layers = new Array();
};
kumite.scene.Scene.__name__ = ["kumite","scene","Scene"];
kumite.scene.Scene.prototype = {
	getLayerIndex: function(layer) {
		var _g1 = 0, _g = this.layers.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.layers[i].layerId == layer.layerId) return i;
		}
		return -1;
	}
	,containsLayer: function(layer) {
		var _g = 0, _g1 = this.layers;
		while(_g < _g1.length) {
			var sceneLayer = _g1[_g];
			++_g;
			if(sceneLayer.layerId == layer.layerId) return true;
		}
		return false;
	}
	,addLayer: function(layer) {
		this.layers.push(layer);
	}
	,name: null
	,id: null
	,layers: null
	,__class__: kumite.scene.Scene
}
kumite.scene.SceneAndLifecycle = $hxClasses["kumite.scene.SceneAndLifecycle"] = function() {
};
kumite.scene.SceneAndLifecycle.__name__ = ["kumite","scene","SceneAndLifecycle"];
kumite.scene.SceneAndLifecycle.prototype = {
	lifecycle: null
	,scene: null
	,__class__: kumite.scene.SceneAndLifecycle
}
kumite.scene.SceneChangeRequest = $hxClasses["kumite.scene.SceneChangeRequest"] = function(sceneId) {
	this.sceneId = sceneId;
};
kumite.scene.SceneChangeRequest.__name__ = ["kumite","scene","SceneChangeRequest"];
kumite.scene.SceneChangeRequest.prototype = {
	sceneId: null
	,__class__: kumite.scene.SceneChangeRequest
}
kumite.scene.SceneConfig = $hxClasses["kumite.scene.SceneConfig"] = function() {
	this.scenes = new kumite.scene.Scenes();
	this.sceneNavigator = new kumite.scene.SceneNavigator();
	this.sceneNavigator.transitionTime = 1000;
};
kumite.scene.SceneConfig.__name__ = ["kumite","scene","SceneConfig"];
kumite.scene.SceneConfig.__interfaces__ = [haxe.rtti.Infos];
kumite.scene.SceneConfig.prototype = {
	sceneNavigator: null
	,scenes: null
	,__class__: kumite.scene.SceneConfig
}
kumite.scene.SceneEnter = $hxClasses["kumite.scene.SceneEnter"] = function(lastScene,currentScene) {
	this.lastScene = lastScene;
	this.currentScene = currentScene;
};
kumite.scene.SceneEnter.__name__ = ["kumite","scene","SceneEnter"];
kumite.scene.SceneEnter.prototype = {
	currentScene: null
	,lastScene: null
	,__class__: kumite.scene.SceneEnter
}
kumite.scene.SceneExit = $hxClasses["kumite.scene.SceneExit"] = function(lastScene,currentScene) {
	this.lastScene = lastScene;
	this.currentScene = currentScene;
};
kumite.scene.SceneExit.__name__ = ["kumite","scene","SceneExit"];
kumite.scene.SceneExit.prototype = {
	currentScene: null
	,lastScene: null
	,__class__: kumite.scene.SceneExit
}
kumite.scene.SceneMixer = $hxClasses["kumite.scene.SceneMixer"] = function() {
};
kumite.scene.SceneMixer.__name__ = ["kumite","scene","SceneMixer"];
kumite.scene.SceneMixer.prototype = {
	sorter: function(a,b) {
		var from = this.from;
		var to = this.to;
		var result = function(value,i) {
			return value;
		};
		var aInFrom = from.containsLayer(a);
		var aInTo = to.containsLayer(a);
		var bInFrom = from.containsLayer(b);
		var bInTo = to.containsLayer(b);
		if(aInTo && bInTo) {
			var bOverA = to.getLayerIndex(b) > to.getLayerIndex(a);
			if(bOverA) return result(-1,{ fileName : "SceneMixer.hx", lineNumber : 62, className : "kumite.scene.SceneMixer", methodName : "sorter"}); else return result(1,{ fileName : "SceneMixer.hx", lineNumber : 64, className : "kumite.scene.SceneMixer", methodName : "sorter"});
		}
		if(aInFrom && bInFrom) {
			var bOverA = from.getLayerIndex(b) > from.getLayerIndex(a);
			if(bOverA) return result(-1,{ fileName : "SceneMixer.hx", lineNumber : 71, className : "kumite.scene.SceneMixer", methodName : "sorter"}); else return result(1,{ fileName : "SceneMixer.hx", lineNumber : 73, className : "kumite.scene.SceneMixer", methodName : "sorter"});
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
			};
			var hasAPredecessorThatIsOverB = computeHasAPredecessorThatIsOverB();
			if(hasAPredecessorThatIsOverB) return result(1,{ fileName : "SceneMixer.hx", lineNumber : 98, className : "kumite.scene.SceneMixer", methodName : "sorter"}); else return result(-1,{ fileName : "SceneMixer.hx", lineNumber : 100, className : "kumite.scene.SceneMixer", methodName : "sorter"});
		}
		if(aInTo && !aInFrom && !bInTo && bInFrom) return result(1,{ fileName : "SceneMixer.hx", lineNumber : 104, className : "kumite.scene.SceneMixer", methodName : "sorter"});
		return result(0,{ fileName : "SceneMixer.hx", lineNumber : 106, className : "kumite.scene.SceneMixer", methodName : "sorter"});
	}
	,mix: function(from,to) {
		this.from = from;
		this.to = to;
		var result = new kumite.scene.Scene();
		var _g = 0, _g1 = to.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			if(from.containsLayer(layer)) layer.state = kumite.scene.LayerState.KEEP; else layer.state = kumite.scene.LayerState.IN;
			result.addLayer(layer);
		}
		var _g = 0, _g1 = from.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			if(!result.containsLayer(layer)) {
				layer.state = kumite.scene.LayerState.OUT;
				result.addLayer(layer);
			}
		}
		result.layers.sort($bind(this,this.sorter));
		return result;
	}
	,to: null
	,from: null
	,__class__: kumite.scene.SceneMixer
}
kumite.scene.SceneNavigator = $hxClasses["kumite.scene.SceneNavigator"] = function() {
	this.transitionTime = 1000;
};
kumite.scene.SceneNavigator.__name__ = ["kumite","scene","SceneNavigator"];
kumite.scene.SceneNavigator.__interfaces__ = [haxe.rtti.Infos];
kumite.scene.SceneNavigator.prototype = {
	initAllLayers: function() {
		Log.posInfo = { fileName : "SceneNavigator.hx", lineNumber : 163, className : "kumite.scene.SceneNavigator", methodName : "initAllLayers"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput("Init all scenes and layers...",null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
		var layerIdToLifecycle = new Hash();
		var autoLayerIndex = 0;
		var autoSceneIndex = 0;
		var _g = 0, _g1 = this.scenes.all;
		while(_g < _g1.length) {
			var scene = _g1[_g];
			++_g;
			if(scene.scene.id == null) {
				scene.scene.id = "AUTO_" + autoSceneIndex;
				autoSceneIndex++;
			}
			scene.lifecycle.sceneInit(scene.scene);
			if(scene.scene.name == null) scene.scene.name = scene.scene.id;
			var _g2 = 0, _g3 = scene.scene.layers;
			while(_g2 < _g3.length) {
				var layer = _g3[_g2];
				++_g2;
				Log.posInfo = { fileName : "SceneNavigator.hx", lineNumber : 186, className : "kumite.scene.SceneNavigator", methodName : "initAllLayers"};
				if(Log.filter(LogLevel.INFO)) {
					Log.fetchInput("Init layer:",layer.layerId,null,null,null,null,null);
					console.info(Log.createMessage());
				}
				if(layer.layerId == null) {
					if(js.Boot.__instanceof(layer,kumite.scene.DelegateLayer)) {
						var lifecycle = (js.Boot.__cast(layer , kumite.scene.DelegateLayer)).lifecycle;
						var $it0 = layerIdToLifecycle.keys();
						while( $it0.hasNext() ) {
							var key = $it0.next();
							if(layerIdToLifecycle.get(key) == lifecycle) {
								layer.layerId = key;
								Log.posInfo = { fileName : "SceneNavigator.hx", lineNumber : 197, className : "kumite.scene.SceneNavigator", methodName : "initAllLayers"};
								if(Log.filter(LogLevel.INFO)) {
									Log.fetchInput("Reuse DelegateLayer:",layer.layerId,null,null,null,null,null);
									console.info(Log.createMessage());
								}
								break;
							}
						}
					}
					if(layer.layerId == null) {
						layer.layerId = "layer_" + autoLayerIndex + ": " + Std.string(layer);
						Log.posInfo = { fileName : "SceneNavigator.hx", lineNumber : 206, className : "kumite.scene.SceneNavigator", methodName : "initAllLayers"};
						if(Log.filter(LogLevel.INFO)) {
							Log.fetchInput("auto add layer:",layer.layerId,null,null,null,null,null);
							console.info(Log.createMessage());
						}
						autoLayerIndex++;
					}
				}
				if(js.Boot.__instanceof(layer,kumite.scene.DelegateLayer)) layerIdToLifecycle.set(layer.layerId,(js.Boot.__cast(layer , kumite.scene.DelegateLayer)).lifecycle);
				layer.init();
			}
		}
	}
	,setState: function(state) {
		this.state = state;
		state.enter();
	}
	,enterScene: function(newScene) {
		if(this.state.allowsScreenChange && newScene != this.currentScene) {
			this.lastScene = this.currentScene;
			this.currentScene = newScene;
			this.messenger.send(new kumite.scene.SceneEnter(this.lastScene,this.currentScene));
			this.setState(this.transitionState);
		}
	}
	,renderNormal: function() {
		this.renderContext.resetViewport(this.stage.width,this.stage.height);
		this.currentScene.lifecycle.render();
		var _g = 0, _g1 = this.currentScene.scene.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			layer.render(this.renderContext);
		}
	}
	,initTransition: function() {
		this.lastScene.lifecycle.initTransition(this.transitionContext.toOut());
		this.currentScene.lifecycle.initTransition(this.transitionContext.toIn());
	}
	,renderTransition: function() {
		var mixer = new kumite.scene.SceneMixer();
		var mixedScene = mixer.mix(this.lastScene.scene,this.currentScene.scene);
		this.transitionContext.resetViewport(this.stage.width,this.stage.height);
		this.lastScene.lifecycle.renderTransition(this.transitionContext.toIn());
		this.currentScene.lifecycle.renderTransition(this.transitionContext.toOut());
		var _g = 0, _g1 = mixedScene.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			this.transitionContext.layerState = layer.state;
			switch(layer.state) {
			case kumite.scene.LayerState.IN:
				layer.renderTransition(this.transitionContext.toIn());
				break;
			case kumite.scene.LayerState.OUT:
				layer.renderTransition(this.transitionContext.toOut());
				break;
			case kumite.scene.LayerState.KEEP:
				layer.render(this.transitionContext);
				break;
			}
		}
	}
	,render: function(tick) {
		this.state.render();
	}
	,handleSceneChangeRequest: function(message) {
		this.enterScene(this.scenes.getSceneById(message.sceneId));
	}
	,start: function() {
		if(this.scenes.all.length == 0) {
			Log.posInfo = { fileName : "SceneNavigator.hx", lineNumber : 81, className : "kumite.scene.SceneNavigator", methodName : "start"};
			if(Log.filter(LogLevel.WARN)) {
				Log.fetchInput("No scenes were added!",null,null,null,null,null,null);
				console.warn(Log.createMessage());
			}
			return;
		}
		this.initAllLayers();
		this.enterScene(this.scenes.getFirstScene());
	}
	,handleSceneLifecycleAdded: function(lifecycle) {
		var scene = new kumite.scene.Scene();
		var sceneAndLifecycle = new kumite.scene.SceneAndLifecycle();
		sceneAndLifecycle.scene = scene;
		sceneAndLifecycle.lifecycle = lifecycle;
		this.scenes.all.push(sceneAndLifecycle);
	}
	,init: function() {
		this.currentScene = new kumite.scene.SceneAndLifecycle();
		this.currentScene.scene = new kumite.scene.Scene();
		this.currentScene.scene.id = "";
		this.currentScene.scene.name = "";
		this.currentScene.lifecycle = new kumite.scene.NullSceneLifecycle();
		this.transitionContext = new kumite.scene.TransitionContext();
		this.renderContext = new kumite.scene.RenderContext();
		this.initState = new kumite.scene.InitState(this);
		this.idleState = new kumite.scene.IdleState(this);
		this.transitionState = new kumite.scene.TransitionState(this);
		this.setState(this.initState);
	}
	,state: null
	,lastScene: null
	,currentScene: null
	,transitionState: null
	,idleState: null
	,initState: null
	,renderContext: null
	,transitionContext: null
	,transitionTime: null
	,stage: null
	,time: null
	,scenes: null
	,messenger: null
	,__class__: kumite.scene.SceneNavigator
}
kumite.scene.State = $hxClasses["kumite.scene.State"] = function(navigator) {
	this.navigator = navigator;
	this.time = navigator.time;
	this.transitionContext = navigator.transitionContext;
	this.configure();
};
kumite.scene.State.__name__ = ["kumite","scene","State"];
kumite.scene.State.prototype = {
	configure: function() {
		this.allowsScreenChange = false;
	}
	,render: function() {
	}
	,enter: function() {
	}
	,time: null
	,navigator: null
	,transitionContext: null
	,allowsScreenChange: null
	,__class__: kumite.scene.State
}
kumite.scene.InitState = $hxClasses["kumite.scene.InitState"] = function(navigator) {
	kumite.scene.State.call(this,navigator);
};
kumite.scene.InitState.__name__ = ["kumite","scene","InitState"];
kumite.scene.InitState.__super__ = kumite.scene.State;
kumite.scene.InitState.prototype = $extend(kumite.scene.State.prototype,{
	configure: function() {
		this.allowsScreenChange = true;
	}
	,__class__: kumite.scene.InitState
});
kumite.scene.IdleState = $hxClasses["kumite.scene.IdleState"] = function(navigator) {
	kumite.scene.State.call(this,navigator);
};
kumite.scene.IdleState.__name__ = ["kumite","scene","IdleState"];
kumite.scene.IdleState.__super__ = kumite.scene.State;
kumite.scene.IdleState.prototype = $extend(kumite.scene.State.prototype,{
	render: function() {
		this.navigator.renderNormal();
	}
	,configure: function() {
		this.allowsScreenChange = true;
	}
	,__class__: kumite.scene.IdleState
});
kumite.scene.TransitionState = $hxClasses["kumite.scene.TransitionState"] = function(navigator) {
	kumite.scene.State.call(this,navigator);
};
kumite.scene.TransitionState.__name__ = ["kumite","scene","TransitionState"];
kumite.scene.TransitionState.__super__ = kumite.scene.State;
kumite.scene.TransitionState.prototype = $extend(kumite.scene.State.prototype,{
	render: function() {
		this.transitionContext.setTransition(Map.linear(this.time.ms,this.enterTime,this.exitTime,0,1));
		if(this.transitionContext.getTransition() >= 1) {
			this.transitionContext.setTransition(1);
			this.navigator.messenger.send(new kumite.scene.SceneExit(this.navigator.lastScene,this.navigator.currentScene));
			this.navigator.setState(this.navigator.idleState);
		}
		this.navigator.renderTransition();
	}
	,enter: function() {
		this.enterTime = this.time.ms;
		this.exitTime = this.time.ms + this.navigator.transitionTime;
		this.transitionContext.setTransition(0);
		this.transitionContext.outScene = this.navigator.lastScene;
		this.transitionContext.inScene = this.navigator.currentScene;
		this.navigator.initTransition();
	}
	,exitTime: null
	,enterTime: null
	,__class__: kumite.scene.TransitionState
});
kumite.scene.NullSceneLifecycle = $hxClasses["kumite.scene.NullSceneLifecycle"] = function() {
};
kumite.scene.NullSceneLifecycle.__name__ = ["kumite","scene","NullSceneLifecycle"];
kumite.scene.NullSceneLifecycle.__interfaces__ = [kumite.scene.SceneLifecycle];
kumite.scene.NullSceneLifecycle.prototype = {
	render: function() {
	}
	,renderTransition: function(transitionContext) {
	}
	,initTransition: function(transitionContext) {
	}
	,sceneInit: function(scene) {
	}
	,__class__: kumite.scene.NullSceneLifecycle
}
kumite.scene.Scenes = $hxClasses["kumite.scene.Scenes"] = function() {
	this.all = new Array();
};
kumite.scene.Scenes.__name__ = ["kumite","scene","Scenes"];
kumite.scene.Scenes.prototype = {
	getSceneById: function(id) {
		var _g = 0, _g1 = this.all;
		while(_g < _g1.length) {
			var result = _g1[_g];
			++_g;
			if(result.scene.id == id) return result;
		}
		throw "Cannot find scene: " + id;
	}
	,getRandomScene: function() {
		return this.all[Math.random() * this.all.length | 0];
	}
	,getFirstScene: function() {
		return this.all[0];
	}
	,all: null
	,__class__: kumite.scene.Scenes
}
kumite.scene.TransitionContext = $hxClasses["kumite.scene.TransitionContext"] = function() {
	kumite.scene.RenderContext.call(this);
};
kumite.scene.TransitionContext.__name__ = ["kumite","scene","TransitionContext"];
kumite.scene.TransitionContext.__super__ = kumite.scene.RenderContext;
kumite.scene.TransitionContext.prototype = $extend(kumite.scene.RenderContext.prototype,{
	setTransition: function(value) {
		this.direction = kumite.scene.TransitionDirection.IN;
		this.transition = value;
		return value;
	}
	,getTransition: function() {
		switch( (this.direction)[1] ) {
		case 0:
			return this.transition;
		case 1:
			return 1 - this.transition;
		}
	}
	,toOut: function() {
		this.direction = kumite.scene.TransitionDirection.OUT;
		return this;
	}
	,toIn: function() {
		this.direction = kumite.scene.TransitionDirection.IN;
		return this;
	}
	,direction: null
	,outScene: null
	,inScene: null
	,layerState: null
	,transition: null
	,__class__: kumite.scene.TransitionContext
	,__properties__: $extend(kumite.scene.RenderContext.prototype.__properties__,{set_transition:"setTransition",get_transition:"getTransition"})
});
kumite.scene.TransitionDirection = $hxClasses["kumite.scene.TransitionDirection"] = { __ename__ : ["kumite","scene","TransitionDirection"], __constructs__ : ["IN","OUT"] }
kumite.scene.TransitionDirection.IN = ["IN",0];
kumite.scene.TransitionDirection.IN.toString = $estr;
kumite.scene.TransitionDirection.IN.__enum__ = kumite.scene.TransitionDirection;
kumite.scene.TransitionDirection.OUT = ["OUT",1];
kumite.scene.TransitionDirection.OUT.toString = $estr;
kumite.scene.TransitionDirection.OUT.__enum__ = kumite.scene.TransitionDirection;
if(!kumite.spritemesh) kumite.spritemesh = {}
kumite.spritemesh.Config = $hxClasses["kumite.spritemesh.Config"] = function() {
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
	this.layer3.offset = 0;
	this.layer3.textureFrequenceParam = 0.0000031;
	this.layer3.textureAmpParam = 304;
	this.scene1 = new kumite.scene.DefaultScene("S 1");
	this.scene2 = new kumite.scene.DefaultScene("S 2");
	this.scene3 = new kumite.scene.DefaultScene("S 3");
	this.scene4 = new kumite.scene.DefaultScene("S 3 CROSS");
	this.scene5 = new kumite.scene.DefaultScene("S 3 RG");
	this.framebufferEnableLayer1 = new kumite.layer.FramebufferEnableLayer(2048,1024);
	this.framebufferDisableLayer1 = new kumite.layer.FramebufferDisableLayer();
	this.clearLayer1 = new kumite.layer.ClearLayer();
	this.clearLayer1.color = new Color(0.5,0.5,0.5,1.0);
	this.textureLayer1 = new kumite.layer.TextureLayer();
	this.textureLayer1.scale = 1.0;
	this.textureLayer1.textureConfig = this.framebufferEnableLayer1.textureConfig;
	this.testFilter = new kumite.layer.effect.TestFilter();
	this.testFilter.textureConfig = this.framebufferEnableLayer1.textureConfig;
	this.postproFilter = new kumite.layer.effect.PostproFilter();
	this.postproFilter.textureConfig = this.framebufferEnableLayer1.textureConfig;
	this.crosshatchFilter = new kumite.layer.effect.CrosshatchFilter();
	this.crosshatchFilter.textureConfig = this.framebufferEnableLayer1.textureConfig;
};
kumite.spritemesh.Config.__name__ = ["kumite","spritemesh","Config"];
kumite.spritemesh.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.spritemesh.Config.prototype = {
	startPrepare: function() {
		var group = new bpmjs.SequencerTaskGroup();
		var _g = 1;
		while(_g < 190) {
			var i = _g++;
			var s = "" + i;
			while(s.length < 4) s = "0" + s;
			GLTextureAtlasPartConfig.create(kumite.spritemesh.Config.TEST_ATLAS,"data/image/karlo/image" + s + ".png");
		}
		group.add(new GLTextureAtlasLoadingTask(this.textureRegistry,kumite.spritemesh.Config.TEST_ATLAS));
		return group;
	}
	,complete: function() {
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
		this.scene3.addLayerLifecycle(this.framebufferEnableLayer1);
		this.scene3.addLayerLifecycle(this.clearLayer1);
		this.scene3.addLayerLifecycle(this.layer3);
		this.scene3.addLayerLifecycle(this.framebufferDisableLayer1);
		this.scene3.addLayerLifecycle(this.textureLayer1);
		this.scene3.addLayerLifecycle(this.displayListLayer);
		this.scene4.addLayerLifecycle(this.clearLayer,kumite.layer.LayerId.CLEAR);
		this.scene4.addLayerLifecycle(this.colorLayer);
		this.scene4.addLayerLifecycle(this.framebufferEnableLayer1);
		this.scene4.addLayerLifecycle(this.clearLayer1);
		this.scene4.addLayerLifecycle(this.layer3);
		this.scene4.addLayerLifecycle(this.crosshatchFilter);
		this.scene4.addLayerLifecycle(this.framebufferDisableLayer1);
		this.scene4.addLayerLifecycle(this.textureLayer1);
		this.scene4.addLayerLifecycle(this.displayListLayer);
		this.scene5.addLayerLifecycle(this.clearLayer,kumite.layer.LayerId.CLEAR);
		this.scene5.addLayerLifecycle(this.colorLayer);
		this.scene5.addLayerLifecycle(this.framebufferEnableLayer1);
		this.scene5.addLayerLifecycle(this.clearLayer1);
		this.scene5.addLayerLifecycle(this.layer3);
		this.scene5.addLayerLifecycle(this.postproFilter);
		this.scene5.addLayerLifecycle(this.framebufferDisableLayer1);
		this.scene5.addLayerLifecycle(this.textureLayer1);
		this.scene5.addLayerLifecycle(this.displayListLayer);
	}
	,crosshatchFilter: null
	,postproFilter: null
	,testFilter: null
	,textureLayer1: null
	,clearLayer1: null
	,framebufferDisableLayer1: null
	,framebufferEnableLayer1: null
	,scene5: null
	,scene4: null
	,scene3: null
	,scene2: null
	,scene1: null
	,layer3: null
	,layer2: null
	,layer1: null
	,colorLayer: null
	,clearLayer: null
	,displayListLayer: null
	,textureRegistry: null
	,__class__: kumite.spritemesh.Config
}
kumite.spritemesh.Sprite = $hxClasses["kumite.spritemesh.Sprite"] = function() {
	this.matrix = new Matrix4();
	this.vertexes = new Float32Array(12);
	this.normals = new Float32Array(3);
};
kumite.spritemesh.Sprite.__name__ = ["kumite","spritemesh","Sprite"];
kumite.spritemesh.Sprite.prototype = {
	transform: function() {
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
	,getZ: function() {
		return this.vertexes[2];
	}
	,normals: null
	,vertexes: null
	,image: null
	,matrix: null
	,__class__: kumite.spritemesh.Sprite
}
kumite.spritemesh.SpriteMeshLayer = $hxClasses["kumite.spritemesh.SpriteMeshLayer"] = function() {
	this.offset = -20000 + Math.random() * 40000;
	this.spriteRenderIndexes = new Uint32Array(kumite.spritemesh.SpriteMeshLayer.max);
	this.projectionMatrix = new Matrix4();
	this.cameraMatrix = new Matrix4();
	this.cameraMatrix2 = new Matrix4();
	this.transitions = new kumite.layer.LayerTransitions();
	this.transitions.add(this.alphaTransition = new kumite.layer.LayerTransition("alpha"));
	this.transitions.enableChild("alpha");
	this.alphaTransition.ease = ease.Quad.easeInOut;
};
kumite.spritemesh.SpriteMeshLayer.__name__ = ["kumite","spritemesh","SpriteMeshLayer"];
kumite.spritemesh.SpriteMeshLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.spritemesh.SpriteMeshLayer.prototype = {
	initGl: function() {
		this.shaderProgram = GL.createProgram(kumite.spritemesh._SpriteMeshLayer.Vertex,kumite.spritemesh._SpriteMeshLayer.Fragment);
		this.vertexBuffer = new Float32Array(kumite.spritemesh.SpriteMeshLayer.max * 12);
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
		this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",3,5126);
		this.vertexPositionAttribute.updateBuffer(this.vertexBuffer,35040);
		this.vertexNormalBuffer = new Float32Array(kumite.spritemesh.SpriteMeshLayer.max * 12);
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
		this.vertexNormalAttribute = GL.getAttribLocation2("vertexNormal",3,5126);
		this.vertexNormalAttribute.updateBuffer(this.vertexNormalBuffer,35040);
		this.vertexUVBuffer = new Float32Array(kumite.spritemesh.SpriteMeshLayer.max * 8);
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
		this.vertexUVAttribute = GL.getAttribLocation2("vertexUV",2,5126);
		this.vertexUVAttribute.updateBuffer(this.vertexUVBuffer,35040);
		this.cubeVerticesIndexBuffer = GL.gl.createBuffer();
		GL.gl.bindBuffer(34963,this.cubeVerticesIndexBuffer);
		var elementIndexes = new Uint16Array(6 * kumite.spritemesh.SpriteMeshLayer.max);
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
		GL.gl.bufferData(34963,elementIndexes,35044);
		this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
		this.alphaUniform = GL.getUniformLocation("alpha");
		this.textureUniform = GL.getUniformLocation("texture");
		this.cameraMatrix = new Matrix4();
		this.cameraMatrix.setLookAt(new Vec3(0,0,80),new Vec3(0,0,0),new Vec3(0,1,0));
	}
	,renderGL: function() {
		this.vertexUVAttribute.updateBuffer3(this.vertexUVBuffer);
		this.vertexPositionAttribute.updateBuffer3(this.vertexBuffer);
		this.vertexNormalAttribute.updateBuffer3(this.vertexNormalBuffer);
		this.vertexNormalAttribute.vertexAttribPointer();
		this.vertexPositionAttribute.vertexAttribPointer();
		this.vertexUVAttribute.vertexAttribPointer();
		GL.gl.bindBuffer(34963,this.cubeVerticesIndexBuffer);
		GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,this.projectionMatrix.buffer);
		GL.gl.uniform1f(this.alphaUniform.location,this.alphaTransition.getTransition());
		GL.gl.activeTexture(33984);
		GL.gl.bindTexture(3553,this.textureRegistry.get(kumite.spritemesh.Config.TEST_ATLAS).texture);
		GL.gl.uniform1i(this.textureUniform.location,0);
		GL.gl.drawElements(4,this.spriteRenderIndexesCount * 6,5123,0);
	}
	,updateBuffer: function() {
		var vi = 0;
		var ni = 0;
		var ti = 0;
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
	,quicksort: function(lo,hi) {
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
	,sortIndexes: function() {
		this.quicksort(0,this.spriteRenderIndexesCount - 1);
	}
	,updateIndexes: function() {
		this.spriteRenderIndexesCount = 0;
		var _g1 = 0, _g = kumite.spritemesh.SpriteMeshLayer.max;
		while(_g1 < _g) {
			var i = _g1++;
			var sprite = this.sprites[i];
			var D4 = -sprite.vertexes[2];
			if(D4 > 0) {
				var D3 = D4 / 500;
				if(D3 > 1) {
					Log.posInfo = { fileName : "SpriteMeshLayer.hx", lineNumber : 177, className : "kumite.spritemesh.SpriteMeshLayer", methodName : "updateIndexes"};
					if(Log.filter(LogLevel.WARN)) {
						Log.fetchInput(D3,null,null,null,null,null,null);
						console.warn(Log.createMessage());
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
	,updateModel: function() {
		this.cameraMatrix2.setRotation(Math.sin(this.timems / 10000) * 0.4 + this.timems / 24000,kumite.spritemesh.SpriteMeshLayer.axis);
		this.cameraMatrix2.appendAffine(this.cameraMatrix);
		var scaleAmplitudeTemp1 = (1 - this.alphaTransition.getTransition()) * 1.35;
		var scaleAmplitude = 0.2 + scaleAmplitudeTemp1 * scaleAmplitudeTemp1 * scaleAmplitudeTemp1;
		var objectAmplitude1 = 30;
		var objectAmplitude2 = objectAmplitude1 / 3;
		var objectAmplitude3 = objectAmplitude1 / 2;
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
	,renderGLInit: function(renderContext) {
		GL.useProgram(this.shaderProgram);
		GL.gl.viewport(0,0,renderContext.getWidth(),renderContext.getHeight());
		this.projectionMatrix.setPerspective(40,renderContext.getAspect(),0.1,500);
		GL.gl.disable(2929);
		GL.gl.enable(3042);
		GL.gl.blendFunc(770,771);
	}
	,render: function(renderContext) {
		this.timems = this.time.ms * 0.15 + this.offset;
		this.renderGLInit(renderContext);
		this.updateModel();
		this.updateIndexes();
		this.sortIndexes();
		this.updateBuffer();
		this.renderGL();
	}
	,timems: null
	,renderTransition: function(transitionContext) {
		this.transitions.setTransition(transitionContext.getTransition());
		this.render(transitionContext);
	}
	,init: function() {
		this.sprites = new Array();
		var _g1 = 0, _g = kumite.spritemesh.SpriteMeshLayer.max;
		while(_g1 < _g) {
			var i = _g1++;
			var image = kumite.spritemesh.Config.TEST_ATLAS.parts[((Math.sin(i * this.textureFrequenceParam) + 1) * this.textureAmpParam | 0) % kumite.spritemesh.Config.TEST_ATLAS.parts.length];
			var sprite = new kumite.spritemesh.Sprite();
			sprite.image = image;
			this.sprites.push(sprite);
		}
		this.initGl();
	}
	,spriteRenderIndexesCount: null
	,spriteRenderIndexes: null
	,textureUniform: null
	,alphaUniform: null
	,projectionMatrixUniform: null
	,cubeVerticesIndexBuffer: null
	,vertexNormalAttribute: null
	,vertexNormalBuffer: null
	,vertexUVAttribute: null
	,vertexUVBuffer: null
	,vertexPositionAttribute: null
	,vertexBuffer: null
	,shaderProgram: null
	,cameraMatrix2: null
	,cameraMatrix: null
	,projectionMatrix: null
	,sprites: null
	,textureAmpParam: null
	,textureFrequenceParam: null
	,offset: null
	,alphaTransition: null
	,transitions: null
	,textureRegistry: null
	,time: null
	,__class__: kumite.spritemesh.SpriteMeshLayer
}
if(!kumite.spritemesh._SpriteMeshLayer) kumite.spritemesh._SpriteMeshLayer = {}
kumite.spritemesh._SpriteMeshLayer.Vertex = $hxClasses["kumite.spritemesh._SpriteMeshLayer.Vertex"] = function() { }
kumite.spritemesh._SpriteMeshLayer.Vertex.__name__ = ["kumite","spritemesh","_SpriteMeshLayer","Vertex"];
kumite.spritemesh._SpriteMeshLayer.Fragment = $hxClasses["kumite.spritemesh._SpriteMeshLayer.Fragment"] = function() { }
kumite.spritemesh._SpriteMeshLayer.Fragment.__name__ = ["kumite","spritemesh","_SpriteMeshLayer","Fragment"];
if(!kumite.stage) kumite.stage = {}
kumite.stage.Config = $hxClasses["kumite.stage.Config"] = function() {
	this.stage = new kumite.stage.Stage();
	this.stageResizeAction = new kumite.stage.StageResizeAction();
};
kumite.stage.Config.__name__ = ["kumite","stage","Config"];
kumite.stage.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.stage.Config.prototype = {
	stageResizeAction: null
	,stage: null
	,__class__: kumite.stage.Config
}
kumite.stage.Stage = $hxClasses["kumite.stage.Stage"] = function() {
};
kumite.stage.Stage.__name__ = ["kumite","stage","Stage"];
kumite.stage.Stage.prototype = {
	getAspect: function() {
		return this.width / this.height;
	}
	,aspect: null
	,height: null
	,width: null
	,__class__: kumite.stage.Stage
	,__properties__: {get_aspect:"getAspect"}
}
kumite.stage.StageResizeAction = $hxClasses["kumite.stage.StageResizeAction"] = function() {
};
kumite.stage.StageResizeAction.__name__ = ["kumite","stage","StageResizeAction"];
kumite.stage.StageResizeAction.__interfaces__ = [haxe.rtti.Infos];
kumite.stage.StageResizeAction.prototype = {
	sendResizeMessage: function() {
		this.messenger.send(new kumite.stage.StageResizeMessage());
	}
	,updateSize: function() {
		this.stage.width = js.Lib.window.innerWidth | 0;
		this.stage.height = js.Lib.window.innerHeight | 0;
	}
	,onResize: function(event) {
		this.updateSize();
		this.sendResizeMessage();
	}
	,timerUpdate: function() {
		if(this.stage.width != js.Lib.window.innerWidth || this.stage.height != js.Lib.window.innerHeight) this.onResize();
	}
	,startComplete: function() {
		GLAnimationFrame.run($bind(this,this.timerUpdate));
		js.Lib.window.onresize = $bind(this,this.onResize);
	}
	,initPrepare: function() {
		this.updateSize();
	}
	,stage: null
	,messenger: null
	,__class__: kumite.stage.StageResizeAction
}
kumite.stage.StageResizeMessage = $hxClasses["kumite.stage.StageResizeMessage"] = function() {
};
kumite.stage.StageResizeMessage.__name__ = ["kumite","stage","StageResizeMessage"];
kumite.stage.StageResizeMessage.prototype = {
	__class__: kumite.stage.StageResizeMessage
}
if(!kumite.textureregistry) kumite.textureregistry = {}
kumite.textureregistry.Config = $hxClasses["kumite.textureregistry.Config"] = function() {
	this.textureRegistry = new GLTextureRegistry();
};
kumite.textureregistry.Config.__name__ = ["kumite","textureregistry","Config"];
kumite.textureregistry.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.textureregistry.Config.prototype = {
	textureRegistry: null
	,__class__: kumite.textureregistry.Config
}
if(!kumite.time) kumite.time = {}
kumite.time.Config = $hxClasses["kumite.time.Config"] = function() {
	this.time = new kumite.time.Time();
	this.timeController = new kumite.time.TimeController();
};
kumite.time.Config.__name__ = ["kumite","time","Config"];
kumite.time.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.time.Config.prototype = {
	timeController: null
	,time: null
	,__class__: kumite.time.Config
}
kumite.time.Tick = $hxClasses["kumite.time.Tick"] = function() {
};
kumite.time.Tick.__name__ = ["kumite","time","Tick"];
kumite.time.Tick.prototype = {
	__class__: kumite.time.Tick
}
kumite.time.Time = $hxClasses["kumite.time.Time"] = function() {
	this.reset();
};
kumite.time.Time.__name__ = ["kumite","time","Time"];
kumite.time.Time.prototype = {
	interpolateVec3To: function(from,to,f) {
		from.x = this.interpolateTo(from.x,to.x,f);
		from.y = this.interpolateTo(from.y,to.y,f);
		from.z = this.interpolateTo(from.z,to.z,f);
	}
	,interpolateTo: function(from,to,f) {
		return from * (1 - f * this.timeScale) + to * (f * this.timeScale);
	}
	,factor: function(value) {
		return Math.pow(value,this.timeScale);
	}
	,summand: function(value) {
		return value * this.timeScale;
	}
	,tickInPause: function() {
		var time = new Date().getTime();
		if(this.lastTime == -1) this.lastTime = time - 100;
		this.frameMs = time - this.lastTime;
		if(Math.isNaN(this.frameMs) || !Math.isFinite(this.frameMs)) this.frameMs = 100;
		this.timeScale = this.frameMs / 1000 * 60;
		if(Math.isNaN(this.timeScale) || !Math.isFinite(this.timeScale)) this.timeScale = 6.;
		this.frameRate = 1000 / this.frameMs;
		this.lastTime = time;
	}
	,tick: function() {
		var time = new Date().getTime();
		this.frame++;
		if(this.lastTime == -1) this.lastTime = time - 100;
		this.frameMs = time - this.lastTime;
		if(Math.isNaN(this.frameMs) || !Math.isFinite(this.frameMs)) this.frameMs = 100;
		this.timeScale += (this.frameMs / 1000 * 60 - this.timeScale) * 0.1;
		if(this.timeScale < 0.25) this.timeScale = 0.25;
		if(this.timeScale > 3) this.timeScale = 3;
		if(Math.isNaN(this.timeScale) || !Math.isFinite(this.timeScale)) this.timeScale = 3.;
		this.ms += this.frameMs;
		this.frameRate = 1000 / this.frameMs;
		this.lastTime = time;
	}
	,reset: function() {
		this.frameRate = 60;
		this.ms = 0;
		this.frameMs = 1000 / 60 | 0;
		this.timeScale = 1;
		this.frame = 0;
		this.lastTime = new Date().getTime();
	}
	,lastTime: null
	,frameRate: null
	,frame: null
	,timeScale: null
	,frameMs: null
	,ms: null
	,__class__: kumite.time.Time
}
kumite.time.TimeController = $hxClasses["kumite.time.TimeController"] = function() {
};
kumite.time.TimeController.__name__ = ["kumite","time","TimeController"];
kumite.time.TimeController.__interfaces__ = [haxe.rtti.Infos];
kumite.time.TimeController.prototype = {
	timerUpdate: function() {
		this.time.tick();
		this.messenger.send(new kumite.time.Tick());
	}
	,startComplete: function() {
		this.time.reset();
		GLAnimationFrame.run($bind(this,this.timerUpdate));
	}
	,messenger: null
	,time: null
	,__class__: kumite.time.TimeController
}
if(!kumite.webgl) kumite.webgl = {}
kumite.webgl.Config = $hxClasses["kumite.webgl.Config"] = function() {
	this.initAction = new kumite.webgl.InitAction();
	this.initAction.antialias = true;
};
kumite.webgl.Config.__name__ = ["kumite","webgl","Config"];
kumite.webgl.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.webgl.Config.prototype = {
	initAction: null
	,__class__: kumite.webgl.Config
}
kumite.webgl.InitAction = $hxClasses["kumite.webgl.InitAction"] = function() {
};
kumite.webgl.InitAction.__name__ = ["kumite","webgl","InitAction"];
kumite.webgl.InitAction.__interfaces__ = [haxe.rtti.Infos];
kumite.webgl.InitAction.prototype = {
	init: function() {
		GL.init(this.canvas.itself,this.antialias);
	}
	,antialias: null
	,canvas: null
	,__class__: kumite.webgl.InitAction
}
var reflect = reflect || {}
reflect.Binding = $hxClasses["reflect.Binding"] = function(instance,fieldName) {
	this.instance = instance;
	this.fieldName = fieldName;
	this.change = new hsl.haxe.DirectSignaler(this);
};
reflect.Binding.__name__ = ["reflect","Binding"];
reflect.Binding.createForInstanceAndName = function(instance,fieldName) {
	return new reflect.Binding(instance,fieldName);
}
reflect.Binding.prototype = {
	watch: function() {
		this.change.dispatch(this,null,{ fileName : "Binding.hx", lineNumber : 38, className : "reflect.Binding", methodName : "watch"});
	}
	,setValue: function(value) {
		this.instance[this.fieldName] = value;
	}
	,getValue: function() {
		return Reflect.field(this.instance,this.fieldName);
	}
	,change: null
	,fieldName: null
	,instance: null
	,__class__: reflect.Binding
}
reflect.ClassInfo = $hxClasses["reflect.ClassInfo"] = function(name,type) {
	this.name = name;
	this.type = type;
	this.hasRtti = type.__rtti != null;
};
reflect.ClassInfo.__name__ = ["reflect","ClassInfo"];
reflect.ClassInfo.forInstance = function(instance) {
	if(instance == null) throw "Missing instance";
	var type = Type.getClass(instance);
	if(type == null) throw "Cannot resolve type for instance: " + Std.string(instance);
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
	throw "Could not resolve CType: " + Std.string(t);
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
	scanFields: function(classDef) {
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
				Log.posInfo = { fileName : "ClassInfo.hx", lineNumber : 190, className : "reflect.ClassInfo", methodName : "scanFields"};
				if(Log.filter(LogLevel.WARN)) {
					Log.fetchInput("Unknown type:",Reflect.field(field,"type"),"in type:",Reflect.field(classDef,"path"),"found in:" + this.name,null,null);
					console.warn(Log.createMessage());
				}
			}
		}
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
	,initFields: function() {
		this.properties = new Array();
		this.methods = new Array();
		this.scanClass(this.type);
	}
	,getMethods: function() {
		if(this.methods != null) return this.methods;
		this.initFields();
		return this.methods;
	}
	,getProperties: function() {
		if(this.properties != null) return this.properties;
		this.initFields();
		return this.properties;
	}
	,getShortName: function() {
		return HxOverrides.substr(this.name,this.name.lastIndexOf(".") + 1,null);
	}
	,toString: function() {
		return "[ClassInfo for class: " + this.name + "]";
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
	,getProperty: function(name) {
		var _g = 0, _g1 = this.getProperties();
		while(_g < _g1.length) {
			var property = _g1[_g];
			++_g;
			if(property.field.name == name) return property;
		}
		return null;
	}
	,methods: null
	,properties: null
	,hasRtti: null
	,shortName: null
	,name: null
	,type: null
	,__class__: reflect.ClassInfo
	,__properties__: {get_shortName:"getShortName",get_properties:"getProperties",get_methods:"getMethods"}
}
reflect.MetadataAware = $hxClasses["reflect.MetadataAware"] = function() { }
reflect.MetadataAware.__name__ = ["reflect","MetadataAware"];
reflect.MetadataAware.prototype = {
	hasMetadata: null
	,__class__: reflect.MetadataAware
}
reflect.Field = $hxClasses["reflect.Field"] = function(field,definedInClass,owner) {
	this.field = field;
	this.definedInClass = definedInClass;
	this.owner = owner;
};
reflect.Field.__name__ = ["reflect","Field"];
reflect.Field.__interfaces__ = [reflect.MetadataAware];
reflect.Field.prototype = {
	getClass: function() {
		var type = reflect.ClassInfo.forCType(this.field.type);
		return type == null?null:type.type;
	}
	,getType: function() {
		return reflect.ClassInfo.forCType(this.field.type);
	}
	,getName: function() {
		return this.field.name;
	}
	,getOwner: function() {
		return this.owner;
	}
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
	,definedInClass: null
	,field: null
	,clazz: null
	,type: null
	,name: null
	,owner: null
	,__class__: reflect.Field
	,__properties__: {get_owner:"getOwner",get_name:"getName",get_type:"getType",get_clazz:"getClass"}
}
reflect.Method = $hxClasses["reflect.Method"] = function(field,args,ret,definedInClass,owner) {
	reflect.Field.call(this,field,definedInClass,owner);
	this.args = args;
	this.ret = ret;
};
reflect.Method.__name__ = ["reflect","Method"];
reflect.Method.__super__ = reflect.Field;
reflect.Method.prototype = $extend(reflect.Field.prototype,{
	call: function(instance,params) {
		Reflect.field(instance,this.field.name).apply(instance,params);
	}
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
	,ret: null
	,args: null
	,parameters: null
	,__class__: reflect.Method
	,__properties__: $extend(reflect.Field.prototype.__properties__,{get_parameters:"getParameters"})
});
reflect.Parameter = $hxClasses["reflect.Parameter"] = function(def) {
	this.def = def;
};
reflect.Parameter.__name__ = ["reflect","Parameter"];
reflect.Parameter.prototype = {
	getType: function() {
		return reflect.ClassInfo.forCType(this.def.t);
	}
	,def: null
	,type: null
	,__class__: reflect.Parameter
	,__properties__: {get_type:"getType"}
}
reflect.Property = $hxClasses["reflect.Property"] = function(field,definedInClass,owner) {
	reflect.Field.call(this,field,definedInClass,owner);
};
reflect.Property.__name__ = ["reflect","Property"];
reflect.Property.__super__ = reflect.Field;
reflect.Property.prototype = $extend(reflect.Field.prototype,{
	setValue: function(instance,value) {
		instance[this.field.name] = value;
	}
	,getValue: function(instance) {
		return Reflect.field(instance,this.field.name);
	}
	,__class__: reflect.Property
});
var shader = shader || {}
shader.DisplayObjectFragment = $hxClasses["shader.DisplayObjectFragment"] = function() { }
shader.DisplayObjectFragment.__name__ = ["shader","DisplayObjectFragment"];
shader.DisplayObjectVertex = $hxClasses["shader.DisplayObjectVertex"] = function() { }
shader.DisplayObjectVertex.__name__ = ["shader","DisplayObjectVertex"];
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
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
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.Prolog = "prolog";
Xml.Document = "document";
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
js.XMLHttpRequest = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	} catch( e ) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch( e1 ) {
			throw "Unable to create XMLHttpRequest object.";
		}
	}
}:(function($this) {
	var $r;
	throw "Unable to create XMLHttpRequest object.";
	return $r;
}(this));
Color.__rtti = "<class path=\"Color\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<r public=\"1\"><c path=\"Float\"/></r>\n\t<g public=\"1\"><c path=\"Float\"/></g>\n\t<b public=\"1\"><c path=\"Float\"/></b>\n\t<a public=\"1\"><c path=\"Float\"/></a>\n\t<fromHex public=\"1\" set=\"method\" line=\"18\"><f a=\"hex\">\n\t<c path=\"Int\"/>\n\t<c path=\"Color\"/>\n</f></fromHex>\n\t<scaleRGB public=\"1\" set=\"method\" line=\"28\"><f a=\"factor\">\n\t<c path=\"Float\"/>\n\t<e path=\"Void\"/>\n</f></scaleRGB>\n\t<mixFrom public=\"1\" set=\"method\" line=\"35\"><f a=\"color1:color2:color1Mix\">\n\t<c path=\"Color\"/>\n\t<c path=\"Color\"/>\n\t<c path=\"Float\"/>\n\t<e path=\"Void\"/>\n</f></mixFrom>\n\t<toContextRGB public=\"1\" set=\"method\" line=\"50\"><f a=\"\"><c path=\"String\"/></f></toContextRGB>\n\t<toContextRGBA public=\"1\" set=\"method\" line=\"55\"><f a=\"\"><c path=\"String\"/></f></toContextRGBA>\n\t<clone public=\"1\" set=\"method\" line=\"60\"><f a=\"\"><c path=\"Color\"/></f></clone>\n\t<toString public=\"1\" set=\"method\" line=\"65\"><f a=\"\"><c path=\"String\"/></f></toString>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"?r:?g:?b:?a\">\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<e path=\"Void\"/>\n</f></new>\n</class>";
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
GLCursorClient.DEFAULT = "default";
GLCursorClient.HAND = "pointer";
GLTextureConfig.FRAMEBUFFER_ID = 0;
GLTextureAtlasConfig.instanceCount = 0;
Log.filters = new Array();
Log.args = new Array();
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
js.Lib.onerror = null;
bpmjs.FrameTimer.init = (function($this) {
	var $r;
	var ms = 0.0;
	$r = GLAnimationFrame.run(bpmjs.FrameTimer.frameTimerLoop,ms);
	return $r;
}(this));
bpmjs.FrameTimer.listeners = new Array();
bpmjs.FrameTimer.listeners2 = new Array();
bpmjs.Sequencer.__meta__ = { fields : { context : { Inject : null}}};
bpmjs.Sequencer.__rtti = "<class path=\"bpmjs.Sequencer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<context public=\"1\">\n\t\t<c path=\"bpmjs.Context\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</context>\n\t<start public=\"1\" set=\"method\" line=\"14\"><f a=\"name\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></start>\n\t<new public=\"1\" set=\"method\" line=\"12\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs.Stats.fps = 0;
hsl.haxe._DirectSignaler.PropagationStatus.IMMEDIATELY_STOPPED = 1;
hsl.haxe._DirectSignaler.PropagationStatus.STOPPED = 2;
hsl.haxe._DirectSignaler.PropagationStatus.UNDISTURBED = 3;
kumite.blobs.BlobReaderFusionWS.__meta__ = { fields : { start : { Sequence : ["boot","finish"]}, time : { Inject : null}, blobs : { Inject : null}}};
kumite.blobs.BlobReaderFusionWS.__rtti = "<class path=\"kumite.blobs.BlobReaderFusionWS\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<BLOB_ID public=\"1\" line=\"11\" static=\"1\"><c path=\"Int\"/></BLOB_ID>\n\t<blobs public=\"1\">\n\t\t<c path=\"kumite.blobs.Blobs\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</blobs>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<lastParse><c path=\"Float\"/></lastParse>\n\t<config><t path=\"kumite.fusion.FusionConfig\"/></config>\n\t<fusion><c path=\"kumite.fusion.FusionConnection\"/></fusion>\n\t<start public=\"1\" set=\"method\" line=\"31\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>finish</e>\n</m></meta>\n\t</start>\n\t<run set=\"method\" line=\"56\"><f a=\"\"><e path=\"Void\"/></f></run>\n\t<handleFusionData set=\"method\" line=\"61\"><f a=\"data\">\n\t<c path=\"ArrayBuffer\"/>\n\t<e path=\"Void\"/>\n</f></handleFusionData>\n\t<onData set=\"method\" line=\"85\"><f a=\"r\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></onData>\n\t<mergeBlobs set=\"method\" line=\"117\"><f a=\"newBlobs\">\n\t<c path=\"Array\"><c path=\"kumite.blobs.Blob\"/></c>\n\t<e path=\"Void\"/>\n</f></mergeBlobs>\n\t<getDist set=\"method\" line=\"156\"><f a=\"newBlob:oldBlob\">\n\t<c path=\"kumite.blobs.Blob\"/>\n\t<c path=\"kumite.blobs.Blob\"/>\n\t<c path=\"Float\"/>\n</f></getDist>\n\t<new public=\"1\" set=\"method\" line=\"24\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.blobs.BlobReaderFusionWS.BLOB_ID = 0;
kumite.blobs.BlobReaderHTTP.__meta__ = { fields : { start : { Sequence : ["boot","finish"]}, blobs : { Inject : null}}};
kumite.blobs.BlobReaderHTTP.__rtti = "<class path=\"kumite.blobs.BlobReaderHTTP\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<blobs public=\"1\">\n\t\t<c path=\"kumite.blobs.Blobs\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</blobs>\n\t<start public=\"1\" set=\"method\" line=\"13\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>finish</e>\n</m></meta>\n\t</start>\n\t<readBlobs set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></readBlobs>\n\t<onData set=\"method\" line=\"26\"><f a=\"r\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></onData>\n\t<onError set=\"method\" line=\"53\"><f a=\"r\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></onError>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.blobs.BlobReaderMouse.__meta__ = { fields : { tick : { Message : null}, init : { Sequence : ["boot","finish"]}, time : { Inject : null}, blobs : { Inject : null}}};
kumite.blobs.BlobReaderMouse.__rtti = "<class path=\"kumite.blobs.BlobReaderMouse\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<blobs public=\"1\">\n\t\t<c path=\"kumite.blobs.Blobs\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</blobs>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<mouse><c path=\"Vec2\"/></mouse>\n\t<init public=\"1\" set=\"method\" line=\"23\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>finish</e>\n</m></meta>\n\t</init>\n\t<tick public=\"1\" set=\"method\" line=\"29\">\n\t\t<f a=\"tick\">\n\t\t\t<c path=\"kumite.time.Tick\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<meta><m n=\"Message\"/></meta>\n\t</tick>\n\t<mouseMove set=\"method\" line=\"43\"><f a=\"position\">\n\t<c path=\"Vec2\"/>\n\t<e path=\"Void\"/>\n</f></mouseMove>\n\t<new public=\"1\" set=\"method\" line=\"17\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.blobs.BlobReaderWS.__meta__ = { fields : { start : { Sequence : ["boot","finish"]}, time : { Inject : null}, blobs : { Inject : null}}};
kumite.blobs.BlobReaderWS.__rtti = "<class path=\"kumite.blobs.BlobReaderWS\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<BLOB_ID public=\"1\" line=\"8\" static=\"1\"><c path=\"Int\"/></BLOB_ID>\n\t<blobs public=\"1\">\n\t\t<c path=\"kumite.blobs.Blobs\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</blobs>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<host><c path=\"String\"/></host>\n\t<socket><c path=\"WebSocket\"/></socket>\n\t<lastParse><c path=\"Float\"/></lastParse>\n\t<start public=\"1\" set=\"method\" line=\"27\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>finish</e>\n</m></meta>\n\t</start>\n\t<handleOpen set=\"method\" line=\"35\"><f a=\"event\">\n\t<unknown/>\n\t<e path=\"Void\"/>\n</f></handleOpen>\n\t<handleMessage set=\"method\" line=\"40\"><f a=\"event\">\n\t<a><data set=\"null\"><c path=\"String\"/></data></a>\n\t<e path=\"Void\"/>\n</f></handleMessage>\n\t<handleClose set=\"method\" line=\"45\"><f a=\"event\">\n\t<unknown/>\n\t<e path=\"Void\"/>\n</f></handleClose>\n\t<onData set=\"method\" line=\"51\"><f a=\"r\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></onData>\n\t<mergeBlobs set=\"method\" line=\"83\"><f a=\"newBlobs\">\n\t<c path=\"Array\"><c path=\"kumite.blobs.Blob\"/></c>\n\t<e path=\"Void\"/>\n</f></mergeBlobs>\n\t<getDist set=\"method\" line=\"122\"><f a=\"newBlob:oldBlob\">\n\t<c path=\"kumite.blobs.Blob\"/>\n\t<c path=\"kumite.blobs.Blob\"/>\n\t<c path=\"Float\"/>\n</f></getDist>\n\t<new public=\"1\" set=\"method\" line=\"20\"><f a=\"host\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></new>\n</class>";
kumite.blobs.BlobReaderWS.BLOB_ID = 0;
kumite.blobs.Config.__rtti = "<class path=\"kumite.blobs.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<blobs public=\"1\"><c path=\"kumite.blobs.Blobs\"/></blobs>\n\t<blobReaderHTTP public=\"1\"><c path=\"kumite.blobs.BlobReaderHTTP\"/></blobReaderHTTP>\n\t<blobReaderWS public=\"1\"><c path=\"kumite.blobs.BlobReaderWS\"/></blobReaderWS>\n\t<blobReaderMouse public=\"1\"><c path=\"kumite.blobs.BlobReaderMouse\"/></blobReaderMouse>\n\t<blobReaderFusion public=\"1\"><c path=\"kumite.blobs.BlobReaderFusionWS\"/></blobReaderFusion>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.camera.CameraMouseMover.__meta__ = { fields : { init : { Sequence : ["boot","init"]}, camera : { Inject : null}}};
kumite.camera.CameraMouseMover.__rtti = "<class path=\"kumite.camera.CameraMouseMover\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<camera public=\"1\">\n\t\t<c path=\"kumite.camera.Camera\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</camera>\n\t<init public=\"1\" set=\"method\" line=\"12\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>init</e>\n</m></meta>\n\t</init>\n\t<updateCamera set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></updateCamera>\n\t<new public=\"1\" set=\"method\" line=\"9\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.camera.Config.__rtti = "<class path=\"kumite.camera.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<camera public=\"1\"><c path=\"kumite.camera.Camera\"/></camera>\n\t<cameraMouseMover public=\"1\"><c path=\"kumite.camera.CameraMouseMover\"/></cameraMouseMover>\n\t<new public=\"1\" set=\"method\" line=\"9\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.canvas.CanvasController.__meta__ = { fields : { updateCanvasSizeFromStage : { Message : null}, init : { Sequence : ["boot","init"]}, initPrepare : { Sequence : ["boot","initPrepare"]}, stage : { Inject : null}, canvas : { Inject : null}}};
kumite.canvas.CanvasController.__rtti = "<class path=\"kumite.canvas.CanvasController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<canvas public=\"1\">\n\t\t<c path=\"kumite.canvas.CanvasCase\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</canvas>\n\t<stage public=\"1\">\n\t\t<c path=\"kumite.stage.Stage\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</stage>\n\t<initPrepare public=\"1\" set=\"method\" line=\"21\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>initPrepare</e>\n</m></meta>\n\t</initPrepare>\n\t<init public=\"1\" set=\"method\" line=\"27\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>init</e>\n</m></meta>\n\t</init>\n\t<updateCanvasSizeFromStage public=\"1\" set=\"method\" line=\"33\">\n\t\t<f a=\"?message\">\n\t\t\t<c path=\"kumite.stage.StageResizeMessage\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<meta><m n=\"Message\"/></meta>\n\t</updateCanvasSizeFromStage>\n\t<new public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.canvas.Config.__rtti = "<class path=\"kumite.canvas.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<canvasCase public=\"1\"><c path=\"kumite.canvas.CanvasCase\"/></canvasCase>\n\t<canvasController public=\"1\"><c path=\"kumite.canvas.CanvasController\"/></canvasController>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.displaylist.ConfigAsLayer.__rtti = "<class path=\"kumite.displaylist.ConfigAsLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<displayListLayer public=\"1\"><c path=\"kumite.displaylist.DisplayListLayer\"/></displayListLayer>\n\t<stage public=\"1\"><c path=\"GLStage\"/></stage>\n\t<new public=\"1\" set=\"method\" line=\"9\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.displaylist.DisplayListLayer.__rtti = "<class path=\"kumite.displaylist.DisplayListLayer\" params=\"\">\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<transition public=\"1\"><c path=\"Float\"/></transition>\n\t<renderer><c path=\"GLDisplayListRenderer\"/></renderer>\n\t<init public=\"1\" set=\"method\" line=\"21\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"27\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"33\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<new public=\"1\" set=\"method\" line=\"19\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.eyes.Config.__meta__ = { fields : { complete : { Complete : null}, startPrepare : { Sequence : ["boot","startPrepare"]}, displayListLayer : { Inject : null}, textureRegistry : { Inject : null}}};
kumite.eyes.Config.__rtti = "<class path=\"kumite.eyes.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<EYE public=\"1\" line=\"27\" static=\"1\"><c path=\"GLTextureConfig\"/></EYE>\n\t<SHADOW public=\"1\" line=\"28\" static=\"1\"><c path=\"GLTextureConfig\"/></SHADOW>\n\t<REFLECTION public=\"1\" line=\"29\" static=\"1\"><c path=\"GLTextureConfig\"/></REFLECTION>\n\t<textureRegistry public=\"1\">\n\t\t<c path=\"GLTextureRegistry\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</textureRegistry>\n\t<displayListLayer public=\"1\">\n\t\t<c path=\"kumite.displaylist.DisplayListLayer\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</displayListLayer>\n\t<clearLayer public=\"1\"><c path=\"kumite.layer.ClearLayer\"/></clearLayer>\n\t<eyeLayers public=\"1\"><c path=\"Array\"><c path=\"kumite.layer.TextureHSLLayer\"/></c></eyeLayers>\n\t<shadowLayer public=\"1\"><c path=\"kumite.layer.TextureLayer\"/></shadowLayer>\n\t<reflectionLayer public=\"1\"><c path=\"kumite.layer.TextureLayer\"/></reflectionLayer>\n\t<framebuffer1EnableLayer public=\"1\"><c path=\"kumite.layer.FramebufferEnableLayer\"/></framebuffer1EnableLayer>\n\t<framebuffer1DisableLayer public=\"1\"><c path=\"kumite.layer.FramebufferDisableLayer\"/></framebuffer1DisableLayer>\n\t<framebufferPostproEnableLayer public=\"1\"><c path=\"kumite.layer.FramebufferEnableLayer\"/></framebufferPostproEnableLayer>\n\t<framebufferPostproDisableLayer public=\"1\"><c path=\"kumite.layer.FramebufferDisableLayer\"/></framebufferPostproDisableLayer>\n\t<postproFilters public=\"1\"><c path=\"Array\"><c path=\"kumite.eyes.EyePostproFilter\"/></c></postproFilters>\n\t<framebuffer2EnableLayer public=\"1\"><c path=\"kumite.layer.FramebufferEnableLayer\"/></framebuffer2EnableLayer>\n\t<framebuffer2DisableLayer public=\"1\"><c path=\"kumite.layer.FramebufferDisableLayer\"/></framebuffer2DisableLayer>\n\t<eyeMaskLayers public=\"1\"><c path=\"Array\"><c path=\"kumite.eyes.EyeMaskLayer\"/></c></eyeMaskLayers>\n\t<eyeEffects public=\"1\"><c path=\"Array\"><c path=\"kumite.layer.effect.EyeEffect\"/></c></eyeEffects>\n\t<eyeBlocks public=\"1\"><c path=\"Array\"><c path=\"kumite.eyes.EyeBlock\"/></c></eyeBlocks>\n\t<scene1 public=\"1\"><c path=\"kumite.scene.DefaultScene\"/></scene1>\n\t<eyesDisplay public=\"1\"><c path=\"kumite.eyes.EyesDisplay\"/></eyesDisplay>\n\t<startPrepare public=\"1\" set=\"method\" line=\"200\">\n\t\t<f a=\"\"><c path=\"bpmjs.SequencerTaskGroup\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>startPrepare</e>\n</m></meta>\n\t</startPrepare>\n\t<complete public=\"1\" set=\"method\" line=\"212\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Complete\"/></meta>\n\t</complete>\n\t<createBlock set=\"method\" line=\"239\"><f a=\"x:y:scale\">\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n\t<e path=\"Void\"/>\n</f></createBlock>\n\t<new public=\"1\" set=\"method\" line=\"61\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.eyes.Config.EYE = GLTextureConfig.create("data/image/eyes/EyesBG.png",9729);
kumite.eyes.Config.SHADOW = GLTextureConfig.create("data/image/eyes/EyesShadow.png",9729);
kumite.eyes.Config.REFLECTION = GLTextureConfig.create("data/image/eyes/Reflection.png",9729);
kumite.eyes.EyeMaskLayer.__meta__ = { fields : { textureConfig : { Param : null}, position : { Param : null}, scale : { Param : null}, textureRegistry : { Inject : null}, time : { Inject : null}}};
kumite.eyes.EyeMaskLayer.__rtti = "<class path=\"kumite.eyes.EyeMaskLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<STATE_IDLE line=\"46\" static=\"1\"><c path=\"String\"/></STATE_IDLE>\n\t<STATE_OPENING line=\"47\" static=\"1\"><c path=\"String\"/></STATE_OPENING>\n\t<STATE_CLOSING line=\"48\" static=\"1\"><c path=\"String\"/></STATE_CLOSING>\n\t<OPENING_SPEED line=\"50\" static=\"1\"><c path=\"Float\"/></OPENING_SPEED>\n\t<CLOSING_SPEED line=\"51\" static=\"1\"><c path=\"Float\"/></CLOSING_SPEED>\n\t<CLOSING_CHANCE line=\"52\" static=\"1\"><c path=\"Float\"/></CLOSING_CHANCE>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<textureRegistry public=\"1\">\n\t\t<c path=\"GLTextureRegistry\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</textureRegistry>\n\t<scale public=\"1\">\n\t\t<c path=\"Float\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</scale>\n\t<position public=\"1\">\n\t\t<c path=\"Vec3\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</position>\n\t<textureConfig public=\"1\">\n\t\t<c path=\"GLTextureConfig\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</textureConfig>\n\t<blend public=\"1\"><e path=\"Bool\"/></blend>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<worldViewMatrixUniform><c path=\"GLUniformLocation\"/></worldViewMatrixUniform>\n\t<textureUniform><c path=\"GLUniformLocation\"/></textureUniform>\n\t<colorcube0Uniform><c path=\"GLUniformLocation\"/></colorcube0Uniform>\n\t<colorcube1Uniform><c path=\"GLUniformLocation\"/></colorcube1Uniform>\n\t<shutUniform><c path=\"GLUniformLocation\"/></shutUniform>\n\t<state><c path=\"String\"/></state>\n\t<shut><c path=\"Float\"/></shut>\n\t<init public=\"1\" set=\"method\" line=\"65\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"85\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"90\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<iterate set=\"method\" line=\"130\"><f a=\"\"><e path=\"Void\"/></f></iterate>\n\t<new public=\"1\" set=\"method\" line=\"57\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.eyes.EyeMaskLayer.STATE_IDLE = "STATE_IDLE";
kumite.eyes.EyeMaskLayer.STATE_OPENING = "STATE_OPENING";
kumite.eyes.EyeMaskLayer.STATE_CLOSING = "STATE_CLOSING";
kumite.eyes.EyeMaskLayer.OPENING_SPEED = 0.2;
kumite.eyes.EyeMaskLayer.CLOSING_SPEED = 0.1;
kumite.eyes.EyeMaskLayer.CLOSING_CHANCE = 0.0001;
kumite.eyes._EyeMaskLayer.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 worldViewMatrix;\n\n\tvarying vec4 vertex;\n\tvarying vec2 textureCoord;\n\tvarying vec2 tc;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);\n\t\tvertex = vec4(vertexPosition, 0.0, 1.0);\n\t\ttextureCoord = vertexPosition.xy;\n\t\ttc = vertexPosition;\n\t}\n\n"]}};
kumite.eyes._EyeMaskLayer.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform sampler2D texture;\n\n\tuniform float shut;\n\n\tvarying vec2 tc;\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tfloat zoom = 4.0;\n\t\tvec2 p = (-1.0 + 2.0 * tc) * 0.5;\n\t\tfloat r = dot(p,p) * zoom;\n\n\t\tfloat v = shut;\n\n\t\tfloat zoom2 = 4.0 - v * 3.0;\n\n\t\tvec2 pTop = -0.5 + vec2(tc.x, tc.y + v);\n\t\tfloat rTop = dot(pTop,pTop) * zoom2;\n\n\t\tvec2 pBottom = -0.5 + vec2(tc.x, tc.y - v);\n\t\tfloat rBottom = dot(pBottom,pBottom) * zoom2;\n\n\t\tif (rTop > 1.0)\n\t\t\tdiscard;\n\n\t\tif (rBottom > 1.0)\n\t\t\tdiscard;\n\n\t\tif (r > 1.0)\n\t\t\tdiscard;\n\n\t\tvec4 color = texture2D(texture, vec2(textureCoord.x, 1.0 - textureCoord.y));\n\t\tgl_FragColor = color;\n\t}\n\n"]}};
kumite.eyes.EyePostproFilter.__meta__ = { fields : { eyePosition : { Param : null}, textureConfig : { Param : null}, time : { Inject : null}, textureRegistry : { Inject : null}}};
kumite.eyes.EyePostproFilter.__rtti = "<class path=\"kumite.eyes.EyePostproFilter\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<textureRegistry public=\"1\">\n\t\t<c path=\"GLTextureRegistry\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</textureRegistry>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<textureConfig public=\"1\">\n\t\t<c path=\"GLTextureConfig\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</textureConfig>\n\t<eyePosition public=\"1\">\n\t\t<c path=\"Vec2\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</eyePosition>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<textureUniform><c path=\"GLUniformLocation\"/></textureUniform>\n\t<resolutionUniform><c path=\"GLUniformLocation\"/></resolutionUniform>\n\t<timeUniform><c path=\"GLUniformLocation\"/></timeUniform>\n\t<amountUniform><c path=\"GLUniformLocation\"/></amountUniform>\n\t<init public=\"1\" set=\"method\" line=\"39\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"58\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"63\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<new public=\"1\" set=\"method\" line=\"34\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.eyes._EyePostproFilter.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = vec4(vertexPosition.x, vertexPosition.y, 0.0, 1.0);\n\t}\n\n"]}};
kumite.eyes._EyePostproFilter.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\tprecision highp float;\n\t#endif\n\t\n\tuniform vec2 resolution;\n\tuniform float time;\n\tuniform float amount;\n\tuniform sampler2D texture;\n\t\n\tvoid main(void)\n\t{\n\t    vec2 q = gl_FragCoord.xy / resolution;\n\t\tq.y = 1.0-q.y;\n\t    vec3 oricol = texture2D(texture, vec2(q.x,1.0 - q.y)).xyz;\n\n\t\tif (amount >= 1.0)\n\t\t{\n\t\t\tgl_FragColor = vec4(oricol, 1.0);\n\t\t}\n\t\telse\n\t\t{\n\t\t\tvec2 uv = q;\n\t\n\t\t    vec3 col;\n\t\n\t\t\tfloat camount = pow(clamp(amount, 0.0, 1.0), 0.5);\n\t\n\t\t\t//aberation\n\t\t\tfloat cax = 30.0 + camount * 5.0;\n\t\t\tfloat cay = -cax;\n\t\t    col.r = texture2D(texture,vec2(uv.x+cax / resolution.x,-uv.y)).x;\n\t\t    col.g = texture2D(texture,vec2(uv.x+0.000,-uv.y)).y;\n\t\t    col.b = texture2D(texture,vec2(uv.x+cay / resolution.x,-uv.y)).z;\n\t\t\n\t\t    col = clamp(col*0.5+0.5*col*col*1.2,0.0,1.0);\n\t\t\n\t\t\t//vignette\n\t\t    col *= 0.3 + 0.7*16.0*uv.x*uv.y*(1.0-uv.x)*(1.0-uv.y);\n\t\t\n\t\t\t//color\n\t\t    //col *= vec3(0.8,1.0,0.7);\n\t\t\n\t\t\t//v lines\n\t\t    col *= (1.0 - camount * 0.5)+(0.3 + camount * 0.5)*sin(0.01*time+gl_FragCoord.y*2.5);\n\t\t\n\t\t\t//flicker\n\t\t    col *= 0.97+0.03*sin(0.11*time);\n\t\t\n\t\t    gl_FragColor = vec4(mix(col, oricol, camount), 1.0);\n\t\t}\n\t}\n\n"]}};
kumite.eyes.EyesDisplay.__meta__ = { fields : { start : { Sequence : ["boot","startComplete"]}}};
kumite.eyes.EyesDisplay.__rtti = "<class path=\"kumite.eyes.EyesDisplay\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<start public=\"1\" set=\"method\" line=\"19\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>startComplete</e>\n</m></meta>\n\t</start>\n\t<new public=\"1\" set=\"method\" line=\"16\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.fusion.FusionConnection.STATE_DISCONNECTED = "STATE_DISCONNECTED";
kumite.fusion.FusionConnection.STATE_CONNECTING = "STATE_CONNECTING";
kumite.fusion.FusionConnection.STATE_WAIT_CONFIG_ACCEPT = "STATE_WAIT_CONFIG_ACCEPT";
kumite.fusion.FusionConnection.STATE_WAIT_GET = "STATE_WAIT_GET";
kumite.fusion.FusionConnection.STATE_IDLE = "STATE_IDLE";
kumite.fusion.FusionConnection.STATE_PRE_INIT = "STATE_PRE_INIT";
kumite.fusion.FusionConnection.host = "ws://192.168.1.22:12010";
kumite.launch.Config.__rtti = "<class path=\"kumite.launch.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<sequencer public=\"1\"><c path=\"bpmjs.Sequencer\"/></sequencer>\n\t<launcher public=\"1\"><c path=\"kumite.launch.Launcher\"/></launcher>\n\t<preloadDisplay public=\"1\"><c path=\"kumite.launch.PreloadDisplay\"/></preloadDisplay>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.launch.Launcher.__meta__ = { fields : { handleFinish : { Sequence : ["boot","finish"]}, showError : { Sequence : ["boot","error"]}, handlePostComplete : { PostComplete : null}, sequencer : { Inject : null}}};
kumite.launch.Launcher.__rtti = "<class path=\"kumite.launch.Launcher\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<sequencer public=\"1\">\n\t\t<c path=\"bpmjs.Sequencer\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</sequencer>\n\t<handlePostComplete public=\"1\" set=\"method\" line=\"17\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"PostComplete\"/></meta>\n\t</handlePostComplete>\n\t<showError public=\"1\" set=\"method\" line=\"24\">\n\t\t<f a=\"message\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>error</e>\n</m></meta>\n\t</showError>\n\t<handleFinish public=\"1\" set=\"method\" line=\"30\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>finish</e>\n</m></meta>\n\t</handleFinish>\n\t<new public=\"1\" set=\"method\" line=\"14\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.launch.PreloadDisplay.__meta__ = { fields : { bootStartComplete : { Sequence : ["boot","startComplete"]}, bootMonitor : { Sequence : ["boot","monitor"]}, complete : { Complete : null}}};
kumite.launch.PreloadDisplay.__rtti = "<class path=\"kumite.launch.PreloadDisplay\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<preloaderDiv><t path=\"js.HtmlDom\"/></preloaderDiv>\n\t<complete public=\"1\" set=\"method\" line=\"16\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Complete\"/></meta>\n\t</complete>\n\t<bootMonitor public=\"1\" set=\"method\" line=\"24\">\n\t\t<f a=\"monitor\">\n\t\t\t<c path=\"bpmjs.ProgressMonitor\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>monitor</e>\n</m></meta>\n\t</bootMonitor>\n\t<bootStartComplete public=\"1\" set=\"method\" line=\"46\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>startComplete</e>\n</m></meta>\n\t</bootStartComplete>\n\t<removePreloader set=\"method\" line=\"53\"><f a=\"\"><e path=\"Void\"/></f></removePreloader>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer.ClearLayer.__meta__ = { fields : { color : { Param : null}}};
kumite.layer.ClearLayer.__rtti = "<class path=\"kumite.layer.ClearLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<color public=\"1\">\n\t\t<c path=\"Color\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</color>\n\t<init public=\"1\" set=\"method\" line=\"19\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"23\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"28\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<new public=\"1\" set=\"method\" line=\"14\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer.ColorLayer.__meta__ = { fields : { color : { Param : null}, time : { Inject : null}}};
kumite.layer.ColorLayer.__rtti = "<class path=\"kumite.layer.ColorLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<transitions public=\"1\"><c path=\"kumite.layer.LayerTransitions\"/></transitions>\n\t<cutTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></cutTransition>\n\t<moveTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></moveTransition>\n\t<alphaTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></alphaTransition>\n\t<color public=\"1\">\n\t\t<c path=\"Color\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</color>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<worldViewMatrixUniform><c path=\"GLUniformLocation\"/></worldViewMatrixUniform>\n\t<colorUniform><c path=\"GLUniformLocation\"/></colorUniform>\n\t<init public=\"1\" set=\"method\" line=\"45\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"62\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"68\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<new public=\"1\" set=\"method\" line=\"35\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer._ColorLayer.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 worldViewMatrix;\n\n\tvarying vec4 vertex;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);\n\t\tvertex = vec4(vertexPosition, 0.0, 1.0);\n\t}\n\n"]}};
kumite.layer._ColorLayer.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform vec4 color;\n\n\tvoid main(void)\n\t{\n\t\tgl_FragColor = color;\n\t}\n\n"]}};
kumite.layer.FramebufferDisableLayer.__rtti = "<class path=\"kumite.layer.FramebufferDisableLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<init public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"15\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"20\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<new public=\"1\" set=\"method\" line=\"11\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer.FramebufferEnableLayer.__meta__ = { fields : { textureRegistry : { Inject : null}}};
kumite.layer.FramebufferEnableLayer.__rtti = "<class path=\"kumite.layer.FramebufferEnableLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<textureRegistry public=\"1\">\n\t\t<c path=\"GLTextureRegistry\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</textureRegistry>\n\t<framebuffer public=\"1\"><c path=\"GLFramebuffer\"/></framebuffer>\n\t<textureConfig public=\"1\"><c path=\"GLTextureConfig\"/></textureConfig>\n\t<init public=\"1\" set=\"method\" line=\"26\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"46\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"51\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<new public=\"1\" set=\"method\" line=\"18\"><f a=\"width:height\">\n\t<c path=\"Int\"/>\n\t<c path=\"Int\"/>\n\t<e path=\"Void\"/>\n</f></new>\n</class>";
kumite.layer.LayerId.CLEAR = "CLEAR";
kumite.layer.TestLayer.__meta__ = { fields : { position : { Param : null}, scale : { Param : [-100,100,0.1]}, color : { Param : null}, camera : { Inject : null}, time : { Inject : null}}};
kumite.layer.TestLayer.__rtti = "<class path=\"kumite.layer.TestLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<camera public=\"1\">\n\t\t<c path=\"kumite.camera.Camera\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</camera>\n\t<transitions public=\"1\"><c path=\"kumite.layer.LayerTransitions\"/></transitions>\n\t<alphaTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></alphaTransition>\n\t<color public=\"1\">\n\t\t<c path=\"Color\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</color>\n\t<scale public=\"1\">\n\t\t<c path=\"Float\"/>\n\t\t<meta><m n=\"Param\">\n\t<e>-100</e>\n\t<e>100</e>\n\t<e>0.1</e>\n</m></meta>\n\t</scale>\n\t<position public=\"1\">\n\t\t<c path=\"Vec3\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</position>\n\t<projectionMatrix><c path=\"Matrix4\"/></projectionMatrix>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<worldViewMatrixUniform><c path=\"GLUniformLocation\"/></worldViewMatrixUniform>\n\t<colorUniform><c path=\"GLUniformLocation\"/></colorUniform>\n\t<init public=\"1\" set=\"method\" line=\"57\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"74\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"80\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<new public=\"1\" set=\"method\" line=\"43\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer._TestLayer.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 worldViewMatrix;\n\n\tvarying vec4 vertex;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);\n\t\tvertex = vec4(vertexPosition, 0.0, 1.0);\n\t}\n\n"]}};
kumite.layer._TestLayer.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform vec4 color;\n\n\tvoid main(void)\n\t{\n\t\tgl_FragColor = color;\n\t}\n\n"]}};
kumite.layer.Texture3DLayer.__meta__ = { fields : { textureConfig : { Param : null}, position : { Param : null}, scale : { Param : null}, textureRegistry : { Inject : null}, time : { Inject : null}}};
kumite.layer.Texture3DLayer.__rtti = "<class path=\"kumite.layer.Texture3DLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<textureRegistry public=\"1\">\n\t\t<c path=\"GLTextureRegistry\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</textureRegistry>\n\t<transitions public=\"1\"><c path=\"kumite.layer.LayerTransitions\"/></transitions>\n\t<cutTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></cutTransition>\n\t<moveTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></moveTransition>\n\t<alphaTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></alphaTransition>\n\t<scale public=\"1\">\n\t\t<c path=\"Float\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</scale>\n\t<position public=\"1\">\n\t\t<c path=\"Vec3\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</position>\n\t<textureConfig public=\"1\">\n\t\t<c path=\"GLTextureConfig\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</textureConfig>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<worldViewMatrixUniform><c path=\"GLUniformLocation\"/></worldViewMatrixUniform>\n\t<textureUniform><c path=\"GLUniformLocation\"/></textureUniform>\n\t<alphaUniform><c path=\"GLUniformLocation\"/></alphaUniform>\n\t<init public=\"1\" set=\"method\" line=\"58\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"76\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"82\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<new public=\"1\" set=\"method\" line=\"47\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer._Texture3DLayer.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 worldViewMatrix;\n\n\tvarying vec4 vertex;\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);\n\t\tvertex = vec4(vertexPosition, 0.0, 1.0);\n\t\ttextureCoord = vertexPosition.xy;\n\t}\n\n"]}};
kumite.layer._Texture3DLayer.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform sampler2D texture;\n\tuniform float alpha;\n\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tvec4 color = texture2D(texture, textureCoord);\n\t\tgl_FragColor = color * vec4(1.0, 1.0, 1.0, alpha);\n\t}\n\n"]}};
kumite.layer.TextureHSLLayer.__meta__ = { fields : { textureConfig : { Param : null}, eyePosition : { Param : null}, position : { Param : null}, mixChance : { Param : null}, mixSpeed : { Param : null}, scale : { Param : null}, textureRegistry : { Inject : null}, time : { Inject : null}}};
kumite.layer.TextureHSLLayer.__rtti = "<class path=\"kumite.layer.TextureHSLLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<IDLE line=\"67\" static=\"1\"><c path=\"String\"/></IDLE>\n\t<MIX line=\"68\" static=\"1\"><c path=\"String\"/></MIX>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<textureRegistry public=\"1\">\n\t\t<c path=\"GLTextureRegistry\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</textureRegistry>\n\t<transitions public=\"1\"><c path=\"kumite.layer.LayerTransitions\"/></transitions>\n\t<cutTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></cutTransition>\n\t<moveTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></moveTransition>\n\t<alphaTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></alphaTransition>\n\t<scale public=\"1\">\n\t\t<c path=\"Float\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</scale>\n\t<mixSpeed public=\"1\">\n\t\t<c path=\"Float\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</mixSpeed>\n\t<mixChance public=\"1\">\n\t\t<c path=\"Float\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</mixChance>\n\t<position public=\"1\">\n\t\t<c path=\"Vec3\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</position>\n\t<eyePosition public=\"1\">\n\t\t<c path=\"Vec2\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</eyePosition>\n\t<textureConfig public=\"1\">\n\t\t<c path=\"GLTextureConfig\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</textureConfig>\n\t<colors public=\"1\"><c path=\"Array\"><c path=\"Vec3\"/></c></colors>\n\t<blend public=\"1\"><e path=\"Bool\"/></blend>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<worldViewMatrixUniform><c path=\"GLUniformLocation\"/></worldViewMatrixUniform>\n\t<textureUniform><c path=\"GLUniformLocation\"/></textureUniform>\n\t<alphaUniform><c path=\"GLUniformLocation\"/></alphaUniform>\n\t<hsl0Uniform><c path=\"GLUniformLocation\"/></hsl0Uniform>\n\t<hsl1Uniform><c path=\"GLUniformLocation\"/></hsl1Uniform>\n\t<hslMixUniform><c path=\"GLUniformLocation\"/></hslMixUniform>\n\t<hsl0><c path=\"Vec3\"/></hsl0>\n\t<hsl1><c path=\"Vec3\"/></hsl1>\n\t<hslMix><c path=\"Float\"/></hslMix>\n\t<state><c path=\"String\"/></state>\n\t<init public=\"1\" set=\"method\" line=\"86\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"111\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"117\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<new public=\"1\" set=\"method\" line=\"72\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer.TextureHSLLayer.IDLE = "IDLE";
kumite.layer.TextureHSLLayer.MIX = "MIX";
kumite.layer._TextureHSLLayer.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 worldViewMatrix;\n\n\tvarying vec4 vertex;\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);\n\t\tvertex = vec4(vertexPosition, 0.0, 1.0);\n\t\ttextureCoord = vertexPosition.xy;\n\t}\n\n"]}};
kumite.layer._TextureHSLLayer.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform sampler2D texture;\n\tuniform float alpha;\n\tuniform vec3 hsl0;\n\tuniform vec3 hsl1;\n\tuniform float hslMix;\n\n\tvarying vec2 textureCoord;\n\n\tvec3 RGBToHSL(vec3 color)\n\t{\n\t\tvec3 hsl; // init to 0 to avoid warnings ? (and reverse if + remove first part)\n\t\t\n\t\tfloat fmin = min(min(color.r, color.g), color.b);    //Min. value of RGB\n\t\tfloat fmax = max(max(color.r, color.g), color.b);    //Max. value of RGB\n\t\tfloat delta = fmax - fmin;             //Delta RGB value\n\t\n\t\thsl.z = (fmax + fmin) / 2.0; // Luminance\n\t\n\t\tif (delta == 0.0)\t\t//This is a gray, no chroma...\n\t\t{\n\t\t\thsl.x = 0.0;\t// Hue\n\t\t\thsl.y = 0.0;\t// Saturation\n\t\t}\n\t\telse                                    //Chromatic data...\n\t\t{\n\t\t\tif (hsl.z < 0.5)\n\t\t\t\thsl.y = delta / (fmax + fmin); // Saturation\n\t\t\telse\n\t\t\t\thsl.y = delta / (2.0 - fmax - fmin); // Saturation\n\t\t\t\n\t\t\tfloat deltaR = (((fmax - color.r) / 6.0) + (delta / 2.0)) / delta;\n\t\t\tfloat deltaG = (((fmax - color.g) / 6.0) + (delta / 2.0)) / delta;\n\t\t\tfloat deltaB = (((fmax - color.b) / 6.0) + (delta / 2.0)) / delta;\n\t\n\t\t\tif (color.r == fmax )\n\t\t\t\thsl.x = deltaB - deltaG; // Hue\n\t\t\telse if (color.g == fmax)\n\t\t\t\thsl.x = (1.0 / 3.0) + deltaR - deltaB; // Hue\n\t\t\telse if (color.b == fmax)\n\t\t\t\thsl.x = (2.0 / 3.0) + deltaG - deltaR; // Hue\n\t\n\t\t\tif (hsl.x < 0.0)\n\t\t\t\thsl.x += 1.0; // Hue\n\t\t\telse if (hsl.x > 1.0)\n\t\t\t\thsl.x -= 1.0; // Hue\n\t\t}\n\t\n\t\treturn hsl;\n\t}\n\t\n\tfloat HueToRGB(float f1, float f2, float hue)\n\t{\n\t\tif (hue < 0.0)\n\t\t\thue += 1.0;\n\t\telse if (hue > 1.0)\n\t\t\thue -= 1.0;\n\t\tfloat res;\n\t\tif ((6.0 * hue) < 1.0)\n\t\t\tres = f1 + (f2 - f1) * 6.0 * hue;\n\t\telse if ((2.0 * hue) < 1.0)\n\t\t\tres = f2;\n\t\telse if ((3.0 * hue) < 2.0)\n\t\t\tres = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;\n\t\telse\n\t\t\tres = f1;\n\t\treturn res;\n\t}\n\t\n\tvec3 HSLToRGB(vec3 hsl)\n\t{\n\t\tvec3 rgb;\n\t\t\n\t\tif (hsl.y == 0.0)\n\t\t\trgb = vec3(hsl.z); // Luminance\n\t\telse\n\t\t{\n\t\t\tfloat f2;\n\t\t\t\n\t\t\tif (hsl.z < 0.5)\n\t\t\t\tf2 = hsl.z * (1.0 + hsl.y);\n\t\t\telse\n\t\t\t\tf2 = (hsl.z + hsl.y) - (hsl.y * hsl.z);\n\t\t\t\t\n\t\t\tfloat f1 = 2.0 * hsl.z - f2;\n\t\t\t\n\t\t\trgb.r = HueToRGB(f1, f2, hsl.x + (1.0/3.0));\n\t\t\trgb.g = HueToRGB(f1, f2, hsl.x);\n\t\t\trgb.b= HueToRGB(f1, f2, hsl.x - (1.0/3.0));\n\t\t}\n\t\t\n\t\treturn rgb;\n\t}\n\tvoid main(void)\n\t{\n\t\tvec4 color = texture2D(texture, vec2(textureCoord.x, textureCoord.y));\n\t\tvec3 colorHSL = RGBToHSL(color.rgb);\n\n\t\tif (hslMix == 1.0)\n\t\t{\n\t\t\tvec3 colorHSL1 = colorHSL + hsl1;\n\t\t\tcolorHSL1.g = clamp(colorHSL1.g, 0.0, 1.0);\n\t\t\tvec3 colorRGB1 = HSLToRGB(colorHSL1);\n\n\t\t\tgl_FragColor = vec4(colorRGB1, color.a) * vec4(1.0, 1.0, 1.0, alpha);\n\t\t}\n\t\telse if(hslMix == 0.0)\n\t\t{\n\t\t\tvec3 colorHSL0 = colorHSL + hsl0;\n\t\t\tcolorHSL0.g = clamp(colorHSL0.g, 0.0, 1.0);\n\t\t\tvec3 colorRGB0 = HSLToRGB(colorHSL0);\n\n\t\t\tgl_FragColor = vec4(colorRGB0, color.a) * vec4(1.0, 1.0, 1.0, alpha);\n\t\t}\n\t\telse\n\t\t{\n\t\t\tvec3 colorHSL0 = colorHSL + hsl0;\n\t\t\tcolorHSL0.g = clamp(colorHSL0.g, 0.0, 1.0);\n\t\t\tvec3 colorRGB0 = HSLToRGB(colorHSL0);\n\t\n\t\t\tvec3 colorHSL1 = colorHSL + hsl1;\n\t\t\tcolorHSL1.g = clamp(colorHSL1.g, 0.0, 1.0);\n\t\t\tvec3 colorRGB1 = HSLToRGB(colorHSL1);\n\t\n\t\t\tvec3 colorRGB = mix(colorRGB0, colorRGB1, hslMix);\n\t\n\t\t\tgl_FragColor = vec4(colorRGB, color.a) * vec4(1.0, 1.0, 1.0, alpha);\n\t\t}\n\t}\n\n"]}};
kumite.layer.TextureLayer.__meta__ = { fields : { flipY : { Param : null}, blend : { Param : null}, texture : { Param : null}, textureConfig : { Param : null}, position : { Param : null}, scale : { Param : null, ParamMin : [-10], ParamMax : [10]}, textureRegistry : { Inject : null}, time : { Inject : null}}};
kumite.layer.TextureLayer.__rtti = "<class path=\"kumite.layer.TextureLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<textureRegistry public=\"1\">\n\t\t<c path=\"GLTextureRegistry\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</textureRegistry>\n\t<transitions public=\"1\"><c path=\"kumite.layer.LayerTransitions\"/></transitions>\n\t<cutTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></cutTransition>\n\t<moveTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></moveTransition>\n\t<alphaTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></alphaTransition>\n\t<scale public=\"1\">\n\t\t<c path=\"Float\"/>\n\t\t<meta>\n\t\t\t<m n=\"Param\"/>\n\t\t\t<m n=\"ParamMin\"><e>-10</e></m>\n\t\t\t<m n=\"ParamMax\"><e>10</e></m>\n\t\t</meta>\n\t</scale>\n\t<position public=\"1\">\n\t\t<c path=\"Vec3\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</position>\n\t<textureConfig public=\"1\">\n\t\t<c path=\"GLTextureConfig\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</textureConfig>\n\t<texture public=\"1\">\n\t\t<c path=\"GLTexture\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</texture>\n\t<blend public=\"1\">\n\t\t<e path=\"Bool\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</blend>\n\t<flipY public=\"1\">\n\t\t<e path=\"Bool\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</flipY>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<worldViewMatrixUniform><c path=\"GLUniformLocation\"/></worldViewMatrixUniform>\n\t<textureUniform><c path=\"GLUniformLocation\"/></textureUniform>\n\t<alphaUniform><c path=\"GLUniformLocation\"/></alphaUniform>\n\t<flipYUniform><c path=\"GLUniformLocation\"/></flipYUniform>\n\t<init public=\"1\" set=\"method\" line=\"71\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"90\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"96\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<new public=\"1\" set=\"method\" line=\"59\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer._TextureLayer.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 worldViewMatrix;\n\tuniform float flipY;\n\n\tvarying vec4 vertex;\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);\n\t\tvertex = vec4(vertexPosition, 0.0, 1.0);\n\n\t\tif (flipY == 1.0)\n\t\t{\n\t\t\ttextureCoord = vertexPosition.xy;\n\t\t\ttextureCoord.y = 1.0 - textureCoord.y;\n\t\t} \n\t\telse\n\t\t{\n\t\t\ttextureCoord = vertexPosition.xy;\n\t\t}\n\t}\n\n"]}};
kumite.layer._TextureLayer.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform sampler2D texture;\n\tuniform float alpha;\n\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tvec4 color = texture2D(texture, vec2(textureCoord.x, textureCoord.y));\n\t\tgl_FragColor = color * vec4(1.0, 1.0, 1.0, alpha);\n\t}\n\n"]}};
kumite.layer.effect.CrosshatchFilter.__meta__ = { fields : { textureConfig : { Param : null}, textureRegistry : { Inject : null}}};
kumite.layer.effect.CrosshatchFilter.__rtti = "<class path=\"kumite.layer.effect.CrosshatchFilter\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<textureRegistry public=\"1\">\n\t\t<c path=\"GLTextureRegistry\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</textureRegistry>\n\t<textureConfig public=\"1\">\n\t\t<c path=\"GLTextureConfig\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</textureConfig>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<textureUniform><c path=\"GLUniformLocation\"/></textureUniform>\n\t<amountUniform><c path=\"GLUniformLocation\"/></amountUniform>\n\t<amount><c path=\"Float\"/></amount>\n\t<init public=\"1\" set=\"method\" line=\"28\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"46\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"52\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<new public=\"1\" set=\"method\" line=\"26\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer.effect._CrosshatchFilter.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tvarying vec4 vertex;\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = vec4((vertexPosition - 0.5) * 2.0, 0.0, 1.0);\n\t\tvertex = vec4(vertexPosition, 0.0, 1.0);\n\t\ttextureCoord = vertexPosition.xy;\n\t}\n\n"]}};
kumite.layer.effect._CrosshatchFilter.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform sampler2D texture;\n\tuniform float amount;\n\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tfloat hatch_y_offset = 5.0;\n\t\tfloat lum_threshold_1 = 1.0;\n\t\tfloat lum_threshold_2 = 0.7;\n\t\tfloat lum_threshold_3 = 0.5;\n\t\tfloat lum_threshold_4 = 0.3;\n\n\t\tvec2 uv = textureCoord.xy;\n\n\t\tvec4 pixel = texture2D(texture, uv);\n\n\t\tfloat lum = length(pixel.rgb);\n\t\tfloat tc = 1.0;\n\n\t\tif (lum < lum_threshold_1)\n\t\t{\n\t\t\tif (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n\t\t\t\ttc = 0.0;\n\t\t}\n\n\t\tif (lum < lum_threshold_2)\n\t\t{\n\t\t\tif (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n\t\t\t\ttc = 0.0;\n\t\t}  \n\n\t\tif (lum < lum_threshold_3)\n\t\t{\n\t\t\tif (mod(gl_FragCoord.x + gl_FragCoord.y - hatch_y_offset, 10.0) == 0.0)\n\t\t\t\ttc = 0.0;\n\t\t}\n\n\t\tif (lum < lum_threshold_4)\n\t\t{\n\t\t\tif (mod(gl_FragCoord.x - gl_FragCoord.y - hatch_y_offset, 10.0) == 0.0)\n\t\t\t\ttc = 0.0;\n\t\t}\n\n\t\t//gl_FragColor = vec4(tc, tc, tc, amount) + pixel * (1.0 - amount);\n\t\tgl_FragColor = pixel * (1.0 - amount) + vec4(tc, tc, tc, 1) * amount;\n\t}\n\n"]}};
kumite.layer.effect.EyeEffect.__meta__ = { fields : { position : { Param : null}, offset : { Param : null}, textureConfig : { Param : null}, textureRegistry : { Inject : null}, stage : { Inject : null}, time : { Inject : null}, blobs : { Inject : null}}};
kumite.layer.effect.EyeEffect.__rtti = "<class path=\"kumite.layer.effect.EyeEffect\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<blobs public=\"1\">\n\t\t<c path=\"kumite.blobs.Blobs\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</blobs>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<stage public=\"1\">\n\t\t<c path=\"kumite.stage.Stage\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</stage>\n\t<textureRegistry public=\"1\">\n\t\t<c path=\"GLTextureRegistry\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</textureRegistry>\n\t<textureConfig public=\"1\">\n\t\t<c path=\"GLTextureConfig\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</textureConfig>\n\t<offset public=\"1\">\n\t\t<c path=\"Float\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</offset>\n\t<position public=\"1\">\n\t\t<c path=\"Vec2\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</position>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<directionUniform><c path=\"GLUniformLocation\"/></directionUniform>\n\t<timeUniform><c path=\"GLUniformLocation\"/></timeUniform>\n\t<textureUniform><c path=\"GLUniformLocation\"/></textureUniform>\n\t<mousePosition><c path=\"Vec2\"/></mousePosition>\n\t<moveSet><c path=\"MoveSetVec2\"/></moveSet>\n\t<state public=\"1\"><c path=\"kumite.layer.effect._EyeEffect.State\"/></state>\n\t<STATE_IDLE public=\"1\"><c path=\"kumite.layer.effect._EyeEffect.IdleState\"/></STATE_IDLE>\n\t<idleStateIndex><c path=\"Int\"/></idleStateIndex>\n\t<STATE_IDLE_1 public=\"1\"><c path=\"kumite.layer.effect._EyeEffect.IdleState1\"/></STATE_IDLE_1>\n\t<STATE_IDLE_2 public=\"1\"><c path=\"kumite.layer.effect._EyeEffect.IdleState2\"/></STATE_IDLE_2>\n\t<STATE_IDLE_3 public=\"1\"><c path=\"kumite.layer.effect._EyeEffect.IdleState3\"/></STATE_IDLE_3>\n\t<STATE_TARGET public=\"1\"><c path=\"kumite.layer.effect._EyeEffect.TargetState\"/></STATE_TARGET>\n\t<init public=\"1\" set=\"method\" line=\"75\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<setState public=\"1\" set=\"method\" line=\"96\"><f a=\"state\">\n\t<c path=\"kumite.layer.effect._EyeEffect.State\"/>\n\t<e path=\"Void\"/>\n</f></setState>\n\t<setRandomIdleState public=\"1\" set=\"method\" line=\"109\"><f a=\"\"><e path=\"Void\"/></f></setRandomIdleState>\n\t<renderTransition public=\"1\" set=\"method\" line=\"116\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"121\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<sortfunction set=\"method\" line=\"183\"><f a=\"a:b\">\n\t<c path=\"kumite.blobs.Blob\"/>\n\t<c path=\"kumite.blobs.Blob\"/>\n\t<c path=\"Int\"/>\n</f></sortfunction>\n\t<updateMouse set=\"method\" line=\"198\"><f a=\"position\">\n\t<c path=\"Vec2\"/>\n\t<e path=\"Void\"/>\n</f></updateMouse>\n\t<new public=\"1\" set=\"method\" line=\"59\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer.effect._EyeEffect.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tvarying vec2 tc;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = vec4(vertexPosition.x, vertexPosition.y, 0.0, 1.0);\n\t\ttc = (vertexPosition.xy + 1.0) * 0.5;\n\t}\n\n"]}};
kumite.layer.effect._EyeEffect.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\tprecision highp float;\n\t#endif\n\t\n\tvarying vec2 tc;\n\n\tuniform vec2 direction;\n\tuniform float time;\n\tuniform sampler2D texture;\n\t\n\tvoid main(void)\n\t{\n\t\tfloat zoom = 4.0;\n\t\tvec2 p = (-1.0 + 2.0 * tc) * 0.5;\n\t\tfloat r = dot(p,p) * zoom;\n\n\t\tfloat f = pow((1.0 - sqrt(1.0 - r)) / r, 0.8);\n\n\t\tvec2 uv;\n\t\tuv.x = p.x * f + 0.5 + direction.x + sin(time * 14.0 + p.y * 10.0) * 0.0005;\n\t\tuv.y = p.y * f + 0.5 + direction.y + cos(time * 14.0 + p.x * 10.0) * 0.0005;\n\n\t\tvec4 pixel = texture2D(texture, uv);\n\t\tgl_FragColor = pixel;\n\t}\n\n"]}};
kumite.layer.effect.PlasmaEffect.__meta__ = { fields : { time : { Inject : null}}};
kumite.layer.effect.PlasmaEffect.__rtti = "<class path=\"kumite.layer.effect.PlasmaEffect\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<resolutionUniform><c path=\"GLUniformLocation\"/></resolutionUniform>\n\t<timeUniform><c path=\"GLUniformLocation\"/></timeUniform>\n\t<amountUniform><c path=\"GLUniformLocation\"/></amountUniform>\n\t<amount><c path=\"Float\"/></amount>\n\t<init public=\"1\" set=\"method\" line=\"28\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"47\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"53\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<new public=\"1\" set=\"method\" line=\"26\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer.effect._PlasmaEffect.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = vec4(vertexPosition.x, vertexPosition.y, 0.0, 1.0);\n\t}\n\n"]}};
kumite.layer.effect._PlasmaEffect.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\tprecision highp float;\n\t#endif\n\t\n\tuniform vec2 resolution;\n\tuniform float time;\n\t\n\tvoid main(void)\n\t{\n\t   float x = gl_FragCoord.x;\n\t   float y = gl_FragCoord.y;\n\t   float mov0 = x+y+cos(sin(time)*2.)*100.+sin(x/100.)*1000.;\n\t   float mov1 = y / resolution.y / 0.2 + time;\n\t   float mov2 = x / resolution.x / 0.2;\n\t   float c1 = abs(sin(mov1+time)/2.+mov2/2.-mov1-mov2+time);\n\t   float c2 = abs(sin(c1+sin(mov0/1000.+time)+sin(y/40.+time)+sin((x+y)/100.)*3.));\n\t   float c3 = abs(sin(c2+cos(mov1+mov2+c2)+cos(mov2)+sin(x/1000.)));\n\t   gl_FragColor = vec4( 0,c2,c3,1.0);\n\t}\n\n"]}};
kumite.layer.effect.PostproFilter.__meta__ = { fields : { textureConfig : { Param : null}, time : { Inject : null}, textureRegistry : { Inject : null}}};
kumite.layer.effect.PostproFilter.__rtti = "<class path=\"kumite.layer.effect.PostproFilter\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<textureRegistry public=\"1\">\n\t\t<c path=\"GLTextureRegistry\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</textureRegistry>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<textureConfig public=\"1\">\n\t\t<c path=\"GLTextureConfig\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</textureConfig>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<textureUniform><c path=\"GLUniformLocation\"/></textureUniform>\n\t<resolutionUniform><c path=\"GLUniformLocation\"/></resolutionUniform>\n\t<timeUniform><c path=\"GLUniformLocation\"/></timeUniform>\n\t<init public=\"1\" set=\"method\" line=\"32\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"49\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"54\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<new public=\"1\" set=\"method\" line=\"30\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer.effect._PostproFilter.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = vec4(vertexPosition.x, vertexPosition.y, 0.0, 1.0);\n\t}\n\n"]}};
kumite.layer.effect._PostproFilter.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\tprecision highp float;\n\t#endif\n\t\n\tuniform vec2 resolution;\n\tuniform float time;\n\tuniform sampler2D texture;\n\t\n\tvoid main(void)\n\t{\n\t    vec2 q = gl_FragCoord.xy / resolution;\n\t\tq.y = 1.0-q.y;\n\t    vec3 oricol = texture2D(texture, vec2(q.x,1.0 - q.y)).xyz;\n\n\t\tvec2 uv = q;\n\n\t    vec3 col;\n\n\t\t//aberation\n\t\tfloat cax = 7.0;\n\t\tfloat cay = -7.0;\n\t    col.r = texture2D(texture,vec2(uv.x+cax / resolution.x,-uv.y)).x;\n\t    col.g = texture2D(texture,vec2(uv.x+0.000,-uv.y)).y;\n\t    col.b = texture2D(texture,vec2(uv.x+cay / resolution.x,-uv.y)).z;\n\t\n\t    col = clamp(col*0.5+0.5*col*col*1.2,0.0,1.0);\n\t\n\t\t//vignette\n\t    col *= 0.3 + 0.7*16.0*uv.x*uv.y*(1.0-uv.x)*(1.0-uv.y);\n\t\n\t\t//color\n\t    col *= vec3(0.8,1.0,0.7);\n\t\n\t\t//v lines\n\t    col *= 1.0+0.2*sin(0.01*time+gl_FragCoord.y*2.5);\n\t\n\t\t//flicker\n\t    col *= 0.99+0.01*sin(0.11*time);\n\t\n\t    gl_FragColor = vec4(col, 1.0);\n\t}\n\n"]}};
kumite.layer.effect.TestFilter.__meta__ = { fields : { textureConfig : { Param : null}, textureRegistry : { Inject : null}}};
kumite.layer.effect.TestFilter.__rtti = "<class path=\"kumite.layer.effect.TestFilter\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<textureRegistry public=\"1\">\n\t\t<c path=\"GLTextureRegistry\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</textureRegistry>\n\t<textureConfig public=\"1\">\n\t\t<c path=\"GLTextureConfig\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</textureConfig>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<textureUniform><c path=\"GLUniformLocation\"/></textureUniform>\n\t<amountUniform><c path=\"GLUniformLocation\"/></amountUniform>\n\t<amount><c path=\"Float\"/></amount>\n\t<init public=\"1\" set=\"method\" line=\"28\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"46\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"52\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<new public=\"1\" set=\"method\" line=\"26\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.layer.effect._TestFilter.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tvarying vec4 vertex;\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = vec4((vertexPosition - 0.5) * 2.0, 0.0, 1.0);\n\t\tvertex = vec4(vertexPosition, 0.0, 1.0);\n\t\ttextureCoord = vertexPosition.xy;\n\t}\n\n"]}};
kumite.layer.effect._TestFilter.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform sampler2D texture;\n\tuniform float amount;\n\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tvec4 color = texture2D(texture, textureCoord);\n\t\tvec4 result = color * color.w + vec4(textureCoord.x, textureCoord.y, 0.0, 1.0);\n\t\tgl_FragColor = result * amount + color * (1.0 - amount);\n\t}\n\n"]}};
kumite.mouse.Config.__rtti = "<class path=\"kumite.mouse.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<mouseController public=\"1\"><c path=\"kumite.mouse.MouseController\"/></mouseController>\n\t<new public=\"1\" set=\"method\" line=\"8\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.mouse.MouseController.__meta__ = { fields : { start : { Sequence : ["boot","init"]}, canvas : { Inject : null}}};
kumite.mouse.MouseController.__rtti = "<class path=\"kumite.mouse.MouseController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<canvas public=\"1\">\n\t\t<c path=\"kumite.canvas.CanvasCase\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</canvas>\n\t<start public=\"1\" set=\"method\" line=\"15\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>init</e>\n</m></meta>\n\t</start>\n\t<new public=\"1\" set=\"method\" line=\"12\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.projection.Config.__rtti = "<class path=\"kumite.projection.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<projection public=\"1\"><c path=\"kumite.projection.Projection\"/></projection>\n\t<projectionController public=\"1\"><c path=\"kumite.projection.ProjectionController\"/></projectionController>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.projection.ProjectionController.__meta__ = { fields : { updateProjectionSizeFromStage : { Message : null}, init : { Sequence : ["boot","init"]}, stage : { Inject : null}, projection : { Inject : null}}};
kumite.projection.ProjectionController.__rtti = "<class path=\"kumite.projection.ProjectionController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<projection public=\"1\">\n\t\t<c path=\"kumite.projection.Projection\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</projection>\n\t<stage public=\"1\">\n\t\t<c path=\"kumite.stage.Stage\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</stage>\n\t<fov public=\"1\"><c path=\"Float\"/></fov>\n\t<near public=\"1\"><c path=\"Float\"/></near>\n\t<far public=\"1\"><c path=\"Float\"/></far>\n\t<init public=\"1\" set=\"method\" line=\"23\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>init</e>\n</m></meta>\n\t</init>\n\t<updateProjectionSizeFromStage public=\"1\" set=\"method\" line=\"30\">\n\t\t<f a=\"?message\">\n\t\t\t<c path=\"kumite.stage.StageResizeMessage\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<meta><m n=\"Message\"/></meta>\n\t</updateProjectionSizeFromStage>\n\t<new public=\"1\" set=\"method\" line=\"20\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.scene.DefaultScene.__meta__ = { fields : { sceneExit : { Message : null}, sceneEnter : { Message : null}, displayListLayer : { Inject : null}}};
kumite.scene.DefaultScene.__rtti = "<class path=\"kumite.scene.DefaultScene\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.SceneLifecycle\"/>\n\t<displayListLayer public=\"1\">\n\t\t<c path=\"kumite.displaylist.DisplayListLayer\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</displayListLayer>\n\t<name public=\"1\"><c path=\"String\"/></name>\n\t<enterSignaler public=\"1\" set=\"null\"><c path=\"hsl.haxe.Signaler\"><e path=\"Void\"/></c></enterSignaler>\n\t<exitSignaler public=\"1\" set=\"null\"><c path=\"hsl.haxe.Signaler\"><e path=\"Void\"/></c></exitSignaler>\n\t<transitionOutSignaler public=\"1\" set=\"null\"><c path=\"hsl.haxe.Signaler\"><e path=\"Void\"/></c></transitionOutSignaler>\n\t<preconfiguredLifecycles><c path=\"Array\"><c path=\"kumite.scene._DefaultScene.LifecycleAndLayerId\"/></c></preconfiguredLifecycles>\n\t<defaultLayers><e path=\"Bool\"/></defaultLayers>\n\t<useDefaultLayers public=\"1\" set=\"method\" line=\"42\"><f a=\"\"><e path=\"Void\"/></f></useDefaultLayers>\n\t<addLayerLifecycle public=\"1\" set=\"method\" line=\"47\"><f a=\"lifecycle:?layerId\">\n\t<c path=\"kumite.scene.LayerLifecycle\"/>\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></addLayerLifecycle>\n\t<sceneInit public=\"1\" set=\"method\" line=\"58\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></sceneInit>\n\t<initTransition public=\"1\" set=\"method\" line=\"75\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></initTransition>\n\t<renderTransition public=\"1\" set=\"method\" line=\"81\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"85\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<sceneEnter set=\"method\" line=\"90\">\n\t\t<f a=\"sceneEnter\">\n\t\t\t<c path=\"kumite.scene.SceneEnter\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<meta><m n=\"Message\"/></meta>\n\t</sceneEnter>\n\t<sceneExit set=\"method\" line=\"97\">\n\t\t<f a=\"sceneExit\">\n\t\t\t<c path=\"kumite.scene.SceneExit\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<meta><m n=\"Message\"/></meta>\n\t</sceneExit>\n\t<addPreconfiguredLifecycles set=\"method\" line=\"103\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></addPreconfiguredLifecycles>\n\t<new public=\"1\" set=\"method\" line=\"31\"><f a=\"?name\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></new>\n</class>";
kumite.scene.LayerState.OUT = new kumite.scene.LayerState("OUT");
kumite.scene.LayerState.IN = new kumite.scene.LayerState("IN");
kumite.scene.LayerState.KEEP = new kumite.scene.LayerState("KEEP");
kumite.scene.SceneConfig.__rtti = "<class path=\"kumite.scene.SceneConfig\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<scenes public=\"1\"><c path=\"kumite.scene.Scenes\"/></scenes>\n\t<sceneNavigator public=\"1\"><c path=\"kumite.scene.SceneNavigator\"/></sceneNavigator>\n\t<new public=\"1\" set=\"method\" line=\"9\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.scene.SceneNavigator.__meta__ = { fields : { render : { Message : null}, handleSceneChangeRequest : { Message : null}, start : { Sequence : ["boot","start"]}, handleSceneLifecycleAdded : { Observe : null}, init : { Complete : null}, stage : { Inject : null}, time : { Inject : null}, scenes : { Inject : null}, messenger : { Messenger : null}}};
kumite.scene.SceneNavigator.__rtti = "<class path=\"kumite.scene.SceneNavigator\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<messenger public=\"1\">\n\t\t<c path=\"bpmjs.Messenger\"/>\n\t\t<meta><m n=\"Messenger\"/></meta>\n\t</messenger>\n\t<scenes public=\"1\">\n\t\t<c path=\"kumite.scene.Scenes\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</scenes>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<stage public=\"1\">\n\t\t<c path=\"kumite.stage.Stage\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</stage>\n\t<transitionTime public=\"1\"><c path=\"Float\"/></transitionTime>\n\t<transitionContext public=\"1\"><c path=\"kumite.scene.TransitionContext\"/></transitionContext>\n\t<renderContext public=\"1\"><c path=\"kumite.scene.RenderContext\"/></renderContext>\n\t<initState public=\"1\"><c path=\"kumite.scene.InitState\"/></initState>\n\t<idleState public=\"1\"><c path=\"kumite.scene.IdleState\"/></idleState>\n\t<transitionState public=\"1\"><c path=\"kumite.scene.TransitionState\"/></transitionState>\n\t<currentScene public=\"1\"><c path=\"kumite.scene.SceneAndLifecycle\"/></currentScene>\n\t<lastScene public=\"1\"><c path=\"kumite.scene.SceneAndLifecycle\"/></lastScene>\n\t<state><c path=\"kumite.scene.State\"/></state>\n\t<init public=\"1\" set=\"method\" line=\"46\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Complete\"/></meta>\n\t</init>\n\t<handleSceneLifecycleAdded public=\"1\" set=\"method\" line=\"65\">\n\t\t<f a=\"lifecycle\">\n\t\t\t<c path=\"kumite.scene.SceneLifecycle\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<meta><m n=\"Observe\"/></meta>\n\t</handleSceneLifecycleAdded>\n\t<start public=\"1\" set=\"method\" line=\"77\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>start</e>\n</m></meta>\n\t</start>\n\t<handleSceneChangeRequest public=\"1\" set=\"method\" line=\"91\">\n\t\t<f a=\"message\">\n\t\t\t<c path=\"kumite.scene.SceneChangeRequest\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<meta><m n=\"Message\"/></meta>\n\t</handleSceneChangeRequest>\n\t<render public=\"1\" set=\"method\" line=\"97\">\n\t\t<f a=\"tick\">\n\t\t\t<c path=\"kumite.time.Tick\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<meta><m n=\"Message\"/></meta>\n\t</render>\n\t<renderTransition public=\"1\" set=\"method\" line=\"102\"><f a=\"\"><e path=\"Void\"/></f></renderTransition>\n\t<initTransition public=\"1\" set=\"method\" line=\"127\"><f a=\"\"><e path=\"Void\"/></f></initTransition>\n\t<renderNormal public=\"1\" set=\"method\" line=\"133\"><f a=\"\"><e path=\"Void\"/></f></renderNormal>\n\t<enterScene set=\"method\" line=\"144\"><f a=\"newScene\">\n\t<c path=\"kumite.scene.SceneAndLifecycle\"/>\n\t<e path=\"Void\"/>\n</f></enterScene>\n\t<setState public=\"1\" set=\"method\" line=\"155\"><f a=\"state\">\n\t<c path=\"kumite.scene.State\"/>\n\t<e path=\"Void\"/>\n</f></setState>\n\t<initAllLayers set=\"method\" line=\"161\"><f a=\"\"><e path=\"Void\"/></f></initAllLayers>\n\t<new public=\"1\" set=\"method\" line=\"40\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.spritemesh.Config.__meta__ = { fields : { startPrepare : { Sequence : ["boot","startPrepare"]}, complete : { Complete : null}, displayListLayer : { Inject : null}, textureRegistry : { Inject : null}}};
kumite.spritemesh.Config.__rtti = "<class path=\"kumite.spritemesh.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<TEST_ATLAS public=\"1\" line=\"20\" static=\"1\"><c path=\"GLTextureAtlasConfig\"/></TEST_ATLAS>\n\t<textureRegistry public=\"1\">\n\t\t<c path=\"GLTextureRegistry\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</textureRegistry>\n\t<displayListLayer public=\"1\">\n\t\t<c path=\"kumite.displaylist.DisplayListLayer\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</displayListLayer>\n\t<clearLayer public=\"1\"><c path=\"kumite.layer.ClearLayer\"/></clearLayer>\n\t<colorLayer public=\"1\"><c path=\"kumite.layer.ColorLayer\"/></colorLayer>\n\t<layer1 public=\"1\"><c path=\"kumite.spritemesh.SpriteMeshLayer\"/></layer1>\n\t<layer2 public=\"1\"><c path=\"kumite.spritemesh.SpriteMeshLayer\"/></layer2>\n\t<layer3 public=\"1\"><c path=\"kumite.spritemesh.SpriteMeshLayer\"/></layer3>\n\t<scene1 public=\"1\"><c path=\"kumite.scene.DefaultScene\"/></scene1>\n\t<scene2 public=\"1\"><c path=\"kumite.scene.DefaultScene\"/></scene2>\n\t<scene3 public=\"1\"><c path=\"kumite.scene.DefaultScene\"/></scene3>\n\t<scene4 public=\"1\"><c path=\"kumite.scene.DefaultScene\"/></scene4>\n\t<scene5 public=\"1\"><c path=\"kumite.scene.DefaultScene\"/></scene5>\n\t<framebufferEnableLayer1 public=\"1\"><c path=\"kumite.layer.FramebufferEnableLayer\"/></framebufferEnableLayer1>\n\t<framebufferDisableLayer1 public=\"1\"><c path=\"kumite.layer.FramebufferDisableLayer\"/></framebufferDisableLayer1>\n\t<clearLayer1 public=\"1\"><c path=\"kumite.layer.ClearLayer\"/></clearLayer1>\n\t<textureLayer1 public=\"1\"><c path=\"kumite.layer.TextureLayer\"/></textureLayer1>\n\t<testFilter public=\"1\"><c path=\"kumite.layer.effect.TestFilter\"/></testFilter>\n\t<postproFilter public=\"1\"><c path=\"kumite.layer.effect.PostproFilter\"/></postproFilter>\n\t<crosshatchFilter public=\"1\"><c path=\"kumite.layer.effect.CrosshatchFilter\"/></crosshatchFilter>\n\t<complete public=\"1\" set=\"method\" line=\"99\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Complete\"/></meta>\n\t</complete>\n\t<startPrepare public=\"1\" set=\"method\" line=\"142\">\n\t\t<f a=\"\"><c path=\"bpmjs.SequencerTaskGroup\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>startPrepare</e>\n</m></meta>\n\t</startPrepare>\n\t<new public=\"1\" set=\"method\" line=\"51\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.spritemesh.Config.TEST_ATLAS = GLTextureAtlasConfig.create(4096,2048,9985);
kumite.spritemesh.SpriteMeshLayer.__meta__ = { fields : { textureAmpParam : { Param : null}, textureFrequenceParam : { Param : null}, offset : { Param : null}, textureRegistry : { Inject : null}, time : { Inject : null}}};
kumite.spritemesh.SpriteMeshLayer.__rtti = "<class path=\"kumite.spritemesh.SpriteMeshLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<max public=\"1\" line=\"18\" static=\"1\"><c path=\"Int\"/></max>\n\t<axis line=\"128\" static=\"1\"><c path=\"Vec3\"/></axis>\n\t<zAxis line=\"129\" static=\"1\"><c path=\"Vec3\"/></zAxis>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<textureRegistry public=\"1\">\n\t\t<c path=\"GLTextureRegistry\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</textureRegistry>\n\t<transitions public=\"1\"><c path=\"kumite.layer.LayerTransitions\"/></transitions>\n\t<alphaTransition public=\"1\"><c path=\"kumite.layer.LayerTransition\"/></alphaTransition>\n\t<offset public=\"1\">\n\t\t<c path=\"Float\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</offset>\n\t<textureFrequenceParam public=\"1\">\n\t\t<c path=\"Float\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</textureFrequenceParam>\n\t<textureAmpParam public=\"1\">\n\t\t<c path=\"Float\"/>\n\t\t<meta><m n=\"Param\"/></meta>\n\t</textureAmpParam>\n\t<sprites><c path=\"Array\"><c path=\"kumite.spritemesh.Sprite\"/></c></sprites>\n\t<projectionMatrix><c path=\"Matrix4\"/></projectionMatrix>\n\t<cameraMatrix><c path=\"Matrix4\"/></cameraMatrix>\n\t<cameraMatrix2><c path=\"Matrix4\"/></cameraMatrix2>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexBuffer><c path=\"Float32Array\"/></vertexBuffer>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexUVBuffer><c path=\"Float32Array\"/></vertexUVBuffer>\n\t<vertexUVAttribute><c path=\"GLAttribLocation\"/></vertexUVAttribute>\n\t<vertexNormalBuffer><c path=\"Float32Array\"/></vertexNormalBuffer>\n\t<vertexNormalAttribute><c path=\"GLAttribLocation\"/></vertexNormalAttribute>\n\t<cubeVerticesIndexBuffer><c path=\"WebGLBuffer\"/></cubeVerticesIndexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<alphaUniform><c path=\"GLUniformLocation\"/></alphaUniform>\n\t<textureUniform><c path=\"GLUniformLocation\"/></textureUniform>\n\t<spriteRenderIndexes><c path=\"Uint32Array\"/></spriteRenderIndexes>\n\t<spriteRenderIndexesCount><c path=\"Int\"/></spriteRenderIndexesCount>\n\t<init public=\"1\" set=\"method\" line=\"82\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"95\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<timems><c path=\"Float\"/></timems>\n\t<render public=\"1\" set=\"method\" line=\"103\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<renderGLInit set=\"method\" line=\"117\"><f a=\"renderContext\">\n\t<c path=\"kumite.scene.RenderContext\"/>\n\t<e path=\"Void\"/>\n</f></renderGLInit>\n\t<updateModel set=\"method\" line=\"131\"><f a=\"\"><e path=\"Void\"/></f></updateModel>\n\t<updateIndexes set=\"method\" line=\"165\"><f a=\"\"><e path=\"Void\"/></f></updateIndexes>\n\t<sortIndexes set=\"method\" line=\"191\"><f a=\"\"><e path=\"Void\"/></f></sortIndexes>\n\t<quicksort set=\"method\" line=\"196\"><f a=\"lo:hi\">\n\t<c path=\"Int\"/>\n\t<c path=\"Int\"/>\n\t<e path=\"Void\"/>\n</f></quicksort>\n\t<updateBuffer set=\"method\" line=\"214\"><f a=\"\"><e path=\"Void\"/></f></updateBuffer>\n\t<renderGL set=\"method\" line=\"261\"><f a=\"\"><e path=\"Void\"/></f></renderGL>\n\t<initGl set=\"method\" line=\"283\"><f a=\"\"><e path=\"Void\"/></f></initGl>\n\t<new public=\"1\" set=\"method\" line=\"65\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.spritemesh.SpriteMeshLayer.max = 20000;
kumite.spritemesh.SpriteMeshLayer.axis = new Vec3(1,1,1).normalize();
kumite.spritemesh.SpriteMeshLayer.zAxis = new Vec3(0,0,1);
kumite.spritemesh._SpriteMeshLayer.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec3 vertexPosition;\n\tattribute vec3 vertexNormal;\n\tattribute vec2 vertexUV;\n\n\tuniform mat4 projectionMatrix;\n\n\tuniform float alpha;\n\n\tvarying vec2 uv;\n\tvarying vec3 vertex;\n\tvarying float light;\n\n\tvoid main(void)\n\t{\n\t\tuv = vertexUV;\n\t\tvertex = vertexPosition;\n\t\tgl_Position = projectionMatrix * vec4(vertexPosition - vec3(0.0, 0.0, (1.0 - alpha) * 7.0), 1.0);\n\n\t\tvec3 normalRot = normalize(vertexPosition - vertexNormal);\n\t\tvec3 lightDir = normalize(vertexPosition - vec3(0.0, 0.0, -30.0));\n\t\tfloat diffuse = clamp(dot(normalRot, lightDir) * -1.0, -1.0, 1.0);\n\t\tvec3 viewDir = normalize(vec3(0.0, 0.0, 0.0) - vertexPosition);\n\n\t\tvec3 h1 = normalize(lightDir + viewDir);\n\t\tfloat specular1 = clamp(pow(dot(normalRot, h1), 30.0), 0.0, 1.0);\n\n\t\tlight = clamp((0.5 + (diffuse * 1.3 + specular1 * 1.5)), 0.1, 100.0) * alpha * 0.8;\n\t}\n\n"]}};
kumite.spritemesh._SpriteMeshLayer.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform sampler2D texture;\n\tuniform float alpha;\n\n\tvarying vec2 uv;\n\tvarying vec3 vertex;\n\tvarying float light;\n\n\tvoid main(void)\n\t{\n\t\tvec4 color = texture2D(texture, uv);\n\t\tgl_FragColor = color * light;\n\t}\n\n\n"]}};
kumite.stage.Config.__rtti = "<class path=\"kumite.stage.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<stageResizeAction public=\"1\"><c path=\"kumite.stage.StageResizeAction\"/></stageResizeAction>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.stage.StageResizeAction.__meta__ = { fields : { startComplete : { Sequence : ["boot","startComplete"]}, initPrepare : { Sequence : ["boot","initPrepare"]}, stage : { Inject : null}, messenger : { Messenger : null}}};
kumite.stage.StageResizeAction.__rtti = "<class path=\"kumite.stage.StageResizeAction\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<messenger public=\"1\">\n\t\t<c path=\"bpmjs.Messenger\"/>\n\t\t<meta><m n=\"Messenger\"/></meta>\n\t</messenger>\n\t<stage public=\"1\">\n\t\t<c path=\"kumite.stage.Stage\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</stage>\n\t<initPrepare public=\"1\" set=\"method\" line=\"21\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>initPrepare</e>\n</m></meta>\n\t</initPrepare>\n\t<startComplete public=\"1\" set=\"method\" line=\"27\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>startComplete</e>\n</m></meta>\n\t</startComplete>\n\t<timerUpdate set=\"method\" line=\"33\"><f a=\"\"><e path=\"Void\"/></f></timerUpdate>\n\t<onResize set=\"method\" line=\"39\"><f a=\"?event\">\n\t<t path=\"js.Event\"/>\n\t<e path=\"Void\"/>\n</f></onResize>\n\t<updateSize set=\"method\" line=\"45\"><f a=\"\"><e path=\"Void\"/></f></updateSize>\n\t<sendResizeMessage set=\"method\" line=\"51\"><f a=\"\"><e path=\"Void\"/></f></sendResizeMessage>\n\t<new public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.textureregistry.Config.__rtti = "<class path=\"kumite.textureregistry.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<textureRegistry public=\"1\"><c path=\"GLTextureRegistry\"/></textureRegistry>\n\t<new public=\"1\" set=\"method\" line=\"8\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.time.Config.__rtti = "<class path=\"kumite.time.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<timeController public=\"1\"><c path=\"kumite.time.TimeController\"/></timeController>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.time.Time.EXPECTED_FRAMERATE = 60;
kumite.time.TimeController.__meta__ = { fields : { startComplete : { Sequence : ["boot","startComplete"]}, messenger : { Messenger : null}, time : { Inject : null}}};
kumite.time.TimeController.__rtti = "<class path=\"kumite.time.TimeController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<time public=\"1\">\n\t\t<c path=\"kumite.time.Time\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</time>\n\t<messenger public=\"1\">\n\t\t<c path=\"bpmjs.Messenger\"/>\n\t\t<meta><m n=\"Messenger\"/></meta>\n\t</messenger>\n\t<startComplete public=\"1\" set=\"method\" line=\"18\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>startComplete</e>\n</m></meta>\n\t</startComplete>\n\t<timerUpdate set=\"method\" line=\"24\"><f a=\"\"><e path=\"Void\"/></f></timerUpdate>\n\t<new public=\"1\" set=\"method\" line=\"15\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.webgl.Config.__rtti = "<class path=\"kumite.webgl.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<initAction public=\"1\"><c path=\"kumite.webgl.InitAction\"/></initAction>\n\t<new public=\"1\" set=\"method\" line=\"8\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.webgl.InitAction.__meta__ = { fields : { init : { Sequence : ["boot","init"]}, canvas : { Inject : null}}};
kumite.webgl.InitAction.__rtti = "<class path=\"kumite.webgl.InitAction\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<canvas public=\"1\">\n\t\t<c path=\"kumite.canvas.CanvasCase\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</canvas>\n\t<antialias public=\"1\"><e path=\"Bool\"/></antialias>\n\t<init public=\"1\" set=\"method\" line=\"16\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>init</e>\n</m></meta>\n\t</init>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
reflect.ClassInfo.cache = new Hash();
shader.DisplayObjectFragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform sampler2D texture;\n\tuniform float alpha;\n\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tvec4 color = texture2D(texture, textureCoord);\n\t\tgl_FragColor = color * vec4(1.0, 1.0, 1.0, alpha);\n\t}\n\n"]}};
shader.DisplayObjectVertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 objectMatrix;\n\tuniform vec2 size;\n\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * objectMatrix * (vec4(size, 1.0, 1.0) * vec4(vertexPosition, 0.0, 1.0));\n\t\ttextureCoord = vertexPosition.xy;\n\t}\n\n"]}};
Main.main();
