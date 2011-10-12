package bpmgl;

class TestMatrix4Basics extends Matrix4TestCase
{
	public function testNOrder()
	{
		var m = new Matrix4();
		m.n11 = 1;
		m.n12 = 2;
		m.n13 = 3;
		m.n14 = 4;
		m.n21 = 5;
		m.n22 = 6;
		m.n23 = 7;
		m.n24 = 8;
		m.n31 = 9;
		m.n32 = 10;
		m.n33 = 11;
		m.n34 = 12;
		m.n41 = 13;
		m.n42 = 14;
		m.n43 = 15;
		m.n44 = 16;
		matrixEquals("1,2,3,4 | 5,6,7,8 | 9,10,11,12 | 13,14,15,16", m);
	}
	
	public function testBufferOrder()
	{
		var m = new Matrix4();
		m.n11 = 1;
		m.n12 = 2;
		m.n13 = 3;
		m.n14 = 4;
		m.n21 = 5;
		m.n22 = 6;
		m.n23 = 7;
		m.n24 = 8;
		m.n31 = 9;
		m.n32 = 10;
		m.n33 = 11;
		m.n34 = 12;
		m.n41 = 13;
		m.n42 = 14;
		m.n43 = 15;
		m.n44 = 16;
		assertEquals(1.0, m.buffer[0]);
		assertEquals(2.0, m.buffer[4]);
		assertEquals(3.0, m.buffer[8]);
		assertEquals(4.0, m.buffer[12]);
		assertEquals(5.0, m.buffer[1]);
		assertEquals(6.0, m.buffer[5]);
		assertEquals(7.0, m.buffer[9]);
		assertEquals(8.0, m.buffer[13]);
		assertEquals(9.0, m.buffer[2]);
		assertEquals(10.0, m.buffer[6]);
		assertEquals(11.0, m.buffer[10]);
		assertEquals(12.0, m.buffer[14]);
		assertEquals(13.0, m.buffer[3]);
		assertEquals(14.0, m.buffer[7]);
		assertEquals(15.0, m.buffer[11]);
		assertEquals(16.0, m.buffer[15]);
	}
	
	public function testIsIdentityAtConstruct()
	{
		var m = new Matrix4();
		matrixEquals("1,0,0,0 | 0,1,0,0 | 0,0,1,0 | 0,0,0,1", m);
	}
	
	public function testSet()
	{
		var m = new Matrix4();
		m = m.set(
			1, 2, 3, 4,
			5, 6, 7, 8,
			9, 10, 11, 12,
			13, 14, 15, 16
		);
		matrixEquals("1,2,3,4 | 5,6,7,8 | 9,10,11,12 | 13,14,15,16", m);
	}
}