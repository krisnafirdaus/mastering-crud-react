const API_URL = "https://jsonplaceholder.typicode.com"

export const movieApi = {
    // GET
    async getWatchList() { // asynchronous  
        const res = await fetch(`${API_URL}/api/watchlist`);
        return res.json();
    },

    // GET
    async getPost(){
        const res = await fetch(`${API_URL}/posts`);
        return res.json();
    },

    // CREATE
    async addToWatchList(movie: any) {
        const res = await fetch(`${API_URL}/api/watchlist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movie)  
        });
        
        return res.json();
    },

    // UPDATE
    async updateMovie(id: number, data: any) {
        const res = await fetch(`${API_URL}/api/watchlist/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)  
        });
        
        return res.json();
    },

    // DELETE
    async removeFromWatchlist(id: number) {
        const res = await fetch(`${API_URL}/api/watchlist/${id}`, {
            method: "DELETE"
        });
    }
}