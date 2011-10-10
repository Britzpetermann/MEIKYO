package reflect;

import haxe.rtti.CType;
import haxe.rtti.Meta;

class Field implements MetadataAware
{
	public var owner(getOwner, null) : ClassInfo;
	public var name(getName, null) : String;
	public var type(getType, null) : ClassInfo;
	
	private var field : ClassField;
	private var definedInClass : String;
	
	public function new(field : ClassField, definedInClass : String, owner : ClassInfo)
	{
		this.field = field;
		this.definedInClass = definedInClass;
		this.owner = owner;
	}
	
	public function hasMetadata(name : String) : Bool
	{
		var declaredType = ClassInfo.forName(definedInClass);
		var metadatas = Meta.getFields(declaredType.type);
		
		for(fieldName in Reflect.fields(metadatas))
		{
			if (fieldName == this.name)
			{
				var meta = Reflect.field(metadatas, fieldName);
				if (Reflect.hasField(meta, name))
					return true;
			}
		}
				
		return false;
	}
	
	function getOwner() : ClassInfo
	{
		return owner;
	}
	
	function getName() : String
	{
		return field.name;
	}
	
	function getType() : ClassInfo
	{
		switch (field.type)
		{
			case CClass(name, params):
				return ClassInfo.forName(name);
			default:
				throw "Did not expect othe type than Class!";
		}
		
		return null;
	}
}
