package kumite.testscene;

import haxe.rtti.Infos;

class TestTextureLoader implements Infos
{
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	public function new();
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		group.add(new GLTextureLoadingTask(textureRegistry, TestTextures.TEST1));
		group.add(new GLTextureLoadingTask(textureRegistry, TestTextures.TEST2));
		
		return group;
	}
}
