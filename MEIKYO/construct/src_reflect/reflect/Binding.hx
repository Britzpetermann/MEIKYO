package reflect;

class Binding
{
	public var object : Dynamic;
	public var property : Property;
	
	public function new(object : Dynamic, property : Property)
	{
		this.object = object;
		this.property = property;
	}
	
	public function getValue() : Dynamic
	{
		return property.getValue(object);
	}
	
	public function setValue(value : Dynamic) : Void
	{
		property.setValue(object, value);
	}	
}
