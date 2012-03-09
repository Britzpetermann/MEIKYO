package bpmjs;

class WorkingInstance
{
	public function new(receiver:Dynamic)
	{
		Reflect;
		untyped __js__("
			var transferMethod = null;

			onmessage = function(event)
			{
				if (transferMethod != null)
				{
					var buffer = event.data;
					Reflect.callMethod(receiver, transferMethod, [buffer]);
					transferMethod = null;
					
					if (buffer.byteLength == 0)
						throw 'Buffer length is zero!';
						
					webkitPostMessage(buffer, [buffer]);
					
					if (buffer.byteLength != 0)
						throw 'Buffer length is not zero!';
						
				}
				else
				{
					var methodName = event.data.method;
					
					if (methodName == '__prepareTransfer__')
					{
						var transferMethodName = event.data.args[0];
						transferMethod = Reflect.field(receiver, transferMethodName);
						if (transferMethod == null)
							throw 'Method ' + transferMethodName + ' is null!';
						webkitPostMessage({result:null});
					}
					else
					{
						var args = event.data.args;
						var method = Reflect.field(receiver, methodName);
						if (method == null)
							throw 'Method ' + methodName + ' is null!';
							
						var result = Reflect.callMethod(receiver, method, args);
						webkitPostMessage({result:result});
					}
				}
			}
		");		
	}
}
