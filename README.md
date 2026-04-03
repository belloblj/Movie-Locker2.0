## Movie Locker 2.0 - Tests
Movie Locker is a React-based movie discovery application that allows users to browse, search, and filter movies using data from The Movie Database (TMDB) API.
This project was expanded in Assignment 4 to include comprehensive unit testing, debugging, performance optimization, and responsive design improvements.

### Features
#### Movie Browsing
- Displays top‑rated movies from TMDB.
- Each movie is shown as a card with poster, rating, and release year.
#### Search Functionality
- Users can search for movies by title.
- Search queries update the URL using React Router search parameters.
#### Genre Filtering
- Users can filter movies by genre.
- Genre selection also updates the URL for consistent navigation.
#### Pagination
- Navigate through multiple pages of results.
- Page number is stored in the URL for shareable state.
#### Movie Details Modal
- Clicking a movie opens a modal with detailed information.
- Modal uses React Portals for clean rendering above the UI.
#### Responsive Design
- Fully responsive layout for mobile, tablet, and desktop.
- CSS Modules and media queries ensure consistent styling.
#### Accessibility
- Semantic HTML elements
- ARIA labels for interactive components
- Keyboard‑friendly modal

## Project Structure
```
src/
  api/
    tmdb.js
  api/components/
    SearchBar/
    GenreFilter/
    MovieCard/
    MovieList/
    MovieDetailsModal/
    Pagination/
  api/pages/
    HomePage/
  __tests__/
    SearchBar.test.jsx
    MovieCard.test.jsx
    MovieList.test.jsx
    GenreFilter.test.jsx
    MovieDetailsModal.test.jsx
    HomePage.test.jsx
  setupTests.js
  App.jsx
  main.jsx
```

This structure keeps the project modular, testable, and easy to maintain.

## Data Flow
Fetching Data
All data is fetched from TMDB using functions inside:
```
src/api/tmdb.js
```
These functions handle:
- Fetching top‑rated movies
- Fetching genres
- Fetching movie details

## State Management
React state (useState) stores:
- Movie list
- Genres
- Selected movie details
- Loading states

## URL Parameters
React Router’s useSearchParams stores:
- Search query
- Genre filter
- Page number
This makes the application state shareable and persistent across refreshes.

# Unit Testing
All tests are written using Vitest and React Testing Library.
Test coverage includes:
- Rendering components
- User interactions (typing, clicking, selecting)
- Modal behavior
- API mocking
- URL parameter updates
- Loading states and conditional rendering
Test files are located in:
```
src/__tests__/
```

Run tests:
```
npm run test
```

Run with coverage:
```
npm run test -- --coverage
```


# Debugging & Performance Optimization
## Debugging
- Fixed component import paths
- Resolved missing props and undefined values
- Corrected API mock behavior for testing
## Performance Improvements
- Added React.memo to prevent unnecessary re-renders
- Used useCallback for stable function references
- Verified improvements using React DevTools Profiler

# Environment Variables
Create a .env file:
```
VITE_TMDB_API_KEY=your_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

Restart the dev server after adding environment variables.

Installation & Setup
Install dependencies:
```
npm install
```

Run development server:
```
npm run dev
```

Build for production:
```
npm run build
```


# Purpose
This project was created to demonstrate:
- React component architecture
- API integration
- Unit testing with React Testing Library
- Debugging and performance optimization
- Responsive and accessible UI design
