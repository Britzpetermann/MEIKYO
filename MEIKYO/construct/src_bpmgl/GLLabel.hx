class GLLabel extends GLInteractiveObject
{
	public var text(default, setText) : String;
	public var center(default, setCenter) : Bool;
	
	public function new()
	{
		super();
		center = true;
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
		var textMetrics = new Text();
		textMetrics.text = text;
		textMetrics.font = "12px Arial";
		
		graphic.clear(new Color(0.3, 0.3, 0.3, 0.8));
		graphic.fillStyle = new Color(1, 1, 1, 0.8);
		graphic.font = textMetrics.font;
		if (center)
			graphic.fillText(textMetrics.text, (width - textMetrics.width) / 2, 14);
		else
			graphic.fillText(textMetrics.text, 5, 14);
	}
	
	function setText(text : String) : String
	{
		if (this.text != text)
		{
			graphicIsInvalid = true;
			this.text = text;
		}
		return text;
	}
	
	function setCenter(center : Bool) : Bool
	{
		if (this.center != center)
		{
			graphicIsInvalid = true;
			this.center = center;
		}
		return center;
	}
}
