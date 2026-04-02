import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieList.module.css";

function MovieList({ movies, onMovieClick }) {
  function handleMovieClick(movieId) {
    if (typeof onMovieClick === "function") {
      onMovieClick(movieId);
    }
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => handleMovieClick(movie.id)}
        />
      ))}
    </div>
  );
}

export default MovieList;