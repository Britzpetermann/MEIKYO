package kumite.scene;

import reflect.ClassInfo;

class DelegateLayer extends Layer
{
	public var lifecycle : LayerLifecycle;
	public var params : Array<LayerParam>;
	
	public function new(lifecycle : LayerLifecycle, ?layerId : String = null)
	{
		super();
		
		this.lifecycle = lifecycle;
		this.layerId = layerId;
		
		createParams();
	}
	
	override public function init()
	{
		try
		{
			lifecycle.init();
		}
		catch(e : Dynamic)
		{
			Log.error("Error initializing layer:\n" + layerId, e);	
		}
	}
	
	override public function render(renderContext : RenderContext)
	{
		try
		{
			lifecycle.render(renderContext);
		}
		catch(e : Dynamic)
		{
			Log.error("Error rendering layer:\n" + layerId, e);	
		}
	}
	
	override public function renderTransition(transitionContext : TransitionContext)
	{
		try
		{
			lifecycle.renderTransition(transitionContext);
		}
		catch(e : Dynamic)
		{
			Log.error("Error rendering layer:\n" + layerId, e);	
		}
	}
	
	public function toString()
	{
		return "[DelegateLayer " + ClassInfo.forInstance(lifecycle).name + "]";
	}
	
	function createParams()
	{
		params = new Array();
		
		var ci = ClassInfo.forInstance(lifecycle); 
		
		for(property in ci.properties)
		{
			if (property.hasMetadata("Param"))
			{
				var param = new LayerParam();
				param.property = property;
				param.object = lifecycle;
				params.push(param);
			}
		}		
	}
	
}
