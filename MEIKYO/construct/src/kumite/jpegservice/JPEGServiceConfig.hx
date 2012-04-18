package kumite.jpegservice;

import haxe.rtti.Infos;

class JPEGServiceConfig implements Infos
{	
	var service:JPEGService;
	
	public function new()
	{
		service = new JPEGService();
	}
}