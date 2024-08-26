const express = require("express");
const app = express();
const { sequelize } = require("./lib/index.js");
const { post } = require("./models/post.model.js");


const PORT = process.env.PORT || 3000;

let posts = [
    {
      id: 1,
      name: 'Post1',
      author: 'Author1',
      content: 'This is the content of post 1',
      title: 'Title1'
    },
    {
            'id': 2,
            'name': 'Post2',
            'author': 'Author2',
            'content': 'This is the content of post 2',
            'title': 'Title2'
    },
    {
      id: 3,
      name: 'Post3',
      author: 'Author1',
      content: 'This is the content of post 3',
      title: 'Title3'
    }
]

//functions
 async function fetchAllPosts(){
   let result = await post.findAll();
   return { posts : result }
 }

async function fetchPostById(id){
  let result = await post.findByPk(id);
  return { post : result }
}

async function fetchPostsByAuthor(author){
  let result = await post.findAll({ where : { author : author }});
  return { posts : result }
}

async function sortPostsByName(order){
  let result = await post.findAll({ order : [['name', order]] })
  return { posts : result }
}

// db seeder api
app.get("/seed_db", async (req, res) => {
  try{
    await sequelize.sync({ force: true });
    await post.bulkCreate(posts);
    res.status(200).json({message : "Database seeded successfully"})
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//posts 
app.get("/posts", async (req, res) =>{
  try{
    let result = await fetchAllPosts();
    if(result.posts.length === 0){
      return res.status(404).json({message : "No posts found"})
    }
    res.status(200).json(result)
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//posts/details/:id
app.get("/posts/details/:id", async (req, res) =>{
  let id = parseInt(req.params.id);
  try{
    let result = await fetchPostById(id);
    if(result.post === null){
      return res.status(404).json({message : "No post found"})
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//posts/author/:author
app.get("/posts/author/:author", async (req, res) =>{
  let author = req.params.author;
  try{
    let result = await fetchPostsByAuthor(author);
    if(result.length === 0){
      return res.status(404).json({message : "No posts found"})
    }
    res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//posts/sort/name
app.get("/posts/sort/name", async (req, res) =>{
  let order = req.query.order;
  try{
    let result = await sortPostsByName(order);
    if(result.posts.length === 0){
      return res.status(404).json({message : "No posts found"})
    }
    return res.status(200).json(result)
  }catch(err){
    res.status(500).json({message : err.message})
  }
})




app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})