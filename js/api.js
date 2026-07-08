/*
File: api.js

Responsibility: Handles all API requests.
*/
import { API_KEY, BASE_URL } from "./config.js";

// ---- Closure-based cache ----
function createMovieCache() {
  const cache = {}; // private — cannot access directly from outside

  return {
    get(query) {
      return cache[query.toLowerCase()];
    },
    set(query, data) {
      cache[query.toLowerCase()] = data;
    },
    has(query) {
      return cache.hasOwnProperty(query.toLowerCase());
    },
  };
}

const movieCache = createMovieCache();

// ---- Core fetch function ----
async function fetchMovies(query) {
  const url = `${BASE_URL}?s=${query}&apikey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network error — server did not respond");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error); // e.g. "Movie not found!"
  }

  return data.Search; // just need array not complete object
}

// ---- Cache-wrapped version ----
export async function getMovies(query) {
  if (movieCache.has(query)) {
    console.log("Cache Found:", query);
    return movieCache.get(query);
  }

  console.log("Fetch from API:", query);
  const movies = await fetchMovies(query);
  movieCache.set(query, movies);
  return movies;
}
