class GLProgressBar extends GLDisplayObject
{
	public var progress(default, setProgress):Float;
	
	function setProgress(value:Float)
	{
		if (value == 0)
		{
			graphic.clear();
		}
		else
		{
			graphic.clear();
			graphic.fillStyle = new Color(1, 1, 1, 0.2);
			graphic.fillRect(0, 0, width * value, height);
		}
		
		return value;
	}
}
