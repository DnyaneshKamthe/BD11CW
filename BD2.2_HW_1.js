const express = require('express');
const app = express();
let PORT = 3000;

function filterHighTemperatures(temp){
  return temp > 25;
}

function filterLowPrices(price){
  return price <= 100;
}

function filterHighRatings(rating){
  return rating >= 3.5;
}

function filterLongIndianNames(name){
  return name.length > 6;
}

function filterCheaperProducts(price, filterParam){
  return price < filterParam;
}

//high-temperatures
let temperatures = [22, 26, 19, 30, 23, 28, 17, 31];
app.get("/high-temperatures", (req, res) =>{
  let result = temperatures.filter(temp => filterHighTemperatures(temp));
  res.json(result);
})

//low-prices
let prices = [80, 120, 95, 150, 60, 110];
app.get("/low-prices", (req, res) =>{
  let result = prices.filter(price => filterLowPrices(price));
  res.json(result);
})

//high-ratings
let ratings =  [4.2, 3.8, 2.5, 4.7, 3.0, 4.9, 3.6];
app.get("/high-ratings", (req, res) =>{
  let result = ratings.filter(rating => filterHighRatings(rating));
  res.json(result);
})

//long-indian-names
let indianNames = ['Akshay', 'Priyanka', 'Arjun', 'Anushka', 'Rajesh', 'Kavita'];
app.get("/long-indian-names", (req, res) =>{
  let result = indianNames.filter(name => filterLongIndianNames(name));
  res.json(result);
})

//cheaper-products 
let productPrices = [10, 25, 50, 75, 100, 150, 200];
app.get( "/cheaper-products",(req, res) =>{
  let filterParam = parseFloat(req.query.filterParam);
  let result = productPrices.filter(price => filterCheaperProducts(price, filterParam));
  res.json(result);
})



app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})
