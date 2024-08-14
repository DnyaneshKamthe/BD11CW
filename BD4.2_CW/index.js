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

//functions
async function fetchAllMovies(){
  let query = "SELECT * FROM movies";
  let result = await db.all(query,[]);
  return {movies : result};
}

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

//endpoints
app.get("/",(req,res)=>{
  res.status(200).json({message: "Conneced to BD4.2_CW"});
})

//movies
app.get("/movies", async(req,res) => {
  try {
    let result = await fetchAllMovies();
    if(result.movies.length === 0){
      return res.status(404).json({message:"No movies found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

///movies/genre/:genre
app.get("/movies/genre/:genre", async (req, res) =>{
  try {
    let genre = req.params.genre;
    let result = await fetchMovieByGenre(genre);
    if(result.movies.length === 0){
      return res.status(404).json({message: "No movies found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//movies/details/:id
app.get("/movies/details/:id", async (req, res) =>{
 try {
   let id = req.params.id;
   let result = await fetchMovieById(id);
   if(result.movies === null){
     return res.status(404).json({message: "No movies found"});
   }
   return res.status(200).json(result);
 } catch (error) {
   res.status(500).json({message: error.message});
 }
})

//movies/release_year/:year
app.get("/movies/release_year/:year", async (req, res) =>{
 try {
   let releaseYear = req.params.year;
   let result = await fetchMovieByReleaseYear(releaseYear);
   if(result.movies.lenght === 0){
     return res.status(404).json({message: "No movies found"});
   }
   return res.status(200).json(result);
 } catch (error) {
   res.status(500).json({message: error.message});
 }

})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})