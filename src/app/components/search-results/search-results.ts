import { Component, Signal, signal, computed, effect, OnInit, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../service/search-service';  
import { Movie } from '../../interfaces/movie';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  imports: [ CommonModule, RouterLink, CardModule, ButtonModule, RatingModule, FormsModule],
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