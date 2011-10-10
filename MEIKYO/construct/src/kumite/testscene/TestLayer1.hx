package kumite.testscene;

import kumite.scene.LayerLifecycle;
import kumite.scene.Layer;
import kumite.stage.Stage;
import kumite.time.Time;
import kumite.projection.Projection;
import kumite.camera.Camera;

import haxe.rtti.Infos;

class TestLayer1 extends TestLayer
{
	public function new()
	{
		super();
		color = new Color(1, 0, 0, 0.8);
		scale = 2;
		position = new Vec3(1, 0, 2);
	}
}