import styles from "./GenreFilter.module.css";

function GenreFilter({ genres, selectedGenre, onChange }) {
  function handleChange(e) {
    onChange(e.target.value);
  }

  return (
    <select
      className={styles.select}
      value={selectedGenre}
      onChange={handleChange}
    >
      <option value="">All genres</option>
      {genres.map((g) => (
        <option key={g.id} value={g.id}>
          {g.name}
        </option>
      ))}
    </select>
  );
}

export default GenreFilter;