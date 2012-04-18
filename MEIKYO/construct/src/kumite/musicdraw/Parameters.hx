package kumite.musicdraw;

class Parameters
{
	public var params:Array<Parameter<Dynamic>>;
	
	public function new()
	{
		params = new Array();	
	}
	
	public function addFloatParam(name:String, value:Float, min:Float, max:Float)
	{
		var param = new ParameterFloat();
		param.value = value;
		param.name = name;
		param.min = min;
		param.max = max;
		
		params.push(param);
	}
}
