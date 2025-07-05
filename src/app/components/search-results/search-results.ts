import { Component, Signal, signal, computed, effect, OnInit, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../service/search-service';  
import { Movie } from '../../interfaces/movie';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search-results',
  imports: [ CommonModule, RouterLink, CardModule, ButtonModule],
  templateUrl: './search-results.html',
  styleUrl: './search-results.scss'
})
export class SearchResults {

  searchResults: Signal<Movie[]>;
  currentSearchQuery = signal<string>(''); 

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {
    this.searchResults = this.searchService.searchResults; 
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      const query = queryParams.get('query') ?? undefined;
      this.currentSearchQuery.set(query || '');

      if (query && query.trim()) {
        this.searchService.fetchSearchResults(query);
      } else {
        this.searchService.fetchSearchResults('');
      }
    });
  }

}





    // effect(() => {
    //   this.route.queryParamMap.subscribe(queryParams => {
    //     const query = queryParams.get('query');

    //     if (query) {
    //       this.currentSearchQuery.set(query);
    //       this.searchService.fetchSearchResults(query); // Trigger the search
    //       console.log('Search results component: Fetching results for:', query);
    //     } else {
    //       this.currentSearchQuery.set('');
    //       this.searchService.fetchSearchResults(''); // Clear results if no query
    //       console.log('Search results component: No query parameter found.');
    //     }
    //   });
    // });
