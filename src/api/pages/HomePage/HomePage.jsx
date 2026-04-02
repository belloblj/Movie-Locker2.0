import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { fetchTopRated, fetchGenres } from "../../tmdb";

import MovieList from "../../components/MovieList/MovieList";
import MovieDetailsModal from "../../components/MovieDetailsModal/MovieDetailsModal";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";
import GenreFilter from "../../components/GenreFilter/GenreFilter";

import styles from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loadedKey, setLoadedKey] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id } = useParams();

  const page = Number(searchParams.get("page")) || 1;
  const genreId = searchParams.get("genre") || "";
  const query = searchParams.get("query") || "";
  const requestKey = `${page}|${genreId}|${query}`;
  const loading = loadedKey !== requestKey;

  // Fetch genres on mount
  useEffect(() => {
    fetchGenres().then((data) => setGenres(data.genres));
  }, []);

  // Fetch movies whenever filters change
  useEffect(() => {
    const currentRequestKey = `${page}|${genreId}|${query}`;
    fetchTopRated(page, genreId, query)
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages || 1);
        setLoadedKey(currentRequestKey);
      })
      .catch(() => {
        setMovies([]);
        setTotalPages(1);
        setLoadedKey(currentRequestKey);
      });
  }, [page, genreId, query]);

  // Close modal
  function closeModal() {
    navigate("/");
  }

  function handleMovieClick(movieId) {
    navigate(`/movie/${movieId}`);
  }

  return (
    <div className={styles.container}>
      {/* Header with Logo + Title */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <img src="/movie-locker.svg" alt="Movie Locker Logo" className={styles.logo} />
          <h1 className={styles.title}>Movie Locker</h1>
        </div>
      </header>

      {/* Search + Genre Filter */}
      <div className={styles.controls}>
        <SearchBar
          defaultValue={query}
          onSearch={(value) => {
            setSearchParams({ page: 1, genre: genreId, query: value });
          }}
        />

        <GenreFilter
          genres={genres}
          selected={genreId}
          onChange={(value) => {
            setSearchParams({ page: 1, genre: value, query });
          }}
        />
      </div>

      {/* Movie List */}
      <MovieList movies={movies} loading={loading} onMovieClick={handleMovieClick} />

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          setSearchParams({ page: newPage, genre: genreId, query });
        }}
      />

      {/* Modal */}
      {id && (
        <MovieDetailsModal movieId={id} onClose={closeModal} />
      )}
    </div>
  );
}

export default HomePage;