package reflect;

import hsl.haxe.DirectSignaler;
import hsl.haxe.Signaler;

class Binding
{
	public var instance:Dynamic;
	public var fieldName:String;
	
	public var change:Signaler<Binding>;
	
	public static function createForInstanceAndName(instance:Dynamic, fieldName:String):Binding
	{
		return new Binding(instance, fieldName);
	}
	
	public function new(instance : Dynamic, fieldName : String)
	{
		this.instance = instance;
		this.fieldName = fieldName;
		
		change = new DirectSignaler(this);
	}
	
	public function getValue() : Dynamic
	{
		return Reflect.field(instance, fieldName);
	}
	
	public function setValue(value : Dynamic) : Void
	{
		Reflect.setField(instance, fieldName, value);
	}
	
	public function watch()
	{
		change.dispatch(this);
	}
}
