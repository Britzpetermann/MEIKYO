package reflect;

import haxe.rtti.CType;
import reflect.Parameter;

class Method extends Field
{
	public var parameters(getParameters, null) : Array<Parameter>;
	
	private var args : List<ParamDef>;
	private var ret : CType;
	
	public function new(field : ClassField, args : List<ParamDef>, ret : CType, definedInClass : String, owner : ClassInfo)
	{
		super(field, definedInClass, owner);
		this.args = args;
		this.ret = ret;
	}
	
	function getParameters() : Array<Parameter>
	{
		if (parameters != null)
			return parameters;
		
		parameters = new Array<Parameter>();
		
		for(arg in args)
		{
			var parameter = new Parameter(arg);
			parameters.push(parameter);
		}
		return parameters;
	}
	
	public function call(instance : Dynamic, params : Array<Dynamic>)
	{
		Reflect.callMethod(instance, Reflect.field(instance, getName()), params);
	}
}