import hsl.haxe.DirectSignaler;
import hsl.haxe.Signaler;

class GLInteractiveObject extends GLDisplayObject
{
	public var hitarea : GLHitarea;
	public var mouseEnabled : Bool;
	public var handCursor : Bool;

	public var mouseDownSignaler : Signaler<GLInteractiveObject>;
	public var mouseUpSignaler : Signaler<GLInteractiveObject>;

	public var mouseX:Float;
	public var mouseY:Float;

	public var mouseXGlobal:Float;
	public var mouseYGlobal:Float;

	public function new()
	{
		mouseEnabled = false;
		handCursor = true;
		
		hitarea = new GLHitarea();
		hitarea.position.x = 0;
		hitarea.position.y = 0;
		
		super();

		GLDisplayList.getDefault().initInteractiveObject(this);
		GLMouseRegistry.getInstance().mouseMoveSignaler.bind(handleMouseMove);
	}
	
	function handleMouseMove(position : Vec2)
	{
		mouseXGlobal = mouseX = position.x * stage.stageWidth;
		mouseYGlobal = mouseY = position.y * stage.stageHeight;
		
		//fake global to local
		
		mouseX -= x;
		mouseY -= y;
		var localParent = parent;
		while(localParent != null)
		{
			mouseX -= localParent.x;
			mouseY -= localParent.y;
			
			localParent = localParent.parent;
		}
	}	
	
	override function setWidth(?value)
	{
		var result = super.setWidth(value);
		hitarea.size.x = result;
		return result;
	}
	
	override function setHeight(?value)
	{
		var result = super.setHeight(value);
		hitarea.size.y = result;
		return result;
	}
}
