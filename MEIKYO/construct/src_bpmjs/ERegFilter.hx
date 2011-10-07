class ERegFilter implements LogFilter
{
	private var level : LogLevel;
	private var r : EReg;
	
	public function new(level : LogLevel, r : EReg)
	{
		this.level = level;
		this.r = r;
	}
	
	public function enabled(input : Bool, i : haxe.PosInfos, level : LogLevel) : Bool
	{
		var sender = i.className + "." + i.methodName;
		//trace(this);
		//trace(["sender: ", sender, level]);
		//trace(r.match(sender));
		
		var matches = r.match(sender);
		if (!matches)
			return input;
			
		return matches && this.level.isSmallerOrEqual(level);
	}
}
