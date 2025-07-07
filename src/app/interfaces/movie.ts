export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    genre_ids: number[]
    
    tagline?: string;
    runtime?: number;
    status?: string;
    budget?: number;
    revenue?: number;
    homepage?: string;
    original_language?: string;
    genres?: { id: number; name: string }[];
    backdrop_path?: string;
    popularity?: number;
    original_title?: string;
    spoken_languages?: { english_name: string; iso_639_1: string; name: string }[];
    production_companies?: { id: number; name: string; logo_path: string | null; origin_country: string }[];
    production_countries?: { iso_3166_1: string; name: string }[];
}
