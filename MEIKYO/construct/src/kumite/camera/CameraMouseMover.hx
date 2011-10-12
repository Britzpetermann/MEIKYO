package kumite.camera;
import haxe.rtti.Infos;

class CameraMouseMover implements Infos
{
	@Inject
	public var camera : Camera;
	
	public function new();
	
	@Sequence("boot", "init")
	public function init()
	{
		camera.matrix = new Matrix4();
		updateCamera();
	}
	
	private function updateCamera()
	{
		camera.matrix.setIdentity();
		camera.matrix.setLookAt(new Vec3(0, 0, 10), new Vec3(0, 0, 0), new Vec3(0, 1, 0));
	}
}
