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
  try {
    let result = await fetchAllBooks();
    if(result.books.length === 0){
      return res.status(404).json({ message: "No books found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

//books/author/:author
app.get("/books/author/:author", async(req,res) =>{
  try {
    let author = req.params.author;
    let result = await fetchBooksByAuthor(author);
    if(result.books.length === 0){
      return res.status(404).json({ message: "No books found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

//books/genre/:genre
app.get("/books/genre/:genre", async(req,res) =>{
 try {
   let genre = req.params.genre;
   let result = await fetchBooksByGenre(genre);
   if(result.books.length === 0){
     return res.status(404).json({ message: "No books found" });
   }
   return res.status(200).json(result);
 } catch (error) {
   res.status(500).json({ error: error.message });
 }
})

//books/publication_year/:year
app.get("/books/publication_year/:year", async(req,res) =>{
  try {
    let year = req.params.year;
    let result = await fetchBooksByYear(year);
    if(result.books.length === 0){
      return res.status(404).json({ message: "No books found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });  
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
