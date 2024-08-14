const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "tracks_database.sqlite",
    driver: sqlite3.Database,
  });
})();

//function 
async function fetchAllTracks(){
  let query = "SELECT * FROM tracks";
  let result = await db.all(query,[]);
  return {tracks : result}
}

async function fetchTracksByArtist(artist){
  let query = "SELECT * FROM tracks WHERE artist = ?";
  let result = await db.all(query,[artist]);
  return {tracks : result}
}

async function fetchTracksByGenre(genre){
  let query = "SELECT * FROM tracks WHERE genre = ?";
  let result = await db.all(query,[genre]);
  return {tracks : result}
}

async function fetchTracksByReleaseYear(year){
  let query = "SELECT * FROM tracks WHERE release_year = ?";
  let result = await db.all(query,[year]);
  return { tracks : result }
}

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW2 Template" });
});

// YOUR ENDPOINTS GO HERE

//tracks
app.get("/tracks", async (req, res) =>{
  let result = await fetchAllTracks();
  res.status(200).json(result);
})

//tracks/artist/:artist
app.get("/tracks/artist/:artist", async (req, res) =>{
  let artist = req.params.artist;
  let result = await fetchTracksByArtist(artist);
  res.status(200).json(result);
})

//tracks/genre/:genre
app.get("/tracks/genre/:genre", async (req, res) =>{
  let genre = req.params.genre;
  let result = await fetchTracksByGenre(genre);
  res.status(200).json(result);
})

//tracks/release_year/:year
app.get("/tracks/release_year/:year", async (req, res) =>{
  let year = req.params.year;
  let result = await fetchTracksByReleaseYear(year);
  res.status(200).json(result);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});