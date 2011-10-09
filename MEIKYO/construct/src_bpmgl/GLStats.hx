import bpmjs.Stats;

class GLStats extends GLDisplayObject
{
	var lastDraw : Float;

	public function new()
	{
		super();

		width = 64;
		height = 32;
		
		enterFrameSignaler.bind(handleEnterFrame);
	}

	function handleEnterFrame(frame : GLFrame)
	{
		if (lastDraw < frame.time - 100)
		{
			lastDraw = frame.time;
			graphic.clear();
			graphic.fillStyle = new Color(0, 1, 0, 0.3);
			graphic.fillRect(0, 0, width - 10, Stats.getContents().length * 12 + 4);
			graphic.font = "12px Arial";
			graphic.fillStyle = new Color(0, 1, 0, 1);

			var line = 0;
			for(message in Stats.getContents())
			{
				graphic.fillText(message, 6, 12 + line * 12);
				line++;
			}
		}
	}
}
