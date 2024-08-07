const express = require('express');
const app = express();
let PORT = 3000;

// all data
let ages =  [25, 30, 18, 22, 27];

let students = [
  { "name": "Rahul", "rollNo": 101,"marks": 85 }, 
  { "name": "Sita", "rollNo": 102,"marks": 95 },
  { "name": "Amit", "rollNo": 103, "marks": 70 }
]

let cars = [
  { "make": "Maruti", "model": "Swift", "mileage": 15 },
  { "make": "Hyundai", "model": "i20", "mileage": 18 },
  { "make": "Tata", "model": "Nexon", "mileage": 20 }
]

// all functions
function sortAgesAscending(a,b){
  return a - b;
}

function sortAgesDescending(a,b){
  return b - a;
}

function sortStudentsByMarksDescending(s1, s2){
  return s2.marks - s1.marks;
}

function sortCarsByMileageDescending(c1,c2){
  return c2.mileage - c1.mileage;
}


// all endPoints

//ages/sort-ascending
app.get("/ages/sort-ascending", (req, res) =>{
  let agesCopy = ages.slice();
  let result = agesCopy.sort(sortAgesAscending)
  res.send(result)
})

//ages/sort-descending
app.get("/ages/sort-descending", (req, res) =>{
  let agesCopy = ages.slice();
  let result = agesCopy.sort(sortAgesDescending)
  res.send(result)
})

//students/sort-by-marks-descending
app.get("/students/sort-by-marks-descending", (req, res) =>{
  let studentsCopy = students.slice();
  let result = studentsCopy.sort(sortStudentsByMarksDescending);
  res.send(result);
})

//cars/sort-by-mileage-descending
app.get("/cars/sort-by-mileage-descending", (req, res) =>{
  let carsCopy = cars.slice();
  let result = carsCopy.sort(sortCarsByMileageDescending);
  res.send(result);
})

app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})