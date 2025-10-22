import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();
// keep the hook name the app expects
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (movie) => {
        setFavorites(prev => [...prev, movie]);
        };

    const removeFavorite = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    return (
        <MovieContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </MovieContext.Provider>
    );
};


export default MovieContext;