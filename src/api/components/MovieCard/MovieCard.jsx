import { useState } from "react";
import styles from "./MovieCard.module.css";

function MovieCard({ movie, onClick }) {
  const [loaded, setLoaded] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/fallback.jpg"; // Add a fallback image in public/

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div
      className={`${styles.card} ${loaded ? styles.loaded : ""}`}
      onClick={onClick}
      style={{
        backgroundImage: `url(${posterUrl})`,
      }}
    >
      {/* Hidden image to detect when poster loads */}
      <img
        src={posterUrl}
        alt=""
        className={styles.preload}
        onLoad={() => setLoaded(true)}
      />

      {/* Skeleton shimmer */}
      {!loaded && <div className={styles.skeleton}></div>}

      {/* Glass overlay */}
      <div className={styles.overlay}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.meta}>{year}</p>
        <p className={styles.rating}>⭐ {movie.vote_average?.toFixed(1)}</p>
      </div>
    </div>
  );
}

export default MovieCard;