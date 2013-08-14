package kumite.fusion;

typedef Clipping  = 
{
	type: String,
	xMin: Int,
	xMax: Int,
	yMin: Int,
	yMax: Int,
	zMin: Int,
	zMax: Int
}

typedef Clippings  = 
{ >ArrayAccess<Clipping>,
}

typedef HeightMapConfig = 
{
	enabled : Bool,
	minPointsPerCell: Int,
	smoothing: Float,					
	width: Int,
	depth: Int,
}

typedef PointCloudConfig = 
{
	enabled : Bool,
}

typedef BlobConfig = 
{
	enabled : Bool,
	minPointsPerCell: Int,
	smoothing: Float,					
	width: Int,
	depth: Int,
}

typedef FusionConfig = 
{
	name : String,
	clipping : Array<Clipping>,
	
	?pointCloud : PointCloudConfig,
	?heightMap : HeightMapConfig,
	?blobs : BlobConfig
}
