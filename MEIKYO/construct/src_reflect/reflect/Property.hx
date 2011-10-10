package reflect;

import haxe.rtti.CType;

class Property extends Field
{
	public function getValue(instance : Dynamic) : Dynamic
	{
		return Reflect.field(instance, name);
	}
	
	public function setValue(instance : Dynamic, value : Dynamic) : Void
	{
		Reflect.setField(instance, name, value);
	}
}
