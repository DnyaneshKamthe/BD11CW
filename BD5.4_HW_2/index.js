const express = require('express')
const app = express()
const PORT = 3000
const { sequelize } = require('./lib/index.js');
const { course } = require("./models/course.model.js")
const { student } = require("./models/student.model.js")

app.use(express.json())

const courses = [
    { title: 'Math 101', description: 'Basic Mathematics' },
    { title: 'History 201', description: 'World History' },
    { title: 'Science 301', description: 'Basic Sciences' },
]

const students = [
    { name: 'John Doe', age: 24 }
]

//functions
async function addNewStudent(newStudent){
  let result = await student.create(newStudent);
  return { message : "Student created successfully", newStudent: result };
}

async function updateStudentById(id, newStudentData){
  let studentsDetails = await student.findOne({ where : { id } });
  if(!studentsDetails){
    return { message : "No student found"}
  }
  studentsDetails.set(newStudentData);
  let updatedStudent = await studentsDetails.save();
  return { message : "Student updated successfully", updatedStudent }
}

// seed data
app.get("/seed_data", async (req, res) =>{
  try{
    await sequelize.sync({ force: true });
    await course.bulkCreate(courses);
    await student.bulkCreate(students);
    res.status(200).json({ message: "Database seeded successfully" });
  }catch(err){
    console.error("Unable to seed data");
    res.status(500).json({ message: err.message });
  }
})

app.get("/", (req, res) => {
  res.status(200).json({message : "Welcome to the BD5.4_HW_2 !"})
})

//students/new 
app.post("/students/new", async (req, res) =>{
  const newStudent = req.body.newStudent;
  try{
    let result = await addNewStudent(newStudent);
    if(result.newStudent === null){
      return res.status(404).json({message : "Unable to create student"})
    }
    return res.status(200).json(result)
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//students/update/:id
app.post("/students/update/:id", async (req, res) =>{
  const id = parseInt(req.params.id);
  const newStudentData = req.body;
  try{
    let result = await updateStudentById(id, newStudentData);
    if(result === null){
      return res.status(404).json({message : "No student found"})
    }
    return res.status(200).json(result)
  }catch(err){
    res.status(500).json({message : err.message})
  }
})





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
