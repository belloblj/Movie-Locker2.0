import styles from "./SearchBar.module.css";

function SearchBar({ value, defaultValue = "", onChange, onSearch }) {
  function handleChange(e) {
    const nextValue = e.target.value;

    if (typeof onChange === "function") {
      onChange(nextValue);
    }

    if (typeof onSearch === "function") {
      onSearch(nextValue);
    }
  }

  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Search by title..."
      value={value ?? defaultValue}
      onChange={handleChange}
    />
  );
}

export default SearchBar;