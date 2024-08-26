const express = require("express");
const app = express();
const { sequelize } = require("./lib/index.js");
const { track } = require("./models/track.model.js");
const { release } = require("os");

const PORT = process.env.PORT || 3000;

let movies = [
  {
    name: 'Raabta',
    genre: 'Romantic',
    release_year: 2012,
    artist: 'Arijit Singh',
    album: 'Agent Vinod',
    duration: 4,
  },
  {
    name: 'Naina Da Kya Kasoor',
    genre: 'Pop',
    release_year: 2018,
    artist: 'Amit Trivedi',
    album: 'Andhadhun',
    duration: 3,
  },
  {
    name: 'Ghoomar',
    genre: 'Traditional',
    release_year: 2018,
    artist: 'Shreya Ghoshal',
    album: 'Padmaavat',
    duration: 3,
  },
  {
    name: 'Bekhayali',
    genre: 'Rock',
    release_year: 2019,
    artist: 'Sachet Tandon',
    album: 'Kabir Singh',
    duration: 6,
  },
  {
    name: 'Hawa Banke',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Darshan Raval',
    album: 'Hawa Banke (Single)',
    duration: 3,
  },
  {
    name: 'Ghungroo',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'War',
    duration: 5,
  },
  {
    name: 'Makhna',
    genre: 'Hip-Hop',
    release_year: 2019,
    artist: 'Tanishk Bagchi',
    album: 'Drive',
    duration: 3,
  },
  {
    name: 'Tera Ban Jaunga',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Tulsi Kumar',
    album: 'Kabir Singh',
    duration: 3,
  },
  {
    name: 'First Class',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 4,
  },
  {
    name: 'Kalank Title Track',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 5,
  },
]


//function 
async function fetchAllTracks(){
  let result = await track.findAll();
  return { tracks : result }
}

async function fetchTrackById(id){
  let result = await track.findByPk(id);
  return { track : result }
}

async function fetchTracksByArtist(artist){
  let result = await track.findAll({ where : { artist : artist }});
  return { tracks : result }
}

async function sortTracksByReleaseYear(order){
  let result = await track.findAll({ order: [['release_year', order]] });
  return { tracks : result }
}

// db seeder api
app.get("/seed_db", async (req, res) => {
  try{
    await sequelize.sync({ force: true });
    await track.bulkCreate(movies);
    res.status(200).json({message : "Database seeded successfully"})
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//tracks 
app.get("/tracks", async (req, res) =>{
  try{
    const result = await fetchAllTracks();
    if(result.tracks.length === 0){
      return res.status(404).json({message : "No tracks found"})
    }
    res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//tracks/details/:id
app.get("/tracks/details/:id", async (req, res) =>{
  let id = parseInt(req.params.id);
  try{
    let result = await fetchTrackById(id);
    if(result.track === null){
      return res.status(404).json({message : "No track found"})
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//tracks/artist/:artist
app.get("/tracks/artist/:artist", async (req, res) =>{
  let artist = req.params.artist;
  try{
    let result = await fetchTracksByArtist(artist);
    if(result.tracks.length === 0){
      return res.status(404).json({message : "No tracks found"})
    }
    res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//tracks/sort/release_year
app.get("/tracks/sort/release_year", async (req, res) =>{
  let order = req.query.order;
  try{
    let result = await sortTracksByReleaseYear(order);
    if(result.tracks.length === 0){
      return res.status(404).json({message : "No tracks found"})
    }
    res.status(200).json(result)
  }catch(err){
    return res.status(500).json({message : err.message})
  }
})



app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})