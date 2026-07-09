/*
File: ui.js
Responsibility: Handles DOM rendering only. It has no knowledge of where the data originates.
*/

const moviesContainer = document.getElementById("movies-container");
const loadingText = document.getElementById("loading-text");

// ---- Render movies list ----
export function renderMovies(movies) {
  moviesContainer.innerHTML = "";   // Clear previous content first

  if (!movies || movies.length === 0) {
    moviesContainer.innerHTML = `<p>No movies found.</p>`;
    return;
  }

  // Array of objects → Array of HTML strings (using map(), as we discussed)
  const cardsHTML = movies.map(
    (movie) => `
    <div class="movie-card">
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}" alt="${movie.Title}" />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    </div>
  `,
  );

  moviesContainer.innerHTML = cardsHTML.join("");
}

// ---- Show/hide loading state ----
export function showLoading(isLoading) {
  loadingText.style.display = isLoading ? "block" : "none";
}

// ---- Show error message ----
export function showError(message) {
  moviesContainer.innerHTML = `<p class="error">${message}</p>`;
}
