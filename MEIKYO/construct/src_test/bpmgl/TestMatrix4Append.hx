package bpmgl;

class TestMatrix4Append extends Matrix4TestCase
{
	var testMatrix : Matrix4;
	
	override function setup()
	{
		testMatrix = new Matrix4();
		testMatrix.set(
			2, 3, 4, 5,
			6, 7, 8, 9,
			10, 11, 12, 13,
			14, 15, 16, 17
		);
	}

	public function testAppend()
	{
		var m1 = new Matrix4();
		m1.set(
			2, 3, 4, 5,
			6, 7, 8, 9,
			10, 11, 12, 13,
			14, 15, 16 ,17
		);
			
		var m2 = new Matrix4();
		m2.set(
			18, 19, 20, 21,
			22, 23, 24, 25,
			26, 27, 28, 29,
			30, 31, 32, 33
		);
		m1.append(m2);
		assertEquals("[Matrix4:  | 356,370,384,398 | 740,770,800,830 | 1124,1170,1216,1262 | 1508,1570,1632,1694 | ]", m1.toString());
	}

	public function testAppendTranslation()
	{
		testMatrix.appendTranslation(2, 3, 4);
		assertEquals("[Matrix4:  | 2,3,4,34 | 6,7,8,74 | 10,11,12,114 | 14,15,16,154 | ]", testMatrix.toString());
	}
	
	public function testAppendScale()
	{
		testMatrix.appendScale(2, 3, 4);
		assertEquals("[Matrix4:  | 4,9,16,5 | 12,21,32,9 | 20,33,48,13 | 28,45,64,17 | ]", testMatrix.toString());
	}

}