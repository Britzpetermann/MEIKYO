package reflect;

import haxe.rtti.CType;

class Property extends Field
{
	public inline function getValue(instance : Dynamic) : Dynamic
	{
		return Reflect.field(instance, name);
	}
	
	public inline function setValue(instance : Dynamic, value : Dynamic) : Void
	{
		Reflect.setField(instance, name, value);
	}
}
