import { Component, Signal, inject, effect, computed } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Tvshow } from '../../interfaces/tvshow';
import { TvshowsService } from '../../service/tvshows-service';
import { PercentagePipe } from '../../pipes/percentage-pipe'
import { Search } from '../search/search';
import { WatchlistService } from '../../service/watchlist-service';


@Component({
  selector: 'app-tvshows',
  imports: [CarouselModule, Carousel, ButtonModule, Tag, PercentagePipe, CommonModule, RouterModule, Search],
  templateUrl: './tvshows.html',
  styleUrl: './tvshows.scss'
})
export class Tvshows {

  wishlistService = inject(WatchlistService);

titles = computed(() => {
  const lang = this.tvshowsService.currentLanguage();

  const translations: Record<string, any> = {
     en: {
      airingToday: 'Airing Today',
      onTheAir: 'On The Air',
      topRated: 'Top Rated',
      popular: 'Popular'
    },
    ar: {
      airingToday: 'يعرض اليوم',
      onTheAir: 'يعرض حاليًا',
      topRated: 'الأعلى تقييماً',
      popular: 'الأكثر شهرة'
    },
    fr: {
      airingToday: 'Diffusé aujourd\'hui',
      onTheAir: 'À l\'antenne',
      topRated: 'Les mieux notés',
      popular: 'Populaire'
    },
    zh: {
      airingToday: '今天播出',
      onTheAir: '正在播出',
      topRated: '高评分',
      popular: '受欢迎'
    }
  };

  return translations[lang] ?? translations['en'];
});

  airingToday!: Signal<Tvshow[]>;
  onTheAir!: Signal<Tvshow[]>;
  topRated!: Signal<Tvshow[]>;
  popular!: Signal<Tvshow[]>;

  responsiveOptions: any[] | undefined;
  tvshowsService = inject (TvshowsService);

  constructor() {

      effect(() => {
      const lang = this.tvshowsService.currentLanguage();

      this.tvshowsService.loadSection('airing_today', this.tvshowsService['_airingToday']);
      this.tvshowsService.loadSection('top_rated', this.tvshowsService['_topRated']);
      this.tvshowsService.loadSection('on_the_air', this.tvshowsService['_onTheAir']);
      this.tvshowsService.loadSection('popular', this.tvshowsService['_popular']);
    });
  }

  ngOnInit(): void {

    this.airingToday = this.tvshowsService.airingToday;
    this.onTheAir = this.tvshowsService.onTheAir
    this.topRated = this.tvshowsService.topRated
    this.popular = this.tvshowsService.popular

    this.responsiveOptions = [

      {
        breakpoint: '1600px',
        numVisible: 6,
        numScroll: 1,
      },
      {
        breakpoint: '1400px',
        numVisible: 5,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ]
  }

  // put voting as percentage in a circle
  getRatingGradient(vote: number): string {
    const percent = Math.round(vote * 10); 
    const color = percent > 70 ? '#22c55e' : percent > 40 ? '#eab308' : '#ef4444';

    return `conic-gradient(${color} ${percent}%, #e5e7eb ${percent}%)`;
  }

  

}
