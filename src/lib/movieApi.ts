export const movieApi = {
    // GET
    async getWatchList() { // asynchronous  
        const res = await fetch("/api/watchlist");
        return res.json();
    },

    // CREATE
    async addToWatchList(movie: any) {
        const res = await fetch("/api/watchlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movie)  
        });
        
        return res.json();
    },

    // UPDATE
    async updateMovie(id: number, data: any) {
        const res = await fetch(`/api/watchlist/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)  
        });
        
        return res.json();
    },

    // DELETE
    async removeFromWatchlist(id: number) {
        const res = await fetch(`/api/watchlist/${id}`, {
            method: "DELETE"
        });
    }
}