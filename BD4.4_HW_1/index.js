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

//function 
async function fetchAllCourses(){
  let query = "SELECT * FROM courses";
  let result = await db.all(query);
  return { courses : result }
}

async function fetchCoursesByInstructor(instructor){
  let query = `SELECT * FROM courses WHERE instructor = ?`;
  let result = await db.all(query, [instructor]);
  return { courses : result };
}

async function fetchCoursesByCategory(category){
  let query = `SELECT * FROM courses WHERE category = ?`;
  let result = await db.all(query, [category]);
  return { courses : result };
}

async function fetchCoursesByYear(year){
  let query = `SELECT * FROM courses WHERE release_year = ?`;
  let result = await db.all(query, [year]);
  return { courses : result };
}


//endpoints
app.get("/", (req, res) =>{
  res.status(200).json({message: "Connected to BD4.4_HW_1"});
})

//courses
app.get("/courses", async (req, res) =>{
  try {
    let result = await fetchAllCourses();
    if(result.courses.length === 0){
      return res.status(404).json({message: "No courses found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//courses/instructor/:instructor
app.get("/courses/instructor/:instructor", async (req, res) =>{
  let instructor = req.params.instructor;
  try {
    let result = await fetchCoursesByInstructor(instructor);
    if(result.courses.length === 0){
      return res.status(404).json({message: "No courses found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})


//courses/category/:category
app.get("/courses/category/:category", async (req, res) =>{
  let category = req.params.category;
  try {
    let result = await fetchCoursesByCategory(category);
    if(result.courses.length === 0){
      return res.status(404).json({message: "No courses found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//courses/year/:year
app.get("/courses/year/:year", async (req, res) =>{
  let year = req.params.year;
  try {
    let result = await fetchCoursesByYear(year);
    if(result.courses.length === 0){
      return res.status(404).json({message: "No courses found"});
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});