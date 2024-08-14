const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database,
  });
})();

//function 
async function fetchAllArtworks(){
  let query = "SELECT * FROM artworks";
  let result = await db.all(query);
  return {artworks : result}
}

async function fetchArtworksByArtist(artist){
  let query = "SELECT * FROM artworks WHERE artist = ?";
  let result = await db.all(query, [artist]);
  return {artworks : result}
}

async function fetchArtworksByYear(year){
  let query = "SELECT * FROM artworks WHERE year = ?";
  let result = await db.all(query, [year]);
  return {artworks : result}
}

async function fetchArtworksByMedium(medium){
  let query = "SELECT * FROM artworks WHERE medium = ?";
  let result = await db.all(query, [medium]);
  return {artworks : result}
}

//endpoints
app.get("/", (req, res) =>{
  res.status(200).json({message: "Connected to BD4.4_HW_2"});
})

//artworks
app.get("/artworks", async (req, res) =>{
  try {
    let result = await fetchAllArtworks();
    if(result.artworks.length === 0){
      return res.status(404).json({message: "No artworks found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
})


//artworks/artist/:artist
app.get("/artworks/artist/:artist", async (req, res) =>{
  let artist = req.params.artist;
  try {
    let result = await fetchArtworksByArtist(artist);
    if(result.artworks.length === 0){
      return res.status(404).json({message: "No artworks found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

//artworks/year/:year
app.get("/artworks/year/:year", async (req, res) =>{
  let year = req.params.year;
  try {
    let result = await fetchArtworksByYear(year);
    if(result.artworks.length === 0){
      return res.status(404).json({message: "No artworks found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//artworks/medium/:medium
app.get("/artworks/medium/:medium", async (req, res) =>{
  let medium = req.params.medium;
  try {
    let result = await fetchArtworksByMedium(medium);
    if(result.artworks.length === 0){
      return res.status(404).json({message: "No artworks found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});