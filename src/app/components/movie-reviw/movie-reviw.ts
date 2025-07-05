import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Review } from '../../interfaces/review';
import { MoviereviwService } from '../../service/moviereviw-service'; 
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-reviw',
  imports: [CommonModule, RatingModule, FormsModule],
  templateUrl: './movie-reviw.html',
  styleUrl: './movie-reviw.scss'
})
export class MovieReviw {

  movieReviws: Signal<Review[]>;

  constructor(private movieReviwService: MoviereviwService) { 
    this.movieReviws = this.movieReviwService.movieReviews;
  }

}
