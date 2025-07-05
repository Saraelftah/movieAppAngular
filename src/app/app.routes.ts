import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./components/movies/movies').then(m => m.Movies)},
    {path: 'tvShows', loadComponent: () => import('./components/tvshows/tvshows').then(m => m.Tvshows)},
    {path: 'moviedetails/:id', loadComponent: () => import('./components/movieDetails/moviedetails').then(m => m.MovieDetails)},
    {path: 'tvdetails/:id', loadComponent: () => import('./components/tv-details/tv-details').then(m => m.TvDetails)},
    {path: 'search-results', loadComponent: () => import('./components/search-results/search-results').then(m => m.SearchResults)},
    {path: 'watchlist', loadComponent: () => import('./components/watchlist/watchlist').then(m => m.Watchlist)},
];
