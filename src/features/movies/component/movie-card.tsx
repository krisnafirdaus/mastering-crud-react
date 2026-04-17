import { Star } from "lucide-react";
import { Movie } from "../types/movie.type";

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="group relative min-h-105 cursor-pointer overflow-hidden rounded-3xl bg-gray-800 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
      <img src={movie.posterUrl} alt={movie.title} className="block h-full min-h-[420px] w-full object-cover transition-transform duration-300 group-hover:scale-105" />

      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/95 via-slate-900/70 to-slate-900/5 p-[18px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex w-full translate-y-4 flex-col gap-3.5 transition-transform duration-300 group-hover:translate-y-0">
          <div className="flex justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400/15 px-3 py-2 text-sm font-bold text-yellow-300 backdrop-blur-md">
              <Star size={16} fill="currentColor" />
              {movie.rating}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[22px] font-bold leading-tight text-white">{movie.title}</h3>

            <div className="flex flex-wrap gap-2">
              {movie.categories.map((category) => (
                <span key={category} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-50 backdrop-blur-md">
                  {category}
                </span>
              ))}
            </div>

            <button className="mt-1 rounded-2xl bg-yellow-300 px-4 py-3 text-sm font-bold text-slate-900 transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-95">Watch Now</button>
          </div>
        </div>
      </div>
    </article>
  );
}
