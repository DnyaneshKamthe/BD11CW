const express = require('express');
const app = express();
let PORT = 3000;

// number - positive/negative
app.get("/check-number",(req,res) => {
  let number = parseFloat(req.query.number);
  let result = "";
  if(number > 0){
    result = "Positive"
  }else{
    result = "Negative"
  }
  res.send("Number is " + result);
})

//number - even/odd
app.get("/check-even-odd",(req,res)=>{
  let number = parseFloat(req.query.number);
  let result = "";
  if(number%2===0){
    result = "Even";
  }else{
    result = "Odd";
  }
  res.send("Number is " + result);
})


//check - login
app.get("/check-login",(req,res)=>{
  let isLoggedIn = req.query.isLoggedIn ==="true";
  let result = "";
  if(isLoggedIn){
    result = "User is logged in";
  }else{
    result = "User is not logged in";
  }
  res.send(result);
})

// check -discount
app.get("/check-discount",(req,res)=>{
  let age = parseFloat(req.query.age);
  let result;
  if(age > 65){
    result = "Discount applied";
  }else{
    result = "Discount not applied";
  }
  res.send(result);
})


// number-type - positive/negative/zero
app.get("/check-number-type",(req,res) => {
  let number = parseFloat(req.query.number);
  let result = "";
  if(number > 0){
    result = "Positive"
  }else if(number === 0){
    result = "Zero";
  }else{
    result = "Negative"
  }
  res.send("Number is " + result);
})

// check - temperature
app.get("/check-temperature",(req,res) => {
  let temperature = parseFloat(req.query.temperature);
  let result;
  if(temperature < 15){
    result = "cold"
  }else if(temperature <= 25){
    result = "warm";
  }else{
    result = "hot"
  }
  res.send("Temperature is " + result);
})

// check - activity -level
app.get("/check-activity-level",(req,res) => {
  let steps = parseFloat(req.query.steps);
  let result;
  if(steps < 5000){
    result = "low"
  }else if(steps <= 10000){
    result = "moderate";
  }else{
    result = "high"
  }
  res.send("Activity level is " + result);
})

// check-engagement
app.get("/check-engagement",(req,res) => {
  let likes = parseFloat(req.query.likes);
  let result;
  if(likes < 100){
    result = "low"
  }else if(likes <= 500){
    result = "medium";
  }else{
    result = "high"
  }
  res.send("Engagement level is " + result);
})



app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})