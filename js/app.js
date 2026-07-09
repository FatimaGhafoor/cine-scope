/*
File: app.js
Responsibility: Coordinator — connects api.js and ui.js.
User input does not come here directly; it comes from events.js.
*/

import { getMovies } from "./api.js";
import { renderMovies, showLoading, showError } from "./ui.js";
import "./events.js";

export async function handleSearch(query) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    showError("Please enter a movie name.");
    return;
  }

  showLoading(true);

  try {
    const movies = await getMovies(trimmedQuery);
    renderMovies(movies);
  } catch (error) {
    showError(error.message);
  } finally {
    showLoading(false);
  }
}
