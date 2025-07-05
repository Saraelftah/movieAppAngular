import { Component, Signal, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { RecommService } from '../../service/recomm-service'
import { Movie } from '../../interfaces/movie';
import { Tvshow } from '../../interfaces/tvshow';
import { PercentagePipe } from '../../pipes/percentage-pipe'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recommendation',
  imports: [CarouselModule, Carousel, ButtonModule, Tag, PercentagePipe, CommonModule, RouterModule],
  templateUrl: './recommendation.html',
  styleUrl: './recommendation.scss'
})
export class Recommendation {

 recommendations: Signal<(Movie | Tvshow)[]>;
  responsiveOptions: any[] | undefined;

  constructor(private recommService: RecommService) { 
    this.recommendations = this.recommService.recommendation;
  }

  ngOnInit(): void {

    this.responsiveOptions = [

      {breakpoint: '1600px',numVisible: 6,numScroll: 1},
      {breakpoint: '1400px',numVisible: 5,numScroll: 1},
      {breakpoint: '1199px',numVisible: 3,numScroll: 1},
      {breakpoint: '767px',numVisible: 2,numScroll: 1},
      {breakpoint: '575px',numVisible: 1,numScroll: 1}
    ]
  }

  // put voting as percentage in a circle
  getRatingGradient(vote: number): string {
    const percent = Math.round(vote * 10); 
    const color = percent > 70 ? '#22c55e' : percent > 40 ? '#eab308' : '#ef4444';

    return `conic-gradient(${color} ${percent}%, #e5e7eb ${percent}%)`;
  }
 
}
