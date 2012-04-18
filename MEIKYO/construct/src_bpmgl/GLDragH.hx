import hsl.haxe.DirectSignaler;
import hsl.haxe.Signaler;

class GLDragH extends GLInteractiveObject
{
	public var changeSignaler : Signaler<Float>;
	
	public var min : Float;
	public var max : Float;
	
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
		graphic.clear(new Color(1.0, 1.0, 1.0, 0.2));
		graphic.fillStyle = new Color(1, 1, 1, 0.8);
	}
	
	public function startSlide(slider : GLInteractiveObject)
	{
		stopSlide(this);
		
		dragStartX = x;
		dragStartMouseX = mouseXGlobal;
		
		GLMouseRegistry.getInstance().mouseMoveSignaler.bind(handleMouseMove2);
	}
	
	public function stopSlide(slider : GLInteractiveObject)
	{
		GLMouseRegistry.getInstance().mouseMoveSignaler.unbind(handleMouseMove2);
	}
	
	function handleMouseUpGlobal(position : Vec2)
	{
		stopSlide(this);
	}
	
	function handleMouseMove2(position : Vec2)
	{
		x = dragStartX + (mouseXGlobal - dragStartMouseX);
		if (x < min)
			x = min;
		if (x > max)
			x = max;
			
		changeSignaler.dispatch(x);
	}
}
