const express = require('express');
const app = express();
let PORT = 3000;

let book = {
  title : "The Lord of the Rings",
  author : "J.R.R. Tolkien",
  publicationYear : 1954,
  genre : "Fantasy",
  isAvailable : true,
  stock : 10,  
}

function getFullTitleAndAuthor(book){
  return book.title + " by " + book.author;
}

function getGenreAndAvailability(book){
  return {
    genre : book.genre,
    isAvailable : book.isAvailable
  }
}

function calculateBookAge(book){
  return 2024 - book.publicationYear;
}

function getBookSummary(book){
  return "Title: " + book.title + ", Author: " + book.author + ", Genre: " + book.genre + " Published: " + book.publicationYear;
}

function checkStockAndOrder(book){
  if(book.stock > 0){
    return {status: "In Stock", stock : book.stock};
  }else{
    return {status: "Out of Stock", message : "Order required"};
  }
}


//books
app.get("/book",(req, res) =>{
  res.json(book);
})

//book/fulltitle-author
app.get("/book/fulltitle-author",(req, res) =>{
  let fullTitleAndAuthor = getFullTitleAndAuthor(book);
  res.json(fullTitleAndAuthor);
})

//book/genre-availability
app.get("/book/genre-availability",(req, res) =>{
  let genreAndAvailability = getGenreAndAvailability(book);
  res.json(genreAndAvailability);
})

//book/age
app.get("/book/age",(req,res) => {
  let bookAge = calculateBookAge(book);
  res.json({age:bookAge})
})

//book/summary
app.get("/book/summary",(req,res) =>{
  let bookSummery = getBookSummary(book);
  res.json({summery : bookSummery});
})

//book/stock-status
app.get("/book/stock-status",(req,res) =>{
  let stockStatus  = checkStockAndOrder(book);
  res.json(stockStatus);
})


app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})
