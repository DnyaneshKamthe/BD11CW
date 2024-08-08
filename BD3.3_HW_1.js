const express = require("express");
const app = express();
let PORT = 3000;

//data
let watchList = [
  { videoId: 1, title: 'JavaScript Tutorial', watched: false, url: 'https://youtu.be/shorturl1' },
  { videoId: 2, title: 'Node.js Basics', watched: true, url: 'https://youtu.be/shorturl2' },
  { videoId: 3, title: 'React.js Guide', watched: false, url: 'https://youtu.be/shorturl3' }
];

let watchList2 = [
  { videoId: 1, title: 'JavaScript Tutorial', watched: false, url: 'https://youtu.be/shorturl1', isFavorite: false },
  { videoId: 2, title: 'Node.js Basics', watched: true, url: 'https://youtu.be/shorturl2', isFavorite: false },
  { videoId: 3, title: 'React.js Guide', watched: false, url: 'https://youtu.be/shorturl3', isFavorite: false }
];

let tasks = [
  { taskId: 1, title: 'Buy groceries', completed: false },
  { taskId: 2, title: 'Walk the dog', completed: false },
  { taskId: 3, title: 'Do laundry', completed: true }
];

let tasks2 = [
  { taskId: 1, title: 'Buy groceries', completed: false },
  { taskId: 2, title: 'Walk the dog', completed: false },
  { taskId: 3, title: 'Do laundry', completed: true }
];

let books = [
  { bookId: 1, title: '1984', available: true },
  { bookId: 2, title: 'Brave New World', available: true },
  { bookId: 3, title: 'Fahrenheit 451', available: false }
];

//functions
function deleteUnwatchedVideos(video){
  return video.watched;
}

function  markVideoAsFavorite(watchList, videoId, isFavorite){
  for(let i = 0; i < watchList.length; i++){
   if(watchList[i].videoId === videoId){
     watchList[i].isFavorite = isFavorite;
     break
   } 
  }
  return watchList; 
}

function updateTaskStatusById(tasks, taskId, completed){
  for(let i = 0 ; i < tasks.length; i++){
    if(tasks[i].taskId === taskId){
      tasks[i].completed = completed;
      break;
    }
  }
  return tasks;
}

function removeCompletedTasks(task){
  return !task.completed
}

function updateBookAvailabilityById(books, bookId, available){
  for(let i = 0 ; i < books.length; i++){
    if(books[i].bookId === bookId){
      books[i].available = available;
      break;
    }
  }
  return books;
}

//endpoints
//watchlist/delete-unwatched
app.get("/watchlist/delete-unwatched", (req, res) =>{
  let result = watchList.filter(ele => deleteUnwatchedVideos(ele));
  res.json(result);
})

//watchlist/favorite
app.get("/watchlist/favorite", (req, res) =>{
  let videoId = parseInt(req.query.videoId);
  let isFavorite = req.query.isFavorite === "true";
  let result = markVideoAsFavorite(watchList2, videoId, isFavorite);
  res.json(result);
})

//tasks/update
app.get("/tasks/update", (req, res) =>{
  let taskId = parseInt(req.query.taskId);
  let completed = req.query.completed === "true";
  let result = updateTaskStatusById(tasks, taskId, completed);
  res.json(result);
})

///tasks/remove-completed
app.get("/tasks/remove-completed", (req, res) =>{
  let result = tasks2.filter(task => removeCompletedTasks(task));
  res.json(result);
})

//library/update
app.get("/library/update", (req, res) =>{
  let bookId = parseInt(req.query.bookId);
  let available = req.query.available === "true";
  let result = updateBookAvailabilityById(books, bookId, available);
  res.json(result);
})

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});