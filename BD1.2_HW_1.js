const express = require('express');
const app = express();
let PORT = 3000;

// total Marks
app.get("/total-marks",(req,res) => {
  let marks1 = parseFloat(req.query.marks1);
  let marks2 = parseFloat(req.query.marks2);
  let totalMarks = (marks1 + marks2).toString();
  res.send(totalMarks);
})

// total weight
app.get("/total-weight",(req,res) => {
  let weight1 = parseFloat(req.query.weight1);
  let weight2 = parseFloat(req.query.weight2);
  let weight3 = parseFloat(req.query.weight3);
  let totalWeight = (weight1 + weight2 + weight3).toString();
  res.send(totalWeight);
})

//monthlySalary
app.get("/monthly-salary",(req,res) =>{
  let annualSalary = parseFloat(req.query.annualSalary);
  let monthlySalary = (annualSalary / 12 ).toString();
  res.send(monthlySalary);
})

// total pages read per day
app.get("/total-pages",(req,res) =>{
  let pagesPerDay  = parseFloat(req.query.pagesPerDay );
  let days  = parseFloat(req.query.days );
  let totalPages = (pagesPerDay * days ).toString();
  res.send(totalPages);
})

// currency - conversion
app.get("/currency-conversion",(req, res) => {
  let amount = parseFloat(req.query.amount);
  let rateOfExchange = parseFloat(req.query.rateOfExchange);
  let convertedAmount = (amount * rateOfExchange).toString();
  res.send(convertedAmount)
})

//average- sales
app.get("/average-sales",(req,res) =>{
  let sales1 = parseFloat(req.query.sales1);
  let sales2 = parseFloat(req.query.sales2);
  let sales3 = parseFloat(req.query.sales3);
  let avgSales = (sales1 + sales2 + sales3) / 3;
  res.send(avgSales.toString())
})



app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})