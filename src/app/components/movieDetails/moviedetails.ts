import { Component, Signal, signal, computed, inject, effect } from '@angular/core';
import { Movie } from '../../interfaces/movie';
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


@Component({
  selector: 'app-moviedetails',
  imports: [CommonModule, ButtonModule, Tag, RatingModule, FormsModule, Recommendation, MovieReviw],
  templateUrl: './moviedetails.html',
  styleUrl: './moviedetails.scss'
})
export class MovieDetails {

  movie!: Signal<Movie| undefined>;
  id!: number | undefined;
  genres!: Signal<string[]>;
  

  private route= inject (ActivatedRoute);
  private movieService = inject(MovieService);
  private recommService= inject (RecommService);
  private movieReviwService= inject (MoviereviwService);


  constructor() {
    this.movieService.loadAllSections();
    this.movieService.fetchGenres();


    this.movie = computed(() => this.movieService.findMovieById(this.id!));

    this.genres = computed(() => {
    const movie = this.movie();
    const allGenres = this.movieService.genre();
    if (!movie || !movie.genre_ids || allGenres.length === 0) return [];

    return movie.genre_ids.map(id => {
      const match = allGenres.find(g => g.id === id);
      return match ? match.name : 'Unknown';
    });
  });

    effect(() => {
       const currentMovie = this.movie(); 

       // Only fetch if movie and its ID are available
      if (currentMovie && currentMovie.id) { 
        this.recommService.fetchRecomm<Movie>(currentMovie.id, 'movie');
        this.movieReviwService.fetchReviw(currentMovie.id);
        console.log('Fetching recommendations for movie ID:', currentMovie.id);
      } else {
        console.log('Movie not yet found or ID not available, not fetching recommendations.');
      }
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

  }
  
}



 // this.movie = computed(() => {
    //   const currentId = Number(this.route.snapshot.paramMap.get('id'));

    //    const allMovies = [
    //   ...this.movieService.nowPlaying(),
    //   ...this.movieService.popular(),
    //   ...this.movieService.topRated(),
    //   ...this.movieService.upcoming()
    // ];

    // return allMovies.find(m => m.id === currentId);

    // });
