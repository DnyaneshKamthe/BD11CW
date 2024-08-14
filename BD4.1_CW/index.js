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
async function fetchAllMovies(){
  let query = "SELECT * FROM movies";
  let result = await db.all(query,[]);
  return {movies : result}
}

async function fetchMovieByGenre(genre){
  let query = "SELECT * FROM movies WHERE genre = ?";
  let result = await db.all(query,[genre]);
  return { movies : result};
}

async function fetchMovieById(id){
  let query = "SELECT * from movies where id = ?";
  let result = await db.get(query,[id]);
  return { movies: result};
}

async function fetchMovieByReleaseYear(releaseYear){
  let query = "SELECT * FROM movies WHERE release_year = ?";
  let result = await db.all(query,[releaseYear]);
  return { movies : result};
}

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 CW - SQL Queries & async/await" });
});

// YOUR ENPOINTS GO HERE
//movies
app.get("/movies", async (req, res) =>{
  let result = await fetchAllMovies();
  res.status(200).json(result);
})

///movies/genre/:genre
app.get("/movies/genre/:genre", async (req, res) =>{
  let genre = req.params.genre;
  let result = await fetchMovieByGenre(genre);
  res.status(200).json(result);
})

//movies/details/:id
app.get("/movies/details/:id", async (req, res) =>{
  let id = req.params.id;
  let result = await fetchMovieById(id);
  res.status(200).json(result);
})

//movies/release_year/:year
app.get("/movies/release_year/:year", async (req, res) =>{
  let releaseYear = req.params.year;
  let result = await fetchMovieByReleaseYear(releaseYear);
  res.status(200).json(result);

})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
