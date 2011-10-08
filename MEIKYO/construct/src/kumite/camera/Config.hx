package kumite.camera;
import haxe.rtti.Infos;

class Config implements Infos
{
	public var camera : Camera;
	public var cameraMouseMover : CameraMouseMover;
	
	public function new()
	{
		camera = new Camera();
		cameraMouseMover = new CameraMouseMover();
	}
}
