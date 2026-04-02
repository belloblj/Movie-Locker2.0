const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export async function fetchTopRated(page = 1, genreId = null, query = "") {
  const url = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`
    : `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}${
        genreId ? `&with_genres=${genreId}` : ""
      }`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export async function fetchGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch genres");
  return res.json();
}

export async function fetchMovieDetails(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}