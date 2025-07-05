import { Injectable, Signal, signal,  WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class MoviereviwService {

  constructor(private http: HttpClient) { }

  private _movieReviws: WritableSignal<Review[]> = signal<Review[]>([]);

   get movieReviews(): Signal<Review[]> {
      return this._movieReviws.asReadonly();
    }

    private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTU5ZmFlNzllYjQ4NzBlM2YyYTc3ZWFhZTgyNmY4NCIsIm5iZiI6MTc0NzU5MzU4MC43Nzc5OTk5LCJzdWIiOiI2ODJhMjk2Y2E4NWE2ZjAxZTRkYjI2MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UE_n1TZkVTECJsop4ddngFw08IZ3QcS4FuTzk08uI5s';

    fetchReviw(id: number): void {
        this.http.get<{ results: Review[] }>(`https://api.themoviedb.org/3/movie/${id}/reviews`, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            accept: 'application/json'
          }
        })
         .subscribe({
          next: (data) => {
            this._movieReviws.set(data.results);
            console.log('Reviews fetched:', data.results);
          },
          error: (err) => {
            console.error('Error fetching reviews:', err);
            // Clear reviws on error
            this._movieReviws.set([]); 
          }
        });
    
      }



}
