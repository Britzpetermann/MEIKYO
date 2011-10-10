package bpmjs;

class TestInject extends TestCase2
{
	public function testInject()
	{
		var context = ContextBuilder.build(TestConfig);

		var a : A = context.getObjectByName("a");
		assertTrue(Std.is(a.b, B));
	}

	public function testInjectContext()
	{
		var context = ContextBuilder.build(TestConfig);

		var a : A = context.getObjectByName("a");
		assertEquals(context, a.context);
	}

	public function testCircularInject()
	{
		var context = ContextBuilder.build(TestConfig);

		var a : A = context.getObjectByName("a");
		assertTrue(Std.is(a.b, B));

		var b : B = context.getObjectByName("b");
		assertTrue(Std.is(b.a, A));
	}
	
	public function testSuperInject()
	{
		var context = ContextBuilder.build(TestConfig);

		var c : C = context.getObjectByName("c");
		assertTrue(Std.is(c.a, A));
	}
}

private class TestConfig implements haxe.rtti.Infos
{
	public var a : A;
	public var b : B;
	public var c : C;

	public function new()
	{
		a = new A();
		b = new B();
		c = new C();
	}
}

private class A implements haxe.rtti.Infos
{
	@Inject
	public var b : B;

	@Inject
	public var context : Context;

	public function new()
	{
	}
}

private class B implements haxe.rtti.Infos
{

	@Inject
	public var a : A;

	public function new()
	{
	}
}

private class C extends B, implements haxe.rtti.Infos
{

}
