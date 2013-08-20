package kumite.eyes;

import kumite.time.Tick;
import kumite.scene.Scene;
import kumite.scene.Scenes;

import bpmjs.Messenger;

import haxe.rtti.Infos;
import kumite.scene.SceneChangeRequest;

import haxe.Timer;

class EyesDisplay implements Infos
{
	public function new() {}
	
	@Sequence("boot", "startComplete")	
	public function start()
	{
		var stage = GLDisplayList.getDefault().stage;
 			
		var blend1 = new GLDisplayObject();
		blend1.x = 1785;
        blend1.y = 885;
		blend1.width = 500;
        blend1.height = 12;
        blend1.graphic.clear(new Color(1, 1, 1, 0.8));
		stage.addChild(blend1);
        
		var blend1 = new GLDisplayObject();
		blend1.x = 1785 + 58;
        blend1.y = 820 + 5;
		blend1.width = 10;
        blend1.height = 50;
        blend1.graphic.clear(new Color(1, 1, 1, 0.8));
		stage.addChild(blend1);
        
		var blend2 = new GLDisplayObject();
		blend2.x = 935;
        blend2.y = 877;
		blend2.width = 25;
        blend2.height = 50;
        blend2.graphic.clear(new Color(1, 1, 1, 0.8));
		stage.addChild(blend2);
	}
}