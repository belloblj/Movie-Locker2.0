import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import MovieCard from "../api/components/MovieCard/MovieCard";

const movie = {
  id: 1,
  title: "Inception",
  release_date: "2010-07-16",
  vote_average: 8.8,
  poster_path: "/poster.jpg",
};

test("renders movie title", () => {
  render(<MovieCard movie={movie} onClick={() => {}} />);
  expect(screen.getByText("Inception")).toBeInTheDocument();
});

test("calls onClick when clicked", () => {
  const handleClick = vi.fn();
  render(<MovieCard movie={movie} onClick={handleClick} />);

  fireEvent.click(screen.getByText("Inception"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});