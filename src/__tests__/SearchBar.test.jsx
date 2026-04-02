import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import SearchBar from "../api/components/SearchBar/SearchBar";

test("calls onSearch when user submits a search", () => {
  const handleSearch = vi.fn();

  render(<SearchBar defaultValue="" onSearch={handleSearch} />);

  const input = screen.getByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: "Inception" } });

  expect(handleSearch).toHaveBeenCalledWith("Inception");
});