import { Movie } from "../types/movie.type";

export const MOVIE_DUMMY: Movie[] = [
  {
    id: 1,
    title: "Spider-Man: Homecoming",
    posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    rating: 8.2,
    categories: ["Action", "Adventure", "Sci-Fi"],
  },
  {
    id: 2,
    title: "The Dark Knight",
    posterUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
    rating: 9.0,
    categories: ["Action", "Crime", "Drama"],
  },
  {
    id: 3,
    title: "Interstellar",
    posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80",
    rating: 8.7,
    categories: ["Adventure", "Drama", "Sci-Fi"],
  },
];
