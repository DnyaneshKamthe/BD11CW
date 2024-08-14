const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

//functions
async function fetchAllMovies() {
  let query = "SELECT * FROM movies";
  let result = await db.all(query, []);
  return { movies: result };
}

async function filterByActor(actor) {
  let query = "SELECT * FROM movies WHERE actor = ?";
  let result = await db.all(query, [actor]);
  return { movies: result };
}

async function filterByDirector(director) {
  let query = "SELECT * FROM movies WHERE director = ?";
  let result = await db.all(query, [director]);
  return { movies: result };
}

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 CW - SQL Queries & async/await" });
});

// YOUR ENPOINTS GO HERE
//movies
app.get("/movies", async (req, res) => {
  try {
    let result = await fetchAllMovies();
    if (result.movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//movies/actor/:actor
app.get("/movies/actor/:actor", async (req, res) => {
  let actor = req.params.actor;
  try {
    let result = await filterByActor(actor);
    if (result.movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//movies/director/:director
app.get("/movies/director/:director", async (req, res) => {
  let director = req.params.director;
  try {
    let result = await filterByDirector(director);
    if (result.movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
