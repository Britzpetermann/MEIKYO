extern class ArrayBufferView implements ArrayAccess<Dynamic>
{
	public var buffer : ArrayBuffer;
	public var byteLength : Float;
	
	public function set(buffer : ArrayBufferView, ?offset : Int) : Void;
}
