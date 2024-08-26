const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const employee = require('./models/employee.model.js');
const { sequelize } = require('./lib/index.js');
const cors = require('cors');

app.use(express.json());
app.use(cors());

//data
const employees = [
    {
      name: 'John Doe',
      designation: 'Manager',
      department: 'Sales',
      salary: 90000,
    },
    {
      name: 'Anna Brown',
      designation: 'Developer',
      department: 'Engineering',
      salary: 80000,
    },
    {
      name: 'James Smith',
      designation: 'Designer',
      department: 'Marketing',
      salary: 70000,
    },
    {
      name: 'Emily Davis',
      designation: 'HR Specialist',
      department: 'Human Resources',
      salary: 60000,
    },
    {
      name: 'Michael Wilson',
      designation: 'Developer',
      department: 'Engineering',
      salary: 85000,
    },
    {
      name: 'Sarah Johnson',
      designation: 'Data Analyst',
      department: 'Data Science',
      salary: 75000,
    },
    {
      name: 'David Lee',
      designation: 'QA Engineer',
      department: 'Quality Assurance',
      salary: 70000,
    },
    {
      name: 'Linda Martinez',
      designation: 'Office Manager',
      department: 'Administration',
      salary: 50000,
    },
    {
      name: 'Robert Hernandez',
      designation: 'Product Manager',
      department: 'Product',
      salary: 95000,
    },
    {
      name: 'Karen Clark',
      designation: 'Sales Associate',
      department: 'Sales',
      salary: 55000,
    },
  ]

//functions
async function fetchAllEmployees(){
  let result = await employee.findAll();
  return { employees: result };
}

async function addNewEmployee(newEmployee){
  let result = await employee.create(newEmployee);
  return { newEmployee: result };
}

async function updateEmployeeById(id, newEmployeeData){
  let employeeDetails = await employee.findOne({ where : { id } });;
  if(employeeDetails === null){
    return { message : "No employee found"}
  }
  employeeDetails.set(newEmployeeData);
  await employeeDetails.save();
  return { message : "Employee updated successfully", employeeDetails }  
}

async function deleteEmployeeById(id){
  let result = await employee.destroy({ where : { id } });
  if(result === null){
    return { message : "No employee found"}
  }
  return { deletedEmployee : result }
}

//seed data
app.get("/seed_data", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await employee.bulkCreate(employees);
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (err) {
    console.error("Unable to seed data");
    res.status(500).json({ message: err.message });
  }
});

//endpoints
app.get("/", (req, res) =>{
  res.status(200).json({ message: "Welcome to the BD5.3_HW_2 !" });
})
//employees 
app.get("/employees", async (req, res) =>{
  try{
    let result = await fetchAllEmployees();
    if(result.length === 0){
      return res.status(404).json({message : "No employees found"})
    }
    return res.status(200).json(result);
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//employees/new
app.post("/employees/new", async (req, res) =>{
  let newEmployee = req.body.newEmployee;
  try{
    let result = await addNewEmployee(newEmployee);
    if(result.newEmployee === null){
      return res.status(404).json({message : "Unable to create employee"})
    }
    return res.status(200).json({message : "Employee created successfully", result })
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//employees/update/:id
app.post("/employees/update/:id", async (req, res) =>{
  let id = parseInt(req.params.id);
  let newEmployeeData = req.body;
  try{
    let result = await updateEmployeeById(id, newEmployeeData);
    if(result.employee === null){
      return res.status(404).json({message : "No employee found"})
    }
    return res.status(200).json(result)
  }catch(err){
    res.status(500).json({message : err.message})
  }
})

//employees/delete
app.post("/employees/delete", async (req, res) =>{
  let id = parseInt(req.body.id);
  try{
    let result = await deleteEmployeeById(id);
    if(result.employee === null){
      return res.status(404).json({message : "No employee found"})
    }
    return res.status(200).json({'message': 'Employee record deleted successfully'})
  }catch(err){
    res.status(500).json({message : err.message})
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})