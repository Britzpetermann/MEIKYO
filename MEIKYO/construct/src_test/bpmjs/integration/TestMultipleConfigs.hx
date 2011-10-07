package bpmjs.integration;

import TestRunner;

class TestMultipleConfigs extends SummerTestCase
{
	public function testGetObject()
	{
		var context = ContextBuilder.buildAll([TestConfigWithA, TestConfigWithB]);
		var a = context.getObjectByName("a");
		assertNotNull(a);
		var b = context.getObjectByName("b");
		assertNotNull(b);
	}
}

private class TestConfigWithA implements haxe.rtti.Infos
{
	public var a : A;

	public function new()
	{
		a = new A();
	}
}

private class TestConfigWithB implements haxe.rtti.Infos
{
	public var b : B;

	public function new()
	{
		b = new B();
	}
}

private class A implements haxe.rtti.Infos
{
	public function new()
	{
	}
}

private class B implements haxe.rtti.Infos
{
	public function new()
	{
	}
}
