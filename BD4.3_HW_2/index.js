const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database,
  });
})();
//functions
async function filterByCuisine(cuisine){
  const query = `SELECT * FROM recipes WHERE cuisine = ?`;
  const result = await db.all(query, [cuisine]);
  return {recipes: result};
}

async function filterByMainIngredient(ingredient){
  let query = `SELECT * FROM recipes WHERE main_ingredient = ?`;
  let result = await db.all(query, [ingredient]);
  return {recipes: result};
}

async function filterByPreparationTime(preparation_time){
  let query = "SELECT * FROM recipes WHERE preparation_time = ?";
  let result = await db.all(query, [preparation_time]);
  return {recipes: result};
}

async function filterByDifficulty(difficulty){
  let query = "SELECT * FROM recipes WHERE difficulty = ?";
  let reult = await db.all(query, [difficulty]);
  return {recipes: result};
}

async function filterByVegetarian(vegetarian){
  let query = "SELECT * FROM recipes WHERE vegetarian = ?";
  let result = await db.all(query, [vegetarian]);
  return {recipes: result};
}

//endpoints
app.get("/", (req, res) =>{
  res.status(200).json({message: "Connected to BD4.3_HW_2"});
})

//recipes/cuisine/:cuisine
app.get("/recipes/cuisine/:cuisine", async (req, res) =>{
  let cuisine = req.params.cuisine;
  try {
    let result = await filterByCuisine(cuisine);
    if(result.recipes.length === 0){
      return res.status(404).json({message: "No recipes found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//recipes/main_ingredient/:main_ingredient
app.get("/recipes/main_ingredient/:main_ingredient", async (req, res) =>{
  let main_ingredient = req.params.main_ingredient;
  try {
    let result = await filterByMainIngredient(main_ingredient);
    if(result.recipes.length === 0){
      return res.status(404).json({message: "No recipes found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});


//recipes/preparation_time/:preparation_time
app.get("/recipes/preparation_time/:preparation_time", async (req, res) => {
  let preparation_time = req.params.preparation_time;
  try {
    let result = await filterByPreparationTime(preparation_time);
    if(result.recipes.length === 0){
      return res.status(404).json({message: "No recipes found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//recipes/difficulty/:difficulty
app.get("/recipes/difficulty/:difficulty", async(req,res) => {
  let difficulty = req.params.difficulty;
  try {
    let result = await filterByDifficulty(difficulty);
    if(result.recipes.length === 0){
      return res.status(404).json({message: "No recipes found"})
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//recipes/vegetarian/:vegetarian
app.get("/recipes/vegetarian/:vegetarian", async (req, res) =>{
  let vegetarian = req.params.vegetarian;
  try {
    let result = await filterByVegetarian(vegetarian);
    if(result.recipes.length === 0){
      return res.status(404).json({message: "No recipes found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});