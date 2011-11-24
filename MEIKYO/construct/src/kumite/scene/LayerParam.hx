package kumite.scene;

import reflect.Binding;
import reflect.Property;

class LayerParam
{
	public var name(getName, null) : String;
	public var property : Property;
	public var object : Dynamic;
	
	public function new()
	{
		name = "Otto";
	}
	
	public function getName()
	{
		return property.name;
	}
	
	public function getBinding()
	{
		return new Binding(object, property);
	}
}
