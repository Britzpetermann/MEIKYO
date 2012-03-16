class RasterGraphic
{
	public var raster:Uint8Array;
	public var rasterWidth:Int;
	public var rasterHeight:Int;
	
	public var r:Int;
	public var g:Int;
	public var b:Int;
	public var a:Int;
	
	public var line:Int->Int->Int->Int->Void;
	
	public function new()
	{
		noSmooth();
	}
	
	public function smooth()
	{
		this.line = lineXiaolinWu;
	}
	
	public function noSmooth()
	{
		this.line = lineBresenham;
	}
	
	public function setColor(r, g, b, a)
	{
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}
	
	public function setPixel(x:Int, y:Int)
	{
		var index = (y * rasterWidth + x) * 4;
		raster[index + 0] = r;
		raster[index + 1] = g;
		raster[index + 2] = b;
		raster[index + 3] = a;
	}
	
	public function drawAlphaPixel(x:Int, y:Int, alpha:Float)
	{
		var index = (y * rasterWidth + x) * 4;
		raster[index + 0] = r;
		raster[index + 1] = g;
		raster[index + 2] = b;
		raster[index + 3] = a;
	}
	
	public function clear()
	{
		for(i in 0...raster.length)
			raster[i] = 0;
	}
	
	public function fillRect(x, y, width, height)
	{
		for(xi in x ... x + width)
			for(yi in y ... y + height)
				setPixel(xi, yi);
	}
	
	public function lineBresenham(x0:Int, y0:Int, x1:Int, y1:Int):Void
	{
		var x = x0;
		var y = y0;
		var dx = x1 - x0;
		var dy = y1 - y0;
		var xinc = ( dx > 0 ) ? 1 : -1;
		var yinc = ( dy > 0 ) ? 1 : -1;
		dx = dx < 0 ? -dx : dx;
		dy = dy < 0 ? -dy : dy;
		
		setPixel(x,y);
		
		if ( dx > dy )
		{
			var cumul = dx >> 1;
			var i = 1;
	  		while(i <= dx)
			{
				x += xinc;
				cumul += dy;
				if (cumul >= dx)
				{
		  			cumul -= dx;
		  			y += yinc;
				}
				setPixel(x,y);
				i++;
			}
		}
		else
		{
	  		var cumul = dy >> 1;
			var i = 1;
	  		while (i <= dy)
			{
				y += yinc;
				cumul += dx;
				if ( cumul >= dy )
				{
		  			cumul -= dy;
		  			x += xinc ;
				}
				setPixel(x,y);
				i++;
			}
		}		
	}
	
	function lineXiaolinWu(x1:Int, y1:Int, x2:Int, y2:Int)
	{
		var steep:Bool = 
			((y2 - y1) < 0 ? -(y2 - y1) : (y2 - y1) > (x2 - x1) ? -(x2 - x1) : (x2 - x1))
			<= 0 ? false : true;
		var swap:Int;
		
		if (steep)
		{
			swap=x1; x1=y1; y1=swap;
			swap=x2; x2=y2; y2=swap;
		}
		
		if (x1 > x2)
		{
			swap=x1; x1=x2; x2=swap;
			swap=y1; y1=y2; y2=swap;
		}

		var dx:Int = x2 - x1;
		var dy:Int = y2 - y1;
		
		var gradient:Float = dy / dx;

		var xend:Int = x1;
		var yend:Float = y1 + gradient * (xend - x1);
		var xgap:Float = 1-((x1 + 0.5) % 1);
		var xpx1:Int = xend;
		var ypx1:Int = Std.int(yend);
		var alpha:Float;
		
		alpha = ((yend) % 1) * xgap;

		var intery:Float = yend + gradient;

		xend = x2;
		yend = y2 + gradient * (xend - x2);
		xgap = (x2 + 0.5) % 1;
		
		var xpx2:Int = xend; 
		var ypx2:Int = Std.int(yend);
		
		alpha = (1-((yend)%1)) * xgap;
		
		if (steep)
			drawAlphaPixel(ypx2,xpx2,alpha);
		else drawAlphaPixel(xpx2, ypx2,alpha);
		
		alpha = ((yend)%1) * xgap;
		
		if (steep)
			drawAlphaPixel(ypx2 + 1,xpx2,alpha);
		else
			drawAlphaPixel(xpx2, ypx2 + 1,alpha);
		 
		var x:Int = xpx1;
		
		while (x++<xpx2)
		{
			alpha = 1-((intery)%1);
			
			if (steep)
				drawAlphaPixel(Std.int(intery),x,alpha);
			else
				drawAlphaPixel(x,Std.int(intery),alpha);
			
			alpha=intery%1;
			
			if (steep)
				drawAlphaPixel(Std.int(intery) + 1,x,alpha);
			else
				drawAlphaPixel(x,Std.int(intery) + 1,alpha);
			
			intery = intery + gradient;
		}		
	}
}
