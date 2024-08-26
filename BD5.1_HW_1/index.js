const express = require("express");
const app = express();
const { sequelize } = require("./lib/index.js");
const { post } = require("./models/post.model.js");


const PORT = process.env.PORT || 3000;

let foods = [
  {
    name: 'Margherita Pizza',
    type: 'Italian',
    origin: 'Italy',
    calories: 270,
    cooking_time: 15, // in minutes
  },
  {
    name: 'Cheeseburger',
    type: 'American',
    origin: 'USA',
    calories: 300,
    cooking_time: 10, // in minutes
  },
  {
    name: 'Chicken Biryani',
    type: 'Indian',
    origin: 'India',
    calories: 400,
    cooking_time: 40, // in minutes
  },
  {
    name: 'Pad Thai',
    type: 'Thai',
    origin: 'Thailand',
    calories: 350,
    cooking_time: 25, // in minutes
  },
  {
    name: 'Croissant',
    type: 'French',
    origin: 'France',
    calories: 230,
    cooking_time: 20, // in minutes
  },
  {
    name: 'Peking Duck',
    type: 'Chinese',
    origin: 'China',
    calories: 450,
    cooking_time: 60, // in minutes
  },
  {
    name: 'Sushi',
    type: 'Japanese',
    origin: 'Japan',
    calories: 200,
    cooking_time: 30, // in minutes
  },
  {
    name: 'Tacos',
    type: 'Mexican',
    origin: 'Mexico',
    calories: 150,
    cooking_time: 10, // in minutes
  },
  {
    name: 'Paella',
    type: 'Spanish',
    origin: 'Spain',
    calories: 320,
    cooking_time: 50, // in minutes
  },
  {
    name: 'Falafel',
    type: 'Middle Eastern',
    origin: 'Lebanon',
    calories: 300,
    cooking_time: 15, // in minutes
  },
];

// db seeder api
app.get("/seed_db", async (req, res) => {
  try{
    await sequelize.sync({ force: true });
    await post.bulkCreate(foods);

    res.status(200).json({message : "Database seeded successfully"})
  }catch(err){
    res.status(500).json({message : err.message})
  }
})



app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})