package bpmjs;

import haxe.rtti.CType;
import haxe.rtti.Meta;
import bpmjs.FrontMessenger;
import bpmjs.Context;
import bpmjs.Messenger;

class ContextBuilder
{
	private static var defaultContext : Context;

	public static function build(configClass : Class<Dynamic>, ?contextConfig : ContextConfig) : Context
	{
		return buildAll([configClass], contextConfig);
	}

	public static function buildAll(configClasses : Array<Dynamic>, ?contextConfig : ContextConfig) : Context
	{
		var builder = new ContextBuilder();
		defaultContext = builder.context;

		builder.contextConfig = contextConfig == null ? createDefaultContextConfig() : contextConfig;
		builder.buildInternal(cast configClasses);

		return defaultContext;
	}

	public static function configure(object : Dynamic) : Void
	{
		var builder = new ContextBuilder();

		if (defaultContext == null)
			throw builder.createError("Cannot configure Object as no context is available!");

		builder.contextConfig = defaultContext.contextConfig;
		builder.context = defaultContext;
		builder.configureInternal(object);
	}

	static function createDefaultContextConfig()
	{
		var defaultContextConfig = new ContextConfig();
		defaultContextConfig.frontMessenger = new DefaultFrontMessenger();
		return defaultContextConfig;
	}

	var context : Context;
	var contextConfig : ContextConfig;
	
	function new()
	{
		context = new Context();
	}

	function configureInternal(object : Dynamic)
	{
		var contextObject = context.addObject("configured", Type.getClass(object), object);
		configureDynamicObjects(cast [contextObject]);
	}

	function buildInternal(configClasses : Array<Class<Dynamic>>)
	{
		context.contextConfig = contextConfig;
		
		for (configClass in configClasses)
		{
			var config = Type.createInstance(configClass, []);
			createObjects(config, configClass);
		}

		configureDynamicObjects(context.objects);
	}
	
	function createObjects(config : Dynamic, configClass : Class<Dynamic>)
	{
		if (untyped configClass.__rtti == null)
			throw createError("Config class " + Type.getClassName(configClass) + " must have RTTI enabled!");

		var infos = new haxe.rtti.XmlParser().processElement(Xml.parse(untyped configClass.__rtti).firstElement());
		var classDef : Classdef = cast TypeApi.typeInfos(infos);
		for(field in classDef.fields)
		{
			switch(field.type) {
				case CClass(name, params):
					var type = Type.resolveClass(name);
					if (type == null)
						throw "Type of class " + name + " is null!";
					var instance = Reflect.field(config, field.name);
					context.addObject(field.name, type, instance);

					if (type == Array)
					{
						var list : Array<Dynamic> = cast instance;
						for(listInstance in list)
						{
							context.addObject("dynamic", Type.getClass(listInstance), listInstance);
						}
					}
				default: continue;
			}
		}
	}
	
	function configureDynamicObjects(objects : Array<ContextObject>)
	{
		Lambda.iter(objects, wireContextObject);
		Lambda.iter(objects, findObservers);
		Lambda.iter(objects, registerMessengerByObjectType);
		Lambda.iter(objects, registerMessengers);
		Lambda.iter(objects, registerReceivers);
		Lambda.iter(objects, doObserve);
		Lambda.iter(objects, doCompleteCall);
		Lambda.iter(objects, doPostCompleteCall);
	}

	function wireContextObject(contextObject : ContextObject)
	{
		for (property in contextObject.classInfo.properties)
		{
			if (property.hasMetadata("Inject"))
			{
				var type = property.type.type;
				var wiredObject = type == Context ? context :  context.getObjectByType(type);
				if (wiredObject == null)
					Log.warn("Found [Inject] at object " + Type.getClassName(contextObject.type)+ "#" + property.name + " but could not find object to inject.");
				else
					property.setValue(contextObject.object, wiredObject);				
			}
		}
		/*
		if (untyped contextObject.type.__rtti == null)
			return;

		var infos = new haxe.rtti.XmlParser().processElement(Xml.parse(untyped contextObject.type.__rtti).firstElement());
		var classDef : Classdef = cast TypeApi.typeInfos(infos);
		var metaDatas = Meta.getFields(contextObject.type);

		for(field in classDef.fields)
		{
			switch(field.type) {
				case CClass(name, params):
					var meta = Reflect.field(metaDatas, field.name);
					if (meta != null && Reflect.hasField(meta, "Inject"))
					{
						var type = Type.resolveClass(name);
						var wiredObject = type == Context ? context :  context.getObjectByType(type);
						if (wiredObject == null)
							Log.warn("Found [Inject] at object " + Type.getClassName(contextObject.type)+ "#" + field.name + " but could not find object to inject.");
						else
							Reflect.setField(contextObject.object, field.name, wiredObject);
					}
				default:
					continue;
			}
		}
		 */
	}
	
	function findObservers(contextObject : ContextObject)
	{
		if (untyped contextObject.type.__rtti == null)
			return;

		var metaDatas = Meta.getFields(contextObject.type);
		var infos = new haxe.rtti.XmlParser().processElement(Xml.parse(untyped contextObject.type.__rtti).firstElement());
		var classDef : Classdef = cast TypeApi.typeInfos(infos);

		for(field in classDef.fields)
		{
			switch(field.type) {
				case CFunction(args, ret):
					var meta = Reflect.field(metaDatas, field.name);
					if (meta != null && Reflect.hasField(meta, "Observe"))
					{
						for (argument in args)
						{
							switch(argument.t) {
								case CClass(name, params):
									var type = Type.resolveClass(name);
									context.addObserver(contextObject, field.name, type);
								default: continue;
							}
							break;
						}
					}
				default: continue;
			}
		}	}

	function registerMessengerByObjectType(contextObject : ContextObject)
	{
		if (Std.is(contextObject.object, Messenger))
		{
			contextConfig.frontMessenger.addMessenger(contextObject.object);
		}
	}

	function registerMessengers(contextObject : ContextObject)
	{
		var metadatas = Meta.getFields(contextObject.type);

		for(fieldName in Reflect.fields(metadatas))
		{
			var meta = Reflect.field(metadatas, fieldName);
			if (Reflect.hasField(meta, "Messenger"))
			{
				var messenger = new Messenger();
				Reflect.setField(contextObject.object, fieldName, messenger);
				contextConfig.frontMessenger.addMessenger(messenger);
			}
		}
	}

	function registerReceivers(contextObject : ContextObject)
	{
		if (untyped contextObject.type.__rtti == null)
			return;

		var infos = new haxe.rtti.XmlParser().processElement(Xml.parse(untyped contextObject.type.__rtti).firstElement());
		var classDef : Classdef = cast TypeApi.typeInfos(infos);
		var metaDatas = Meta.getFields(contextObject.type);

		for(field in classDef.fields)
		{
			switch(field.type) {
				case CFunction(args, ret):
					var meta = Reflect.field(metaDatas, field.name);
					if (meta != null && Reflect.hasField(meta, "Message"))
					{
						for (argument in args)
						{
							switch(argument.t) {
								case CClass(name, params):
									var type = Type.resolveClass(name);
									contextConfig.frontMessenger.addReceiver(contextObject.object, field.name, type);
								default: continue;
							}
							break;
						}
					}
				default: continue;
			}
		}
	}

	function doObserve(contextObject : ContextObject)
	{
		for(observer in context.observers)
			observer.observe(contextObject);
	}

	function doCompleteCall(contextObject : ContextObject)
	{
		ReflectUtil.callMethodWithMetadata(contextObject.object, contextObject.type, "Complete", []);
	}

	function doPostCompleteCall(contextObject : ContextObject)
	{
		ReflectUtil.callMethodWithMetadata(contextObject.object, contextObject.type, "PostComplete", []);
	}

	function createError(message)
	{
		return "ContextBuilder ERROR: " + message;
	}
}
