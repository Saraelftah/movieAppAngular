export interface Review {
    id: number;
    author: string;
    author_details: {
        name: string;
        username: string;
        rating: number
    }
    content: string;
    created_at: string;
   
}
