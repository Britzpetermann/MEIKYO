class TestCase2 extends haxe.unit.TestCase
{
	public function new()
	{
		super();
	}

	function assertNotNull( b:Dynamic, ?c : haxe.PosInfos ) : Void {
		currentTest.done = true;
		if (b == null){
			currentTest.success = false;
			currentTest.error   = "expected not null";
			currentTest.posInfos = c;
			throw currentTest;
		}
	}

	function assertNull( b:Dynamic, ?c : haxe.PosInfos ) : Void {
		currentTest.done = true;
		if (b != null){
			currentTest.success = false;
			currentTest.error   = "expected null";
			currentTest.posInfos = c;
			throw currentTest;
		}
	}

	function fail( message:String, ?c : haxe.PosInfos ) : Void {
		currentTest.done = true;
		currentTest.success = false;
		currentTest.error   = message;
		currentTest.posInfos = c;
		throw currentTest;
	}

	function noFail() : Void {
		currentTest.done = true;
	}
}
