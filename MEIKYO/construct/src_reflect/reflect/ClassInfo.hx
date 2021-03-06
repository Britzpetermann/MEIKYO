package reflect;

import haxe.rtti.CType;

class ClassInfo
{
	private static var cache = new Hash<ClassInfo>();
	
	public static function forInstance(instance : Dynamic) : ClassInfo
	{
		if (instance == null)
			throw "Missing instance";
			
		var type = Type.getClass(instance);
		if (type == null)
			throw "Cannot resolve type for instance: " + instance;
			
		return forClass(type);
	}
	
	public static function forClass(type : Class<Dynamic>) : ClassInfo
	{
		if (type == null)
			throw "Missing type";
			
		var name = Type.getClassName(type);
			
		return getClassInfo(name, type);
	}
	
	public static function forName(name : String) : ClassInfo
	{
		if (name == null)
			throw "Missing name";
			
		var type = Type.resolveClass(name);
		if (type != null)
			return getClassInfo(name, type);
			
		var enumm = Type.resolveEnum(name);
		if (enumm != null)
			return getClassInfo(name, enumm);
			
		throw "Cannot resolve type or enum for name: " + name;
	}
	
	public static function forCType(t : CType) : ClassInfo
	{
		if (t == null)
			throw "Missing CType";
		
		switch (t)
		{
			case CFunction(args, ret):
				return ClassInfo.forCType(ret);
			case CClass(name, params):
				return ClassInfo.forName(name);
			case CEnum(name, params):
				return ClassInfo.forName(name);
			default:
		}
			
		throw "Could not resolve CType: " + t;
	}
	
	private static function getClassInfo(name : String, type : Dynamic) : ClassInfo
	{
		var hash = getHash(name, type);
		if (cache.exists(hash))
			return cache.get(hash);
			
		var result = new ClassInfo(name, type);
		
		cache.set(hash, result);
		return result;
	}
	
	static function getHash(name : String, type : Class<Dynamic>) : String
	{
		var hash = name;
		var internalNames : Array<String> = untyped type.__name__;
		if (internalNames != null)
			hash = internalNames.join(".");
		return hash;
	}
	
	public var type(default, null) : Class<Dynamic>;
	public var name(default, null) : String;
	public var shortName(getShortName, null) : String;
	public var hasRtti(default, null) : Bool;
	public var properties(getProperties, null) : Array<Property>;
	public var methods(getMethods, null) : Array<Method>;
	
	function new(name : String, type : Class<Dynamic>)
	{
		this.name = name;
		this.type = type;
		hasRtti = untyped type.__rtti != null;
	}
	
	public function getProperty(name : String) : Property
	{
		for(property in properties)
			if (property.name == name)
				return property;
		
		return null;
	}
	
	public function getMethod(name : String) : Method
	{
		for(method in methods)
			if (method.name == name)
				return method;
		
		return null;
	}
	
	public function toString() : String
	{
		return "[ClassInfo for class: " + name + "]";
	}
	
	function getShortName()
	{
		return name.substr(name.lastIndexOf(".") + 1);
	}
	
	function getProperties()
	{
		if (properties != null)
			return properties;
			
		initFields();
		
		return properties;
	}
	
	function getMethods()
	{
		if (methods != null)
			return methods;
			
		initFields();
		
		return methods;
	}
	
	function initFields()
	{
		properties = new Array();
		methods = new Array();
		scanClass(type);
	}
	
	function scanClass(type : Class<Dynamic>)
	{
		if (untyped type.__rtti == null)
			return;
			
		var infos = new haxe.rtti.XmlParser().processElement(Xml.parse(untyped type.__rtti).firstElement());
		var classDef : Classdef;
		switch(infos)
		{
			case TClassdecl(c): classDef = c;
			default: throw Type.getClassName(type) + " needs to be a class!";
		}
		
		scanFields(classDef);
		
		if(classDef.superClass != null)
		{
			scanClass(Type.resolveClass(classDef.superClass.path));
		}
	}
	
	function scanFields(classDef : Classdef)
	{
		for(field in classDef.fields)
		{
			switch (field.type)
			{
				case CFunction(args, ret):
					methods.push(new Method(field, args, ret, classDef.path, this));
				case CClass(name, params):
					properties.push(new Property(field, classDef.path, this));
				case CEnum(name, params):
					properties.push(new Property(field, classDef.path, this));
				default:
					Log.warn("Unknown type:", Reflect.field(field, "type"), "in type:", Reflect.field(classDef, "path"), "found in:" + name);
			}
			
		}
	}
}
