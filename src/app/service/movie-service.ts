import { Injectable, Signal, signal, WritableSignal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from './language-service';
import { Movie } from '../interfaces/movie';
import { Genre } from '../interfaces/genre';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private http = inject(HttpClient);
  private languageService = inject(LanguageService);

  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTU5ZmFlNzllYjQ4NzBlM2YyYTc3ZWFhZTgyNmY4NCIsIm5iZiI6MTc0NzU5MzU4MC43Nzc5OTk5LCJzdWIiOiI2ODJhMjk2Y2E4NWE2ZjAxZTRkYjI2MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UE_n1TZkVTECJsop4ddngFw08IZ3QcS4FuTzk08uI5s';


  currentLanguage = this.languageService.currentLanguage;

  private _nowPlaying = signal<Movie[]>([]);
  private _popular = signal<Movie[]>([]);
  private _topRated = signal<Movie[]>([]);
  private _upcoming = signal<Movie[]>([]);
  private _genre = signal<Genre[]>([]);
  private _fullMovie = signal<Movie | null>(null);

  get nowPlaying(): Signal<Movie[]> {
    return this._nowPlaying.asReadonly();
  }

  get popular(): Signal<Movie[]> {
    return this._popular.asReadonly();
  }

  get topRated(): Signal<Movie[]> {
    return this._topRated.asReadonly();
  }

  get upcoming(): Signal<Movie[]> {
    return this._upcoming.asReadonly();
  }

  get fullMovie(): Signal<Movie | null> {
  return this._fullMovie.asReadonly();
}

  getMoviesBySection(section: 'now_playing' | 'popular' | 'top_rated' | 'upcoming') {
    const lang = this.currentLanguage();
    const url = `https://api.themoviedb.org/3/movie/${section}?language=${lang}`;

    return this.http.get<{ results: Movie[] }>(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        accept: 'application/json'
      }
    });
  }

  loadSection(section: 'now_playing' | 'popular' | 'top_rated' | 'upcoming', target: WritableSignal<Movie[]>) {
    this.getMoviesBySection(section)
    .subscribe(res => target.set(res.results));
  }

  loadAllSections() {
    this.loadSection('now_playing', this._nowPlaying);
    this.loadSection('popular', this._popular);
    this.loadSection('top_rated', this._topRated);
    this.loadSection('upcoming', this._upcoming);
  }

  findMovieById(id: number): Movie | undefined {
    const allMovies = [
      ...this.nowPlaying(),
      ...this.popular(),
      ...this.topRated(),
      ...this.upcoming()
    ];
    return allMovies.find(m => m.id === id);
  }

  getMovieDetails(id:number): void{
    const lang = this.currentLanguage();
    const url = `https://api.themoviedb.org/3/movie/${id}?language=${lang}`

    this.http.get<Movie>(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        accept: 'application/json'
      }
    }).subscribe(response => {
      this._fullMovie.set(response);
    });
  }
}
