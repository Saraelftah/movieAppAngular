import { Component, Signal, OnInit, inject, effect, computed } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../service/movie-service'
import { Movie } from '../../interfaces/movie';
import { RouterModule } from '@angular/router';
import { Search } from '../search/search';
import { WatchlistService } from '../../service/watchlist-service';

@Component({
  selector: 'app-movies',
  imports: [CarouselModule, Carousel, ButtonModule, CommonModule, RouterModule, Search],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
  providers: [MovieService]
})
export class Movies {

  wishlistService = inject(WatchlistService);

  titles = computed(() => {
  const lang = this.movieService.currentLanguage();

  const translations: Record<string, any> = {
    en: {
      nowPlaying: 'Now Playing',
      popular: 'Popular',
      topRated: 'Top Rated',
      upcoming: 'Upcoming'
    },
    ar: {
      nowPlaying: 'يعرض الآن',
      popular: 'الأكثر شهرة',
      topRated: 'الأعلى تقييماً',
      upcoming: 'قريبًا'
    },
    fr: {
      nowPlaying: 'À l\'affiche',
      popular: 'Populaire',
      topRated: 'Les mieux notés',
      upcoming: 'À venir'
    },
    zh: {
      nowPlaying: '正在上映',
      popular: '受欢迎',
      topRated: '高评分',
      upcoming: '即将上映'
    }
  };

  return translations[lang] ?? translations['en'];
});


  nowPlaying!: Signal<Movie[]>;
  popular!: Signal<Movie[]>;
  topRated!: Signal<Movie[]>;
  upcoming!: Signal<Movie[]>;

  responsiveOptions: any[] | undefined;
  movieService = inject (MovieService);

  constructor(){

    effect(() => {
      const lang = this.movieService.currentLanguage();

      this.movieService.loadSection('now_playing', this.movieService['_nowPlaying']);
      this.movieService.loadSection('popular', this.movieService['_popular']);
      this.movieService.loadSection('popular', this.movieService['_topRated']);
      this.movieService.loadSection('popular', this.movieService['_upcoming']);
    });

  }

  ngOnInit(): void {

    this.nowPlaying = this.movieService.nowPlaying;
    this.popular = this.movieService.popular
    this.topRated = this.movieService.topRated
    this.upcoming = this.movieService.upcoming

    this.responsiveOptions = [

      {
        breakpoint: '1600px',
        numVisible: 6,
        numScroll: 1,
      },
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
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
