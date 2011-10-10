package bpmjs;

class TestError extends TestCase2
{

	public function testContextNotNull()
	{
		try
		{
			var context = ContextBuilder.build(TestConfigWithoutRTTI);
		}
		catch (error : String)
		{
			noFail();
			return;
		}

		fail("Expected Error");
	}
}

private class TestConfigWithoutRTTI
{
}
