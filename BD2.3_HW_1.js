const express = require('express');
const app = express();
let PORT = 3000;

// all data
let employess = [{ name: "Rahul Gupta", department: "HR", salary: 50000 },
                { name: "Sneha Sharma", department: "Finance", salary: 60000 },
                { name: "Priya Singh", department: "Marketing", salary: 55000 },
                { name: "Amit Kumar", department: "IT", salary: 65000 }];

let bikes = [{ make: "Hero", model: "Splendor", mileage: 80 },
            { make: "Bajaj", model: "Pulsar", mileage: 60 },
            { make: "TVS", model: "Apache", mileage: 70 }];

let songs = [{ title: "Tum Hi Ho", genre: "Romantic", rating: 4 },
            { title: "Senorita", genre: "Pop", rating: 5 },
            { title: "Dil Chahta Hai", genre: "Bollywood", rating: 3 }];

let tasks = [{ taskId: 1, taskName: "Prepare Presentation", status: "pending" },
            { taskId: 2, taskName: "Attend Meeting", status: "in-progress" },
            { taskId: 3, taskName: "Submit Report", status: "completed" }];


// all functions
function filterByDepartment(employee,department){
  return employee.department === department;
}

function filterByMileage(bike,minMileage){
  return bike.mileage > minMileage;
}

function filterByMake(bike,make){
  return bike.make === make;
}

function filterByRating(song,minRating){
  return song.rating > minRating;
}

function filterByGenre(song,genre){
  return song.genre === genre;
}

function filterByStatus(task,status){
  return task.status === status;
}

//employees/department/:department
app.get("/employees/department/:department", (req, res) =>{
  let department = req.params.department;
  let result = employess.filter(employee => filterByDepartment(employee,department));
  res.json(result)
})

//bikes/mileage/:minMileage
app.get("/bikes/mileage/:minMileage", (req, res) =>{
  let minMileage = req.params.minMileage;
  let result = bikes.filter(bike => filterByMileage(bike,minMileage));
  res.json(result);
})

//bikes/make/:make 
app.get( "/bikes/make/:make", (req, res) =>{
  let make = req.params.make;
  let result = bikes.filter(bike => filterByMake(bike,make));
  res.json(result);
})

//songs/rating/:minRating
app.get( "/songs/rating/:minRating",(req, res) =>{
  let minRating = parseInt(req.params.minRating);
  let result = songs.filter(song => filterByRating(song,minRating));
  res.json(result);
})

//songs/genre/:genre
app.get("/songs/genre/:genre", (req, res) =>{
  let genre = req.params.genre;
  let result = songs.filter(song => filterByGenre(song,genre));
  res.json(result)
})

//tasks/status/:status
app.get("/tasks/status/:status", (req, res) =>{
  let status = req.params.status;
  let result = tasks.filter(task => filterByStatus(task,status));
  res.json(result)
})

app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})