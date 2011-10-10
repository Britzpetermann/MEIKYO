package bpmjs;

import reflect.ClassInfo;
import bpmjs.ContextConfig;

class Context
{
	public var contextConfig : ContextConfig;
	public var objects : Array<ContextObject>;
	public var observers : Array<Observer>;

	public function new()
	{
		objects = new Array();
		observers = new Array();
	}

	public function addObject(name, classInfo, object)
	{
		var contextObject = new ContextObject(name, classInfo, object);
		objects.push(contextObject);
		return contextObject;
	}

	public function getObjectByName(name) : Dynamic
	{
		for(contextObject in objects)
		{
			if (contextObject.name == name)
				return contextObject.object;
		}
		return null;
	}

	public function getObjectByType<T>(type : Class<T>) : Dynamic
	{
		if (type == Context)
			return this;
			
		for(contextObject in objects)
		{
			if (contextObject.type == type)
				return contextObject.object;
		}
		return null;
	}
	
	public function addObserver(object : ContextObject, methodName : String, type : ClassInfo)
	{
		Log.info(object.classInfo.name, methodName, type.name);
		var observer = new Observer();
		observer.object = object;
		observer.methodName = methodName;
		observer.type= type;
		
		observers.push(observer);
	}
}

class ContextObject
{
	public var name : String;
	public var type : Class<Dynamic>;
	public var object : Dynamic;
	public var classInfo : ClassInfo;

	public function new(name, classInfo, object)
	{
		this.name = name;
		this.classInfo = classInfo;
		this.type = classInfo.type;
		this.object = object;
	}
}

class Observer
{
	public var object : ContextObject;
	public var methodName : String;
	public var type : ClassInfo;
	
	public function new() {}
	
	public function observe(objectToObserve : ContextObject)
	{
		if (Std.is(objectToObserve.object, type.type))
		{
			Reflect.callMethod(object.object, Reflect.field(object.object, methodName), [objectToObserve.object]);
		}
	}
}