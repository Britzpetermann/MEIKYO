import hsl.haxe.DirectSignaler;
import hsl.haxe.Signaler;

class GLDragH extends GLInteractiveObject
{
	public var changeSignaler : Signaler<Float>;
	
	public var min : Float;
	public var max : Float;
	
	var mouseX : Float;
	var dragStartMouseX : Float;
	
	var dragStartX : Float;
	
	public function new()
	{
		super();
		
		changeSignaler = new DirectSignaler(this);
		
		mouseEnabled = true;
		
		min = 0;
		max = 200;
		
		mouseDownSignaler.bind(startSlide);
		mouseUpSignaler.bind(stopSlide);
		
		GLMouseRegistry.getInstance().mouseMoveSignaler.bind(handleMouseMove);
		GLMouseRegistry.getInstance().mouseUpSignaler.bind(handleMouseUpGlobal);
	}
	
	override public function validateGraphics()
	{
		if (graphicIsInvalid)
		{
			renderText();
			super.validateGraphics();
		}
	} 
	
	function renderText()
	{
		graphic.clear(new Color(0.3, 0.3, 0.3, 0.8));
		graphic.fillStyle = new Color(1, 1, 1, 0.8);
	}
	
	function startSlide(slider : GLInteractiveObject)
	{
		stopSlide(this);
		
		dragStartX = x;
		dragStartMouseX = mouseX;
		
		GLMouseRegistry.getInstance().mouseMoveSignaler.bind(handleMouseMove2);
	}
	
	function stopSlide(slider : GLInteractiveObject)
	{
		GLMouseRegistry.getInstance().mouseMoveSignaler.unbind(handleMouseMove2);
	}
	
	function handleMouseUpGlobal(position : Vec2)
	{
		stopSlide(this);
	}
	
	function handleMouseMove(position : Vec2)
	{
		mouseX = position.x * stage.stageWidth;
	}
	
	function handleMouseMove2(position : Vec2)
	{
		x = dragStartX + (mouseX - dragStartMouseX);
		if (x < min)
			x = min;
		if (x > max)
			x = max;
			
		changeSignaler.dispatch(x);
	}
}
