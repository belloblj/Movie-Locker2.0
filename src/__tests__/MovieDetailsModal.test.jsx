import { render } from "@testing-library/react";
import { test, expect } from "vitest";
import MovieDetailsModal from "../api/components/MovieDetailsModal/MovieDetailsModal";

test("renders null when modal root doesn't exist", () => {
  // Remove modal-root if it exists
  const root = document.getElementById("modal-root");
  if (root) root.remove();
  
  const { container } = render(
    <MovieDetailsModal movieId={1} onClose={() => {}} />
  );
  // Should render nothing since modal root doesn't exist
  expect(container.firstChild).toBeNull();
});