package kumite.testscene;

import haxe.rtti.Infos;

class TestTextureLoader implements Infos
{
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Inject
	public var imageRegistry : GLImageRegistry;
	
	public function new();
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		group.add(new GLTextureLoadingTask(textureRegistry, imageRegistry, TestTextures.TEST1));
		group.add(new GLTextureLoadingTask(textureRegistry, imageRegistry, TestTextures.TEST2));
		
		return group;
	}
}
