package bpmjs;

import haxe.rtti.CType;
import haxe.rtti.Meta;

class ReflectUtil
{
	public static function callMethodWithMetadata(object : Dynamic, type : Class<Dynamic>, metadata : String, args : Array<Dynamic>) : Dynamic
	{
		var metadatas = Meta.getFields(type);

		for(fieldName in Reflect.fields(metadatas))
		{
			var meta = Reflect.field(metadatas, fieldName);
			if (Reflect.hasField(meta, metadata))
			{
				return Reflect.callMethod(object, Reflect.field(object, fieldName), []);
			}
		}
		
		return null;
	}
	
	public static function getClassName(object : Dynamic) : String
	{
		return Type.getClassName(Type.getClass(object));
	}
}
