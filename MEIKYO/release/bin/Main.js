$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof reflect=='undefined') reflect = {}
reflect.MetadataAware = function() { }
reflect.MetadataAware.__name__ = ["reflect","MetadataAware"];
reflect.MetadataAware.prototype.hasMetadata = null;
reflect.MetadataAware.prototype.__class__ = reflect.MetadataAware;
reflect.Field = function(field,definedInClass,owner) { if( field === $_ ) return; {
	$s.push("reflect.Field::new");
	var $spos = $s.length;
	this.field = field;
	this.definedInClass = definedInClass;
	this.owner = owner;
	$s.pop();
}}
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
	{
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
	}
	{
		$s.pop();
		return false;
	}
	$s.pop();
}
reflect.Field.prototype.getOwner = function() {
	$s.push("reflect.Field::getOwner");
	var $spos = $s.length;
	{
		var $tmp = this.owner;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
reflect.Field.prototype.getName = function() {
	$s.push("reflect.Field::getName");
	var $spos = $s.length;
	{
		var $tmp = this.field.name;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
reflect.Field.prototype.getType = function() {
	$s.push("reflect.Field::getType");
	var $spos = $s.length;
	{
		var $tmp = reflect.ClassInfo.forCType(this.field.type);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
reflect.Field.prototype.getClass = function() {
	$s.push("reflect.Field::getClass");
	var $spos = $s.length;
	var type = reflect.ClassInfo.forCType(this.field.type);
	{
		var $tmp = type == null?null:type.type;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
reflect.Field.prototype.__class__ = reflect.Field;
reflect.Field.__interfaces__ = [reflect.MetadataAware];
reflect.Property = function(field,definedInClass,owner) { if( field === $_ ) return; {
	$s.push("reflect.Property::new");
	var $spos = $s.length;
	reflect.Field.call(this,field,definedInClass,owner);
	$s.pop();
}}
reflect.Property.__name__ = ["reflect","Property"];
reflect.Property.__super__ = reflect.Field;
for(var k in reflect.Field.prototype ) reflect.Property.prototype[k] = reflect.Field.prototype[k];
reflect.Property.prototype.getValue = function(instance) {
	$s.push("reflect.Property::getValue");
	var $spos = $s.length;
	{
		var $tmp = Reflect.field(instance,this.field.name);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
reflect.Property.prototype.setValue = function(instance,value) {
	$s.push("reflect.Property::setValue");
	var $spos = $s.length;
	instance[this.field.name] = value;
	$s.pop();
}
reflect.Property.prototype.__class__ = reflect.Property;
if(typeof haxe=='undefined') haxe = {}
if(!haxe.rtti) haxe.rtti = {}
haxe.rtti.Infos = function() { }
haxe.rtti.Infos.__name__ = ["haxe","rtti","Infos"];
haxe.rtti.Infos.prototype.__class__ = haxe.rtti.Infos;
if(typeof kumite=='undefined') kumite = {}
if(!kumite.scene) kumite.scene = {}
kumite.scene.LayerLifecycle = function() { }
kumite.scene.LayerLifecycle.__name__ = ["kumite","scene","LayerLifecycle"];
kumite.scene.LayerLifecycle.prototype.layerId = null;
kumite.scene.LayerLifecycle.prototype.init = null;
kumite.scene.LayerLifecycle.prototype.render = null;
kumite.scene.LayerLifecycle.prototype.renderTransition = null;
kumite.scene.LayerLifecycle.prototype.__class__ = kumite.scene.LayerLifecycle;
if(!kumite.testscene) kumite.testscene = {}
kumite.testscene.TestBackgroundLayer = function(p) { if( p === $_ ) return; {
	$s.push("kumite.testscene.TestBackgroundLayer::new");
	var $spos = $s.length;
	this.layerId = "TestBackgroundLayer";
	this.color = new Color(1,1,1,0.2);
	this.transition = 1;
	this.direction = 1;
	$s.pop();
}}
kumite.testscene.TestBackgroundLayer.__name__ = ["kumite","testscene","TestBackgroundLayer"];
kumite.testscene.TestBackgroundLayer.prototype.stage = null;
kumite.testscene.TestBackgroundLayer.prototype.time = null;
kumite.testscene.TestBackgroundLayer.prototype.layerId = null;
kumite.testscene.TestBackgroundLayer.prototype.color = null;
kumite.testscene.TestBackgroundLayer.prototype.direction = null;
kumite.testscene.TestBackgroundLayer.prototype.transition = null;
kumite.testscene.TestBackgroundLayer.prototype.shaderProgram = null;
kumite.testscene.TestBackgroundLayer.prototype.vertexPositionAttribute = null;
kumite.testscene.TestBackgroundLayer.prototype.vertexBuffer = null;
kumite.testscene.TestBackgroundLayer.prototype.projectionMatrixUniform = null;
kumite.testscene.TestBackgroundLayer.prototype.worldViewMatrixUniform = null;
kumite.testscene.TestBackgroundLayer.prototype.colorUniform = null;
kumite.testscene.TestBackgroundLayer.prototype.init = function() {
	$s.push("kumite.testscene.TestBackgroundLayer::init");
	var $spos = $s.length;
	this.shaderProgram = GL.createProgram(kumite.helloworldgl.shader.Vertex,kumite.helloworldgl.shader.Fragment);
	this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
	this.vertexPositionAttribute.updateBuffer(new Int8Array([0,0,1,0,0,1,1,1]));
	this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
	this.worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
	this.colorUniform = GL.getUniformLocation("color");
	$s.pop();
}
kumite.testscene.TestBackgroundLayer.prototype.renderTransition = function(transitionContext) {
	$s.push("kumite.testscene.TestBackgroundLayer::renderTransition");
	var $spos = $s.length;
	this.transition = transitionContext.transition;
	this.render();
	$s.pop();
}
kumite.testscene.TestBackgroundLayer.prototype.render = function() {
	$s.push("kumite.testscene.TestBackgroundLayer::render");
	var $spos = $s.length;
	GL.useProgram(this.shaderProgram);
	GL.gl.viewport(0,0,this.stage.width,this.stage.height);
	GL.gl.disable(2929);
	GL.gl.enable(3042);
	GL.gl.blendFunc(770,771);
	var projectionMatrix = new Matrix4();
	projectionMatrix.ortho(0,this.stage.width,this.stage.height,0,0,1);
	GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,projectionMatrix.buffer);
	this.vertexPositionAttribute.vertexAttribPointer();
	var worldViewMatrix = new Matrix4();
	worldViewMatrix.appendScale(this.stage.width,this.stage.height,1);
	worldViewMatrix.appendTranslation(this.direction * (1 - this.transition),0,0);
	GL.gl.uniformMatrix4fv(this.worldViewMatrixUniform.location,false,worldViewMatrix.buffer);
	var colorWithTransition = this.color.clone();
	GL.gl.uniform4f(this.colorUniform.location,colorWithTransition.r,colorWithTransition.g,colorWithTransition.b,colorWithTransition.a);
	this.vertexPositionAttribute.drawArrays(5);
	$s.pop();
}
kumite.testscene.TestBackgroundLayer.prototype.__class__ = kumite.testscene.TestBackgroundLayer;
kumite.testscene.TestBackgroundLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
kumite.scene.Layer = function(p) { if( p === $_ ) return; {
	$s.push("kumite.scene.Layer::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.scene.Layer.__name__ = ["kumite","scene","Layer"];
kumite.scene.Layer.prototype.layerId = null;
kumite.scene.Layer.prototype.state = null;
kumite.scene.Layer.prototype.init = function() {
	$s.push("kumite.scene.Layer::init");
	var $spos = $s.length;
	null;
	$s.pop();
}
kumite.scene.Layer.prototype.render = function() {
	$s.push("kumite.scene.Layer::render");
	var $spos = $s.length;
	null;
	$s.pop();
}
kumite.scene.Layer.prototype.renderTransition = function(transitionContext) {
	$s.push("kumite.scene.Layer::renderTransition");
	var $spos = $s.length;
	null;
	$s.pop();
}
kumite.scene.Layer.prototype.__class__ = kumite.scene.Layer;
kumite.scene.Layer.__interfaces__ = [kumite.scene.LayerLifecycle];
kumite.scene.DelegateLayer = function(lifecycle) { if( lifecycle === $_ ) return; {
	$s.push("kumite.scene.DelegateLayer::new");
	var $spos = $s.length;
	kumite.scene.Layer.call(this);
	this.lifecycle = lifecycle;
	this.layerId = lifecycle.layerId;
	$s.pop();
}}
kumite.scene.DelegateLayer.__name__ = ["kumite","scene","DelegateLayer"];
kumite.scene.DelegateLayer.__super__ = kumite.scene.Layer;
for(var k in kumite.scene.Layer.prototype ) kumite.scene.DelegateLayer.prototype[k] = kumite.scene.Layer.prototype[k];
kumite.scene.DelegateLayer.prototype.lifecycle = null;
kumite.scene.DelegateLayer.prototype.init = function() {
	$s.push("kumite.scene.DelegateLayer::init");
	var $spos = $s.length;
	try {
		this.lifecycle.init();
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				{
					Log.posInfo = { fileName : "DelegateLayer.hx", lineNumber : 23, className : "kumite.scene.DelegateLayer", methodName : "init"};
					if(Log.filter(LogLevel.ERROR)) {
						Log.fetchInput("Error initializing layer:",this.layerId,e,null,null,null,null);
						console.error(Log.createMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
					}
				}
			}
		}
	}
	$s.pop();
}
kumite.scene.DelegateLayer.prototype.render = function() {
	$s.push("kumite.scene.DelegateLayer::render");
	var $spos = $s.length;
	try {
		this.lifecycle.render();
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				{
					Log.posInfo = { fileName : "DelegateLayer.hx", lineNumber : 35, className : "kumite.scene.DelegateLayer", methodName : "render"};
					if(Log.filter(LogLevel.ERROR)) {
						Log.fetchInput("Error rendering layer:",this.layerId,e,null,null,null,null);
						console.error(Log.createMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
					}
				}
			}
		}
	}
	$s.pop();
}
kumite.scene.DelegateLayer.prototype.renderTransition = function(transitionContext) {
	$s.push("kumite.scene.DelegateLayer::renderTransition");
	var $spos = $s.length;
	try {
		this.lifecycle.renderTransition(transitionContext);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				{
					Log.posInfo = { fileName : "DelegateLayer.hx", lineNumber : 47, className : "kumite.scene.DelegateLayer", methodName : "renderTransition"};
					if(Log.filter(LogLevel.ERROR)) {
						Log.fetchInput("Error rendering layer:",this.layerId,e,null,null,null,null);
						console.error(Log.createMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
					}
				}
			}
		}
	}
	$s.pop();
}
kumite.scene.DelegateLayer.prototype.__class__ = kumite.scene.DelegateLayer;
GLDisplayObject = function(p) { if( p === $_ ) return; {
	$s.push("GLDisplayObject::new");
	var $spos = $s.length;
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
	$s.pop();
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
	$s.push("GLDisplayObject::validateTransform");
	var $spos = $s.length;
	if(this.transformIsInvalid) {
		this.graphic.setWidth(this.width);
		this.graphic.setHeight(this.height);
		this.transformIsInvalid = false;
		this.matrix.identity();
		this.matrix.appendTranslation(this.x,this.y,0);
		this.matrix.appendScale(this.scaleX,this.scaleY,1);
	}
	$s.pop();
}
GLDisplayObject.prototype.validateGraphics = function() {
	$s.push("GLDisplayObject::validateGraphics");
	var $spos = $s.length;
	this.setGraphicIsInvalid(false);
	$s.pop();
}
GLDisplayObject.prototype.toString = function() {
	$s.push("GLDisplayObject::toString");
	var $spos = $s.length;
	{
		var $tmp = "DisplayObject: " + this.id;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GLDisplayObject.prototype.setX = function(value) {
	$s.push("GLDisplayObject::setX");
	var $spos = $s.length;
	if(this.x != value) {
		this.x = value;
		this.transformIsInvalid = true;
	}
	{
		$s.pop();
		return value;
	}
	$s.pop();
}
GLDisplayObject.prototype.setY = function(value) {
	$s.push("GLDisplayObject::setY");
	var $spos = $s.length;
	if(this.y != value) {
		this.y = value;
		this.transformIsInvalid = true;
	}
	{
		$s.pop();
		return value;
	}
	$s.pop();
}
GLDisplayObject.prototype.setScaleX = function(value) {
	$s.push("GLDisplayObject::setScaleX");
	var $spos = $s.length;
	if(this.scaleX != value) {
		this.scaleX = value;
		this.transformIsInvalid = true;
	}
	{
		$s.pop();
		return value;
	}
	$s.pop();
}
GLDisplayObject.prototype.setScaleY = function(value) {
	$s.push("GLDisplayObject::setScaleY");
	var $spos = $s.length;
	if(this.scaleY != value) {
		this.scaleY = value;
		this.transformIsInvalid = true;
	}
	{
		$s.pop();
		return value;
	}
	$s.pop();
}
GLDisplayObject.prototype.setWidth = function(value) {
	$s.push("GLDisplayObject::setWidth");
	var $spos = $s.length;
	if(this.width != value) {
		this.width = value;
		this.graphic.setWidth(this.width);
		this.transformIsInvalid = true;
	}
	{
		$s.pop();
		return value;
	}
	$s.pop();
}
GLDisplayObject.prototype.setHeight = function(value) {
	$s.push("GLDisplayObject::setHeight");
	var $spos = $s.length;
	if(this.height != value) {
		this.height = value;
		this.graphic.setHeight(this.height);
		this.transformIsInvalid = true;
	}
	{
		$s.pop();
		return value;
	}
	$s.pop();
}
GLDisplayObject.prototype.getGraphicIsInvalid = function() {
	$s.push("GLDisplayObject::getGraphicIsInvalid");
	var $spos = $s.length;
	{
		var $tmp = this.graphic.isInvalid;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GLDisplayObject.prototype.setGraphicIsInvalid = function(value) {
	$s.push("GLDisplayObject::setGraphicIsInvalid");
	var $spos = $s.length;
	this.graphic.isInvalid = value;
	{
		$s.pop();
		return value;
	}
	$s.pop();
}
GLDisplayObject.prototype.__class__ = GLDisplayObject;
GLInteractiveObject = function(p) { if( p === $_ ) return; {
	$s.push("GLInteractiveObject::new");
	var $spos = $s.length;
	this.hitarea = new GLHitarea();
	this.hitarea.position.x = 0;
	this.hitarea.position.y = 0;
	GLDisplayObject.call(this);
	GLDisplayList.getDefault().initInteractiveObject(this);
	$s.pop();
}}
GLInteractiveObject.__name__ = ["GLInteractiveObject"];
GLInteractiveObject.__super__ = GLDisplayObject;
for(var k in GLDisplayObject.prototype ) GLInteractiveObject.prototype[k] = GLDisplayObject.prototype[k];
GLInteractiveObject.prototype.hitarea = null;
GLInteractiveObject.prototype.mouseDownSignaler = null;
GLInteractiveObject.prototype.setWidth = function(value) {
	$s.push("GLInteractiveObject::setWidth");
	var $spos = $s.length;
	var result = GLDisplayObject.prototype.setWidth.call(this,value);
	this.hitarea.size.x = result;
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
GLInteractiveObject.prototype.setHeight = function(value) {
	$s.push("GLInteractiveObject::setHeight");
	var $spos = $s.length;
	var result = GLDisplayObject.prototype.setHeight.call(this,value);
	this.hitarea.size.y = result;
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
GLInteractiveObject.prototype.__class__ = GLInteractiveObject;
haxe.rtti.XmlParser = function(p) { if( p === $_ ) return; {
	$s.push("haxe.rtti.XmlParser::new");
	var $spos = $s.length;
	this.root = new Array();
	$s.pop();
}}
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
		if(n1 > n2) {
			$s.pop();
			return 1;
		}
		{
			$s.pop();
			return -1;
		}
		$s.pop();
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
		{
			$s.pop();
			return -1;
		}
		$s.pop();
	});
	{
		var $tmp = Lambda.list(a);
		$s.pop();
		return $tmp;
	}
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
		{
			$s.pop();
			return true;
		}
	}
	{
		$s.pop();
		return false;
	}
	$s.pop();
}
haxe.rtti.XmlParser.prototype.mergeFields = function(f,f2) {
	$s.push("haxe.rtti.XmlParser::mergeFields");
	var $spos = $s.length;
	{
		var $tmp = haxe.rtti.TypeApi.fieldEq(f,f2) || f.name == f2.name && (this.mergeRights(f,f2) || this.mergeRights(f2,f)) && haxe.rtti.TypeApi.fieldEq(f,f2);
		$s.pop();
		return $tmp;
	}
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
	{
		$s.pop();
		return true;
	}
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
		if(found == null) {
			$s.pop();
			return false;
		}
		if(this.curplatform != null) found.platforms.add(this.curplatform);
	}
	}}
	{
		$s.pop();
		return true;
	}
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
	{
		$s.pop();
		return true;
	}
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
					{
						$e = [];
						while($s.length >= $spos) $e.unshift($s.pop());
						$s.push($e[0]);
						continue;
					}
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
						if(this.mergeClasses(c,c2)) {
							$s.pop();
							return;
						}
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
						if(this.mergeEnums(e,e2)) {
							$s.pop();
							return;
						}
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
						if(this.mergeTypedefs(td,td2)) {
							$s.pop();
							return;
						}
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
	$s.pop();
}
haxe.rtti.XmlParser.prototype.mkPath = function(p) {
	$s.push("haxe.rtti.XmlParser::mkPath");
	var $spos = $s.length;
	{
		$s.pop();
		return p;
	}
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
	{
		$s.pop();
		return pl;
	}
	$s.pop();
}
haxe.rtti.XmlParser.prototype.mkRights = function(r) {
	$s.push("haxe.rtti.XmlParser::mkRights");
	var $spos = $s.length;
	{
		var $tmp = (function($this) {
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
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xerror = function(c) {
	$s.push("haxe.rtti.XmlParser::xerror");
	var $spos = $s.length;
	{
		var $tmp = (function($this) {
			var $r;
			throw "Invalid " + c.getName();
			return $r;
		}(this));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xroot = function(x) {
	$s.push("haxe.rtti.XmlParser::xroot");
	var $spos = $s.length;
	{ var $it0 = x.x.elements();
	while( $it0.hasNext() ) { var c = $it0.next();
	this.merge(this.processElement(c));
	}}
	$s.pop();
}
haxe.rtti.XmlParser.prototype.processElement = function(x) {
	$s.push("haxe.rtti.XmlParser::processElement");
	var $spos = $s.length;
	var c = new haxe.xml.Fast(x);
	{
		var $tmp = (function($this) {
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
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xpath = function(x) {
	$s.push("haxe.rtti.XmlParser::xpath");
	var $spos = $s.length;
	var path = this.mkPath(x.att.resolve("path"));
	var params = new List();
	{ var $it0 = x.getElements();
	while( $it0.hasNext() ) { var c = $it0.next();
	params.add(this.xtype(c));
	}}
	{
		var $tmp = { path : path, params : params};
		$s.pop();
		return $tmp;
	}
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
	{
		var $tmp = { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), isInterface : x.x.exists("interface"), params : this.mkTypeParams(x.att.resolve("params")), superClass : csuper, interfaces : interfaces, fields : fields, statics : statics, tdynamic : tdynamic, platforms : this.defplat()};
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xclassfield = function(x) {
	$s.push("haxe.rtti.XmlParser::xclassfield");
	var $spos = $s.length;
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
	{
		var $tmp = { name : x.getName(), type : t, isPublic : x.x.exists("public"), isOverride : x.x.exists("override"), doc : doc, get : x.has.resolve("get")?this.mkRights(x.att.resolve("get")):haxe.rtti.Rights.RNormal, set : x.has.resolve("set")?this.mkRights(x.att.resolve("set")):haxe.rtti.Rights.RNormal, params : x.has.resolve("params")?this.mkTypeParams(x.att.resolve("params")):null, platforms : this.defplat()};
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xenum = function(x) {
	$s.push("haxe.rtti.XmlParser::xenum");
	var $spos = $s.length;
	var cl = new List();
	var doc = null;
	{ var $it0 = x.getElements();
	while( $it0.hasNext() ) { var c = $it0.next();
	if(c.getName() == "haxe_doc") doc = c.getInnerData();
	else cl.add(this.xenumfield(c));
	}}
	{
		var $tmp = { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), params : this.mkTypeParams(x.att.resolve("params")), constructors : cl, platforms : this.defplat()};
		$s.pop();
		return $tmp;
	}
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
	{
		var $tmp = { name : x.getName(), args : args, doc : xdoc == null?null:new haxe.xml.Fast(xdoc).getInnerData(), platforms : this.defplat()};
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xtypedef = function(x) {
	$s.push("haxe.rtti.XmlParser::xtypedef");
	var $spos = $s.length;
	var doc = null;
	var t = null;
	{ var $it0 = x.getElements();
	while( $it0.hasNext() ) { var c = $it0.next();
	if(c.getName() == "haxe_doc") doc = c.getInnerData();
	else t = this.xtype(c);
	}}
	var types = new Hash();
	if(this.curplatform != null) types.set(this.curplatform,t);
	{
		var $tmp = { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), params : this.mkTypeParams(x.att.resolve("params")), type : t, types : types, platforms : this.defplat()};
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xtype = function(x) {
	$s.push("haxe.rtti.XmlParser::xtype");
	var $spos = $s.length;
	{
		var $tmp = (function($this) {
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
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.rtti.XmlParser.prototype.xtypeparams = function(x) {
	$s.push("haxe.rtti.XmlParser::xtypeparams");
	var $spos = $s.length;
	var p = new List();
	{ var $it0 = x.getElements();
	while( $it0.hasNext() ) { var c = $it0.next();
	p.add(this.xtype(c));
	}}
	{
		$s.pop();
		return p;
	}
	$s.pop();
}
haxe.rtti.XmlParser.prototype.defplat = function() {
	$s.push("haxe.rtti.XmlParser::defplat");
	var $spos = $s.length;
	var l = new List();
	if(this.curplatform != null) l.add(this.curplatform);
	{
		$s.pop();
		return l;
	}
	$s.pop();
}
haxe.rtti.XmlParser.prototype.__class__ = haxe.rtti.XmlParser;
Log = function() { }
Log.__name__ = ["Log"];
Log.posInfo = null;
Log["debugger"] = function() {
	$s.push("Log::debugger");
	var $spos = $s.length;
	debugger;
	$s.pop();
}
Log.init = function() {
	$s.push("Log::init");
	var $spos = $s.length;
	{
		if(!window.console) console = { };
		console.info = console.info || function() {
			$s.push("Log::init@17");
			var $spos = $s.length;
			null;
			$s.pop();
		}
		console.warn = console.warn || function() {
			$s.push("Log::init@18");
			var $spos = $s.length;
			null;
			$s.pop();
		}
		console.error = console.error || function() {
			$s.push("Log::init@19");
			var $spos = $s.length;
			null;
			$s.pop();
		}
	}
	haxe.Log.trace = $closure(Log,"infoConsole");
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
		console.error(Log.createMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
	}
	$s.pop();
}
Log.infoEnabled = function(i) {
	$s.push("Log::infoEnabled");
	var $spos = $s.length;
	Log.posInfo = i;
	{
		var $tmp = Log.filter(LogLevel.INFO);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Log.warnEnabled = function(i) {
	$s.push("Log::warnEnabled");
	var $spos = $s.length;
	Log.posInfo = i;
	{
		var $tmp = Log.filter(LogLevel.WARN);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Log.errorEnabled = function(i) {
	$s.push("Log::errorEnabled");
	var $spos = $s.length;
	Log.posInfo = i;
	{
		var $tmp = Log.filter(LogLevel.ERROR);
		$s.pop();
		return $tmp;
	}
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
	var from = Log.posInfo.className + "." + Log.posInfo.methodName;
	{
		var $tmp = "[" + from + "] " + Log.args.join(" ");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Log.filter = function(level) {
	$s.push("Log::filter");
	var $spos = $s.length;
	var result = true;
	{
		var _g = 0, _g1 = Log.filters;
		while(_g < _g1.length) {
			var filter = _g1[_g];
			++_g;
			result = filter.enabled(result,Log.posInfo,level);
		}
	}
	{
		$s.pop();
		return result;
	}
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
Log.prototype.__class__ = Log;
GLDisplayListRenderer = function(p) { if( p === $_ ) return; {
	$s.push("GLDisplayListRenderer::new");
	var $spos = $s.length;
	this.textures = new IntHash();
	$s.pop();
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
	$s.push("GLDisplayListRenderer::init");
	var $spos = $s.length;
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
	$s.pop();
}
GLDisplayListRenderer.prototype.render = function(width,height) {
	$s.push("GLDisplayListRenderer::render");
	var $spos = $s.length;
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
	projectionMatrix.ortho(0,width,height,0,0,1);
	gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,projectionMatrix.buffer);
	var stage = GLDisplayList.getDefault().stage;
	gl.activeTexture(gl.TEXTURE0);
	gl.uniform1i(this.textureUniform.location,0);
	this.renderRecursive(stage,new Matrix4());
	gl.disable(gl.BLEND);
	$s.pop();
}
GLDisplayListRenderer.prototype.renderRecursive = function(displayObjectContainer,parentMatrix) {
	$s.push("GLDisplayListRenderer::renderRecursive");
	var $spos = $s.length;
	var _g = 0, _g1 = displayObjectContainer.children;
	while(_g < _g1.length) {
		var displayObject = _g1[_g];
		++_g;
		var matrix = this.renderDisplayObject(displayObject,parentMatrix);
		if(Std["is"](displayObject,GLDisplayObjectContainer)) {
			this.renderRecursive(displayObject,matrix);
		}
	}
	$s.pop();
}
GLDisplayListRenderer.prototype.renderDisplayObject = function(displayObject,parentMatrix) {
	$s.push("GLDisplayListRenderer::renderDisplayObject");
	var $spos = $s.length;
	var gl = GL.gl;
	displayObject.validateTransform();
	var result = new Matrix4();
	result.multiply(parentMatrix);
	result.multiply(displayObject.matrix);
	if(displayObject.skipDraw) {
		$s.pop();
		return result;
	}
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
	gl.uniform1f(this.alphaUniform.location,displayObject.alpha);
	gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
GLDisplayListRenderer.prototype.__class__ = GLDisplayListRenderer;
Color = function(r,g,b,a) { if( r === $_ ) return; {
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
}}
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
	{
		$s.pop();
		return this;
	}
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
	{
		var $tmp = "rgb(" + this.r * 255 + "," + this.g * 255 + "," + this.b * 255 + ")";
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Color.prototype.toContextRGBA = function() {
	$s.push("Color::toContextRGBA");
	var $spos = $s.length;
	{
		var $tmp = "rgba(" + Std["int"](this.r * 255) + "," + Std["int"](this.g * 255) + "," + Std["int"](this.b * 255) + "," + this.a + ")";
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Color.prototype.clone = function() {
	$s.push("Color::clone");
	var $spos = $s.length;
	{
		var $tmp = new Color(this.r,this.g,this.b,this.a);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Color.prototype.toString = function() {
	$s.push("Color::toString");
	var $spos = $s.length;
	{
		var $tmp = "Color: " + this.r + "," + this.g + "," + this.b + "," + this.a;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Color.prototype.__class__ = Color;
List = function(p) { if( p === $_ ) return; {
	$s.push("List::new");
	var $spos = $s.length;
	this.length = 0;
	$s.pop();
}}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	$s.push("List::add");
	var $spos = $s.length;
	var x = [item];
	if(this.h == null) this.h = x;
	else this.q[1] = x;
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
	{
		var $tmp = this.h == null?null:this.h[0];
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
List.prototype.last = function() {
	$s.push("List::last");
	var $spos = $s.length;
	{
		var $tmp = this.q == null?null:this.q[0];
		$s.pop();
		return $tmp;
	}
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
	{
		$s.pop();
		return x;
	}
	$s.pop();
}
List.prototype.isEmpty = function() {
	$s.push("List::isEmpty");
	var $spos = $s.length;
	{
		var $tmp = this.h == null;
		$s.pop();
		return $tmp;
	}
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
			if(prev == null) this.h = l[1];
			else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			{
				$s.pop();
				return true;
			}
		}
		prev = l;
		l = l[1];
	}
	{
		$s.pop();
		return false;
	}
	$s.pop();
}
List.prototype.iterator = function() {
	$s.push("List::iterator");
	var $spos = $s.length;
	{
		var $tmp = { h : this.h, hasNext : function() {
			$s.push("List::iterator@155");
			var $spos = $s.length;
			{
				var $tmp = this.h != null;
				$s.pop();
				return $tmp;
			}
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
			{
				$s.pop();
				return x;
			}
			$s.pop();
		}};
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
List.prototype.toString = function() {
	$s.push("List::toString");
	var $spos = $s.length;
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
	{
		var $tmp = s.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
List.prototype.join = function(sep) {
	$s.push("List::join");
	var $spos = $s.length;
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = sep;
		s.b[s.b.length] = l[0];
		l = l[1];
	}
	{
		var $tmp = s.b.join("");
		$s.pop();
		return $tmp;
	}
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
	{
		$s.pop();
		return l2;
	}
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
	{
		$s.pop();
		return b;
	}
	$s.pop();
}
List.prototype.__class__ = List;
GLAttribLocation = function(p) { if( p === $_ ) return; {
	$s.push("GLAttribLocation::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
GLAttribLocation.__name__ = ["GLAttribLocation"];
GLAttribLocation.prototype.location = null;
GLAttribLocation.prototype.size = null;
GLAttribLocation.prototype.type = null;
GLAttribLocation.prototype.buffer = null;
GLAttribLocation.prototype.currentLength = null;
GLAttribLocation.prototype.updateBuffer = function(arrayBuffer) {
	$s.push("GLAttribLocation::updateBuffer");
	var $spos = $s.length;
	if(this.buffer != null) GL.gl.deleteBuffer(this.buffer);
	this.currentLength = arrayBuffer.byteLength;
	this.buffer = GL.createArrayBuffer(arrayBuffer);
	$s.pop();
}
GLAttribLocation.prototype.vertexAttribPointer = function() {
	$s.push("GLAttribLocation::vertexAttribPointer");
	var $spos = $s.length;
	GL.gl.bindBuffer(34962,this.buffer);
	GL.gl.enableVertexAttribArray(this.location);
	GL.gl.vertexAttribPointer(this.location,this.size,this.type,false,0,0);
	$s.pop();
}
GLAttribLocation.prototype.drawArrays = function(mode,first,count) {
	$s.push("GLAttribLocation::drawArrays");
	var $spos = $s.length;
	if(first == null) first = 0;
	if(count == null) {
		count = this.currentLength / this.size;
		if(this.type == 5126) count /= 4;
	}
	GL.gl.drawArrays(mode,first,count);
	$s.pop();
}
GLAttribLocation.prototype.__class__ = GLAttribLocation;
kumite.scene.Config = function(p) { if( p === $_ ) return; {
	$s.push("kumite.scene.Config::new");
	var $spos = $s.length;
	this.scenes = new kumite.scene.Scenes();
	this.sceneController = new kumite.scene.SceneController();
	$s.pop();
}}
kumite.scene.Config.__name__ = ["kumite","scene","Config"];
kumite.scene.Config.prototype.scenes = null;
kumite.scene.Config.prototype.sceneController = null;
kumite.scene.Config.prototype.__class__ = kumite.scene.Config;
kumite.scene.Config.__interfaces__ = [haxe.rtti.Infos];
IntIter = function(min,max) { if( min === $_ ) return; {
	$s.push("IntIter::new");
	var $spos = $s.length;
	this.min = min;
	this.max = max;
	$s.pop();
}}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	$s.push("IntIter::hasNext");
	var $spos = $s.length;
	{
		var $tmp = this.min < this.max;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
IntIter.prototype.next = function() {
	$s.push("IntIter::next");
	var $spos = $s.length;
	{
		var $tmp = this.min++;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
IntIter.prototype.__class__ = IntIter;
if(!kumite.canvas) kumite.canvas = {}
kumite.canvas.CanvasCase = function(p) { if( p === $_ ) return; {
	$s.push("kumite.canvas.CanvasCase::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.canvas.CanvasCase.__name__ = ["kumite","canvas","CanvasCase"];
kumite.canvas.CanvasCase.prototype.itself = null;
kumite.canvas.CanvasCase.prototype.__class__ = kumite.canvas.CanvasCase;
if(!kumite.stage) kumite.stage = {}
kumite.stage.Config = function(p) { if( p === $_ ) return; {
	$s.push("kumite.stage.Config::new");
	var $spos = $s.length;
	this.stage = new kumite.stage.Stage();
	this.stageResizeAction = new kumite.stage.StageResizeAction();
	$s.pop();
}}
kumite.stage.Config.__name__ = ["kumite","stage","Config"];
kumite.stage.Config.prototype.stage = null;
kumite.stage.Config.prototype.stageResizeAction = null;
kumite.stage.Config.prototype.__class__ = kumite.stage.Config;
kumite.stage.Config.__interfaces__ = [haxe.rtti.Infos];
Matrix4 = function(cloneFrom) { if( cloneFrom === $_ ) return; {
	$s.push("Matrix4::new");
	var $spos = $s.length;
	this.buffer = new Float32Array(16);
	if(cloneFrom != null) {
		this.setFrom(cloneFrom);
	}
	else {
		this.identity();
	}
	$s.pop();
}}
Matrix4.__name__ = ["Matrix4"];
Matrix4.createTranslation = function(x,y,z) {
	$s.push("Matrix4::createTranslation");
	var $spos = $s.length;
	var result = new Matrix4();
	result.buffer[0] = 1;
	result.buffer[1] = 0;
	result.buffer[2] = 0;
	result.buffer[3] = 0;
	result.buffer[4] = 0;
	result.buffer[5] = 1;
	result.buffer[6] = 0;
	result.buffer[7] = 0;
	result.buffer[8] = 0;
	result.buffer[9] = 0;
	result.buffer[10] = 1;
	result.buffer[11] = 0;
	result.buffer[12] = x;
	result.buffer[13] = y;
	result.buffer[14] = z;
	result.buffer[15] = 1;
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
Matrix4.prototype.buffer = null;
Matrix4.prototype.identity = function() {
	$s.push("Matrix4::identity");
	var $spos = $s.length;
	this.buffer[0] = 1;
	this.buffer[1] = 0;
	this.buffer[2] = 0;
	this.buffer[3] = 0;
	this.buffer[4] = 0;
	this.buffer[5] = 1;
	this.buffer[6] = 0;
	this.buffer[7] = 0;
	this.buffer[8] = 0;
	this.buffer[9] = 0;
	this.buffer[10] = 1;
	this.buffer[11] = 0;
	this.buffer[12] = 0;
	this.buffer[13] = 0;
	this.buffer[14] = 0;
	this.buffer[15] = 1;
	$s.pop();
}
Matrix4.prototype.setFrom = function(from) {
	$s.push("Matrix4::setFrom");
	var $spos = $s.length;
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
	this.buffer[10] = from.buffer[10];
	this.buffer[11] = from.buffer[11];
	this.buffer[12] = from.buffer[12];
	this.buffer[13] = from.buffer[13];
	this.buffer[14] = from.buffer[14];
	this.buffer[15] = from.buffer[15];
	$s.pop();
}
Matrix4.prototype.lookAt = function(eye,center,up) {
	$s.push("Matrix4::lookAt");
	var $spos = $s.length;
	var eyex = eye.x, eyey = eye.y, eyez = eye.z, upx = up.x, upy = up.y, upz = up.z, centerx = center.x, centery = center.y, centerz = center.z;
	if(eyex == centerx && eyey == centery && eyez == centerz) {
		this.identity();
	}
	var z0, z1, z2, x0, x1, x2, y0, y1, y2, len;
	z0 = eyex - center.x;
	z1 = eyey - center.y;
	z2 = eyez - center.z;
	len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
	z0 *= len;
	z1 *= len;
	z2 *= len;
	x0 = upy * z2 - upz * z1;
	x1 = upz * z0 - upx * z2;
	x2 = upx * z1 - upy * z0;
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
	y0 = z1 * x2 - z2 * x1;
	y1 = z2 * x0 - z0 * x2;
	y2 = z0 * x1 - z1 * x0;
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
	this.buffer[6] = z1;
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
Matrix4.prototype.ortho = function(left,right,bottom,top,near,far) {
	$s.push("Matrix4::ortho");
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
Matrix4.prototype.perspective = function(fovy,aspect,near,far) {
	$s.push("Matrix4::perspective");
	var $spos = $s.length;
	var top = near * Math.tan(fovy * Math.PI / 360.0);
	var right = top * aspect;
	this.frustum(-right,right,-top,top,near,far);
	$s.pop();
}
Matrix4.prototype.frustum = function(left,right,bottom,top,near,far) {
	$s.push("Matrix4::frustum");
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
Matrix4.prototype.appendTranslation = function(x,y,z) {
	$s.push("Matrix4::appendTranslation");
	var $spos = $s.length;
	var m = Matrix4.createTranslation(x,y,z);
	this.multiply(m);
	$s.pop();
}
Matrix4.prototype.appendScale = function(x,y,z) {
	$s.push("Matrix4::appendScale");
	var $spos = $s.length;
	this.buffer[0] = this.buffer[0] * x;
	this.buffer[1] = this.buffer[1] * x;
	this.buffer[2] = this.buffer[2] * x;
	this.buffer[3] = this.buffer[3] * x;
	this.buffer[4] = this.buffer[4] * y;
	this.buffer[5] = this.buffer[5] * y;
	this.buffer[6] = this.buffer[6] * y;
	this.buffer[7] = this.buffer[7] * y;
	this.buffer[8] = this.buffer[8] * z;
	this.buffer[9] = this.buffer[9] * z;
	this.buffer[10] = this.buffer[10] * z;
	this.buffer[11] = this.buffer[11] * z;
	this.buffer[12] = this.buffer[12];
	this.buffer[13] = this.buffer[13];
	this.buffer[14] = this.buffer[14];
	this.buffer[15] = this.buffer[15];
	$s.pop();
}
Matrix4.prototype.appendRotation = function(angle,axis) {
	$s.push("Matrix4::appendRotation");
	var $spos = $s.length;
	var x = axis.x, y = axis.y, z = axis.y;
	var len = Math.sqrt(x * x + y * y + z * z);
	len = 1 / len;
	x *= len;
	y *= len;
	z *= len;
	var s = Math.sin(angle);
	var c = Math.cos(angle);
	var t = 1 - c;
	var a00 = this.buffer[0], a01 = this.buffer[1], a02 = this.buffer[2], a03 = this.buffer[3];
	var a10 = this.buffer[4], a11 = this.buffer[5], a12 = this.buffer[6], a13 = this.buffer[7];
	var a20 = this.buffer[8], a21 = this.buffer[9], a22 = this.buffer[10], a23 = this.buffer[11];
	var b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s;
	var b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s;
	var b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;
	this.buffer[0] = a00 * b00 + a10 * b01 + a20 * b02;
	this.buffer[1] = a01 * b00 + a11 * b01 + a21 * b02;
	this.buffer[2] = a02 * b00 + a12 * b01 + a22 * b02;
	this.buffer[3] = a03 * b00 + a13 * b01 + a23 * b02;
	this.buffer[4] = a00 * b10 + a10 * b11 + a20 * b12;
	this.buffer[5] = a01 * b10 + a11 * b11 + a21 * b12;
	this.buffer[6] = a02 * b10 + a12 * b11 + a22 * b12;
	this.buffer[7] = a03 * b10 + a13 * b11 + a23 * b12;
	this.buffer[8] = a00 * b20 + a10 * b21 + a20 * b22;
	this.buffer[9] = a01 * b20 + a11 * b21 + a21 * b22;
	this.buffer[10] = a02 * b20 + a12 * b21 + a22 * b22;
	this.buffer[11] = a03 * b20 + a13 * b21 + a23 * b22;
	$s.pop();
}
Matrix4.prototype.rotateEuler = function(heading,attitude,bank) {
	$s.push("Matrix4::rotateEuler");
	var $spos = $s.length;
	this.identity();
	var ch = Math.cos(heading);
	var sh = Math.sin(heading);
	var ca = Math.cos(attitude);
	var sa = Math.sin(attitude);
	var cb = Math.cos(bank);
	var sb = Math.sin(bank);
	this.buffer[0] = ch * ca;
	this.buffer[1] = sh * sb - ch * sa * cb;
	this.buffer[2] = ch * sa * sb + sh * cb;
	this.buffer[4] = sa;
	this.buffer[5] = ca * cb;
	this.buffer[6] = -ca * sb;
	this.buffer[8] = -sh * ca;
	this.buffer[9] = sh * sa * cb + ch * sb;
	this.buffer[10] = -sh * sa * sb + ch * cb;
	$s.pop();
}
Matrix4.prototype.appendEulerRotation = function(heading,attitude,bank) {
	$s.push("Matrix4::appendEulerRotation");
	var $spos = $s.length;
	var mEuler = new Matrix4();
	mEuler.rotateEuler(heading,attitude,bank);
	this.multiply(mEuler);
	$s.pop();
}
Matrix4.prototype.inverse = function() {
	$s.push("Matrix4::inverse");
	var $spos = $s.length;
	var a00 = this.buffer[0], a01 = this.buffer[1], a02 = this.buffer[2], a03 = this.buffer[3];
	var a10 = this.buffer[4], a11 = this.buffer[5], a12 = this.buffer[6], a13 = this.buffer[7];
	var a20 = this.buffer[8], a21 = this.buffer[9], a22 = this.buffer[10], a23 = this.buffer[11];
	var a30 = this.buffer[12], a31 = this.buffer[13], a32 = this.buffer[14], a33 = this.buffer[15];
	var b00 = a00 * a11 - a01 * a10;
	var b01 = a00 * a12 - a02 * a10;
	var b02 = a00 * a13 - a03 * a10;
	var b03 = a01 * a12 - a02 * a11;
	var b04 = a01 * a13 - a03 * a11;
	var b05 = a02 * a13 - a03 * a12;
	var b06 = a20 * a31 - a21 * a30;
	var b07 = a20 * a32 - a22 * a30;
	var b08 = a20 * a33 - a23 * a30;
	var b09 = a21 * a32 - a22 * a31;
	var b10 = a21 * a33 - a23 * a31;
	var b11 = a22 * a33 - a23 * a32;
	var invDet = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
	this.buffer[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
	this.buffer[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
	this.buffer[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
	this.buffer[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
	this.buffer[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
	this.buffer[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
	this.buffer[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
	this.buffer[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
	this.buffer[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
	this.buffer[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
	this.buffer[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
	this.buffer[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
	this.buffer[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
	this.buffer[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
	this.buffer[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
	this.buffer[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
	$s.pop();
}
Matrix4.prototype.multiply = function(mat2) {
	$s.push("Matrix4::multiply");
	var $spos = $s.length;
	var a00 = this.buffer[0], a01 = this.buffer[1], a02 = this.buffer[2], a03 = this.buffer[3];
	var a10 = this.buffer[4], a11 = this.buffer[5], a12 = this.buffer[6], a13 = this.buffer[7];
	var a20 = this.buffer[8], a21 = this.buffer[9], a22 = this.buffer[10], a23 = this.buffer[11];
	var a30 = this.buffer[12], a31 = this.buffer[13], a32 = this.buffer[14], a33 = this.buffer[15];
	var b00 = mat2.buffer[0], b01 = mat2.buffer[1], b02 = mat2.buffer[2], b03 = mat2.buffer[3];
	var b10 = mat2.buffer[4], b11 = mat2.buffer[5], b12 = mat2.buffer[6], b13 = mat2.buffer[7];
	var b20 = mat2.buffer[8], b21 = mat2.buffer[9], b22 = mat2.buffer[10], b23 = mat2.buffer[11];
	var b30 = mat2.buffer[12], b31 = mat2.buffer[13], b32 = mat2.buffer[14], b33 = mat2.buffer[15];
	this.buffer[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
	this.buffer[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
	this.buffer[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
	this.buffer[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
	this.buffer[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
	this.buffer[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
	this.buffer[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
	this.buffer[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
	this.buffer[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
	this.buffer[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
	this.buffer[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
	this.buffer[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
	this.buffer[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
	this.buffer[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
	this.buffer[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
	this.buffer[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
	$s.pop();
}
Matrix4.prototype.toInverseMatrix3 = function() {
	$s.push("Matrix4::toInverseMatrix3");
	var $spos = $s.length;
	var a00 = this.buffer[0], a01 = this.buffer[1], a02 = this.buffer[2];
	var a10 = this.buffer[4], a11 = this.buffer[5], a12 = this.buffer[6];
	var a20 = this.buffer[8], a21 = this.buffer[9], a22 = this.buffer[10];
	var b01 = a22 * a11 - a12 * a21;
	var b11 = -a22 * a10 + a12 * a20;
	var b21 = a21 * a10 - a11 * a20;
	var d = a00 * b01 + a01 * b11 + a02 * b21;
	if(d == null) {
		$s.pop();
		return null;
	}
	var id = 1 / d;
	var result = new Matrix3();
	result.buffer[0] = b01 * id;
	result.buffer[1] = (-a22 * a01 + a02 * a21) * id;
	result.buffer[2] = (a12 * a01 - a02 * a11) * id;
	result.buffer[3] = b11 * id;
	result.buffer[4] = (a22 * a00 - a02 * a20) * id;
	result.buffer[5] = (-a12 * a00 + a02 * a10) * id;
	result.buffer[6] = b21 * id;
	result.buffer[7] = (-a21 * a00 + a01 * a20) * id;
	result.buffer[8] = (a11 * a00 - a01 * a10) * id;
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
Matrix4.prototype.clone = function() {
	$s.push("Matrix4::clone");
	var $spos = $s.length;
	{
		var $tmp = new Matrix4(this);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Matrix4.prototype.toString = function() {
	$s.push("Matrix4::toString");
	var $spos = $s.length;
	var result = "Matrix4:";
	result += "\r\t" + this.buffer[0] + "," + this.buffer[1] + "," + this.buffer[2] + "," + this.buffer[3];
	result += "\r\t" + this.buffer[4] + "," + this.buffer[5] + "," + this.buffer[6] + "," + this.buffer[7];
	result += "\r\t" + this.buffer[8] + "," + this.buffer[9] + "," + this.buffer[10] + "," + this.buffer[11];
	result += "\r\t" + this.buffer[12] + "," + this.buffer[13] + "," + this.buffer[14] + "," + this.buffer[15];
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
Matrix4.prototype.__class__ = Matrix4;
Hash = function(p) { if( p === $_ ) return; {
	$s.push("Hash::new");
	var $spos = $s.length;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
	$s.pop();
}}
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
	{
		var $tmp = this.h["$" + key];
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Hash.prototype.exists = function(key) {
	$s.push("Hash::exists");
	var $spos = $s.length;
	try {
		key = "$" + key;
		{
			var $tmp = this.hasOwnProperty.call(this.h,key);
			$s.pop();
			return $tmp;
		}
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				
				for(var i in this.h)
					if( i == key ) return true;
			;
				{
					$s.pop();
					return false;
				}
			}
		}
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
	{
		$s.pop();
		return true;
	}
	$s.pop();
}
Hash.prototype.keys = function() {
	$s.push("Hash::keys");
	var $spos = $s.length;
	var a = new Array();
	
			for(var i in this.h)
				a.push(i.substr(1));
		;
	{
		var $tmp = a.iterator();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Hash.prototype.iterator = function() {
	$s.push("Hash::iterator");
	var $spos = $s.length;
	{
		var $tmp = { ref : this.h, it : this.keys(), hasNext : function() {
			$s.push("Hash::iterator@81");
			var $spos = $s.length;
			{
				var $tmp = this.it.hasNext();
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}, next : function() {
			$s.push("Hash::iterator@82");
			var $spos = $s.length;
			var i = this.it.next();
			{
				var $tmp = this.ref["$" + i];
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}};
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Hash.prototype.toString = function() {
	$s.push("Hash::toString");
	var $spos = $s.length;
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
	{
		var $tmp = s.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Hash.prototype.__class__ = Hash;
GLDisplayObjectContainer = function(p) { if( p === $_ ) return; {
	$s.push("GLDisplayObjectContainer::new");
	var $spos = $s.length;
	GLDisplayObject.call(this);
	this.children = new Array();
	$s.pop();
}}
GLDisplayObjectContainer.__name__ = ["GLDisplayObjectContainer"];
GLDisplayObjectContainer.__super__ = GLDisplayObject;
for(var k in GLDisplayObject.prototype ) GLDisplayObjectContainer.prototype[k] = GLDisplayObject.prototype[k];
GLDisplayObjectContainer.prototype.children = null;
GLDisplayObjectContainer.prototype.addChild = function(child) {
	$s.push("GLDisplayObjectContainer::addChild");
	var $spos = $s.length;
	this.children.push(child);
	$s.pop();
}
GLDisplayObjectContainer.prototype.removeChild = function(child) {
	$s.push("GLDisplayObjectContainer::removeChild");
	var $spos = $s.length;
	this.children.remove(child);
	$s.pop();
}
GLDisplayObjectContainer.prototype.__class__ = GLDisplayObjectContainer;
GLStage = function(p) { if( p === $_ ) return; {
	$s.push("GLStage::new");
	var $spos = $s.length;
	GLDisplayObjectContainer.call(this);
	$s.pop();
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
kumite.scene.SceneLifecycle.prototype.render = null;
kumite.scene.SceneLifecycle.prototype.renderTransition = null;
kumite.scene.SceneLifecycle.prototype.__class__ = kumite.scene.SceneLifecycle;
kumite.testscene.TestScene4 = function(p) { if( p === $_ ) return; {
	$s.push("kumite.testscene.TestScene4::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.testscene.TestScene4.__name__ = ["kumite","testscene","TestScene4"];
kumite.testscene.TestScene4.prototype.testLayer2 = null;
kumite.testscene.TestScene4.prototype.testLayer3 = null;
kumite.testscene.TestScene4.prototype.displayList = null;
kumite.testscene.TestScene4.prototype.sceneInit = function(scene) {
	$s.push("kumite.testscene.TestScene4::sceneInit");
	var $spos = $s.length;
	scene.id = scene.name = "GREEN-BLUE";
	scene.addLayer(new kumite.scene.DelegateLayer(this.testLayer2));
	scene.addLayer(new kumite.scene.DelegateLayer(this.testLayer3));
	scene.addLayer(new kumite.scene.DelegateLayer(this.displayList));
	$s.pop();
}
kumite.testscene.TestScene4.prototype.renderTransition = function(transitionContext) {
	$s.push("kumite.testscene.TestScene4::renderTransition");
	var $spos = $s.length;
	this.render();
	$s.pop();
}
kumite.testscene.TestScene4.prototype.render = function() {
	$s.push("kumite.testscene.TestScene4::render");
	var $spos = $s.length;
	GL.gl.clearColor(0,0,0,1);
	GL.gl.clear(16640);
	$s.pop();
}
kumite.testscene.TestScene4.prototype.__class__ = kumite.testscene.TestScene4;
kumite.testscene.TestScene4.__interfaces__ = [haxe.rtti.Infos,kumite.scene.SceneLifecycle];
IntHash = function(p) { if( p === $_ ) return; {
	$s.push("IntHash::new");
	var $spos = $s.length;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
	$s.pop();
}}
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
	{
		var $tmp = this.h[key];
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
IntHash.prototype.exists = function(key) {
	$s.push("IntHash::exists");
	var $spos = $s.length;
	{
		var $tmp = this.h[key] != null;
		$s.pop();
		return $tmp;
	}
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
	{
		$s.pop();
		return true;
	}
	$s.pop();
}
IntHash.prototype.keys = function() {
	$s.push("IntHash::keys");
	var $spos = $s.length;
	var a = new Array();
	
			for( x in this.h )
				a.push(x);
		;
	{
		var $tmp = a.iterator();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
IntHash.prototype.iterator = function() {
	$s.push("IntHash::iterator");
	var $spos = $s.length;
	{
		var $tmp = { ref : this.h, it : this.keys(), hasNext : function() {
			$s.push("IntHash::iterator@69");
			var $spos = $s.length;
			{
				var $tmp = this.it.hasNext();
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}, next : function() {
			$s.push("IntHash::iterator@70");
			var $spos = $s.length;
			var i = this.it.next();
			{
				var $tmp = this.ref[i];
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}};
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
IntHash.prototype.toString = function() {
	$s.push("IntHash::toString");
	var $spos = $s.length;
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
	{
		var $tmp = s.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
IntHash.prototype.__class__ = IntHash;
kumite.testscene.TestScene3 = function(p) { if( p === $_ ) return; {
	$s.push("kumite.testscene.TestScene3::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.testscene.TestScene3.__name__ = ["kumite","testscene","TestScene3"];
kumite.testscene.TestScene3.prototype.testLayer1 = null;
kumite.testscene.TestScene3.prototype.testLayer3 = null;
kumite.testscene.TestScene3.prototype.displayList = null;
kumite.testscene.TestScene3.prototype.sceneInit = function(scene) {
	$s.push("kumite.testscene.TestScene3::sceneInit");
	var $spos = $s.length;
	scene.id = scene.name = "RED-BLUE";
	scene.addLayer(new kumite.scene.DelegateLayer(this.testLayer1));
	scene.addLayer(new kumite.scene.DelegateLayer(this.testLayer3));
	scene.addLayer(new kumite.scene.DelegateLayer(this.displayList));
	$s.pop();
}
kumite.testscene.TestScene3.prototype.renderTransition = function(transitionContext) {
	$s.push("kumite.testscene.TestScene3::renderTransition");
	var $spos = $s.length;
	this.render();
	$s.pop();
}
kumite.testscene.TestScene3.prototype.render = function() {
	$s.push("kumite.testscene.TestScene3::render");
	var $spos = $s.length;
	GL.gl.clearColor(0,0,0,1);
	GL.gl.clear(16640);
	$s.pop();
}
kumite.testscene.TestScene3.prototype.__class__ = kumite.testscene.TestScene3;
kumite.testscene.TestScene3.__interfaces__ = [haxe.rtti.Infos,kumite.scene.SceneLifecycle];
kumite.scene.LayerState = function(name) { if( name === $_ ) return; {
	$s.push("kumite.scene.LayerState::new");
	var $spos = $s.length;
	this.name = name;
	$s.pop();
}}
kumite.scene.LayerState.__name__ = ["kumite","scene","LayerState"];
kumite.scene.LayerState.prototype.name = null;
kumite.scene.LayerState.prototype.__class__ = kumite.scene.LayerState;
if(!kumite.mouse) kumite.mouse = {}
kumite.mouse.MouseController = function(p) { if( p === $_ ) return; {
	$s.push("kumite.mouse.MouseController::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.mouse.MouseController.__name__ = ["kumite","mouse","MouseController"];
kumite.mouse.MouseController.prototype.canvas = null;
kumite.mouse.MouseController.prototype.start = function() {
	$s.push("kumite.mouse.MouseController::start");
	var $spos = $s.length;
	GLMouseRegistry.getInstance().init(this.canvas.itself);
	$s.pop();
}
kumite.mouse.MouseController.prototype.__class__ = kumite.mouse.MouseController;
kumite.mouse.MouseController.__interfaces__ = [haxe.rtti.Infos];
kumite.testscene.TestScene2 = function(p) { if( p === $_ ) return; {
	$s.push("kumite.testscene.TestScene2::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.testscene.TestScene2.__name__ = ["kumite","testscene","TestScene2"];
kumite.testscene.TestScene2.prototype.testLayer1 = null;
kumite.testscene.TestScene2.prototype.testLayer2 = null;
kumite.testscene.TestScene2.prototype.testBackgroundLayer2 = null;
kumite.testscene.TestScene2.prototype.displayListLayer = null;
kumite.testscene.TestScene2.prototype.sceneInit = function(scene) {
	$s.push("kumite.testscene.TestScene2::sceneInit");
	var $spos = $s.length;
	scene.id = scene.name = "RED-GREEN";
	scene.addLayer(new kumite.scene.DelegateLayer(this.testBackgroundLayer2));
	scene.addLayer(new kumite.scene.DelegateLayer(this.testLayer1));
	scene.addLayer(new kumite.scene.DelegateLayer(this.testLayer2));
	scene.addLayer(new kumite.scene.DelegateLayer(this.displayListLayer));
	$s.pop();
}
kumite.testscene.TestScene2.prototype.renderTransition = function(transitionContext) {
	$s.push("kumite.testscene.TestScene2::renderTransition");
	var $spos = $s.length;
	this.render();
	$s.pop();
}
kumite.testscene.TestScene2.prototype.render = function() {
	$s.push("kumite.testscene.TestScene2::render");
	var $spos = $s.length;
	GL.gl.clearColor(0,0,0,1);
	GL.gl.clear(16640);
	$s.pop();
}
kumite.testscene.TestScene2.prototype.__class__ = kumite.testscene.TestScene2;
kumite.testscene.TestScene2.__interfaces__ = [haxe.rtti.Infos,kumite.scene.SceneLifecycle];
GLFrame = function(p) { if( p === $_ ) return; {
	$s.push("GLFrame::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
GLFrame.__name__ = ["GLFrame"];
GLFrame.prototype.time = null;
GLFrame.prototype.timer = null;
GLFrame.prototype.frameTime = null;
GLFrame.prototype.__class__ = GLFrame;
GLCursorClient = function(p) { if( p === $_ ) return; {
	$s.push("GLCursorClient::new");
	var $spos = $s.length;
	this.lastCursor = "";
	$s.pop();
}}
GLCursorClient.__name__ = ["GLCursorClient"];
GLCursorClient.prototype.lastCursor = null;
GLCursorClient.prototype.defaultCursor = function() {
	$s.push("GLCursorClient::defaultCursor");
	var $spos = $s.length;
	if(this.lastCursor != GLCursorClient.DEFAULT) {
		this.lastCursor = GLCursorClient.DEFAULT;
		GLMouseRegistry.getInstance().setCursor(this.lastCursor);
	}
	$s.pop();
}
GLCursorClient.prototype.handCursor = function(message) {
	$s.push("GLCursorClient::handCursor");
	var $spos = $s.length;
	if(this.lastCursor != GLCursorClient.HAND) {
		this.lastCursor = GLCursorClient.HAND;
		GLMouseRegistry.getInstance().setCursor(this.lastCursor);
		if(message != null) js.Lib.window.status = message;
	}
	$s.pop();
}
GLCursorClient.prototype.__class__ = GLCursorClient;
if(!kumite.helloworldgl) kumite.helloworldgl = {}
if(!kumite.helloworldgl.shader) kumite.helloworldgl.shader = {}
kumite.helloworldgl.shader.Fragment = function() { }
kumite.helloworldgl.shader.Fragment.__name__ = ["kumite","helloworldgl","shader","Fragment"];
kumite.helloworldgl.shader.Fragment.prototype.__class__ = kumite.helloworldgl.shader.Fragment;
kumite.testscene.TestScene1 = function(p) { if( p === $_ ) return; {
	$s.push("kumite.testscene.TestScene1::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.testscene.TestScene1.__name__ = ["kumite","testscene","TestScene1"];
kumite.testscene.TestScene1.prototype.displayList = null;
kumite.testscene.TestScene1.prototype.testBackgroundLayer1 = null;
kumite.testscene.TestScene1.prototype.sceneInit = function(scene) {
	$s.push("kumite.testscene.TestScene1::sceneInit");
	var $spos = $s.length;
	scene.id = scene.name = "EMPTY";
	scene.addLayer(new kumite.scene.DelegateLayer(this.testBackgroundLayer1));
	scene.addLayer(new kumite.scene.DelegateLayer(this.displayList));
	$s.pop();
}
kumite.testscene.TestScene1.prototype.renderTransition = function(transitionContext) {
	$s.push("kumite.testscene.TestScene1::renderTransition");
	var $spos = $s.length;
	this.render();
	$s.pop();
}
kumite.testscene.TestScene1.prototype.render = function() {
	$s.push("kumite.testscene.TestScene1::render");
	var $spos = $s.length;
	GL.gl.clearColor(0,0,0,1);
	GL.gl.clear(16640);
	$s.pop();
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
	$s.push("hsl.haxe.DirectSignaler::new");
	var $spos = $s.length;
	if(null == subject) {
		throw new haxe.exception.ArgumentNullException("subject",1);
	}
	this.subject = subject;
	this.rejectNullData = rejectNullData;
	this.sentinel = new hsl.haxe._DirectSignaler.SentinelBond();
	$s.pop();
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
	$s.push("hsl.haxe.DirectSignaler::addBubblingTarget");
	var $spos = $s.length;
	if(null == this.bubblingTargets) {
		this.bubblingTargets = new List();
	}
	this.bubblingTargets.add(value);
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.addNotificationTarget = function(value) {
	$s.push("hsl.haxe.DirectSignaler::addNotificationTarget");
	var $spos = $s.length;
	if(null == this.notificationTargets) {
		this.notificationTargets = new List();
	}
	this.notificationTargets.add(value);
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.bind = function(listener) {
	$s.push("hsl.haxe.DirectSignaler::bind");
	var $spos = $s.length;
	if(null == listener) {
		throw new haxe.exception.ArgumentNullException("listener",1);
	}
	{
		var $tmp = this.sentinel.add(new hsl.haxe._DirectSignaler.RegularBond(listener));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.bindAdvanced = function(listener) {
	$s.push("hsl.haxe.DirectSignaler::bindAdvanced");
	var $spos = $s.length;
	if(null == listener) {
		throw new haxe.exception.ArgumentNullException("listener",1);
	}
	{
		var $tmp = this.sentinel.add(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.bindVoid = function(listener) {
	$s.push("hsl.haxe.DirectSignaler::bindVoid");
	var $spos = $s.length;
	if(null == listener) {
		throw new haxe.exception.ArgumentNullException("listener",1);
	}
	{
		var $tmp = this.sentinel.add(new hsl.haxe._DirectSignaler.NiladicBond(listener));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.bubble = function(data,origin) {
	$s.push("hsl.haxe.DirectSignaler::bubble");
	var $spos = $s.length;
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
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.dispatch = function(data,origin,positionInformation) {
	$s.push("hsl.haxe.DirectSignaler::dispatch");
	var $spos = $s.length;
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
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.getIsListenedTo = function() {
	$s.push("hsl.haxe.DirectSignaler::getIsListenedTo");
	var $spos = $s.length;
	{
		var $tmp = this.sentinel.getIsConnected();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.getOrigin = function(origin) {
	$s.push("hsl.haxe.DirectSignaler::getOrigin");
	var $spos = $s.length;
	{
		var $tmp = null == origin?this.subject:origin;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.verifyCaller = function(positionInformation) {
	$s.push("hsl.haxe.DirectSignaler::verifyCaller");
	var $spos = $s.length;
	if(null == this.subjectClassNames) {
		this.subjectClassNames = haxe.TypeTools.getClassNames(this.subject);
	}
	{ var $it0 = this.subjectClassNames.iterator();
	while( $it0.hasNext() ) { var subjectClassName = $it0.next();
	{
		if(subjectClassName == positionInformation.className) {
			{
				$s.pop();
				return;
			}
		}
	}
	}}
	throw new haxe.exception.Exception("This method may only be called by the subject of the signaler.",null,2);
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.removeBubblingTarget = function(value) {
	$s.push("hsl.haxe.DirectSignaler::removeBubblingTarget");
	var $spos = $s.length;
	if(null != this.bubblingTargets) {
		this.bubblingTargets.remove(value);
	}
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.removeNotificationTarget = function(value) {
	$s.push("hsl.haxe.DirectSignaler::removeNotificationTarget");
	var $spos = $s.length;
	if(null != this.notificationTargets) {
		this.notificationTargets.remove(value);
	}
	$s.pop();
}
hsl.haxe.DirectSignaler.prototype.toString = function() {
	$s.push("hsl.haxe.DirectSignaler::toString");
	var $spos = $s.length;
	{
		var $tmp = "[Signaler isListenedTo=" + this.getIsListenedTo() + "]";
		$s.pop();
		return $tmp;
	}
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
hsl.haxe.Bond = function(p) { if( p === $_ ) return; {
	$s.push("hsl.haxe.Bond::new");
	var $spos = $s.length;
	this.halted = false;
	$s.pop();
}}
hsl.haxe.Bond.__name__ = ["hsl","haxe","Bond"];
hsl.haxe.Bond.prototype.halted = null;
hsl.haxe.Bond.prototype.willDestroyOnUse = null;
hsl.haxe.Bond.prototype.destroy = function() {
	$s.push("hsl.haxe.Bond::destroy");
	var $spos = $s.length;
	null;
	$s.pop();
}
hsl.haxe.Bond.prototype.destroyOnUse = function() {
	$s.push("hsl.haxe.Bond::destroyOnUse");
	var $spos = $s.length;
	this.willDestroyOnUse = true;
	{
		$s.pop();
		return this;
	}
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
	{
		$s.pop();
		return "[Bond]";
	}
	$s.pop();
}
hsl.haxe.Bond.prototype.__class__ = hsl.haxe.Bond;
if(!hsl.haxe._DirectSignaler) hsl.haxe._DirectSignaler = {}
hsl.haxe._DirectSignaler.LinkedBond = function(p) { if( p === $_ ) return; {
	$s.push("hsl.haxe._DirectSignaler.LinkedBond::new");
	var $spos = $s.length;
	hsl.haxe.Bond.call(this);
	this.destroyed = false;
	$s.pop();
}}
hsl.haxe._DirectSignaler.LinkedBond.__name__ = ["hsl","haxe","_DirectSignaler","LinkedBond"];
hsl.haxe._DirectSignaler.LinkedBond.__super__ = hsl.haxe.Bond;
for(var k in hsl.haxe.Bond.prototype ) hsl.haxe._DirectSignaler.LinkedBond.prototype[k] = hsl.haxe.Bond.prototype[k];
hsl.haxe._DirectSignaler.LinkedBond.prototype.destroyed = null;
hsl.haxe._DirectSignaler.LinkedBond.prototype.next = null;
hsl.haxe._DirectSignaler.LinkedBond.prototype.previous = null;
hsl.haxe._DirectSignaler.LinkedBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	$s.push("hsl.haxe._DirectSignaler.LinkedBond::callListener");
	var $spos = $s.length;
	{
		$s.pop();
		return 0;
	}
	$s.pop();
}
hsl.haxe._DirectSignaler.LinkedBond.prototype.determineEquals = function(value) {
	$s.push("hsl.haxe._DirectSignaler.LinkedBond::determineEquals");
	var $spos = $s.length;
	{
		$s.pop();
		return false;
	}
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
hsl.haxe._DirectSignaler.SentinelBond = function(p) { if( p === $_ ) return; {
	$s.push("hsl.haxe._DirectSignaler.SentinelBond::new");
	var $spos = $s.length;
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.next = this.previous = this;
	$s.pop();
}}
hsl.haxe._DirectSignaler.SentinelBond.__name__ = ["hsl","haxe","_DirectSignaler","SentinelBond"];
hsl.haxe._DirectSignaler.SentinelBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.SentinelBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.SentinelBond.prototype.isConnected = null;
hsl.haxe._DirectSignaler.SentinelBond.prototype.add = function(value) {
	$s.push("hsl.haxe._DirectSignaler.SentinelBond::add");
	var $spos = $s.length;
	value.next = this;
	value.previous = this.previous;
	{
		var $tmp = this.previous = this.previous.next = value;
		$s.pop();
		return $tmp;
	}
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
	{
		$s.pop();
		return propagationStatus;
	}
	$s.pop();
}
hsl.haxe._DirectSignaler.SentinelBond.prototype.getIsConnected = function() {
	$s.push("hsl.haxe._DirectSignaler.SentinelBond::getIsConnected");
	var $spos = $s.length;
	{
		var $tmp = this.next != this;
		$s.pop();
		return $tmp;
	}
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
hsl.haxe._DirectSignaler.RegularBond = function(listener) { if( listener === $_ ) return; {
	$s.push("hsl.haxe._DirectSignaler.RegularBond::new");
	var $spos = $s.length;
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
	$s.pop();
}}
hsl.haxe._DirectSignaler.RegularBond.__name__ = ["hsl","haxe","_DirectSignaler","RegularBond"];
hsl.haxe._DirectSignaler.RegularBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.RegularBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.RegularBond.prototype.listener = null;
hsl.haxe._DirectSignaler.RegularBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	$s.push("hsl.haxe._DirectSignaler.RegularBond::callListener");
	var $spos = $s.length;
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
	{
		$s.pop();
		return propagationStatus;
	}
	$s.pop();
}
hsl.haxe._DirectSignaler.RegularBond.prototype.determineEquals = function(value) {
	$s.push("hsl.haxe._DirectSignaler.RegularBond::determineEquals");
	var $spos = $s.length;
	{
		var $tmp = Std["is"](value,hsl.haxe._DirectSignaler.RegularBond) && Reflect.compareMethods(value.listener,this.listener);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hsl.haxe._DirectSignaler.RegularBond.prototype.__class__ = hsl.haxe._DirectSignaler.RegularBond;
hsl.haxe._DirectSignaler.NiladicBond = function(listener) { if( listener === $_ ) return; {
	$s.push("hsl.haxe._DirectSignaler.NiladicBond::new");
	var $spos = $s.length;
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
	$s.pop();
}}
hsl.haxe._DirectSignaler.NiladicBond.__name__ = ["hsl","haxe","_DirectSignaler","NiladicBond"];
hsl.haxe._DirectSignaler.NiladicBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
for(var k in hsl.haxe._DirectSignaler.LinkedBond.prototype ) hsl.haxe._DirectSignaler.NiladicBond.prototype[k] = hsl.haxe._DirectSignaler.LinkedBond.prototype[k];
hsl.haxe._DirectSignaler.NiladicBond.prototype.listener = null;
hsl.haxe._DirectSignaler.NiladicBond.prototype.callListener = function(data,currentTarget,origin,propagationStatus) {
	$s.push("hsl.haxe._DirectSignaler.NiladicBond::callListener");
	var $spos = $s.length;
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
	{
		$s.pop();
		return propagationStatus;
	}
	$s.pop();
}
hsl.haxe._DirectSignaler.NiladicBond.prototype.determineEquals = function(value) {
	$s.push("hsl.haxe._DirectSignaler.NiladicBond::determineEquals");
	var $spos = $s.length;
	{
		var $tmp = Std["is"](value,hsl.haxe._DirectSignaler.NiladicBond) && Reflect.compareMethods(value.listener,this.listener);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hsl.haxe._DirectSignaler.NiladicBond.prototype.__class__ = hsl.haxe._DirectSignaler.NiladicBond;
hsl.haxe._DirectSignaler.AdvancedBond = function(listener) { if( listener === $_ ) return; {
	$s.push("hsl.haxe._DirectSignaler.AdvancedBond::new");
	var $spos = $s.length;
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
	$s.pop();
}}
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
		if(this.willDestroyOnUse) {
			if(false == this.destroyed) {
				this.previous.next = this.next;
				this.next.previous = this.previous;
				this.destroyed = true;
			}
		}
		if(signal.immediatePropagationStopped) {
			{
				$s.pop();
				return 1;
			}
		}
		else if(signal.propagationStopped) {
			{
				$s.pop();
				return 2;
			}
		}
	}
	{
		$s.pop();
		return propagationStatus;
	}
	$s.pop();
}
hsl.haxe._DirectSignaler.AdvancedBond.prototype.determineEquals = function(value) {
	$s.push("hsl.haxe._DirectSignaler.AdvancedBond::determineEquals");
	var $spos = $s.length;
	{
		var $tmp = Std["is"](value,hsl.haxe._DirectSignaler.AdvancedBond) && Reflect.compareMethods(value.listener,this.listener);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hsl.haxe._DirectSignaler.AdvancedBond.prototype.__class__ = hsl.haxe._DirectSignaler.AdvancedBond;
hsl.haxe._DirectSignaler.PropagationStatus = function() { }
hsl.haxe._DirectSignaler.PropagationStatus.__name__ = ["hsl","haxe","_DirectSignaler","PropagationStatus"];
hsl.haxe._DirectSignaler.PropagationStatus.prototype.__class__ = hsl.haxe._DirectSignaler.PropagationStatus;
hsl.haxe.Signal = function(data,currentBond,currentTarget,origin) { if( data === $_ ) return; {
	$s.push("hsl.haxe.Signal::new");
	var $spos = $s.length;
	this.data = data;
	this.currentBond = currentBond;
	this.currentTarget = currentTarget;
	this.origin = origin;
	this.immediatePropagationStopped = false;
	this.propagationStopped = false;
	$s.pop();
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
	$s.push("hsl.haxe.Signal::getData");
	var $spos = $s.length;
	{
		var $tmp = this.data;
		$s.pop();
		return $tmp;
	}
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
	{
		var $tmp = "[GenericSignal data=" + this.data + "]";
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
hsl.haxe.Signal.prototype.__class__ = hsl.haxe.Signal;
if(typeof bpmjs=='undefined') bpmjs = {}
bpmjs.Sequencer = function(p) { if( p === $_ ) return; {
	$s.push("bpmjs.Sequencer::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
bpmjs.Sequencer.__name__ = ["bpmjs","Sequencer"];
bpmjs.Sequencer.prototype.context = null;
bpmjs.Sequencer.prototype.start = function(name) {
	$s.push("bpmjs.Sequencer::start");
	var $spos = $s.length;
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
	$s.pop();
}
bpmjs.Sequencer.prototype.__class__ = bpmjs.Sequencer;
bpmjs.Sequencer.__interfaces__ = [haxe.rtti.Infos];
bpmjs.Sequence = function(name) { if( name === $_ ) return; {
	$s.push("bpmjs.Sequence::new");
	var $spos = $s.length;
	this.name = name;
	$s.pop();
}}
bpmjs.Sequence.__name__ = ["bpmjs","Sequence"];
bpmjs.Sequence.prototype.name = null;
bpmjs.Sequence.prototype.objects = null;
bpmjs.Sequence.prototype.execute = function(phase) {
	$s.push("bpmjs.Sequence::execute");
	var $spos = $s.length;
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
	$s.pop();
}
bpmjs.Sequence.prototype.__class__ = bpmjs.Sequence;
Vec2 = function(x,y) { if( x === $_ ) return; {
	$s.push("Vec2::new");
	var $spos = $s.length;
	this.x = x;
	this.y = y;
	$s.pop();
}}
Vec2.__name__ = ["Vec2"];
Vec2.prototype.x = null;
Vec2.prototype.y = null;
Vec2.prototype.set = function(x,y) {
	$s.push("Vec2::set");
	var $spos = $s.length;
	this.x = x;
	this.y = y;
	$s.pop();
}
Vec2.prototype.scale = function(factor) {
	$s.push("Vec2::scale");
	var $spos = $s.length;
	this.x *= factor;
	this.y *= factor;
	$s.pop();
}
Vec2.prototype.multiply = function(x,y) {
	$s.push("Vec2::multiply");
	var $spos = $s.length;
	this.x *= x;
	this.y *= y;
	$s.pop();
}
Vec2.prototype.subtract = function(x,y) {
	$s.push("Vec2::subtract");
	var $spos = $s.length;
	this.x -= x;
	this.y -= y;
	$s.pop();
}
Vec2.prototype.normalize = function() {
	$s.push("Vec2::normalize");
	var $spos = $s.length;
	var invLength = 1 / Math.sqrt(this.x * this.x + this.y * this.y);
	this.x *= invLength;
	this.y *= invLength;
	$s.pop();
}
Vec2.prototype.transform = function(matrix) {
	$s.push("Vec2::transform");
	var $spos = $s.length;
	var x1 = this.x, y1 = this.y, z1 = 0, w1 = 1;
	var mat = matrix.buffer;
	this.x = mat[0] * x1 + mat[4] * y1 + mat[8] * z1 + mat[12] * w1;
	this.y = mat[1] * x1 + mat[5] * y1 + mat[9] * z1 + mat[13] * w1;
	$s.pop();
}
Vec2.prototype.clone = function() {
	$s.push("Vec2::clone");
	var $spos = $s.length;
	{
		var $tmp = new Vec2(this.x,this.y);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Vec2.prototype.__class__ = Vec2;
Math2 = function() { }
Math2.__name__ = ["Math2"];
Math2.nextPowerOf2 = function(val) {
	$s.push("Math2::nextPowerOf2");
	var $spos = $s.length;
	val--;
	val = val >> 1 | val;
	val = val >> 2 | val;
	val = val >> 4 | val;
	val = val >> 8 | val;
	val = val >> 16 | val;
	val++;
	{
		$s.pop();
		return val;
	}
	$s.pop();
}
Math2.prototype.__class__ = Math2;
LogLevel = function(value) { if( value === $_ ) return; {
	$s.push("LogLevel::new");
	var $spos = $s.length;
	this.value = value;
	$s.pop();
}}
LogLevel.__name__ = ["LogLevel"];
LogLevel.prototype.value = null;
LogLevel.prototype.isSmallerOrEqual = function(level) {
	$s.push("LogLevel::isSmallerOrEqual");
	var $spos = $s.length;
	{
		var $tmp = this.value <= level.value;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
LogLevel.prototype.__class__ = LogLevel;
kumite.canvas.Config = function(p) { if( p === $_ ) return; {
	$s.push("kumite.canvas.Config::new");
	var $spos = $s.length;
	this.canvasCase = new kumite.canvas.CanvasCase();
	this.canvasController = new kumite.canvas.CanvasController();
	$s.pop();
}}
kumite.canvas.Config.__name__ = ["kumite","canvas","Config"];
kumite.canvas.Config.prototype.canvasCase = null;
kumite.canvas.Config.prototype.canvasController = null;
kumite.canvas.Config.prototype.__class__ = kumite.canvas.Config;
kumite.canvas.Config.__interfaces__ = [haxe.rtti.Infos];
bpmjs.Messenger = function(p) { if( p === $_ ) return; {
	$s.push("bpmjs.Messenger::new");
	var $spos = $s.length;
	this.receivers = new Array();
	$s.pop();
}}
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
			{
				$s.pop();
				return;
			}
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
	{
		var $tmp = Type.getClassName(Type.getClass(this));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
bpmjs.Messenger.prototype.__class__ = bpmjs.Messenger;
if(!bpmjs._Messenger) bpmjs._Messenger = {}
bpmjs._Messenger.ReceiverForType = function(type,method) { if( type === $_ ) return; {
	$s.push("bpmjs._Messenger.ReceiverForType::new");
	var $spos = $s.length;
	this.type = type;
	this.method = method;
	$s.pop();
}}
bpmjs._Messenger.ReceiverForType.__name__ = ["bpmjs","_Messenger","ReceiverForType"];
bpmjs._Messenger.ReceiverForType.prototype.type = null;
bpmjs._Messenger.ReceiverForType.prototype.method = null;
bpmjs._Messenger.ReceiverForType.prototype.__class__ = bpmjs._Messenger.ReceiverForType;
kumite.scene.TransitionContext = function(p) { if( p === $_ ) return; {
	$s.push("kumite.scene.TransitionContext::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.scene.TransitionContext.__name__ = ["kumite","scene","TransitionContext"];
kumite.scene.TransitionContext.prototype.transition = null;
kumite.scene.TransitionContext.prototype.toOutTransition = function() {
	$s.push("kumite.scene.TransitionContext::toOutTransition");
	var $spos = $s.length;
	var result = new kumite.scene.TransitionContext();
	result.transition = 1 - this.transition;
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
kumite.scene.TransitionContext.prototype.__class__ = kumite.scene.TransitionContext;
if(!kumite.displaylist) kumite.displaylist = {}
kumite.displaylist.ConfigAsLayer = function(p) { if( p === $_ ) return; {
	$s.push("kumite.displaylist.ConfigAsLayer::new");
	var $spos = $s.length;
	this.displayListLayer = new kumite.displaylist.DisplayListLayer();
	$s.pop();
}}
kumite.displaylist.ConfigAsLayer.__name__ = ["kumite","displaylist","ConfigAsLayer"];
kumite.displaylist.ConfigAsLayer.prototype.displayListLayer = null;
kumite.displaylist.ConfigAsLayer.prototype.__class__ = kumite.displaylist.ConfigAsLayer;
kumite.displaylist.ConfigAsLayer.__interfaces__ = [haxe.rtti.Infos];
if(!kumite.time) kumite.time = {}
kumite.time.Config = function(p) { if( p === $_ ) return; {
	$s.push("kumite.time.Config::new");
	var $spos = $s.length;
	this.time = new kumite.time.Time();
	this.timeController = new kumite.time.TimeController();
	$s.pop();
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
	$s.push("js.Boot::__unhtml");
	var $spos = $s.length;
	{
		var $tmp = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
js.Boot.__trace = function(v,i) {
	$s.push("js.Boot::__trace");
	var $spos = $s.length;
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg);
	else d.innerHTML += msg;
	$s.pop();
}
js.Boot.__clear_trace = function() {
	$s.push("js.Boot::__clear_trace");
	var $spos = $s.length;
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
	else null;
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
		{
			var $tmp = m.apply(o,arguments);
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	f1.scope = o;
	f1.method = m;
	{
		$s.pop();
		return f1;
	}
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
	case "object":{
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) {
					var $tmp = o[0];
					$s.pop();
					return $tmp;
				}
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
				{
					var $tmp = str + ")";
					$s.pop();
					return $tmp;
				}
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
			{
				$s.pop();
				return str;
			}
		}
		var tostr;
		try {
			tostr = o.toString;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					$e = [];
					while($s.length >= $spos) $e.unshift($s.pop());
					$s.push($e[0]);
					{
						$s.pop();
						return "???";
					}
				}
			}
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
		if(hasp && !o.hasOwnProperty(k)) continue;
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") continue;
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		{
			$s.pop();
			return str;
		}
	}break;
	case "function":{
		{
			$s.pop();
			return "<function>";
		}
	}break;
	case "string":{
		{
			$s.pop();
			return o;
		}
	}break;
	default:{
		{
			var $tmp = String(o);
			$s.pop();
			return $tmp;
		}
	}break;
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
	{
		var $tmp = js.Boot.__interfLoop(cc.__super__,cl);
		$s.pop();
		return $tmp;
	}
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
			{
				$s.pop();
				return true;
			}
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) {
			$s.pop();
			return true;
		}
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				if(cl == null) {
					$s.pop();
					return false;
				}
			}
		}
	}
	switch(cl) {
	case Int:{
		{
			var $tmp = Math.ceil(o%2147483648.0) === o;
			$s.pop();
			return $tmp;
		}
	}break;
	case Float:{
		{
			var $tmp = typeof(o) == "number";
			$s.pop();
			return $tmp;
		}
	}break;
	case Bool:{
		{
			var $tmp = o === true || o === false;
			$s.pop();
			return $tmp;
		}
	}break;
	case String:{
		{
			var $tmp = typeof(o) == "string";
			$s.pop();
			return $tmp;
		}
	}break;
	case Dynamic:{
		{
			$s.pop();
			return true;
		}
	}break;
	default:{
		if(o == null) {
			$s.pop();
			return false;
		}
		{
			var $tmp = o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
			$s.pop();
			return $tmp;
		}
	}break;
	}
	$s.pop();
}
js.Boot.__init = function() {
	$s.push("js.Boot::__init");
	var $spos = $s.length;
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		$s.push("js.Boot::__init@205");
		var $spos = $s.length;
		this.splice(i,0,x);
		$s.pop();
	}
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		$s.push("js.Boot::__init@208");
		var $spos = $s.length;
		var idx = this.indexOf(obj);
		if(idx == -1) {
			$s.pop();
			return false;
		}
		this.splice(idx,1);
		{
			$s.pop();
			return true;
		}
		$s.pop();
	}:function(obj) {
		$s.push("js.Boot::__init@213");
		var $spos = $s.length;
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				{
					$s.pop();
					return true;
				}
			}
			i++;
		}
		{
			$s.pop();
			return false;
		}
		$s.pop();
	}
	Array.prototype.iterator = function() {
		$s.push("js.Boot::__init@225");
		var $spos = $s.length;
		{
			var $tmp = { cur : 0, arr : this, hasNext : function() {
				$s.push("js.Boot::__init@225@229");
				var $spos = $s.length;
				{
					var $tmp = this.cur < this.arr.length;
					$s.pop();
					return $tmp;
				}
				$s.pop();
			}, next : function() {
				$s.push("js.Boot::__init@225@232");
				var $spos = $s.length;
				{
					var $tmp = this.arr[this.cur++];
					$s.pop();
					return $tmp;
				}
				$s.pop();
			}};
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		$s.push("js.Boot::__init@239");
		var $spos = $s.length;
		var x = this.cca(i);
		if(x != x) {
			$s.pop();
			return null;
		}
		{
			$s.pop();
			return x;
		}
		$s.pop();
	}
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		$s.push("js.Boot::__init@246");
		var $spos = $s.length;
		if(pos != null && pos != 0 && len != null && len < 0) {
			$s.pop();
			return "";
		}
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		}
		else if(len < 0) {
			len = this.length + len - pos;
		}
		{
			var $tmp = oldsub.apply(this,[pos,len]);
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	$closure = js.Boot.__closure;
	$s.pop();
}
js.Boot.prototype.__class__ = js.Boot;
bpmjs.ContextBuilder = function(p) { if( p === $_ ) return; {
	$s.push("bpmjs.ContextBuilder::new");
	var $spos = $s.length;
	this.context = new bpmjs.Context();
	$s.pop();
}}
bpmjs.ContextBuilder.__name__ = ["bpmjs","ContextBuilder"];
bpmjs.ContextBuilder.defaultContext = null;
bpmjs.ContextBuilder.build = function(configClass,contextConfig) {
	$s.push("bpmjs.ContextBuilder::build");
	var $spos = $s.length;
	{
		var $tmp = bpmjs.ContextBuilder.buildAll([configClass],contextConfig);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
bpmjs.ContextBuilder.buildAll = function(configClasses,contextConfig) {
	$s.push("bpmjs.ContextBuilder::buildAll");
	var $spos = $s.length;
	var builder = new bpmjs.ContextBuilder();
	bpmjs.ContextBuilder.defaultContext = builder.context;
	builder.contextConfig = contextConfig == null?bpmjs.ContextBuilder.createDefaultContextConfig():contextConfig;
	builder.buildInternal(configClasses);
	{
		var $tmp = bpmjs.ContextBuilder.defaultContext;
		$s.pop();
		return $tmp;
	}
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
	{
		$s.pop();
		return defaultContextConfig;
	}
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
						Log.posInfo = { fileName : "ContextBuilder.hx", lineNumber : 132, className : "bpmjs.ContextBuilder", methodName : "wireContextObject"};
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
			if(method.getParameters().length == 1) this.context.addObserver(contextObject,method.field.name,reflect.ClassInfo.forCType(method.getParameters()[0].def.t));
			else throw "Method to observe: " + contextObject.classInfo.name + "." + method.field.name + " needs exactly one parameter";
		}
	}
	$s.pop();
}
bpmjs.ContextBuilder.prototype.registerMessengerByObjectType = function(contextObject) {
	$s.push("bpmjs.ContextBuilder::registerMessengerByObjectType");
	var $spos = $s.length;
	if(Std["is"](contextObject.object,bpmjs.Messenger)) {
		this.contextConfig.frontMessenger.addMessenger(contextObject.object);
	}
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
			if(method.getParameters().length == 1) this.contextConfig.frontMessenger.addReceiver(contextObject.object,method.field.name,reflect.ClassInfo.forCType(method.getParameters()[0].def.t).type);
			else throw "Message: " + contextObject.classInfo.name + "." + method.field.name + " needs exactly one parameter";
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
	{
		var $tmp = "ContextBuilder ERROR: " + message;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
bpmjs.ContextBuilder.prototype.__class__ = bpmjs.ContextBuilder;
bpmjs.FrontMessenger = function() { }
bpmjs.FrontMessenger.__name__ = ["bpmjs","FrontMessenger"];
bpmjs.FrontMessenger.prototype.addMessenger = null;
bpmjs.FrontMessenger.prototype.addReceiver = null;
bpmjs.FrontMessenger.prototype.__class__ = bpmjs.FrontMessenger;
bpmjs.DefaultFrontMessenger = function(p) { if( p === $_ ) return; {
	$s.push("bpmjs.DefaultFrontMessenger::new");
	var $spos = $s.length;
	this.receivers = new Array();
	$s.pop();
}}
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
	$s.pop();
}
bpmjs.DefaultFrontMessenger.prototype.__class__ = bpmjs.DefaultFrontMessenger;
bpmjs.DefaultFrontMessenger.__interfaces__ = [bpmjs.FrontMessenger];
if(!bpmjs._FrontMessenger) bpmjs._FrontMessenger = {}
bpmjs._FrontMessenger.Receiver = function(receiver,methodName,type) { if( receiver === $_ ) return; {
	$s.push("bpmjs._FrontMessenger.Receiver::new");
	var $spos = $s.length;
	this.receiver = receiver;
	this.type = type;
	this.method = Reflect.field(receiver,methodName);
	this.methodName = methodName;
	$s.pop();
}}
bpmjs._FrontMessenger.Receiver.__name__ = ["bpmjs","_FrontMessenger","Receiver"];
bpmjs._FrontMessenger.Receiver.prototype.receiver = null;
bpmjs._FrontMessenger.Receiver.prototype.method = null;
bpmjs._FrontMessenger.Receiver.prototype.methodName = null;
bpmjs._FrontMessenger.Receiver.prototype.type = null;
bpmjs._FrontMessenger.Receiver.prototype.matches = function(message) {
	$s.push("bpmjs._FrontMessenger.Receiver::matches");
	var $spos = $s.length;
	{
		var $tmp = Type.getClass(message) == this.type;
		$s.pop();
		return $tmp;
	}
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
GLDisplayList = function(p) { if( p === $_ ) return; {
	$s.push("GLDisplayList::new");
	var $spos = $s.length;
	this.lastFrameTime = Date.now().getTime();
	this.startTime = this.lastFrameTime;
	this.enterFrameSignaler = new hsl.haxe.DirectSignaler(this);
	this.hitareaPicker = new GLHitareaPicker();
	GLMouseRegistry.getInstance().mouseDownSignaler.bind($closure(this,"handleMouseDown"));
	GLMouseRegistry.getInstance().mouseMoveSignaler.bind($closure(this,"handleMouseMove"));
	this.cursorClient = GLMouseRegistry.getInstance().createCursorClient();
	$s.pop();
}}
GLDisplayList.__name__ = ["GLDisplayList"];
GLDisplayList.instance = null;
GLDisplayList.getDefault = function() {
	$s.push("GLDisplayList::getDefault");
	var $spos = $s.length;
	if(GLDisplayList.instance == null) {
		GLDisplayList.instance = new GLDisplayList();
		GLDisplayList.instance.stage = new GLStage();
		GLDisplayList.instance.initDisplayObject(GLDisplayList.instance.stage);
	}
	{
		var $tmp = GLDisplayList.instance;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GLDisplayList.prototype.stage = null;
GLDisplayList.prototype.hitareaPicker = null;
GLDisplayList.prototype.lastFrameTime = null;
GLDisplayList.prototype.startTime = null;
GLDisplayList.prototype.cursorClient = null;
GLDisplayList.prototype.enterFrameSignaler = null;
GLDisplayList.prototype.initDisplayObject = function(displayObject) {
	$s.push("GLDisplayList::initDisplayObject");
	var $spos = $s.length;
	displayObject.stage = this.stage;
	displayObject.enterFrameSignaler = this.enterFrameSignaler;
	$s.pop();
}
GLDisplayList.prototype.initInteractiveObject = function(interactiveObject) {
	$s.push("GLDisplayList::initInteractiveObject");
	var $spos = $s.length;
	interactiveObject.mouseDownSignaler = new hsl.haxe.DirectSignaler(this);
	$s.pop();
}
GLDisplayList.prototype.setStageSize = function(width,height) {
	$s.push("GLDisplayList::setStageSize");
	var $spos = $s.length;
	this.stage.stageWidth = width;
	this.stage.stageHeight = height;
	$s.pop();
}
GLDisplayList.prototype.dispatchEnterFrame = function() {
	$s.push("GLDisplayList::dispatchEnterFrame");
	var $spos = $s.length;
	var time = Date.now().getTime();
	var frame = new GLFrame();
	frame.time = time;
	frame.timer = time - this.startTime;
	frame.frameTime = time - this.lastFrameTime;
	this.lastFrameTime = time;
	this.enterFrameSignaler.dispatch(frame,null,{ fileName : "GLDisplayList.hx", lineNumber : 69, className : "GLDisplayList", methodName : "dispatchEnterFrame"});
	$s.pop();
}
GLDisplayList.prototype.handleMouseDown = function(position) {
	$s.push("GLDisplayList::handleMouseDown");
	var $spos = $s.length;
	var result = this.hitareaPicker.pick(this.stage,position);
	if(result != null) {
		result.mouseDownSignaler.dispatch(result,null,{ fileName : "GLDisplayList.hx", lineNumber : 77, className : "GLDisplayList", methodName : "handleMouseDown"});
	}
	$s.pop();
}
GLDisplayList.prototype.handleMouseMove = function(position) {
	$s.push("GLDisplayList::handleMouseMove");
	var $spos = $s.length;
	var result = this.hitareaPicker.pick(this.stage,position);
	if(result != null) this.cursorClient.handCursor();
	else this.cursorClient.defaultCursor();
	$s.pop();
}
GLDisplayList.prototype.__class__ = GLDisplayList;
kumite.scene.SceneMixer = function(p) { if( p === $_ ) return; {
	$s.push("kumite.scene.SceneMixer::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.scene.SceneMixer.__name__ = ["kumite","scene","SceneMixer"];
kumite.scene.SceneMixer.prototype.from = null;
kumite.scene.SceneMixer.prototype.to = null;
kumite.scene.SceneMixer.prototype.mix = function(from,to) {
	$s.push("kumite.scene.SceneMixer::mix");
	var $spos = $s.length;
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
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
kumite.scene.SceneMixer.prototype.sorter = function(a,b) {
	$s.push("kumite.scene.SceneMixer::sorter");
	var $spos = $s.length;
	var from = this.from;
	var to = this.to;
	var result = function(value,i) {
		$s.push("kumite.scene.SceneMixer::sorter@46");
		var $spos = $s.length;
		{
			$s.pop();
			return value;
		}
		$s.pop();
	}
	var aInFrom = from.containsLayer(a);
	var aInTo = to.containsLayer(a);
	var bInFrom = from.containsLayer(b);
	var bInTo = to.containsLayer(b);
	if(aInTo && bInTo) {
		var bOverA = to.getLayerIndex(b) > to.getLayerIndex(a);
		if(bOverA) {
			var $tmp = result(-1,{ fileName : "SceneMixer.hx", lineNumber : 62, className : "kumite.scene.SceneMixer", methodName : "sorter"});
			$s.pop();
			return $tmp;
		}
		else {
			var $tmp = result(1,{ fileName : "SceneMixer.hx", lineNumber : 64, className : "kumite.scene.SceneMixer", methodName : "sorter"});
			$s.pop();
			return $tmp;
		}
	}
	if(aInFrom && bInFrom) {
		var bOverA = from.getLayerIndex(b) > from.getLayerIndex(a);
		if(bOverA) {
			var $tmp = result(-1,{ fileName : "SceneMixer.hx", lineNumber : 71, className : "kumite.scene.SceneMixer", methodName : "sorter"});
			$s.pop();
			return $tmp;
		}
		else {
			var $tmp = result(1,{ fileName : "SceneMixer.hx", lineNumber : 73, className : "kumite.scene.SceneMixer", methodName : "sorter"});
			$s.pop();
			return $tmp;
		}
	}
	if(aInFrom && !aInTo && !bInFrom && bInTo) {
		var computeHasAPredecessorThatIsOverB = function() {
			$s.push("kumite.scene.SceneMixer::sorter@78");
			var $spos = $s.length;
			var aIndex = from.getLayerIndex(a) - 1;
			while(aIndex >= 0) {
				var bIndex = to.getLayerIndex(b) + 1;
				while(bIndex < to.layers.length) {
					if(to.layers[bIndex].layerId == from.layers[aIndex].layerId) {
						$s.pop();
						return true;
					}
					bIndex++;
				}
				aIndex--;
			}
			{
				$s.pop();
				return false;
			}
			$s.pop();
		}
		var hasAPredecessorThatIsOverB = computeHasAPredecessorThatIsOverB();
		if(hasAPredecessorThatIsOverB) {
			var $tmp = result(1,{ fileName : "SceneMixer.hx", lineNumber : 98, className : "kumite.scene.SceneMixer", methodName : "sorter"});
			$s.pop();
			return $tmp;
		}
		else {
			var $tmp = result(-1,{ fileName : "SceneMixer.hx", lineNumber : 100, className : "kumite.scene.SceneMixer", methodName : "sorter"});
			$s.pop();
			return $tmp;
		}
	}
	if(aInTo && !aInFrom && !bInTo && bInFrom) {
		var $tmp = result(1,{ fileName : "SceneMixer.hx", lineNumber : 104, className : "kumite.scene.SceneMixer", methodName : "sorter"});
		$s.pop();
		return $tmp;
	}
	{
		var $tmp = result(0,{ fileName : "SceneMixer.hx", lineNumber : 106, className : "kumite.scene.SceneMixer", methodName : "sorter"});
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
kumite.scene.SceneMixer.prototype.__class__ = kumite.scene.SceneMixer;
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
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					$e = [];
					while($s.length >= $spos) $e.unshift($s.pop());
					$s.push($e[0]);
					{
						Log.posInfo = { fileName : "GLAnimationFrame.hx", lineNumber : 16, className : "GLAnimationFrame", methodName : "run"};
						if(Log.filter(LogLevel.ERROR)) {
							Log.fetchInput("Error executing GLAnimationFrame: " + e,null,null,null,null,null,null);
							console.error(Log.createMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
						}
					}
				}
			}
		}
		$s.pop();
	}
	if(ms == 0) {
		var window = js.Lib.window;
		var requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
		if(requestAnimationFrame == null) {
			var requester = function() {
				$s.push("GLAnimationFrame::run@30");
				var $spos = $s.length;
				requestAnimationFrame(requester);
				secureMethod();
				$s.pop();
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
	$s.pop();
}
GLAnimationFrame.prototype.__class__ = GLAnimationFrame;
if(!kumite.projection) kumite.projection = {}
kumite.projection.ProjectionController = function(p) { if( p === $_ ) return; {
	$s.push("kumite.projection.ProjectionController::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.projection.ProjectionController.__name__ = ["kumite","projection","ProjectionController"];
kumite.projection.ProjectionController.prototype.projection = null;
kumite.projection.ProjectionController.prototype.stage = null;
kumite.projection.ProjectionController.prototype.fov = null;
kumite.projection.ProjectionController.prototype.near = null;
kumite.projection.ProjectionController.prototype.far = null;
kumite.projection.ProjectionController.prototype.init = function() {
	$s.push("kumite.projection.ProjectionController::init");
	var $spos = $s.length;
	this.projection.matrix = new Matrix4();
	this.updateProjectionSizeFromStage();
	$s.pop();
}
kumite.projection.ProjectionController.prototype.updateProjectionSizeFromStage = function(message) {
	$s.push("kumite.projection.ProjectionController::updateProjectionSizeFromStage");
	var $spos = $s.length;
	this.projection.matrix.perspective(this.fov,this.stage.getAspect(),this.near,this.far);
	$s.pop();
}
kumite.projection.ProjectionController.prototype.__class__ = kumite.projection.ProjectionController;
kumite.projection.ProjectionController.__interfaces__ = [haxe.rtti.Infos];
kumite.scene.Scenes = function(p) { if( p === $_ ) return; {
	$s.push("kumite.scene.Scenes::new");
	var $spos = $s.length;
	this.all = new Array();
	$s.pop();
}}
kumite.scene.Scenes.__name__ = ["kumite","scene","Scenes"];
kumite.scene.Scenes.prototype.all = null;
kumite.scene.Scenes.prototype.getFirstScene = function() {
	$s.push("kumite.scene.Scenes::getFirstScene");
	var $spos = $s.length;
	{
		var $tmp = this.all[0];
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
kumite.scene.Scenes.prototype.getSceneById = function(id) {
	$s.push("kumite.scene.Scenes::getSceneById");
	var $spos = $s.length;
	{
		var _g = 0, _g1 = this.all;
		while(_g < _g1.length) {
			var result = _g1[_g];
			++_g;
			if(result.scene.id == id) {
				$s.pop();
				return result;
			}
		}
	}
	throw "Cannot find scene: " + id;
	$s.pop();
}
kumite.scene.Scenes.prototype.__class__ = kumite.scene.Scenes;
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
	{
		var $tmp = haxe.Stack.makeStack("$s");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.Stack.exceptionStack = function() {
	$s.push("haxe.Stack::exceptionStack");
	var $spos = $s.length;
	{
		var $tmp = haxe.Stack.makeStack("$e");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.Stack.toString = function(stack) {
	$s.push("haxe.Stack::toString");
	var $spos = $s.length;
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
	{
		var $tmp = b.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.Stack.itemToString = function(b,s) {
	$s.push("haxe.Stack::itemToString");
	var $spos = $s.length;
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
	$s.pop();
}
haxe.Stack.makeStack = function(s) {
	$s.push("haxe.Stack::makeStack");
	var $spos = $s.length;
	var a = (function($this) {
		var $r;
		try {
			$r = eval(s);
		}
		catch( $e0 ) {
			{
				var e = $e0;
				$r = (function($this) {
					var $r;
					$e = [];
					while($s.length >= $spos) $e.unshift($s.pop());
					$s.push($e[0]);
					$r = [];
					return $r;
				}($this));
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
	{
		$s.pop();
		return m;
	}
	$s.pop();
}
haxe.Stack.prototype.__class__ = haxe.Stack;
kumite.time.Tick = function(p) { if( p === $_ ) return; {
	$s.push("kumite.time.Tick::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.time.Tick.__name__ = ["kumite","time","Tick"];
kumite.time.Tick.prototype.__class__ = kumite.time.Tick;
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
	{
		var $tmp = eval(code);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
js.Lib.setErrorHandler = function(f) {
	$s.push("js.Lib::setErrorHandler");
	var $spos = $s.length;
	js.Lib.onerror = f;
	$s.pop();
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
	{
		var $tmp = o.__class__;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Type.getEnum = function(o) {
	$s.push("Type::getEnum");
	var $spos = $s.length;
	if(o == null) {
		$s.pop();
		return null;
	}
	{
		var $tmp = o.__enum__;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Type.getSuperClass = function(c) {
	$s.push("Type::getSuperClass");
	var $spos = $s.length;
	{
		var $tmp = c.__super__;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Type.getClassName = function(c) {
	$s.push("Type::getClassName");
	var $spos = $s.length;
	var a = c.__name__;
	{
		var $tmp = a.join(".");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Type.getEnumName = function(e) {
	$s.push("Type::getEnumName");
	var $spos = $s.length;
	var a = e.__ename__;
	{
		var $tmp = a.join(".");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Type.resolveClass = function(name) {
	$s.push("Type::resolveClass");
	var $spos = $s.length;
	var cl;
	try {
		cl = eval(name);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				cl = null;
			}
		}
	}
	if(cl == null || cl.__name__ == null) {
		$s.pop();
		return null;
	}
	{
		$s.pop();
		return cl;
	}
	$s.pop();
}
Type.resolveEnum = function(name) {
	$s.push("Type::resolveEnum");
	var $spos = $s.length;
	var e;
	try {
		e = eval(name);
	}
	catch( $e0 ) {
		{
			var err = $e0;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				e = null;
			}
		}
	}
	if(e == null || e.__ename__ == null) {
		$s.pop();
		return null;
	}
	{
		$s.pop();
		return e;
	}
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
	{
		var $tmp = new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Type.createEmptyInstance = function(cl) {
	$s.push("Type::createEmptyInstance");
	var $spos = $s.length;
	{
		var $tmp = new cl($_);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Type.createEnum = function(e,constr,params) {
	$s.push("Type::createEnum");
	var $spos = $s.length;
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		{
			var $tmp = f.apply(e,params);
			$s.pop();
			return $tmp;
		}
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	{
		$s.pop();
		return f;
	}
	$s.pop();
}
Type.createEnumIndex = function(e,index,params) {
	$s.push("Type::createEnumIndex");
	var $spos = $s.length;
	var c = Type.getEnumConstructs(e)[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	{
		var $tmp = Type.createEnum(e,c,params);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Type.getInstanceFields = function(c) {
	$s.push("Type::getInstanceFields");
	var $spos = $s.length;
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	{
		$s.pop();
		return a;
	}
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
	{
		$s.pop();
		return a;
	}
	$s.pop();
}
Type.getEnumConstructs = function(e) {
	$s.push("Type::getEnumConstructs");
	var $spos = $s.length;
	{
		var $tmp = e.__constructs__;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Type["typeof"] = function(v) {
	$s.push("Type::typeof");
	var $spos = $s.length;
	switch(typeof(v)) {
	case "boolean":{
		{
			var $tmp = ValueType.TBool;
			$s.pop();
			return $tmp;
		}
	}break;
	case "string":{
		{
			var $tmp = ValueType.TClass(String);
			$s.pop();
			return $tmp;
		}
	}break;
	case "number":{
		if(Math.ceil(v) == v % 2147483648.0) {
			var $tmp = ValueType.TInt;
			$s.pop();
			return $tmp;
		}
		{
			var $tmp = ValueType.TFloat;
			$s.pop();
			return $tmp;
		}
	}break;
	case "object":{
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
		{
			var $tmp = ValueType.TObject;
			$s.pop();
			return $tmp;
		}
	}break;
	case "function":{
		if(v.__name__ != null) {
			var $tmp = ValueType.TObject;
			$s.pop();
			return $tmp;
		}
		{
			var $tmp = ValueType.TFunction;
			$s.pop();
			return $tmp;
		}
	}break;
	case "undefined":{
		{
			var $tmp = ValueType.TNull;
			$s.pop();
			return $tmp;
		}
	}break;
	default:{
		{
			var $tmp = ValueType.TUnknown;
			$s.pop();
			return $tmp;
		}
	}break;
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
		{
			var _g1 = 2, _g = a.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(!Type.enumEq(a[i],b[i])) {
					$s.pop();
					return false;
				}
			}
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) {
			$s.pop();
			return false;
		}
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				{
					$s.pop();
					return false;
				}
			}
		}
	}
	{
		$s.pop();
		return true;
	}
	$s.pop();
}
Type.enumConstructor = function(e) {
	$s.push("Type::enumConstructor");
	var $spos = $s.length;
	{
		var $tmp = e[0];
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Type.enumParameters = function(e) {
	$s.push("Type::enumParameters");
	var $spos = $s.length;
	{
		var $tmp = e.slice(2);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Type.enumIndex = function(e) {
	$s.push("Type::enumIndex");
	var $spos = $s.length;
	{
		var $tmp = e[1];
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Type.prototype.__class__ = Type;
kumite.canvas.CanvasController = function(p) { if( p === $_ ) return; {
	$s.push("kumite.canvas.CanvasController::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.canvas.CanvasController.__name__ = ["kumite","canvas","CanvasController"];
kumite.canvas.CanvasController.prototype.canvas = null;
kumite.canvas.CanvasController.prototype.stage = null;
kumite.canvas.CanvasController.prototype.initPrepare = function() {
	$s.push("kumite.canvas.CanvasController::initPrepare");
	var $spos = $s.length;
	this.canvas.itself = js.Lib.document.getElementById("content");
	$s.pop();
}
kumite.canvas.CanvasController.prototype.init = function() {
	$s.push("kumite.canvas.CanvasController::init");
	var $spos = $s.length;
	this.updateCanvasSizeFromStage();
	$s.pop();
}
kumite.canvas.CanvasController.prototype.updateCanvasSizeFromStage = function(message) {
	$s.push("kumite.canvas.CanvasController::updateCanvasSizeFromStage");
	var $spos = $s.length;
	this.canvas.itself.width = this.stage.width;
	this.canvas.itself.height = this.stage.height;
	$s.pop();
}
kumite.canvas.CanvasController.prototype.__class__ = kumite.canvas.CanvasController;
kumite.canvas.CanvasController.__interfaces__ = [haxe.rtti.Infos];
if(!kumite.launch) kumite.launch = {}
kumite.launch.Launcher = function(p) { if( p === $_ ) return; {
	$s.push("kumite.launch.Launcher::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.launch.Launcher.__name__ = ["kumite","launch","Launcher"];
kumite.launch.Launcher.prototype.sequencer = null;
kumite.launch.Launcher.prototype.handlePostComplete = function() {
	$s.push("kumite.launch.Launcher::handlePostComplete");
	var $spos = $s.length;
	{
		Log.posInfo = { fileName : "Launcher.hx", lineNumber : 15, className : "kumite.launch.Launcher", methodName : "handlePostComplete"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput(null,null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	this.sequencer.start("boot");
	$s.pop();
}
kumite.launch.Launcher.prototype.showError = function() {
	$s.push("kumite.launch.Launcher::showError");
	var $spos = $s.length;
	null;
	$s.pop();
}
kumite.launch.Launcher.prototype.__class__ = kumite.launch.Launcher;
kumite.launch.Launcher.__interfaces__ = [haxe.rtti.Infos];
kumite.testscene.Config = function(p) { if( p === $_ ) return; {
	$s.push("kumite.testscene.Config::new");
	var $spos = $s.length;
	this.testBackgroundLayer1 = new kumite.testscene.TestBackgroundLayer();
	this.testBackgroundLayer1.color = new Color(1,1,1,0.2);
	this.testBackgroundLayer1.direction = -1;
	this.testBackgroundLayer1.layerId = "testBackgroundLayer1";
	this.testBackgroundLayer2 = new kumite.testscene.TestBackgroundLayer();
	this.testBackgroundLayer2.color = new Color(1,0.5,1,0.2);
	this.testBackgroundLayer2.direction = 1;
	this.testBackgroundLayer2.layerId = "testBackgroundLayer2";
	this.testLayer1 = new kumite.testscene.TestLayer();
	this.testLayer1.layerId = "testLayer1";
	this.testLayer1.color = new Color(1,0,0,0.8);
	this.testLayer1.scale = 2;
	this.testLayer1.position = new Vec3(1,0,2);
	this.testLayer2 = new kumite.testscene.TestLayer();
	this.testLayer2.layerId = "testLayer2";
	this.testLayer2.color = new Color(0,1,0,0.6);
	this.testLayer2.scale = 2;
	this.testLayer2.position = new Vec3(-1,0,1);
	this.testLayer3 = new kumite.testscene.TestLayer();
	this.testLayer3.layerId = "testLayer3";
	this.testLayer3.color = new Color(0,0,1,0.4);
	this.testLayer3.scale = 2;
	this.testLayer3.position = new Vec3(-1,0,3);
	this.testScene1 = new kumite.testscene.TestScene1();
	this.testScene2 = new kumite.testscene.TestScene2();
	this.testScene3 = new kumite.testscene.TestScene3();
	this.testScene4 = new kumite.testscene.TestScene4();
	$s.pop();
}}
kumite.testscene.Config.__name__ = ["kumite","testscene","Config"];
kumite.testscene.Config.prototype.testBackgroundLayer1 = null;
kumite.testscene.Config.prototype.testBackgroundLayer2 = null;
kumite.testscene.Config.prototype.testLayer1 = null;
kumite.testscene.Config.prototype.testLayer2 = null;
kumite.testscene.Config.prototype.testLayer3 = null;
kumite.testscene.Config.prototype.testScene1 = null;
kumite.testscene.Config.prototype.testScene2 = null;
kumite.testscene.Config.prototype.testScene3 = null;
kumite.testscene.Config.prototype.testScene4 = null;
kumite.testscene.Config.prototype.__class__ = kumite.testscene.Config;
kumite.testscene.Config.__interfaces__ = [haxe.rtti.Infos];
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
	{ var $it0 = arr.iterator();
	while( $it0.hasNext() ) { var t = $it0.next();
	if(t == field) {
		$s.pop();
		return true;
	}
	}}
	{
		$s.pop();
		return false;
	}
	$s.pop();
}
Reflect.field = function(o,field) {
	$s.push("Reflect::field");
	var $spos = $s.length;
	var v = null;
	try {
		v = o[field];
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				null;
			}
		}
	}
	{
		$s.pop();
		return v;
	}
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
	{
		var $tmp = func.apply(o,args);
		$s.pop();
		return $tmp;
	}
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
					$e = [];
					while($s.length >= $spos) $e.unshift($s.pop());
					$s.push($e[0]);
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
	{
		$s.pop();
		return a;
	}
	$s.pop();
}
Reflect.isFunction = function(f) {
	$s.push("Reflect::isFunction");
	var $spos = $s.length;
	{
		var $tmp = typeof(f) == "function" && f.__name__ == null;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Reflect.compare = function(a,b) {
	$s.push("Reflect::compare");
	var $spos = $s.length;
	{
		var $tmp = a == b?0:a > b?1:-1;
		$s.pop();
		return $tmp;
	}
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
	{
		var $tmp = f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
		$s.pop();
		return $tmp;
	}
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
	{
		var $tmp = t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
		$s.pop();
		return $tmp;
	}
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
	{
		$s.pop();
		return true;
	}
	$s.pop();
}
Reflect.copy = function(o) {
	$s.push("Reflect::copy");
	var $spos = $s.length;
	var o2 = { };
	{
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
	}
	{
		$s.pop();
		return o2;
	}
	$s.pop();
}
Reflect.makeVarArgs = function(f) {
	$s.push("Reflect::makeVarArgs");
	var $spos = $s.length;
	{
		var $tmp = function() {
			$s.push("Reflect::makeVarArgs@116");
			var $spos = $s.length;
			var a = new Array();
			{
				var _g1 = 0, _g = arguments.length;
				while(_g1 < _g) {
					var i = _g1++;
					a.push(arguments[i]);
				}
			}
			{
				var $tmp = f(a);
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Reflect.prototype.__class__ = Reflect;
reflect.Parameter = function(def) { if( def === $_ ) return; {
	$s.push("reflect.Parameter::new");
	var $spos = $s.length;
	this.def = def;
	$s.pop();
}}
reflect.Parameter.__name__ = ["reflect","Parameter"];
reflect.Parameter.prototype.type = null;
reflect.Parameter.prototype.def = null;
reflect.Parameter.prototype.getType = function() {
	$s.push("reflect.Parameter::getType");
	var $spos = $s.length;
	{
		var $tmp = reflect.ClassInfo.forCType(this.def.t);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
reflect.Parameter.prototype.__class__ = reflect.Parameter;
reflect.Method = function(field,args,ret,definedInClass,owner) { if( field === $_ ) return; {
	$s.push("reflect.Method::new");
	var $spos = $s.length;
	reflect.Field.call(this,field,definedInClass,owner);
	this.args = args;
	this.ret = ret;
	$s.pop();
}}
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
	{ var $it0 = this.args.iterator();
	while( $it0.hasNext() ) { var arg = $it0.next();
	{
		var parameter = new reflect.Parameter(arg);
		this.parameters.push(parameter);
	}
	}}
	{
		var $tmp = this.parameters;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
reflect.Method.prototype.__class__ = reflect.Method;
kumite.scene.SceneChangeRequest = function(sceneId) { if( sceneId === $_ ) return; {
	$s.push("kumite.scene.SceneChangeRequest::new");
	var $spos = $s.length;
	this.sceneId = sceneId;
	$s.pop();
}}
kumite.scene.SceneChangeRequest.__name__ = ["kumite","scene","SceneChangeRequest"];
kumite.scene.SceneChangeRequest.prototype.sceneId = null;
kumite.scene.SceneChangeRequest.prototype.__class__ = kumite.scene.SceneChangeRequest;
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
	{
		$s.pop();
		return inf;
	}
	$s.pop();
}
haxe.rtti.TypeApi.isVar = function(t) {
	$s.push("haxe.rtti.TypeApi::isVar");
	var $spos = $s.length;
	{
		var $tmp = (function($this) {
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
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.rtti.TypeApi.leq = function(f,l1,l2) {
	$s.push("haxe.rtti.TypeApi::leq");
	var $spos = $s.length;
	var it = l2.iterator();
	{ var $it0 = l1.iterator();
	while( $it0.hasNext() ) { var e1 = $it0.next();
	{
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
	}}
	if(it.hasNext()) {
		$s.pop();
		return false;
	}
	{
		$s.pop();
		return true;
	}
	$s.pop();
}
haxe.rtti.TypeApi.rightsEq = function(r1,r2) {
	$s.push("haxe.rtti.TypeApi::rightsEq");
	var $spos = $s.length;
	if(r1 == r2) {
		$s.pop();
		return true;
	}
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
			{
				var $tmp = m1 == m2;
				$s.pop();
				return $tmp;
			}
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
	{
		$s.pop();
		return false;
	}
	$s.pop();
}
haxe.rtti.TypeApi.typeEq = function(t1,t2) {
	$s.push("haxe.rtti.TypeApi::typeEq");
	var $spos = $s.length;
	var $e = t1;
	switch( $e[1] ) {
	case 0:
	{
		{
			var $tmp = t2 == haxe.rtti.CType.CUnknown;
			$s.pop();
			return $tmp;
		}
	}break;
	case 1:
	var params = $e[3], name = $e[2];
	{
		var $e = t2;
		switch( $e[1] ) {
		case 1:
		var params2 = $e[3], name2 = $e[2];
		{
			{
				var $tmp = name == name2 && haxe.rtti.TypeApi.leq($closure(haxe.rtti.TypeApi,"typeEq"),params,params2);
				$s.pop();
				return $tmp;
			}
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
			{
				var $tmp = name == name2 && haxe.rtti.TypeApi.leq($closure(haxe.rtti.TypeApi,"typeEq"),params,params2);
				$s.pop();
				return $tmp;
			}
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
			{
				var $tmp = name == name2 && haxe.rtti.TypeApi.leq($closure(haxe.rtti.TypeApi,"typeEq"),params,params2);
				$s.pop();
				return $tmp;
			}
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
			{
				var $tmp = haxe.rtti.TypeApi.leq(function(a,b) {
					$s.push("haxe.rtti.TypeApi::typeEq@187");
					var $spos = $s.length;
					{
						var $tmp = a.name == b.name && a.opt == b.opt && haxe.rtti.TypeApi.typeEq(a.t,b.t);
						$s.pop();
						return $tmp;
					}
					$s.pop();
				},args,args2) && haxe.rtti.TypeApi.typeEq(ret,ret2);
				$s.pop();
				return $tmp;
			}
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
			{
				var $tmp = haxe.rtti.TypeApi.leq(function(a,b) {
					$s.push("haxe.rtti.TypeApi::typeEq@195");
					var $spos = $s.length;
					{
						var $tmp = a.name == b.name && haxe.rtti.TypeApi.typeEq(a.t,b.t);
						$s.pop();
						return $tmp;
					}
					$s.pop();
				},fields,fields2);
				$s.pop();
				return $tmp;
			}
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
			if(t == null != (t21 == null)) {
				$s.pop();
				return false;
			}
			{
				var $tmp = t == null || haxe.rtti.TypeApi.typeEq(t,t21);
				$s.pop();
				return $tmp;
			}
		}break;
		default:{
			null;
		}break;
		}
	}break;
	}
	{
		$s.pop();
		return false;
	}
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
	{
		$s.pop();
		return true;
	}
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
		{
			var $tmp = a.name == b.name && a.opt == b.opt && haxe.rtti.TypeApi.typeEq(a.t,b.t);
			$s.pop();
			return $tmp;
		}
		$s.pop();
	},c1.args,c2.args)) {
		$s.pop();
		return false;
	}
	{
		$s.pop();
		return true;
	}
	$s.pop();
}
haxe.rtti.TypeApi.prototype.__class__ = haxe.rtti.TypeApi;
GLMouseRegistry = function(p) { if( p === $_ ) return; {
	$s.push("GLMouseRegistry::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
GLMouseRegistry.__name__ = ["GLMouseRegistry"];
GLMouseRegistry.instance = null;
GLMouseRegistry.getInstance = function() {
	$s.push("GLMouseRegistry::getInstance");
	var $spos = $s.length;
	if(GLMouseRegistry.instance == null) GLMouseRegistry.instance = new GLMouseRegistry();
	{
		var $tmp = GLMouseRegistry.instance;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GLMouseRegistry.prototype.mouseDownSignaler = null;
GLMouseRegistry.prototype.mouseMoveSignaler = null;
GLMouseRegistry.prototype.canvas = null;
GLMouseRegistry.prototype.init = function(canvas) {
	$s.push("GLMouseRegistry::init");
	var $spos = $s.length;
	this.canvas = canvas;
	this.mouseDownSignaler = new hsl.haxe.DirectSignaler(this);
	this.mouseMoveSignaler = new hsl.haxe.DirectSignaler(this);
	canvas.onmousedown = $closure(this,"onMouseDown");
	canvas.onmousemove = $closure(this,"onMouseMove");
	$s.pop();
}
GLMouseRegistry.prototype.setCursor = function(cursor) {
	$s.push("GLMouseRegistry::setCursor");
	var $spos = $s.length;
	this.canvas.style.cursor = cursor;
	$s.pop();
}
GLMouseRegistry.prototype.createCursorClient = function() {
	$s.push("GLMouseRegistry::createCursorClient");
	var $spos = $s.length;
	var client = new GLCursorClient();
	{
		$s.pop();
		return client;
	}
	$s.pop();
}
GLMouseRegistry.prototype.onMouseDown = function(e) {
	$s.push("GLMouseRegistry::onMouseDown");
	var $spos = $s.length;
	try {
		this.mouseDownSignaler.dispatch(new Vec2(e.layerX / this.canvas.clientWidth,e.layerY / this.canvas.clientHeight),null,{ fileName : "GLMouseRegistry.hx", lineNumber : 50, className : "GLMouseRegistry", methodName : "onMouseDown"});
	}
	catch( $e0 ) {
		{
			var e1 = $e0;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				haxe.Log.trace(e1,{ fileName : "GLMouseRegistry.hx", lineNumber : 54, className : "GLMouseRegistry", methodName : "onMouseDown"});
			}
		}
	}
	$s.pop();
}
GLMouseRegistry.prototype.onMouseMove = function(e) {
	$s.push("GLMouseRegistry::onMouseMove");
	var $spos = $s.length;
	try {
		this.mouseMoveSignaler.dispatch(new Vec2(e.layerX / this.canvas.clientWidth,e.layerY / this.canvas.clientHeight),null,{ fileName : "GLMouseRegistry.hx", lineNumber : 62, className : "GLMouseRegistry", methodName : "onMouseMove"});
	}
	catch( $e0 ) {
		{
			var e1 = $e0;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				haxe.Log.trace(e1,{ fileName : "GLMouseRegistry.hx", lineNumber : 66, className : "GLMouseRegistry", methodName : "onMouseMove"});
			}
		}
	}
	$s.pop();
}
GLMouseRegistry.prototype.__class__ = GLMouseRegistry;
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	$s.push("Lambda::array");
	var $spos = $s.length;
	var a = new Array();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var i = $it0.next();
	a.push(i);
	}}
	{
		$s.pop();
		return a;
	}
	$s.pop();
}
Lambda.list = function(it) {
	$s.push("Lambda::list");
	var $spos = $s.length;
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var i = $it0.next();
	l.add(i);
	}}
	{
		$s.pop();
		return l;
	}
	$s.pop();
}
Lambda.map = function(it,f) {
	$s.push("Lambda::map");
	var $spos = $s.length;
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(f(x));
	}}
	{
		$s.pop();
		return l;
	}
	$s.pop();
}
Lambda.mapi = function(it,f) {
	$s.push("Lambda::mapi");
	var $spos = $s.length;
	var l = new List();
	var i = 0;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(f(i++,x));
	}}
	{
		$s.pop();
		return l;
	}
	$s.pop();
}
Lambda.has = function(it,elt,cmp) {
	$s.push("Lambda::has");
	var $spos = $s.length;
	if(cmp == null) {
		{ var $it0 = it.iterator();
		while( $it0.hasNext() ) { var x = $it0.next();
		if(x == elt) {
			$s.pop();
			return true;
		}
		}}
	}
	else {
		{ var $it1 = it.iterator();
		while( $it1.hasNext() ) { var x = $it1.next();
		if(cmp(x,elt)) {
			$s.pop();
			return true;
		}
		}}
	}
	{
		$s.pop();
		return false;
	}
	$s.pop();
}
Lambda.exists = function(it,f) {
	$s.push("Lambda::exists");
	var $spos = $s.length;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(f(x)) {
		$s.pop();
		return true;
	}
	}}
	{
		$s.pop();
		return false;
	}
	$s.pop();
}
Lambda.foreach = function(it,f) {
	$s.push("Lambda::foreach");
	var $spos = $s.length;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(!f(x)) {
		$s.pop();
		return false;
	}
	}}
	{
		$s.pop();
		return true;
	}
	$s.pop();
}
Lambda.iter = function(it,f) {
	$s.push("Lambda::iter");
	var $spos = $s.length;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	f(x);
	}}
	$s.pop();
}
Lambda.filter = function(it,f) {
	$s.push("Lambda::filter");
	var $spos = $s.length;
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(f(x)) l.add(x);
	}}
	{
		$s.pop();
		return l;
	}
	$s.pop();
}
Lambda.fold = function(it,f,first) {
	$s.push("Lambda::fold");
	var $spos = $s.length;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	first = f(x,first);
	}}
	{
		$s.pop();
		return first;
	}
	$s.pop();
}
Lambda.count = function(it,pred) {
	$s.push("Lambda::count");
	var $spos = $s.length;
	var n = 0;
	if(pred == null) { var $it0 = it.iterator();
	while( $it0.hasNext() ) { var _ = $it0.next();
	n++;
	}}
	else { var $it1 = it.iterator();
	while( $it1.hasNext() ) { var x = $it1.next();
	if(pred(x)) n++;
	}}
	{
		$s.pop();
		return n;
	}
	$s.pop();
}
Lambda.empty = function(it) {
	$s.push("Lambda::empty");
	var $spos = $s.length;
	{
		var $tmp = !it.iterator().hasNext();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Lambda.indexOf = function(it,v) {
	$s.push("Lambda::indexOf");
	var $spos = $s.length;
	var i = 0;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var v2 = $it0.next();
	{
		if(v == v2) {
			$s.pop();
			return i;
		}
		i++;
	}
	}}
	{
		$s.pop();
		return -1;
	}
	$s.pop();
}
Lambda.concat = function(a,b) {
	$s.push("Lambda::concat");
	var $spos = $s.length;
	var l = new List();
	{ var $it0 = a.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(x);
	}}
	{ var $it1 = b.iterator();
	while( $it1.hasNext() ) { var x = $it1.next();
	l.add(x);
	}}
	{
		$s.pop();
		return l;
	}
	$s.pop();
}
Lambda.prototype.__class__ = Lambda;
Text = function(p) { if( p === $_ ) return; {
	$s.push("Text::new");
	var $spos = $s.length;
	Text.init();
	$s.pop();
}}
Text.__name__ = ["Text"];
Text.context = null;
Text.init = function() {
	$s.push("Text::init");
	var $spos = $s.length;
	if(Text.context == null) {
		var canvas = js.Lib.document.createElement("canvas");
		Text.context = canvas.getContext("2d");
	}
	$s.pop();
}
Text.prototype.text = null;
Text.prototype.font = null;
Text.prototype.width = null;
Text.prototype.getWidth = function() {
	$s.push("Text::getWidth");
	var $spos = $s.length;
	Text.context.font = this.font;
	{
		var $tmp = Text.context.measureText(this.text).width;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Text.prototype.__class__ = Text;
CanvasGraphic = function(p) { if( p === $_ ) return; {
	$s.push("CanvasGraphic::new");
	var $spos = $s.length;
	this.canvas = js.Lib.document.createElement("canvas");
	this.context = this.canvas.getContext("2d");
	this.setWidth(0);
	this.setHeight(0);
	$s.pop();
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
	$s.push("CanvasGraphic::clear");
	var $spos = $s.length;
	this.canvas.width = Math2.nextPowerOf2(this.width);
	this.canvas.height = Math2.nextPowerOf2(this.height);
	this.context.fillStyle = "rgba(0, 0, 255, 0)";
	this.context.fillRect(0,0,this.canvas.width,this.canvas.width);
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
	this.context.fillText(text,x,y,maxWidth);
	this.isInvalid = true;
	$s.pop();
}
CanvasGraphic.prototype.setFont = function(value) {
	$s.push("CanvasGraphic::setFont");
	var $spos = $s.length;
	this.context.font = value;
	{
		$s.pop();
		return value;
	}
	$s.pop();
}
CanvasGraphic.prototype.setFillStyle = function(value) {
	$s.push("CanvasGraphic::setFillStyle");
	var $spos = $s.length;
	if(Std["is"](value,Color)) this.context.fillStyle = ((function($this) {
		var $r;
		var $t = value;
		if(Std["is"]($t,Color)) $t;
		else throw "Class cast error";
		$r = $t;
		return $r;
	}(this))).toContextRGBA();
	{
		$s.pop();
		return value;
	}
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
	{
		$s.pop();
		return width;
	}
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
	{
		$s.pop();
		return height;
	}
	$s.pop();
}
CanvasGraphic.prototype.__class__ = CanvasGraphic;
kumite.scene.SceneController = function(p) { if( p === $_ ) return; {
	$s.push("kumite.scene.SceneController::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.scene.SceneController.__name__ = ["kumite","scene","SceneController"];
kumite.scene.SceneController.prototype.scenes = null;
kumite.scene.SceneController.prototype.time = null;
kumite.scene.SceneController.prototype.transitionContext = null;
kumite.scene.SceneController.prototype.initState = null;
kumite.scene.SceneController.prototype.idleState = null;
kumite.scene.SceneController.prototype.transitionState = null;
kumite.scene.SceneController.prototype.state = null;
kumite.scene.SceneController.prototype.currentScene = null;
kumite.scene.SceneController.prototype.lastScene = null;
kumite.scene.SceneController.prototype.init = function() {
	$s.push("kumite.scene.SceneController::init");
	var $spos = $s.length;
	this.currentScene = new kumite.scene.SceneAndLifecycle();
	this.currentScene.scene = new kumite.scene.Scene();
	this.currentScene.lifecycle = new kumite.scene.NullSceneLifecycle();
	this.transitionContext = new kumite.scene.TransitionContext();
	this.initState = new kumite.scene.InitState(this);
	this.idleState = new kumite.scene.IdleState(this);
	this.transitionState = new kumite.scene.TransitionState(this);
	this.setState(this.initState);
	$s.pop();
}
kumite.scene.SceneController.prototype.handleSceneLifecycleAdded = function(lifecycle) {
	$s.push("kumite.scene.SceneController::handleSceneLifecycleAdded");
	var $spos = $s.length;
	var scene = new kumite.scene.Scene();
	lifecycle.sceneInit(scene);
	var sceneAndLifecycle = new kumite.scene.SceneAndLifecycle();
	sceneAndLifecycle.scene = scene;
	sceneAndLifecycle.lifecycle = lifecycle;
	this.scenes.all.push(sceneAndLifecycle);
	$s.pop();
}
kumite.scene.SceneController.prototype.start = function() {
	$s.push("kumite.scene.SceneController::start");
	var $spos = $s.length;
	if(this.scenes.all.length == 0) {
		{
			Log.posInfo = { fileName : "SceneController.hx", lineNumber : 63, className : "kumite.scene.SceneController", methodName : "start"};
			if(Log.filter(LogLevel.WARN)) {
				Log.fetchInput("No scenes were added!",null,null,null,null,null,null);
				console.warn(Log.createMessage());
			}
		}
		{
			$s.pop();
			return;
		}
	}
	{
		Log.posInfo = { fileName : "SceneController.hx", lineNumber : 67, className : "kumite.scene.SceneController", methodName : "start"};
		if(Log.filter(LogLevel.INFO)) {
			Log.fetchInput("Init all scenes and layers...",null,null,null,null,null,null);
			console.info(Log.createMessage());
		}
	}
	{
		var _g = 0, _g1 = this.scenes.all;
		while(_g < _g1.length) {
			var scene = _g1[_g];
			++_g;
			{
				var _g2 = 0, _g3 = scene.scene.layers;
				while(_g2 < _g3.length) {
					var layer = _g3[_g2];
					++_g2;
					layer.init();
				}
			}
		}
	}
	this.enterScene(this.scenes.getFirstScene());
	$s.pop();
}
kumite.scene.SceneController.prototype.handleSceneChangeRequest = function(message) {
	$s.push("kumite.scene.SceneController::handleSceneChangeRequest");
	var $spos = $s.length;
	this.enterScene(this.scenes.getSceneById(message.sceneId));
	$s.pop();
}
kumite.scene.SceneController.prototype.render = function(tick) {
	$s.push("kumite.scene.SceneController::render");
	var $spos = $s.length;
	this.state.render();
	$s.pop();
}
kumite.scene.SceneController.prototype.renderTransition = function() {
	$s.push("kumite.scene.SceneController::renderTransition");
	var $spos = $s.length;
	var mixer = new kumite.scene.SceneMixer();
	var mixedScene = mixer.mix(this.lastScene.scene,this.currentScene.scene);
	var transitionContextOut = this.transitionContext.toOutTransition();
	this.lastScene.lifecycle.renderTransition(transitionContextOut);
	this.currentScene.lifecycle.renderTransition(this.transitionContext);
	{
		var _g = 0, _g1 = mixedScene.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			switch(layer.state) {
			case kumite.scene.LayerState.IN:{
				layer.renderTransition(this.transitionContext);
			}break;
			case kumite.scene.LayerState.OUT:{
				layer.renderTransition(transitionContextOut);
			}break;
			case kumite.scene.LayerState.KEEP:{
				layer.render();
			}break;
			}
		}
	}
	$s.pop();
}
kumite.scene.SceneController.prototype.renderNormal = function() {
	$s.push("kumite.scene.SceneController::renderNormal");
	var $spos = $s.length;
	this.currentScene.lifecycle.render();
	{
		var _g = 0, _g1 = this.currentScene.scene.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			layer.render();
		}
	}
	$s.pop();
}
kumite.scene.SceneController.prototype.enterScene = function(newScene) {
	$s.push("kumite.scene.SceneController::enterScene");
	var $spos = $s.length;
	if(this.state.allowesScreenChange && newScene != this.currentScene) {
		this.lastScene = this.currentScene;
		this.currentScene = newScene;
		this.setState(this.transitionState);
	}
	$s.pop();
}
kumite.scene.SceneController.prototype.setState = function(state) {
	$s.push("kumite.scene.SceneController::setState");
	var $spos = $s.length;
	this.state = state;
	state.enter();
	$s.pop();
}
kumite.scene.SceneController.prototype.__class__ = kumite.scene.SceneController;
kumite.scene.SceneController.__interfaces__ = [haxe.rtti.Infos];
kumite.scene.State = function(sceneController) { if( sceneController === $_ ) return; {
	$s.push("kumite.scene.State::new");
	var $spos = $s.length;
	this.sceneController = sceneController;
	this.time = sceneController.time;
	this.configure();
	$s.pop();
}}
kumite.scene.State.__name__ = ["kumite","scene","State"];
kumite.scene.State.prototype.allowesScreenChange = null;
kumite.scene.State.prototype.sceneController = null;
kumite.scene.State.prototype.time = null;
kumite.scene.State.prototype.enter = function() {
	$s.push("kumite.scene.State::enter");
	var $spos = $s.length;
	null;
	$s.pop();
}
kumite.scene.State.prototype.render = function() {
	$s.push("kumite.scene.State::render");
	var $spos = $s.length;
	null;
	$s.pop();
}
kumite.scene.State.prototype.configure = function() {
	$s.push("kumite.scene.State::configure");
	var $spos = $s.length;
	this.allowesScreenChange = false;
	$s.pop();
}
kumite.scene.State.prototype.__class__ = kumite.scene.State;
kumite.scene.InitState = function(sceneController) { if( sceneController === $_ ) return; {
	$s.push("kumite.scene.InitState::new");
	var $spos = $s.length;
	kumite.scene.State.call(this,sceneController);
	$s.pop();
}}
kumite.scene.InitState.__name__ = ["kumite","scene","InitState"];
kumite.scene.InitState.__super__ = kumite.scene.State;
for(var k in kumite.scene.State.prototype ) kumite.scene.InitState.prototype[k] = kumite.scene.State.prototype[k];
kumite.scene.InitState.prototype.configure = function() {
	$s.push("kumite.scene.InitState::configure");
	var $spos = $s.length;
	this.allowesScreenChange = true;
	$s.pop();
}
kumite.scene.InitState.prototype.__class__ = kumite.scene.InitState;
kumite.scene.IdleState = function(sceneController) { if( sceneController === $_ ) return; {
	$s.push("kumite.scene.IdleState::new");
	var $spos = $s.length;
	kumite.scene.State.call(this,sceneController);
	$s.pop();
}}
kumite.scene.IdleState.__name__ = ["kumite","scene","IdleState"];
kumite.scene.IdleState.__super__ = kumite.scene.State;
for(var k in kumite.scene.State.prototype ) kumite.scene.IdleState.prototype[k] = kumite.scene.State.prototype[k];
kumite.scene.IdleState.prototype.configure = function() {
	$s.push("kumite.scene.IdleState::configure");
	var $spos = $s.length;
	this.allowesScreenChange = true;
	$s.pop();
}
kumite.scene.IdleState.prototype.render = function() {
	$s.push("kumite.scene.IdleState::render");
	var $spos = $s.length;
	this.sceneController.renderNormal();
	$s.pop();
}
kumite.scene.IdleState.prototype.__class__ = kumite.scene.IdleState;
kumite.scene.TransitionState = function(sceneController) { if( sceneController === $_ ) return; {
	$s.push("kumite.scene.TransitionState::new");
	var $spos = $s.length;
	kumite.scene.State.call(this,sceneController);
	$s.pop();
}}
kumite.scene.TransitionState.__name__ = ["kumite","scene","TransitionState"];
kumite.scene.TransitionState.__super__ = kumite.scene.State;
for(var k in kumite.scene.State.prototype ) kumite.scene.TransitionState.prototype[k] = kumite.scene.State.prototype[k];
kumite.scene.TransitionState.prototype.enterTime = null;
kumite.scene.TransitionState.prototype.exitTime = null;
kumite.scene.TransitionState.prototype.enter = function() {
	$s.push("kumite.scene.TransitionState::enter");
	var $spos = $s.length;
	this.enterTime = this.time.ms;
	this.exitTime = this.time.ms + 700;
	$s.pop();
}
kumite.scene.TransitionState.prototype.render = function() {
	$s.push("kumite.scene.TransitionState::render");
	var $spos = $s.length;
	this.sceneController.transitionContext.transition = Map.linear(this.time.ms,this.enterTime,this.exitTime,0,1);
	if(this.sceneController.transitionContext.transition >= 1) {
		this.sceneController.transitionContext.transition = 1;
		this.sceneController.setState(this.sceneController.idleState);
	}
	this.sceneController.renderTransition();
	$s.pop();
}
kumite.scene.TransitionState.prototype.__class__ = kumite.scene.TransitionState;
kumite.scene.NullSceneLifecycle = function(p) { if( p === $_ ) return; {
	$s.push("kumite.scene.NullSceneLifecycle::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.scene.NullSceneLifecycle.__name__ = ["kumite","scene","NullSceneLifecycle"];
kumite.scene.NullSceneLifecycle.prototype.sceneInit = function(scene) {
	$s.push("kumite.scene.NullSceneLifecycle::sceneInit");
	var $spos = $s.length;
	null;
	$s.pop();
}
kumite.scene.NullSceneLifecycle.prototype.render = function() {
	$s.push("kumite.scene.NullSceneLifecycle::render");
	var $spos = $s.length;
	null;
	$s.pop();
}
kumite.scene.NullSceneLifecycle.prototype.renderTransition = function(transitionContext) {
	$s.push("kumite.scene.NullSceneLifecycle::renderTransition");
	var $spos = $s.length;
	null;
	$s.pop();
}
kumite.scene.NullSceneLifecycle.prototype.__class__ = kumite.scene.NullSceneLifecycle;
kumite.scene.NullSceneLifecycle.__interfaces__ = [kumite.scene.SceneLifecycle];
if(!kumite.camera) kumite.camera = {}
kumite.camera.CameraMouseMover = function(p) { if( p === $_ ) return; {
	$s.push("kumite.camera.CameraMouseMover::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.camera.CameraMouseMover.__name__ = ["kumite","camera","CameraMouseMover"];
kumite.camera.CameraMouseMover.prototype.camera = null;
kumite.camera.CameraMouseMover.prototype.init = function() {
	$s.push("kumite.camera.CameraMouseMover::init");
	var $spos = $s.length;
	this.camera.matrix = new Matrix4();
	this.updateCamera();
	$s.pop();
}
kumite.camera.CameraMouseMover.prototype.updateCamera = function() {
	$s.push("kumite.camera.CameraMouseMover::updateCamera");
	var $spos = $s.length;
	this.camera.matrix.identity();
	this.camera.matrix.lookAt(new Vec3(0,0,10),new Vec3(0,0,0),new Vec3(0,1,0));
	$s.pop();
}
kumite.camera.CameraMouseMover.prototype.__class__ = kumite.camera.CameraMouseMover;
kumite.camera.CameraMouseMover.__interfaces__ = [haxe.rtti.Infos];
if(!kumite.webgl) kumite.webgl = {}
kumite.webgl.Config = function(p) { if( p === $_ ) return; {
	$s.push("kumite.webgl.Config::new");
	var $spos = $s.length;
	this.initAction = new kumite.webgl.InitAction();
	this.initAction.antialias = true;
	$s.pop();
}}
kumite.webgl.Config.__name__ = ["kumite","webgl","Config"];
kumite.webgl.Config.prototype.initAction = null;
kumite.webgl.Config.prototype.__class__ = kumite.webgl.Config;
kumite.webgl.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.time.TimeController = function(p) { if( p === $_ ) return; {
	$s.push("kumite.time.TimeController::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
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
GLTexture = function(p) { if( p === $_ ) return; {
	$s.push("GLTexture::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
GLTexture.__name__ = ["GLTexture"];
GLTexture.prototype.width = null;
GLTexture.prototype.height = null;
GLTexture.prototype.texture = null;
GLTexture.prototype.__class__ = GLTexture;
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
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
haxe.TypeTools.prototype.__class__ = haxe.TypeTools;
reflect.ClassInfo = function(name,type) { if( name === $_ ) return; {
	$s.push("reflect.ClassInfo::new");
	var $spos = $s.length;
	this.name = name;
	this.type = type;
	this.hasRtti = type.__rtti != null;
	$s.pop();
}}
reflect.ClassInfo.__name__ = ["reflect","ClassInfo"];
reflect.ClassInfo.forInstance = function(instance) {
	$s.push("reflect.ClassInfo::forInstance");
	var $spos = $s.length;
	if(instance == null) throw "Missing instance";
	var type = Type.getClass(instance);
	if(type == null) throw "Cannot resolve type for instance: " + instance;
	{
		var $tmp = reflect.ClassInfo.forClass(type);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
reflect.ClassInfo.forClass = function(type) {
	$s.push("reflect.ClassInfo::forClass");
	var $spos = $s.length;
	if(type == null) throw "Missing type";
	var name = Type.getClassName(type);
	{
		var $tmp = reflect.ClassInfo.getClassInfo(name,type);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
reflect.ClassInfo.forName = function(name) {
	$s.push("reflect.ClassInfo::forName");
	var $spos = $s.length;
	if(name == null) throw "Missing name";
	var type = Type.resolveClass(name);
	if(type == null) throw "Cannot resolve type for name: " + name;
	{
		var $tmp = reflect.ClassInfo.getClassInfo(name,type);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
reflect.ClassInfo.forCType = function(t) {
	$s.push("reflect.ClassInfo::forCType");
	var $spos = $s.length;
	if(t == null) throw "Missing CType";
	var $e = t;
	switch( $e[1] ) {
	case 4:
	var ret = $e[3], args = $e[2];
	{
		{
			var $tmp = reflect.ClassInfo.forCType(ret);
			$s.pop();
			return $tmp;
		}
	}break;
	case 2:
	var params = $e[3], name = $e[2];
	{
		{
			var $tmp = reflect.ClassInfo.forName(name);
			$s.pop();
			return $tmp;
		}
	}break;
	default:{
		null;
	}break;
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
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
reflect.ClassInfo.getHash = function(name,type) {
	$s.push("reflect.ClassInfo::getHash");
	var $spos = $s.length;
	var hash = name;
	var internalNames = type.__name__;
	if(internalNames != null) hash = internalNames.join(".");
	{
		$s.pop();
		return hash;
	}
	$s.pop();
}
reflect.ClassInfo.prototype.type = null;
reflect.ClassInfo.prototype.name = null;
reflect.ClassInfo.prototype.hasRtti = null;
reflect.ClassInfo.prototype.properties = null;
reflect.ClassInfo.prototype.methods = null;
reflect.ClassInfo.prototype.getProperty = function(name) {
	$s.push("reflect.ClassInfo::getProperty");
	var $spos = $s.length;
	{
		var _g = 0, _g1 = this.getProperties();
		while(_g < _g1.length) {
			var property = _g1[_g];
			++_g;
			if(property.field.name == name) {
				$s.pop();
				return property;
			}
		}
	}
	{
		$s.pop();
		return null;
	}
	$s.pop();
}
reflect.ClassInfo.prototype.getMethod = function(name) {
	$s.push("reflect.ClassInfo::getMethod");
	var $spos = $s.length;
	{
		var _g = 0, _g1 = this.getMethods();
		while(_g < _g1.length) {
			var method = _g1[_g];
			++_g;
			if(method.field.name == name) {
				$s.pop();
				return method;
			}
		}
	}
	{
		$s.pop();
		return null;
	}
	$s.pop();
}
reflect.ClassInfo.prototype.toString = function() {
	$s.push("reflect.ClassInfo::toString");
	var $spos = $s.length;
	{
		var $tmp = "[ClassInfo for class: " + this.name + "]";
		$s.pop();
		return $tmp;
	}
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
	{
		var $tmp = this.properties;
		$s.pop();
		return $tmp;
	}
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
	{
		var $tmp = this.methods;
		$s.pop();
		return $tmp;
	}
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
	$s.pop();
}
reflect.ClassInfo.prototype.scanFields = function(classDef) {
	$s.push("reflect.ClassInfo::scanFields");
	var $spos = $s.length;
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
	$s.pop();
}
reflect.ClassInfo.prototype.__class__ = reflect.ClassInfo;
Matrix3 = function(cloneFrom) { if( cloneFrom === $_ ) return; {
	$s.push("Matrix3::new");
	var $spos = $s.length;
	this.buffer = new Float32Array(9);
	if(cloneFrom != null) {
		this.setFrom(cloneFrom);
	}
	else {
		this.identity();
	}
	$s.pop();
}}
Matrix3.__name__ = ["Matrix3"];
Matrix3.prototype.buffer = null;
Matrix3.prototype.identity = function() {
	$s.push("Matrix3::identity");
	var $spos = $s.length;
	this.buffer[0] = 1;
	this.buffer[1] = 0;
	this.buffer[2] = 0;
	this.buffer[3] = 0;
	this.buffer[4] = 1;
	this.buffer[5] = 0;
	this.buffer[6] = 0;
	this.buffer[7] = 0;
	this.buffer[8] = 1;
	$s.pop();
}
Matrix3.prototype.transpose = function() {
	$s.push("Matrix3::transpose");
	var $spos = $s.length;
	var a01 = this.buffer[1], a02 = this.buffer[2];
	var a12 = this.buffer[5];
	this.buffer[1] = this.buffer[3];
	this.buffer[2] = this.buffer[6];
	this.buffer[3] = a01;
	this.buffer[5] = this.buffer[7];
	this.buffer[6] = a02;
	this.buffer[7] = a12;
	$s.pop();
}
Matrix3.prototype.setFrom = function(from) {
	$s.push("Matrix3::setFrom");
	var $spos = $s.length;
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
	$s.pop();
}
Matrix3.prototype.clone = function() {
	$s.push("Matrix3::clone");
	var $spos = $s.length;
	{
		var $tmp = new Matrix3(this);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Matrix3.prototype.toString = function() {
	$s.push("Matrix3::toString");
	var $spos = $s.length;
	var result = "Matrix3:";
	result += "\r\t" + this.buffer[0] + "," + this.buffer[1] + "," + this.buffer[2];
	result += "\r\t" + this.buffer[3] + "," + this.buffer[4] + "," + this.buffer[5];
	result += "\r\t" + this.buffer[6] + "," + this.buffer[7] + "," + this.buffer[8];
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
Matrix3.prototype.__class__ = Matrix3;
kumite.projection.Projection = function(p) { if( p === $_ ) return; {
	$s.push("kumite.projection.Projection::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.projection.Projection.__name__ = ["kumite","projection","Projection"];
kumite.projection.Projection.prototype.matrix = null;
kumite.projection.Projection.prototype.__class__ = kumite.projection.Projection;
kumite.webgl.InitAction = function(p) { if( p === $_ ) return; {
	$s.push("kumite.webgl.InitAction::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.webgl.InitAction.__name__ = ["kumite","webgl","InitAction"];
kumite.webgl.InitAction.prototype.canvas = null;
kumite.webgl.InitAction.prototype.antialias = null;
kumite.webgl.InitAction.prototype.init = function() {
	$s.push("kumite.webgl.InitAction::init");
	var $spos = $s.length;
	GL.init(this.canvas.itself,this.antialias);
	$s.pop();
}
kumite.webgl.InitAction.prototype.__class__ = kumite.webgl.InitAction;
kumite.webgl.InitAction.__interfaces__ = [haxe.rtti.Infos];
StringBuf = function(p) { if( p === $_ ) return; {
	$s.push("StringBuf::new");
	var $spos = $s.length;
	this.b = new Array();
	$s.pop();
}}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	$s.push("StringBuf::add");
	var $spos = $s.length;
	this.b[this.b.length] = x;
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
	{
		var $tmp = this.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
kumite.stage.StageResizeMessage = function(p) { if( p === $_ ) return; {
	$s.push("kumite.stage.StageResizeMessage::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.stage.StageResizeMessage.__name__ = ["kumite","stage","StageResizeMessage"];
kumite.stage.StageResizeMessage.prototype.__class__ = kumite.stage.StageResizeMessage;
Main = function(canvas) { if( canvas === $_ ) return; {
	$s.push("Main::new");
	var $spos = $s.length;
	if(Log.infoEnabled({ fileName : "Main.hx", lineNumber : 25, className : "Main", methodName : "new"})) {
		Log.fetchInput("Build context",null,null,null,null,null,null);
		console.groupCollapsed(Log.createMessage());
	}
	try {
		var context = bpmjs.ContextBuilder.buildAll([kumite.launch.Config,kumite.stage.Config,kumite.canvas.Config,kumite.webgl.Config,kumite.time.Config,kumite.projection.Config,kumite.camera.Config,kumite.mouse.Config,kumite.displaylist.ConfigAsLayer,kumite.vjinterface.Config,kumite.scene.Config,kumite.testscene.Config]);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				$e = [];
				while($s.length >= $spos) $e.unshift($s.pop());
				$s.push($e[0]);
				{
					Log.posInfo = { fileName : "Main.hx", lineNumber : 46, className : "Main", methodName : "new"};
					if(Log.filter(LogLevel.ERROR)) {
						Log.fetchInput("Error building application! \n" + e,null,null,null,null,null,null);
						console.error(Log.createMessage() + "\n\tStack:\n\t\t" + haxe.Stack.exceptionStack().join("\n\t\t"));
					}
				}
			}
		}
	}
	Log.groupEnd({ fileName : "Main.hx", lineNumber : 48, className : "Main", methodName : "new"});
	$s.pop();
}}
Main.__name__ = ["Main"];
Main.globalErrorHandler = function(msg,stack) {
	$s.push("Main::globalErrorHandler");
	var $spos = $s.length;
	haxe.Log.trace("Uncaugt error: " + msg,{ fileName : "Main.hx", lineNumber : 5, className : "Main", methodName : "globalErrorHandler"});
	{
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			haxe.Log.trace(line,{ fileName : "Main.hx", lineNumber : 7, className : "Main", methodName : "globalErrorHandler"});
		}
	}
	{
		$s.pop();
		return true;
	}
	$s.pop();
}
Main.main = function() {
	$s.push("Main::main");
	var $spos = $s.length;
	Log.init();
	Log.addFilter(new ERegFilter(LogLevel.INFO,new EReg(".*","")));
	Log.addFilter(new ERegFilter(LogLevel.WARN,new EReg(".*FrontMessenger\\.handleMessage.*","")));
	Log.addFilter(new ERegFilter(LogLevel.WARN,new EReg(".*FrontMessenger\\.Receiver\\.execute.*","")));
	js.Lib.setErrorHandler($closure(Main,"globalErrorHandler"));
	$s.pop();
}
Main.prototype.__class__ = Main;
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
GLUniformLocation = function(p) { if( p === $_ ) return; {
	$s.push("GLUniformLocation::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
GLUniformLocation.__name__ = ["GLUniformLocation"];
GLUniformLocation.prototype.location = null;
GLUniformLocation.prototype.uniform1f = function(v) {
	$s.push("GLUniformLocation::uniform1f");
	var $spos = $s.length;
	GL.gl.uniform1f(this.location,v);
	$s.pop();
}
GLUniformLocation.prototype.uniform1fv = function(v) {
	$s.push("GLUniformLocation::uniform1fv");
	var $spos = $s.length;
	GL.gl.uniform1fv(this.location,v);
	$s.pop();
}
GLUniformLocation.prototype.uniform1i = function(v) {
	$s.push("GLUniformLocation::uniform1i");
	var $spos = $s.length;
	GL.gl.uniform1i(this.location,v);
	$s.pop();
}
GLUniformLocation.prototype.uniform1iv = function(v) {
	$s.push("GLUniformLocation::uniform1iv");
	var $spos = $s.length;
	GL.gl.uniform1iv(this.location,v);
	$s.pop();
}
GLUniformLocation.prototype.uniform2f = function(x,y) {
	$s.push("GLUniformLocation::uniform2f");
	var $spos = $s.length;
	GL.gl.uniform2f(this.location,x,y);
	$s.pop();
}
GLUniformLocation.prototype.uniform2fv = function(v) {
	$s.push("GLUniformLocation::uniform2fv");
	var $spos = $s.length;
	GL.gl.uniform2fv(this.location,v);
	$s.pop();
}
GLUniformLocation.prototype.uniform2i = function(x,y) {
	$s.push("GLUniformLocation::uniform2i");
	var $spos = $s.length;
	GL.gl.uniform2i(this.location,x,y);
	$s.pop();
}
GLUniformLocation.prototype.uniform2iv = function(v) {
	$s.push("GLUniformLocation::uniform2iv");
	var $spos = $s.length;
	GL.gl.uniform2iv(this.location,v);
	$s.pop();
}
GLUniformLocation.prototype.uniform3f = function(x,y,z) {
	$s.push("GLUniformLocation::uniform3f");
	var $spos = $s.length;
	GL.gl.uniform3f(this.location,x,y,z);
	$s.pop();
}
GLUniformLocation.prototype.uniform3fv = function(v) {
	$s.push("GLUniformLocation::uniform3fv");
	var $spos = $s.length;
	GL.gl.uniform3fv(this.location,v);
	$s.pop();
}
GLUniformLocation.prototype.uniform3i = function(x,y,z) {
	$s.push("GLUniformLocation::uniform3i");
	var $spos = $s.length;
	GL.gl.uniform3i(this.location,x,y,z);
	$s.pop();
}
GLUniformLocation.prototype.uniform3iv = function(v) {
	$s.push("GLUniformLocation::uniform3iv");
	var $spos = $s.length;
	GL.gl.uniform3iv(this.location,v);
	$s.pop();
}
GLUniformLocation.prototype.uniform4f = function(x,y,z,w) {
	$s.push("GLUniformLocation::uniform4f");
	var $spos = $s.length;
	GL.gl.uniform4f(this.location,x,y,z,w);
	$s.pop();
}
GLUniformLocation.prototype.uniform4fv = function(v) {
	$s.push("GLUniformLocation::uniform4fv");
	var $spos = $s.length;
	GL.gl.uniform4fv(this.location,v);
	$s.pop();
}
GLUniformLocation.prototype.uniform4i = function(x,y,z,w) {
	$s.push("GLUniformLocation::uniform4i");
	var $spos = $s.length;
	GL.gl.uniform4i(this.location,x,y,z,w);
	$s.pop();
}
GLUniformLocation.prototype.uniform4iv = function(v) {
	$s.push("GLUniformLocation::uniform4iv");
	var $spos = $s.length;
	GL.gl.uniform4iv(this.location,v);
	$s.pop();
}
GLUniformLocation.prototype.uniformMatrix2fv = function(transpose,value) {
	$s.push("GLUniformLocation::uniformMatrix2fv");
	var $spos = $s.length;
	if(transpose == null) transpose = false;
	GL.gl.uniformMatrix2fv(this.location,transpose,value);
	$s.pop();
}
GLUniformLocation.prototype.uniformMatrix3fv = function(transpose,value) {
	$s.push("GLUniformLocation::uniformMatrix3fv");
	var $spos = $s.length;
	if(transpose == null) transpose = false;
	GL.gl.uniformMatrix3fv(this.location,transpose,value);
	$s.pop();
}
GLUniformLocation.prototype.uniformMatrix4fv = function(transpose,value) {
	$s.push("GLUniformLocation::uniformMatrix4fv");
	var $spos = $s.length;
	if(transpose == null) transpose = false;
	GL.gl.uniformMatrix4fv(this.location,transpose,value);
	$s.pop();
}
GLUniformLocation.prototype.setMatrix3 = function(matrix) {
	$s.push("GLUniformLocation::setMatrix3");
	var $spos = $s.length;
	GL.gl.uniformMatrix3fv(this.location,false,matrix.buffer);
	$s.pop();
}
GLUniformLocation.prototype.setMatrix4 = function(matrix) {
	$s.push("GLUniformLocation::setMatrix4");
	var $spos = $s.length;
	GL.gl.uniformMatrix4fv(this.location,false,matrix.buffer);
	$s.pop();
}
GLUniformLocation.prototype.setVec3 = function(vec) {
	$s.push("GLUniformLocation::setVec3");
	var $spos = $s.length;
	GL.gl.uniform3f(this.location,vec.x,vec.y,vec.z);
	$s.pop();
}
GLUniformLocation.prototype.setRGB = function(color) {
	$s.push("GLUniformLocation::setRGB");
	var $spos = $s.length;
	GL.gl.uniform3f(this.location,color.r,color.g,color.b);
	$s.pop();
}
GLUniformLocation.prototype.setRGBA = function(color) {
	$s.push("GLUniformLocation::setRGBA");
	var $spos = $s.length;
	GL.gl.uniform4f(this.location,color.r,color.g,color.b,color.a);
	$s.pop();
}
GLUniformLocation.prototype.setTexture = function(texture,index) {
	$s.push("GLUniformLocation::setTexture");
	var $spos = $s.length;
	if(index == null) index = 0;
	GL.gl.activeTexture(33984 + index);
	GL.gl.bindTexture(3553,texture.texture);
	GL.gl.uniform1i(this.location,index);
	$s.pop();
}
GLUniformLocation.prototype.__class__ = GLUniformLocation;
kumite.projection.Config = function(p) { if( p === $_ ) return; {
	$s.push("kumite.projection.Config::new");
	var $spos = $s.length;
	this.projection = new kumite.projection.Projection();
	this.projectionController = new kumite.projection.ProjectionController();
	this.projectionController.fov = 40;
	this.projectionController.near = 0.1;
	this.projectionController.far = 500;
	$s.pop();
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
	$s.push("kumite.camera.Camera::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.camera.Camera.__name__ = ["kumite","camera","Camera"];
kumite.camera.Camera.prototype.matrix = null;
kumite.camera.Camera.prototype.__class__ = kumite.camera.Camera;
if(!kumite.vjinterface) kumite.vjinterface = {}
kumite.vjinterface.VJInterface = function(p) { if( p === $_ ) return; {
	$s.push("kumite.vjinterface.VJInterface::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.vjinterface.VJInterface.__name__ = ["kumite","vjinterface","VJInterface"];
kumite.vjinterface.VJInterface.prototype.scenes = null;
kumite.vjinterface.VJInterface.prototype.messenger = null;
kumite.vjinterface.VJInterface.prototype.stage = null;
kumite.vjinterface.VJInterface.prototype.cutButton = null;
kumite.vjinterface.VJInterface.prototype.shortButton = null;
kumite.vjinterface.VJInterface.prototype.longButton = null;
kumite.vjinterface.VJInterface.prototype.sceneContainer = null;
kumite.vjinterface.VJInterface.prototype.start = function() {
	$s.push("kumite.vjinterface.VJInterface::start");
	var $spos = $s.length;
	this.stage = GLDisplayList.getDefault().stage;
	this.addTransitionButtons();
	this.addSceneButtons();
	$s.pop();
}
kumite.vjinterface.VJInterface.prototype.render = function(tick) {
	$s.push("kumite.vjinterface.VJInterface::render");
	var $spos = $s.length;
	this.cutButton.setY(this.stage.stageHeight - 90);
	this.shortButton.setY(this.stage.stageHeight - 60);
	this.longButton.setY(this.stage.stageHeight - 30);
	this.sceneContainer.setY(this.stage.stageHeight - 30);
	$s.pop();
}
kumite.vjinterface.VJInterface.prototype.addTransitionButtons = function() {
	$s.push("kumite.vjinterface.VJInterface::addTransitionButtons");
	var $spos = $s.length;
	this.cutButton = new GLLabel();
	this.cutButton.setX(10);
	this.cutButton.setText("CUT");
	this.cutButton.setWidth(80);
	this.cutButton.setHeight(20);
	this.stage.addChild(this.cutButton);
	this.shortButton = new GLLabel();
	this.shortButton.setX(10);
	this.shortButton.setText("SHORT");
	this.shortButton.setWidth(80);
	this.shortButton.setHeight(20);
	this.stage.addChild(this.shortButton);
	this.longButton = new GLLabel();
	this.longButton.setX(10);
	this.longButton.setText("LONG");
	this.longButton.setWidth(80);
	this.longButton.setHeight(20);
	this.stage.addChild(this.longButton);
	$s.pop();
}
kumite.vjinterface.VJInterface.prototype.addSceneButtons = function() {
	$s.push("kumite.vjinterface.VJInterface::addSceneButtons");
	var $spos = $s.length;
	this.sceneContainer = new GLDisplayObjectContainer();
	this.sceneContainer.setX(100);
	this.stage.addChild(this.sceneContainer);
	var currentX = 10;
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
	$s.pop();
}
kumite.vjinterface.VJInterface.prototype.createSceneRequest = function(scene) {
	$s.push("kumite.vjinterface.VJInterface::createSceneRequest");
	var $spos = $s.length;
	var inst = this;
	{
		var $tmp = function(button) {
			$s.push("kumite.vjinterface.VJInterface::createSceneRequest@97");
			var $spos = $s.length;
			inst.handleButtonClick(scene);
			$s.pop();
		}
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
kumite.vjinterface.VJInterface.prototype.handleButtonClick = function(scene) {
	$s.push("kumite.vjinterface.VJInterface::handleButtonClick");
	var $spos = $s.length;
	this.messenger.send(new kumite.scene.SceneChangeRequest(scene.id));
	$s.pop();
}
kumite.vjinterface.VJInterface.prototype.__class__ = kumite.vjinterface.VJInterface;
kumite.vjinterface.VJInterface.__interfaces__ = [haxe.rtti.Infos];
GLHitarea = function(p) { if( p === $_ ) return; {
	$s.push("GLHitarea::new");
	var $spos = $s.length;
	this.position = new Vec2();
	this.size = new Vec2();
	$s.pop();
}}
GLHitarea.__name__ = ["GLHitarea"];
GLHitarea.prototype.position = null;
GLHitarea.prototype.size = null;
GLHitarea.prototype.isUnder = function(matrix,positionOnStage) {
	$s.push("GLHitarea::isUnder");
	var $spos = $s.length;
	var tl = this.position.clone();
	tl.transform(matrix);
	var br = this.size.clone();
	br.transform(matrix);
	{
		var $tmp = tl.x <= positionOnStage.x && br.x >= positionOnStage.x && tl.y <= positionOnStage.y && br.y >= positionOnStage.y;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GLHitarea.prototype.__class__ = GLHitarea;
kumite.displaylist.DisplayListLayer = function(p) { if( p === $_ ) return; {
	$s.push("kumite.displaylist.DisplayListLayer::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.displaylist.DisplayListLayer.__name__ = ["kumite","displaylist","DisplayListLayer"];
kumite.displaylist.DisplayListLayer.prototype.stage = null;
kumite.displaylist.DisplayListLayer.prototype.layerId = null;
kumite.displaylist.DisplayListLayer.prototype.renderer = null;
kumite.displaylist.DisplayListLayer.prototype.init = function() {
	$s.push("kumite.displaylist.DisplayListLayer::init");
	var $spos = $s.length;
	this.layerId = "DisplayListLayer";
	this.renderer = new GLDisplayListRenderer();
	this.renderer.init();
	$s.pop();
}
kumite.displaylist.DisplayListLayer.prototype.renderTransition = function(transitionContext) {
	$s.push("kumite.displaylist.DisplayListLayer::renderTransition");
	var $spos = $s.length;
	this.render();
	$s.pop();
}
kumite.displaylist.DisplayListLayer.prototype.render = function() {
	$s.push("kumite.displaylist.DisplayListLayer::render");
	var $spos = $s.length;
	bpmjs.Stats.measureFPS();
	GLDisplayList.getDefault().setStageSize(this.stage.width,this.stage.height);
	GLDisplayList.getDefault().dispatchEnterFrame();
	this.renderer.render(this.stage.width,this.stage.height);
	$s.pop();
}
kumite.displaylist.DisplayListLayer.prototype.__class__ = kumite.displaylist.DisplayListLayer;
kumite.displaylist.DisplayListLayer.__interfaces__ = [kumite.scene.LayerLifecycle,haxe.rtti.Infos];
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	$s.push("Std::is");
	var $spos = $s.length;
	{
		var $tmp = js.Boot.__instanceof(v,t);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std.string = function(s) {
	$s.push("Std::string");
	var $spos = $s.length;
	{
		var $tmp = js.Boot.__string_rec(s,"");
		$s.pop();
		return $tmp;
	}
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
	{
		var $tmp = Math.floor(x);
		$s.pop();
		return $tmp;
	}
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
	{
		var $tmp = v;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std.parseFloat = function(x) {
	$s.push("Std::parseFloat");
	var $spos = $s.length;
	{
		var $tmp = parseFloat(x);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std.random = function(x) {
	$s.push("Std::random");
	var $spos = $s.length;
	{
		var $tmp = Math.floor(Math.random() * x);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Std.prototype.__class__ = Std;
kumite.stage.Stage = function(p) { if( p === $_ ) return; {
	$s.push("kumite.stage.Stage::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.stage.Stage.__name__ = ["kumite","stage","Stage"];
kumite.stage.Stage.prototype.width = null;
kumite.stage.Stage.prototype.height = null;
kumite.stage.Stage.prototype.aspect = null;
kumite.stage.Stage.prototype.getAspect = function() {
	$s.push("kumite.stage.Stage::getAspect");
	var $spos = $s.length;
	{
		var $tmp = this.width / this.height;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
kumite.stage.Stage.prototype.__class__ = kumite.stage.Stage;
kumite.scene.SceneAndLifecycle = function(p) { if( p === $_ ) return; {
	$s.push("kumite.scene.SceneAndLifecycle::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
kumite.scene.SceneAndLifecycle.__name__ = ["kumite","scene","SceneAndLifecycle"];
kumite.scene.SceneAndLifecycle.prototype.scene = null;
kumite.scene.SceneAndLifecycle.prototype.lifecycle = null;
kumite.scene.SceneAndLifecycle.prototype.__class__ = kumite.scene.SceneAndLifecycle;
if(!haxe.exception) haxe.exception = {}
haxe.exception.Exception = function(message,innerException,numberOfStackTraceShifts) { if( message === $_ ) return; {
	$s.push("haxe.exception.Exception::new");
	var $spos = $s.length;
	this.message = null == message?"Unknown exception":message;
	this.innerException = innerException;
	this.generateStackTrace(numberOfStackTraceShifts);
	this.stackTrace = this.stackTraceArray;
	$s.pop();
}}
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
	while(null != result.innerException) {
		result = result.innerException;
	}
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
haxe.exception.Exception.prototype.toString = function() {
	$s.push("haxe.exception.Exception::toString");
	var $spos = $s.length;
	{
		var $tmp = this.message + haxe.Stack.toString(this.stackTraceArray);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.exception.Exception.prototype.__class__ = haxe.exception.Exception;
haxe.Timer = function(time_ms) { if( time_ms === $_ ) return; {
	$s.push("haxe.Timer::new");
	var $spos = $s.length;
	this.id = haxe.Timer.arr.length;
	haxe.Timer.arr[this.id] = this;
	this.timerId = window.setInterval("haxe.Timer.arr[" + this.id + "].run();",time_ms);
	$s.pop();
}}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	$s.push("haxe.Timer::delay");
	var $spos = $s.length;
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		$s.push("haxe.Timer::delay@78");
		var $spos = $s.length;
		t.stop();
		f();
		$s.pop();
	}
	{
		$s.pop();
		return t;
	}
	$s.pop();
}
haxe.Timer.measure = function(f,pos) {
	$s.push("haxe.Timer::measure");
	var $spos = $s.length;
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	{
		$s.pop();
		return r;
	}
	$s.pop();
}
haxe.Timer.stamp = function() {
	$s.push("haxe.Timer::stamp");
	var $spos = $s.length;
	{
		var $tmp = Date.now().getTime() / 1000;
		$s.pop();
		return $tmp;
	}
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
	haxe.Timer.arr[this.id] = null;
	if(this.id > 100 && this.id == haxe.Timer.arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && haxe.Timer.arr[p] == null) p--;
		haxe.Timer.arr = haxe.Timer.arr.slice(0,p + 1);
	}
	this.id = null;
	$s.pop();
}
haxe.Timer.prototype.run = function() {
	$s.push("haxe.Timer::run");
	var $spos = $s.length;
	null;
	$s.pop();
}
haxe.Timer.prototype.__class__ = haxe.Timer;
Vec3 = function(x,y,z) { if( x === $_ ) return; {
	$s.push("Vec3::new");
	var $spos = $s.length;
	this.x = x;
	this.y = y;
	this.z = z;
	$s.pop();
}}
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
	{
		$s.pop();
		return this;
	}
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
}
Vec3.prototype.cross = function(vec) {
	$s.push("Vec3::cross");
	var $spos = $s.length;
	var x = this.y * vec.z - this.z * vec.y;
	var y = this.z * vec.x - this.x * vec.z;
	var z = this.x * vec.y - this.y * vec.x;
	{
		var $tmp = new Vec3(x,y,z);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Vec3.prototype.dot = function(vec) {
	$s.push("Vec3::dot");
	var $spos = $s.length;
	{
		var $tmp = this.x * vec.x + this.y * vec.y + this.z * vec.z;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Vec3.prototype.transform = function(matrix) {
	$s.push("Vec3::transform");
	var $spos = $s.length;
	var x1 = this.x, y1 = this.y, z1 = this.z;
	var mat = matrix.buffer;
	this.x = mat[0] * x1 + mat[4] * y1 + mat[8] * z1 + mat[12];
	this.y = mat[1] * x1 + mat[5] * y1 + mat[9] * z1 + mat[13];
	this.z = mat[2] * x1 + mat[6] * y1 + mat[10] * z1 + mat[14];
	$s.pop();
}
Vec3.prototype.setFrom = function(value,vec3) {
	$s.push("Vec3::setFrom");
	var $spos = $s.length;
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
	$s.pop();
}
Vec3.prototype.clone = function() {
	$s.push("Vec3::clone");
	var $spos = $s.length;
	{
		var $tmp = new Vec3(this.x,this.y,this.z);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Vec3.prototype.__class__ = Vec3;
if(!haxe.xml) haxe.xml = {}
if(!haxe.xml._Fast) haxe.xml._Fast = {}
haxe.xml._Fast.NodeAccess = function(x) { if( x === $_ ) return; {
	$s.push("haxe.xml._Fast.NodeAccess::new");
	var $spos = $s.length;
	this.__x = x;
	$s.pop();
}}
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
	{
		var $tmp = new haxe.xml.Fast(x);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.xml._Fast.NodeAccess.prototype.__class__ = haxe.xml._Fast.NodeAccess;
haxe.xml._Fast.AttribAccess = function(x) { if( x === $_ ) return; {
	$s.push("haxe.xml._Fast.AttribAccess::new");
	var $spos = $s.length;
	this.__x = x;
	$s.pop();
}}
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype.__x = null;
haxe.xml._Fast.AttribAccess.prototype.resolve = function(name) {
	$s.push("haxe.xml._Fast.AttribAccess::resolve");
	var $spos = $s.length;
	if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
	var v = this.__x.get(name);
	if(v == null) throw this.__x.getNodeName() + " is missing attribute " + name;
	{
		$s.pop();
		return v;
	}
	$s.pop();
}
haxe.xml._Fast.AttribAccess.prototype.__class__ = haxe.xml._Fast.AttribAccess;
haxe.xml._Fast.HasAttribAccess = function(x) { if( x === $_ ) return; {
	$s.push("haxe.xml._Fast.HasAttribAccess::new");
	var $spos = $s.length;
	this.__x = x;
	$s.pop();
}}
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype.__x = null;
haxe.xml._Fast.HasAttribAccess.prototype.resolve = function(name) {
	$s.push("haxe.xml._Fast.HasAttribAccess::resolve");
	var $spos = $s.length;
	if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
	{
		var $tmp = this.__x.exists(name);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.xml._Fast.HasAttribAccess.prototype.__class__ = haxe.xml._Fast.HasAttribAccess;
haxe.xml._Fast.HasNodeAccess = function(x) { if( x === $_ ) return; {
	$s.push("haxe.xml._Fast.HasNodeAccess::new");
	var $spos = $s.length;
	this.__x = x;
	$s.pop();
}}
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype.__x = null;
haxe.xml._Fast.HasNodeAccess.prototype.resolve = function(name) {
	$s.push("haxe.xml._Fast.HasNodeAccess::resolve");
	var $spos = $s.length;
	{
		var $tmp = this.__x.elementsNamed(name).hasNext();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.xml._Fast.HasNodeAccess.prototype.__class__ = haxe.xml._Fast.HasNodeAccess;
haxe.xml._Fast.NodeListAccess = function(x) { if( x === $_ ) return; {
	$s.push("haxe.xml._Fast.NodeListAccess::new");
	var $spos = $s.length;
	this.__x = x;
	$s.pop();
}}
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype.__x = null;
haxe.xml._Fast.NodeListAccess.prototype.resolve = function(name) {
	$s.push("haxe.xml._Fast.NodeListAccess::resolve");
	var $spos = $s.length;
	var l = new List();
	{ var $it0 = this.__x.elementsNamed(name);
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(new haxe.xml.Fast(x));
	}}
	{
		$s.pop();
		return l;
	}
	$s.pop();
}
haxe.xml._Fast.NodeListAccess.prototype.__class__ = haxe.xml._Fast.NodeListAccess;
haxe.xml.Fast = function(x) { if( x === $_ ) return; {
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
	$s.push("haxe.xml.Fast::getName");
	var $spos = $s.length;
	{
		var $tmp = this.x.nodeType == Xml.Document?"Document":this.x.getNodeName();
		$s.pop();
		return $tmp;
	}
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
	{
		var $tmp = v.getNodeValue();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.xml.Fast.prototype.getInnerHTML = function() {
	$s.push("haxe.xml.Fast::getInnerHTML");
	var $spos = $s.length;
	var s = new StringBuf();
	{ var $it0 = this.x.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	s.b[s.b.length] = x.toString();
	}}
	{
		var $tmp = s.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.xml.Fast.prototype.getElements = function() {
	$s.push("haxe.xml.Fast::getElements");
	var $spos = $s.length;
	var it = this.x.elements();
	{
		var $tmp = { hasNext : $closure(it,"hasNext"), next : function() {
			$s.push("haxe.xml.Fast::getElements@163");
			var $spos = $s.length;
			var x = it.next();
			if(x == null) {
				$s.pop();
				return null;
			}
			{
				var $tmp = new haxe.xml.Fast(x);
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}};
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.xml.Fast.prototype.__class__ = haxe.xml.Fast;
if(typeof shader=='undefined') shader = {}
shader.DisplayObjectVertex = function() { }
shader.DisplayObjectVertex.__name__ = ["shader","DisplayObjectVertex"];
shader.DisplayObjectVertex.prototype.__class__ = shader.DisplayObjectVertex;
kumite.helloworldgl.shader.Vertex = function() { }
kumite.helloworldgl.shader.Vertex.__name__ = ["kumite","helloworldgl","shader","Vertex"];
kumite.helloworldgl.shader.Vertex.prototype.__class__ = kumite.helloworldgl.shader.Vertex;
haxe.rtti.Meta = function() { }
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getType = function(t) {
	$s.push("haxe.rtti.Meta::getType");
	var $spos = $s.length;
	var meta = t.__meta__;
	{
		var $tmp = meta == null?meta:meta.obj;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.rtti.Meta.getStatics = function(t) {
	$s.push("haxe.rtti.Meta::getStatics");
	var $spos = $s.length;
	var meta = t.__meta__;
	{
		var $tmp = meta == null?meta:meta.statics;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.rtti.Meta.getFields = function(t) {
	$s.push("haxe.rtti.Meta::getFields");
	var $spos = $s.length;
	var meta = t.__meta__;
	{
		var $tmp = meta == null?meta:meta.fields;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
haxe.rtti.Meta.prototype.__class__ = haxe.rtti.Meta;
kumite.stage.StageResizeAction = function(p) { if( p === $_ ) return; {
	$s.push("kumite.stage.StageResizeAction::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
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
GL = function() { }
GL.__name__ = ["GL"];
GL.gl = null;
GL.currentProgramm = null;
GL.init = function(canvas,antialias) {
	$s.push("GL::init");
	var $spos = $s.length;
	var params = { antialias : antialias};
	GL.gl = canvas.getContext("webgl",params);
	if(GL.gl == null) GL.gl = canvas.getContext("experimental-webgl",params);
	if(GL.gl == null) {
		throw "Could not initialise WebGL.";
	}
	{
		var $tmp = GL.gl;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GL.useProgram = function(shaderProgramm) {
	$s.push("GL::useProgram");
	var $spos = $s.length;
	GL.currentProgramm = shaderProgramm;
	GL.gl.useProgram(GL.currentProgramm);
	$s.pop();
}
GL.createProgram = function(vertexSourceClass,fragmentSourceClass) {
	$s.push("GL::createProgram");
	var $spos = $s.length;
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
	{
		var $tmp = GL.currentProgramm;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GL.createGLSLFromClass = function(shaderClass) {
	$s.push("GL::createGLSLFromClass");
	var $spos = $s.length;
	var metaDatas = haxe.rtti.Meta.getType(shaderClass);
	var glsl = Reflect.field(metaDatas,"GLSL");
	if(glsl.length != 1) throw "Missing GLSL metadata in shader class: " + shaderClass;
	{
		var $tmp = glsl[0];
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GL.createArrayBuffer = function(array,type) {
	$s.push("GL::createArrayBuffer");
	var $spos = $s.length;
	if(type == null) type = 35044;
	var vertexBuffer = GL.gl.createBuffer();
	GL.gl.bindBuffer(GL.gl.ARRAY_BUFFER,vertexBuffer);
	GL.gl.bufferData(GL.gl.ARRAY_BUFFER,array,type);
	{
		$s.pop();
		return vertexBuffer;
	}
	$s.pop();
}
GL.getUniformLocation = function(name) {
	$s.push("GL::getUniformLocation");
	var $spos = $s.length;
	var location = GL.gl.getUniformLocation(GL.currentProgramm,name);
	if(location == null) haxe.Log.trace("Could not find " + name + " in shader",{ fileName : "GL.hx", lineNumber : 458, className : "GL", methodName : "getUniformLocation"});
	var result = new GLUniformLocation();
	result.location = location;
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
GL.getAttribLocation2 = function(name,size,type) {
	$s.push("GL::getAttribLocation2");
	var $spos = $s.length;
	var location = GL.gl.getAttribLocation(GL.currentProgramm,name);
	if(location == null) haxe.Log.trace("Could not find " + name + " in shader",{ fileName : "GL.hx", lineNumber : 469, className : "GL", methodName : "getAttribLocation2"});
	var result = new GLAttribLocation();
	result.location = location;
	result.size = size;
	result.type = type;
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
GL.activeTexture = function(texture) {
	$s.push("GL::activeTexture");
	var $spos = $s.length;
	GL.gl.activeTexture(texture);
	$s.pop();
}
GL.bindBuffer = function(target,buffer) {
	$s.push("GL::bindBuffer");
	var $spos = $s.length;
	GL.gl.bindBuffer(target,buffer);
	$s.pop();
}
GL.bindFramebuffer = function(target,framebuffer) {
	$s.push("GL::bindFramebuffer");
	var $spos = $s.length;
	null;
	$s.pop();
}
GL.bindRenderbuffer = function(target,renderbuffer) {
	$s.push("GL::bindRenderbuffer");
	var $spos = $s.length;
	null;
	$s.pop();
}
GL.bindTexture = function(target,texture) {
	$s.push("GL::bindTexture");
	var $spos = $s.length;
	GL.gl.bindTexture(target,texture);
	$s.pop();
}
GL.blendFunc = function(sfactor,dfactor) {
	$s.push("GL::blendFunc");
	var $spos = $s.length;
	GL.gl.blendFunc(sfactor,dfactor);
	$s.pop();
}
GL.bufferData = function(target,data,usage) {
	$s.push("GL::bufferData");
	var $spos = $s.length;
	GL.gl.bufferData(target,data,usage);
	$s.pop();
}
GL.clear = function(mask) {
	$s.push("GL::clear");
	var $spos = $s.length;
	GL.gl.clear(mask);
	$s.pop();
}
GL.clearColor = function(red,green,blue,alpha) {
	$s.push("GL::clearColor");
	var $spos = $s.length;
	GL.gl.clearColor(red,green,blue,alpha);
	$s.pop();
}
GL.clearDepth = function(depth) {
	$s.push("GL::clearDepth");
	var $spos = $s.length;
	null;
	$s.pop();
}
GL.compileShader = function(shader) {
	$s.push("GL::compileShader");
	var $spos = $s.length;
	null;
	$s.pop();
}
GL.createBuffer = function() {
	$s.push("GL::createBuffer");
	var $spos = $s.length;
	{
		var $tmp = GL.gl.createBuffer();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GL.createFramebuffer = function() {
	$s.push("GL::createFramebuffer");
	var $spos = $s.length;
	{
		var $tmp = GL.gl.createFramebuffer();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GL.createRenderbuffer = function() {
	$s.push("GL::createRenderbuffer");
	var $spos = $s.length;
	{
		var $tmp = GL.gl.createRenderbuffer();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GL.createTexture = function() {
	$s.push("GL::createTexture");
	var $spos = $s.length;
	{
		var $tmp = GL.gl.createTexture();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GL.createShader = function(type) {
	$s.push("GL::createShader");
	var $spos = $s.length;
	{
		var $tmp = GL.gl.createShader(type);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GL.deleteBuffer = function(buffer) {
	$s.push("GL::deleteBuffer");
	var $spos = $s.length;
	GL.gl.deleteBuffer(buffer);
	$s.pop();
}
GL.disable = function(cap) {
	$s.push("GL::disable");
	var $spos = $s.length;
	GL.gl.disable(cap);
	$s.pop();
}
GL.drawArrays = function(mode,first,count) {
	$s.push("GL::drawArrays");
	var $spos = $s.length;
	GL.gl.drawArrays(mode,first,count);
	$s.pop();
}
GL.enable = function(cap) {
	$s.push("GL::enable");
	var $spos = $s.length;
	GL.gl.enable(cap);
	$s.pop();
}
GL.enableVertexAttribArray = function(index) {
	$s.push("GL::enableVertexAttribArray");
	var $spos = $s.length;
	GL.gl.enableVertexAttribArray(index);
	$s.pop();
}
GL.framebufferRenderbuffer = function(target,attachment,renderbuffertarget,renderbuffer) {
	$s.push("GL::framebufferRenderbuffer");
	var $spos = $s.length;
	null;
	$s.pop();
}
GL.framebufferTexture2D = function(target,attachment,textarget,texture,level) {
	$s.push("GL::framebufferTexture2D");
	var $spos = $s.length;
	null;
	$s.pop();
}
GL.generateMipmap = function(target) {
	$s.push("GL::generateMipmap");
	var $spos = $s.length;
	null;
	$s.pop();
}
GL.getAttribLocation = function(program,name) {
	$s.push("GL::getAttribLocation");
	var $spos = $s.length;
	{
		var $tmp = GL.gl.getAttribLocation(program,name);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GL.getShaderInfoLog = function(shader) {
	$s.push("GL::getShaderInfoLog");
	var $spos = $s.length;
	{
		var $tmp = GL.gl.getShaderInfoLog(shader);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GL.getShaderParameter = function(shader,pname) {
	$s.push("GL::getShaderParameter");
	var $spos = $s.length;
	null;
	$s.pop();
}
GL.getProgramParameter = function(program,pname) {
	$s.push("GL::getProgramParameter");
	var $spos = $s.length;
	null;
	$s.pop();
}
GL.linkProgram = function(program) {
	$s.push("GL::linkProgram");
	var $spos = $s.length;
	null;
	$s.pop();
}
GL.renderbufferStorage = function(target,internalformat,width,height) {
	$s.push("GL::renderbufferStorage");
	var $spos = $s.length;
	null;
	$s.pop();
}
GL.shaderSource = function(shader,source) {
	$s.push("GL::shaderSource");
	var $spos = $s.length;
	null;
	$s.pop();
}
GL.texImage2DArrayBufferView = function(target,level,internalformat,width,height,border,format,type,pixels) {
	$s.push("GL::texImage2DArrayBufferView");
	var $spos = $s.length;
	GL.gl.texImage2D(target,level,internalformat,width,height,border,format,type,pixels);
	$s.pop();
}
GL.texImage2DImageData = function(target,level,internalformat,format,type,pixels) {
	$s.push("GL::texImage2DImageData");
	var $spos = $s.length;
	GL.gl.texImage2D(target,level,internalformat,format,type,pixels);
	$s.pop();
}
GL.texImage2DImage = function(target,level,internalformat,format,type,image) {
	$s.push("GL::texImage2DImage");
	var $spos = $s.length;
	GL.gl.texImage2D(target,level,internalformat,format,type,image);
	$s.pop();
}
GL.texImage2DCanvas = function(target,level,internalformat,format,type,canvas) {
	$s.push("GL::texImage2DCanvas");
	var $spos = $s.length;
	GL.gl.texImage2D(target,level,internalformat,format,type,canvas);
	$s.pop();
}
GL.texImage2DVideo = function(target,level,internalformat,format,type,video) {
	$s.push("GL::texImage2DVideo");
	var $spos = $s.length;
	GL.gl.texImage2D(target,level,internalformat,format,type,video);
	$s.pop();
}
GL.texParameteri = function(target,pname,param) {
	$s.push("GL::texParameteri");
	var $spos = $s.length;
	null;
	$s.pop();
}
GL.vertexAttribPointer = function(indx,size,type,normalized,stride,offset) {
	$s.push("GL::vertexAttribPointer");
	var $spos = $s.length;
	GL.gl.vertexAttribPointer(indx,size,type,normalized,stride,offset);
	$s.pop();
}
GL.viewport = function(x,y,width,height) {
	$s.push("GL::viewport");
	var $spos = $s.length;
	GL.gl.viewport(x,y,width,height);
	$s.pop();
}
GL.prototype.__class__ = GL;
GLHitareaPicker = function(p) { if( p === $_ ) return; {
	$s.push("GLHitareaPicker::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
GLHitareaPicker.__name__ = ["GLHitareaPicker"];
GLHitareaPicker.prototype.stageMousePosition = null;
GLHitareaPicker.prototype.result = null;
GLHitareaPicker.prototype.pick = function(stage,mousePosition) {
	$s.push("GLHitareaPicker::pick");
	var $spos = $s.length;
	this.stageMousePosition = mousePosition.clone();
	this.stageMousePosition.multiply(stage.stageWidth,stage.stageHeight);
	this.result = null;
	this.pickRecursive(stage,new Matrix4());
	{
		var $tmp = this.result;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
GLHitareaPicker.prototype.pickRecursive = function(displayObjectContainer,parentMatrix) {
	$s.push("GLHitareaPicker::pickRecursive");
	var $spos = $s.length;
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
	$s.pop();
}
GLHitareaPicker.prototype.pickDisplayObject = function(displayObject,parentMatrix) {
	$s.push("GLHitareaPicker::pickDisplayObject");
	var $spos = $s.length;
	displayObject.validateTransform();
	var result = new Matrix4();
	result.multiply(parentMatrix);
	result.multiply(displayObject.matrix);
	{
		$s.pop();
		return result;
	}
	$s.pop();
}
GLHitareaPicker.prototype.__class__ = GLHitareaPicker;
shader.DisplayObjectFragment = function() { }
shader.DisplayObjectFragment.__name__ = ["shader","DisplayObjectFragment"];
shader.DisplayObjectFragment.prototype.__class__ = shader.DisplayObjectFragment;
kumite.camera.Config = function(p) { if( p === $_ ) return; {
	$s.push("kumite.camera.Config::new");
	var $spos = $s.length;
	this.camera = new kumite.camera.Camera();
	this.cameraMouseMover = new kumite.camera.CameraMouseMover();
	$s.pop();
}}
kumite.camera.Config.__name__ = ["kumite","camera","Config"];
kumite.camera.Config.prototype.camera = null;
kumite.camera.Config.prototype.cameraMouseMover = null;
kumite.camera.Config.prototype.__class__ = kumite.camera.Config;
kumite.camera.Config.__interfaces__ = [haxe.rtti.Infos];
kumite.vjinterface.Config = function(p) { if( p === $_ ) return; {
	$s.push("kumite.vjinterface.Config::new");
	var $spos = $s.length;
	this.vjinterface = new kumite.vjinterface.VJInterface();
	$s.pop();
}}
kumite.vjinterface.Config.__name__ = ["kumite","vjinterface","Config"];
kumite.vjinterface.Config.prototype.vjinterface = null;
kumite.vjinterface.Config.prototype.__class__ = kumite.vjinterface.Config;
kumite.vjinterface.Config.__interfaces__ = [haxe.rtti.Infos];
bpmjs.ReflectUtil = function() { }
bpmjs.ReflectUtil.__name__ = ["bpmjs","ReflectUtil"];
bpmjs.ReflectUtil.callMethodWithMetadata = function(object,type,metadata,args) {
	$s.push("bpmjs.ReflectUtil::callMethodWithMetadata");
	var $spos = $s.length;
	var metadatas = haxe.rtti.Meta.getFields(type);
	{
		var _g = 0, _g1 = Reflect.fields(metadatas);
		while(_g < _g1.length) {
			var fieldName = _g1[_g];
			++_g;
			var meta = Reflect.field(metadatas,fieldName);
			if(Reflect.hasField(meta,metadata)) {
				{
					var $tmp = Reflect.field(object,fieldName).apply(object,[]);
					$s.pop();
					return $tmp;
				}
			}
		}
	}
	{
		$s.pop();
		return null;
	}
	$s.pop();
}
bpmjs.ReflectUtil.getClassName = function(object) {
	$s.push("bpmjs.ReflectUtil::getClassName");
	var $spos = $s.length;
	{
		var $tmp = Type.getClassName(Type.getClass(object));
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
bpmjs.ReflectUtil.prototype.__class__ = bpmjs.ReflectUtil;
haxe.exception.ArgumentNullException = function(argumentName,numberOfStackTraceShifts) { if( argumentName === $_ ) return; {
	$s.push("haxe.exception.ArgumentNullException::new");
	var $spos = $s.length;
	haxe.exception.Exception.call(this,"Argument " + argumentName + " must be non-null",null,numberOfStackTraceShifts);
	$s.pop();
}}
haxe.exception.ArgumentNullException.__name__ = ["haxe","exception","ArgumentNullException"];
haxe.exception.ArgumentNullException.__super__ = haxe.exception.Exception;
for(var k in haxe.exception.Exception.prototype ) haxe.exception.ArgumentNullException.prototype[k] = haxe.exception.Exception.prototype[k];
haxe.exception.ArgumentNullException.prototype.__class__ = haxe.exception.ArgumentNullException;
bpmjs.Context = function(p) { if( p === $_ ) return; {
	$s.push("bpmjs.Context::new");
	var $spos = $s.length;
	this.objects = new Array();
	this.observers = new Array();
	$s.pop();
}}
bpmjs.Context.__name__ = ["bpmjs","Context"];
bpmjs.Context.prototype.contextConfig = null;
bpmjs.Context.prototype.objects = null;
bpmjs.Context.prototype.observers = null;
bpmjs.Context.prototype.addObject = function(name,classInfo,object) {
	$s.push("bpmjs.Context::addObject");
	var $spos = $s.length;
	var contextObject = new bpmjs.ContextObject(name,classInfo,object);
	this.objects.push(contextObject);
	{
		$s.pop();
		return contextObject;
	}
	$s.pop();
}
bpmjs.Context.prototype.getObjectByName = function(name) {
	$s.push("bpmjs.Context::getObjectByName");
	var $spos = $s.length;
	{
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
	}
	{
		$s.pop();
		return null;
	}
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
	}
	else if(result.length > 1) throw "Multiple objects of type: " + result.first().classInfo.name + " found";
	else {
		$s.pop();
		return null;
	}
	$s.pop();
}
bpmjs.Context.prototype.getDynamicObjectsByType = function(type) {
	$s.push("bpmjs.Context::getDynamicObjectsByType");
	var $spos = $s.length;
	{
		var $tmp = Lambda.filter(this.objects,this.getFilterByType(type));
		$s.pop();
		return $tmp;
	}
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
	{
		var $tmp = function(contextObject) {
			$s.push("bpmjs.Context::getFilterByType@65");
			var $spos = $s.length;
			{
				var $tmp = contextObject.type == type;
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
bpmjs.Context.prototype.__class__ = bpmjs.Context;
bpmjs.ContextObject = function(name,classInfo,object) { if( name === $_ ) return; {
	$s.push("bpmjs.ContextObject::new");
	var $spos = $s.length;
	this.name = name;
	this.classInfo = classInfo;
	this.type = classInfo.type;
	this.object = object;
	$s.pop();
}}
bpmjs.ContextObject.__name__ = ["bpmjs","ContextObject"];
bpmjs.ContextObject.prototype.name = null;
bpmjs.ContextObject.prototype.type = null;
bpmjs.ContextObject.prototype.object = null;
bpmjs.ContextObject.prototype.classInfo = null;
bpmjs.ContextObject.prototype.__class__ = bpmjs.ContextObject;
bpmjs.Observer = function(p) { if( p === $_ ) return; {
	$s.push("bpmjs.Observer::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
bpmjs.Observer.__name__ = ["bpmjs","Observer"];
bpmjs.Observer.prototype.object = null;
bpmjs.Observer.prototype.methodName = null;
bpmjs.Observer.prototype.type = null;
bpmjs.Observer.prototype.observe = function(objectToObserve) {
	$s.push("bpmjs.Observer::observe");
	var $spos = $s.length;
	if(Std["is"](objectToObserve.object,this.type.type)) {
		Reflect.field(this.object.object,this.methodName).apply(this.object.object,[objectToObserve.object]);
	}
	$s.pop();
}
bpmjs.Observer.prototype.__class__ = bpmjs.Observer;
kumite.mouse.Config = function(p) { if( p === $_ ) return; {
	$s.push("kumite.mouse.Config::new");
	var $spos = $s.length;
	this.mouseController = new kumite.mouse.MouseController();
	$s.pop();
}}
kumite.mouse.Config.__name__ = ["kumite","mouse","Config"];
kumite.mouse.Config.prototype.mouseController = null;
kumite.mouse.Config.prototype.__class__ = kumite.mouse.Config;
kumite.mouse.Config.__interfaces__ = [haxe.rtti.Infos];
Map = function() { }
Map.__name__ = ["Map"];
Map.linear = function(value,min0,max0,min1,max1) {
	$s.push("Map::linear");
	var $spos = $s.length;
	var p0 = 1 / (max0 - min0) * (value - min0);
	{
		var $tmp = min1 + (max1 - min1) * p0;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Map.prototype.__class__ = Map;
kumite.scene.Scene = function(p) { if( p === $_ ) return; {
	$s.push("kumite.scene.Scene::new");
	var $spos = $s.length;
	this.layers = new Array();
	$s.pop();
}}
kumite.scene.Scene.__name__ = ["kumite","scene","Scene"];
kumite.scene.Scene.prototype.layers = null;
kumite.scene.Scene.prototype.id = null;
kumite.scene.Scene.prototype.name = null;
kumite.scene.Scene.prototype.addLayer = function(layer) {
	$s.push("kumite.scene.Scene::addLayer");
	var $spos = $s.length;
	this.layers.push(layer);
	$s.pop();
}
kumite.scene.Scene.prototype.containsLayer = function(layer) {
	$s.push("kumite.scene.Scene::containsLayer");
	var $spos = $s.length;
	{
		var _g = 0, _g1 = this.layers;
		while(_g < _g1.length) {
			var sceneLayer = _g1[_g];
			++_g;
			if(sceneLayer.layerId == layer.layerId) {
				$s.pop();
				return true;
			}
		}
	}
	{
		$s.pop();
		return false;
	}
	$s.pop();
}
kumite.scene.Scene.prototype.getLayerIndex = function(layer) {
	$s.push("kumite.scene.Scene::getLayerIndex");
	var $spos = $s.length;
	{
		var _g1 = 0, _g = this.layers.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.layers[i].layerId == layer.layerId) {
				$s.pop();
				return i;
			}
		}
	}
	{
		$s.pop();
		return -1;
	}
	$s.pop();
}
kumite.scene.Scene.prototype.__class__ = kumite.scene.Scene;
bpmjs.ContextConfig = function(p) { if( p === $_ ) return; {
	$s.push("bpmjs.ContextConfig::new");
	var $spos = $s.length;
	null;
	$s.pop();
}}
bpmjs.ContextConfig.__name__ = ["bpmjs","ContextConfig"];
bpmjs.ContextConfig.prototype.frontMessenger = null;
bpmjs.ContextConfig.prototype.__class__ = bpmjs.ContextConfig;
kumite.testscene.TestLayer = function(p) { if( p === $_ ) return; {
	$s.push("kumite.testscene.TestLayer::new");
	var $spos = $s.length;
	this.layerId = "TestLayer";
	this.color = new Color(1,1,0,0.5);
	this.scale = 1;
	this.position = new Vec3(0,0,0);
	this.transitionAlpha = 1;
	$s.pop();
}}
kumite.testscene.TestLayer.__name__ = ["kumite","testscene","TestLayer"];
kumite.testscene.TestLayer.prototype.stage = null;
kumite.testscene.TestLayer.prototype.time = null;
kumite.testscene.TestLayer.prototype.projection = null;
kumite.testscene.TestLayer.prototype.camera = null;
kumite.testscene.TestLayer.prototype.layerId = null;
kumite.testscene.TestLayer.prototype.color = null;
kumite.testscene.TestLayer.prototype.scale = null;
kumite.testscene.TestLayer.prototype.position = null;
kumite.testscene.TestLayer.prototype.transitionAlpha = null;
kumite.testscene.TestLayer.prototype.shaderProgram = null;
kumite.testscene.TestLayer.prototype.vertexPositionAttribute = null;
kumite.testscene.TestLayer.prototype.vertexBuffer = null;
kumite.testscene.TestLayer.prototype.projectionMatrixUniform = null;
kumite.testscene.TestLayer.prototype.worldViewMatrixUniform = null;
kumite.testscene.TestLayer.prototype.colorUniform = null;
kumite.testscene.TestLayer.prototype.init = function() {
	$s.push("kumite.testscene.TestLayer::init");
	var $spos = $s.length;
	this.shaderProgram = GL.createProgram(kumite.helloworldgl.shader.Vertex,kumite.helloworldgl.shader.Fragment);
	this.vertexPositionAttribute = GL.getAttribLocation2("vertexPosition",2,5120);
	this.vertexPositionAttribute.updateBuffer(new Int8Array([-1,-1,1,-1,-1,1,1,1]));
	this.projectionMatrixUniform = GL.getUniformLocation("projectionMatrix");
	this.worldViewMatrixUniform = GL.getUniformLocation("worldViewMatrix");
	this.colorUniform = GL.getUniformLocation("color");
	$s.pop();
}
kumite.testscene.TestLayer.prototype.renderTransition = function(transitionContext) {
	$s.push("kumite.testscene.TestLayer::renderTransition");
	var $spos = $s.length;
	this.transitionAlpha = transitionContext.transition;
	this.render();
	$s.pop();
}
kumite.testscene.TestLayer.prototype.render = function() {
	$s.push("kumite.testscene.TestLayer::render");
	var $spos = $s.length;
	GL.useProgram(this.shaderProgram);
	GL.gl.viewport(0,0,this.stage.width,this.stage.height);
	GL.gl.disable(2929);
	GL.gl.enable(3042);
	GL.gl.blendFunc(770,771);
	GL.gl.uniformMatrix4fv(this.projectionMatrixUniform.location,false,this.projection.matrix.buffer);
	this.vertexPositionAttribute.vertexAttribPointer();
	var worldViewMatrix = new Matrix4(this.camera.matrix);
	worldViewMatrix.appendRotation(this.time.ms / 4000,new Vec3(1,1,1));
	worldViewMatrix.appendTranslation(this.position.x,this.position.y,this.position.z);
	worldViewMatrix.appendScale(this.scale,this.scale,this.scale);
	GL.gl.uniformMatrix4fv(this.worldViewMatrixUniform.location,false,worldViewMatrix.buffer);
	var colorWithTransition = this.color.clone();
	colorWithTransition.a *= this.transitionAlpha;
	GL.gl.uniform4f(this.colorUniform.location,colorWithTransition.r,colorWithTransition.g,colorWithTransition.b,colorWithTransition.a);
	this.vertexPositionAttribute.drawArrays(5);
	$s.pop();
}
kumite.testscene.TestLayer.prototype.__class__ = kumite.testscene.TestLayer;
kumite.testscene.TestLayer.__interfaces__ = [haxe.rtti.Infos,kumite.scene.LayerLifecycle];
bpmjs.Stats = function() { }
bpmjs.Stats.__name__ = ["bpmjs","Stats"];
bpmjs.Stats.initialized = null;
bpmjs.Stats.lastTime = null;
bpmjs.Stats.times = null;
bpmjs.Stats.finishedTimes = null;
bpmjs.Stats.messages = null;
bpmjs.Stats.init = function() {
	$s.push("bpmjs.Stats::init");
	var $spos = $s.length;
	bpmjs.Stats.clear();
	bpmjs.Stats.initialized = true;
	$s.pop();
}
bpmjs.Stats.clear = function() {
	$s.push("bpmjs.Stats::clear");
	var $spos = $s.length;
	bpmjs.Stats.times = new Array();
	bpmjs.Stats.finishedTimes = new Array();
	bpmjs.Stats.messages = new Array();
	$s.pop();
}
bpmjs.Stats.measureFPS = function() {
	$s.push("bpmjs.Stats::measureFPS");
	var $spos = $s.length;
	bpmjs.Stats.checkInit();
	var time = Date.now().getTime();
	bpmjs.Stats.fps = 1000 / (time - bpmjs.Stats.lastTime);
	bpmjs.Stats.lastTime = time;
	$s.pop();
}
bpmjs.Stats.checkStart = function(message) {
	$s.push("bpmjs.Stats::checkStart");
	var $spos = $s.length;
	bpmjs.Stats.checkInit();
	var time = Date.now().getTime();
	bpmjs.Stats.times.push({ start : time, stop : 0.0, message : message});
	$s.pop();
}
bpmjs.Stats.addMessage = function(message) {
	$s.push("bpmjs.Stats::addMessage");
	var $spos = $s.length;
	bpmjs.Stats.checkInit();
	bpmjs.Stats.messages.push(message);
	$s.pop();
}
bpmjs.Stats.checkStop = function() {
	$s.push("bpmjs.Stats::checkStop");
	var $spos = $s.length;
	bpmjs.Stats.checkInit();
	var timeAndMessage = bpmjs.Stats.times.pop();
	timeAndMessage.stop = Date.now().getTime();
	bpmjs.Stats.finishedTimes.push(timeAndMessage);
	$s.pop();
}
bpmjs.Stats.getContents = function() {
	$s.push("bpmjs.Stats::getContents");
	var $spos = $s.length;
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
	{
		$s.pop();
		return finalMessages;
	}
	$s.pop();
}
bpmjs.Stats.checkInit = function() {
	$s.push("bpmjs.Stats::checkInit");
	var $spos = $s.length;
	if(!bpmjs.Stats.initialized) bpmjs.Stats.init();
	$s.pop();
}
bpmjs.Stats.prototype.__class__ = bpmjs.Stats;
ERegFilter = function(level,r) { if( level === $_ ) return; {
	$s.push("ERegFilter::new");
	var $spos = $s.length;
	this.level = level;
	this.r = r;
	$s.pop();
}}
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
	{
		var $tmp = matches && this.level.isSmallerOrEqual(level);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
ERegFilter.prototype.__class__ = ERegFilter;
ERegFilter.__interfaces__ = [LogFilter];
kumite.launch.Config = function(p) { if( p === $_ ) return; {
	$s.push("kumite.launch.Config::new");
	var $spos = $s.length;
	this.launcher = new kumite.launch.Launcher();
	this.sequencer = new bpmjs.Sequencer();
	$s.pop();
}}
kumite.launch.Config.__name__ = ["kumite","launch","Config"];
kumite.launch.Config.prototype.sequencer = null;
kumite.launch.Config.prototype.launcher = null;
kumite.launch.Config.prototype.__class__ = kumite.launch.Config;
kumite.launch.Config.__interfaces__ = [haxe.rtti.Infos];
EReg = function(r,opt) { if( r === $_ ) return; {
	$s.push("EReg::new");
	var $spos = $s.length;
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
	$s.pop();
}}
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	$s.push("EReg::match");
	var $spos = $s.length;
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	{
		var $tmp = this.r.m != null;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
EReg.prototype.matched = function(n) {
	$s.push("EReg::matched");
	var $spos = $s.length;
	{
		var $tmp = this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
		$s.pop();
		return $tmp;
	}
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
	{
		var $tmp = this.r.l;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
EReg.prototype.matchedRight = function() {
	$s.push("EReg::matchedRight");
	var $spos = $s.length;
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		{
			var $tmp = this.r.s.substr(sz,this.r.s.length - sz);
			$s.pop();
			return $tmp;
		}
	}
	{
		var $tmp = this.r.r;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
EReg.prototype.matchedPos = function() {
	$s.push("EReg::matchedPos");
	var $spos = $s.length;
	if(this.r.m == null) throw "No string matched";
	{
		var $tmp = { pos : this.r.m.index, len : this.r.m[0].length};
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
EReg.prototype.split = function(s) {
	$s.push("EReg::split");
	var $spos = $s.length;
	var d = "#__delim__#";
	{
		var $tmp = s.replace(this.r,d).split(d);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
EReg.prototype.replace = function(s,by) {
	$s.push("EReg::replace");
	var $spos = $s.length;
	{
		var $tmp = s.replace(this.r,by);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
EReg.prototype.customReplace = function(s,f) {
	$s.push("EReg::customReplace");
	var $spos = $s.length;
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.b[buf.b.length] = this.matchedLeft();
		buf.b[buf.b.length] = f(this);
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s;
	{
		var $tmp = buf.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
EReg.prototype.__class__ = EReg;
Xml = function(p) { if( p === $_ ) return; {
	$s.push("Xml::new");
	var $spos = $s.length;
	null;
	$s.pop();
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
	{
		$s.pop();
		return current;
	}
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
	{
		$s.pop();
		return r;
	}
	$s.pop();
}
Xml.createPCData = function(data) {
	$s.push("Xml::createPCData");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	{
		$s.pop();
		return r;
	}
	$s.pop();
}
Xml.createCData = function(data) {
	$s.push("Xml::createCData");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	{
		$s.pop();
		return r;
	}
	$s.pop();
}
Xml.createComment = function(data) {
	$s.push("Xml::createComment");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	{
		$s.pop();
		return r;
	}
	$s.pop();
}
Xml.createDocType = function(data) {
	$s.push("Xml::createDocType");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	{
		$s.pop();
		return r;
	}
	$s.pop();
}
Xml.createProlog = function(data) {
	$s.push("Xml::createProlog");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	{
		$s.pop();
		return r;
	}
	$s.pop();
}
Xml.createDocument = function() {
	$s.push("Xml::createDocument");
	var $spos = $s.length;
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	{
		$s.pop();
		return r;
	}
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
	{
		var $tmp = this._nodeName;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Xml.prototype.setNodeName = function(n) {
	$s.push("Xml::setNodeName");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	{
		var $tmp = this._nodeName = n;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Xml.prototype.getNodeValue = function() {
	$s.push("Xml::getNodeValue");
	var $spos = $s.length;
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	{
		var $tmp = this._nodeValue;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Xml.prototype.setNodeValue = function(v) {
	$s.push("Xml::setNodeValue");
	var $spos = $s.length;
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	{
		var $tmp = this._nodeValue = v;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Xml.prototype.getParent = function() {
	$s.push("Xml::getParent");
	var $spos = $s.length;
	{
		var $tmp = this._parent;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Xml.prototype.get = function(att) {
	$s.push("Xml::get");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	{
		var $tmp = this._attributes.get(att);
		$s.pop();
		return $tmp;
	}
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
	{
		var $tmp = this._attributes.exists(att);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Xml.prototype.attributes = function() {
	$s.push("Xml::attributes");
	var $spos = $s.length;
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	{
		var $tmp = this._attributes.keys();
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Xml.prototype.iterator = function() {
	$s.push("Xml::iterator");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	{
		var $tmp = { cur : 0, x : this._children, hasNext : function() {
			$s.push("Xml::iterator@281");
			var $spos = $s.length;
			{
				var $tmp = this.cur < this.x.length;
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}, next : function() {
			$s.push("Xml::iterator@284");
			var $spos = $s.length;
			{
				var $tmp = this.x[this.cur++];
				$s.pop();
				return $tmp;
			}
			$s.pop();
		}};
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Xml.prototype.elements = function() {
	$s.push("Xml::elements");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	{
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
			{
				var $tmp = k < l;
				$s.pop();
				return $tmp;
			}
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
					{
						$s.pop();
						return n;
					}
				}
			}
			{
				$s.pop();
				return null;
			}
			$s.pop();
		}};
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Xml.prototype.elementsNamed = function(name) {
	$s.push("Xml::elementsNamed");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	{
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
			{
				var $tmp = k < l;
				$s.pop();
				return $tmp;
			}
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
					{
						$s.pop();
						return n;
					}
				}
			}
			{
				$s.pop();
				return null;
			}
			$s.pop();
		}};
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Xml.prototype.firstChild = function() {
	$s.push("Xml::firstChild");
	var $spos = $s.length;
	if(this._children == null) throw "bad nodetype";
	{
		var $tmp = this._children[0];
		$s.pop();
		return $tmp;
	}
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
	{
		$s.pop();
		return null;
	}
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
	{
		$s.pop();
		return b;
	}
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
			{
				var $tmp = s.b.join("");
				$s.pop();
				return $tmp;
			}
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
	{
		var $tmp = s.b.join("");
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
Xml.prototype.__class__ = Xml;
kumite.time.Time = function(p) { if( p === $_ ) return; {
	$s.push("kumite.time.Time::new");
	var $spos = $s.length;
	this.reset();
	$s.pop();
}}
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
	{
		var $tmp = value * this.timeScale;
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
kumite.time.Time.prototype.factor = function(value) {
	$s.push("kumite.time.Time::factor");
	var $spos = $s.length;
	{
		var $tmp = Math.pow(value,this.timeScale);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
kumite.time.Time.prototype.interpolateTo = function(from,to,f) {
	$s.push("kumite.time.Time::interpolateTo");
	var $spos = $s.length;
	{
		var $tmp = from * (1 - f * this.timeScale) + to * (f * this.timeScale);
		$s.pop();
		return $tmp;
	}
	$s.pop();
}
kumite.time.Time.prototype.__class__ = kumite.time.Time;
GLLabel = function(p) { if( p === $_ ) return; {
	$s.push("GLLabel::new");
	var $spos = $s.length;
	GLInteractiveObject.call(this);
	$s.pop();
}}
GLLabel.__name__ = ["GLLabel"];
GLLabel.__super__ = GLInteractiveObject;
for(var k in GLInteractiveObject.prototype ) GLLabel.prototype[k] = GLInteractiveObject.prototype[k];
GLLabel.prototype.text = null;
GLLabel.prototype.validateGraphics = function() {
	$s.push("GLLabel::validateGraphics");
	var $spos = $s.length;
	if(this.getGraphicIsInvalid()) {
		this.renderText();
		GLInteractiveObject.prototype.validateGraphics.call(this);
	}
	$s.pop();
}
GLLabel.prototype.renderText = function() {
	$s.push("GLLabel::renderText");
	var $spos = $s.length;
	var textMetrics = new Text();
	textMetrics.text = this.text;
	textMetrics.font = "12px Arial";
	this.graphic.clear(new Color(0,1,0,0.3));
	this.graphic.setFillStyle(new Color(0,1,0,1));
	this.graphic.setFont(textMetrics.font);
	this.graphic.fillText(textMetrics.text,(this.width - textMetrics.getWidth()) / 2,14);
	$s.pop();
}
GLLabel.prototype.setText = function(text) {
	$s.push("GLLabel::setText");
	var $spos = $s.length;
	if(this.text != text) {
		this.setGraphicIsInvalid(true);
		this.text = text;
	}
	{
		$s.pop();
		return text;
	}
	$s.pop();
}
GLLabel.prototype.__class__ = GLLabel;
$_ = {}
js.Boot.__res = {}
$s = [];
$e = [];
js.Boot.__init();
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
{
	var d = Date;
	d.now = function() {
		$s.push("GLLabel::setText");
		var $spos = $s.length;
		{
			var $tmp = new Date();
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	d.fromTime = function(t) {
		$s.push("GLLabel::setText");
		var $spos = $s.length;
		var d1 = new Date();
		d1["setTime"](t);
		{
			$s.pop();
			return d1;
		}
		$s.pop();
	}
	d.fromString = function(s) {
		$s.push("GLLabel::setText");
		var $spos = $s.length;
		switch(s.length) {
		case 8:{
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			{
				$s.pop();
				return d1;
			}
		}break;
		case 10:{
			var k = s.split("-");
			{
				var $tmp = new Date(k[0],k[1] - 1,k[2],0,0,0);
				$s.pop();
				return $tmp;
			}
		}break;
		case 19:{
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			{
				var $tmp = new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
				$s.pop();
				return $tmp;
			}
		}break;
		default:{
			throw "Invalid date format : " + s;
		}break;
		}
		$s.pop();
	}
	d.prototype["toString"] = function() {
		$s.push("GLLabel::setText");
		var $spos = $s.length;
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		{
			var $tmp = date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
			$s.pop();
			return $tmp;
		}
		$s.pop();
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
		$s.push("GLLabel::setText");
		var $spos = $s.length;
		{
			var $tmp = isFinite(i);
			$s.pop();
			return $tmp;
		}
		$s.pop();
	}
	Math.isNaN = function(i) {
		$s.push("GLLabel::setText");
		var $spos = $s.length;
		{
			var $tmp = isNaN(i);
			$s.pop();
			return $tmp;
		}
		$s.pop();
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
kumite.testscene.TestBackgroundLayer.__meta__ = { fields : { stage : { Inject : null}, time : { Inject : null}}};
kumite.testscene.TestBackgroundLayer.__rtti = "<class path=\"kumite.testscene.TestBackgroundLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<layerId public=\"1\"><c path=\"String\"/></layerId>\n\t<color public=\"1\"><c path=\"Color\"/></color>\n\t<direction public=\"1\"><c path=\"Int\"/></direction>\n\t<transition><c path=\"Float\"/></transition>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<worldViewMatrixUniform><c path=\"GLUniformLocation\"/></worldViewMatrixUniform>\n\t<colorUniform><c path=\"GLUniformLocation\"/></colorUniform>\n\t<init public=\"1\" set=\"method\" line=\"44\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"61\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"67\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"36\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
Log.filters = new Array();
Log.args = new Array();
kumite.scene.Config.__rtti = "<class path=\"kumite.scene.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<scenes public=\"1\"><c path=\"kumite.scene.Scenes\"/></scenes>\n\t<sceneController public=\"1\"><c path=\"kumite.scene.SceneController\"/></sceneController>\n\t<new public=\"1\" set=\"method\" line=\"9\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.stage.Config.__rtti = "<class path=\"kumite.stage.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<stageResizeAction public=\"1\"><c path=\"kumite.stage.StageResizeAction\"/></stageResizeAction>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.testscene.TestScene4.__meta__ = { fields : { testLayer2 : { Inject : null}, testLayer3 : { Inject : null}, displayList : { Inject : null}}};
kumite.testscene.TestScene4.__rtti = "<class path=\"kumite.testscene.TestScene4\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.SceneLifecycle\"/>\n\t<testLayer2 public=\"1\"><c path=\"kumite.testscene.TestLayer\"/></testLayer2>\n\t<testLayer3 public=\"1\"><c path=\"kumite.testscene.TestLayer\"/></testLayer3>\n\t<displayList public=\"1\"><c path=\"kumite.displaylist.DisplayListLayer\"/></displayList>\n\t<sceneInit public=\"1\" set=\"method\" line=\"24\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></sceneInit>\n\t<renderTransition public=\"1\" set=\"method\" line=\"32\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"37\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"22\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.testscene.TestScene3.__meta__ = { fields : { testLayer1 : { Inject : null}, testLayer3 : { Inject : null}, displayList : { Inject : null}}};
kumite.testscene.TestScene3.__rtti = "<class path=\"kumite.testscene.TestScene3\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.SceneLifecycle\"/>\n\t<testLayer1 public=\"1\"><c path=\"kumite.testscene.TestLayer\"/></testLayer1>\n\t<testLayer3 public=\"1\"><c path=\"kumite.testscene.TestLayer\"/></testLayer3>\n\t<displayList public=\"1\"><c path=\"kumite.displaylist.DisplayListLayer\"/></displayList>\n\t<sceneInit public=\"1\" set=\"method\" line=\"24\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></sceneInit>\n\t<renderTransition public=\"1\" set=\"method\" line=\"32\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"37\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"22\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.scene.LayerState.OUT = new kumite.scene.LayerState("OUT");
kumite.scene.LayerState.IN = new kumite.scene.LayerState("IN");
kumite.scene.LayerState.KEEP = new kumite.scene.LayerState("KEEP");
kumite.mouse.MouseController.__meta__ = { fields : { canvas : { Inject : null}, start : { Sequence : ["boot","init"]}}};
kumite.mouse.MouseController.__rtti = "<class path=\"kumite.mouse.MouseController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<canvas public=\"1\"><c path=\"kumite.canvas.CanvasCase\"/></canvas>\n\t<start public=\"1\" set=\"method\" line=\"15\"><f a=\"\"><e path=\"Void\"/></f></start>\n\t<new public=\"1\" set=\"method\" line=\"12\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.testscene.TestScene2.__meta__ = { fields : { testLayer1 : { Inject : null}, testLayer2 : { Inject : null}, testBackgroundLayer2 : { Inject : null}, displayListLayer : { Inject : null}}};
kumite.testscene.TestScene2.__rtti = "<class path=\"kumite.testscene.TestScene2\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.SceneLifecycle\"/>\n\t<testLayer1 public=\"1\"><c path=\"kumite.testscene.TestLayer\"/></testLayer1>\n\t<testLayer2 public=\"1\"><c path=\"kumite.testscene.TestLayer\"/></testLayer2>\n\t<testBackgroundLayer2 public=\"1\"><c path=\"kumite.testscene.TestBackgroundLayer\"/></testBackgroundLayer2>\n\t<displayListLayer public=\"1\"><c path=\"kumite.displaylist.DisplayListLayer\"/></displayListLayer>\n\t<sceneInit public=\"1\" set=\"method\" line=\"27\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></sceneInit>\n\t<renderTransition public=\"1\" set=\"method\" line=\"36\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"41\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"25\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
GLCursorClient.DEFAULT = "default";
GLCursorClient.HAND = "pointer";
kumite.helloworldgl.shader.Fragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform vec4 color;\n\n\tvoid main(void)\n\t{\n\t\tgl_FragColor = color;\n\t}\n\n"]}};
kumite.testscene.TestScene1.__meta__ = { fields : { displayList : { Inject : null}, testBackgroundLayer1 : { Inject : null}}};
kumite.testscene.TestScene1.__rtti = "<class path=\"kumite.testscene.TestScene1\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.SceneLifecycle\"/>\n\t<displayList public=\"1\"><c path=\"kumite.displaylist.DisplayListLayer\"/></displayList>\n\t<testBackgroundLayer1 public=\"1\"><c path=\"kumite.testscene.TestBackgroundLayer\"/></testBackgroundLayer1>\n\t<sceneInit public=\"1\" set=\"method\" line=\"21\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></sceneInit>\n\t<renderTransition public=\"1\" set=\"method\" line=\"28\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"33\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"19\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
hsl.haxe._DirectSignaler.PropagationStatus.IMMEDIATELY_STOPPED = 1;
hsl.haxe._DirectSignaler.PropagationStatus.STOPPED = 2;
hsl.haxe._DirectSignaler.PropagationStatus.UNDISTURBED = 3;
bpmjs.Sequencer.__meta__ = { fields : { context : { Inject : null}}};
bpmjs.Sequencer.__rtti = "<class path=\"bpmjs.Sequencer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<context public=\"1\"><c path=\"bpmjs.Context\"/></context>\n\t<start public=\"1\" set=\"method\" line=\"14\"><f a=\"name\">\n\t<c path=\"String\"/>\n\t<e path=\"Void\"/>\n</f></start>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
LogLevel.INFO = new LogLevel(1);
LogLevel.WARN = new LogLevel(2);
LogLevel.ERROR = new LogLevel(3);
LogLevel.OFF = new LogLevel(4);
kumite.canvas.Config.__rtti = "<class path=\"kumite.canvas.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<canvasCase public=\"1\"><c path=\"kumite.canvas.CanvasCase\"/></canvasCase>\n\t<canvasController public=\"1\"><c path=\"kumite.canvas.CanvasController\"/></canvasController>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.displaylist.ConfigAsLayer.__rtti = "<class path=\"kumite.displaylist.ConfigAsLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<displayListLayer public=\"1\"><c path=\"kumite.displaylist.DisplayListLayer\"/></displayListLayer>\n\t<new public=\"1\" set=\"method\" line=\"8\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.time.Config.__rtti = "<class path=\"kumite.time.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<timeController public=\"1\"><c path=\"kumite.time.TimeController\"/></timeController>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.projection.ProjectionController.__meta__ = { fields : { projection : { Inject : null}, stage : { Inject : null}, init : { Sequence : ["boot","init"]}, updateProjectionSizeFromStage : { Message : null}}};
kumite.projection.ProjectionController.__rtti = "<class path=\"kumite.projection.ProjectionController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<projection public=\"1\"><c path=\"kumite.projection.Projection\"/></projection>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<fov public=\"1\"><c path=\"Float\"/></fov>\n\t<near public=\"1\"><c path=\"Float\"/></near>\n\t<far public=\"1\"><c path=\"Float\"/></far>\n\t<init public=\"1\" set=\"method\" line=\"23\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<updateProjectionSizeFromStage public=\"1\" set=\"method\" line=\"30\"><f a=\"?message\">\n\t<c path=\"kumite.stage.StageResizeMessage\"/>\n\t<e path=\"Void\"/>\n</f></updateProjectionSizeFromStage>\n\t<new public=\"1\" set=\"method\" line=\"20\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
js.Lib.onerror = null;
kumite.canvas.CanvasController.__meta__ = { fields : { canvas : { Inject : null}, stage : { Inject : null}, initPrepare : { Sequence : ["boot","initPrepare"]}, init : { Sequence : ["boot","init"]}, updateCanvasSizeFromStage : { Message : null}}};
kumite.canvas.CanvasController.__rtti = "<class path=\"kumite.canvas.CanvasController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<canvas public=\"1\"><c path=\"kumite.canvas.CanvasCase\"/></canvas>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<initPrepare public=\"1\" set=\"method\" line=\"21\"><f a=\"\"><e path=\"Void\"/></f></initPrepare>\n\t<init public=\"1\" set=\"method\" line=\"27\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<updateCanvasSizeFromStage public=\"1\" set=\"method\" line=\"33\"><f a=\"?message\">\n\t<c path=\"kumite.stage.StageResizeMessage\"/>\n\t<e path=\"Void\"/>\n</f></updateCanvasSizeFromStage>\n\t<new public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.launch.Launcher.__meta__ = { fields : { sequencer : { Inject : null}, handlePostComplete : { PostComplete : null}, showError : { Sequence : ["boot","error"]}}};
kumite.launch.Launcher.__rtti = "<class path=\"kumite.launch.Launcher\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<sequencer public=\"1\"><c path=\"bpmjs.Sequencer\"/></sequencer>\n\t<handlePostComplete public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></handlePostComplete>\n\t<showError public=\"1\" set=\"method\" line=\"20\"><f a=\"\"><e path=\"Void\"/></f></showError>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.testscene.Config.__rtti = "<class path=\"kumite.testscene.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<testBackgroundLayer1 public=\"1\"><c path=\"kumite.testscene.TestBackgroundLayer\"/></testBackgroundLayer1>\n\t<testBackgroundLayer2 public=\"1\"><c path=\"kumite.testscene.TestBackgroundLayer\"/></testBackgroundLayer2>\n\t<testLayer1 public=\"1\"><c path=\"kumite.testscene.TestLayer\"/></testLayer1>\n\t<testLayer2 public=\"1\"><c path=\"kumite.testscene.TestLayer\"/></testLayer2>\n\t<testLayer3 public=\"1\"><c path=\"kumite.testscene.TestLayer\"/></testLayer3>\n\t<testScene1 public=\"1\"><c path=\"kumite.testscene.TestScene1\"/></testScene1>\n\t<testScene2 public=\"1\"><c path=\"kumite.testscene.TestScene2\"/></testScene2>\n\t<testScene3 public=\"1\"><c path=\"kumite.testscene.TestScene3\"/></testScene3>\n\t<testScene4 public=\"1\"><c path=\"kumite.testscene.TestScene4\"/></testScene4>\n\t<new public=\"1\" set=\"method\" line=\"21\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.scene.SceneController.__meta__ = { fields : { scenes : { Inject : null}, time : { Inject : null}, init : { Complete : null}, handleSceneLifecycleAdded : { Observe : null}, start : { Sequence : ["boot","start"]}, handleSceneChangeRequest : { Message : null}, render : { Message : null}}};
kumite.scene.SceneController.__rtti = "<class path=\"kumite.scene.SceneController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<scenes public=\"1\"><c path=\"kumite.scene.Scenes\"/></scenes>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<transitionContext public=\"1\"><c path=\"kumite.scene.TransitionContext\"/></transitionContext>\n\t<initState public=\"1\"><c path=\"kumite.scene.InitState\"/></initState>\n\t<idleState public=\"1\"><c path=\"kumite.scene.IdleState\"/></idleState>\n\t<transitionState public=\"1\"><c path=\"kumite.scene.TransitionState\"/></transitionState>\n\t<state><c path=\"kumite.scene.State\"/></state>\n\t<currentScene><c path=\"kumite.scene.SceneAndLifecycle\"/></currentScene>\n\t<lastScene><c path=\"kumite.scene.SceneAndLifecycle\"/></lastScene>\n\t<init public=\"1\" set=\"method\" line=\"30\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<handleSceneLifecycleAdded public=\"1\" set=\"method\" line=\"46\"><f a=\"lifecycle\">\n\t<c path=\"kumite.scene.SceneLifecycle\"/>\n\t<e path=\"Void\"/>\n</f></handleSceneLifecycleAdded>\n\t<start public=\"1\" set=\"method\" line=\"59\"><f a=\"\"><e path=\"Void\"/></f></start>\n\t<handleSceneChangeRequest public=\"1\" set=\"method\" line=\"80\"><f a=\"message\">\n\t<c path=\"kumite.scene.SceneChangeRequest\"/>\n\t<e path=\"Void\"/>\n</f></handleSceneChangeRequest>\n\t<render public=\"1\" set=\"method\" line=\"86\"><f a=\"tick\">\n\t<c path=\"kumite.time.Tick\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<renderTransition public=\"1\" set=\"method\" line=\"91\"><f a=\"\"><e path=\"Void\"/></f></renderTransition>\n\t<renderNormal public=\"1\" set=\"method\" line=\"115\"><f a=\"\"><e path=\"Void\"/></f></renderNormal>\n\t<enterScene set=\"method\" line=\"124\"><f a=\"newScene\">\n\t<c path=\"kumite.scene.SceneAndLifecycle\"/>\n\t<e path=\"Void\"/>\n</f></enterScene>\n\t<setState public=\"1\" set=\"method\" line=\"134\"><f a=\"state\">\n\t<c path=\"kumite.scene.State\"/>\n\t<e path=\"Void\"/>\n</f></setState>\n\t<new public=\"1\" set=\"method\" line=\"27\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.camera.CameraMouseMover.__meta__ = { fields : { camera : { Inject : null}, init : { Sequence : ["boot","init"]}}};
kumite.camera.CameraMouseMover.__rtti = "<class path=\"kumite.camera.CameraMouseMover\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<camera public=\"1\"><c path=\"kumite.camera.Camera\"/></camera>\n\t<init public=\"1\" set=\"method\" line=\"12\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<updateCamera set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></updateCamera>\n\t<new public=\"1\" set=\"method\" line=\"9\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.webgl.Config.__rtti = "<class path=\"kumite.webgl.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<initAction public=\"1\"><c path=\"kumite.webgl.InitAction\"/></initAction>\n\t<new public=\"1\" set=\"method\" line=\"8\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.time.TimeController.__meta__ = { fields : { time : { Inject : null}, messenger : { Messenger : null}, startComplete : { Sequence : ["boot","startComplete"]}}};
kumite.time.TimeController.__rtti = "<class path=\"kumite.time.TimeController\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<messenger public=\"1\"><c path=\"bpmjs.Messenger\"/></messenger>\n\t<startComplete public=\"1\" set=\"method\" line=\"18\"><f a=\"\"><e path=\"Void\"/></f></startComplete>\n\t<timerUpdate set=\"method\" line=\"24\"><f a=\"\"><e path=\"Void\"/></f></timerUpdate>\n\t<new public=\"1\" set=\"method\" line=\"15\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
reflect.ClassInfo.cache = new Hash();
kumite.webgl.InitAction.__meta__ = { fields : { canvas : { Inject : null}, init : { Sequence : ["boot","init"]}}};
kumite.webgl.InitAction.__rtti = "<class path=\"kumite.webgl.InitAction\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<canvas public=\"1\"><c path=\"kumite.canvas.CanvasCase\"/></canvas>\n\t<antialias public=\"1\"><e path=\"Bool\"/></antialias>\n\t<init public=\"1\" set=\"method\" line=\"16\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<new public=\"1\" set=\"method\" line=\"13\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.projection.Config.__rtti = "<class path=\"kumite.projection.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<projection public=\"1\"><c path=\"kumite.projection.Projection\"/></projection>\n\t<projectionController public=\"1\"><c path=\"kumite.projection.ProjectionController\"/></projectionController>\n\t<new public=\"1\" set=\"method\" line=\"10\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.vjinterface.VJInterface.__meta__ = { fields : { scenes : { Inject : null}, messenger : { Messenger : null}, start : { Sequence : ["boot","start"]}, render : { Message : null}}};
kumite.vjinterface.VJInterface.__rtti = "<class path=\"kumite.vjinterface.VJInterface\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<scenes public=\"1\"><c path=\"kumite.scene.Scenes\"/></scenes>\n\t<messenger public=\"1\"><c path=\"bpmjs.Messenger\"/></messenger>\n\t<stage><c path=\"GLStage\"/></stage>\n\t<cutButton><c path=\"GLLabel\"/></cutButton>\n\t<shortButton><c path=\"GLLabel\"/></shortButton>\n\t<longButton><c path=\"GLLabel\"/></longButton>\n\t<sceneContainer><c path=\"GLDisplayObjectContainer\"/></sceneContainer>\n\t<start public=\"1\" set=\"method\" line=\"30\"><f a=\"\"><e path=\"Void\"/></f></start>\n\t<render public=\"1\" set=\"method\" line=\"40\"><f a=\"tick\">\n\t<c path=\"kumite.time.Tick\"/>\n\t<e path=\"Void\"/>\n</f></render>\n\t<addTransitionButtons set=\"method\" line=\"49\"><f a=\"\"><e path=\"Void\"/></f></addTransitionButtons>\n\t<addSceneButtons set=\"method\" line=\"73\"><f a=\"\"><e path=\"Void\"/></f></addSceneButtons>\n\t<createSceneRequest set=\"method\" line=\"94\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<f a=\"button\">\n\t\t<c path=\"GLInteractiveObject\"/>\n\t\t<e path=\"Void\"/>\n\t</f>\n</f></createSceneRequest>\n\t<handleButtonClick set=\"method\" line=\"103\"><f a=\"scene\">\n\t<c path=\"kumite.scene.Scene\"/>\n\t<e path=\"Void\"/>\n</f></handleButtonClick>\n\t<new public=\"1\" set=\"method\" line=\"27\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.displaylist.DisplayListLayer.__meta__ = { fields : { stage : { Inject : null}}};
kumite.displaylist.DisplayListLayer.__rtti = "<class path=\"kumite.displaylist.DisplayListLayer\" params=\"\">\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<layerId public=\"1\"><c path=\"String\"/></layerId>\n\t<renderer><c path=\"GLDisplayListRenderer\"/></renderer>\n\t<init public=\"1\" set=\"method\" line=\"23\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"30\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"35\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"21\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
haxe.Timer.arr = new Array();
shader.DisplayObjectVertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 objectMatrix;\n\tuniform vec2 size;\n\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * objectMatrix * (vec4(size, 1.0, 1.0) * vec4(vertexPosition, 0.0, 1.0));\n\t\ttextureCoord = vertexPosition.xy;\n\t}\n\n"]}};
kumite.helloworldgl.shader.Vertex.__meta__ = { obj : { GLSL : ["\n\n\tattribute vec2 vertexPosition;\n\n\tuniform mat4 projectionMatrix;\n\tuniform mat4 worldViewMatrix;\n\n\tvarying vec4 vertex;\n\n\tvoid main(void)\n\t{\n\t\tgl_Position = projectionMatrix * worldViewMatrix * vec4(vertexPosition, 0.0, 1.0);\n\t\tvertex = vec4(vertexPosition, 0.0, 1.0);\n\t}\n\n"]}};
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
shader.DisplayObjectFragment.__meta__ = { obj : { GLSL : ["\n\n\t#ifdef GL_ES\n\t\tprecision highp float;\n\t#endif\n\n\tuniform sampler2D texture;\n\tuniform float alpha;\n\n\tvarying vec2 textureCoord;\n\n\tvoid main(void)\n\t{\n\t\tvec4 color = texture2D(texture, textureCoord);\n\t\tgl_FragColor = color * vec4(1.0, 1.0, 1.0, alpha);\n\t}\n\n"]}};
kumite.camera.Config.__rtti = "<class path=\"kumite.camera.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<camera public=\"1\"><c path=\"kumite.camera.Camera\"/></camera>\n\t<cameraMouseMover public=\"1\"><c path=\"kumite.camera.CameraMouseMover\"/></cameraMouseMover>\n\t<new public=\"1\" set=\"method\" line=\"9\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.vjinterface.Config.__rtti = "<class path=\"kumite.vjinterface.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<vjinterface public=\"1\"><c path=\"kumite.vjinterface.VJInterface\"/></vjinterface>\n\t<new public=\"1\" set=\"method\" line=\"8\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.mouse.Config.__rtti = "<class path=\"kumite.mouse.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<mouseController public=\"1\"><c path=\"kumite.mouse.MouseController\"/></mouseController>\n\t<new public=\"1\" set=\"method\" line=\"8\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.testscene.TestLayer.__meta__ = { fields : { stage : { Inject : null}, time : { Inject : null}, projection : { Inject : null}, camera : { Inject : null}}};
kumite.testscene.TestLayer.__rtti = "<class path=\"kumite.testscene.TestLayer\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"kumite.scene.LayerLifecycle\"/>\n\t<stage public=\"1\"><c path=\"kumite.stage.Stage\"/></stage>\n\t<time public=\"1\"><c path=\"kumite.time.Time\"/></time>\n\t<projection public=\"1\"><c path=\"kumite.projection.Projection\"/></projection>\n\t<camera public=\"1\"><c path=\"kumite.camera.Camera\"/></camera>\n\t<layerId public=\"1\"><c path=\"String\"/></layerId>\n\t<color public=\"1\"><c path=\"Color\"/></color>\n\t<scale public=\"1\"><c path=\"Float\"/></scale>\n\t<position public=\"1\"><c path=\"Vec3\"/></position>\n\t<transitionAlpha><c path=\"Float\"/></transitionAlpha>\n\t<shaderProgram><c path=\"WebGLProgram\"/></shaderProgram>\n\t<vertexPositionAttribute><c path=\"GLAttribLocation\"/></vertexPositionAttribute>\n\t<vertexBuffer><c path=\"WebGLBuffer\"/></vertexBuffer>\n\t<projectionMatrixUniform><c path=\"GLUniformLocation\"/></projectionMatrixUniform>\n\t<worldViewMatrixUniform><c path=\"GLUniformLocation\"/></worldViewMatrixUniform>\n\t<colorUniform><c path=\"GLUniformLocation\"/></colorUniform>\n\t<init public=\"1\" set=\"method\" line=\"52\"><f a=\"\"><e path=\"Void\"/></f></init>\n\t<renderTransition public=\"1\" set=\"method\" line=\"69\"><f a=\"transitionContext\">\n\t<c path=\"kumite.scene.TransitionContext\"/>\n\t<e path=\"Void\"/>\n</f></renderTransition>\n\t<render public=\"1\" set=\"method\" line=\"75\"><f a=\"\"><e path=\"Void\"/></f></render>\n\t<new public=\"1\" set=\"method\" line=\"43\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
bpmjs.Stats.fps = 0;
kumite.launch.Config.__rtti = "<class path=\"kumite.launch.Config\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<sequencer public=\"1\"><c path=\"bpmjs.Sequencer\"/></sequencer>\n\t<launcher public=\"1\"><c path=\"kumite.launch.Launcher\"/></launcher>\n\t<new public=\"1\" set=\"method\" line=\"12\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
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