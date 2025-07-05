import { Component, signal, effect, WritableSignal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ButtonModule } from 'primeng/button'; 
import { InputTextModule } from 'primeng/inputtext'; 
import { Router } from '@angular/router';
import { SearchService } from '../../service/search-service';

@Component({
  selector: 'app-search',
  imports: [ CommonModule,FormsModule,ButtonModule,InputTextModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {
  searchQuery: WritableSignal<string> = signal('');
  private router = inject (Router);
  private searchService = inject (SearchService);

  constructor() {
    effect(() => {
      const query = this.searchQuery().trim();
      if (query.length > 1) {
        this.searchService.fetchSearchResults(query);
      } else {
        this.searchService.fetchSearchResults('');
      }
    });
   }

    onInputChange(): void {
      this.searchQuery.set(this.searchQuery());
  }

   onSearch(): void {
    const query = this.searchQuery().trim();
    if (query) {
      this.router.navigate(['/search-results'], { queryParams: { query: query } });
    }
  }


}
