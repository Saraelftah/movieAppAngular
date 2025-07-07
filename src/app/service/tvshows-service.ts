import { Injectable, Signal, signal, WritableSignal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from './language-service';
import { Tvshow } from '../interfaces/tvshow';
import { Genre } from '../interfaces/genre';


@Injectable({
  providedIn: 'root'
})
export class TvshowsService {

  private http = inject(HttpClient);
  private languageService = inject(LanguageService);

  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTU5ZmFlNzllYjQ4NzBlM2YyYTc3ZWFhZTgyNmY4NCIsIm5iZiI6MTc0NzU5MzU4MC43Nzc5OTk5LCJzdWIiOiI2ODJhMjk2Y2E4NWE2ZjAxZTRkYjI2MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UE_n1TZkVTECJsop4ddngFw08IZ3QcS4FuTzk08uI5s';

  currentLanguage = this.languageService.currentLanguage;

  private _airingToday = signal<Tvshow[]>([]);
  private _onTheAir = signal<Tvshow[]>([]);
  private _popular = signal<Tvshow[]>([]);
  private _topRated = signal<Tvshow[]>([]);
  private _genre = signal<Genre[]>([]);


  get airingToday(): Signal<Tvshow[]> {
    return this._airingToday.asReadonly();
  }

  get onTheAir(): Signal<Tvshow[]> {
    return this._onTheAir.asReadonly();
  }

  get popular(): Signal<Tvshow[]> {
    return this._popular.asReadonly();
  }

  get topRated(): Signal<Tvshow[]> {
    return this._topRated.asReadonly();
  }

  get genre(): Signal<Genre[]> {
    return this._genre.asReadonly();
  }

  getSeriesBySection(section: 'airing_today' | 'top_rated' | 'on_the_air' | 'popular') {
    const lang = this.currentLanguage();
    const url = `https://api.themoviedb.org/3/tv/${section}?language=${lang}`;

    return this.http.get<{ results: Tvshow[] }>(url, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        accept: 'application/json'
      }
    });
  }

  loadSection(section: 'airing_today' | 'top_rated' | 'on_the_air' | 'popular', target: WritableSignal<Tvshow[]>) {
    this.getSeriesBySection(section).subscribe(res => target.set(res.results));
  }

  loadAllSections() {
    this.loadSection('airing_today', this._airingToday);
    this.loadSection('top_rated', this._topRated);
    this.loadSection('on_the_air', this._onTheAir);
    this.loadSection('popular', this._popular);
  }

  findSeriesById(id: number): Tvshow | undefined {
    const allSeries = [
      ...this.airingToday(),
      ...this.onTheAir(),
      ...this.topRated(),
      ...this.popular()
    ];
    return allSeries.find(s => s.id === id);
  }

  fetchGenres(): void {
    this.http.get<{ genres: Genre[] }>('https://api.themoviedb.org/3/genre/tv/list', {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        accept: 'application/json'
      }
    }).subscribe(response => {
      this._genre.set(response.genres);
    });
  }
}
