const express = require('express');
const app = express();
let PORT = 3000;

// all data
let heights = [160, 175, 180, 165, 170];

let employees = [
  { name: "Rahul", employeeId: 101, salary: 50000 },
  { name: "Sita", employeeId: 102, salary: 60000 },
  { name: "Amit", employeeId: 103, salary: 45000 }
];

let books = [
  { title: "The God of Small Things", author: "Arundhati Roy", pages: 340 }, 
  { title: "The White Tiger", author: "Aravind Adiga", pages: 321 },
  { title: "The Palace of Illusions", author: "Chitra Banerjee", pages: 360 }
]

//all funtions
function sortHeightsAscending(height1,height2){
  return height1 - height2;
}

function sortHeightsDescending(height1,height2){
  return height2 - height1;
}

function sortEmployeesBySalaryDescending(employee1,employee2){
  return employee2.salary - employee1.salary;
}

function sortBooksByPagesAscending(book1,book2){
  return book1.pages - book2.pages;
}

// all endPoints

//heights/sort-ascending
app.get("/heights/sort-ascending", (req, res) =>{
  let heightsCopy = heights.slice();
  let result = heightsCopy.sort(sortHeightsAscending);
  res.send(result);
})

//heights/sort-descending
app.get("/heights/sort-descending", (req, res) =>{
  let heightsCopy = heights.slice();
  let result = heightsCopy.sort(sortHeightsDescending);
  res.send(result);
})

//employees/sort-by-salary-descending
app.get("/employees/sort-by-salary-descending", (req, res) =>{
  let employeesCopy = employees.slice();
  let result = employeesCopy.sort(sortEmployeesBySalaryDescending);
  res.send(result);
})

//books/sort-by-pages-ascending
app.get("/books/sort-by-pages-ascending", (req, res) =>{
  let booksCopy = books.slice();
  let result = booksCopy.sort(sortBooksByPagesAscending);
  res.send(result);
})


app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})