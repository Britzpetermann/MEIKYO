import bpmjs.Stats;

class GLStats extends GLDisplayObjectContainer
{
	var label : GLLabel;
	var lastDraw : Float;

	public function new()
	{
		super();

		enterFrameSignaler.bind(handleEnterFrame);
		
		label = new GLLabel();
		label.x = 10;
		label.y = 10;
		label.width = 100;
		label.height = 20;
		addChild(label);
	}

	function handleEnterFrame(frame : GLFrame)
	{
		if (lastDraw < frame.time - 100)
		{
			lastDraw = frame.time;

			var line = 0;
			for(message in Stats.getContents())
			{
				label.text = message;
				line++;
			}
		}
	}
}
