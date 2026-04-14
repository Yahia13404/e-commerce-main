import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent {
customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:1500,
    autoplayHoverPause:true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
  } 
}
