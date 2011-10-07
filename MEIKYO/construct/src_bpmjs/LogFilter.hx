interface LogFilter
{
	public function enabled(input : Bool, i : haxe.PosInfos, level : LogLevel) : Bool;
}
