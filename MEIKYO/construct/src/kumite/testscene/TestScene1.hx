package kumite.testscene;

import kumite.scene.SceneLifecycle;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;
import haxe.rtti.Infos;

class TestScene1 implements SceneLifecycle, implements Infos
{
	@Inject
	public var testLayer1 : TestLayer1;
	
	public function new() {}
	
	public function sceneInit(scene : Scene)
	{
		scene.name = "TEST 1";
		scene.addLayer(new DelegateLayer(testLayer1));
	}
}
