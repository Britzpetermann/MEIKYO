class LogLevel
{
	public static var INFO = new LogLevel(1);
	public static var WARN = new LogLevel(2);
	public static var ERROR = new LogLevel(3);
	public static var OFF = new LogLevel(4);
	
	private var value : Int;
	
	private function new (value : Int)
	{
		this.value = value;
	}
	
	public function isSmallerOrEqual(level : LogLevel)
	{
		return value <= level.value;
	}
}
