import React, { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=dd69a6d1';

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [Movies, setMovies] = useState([]);

    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            const data = await response.json();

            setMovies(data.Search);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        searchMovies(searchTerm);
    };

    return (
        <div>
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Search Icon"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {Movies?.length > 0 ? (
                <div className="container">
                    {Movies.map((Movie) => (
                        <MovieCard key={Movie.imdbID} Movie={Movie} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No Movies Found</h2>
                </div>
            )}
        </div>
    );
}

export default App;
