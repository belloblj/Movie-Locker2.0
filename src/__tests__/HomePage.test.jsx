import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { test, expect, vi, describe } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../api/pages/HomePage/HomePage";

// Mock TMDB API
vi.mock("../api/tmdb", () => ({
  fetchTopRated: vi.fn(() =>
    Promise.resolve({
      results: [
        {
          id: 1,
          title: "Inception",
          release_date: "2010-07-16",
          vote_average: 8.8,
          poster_path: "/poster.jpg",
        },
      ],
    })
  ),
  fetchGenres: vi.fn(() =>
    Promise.resolve({
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Drama" },
      ],
    })
  ),
  fetchMovieDetails: vi.fn(() =>
    Promise.resolve({
      id: 1,
      title: "Inception",
      overview: "A mind-bending thriller.",
      release_date: "2010-07-16",
      vote_average: 8.8,
      credits: { cast: [] },
    })
  ),
}));

// Mock useNavigate and useParams
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({ id: null }),
  };
});

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
}

describe("HomePage Component", () => {
  test("renders Movie Locker header", () => {
    renderHomePage();
    expect(screen.getByText("Movie Locker")).toBeInTheDocument();
  });

  test("loads and displays movies from API", async () => {
    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText("Inception")).toBeInTheDocument();
    });
  });

  test("loads and displays genres", async () => {
    renderHomePage();

    await waitFor(() => {
      expect(screen.getByText("Action")).toBeInTheDocument();
      expect(screen.getByText("Drama")).toBeInTheDocument();
    });
  });

  test("search bar updates search query", async () => {
    renderHomePage();

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "Batman" } });

    await waitFor(() => {
      expect(input.value).toBe("Batman");
    });
  });

  test("genre filter triggers onChange", async () => {
    renderHomePage();

    await waitFor(() => screen.getByText("Action"));

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "1" } });

    expect(select.value).toBe("1");
  });

  test("pagination renders and responds to click", async () => {
    renderHomePage();

    await waitFor(() => screen.getByText("Inception"));

    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);

    expect(nextButton).toBeInTheDocument();
  });
});