import { Injectable, signal, WritableSignal, effect } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { Tvshow } from '../interfaces/tvshow';

export type WishlistItem = Movie | Tvshow;

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private _wishlist: WritableSignal<WishlistItem[]> = signal<WishlistItem[]>(this.loadFromStorage());

  constructor() {
    // Sync with localStorage on changes
    effect(() => {
      localStorage.setItem('wishlist', JSON.stringify(this._wishlist()));
    });
  }

  get wishlist() {
    return this._wishlist.asReadonly();
  }

  addToWishlist(item: WishlistItem): void {
    if (!this.isInWishlist(item.id)) {
      this._wishlist.set([...this._wishlist(), item]);
    }
  }

  removeFromWishlist(id: number): void {
    this._wishlist.set(this._wishlist().filter(i => i.id !== id));
  }

  toggleWishlist(item: WishlistItem): void {
    this.isInWishlist(item.id)
      ? this.removeFromWishlist(item.id)
      : this.addToWishlist(item);
  }

  isInWishlist(id: number): boolean {
    return this._wishlist().some(i => i.id === id);
  }

  get count(): number {
    return this._wishlist().length;
  }

  private loadFromStorage(): WishlistItem[] {
    const saved = localStorage.getItem('wishlist');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
}