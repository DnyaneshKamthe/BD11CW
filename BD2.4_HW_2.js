const express = require('express');
const app = express();
let PORT = 3000;

// all data
let books = [
   { title: 'Moby Jonas', author: 'Herman Melville', publication_year: 2023 },
   { title: '1984', author: 'George Orwell', publication_year: 1984 },
   { title: 'A Tale of Two Cities', author: 'Charles Jonas', publication_year: 2000 },
];

let employees = [
  { "name": "John", "salary": 75000 },
  { "name": "Jane", "salary": 50000 },
  { "name": "Doe", "salary": 30000 }
];

let products = [
  { "name": "Product C", "price": 10 },
  { "name": "Product A", "price": 15 }, 
  { "name": "Product B", "price": 25 }
];

let movies = [
  {"title": "Movie A", "rating": 9.0 }, 
  {"title": "Movie B", "rating": 8.5 }, 
  {"title": "Movie C", "rating": 7.0 }
]

//all funtions
function sortBooksByYear(book1,book2){
  return book1.publication_year - book2.publication_year;
}

function sortEmployeesBySalary(emp1,emp2){
  return emp2.salary - emp1.salary;
}

function sortProductsByPrice(prod1,prod2){
  return prod1.price - prod2.price;
}

function sortMoviesByRating(movie1,movie2){
  return movie2.rating - movie1.rating;
}
// all endPoints

//books/sort-by-year
app.get("/books/sort-by-year",(req, res) => {
  let booksCopy = books.slice();
  let result = booksCopy.sort(sortBooksByYear);
  res.send(result);
})

//employees/sort-by-salary
app.get("/employees/sort-by-salary",(req, res) => {
  let employeesCopy = employees.slice();
  let result = employeesCopy.sort(sortEmployeesBySalary);
  res.send(result);
})

//products/sort-by-price
app.get("/products/sort-by-price",(req, res) =>{
  let productsCopy = products.slice();
  let result = productsCopy.sort(sortProductsByPrice);
  res.send(result);
})

//movies/sort-by-rating
app.get("/movies/sort-by-rating",(req, res) =>{
  let moviesCopy = movies.slice();
  let result = moviesCopy.sort(sortMoviesByRating);
  res.send(result);
})


app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})
