const express = require('express');
const app = express();
let PORT = 3000;

// check-whole-number
app.get("/check-whole-number",(req,res) => {
  let number = parseFloat(req.query.number);
  let result;
  if(number >= 0){
    result = "whole number"
  }else{
    result = "not a whole number"
  }
  res.send("Number is " + result);
})

// check-equal
app.get("/check-equal",(req,res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);
  let result;
  if(num1 === num2){
    result = "equal"
  }else{
    result = "not equal"
  }
  res.send("Numbers are " + result);
})

// check-active
app.get("/check-active",(req,res) => {
  let isActive = parseFloat(req.query.isActive) === "true";
  let result;
  if(isActive){
    result = "User is active"
  }else{
    result = "User is not active";
  }
  res.send(result);
})

// check-discount
app.get("/check-discount",(req,res) => {
  let cost = parseFloat(req.query.cost);
  let result;
  if(cost > 1000){
    result = "User is eligible for discount";
  }else{
    result = "User is not eligible for discount";
  }
  res.send(result);
})


// check-experience
app.get("/check-experience",(req,res) => {
  let workExperience = parseFloat(req.query.workExperience);
  let result;
  if(workExperience > 0){
    result = "experienced"
  }else if(workExperience < 0){
    result = "non-working";
  }else{
    result = "fresher"
  }
  res.send("Person is " + result);
})

// check-result
app.get("/check-result",(req,res) => {
  let grade = parseFloat(req.query.grade);
  let result;
  if(grade > 80){
    result = "A"
  }else if(grade >= 50){
    result = "B";
  }else{
    result = "fail"
  }
  res.send("The grade is " + result);
})

// check-attendance
app.get("/check-attendance",(req,res) => {
  let attendance = parseFloat(req.query.attendance);
  let result;
  if(attendance < 50){
    result = "low"
  }else if(attendance <= 90){
    result = "moderate";
  }else{
    result = "high";
  }
  res.send("Attendance is " + result);
})

// check-rating
app.get("/check-rating",(req,res) => {
  let stars = parseFloat(req.query.stars);
  let result;
  if(stars < 3){
    result = "low"
  }else if(stars <= 4){
    result = "medium";
  }else{
    result = "high";
  }
  res.send("Rating is " + result);
})


app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})