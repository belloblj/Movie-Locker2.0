import styles from "./Pagination.module.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  function handlePrev() {
    if (currentPage > 1) onPageChange(currentPage - 1);
  }

  function handleNext() {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  }

  return (
    <div className={styles.pagination}>
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>
      <span>
        Page {currentPage} / {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;