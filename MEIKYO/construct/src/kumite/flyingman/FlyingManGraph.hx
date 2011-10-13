package kumite.flyingman;

import kumite.time.Time;
import kumite.time.Tick;

import haxe.rtti.Infos;

class FlyingManGraph implements Infos
{
	public static var MAN1 : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/man1.png", GL.LINEAR_MIPMAP_NEAREST);
	public static var MAN2 : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/man2.png", GL.LINEAR_MIPMAP_NEAREST);
	public static var MAN3 : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/man3.png", GL.LINEAR_MIPMAP_NEAREST);
	public static var FLOWER1 : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/flower1.png", GL.LINEAR_MIPMAP_NEAREST);
	public static var FLOWER2 : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/flower2.png", GL.LINEAR_MIPMAP_NEAREST);
	public static var BUTTERFLY : GLTextureConfig = GLTextureConfig.create("data/image/flyingman/butterfly.png", GL.LINEAR_MIPMAP_NEAREST);
	
	@Inject
	public var textureRegistry : GLTextureRegistry;
	
	@Inject
	public var time : Time;
	
	public var sprites : Array<Sprite>;
	
	public var butterfly : Sprite;
	
	public var butterflyCloseupCamera : ButterflyCloseupCamera;
	public var butterflyCloseupCamera2 : ButterflyCloseupCamera2;
	public var butterflyLife : ButterflyLife;
	
	var firstUpdate : Bool;
	var updatedThisFrame : Bool;
	
	public function new()
	{
		firstUpdate = true;
		updatedThisFrame = false;
	}
	
	@Sequence("boot", "startPrepare")
	public function startPrepare()
	{
		var group = new bpmjs.SequencerTaskGroup();
		
		group.add(new GLTextureLoadingTask(textureRegistry, MAN1));
		group.add(new GLTextureLoadingTask(textureRegistry, MAN2));
		group.add(new GLTextureLoadingTask(textureRegistry, MAN3));
		group.add(new GLTextureLoadingTask(textureRegistry, FLOWER1));
		group.add(new GLTextureLoadingTask(textureRegistry, FLOWER2));
		group.add(new GLTextureLoadingTask(textureRegistry, BUTTERFLY));
		
		return group;
	}
		
	@Sequence("boot", "start")
	public function start()
	{
		sprites = new Array();
		
		for(i in 0...1000)
		{
			var sprite = new Sprite();
			sprite.position.x = Rand.float(-100, 100);
			sprite.position.y = 0;
			sprite.position.z = Rand.float(-100, 100);
			sprite.texture = textureRegistry.get(MAN1);
			sprites.push(sprite);
		}
		
		butterfly = new Sprite();
		butterfly.position.x = 0;
		butterfly.position.y = 3;
		butterfly.position.z = 0;
		butterfly.texture = textureRegistry.get(BUTTERFLY);
		
		butterflyLife = new ButterflyLife();
		butterflyLife.time = time;
		butterflyLife.sprite = butterfly;
		
		butterflyCloseupCamera = new ButterflyCloseupCamera();
		butterflyCloseupCamera.butterfly = butterflyLife;
		butterflyCloseupCamera.sprite = butterfly;
		butterflyCloseupCamera.time = time;
		
		butterflyCloseupCamera2 = new ButterflyCloseupCamera2();
		butterflyCloseupCamera2.butterfly = butterflyLife;
		butterflyCloseupCamera2.sprite = butterfly;
		butterflyCloseupCamera2.time = time;
		
		sprites.push(butterfly);
	}
	
	@Message
	public function tick(tick : Tick)
	{
		updatedThisFrame = false;
	}
	
	public function update()
	{
		if (!updatedThisFrame)
		{
			updatedThisFrame = true;
			updateInternal();
		}
	}
	
	function updateInternal()
	{
		if (firstUpdate)
		{
			butterflyLife.init();
			butterflyCloseupCamera.init();
			butterflyCloseupCamera2.init();
			firstUpdate = false;
		}
		butterflyLife.update();
		butterflyCloseupCamera.update();
		butterflyCloseupCamera2.update();
	}
}