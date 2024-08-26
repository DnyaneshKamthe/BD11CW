const express = require("express")
const app = express();
const PORT = 3000;

const { sequelize } = require("./lib/index.js");
const { employee } = require("./models/employee.model.js")

let employees = [
  {
    name: 'John Doe',
    department: 'Engineering',
    salary: 85000,
    designation: 'Software Engineer',
  },
  {
    name: 'Jane Smith',
    department: 'Marketing',
    salary: 65000,
    designation: 'Marketing Manager',
  },
  {
    name: 'Alice Johnson',
    department: 'Human Resources',
    salary: 70000,
    designation: 'HR Specialist',
  },
  {
    name: 'Bob Brown',
    department: 'Finance',
    salary: 90000,
    designation: 'Financial Analyst',
  },
  {
    name: 'Chris Davis',
    department: 'Sales',
    salary: 75000,
    designation: 'Sales Executive',
  },
  {
    name: 'Emma Wilson',
    department: 'Customer Support',
    salary: 55000,
    designation: 'Support Specialist',
  },
  {
    name: 'Michael Taylor',
    department: 'IT',
    salary: 80000,
    designation: 'System Administrator',
  },
  {
    name: 'Sophia Martinez',
    department: 'Operations',
    salary: 72000,
    designation: 'Operations Manager',
  },
];

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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
