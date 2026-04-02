import { render } from "@testing-library/react";
import { test, expect } from "vitest";
import MovieList from "../api/components/MovieList/MovieList";

test("renders without crashing when no movies", () => {
  const { container } = render(<MovieList movies={[]} onMovieClick={() => {}} />);
  expect(container).toBeInTheDocument();
});