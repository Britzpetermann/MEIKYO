package bpmgl;

class Matrix4TestCase extends TestCase2
{
	function matrixEquals(?expected : Matrix4, ?description : String, m : Matrix4)
	{
		if (expected != null)
		{
			assertEquals(expected.toString(), m.toString());
		}
		else
		{
			assertEquals("[Matrix4:  | " + description + " | ]", m.toString());
		}
	}
}