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
			.addSlide(new ImageSlide("data/presentation/Screens/1.Britzpetermann/1Britzpetermann.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/1.Britzpetermann/2Britzpetermann.jpg"))
		);

		presentation.slides.push(new ContainerSlide()
			.addSlide(new ImageSlide("data/presentation/Screens/2.Schau!/2.1.Schau.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/2.Schau!/2.2.Schau.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/2.Schau!/2.3.Schau.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/2.Schau!/2.4.Schau.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/2.Schau!/2.5.Schau.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/2.Schau!/2.6.Schau.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/2.Schau!/2.7.Schau.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/2.Schau!/2.8.Schau.jpg")
				.addHitArea(450, 350, 770, 190, "http://www.flickr.com/photos/britzpetermann")
				.addHitArea(450, 545, 770, 200, "http://vimeo.com/britzpetermann")
				)
		);
		
		presentation.slides.push(new ContainerSlide()
			.addSlide(new ImageSlide("data/presentation/Screens/3.Akemi/3.1.Akemi.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/3.Akemi/3.2.Akemi.jpg")
				.addHitArea(680, 655, 300, 100, "http://static.britzpetermann.com/experiments/akemi/")
			)
			.addSlide(new ImageSlide("data/presentation/Screens/3.Akemi/3.3.AkemiHelsinki.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/3.Akemi/3.4.AkemiHelsinki.jpg"))
		);
		presentation.slides.push(new ContainerSlide()
			.addSlide(new ImageSlide("data/presentation/Screens/4.Karlo/4.1.Karlo.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/4.Karlo/4.2.Karlo.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/4.Karlo/4.3.Karlo.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/4.Karlo/4.4.Karlo.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/4.Karlo/4.5.Karlo.jpg"))
			.addSlide(new ImageSlide("data/presentation/Screens/4.Karlo/4.6.Karlo.jpg"))
		);
		presentation.slides.push(new ImageSlide("data/presentation/Screens/6.Fin.jpg"));
		/*
		*/
		slideNavigator = new SlideNavigator();
	}
}
