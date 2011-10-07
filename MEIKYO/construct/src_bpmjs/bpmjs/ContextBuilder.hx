package bpmjs;

import haxe.rtti.CType;
import haxe.rtti.Meta;
import bpmjs.FrontController;
import bpmjs.Context;

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
		defaultContextConfig.frontController = new DefaultFrontController();
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
		wireContextObject(contextObject);
		registerDispatchersForContextObject(contextObject);
		registerReceiversForContextObject(contextObject);
		doCompleteCallForContextObject(contextObject);
	}

	function buildInternal(configClasses : Array<Class<Dynamic>>)
	{
		context.contextConfig = contextConfig;
		
		for (configClass in configClasses)
		{
			var config = Type.createInstance(configClass, []);
			createObjects(config, configClass);
		}

		wireInjections();
		registerDispatchers();
		registerReceivers();
		doCompleteCall();
		doPostCompleteCall();
	}
	
	function createObjects(config : Dynamic, configClass : Class<Dynamic>)
	{
		if (untyped configClass.__rtti == null)
			throw createError("Config class must have RTTI enabled!");

		var infos = new haxe.rtti.XmlParser().processElement(Xml.parse(untyped configClass.__rtti).firstElement());
		var classDef : Classdef = cast TypeApi.typeInfos(infos);
		for(field in classDef.fields)
		{
			switch(field.type) {
				case CClass(name, params):
					var type = Type.resolveClass(name);
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

	function wireInjections()
	{
		for(contextObject in context.objects)
		{
			wireContextObject(contextObject);
		}
	}

	function wireContextObject(contextObject : ContextObject)
	{
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
	}

	function registerDispatchers()
	{
		for(contextObject in context.objects)
		{
			registerDispatchersForContextObject(contextObject);
		}
	}

	function registerDispatchersForContextObject(contextObject : ContextObject)
	{
		var metaDatas = Meta.getType(contextObject.type);
		if (metaDatas != null && Reflect.hasField(metaDatas, "ManagedEvents"))
		{
			contextConfig.frontController.addDispatcher(contextObject.object);
		}
	}

	function registerReceivers()
	{
		for(contextObject in context.objects)
		{
			registerReceiversForContextObject(contextObject);
		}
	}

	function registerReceiversForContextObject(contextObject : ContextObject)
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
					if (meta != null && Reflect.hasField(meta, "MessageHandler"))
					{
						for (argument in args)
						{
							switch(argument.t) {
								case CClass(name, params):
									var type = Type.resolveClass(name);
									contextConfig.frontController.addReceiver(contextObject.object, field.name, type);
								default: continue;
							}
							break;
						}
					}
				default: continue;
			}
		}
	}

	function doCompleteCall()
	{
		for(contextObject in context.objects)
		{
			doCompleteCallForContextObject(contextObject);
		}
	}

	function doCompleteCallForContextObject(contextObject : ContextObject)
	{
		var object = contextObject.object;
		var metaDatas = Meta.getFields(contextObject.type);

		for(fieldName in Reflect.fields(metaDatas))
		{
			var meta = Reflect.field(metaDatas, fieldName);
			if (Reflect.hasField(meta, "Complete"))
			{
				Reflect.callMethod(object, Reflect.field(object, fieldName), []);
			}
		}
	}

	function doPostCompleteCall()
	{
		for(contextObject in context.objects)
		{
			var object = contextObject.object;
			var metaDatas = Meta.getFields(contextObject.type);

			for(fieldName in Reflect.fields(metaDatas))
			{
				var meta = Reflect.field(metaDatas, fieldName);
				if (Reflect.hasField(meta, "PostComplete"))
				{
					Reflect.callMethod(object, Reflect.field(object, fieldName), []);
				}
			}
		}
	}

	function createError(message)
	{
		return "ContextBuilder ERROR: " + message;
	}
}
