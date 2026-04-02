import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./MovieDetailsModal.module.css";
import { fetchMovieDetails } from "../../tmdb";

const modalRoot = document.getElementById("modal-root");

function MovieDetailsModal({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadMovieDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchMovieDetails(movieId);
        if (isMounted) {
          setMovie(data);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load movie details");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMovieDetails();

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>

        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {movie && (
          <>
            <h2 className={styles.title}>
              {movie.title}{" "}
              <span className={styles.year}>
                ({movie.release_date?.slice(0, 4)})
              </span>
            </h2>
            <p className={styles.rating}>⭐ {movie.vote_average?.toFixed(1)}</p>
            <p className={styles.overview}>{movie.overview}</p>

            <h3 className={styles.subheading}>Cast</h3>
            <ul className={styles.castList}>
              {(movie.credits?.cast || []).slice(0, 10).map((actor) => (
                <li key={actor.cast_id}>
                  {actor.name} as {actor.character}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>,
    modalRoot
  );
}

export default MovieDetailsModal;