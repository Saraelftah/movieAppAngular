import { Injectable, Signal, signal,  WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../interfaces/movie';
import { Tvshow } from '../interfaces/tvshow';

@Injectable({
  providedIn: 'root'
})
export class RecommService {

  constructor(private http: HttpClient) { }

  private _recommendation: WritableSignal<(Movie | Tvshow)[]> = signal<(Movie | Tvshow)[]>([]);

 
  get recommendation(): Signal<(Movie | Tvshow)[]> {
    return this._recommendation.asReadonly();
  }

  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTU5ZmFlNzllYjQ4NzBlM2YyYTc3ZWFhZTgyNmY4NCIsIm5iZiI6MTc0NzU5MzU4MC43Nzc5OTk5LCJzdWIiOiI2ODJhMjk2Y2E4NWE2ZjAxZTRkYjI2MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UE_n1TZkVTECJsop4ddngFw08IZ3QcS4FuTzk08uI5s';


  fetchRecomm<T extends Movie | Tvshow>(id: number, type: 'movie' | 'tv'): void {

    this.http.get<{ results: T[] }>(`https://api.themoviedb.org/3/${type}/${id}/recommendations`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        accept: 'application/json'
      }
    })
     .subscribe({
      next: (data) => {
        this._recommendation.set(data.results);
        console.log(`Recommendations for ${type} ID ${id}:`, data.results);
      },
      error: (err) => {
        console.error('Error fetching recommendations:', err);
        // Clear recommendations on error
        this._recommendation.set([]); 
      }
    });

  }
}
