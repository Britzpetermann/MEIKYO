//BOKBUNJAJOO
package kumite.lgl;

import kumite.time.Time;
import kumite.time.Tick;
import haxe.rtti.Infos;

class LGLLayout implements Infos
{
	@Inject
	public var lgl:LGL;
	
	public var setMessage:String->Dynamic->Void;

	var visible:Float;
	var totalEngergy:Float;
	var highestEnergyVertex:Vertex;

	public function new()
	{
		visible = 1000;
		totalEngergy = 10000;
	}

	@Sequence("boot", "start")
	public function start()
	{
		var index = 0;
		for(vertex in lgl.vertexes)
		{
			vertex.positionX = Math.sin(index * 0.01 + Math.PI * 0.5);
			vertex.positionY = Math.sin(index * 0.022 + Math.PI * 0.7);
			vertex.positionZ = Math.sin(index * 0.033 + Math.PI * 1.9);
			index++;
		}
		highestEnergyVertex = lgl.vertexes[0];
	}

	@Message
	public function render(?tick : Tick)
	{
		if (totalEngergy < 0.0000002 && totalEngergy != 0)
			return;

		doLayout();

		setMessage("Energy", totalEngergy);
	}

	function doLayout()
	{
		var vertexes = lgl.vertexes;

		totalEngergy = 0.0;
		
		bounce();
		edges();
		apply();
	}

	function bounce()
	{
		var vertexes = lgl.vertexes;
		
		var r = Math.sin(Date.now().getTime() / (4000 + 1000 * Math.cos(Date.now().getTime() / 1000))) * 0.05;
		if (Math.random() < r)
		{
			var rnd = highestEnergyVertex;
			var r = 3;
			rnd.positionX += Rand.float(-r, r);
			rnd.positionY += Rand.float(-r, r);
			rnd.positionZ += Rand.float(-r, r);
			
			rnd.positionX = Clamp.float(rnd.positionX, -5, 5);
			rnd.positionY = Clamp.float(rnd.positionY, -5, 5);
			rnd.positionZ = Clamp.float(rnd.positionZ, -5, 5);
		}
		
		if (Math.random() < r)
		{
			var rnd = vertexes[Std.int(Math.random() * vertexes.length)];
			var r = 5;
			rnd.positionX = Rand.float(-r, r);
			rnd.positionY = Rand.float(-r, r);
			rnd.positionZ = Rand.float(-r, r);
		}
		
		var maxDist = 5;
		var maxDistSquared = maxDist * maxDist;
		var f = 0.0001;
		var start = Date.now().getTime();
		var totalComparisons = vertexes.length * vertexes.length / 2;
		var currentComparisons = 0;
		var lastComparisons = 0;
		for(i in 0 ... vertexes.length - 1)
		{
			if (i % 5 == 0)
			{
				var now = Date.now().getTime();
				if (now - start > 1000)
				{
					setMessage("Progress", currentComparisons / totalComparisons);
					setMessage("Compares/s", (currentComparisons - lastComparisons) * (1000 / (now - start)));
					lastComparisons = currentComparisons;
					start = now;
				}
			}
			var vi = vertexes[i];
			
			for (j in i + 1 ...vertexes.length)
			{
				currentComparisons++;
				
				var vj = vertexes[j];
				
				var dx = vi.positionX - vj.positionX;
				var dy = vi.positionY - vj.positionY;
				var dz = vi.positionZ - vj.positionZ;
				
				var distSquared = dx * dx + dy * dy + dz * dz;
				
				if (distSquared < maxDistSquared)
				{
					var dist = sqrt(distSquared);
					
					var invDist = Clamp.float(maxDist - dist, 0, maxDist);
					var f2 = (vi.weight + vj.weight) * 0.001; 
					invDist *= f + f2;
					
					dx *= invDist;
					dy *= invDist;
					dz *= invDist;
					
					vi.forceX += dx;
					vi.forceY += dy;
					vi.forceZ += dz;
					
					vj.forceX -= dx;
					vj.forceY -= dy;
					vj.forceZ -= dz;
				}
			}
		}
		
		var now = Date.now().getTime();
		setMessage("Progress", 1);
		setMessage("Compares/s", (currentComparisons - lastComparisons) * (1000 / (now - start)));
	}
	
	function edges()
	{
		var d = 100;
		var f = 0.001;
		for (edge in lgl.edges)
		{
			var v1 = lgl.vertexes[edge.v1Index];
			var v2 = lgl.vertexes[edge.v2Index];
			var dx = v2.positionX - v1.positionX;
			var dy = v2.positionY - v1.positionY;
			var dz = v2.positionZ - v1.positionZ;

			var dist = sqrt(dx * dx + dy * dy + dz * dz);
			dist = Clamp.float(dist, 0, d);
			
			var f2 = Math.abs(100 - (v1.weight + v2.weight)) * 0.0001; 
			
			dist *= f + f2;

			dx *= dist;
			dy *= dist;
			dz *= dist;

			v1.forceX += dx;
			v1.forceY += dy;
			v1.forceZ += dz;
			
			v2.forceX -= dx;
			v2.forceY -= dy;
			v2.forceZ -= dz;
		}
	}
	
	function apply()
	{
		var damping = 0.90;
		var maxSpeed = 0.4;
		var maxSpeedSquared = maxSpeed * maxSpeed;
		highestEnergyVertex = lgl.vertexes[0];
		for(v1 in lgl.vertexes)
		{
			v1.velocityX = (v1.velocityX + v1.forceX) * damping;
			v1.velocityY = (v1.velocityY + v1.forceY) * damping;
			v1.velocityZ = (v1.velocityZ + v1.forceZ) * damping;
			
			v1.forceX = 0;
			v1.forceY = 0;
			v1.forceZ = 0;

			v1.energy = v1.velocityX * v1.velocityX + v1.velocityY * v1.velocityY + v1.velocityZ * v1.velocityZ;
			totalEngergy += v1.energy;
			
			if (v1.energy > highestEnergyVertex.energy)
				highestEnergyVertex = v1;
			
			if (v1.energy > maxSpeedSquared)
			{
				var speed = Math.sqrt(v1.energy);
				v1.velocityX /= speed;
				v1.velocityY /= speed;
				v1.velocityZ /= speed;
				v1.velocityX *= maxSpeed;
				v1.velocityY *= maxSpeed;
				v1.velocityZ *= maxSpeed;
			}
			v1.positionX += v1.velocityX;
			v1.positionY += v1.velocityY;
			v1.positionZ += v1.velocityZ;
		}
	}

	inline function sqrt(v)
	{
		if (v < 0.00001)
			v = 0.00001;
		return (v);
	}
}