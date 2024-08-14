const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
let db;
app.use(cors());

// Connect to SQLite database
(async () => {
  db = await open({ filename: "database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

//functions
async function fetchAllGames(){
  let query = "SELECT * FROM games";
  let result = await db.all(query);
  return { games : result }
}

async function fetchGameById(id){
  let query = "SELECT * FROM games WHERE id = ?";
  let result = await db.get(query, [id]);
  return { game : result } 
}

async function fetchGamesByGenre(genre){
  let query = "SELECT * FROM games WHERE genre = ?";
  let result = await db.all(query, [genre]);
  return { games : result } 
}

async function fetchGamesByPlatform(platform){
  let query = "SELECT * FROM games WHERE platform = ?";
  let result = await db.all(query, [platform]);
  return { games : result } 
}

async function sortGamesByRating(){
  let query = "SELECT * FROM games ORDER BY rating DESC";
  let result = await db.all(query);
  return { games : result }
}

async function fetchAllPlayers(){
  let query = "SELECT * FROM players";
  let result = await db.all(query);
  return { players : result }
}

async function fetchPlayerById(id){
  let query = "SELECT * FROM players WHERE id = ?";
  let result = await db.get(query, [id]);
  return { player : result } 
}

async function sortGPlayersByRating(){
  let query = "SELECT * FROM players ORDER BY rating DESC";
  let result = await db.all(query);
  return { players : result }
}


async function fetchAllTournaments(){
  let query = "SELECT * FROM tournaments";
  let result = await db.all(query);
  return { tournaments : result }
}

async function fetchTournamentById(id){
  let query = "SELECT * FROM tournaments WHERE id = ?";
  let result = await db.get(query, [id]);
  return { tournament : result } 
}

async function fetchTournamentsByGameId(gameId){
  let query = "SELECT * FROM tournaments WHERE gameId = ?";
  let result = await db.all(query, [gameId]);
  return { tournaments : result } 
}

async function sortTournamentsByPrizePool(){
  let query = "SELECT * FROM tournaments ORDER BY prizePool DESC";
  let result = await db.all(query);
  return { tournaments : result }
}

//endpoints
app.get("/", (req, res) =>{
  res.status(200).json({message: "BD4_Assignment2"});
})


//games
app.get("/games", async(req,res) => {
  try{
    let result = await fetchAllGames();
    if(result.games.length === 0){
      return res.status(404).json({message: "No games found"});
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({ message : err.message })
  }
});

//games/details/:id
app.get("/games/details/:id", async (req, res) =>{
  let id = parseInt(req.params.id);
  try{
    let result = await fetchGameById(id);
    if(result.games === null){
      return res.status(404).json({message: "No games found"});
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//games/genre/:genre
app.get("/games/genre/:genre", async (req, res) =>{
  let genre = req.params.genre;
  try{
    let result = await fetchGamesByGenre(genre);
    if(result.games.length === 0){
      return res.status(404).json({message: "No games found"});
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//games/platform/:platform
app.get("/games/platform/:platform", async (req, res) =>{
  let platform = req.params.platform;
  try{
    let result = await fetchGamesByPlatform(platform);
    if(result.games.length === 0){
      return res.status(404).json({message: "No games found"});
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//games/sort-by-rating
app.get("/games/sort-by-rating", async (req, res) =>{
  try{
    let result = await sortGamesByRating();
    if(result.games.length === 0){
      return res.status(404).json({message: "No games found"});
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//players
app.get("/players", async(req,res) =>{
  try{
    let result = await fetchAllPlayers();
    if(result.players.length === 0){
      return res.status(404).json({message: "No players found"});
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({ message : err.message })
  }
})

//players/details/:id
app.get("/players/details/:id", async (req, res) =>{
  let id = parseInt(req.params.id);
  try{
    let result = await fetchPlayerById(id);
    if(result.players === null){
      return res.status(404).json({message: "No players found"});
    }
    return res.status(200).json(result);    
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//players/sort-by-rating
app.get("/players/sort-by-rating", async (req, res) =>{
  try{
    let result = await sortGPlayersByRating();
    if(result.players.length === 0){
      return res.status(404).json({message: "No players found"});
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//tournaments
app.get("/tournaments", async(req,res) =>{
  try{
    let result = await fetchAllTournaments();
    if(result.tournaments.length === 0){
      return res.status(404).json({message: "No tournaments found"});
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({ message : err.message })
  }
})

//tournaments/details/:id
app.get("/tournaments/details/:id", async (req, res) =>{
  let id = parseInt(req.params.id);
  try{
    let result = await fetchTournamentById(id);
    if(result.tournaments === null){
      return res.status(404).json({message: "No tournaments found"});
    }
    return res.status(200).json(result);    
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//tournaments/game/:gameId
app.get("/tournaments/game/:gameId", async (req, res) =>{
  let gameId = parseInt(req.params.gameId);
  try{
      let result = await fetchTournamentsByGameId(gameId);
      if(result.tournaments.length === 0){
      return res.status(404).json({message: "No tournaments found"});
    }
    return res.status(200).json(result);    
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//tournaments/sort-by-prize-pool
app.get("/tournaments/sort-by-prize-pool", async (req, res)=>{
  try{
    let result = await sortTournamentsByPrizePool();
    if(result.tournaments.length === 0){
      return res.status(404).json({message: "No tournaments found"});
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})