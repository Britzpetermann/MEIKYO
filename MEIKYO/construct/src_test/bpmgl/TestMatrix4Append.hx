package bpmgl;

class TestMatrix4Append extends Matrix4TestCase
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

	public function testAppend()
	{		
		var m2 = new Matrix4();
		m2.set(
			18, 19, 20, 21,
			22, 23, 24, 25,
			26, 27, 28, 29,
			30, 31, 32, 33
		);
		m.append(m2);
		matrixEquals("644,722,800,878 | 772,866,960,1054 | 900,1010,1120,1230 | 1028,1154,1280,1406", m);
	}

	public function testAppendTranslation()
	{
		m.appendTranslation(2, 3, 4);
		matrixEquals("30,33,36,39 | 48,52,56,60 | 66,71,76,81 | 14,15,16,17", m);
	}
	
	public function testAppendScale()
	{
		m.appendScale(2, 3, 4);
		matrixEquals("4,6,8,10 | 18,21,24,27 | 40,44,48,52 | 14,15,16,17", m);
	}

}