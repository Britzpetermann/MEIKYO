package reflect;

import hsl.haxe.DirectSignaler;
import hsl.haxe.Signaler;

class Binding
{
	public var object : Dynamic;
	public var property : Property;
	
	public var change:Signaler<Binding>;
	
	public function new(object : Dynamic, property : Property)
	{
		this.object = object;
		this.property = property;
		
		change = new DirectSignaler(this);
	}
	
	public function getValue() : Dynamic
	{
		return property.getValue(object);
	}
	
	public function setValue(value : Dynamic) : Void
	{
		property.setValue(object, value);
	}
	
	public function watch()
	{
		change.dispatch(this);
	}
}
