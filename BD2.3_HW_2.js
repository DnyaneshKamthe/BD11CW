const express = require("express");
const app = express();
let PORT = 3000;

// all data
let products = [
  { name: "Product A", inStock: true },
  { name: "Product B", inStock: false },
  { name: "Product C", inStock: true },
  { name: "Product D", inStock: false },
];

let users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 17 },
  { name: "Dave", age: 16 },
];

let productPrices = [
  { name: "Product A", price: 50 },
  { name: "Product B", price: 150 },
  { name: "Product C", price: 200 },
  { name: "Product D", price: 90 },
];

let articles = [
  { title: "Article A", wordCount: 400 },
  { title: "Article B", wordCount: 600 },
  { title: "Article C", wordCount: 700 },
  { title: "Article D", wordCount: 300 },
];

let movies = [
  { title: "Movie A", rating: 8.5 },
  { title: "Movie B", rating: 7.0 },
  { title: "Movie C", rating: 9.0 },
  { title: "Movie D", rating: 6.5 },
];

let employees = [
  { name: "Employee A", experience: 3 },
  { name: "Employee B", experience: 6 },
  { name: "Employee C", experience: 10 },
  { name: "Employee D", experience: 2 },
];

// all functions
function filterInStockProducts(product) {
  return product.inStock;
}

function filterAdults(user) {
  return user.age >= 18;
}

function filterExpensiveProducts(product, price) {
  return product.price > price;
}

function filterLongArticles(article, minWords) {
  return article.wordCount > minWords;
}

function filterHighRatedMovies(movie, rating) {
  return movie.rating > rating;
}

// all routes
//in-stock-products
app.get("/in-stock-products", (req, res) => {
  let result = products.filter((product) => filterInStockProducts(product));
  res.json(result);
});

//adult-users
app.get("/adult-users", (req, res) => {
  let result = users.filter((user) => filterAdults(user));
  res.json(result);
});

//expensive-products
app.get("/expensive-products", (req, res) => {
  let price = parseFloat(req.query.price);
  let result = productPrices.filter((product) =>
    filterExpensiveProducts(product, price));
  res.json(result);
});

//long-articles
app.get("/long-articles", (req, res) => {
  let minWords = req.query.minWords;
  let result = articles.filter((article) =>
    filterLongArticles(article, minWords),
  );
  res.json(result);
});

//high-rated-movies
app.get("/high-rated-movies", (req, res) => {
  let rating = parseFloat(req.query.rating);
  let result = movies.filter((movie) => filterHighRatedMovies(movie, rating));
  res.json(result);
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
