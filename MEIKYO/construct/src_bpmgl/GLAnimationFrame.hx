import haxe.Timer;
import js.Lib;

class GLAnimationFrame
{
	public static function run(method : Void->Void, ?fps : Float = 0)
	{
		function secureMethod()
		{
			try
			{
				method();
			}
			catch(e : Dynamic)
			{
				Log.error("Error executing GLAnimationFrame: " + e);
			}
		}
		
		if (fps == 0)
		{
			var window : Dynamic = Lib.window;
			var requestAnimationFrame : (Void->Void)->Void = untyped (
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame);

			if (requestAnimationFrame != null)
			{
				function requester()
				{
					requestAnimationFrame(requester);
					secureMethod();
				}
				requestAnimationFrame(requester);
			}
			else
			{
				var timer = new Timer(Std.int(1000 / 60));
				timer.run = secureMethod;
			}
		}
		else
		{
			var timer = new Timer(Std.int(1000 / fps));
			timer.run = secureMethod;
		}
	}
}
