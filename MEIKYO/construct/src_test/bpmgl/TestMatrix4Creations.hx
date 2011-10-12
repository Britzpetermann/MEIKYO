package bpmgl;

class TestMatrix4Creations extends Matrix4TestCase
{
	var m : Matrix4;
	
	override function setup()
	{
		m = new Matrix4();
	}
	
	public function testSetTranslation()
	{
		m.setTranslation(2, 3, 4);
		matrixEquals("1,0,0,2 | 0,1,0,3 | 0,0,1,4 | 0,0,0,1", m);
	}
	
	public function testSetScale()
	{
		m.setScale(2, 3, 4);
		matrixEquals("2,0,0,0 | 0,3,0,0 | 0,0,4,0 | 0,0,0,1", m);
	}
	
	public function testSetRotationX()
	{
		m = m.setRotationX(Angle.degToRad(10));
		matrixEquals("1,0,0,0 | 0,0.9848077297210693,-0.1736481785774231,0 | 0,0.1736481785774231,0.9848077297210693,0 | 0,0,0,1", m);
	}
	
	public function testSetRotationY()
	{
		m = m.setRotationY(Angle.degToRad(10));
		matrixEquals("0.9848077297210693,0,0.1736481785774231,0 | 0,1,0,0 | -0.1736481785774231,0,0.9848077297210693,0 | 0,0,0,1", m);
	}
	
	public function testSetRotationZ()
	{
		m = m.setRotationZ(Angle.degToRad(10));
		matrixEquals("0.9848077297210693,-0.1736481785774231,0,0 | 0.1736481785774231,0.9848077297210693,0,0 | 0,0,1,0 | 0,0,0,1", m);
	}
	
	public function testSetRotation()
	{
		m = m.setRotation(Angle.degToRad(10), new Vec3(1, 1, 1).normalize());
		matrixEquals("0.9898718595504761,-0.09519173949956894,0.10531990230083466,0 | 0.10531990230083466,0.9898718595504761,-0.09519173949956894,0 | -0.09519173949956894,0.10531990230083466,0.9898718595504761,0 | 0,0,0,1", m);
	}
	
	public function testSetFrom()
	{
		var m1 = new Matrix4();
		m1.set(
			2, 3, 4, 5,
			6, 7, 8, 9,
			10, 11, 12, 13,
			14, 15, 16, 17
		);
		
		m = m.setFrom(m1);
		matrixEquals(m1, m);
	}
}