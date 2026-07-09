/*
File: events.js
Responsibility: Listen for user interactions and forward them to app.js.
No business logic lives here.
*/

import { handleSearch } from "./app.js";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// ---- Button click ----
searchBtn.addEventListener("click", () => {
  handleSearch(searchInput.value);
});

// ---- Enter key press (accessibility/UX improvement) ----
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch(searchInput.value);
  }
});
