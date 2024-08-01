const express = require('express');
const app = express();
let PORT = 3000;

function generateProfileUrl(username){
  return "https://github.com/"+ username;
}

function generateCertificate(firstName,lastName,courseName){
  return "This certification is awarded to " + firstName + " " + lastName + " for completing the course " + courseName;
}

function calculateGrade(math,science,english){
  let gradePercentage = ((math + science + english) / 300 * 100).toFixed(2);
  return "Your Grade in percenatge is " + gradePercentage + "%";
}

function splitBill(billAmount,numberOfFriends){
  let splitAmount = billAmount / numberOfFriends;
  return "Result : Each friend ows Rs. " + splitAmount.toFixed(2) + " against the bill";
}

function calculateSalary(totalHours,hourlyWage){
  let monthlySalary = hourlyWage * totalHours;
  return "Result: Your monthly salary is ₹" + monthlySalary;
}

//github-profile
app.get("/github-profile",(req,res) =>{
  let username = req.query.username;
  res.send(generateProfileUrl(username));
})

//certificate
app.get("/certificate",(req,res) =>{
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let courseName = req.query.courseName;
  res.send(generateCertificate(firstName,lastName,courseName));
})

//grade
app.get("/grade",(req,res) =>{
  let math = parseInt(req.query.maths);
  let science = parseInt(req.query.science);
  let english = parseInt(req.query.english);
  res.send(calculateGrade(math,science,english));
})

//split-bill
app.get("/split-bill",(req,res) =>{
  let billAmount = parseFloat(req.query.billAmount);
  let numberOfFriends = parseInt(req.query.numberOfFriends);
  res.send(splitBill(billAmount,numberOfFriends))
  
})

//monthly-salary
app.get("/monthly-salary",(req,res) =>{
  let totalHours = parseFloat(req.query.totalHours);
  let hourlyWage = parseFloat(req.query.hourlyWage);
  res.send(calculateSalary(totalHours,hourlyWage));
})

app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})

