import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import GenreFilter from "../api/components/GenreFilter/GenreFilter";

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Drama" },
];

test("renders genre options", () => {
  render(<GenreFilter genres={genres} selected="" onChange={() => {}} />);
  expect(screen.getByText("Action")).toBeInTheDocument();
  expect(screen.getByText("Drama")).toBeInTheDocument();
});

test("calls onChange when selecting a genre", () => {
  const handleChange = vi.fn();
  render(<GenreFilter genres={genres} selected="" onChange={handleChange} />);

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "1" },
  });

  expect(handleChange).toHaveBeenCalledWith("1");
});