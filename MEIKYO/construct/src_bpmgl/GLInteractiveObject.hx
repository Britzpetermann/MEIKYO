import hsl.haxe.DirectSignaler;
import hsl.haxe.Signaler;

class GLInteractiveObject extends GLDisplayObject
{
	public var hitarea : GLHitarea;

	public var mouseDownSignaler : Signaler<GLInteractiveObject>;

	public function new()
	{
		hitarea = new GLHitarea();
		hitarea.position.x = 0;
		hitarea.position.y = 0;
		
		super();

		GLDisplayList.getDefault().initInteractiveObject(this);
	}
	
	override function setWidth(?value : Int)
	{
		var result = super.setWidth(value);
		hitarea.size.x = result;
		return result;
	}
	
	override function setHeight(?value : Int)
	{
		var result = super.setHeight(value);
		hitarea.size.y = result;
		return result;
	}
}
