package kumite.presentation;

import haxe.rtti.Infos;

class PresentationConfig implements Infos
{
	var presentation:Presentation;
	var slideNavigator:SlideNavigator;
	
	public function new()
	{
		presentation = new Presentation();

		presentation.slides.push(new ContainerSlide()
			.addSlide(new SpriteSlide("data/presentation/Screens/1.Britzpetermann/1Britzpetermann.jpg"))
			.addSlide(new SpriteSlide("data/presentation/Screens/1.Britzpetermann/2BritzpetermannAlle.gif"))
			.addSlide(new SpriteSlide("data/presentation/Screens/1.Britzpetermann/5Britzpetermann.jpg"))
		);

		presentation.slides.push(new ContainerSlide()
			.addSlide(new SpriteSlide("data/presentation/IMG_4294.jpg"))
			.addSlide(new SpriteSlide("data/presentation/Screens/3.Akemi/3.5.AkemiPre.jpg")
				.addHitArea(30, 0, 500, 1100, "http://static.britzpetermann.com/presentation/content/preAkemi1/indexgl3.html")
				.addHitArea(590, 0, 500, 1100, "http://static.britzpetermann.com/presentation/content/preAkemi2/WobbleBars.html")
				.addHitArea(1140, 0, 500, 1100, "http://static.britzpetermann.com/presentation/content/preAkemi2/StrangeAttractor.html")
			)
			.addSlide(new SpriteSlide("data/presentation/Screens/3.Akemi/3.1.Akemi.jpg"))
			.addSlide(new SpriteSlide("data/presentation/Screens/3.Akemi/3.2.Akemi.jpg")
				.addHitArea(680, 655, 300, 100, "http://static.britzpetermann.com/experiments/akemi/")
			)
			.addSlide(new SpriteSlide("data/presentation/Screens/3.Akemi/3.6.WhatTheFuck.jpg"))
			.addSlide(new SpriteSlide("data/presentation/Screens/3.Akemi/3.3.AkemiHelsinki.jpg"))
		);
		
		presentation.slides.push(new ContainerSlide()
			.addSlide(new SpriteSlide("data/presentation/Screens/6.Fin.jpg"))
		);
		
		presentation.slides.push(new ContainerSlide()
			.addSlide(new SpriteSlide("data/presentation/Screens/2.Schau!/2.Schau.jpg"))
			.addSlide(new SpriteSlide("data/presentation/Screens/2.Schau!/2.1.Schau.jpg"))
			.addSlide(new SpriteSlide("data/presentation/Screens/2.Schau!/2.2.Schau.jpg"))
			.addSlide(new SpriteSlide("data/presentation/Screens/2.Schau!/2.3.Schau.jpg")
				.addHitArea(1000, 500, 250, 150, "http://player.vimeo.com/video/33186969?autoplay=true")
			)
			.addSlide(new SpriteSlide("data/presentation/Screens/2.Schau!/2.4.Schau.jpg"))
			.addSlide(new SpriteSlide("data/presentation/Screens/2.Schau!/2.5.Schau.jpg"))
			.addSlide(new SpriteSlide("data/presentation/Screens/2.Schau!/2.3.Schau.jpg")
				.addHitArea(1000, 500, 250, 150, "http://player.vimeo.com/video/33730560?autoplay=true")
			)
			.addSlide(new SpriteSlide("data/presentation/Screens/2.Schau!/2.6.Schau.jpg"))
			.addSlide(new SpriteSlide("data/presentation/Screens/2.Schau!/2.7.Schau.jpg"))
			.addSlide(new SpriteSlide("data/presentation/Screens/2.Schau!/2.3.Schau.jpg")
				.addHitArea(1000, 500, 250, 150, "http://player.vimeo.com/video/34946802?autoplay=true")
			)			
			.addSlide(new SpriteSlide("data/presentation/Screens/2.Schau!/RefSchau.jpg"))
			.addSlide(new SpriteSlide("data/presentation/Screens/2.Schau!/2.8.Schau.jpg")
				.addHitArea(450, 350, 770, 190, "http://www.flickr.com/photos/britzpetermann/sets/72157628678359221/")
				.addHitArea(450, 545, 770, 200, "http://vimeo.com/britzpetermann")
				)
		);
		
		presentation.slides.push(new ContainerSlide()
			.addSlide(new SpriteSlide("data/presentation/Screens/5.OpenRound/Resume.png"))
			.addSlide(new SpriteSlide("data/presentation/Screens/5.OpenRound/Persil.jpg")
				.addHitArea(900, 650, 300, 150, "https://github.com/Persil")
				.addHitArea(1250, 650, 300, 150, "http://static.britzpetermann.com/presentation/content/persil/")
			)
		);
		
		presentation.slides.push(new ContainerSlide()
			.addSlide(new SpriteSlide("data/presentation/Screens/6.Fin.jpg"))
		);

		slideNavigator = new SlideNavigator();
	}
}
