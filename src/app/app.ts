import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import { Navbar } from './components/navbar/navbar'
import { Movies } from './components/movies/movies'
import { Tvshows } from './components/tvshows/tvshows';
import { MovieDetails } from './components/movieDetails/moviedetails';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Navbar, Movies, Tvshows, RouterModule, MovieDetails],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'project';

  
}
