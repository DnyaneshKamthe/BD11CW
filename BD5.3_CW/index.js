const express = require("express");
const app = express();
const { track } = require("./models/track.model")
const { sequelize } = require("./lib/index.js");
app.use(express.json())

const PORT = 3000;

let tracks = [
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

//functions
async function fetchAllTracks(){
  let result = await track.findAll();
  return { tracks  : result }
}

async function addNewTrack(newTrack){
  let result = await track.create(newTrack);
  return { track : result }
}

async function updateTrackById(id, newTrackData){
  let trackDetails = await track.findOne({ where : { id } });
  if(trackDetails === null){
    return { message : "No track found"}
  }
  trackDetails.set(newTrackData);
  let updatedTrackData = await trackDetails.save();
  return { message : "Track updated successfully", updatedTrackData }
}

async function deleteTrackById(id){
  let trackDetails = await track.findOne({ where : { id } });
  if(!trackDetails){
    return { message : "No track found"}
  }
  let deletedTrack = await trackDetails.destroy();
  return { deletedTrack }
}

// seed data
app.get("/seed_db", async (req, res) =>{
  try{
    await sequelize.sync({ force: true });
    await track.bulkCreate(tracks);
    res.status(200).json({message : "Database seeded successfully"})
  }catch(err){
    res.status(500).json({message : "Failed to seed data"})
  }
})

//tracks
app.get("/tracks", async (req, res) =>{
  try{
    let result = await fetchAllTracks();
    if(result.length === 0){
      return res.status(404).json({message : "No tracks found"})
    }
    res.status(200).json(result)
  }catch(err){
    res.status(500).json({message : err.message})
  }
});

//tracks/new
app.post("/tracks/new", async (req, res) =>{
  let newTrack = req.body.newTrack;
  try{
    let result = await addNewTrack(newTrack);
    if(result.track.length === 0){
      return res.status(404).json({message : "No tracks found"})
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//tracks/update/:id
app.post("/tracks/update/:id", async (req, res) =>{
  let id = parseInt(req.params.id);
  let newTrackData = req.body;
  try{
    let result = await updateTrackById(id, newTrackData);
    if(result.track === null){
      return res.status(404).json({message : "No track found"})
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : "Failed to update track"})
  }
})

//tracks/delete
app.post("/tracks/delete/", async (req, res) => {
  let id = parseInt(req.body.id); 
  try {
    let result = await deleteTrackById(id);
    if (result.track === null) {
      return res.status(404).json({ message: "No track found" });
    }
    return res.status(200).json({ message: "Track deleted successfully", result });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete track" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})