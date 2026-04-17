'use client';

import { useEffect, useState } from "react";
import MovieForm from "@/features/watchlist/components/MovieForm";
import MovieItem from "@/features/watchlist/components/MovieItem";
import { movieApi } from "@/lib/movieApi";

export default function WatchListPage() {
    const [movies, setMovies] = useState<any>([]);
    const [editingMovie, setEditingMovie] = useState<any | null>(null);

    useEffect(() => {
        movieApi.getWatchList().then(setMovies);
    }, []);

    const handleAdd = async (newMovies: Omit<any, 'id'>) => {
        const created = await movieApi.addToWatchList(newMovies);
        setMovies(prev => [...prev, {...created, id: Date.now()}]);
    }

     const handleUpdate = async (id: number, data: any) => {
        const updated = await movieApi.updateMovie(id, data);
        setMovies(prev => prev.map(movie => 
            movie.id === id ? { ...movie, ...updated } : movie
        ));
        setEditingMovie(null);
    };

    const handleDelete = async (id: number) => {
        await movieApi.removeFromWatchlist(id);
        setMovies(prev => prev.filter(movie => movie.id !== id));
    };

    const handleEdit = async (id: number) => {
       const movie = movies.find((m: { id: number; }) => m.id === id);
        setEditingMovie(movie);
    };

    return (
        <div>
            <h1>My WatchList</h1>

            <MovieForm
                onSubmit={editingMovie ? (data) => handleUpdate(editingMovie.id, data) : handleAdd}
                initialData={editingMovie}
                onCancel={() => setEditingMovie(null)}
            />

            <div className="movie-grid">
                {movies.map((movie: any) => (
                    <MovieItem
                        key={movie.id}
                        movie={movie}
                        onEdit={() => handleEdit(movie.id)}
                        onDelete={() => handleDelete(movie.id)}
                        onToggleWatched={(id) => handleUpdate(id, {
                            watched: !movie.watched
                        })}
                    />
                ))}
            </div>
        </div>
    )
}

- watchlist page
    - Movie Form
    - Movie Item
    