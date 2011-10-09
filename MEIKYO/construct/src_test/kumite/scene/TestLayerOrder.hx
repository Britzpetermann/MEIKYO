package kumite.scene;

import TestRunner;

class TestLayerOrder extends SummerTestCase
{
	public function testNoChange()
	{
		assertOrder("a", "a", "a");
	}
	
	public function testSingleChange()
	{
		assertOrder("a", "b", "ab");
	}
	
	public function testMultiChange()
	{
		assertOrder("ab", "cd", "abcd");
	}
	
	public function testInsert()
	{
		assertOrder("ab", "ac", "abc");
	}
	
	public function testSwap()
	{
		assertOrder("ab", "ba", "ba");
	}
	
	public function testForceNewOrder()
	{
		assertOrder("ab", "ca", "cab");
	}
	
	public function testComplex1()
	{
		assertOrder("abc", "0a1b", "0a1bc");
	}
	
	public function testComplex2()
	{
		assertOrder("abc", "0a1", "0abc1");
	}
	
	public function testComplex3()
	{
		assertOrder("ab", "0xa1e", "0xab1e");
	}
	
	public function testComplex4()
	{
		assertOrder("abce", "afcdk", "abfcedk");
	}
	
	function assertOrder(fromIds : String, toIds : String, expectedIds : String)
	{
		//trace("\nassert: " + fromIds + " " + toIds + " " + expectedIds);

		var fromScene = createScene(fromIds);
		var toScene = createScene(toIds);
		
		var mixer = new SceneMixer();
		var result = mixer.mix(fromScene, toScene);
		assertEquals(expectedIds, createIds(result));
	}
	
	function createScene(ids : String)
	{
		var scene = new Scene();
		
		var idList = ids.split("");
		
		for (id in idList)
		{
			var layer = new Layer();
			layer.id = id;
			scene.addLayer(layer);
		}
		
		return scene;
	}
	
	function createIds(scene : Scene)
	{
		var result = "";
		
		for(layer in scene.layers)
			result += layer.id;
			
		return result;
	}
}