package reflect;

class NullBinding extends Binding
{
	public function new()
	{
		super(null, null);
	}
	
	override function getValue() : Dynamic
	{
		return null;
	}
	
	override function setValue(value : Dynamic) : Void
	{
	}	
}
