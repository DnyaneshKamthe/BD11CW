const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
let db;
app.use(cors());

// Connect to SQLite database
(async () => {
  db = await open({ filename: "database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();



//function 
async function fetchAllRestaurants(){
  let query = "SELECT * FROM restaurants";
  let result = await db.all(query);
  return { restaurants : result }
}

async function fetchRestaurantById(id){
  let query = "SELECT * FROM restaurants WHERE id = ?";
  let result = await db.get(query, [id]);
  return { restaurant : result }
}

async function fetchRestaurantsByCuisine(cuisine){
  let query = "SELECT * FROM restaurants WHERE cuisine = ?";
  let result = await db.all(query, [cuisine]);
  return { restaurants : result }
}

async function fetchRestaurents(isVeg, hasOutdoorSeating, isLuxury){
  let query = "SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?";
  let result = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants : result }
}

async function sortRestaurantsByRating(){
  let query = "SELECT * FROM restaurants ORDER BY rating DESC";
  let result = await db.all(query);
  return { restaurants : result }
}

async function fetchAllDishes(){
  let query = "SELECT * FROM dishes";
  let result = await db.all(query);
  return { dishes : result }
}

async function fetchDisheshById(id){
  let query = "SELECT * FROM dishes WHERE id = ?";
  let result = await db.get(query, [id]);
  return { dishes : result }
}

async function filterDishes(isVeg){
  let query = "SELECT * from dishes where isVeg = ?";
  let result = await db.all(query, [isVeg]);
  console.log(result);
  return { dishes : result }
}

async function sortDishesByPrice(){
  let query = "SELECT * FROM dishes ORDER BY price ASC";
  let result = await db.all(query);
  return { dishes : result }
}

//endpoints
app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4_Assignment1" });
});

//restaurants
app.get("/restaurants", async (req, res) =>{
  try {
    let result = await fetchAllRestaurants();
    if(result.restaurants.length === 0){
      return res.status(404).json({message: "No restaurants found"})
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//restaurants/details/:id
app.get("/restaurants/details/:id", async (req, res) =>{
  let id = parseInt(req.params.id);
  try {
    let result = await fetchRestaurantById(id);
    if(result.restaurant === null){
      return res.status(404).json({message: "No restaurant found"})
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//restaurants/cuisine/:cuisine
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    let result = await fetchRestaurantsByCuisine(cuisine);
    if(result.restaurants.length === 0){
      return res.status(404).json({message: "No restaurants found"})
    }
    return res.status(200).json(result); 
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//restaurants/filter
app.get("/restaurants/filter", async(req,res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;
  try {
    let result = await fetchRestaurents(isVeg, hasOutdoorSeating, isLuxury);
    if(result.restaurants.length === 0){
      return res.status(404).json({message: "No restaurants found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})


//restaurants/sort-by-rating
app.get("/restaurants/sort-by-rating", async (req, res) =>{
  try {
    let result = await sortRestaurantsByRating();
    if(result.restaurants.length === 0){
      return res.status(404).json({message: "No restaurants found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//dishesh
app.get("/dishes", async (req, res) =>{
  try {
    let result = await fetchAllDishes();
    if(result.dishes.length === 0){
      return res.status(404).json({message: "No dishes found"})
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//dishes/details/1
app.get("/dishes/details/:id", async (req, res) =>{
  let id = parseInt(req.params.id);
  try {
    let result = await fetchDisheshById(id);
    if(result.dishes === null){
      return res.status(404).json({message: "No dishes found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//dishes/filter
app.get("/dishes/filter", async (req, res) =>{
  let isVeg = req.query.isVeg;
  console.log(isVeg);
  try {
    let result = await filterDishes(isVeg);
    if(result.dishes.length === 0){
      return res.status(404).json({message: "No dishes found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//dishes/sort-by-price
app.get("/dishes/sort-by-price", async (req, res) =>{
  try {
    let result = await sortDishesByPrice();
    if(result.dishes.length === 0){
      return res.status(404).json({message: "No dishes found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});