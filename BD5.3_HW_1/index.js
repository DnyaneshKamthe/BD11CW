const express = require("express");
const app = express();
const PORT = 3000;

const { sequelize } = require("./lib/index.js");
const post = require("./models/post.model.js");
app.use(express.json())

const posts = [
  {
    title: "Getting Started with Node.js",
    content:
      "This post will guide you through the basics of Node.js and how to set up a Node.js project.",
    author: "Alice Smith",
  },
  {
    title: "Advanced Express.js Techniques",
    content:
      "Learn advanced techniques and best practices for building applications with Express.js.",
    author: "Bob Johnson",
  },
  {
    title: "ORM with Sequelize",
    content:
      "An introduction to using Sequelize as an ORM for Node.js applications.",
    author: "Charlie Brown",
  },
  {
    title: "Boost Your JavaScript Skills",
    content:
      "A collection of useful tips and tricks to improve your JavaScript programming.",
    author: "Dana White",
  },
  {
    title: "Designing RESTful Services",
    content: "Guidelines and best practices for designing RESTful APIs.",
    author: "Evan Davis",
  },
  {
    title: "Mastering Asynchronous JavaScript",
    content:
      "Understand the concepts and patterns for writing asynchronous code in JavaScript.",
    author: "Fiona Green",
  },
  {
    title: "Modern Front-end Technologies",
    content:
      "Explore the latest tools and frameworks for front-end development.",
    author: "George King",
  },
  {
    title: "Advanced CSS Layouts",
    content: "Learn how to create complex layouts using CSS Grid and Flexbox.",
    author: "Hannah Lewis",
  },
  {
    title: "Getting Started with React",
    content: "A beginner's guide to building user interfaces with React.",
    author: "Ian Clark",
  },
  {
    title: "Writing Testable JavaScript Code",
    content:
      "An introduction to unit testing and test-driven development in JavaScript.",
    author: "Jane Miller",
  },
];

//functions
async function fetchAllPosts() {
  let result = await post.findAll();
  return { posts: result };
}

async function createNewPost(newPost) {
  let result = await post.create(newPost);
  return { post: result };
}

async function updatePostById(id, newPostData){
  let postDetails = await post.findOne({ where : { id } });
  if(postDetails === null){
    return { message : "No post found"}
  }
  postDetails.set(newPostData);
  let updatedPostData = await postDetails.save();
  return { message : "Post updated successfully", updatedPostData }
}

async function deletePostById(id) {
  let result = await post.destroy({ where : { id } });
  if(result === null){
    return { message : "No post found"}
  }
  return { deletedPost : result }
}
//endpoints
app.get("/seed_data", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await post.bulkCreate(posts);
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (err) {
    console.error("Unable to seed data");
    res.status(500).json({ message: err.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the BD5.3_HW_1 !" });
});

///posts
app.get("/posts", async (req, res) => {
  try {
    let result = await fetchAllPosts();
    if (result.posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch posts" });
  }
});

//posts/new
app.post("/posts/new", async (req, res) => {
  let newPost = req.body.newPost;
  try {
    let result = await createNewPost(newPost);
    if (result.post === null) {
      return res.status(404).json({ message: "Unable to create post" });
    }
    return res
      .status(200)
      .json({ message: "Post created Successfully", result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//posts/update/:id
app.post("/posts/update/:id", async (req, res) =>{
  let id = parseInt(req.params.id);
  let newPostData = req.body;
  try{
    let result = await updatePostById(id, newPostData);
    if(result.post === null){
      return res.status(404).json({message : "No post found"})
    }
    return res.status(200).json(result);    
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

///posts/delete
app.post("/posts/delete/", async (req, res) =>{
  let id = parseInt(req.body.id);
  try{
    let result = await deletePostById(id);
    if(result.post === null){
      return res.status(404).json({message : "No post found"})
    }
    return res.status(200).json({'message': 'Post record deleted successfully'})
  }catch(err){
    res.status(500).json({message : err.message})
  }
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
