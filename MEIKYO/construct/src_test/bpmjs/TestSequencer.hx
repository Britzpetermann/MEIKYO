package bpmjs;

class TestSequencer extends TestCase2
{
	public static var initPrepareCount : Int;
	public static var initCount : Int;
	
	public override function setup()
	{
		initPrepareCount = 0;
		initCount = 0;
	}

	public function testInitPrepare()
	{
		var context = ContextBuilder.build(TestConfig);
		assertEquals(1, initPrepareCount);
	}
	
	public function testInit()
	{
		var context = ContextBuilder.build(TestConfig);
		assertEquals(1, initCount);
	}
}

private class TestConfig implements haxe.rtti.Infos
{
	public var launcher : Launcher;
	public var sequencer : Sequencer;
	public var s1 : S1;

	public function new()
	{
		launcher = new Launcher();
		sequencer = new Sequencer();
		s1 = new S1();
	}
}

private class Launcher implements haxe.rtti.Infos
{
	@Inject
	public var sequencer : Sequencer;
	
	public function new()
	{
	}

	@PostComplete
	public function handleContextPostComplete()
	{
		Log.info();
		sequencer.start("boot");
	}
}

private class S1 implements haxe.rtti.Infos
{
	public function new()
	{
	}

	@Sequence("boot", "initPrepare")
	public function initPrepare()
	{
		TestSequencer.initPrepareCount++;
	}
	
	@Sequence("boot", "init")
	public function init()
	{
		TestSequencer.initCount++;
	}
}
