const express = require('express')
const app = express()
const PORT = 3000
const { sequelize } = require('./lib/index.js');
const { book } = require("./models/book.model.js")
const { author } = require("./models/author.model.js")

app.use(express.json());

const books = [
    {
      title: "Harry Potter and the Philosopher's Stone",
      genre: "Fantasy",
      publicationYear: 1997,
    },
    { title: "A Game of Thrones", genre: "Fantasy", publicationYear: 1996 },
    { title: "The Hobbit", genre: "Fantasy", publicationYear: 1937 },
  ]

const authors = [
    { name: "J.K Rowling", birthYear: 1965 }
  ]

//functions
async function addNewAuthor(newAuthor){
  let result = await author.create(newAuthor);
  return { newAuthor: result };
}

async function updateAuthorById(id, newAuthorData){
  let authorDetails = await author.findOne({ where : { id } });
  if(authorDetails === null){
    return { message : "No author found"}
  }
  authorDetails.set(newAuthorData);
  await authorDetails.save();
  return { message : "Author updated successfully", authorDetails }  
}


//seed data
app.get("/seed_data", async (req, res) =>{
  try{
    await sequelize.sync({ force: true });
    await book.bulkCreate(books);
    await author.bulkCreate(authors);
    res.status(200).json({ message: "Database seeded successfully" });
  }catch(err){
    console.error("Unable to seed data");
    res.status(500).json({ message: err.message });
  }
})

app.get("/", (req, res) =>{
  res.status(200).json({ message: "Welcome to the BD5.4_HW_1 !" });
})

//authors/new
app.post("/authors/new", async (req, res) =>{
  const newAuthor = req.body.newAuthor;
  try{
    let result = await addNewAuthor(newAuthor);
    if(result.newAuthor === null){
      return res.status(404).json({message : "Unable to create author"})
    }
    return res.status(200).json({message : "Author created successfully", result })
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//authors/update/:id 
app.post("/authors/update/:id", async (req, res) =>{
  const id = parseInt(req.params.id);
  const newAuthorData = req.body;
  try{
    let result = await updateAuthorById(id, newAuthorData);
    if(result === null){
      return res.status(404).json({message : "No author found"})
    }
    return res.status(200).json(result)
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})