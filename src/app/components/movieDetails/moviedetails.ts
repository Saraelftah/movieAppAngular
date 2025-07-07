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

  id!: number | undefined;
  fullMovie!: Signal<Movie | null>;
  

  private route= inject (ActivatedRoute);
  private movieService = inject(MovieService);
  private recommService= inject (RecommService);
  private movieReviwService= inject (MoviereviwService);

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

     if (this.id) {
        this.movieService.getMovieDetails(this.id);
        this.recommService.fetchRecomm<Movie>(this.id, 'movie');
        this.movieReviwService.fetchReviw(this.id);
      }

      this.fullMovie = this.movieService.fullMovie;

  }
  
}