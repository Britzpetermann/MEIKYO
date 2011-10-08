package kumite.projection;

import haxe.rtti.Infos;

class Config implements Infos
{
	public var projection : Projection;
	public var projectionController : ProjectionController;
	
	public function new()
	{
		projection = new Projection();
		
		projectionController = new ProjectionController();
		projectionController.fov = 40;
		projectionController.near = 0.1;
		projectionController.far = 500;
		
	}
}
