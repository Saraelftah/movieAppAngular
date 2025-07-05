import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../../service/watchlist-service';
import { Movie } from '../../interfaces/movie';
import { WishlistItem } from '../../service/watchlist-service';



@Component({
  selector: 'app-watchlist',
  imports: [RouterModule, CommonModule],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.scss'
})
export class Watchlist {

  watchlistService = inject(WatchlistService);

//  get wishlist(): WishlistItem[] {
//   return this.watchlistService.wishlist();
// }

 get wishlistDisplay() {
    return this.watchlistService.wishlist().map(item => ({
      id: item.id,
      title: 'title' in item ? item.title : item.name,
      date: 'release_date' in item ? item.release_date : item.first_air_date,
      poster: item.poster_path
    }));
  }

  remove(id: number): void {
    this.watchlistService.removeFromWishlist(id);
  }

}
