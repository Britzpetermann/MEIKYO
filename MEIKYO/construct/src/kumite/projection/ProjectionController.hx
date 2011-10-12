package kumite.projection;

import kumite.stage.Stage;
import kumite.stage.StageResizeMessage;

import haxe.rtti.Infos;

class ProjectionController implements Infos
{
	@Inject
	public var projection : Projection;
	
	@Inject
	public var stage : Stage;
	
	public var fov : Float;
	public var near : Float;
	public var far : Float;
	
	public function new();
	
	@Sequence("boot", "init")
	public function init()
	{
		projection.matrix = new Matrix4();
		updateProjectionSizeFromStage();
	}
	
	@Message
	public function updateProjectionSizeFromStage(?message : StageResizeMessage)
	{
		projection.matrix.setPerspective(fov, stage.aspect, near, far);
	}	
}
