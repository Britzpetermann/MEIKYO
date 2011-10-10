package bpmjs;

import bpmjs.FrontMessenger;
import bpmjs.Context;
import bpmjs.Messenger;

import reflect.ClassInfo;

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
		var contextObject = context.addObject("configured", ClassInfo.forInstance(object), object);
		configureDynamicObjects(cast [contextObject]);
	}

	function buildInternal(configClasses : Array<Class<Dynamic>>)
	{
		context.contextConfig = contextConfig;
		
		Lambda.iter(configClasses, createObjects);

		configureDynamicObjects(context.objects);
	}
	
	function createObjects(configClass : Class<Dynamic>)
	{
		var config = Type.createInstance(configClass, []);
		var ci = ClassInfo.forClass(configClass);
		
		if (!ci.hasRtti)
		{
			var message = "Config class:" + ci.name + "has no rtti extension - use 'implement haxe.rtti.Infos'";
			throw message;
		}
		
		for (property in ci.properties)
		{
			var instance = property.getValue(config);
			if (instance == null)
			{
				Log.warn("Found property", property.name, "in config", ci.name, "but was null");
			}
			else
			{
				context.addObject(property.name, property.type, instance);
		
				if (property.clazz == Array)
				{
					var list : Array<Dynamic> = cast instance;
					for(listInstance in list)
					{
						context.addObject("dynamic", ClassInfo.forInstance(listInstance), listInstance);
					}
				}
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
				var wiredObject = context.getObjectByType(property.clazz);
				if (wiredObject == null)
					Log.warn("Found [Inject] at object " + Type.getClassName(contextObject.type)+ "#" + property.name + " but could not find object to inject.");
				else
					property.setValue(contextObject.object, wiredObject);				
			}
		}
	}
	
	function findObservers(contextObject : ContextObject)
	{
		for (method in contextObject.classInfo.methods)
		{
			if (method.hasMetadata("Observe"))
			{
				if (method.parameters.length == 1)
					context.addObserver(contextObject, method.name, method.parameters[0].type);
				else
					throw "Method to observe: " + contextObject.classInfo.name + "." + method.name + " needs exactly one parameter";
			}
		}
	}

	function registerMessengerByObjectType(contextObject : ContextObject)
	{
		if (Std.is(contextObject.object, Messenger))
		{
			contextConfig.frontMessenger.addMessenger(contextObject.object);
		}
	}

	function registerMessengers(contextObject : ContextObject)
	{
		for (property in contextObject.classInfo.properties)
		{
			if (property.hasMetadata("Messenger"))
			{
				var messenger = new Messenger();
				property.setValue(contextObject.object, messenger);
				contextConfig.frontMessenger.addMessenger(messenger);
			}
		}
	}

	function registerReceivers(contextObject : ContextObject)
	{
		for (method in contextObject.classInfo.methods)
		{
			if (method.hasMetadata("Message"))
			{
				if (method.parameters.length == 1)
					contextConfig.frontMessenger.addReceiver(contextObject.object, method.name, method.parameters[0].type.type);
				else
					throw "Message: " + contextObject.classInfo.name + "." + method.name + " needs exactly one parameter";
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
