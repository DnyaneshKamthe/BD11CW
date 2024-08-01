const express = require('express');
const app = express();
let PORT = 3000;

// bmi 
app.get("/bmi",(req,res) => {
  let height = parseFloat(req.query.height);
  let weight = parseFloat(req.query.weight);
  let bmi  = (weight/(height*height)).toString();
  res.send("Your bmi is " + bmi);
})

// checkout price
app.get("/checkout",(req,res) => {
  let product = req.query.product;
  let units = parseFloat(req.query.units);
  let price = parseFloat(req.query.price);
  let totalPrice  = units * price ;
  res.send("Your total price for "+ units + " " + product + " is " + totalPrice);
})

// grade
app.get("/grade",(req,res) => {
  let math = parseFloat(req.query.math);
  let science = parseFloat(req.query.science);
  let english = parseFloat(req.query.english);
  let gradePercentage  = ((math + science + english)/ 300 *100);
  res.send("Your grade percentage is " + gradePercentage + " %");
})

// discounted price
app.get("/discounted-price",(req,res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let discount = parseFloat(req.query.discount);
  let discountedPrice = cartTotal - ( cartTotal * ( discount / 100 ) );
  res.send("Result : Your bill amount is " + discountedPrice);
})

// Split the bill
app.get("/split-bill",(req,res) => {
  let billAmount = parseFloat(req.query.billAmount);
  let numberOfFriends = parseFloat(req.query.numberOfFriends);
  let splitAmount = billAmount / numberOfFriends;
  res.send("Each friend ows Rs. " +splitAmount + " against the bill");
})

// celcius to fahrenheit
app.get("/celsius-to-fahrenheit",(req,res) => {
  let celcius = parseFloat(req.query.temperature);
  let fahrenheit = celcius * 9/5 + 32;
  res.send("Result : " + fahrenheit + " Fahrenheit");
})

// monthly salary
app.get("/monthly-salary",(req,res) => {
  let totalHours = parseFloat(req.query.totalHours);
  let hourlyWage = parseFloat(req.query.hourlyWage);
  let monthlySalary = hourlyWage * totalHours;
  res.send("Your monthly salary is Rs. " + monthlySalary);
})



app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})