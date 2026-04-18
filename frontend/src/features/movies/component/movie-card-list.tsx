import { MOVIE_DUMMY } from "../utils/movie-dummy";
import { MovieCard } from "./movie-card";

export function MovieCardList() {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
      {MOVIE_DUMMY.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
}
