class GLLabel extends GLInteractiveObject
{
	public var text(default, setText) : String;
	
	public function new()
	{
		super();
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
		
		graphic.clear(new Color(0, 1, 0, 0.3));
		graphic.fillStyle = new Color(0, 1, 0, 1);
		graphic.font = textMetrics.font;
		graphic.fillText(textMetrics.text, (width - textMetrics.width) / 2, 14);
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
}
