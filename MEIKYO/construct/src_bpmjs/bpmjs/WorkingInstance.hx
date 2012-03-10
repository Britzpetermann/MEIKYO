package bpmjs;

class WorkingInstance
{
	public static var postMessage:Dynamic;
	
	public function new(receiver:Dynamic)
	{
		Reflect;
		initConsole();
		
		var instance = this;
		untyped __js__("
			var transferMethod = null;

			onmessage = function(event)
			{
				bpmjs.WorkingInstance.postMessage = function(data)
				{
					postMessage(data)
				}
				
				if (transferMethod != null)
				{
					var buffer = event.data;
					var resultBuffer = Reflect.callMethod(receiver, transferMethod, [buffer]);
					if (resultBuffer == null)
						resultBuffer = buffer;
					transferMethod = null;
					
					if (resultBuffer.byteLength == 0)
						throw 'WorkingInstance: Buffer length is zero!';
						
					webkitPostMessage(resultBuffer, [resultBuffer]);
					
					if (resultBuffer.byteLength != 0)
						throw 'WorkingInstance: Buffer length is not zero!';
						
				}
				else
				{
					var methodName = event.data.method;
					
					if (methodName == '__prepareTransfer__')
					{
						var transferMethodName = event.data.args[0];
						transferMethod = Reflect.field(receiver, transferMethodName);
						if (transferMethod == null)
							throw 'WorkingInstance: Method ' + transferMethodName + ' is null!';
						webkitPostMessage({result:null});
					}
					else
					{
						var args = event.data.args;
						var method = Reflect.field(receiver, methodName);
						if (method == null)
							throw 'WorkingInstance: Method ' + methodName + ' is null!';
							
						var result = Reflect.callMethod(receiver, method, args);
						webkitPostMessage({result:result});
					}
				}
			}
		");		
	}
	
	public static function pipeMethod(methodName:String, args:Array<Dynamic>)
	{
		postMessage({type:"pipeMethod", method:methodName, args:args});
	}
	
	function initConsole()
	{
		untyped
		{
			console = {};
			
			console.info = function(message:Dynamic)
			{
				pipeMethod("Log.info", [message]);
			};
			
			console.warn = function(message:Dynamic)
			{
				pipeMethod("Log.warn", [message]);
			};
			
			console.error = function(message:Dynamic)
			{
				pipeMethod("Log.error", [message]);
			};
			
			console.log = function(message:Dynamic)
			{
				pipeMethod("Log.info", [message]);
			};
		}		
	}
}
