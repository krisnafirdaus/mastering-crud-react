interface MovieItemProps {
    movie: any;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onToggleWatched: (id: number) => void;
}

export default function MovieItem({ movie, onEdit, onDelete, onToggleWatched }: MovieItemProps) {
    return (
        <div className={`movie-card ${movie.watched ? "watched" : ""}`}>
            <h3>{movie.title}</h3>
            <p>Rating : {movie.personalRating}/10</p>
            

            <button onClick={() => onToggleWatched(movie.id)}>
                {movie.watched ? "Mark as Unwatched" : "Mark as Watched"}
            </button>
            <button onClick={() => onEdit(movie.id)}>Edit</button>
            <button onClick={() => onDelete(movie.id)}>Delete</button>
        </div>
    )
}