import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTU5ZmFlNzllYjQ4NzBlM2YyYTc3ZWFhZTgyNmY4NCIsIm5iZiI6MTc0NzU5MzU4MC43Nzc5OTk5LCJzdWIiOiI2ODJhMjk2Y2E4NWE2ZjAxZTRkYjI2MTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UE_n1TZkVTECJsop4ddngFw08IZ3QcS4FuTzk08uI5s';

  private baseUrl = 'https://api.themoviedb.org/3/search/movie';

  private _searchResults: WritableSignal<Movie[]> = signal([]);

   get searchResults(): Signal<Movie[]> {
    return this._searchResults.asReadonly();
  }

   fetchSearchResults(query: string): void {
    if (!query.trim()) {
      this._searchResults.set([]);
      return;
    }

    this.http.get<{ results: Movie[] }>(`${this.baseUrl}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        accept: 'application/json'
      },
      params: { 
        query: query
      }
    })
    .subscribe({
      next: (data) => {
        this._searchResults.set(data.results);
        console.log('Search results fetched:', data.results);
      },
      error: (err) => {
        console.error('Error fetching search results:', err);
        this._searchResults.set([]); 
      }
    });

}

}
