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
		
		if (type == null)
			throw "Cannot resolve type for name: " + name;
		
		return getClassInfo(name, type);
	}
	
	private static function getClassInfo(name : String, type : Class<Dynamic>) : ClassInfo
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
	public var properties(getProperties, null) : Array<Property>;
	public var methods(getMethods, null) : Array<Method>;
	
	function new(name : String, type : Class<Dynamic>)
	{
		this.name = name;
		this.type = type;
	}
	
	public function getProperty(name : String) : Property
	{
		for(property in properties)
			if (property.name == name)
				return property;
		
		return null;
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
