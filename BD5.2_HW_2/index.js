const express = require("express")
const app = express();
const PORT = 3000;

const { sequelize } = require("./lib/index.js");
const { employee } = require("./models/employee.model.js")

let employees =[
  {
    id: 1,
    name: 'Alice',
    salary: 60000,
    department: 'Engineering',
    designation: 'Software Engineer'
  },
  {
    'id': 2,
    'name': 'Bob',
    'salary': 70000,
    'department': 'Marketing',
    'designation': 'Marketing Manager'
  },
  {
    id: 3,
    name: 'Charlie',
    salary: 80000,
    department: 'Engineering',
    designation: 'Senior Software Engineer'
  }
]

// functions
async function fetchAllEmployees(){
  let result = await employee.findAll();
  return { employees  : result }
}

async function fetchEmployeeById(id){
  let result = await employee.findByPk(id);
  return { employee : result }
}

async function fetchEmployeesByDepartment(department){
  let result = await employee.findAll({ where : { department : department }});
  return { employees : result }
}

async function sortEmployeesBySalary(order) {
  let result = await employee.findAll({ order: [['salary', order]] });
  return { employees : result }
}

// seed data
app.get("/seed_db", async (req, res) => {
  try{
    await sequelize.sync({ force: true });
    await employee.bulkCreate(employees);
    res.status(200).json({message : "Database seeded successfully"})
  }catch(err){
    res.status(500).json({message : "Failed to seed data"})
  }
})

//employees 
app.get("/employees", async (req, res) =>{
  try{
    let result = await fetchAllEmployees();
    if(result.length === 0){
      return res.status(404).json({message : "No employees found"})
    }
    res.status(200).json(result)
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//employees/details/:id
app.get("/employees/details/:id", async (req, res) =>{
  let id = parseInt(req.params.id);
  try{
    let result = await fetchEmployeeById(id);
    if(result.employee === null) {
      return res.status(404).json( {message : "No employee found"})
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//employees/department/:department
app.get("/employees/department/:department", async (req, res) =>{
  let department = req.params.department;
  try{
    let result = await fetchEmployeesByDepartment(department);
    if(result.length === 0){
      return res.status(404).json({message : "No employees found"})
    }
    res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//employees/sort/salary
app.get("/employees/sort/salary", async (req, res) =>{
  let order = req.query.order;
  try{
    let result = await sortEmployeesBySalary(order);
    if(result.length === 0){
      return res.status(404).json({message : "No employees found"})
    }
    res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
