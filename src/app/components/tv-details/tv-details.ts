import { Component, Signal, signal, computed, inject, effect } from '@angular/core';
import { Tvshow } from '../../interfaces/tvshow';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../service/movie-service';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import {RecommService } from '../../service/recomm-service';
import { Recommendation } from '../recommendation/recommendation';
import { MovieReviw } from '../movie-reviw/movie-reviw';
import { MoviereviwService } from '../../service/moviereviw-service';
import { TvshowsService } from '../../service/tvshows-service';

@Component({
  selector: 'app-tv-details',
  imports: [CommonModule, ButtonModule, Tag, RatingModule, FormsModule, Recommendation, MovieReviw],
  templateUrl: './tv-details.html',
  styleUrl: './tv-details.scss'
})
export class TvDetails {

  tvshow!: Signal<Tvshow| undefined>;
  id!: number | undefined;
  genres!: Signal<string[]>;

  private route= inject (ActivatedRoute);
  private tvshowService = inject(TvshowsService);
  private recommService= inject (RecommService);
  private movieReviwService= inject (MoviereviwService);
  
  constructor() {
    // this.movieService.fetchMovies();
    this.tvshowService.loadAllSections();
    this.tvshowService.fetchGenres();

     this.tvshow = computed(() => this.tvshowService.findSeriesById(this.id!));

    this.genres = computed(() => {
      const tvshow = this.tvshow();
      const allGenres = this.tvshowService.genre();
      if (!tvshow || !tvshow.genre_ids || allGenres.length === 0) return [];

      return tvshow.genre_ids.map(id => {
        const match = allGenres.find(g => g.id === id);
        return match ? match.name : 'Unknown';
    });
  });

    effect(() => {
       const currentTvshow = this.tvshow(); 

       // Only fetch if movie and its ID are available
      if (currentTvshow && currentTvshow.id) { 
        this.recommService.fetchRecomm<Tvshow>(currentTvshow.id, 'tv');
        this.movieReviwService.fetchReviw(currentTvshow.id);
        console.log('Fetching recommendations for movie ID:', currentTvshow.id);
      } else {
        console.log('Movie not yet found or ID not available, not fetching recommendations.');
      }
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

  }

}
