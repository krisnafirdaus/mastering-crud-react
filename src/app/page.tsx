import { MovieCardList } from "@/features/movies/component/movie-card-list";

export default function DashboardPage() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-white">Browse</h2>
        <p className="text-base text-slate-300">Discover your favorite movies.</p>
      </div>

      <MovieCardList />
    </section>
  );
}
