package reflect;

import haxe.rtti.CType;

typedef ParamDef = 
{
	var name : String;
	var opt : Bool;
	var t : CType;
}

class Parameter
{
	public var type(getType, null) : ClassInfo;
	
	private var def : ParamDef;
	
	public function new(def : ParamDef)
	{
		this.def = def;
	}
	
	inline function getType() : ClassInfo
	{
		return ClassInfo.forCType(def.t);
	}
}
