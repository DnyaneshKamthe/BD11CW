const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "books_database.sqlite",
    driver: sqlite3.Database,
  });
})();

//functions
async function fetchAllBooks(){
  let query = "SELECT * from books";
  let result = await db.all(query,[]);
  return { books : result }
}

async function fetchBooksByAuthor(author){
  let query = "SELECT * from books WHERE author = ?";
  let result = await db.all(query,[author]);
  return { books : result };
}

async function fetchBooksByGenre(genre){
  let query = "SELECT * from books WHERE genre = ?";
  let result = await db.all(query,[genre]);
  return { books : result };
}

async function fetchBooksByYear(year){
  let query = "SELECT * from books WHERE publication_year = ?";
  let result = await db.all(query,[year]);
  return { books : result };
}

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW1 Template" });
});

// YOUR ENDPOINTS GO HERE
//books
app.get("/books", async(req,res) => {
  let result = await fetchAllBooks();
  res.status(200).json(result);
})

//books/author/:author
app.get("/books/author/:author", async(req,res) =>{
  let author = req.params.author;
  let result = await fetchBooksByAuthor(author);
  res.status(200).json(result);
})

//books/genre/:genre
app.get("/books/genre/:genre", async(req,res) =>{
  let genre = req.params.genre;
  let result = await fetchBooksByGenre(genre);
  res.status(200).json(result);
})

//books/publication_year/:year
app.get("/books/publication_year/:year", async(req,res) =>{
  let year = req.params.year;
  let result = await fetchBooksByYear(year);
  res.status(200).json(result);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
