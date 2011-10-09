package kumite.testscene;

import kumite.scene.SceneLifecycle;
import kumite.scene.Scene;
import kumite.scene.DelegateLayer;

class TestScene1 implements SceneLifecycle
{
	@Inject
	public var testLayer1 : TestLayer1;
	
	public function new() {}
	
	public function sceneInit(scene : Scene)
	{
		scene.addLayer(new DelegateLayer(testLayer1));
	}
}
