const express = require("express");
const app = express();
let PORT = 3000;

//data
let watchList = [
  {
    videoId: 1,
    title: 'JavaScript Tutorial',
    watched: false,
    url: 'https://youtu.be/shorturl1',
  },
  {
    videoId: 2,
    title: 'Node.js Basics',
    watched: true,
    url: 'https://youtu.be/shorturl2',
  },
  {
    videoId: 3,
    title: 'React.js Guide',
    watched: false,
    url: 'https://youtu.be/shorturl3',
  },
];

//functions
function updateWatchedStatusById(watchList, videoId, watched){
  for(let i = 0; i < watchList.length; i++){
    if(watchList[i].videoId === videoId){
      watchList[i].watched = watched;
      break;
    }
  }
  return watchList;
}

function updateAllVideosWatchedStatus(watchList, watched){
  for(let i = 0; i < watchList.length; i++){
    watchList[i].watched = watched;
  }
  return watchList;
}

function shouldDeleteById(ele, videoid){
  return ele.videoId !== videoid;
}

function isWatched(ele){
  return !ele.watched
}

//endpoints
//watchlist/update
app.get("/watchlist/update", (req, res) =>{
  let videoId = parseInt(req.query.videoId);
  let watched = req.query.watched === "true";
  let result = updateWatchedStatusById(watchList, videoId, watched);
  res.json(result);
})

//watchlist/update-all
app.get("/watchlist/update-all", (req, res) =>{
  let watched = req.query.watched === "true";
  let result = updateAllVideosWatchedStatus(watchList, watched);
  res.json({result});
})

//watchlist/delete
app.get("/watchlist/delete", (req, res) =>{
  let videoid = parseInt(req.query.videoId);
  let result = watchList.filter((ele) => shouldDeleteById(ele, videoid));
  res.json({result});
})

//watchlist/delete-watched
app.get("/watchlist/delete-watched", (req, res) =>{
  let result = watchList.filter(ele => isWatched(ele));
  res.json({result});
})

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});