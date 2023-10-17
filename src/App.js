import React, { useEffect, useState } from "react"
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard"

const API_key = 'http://www.omdbapi.com/?i=tt3896198&apikey=d6d0ba1'

const App = () => {
  let [movies, setMovies] = useState([API_key])
  let [searchTerm, setSearchTerm] = useState("")

  const searchMovies = async (title) => {
    const response = await fetch(`${API_key}&s=${title}`)
    const data = await response.json();
    // console.log(data)

    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies("All")
  }, [])


  return (
    <div className="app">
      <div className="navbar">
        <h1>PrimeFilm Play</h1>

        <div className="search">
          <input
            placeholder="Search for movies"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={SearchIcon}
            alt="search-icon"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>
      </div>

      {
        movies.length > 0
          ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          ) :
          (
            <div className="default">
              <h2><u>No movies Found!</u></h2>
            </div>
          )
      }


    </div>
  );
}

export default App;
