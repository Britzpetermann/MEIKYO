package kumite.lgl;

class LGLBuilder
{
	public var lgl:LGL;

	public var currentVertex:Vertex;

	var addedVertexes:Int;
	var reusedVertexes:Int;
	var maxWeightVertex:Vertex;
	var edgeCount:Int;

	var ipToVertex:Hash<Vertex>;

	public function new()
	{
		addedVertexes = 0;
		reusedVertexes = 0;
		edgeCount = 0;
		ipToVertex = new Hash();
	}

	public function addVertex(ip:String)
	{
		currentVertex = findOrCreateVertex(ip);

		if (maxWeightVertex == null)
			maxWeightVertex = currentVertex;
	}

	public function addChild(ip:String)
	{
		var vertex = findOrCreateVertex(ip);

		var edge = new Edge();
		edge.v1Index = vertex.index;
		edge.v2Index = currentVertex.index;
		lgl.edges.push(edge);
		
		lgl.vertexes[edge.v1Index].weight++;
		lgl.vertexes[edge.v2Index].weight++;

		edgeCount++;

		if (currentVertex.weight > maxWeightVertex.weight)
			maxWeightVertex = currentVertex;

		if (vertex.weight > maxWeightVertex.weight)
			maxWeightVertex = vertex;
	}

	public function findOrCreateVertex(ip)
	{
		var existingVertex = ipToVertex.get(ip);
		if (existingVertex != null)
		{
			reusedVertexes++;

			return existingVertex;
		}
		else
		{
			addedVertexes++;

			var vertex = new Vertex();
			vertex.index = lgl.vertexes.length;

			lgl.vertexes.push(vertex);
			ipToVertex.set(ip, vertex);

			return vertex;
		}
	}

	public function precalculate()
	{
		Log.info("addedVertexes: " + addedVertexes);
		Log.info("reusedVertexes: " + reusedVertexes);
		Log.info("maxWeightVertex: " + maxWeightVertex);
		Log.info("edgeCount: " + edgeCount);
	}
}
