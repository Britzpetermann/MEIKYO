import reflect.Binding;
import reflect.NullBinding;

import hsl.haxe.DirectSignaler;
import hsl.haxe.Signaler;

class GLSliderH extends GLDisplayObjectContainer
{
	public var label : GLLabel;
	public var dragH : GLDragH;
	
	public var min(default, setMin) : Float;
	public var max(default, setMax) : Float;
	
	public var value : Float;
	public var precision : Float;
	
	var binding : Binding;
	
	public function new()
	{
		binding = new NullBinding();
		
		label = new GLLabel();
		dragH = new GLDragH();
		
		super();
		
		min = 0;
		max = 1;
		value = min;
		precision = 10000;
		
		label.text = "Text";
		label.width = 100;
		label.height = 20;
		
		dragH.min = 0;
		dragH.width = 10;
		dragH.max = 100 - dragH.width;
		dragH.height = 20;
		dragH.changeSignaler.bind(dragChanged);
		
		addChild(dragH);
		addChild(label);
		
		updateChildren();
	}
	
	public function bind(binding : Binding)
	{
		this.binding.change.unbind(handleBindChange);
		this.binding = binding;
		this.binding.change.bind(handleBindChange);
	}
	
	function handleBindChange(binding:Binding)
	{
		value = binding.getValue();
		updateDragValue();
		updateLabel();
	}
	
	override function setWidth(?value)
	{
		var result = super.setWidth(value);
		label.width = result;
		dragH.max = result - dragH.width;
		
		updateChildren();
			
		return result;
	}	
	
	function setMin(value)
	{
		min = value;
		
		if (this.value < min)
			this.value = min;
		
		updateChildren();
		
		return min;
	}
	
	function setMax(value)
	{
		max = value;

		if (this.value > max)
			this.value = max;
		
		updateChildren();
		
		return max;
	}
	
	function dragChanged(value : Float)
	{
		this.value = Map.linear(value, dragH.min, dragH.max, min, max);
		updateChildren();
	}
	
	function updateChildren()
	{
		updateDragValue();
		updateLabel();
		
		binding.setValue(value);
	}
	
	function updateLabel()
	{
		label.text = Std.string(Math.round(value * precision) / precision);
	}
	
	function updateDragValue()
	{
		dragH.x = Map.linear(value, min, max, dragH.min, dragH.max);
	}
}
