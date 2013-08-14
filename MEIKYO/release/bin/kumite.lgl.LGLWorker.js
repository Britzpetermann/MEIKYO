var $hxClasses = $hxClasses || {},$estr = function() { return js.Boot.__string_rec(this,''); };
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
var bpmjs = bpmjs || {}
bpmjs.WorkerCommand = $hxClasses["bpmjs.WorkerCommand"] = function(type) {
	this.type = type;
};
bpmjs.WorkerCommand.__name__ = ["bpmjs","WorkerCommand"];
bpmjs.WorkerCommand.prototype = {
	type: null
	,__class__: bpmjs.WorkerCommand
}
var haxe = haxe || {}
haxe.Serializer = $hxClasses["haxe.Serializer"] = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new Hash();
	this.scount = 0;
};
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
}
haxe.Serializer.prototype = {
	serializeException: function(e) {
		this.buf.b += Std.string("x");
		this.serialize(e);
	}
	,serialize: function(v) {
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 0:
			this.buf.b += Std.string("n");
			break;
		case 1:
			if(v == 0) {
				this.buf.b += Std.string("z");
				return;
			}
			this.buf.b += Std.string("i");
			this.buf.b += Std.string(v);
			break;
		case 2:
			if(Math.isNaN(v)) this.buf.b += Std.string("k"); else if(!Math.isFinite(v)) this.buf.b += Std.string(v < 0?"m":"p"); else {
				this.buf.b += Std.string("d");
				this.buf.b += Std.string(v);
			}
			break;
		case 3:
			this.buf.b += Std.string(v?"t":"f");
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
				this.buf.b += Std.string("a");
				var l = v.length;
				var _g = 0;
				while(_g < l) {
					var i = _g++;
					if(v[i] == null) ucount++; else {
						if(ucount > 0) {
							if(ucount == 1) this.buf.b += Std.string("n"); else {
								this.buf.b += Std.string("u");
								this.buf.b += Std.string(ucount);
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
				if(ucount > 0) {
					if(ucount == 1) this.buf.b += Std.string("n"); else {
						this.buf.b += Std.string("u");
						this.buf.b += Std.string(ucount);
					}
				}
				this.buf.b += Std.string("h");
				break;
			case List:
				this.buf.b += Std.string("l");
				var v1 = v;
				var $it0 = v1.iterator();
				while( $it0.hasNext() ) {
					var i = $it0.next();
					this.serialize(i);
				}
				this.buf.b += Std.string("h");
				break;
			case Date:
				var d = v;
				this.buf.b += Std.string("v");
				this.buf.b += Std.string(HxOverrides.dateStr(d));
				break;
			case Hash:
				this.buf.b += Std.string("b");
				var v1 = v;
				var $it1 = v1.keys();
				while( $it1.hasNext() ) {
					var k = $it1.next();
					this.serializeString(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += Std.string("h");
				break;
			case IntHash:
				this.buf.b += Std.string("q");
				var v1 = v;
				var $it2 = v1.keys();
				while( $it2.hasNext() ) {
					var k = $it2.next();
					this.buf.b += Std.string(":");
					this.buf.b += Std.string(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += Std.string("h");
				break;
			case haxe.io.Bytes:
				var v1 = v;
				var i = 0;
				var max = v1.length - 2;
				var charsBuf = new StringBuf();
				var b64 = haxe.Serializer.BASE64;
				while(i < max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					var b3 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt((b2 << 2 | b3 >> 6) & 63));
					charsBuf.b += Std.string(b64.charAt(b3 & 63));
				}
				if(i == max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt(b2 << 2 & 63));
				} else if(i == max + 1) {
					var b1 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt(b1 << 4 & 63));
				}
				var chars = charsBuf.b;
				this.buf.b += Std.string("s");
				this.buf.b += Std.string(chars.length);
				this.buf.b += Std.string(":");
				this.buf.b += Std.string(chars);
				break;
			default:
				this.cache.pop();
				if(v.hxSerialize != null) {
					this.buf.b += Std.string("C");
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					v.hxSerialize(this);
					this.buf.b += Std.string("g");
				} else {
					this.buf.b += Std.string("c");
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					this.serializeFields(v);
				}
			}
			break;
		case 4:
			if(this.useCache && this.serializeRef(v)) return;
			this.buf.b += Std.string("o");
			this.serializeFields(v);
			break;
		case 7:
			var e = $e[2];
			if(this.useCache && this.serializeRef(v)) return;
			this.cache.pop();
			this.buf.b += Std.string(this.useEnumIndex?"j":"w");
			this.serializeString(Type.getEnumName(e));
			if(this.useEnumIndex) {
				this.buf.b += Std.string(":");
				this.buf.b += Std.string(v[1]);
			} else this.serializeString(v[0]);
			this.buf.b += Std.string(":");
			var l = v.length;
			this.buf.b += Std.string(l - 2);
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
	,serializeFields: function(v) {
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += Std.string("g");
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += Std.string("r");
				this.buf.b += Std.string(i);
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += Std.string("R");
			this.buf.b += Std.string(x);
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += Std.string("y");
		s = StringTools.urlEncode(s);
		this.buf.b += Std.string(s.length);
		this.buf.b += Std.string(":");
		this.buf.b += Std.string(s);
	}
	,toString: function() {
		return this.buf.b;
	}
	,useEnumIndex: null
	,useCache: null
	,scount: null
	,shash: null
	,cache: null
	,buf: null
	,__class__: haxe.Serializer
}
haxe.Unserializer = $hxClasses["haxe.Unserializer"] = function(buf) {
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
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		switch(this.buf.charCodeAt(this.pos++)) {
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
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
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
				var c = this.buf.charCodeAt(this.pos);
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
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new Hash();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new IntHash();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) throw "Invalid IntHash format";
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
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
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
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
			if(this.buf.charCodeAt(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
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
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,getResolver: function() {
		return this.resolver;
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,resolver: null
	,scache: null
	,cache: null
	,length: null
	,pos: null
	,buf: null
	,__class__: haxe.Unserializer
}
if(!haxe.io) haxe.io = {}
haxe.io.Bytes = $hxClasses["haxe.io.Bytes"] = function(length,b) {
	this.length = length;
	this.b = b;
};
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
		var c = s.charCodeAt(i);
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
	getData: function() {
		return this.b;
	}
	,toHex: function() {
		var s = new StringBuf();
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0, _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g1 = 0, _g = this.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.b[i];
			s.b += String.fromCharCode(chars[c >> 4]);
			s.b += String.fromCharCode(chars[c & 15]);
		}
		return s.b;
	}
	,toString: function() {
		return this.readString(0,this.length);
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
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
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
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,get: function(pos) {
		return this.b[pos];
	}
	,b: null
	,length: null
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
if(!haxe.rtti) haxe.rtti = {}
haxe.rtti.Infos = $hxClasses["haxe.rtti.Infos"] = function() { }
haxe.rtti.Infos.__name__ = ["haxe","rtti","Infos"];
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
if(!kumite.lgl) kumite.lgl = {}
kumite.lgl.Edge = $hxClasses["kumite.lgl.Edge"] = function() {
	this.visible = true;
};
kumite.lgl.Edge.__name__ = ["kumite","lgl","Edge"];
kumite.lgl.Edge.prototype = {
	visible: null
	,v2Index: null
	,v1Index: null
	,__class__: kumite.lgl.Edge
}
kumite.lgl.LGL = $hxClasses["kumite.lgl.LGL"] = function() {
	this.vertexes = new Array();
	this.edges = new Array();
};
kumite.lgl.LGL.__name__ = ["kumite","lgl","LGL"];
kumite.lgl.LGL.prototype = {
	edges: null
	,vertexes: null
	,__class__: kumite.lgl.LGL
}
kumite.lgl.LGLLayout = $hxClasses["kumite.lgl.LGLLayout"] = function() {
	this.visible = 1000;
	this.totalEngergy = 10000;
};
kumite.lgl.LGLLayout.__name__ = ["kumite","lgl","LGLLayout"];
kumite.lgl.LGLLayout.__interfaces__ = [haxe.rtti.Infos];
kumite.lgl.LGLLayout.prototype = {
	sqrt: function(v) {
		if(v < 0.00001) v = 0.00001;
		return v;
	}
	,apply: function() {
		var damping = 0.90;
		var maxSpeed = 0.4;
		var maxSpeedSquared = maxSpeed * maxSpeed;
		this.highestEnergyVertex = this.lgl.vertexes[0];
		var _g = 0, _g1 = this.lgl.vertexes;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			v1.velocityX = (v1.velocityX + v1.forceX) * damping;
			v1.velocityY = (v1.velocityY + v1.forceY) * damping;
			v1.velocityZ = (v1.velocityZ + v1.forceZ) * damping;
			v1.forceX = 0;
			v1.forceY = 0;
			v1.forceZ = 0;
			v1.energy = v1.velocityX * v1.velocityX + v1.velocityY * v1.velocityY + v1.velocityZ * v1.velocityZ;
			this.totalEngergy += v1.energy;
			if(v1.energy > this.highestEnergyVertex.energy) this.highestEnergyVertex = v1;
			if(v1.energy > maxSpeedSquared) {
				var speed = Math.sqrt(v1.energy);
				v1.velocityX /= speed;
				v1.velocityY /= speed;
				v1.velocityZ /= speed;
				v1.velocityX *= maxSpeed;
				v1.velocityY *= maxSpeed;
				v1.velocityZ *= maxSpeed;
			}
			v1.positionX += v1.velocityX;
			v1.positionY += v1.velocityY;
			v1.positionZ += v1.velocityZ;
		}
	}
	,edges: function() {
		var d = 100;
		var f = 0.001;
		var _g = 0, _g1 = this.lgl.edges;
		while(_g < _g1.length) {
			var edge = _g1[_g];
			++_g;
			var v1 = this.lgl.vertexes[edge.v1Index];
			var v2 = this.lgl.vertexes[edge.v2Index];
			var dx = v2.positionX - v1.positionX;
			var dy = v2.positionY - v1.positionY;
			var dz = v2.positionZ - v1.positionZ;
			var dist = this.sqrt(dx * dx + dy * dy + dz * dz);
			dist = Clamp["float"](dist,0,d);
			var f2 = Math.abs(100 - (v1.weight + v2.weight)) * 0.0001;
			dist *= f + f2;
			dx *= dist;
			dy *= dist;
			dz *= dist;
			v1.forceX += dx;
			v1.forceY += dy;
			v1.forceZ += dz;
			v2.forceX -= dx;
			v2.forceY -= dy;
			v2.forceZ -= dz;
		}
	}
	,bounce: function() {
		var vertexes = this.lgl.vertexes;
		var r = Math.sin(new Date().getTime() / (4000 + 1000 * Math.cos(new Date().getTime() / 1000))) * 0.05;
		if(Math.random() < r) {
			var rnd = this.highestEnergyVertex;
			var r1 = 3;
			rnd.positionX += Rand["float"](-r1,r1);
			rnd.positionY += Rand["float"](-r1,r1);
			rnd.positionZ += Rand["float"](-r1,r1);
			rnd.positionX = Clamp["float"](rnd.positionX,-5,5);
			rnd.positionY = Clamp["float"](rnd.positionY,-5,5);
			rnd.positionZ = Clamp["float"](rnd.positionZ,-5,5);
		}
		if(Math.random() < r) {
			var rnd = vertexes[Math.random() * vertexes.length | 0];
			var r1 = 5;
			rnd.positionX = Rand["float"](-r1,r1);
			rnd.positionY = Rand["float"](-r1,r1);
			rnd.positionZ = Rand["float"](-r1,r1);
		}
		var maxDist = 5;
		var maxDistSquared = maxDist * maxDist;
		var f = 0.0001;
		var start = new Date().getTime();
		var totalComparisons = vertexes.length * vertexes.length / 2;
		var currentComparisons = 0;
		var lastComparisons = 0;
		var _g1 = 0, _g = vertexes.length - 1;
		while(_g1 < _g) {
			var i = _g1++;
			if(i % 5 == 0) {
				var now = new Date().getTime();
				if(now - start > 1000) {
					this.setMessage("Progress",currentComparisons / totalComparisons);
					this.setMessage("Compares/s",(currentComparisons - lastComparisons) * (1000 / (now - start)));
					lastComparisons = currentComparisons;
					start = now;
				}
			}
			var vi = vertexes[i];
			var _g3 = i + 1, _g2 = vertexes.length;
			while(_g3 < _g2) {
				var j = _g3++;
				currentComparisons++;
				var vj = vertexes[j];
				var dx = vi.positionX - vj.positionX;
				var dy = vi.positionY - vj.positionY;
				var dz = vi.positionZ - vj.positionZ;
				var distSquared = dx * dx + dy * dy + dz * dz;
				if(distSquared < maxDistSquared) {
					var dist = this.sqrt(distSquared);
					var invDist = Clamp["float"](maxDist - dist,0,maxDist);
					var f2 = (vi.weight + vj.weight) * 0.001;
					invDist *= f + f2;
					dx *= invDist;
					dy *= invDist;
					dz *= invDist;
					vi.forceX += dx;
					vi.forceY += dy;
					vi.forceZ += dz;
					vj.forceX -= dx;
					vj.forceY -= dy;
					vj.forceZ -= dz;
				}
			}
		}
		var now = new Date().getTime();
		this.setMessage("Progress",1);
		this.setMessage("Compares/s",(currentComparisons - lastComparisons) * (1000 / (now - start)));
	}
	,doLayout: function() {
		var vertexes = this.lgl.vertexes;
		this.totalEngergy = 0.0;
		this.bounce();
		this.edges();
		this.apply();
	}
	,render: function(tick) {
		if(this.totalEngergy < 0.0000002 && this.totalEngergy != 0) return;
		this.doLayout();
		this.setMessage("Energy",this.totalEngergy);
	}
	,start: function() {
		var index = 0;
		var _g = 0, _g1 = this.lgl.vertexes;
		while(_g < _g1.length) {
			var vertex = _g1[_g];
			++_g;
			vertex.positionX = Math.sin(index * 0.01 + Math.PI * 0.5);
			vertex.positionY = Math.sin(index * 0.022 + Math.PI * 0.7);
			vertex.positionZ = Math.sin(index * 0.033 + Math.PI * 1.9);
			index++;
		}
		this.highestEnergyVertex = this.lgl.vertexes[0];
	}
	,highestEnergyVertex: null
	,totalEngergy: null
	,visible: null
	,setMessage: null
	,lgl: null
	,__class__: kumite.lgl.LGLLayout
}
kumite.lgl.LGLWorker = $hxClasses["kumite.lgl.LGLWorker"] = function() {
};
kumite.lgl.LGLWorker.__name__ = ["kumite","lgl","LGLWorker"];
kumite.lgl.LGLWorker.main = function() {
	var instance = new kumite.lgl.LGLWorker();
	onmessage = function(e){instance.start(postMessage, e);}
}
kumite.lgl.LGLWorker.prototype = {
	createMessage: function(vertexBuffer,lgl) {
		var index = 0;
		var _g = 0, _g1 = lgl.edges;
		while(_g < _g1.length) {
			var edge = _g1[_g];
			++_g;
			var v1 = lgl.vertexes[edge.v1Index];
			var v2 = lgl.vertexes[edge.v2Index];
			vertexBuffer[index] = v1.positionX;
			vertexBuffer[index + 1] = v1.positionY;
			vertexBuffer[index + 2] = v1.positionZ;
			vertexBuffer[index + 3] = v2.positionX;
			vertexBuffer[index + 4] = v2.positionY;
			vertexBuffer[index + 5] = v2.positionZ;
			index += 6;
		}
		return vertexBuffer;
	}
	,start: function(postMessage,e) {
		var lgl = haxe.Unserializer.run(e.data);
		var vertexBuffer = new Float32Array(lgl.edges.length * 6);
		var setMessage = function(type,message) {
			postMessage(haxe.Serializer.run(new bpmjs.WorkerCommand(type)));
			postMessage(message);
		};
		var lglLayout = new kumite.lgl.LGLLayout();
		lglLayout.lgl = lgl;
		lglLayout.setMessage = setMessage;
		lglLayout.start();
		while(true) {
			var start = new Date().getTime();
			var _g = 0;
			while(_g < 1) {
				var i = _g++;
				lglLayout.render();
			}
			setMessage("Time",new Date().getTime() - start);
			postMessage(haxe.Serializer.run(new bpmjs.WorkerCommand("render")));
			postMessage(this.createMessage(vertexBuffer,lgl));
		}
	}
	,__class__: kumite.lgl.LGLWorker
}
kumite.lgl.Vertex = $hxClasses["kumite.lgl.Vertex"] = function() {
	this.positionX = 0;
	this.positionY = 0;
	this.positionZ = 0;
	this.forceX = 0;
	this.forceY = 0;
	this.forceZ = 0;
	this.velocityX = 0;
	this.velocityY = 0;
	this.velocityZ = 0;
	this.weight = 0;
	this.index = -1;
};
kumite.lgl.Vertex.__name__ = ["kumite","lgl","Vertex"];
kumite.lgl.Vertex.prototype = {
	toString: function() {
		return "Vertex[" + this.index + "]";
	}
	,velocityZ: null
	,velocityY: null
	,velocityX: null
	,forceZ: null
	,forceY: null
	,forceX: null
	,positionZ: null
	,positionY: null
	,positionX: null
	,energy: null
	,weight: null
	,index: null
	,__class__: kumite.lgl.Vertex
}
if(!kumite.time) kumite.time = {}
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
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
kumite.lgl.LGLLayout.__meta__ = { fields : { render : { Message : null}, start : { Sequence : ["boot","start"]}, lgl : { Inject : null}}};
kumite.lgl.LGLLayout.__rtti = "<class path=\"kumite.lgl.LGLLayout\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<lgl public=\"1\">\n\t\t<c path=\"kumite.lgl.LGL\"/>\n\t\t<meta><m n=\"Inject\"/></meta>\n\t</lgl>\n\t<setMessage public=\"1\"><f a=\":\">\n\t<c path=\"String\"/>\n\t<d/>\n\t<e path=\"Void\"/>\n</f></setMessage>\n\t<visible><c path=\"Float\"/></visible>\n\t<totalEngergy><c path=\"Float\"/></totalEngergy>\n\t<highestEnergyVertex><c path=\"kumite.lgl.Vertex\"/></highestEnergyVertex>\n\t<start public=\"1\" set=\"method\" line=\"26\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<meta><m n=\"Sequence\">\n\t<e>boot</e>\n\t<e>start</e>\n</m></meta>\n\t</start>\n\t<render public=\"1\" set=\"method\" line=\"40\">\n\t\t<f a=\"?tick\">\n\t\t\t<c path=\"kumite.time.Tick\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<meta><m n=\"Message\"/></meta>\n\t</render>\n\t<doLayout set=\"method\" line=\"50\"><f a=\"\"><e path=\"Void\"/></f></doLayout>\n\t<bounce set=\"method\" line=\"61\"><f a=\"\"><e path=\"Void\"/></f></bounce>\n\t<edges set=\"method\" line=\"150\"><f a=\"\"><e path=\"Void\"/></f></edges>\n\t<apply set=\"method\" line=\"183\"><f a=\"\"><e path=\"Void\"/></f></apply>\n\t<sqrt get=\"inline\" set=\"null\" line=\"221\"><f a=\"v\">\n\t<c path=\"Float\"/>\n\t<c path=\"Float\"/>\n</f></sqrt>\n\t<new public=\"1\" set=\"method\" line=\"19\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
kumite.time.Time.EXPECTED_FRAMERATE = 60;
kumite.lgl.LGLWorker.main();
