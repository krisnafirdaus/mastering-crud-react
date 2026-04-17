import { useState, useEffect } from "react";

interface MovieFormProps {
    onSubmit: (data: any) => void;
    initialData?: any;
    onCancel: () => void;
}

export default function MovieForm({ onSubmit, initialData, onCancel }: MovieFormProps) {
    const [title, setTitle] = useState(initialData?.title || ""); 
    const [rating, setRating] = useState(initialData?.personalRating || 0); 

    useEffect(() => {
        if(initialData) {
            setTitle(initialData.title);
            setRating(initialData.personalRating);
        } else {
             setTitle("");
            setRating(0);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();;
        onSubmit({ title, personalRating: rating})
        if(!initialData) {
             setTitle("");
            setRating(0);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="border bg-white"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Movie title"
            />
            <input
                className="border bg-white"
                type="number"
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
                placeholder="Your rating (0-10]"
                min="0"
                max="10"
            />
            <button type="submit" className="border">
                {initialData ? "update" : "Add"}
            </button>
            {initialData && (
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            )}
        </form>
    )
}