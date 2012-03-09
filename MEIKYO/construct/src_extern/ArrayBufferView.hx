extern class ArrayBufferView implements ArrayAccess<Dynamic>
{
	public var buffer : ArrayBuffer;
	public var byteLength : Int;
	public var length : Int;
	
	public function set(buffer : ArrayBufferView, ?offset : Int) : Void;
}
