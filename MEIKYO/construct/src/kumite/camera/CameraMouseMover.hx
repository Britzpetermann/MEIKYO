package kumite.camera;
import haxe.rtti.Infos;

class CameraMouseMover implements Infos
{
	@Inject
	public var camera : Camera;
	
	public function new() {}
	
	@Sequence("boot", "init")
	public function init()
	{
		camera.matrix = new Matrix4();
		updateCamera();
	}
	
	private function updateCamera()
	{
		camera.matrix.identity();
		camera.matrix.lookAt(new Vec3(0, 0, 40), new Vec3(0, 3, 0), new Vec3(0, 1, 0));
		camera.matrix.appendScale(1, 1, -1);
	}
}
