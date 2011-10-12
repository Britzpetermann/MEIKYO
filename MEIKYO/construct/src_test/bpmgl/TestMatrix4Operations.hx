package bpmgl;

class TestMatrix4Operations extends Matrix4TestCase
{
	var m : Matrix4;
	
	override function setup()
	{
		m = new Matrix4();
		m.set(
			2, 3, 4, 5,
			6, 7, 8, 9,
			10, 11, 12, 13,
			14, 15, 16, 17
		);
	}
	
	public function testIdentity()
	{
		m = m.setIdentity();
		matrixEquals("1,0,0,0 | 0,1,0,0 | 0,0,1,0 | 0,0,0,1", m);
	}
}