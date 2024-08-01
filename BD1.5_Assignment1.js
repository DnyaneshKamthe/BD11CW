const express = require('express');
const cors = require('cors');
const app = express();
let PORT = 3000;

// server-side value
let taxRate = 5 ;
let discountPercenatge = 10 ;
let loyaltyRate = 2;

function calculateCartTotal(newItemPrice,cartTotal){
  return newItemPrice + cartTotal;
}

function calculateEstimatedDelivery(shippingMethod,distance){
  console.log(shippingMethod,distance)
  if(shippingMethod === "express"){
    return distance / 100;
  }else{
    return distance / 50;
  }
}

//cart-total
app.get("/cart-total",(req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateCartTotal(newItemPrice,cartTotal).toString())
})

//membership-discount
app.get("/membership-discount",(req, res) => {
  let cartTotal  = parseFloat(req.query.cartTotal );
  let isMember = req.query.isMember === "true";
  let result;
  if(isMember){
    result = cartTotal - (cartTotal * (discountPercenatge / 100));
  }else{
    result = cartTotal;
  }
  res.send(result.toString())
})

//calculate-tax
app.get("/calculate-tax",(req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let calucaltedTax = cartTotal * (taxRate / 100);
  res.send(calucaltedTax.toString())
})

//estimate-delivery
app.get("/estimate-delivery",(req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(calculateEstimatedDelivery(shippingMethod,distance).toString())
})

//shipping-cost
app.get("/shipping-cost",(req, res) =>{
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send((weight * distance * 0.1).toString())
})

//loyalty-points
app.get("/loyalty-points",(req, res) =>{
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send((purchaseAmount * loyaltyRate).toString());
})

app.listen(PORT, ()=>{
  console.log("Server is running on port 3000");
})
