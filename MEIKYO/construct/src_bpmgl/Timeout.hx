import haxe.Timer;

class Timeout
{
	public static function execute(ms : Int, method : Void->Void)
	{
		var timer = new Timer(ms);
		
		var run = function()
		{
			method();
			timer.stop();
		}
		timer.run = run;
	}
}
